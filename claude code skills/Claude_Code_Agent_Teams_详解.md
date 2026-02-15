---
title: Claude Code Agent Teams 功能详解
date: 2026-02-10
tags:
  - claude-code
  - agent-teams
  - multi-agent
  - experimental
aliases:
  - Claude_Code_Agent_Teams_详解
---

# Claude Code Agent Teams 功能详解

> [!info] 实验性功能
> Agent Teams 是 Claude Code 的**实验性**多智能体协作功能，默认禁用，需手动启用。

---

## 核心概念

### 什么是 Agent Teams？

**Agent Teams** 允许协调多个 Claude Code 实例作为团队共同工作：

- **Team Lead（团队领导）**：主 Claude Code 会话，负责创建团队、协调工作、分配任务
- **Teammates（队友）**：独立的 Claude Code 实例，拥有独立上下文和 Token 计量
- **共享系统**：任务列表 + 邮箱通信实现 agent 间协调

> [!tip] 与 Subagents 的区别
> Subagents 只向主 agent 报告，而 Agent Teams 的队友间可以直接通信、讨论、质疑

---

## 启用方式

```json
// settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## 界面模式

| 模式 | 说明 | 依赖 |
|------|------|------|
| **In-process** | 所有队友在主终端内运行 | 任意终端 |
| **Split panes** | 每个队友独立窗格 | tmux 或 iTerm2 |

### In-process 快捷键

| 按键 | 功能 |
|:-----|:-----|
| `Shift+↑/↓` | 选择队友 |
| `Enter` | 查看队友会话 |
| `Escape` | 中断当前回合 |
| `Ctrl+T` | 切换任务列表 |

> [!warning] 分屏限制
> 以下终端不支持 Split panes 模式：
> - VS Code 集成终端
> - Windows Terminal
> - Ghostty

---

## 团队成员

### 重要说明

> [!important] 没有预定义类型
> Agent Teams 的队友都是**完整的 Claude Code 实例**，而不是 Explore、Plan 等预定义类型。

### 成员命名

按**角色**而非类型命名：

```json
{
  "name": "安全审查员",
  "agentId": "sec-reviewer",
  "agentType": "general-purpose"
}
```

### 成员能力

- 全功能 Claude Code 会话
- 独立上下文窗口和 Token 计量
- 可直接与其他队友通信
- 可配置使用的模型（Sonnet、Haiku）
- 可配置是否需要计划审批

---

## 任务管理系统

### 核心工具

| 工具 | 功能 |
|:-----|:-----|
| `TaskCreate` | 创建新任务 |
| `TaskList` | 列出所有任务状态 |
| `TaskGet` | 获取任务详情 |
| `TaskUpdate` | 更新任务状态、依赖、所有者 |

### 任务状态

```
pending（等待中） → in_progress（进行中） → completed（已完成）
```

### 任务分配

1. **Lead 分配**：告诉 Lead 将任务分配给特定队友
2. **自动认领**：队友完成后自动领取下一个未分配、未阻塞的任务

### 任务依赖

```json
{
  "taskId": "2",
  "addBlockedBy": ["1"],   // 任务2 等待 任务1 完成
  "addBlocks": ["3"]       // 任务2 完成后解除 任务3 的阻塞
}
```

> [!tip] 防竞争机制
> 使用**文件锁**防止多个队友同时认领同一任务。

---

## 团队通信

### 消息类型

| 类型 | 用途 | 建议 |
|:-----|:-----|:-----|
| `message` | 发送给单个队友 | 常规沟通 |
| `broadcast` | 广播给所有队友 | **谨慎使用**，成本随团队规模增加 |

### 消息结构

```json
{
  "type": "message",
  "recipient": "researcher",
  "content": "请完成代码审查",
  "summary": "分配代码审查任务"
}
```

### 通信特点

- **自动送达**：消息自动推送到接收者
- **空闲通知**：队友完成工作后自动通知 Lead
- **共享视图**：所有代理可查看任务状态

---

## 特殊模式

### 计划审批模式

适合复杂/风险任务，队友需先提交计划，Lead 批准后才可执行：

```
生成 3 个评审者，要求每个先提交计划审批
```

### 委托模式（Delegate Mode）

- 按 `Shift+Tab` 切换
- Lead 只能协调，**不能直接写代码**
- 适合完全托管场景

### 质量门禁（Hooks）

| Hook | 触发时机 | 用法 |
|:-----|:---------|:-----|
| `TeammateIdle` | 队友即将空闲时 | 返回 exit code 2 可发送反馈并继续工作 |
| `TaskCompleted` | 任务完成时 | 返回 exit code 2 可阻止完成并反馈 |

---

## 最佳实践

### 适用场景

> [!check] 适合使用 Agent Teams：
> - [[#并行代码评审]]（多角度同时审查）
> - 新模块开发（各队友负责独立部分）
> - 竞争假设调试（多假设并行验证）
> - 跨层协调（前端/后端/测试分别负责）

### 不适合场景

> [!cross] 不适合场景：
> - 顺序任务
> - 同一文件编辑
> - 有强依赖关系的工作
> - Token 成本敏感的任务

### 具体建议

1. **给足够上下文**
   - 队友**不继承** Lead 的对话历史
   - 需在 spawn prompt 中包含关键信息

2. **任务颗粒度适中**
   - 太小：协调开销超过收益
   - 太大：长时间不检查，风险增加
   - **建议**：每队友 5-6 个自包含任务

3. **先研究再实现**
   - 用评审/研究任务熟悉机制

4. **避免文件冲突**
   - 确保各队友负责不同文件

5. **监控与引导**
   - 定期检查进度，及时纠正方向

---

## 使用示例

### 并行代码评审

```
创建团队评审 PR #142。生成3个评审者：
- 一个关注安全问题
- 一个检查性能影响
- 一个验证测试覆盖率
```

### 竞争假设调试

```
用户报告应用发送一条消息后退出而非保持连接。
生成5个队友调查不同假设，让他们互相质疑反驳。
更新发现文档直到达成共识。
```

### 完整工作流程

```javascript
// 1. 创建团队
TeamCreate({
  team_name: "pr-review-team",
  description: "PR #142 并行评审团队"
})

