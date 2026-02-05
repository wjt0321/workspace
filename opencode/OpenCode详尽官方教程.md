# OpenCode 详尽官方教程

> 基于 https://opencode.ai/docs 官方文档完整编写
> 
> 最后更新：2026年1月

---

## 目录

1. [什么是 OpenCode？](#什么是-opencode)
2. [安装指南](#安装指南)
3. [初始配置](#初始配置)
4. [终端用户界面 (TUI)](#终端用户界面-tui)
5. [配置文件详解](#配置文件详解)
6. [LLM 提供商配置](#llm-提供商配置)
7. [代理 (Agents)](#代理-agents)
8. [工具 (Tools)](#工具-tools)
9. [规则与指令 (Rules)](#规则与指令-rules)
10. [自定义命令 (Commands)](#自定义命令-commands)
11. [权限控制 (Permissions)](#权限控制-permissions)
12. [主题配置 (Themes)](#主题配置-themes)
13. [快捷键配置 (Keybinds)](#快捷键配置-keybinds)
14. [模型配置 (Models)](#模型配置-models)
15. [代码格式化 (Formatters)](#代码格式化-formatters)
16. [MCP 服务器](#mcp-服务器)
17. [会话共享 (Share)](#会话共享-share)
18. [GitHub 集成](#github-集成)
19. [OpenCode Zen](#opencode-zen)
20. [服务器模式 (Server)](#服务器模式-server)
21. [最佳实践](#最佳实践)
22. [故障排除](#故障排除)

---

## 什么是 OpenCode？

**OpenCode** (https://opencode.ai) 是一个开源 AI 编程助手，具有以下核心特点：

### 核心特性

| 特性 | 描述 |
|------|------|
| **开源免费** | GitHub 50K+ 星标，650,000+ 月活开发者 |
| **多平台** | 终端界面、桌面应用、IDE 扩展 |
| **隐私优先** | 代码默认不存储在服务器上 |
| **多模型支持** | 支持 75+ LLM 提供商 |
| **高度可配置** | 可定制主题、快捷键、工具、代理等 |
| **本地模型** | 支持 Ollama、LM Studio 等本地模型 |

### 工作模式

OpenCode 采用创新的双模式工作流：

1. **Plan Mode（计划模式）**
   - 分析代码、制定计划
   - 禁止修改文件，确保安全
   - 适合代码审查和设计讨论

2. **Build Mode（构建模式）**
   - 执行实际代码修改
   - 所有工具可用
   - 适合功能实现和调试

### 应用场景

- 代码解释和文档生成
- 新功能实现
- Bug 修复和调试
- 代码审查和重构
- 自动化 GitHub 工作流

---

## 安装指南

### 系统要求

**前置条件：**

1. **现代终端模拟器**（推荐）：
   - [WezTerm](https://wezterm.org) - 跨平台首选
   - [Alacritty](https://alacritty.org) - 高性能
   - [Ghostty](https://ghostty.org) - Linux/macOS
   - [Kitty](https://sw.kovidgoyal.net/kitty/) - Linux/macOS

2. **Node.js**（用于 npm/bun 安装）：v18+

3. **API Keys**：准备 LLM 提供商的 API key

### 安装方法

#### 方法 1：官方安装脚本（推荐）

```bash
# Linux/macOS/WSL2
curl -fsSL https://opencode.ai/install | bash
```

#### 方法 2：Node.js 包管理器

```bash
# npm
npm install -g opencode-ai

# Bun
bun install -g opencode-ai

# pnpm
pnpm install -g opencode-ai

# Yarn
yarn global add opencode-ai
```

#### 方法 3：Homebrew (macOS/Linux)

```bash
brew install anomalyco/tap/opencode
# 推荐使用 OpenCode tap 以获取最新版本
```

#### 方法 4：其他包管理器

**Paru (Arch Linux)**
```bash
paru -S opencode-bin
```

**Chocolatey (Windows)**
```bash
choco install opencode
```

**Scoop (Windows)**
```bash
scoop bucket add extras
scoop install extras/opencode
```

**Mise**
```bash
mise use -g github:anomalyco/opencode
```

**Docker**
```bash
docker run -it --rm ghcr.io/anomalyco/opencode
```

#### 手动安装

从 [GitHub Releases](https://github.com/anomalyco/opencode/releases) 下载预编译二进制文件。

### 验证安装

```bash
opencode --version
```

---

## 初始配置

### 连接 LLM 提供商

#### 使用 OpenCode Zen（推荐新手）

```bash
# 1. 启动 OpenCode
opencode

# 2. 在 TUI 中运行
/connect
# 选择 "opencode"

# 3. 访问 https://opencode.ai/auth 登录
# 4. 复制 API key 并粘贴到终端
```

#### 使用其他提供商

```bash
/opencode
# 选择 Anthropic、OpenAI、Google 等
# 按提示输入 API key
```

#### 环境变量方式

```bash
# 设置 API key
export ANTHROPIC_API_KEY=your-api-key
export OPENAI_API_KEY=your-api-key

# 启动 OpenCode
opencode
```

### 初始化项目

```bash
cd /path/to/your/project
opencode
/init
```

**重要提示**：`/init` 命令会：
1. 分析项目结构和内容
2. 生成 `AGENTS.md` 文件
3. 帮助 OpenCode 更好地理解项目

**建议**：将 `AGENTS.md` 提交到 Git，与团队共享。

---

## 终端用户界面 (TUI)

### 启动 TUI

```bash
# 基本启动
opencode

# 带参数启动
opencode /path/to/project          # 指定项目目录
opencode --continue                # 继续上次会话
opencode --session <id>            # 继续指定会话
opencode --prompt "Explain this"   # 带提示启动
opencode --model anthropic/claude  # 指定模型
opencode --agent plan              # 指定代理
```

### 核心交互方式

#### 文件引用 `@`

使用 `@` 符号引用项目中的文件：

```bash
# 模糊搜索文件
How is authentication handled in @packages/functions/src/api/index.ts

# 查看文件差异
Compare @src/old.ts and @src/new.ts
```

#### Shell 命令 `!`

以 `!` 开头执行 Shell 命令：

```bash
# 运行命令并获取输出
!ls -la
!npm test
!git status
```

### TUI 命令

| 命令 | 快捷键 | 描述 |
|------|--------|------|
| `/help` | `Ctrl+X H` | 显示帮助对话框 |
| `/connect` | - | 添加提供商 |
| `/init` | `Ctrl+X I` | 创建/更新 AGENTS.md |
| `/models` | `Ctrl+X M` | 列出可用模型 |
| `/new` | `Ctrl+X N` | 开始新会话 |
| `/sessions` | `Ctrl+X L` | 列出/切换会话 |
| `/share` | `Ctrl+X S` | 分享当前会话 |
| `/compact` | `Ctrl+X C` | 压缩当前会话 |
| `/undo` | `Ctrl+X U` | 撤销上次更改 |
| `/redo` | `Ctrl+X R` | 重做已撤销更改 |
| `/editor` | `Ctrl+X E` | 使用外部编辑器 |
| `/export` | `Ctrl+X X` | 导出会话为 Markdown |
| `/theme` | `Ctrl+X T` | 切换主题 |
| `/exit` | `Ctrl+X Q` | 退出 OpenCode |

### Plan/Build 模式切换

- **切换方式**：按 `Tab` 键
- **Plan Mode**：右下角显示 "Plan"，禁止文件修改
- **Build Mode**：右下角显示 "Build"，允许所有操作

### 快捷键速查

#### 消息导航

| 快捷键 | 功能 |
|--------|------|
| `PageUp` | 上一页 |
| `PageDown` | 下一页 |
| `Ctrl+Alt+U` | 上半页 |
| `Ctrl+Alt+D` | 下半页 |
| `Ctrl+G` / `Home` | 第一条 |
| `Ctrl+Alt+G` / `End` | 最后一条 |

#### 消息操作

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+X Y` | 复制消息 |
| `Ctrl+X U` | 撤销消息 |
| `Ctrl+X R` | 重做消息 |

#### 模型和代理

| 快捷键 | 功能 |
|--------|------|
| `F2` | 循环切换最近模型 |
| `Shift+F2` | 反向循环切换模型 |
| `Tab` | 切换主代理 |
| `Ctrl+P` | 命令列表 |
| `Ctrl+X A` | 代理列表 |

#### 输入操作

| 快捷键 | 功能 |
|--------|------|
| `Enter` | 提交 |
| `Shift+Enter` | 换行 |
| `Ctrl+A` | 行首 |
| `Ctrl+E` | 行尾 |
| `Ctrl+B` | 后退一个字符 |
| `Ctrl+F` | 前进一个字符 |
| `Alt+B` | 后退一个词 |
| `Alt+F` | 前进一个词 |
| `Ctrl+D` | 删除字符 |
| `Ctrl+K` | 删除到行尾 |
| `Ctrl+U` | 删除到行首 |
| `Ctrl+W` | 删除前一个词 |
| `Ctrl+C` | 清除输入 |

### 终端要求

对于完整的主题颜色支持，终端需要支持 **Truecolor (24-bit color)**：

```bash
# 检查支持
echo $COLORTERM
# 应输出: truecolor 或 24bit

# 启用支持
export COLORTERM=truecolor
```

---

## 配置文件详解

### 配置文件位置

OpenCode 支持多级配置文件，**按顺序合并而非替换**：

| 优先级 | 位置 | 说明 |
|--------|------|------|
| 1 | 远程配置 (`.well-known/opencode`) | 组织默认配置 |
| 2 | 全局配置 (`~/.config/opencode/opencode.json`) | 用户偏好 |
| 3 | 自定义路径 (`OPENCODE_CONFIG`) | 自定义覆盖 |
| 4 | 项目配置 (`./opencode.json`) | 项目特定设置 |
| 5 | `.opencode/` 目录 | 代理、命令、插件 |
| 6 | 内联配置 (`OPENCODE_CONFIG_CONTENT`) | 运行时覆盖 |

### 完整配置示例

```json
{
  "$schema": "https://opencode.ai/config.json",
  
  "theme": "opencode",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5",
  "default_agent": "build",
  "autoupdate": true,
  
  "provider": {
    "anthropic": {
      "options": {
        "apiKey": "{env:ANTHROPIC_API_KEY}",
        "timeout": 600000,
        "setCacheKey": true
      }
    }
  },
  
  "tools": {
    "write": true,
    "bash": true,
    "read": true,
    "edit": true,
    "webfetch": true
  },
  
  "agent": {
    "build": {
      "mode": "primary",
      "description": "Default development agent"
    },
    "plan": {
      "mode": "primary",
      "description": "Planning and analysis",
      "tools": {
        "write": false,
        "bash": false
      }
    }
  },
  
  "command": {
    "test": {
      "template": "Run tests and show failures",
      "description": "Run tests",
      "agent": "build"
    }
  },
  
  "permission": {
    "edit": "ask",
    "bash": "ask",
    "read": {
      "*": "allow",
      "*.env": "deny"
    }
  },
  
  "share": "manual",
  
  "formatter": {
    "prettier": {
      "disabled": false
    }
  },
  
  "mcp": {
    "filesystem": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  },
  
  "instructions": ["CONTRIBUTING.md", "docs/guidelines.md"],
  
  "tui": {
    "scroll_speed": 3,
    "scroll_acceleration": {
      "enabled": true
    }
  },
  
  "server": {
    "port": 4096,
    "hostname": "0.0.0.0",
    "mdns": true
  },
  
  "compaction": {
    "auto": true,
    "prune": true
  },
  
  "watcher": {
    "ignore": ["node_modules/**", "dist/**"]
  }
}
```

### 变量引用

#### 环境变量

```json
{
  "model": "{env:OPENCODE_MODEL}",
  "provider": {
    "anthropic": {
      "options": {
        "apiKey": "{env:ANTHROPIC_API_KEY}"
      }
    }
  }
}
```

#### 文件引用

```json
{
  "instructions": ["./custom-instructions.md"],
  "provider": {
    "openai": {
      "options": {
        "apiKey": "{file:~/.secrets/openai-key}"
      }
    }
  }
}
```

---

## LLM 提供商配置

### 支持的提供商

OpenCode 通过 [AI SDK](https://ai-sdk.dev/) 和 [Models.dev](https://models.dev) 支持 **75+ LLM 提供商**：

| 类别 | 提供商 |
|------|--------|
| **主流** | OpenAI, Anthropic, Google Vertex AI |
| **开源友好** | Groq, Hugging Face, Together AI |
| **本地** | Ollama, LM Studio, llama.cpp |
| **企业** | Amazon Bedrock, Azure OpenAI |
| **中国** | DeepSeek, Moonshot AI (Kimi), MiniMax, Z.AI |
| **其他** | xAI, Cerebras, Fireworks AI, Vercel AI Gateway |

### 连接提供商

#### 方式 1：TUI 命令

```bash
opencode
/connect
# 选择提供商，按提示操作
```

#### 方式 2：手动配置

```json
{
  "provider": {
    "anthropic": {
      "options": {
        "apiKey": "{env:ANTHROPIC_API_KEY}"
      }
    },
    "openai": {
      "options": {
        "apiKey": "{env:OPENAI_API_KEY}"
      }
    }
  }
}
```

### 常用提供商配置

#### Anthropic

```json
{
  "provider": {
    "anthropic": {
      "options": {
        "apiKey": "{env:ANTHROPIC_API_KEY}"
      }
    }
  }
}
```

#### OpenAI

```json
{
  "provider": {
    "openai": {
      "options": {
        "apiKey": "{env:OPENAI_API_KEY}"
      }
    }
  }
}
```

#### Amazon Bedrock

```json
{
  "provider": {
    "amazon-bedrock": {
      "options": {
        "region": "us-east-1",
        "profile": "my-aws-profile"
      }
    }
  }
}
```

认证方式优先级：
1. Bearer Token (`AWS_BEARER_TOKEN_BEDROCK`)
2. AWS 凭证链

#### Azure OpenAI

```bash
# 设置资源名称
export AZURE_RESOURCE_NAME=your-resource-name
```

```json
{
  "provider": {
    "azure-openai": {
      "options": {
        "apiKey": "{env:AZURE_OPENAI_API_KEY}"
      }
    }
  }
}
```

#### Ollama (本地)

```json
{
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (本地)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "llama2": {
          "name": "Llama 2"
        },
        "qwen3-coder:a3b": {
          "name": "Qwen3-Coder (local)"
        }
      }
    }
  }
}
```

提示：若工具调用不工作，尝试增加 Ollama 的 `num_ctx` (16k-32k)。

### 自定义提供商

任何 OpenAI 兼容的 API 都可添加：

```json
{
  "provider": {
    "myprovider": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "My AI Provider",
      "options": {
        "baseURL": "https://api.myprovider.com/v1",
        "apiKey": "{env:MYPROVIDER_API_KEY}",
        "headers": {
          "Authorization": "Bearer custom-token"
        }
      },
      "models": {
        "my-model-name": {
          "name": "My Model Display Name",
          "limit": {
            "context": 200000,
            "output": 65536
          }
        }
      }
    }
  }
}
```

### 管理凭证

```bash
opencode auth list              # 列出已配置的提供商
opencode auth logout <provider> # 登出提供商
```

---

## 代理 (Agents)

### 代理类型

| 类型 | 模式 | 描述 |
|------|------|------|
| **Primary** | 主代理 | 直接交互的主要代理，可通过 Tab 切换 |
| **Subagent** | 子代理 | 专业任务代理，由主代理调用或 @ 提及 |

### 内置代理

#### Build（主代理）

```yaml
mode: primary
description: Default development agent
tools: all enabled
```

默认的主代理，拥有所有工具权限，用于常规开发工作。

#### Plan（主代理）

```yaml
mode: primary
description: Planning and analysis without making changes
tools:
  write: false
  bash: false
  edit: false
```

受限代理，仅用于分析和规划，不会修改代码。适合代码审查和设计讨论。

#### General（子代理）

```yaml
mode: subagent
description: General-purpose research and multi-step tasks
```

通用子代理，用于搜索和复杂问题研究。

#### Explore（子代理）

```yaml
mode: subagent
description: Fast codebase exploration
```

快速探索子代理，用于快速搜索文件和回答问题。

### 配置代理

#### JSON 配置

```json
{
  "agent": {
    "build": {
      "mode": "primary",
      "model": "anthropic/claude-sonnet-4-5",
      "description": "Full-featured development agent"
    },
    "plan": {
      "mode": "primary",
      "model": "anthropic/claude-haiku-4-5",
      "description": "Planning agent without modification rights",
      "tools": {
        "write": false,
        "edit": false,
        "bash": false
      }
    },
    "code-reviewer": {
      "mode": "subagent",
      "description": "Reviews code for quality and security",
      "model": "anthropic/claude-sonnet-4-5",
      "prompt": "You are a code reviewer. Focus on security, performance, and best practices.",
      "tools": {
        "write": false,
        "edit": false
      }
    }
  }
}
```

#### Markdown 文件配置

文件位置：
- 全局：`~/.config/opencode/agent/<name>.md`
- 项目：`.opencode/agent/<name>.md`

示例 `~/.config/opencode/agent/security-auditor.md`：

```yaml
---
description: Performs security audits
mode: subagent
model: anthropic/claude-sonnet-4-5
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
permission:
  edit: deny
  webfetch: deny
---
You are a security expert. Focus on:
- Input validation vulnerabilities
- Authentication flaws
- Data exposure risks
- Dependency vulnerabilities
```

### 代理选项详解

| 选项 | 类型 | 描述 |
|------|------|------|
| `description` | string | 代理描述（必需） |
| `mode` | string | `primary` / `subagent` / `all` |
| `model` | string | 使用的模型 (格式: `provider/model`) |
| `prompt` | string | 系统提示或文件路径 (`{file:path}`) |
| `temperature` | number | 温度 (0.0-1.0, 默认 0) |
| `maxSteps` | number | 最大迭代次数 |
| `tools` | object | 工具启用/禁用 |
| `permission` | object | 权限配置 |
| `hidden` | boolean | 从 @ 自动完成隐藏 |
| `disable` | boolean | 禁用代理 |

### 创建代理

```bash
# 交互式创建代理
opencode agent create

# 引导流程：
# 1. 选择保存位置（全局/项目）
# 2. 输入描述
# 3. 选择工具权限
# 4. 生成配置文件
```

### 使用代理

#### 主代理切换

- 按 `Tab` 键循环切换
- 或使用 `switch_agent` 快捷键

#### 子代理调用

```bash
# 自动调用（基于描述）
"Search for error handling patterns"

# 手动 @ 提及
@general help me search for this function
@explore find all API endpoints
```

---

## 工具 (Tools)

### 内置工具

| 工具 | 功能 | 默认启用 |
|------|------|----------|
| `read` | 读取文件内容 | 是 |
| `write` | 创建/覆盖文件 | 是 |
| `edit` | 精确修改文件 | 是 |
| `bash` | 执行 Shell 命令 | 是 |
| `grep` | 正则搜索文件 | 是 |
| `glob` | 文件名模式匹配 | 是 |
| `list` | 列出目录内容 | 是 |
| `patch` | 应用补丁文件 | 是 |
| `webfetch` | 获取网页内容 | 是 |
| `skill` | 加载技能文件 | 是 |
| `todowrite` | 管理待办列表 | 是 |
| `todoread` | 读取待办列表 | 是 |
| `lsp` | LSP 交互（实验性） | 否 |

### 工具配置

#### 全局配置

```json
{
  "tools": {
    "write": true,
    "bash": true,
    "read": true,
    "edit": true,
    "webfetch": true,
    "lsp": false
  }
}
```

#### 使用通配符

```json
{
  "tools": {
    "mymcp_*": false
  }
}
```

#### 每代理配置

```json
{
  "tools": {
    "write": true,
    "bash": true
  },
  "agent": {
    "plan": {
      "tools": {
        "write": false,
        "bash": false
      }
    }
  }
}
```

### 忽略模式

工具默认尊重 `.gitignore`。创建 `.ignore` 文件覆盖：

.ignore
```
!node_modules/
!dist/
!build/
```

---

## 规则与指令 (Rules)

### AGENTS.md 文件

`AGENTS.md` 是项目的指令文件，类似于 `CLAUDE.md` 或 Cursor 规则。

### 创建 AGENTS.md

```bash
# 自动生成（推荐）
opencode
/init

# 或手动创建
```

### AGENTS.md 示例

```markdown
# SST v3 Monorepo Project

This is an SST v3 monorepo with TypeScript using bun workspaces.

## 项目结构
- `packages/` - 工作区包 (functions, core, web 等)
- `infra/` - 按服务划分的基础设施定义
- `sst.config.ts` - 主 SST 配置

## 代码标准
- 使用 TypeScript strict 模式
- 共享代码放入 `packages/core/`
- 函数放入 `packages/functions/`

## 导入规范
- 使用工作区名称导入: `@my-app/core/example`
```

### 规则类型

| 类型 | 位置 | 作用域 |
|------|------|--------|
| 项目规则 | `./AGENTS.md` | 当前项目 |
| 全局规则 | `~/.config/opencode/AGENTS.md` | 所有项目 |

### 配置指令文件

在 `opencode.json` 中指定：

```json
{
  "instructions": [
    "CONTRIBUTING.md",
    "docs/guidelines.md",
    ".cursor/rules/*.md",
    "packages/*/AGENTS.md"
  ]
}
```

### 优先级

1. 从当前目录向上遍历查找本地文件
2. 检查全局文件 `~/.config/opencode/AGENTS.md`
3. 合并所有规则

---

## 自定义命令 (Commands)

### 创建命令

#### JSON 配置

```json
{
  "command": {
    "test": {
      "template": "Run full test suite with coverage and show failures.\nFocus on failing tests.",
      "description": "Run tests with coverage",
      "agent": "build",
      "model": "anthropic/claude-haiku-4-5"
    },
    "component": {
      "template": "Create a new React component named $ARGUMENTS with TypeScript.\nInclude proper typing.",
      "description": "Create component"
    }
  }
}
```

#### Markdown 文件

位置：
- 全局：`~/.config/opencode/command/<name>.md`
- 项目：`.opencode/command/<name>.md`

示例 `.opencode/command/component.md`：

```yaml
---
description: Create a new component
agent: build
model: anthropic/claude-sonnet-4-5
---
Create a new React component named $ARGUMENTS with TypeScript.
Include proper typing, props interface, and basic structure.
```

### 命令选项

| 选项 | 描述 |
|------|------|
| `template` | 发送给 LLM 的提示（必需） |
| `description` | TUI 中显示的描述 |
| `agent` | 执行命令的代理 |
| `model` | 使用的模型 |
| `subtask` | 是否强制作为子代理调用 |

### 模板变量

| 变量 | 描述 |
|------|------|
| `$ARGUMENTS` | 命令后的所有参数 |
| `$1`, `$2`, `$3` | 位置参数 |
| ``!`command` `` | Shell 命令输出 |
| `@filename` | 文件内容 |

### 使用命令

```bash
/test                           # 无参数
/component Button               # 带参数
/component UserCard --props    # 多参数
```

---

## 权限控制 (Permissions)

### 权限类型

| 权限 | 工具 | 描述 |
|------|------|------|
| `read` | read | 读取文件（默认允许，.env 除外） |
| `edit` | edit/write/patch | 文件修改 |
| `bash` | bash | Shell 命令执行 |
| `glob` | glob | 文件搜索 |
| `grep` | grep | 内容搜索 |
| `list` | list | 目录列表 |
| `task` | Task | 启动子代理 |
| `skill` | skill | 加载技能 |
| `webfetch` | webfetch | 获取网页 |
| `external_directory` | - | 访问项目外目录 |
| `doom_loop` | - | 重复工具调用 |

### 权限值

| 值 | 行为 |
|------|------|
| `"allow"` | 无需批准直接执行 |
| `"ask"` | 每次提示批准 |
| `"deny"` | 阻止执行 |

### 配置权限

#### 全局配置

```json
{
  "permission": {
    "*": "ask",
    "bash": "allow",
    "edit": "deny"
  }
}
```

#### 粒度规则

```json
{
  "permission": {
    "bash": {
      "*": "ask",
      "git status": "allow",
      "git push": "allow",
      "rm *": "deny",
      "npm *": "allow"
    },
    "read": {
      "*": "allow",
      "*.env": "deny",
      "*.env.*": "deny",
      "*.env.example": "allow"
    }
  }
}
```

#### 通配符模式

- `*` - 匹配任意字符序列
- `?` - 匹配单个字符

**规则匹配**：最后一个匹配的规则生效。

### 每代理权限

```json
{
  "permission": {
    "bash": {
      "*": "ask",
      "git status": "allow"
    }
  },
  "agent": {
    "build": {
      "permission": {
        "bash": {
          "*": "ask",
          "git status": "allow",
          "git push": "allow"
        }
      }
    }
  }
}
```

### "Ask" 的行为

当权限为 `"ask"` 时，UI 提供三个选项：

| 选项 | 描述 |
|------|------|
| `once` | 仅批准此次请求 |
| `always` | 记住模式并自动批准（当前会话） |
| `reject` | 拒绝请求 |

---

## 主题配置 (Themes)

### 内置主题

| 名称 | 描述 |
|------|------|
| `system` | 适应终端主题 |
| `opencode` | 默认主题 |
| `tokyonight` | Tokyo Night 风格 |
| `everforest` | Everforest 风格 |
| `ayu` | Ayu 暗色风格 |
| `catppuccin` | Catppuccin 风格 |
| `gruvbox` | Gruvbox 风格 |
| `kanagawa` | Kanagawa 风格 |
| `nord` | Nord 风格 |
| `matrix` | 黑客风格 |
| `one-dark` | One Dark 风格 |

### 使用主题

#### TUI 命令

```bash
/theme
# 或使用快捷键
```

#### 配置文件

```json
{
  "theme": "tokyonight"
}
```

### System 主题

`system` 主题自动适应终端颜色方案：
- 基于终端背景色生成灰度
- 使用 ANSI 颜色
- 保留终端原生外观

### 自定义主题

#### 主题文件位置

1. 内置主题（内置于二进制）
2. 用户配置：`~/.config/opencode/themes/*.json`
3. 项目配置：`.opencode/themes/*.json`
4. 工作目录：`.opencode/themes/*.json`

同名主题时，高优先级目录覆盖低优先级。

#### 创建自定义主题

```json
{
  "$schema": "https://opencode.ai/theme.json",
  "defs": {
    "nord0": "#2E3440",
    "nord1": "#3B4252",
    "nord4": "#D8DEE9"
  },
  "theme": {
    "primary": {
      "dark": "nord0",
      "light": "nord4"
    },
    "text": {
      "dark": "nord4",
      "light": "nord0"
    },
    "background": {
      "dark": "nord0",
      "light": "nord4"
    },
    "syntaxKeyword": {
      "dark": "#81A1C1",
      "light": "#81A1C1"
    },
    "syntaxString": {
      "dark": "#A3BE8C",
      "light": "#A3BE8C"
    }
  }
}
```

#### 颜色值

- Hex 颜色：`"#ffffff"`
- ANSI 颜色：`3` (0-255)
- 颜色引用：`"primary"`
- 暗/亮变体：`{"dark": "#000", "light": "#fff"}`
- 无颜色：`"none"`（使用终端默认）

---

## 快捷键配置 (Keybinds)

### Leader Key

默认 Leader Key 是 `Ctrl+X`，多数快捷键需要先按 Leader Key。

示例：要新建会话，先按 `Ctrl+X`，再按 `N`。

### 默认快捷键

#### 会话操作

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+X N` | 新建会话 |
| `Ctrl+X L` | 会话列表 |
| `Ctrl+X X` | 导出会话 |
| `Ctrl+X G` | 会话时间线 |
| `Ctrl+X U` | 撤销 |
| `Ctrl+X R` | 重做 |
| `Ctrl+X C` | 压缩会话 |
| `Ctrl+X S` | 分享会话 |
| `Ctrl+X Q` / `Ctrl+C` | 退出 |

#### 导航

| 快捷键 | 功能 |
|--------|------|
| `PageUp` | 上一页 |
| `PageDown` | 下一页 |
| `Ctrl+Alt+U` | 上半页 |
| `Ctrl+Alt+D` | 下半页 |
| `Ctrl+G` / `Home` | 第一条 |
| `Ctrl+Alt+G` / `End` | 最后一条 |
| `Ctrl+X ↑` | 父会话 |
| `Ctrl+X →` | 子会话循环 |
| `Ctrl+X ←` | 子会话反向循环 |

#### 模型和代理

| 快捷键 | 功能 |
|--------|------|
| `F2` | 循环切换最近模型 |
| `Shift+F2` | 反向循环 |
| `Ctrl+X M` | 模型列表 |
| `Tab` | 切换代理 |
| `Ctrl+X A` | 代理列表 |

#### 输入操作

| 快捷键 | 功能 |
|--------|------|
| `Enter` | 提交 |
| `Shift+Enter` | 换行 |
| `Ctrl+A` | 行首 |
| `Ctrl+E` | 行尾 |
| `Ctrl+B` | 后退字符 |
| `Ctrl+F` | 前进字符 |
| `Alt+B` | 后退词 |
| `Alt+F` | 前进词 |
| `Ctrl+D` | 删除字符 |
| `Ctrl+K` | 删除到行尾 |
| `Ctrl+U` | 删除到行首 |
| `Ctrl+W` | 删除前一个词 |

#### 其他

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+X E` | 打开编辑器 |
| `Ctrl+X T` | 主题列表 |
| `Ctrl+X B` | 侧边栏切换 |
| `Ctrl+X H` | 帮助 |
| `Ctrl+P` | 命令列表 |

### 自定义快捷键

```json
{
  "keybinds": {
    "leader": "ctrl+x",
    "session_new": "<leader>n",
    "session_list": "<leader>l",
    "session_compact": "<leader>c",
    "theme_list": "<leader>t",
    "tool_details": "none",
    "session_interrupt": "escape"
  }
}
```

#### 禁用快捷键

```json
{
  "keybinds": {
    "session_compact": "none"
  }
}
```

### 快捷键格式

- 单键：`"ctrl+c"`, `"escape"`
- 组合：`"ctrl+x,n"` (Leader Key 模式)
- 通配符：`<leader>` = Leader Key

---

## 模型配置 (Models)

### 推荐模型

以下是 OpenCode 推荐使用的模型（不按排名）：

| 模型 | 提供商 | 特点 |
|------|--------|------|
| GPT 5.2 | OpenAI | 最新一代 |
| GPT 5.1 Codex | OpenAI | 代码优化 |
| Claude Opus 4.5 | Anthropic | 最高性能 |
| Claude Sonnet 4.5 | Anthropic | 平衡性能 |
| Claude Haiku 4.5 | Anthropic | 快速响应 |
| MiniMax M2.1 | MiniMax | 性价比 |
| Gemini 3 Pro | Google | 多模态 |

### 设置默认模型

```json
{
  "model": "anthropic/claude-sonnet-4-5"
}
```

### 模型变体

许多模型支持不同配置变体：

**Anthropic**:
- `high` - 高思考预算（默认）
- `max` - 最大思考预算

**OpenAI**:
- `none` - 无推理
- `minimal` - 最少推理
- `low` - 低推理
- `medium` - 中等推理
- `high` - 高推理
- `xhigh` - 极高推理

**Google**:
- `low` - 低预算
- `high` - 高预算

### 自定义变体

```json
{
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "variants": {
            "thinking": {
              "reasoningEffort": "high",
              "textVerbosity": "low"
            },
            "fast": {
              "disabled": true
            }
          }
        }
      }
    }
  }
}
```

### 模型变体切换

使用 `variant_cycle` 快捷键（默认 `Ctrl+T`）快速切换变体。

### 模型优先级

1. `--model` 命令行参数
2. `model` 配置项
3. 最近使用的模型
4. 内部优先级排序

### 模型配置选项

```json
{
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "options": {
            "reasoningEffort": "high",
            "textVerbosity": "low",
            "reasoningSummary": "auto",
            "include": ["reasoning.encrypted_content"]
          }
        }
      }
    },
    "anthropic": {
      "models": {
        "claude-sonnet-4-5-20250929": {
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 16000
            }
          }
        }
      }
    }
  }
}
```

---

## 代码格式化 (Formatters)

### 内置格式化器

| 格式化器 | 扩展名 | 要求 |
|----------|--------|------|
| gofmt | .go | `gofmt` 命令 |
| mix | .ex, .exs | `mix` 命令 |
| prettier | .js, .ts, .jsx, .tsx, .html, .css, .md, .json, .yaml | `prettier` 依赖 |
| biome | 同 prettier | `biome.json(c)` 配置 |
| zig | .zig, .zon | `zig` 命令 |
| clang-format | .c, .cpp, .h, .hpp | `.clang-format` 配置 |
| ktlint | .kt, .kts | `ktlint` 命令 |
| ruff | .py, .pyi | `ruff` 命令 |
| rustfmt | .rs | `rustfmt` 命令 |
| uv | .py, .pyi | `uv` 命令 |
| rubocop | .rb, .rake | `rubocop` 命令 |
| shfmt | .sh, .bash | `shfmt` 命令 |

### 工作原理

当 OpenCode 写入或编辑文件时：
1. 根据文件扩展名检查所有启用的格式化器
2. 在文件上运行适当的格式化命令
3. 自动应用格式更改

### 配置格式化器

#### 禁用所有格式化器

```json
{
  "formatter": false
}
```

#### 禁用特定格式化器

```json
{
  "formatter": {
    "prettier": {
      "disabled": true
    }
  }
}
```

#### 自定义格式化器

```json
{
  "formatter": {
    "prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "environment": {
        "NODE_ENV": "development"
      },
      "extensions": [".js", ".ts", ".jsx", ".tsx"]
    },
    "custom-formatter": {
      "command": ["deno", "fmt", "$FILE"],
      "extensions": [".md"]
    }
  }
}
```

`$FILE` 占位符会被替换为实际文件路径。

---

## MCP 服务器

### 什么是 MCP？

MCP (Model Context Protocol) 服务器允许你向 OpenCode 添加外部工具和服务。

### 配置 MCP 服务器

#### 本地 MCP 服务器

```json
{
  "mcp": {
    "everything": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-everything"],
      "enabled": true,
      "environment": {
        "MY_ENV_VAR": "value"
      }
    }
  }
}
```

#### 远程 MCP 服务器

```json
{
  "mcp": {
    "sentry": {
      "type": "remote",
      "url": "https://mcp.sentry.dev/mcp",
      "oauth": {},
      "enabled": true,
      "headers": {
        "Authorization": "Bearer {env:SENTRY_API_KEY}"
      }
    }
  }
}
```

### MCP 选项

| 选项 | 类型 | 描述 |
|------|------|------|
| `type` | string | `"local"` 或 `"remote"` |
| `command` | array | 本地服务器命令 |
| `url` | string | 远程服务器 URL |
| `enabled` | boolean | 启动时启用 |
| `environment` | object | 环境变量 |
| `headers` | object | 请求头 |
| `oauth` | object | OAuth 配置 |
| `timeout` | number | 超时（毫秒，默认 5000） |

### OAuth 认证

#### 自动认证

大多数 OAuth 服务器无需配置，OpenCode 会自动处理。

#### 预注册凭证

```json
{
  "mcp": {
    "my-server": {
      "type": "remote",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "clientId": "{env:MY_CLIENT_ID}",
        "clientSecret": "{env:MY_CLIENT_SECRET}",
        "scope": "tools:read tools:execute"
      }
    }
  }
}
```

#### 手动认证

```bash
# 认证特定服务器
opencode mcp auth my-server

# 查看所有服务器状态
opencode mcp list

# 移除凭证
opencode mcp logout my-server

# 调试认证问题
opencode mcp debug my-server
```

### 禁用 OAuth

```json
{
  "mcp": {
    "api-key-server": {
      "type": "remote",
      "url": "https://mcp.example.com/mcp",
      "oauth": false,
      "headers": {
        "Authorization": "Bearer {env:API_KEY}"
      }
    }
  }
}
```

### 管理 MCP 工具

#### 全局管理

```json
{
  "mcp": {
    "foo": { "type": "local", "command": ["..."] },
    "bar": { "type": "local", "command": ["..."] }
  },
  "tools": {
    "foo": false
  }
}
```

使用通配符：`"foo_*": false`

#### 每代理管理

```json
{
  "mcp": {
    "my-mcp": {
      "type": "local",
      "command": ["..."],
      "enabled": true
    }
  },
  "tools": {
    "my-mcp_*": false
  },
  "agent": {
    "my-agent": {
      "tools": {
        "my-mcp_*": true
      }
    }
  }
}
```

### 常用 MCP 服务器示例

#### Sentry

```json
{
  "mcp": {
    "sentry": {
      "type": "remote",
      "url": "https://mcp.sentry.dev/mcp",
      "oauth": {}
    }
  }
}
```

```bash
opencode mcp auth sentry
```

使用：`"Show me recent issues in my project. use sentry"`

#### Context7

```json
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}"
      }
    }
  }
}
```

使用：`"Configure a Cloudflare Worker. use context7"`

#### Grep by Vercel

```json
{
  "mcp": {
    "gh_grep": {
      "type": "remote",
      "url": "https://mcp.grep.app"
    }
  }
}
```

使用：`"How to set custom domain in SST? use the gh_grep tool"`

### 注意事项

**警告**：MCP 服务器会增加上下文，可能快速超出上下文限制。谨慎启用。

---

## 会话共享 (Share)

### 共享模式

| 模式 | 行为 |
|------|------|
| `manual` (默认) | 手动使用 `/share` 共享 |
| `auto` | 自动共享所有新会话 |
| `disabled` | 禁用共享 |

### 配置共享模式

```json
{
  "share": "manual"
}
```

```json
{
  "share": "auto"
}
```

```json
{
  "share": "disabled"
}
```

### 共享会话

```bash
# 手动共享
/share

# 取消共享
/unshare
```

共享后生成唯一 URL：`https://opncd.ai/s/<share-id>`

### 隐私考虑

- 共享会话公开可见
- 会话保留直到手动取消共享
- 避免共享敏感代码
- 企业可完全禁用或自托管

---

## GitHub 集成

### 功能特性

- **问题分类**：让 OpenCode 分析和解释问题
- **修复实现**：自动创建分支、修复问题、提交 PR
- **代码审查**：在 PR 中进行精确的代码审查
- **安全运行**：在 GitHub Actions runner 中运行

### 安装

```bash
opencode github install
```

引导式安装过程会：
1. 安装 GitHub App
2. 创建工作流文件
3. 设置必要密钥

### 手动设置

#### 1. 安装 GitHub App

访问 [github.com/apps/opencode-agent](https://github.com/apps/opencode-agent) 并安装在目标仓库。

#### 2. 添加工作流

创建 `.github/workflows/opencode.yml`：

```yaml
name: opencode
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  opencode:
    if: |
      contains(github.event.comment.body, '/oc') ||
      contains(github.event.comment.body, '/opencode')
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v6
        with:
          fetch-depth: 1

      - name: Run OpenCode
        uses: anomalyco/opencode/github@latest
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-5
          # share: true
          # github_token: xxxx
```

#### 3. 设置密钥

在仓库/组织设置中添加 `ANTHROPIC_API_KEY` 等密钥。

### 配置选项

| 选项 | 描述 | 默认 |
|------|------|------|
| `model` | 使用的模型（必需） | - |
| `agent` | 使用的代理 | `default_agent` |
| `share` | 是否共享会话 | 公共仓库为 true |
| `prompt` | 自定义提示 | 基于注释 |
| `token` | GitHub 访问令牌 | App 安装令牌 |

### 支持的事件

| 事件类型 | 触发方式 | 说明 |
|----------|----------|------|
| `issue_comment` | `/oc` 或 `/opencode` 提及 | 评论问题或 PR |
| `pull_request_review_comment` | 代码行评论 | 精确代码审查 |
| `issues` | 问题创建/编辑 | 自动处理（需 prompt） |
| `pull_request` | PR 打开/更新 | 自动审查（需 prompt） |
| `schedule` | Cron 调度 | 定期任务（需 prompt） |
| `workflow_dispatch` | 手动触发 | 按需运行（需 prompt） |

### 使用示例

**解释问题**
```
/opencode explain this issue
```

**修复问题**
```
/opencode fix this
```

**PR 代码行评论**
```
[Comment on specific lines]/oc add error handling here
```

**自动 PR 审查**

```yaml
name: opencode-review
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
      - uses: actions/checkout@v6
      - uses: anomalyco/opencode/github@latest
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-5
          prompt: |
            Review this PR:
            - Check for code quality issues
            - Look for potential bugs
            - Suggest improvements
```

---

## OpenCode Zen

### 什么是 Zen？

OpenCode Zen 是 OpenCode 团队测试和验证的模型列表，是可选的 AI 网关服务。

### Zen 特点

1. 精选测试过的模型和提供商
2. 保证高质量模型版本
3. 按成本价销售（仅收取手续费）
4. 无锁定（可随时使用其他提供商）

### 使用 Zen

1. 访问 [https://opencode.ai/auth](https://opencode.ai/auth) 注册并获取 API key
2. 在 OpenCode 中连接 Zen
3. 使用 `/models` 查看推荐模型

### Zen 模型列表

| 模型 | 模型 ID | 价格 ($/1M tokens) |
|------|---------|-------------------|
| GPT 5.2 | `gpt-5.2` | 输入 $1.75 / 输出 $14.00 |
| GPT 5.1 | `gpt-5.1` | 输入 $1.07 / 输出 $8.50 |
| GPT 5.1 Codex | `gpt-5.1-codex` | 输入 $1.07 / 输出 $8.50 |
| Claude Sonnet 4.5 | `claude-sonnet-4-5` | 输入 $3.00 / 输出 $15.00 |
| Claude Opus 4.5 | `claude-opus-4-5` | 输入 $5.00 / 输出 $25.00 |
| Claude Haiku 4.5 | `claude-haiku-4-5` | 输入 $1.00 / 输出 $5.00 |
| Gemini 3 Pro | `gemini-3-pro` | 输入 $2.00 / 输出 $12.00 |
| MiniMax M2.1 | `minimax-m2.1-free` | 免费 |
| GLM 4.7 | `glm-4.7-free` | 免费 |
| Kimi K2 | `kimi-k2` | 输入 $0.40 / 输出 $2.50 |
| Qwen3 Coder 480B | `qwen3-coder` | 输入 $0.45 / 输出 $1.50 |

**免费模型**（限时）：
- Grok Code Fast 1
- MiniMax M2.1
- GLM 4.7
- Big Pickle

### Zen API 端点

| 模型 | 端点 | SDK 包 |
|------|------|--------|
| GPT 系列 | `https://opencode.ai/zen/v1/responses` | `@ai-sdk/openai` |
| Claude 系列 | `https://opencode.ai/zen/v1/messages` | `@ai-sdk/anthropic` |
| Gemini 系列 | `https://opencode.ai/zen/v1/models/gemini-3-pro` | `@ai-sdk/google` |
| 其他 | `https://opencode.ai/zen/v1/chat/completions` | `@ai-sdk/openai-compatible` |

### 配置 Zen

```json
{
  "model": "opencode/gpt-5.1-codex",
  "provider": {
    "opencode": {
      "options": {
        "apiKey": "{env:OPENCODE_ZEN_API_KEY}"
      }
    }
  }
}
```

### 团队功能

- **角色**：Admin（管理模型、成员、密钥、账单）/ Member（管理自己的密钥）
- **模型访问**：管理员可启用/禁用特定模型
- **自带密钥**：可使用自己的 OpenAI/Anthropic 密钥
- **月度限制**：可为整个工作区和成员设置月度支出限制

### 自动充值

当余额低于 $5 时，自动充值 $20（可配置或禁用）。

---

## 服务器模式 (Server)

### 启动服务器

```bash
# 基本启动
opencode serve

# 自定义端口和主机
opencode serve --port 3000 --hostname 0.0.0.0

# 启用 mDNS 发现
opencode serve --mdns

# 允许 CORS
opencode serve --cors http://localhost:5173
```

### 服务器选项

| 选项 | 默认值 | 描述 |
|------|--------|------|
| `--port` | 4096 | 监听端口 |
| `--hostname` | 127.0.0.1 | 监听主机 |
| `--mdns` | false | 启用 mDNS 发现 |
| `--cors` | [] | 额外的 CORS 源 |

### 工作原理

```
┌─────────────────────────────────────────────────────────┐
│                     OpenCode Server                      │
│                                                          │
│  ┌──────────┐    HTTP API     ┌──────────────────────┐  │
│  │   TUI    │ ──────────────▶ │  OpenAPI 3.1 Spec   │  │
│  │  Client  │                 │  /doc endpoint       │  │
│  └──────────┘                 └──────────────────────┘  │
│                                                          │
│  支持多客户端：                                           │
│  - 终端 TUI                                              │
│  - 桌面应用                                              │
│  - IDE 插件                                              │
│  - 自定义客户端                                          │
└─────────────────────────────────────────────────────────┘
```

### API 端点

#### 全局端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/global/health` | 服务器健康和版本 |
| GET | `/global/event` | 全局事件 (SSE) |

#### 项目端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/project` | 列出所有项目 |
| GET | `/project/current` | 当前项目 |

#### 配置端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/config` | 获取配置 |
| PATCH | `/config` | 更新配置 |
| GET | `/config/providers` | 列出提供商和默认模型 |

#### 提供商端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/provider` | 列出所有提供商 |
| POST | `/provider/{id}/oauth/authorize` | OAuth 授权 |

#### 会话端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/session` | 列出所有会话 |
| POST | `/session` | 创建新会话 |
| GET | `/session/{id}` | 获取会话详情 |
| DELETE | `/session/{id}` | 删除会话 |
| POST | `/session/{id}/message` | 发送消息 |
| POST | `/session/{id}/share` | 分享会话 |

#### 消息端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/session/{id}/message` | 列出消息 |
| POST | `/session/{id}/prompt_async` | 异步发送消息 |

#### 文件端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/find?pattern=<pat>` | 搜索文件内容 |
| GET | `/find/file?query=<q>` | 按名称查找文件 |
| GET | `/file/content?path=<path>` | 读取文件 |

#### TUI 端点

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/tui/append-prompt` | 追加提示 |
| POST | `/tui/submit-prompt` | 提交提示 |
| POST | `/tui/open-models` | 打开模型选择器 |

### OpenAPI 文档

访问 `http://<hostname>:<port>/doc` 查看完整 OpenAPI 3.1 规范。

---

## 最佳实践

### 1. 有效提示技巧

**清晰具体**
```
# 不推荐
Fix the code

# 推荐
Add error handling to @src/api/users.ts following the pattern in 
@src/api/auth.ts. Handle 401, 403, and 500 status codes.
```

**提供上下文**
```
# 使用 @ 引用相关文件
Explain how the authentication flow works in @src/auth/middleware.ts
and @src/auth/service.ts

# 使用 ! 包含命令输出
Analyze the test results:!`npm test -- --coverage`
```

**分步进行**
```
1. 先用 Plan 模式分析
2. 审查计划并反馈
3. 切换到 Build 模式执行
```

### 2. 大型项目管理

1. **使用 `/init`** 初始化项目理解
2. **创建 `AGENTS.md`** 定义项目结构和规范
3. **使用文件引用** `@` 限制上下文范围
4. **合理使用子代理** `@general`、`@explore`
5. **配置 MCP 服务器** 访问外部工具

### 3. 团队协作

1. **提交配置文件** `opencode.json` 和 `AGENTS.md`
2. **定义自定义命令** 统一团队工作流
3. **设置权限** 控制敏感操作
4. **使用 GitHub 集成** 自动化 PR 审查
5. **共享会话** `@share` 讨论实现

### 4. 安全最佳实践

1. **使用环境变量** 存储 API key：`{env:VARIABLE}`
2. **配置权限** 敏感操作设为 `"ask"`
3. **审查更改** 始终检查 AI 建议的修改
4. **避免共享敏感代码** 设置 `share: "disabled"`
5. **使用本地模型** 处理高度敏感代码

### 5. 成本优化

1. **使用小模型** 配置 `small_model` 处理轻量任务
2. **启用压缩** `"compaction": { "auto": true }`
3. **设置权限** 减少不必要的 API 调用
4. **使用免费模型** Zen 的 MiniMax M2.1、GLM 4.7 等

---

## 故障排除

### 安装问题

| 问题 | 解决方案 |
|------|----------|
| `Command not found` | 检查 PATH：`which opencode` |
| 权限错误 | 检查文件权限：`chmod +x` |
| 安装失败 | 尝试其他安装方式 |

### 认证问题

| 问题 | 解决方案 |
|------|----------|
| API key 无效 | 验证 key：`opencode auth list` |
| 提供商未加载 | 检查环境变量和配置 |
| OAuth 失败 | 运行 `opencode mcp debug <name>` |

### 性能问题

| 问题 | 解决方案 |
|------|----------|
| 响应慢 | 使用 `opencode serve` 避免 MCP 冷启动 |
| 内存占用高 | 减少 MCP 服务器数量 |
| 上下文超限 | 启用压缩、减少会话历史 |

### TUI 问题

| 问题 | 解决方案 |
|------|----------|
| 颜色显示异常 | 检查终端 Truecolor 支持 |
| 滚动问题 | 禁用滚动加速或调整 `scroll_speed` |
| 快捷键冲突 | 自定义 Leader Key 或快捷键 |

### 模型问题

| 问题 | 解决方案 |
|------|----------|
| 模型未找到 | 刷新模型列表：`opencode models --refresh` |
| 工具调用失败 | 检查模型是否支持工具调用 |
| 上下文窗口不足 | 使用更小的模型或减少上下文 |

### 常见错误代码

| 错误 | 描述 | 解决方案 |
|------|------|----------|
| `401 Unauthorized` | API key 无效 | 检查 API key 配置 |
| `429 Rate Limited` | 请求过于频繁 | 等待后重试 |
| `context_exceeded` | 上下文超限 | 压缩会话或减少历史 |
| `tool_not_found` | 工具不存在 | 检查工具配置 |

### 获取帮助

- **官方文档**：https://opencode.ai/docs
- **Discord 社区**：https://opencode.ai/discord
- **GitHub Issues**：报告 bug
- **Debug 命令**：`opencode --print-logs --log-level DEBUG`

---

## 附录

### 命令速查

| 命令 | 描述 |
|------|------|
| `opencode` | 启动 TUI |
| `opencode run "prompt"` | 直接运行提示 |
| `opencode serve` | 启动服务器 |
| `opencode web` | 启动 Web 界面 |
| `opencode models` | 列出模型 |
| `opencode auth login` | 登录提供商 |
| `opencode github install` | 安装 GitHub 集成 |
| `opencode agent create` | 创建自定义代理 |
| `opencode upgrade` | 升级版本 |
| `opencode uninstall` | 卸载 |

### 配置文件速查

```bash
# 配置文件位置
~/.config/opencode/opencode.json    # 全局配置
./opencode.json                     # 项目配置
~/.config/opencode/AGENTS.md        # 全局规则
./AGENTS.md                         # 项目规则
~/.config/opencode/agent/           # 自定义代理
~/.config/opencode/command/         # 自定义命令
~/.config/opencode/themes/          # 自定义主题
.opencode/agent/                    # 项目代理
.opencode/command/                  # 项目命令
```

### 环境变量速查

```bash
OPENCODE_CONFIG           # 自定义配置路径
OPENCODE_CONFIG_DIR       # 自定义配置目录
OPENCODE_AUTO_SHARE       # 自动分享
OPENCODE_ENABLE_EXA       # 启用 Exa 搜索
OPENCODE_EXPERIMENTAL     # 启用实验功能
```

---

*本教程基于 OpenCode 官方文档编写，最新内容请访问 https://opencode.ai/docs*
