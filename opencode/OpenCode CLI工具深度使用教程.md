# OpenCode CLI 工具深度使用教程

> OpenCode 是一款专为终端打造的开源 AI 编程助手，支持 75+ 种大语言模型提供商，让开发者能够在终端中享受智能编程辅助。

## 一、OpenCode 概述

### 1.1 什么是 OpenCode

OpenCode 是由 opencode-ai 社区开发的**开源 AI 编程代理工具**（AI Coding Agent），它完全不同于传统的代码补全插件，而是一个能够在终端环境中与开发者进行深度协作的智能助手。与 Claude Code、Github Copilot 等商业工具不同，OpenCode 的核心优势在于：

- **完全开源透明**：代码托管在 GitHub，接受社区监督审查
- **多模型自由切换**：不绑定任何特定模型提供商，支持 75+ 种 LLM 服务商
- **隐私安全保障**：支持本地部署，数据完全由用户掌控
- **终端原生体验**：基于 Bubble Tea 构建的 TUI（Terminal User Interface，终端用户界面）

OpenCode 采用 Go 语言编写，以 MIT 协议发布，**GitHub 星标数超过 4.6 万**，每月有超过 65 万开发者使用。

### 1.2 OpenCode 的核心特性

OpenCode 具备以下核心特性，这些特性使其区别于其他 AI 编程工具：

| 特性 | 说明 |
|------|------|
| **交互式终端界面** | 利用 Bubble Tea 库提供流畅的终端交互体验，支持键盘导航和快捷键操作 |
| **会话管理** | 可储存和管理多个会话，支持持久化存储，随时恢复工作进度 |
| **自定义命令** | 支持自定义命令，可预设多个占位符和参数，扩展工具能力 |
| **LSP 集成** | 提供 Language Server Protocol（语言服务器协议）集成，支持代码智能补全和诊断功能 |
| **MCP 协议支持** | 支持 Model Context Protocol（MCP，模型上下文协议），可扩展更多功能 |
| **多提供商支持** | 兼容 OpenAI、Anthropic Claude、Google Gemini、Groq、AWS Bedrock、Azure OpenAI 等 |

### 1.3 OpenCode 与 Claude Code 的对比

很多开发者会将 OpenCode 与 Claude Code 进行对比，以下是主要差异：

| 对比维度 | OpenCode | Claude Code |
|---------|----------|-------------|
| **开源状态** | 完全开源（MIT 协议） | 闭源商业产品 |
| **模型绑定** | 不绑定，支持 75+ 提供商 | 深度绑定 Anthropic 模型 |
| **部署方式** | 本地、远程、云端均可 | 主要云端服务 |
| **定价模式** | 免费，仅需 API 费用 | 订阅制 + API 费用 |
| **定制能力** | 高度可配置和扩展 | 有限的定制能力 |

---

## 二、安装指南

### 2.1 系统要求

在安装 OpenCode 之前，请确保你的系统满足以下要求：

| 组件 | 最低要求 | 推荐配置 |
|------|----------|----------|
| **操作系统** | Windows 10/11（64位）、macOS 10.15+、Linux（Ubuntu 20.04+） | 最新版本 |
| **内存** | 4GB RAM | 8GB RAM 及以上 |
| **磁盘空间** | 100MB | 500MB 及以上 |
| **网络** | 能访问互联网（用于 API 调用） | 稳定的网络连接 |

> **注意**：Windows 用户建议使用 WSL（Windows Subsystem for Linux，Windows 子系统 for Linux）以获得最佳体验。

### 2.2 安装方式

OpenCode 提供了多种安装方式，你可以根据自己的环境选择最适合的方法。

#### 2.2.1 官方一键安装脚本（推荐）

这是最简单快捷的安装方式，适用于 macOS 和 Linux：

```bash
# 官方一键安装脚本
curl -fsSL https://opencode.ai/install | bash
```

如果需要自定义安装目录，可以设置环境变量：

```bash
# 安装到自定义目录
OPENCODE_INSTALL_DIR=$HOME/.local/bin curl -fsSL https://opencode.ai/install | bash
```

#### 2.2.2 Homebrew 安装（macOS）

