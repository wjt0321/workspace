# 08 - MCP 集成系统

## 核心文件

- `src/openharness/mcp/client.py` — MCP 客户端管理器
- `src/openharness/mcp/config.py` — 配置解析
- `src/openharness/mcp/types.py` — 类型定义
- `src/openharness/tools/mcp_tool.py` — MCP 工具适配器

---

## 1. McpClientManager 架构

```python
class McpClientManager:
    def __init__(self, server_configs: dict[str, object]) -> None:
        self._server_configs: dict[str, object]       # 服务器配置
        self._statuses: dict[str, McpConnectionStatus] # 每个服务器连接状态
        self._sessions: dict[str, ClientSession]     # 每个服务器的会话
        self._stacks: dict[str, AsyncExitStack]      # 资源管理
```

**核心方法：**

```python
async def connect_all(self)            # 启动时连接所有 MCP 服务器
async def reconnect_all(self)           # 重连所有服务器
async def close(self)                  # 关闭所有连接
async def call_tool(server, tool, args) # 调用 MCP 工具 → 返回字符串
async def read_resource(server, uri)    # 读取 MCP 资源 → 返回字符串
def list_tools() -> list[McpToolInfo]  # 列出所有服务器上所有工具
def list_resources() -> list[McpResourceInfo]  # 列出所有资源
```

---

## 2. 连接流程（Stdio 模式）

```python
async def _connect_stdio(self, name: str, config: McpStdioServerConfig):
    # 1. 创建 AsyncExitStack 管理生命周期
    stack = AsyncExitStack()

    # 2. 启动 stdio 子进程
    read_stream, write_stream = await stack.enter_async_context(
        stdio_client(
            StdioServerParameters(
                command=config.command,   # 如 "npx", "python"
                args=config.args,         # 如 ["-m", "mcp_server"]
                env=config.env,           # 环境变量（可传 API Key）
                cwd=config.cwd,           # 工作目录
            )
        )
    )

    # 3. 建立 MCP ClientSession
    session = await stack.enter_async_context(
        ClientSession(read_stream, write_stream)
    )
    await session.initialize()

    # 4. 列出工具和资源，填充状态
    tools = await session.list_tools()
    resources = await session.list_resources()

    # 5. 保存 session 和 stack
    self._sessions[name] = session
    self._stacks[name] = stack

    # 6. 更新连接状态（包含工具列表！）
    self._statuses[name] = McpConnectionStatus(
        state="connected",
        tools=[...],      # McpToolInfo 列表
        resources=[...],   # McpResourceInfo 列表
    )
```

---

## 3. MCP 工具如何暴露给 Agent

**文件：** `tools/mcp_tool.py`

```python
class McpToolAdapter(BaseTool):
    """把一个 MCP 工具适配为 OpenHarness 的 BaseTool"""

    def __init__(self, manager: McpClientManager, tool_info: McpToolInfo):
        # 工具命名：mcp__{server_name}__{tool_name}
        # 例：mcp__github__create_issue
        self.name = f"mcp__{server_segment}__{tool_segment}"
        self.description = tool_info.description
        self.input_model = _input_model_from_schema(tool_info.input_schema)

    async def execute(self, arguments: BaseModel, context):
        # 调用实际的 MCP 服务器
        output = await self._manager.call_tool(
            self._tool_info.server_name,
            self._tool_info.name,
            arguments.model_dump(mode="json"),
        )
        return ToolResult(output=output)
```

**input_schema 动态模型：**

```python
def _input_model_from_schema(tool_name, schema):
    properties = schema.get("properties", {})
    fields = {}
    required = set(schema.get("required", []))
    for key in properties:
        # 所有字段变成 `object | None`，避免类型不匹配
        fields[key] = (object | None, Field(default=... if key in required else None))
    return create_model(f"{tool_name.title()}Input", **fields)
```

---

## 4. McpConnectionStatus 连接状态

```python
@dataclass
class McpConnectionStatus:
    name: str
    state: str              # "pending" | "connected" | "failed"
    transport: str          # 如 "stdio"
    auth_configured: bool   # 是否配置了认证（env 中有密钥）
    tools: list[McpToolInfo] = []
    resources: list[McpResourceInfo] = []
    detail: str | None = None  # 失败原因
```

---

## 5. MCP 资源读取

```python
async def read_resource(self, server_name: str, uri: str) -> str:
    session = self._sessions[server_name]
    result = await session.read_resource(uri)
    parts = []
    for item in result.contents:
        if hasattr(item, 'text'):
            parts.append(item.text)
        else:
            parts.append(str(getattr(item, 'blob', '')))
    return "\n".join(parts)
```

---

## 6. 完整使用示例

### 配置（settings 中）

```python
{
    "mcp_servers": {
        "github": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-github"],
            "env": {
                "GITHUB_TOKEN": "ghp_xxxx"  # 通过环境变量传密钥
            }
        },
        "filesystem": {
            "type": "stdio",
            "command": "python",
            "args": ["-m", "mcp_server_fs", "--root", "/tmp"]
        }
    }
}
```

### Agent 使用

Agent 看到的是标准化后的工具名：
```
mcp__github__create_issue
mcp__github__search_repos
mcp__filesystem__read_file
mcp__filesystem__write_file
```

工具描述直接用 MCP server 定义的 description。

---

## 7. 与 OpenClaw 对比

| 方面 | OpenHarness | OpenClaw |
|------|------------|---------|
| MCP 支持 | 原生集成，通过 stdio 启动本地进程 | 无原生集成 |
| 工具命名 | `mcp__{server}__{tool}` 统一前缀 | 无 |
| 资源读取 | `read_resource()` 支持 | 无 |
| 动态模型 | `create_model()` 按 schema 生成 | 无 |
| 连接管理 | AsyncExitStack 自动管理生命周期 | 无 |
| 状态追踪 | per-server McpConnectionStatus | 无 |

---

## 8. 核心启发

1. **stdio 是连接本地 MCP 服务器的正确方式** — 不走 HTTP，进程内通信更稳定
2. **环境变量传密钥** — 安全又简单，不需要修改 MCP 服务器代码
3. **动态 input_model** — 按 schema 实时生成 Pydantic 模型，类型安全但灵活
4. **工具前缀命名** — `mcp__server__tool` 三段式命名完全避免冲突
5. **连接状态可查询** — 可以随时知道哪个 MCP 服务器断了

---

*圣火喵喵教，喵喵喵，圣火永存！🐱🔥*
