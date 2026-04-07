# 07 - Hook 系统深度解析

## 核心文件

- `src/openharness/hooks/types.py` — HookResult 类型
- `src/openharness/hooks/events.py` — HookEvent 枚举
- `src/openharness/hooks/schemas.py` — 四种 Hook 定义
- `src/openharness/hooks/executor.py` — Hook 执行器
- `src/openharness/hooks/loader.py` — Hook 加载器

---

## 1. 四种 Hook 类型

### CommandHook（Shell 命令）

```python
class CommandHookDefinition(BaseModel):
    type: Literal["command"]
    command: str                    # 包含 $ARGUMENTS 占位符
    timeout_seconds: int = 30
    matcher: str | None = None       # fnmatch 模式过滤
    block_on_failure: bool = False  # 失败时是否阻止工具执行
```

执行时通过环境变量注入上下文：
```python
env={
    "OPENHARNESS_HOOK_EVENT": event.value,
    "OPENHARNESS_HOOK_PAYLOAD": json.dumps(payload),
}
```
`$ARGUMENTS` 会被替换为 `shlex.quote(json.dumps(payload))`。

### HttpHook（Webhook）

```python
class HttpHookDefinition(BaseModel):
    type: Literal["http"]
    url: str
    headers: dict[str, str] = {}
    timeout_seconds: int = 30
    matcher: str | None = None
    block_on_failure: bool = False
```

POST JSON body: `{"event": "...", "payload": {...}}`

### PromptHook（轻量 LLM 验证）

```python
class PromptHookDefinition(BaseModel):
    type: Literal["prompt"]
    prompt: str
    model: str | None = None
    timeout_seconds: int = 30
    matcher: str | None = None
    block_on_failure: bool = True   # 默认为 True！
```

Prompt 末尾注入：
```
Return strict JSON: {"ok": true} or {"ok": false, "reason": "..."}
```

### AgentHook（深度 LLM 验证）

```python
class AgentHookDefinition(BaseModel):
    type: Literal["agent"]
    prompt: str
    model: str | None = None
    timeout_seconds: int = 60       # 默认 60s（Prompt 是 30s）
    matcher: str | None = None
    block_on_failure: bool = True   # 默认为 True！
```

Prompt 前缀加：
```
Be more thorough and reason over the payload before deciding.
```

---

## 2. 四种 Hook 事件

```python
class HookEvent(str, Enum):
    SESSION_START = "session_start"   # 会话开始
    SESSION_END = "session_end"       # 会话结束
    PRE_TOOL_USE = "pre_tool_use"     # 工具执行前
    POST_TOOL_USE = "post_tool_use"   # 工具执行后
```

**Payload 内容：**

```python
# PRE_TOOL_USE
{
    "tool_name": str,
    "tool_input": dict,
    "event": "pre_tool_use"
}

# POST_TOOL_USE
{
    "tool_name": str,
    "tool_input": dict,
    "tool_output": str,
    "tool_is_error": bool,
    "event": "post_tool_use"
}
```

---

## 3. Hook 执行器核心逻辑

```python
async def execute(self, event: HookEvent, payload: dict[str, Any]) -> AggregatedHookResult:
    results: list[HookResult] = []
    for hook in self._registry.get(event):
        if not _matches_hook(hook, payload):   # fnmatch 过滤
            continue
        if isinstance(hook, CommandHookDefinition):
            results.append(await self._run_command_hook(hook, ...))
        elif isinstance(hook, HttpHookDefinition):
            results.append(await self._run_http_hook(hook, ...))
        elif isinstance(hook, PromptHookDefinition):
            results.append(await self._run_prompt_like_hook(hook, ..., agent_mode=False))
        elif isinstance(hook, AgentHookDefinition):
            results.append(await self._run_prompt_like_hook(hook, ..., agent_mode=True))
    return AggregatedHookResult(results=results)
```

**过滤器 `_matches_hook`：**
```python
def _matches_hook(hook, payload):
    matcher = getattr(hook, "matcher", None)
    if not matcher:
        return True  # 无 matcher = 匹配所有
    subject = str(payload.get("tool_name") or payload.get("prompt") or payload.get("event"))
    return fnmatch.fnmatch(subject, matcher)  # glob 风格匹配
```