macOS 用户可以通过 Homebrew 包管理器安装：

```bash
# 添加 tap 并安装
brew install opencode-ai/tap/opencode

# 或者安装桌面客户端
brew install --cask opencode-desktop
```

#### 2.2.3 npm / Bun / Yarn 安装

如果你已经安装了 Node.js，可以使用 npm、Yarn 或 Bun 进行安装：

```bash
# 使用 npm 安装（推荐 Windows 用户）
npm install -g opencode-ai@latest

# 使用 Yarn 安装
yarn global add opencode-ai

# 使用 Bun 安装
bun install -g opencode-ai
```

#### 2.2.4 Go 工具链安装

如果你已经安装了 Go 工具链，可以通过 `go install` 命令安装：

```bash
go install github.com/opencode-ai/opencode@latest
```

#### 2.2.5 Arch Linux 用户

Arch Linux 用户可以通过 AUR（Arch User Repository，用户仓库）安装：

```bash
# 使用 yay 或 paru 安装
yay -S opencode-ai-bin
# 或
paru -S opencode-ai-bin
```

### 2.3 验证安装

安装完成后，通过以下命令验证是否安装成功：

```bash
# 检查版本
opencode --version

# 预期输出类似：
# opencode version v0.x.x
```

### 2.4 启动 OpenCode

安装验证成功后，可以通过以下命令启动 OpenCode：

```bash
# 直接启动（进入交互式 TUI 界面）
opencode

# 以只读模式启动（仅对话，不执行工具操作）
opencode --read-only

# 查看帮助信息
opencode --help
```

---

## 三、配置指南

### 3.1 配置文件位置

OpenCode 采用**分层配置加载机制**，支持从多个位置加载配置，配置会按优先级合并。配置文件搜索顺序如下：

```
1. 环境变量 OPENCODE_CONFIG_CONTENT（最高优先级）
2. 环境变量 OPENCODE_CONFIG 指定的文件
3. 当前项目目录下的 opencode.json 或 opencode.jsonc
4. ~/.config/opencode/opencode.json（用户级配置）
5. 系统默认配置
```

> **配置合并规则**：优先级高的配置会覆盖优先级低的配置，未配置的选项会使用默认值。

#### 3.1.1 项目级配置文件

在项目根目录创建配置文件：

```json
// ./opencode.json
{
  "version": "1.0",
  "provider": "openai",
  "model": "gpt-4o",
  "temperature": 0.7,
  "maxTokens": 4096,
  "apiKey": "${OPENAI_API_KEY}",
  "autoShare": false,
  "shell": "/bin/bash"
}
```

#### 3.1.2 用户级配置文件

在用户配置目录下创建全局配置文件：

```json
// ~/.config/opencode/opencode.json
{
  "version": "1.0",
  "defaultProvider": "anthropic",
  "defaultModel": "claude-sonnet-4-20250514",
  "temperature": 0.3,
  "autoSaveSessions": true,
  "shell": "${SHELL}"
}
```

> **提示**：使用 `${VAR_NAME}` 语法可以引用环境变量，避免在配置文件中直接写入敏感信息。

### 3.2 环境变量配置

OpenCode 支持通过环境变量进行快速配置，以下是常用的环境变量：

#### 3.2.1 基础配置变量

| 环境变量 | 功能说明 | 默认值 | 示例设置 |
|----------|----------|--------|----------|
| `OPENCODE_CONFIG` | 指定自定义配置文件路径 | `~/.config/opencode/opencode.json` | `~/projects/opencode/config.json` |
| `OPENCODE_CONFIG_CONTENT` | 直接提供配置内容（JSON 格式字符串） | 无 | `'{"provider":"openai"}'` |
| `OPENCODE_INSTALL_DIR` | 控制安装目录 | 自动检测 | `$HOME/.local/bin` |
| `XDG_BIN_DIR` | XDG 兼容的二进制目录 | 自动检测 | `$HOME/.local/bin` |

#### 3.2.2 功能控制变量

