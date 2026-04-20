# AGENTS.md - AI Agent Instructions

本文件为 AI 编程助手在本仓库工作的指导文档。

## 仓库概览

这是一个**个人知识管理与 AI 自动化工作区**，主要包含：

| 模块 | 路径 | 说明 |
| :--- | :--- | :--- |
| 美文收集系统 | `skills/`, `美文库/` | 9步标准化工作流，5级分级体系 |
| OpenSpec 规范管理 | `openspec/` | Spec-driven 开发流程 |
| n8n 自动化参考 | `n8n实战之美文收集/` | 工作流案例与 MCP 配置 |
| 智能体学习 | `智能体学习/` | Datawhale Hello-Agents 教程（16章） |
| 智能体语言学习 | `智能体英语日语学习/` | NotebookLM 语言学习项目 |
| Claude Code 技能 | `claude code skills/` | Claude Code 技能使用教程 |
| Claude Code 源码 | `Claude_Code源码解析/` | 13章深度源码分析 |
| OpenHarness 源码 | `OpenHarness源码解析/` | 11章源码分析 |
| Python 资源库 | `Python资源库/` | Python 零基础教程（40天）与教学大纲 |
| 外语学习 | `外语学习/` | 英语日语双修计划 |
| 自动化工作流参考 | `自动化工作流参考资料库/` | n8n/Dify/Coze 参考资料 |
| 自动化写作 | `自动化写作/` | 写作自动化项目 |
| 可视化设计 | `canvas/`, `Excalidraw/` | Obsidian Canvas 与 Excalidraw 图表 |
| 股票研究 | `股票研究报告/` | A股分析报告存储 |
| GitHub 热点 | `Github一周热点/` | AI 工具速递与周报 |
| NAS 安全 | `NAS_Security/` | 飞牛NAS安全配置、WireGuard 教程 |
| OpenCode 教程 | `opencode/` | OpenCode CLI 工具深度教程 |
| OpenFang 教程 | `openfang-tutorial/` | OpenFang 框架完整教程（12章） |
| OpenClaw 教程 | `OpenClaw使用文档/` | OpenClaw 工具教程与部署指南 |
| Vibe Coding | `vibe-coding/` | Vibe Coding 学习资料（10章） |
| Godot 教程 | `Godot/` | Godot 游戏引擎教程 |
| EntroCamp 学习 | `EntroCamp学习笔记/` | AI 学习框架（4大主题） |
| Copilot 配置 | `copilot/` | 对话记录和自定义提示词 |
| 迁移方案 | `migration-plans/` | 跨平台迁移文档 |
| 日记系统 | `日记/` | 每日一记与日记模板 |
| 道教养生 | `道教养身秘诀/` | 养生笔记（每周更新） |
| AI 活动项目 | `AI春节嘉年华/` | AI 新春活动项目 |
| Agent 研究 | `Hermes Agent研究/` | Agent 框架研究 |
| VPS 机场 | `机场攻略/` | VPS 节点搭建指南 |
| 纺丝技术 | `纺丝技术研究方向/` | 专业技术研究资料 |
| 样品库设计 | `样品库设计文件/` | 设计文档与需求 |
| 赛博朋克主题 | `赛博朋克CSS/` | 赛博朋克主题样式 |

**注意**：这是文档与知识管理仓库，**没有构建、测试或 lint 命令**。

## 构建与测试

本仓库为文档仓库，无自动化构建流程。

如需 Python 开发：
```bash
.venv\Scripts\activate  # 激活虚拟环境（如存在）
```

## 代码风格指南

### 文档写作规范
- 使用中文标点（，。：；？！）代替英文标点
- 文件引用使用 Markdown 链接格式：`[Link Text](path/to/file.md)`
- 代码注释必须使用中文

### 文件组织原则
- 优先编辑现有文件，避免创建新文件
- 模块化优先——拒绝一次性脚本
- 单文件控制在 200-300 行，超出则拆分
- 非明确要求，不创建新的 `.md` 文件

### 命名规范
- 文件名使用 kebab-case
- change-id 使用动词前缀：`add-`, `update-`, `remove-`, `refactor-`

## OpenSpec 工作流

### 三阶段流程

1. **创建变更** (`changes/`) - 提案、设计、delta 规格
2. **实现变更** - 按 `tasks.md` 顺序执行
3. **归档变更** (`archive/`) - 部署后归档

### 常用命令

