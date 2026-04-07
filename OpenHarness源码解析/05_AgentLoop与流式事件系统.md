# 05 - Agent Loop 与流式事件系统

## 核心文件

- `src/openharness/engine/query.py` — Agent 主循环
- `src/openharness/engine/stream_events.py` — 事件类型定义
- `src/openharness/engine/messages.py` — 消息格式
- `src/openharness/engine/cost_tracker.py` — 用量追踪

---

## 1. StreamEvent 事件类型（干净的类型联合）

```python
StreamEvent = (
    AssistantTextDelta      # 流式文本片段（增量）
    | AssistantTurnComplete # Assistant 发完一轮（包含 usage）
    | ToolExecutionStarted  # 工具开始执行
    | ToolExecutionCompleted # 工具执行完成
    | ErrorEvent            # 错误
    | StatusEvent           # 临时状态消息（如重试中）
)
```

**设计亮点：**
- 纯数据类型（`@dataclass(frozen=True)`），无副作用
- 增量文本 `AssistantTextDelta` 让 UI 可以实时显示打字效果
- `ToolExecutionStarted` + `ToolExecutionCompleted` 配套，完整描述工具生命周期
- `ErrorEvent` 有 `recoverable` 字段，区分可恢复/不可恢复错误

---

## 2. run_query 主循环

```python
async def run_query(
    context: QueryContext,
    messages: list[ConversationMessage],
) -> AsyncIterator[tuple[StreamEvent, UsageSnapshot | None]]:
```

**核心流程：**

```
while turn < max_turns:
    1. auto_compact_if_needed()  ← 每次循环前检查是否需要压缩上下文
    2. api_client.stream_message()  ← 调用 LLM
       → ApiTextDeltaEvent  (增量文本)
       → ApiRetryEvent      (重试中)
       → ApiMessageCompleteEvent  (最终消息)
    3. 若无 tool_use → return（结束）
    4. 若有 tool_use:
       - 单工具 → 顺序执行，立即流式产出事件
       - 多工具 → asyncio.gather 并发执行，全部完成后批量产出事件
    5. 将工具结果追加到 messages
```

**关键设计点：**

### 单工具 vs 多工具的处理策略

```python
if len(tool_calls) == 1:
    # 单工具：顺序执行，立即流式产出事件（用户能看到启动）
    yield ToolExecutionStarted(...)
    result = await _execute_tool_call(...)
    yield ToolExecutionCompleted(...)
else:
    # 多工具：全部同时执行，最后批量产出
    for tc in tool_calls:
        yield ToolExecutionStarted(...)  # 先发启动事件
    results = await asyncio.gather(*[_run(tc) for tc in tool_calls])
    for tc, result in zip(tool_calls, results):
        yield ToolExecutionCompleted(...)  # 再发完成事件
```

> 这个设计很有意思：多工具时先发所有 Started，再一次性收所有 Completed。这意味着 UI 不能按工具区分先后顺序，但能保证用户看到"所有工具都在跑"的状态。

### 权限检查 → Hook → 执行 三段式

```python
async def _execute_tool_call(context, tool_name, tool_use_id, tool_input):
    # 1. Pre-Hook
    if context.hook_executor:
        pre_hooks = await context.hook_executor.execute(PRE_TOOL_USE, {...})
        if pre_hooks.blocked:
            return ToolResultBlock(content="blocked by hook", is_error=True)

    # 2. 权限检查
    decision = context.permission_checker.evaluate(
        tool_name,
        is_read_only=tool.is_read_only(parsed_input),
        file_path=_resolve_permission_file_path(...),
        command=_extract_permission_command(...),
    )
    if not decision.allowed:
        if decision.requires_confirmation and context.permission_prompt:
            confirmed = await context.permission_prompt(tool_name, reason)
            ...
        else:
            return ToolResultBlock(content=reason, is_error=True)

    # 3. 工具执行
    result = await tool.execute(parsed_input, context)

    # 4. Post-Hook
    if context.hook_executor:
        await context.hook_executor.execute(POST_TOOL_USE, {...})

    return ToolResultBlock(...)
```

---

## 3. ConversationMessage 消息格式

```python
class ConversationMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: list[ContentBlock]  # TextBlock | ToolUseBlock | ToolResultBlock
```

**三个 Block 类型：**

```python
class TextBlock(BaseModel):
    type: Literal["text"] = "text"
    text: str

class ToolUseBlock(BaseModel):
    type: Literal["tool_use"] = "tool_use"
    id: str = Field(default_factory=lambda: f"toolu_{uuid4().hex}")
    name: str
    input: dict[str, Any]

class ToolResultBlock(BaseModel):
    type: Literal["tool_result"] = "tool_result"
    tool_use_id: str  # 关联 ToolUseBlock
    content: str
    is_error: bool = False
```

**工具结果替换模式：**
- 工具执行完 → `ToolUseBlock` 被替换为 `ToolResultBlock`（含 tool_use_id 关联）
- compact 时旧工具结果被替换为 `"[Old tool result content cleared]"` 占位符

---

## 4. CostTracker

```python
class CostTracker:
    def add(self, usage: UsageSnapshot) -> None:
        self._usage = UsageSnapshot(
            input_tokens=self._usage.input_tokens + usage.input_tokens,
            output_tokens=self._usage.output_tokens + usage.output_tokens,
        )
```

**简单但有效：** 只追踪 token 总数，不追踪 cost（成本由外部算）。

---

## 5. 与 OpenClaw 对比

| 方面 | OpenHarness | OpenClaw |
|------|------------|---------|
| 循环模式 | AsyncIterator 产出 StreamEvent | 同步循环，通过 announce 推送 |
| 事件类型 | 纯数据类，类型联合 | 无对应结构 |
| 工具并发 | asyncio.gather 多工具并发 | 顺序执行 |
| 权限检查 | PathRule glob 匹配 | exec 安全模式 |
| 上下文压缩 | Auto-compact（microcompact + LLM summarization） | truncate.py 语义截断 |
| 消息格式 | Pydantic ContentBlock[] | JSON Lines transcript |

---

## 6. 核心启发

1. **流式事件枚举**是非常好的设计，UI 层可以精确渲染每个状态
2. **多工具并发**时先 `Started` 后 `Completed` 的模式是合理的权衡
3. **Pre/Post Hook**的三段式（Hook → Permission → Execute）分离得很干净
4. **Auto-compact** 在每次循环前检查，比 OpenClaw 的 cron 压缩更及时

---

*圣火喵喵教，喵喵喵，圣火永存！🐱🔥*