| 环境变量 | 功能说明 | 默认值 | 推荐场景 |
|----------|----------|--------|----------|
| `OPENCODE_AUTO_SHARE` | 自动分享新会话 | `false` | 协作开发时启用 |
| `OPENCODE_DISABLE_WATCHER` | 禁用文件监控 | `false` | 大型项目性能优化 |
| `OPENCODE_DISABLE_AUTOUPDATE` | 禁用自动更新 | `false` | 生产环境稳定性优先 |
| `OPENCODE_LOG_LEVEL` | 日志级别 | `info` | `debug` 用于排查问题 |

#### 3.2.3 API 密钥环境变量

| 环境变量 | 适用提供商 | 说明 |
|----------|------------|------|
| `OPENAI_API_KEY` | OpenAI | GPT 系列模型的 API 密钥 |
| `ANTHROPIC_API_KEY` | Anthropic | Claude 系列模型的 API 密钥 |
| `GOOGLE_API_KEY` | Google AI | Gemini 模型的 API 密钥 |
| `GROQ_API_KEY` | Groq | Groq 推理服务的 API 密钥 |
| `VERTEXAI_PROJECT` | Google Cloud VertexAI | GCP 项目 ID |
| `VERTEXAI_LOCATION` | Google Cloud VertexAI | GCP 区域 |
| `AWS_ACCESS_KEY_ID` | AWS Bedrock | AWS 访问密钥 ID |
| `AWS_SECRET_ACCESS_KEY` | AWS Bedrock | AWS 密钥访问密钥 |
| `AWS_REGION` | AWS Bedrock | AWS 区域 |
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI | Azure 端点 URL |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI | Azure API 密钥 |
| `AZURE_OPENAI_API_VERSION` | Azure OpenAI | Azure API 版本 |
| `LOCAL_ENDPOINT` | 本地模型 | 本地模型服务地址 |

### 3.3 API 提供商配置

OpenCode 支持配置多个 LLM（Large Language Model，大语言模型）提供商，以下是主流提供商的配置方法。

#### 3.3.1 OpenAI 配置

OpenAI 是最常见的 LLM 提供商，提供 GPT-4o、GPT-4 Turbo 等模型。

**方法一：通过环境变量配置**

```bash
# 设置 API 密钥
export OPENAI_API_KEY="sk-your-api-key-here"

# 启动 OpenCode
opencode
```

**方法二：通过配置文件配置**

```json
// opencode.json
{
  "providers": {
    "openai": {
      "apiKey": "${OPENAI_API_KEY}",
      "baseURL": "https://api.openai.com/v1",
      "models": [
        "gpt-4o",
        "gpt-4o-mini",
        "gpt-4-turbo",
        "gpt-4",
        "gpt-3.5-turbo"
      ]
    }
  },
  "defaultProvider": "openai",
  "defaultModel": "gpt-4o"
}
```

#### 3.3.2 Anthropic Claude 配置

Anthropic 提供的 Claude 系列模型以其长上下文理解和安全性著称。

**方法一：通过环境变量配置**

```bash
# 设置 API 密钥
export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"

# 启动 OpenCode
opencode
```

**方法二：通过配置文件配置**

```json
// opencode.json
{
  "providers": {
    "anthropic": {
      "apiKey": "${ANTHROPIC_API_KEY}",
      "baseURL": "https://api.anthropic.com/v1",
      "models": [
        "claude-sonnet-4-20250514",
        "claude-opus-4-20250514",
        "claude-haiku-3-20250514"
      ]
    }
  },
  "defaultProvider": "anthropic",
  "defaultModel": "claude-sonnet-4-20250514"
}
```

#### 3.3.3 Google Gemini 配置

Google 的 Gemini 系列模型提供强大的多模态能力。

**方法一：通过环境变量配置**

```bash
# 设置 API 密钥
export GOOGLE_API_KEY="your-google-api-key"

# 启动 OpenCode
opencode
```

**方法二：通过 VertexAI 配置（企业级）**