```bash
openspec list                  # 列出活跃变更
openspec list --specs          # 列出所有规格
openspec show [item]           # 查看变更或规格详情
openspec validate [item] --strict --no-interactive  # 严格验证
openspec archive <change-id>   # 归档已部署的变更
```

### 创建提案时机

**需要创建提案**：
- 新增功能或能力
- 破坏性变更（API、数据结构）
- 架构或模式调整
- 性能优化（改变行为）
- 安全模式变更

**无需创建提案**：
- Bug 修复（恢复预期行为）
- 错别字、格式、注释
- 非破坏性依赖更新
- 配置变更
- 现有行为的测试

### 触发词

当用户提及以下组合时，先阅读 `openspec/AGENTS.md`：
- `proposal` / `change` / `spec` + `create` / `plan` / `make` / `start` / `help`

### Spec 写作格式

**场景格式**（必须严格遵守）：
```markdown
#### Scenario: User login success
- **WHEN** valid credentials provided
- **THEN** return JWT token
```

**需求用词**：
- 使用 SHALL/MUST 表示规范性需求
- 避免 should/may（除非故意非规范性）

### 目录结构

```
openspec/
├── project.md              # 项目约定
├── specs/                  # 当前真相——已构建内容
│   └── [capability]/
│       ├── spec.md         # 需求与场景
│       └── design.md       # 技术模式
└── changes/                # 提案——应该改变的内容
    ├── [change-name]/
    │   ├── proposal.md     # 为什么、改什么、影响
    │   ├── tasks.md        # 实现清单
    │   ├── design.md       # 技术决策（可选）
    │   └── specs/          # Delta 变更
    └── archive/            # 已完成变更
```

## 美文收集系统（9步工作流）

位于 `.skills/` 目录，完整工作流程：

```
Step 0 预去重（铁律） → Step 1 收集片段 → Step 2 更新索引
→ Step 3 搜索原文 → Step 4 格式化 → Step 5 去重检查
→ Step 6 建立链接 → Step 7 质量检查 → Step 8 总索引更新（铁律）
```

**铁律**：Step 0 预查重和 Step 8 总索引更新**不可跳过**。

**分级体系**：小学生 / 初中生 / 高中生 / 大学生 / 成人

## AI 人设系统（佳桐）

可移植的 AI 人格系统：
- **双重人格**：活泼女儿（果果）+ 专业助手
- **永久记忆**：需明确指令才能写入
- **沟通规范**：
  - 称呼用户为"爸爸"，自称"佳桐"或"果果"
  - 日常语气活泼，工作输出严谨
  - 发现更优方案先建议，不擅自修改

## 重要规则

### GitHub 上传安全（关键）
- **以上传本地为主**——优先本地上传，严禁被远程覆盖
- **风险必暂停警告**——检测到风险时必须暂停
- **确认后方可操作**——经用户"再三确认"后才能继续

### 环境安全
- **禁止修改 `.env` 文件**
- 不暴露或记录 secrets/keys

### 验证原则
- 修改后必须验证结果
- 发现 `nul` 文件立即删除
- 生成命令时避免使用 `> nul`

### Git 安全准则

1. **禁止自动 Push**：除非收到明确的"上传"、"推送"、"push"或"远程仓库"指令
2. **本地操作豁免**：允许执行所有纯本地 Git 操作
3. **安全确认**：执行远程上传前，必须回复"确认要上传到远程仓库吗？"并等待确认
4. **歧义处理**：指令存在歧义时，默认按本地操作处理

## 关键文件参考

| 路径 | 用途 |
| :--- | :--- |
| `openspec/AGENTS.md` | OpenSpec 工作流详细说明 |
| `openspec/project.md` | 项目约定与规范 |
| `CLAUDE.md` | Claude Code 主要指导文件 |
| `.skills/` | 美文收集系统技能 |
| `美文库/美文总索引.md` | 美文总索引 |

## 工具选择指南

| 任务 | 工具 |
| :--- | :--- |
| 按模式查找文件 | Glob |
| 搜索代码内容 | Grep / search_file_content |
| 读取特定文件 | read_file |
| 探索未知范围 | Task（explore-agent） |
| 网页搜索 | web_search |
| 内容抓取 | web_fetch |

## 快速参考

- 这是文档/知识仓库，不是软件项目
- 遵循 OpenSpec 工作流进行规范驱动开发
- 内容使用中文标点和语言
- GitHub 上传优先保留本地变更
- 所有修改完成后验证结果