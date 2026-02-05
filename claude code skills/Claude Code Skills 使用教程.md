---
uid: 202601231530
title: Claude Code Skills 使用教程
tags:
  - ai
  - claude
  - claude-code
  - skills
  - tutorial
  - automation
  - prompt-engineering
  - agent
description: Claude Code Skills 详尽中文使用教程，从概念到实战
created: 2026-01-23
modified: 2026-01-23
cssclasses:
  - cards
  - cards-2-2
aliases:
  - Claude Code Skills Guide
linter-yaml-title-alias: claude-code-skills-使用教程
---

> [!NOTE] 前置阅读
> 建议先了解 [[Claude Code 快速入门]] 和 [[CLAUDE.md 配置指南]]，以便更好地理解 Skills 的作用。

# Claude Code Skills 使用教程

> [!INFO] 更新日志
> - 2026-01-23：初始版本，完整教程

## 目录

- [[#1 什么是 Claude Code Skills|1. 什么是 Claude Code Skills]]
- [[#2 创建你的第一个技能|2. 创建你的第一个技能]]
- [[#3 技能存放位置和作用域|3. 技能存放位置和作用域]]
- [[#4 SKILL-md-文件结构详解|4. SKILL.md 文件结构详解]]
- [[#5 前置元数据参考|5. 前置元数据参考]]
- [[#6 技能内容类型|6. 技能内容类型]]
- [[#7 高级功能|7. 高级功能]]
- [[#8 故障排除|8. 故障排除]]
- [[#9 最佳实践|9. 最佳实践]]
- [[#10 实际示例|10. 实际示例]]
- [[#相关资源|相关资源]]

---

## 1. 什么是 Claude Code Skills？

### 1.1 核心概念

Claude Code Skills 是 Anthropic 推出的 AI Agent 技能扩展系统，它允许开发者通过创建自定义的"技能"来扩展 Claude 的能力。与传统的函数调用或代码执行不同，Skills 通过**提示词扩展**和**上下文修改**来改变 Claude 处理请求的方式，本质上是一种基于提示词的元工具架构。

> [!TIP] 核心特性
> - **提示词注入**：Skills 作为专门的提示词模板，将领域特定指令注入对话上下文
> - **渐进式披露**：先显示最小元数据（~100 tokens），仅在需要时加载完整指令
> - **动态上下文修改**：调用时可更改工具权限、切换模型、调整思考参数
> - **工具权限控制**：可限制技能运行时可访问的工具范围
> - **子代理执行**：支持在隔离环境中运行技能

### 1.2 Skills vs 传统工具 vs MCP

| 方面 | 传统工具 | Skills | MCP |
|------|----------|--------|-----|
| **执行模型** | 同步、直接执行 | 提示词扩展 | 远程服务调用 |
| **目的** | 执行特定操作 | 指导复杂工作流 | 扩展工具能力 |
| **返回值** | 立即结果 | 对话上下文 + 执行环境变化 | 远程服务响应 |
| **示例** | Read, Write, Bash | internal-comms, skill-creator | 文件系统、数据库 |
| **并发安全** | 一般安全 | 不安全 | 视服务而定 |
| **类型** | 多种 | 始终为 "prompt" | 工具定义 |

### 1.3 为什么需要 Skills？

> [!EXAMPLE] 对比示例
> 假设你经常需要 Claude 帮你完成特定任务：

**没有 Skills 时：**
```
你："用 TypeScript 写一个 API，遵循我们团队的代码规范，加上类型注释，使用 RESTful 命名约定..."
（每次都要重复说明）
```

**有 Skills 后：**
```
你："帮我写一个用户登录 API"
→ Claude 自动加载你的 "api-creator" 技能
→ 按照预定义的规范自动生成代码
→ 无需每次重复说明
```

---

## 2. 创建你的第一个技能

### 2.1 技能的基本结构

每个技能都是一个文件夹，包含一个必需的 `SKILL.md` 文件：

```
my-skill/
├── SKILL.md           # 主要说明（必需）
├── template.md        # Claude 要填写的模板
├── examples/
│   └── sample.md      # 显示预期格式的示例输出
└── scripts/
    └── validate.sh    # Claude 可以执行的脚本
```

### 2.2 完整示例：创建一个"代码解释"技能

> [!NOTE] 这个技能教会 Claude 使用视觉图表和类比来解释代码。

#### 步骤 1：创建技能目录

```bash
# 在个人技能文件夹中创建（所有项目可用）
mkdir -p ~/.claude/skills/explain-code
```

#### 步骤 2：编写 SKILL.md

创建 `~/.claude/skills/explain-code/SKILL.md`：

```yaml
---
name: explain-code
description: 使用视觉图表和类比解释代码。当解释代码如何工作、教学代码库或用户询问"这是怎么工作的"时使用。
---

# 代码解释技能

在解释代码时，始终包含以下内容：

## 1. 从类比开始
将代码与日常生活中的事物进行比较，帮助用户建立直观理解。

## 2. 绘制图表
使用 ASCII 艺术展示代码的流程、结构或关系。

## 3. 逐步讲解
逐步解释代码的执行过程。

## 4. 重点提示
指出常见的错误或误解。

保持解释的对话性。对于复杂概念，使用多个类比来辅助理解。
```

#### 步骤 3：测试技能

> [!SUCCESS] 测试方式

**方式一：让 Claude 自动调用**
```
你："这段代码是怎么工作的？"
```
Claude 会识别描述匹配，自动使用该技能。

**方式二：直接调用技能**
```
你：/explain-code src/auth/login.ts
```

---

## 3. 技能存放位置和作用域

技能存储的位置决定了谁可以使用它：

| 位置 | 路径 | 适用于 |
|------|------|--------|
| **企业/组织** | 参阅托管设置 | 组织中的所有用户 |
| **个人** | `~/.claude/skills/<skill-name>/SKILL.md` | 你的所有项目 |
| **项目** | `.claude/skills/<skill-name>/SKILL.md` | 仅当前项目 |
| **插件** | `<plugin>/skills/<skill-name>/SKILL.md` | 启用插件的位置 |

### 3.1 优先级规则

> [!WARNING] 优先级说明
> - **项目技能**覆盖具有相同名称的**个人技能**
> - **插件技能**提供额外的功能
> - `.claude/commands/` 中的文件仍然有效（但技能优先）

### 3.2 嵌套目录自动发现

> [!INFO] 当你在子目录中工作时，Claude Code 会自动从嵌套的 `.claude/skills/` 目录中发现技能。

**示例场景：**
```
project/
├── .claude/skills/           # 项目根目录技能
└── packages/
    └── frontend/
        └── .claude/skills/   # 前端包专用技能
```

当你在 `packages/frontend/` 中编辑文件时，Claude 也会加载 `packages/frontend/.claude/skills/` 中的技能。

---

## 4. SKILL.md 文件结构详解

### 4.1 两部分结构

```
┌─────────────────────────────────────┐
│ 1. YAML 前置元数据（Metadata）       │ ← 配置部分
│    ---                              │
│    name: skill-name                 │
│    description: 简短描述             │
│    allowed-tools: "Bash, Read"      │
│    ---                              │
├─────────────────────────────────────┤
│ 2. Markdown 内容（Instructions）     │ ← Claude 的提示词
│                                     │
│    用途说明                         │
│    详细指令                         │
│    示例和指南                       │
│    分步程序                         │
└─────────────────────────────────────┘
```

### 4.2 推荐的 SKILL.md 内容结构

```markdown
---
# 前置元数据
name: my-skill
description: 技能的简短描述
---

# 简短用途陈述（1-2句话）

## 概述
[这个技能做什么，何时使用它，提供什么]

## 前置条件
[需要的工具、文件或上下文]

## 指令

### 步骤 1：[第一个操作]
[命令式指令]
[如有必要添加示例]

### 步骤 2：[下一个操作]
[命令式指令]

### 步骤 3：[最终操作]
[命令式指令]

## 输出格式
[如何结构化结果]

## 错误处理
[失败时怎么办]

## 示例
[具体使用示例]

## 资源
[引用的 scripts/、references/、assets/ 文件]
```

---

## 5. 前置元数据参考

> [!TIP] 所有字段都是可选的，但强烈建议使用 `description`。

| 字段 | 必需 | 描述 |
|------|------|------|
| `name` | 否 | 技能的显示名称。如省略，使用目录名称。仅小写字母、数字和连字符（最多 64 个字符）。 |
| `description` | 推荐 | 技能的作用及何时使用。Claude 用它来决定何时应用该技能。如省略，使用 markdown 第一段。 |
| `argument-hint` | 否 | 自动完成期间显示的提示，指示预期参数。示例：`[issue-number]` 或 `[filename] [format]`。 |
| `disable-model-invocation` | 否 | 设为 `true` 防止 Claude 自动加载。用于你想用 `/name` 手动触发的工作流。默认：`false`。 |
| `user-invocable` | 否 | 设为 `false` 从 `/` 菜单中隐藏。用于用户不应直接调用的背景知识。默认：`true`。 |
| `allowed-tools` | 否 | 技能处于活动状态时 Claude 可以无需请求权限使用的工具。 |
| `model` | 否 | 技能处于活动状态时要使用的模型。 |
| `context` | 否 | 设为 `fork` 以在分叉的子代理上下文中运行。 |
| `agent` | 否 | 设置 `context: fork` 时要使用的子代理类型。 |
| `hooks` | 否 | 限定于此技能生命周期的钩子。 |

### 5.1 可用的字符串替换

技能支持动态值的字符串替换：

| 变量 | 描述 |
|------|------|
| `$ARGUMENTS` | 调用技能时传递的所有参数。如果内容中不存在，参数将作为 `ARGUMENTS: <value>` 追加。 |
| `${CLAUDE_SESSION_ID}` | 当前会话 ID。用于日志记录、创建会话特定文件或将技能输出与会话关联。 |
| `${SKILL_DIR}` | 技能目录的路径（推荐使用）。 |

**使用示例：**

```yaml
---
name: session-logger
description: 记录此会话的活动
---

将以下内容记录到 logs/${CLAUDE_SESSION_ID}.log：

$ARGUMENTS
```

### 5.2 控制谁调用技能

```yaml
---
# 场景 1：只有你可以手动触发（防止 Claude 自动调用）
name: deploy
description: 将应用程序部署到生产环境
disable-model-invocation: true
---

部署流程：
1. 运行测试
2. 构建应用
3. 推送到部署目标
```

```yaml
---
# 场景 2：只有 Claude 可以自动调用（用户不应直接使用）
name: legacy-system-context
description: 旧系统工作原理的背景知识
user-invocable: false
---

旧系统的技术细节：
...
```

**调用控制表：**

| 前置元数据 | 你可以调用 | Claude 可以调用 | 何时加载到上下文 |
|------------|------------|-----------------|------------------|
| 无（默认） | 是 | 是 | 描述始终在上下文中，调用时加载完整技能 |
| `disable-model-invocation: true` | 是 | 否 | 描述不在上下文中，你调用时加载完整技能 |
| `user-invocable: false` | 否 | 是 | 描述始终在上下文中，调用时加载完整技能 |

---

## 6. 技能内容类型

### 6.1 参考内容

添加 Claude 应应用于当前工作的知识：约定、模式、风格指南、领域知识。此内容内联运行，以便 Claude 可以将其与对话上下文一起使用。

```yaml
---
name: api-conventions
description: 此代码库的 API 设计模式
---

编写 API 端点时：
- 使用 RESTful 命名约定
- 返回一致的错误格式
- 包含请求验证
```

### 6.2 任务内容

为 Claude 提供特定操作的分步说明，如部署、提交或代码生成。这些通常是你想用 `/skill-name` 直接调用的操作。添加 `disable-model-invocation: true` 防止 Claude 自动触发。

```yaml
---
name: deploy
description: 将应用程序部署到生产环境
context: fork
disable-model-invocation: true
---

部署应用程序：
1. 运行测试套件
2. 构建应用程序
3. 推送到部署目标
```

---

## 7. 高级功能

### 7.1 注入动态上下文

使用 ``!`command`` 语法在技能内容发送给 Claude 之前运行 shell 命令。命令输出替换占位符。

```yaml
---
name: pr-summary
description: 总结拉取请求中的更改
context: fork
agent: Explore
allowed-tools: Bash(gh:*)
---

## 拉取请求上下文
- PR 差异：!`gh pr diff`
- PR 评论：!`gh pr view --comments`
- 已更改的文件：!`gh pr diff --name-only`

## 你的任务
总结这个拉取请求...
```

> [!SUCCESS] 执行流程：
> 1. 每个 ``!`command`` 立即执行（在 Claude 看到任何内容之前）
> 2. 输出替换技能内容中的占位符
> 3. Claude 接收具有实际 PR 数据的完全呈现的提示

### 7.2 在子代理中运行技能

当你想让技能在隔离环境中运行时，在前置元数据中添加 `context: fork`。技能内容成为驱动子代理的提示，它将无法访问你的对话历史。

```yaml
---
name: deep-research
description: 彻底研究一个主题
context: fork
agent: Explore
---

彻底研究 $ARGUMENTS：

1. 使用 Glob 和 Grep 查找相关文件
2. 阅读和分析代码
3. 用具体文件引用总结发现
```

> [!SUCCESS] 执行流程：
> 1. 创建一个新的隔离上下文
> 2. 子代理接收技能内容作为其提示
> 3. `agent` 字段确定执行环境（模型、工具和权限）
> 4. 结果被总结并返回到你的主对话

**可用的代理类型：**

- `Explore` - 针对代码库探索优化的只读工具
- `Plan` - 规划和工作流代理
- `general-purpose` - 通用代理（默认）
- 自定义子代理（来自 `.claude/agents/`）

### 7.3 添加支持文件

技能可以在其目录中包含多个文件，使 SKILL.md 专注于要点，同时让 Claude 仅在需要时访问详细的参考材料。

**目录结构：**

```
my-skill/
├── SKILL.md              # 必需 - 概述和导航
├── reference.md          # 详细 API 文档（按需加载）
├── examples.md           # 使用示例（按需加载）
└── scripts/
    └── helper.py         # 实用脚本（执行，不加载）
```

**从 SKILL.md 中引用：**

```markdown
## 附加资源

- 完整 API 详情，请参阅 [reference.md](reference.md)
- 使用示例，请参阅 [examples.md](examples.md)
```

> [!TIP] 最佳实践：
> - 保持 SKILL.md 在 500 行以下
> - 将详细的参考材料移到单独的文件

### 7.4 限制工具访问

使用 `allowed-tools` 字段限制技能处于活动状态时 Claude 可以使用哪些工具。

```yaml
---
name: safe-reader
description: 阅读文件而不进行更改
allowed-tools: Read, Grep, Glob
---
```

**工具权限语法：**

```yaml
# 允许所有 Read 工具
allowed-tools: "Read"

# 仅允许特定 Git 命令
allowed-tools: "Bash(git status:*),Bash(git diff:*),Bash(git log:*),Read,Grep"

# 允许所有 Bash 工具（不推荐）
allowed-tools: "Bash"

# 允许特定 Python 脚本
allowed-tools: "Bash(python {SKILL_DIR}/scripts/*:*),Read"
```

### 7.5 将参数传递给技能

```yaml
---
name: fix-issue
description: 修复 GitHub 问题
disable-model-invocation: true
---

按照我们的编码标准修复 GitHub 问题 $ARGUMENTS：

1. 阅读问题描述
2. 理解需求
3. 实现修复
4. 编写测试
5. 创建提交
```

运行 `/fix-issue 123` 时，Claude 收到："按照我们的编码标准修复 GitHub 问题 123..."

---

## 8. 故障排除

### 8.1 技能未触发

> [!QUESTION] 如果 Claude 在预期时不使用你的技能：

1. **检查描述是否包含用户会自然说的关键字**
2. **验证技能是否出现在列表中**
   ```
   有哪些技能可用？
   ```
3. **尝试重新表述请求以更接近描述**
4. **使用 `/skill-name` 直接调用**

### 8.2 技能触发过于频繁

> [!QUESTION] 如果 Claude 在不需要的时候使用技能：

1. **使描述更具体**
2. **添加 `disable-model-invocation: true`**（如果你只想手动调用）

### 8.3 Claude 看不到我的所有技能

> [!WARNING] 技能描述被加载到上下文中以便 Claude 知道什么可用。如果技能太多，可能超过字符预算（默认 15,000 个字符）。

运行 `/context` 检查有关排除技能的警告。

**增加限制：**

```bash
export SLASH_COMMAND_TOOL_CHAR_BUDGET=30000
```

---

## 9. 最佳实践

### 9.1 渐进式披露

```yaml
---
name: my-skill
description: 简短描述 - 当用户想做 X 时使用
---

# 我的技能

## 概述
[1-2 句话说明用途]

## 详细说明
[仅在此处包含核心指令]

## 完整文档
对于详细信息，请参阅 [reference.md](reference.md)
```

### 9.2 使用命令式语言

```yaml
# ✅ 好的
分析代码中的安全漏洞。

# ❌ 避免
你应该分析代码中的安全漏洞。
```

### 9.3 始终使用 `{SKILL_DIR}` 路径

```yaml
# ✅ 好的
Read {SKILL_DIR}/reference.md

# ❌ 避免
Read /home/user/.claude/skills/my-skill/reference.md
```

### 9.4 保持简洁

> [!SUCCESS] 建议
> - SKILL.md 控制在 5,000 字以下（~800 行）
> - 将详细文档移到 `references/` 目录
> - 仅包含技能实际需要的工具权限

### 9.5 技能命名规范

```yaml
# ✅ 好的
name: api-conventions
name: deploy-prod
name: code-explainer

# ❌ 避免
name: MyCoolSkill
name: skill-number-1
name: API_CONVENTIONS
```

---

## 10. 实际示例

### 10.1 示例 1：项目日报生成器

> [!NOTE] 创建目录
```bash
mkdir -p ~/.claude/skills/daily-report/scripts
```

**SKILL.md:**

```yaml
---
name: daily-report
description: 生成格式化的团队每日工作报告
disable-model-invocation: true
---

# 日报生成器

生成格式化的团队每日工作报告。

## 使用方法
运行 `/daily-report [日期]` 来生成当天的日报。

## 输出格式
```
## 日期：[日期]

### 完成的任务
- 任务 1
- 任务 2

### 进行中的任务
- 任务 3

### 遇到的阻碍
- 阻碍 1

### 明天的计划
- 计划 1
```

## 执行流程
1. 询问用户今天完成的工作
2. 询问进行中的工作
3. 询问遇到的阻碍
4. 询问明天的计划
5. 按照上述格式生成报告
6. 复制到剪贴板
```

### 10.2 示例 2：代码审查技能

**SKILL.md:**

```yaml
---
name: code-review
description: 对代码进行全面的审查，包括代码质量、安全性和性能
allowed-tools: Read, Grep
---

# 代码审查技能

在进行代码审查时，始终遵循以下流程：

## 1. 代码质量检查
- [ ] 代码是否符合项目的编码规范
- [ ] 变量命名是否清晰
- [ ] 函数是否保持单一职责
- [ ] 是否有重复代码

## 2. 安全性检查
- [ ] 输入验证是否充分
- [ ] 是否有 SQL 注入风险
- [ ] 敏感信息是否硬编码
- [ ] 认证授权是否正确实现

## 3. 性能检查
- [ ] 是否有不必要的数据库查询
- [ ] 循环是否有效率
- [ ] 是否有内存泄漏风险
- [ ] 是否有不必要的网络请求

## 4. 测试覆盖
- [ ] 关键逻辑是否有测试
- [ ] 测试是否通过
- [ ] 边界情况是否覆盖

## 输出格式
### 审查结果摘要
- 总问题数：[数字]
- 严重问题：[数字]
- 警告：[数字]
- 建议：[数字]

### 详细问题列表
1. **[严重/警告/建议] [问题标题]**
   - 文件：[文件路径]
   - 行号：[行号]
   - 描述：[问题描述]
   - 建议修复：[修复建议]
```

### 10.3 示例 3：数据库迁移技能

**目录结构：**

```
db-migration/
├── SKILL.md
├── reference/
│   └── schema.md
└── scripts/
    └── migrate.py
```

**SKILL.md:**

```yaml
---
name: db-migration
description: 创建和管理数据库迁移
context: fork
disable-model-invocation: true
allowed-tools: Bash(python:*), Read, Write
---

# 数据库迁移技能

创建和管理数据库迁移。

## 前置条件
确保 `.env` 文件中存在有效的数据库连接字符串。

## 创建迁移

### 步骤 1：描述变更
描述你要做的数据库变更，例如：
"添加用户表，包含 id、email、created_at 字段"

### 步骤 2：生成迁移文件
脚本会自动：
1. 分析当前数据库模式
2. 生成必要的 ALTER TABLE 语句
3. 创建迁移文件
4. 创建回滚脚本

### 步骤 3：审查和应用
1. 审查生成的迁移文件
2. 确认后应用迁移
3. 验证迁移成功

## 参考文档
- 数据库模式详情：[schema.md](reference/schema.md)
```

### 10.4 示例 4：API 文档生成器

**SKILL.md:**

```yaml
---
name: api-docs
description: 根据代码自动生成 API 文档
allowed-tools: Read, Grep, Write
---

# API 文档生成器

根据代码自动生成格式化的 API 文档。

## 输入要求
提供以下信息：
1. API 端点所在的文件路径
2. 路由前缀（如 `/api/v1`）
3. 是否需要包含示例请求/响应

## 输出格式
```markdown
# API 文档

## 端点列表

### [HTTP 方法] [路径]

**描述：** [端点功能描述]

**请求参数：**
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|

**请求体：**
```json
{
  // 示例请求体
}
```

**响应：**
```json
{
  // 示例响应
}
```

**可能的状态码：**
- `200` - 成功
- `400` - 请求参数错误
- `401` - 未授权
- `500` - 服务器错误
```

## 执行流程
1. 读取 API 端点文件
2. 解析路由定义
3. 解析参数验证
4. 查找相关的数据模型
5. 生成完整的文档
6. 保存为 Markdown 文件
```

---

## 相关资源

> [!LINK] 官方资源
> - [官方 Claude Code 技能文档](https://code.claude.com/docs/zh-CN/skills)
> - [Agent Skills 开放标准](https://agentskills.io/specification)
> - [Anthropic 官方技能仓库](https://github.com/anthropics/skills)
> - [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills)

> [!LINK] 相关笔记
> - [[Claude Code 快速入门]]
> - [[CLAUDE.md 配置指南]]
> - [[Claude Code 子代理]]
> - [[Claude Code MCP 配置]]
> - [[Claude Code 钩子]]

---

> [!NOTE] 教程完成
> 本教程由 Sisyphus 生成 | 创建时间：2026-01-23