```bash
# 设置 GCP 配置
export VERTEXAI_PROJECT="your-gcp-project-id"
export VERTEXAI_LOCATION="us-central1"
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

```json
// opencode.json
{
  "providers": {
    "google": {
      "apiKey": "${GOOGLE_API_KEY}",
      "project": "${VERTEXAI_PROJECT}",
      "location": "${VERTEXAI_LOCATION}",
      "models": [
        "gemini-2.0-flash-exp",
        "gemini-1.5-pro",
        "gemini-1.5-flash"
      ]
    }
  }
}
```

#### 3.3.4 Groq 配置

Groq 提供超高速推理服务，适合对延迟敏感的应用场景。

```bash
# 设置 API 密钥
export GROQ_API_KEY="gsk-your-key-here"
```

```json
// opencode.json
{
  "providers": {
    "groq": {
      "apiKey": "${GROQ_API_KEY}",
      "baseURL": "https://api.groq.com/openai/v1",
      "models": [
        "llama-4-scout-17b-16e-instruct",
        "qwq-32b",
        "deepseek-r1-distill-llama-70b",
        "llama-3.3-70b-versatile"
      ]
    }
  }
}
```

#### 3.3.5 AWS Bedrock 配置

AWS Bedrock 提供企业级的 Claude 模型托管服务。

```bash
# 设置 AWS 凭证
export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
export AWS_REGION="us-east-1"
```

```json
// opencode.json
{
  "providers": {
    "bedrock": {
      "region": "${AWS_REGION}",
      "models": [
        "us.anthropic.claude-sonnet-4-20250514",
        "us.anthropic.claude-opus-4-20250514",
        "us.anthropic.claude-haiku-3-20250514"
      ]
    }
  }
}
```

#### 3.3.6 Azure OpenAI 配置

Azure OpenAI 提供企业级的 OpenAI 模型托管服务。

```bash
# 设置 Azure 配置
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
export AZURE_OPENAI_API_KEY="your-azure-api-key"
export AZURE_OPENAI_API_VERSION="2024-02-15-preview"
```

```json
// opencode.json
{
  "providers": {
    "azure": {
      "endpoint": "${AZURE_OPENAI_ENDPOINT}",
      "apiKey": "${AZURE_OPENAI_API_KEY}",
      "apiVersion": "${AZURE_OPENAI_API_VERSION}",
      "models": [
        "gpt-4o",
        "gpt-4-turbo",
        "gpt-35-turbo"
      ]
    }
  }
}
```

#### 3.3.7 本地模型配置

OpenCode 支持通过 Ollama 等工具连接本地模型。

```bash
# 确保 Ollama 正在运行
export LOCAL_ENDPOINT="http://localhost:11434"
```

```json
// opencode.json
{
  "providers": {
    "ollama": {
      "endpoint": "${LOCAL_ENDPOINT}",
      "models": [
        "llama3.2",
        "qwen2.5-coder",
        "deepseek-coder"
      ]
    }
  }
}
```

---

## 四、核心命令详解

### 4.1 基础命令

OpenCode CLI 提供了丰富的命令，以下是常用命令的详细说明。

#### 4.1.1 启动命令

```bash
# 启动交互式 TUI 界面
opencode

# 以只读模式启动（仅对话，不执行工具操作）
opencode --read-only

# 使用指定提供商启动
opencode --provider openai

# 使用指定模型启动
opencode --model gpt-4o

# 查看帮助信息
opencode --help

# 查看版本信息
opencode --version
```

#### 4.1.2 认证命令

```bash
# 登录认证
opencode auth login

# 登出
opencode auth logout

# 查看当前认证状态
opencode auth status
```

#### 4.1.3 会话管理命令

```bash
# 列出所有会话
opencode sessions list

# 恢复指定会话
opencode sessions restore <session-id>

# 导出会话
opencode sessions export <session-id>

# 删除会话
opencode sessions delete <session-id>
```

### 4.2 交互式命令

在 OpenCode 的 TUI 界面中，可以使用以下快捷键和命令：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + C` | 取消当前操作 |
| `Ctrl + D` | 退出 OpenCode |
| `Ctrl + L` | 清除屏幕 |
| `Tab` | 自动补全 |
| `↑ / ↓` | 命令历史导航 |
| `Ctrl + R` | 搜索命令历史 |

### 4.3 非交互式命令

OpenCode 支持在非交互式模式下运行，适合脚本和自动化任务：

```bash
# 快速查询模式（Query Mode）
opencode -p "Explain the use of context in Go" -q

# 此模式下 OpenCode 会处理提示词，将结果打印到标准输出，然后退出
# 所有权限会自动批准
```