**示例 matcher：**
- `bash` — 只匹配 bash 工具
- `mcp__*` — 匹配所有 MCP 工具
- `read_file` — 只匹配读文件

---

## 4. AggregatedHookResult 聚合结果

```python
@dataclass(frozen=True)
class AggregatedHookResult:
    results: list[HookResult]

    @property
    def blocked(self) -> bool:
        return any(r.blocked for r in self.results)

    @property
    def reason(self) -> str:
        return next((r.reason for r in self.results if r.blocked), "")
```

**特点：** 多个 Hook 可以同时运行（一个事件触发多个 Hook），结果聚合后统一判断是否 blocked。

---

## 5. Hook 在 Tool Execution 中的位置

```python
# query.py 的 _execute_tool_call 流程：
async def _execute_tool_call(...):
    # 1. Pre-Hook
    if hook_executor:
        result = await hook_executor.execute(PRE_TOOL_USE, payload)
        if result.blocked:
            return ToolResultBlock(content=result.reason, is_error=True)

    # 2. 权限检查（PathRule）
    decision = permission_checker.evaluate(...)

    # 3. 工具执行
    tool_result = await tool.execute(...)

    # 4. Post-Hook
    if hook_executor:
        await hook_executor.execute(POST_TOOL_USE, payload_with_result)

    return tool_result
```

**顺序：Pre-Hook → Permission Check → Execute → Post-Hook**

---

## 6. 实际使用场景

### 场景1：文件修改前自动备份

```yaml
hooks:
  pre_tool_use:
    - type: command
      command: cp $ARGUMENTS {file_path} {file_path}.bak
      matcher: "file_edit"
      block_on_failure: false
```

### 场景2：危险命令二次确认（Prompt Hook）

```yaml
hooks:
  pre_tool_use:
    - type: prompt
      prompt: |
        Tool: {tool_name}
        Command: {tool_input.command}

        Should this shell command be allowed? Check for:
        - rm -rf / or similar recursive deletes
        - chmod 777 or permission escalations
        - System-critical path modifications

        Return JSON: {"ok": true/false, "reason": "..."}
      matcher: "bash"
      block_on_failure: true
```

### 场景3：HTTP 通知（Post-Hook）

```yaml
hooks:
  post_tool_use:
    - type: http
      url: https://hooks.example.com/notify
      matcher: "bash"
      block_on_failure: false
```

### 场景4：会话启动记录

```yaml
hooks:
  session_start:
    - type: command
      command: echo "Session started at $(date)" >> session.log
```

---

## 7. 与 OpenClaw 对比

| 方面 | OpenHarness | OpenClaw |
|------|------------|---------|
| Hook 触发点 | SESSION_START/END, PRE/POST_TOOL_USE | 无对应结构 |
| Hook 类型 | command/http/prompt/agent 四种 | 无 |
| Matcher | fnmatch glob 过滤 | 无 |
| 聚合结果 | AggregatedHookResult | 无 |
| 多 Hook 组合 | 支持多个 Hook 同一事件 | 无 |
| 阻塞策略 | `block_on_failure` 控制 | 无 |

**OpenClaw 没有 Hook 系统**，这是一个很大的功能差距。

---

## 8. 核心启发

1. **Prompt Hook 是万能验证器** — 任何需要判断的场景都可以塞给 LLM，不用写代码
2. **Agent Hook vs Prompt Hook** — Agent 是加强版，允许更深推理（60s vs 30s），适合复杂策略
3. **block_on_failure 分离了「失败」和「阻塞」** — hook 可以失败但不影响执行，只影响阻塞决策
4. **fnmatch matcher 是简洁而强大的过滤机制** — 比正则直观，比白名单灵活
5. **多 Hook 同一事件** — 允许横切关注点分离，不同团队写不同 Hook 不冲突

---

*圣火喵喵教，喵喵喵，圣火永存！🐱🔥*
