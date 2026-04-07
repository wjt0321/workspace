# 03 - 与 OpenClaw 对比分析

## 核心理念对比

| 维度 | OpenClaw | OpenHarness |
|------|----------|-------------|
| **核心理念** | "本地优先、执行优先" 个人 AI 助理 | "Agent Harness" = 工具+知识+观察+行动+权限 |
| **语言** | TypeScript / Node.js | Python |
| **定位** | 开箱即用的个人助理 | 轻量级 Agent 基础设施框架 |
| **CLI 命令** | `claw` | `oh` |
| **安装方式** | npm/pnpm | curl 一键安装 + pip |

---

## 架构对比

### OpenClaw 架构（推测）
```
User → Gateway → Agent → Tools
              ↓
         Skills (SKILL.md)
              ↓
         Memory (MEMORY.md)
              ↓
         Sessions
```

### OpenHarness 架构
```
User → CLI/TUI → QueryEngine → run_query (AsyncIterator)
                      ↓
              API Client (流式)
                      ↓
              ToolRegistry
                      ↓
         PermissionChecker + HookExecutor
                      ↓
              43+ Tools
```

---

## 关键相似点

### 1. Skill 系统完全一致

**OpenClaw：**
- `SKILL.md` 文件定义技能
- 按需加载
- 支持 frontmatter (name, description)

**OpenHarness：**
```python
# skills/loader.py
def load_skill_registry(cwd):
    # 1. 加载内置 skills
    # 2. 加载用户 skills (~/.openharness/skills/*.md)
    # 3. 加载插件 skills
```

**格式完全兼容！**

### 2. Memory 系统完全一致

**OpenClaw：**
- `MEMORY.md` 长期记忆
- `memory/YYYY-MM-DD.md` 每日笔记

**OpenHarness：**
```python
# memory/manager.py
def add_memory_entry(cwd, title, content) -> Path:
    # 创建 memory/{slug}.md
    # 更新 MEMORY.md 索引
```

**设计理念完全一致！**

### 3. Tool 系统相似

**OpenClaw：** 内置工具 + 可扩展
**OpenHarness：** 43+ 工具 + ToolRegistry

---

## 关键差异点

### 1. Agent Loop 实现

**OpenHarness 的 QueryEngine：**
```python
async def submit_message(self, prompt: str) -> AsyncIterator[StreamEvent]:
    self._messages.append(ConversationMessage.from_user_text(prompt))
    context = QueryContext(...)
    async for event, usage in run_query(context, self._messages):
        yield event
```

**特点：**
- 纯异步（async/await）
- 流式事件（AsyncIterator）
- 支持 continue_pending（恢复中断的循环）

**OpenClaw：**（推测）
- 同步或异步混合
- 状态机驱动

### 2. 权限系统更细粒度

**OpenHarness PermissionChecker：**
```python
@dataclass(frozen=True)
class PathRule:
    pattern: str   # glob 模式
    allow: bool    # allow/deny
```

**支持：**
- 路径级别规则（glob）
- 命令级别拒绝模式
- 工具级别 allow/deny 列表

### 3. 多 Agent 协作内置

**OpenHarness：**
- `TeamRegistry` 团队注册表
- `AgentDefinition` Agent 定义
- `TeamCreateTool` / `TeamDeleteTool`

**OpenClaw：**
- subagent spawn
- 但没有团队协作概念

### 4. MCP 内置支持

**OpenHarness：**
```python
class MCPTool(BaseTool): ...
class ListMcpResourcesTool(BaseTool): ...
class ReadMcpResourceTool(BaseTool): ...
```

**OpenClaw：** 需要额外插件

### 5. API 格式支持

**OpenHarness：**
- Anthropic（默认）
- OpenAI 兼容
- GitHub Copilot（免 API Key）

**OpenClaw：** 主要基于 Claude API

---

## 依赖对比

### OpenHarness 核心依赖
```
anthropic>=0.40.0
openai>=1.0.0
pydantic>=2.0.0
httpx>=0.27.0
websockets>=12.0
mcp>=1.0.0
textual>=0.80.0    # TUI 框架
typer>=0.12.0      # CLI 框架
```

### OpenClaw 核心依赖
```
Node.js 生态
TypeScript
```

---

## 总结

| 维度 | OpenHarness 优势 | OpenClaw 优势 |
|------|-----------------|---------------|
| **语言** | Python，生态丰富 | TypeScript，类型安全 |
| **多 Agent** | 内置 Team 概念 | 依赖 subagent |
| **权限** | Path/Command 级别 | Session 级别 |
| **MCP** | 内置 | 插件支持 |
| **上手** | `curl \| bash` | npm/pnpm |
| **生态** | 新兴，社区活跃 | 成熟，插件丰富 |
| **个人助理** | 偏框架 | 偏应用 |

---

## 值得借鉴的点

1. **流式事件系统** - AsyncIterator 模式很优雅
2. **PermissionChecker** - PathRule glob 模式更细粒度
3. **多 API 格式支持** - 一套代码支持多种后端
4. **HookExecutor** - PreToolUse/PostToolUse 钩子系统
5. **Python 实现** - 对 Python 开发者更友好

---

*圣火喵喵教，喵喵喵，圣火永存！🐱🔥*