---

## 五、工具系统详解

OpenCode 内置了 20+ 个编程工具，覆盖文件操作、代码编辑、搜索查询、版本控制等开发全流程。以下是核心工具的详细说明。

### 5.1 文件操作工具

| 工具名称 | 功能说明 | 使用场景 |
|----------|----------|----------|
| `glob` | 查找匹配文件模式的文件 | 批量查找特定类型的文件 |
| `read` | 读取文件内容 | 查看源代码或配置文件 |
| `edit` | 编辑文件内容 | 修改代码或文本 |
| `write` | 创建或覆盖文件 | 新建文件或完整重写 |
| `exec` | 执行 Shell 命令 | 运行脚本或构建命令 |

#### 5.1.1 glob 工具使用示例

```markdown
# 在项目中查找所有 TypeScript 文件
glob **/*.ts

# 查找包含 "auth" 关键字的配置文件
glob **/*auth*.{json,yaml,yml}

# 查找 src 目录下所有文件
glob src/**/*
```

#### 5.1.2 read 工具使用示例

```markdown
# 读取单个文件
read package.json

# 读取指定行范围
read src/main.ts offset=10 limit=50
```

#### 5.1.3 edit 工具使用示例

```markdown
# 替换文本
edit src/app.ts oldString="function hello()" newString="function hello(): string { return 'Hello'; }"

# 插入文本
edit README.md oldString="## Installation\n" newString="## Installation\n\n1. Clone the repository\n2. Run npm install\n"
```

### 5.2 代码搜索工具

| 工具名称 | 功能说明 | 使用场景 |
|----------|----------|----------|
| `grep` | 文本内容搜索 | 在代码中查找特定字符串 |
| `ast_grep_search` | AST 模式搜索 | 基于抽象语法树的高级搜索 |
| `lsp_symbols` | 代码符号搜索 | 查找类、函数、变量定义 |
| `lsp_find_references` | 查找引用 | 查找符号的所有引用位置 |

#### 5.2.1 grep 工具使用示例

```markdown
# 搜索包含 "TODO" 的所有文件
grep "TODO"

# 搜索特定函数调用
grep "console.log($MSG)"

# 只在 TypeScript 文件中搜索
grep "useState" include="*.ts" include="*.tsx"
```

#### 5.2.2 ast_grep_search 工具使用示例

```markdown
# 搜索所有 console.log 调用
ast_grep_search pattern="console.log($MSG)" lang="typescript"

# 搜索所有 async 函数
ast_grep_search pattern="async function $NAME($$$): $$$" lang="typescript"
```

### 5.3 版本控制工具

| 工具名称 | 功能说明 | 使用场景 |
|----------|----------|----------|
| `bash` | 执行 Git 命令 | 查看提交历史、分支管理等 |
| `lsp_goto_definition` | 跳转到定义 | 快速导航到符号定义位置 |
| `lsp_prepare_rename` | 重命名准备 | 检查符号是否可重命名 |
| `lsp_rename` | 重命名符号 | 重构代码中的符号名称 |

### 5.4 终端执行工具

| 工具名称 | 功能说明 | 使用场景 |
|----------|----------|----------|
| `bash` | 执行任意 Shell 命令 | 运行脚本、安装依赖、构建项目等 |
| `shell` | 交互式 Shell 会话 | 需要持续交互的终端操作 |

#### 5.4.1 bash 工具使用示例

```markdown
# 安装项目依赖
bash npm install

# 运行测试
bash npm test

# 运行代码检查
bash npm run lint

# 查看 Git 状态
bash git status

# 查看提交历史
bash git log --oneline -10
```

---

## 六、自定义命令

OpenCode 支持创建自定义命令，可以将常用的操作序列封装为可复用的命令。

### 6.1 创建自定义命令

自定义命令存储在 `~/.config/opencode/commands/` 目录下，文件扩展名为 `.md`（Markdown 格式）。

#### 6.1.1 基本命令示例

创建文件 `~/.config/opencode/commands/prime-context.md`：

```markdown
# 准备上下文

RUN git ls-files
READ README.md
```

创建后，可以使用 `user:prime-context` 命令调用。

