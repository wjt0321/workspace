# 🚀 Warp 完全指南：从入门到精通

> **最后更新：2026-05-01** | **Warp 开源首版：2026-04-28** | **仓库：github.com/warpdotdev/warp**
>
> Warp 已于 2026 年 4 月 28 日正式开源！50K+ Stars，3.3K+ Forks，OpenAI 为创始赞助商。

---

## 📖 目录

- [第一章：Warp 是什么？](#第一章warp-是什么)
- [第二章：安装与起步](#第二章安装与起步)
- [第三章：终端模式（Terminal Mode）](#第三章终端模式terminal-mode)
- [第四章：Agent 模式（Agent Mode）](#第四章agent-模式agent-mode)
- [第五章：代码编辑器与 LSP](#第五章代码编辑器与-lsp)
- [第六章：接入第三方 CLI Agent](#第六章接入第三方-cli-agent)
- [第七章：Warp Drive 云同步](#第七章warp-drive-云同步)
- [第八章：开源架构全景](#第八章开源架构全景)
- [第九章：从源码构建 Warp](#第九章从源码构建-warp)
- [第十章：参与贡献 Warp](#第十章参与贡献-warp)
- [第十一章：FAQ](#第十一章faq)
- [附录：速查表与资源](#附录速查表与资源)

---

## 第一章：Warp 是什么？

### 1.1 一句话定义

**Warp 是一个「智能体原生开发环境（Agentic Development Environment）」，生于终端，但远不止于终端。**

它不是传统的终端模拟器（如 iTerm2、Windows Terminal、Alacritty），也不是纯 AI 编码助手（如 Cursor、Copilot）。Warp 将**现代终端**和**AI Agent**融合成一个统一的开发工作台。

```
┌─────────────────────────────────────────────────────┐
│                     WARP                              │
│  ┌─────────────────┐  ┌───────────────────────────┐ │
│  │  Terminal Mode   │  │      Agent Mode           │ │
│  │                  │  │                           │ │
│  │  • 块级命令编辑  │  │  • 多轮 Agent 对话        │ │
│  │  • 语法高亮      │  │  • 内置 Oz Agent         │ │
│  │  • 智能补全      │  │  • 接入 Claude Code/Codex │ │
│  │  • 输出分组      │  │  • 代码审查集成          │ │
│  └─────────────────┘  └───────────────────────────┘ │
│  ┌─────────────────────────────────────────────────┐ │
│  │              Warp Drive (云同步)                 │ │
│  └─────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────┐ │
│  │       Code Editor (文件树 + LSP + 代码审查)      │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### 1.2 Warp 的核心哲学

Warp 的创始人 Zach Lloyd（前 Google 工程师，曾参与 Google Docs 开发）认为：

> "最大的开发瓶颈不再是写代码本身——而是围绕代码的所有人机协作活动：产品规格制定、行为验证。我们内部团队的能力和速度是有限的。"

因此，Warp 的愿景是：

```
人类（定方向、做决策）
    │
    ├── 管理 ──→ Oz Agent 集群（自动审查、合并、测试）
    │
    └── 协作 ──→ 全球社区贡献者（提 Spec、写代码）
```

**核心关键词：Agent-First、社区驱动、开源透明。**

### 1.3 Warp vs 其他工具

| 特性 | Warp | iTerm2 / Windows Terminal | Cursor | Claude Code |
|------|------|---------------------------|--------|-------------|
| 定位 | Agentic IDE | 终端模拟器 | AI IDE | CLI Agent |
| 终端体验 | ⭐⭐⭐⭐⭐ Rust 高性能 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| 内置 Agent | ✅ Oz Agent | ❌ | ✅ (Copilot) | ✅ (自身) |
| 接入外部 Agent | ✅ Claude Code / Codex / Gemini CLI | ❌ | ❌ | ❌ |
| 代码编辑器 | ✅ 带 LSP | ❌ | ✅ | ❌ |
| 开源 | ✅ AGPL v3 + MIT | ✅ | ❌ | ❌ |
| 跨平台 | macOS / Linux / Windows / WASM | 各平台独立 | macOS / Linux / Win | macOS / Linux |

### 1.4 技术栈一览

```
语言：    Rust (98.2%)
UI框架：  自研 WarpUI（Entity-Component-Handle 模式）
终端核心：基于 Alacritty 终端引擎
Shell：   集成 NuShell
网络：    Hyper (HTTP), GraphQL (WebSocket)
数据库：  SQLite (Diesel ORM)
AI：      OpenAI GPT 模型, Oz 编排平台
构建：    Cargo + 自定义脚本
```

---

## 第二章：安装与起步

### 2.1 下载预编译版本（推荐）

访问 [warp.dev/download](https://www.warp.dev/download) 下载对应平台安装包：

- **macOS**：`.dmg` 文件，拖入 Applications
- **Windows**：`.msi` 或 `.exe` 安装程序
- **Linux**：`.deb` / `.rpm` / AppImage

安装后首次启动需要注册 Warp 账号（用于 Warp Drive 云同步和 Agent 功能）。

### 2.2 从源码构建（开发者）

```bash
# 1. 克隆仓库
git clone https://github.com/warpdotdev/warp.git
cd warp

# 2. 平台初始化（安装系统依赖）
./script/bootstrap

# 3. 构建并运行
cargo run

# 4. 运行所有检查（格式化 + Clippy + 测试）
./script/presubmit
```

**前置依赖：**
- Rust 工具链（rustup + cargo）
- 平台构建工具（macOS: Xcode CLT；Linux: build-essential；Windows: Visual Studio Build Tools）
- `cargo-nextest`（测试运行器）
- `cargo-bundle`（打包工具）

### 2.3 连接本地 warp-server（高级）

如果你需要运行自己的后端：

```bash
# 连接默认端口 8080 的本地 server
cargo run --features with_local_server

# 连接自定义端口
SERVER_ROOT_URL=http://localhost:8082 \
WS_SERVER_URL=ws://localhost:8082/graphql/v2 \
cargo run --features with_local_server
```

环境变量说明：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `SERVER_ROOT_URL` | `http://localhost:8080` | HTTP API 端点 |
| `WS_SERVER_URL` | `ws://localhost:8080/graphql/v2` | WebSocket 端点 |

---

## 第三章：终端模式（Terminal Mode）

### 3.1 块级命令编辑（Block-Based Editing）

这是 Warp 最核心的终端创新。传统终端中，命令和历史输出混在一起；Warp 将**每个命令及其输出封装为一个「块（Block）」**。

```
┌──────────────────────────────────────────────┐
│  Block 1                                     │
│  ┌──────────────────────────────────────────┐│
│  │ $ cargo build --release                  ││  ← 命令（可编辑）
│  └──────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────┐│
│  │    Compiling warp v0.1.0                 ││  ← 输出（只读）
│  │    Finished release [optimized]          ││
│  └──────────────────────────────────────────┘│
├──────────────────────────────────────────────┤
│  Block 2                                     │
│  ┌──────────────────────────────────────────┐│
│  │ $ ./target/release/warp                  ││  ← 可选择/复制/编辑
│  └──────────────────────────────────────────┘│
└──────────────────────────────────────────────┘
```

**块操作的强大之处：**

- **就地编辑**：点击任何历史命令直接编辑，无需重新输入
- **一键复制**：点击块即可复制命令或输出
- **书签**：标记重要命令块，快速跳转
- **分享**：将命令+输出生成分享链接
- **搜索**：跨所有块搜索命令和输出

### 3.2 现代编辑器体验

Warp 的输入框不是一个简单的行，而是一个**完整的文本编辑器**：

```
功能：
  ✅ 多行编辑（Shift+Enter 换行）
  ✅ 光标自由移动（像 IDE 一样）
  ✅ 鼠标选择文本
  ✅ 语法高亮（200+ 命令的语法）
  ✅ 自动补全（历史命令、文件路径、Git 分支）
  ✅ 错误提示（命令输错时红色高亮）
```

### 3.3 智能补全系统

Warp 的补全基于 `command-signatures-v2` 子系统，支持：

```
输入：git ch [Tab]
      ↓
建议：git checkout
      git cherry-pick
      git clean

输入：npm install [Tab]
      ↓
建议：npm install react
      npm install --save-dev
      ...（从历史中学习）
```

### 3.4 工作区与标签页

```
Warp 窗口
├── 标签页 1：项目 A（前端）
│   ├── 窗格 1：npm run dev
│   └── 窗格 2：git log
├── 标签页 2：项目 A（后端）
│   └── 窗格 1：cargo run
└── 标签页 3：Agent 对话
    └── 与 Oz 讨论重构方案
```

- **分屏**：水平/垂直分割窗格
- **会话保存**：关闭 Warp 后恢复所有标签页和窗格
- **命名标签页**：为不同项目打标签

### 3.5 主题与定制

Warp 支持完整的主题系统：

- **内置主题**：Dracula、Solarized、Nord、Monokai 等 20+
- **自定义主题**：通过 JSON 配置文件
- **字体**：支持连字字体（Fira Code、JetBrains Mono）
- **透明度**：背景模糊和透明效果

---

## 第四章：Agent 模式（Agent Mode）

### 4.1 什么是 Agent 模式？

Agent 模式是 Warp 的「杀手级功能」。在终端模式中按 `Ctrl+`` 或点击 Agent 图标，切换到 Agent 模式——一个内嵌在终端中的 AI 对话界面。

```
┌─────────────────────────────────────────────────┐
│  Agent Mode                          [×] [终端]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  👤 你：帮我把这个 Rust 项目的 CI 配置改成      │
│       用 GitHub Actions                          │
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │ 🤖 Oz：我来分析你的项目结构...              ││
│  │                                             ││
│  │ 1. 检测到 Cargo.toml，是 Rust 项目          ││
│  │ 2. 推荐使用 actions-rs 系列 action          ││
│  │ 3. 生成 .github/workflows/ci.yml：          ││
│  │                                             ││
│  │ ```yaml                                     ││
│  │ name: CI                                    ││
│  │ on: [push, pull_request]                    ││
│  │ jobs:                                       ││
│  │   test:                                     ││
│  │     runs-on: ubuntu-latest                  ││
│  │     steps:                                  ││
│  │       - uses: actions/checkout@v4           ││
│  │       - run: cargo test                     ││
│  │ ```                                         ││
│  │                                             ││
│  │ 要我将这个文件写入项目吗？ [写入] [修改]     ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │ 输入消息...                         [发送]  ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

### 4.2 Oz Agent 的能力

Oz 是 Warp 内置的 Agent，由 OpenAI GPT 模型驱动，可以：

| 能力 | 说明 | 示例 |
|------|------|------|
| 📁 读写文件 | 直接操作项目文件 | "创建一个 React 组件" |
| 🔧 执行命令 | 在终端中运行命令 | "运行测试并修复失败的" |
| 🔍 代码搜索 | 搜索项目代码库 | "找到所有 TODO 注释" |
| 📦 依赖管理 | 安装/更新依赖 | "升级到 React 19" |
| 🐛 调试 | 分析错误/日志 | "这个 panic 是什么原因？" |
| 📝 Git 操作 | 提交、分支管理 | "创建一个 PR 描述" |
| 🌐 网络搜索 | 查询最新文档 | "React 19 的新 API 有哪些？" |

### 4.3 Oz 的工作流程

```
用户输入任务
      │
      ▼
┌─────────────┐
│  理解任务    │ ← Oz 分析上下文（当前目录、打开的文件、Git 状态）
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  制定计划    │ ← Oz 拆解为子任务，展示给你确认
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  执行操作    │ ← 读写文件、运行命令、搜索代码
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  验证结果    │ ← 运行测试、检查 lint，确认无误
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  汇报总结    │ ← 总结做了什么，列出变更
└─────────────┘
```

### 4.4 Agent 的安全边界

Oz 在执行危险操作前会**征求你的确认**：

- ✅ **自动执行**：读文件、搜索代码、格式化
- ⚠️ **需要确认**：写文件、执行命令、修改依赖
- 🔴 **需要审批**：删除文件、强制推送、修改 CI 配置

你可以随时**撤销** Oz 的任何文件修改。

---

## 第五章：代码编辑器与 LSP

### 5.1 内置代码编辑器

Warp 不只是终端 + Agent，它还有一个**完整的代码编辑器**：

```
┌──────────────────────────────────────────────────────┐
│  Warp 代码编辑器                                      │
│  ┌────────────┐  ┌──────────────────────────────────┐│
│  │  文件树     │  │  编辑器区域                       ││
│  │            │  │                                  ││
│  │ 📁 src/    │  │  1  use std::collections::...    ││
│  │  ├─ main.rs│  │  2                                ││
│  │  ├─ lib.rs │  │  3  fn main() {                  ││
│  │  └─ app/   │  │  4      let app = App::new();    ││
│  │     └─ mod │  │  5      app.run();               ││
│  │            │  │  6  }                             ││
│  │ 📁 tests/  │  │                                  ││
│  │ 📁 .github │  │  ← LSP 悬浮提示                   ││
│  │            │  │  ← 错误红色波浪线                  ││
│  └────────────┘  └──────────────────────────────────┘│
└──────────────────────────────────────────────────────┘
```

### 5.2 LSP 支持

Warp 内置 Language Server Protocol 支持，提供：

- **自动补全**：基于类型的智能补全（不仅仅是文本匹配）
- **跳转定义**：Ctrl+Click 跳转到函数/类型定义
- **查找引用**：查看符号的所有使用位置
- **悬浮文档**：鼠标悬停查看类型和文档
- **诊断信息**：实时的错误和警告（红色/黄色波浪线）
- **代码格式化**：保存时自动格式化
- **重命名符号**：安全的全局重命名

### 5.3 代码审查集成

Warp 支持直接在编辑器中审查代码变更：

- **Diff 视图**：并排显示修改前后的代码
- **Agent 审查**：Oz 可以逐行审查代码，给出建议
- **内联评论**：在特定行上添加评论
- **PR 集成**：关联 GitHub PR，审查后一键合并

---

## 第六章：接入第三方 CLI Agent

### 6.1 什么是 CLI Agent？

除了内置的 Oz，Warp 还支持接入**第三方 CLI Agent**——那些运行在终端中的 AI 编码助手：

| Agent | 特点 | 安装 |
|-------|------|------|
| **Claude Code** | Anthropic 的官方 Agent，强于推理 | `npm i -g @anthropic-ai/claude-code` |
| **Codex** | OpenAI 的 CLI Agent（原 Termina） | `npm i -g @openai/codex` |
| **Gemini CLI** | Google 的 CLI Agent | `npm i -g @google/gemini-cli` |
| **OpenCode** | 开源 CLI Agent | `pip install opencode` |

### 6.2 Warp 的 Agent Toolbelt

当你通过 Warp 运行第三方 CLI Agent 时，会自动获得「Agent Toolbelt」增强：

```
第三方 Agent（如 Claude Code）
          │
          ▼
    ┌─────────────┐
    │  Warp Toolbelt│  ← 透明增强层
    │              │
    │  • 富文本输入（多行编辑、语法高亮）
    │  • 代码审查视图（Agent 修改一键预览）
    │  • 通知系统（Agent 完成后推送）
    │  • 会话管理（多 Agent 并行）
    │  • 权限控制（文件/网络/命令审批）
    └─────────────┘
```

### 6.3 配置示例

在 Warp 设置中配置 Claude Code：

```json
{
  "cli_agents": [
    {
      "name": "Claude Code",
      "command": "claude",
      "working_directory": "${project_root}",
      "env": {
        "ANTHROPIC_API_KEY": "${env:ANTHROPIC_API_KEY}"
      }
    }
  ]
}
```

之后在 Agent 模式中选择「Claude Code」即可切换 Agent。

---

## 第七章：Warp Drive 云同步

### 7.1 什么是 Warp Drive？

Warp Drive 是 Warp 的云同步服务，将你的工作环境无缝同步到所有设备：

```
设备 A (公司 Mac)                    设备 B (家里 Linux)
     │                                     │
     │  同步内容：                          │
     │  • Shell 历史                        │
     │  • 环境变量                          │
     │  • 别名和函数                        │
     │  • 书签命令                          │
     │  • Agent 对话历史                    │
     │  • 主题和设置                        │
     │  • 工作区布局                        │
     │                                     │
     └────────────┬────────────────────────┘
                  │
           ┌──────▼──────┐
           │  Warp Drive  │
           │  (加密云存储) │
           └─────────────┘
```

### 7.2 核心功能

- **Workflows**：保存常用命令序列为「工作流」，一键执行
- **Notebooks**：将命令、输出和笔记组合为可分享的文档
- **团队共享**：Team 版可共享工作流和笔记本
- **端到端加密**：敏感数据（API Key 等）加密后上传

---

## 第八章：开源架构全景

### 8.1 仓库结构

```
warp/                               ← 根目录
├── app/                            ← 主应用代码
│   ├── terminal/                   ← 终端模拟
│   ├── ai/                         ← AI 集成（Agent Mode）
│   ├── drive/                      ← Warp Drive 云同步
│   ├── auth/                       ← 用户认证
│   ├── settings/                   ← 设置管理
│   └── workspace/                  ← 工作区/会话管理
├── crates/
│   ├── warp_core/                  ← 核心工具库，平台抽象
│   ├── warpui/                     ← WarpUI 框架公共 API
│   ├── warpui_core/                ← WarpUI 核心引擎
│   ├── editor/                     ← 代码编辑器
│   ├── command-signatures-v2/      ← 命令签名（补全用）
│   └── ...                         ← 更多 crate
├── ui/                             ← WarpUI 框架源码
│   ├── app/                        ← App 对象（全局）
│   ├── views/                      ← 视图组件
│   ├── elements/                   ← 视觉元素（Flutter 风格）
│   ├── actions/                    ← 事件/动作系统
│   └── models/                     ← 数据模型
├── .agents/                        ← Agent 配置和技能
│   └── skills/                     ← Oz Agent 技能定义
│       ├── warp-product.md
│       ├── warp-contributor.md
│       ├── warp-reviewer.md
│       └── warp-skills-creator.md
├── .claude/                        ← Claude Code 集成配置
├── specs/                          ← 功能规格说明
├── script/                         ← 构建/测试脚本
│   ├── bootstrap                   ← 平台初始化
│   ├── run                         ← 运行
│   ├── presubmit                   ← 提交前检查
│   └── ...
├── WARP.md                         ← 工程指南
├── CONTRIBUTING.md                 ← 贡献指南
├── FAQ.md                          ← 常见问题
└── LICENSE                         ← AGPL v3 + MIT
```

### 8.2 双许可证模型

| 组件 | 许可证 | 含义 |
|------|--------|------|
| `warpui_core` + `warpui` | **MIT** | UI 框架可自由使用，包括商业闭源 |
| 其余所有代码 | **AGPL v3** | 修改后必须开源；网络使用也触发开源义务 |

### 8.3 WarpUI 架构设计

WarpUI 是 Warp 自研的 UI 框架，核心设计理念：

```
┌────────────────────────────────────────┐
│              App (全局)                 │
│  ┌────────────────────────────────────┐│
│  │       Entity (实体)                 ││
│  │  • 每个 View/Model 是一个 Entity   ││
│  │  • 由 App 统一管理生命周期         ││
│  └────────────────────────────────────┘│
│  ┌────────────────────────────────────┐│
│  │    ViewHandle<T> (视图句柄)        ││
│  │  • 视图间引用用 Handle 而非指针    ││
│  │  • 安全的跨视图通信                 ││
│  └────────────────────────────────────┘│
│  ┌────────────────────────────────────┐│
│  │    AppContext (临时上下文)          ││
│  │  • 渲染/事件处理期间的临时访问     ││
│  │  • 防止生命周期问题                 ││
│  └────────────────────────────────────┘│
└────────────────────────────────────────┘
```

**关键设计模式：**

1. **Entity-Component-Handle**：类似 ECS 的架构，但没有严格的 System 概念
2. **Element 树**：受 Flutter 启发的声明式布局
3. **Actions 系统**：统一的事件分发机制
4. **MouseStateHandle**：鼠标状态必须在构造时创建一次，之后所有需要鼠标交互的地方引用/克隆它。如果在渲染时内联创建 `MouseStateHandle::default()`，会导致无任何鼠标交互。

### 8.4 关键依赖

| 依赖 | 版本/说明 | 用途 |
|------|-----------|------|
| **Tokio** | 异步运行时 | 核心异步框架 |
| **NuShell** | 现代 Shell | 命令解析与执行 |
| **Alacritty** | GPU 加速终端 | 终端渲染引擎 |
| **Hyper** | HTTP 库 | 网络通信 |
| **FontKit** | 字体渲染 | 文本显示 |
| **Diesel** | ORM | SQLite 数据库操作 |
| **GraphQL** | API 查询 | 前后端通信 |
| **rustls** | TLS | 加密通信 |

### 8.5 平台支持细节

```
                ┌──────────┐
                │  Warp UI  │  ← WarpUI (自研框架)
                └─────┬────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   ┌────▼────┐  ┌────▼────┐  ┌────▼────┐
   │  macOS  │  │  Linux  │  │ Windows │
   │ (Metal) │  │ (Vulkan)│  │ (DX12)  │
   └─────────┘  └─────────┘  └─────────┘
                      │
                ┌─────▼─────┐
                │   WASM    │  ← 浏览器中运行
                └───────────┘
```

### 8.6 Feature Flags 系统

```toml
# Cargo.toml 中的关键 feature flags
[features]
default = []
with_local_server = []  # 启用本地 warp-server 连接
v2 = []                 # 启用 V2 版本的补全系统
```

---

## 第九章：从源码构建 Warp

### 9.1 环境准备

**macOS：**
```bash
# 安装 Xcode Command Line Tools
xcode-select --install

# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 安装额外工具
cargo install cargo-nextest cargo-bundle
./script/install_cargo_build_deps
```

**Linux (Ubuntu/Debian)：**
```bash
# 安装系统依赖
sudo apt-get update
sudo apt-get install -y \
  build-essential pkg-config \
  libssl-dev libgtk-3-dev \
  libwebkit2gtk-4.1-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev

# 安装 Rust 和 Cargo 工具
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install cargo-nextest cargo-bundle
```

**Windows：**
```bash
# 安装 Visual Studio Build Tools
# 下载: https://visualstudio.microsoft.com/downloads/
# 选择 "Desktop development with C++" 工作负载

# 安装 Rust
# 下载 rustup-init.exe: https://rustup.rs/

# 安装工具
cargo install cargo-nextest cargo-bundle
```

### 9.2 构建流程

```bash
# 1. 平台初始化
./script/bootstrap

# 2. 构建（debug 模式）
cargo run

# 3. 构建（release 模式，优化性能）
cargo run --release

# 4. 打包为可分发的应用
cargo bundle --bin warp

# 5. 仅检查编译（不运行）
cargo check
```

### 9.3 测试

```bash
# 运行全部测试（排除 command-signatures-v2）
cargo nextest run --no-fail-fast --workspace --exclude command-signatures-v2

# 运行特定 crate 的测试
cargo nextest run -p warp_completer --features v2

# 运行文档测试
cargo test --doc

# 运行标准测试（单个包）
cargo test -p warp_core
```

### 9.4 代码质量检查

```bash
# 一键运行所有检查
./script/presubmit

# 单独运行格式化
cargo fmt

# 单独运行 Clippy（严格模式）
cargo clippy --workspace --all-targets --all-features --tests -- -D warnings

# 格式化 C/C++/Objective-C 代码
./script/run-clang-format.py -r --extensions 'c,h,cpp,m' ./crates/warpui/src/ ./app/src/

# 检查 WGSL Shader 格式
find . -name "*.wgsl" -exec wgslfmt --check {} +
```

### 9.5 常见构建问题

| 问题 | 解决方案 |
|------|----------|
| `linker 'cc' not found` | 安装 build-essential / Xcode CLT |
| `openssl-sys` 编译失败 | Linux: `apt install libssl-dev`；macOS: `brew install openssl` |
| WASM 构建失败 | 安装 `wasm-pack` 和目标 `rustup target add wasm32-unknown-unknown` |
| 内存不足 | 使用 `cargo build -j 2` 限制并行编译数 |

---

## 第十章：参与贡献 Warp

### 10.1 贡献流程全景

```
发现/提出 Issue
      │
      ▼
┌──────────────┐
│  Issue Triage │ ← Warp 团队评估，打标签
└──────┬───────┘
       │
       ├── Bug: ready-to-implement（直接修）
       │
       └── Feature: ready-to-spec（先写 Spec）
              │
              ▼
       ┌──────────────┐
       │  Spec PR      │ ← product.md + tech.md
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │  ready-to-    │ ← Spec 通过，可以写代码
       │  implement    │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │  Code PR      │ ← 实现代码
       └──────┬───────┘
              │
              ▼
       ┌──────────────────────────────┐
       │  Oz Agent 自动初审            │
       │  • 检查代码风格               │
       │  • 验证与 Spec 的一致性       │
       │  • 运行测试                   │
       └──────┬───────────────────────┘
              │ (Oz 通过后)
              ▼
       ┌──────────────────────────────┐
       │  Warp 团队成员人工复审        │
       │  • 架构审查                   │
       │  • 设计一致性                 │
       │  • 最终合并                   │
       └──────────────────────────────┘
```

### 10.2 Spec PR 的写法

在 `specs/GH<issue-number>/` 目录下创建两个文件：

**`product.md`**（产品规格——用户视角）：
```markdown
# Feature: 支持自定义快捷键

## 用户故事
作为开发者，我希望能够自定义 Warp 的所有快捷键。

## 验收标准
- [ ] 设置页面新增"快捷键"标签
- [ ] 支持搜索已有快捷键
- [ ] 修改快捷键后即时生效
- [ ] 冲突检测与提示
- [ ] 提供"恢复默认"按钮
```

**`tech.md`**（技术方案——实现视角）：
```markdown
# 技术方案：自定义快捷键

## 架构
- 新增 `keybindings/` 模块
- 存储格式：JSON（用户目录下）
- 注册表：`HashMap<Action, Vec<KeyBinding>>`

## 数据流
1. 用户修改快捷键 → 写入 JSON
2. Warp 启动时加载 JSON → 覆盖默认值
3. 按键事件 → 查表 → 分发 Action

## 风险
- 快捷键冲突需要运行时检测
- 需兼容所有平台（macOS Cmd vs Ctrl）
```

### 10.3 Oz Agent 辅助开发

Warp 仓库内置了面向 Oz Agent 的技能文件（`.agents/skills/`）：

| 技能文件 | 用途 |
|----------|------|
| `warp-product.md` | 帮助 Oz 理解 Warp 产品定位 |
| `warp-contributor.md` | 指导 Oz 如何帮助贡献者 |
| `warp-reviewer.md` | Oz 的代码审查逻辑 |
| `warp-skills-creator.md` | 帮助创建新的 Agent 技能 |

### 10.4 Issue 标签体系

| 标签 | 含义 | 你的下一步 |
|------|------|-----------|
| `ready-to-spec` | 问题清楚，等待规格设计 | 提交 Spec PR |
| `ready-to-implement` | 设计已定/已确认 Bug | 提交 Code PR |
| `needs-mocks` | 需要设计稿 | 等待 Warp 团队出设计 |
| `good-first-issue` | 新手友好 | 认领并开始 |

### 10.5 PR 审查流程

当你提交 PR 后：

1. **Oz Agent** 自动分配，生成初步审查意见
2. 根据 Oz 反馈修改代码
3. 在 PR 中评论 `/oz-review`（最多 3 次）请求重新审查
4. Oz 通过后，自动请求 **Warp 团队专家**进行人工复审
5. 如果卡住了，在 PR 中 `@oss-maintainers` 请求帮助

### 10.6 提交 Bug 报告的最佳实践

使用 `/feedback` 命令（在 Warp 中输入），它会自动附带：
- Warp 版本（`Settings → About`）
- 操作系统信息
- 日志文件
- 当前环境配置

或者手动提交 Issue，确保包含：
1. **复现步骤**（精确到每次点击/输入）
2. **预期行为 vs 实际行为**
3. **Warp 版本和 OS**
4. **截图或录屏**

---

## 第十一章：FAQ

### Q1: Warp 完全免费吗？

**A:** 是的，Warp 客户端完全免费。开源后更是如此。Warp 的商业化通过以下方式：
- **Warp Team**：团队协作功能（付费）
- **Oz**：Agent 编排平台的商业版本
- 客户端永不过期、无功能限制

### Q2: 我的数据安全吗？

**A:** Warp Drive 使用端到端加密。你还可以：
- 完全离线使用（不登录账号）
- 选择不同步敏感数据
- 自建 warp-server（AGPL 开源）

### Q3: 可以用自己的 API Key 吗？

**A:** Oz Agent 默认使用 Warp 提供的模型。但第三方 CLI Agent（Claude Code 等）使用你自己的 API Key——Warp 只是提供容器。

### Q4: Warp 支持哪些 Shell？

**A:** Warp 内置 NuShell，也兼容：
- **bash / zsh / fish**：作为子进程运行
- **PowerShell**：Windows 原生支持
- 任何有 PTY 接口的 Shell

### Q5: 我的 PR 一直没人审查怎么办？

**A:** 
1. 先确认 Oz 已经通过（评论 `/oz-review`）
2. 如果 Oz 通过后 48 小时无人工审查，`@oss-maintainers`
3. 加入 [Warp Slack](https://go.warp.dev/join-preview) 的 `#oss-contributors` 频道直接沟通

### Q6: 为什么 Feature 需要先写 Spec PR？

**A:** Spec PR 让产品规格和技术方案在写代码前就被审查，避免：
- 实现方向错误导致 PR 被拒
- 浪费贡献者的时间
- 架构不一致导致的技术债务

### Q7: Warp 和 Warp（Cloudflare）有关系吗？

**A:** 完全无关。Warp（Cloudflare）是 VPN/代理服务；Warp（warp.dev）是终端+Agent 开发环境。只是重名。

---

## 附录：速查表与资源

### 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+`` | 切换 Agent 模式 |
| `Ctrl+Shift+C` | 复制当前块输出 |
| `Ctrl+Shift+E` | 打开代码编辑器 |
| `Ctrl+Shift+P` | 命令面板 |
| `Ctrl+Shift+N` | 新窗口 |
| `Ctrl+Shift+T` | 恢复关闭的标签页 |
| `Ctrl+\` | 水平分屏 |
| `Ctrl+Shift+\` | 垂直分屏 |
| `Ctrl+K` | 清除当前窗格 |

### 核心链接

| 资源 | 地址 |
|------|------|
| 官网 | [warp.dev](https://www.warp.dev) |
| GitHub 仓库 | [github.com/warpdotdev/warp](https://github.com/warpdotdev/warp) |
| 贡献者面板 | [build.warp.dev](https://build.warp.dev) |
| 文档 | [docs.warp.dev](https://docs.warp.dev) |
| 开源公告 | [warp.dev/blog/warp-is-now-open-source](https://www.warp.dev/blog/warp-is-now-open-source) |
| Oz 平台 | [oz.dev](https://www.oz.dev) |
| Slack 社区 | [go.warp.dev/join-preview](https://go.warp.dev/join-preview) |
| Issue 模板 | [github.com/warpdotdev/warp/issues/new/choose](https://github.com/warpdotdev/warp/issues/new/choose) |

### 为什么你应该关注 Warp？

```
传统开发流程：
  写代码 → 切到终端运行 → 看报错 → 切回编辑器修改 → 循环...

Warp 开发流程：
  在 Warp 中写代码 → Agent 实时分析 → 一键运行 → Agent 解读输出
  → Agent 提出修复 → 审查后应用 → 提交 PR → Oz 自动审查 → 合并

  所有操作在同一个窗口中完成，Agent 全程辅助。
```

---

> 📝 **小黑笔记**：本教程基于 Warp 开源首版（2026-04-28）编写，仓库持续活跃更新中（50K+ Stars, 日增 8K+），建议收藏本文档并定期回顾官方 CHANGELOG。
>
> 有任何问题，去 Warp Slack 的 `#oss-contributors` 频道吼一嗓子，社区非常友好！
