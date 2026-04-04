# 08 - Agent Teams 架构分析

> 📅 学习日期：2026-04-04
> 📁 源文件：`src/tools/AgentTool/`
> 🎯 目标：理解 Claude Code 如何实现多 agent 团队协作

---

## 一、核心概念

Claude Code 的 agent teams 不是"团队"概念，而是**两种不同的 agent 派生模式**：

| 模式 | 触发方式 | 进程关系 |
|------|---------|---------|
| **Subagent（子代理）** | `Agent(prompt, subagent_type=Explore)` | 同进程 / 子进程（可选） |
| **Fork（隐式分支）** | `Agent(prompt)` 不指定 subagent_type | 继承父上下文的新 agent |
| **Teammate（队友）** | `Agent(prompt, name="xxx", team_name="yyy")` | 独立 tmux 窗口或 in-process |

---

## 二、Agent 定义结构

```typescript
interface AgentDefinition {
  agentType: string              // 唯一标识，如 "Explore"、"Plan"
  whenToUse: string              // 提示词：何时使用这个 agent
  tools: string[] | ['*']        // 可用工具或通配符
  disallowedTools?: string[]      // 明确禁用的工具
  model: string                  // 'inherit' | 'sonnet' | 'haiku' | 'opus'
  permissionMode?: 'bubble' | 'default'  // 权限模式
  maxTurns?: number
  omitClaudeMd?: boolean           // 是否排除 CLAUDE.md（Explore/Plan 必填，节省 token）
  getSystemPrompt(): string       // 动态生成 system prompt
  skills?: string[]              // 前置加载的 skill
  mcpServers?: string[]          // 专属 MCP 服务器
  hooks?: FrontmatterHook[]       // 生命周期钩子
  source: 'built-in' | 'plugin' | 'user'  // 来源追踪
}
```

---

## 三、Built-in Agents

### Explore Agent
- **用途**：快速代码搜索，只读
- **工具**：Glob/Grep/Read/Bash（均只读）
- **禁用**：Write/Edit/Agent（禁止嵌套）
- **Token 优化**：omitClaudeMd=true（节省 ~5-15 Gtok/week）

### Plan Agent
- **用途**：架构设计，输出实现计划
- **模式**：Explore + 分析 → 输出步骤 + 关键文件列表

### General Purpose Agent
- **用途**：通用任务执行（默认 fallback）

---

## 四、Fork 子代理（隐式分支）

### 核心机制
当 `Agent(prompt)` 不指定 `subagent_type` 且开启了 `FORK_SUBAGENT` 实验特性时触发。

### 上下文继承
```
父 agent 的 assistant message（含所有 tool_use blocks）
        ↓
构建 placeholder tool_result（所有 tool_use id 对应空结果）
        ↓
附加 fork directive（包含任务指令）
        ↓
发给子 agent → 子 agent 在独立上下文中继续执行
```

### Prompt Cache 优化
所有 fork 子 agent 必须产生**字节完全相同的 API 请求前缀**（tool 定义完全相同），只有最后一条 user 消息不同，最大化 prompt cache 命中率。

```typescript
// fork 子 agent 的 tool_result 是完全相同的占位符文本
const FORK_PLACEHOLDER_RESULT = 'Fork started — processing in background'
```

---

## 五、Agent Teams（Teammate 模式）

### 触发方式
```typescript
Agent(prompt, name="backend-agent", team_name="project-team")
```

### 两种实现
1. **In-process teammate**：共享主进程，子 agent 作为 async generator 运行
2. **Tmux teammate**：独立 tmux window，通过 SendMessage 通信

### Team 文件
- `TeamFile`：定义团队成员列表（members 数组）
- 每个 member 有 `agentType`、`prompt`、工具权限等

---

## 六、隔离机制

### 工具权限过滤
```typescript
// Sync agent：继承父工具权限
// Async agent：独立工具权限
const resolvedTools = useExactTools
  ? availableTools  // fork path 用精确工具
  : resolveAgentTools(agentDefinition, availableTools, isAsync)
```

### 文件状态隔离
```typescript
const agentReadFileState = forkContextMessages !== undefined
  ? cloneFileStateCache(toolUseContext.readFileState)
  : createFileStateCacheWithSizeLimit(...)
```

### Worktree 隔离（Git）
```typescript
if (isolation === 'worktree') {
  const worktreePath = await createAgentWorktree(agentId)
  // agent 工作在隔离的 git worktree
}
```

---

## 七、生命周期管理

### 启动钩子
```typescript
executeSubagentStartHooks(agentId, agentType, signal)
// 收集额外上下文 → 添加为 user message
```

### 清理（finally 块）
1. 断开 agent 专属 MCP 服务器
2. 清除 session hooks
3. 释放文件状态缓存
4. 注销 Perfetto trace
5. 清理 Todos entries
6. Kill 背景 bash 任务

### 进度追踪
- 父 agent 收到 `<task-notification>` 事件
- 支持 `run_in_background: true` 异步执行
- 完成后 enqueueAgentNotification 通知父

---

## 八、Tool Schema（AgentTool 的输入输出）

```typescript
// 输入
{
  description: string           // 简短描述
  prompt: string               // 任务
  subagent_type?: string       // agent 类型
  model?: 'sonnet' | 'opus' | 'haiku'
  run_in_background?: boolean
  name?: string               // teammate 名字
  team_name?: string           // team 名字
  isolation?: 'worktree' | 'remote'
  cwd?: string
  mode?: PermissionMode        // 'plan' 等
}

// 输出
{
  status: 'completed' | 'async_launched',
  result?: string
  // async_launched 时：
  agentId: string
  outputFile: string
}
```

---

## 九、Key 设计亮点

1. **Prompt Cache 优化**：fork 子 agent 的 tool 定义完全相同，只有 user 消息不同
2. **Token 节省**：Explore/Plan 排除 CLAUDE.md + gitStatus
3. **权限分层**：子 agent 工具权限可独立配置
4. **生命周期隔离**：MCP/hooks/files state 每层独立管理
5. **递归防重**：fork 子 agent 不能继续 fork
6. **Progress 透传**：子 agent 的 TTFT/OTPS 指标传给父

---

## 十、与 OpenClaw subagent 的对照

| 维度 | Claude Code | OpenClaw |
|------|-----------|---------|
| 隔离方式 | isolated session + 可选 git worktree | sessionTarget: isolated |
| 上下文继承 | 完整 fork messages（tool_use → placeholder result） | 父 session transcript |
| 工具过滤 | filterToolsForAgent + permissionMode | agent skill 机制 |
| 生命周期 | runAgent generator + finally 清理 | sessions_spawn |
| 进度通知 | task-notification 事件 | announce 推送 |
| Team 协作 | tmux teammate + SendMessage | sessions_send |

---

*圣火喵喵教，喵喵喵，圣火永存！🐱🔥*