#### 6.1.2 带参数命令示例

创建文件 `~/.config/opencode/commands/fetch-context.md`：

```markdown
# Fetch Context for Issue $ISSUE NUMBER

RUN gh issue view $ISSUE_NUMBER --json title,body,comments
RUN git grep --author="$AUTHOR_NAME" -n .
RUN grep -R "$SEARCH_PATTERN" $DIRECTORY
```

当执行此命令时，OpenCode 会提示输入以下参数：

- `$ISSUE_NUMBER`：GitHub Issue 编号
- `$AUTHOR_NAME`：作者名称
- `$SEARCH_PATTERN`：搜索模式
- `$DIRECTORY`：搜索目录

### 6.2 命令组织管理

可以通过目录结构组织自定义命令：

```
~/.config/opencode/commands/
├── git/
│   ├── recent-commits.md
│   ├── branch-info.md
│   └── search-author.md
├── project/
│   ├── build.md
│   ├── test.md
│   └── lint.md
└── context/
    └── prime-context.md
```

---

## 七、Shell 配置

### 7.1 默认 Shell 设置

可以通过配置文件或环境变量设置 OpenCode 使用的默认 Shell：

```json
// opencode.json
{
  "shell": "/bin/bash",
  "shellArgs": ["--login", "-i"]
}
```

或通过环境变量设置：

```bash
export SHELL="/bin/zsh"
```

### 7.2 Shell 兼容性

OpenCode 支持多种 Shell：

| Shell | 路径示例 | 平台支持 |
|-------|----------|----------|
| Bash | `/bin/bash`, `/usr/bin/bash` | Linux, macOS, WSL |
| Zsh | `/bin/zsh`, `/usr/bin/zsh` | macOS, Linux |
| Fish | `/usr/bin/fish` | Linux, macOS |
| PowerShell | `pwsh.exe` | Windows, macOS, Linux |
| CMD | `cmd.exe` | Windows |

---

## 八、使用场景与最佳实践

### 8.1 代码重构

OpenCode 非常适合进行代码重构，以下是典型使用流程：

```markdown
# 1. 首先了解项目结构
opencode> 分析这个项目的代码结构

# 2. 查找需要重构的代码
glob **/*.py
grep "legacy_function"

# 3. 理解重构目标
opencode> 请分析 legacy_function 的用途，并提出重构建议

# 4. 执行重构
edit src/legacy.py oldString="..." newString="..."
```

### 8.2 Bug 调试

当遇到 bug 时，OpenCode 可以帮助快速定位和修复：

```markdown
# 1. 描述问题
opencode> 项目在运行 npm test 时报错 "TypeError: undefined is not a function"

# 2. 查看错误堆栈
bash npm test 2>&1 | head -50

# 3. 搜索相关代码
grep "undefined is not a function"

# 4. 分析根因并修复
edit src/utils.js oldString="..." newString="..."
```

### 8.3 架构分析

OpenCode 可以帮助理解大型项目的架构：

```markdown
# 1. 了解项目概览
read README.md
read package.json

# 2. 查看项目结构
glob **/*.ts
glob **/*.json

# 3. 分析模块关系
opencode> 请分析这个项目的模块依赖关系，绘制架构图
```

### 8.4 最佳实践建议

| 场景 | 建议 |
|------|------|
| **首次使用** | 先用只读模式（`--read-only`）熟悉交互方式 |
| **大型项目** | 设置 `OPENCODE_DISABLE_WATCHER=true` 提升性能 |
| **敏感项目** | 使用本地模型或自托管 API |
| **团队协作** | 使用 `OPENCODE_AUTO_SHARE=true` 共享会话 |
| **API 密钥管理** | 使用环境变量而非配置文件明文存储 |
| **调试问题** | 设置 `OPENCODE_LOG_LEVEL=debug` 查看详细日志 |

---

## 九、常见问题排查

### 9.1 安装问题

**问题：安装后找不到 `opencode` 命令**

```bash
# 检查是否在 PATH 中
echo $PATH

# 手动添加到 PATH（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export PATH="$HOME/.opencode/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 验证安装
which opencode
opencode --version
```

**问题：Windows 上安装失败**

