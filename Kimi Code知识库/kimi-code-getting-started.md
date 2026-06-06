# Kimi Code CLI — 开始使用

> 来源：https://moonshotai.github.io/kimi-code/zh/guides/getting-started.html （2026-06-03 摘录）  
> ⚡ 适用版本：**0.8.0+**

---

## 一、Kimi Code CLI 是什么

Kimi Code CLI 是一个运行在终端中的 AI Agent，帮你完成软件开发任务和日常终端操作。它能：

- 阅读和编辑代码
- 执行 Shell 命令
- 搜索文件与抓取网页
- 根据反馈自主规划和调整下一步行动

### 适用场景

| 场景 | 说明 |
|:---|:---|
| **编写和修改代码** | 实现新功能、修复 bug、完成重构 |
| **理解项目** | 探索陌生代码库，解答架构和实现层面的问题 |
| **自动化任务** | 批量处理文件、运行构建与测试、串联多个脚本 |

> 整套 CLI 以 TypeScript 编写，通过 npm 分发，运行在 Node.js 之上。

---

## 二、安装

### 环境要求

- **Node.js** ≥ 18.20.8
- **npm** ≥ 10.x（推荐）
- **操作系统**：macOS / Linux / Windows

### 方式一：npm 全局安装（推荐）

```bash
npm install -g @moonshot-ai/kimi-code
```

### 方式二：脚本安装

```bash
# macOS / Linux
curl -fsSL https://kimi.com/code/install.sh | bash

# Windows (PowerShell)
irm https://kimi.com/code/install.ps1 | iex
```

### 方式三：包管理器安装

```bash
# macOS Homebrew
brew install moonshot-ai/tap/kimi-code

# Windows winget
winget install MoonshotAI.KimiCode

# Windows Scoop
scoop bucket add kimi-code https://github.com/moonshot-ai/scoop-kimi-code.git
scoop install kimi-code
```

---

## 三、⚡ 一键升级（0.8.0 新增）

Kimi Code CLI 内置了自升级命令，无需手动 npm 操作：

```bash
kimi update
```

执行后会检查最新版本并自动完成升级。

> 💡 这是 0.8.0 新增的关键功能，替代了之前需要手动 `npm install -g @moonshot-ai/kimi-code@latest` 的流程。

---

## 四、首次运行

```bash
kimi
```

首次运行会自动打开浏览器完成 Kimi 账号登录授权。登录后 CLI 会保存认证信息，后续无需重复登录。

### 认证相关

- 认证信息存储在本地 `~/.kimi/` 目录
- 支持多账户切换
- 登录过期后会自动提示重新认证

---

## 五、基本使用

### 交互模式

```bash
kimi
```

进入 TUI（终端用户界面），支持多行输入、文件引用、命令补全等。

### 非交互模式（Print 模式）

```bash
echo "帮我写一个 HTTP 服务器" | kimi --print
```

适合脚本调用和管道操作。

### 常用参数

| 参数 | 说明 |
|:---|:---|
| `--print` | 非交互模式，输出结果后退出 |
| `--model <name>` | 指定模型 |
| `--session <id>` | 继续已有会话 |
| `--workspace <path>` | 指定工作目录 |
| `--help` | 查看帮助 |

---

## 六、内置命令

在 TUI 中输入 `/` 查看可用命令：

| 命令 | 功能 |
|:---|:---|
| `/help` | 查看帮助 |
| `/clear` | 清除当前会话上下文 |
| `/model` | 切换模型 |
| `/plugins` | 打开 Plugin 管理器 |
| `/skills` | 管理 Agent Skills |
| `/mcp` | 管理 MCP servers |
| `/session` | 会话管理 |
| `/exit` | 退出 |

---

## 七、版本检查

```bash
kimi --version
```

当前最新：**0.8.0**

---

## 八、相关文档

| 文档 | 链接 |
|:---|:---|
| Plugins 系统 | `kimi-code-plugins.md` |
| Agent Skills | https://moonshotai.github.io/kimi-code/zh/customization/skills.html |
| MCP | https://moonshotai.github.io/kimi-code/zh/customization/mcp.html |
| 从 kimi-cli 迁移 | https://moonshotai.github.io/kimi-code/zh/guides/migration.html |
| 常用使用案例 | https://moonshotai.github.io/kimi-code/zh/guides/use-cases.html |