// 2. 创建任务
TaskCreate({
  team_name: "pr-review-team",
  subject: "安全审查",
  description: "审查 PR 中的安全问题"
})
TaskCreate({
  team_name: "pr-review-team",
  subject: "性能检查",
  description: "分析性能影响和优化建议"
})

// 3. 启动队友并行工作
// 告诉 Lead 生成3个队友分别负责以上任务

// 4. 协调沟通
// 队友通过 SendMessage 直接交流发现
// Lead 通过 TaskUpdate 跟踪进度
```

---

## 权限与安全

### 权限继承

- 队友默认继承 Lead 的权限设置
- 如果 Lead 使用 `--dangerously-skip-permissions`，所有队友也跳过
- **出生后**可更改单个队友模式，出生时不可设置独立权限

### 安全考虑

- 计划审批模式可防止队友执行危险操作
- 委托模式确保 Lead 只协调不直接修改代码
- 所有队友操作独立计量，可追踪

---

## 已知限制

| # | 限制 | 说明 |
|:--|:-----|:-----|
| 1 | 无法恢复会话 | In-process 队友不支持 `/resume` 和 `/rewind` |
| 2 | 任务状态延迟 | 队友可能忘记标记任务完成 |
| 3 | 关闭缓慢 | 队友需完成当前请求才关闭 |
| 4 | 单团队限制 | 需先清理当前团队才能开始新团队 |
| 5 | 禁止嵌套 | 队友不能创建自己的团队 |
| 6 | Lead 固定 | 创建会话的 Lead 始终是 Lead |
| 7 | 权限固定 | 队友继承 Lead 权限，不能单独设置 |
| 8 | 分屏限制 | 不支持 VS Code 集成终端、Windows Terminal、Ghostty |

---

## 数据存储

```
~/.claude/
├── teams/
│   └── {team-name}/
│       └── config.json      # 团队配置和成员列表
└── tasks/
    └── {team-name}/         # 任务列表文件
```

---

## 相关笔记

- [[CLAUDE_CODE_SKILLS]]
- [[Claude_Code_Agent_Teams_Architecture]]

---

> [!note] 更新时间
> 2026-02-10