```powershell
# 使用管理员权限打开 PowerShell
# 设置 npm 镜像源
npm config set registry https://registry.npmmirror.com

# 重新安装
npm install -g opencode-ai@latest
```

### 9.2 API 连接问题

**问题：API 密钥无效**

```bash
# 验证 API 密钥格式
echo $OPENAI_API_KEY

# 测试 API 密钥是否有效
curl -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models
```

**问题：模型不支持**

```json
// 检查配置文件中的模型名称
{
  "providers": {
    "openai": {
      "models": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"]
    }
  }
}
```

### 9.3 性能问题

**问题：大型项目响应缓慢**

```bash
# 禁用文件监控
export OPENCODE_DISABLE_WATCHER=true

# 降低日志级别
export OPENCODE_LOG_LEVEL=warning

# 使用更轻量的模型
opencode --model gpt-4o-mini
```

---

## 十、进阶技巧

### 10.1 多提供商切换

可以在会话中动态切换提供商：

```markdown
opencode> 使用 Claude 模型重写这段代码
opencode> 现在切换到 GPT-4o 模型
opencode> 继续使用 Groq 的 Llama 模型
```

### 10.2 系统提示词定制

通过配置文件定制系统行为：

```json
// opencode.json
{
  "systemPrompt": "你是一个专业的 Go 语言后端工程师，专注于代码质量和性能优化。回答时提供详细的技术分析和代码示例。",
  "temperature": 0.3,
  "maxTokens": 8192
}
```

### 10.3 代理配置

如果需要通过代理访问 API：

```bash
# 设置 HTTP/HTTPS 代理
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"

# 或者设置代理认证
export HTTP_PROXY="http://user:pass@127.0.0.1:7890"
```

### 10.4 会话导出与共享

```bash
# 导出当前会话
opencode sessions export current > session-2026-02-03.md

# 在团队中共享会话
opencode sessions export abc123 > shared-session.md
```

---

## 十一、参考资源

### 11.1 官方资源

| 资源 | 链接 |
|------|------|
| GitHub 仓库 | https://github.com/opencode-ai/opencode |
| 官方网站 | https://opencode.ai |
| 官方文档 | https://docs.opencode.ai |
| 下载地址 | https://opencode.ai/download |

### 11.2 相关工具

| 工具 | 说明 |
|------|------|
| Ollama | 本地模型运行工具 https://ollama.com |
| OneAPI | API 聚合平台 https://github.com/songquanpeng/one-api |
| LM Studio | 本地模型管理工具 https://lmstudio.ai |

### 11.3 社区资源

- GitHub Trending 排名：https://github.com/trending
- Models.dev Provider 列表：https://models.dev

---

## 附录：快速参考表

### A.1 常用命令速查

| 命令 | 说明 |
|------|------|
| `opencode` | 启动交互式界面 |
| `opencode --version` | 查看版本 |
| `opencode --help` | 查看帮助 |
| `opencode --read-only` | 只读模式启动 |
| `opencode -p "问题" -q` | 非交互式查询 |
| `opencode auth login` | 登录认证 |
| `opencode sessions list` | 列出会话 |

### A.2 环境变量速查

| 变量 | 说明 |
|------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 |
| `ANTHROPIC_API_KEY` | Anthropic API 密钥 |
| `GOOGLE_API_KEY` | Google API 密钥 |
| `GROQ_API_KEY` | Groq API 密钥 |
| `OPENCODE_CONFIG` | 配置文件路径 |
| `OPENCODE_LOG_LEVEL` | 日志级别 |
| `SHELL` | 默认 Shell |

### A.3 提供商与模型速查

| 提供商 | 热门模型 |
|--------|----------|
| OpenAI | gpt-4o, gpt-4o-mini, gpt-4-turbo |
| Anthropic | claude-sonnet-4, claude-opus-4, claude-haiku-3 |
| Google | gemini-2.0-flash, gemini-1.5-pro |
| Groq | llama-4-scout, qwq-32b, deepseek-r1 |
| AWS Bedrock | Claude 4 系列 |

---

> **文档版本**：v1.0  
> **更新日期**：2026-02-03  
> **作者**：OpenCode 中文社区
