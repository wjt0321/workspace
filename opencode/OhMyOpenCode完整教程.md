# Oh My OpenCode 多智能体编程框架完整教程

## 一、项目概述

### 1.1 什么是 Oh My OpenCode

Oh My OpenCode 是一个革命性的多智能体编程框架，旨在解决传统单模型 AI 编程工作流的局限性。该项目通过引入创新的多模型编排架构，实现了让多个专业化 AI 智能体协同工作的能力，从而完成复杂的软件开发任务。

项目的核心是一个名为 Sisyphus 的主智能体，它扮演着"工程经理"的角色，负责协调和管理多个专业化子智能体的工作。每个子智能体都有其独特的专长领域，分别擅长代码编写、文档检索、问题诊断等不同任务。这种架构设计借鉴了人类软件开发团队的组织方式，将复杂的开发任务分解给最适合的智能体处理。

与传统单模型工作流相比，Oh My OpenCode 显著提升了 AI 辅助编程的效率和质量。它解决了单模型在处理多领域任务时表现不稳定的问题，通过动态任务分配机制，让每个任务都由最擅长的模型处理，从而获得最佳结果。

### 1.2 核心特性与优势

Oh My OpenCode 具备多项独特的技术特性，使其在 AI 编程工具领域中脱颖而出。

多模型编排架构是 Oh My OpenCode 最显著的特点。系统支持同时集成多个 AI 模型提供商的 API，包括 OpenAI（GPT-4、GPT-3.5-Turbo）、Anthropic（Claude 3.5 Sonnet、Claude 3）、Google（Gemini Pro）等。用户可以为不同类型的任务指定不同的模型，实现资源的优化配置。

任务委派机制允许 Sisyphus 根据任务性质智能分配工作。例如，文件读取和文档检索任务优先使用 Claude Sonnet，因为它在长上下文处理方面表现优异；代码编写任务可以使用 Gemini，其在编程任务中展现了出色的能力；复杂问题诊断则交给 GPT-4 处理，发挥其强大的推理能力。

异步后台任务执行是另一个重要特性。系统支持并行处理多个任务，大幅缩短大型项目的构建时间。开发者可以在一个任务执行的同时开始另一个任务，实现真正的并发开发体验。

Todo 持续执行强制器确保任务列表得到完整执行。即使某个任务失败，系统也会继续处理后续任务，并在最后汇总所有失败项，让用户能够全面了解执行状态。这种设计大大提升了工作流的健壮性和可靠性。

LSP 集成提供了实时的代码诊断和错误修复能力。系统与 Language Server Protocol 深度集成，可以在开发过程中即时发现语法错误、类型问题、代码风格问题，并自动进行修复，确保代码质量。

### 1.3 应用场景

Oh My OpenCode 适用于多种复杂的软件开发场景：

全栈应用开发：项目能够同时处理前端（React、Vue、Angular）和后端（Node.js、Python、Go）代码的生成和集成，实现完整的全栈应用构建。

复杂重构任务：当需要对大型代码库进行架构重构时，多智能体协同可以同时处理多个模块，大幅缩短重构周期。

跨技术栈集成：对于需要集成多个技术栈的项目，不同的子智能体可以分别处理各自擅长的领域，实现无缝的技术栈融合。

代码迁移与升级：系统可以将代码从一个框架迁移到另一个框架，或升级到新版本，同时处理必要的依赖更新和配置调整。

文档与测试生成：自动为现有代码库生成文档和测试用例，确保代码的可维护性和质量。

## 二、安装与配置

### 2.1 系统要求

在安装 Oh My OpenCode 之前，需要确保系统满足以下要求：

操作系统：支持 Linux、macOS 和 Windows（通过 WSL）。推荐使用 Ubuntu 20.04 LTS 或更高版本以获得最佳兼容性。

运行时环境：需要 Node.js 18.0.0 或更高版本。可以使用 nvm 或 fnm 管理多个 Node.js 版本。Python 3.8 或更高版本用于某些依赖项的安装。

包管理器：pnpm 是推荐的包管理器，也可以使用 npm 或 yarn。如果使用 npm，建议版本在 8.0 以上。

API 密钥：需要准备至少一个 AI 模型提供商的 API Key。Oh My OpenCode 支持 OpenAI、Anthropic、Google 等主流 AI 服务商。

磁盘空间：至少需要 500MB 的可用磁盘空间用于安装依赖和运行时文件。

### 2.2 安装方法

Oh My OpenCode 提供多种安装方式，选择最适合你环境的方法进行安装。

方法一：使用官方安装脚本（推荐）

```bash
# 使用 curl 安装
curl -fsSL https://ohmyopencode.com/install | bash

# 或使用 wget 安装
wget -qO- https://ohmyopencode.com/install | bash
```

安装脚本会自动检测系统环境，下载并安装最新版本的 Oh My OpenCode 及其所有依赖。安装完成后，需要配置 AI 模型提供商的 API 密钥。

方法二：使用 npm 全局安装

```bash
# 全局安装
npm install -g @oh-my-opencode/cli

# 或使用 pnpm
pnpm add -g @oh-my-opencode/cli

# 或使用 yarn
yarn global add @oh-my-opencode/cli
```

方法三：从源码编译安装

```bash
# 克隆仓库
git clone https://github.com/code-yeongyu/oh-my-opencode.git
cd oh-my-opencode

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 全局链接
pnpm link --global
```

### 2.3 初始化配置

安装完成后，需要进行初始配置以连接 AI 模型服务。运行初始化命令：

```bash
opencode init
```

该命令会在当前目录或用户主目录下创建配置文件目录。配置文件结构如下：

```
~/.config/oh-my-opencode/
├── config.yaml          # 主配置文件
├── prompts/             # 自定义提示词目录
├── agents/              # 自定义智能体配置
└── tools/               # 自定义工具配置
```

### 2.4 配置 AI 模型提供商

在 `config.yaml` 文件中配置 AI 模型的 API 访问：

```yaml
# ~/.config/oh-my-opencode/config.yaml

# OpenAI 配置
openai:
  api_key: sk-your-openai-api-key
  model: gpt-4o
  temperature: 0.2
  max_tokens: 4096

# Anthropic Claude 配置
anthropic:
  api_key: sk-ant-your-anthropic-api-key
  model: claude-3-5-sonnet-20241022
  temperature: 0.2
  max_tokens: 4096

# Google Gemini 配置
google:
  api_key: your-google-api-key
  model: gemini-1.5-pro
  temperature: 0.2

# 默认模型设置
default:
  # 任务类型到模型的默认映射
  task_mapping:
    code: google      # 代码生成使用 Gemini
    docs: anthropic   # 文档处理使用 Claude
    debug: openai     # 问题诊断使用 GPT-4
    test: google      # 测试生成使用 Gemini
```

环境变量方式也受到支持，适合不希望在配置文件中存储 API 密钥的用户：

```bash
export OPENAI_API_KEY="sk-your-key"
export ANTHROPIC_API_KEY="sk-ant-your-key"
export GOOGLE_API_KEY="your-key"
```

### 2.5 验证安装

安装和配置完成后，验证安装是否成功：

```bash
# 检查版本
opencode --version

# 运行帮助命令
opencode --help

# 测试基本功能
opencode test
```

如果一切正常，你会看到版本信息和帮助输出。接下来，可以尝试一个简单的任务来验证系统功能：

```bash
opencode --task "创建一个简单的 Hello World 程序"
```

## 三、Sisyphus 主智能体架构

### 3.1 Sisyphus 概述

Sisyphus 是 Oh My OpenCode 的核心智能体，其设计灵感来自希腊神话中的西西弗斯——永远重复着推石上山工作的神话人物。在 Oh My OpenCode 中，Sisyphus 扮演着"工程经理"的角色，负责统筹协调整个开发过程。

与传统的单智能体系统不同，Sisyphus 采用分层架构设计。主智能体负责高级决策和任务分配，而子智能体专注于具体执行。这种设计既保证了全局视角的掌控，又确保了专业任务的执行质量。

Sisyphus 的工作流程可以概括为以下几个阶段：

理解阶段：接收并解析用户的任务描述，理解任务的目标、范围和约束条件。

规划阶段：将复杂任务分解为可执行的子任务序列，制定执行计划。

分配阶段：根据子任务的性质，将任务分配给最适合的子智能体处理。

协调阶段：监控子智能体的执行进度，处理任务间的依赖关系，确保整体进度协调一致。

整合阶段：收集各子智能体的输出，整合成最终结果，并进行质量验证。

### 3.2 子智能体类型

Sisyphus 协调多个专业化的子智能体，每个子智能体都有其特定的角色和能力：

前端工程师（Frontend Engineer）：使用 Google Gemini 模型，专门负责前端代码的编写和优化。擅长 React、Vue、Angular 等框架的组件开发，以及 CSS 样式和交互效果的实现。

后端工程师（Backend Engineer）：使用 OpenAI GPT-4 模型，负责服务端逻辑的实现。精通各种后端框架、数据库操作、API 设计和性能优化。

图书管理员（Librarian）：使用 Anthropic Claude Sonnet 模型，专注于代码库的浏览、文档检索和知识管理。擅长理解大型代码库的结构和依赖关系。

预言家（Oracle）：使用 OpenAI GPT-4 模型，作为问题诊断和解决方案的专家。能够分析复杂错误信息，提供准确的诊断和修复建议。

测试工程师（Test Engineer）：使用 Google Gemini 模型，负责测试用例的编写和测试框架的配置。确保代码质量和可维护性。

### 3.3 任务分配机制

Sisyphus 的任务分配机制是系统的核心创新之一。分配算法考虑多个因素：

任务类型匹配：根据任务的性质（如代码编写、文档处理、问题诊断）选择最适合的子智能体。

当前负载均衡：考虑各子智能体的当前任务负载，优先分配给空闲的智能体，避免单点过载。

上下文相关性：分析任务与各子智能体历史执行的匹配度，选择成功率更高的执行者。

优先级设置：用户可以为任务设置优先级，高优先级任务优先分配和处理。

配置自定义分配规则：

```yaml
# ~/.config/oh-my-opencode/agents.yaml

agents:
  frontend:
    model: google
    priority: 5
    capabilities:
      - react
      - vue
      - css
      - responsive

  backend:
    model: openai
    priority: 5
    capabilities:
      - nodejs
      - python
      - database
      - api

  librarian:
    model: anthropic
    priority: 3
    capabilities:
      - documentation
      - code-analysis
      - search

  oracle:
    model: openai
    priority: 1  # 最高优先级，用于关键问题
    capabilities:
      - debugging
      - optimization
      - architecture

routing:
  default_agent: frontend
  fallback_agents:
    - oracle
```

## 四、基础使用方法

### 4.1 命令行界面

Oh My OpenCode 提供了直观的命令行界面，是与系统交互的主要方式。基本命令结构：

```bash
opencode [全局选项] <命令> [命令参数] [全局选项]
```

常用命令：

```bash
# 查看帮助
opencode --help

# 查看版本
opencode --version

# 运行任务
opencode "创建一个人脸识别应用"

# 指定配置文件
opencode --config /path/to/config.yaml "修复登录bug"

# 使用特定智能体
opencode --agent sisyphus "重构用户认证模块"

# 详细输出模式
opencode --verbose "添加支付功能"
```

### 4.2 创建项目

使用 Oh My OpenCode 创建新项目非常简单：

```bash
# 创建新项目
opencode init my-project
cd my-project

# 或在现有目录运行
opencode init
```

初始化过程会提示你配置项目信息：

```
项目名称：my-web-app
项目类型：frontend
框架选择：React
语言偏好：TypeScript
是否启用测试：yes
是否添加 CI/CD 配置：yes
```

项目创建完成后，会生成标准的项目结构和配置文件：

```
my-project/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.tsx
├── public/
├── tests/
├── package.json
├── tsconfig.json
├── README.md
└── oh-my-opencode.yaml
```

### 4.3 执行开发任务

使用 Oh My OpenCode 执行各种开发任务：

创建新功能：

```bash
opencode "为用户仪表板添加主题切换功能"
```

系统会分析现有代码结构，添加必要的主题状态管理、样式文件和组件更新。

修改现有功能：

```bash
opencode "将用户表单的验证从 synchronous 改为 async"
```

系统会定位相关代码，进行修改并更新相关测试。

重构代码：

```bash
opencode "将 utils 目录下的函数按功能拆分为多个文件"
```

系统会分析代码依赖关系，执行安全的重构操作。

添加测试：

```bash
opencode "为 authentication 模块添加单元测试，覆盖率要求 80%"
```

系统会生成测试用例，并确保满足覆盖率要求。

### 4.4 交互模式

除了命令行模式，Oh My OpenCode 还支持交互式对话模式：

```bash
# 启动交互模式
opencode --interactive
```

在交互模式下，可以进行多轮对话，逐步完善项目：

```
> 我想创建一个待办事项应用
好的，我来帮你创建一个待办事项应用。首先让我了解一下你的需求：

1. 前端框架偏好？（React/Vue/Angular/其他）
2. 是否需要用户登录功能？
3. 数据存储方式？（本地存储/数据库）
4. 是否需要协作功能？

请回答以上问题，或直接告诉我完整需求。
```

## 五、配置与自定义

### 5.1 配置文件详解

Oh My OpenCode 使用 YAML 格式的配置文件，允许用户深度定制系统行为。主配置文件 `oh-my-opencode.yaml` 位于项目根目录或用户配置目录。

完整的配置结构：

```yaml
# 项目级配置
project:
  name: my-project
  type: fullstack  # frontend | backend | fullstack | library
  framework: react
  language: typescript
  testing: jest

# AI 模型配置
models:
  primary:
    provider: openai
    model: gpt-4o
    temperature: 0.1
    
  secondary:
    provider: anthropic
    model: claude-3-5-sonnet
    temperature: 0.1

# 智能体配置
agents:
  sisyphus:
    enabled: true
    max_iterations: 10
    timeout: 300  # 秒
    
  task:
    default_model: primary
    parallel_execution: true

# 执行控制
execution:
  auto_save: true
  backup_enabled: true
  backup_interval: 300  # 秒
  
# 代码质量
quality:
  linter: eslint
  formatter: prettier
  auto_fix: true
  coverage_threshold: 80

# 输出控制
output:
  verbose: false
  quiet: false
  log_file: logs/oh-my-opencode.log
```

### 5.2 自定义提示词

可以通过自定义提示词来调整智能体的行为模式。提示词文件位于 `~/.config/oh-my-opencode/prompts/` 目录：

```yaml
# ~/.config/oh-my-opencode/prompts/system.yaml

system_prompt: |
  你是一个专业的软件工程师，专注于编写高质量、可维护的代码。
  
  工作原则：
  1. 优先考虑代码的可读性和可维护性
  2. 遵循项目既定的代码风格和最佳实践
  3. 为复杂逻辑添加清晰的注释
  4. 编写全面的测试用例确保代码质量
  5. 注意性能优化，但不以牺牲可读性为代价
  
  代码风格要求：
  - 使用语义化的变量和函数命名
  - 保持函数短小，每个函数只做一件事
  - 避免深层嵌套，必要时提取为独立函数
  - 使用现代语言特性提高代码简洁性

code_review_prompt: |
  作为代码审查专家，请检查以下代码的：
  1. 潜在 bug 和边缘情况
  2. 性能问题
  3. 安全风险
  4. 代码风格一致性
  5. 是否有更优的实现方案
  
  对于每个问题，请说明：
  - 问题描述
  - 严重程度（高/中/低）
  - 建议的修复方案
```

### 5.3 自定义工具集成

Oh My OpenCode 支持集成额外的开发工具和自定义脚本：

```yaml
# ~/.config/oh-my-opencode/tools.yaml

tools:
  # 版本控制
  git:
    enabled: true
    auto_commit: false
    commit_message_format: "feat: {description}"
    
  # 包管理
  npm:
    enabled: true
    auto_install: true
    
  # 代码质量
  eslint:
    enabled: true
    auto_fix_on_save: true
    
  prettier:
    enabled: true
    config: .prettierrc
    
  # 测试
  jest:
    enabled: true
    watch_mode: false
    coverage: true
    
# 自定义脚本
custom_scripts:
  - name: lint-and-test
    command: npm run lint && npm run test
    trigger: before_save
    
  - name: build-check
    command: npm run build
    trigger: after_save
```

### 5.4 MCP 工具配置

Oh My OpenCode 支持 MCP（Model Context Protocol）工具扩展：

```yaml
# ~/.config/oh-my-opencode/mcp.yaml

mcp:
  enabled: true
  
  servers:
    # 文件系统工具
    filesystem:
      command: npx
      args: ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
      
    # Git 工具
    git:
      command: npx
      args: ["-y", "@modelcontextprotocol/server-git"]
      
    # 数据库工具
    database:
      command: ./mcp-server-database
      args: ["--connection-string", "postgresql://..."]
      
    # 自定义 MCP 服务器
    custom:
      command: python
      args: ["custom_mcp_server.py"]
      env:
        API_KEY: "${CUSTOM_API_KEY}"
```

## 六、高级功能

### 6.1 多智能体协同工作

Oh My OpenCode 的多智能体协同功能允许复杂任务被分解并并行执行：

```bash
# 启动多智能体协同模式
opencode --parallel \
  "实现用户认证模块" \
  "实现支付模块" \
  "实现消息通知模块"
```

系统会分析任务依赖关系，创建并行执行计划：

```
任务依赖分析：
├── 用户认证模块（无依赖，并行组 1）
├── 支付模块
│   └── 依赖：用户认证模块
└── 消息通知模块
    └── 依赖：用户认证模块

执行计划：
阶段 1（并行）：
  → 用户认证模块
  → 消息通知模块
阶段 2（待阶段 1 完成）：
  → 支付模块
```

### 6.2 代码修复与重构

系统具备自动代码诊断和修复能力：

```bash
# 运行代码诊断
opencode --agent oracle "诊断项目中的所有错误"

# 自动修复发现的问题
opencode --agent oracle "修复项目中的所有错误，并更新测试"

# 特定文件的重构
opencode "重构 src/components/UserProfile.tsx，优化性能和可读性"
```

### 6.3 项目迁移与升级

Oh My OpenCode 可以帮助完成技术栈迁移：

```bash
# React 到 Vue 的迁移
opencode "将项目从 React 迁移到 Vue 3，保持相同的功能和界面"

# 框架版本升级
opencode "将 Next.js 从 13 升级到 14，处理所有 breaking changes"

# 依赖升级
opencode "将所有 npm 依赖升级到最新兼容版本"
```

### 6.4 文档生成

自动生成项目文档：

```bash
# 生成 API 文档
opencode "为所有 API 端点生成 OpenAPI 文档"

# 生成代码注释
opencode "为 src/utils 目录下的所有函数添加 JSDoc 注释"

# 生成完整文档
opencode "生成完整的项目文档，包括架构说明、API 文档和使用指南"
```

## 七、工作流集成

### 7.1 CI/CD 集成

将 Oh My OpenCode 集成到 CI/CD 流水线中：

```yaml
# .github/workflows/oh-my-opencode.yml
name: Oh My OpenCode Automation

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  code-generation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Setup Oh My OpenCode
        run: |
          npm install -g @oh-my-opencode/cli
          echo "${{ secrets.OPENAI_API_KEY }}" > ~/.config/oh-my-opencode/openai.key
          echo "${{ secrets.ANTHROPIC_API_KEY }}" > ~/.config/oh-my-opencode/anthropic.key
          
      - name: Run Development Task
        run: |
          opencode --config .oh-my-opencode.yaml \
            "Review code changes and ensure quality"
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

### 7.2 IDE 集成

在 VS Code 中使用 Oh My OpenCode：

1. 安装 Oh My OpenCode VS Code 扩展
2. 配置 API 密钥
3. 通过命令面板（Ctrl+Shift+P）调用 Oh My OpenCode 功能

```typescript
// VS Code 扩展配置
{
  "oh-my-opencode.apiProviders": {
    "openai": "${env:OPENAI_API_KEY}",
    "anthropic": "${env:ANTHROPIC_API_KEY}"
  },
  "oh-my-opencode.defaultAgent": "sisyphus",
  "oh-my-opencode.autoSave": true,
  "oh-my-opencode.quickActions": true
}
```

### 7.3 Git Hooks 集成

使用 Git Hooks 自动化开发流程：

```bash
# .git/hooks/pre-commit
#!/bin/bash

# 运行代码质量检查
opencode "检查暂存的代码变更，确保符合质量标准"

if [ $? -ne 0 ]; then
    echo "代码质量检查未通过，请修复问题后重新提交"
    exit 1
fi

exit 0
```

### 7.4 Webhook 触发

通过 Webhook 远程触发 Oh My OpenCode 任务：

```bash
# 设置 webhook
opencode webhook --port 3000 --path /trigger

# 使用 curl 触发任务
curl -X POST http://localhost:3000/trigger \
  -H "Content-Type: application/json" \
  -d '{
    "task": "更新生产环境的用户统计报表",
    "params": {
      "branch": "main",
      "environment": "production"
    }
  }'
```

## 八、实际案例

### 8.1 案例一：全栈电商应用开发

使用 Oh My OpenCode 构建完整的电商应用：

```bash
# 第一步：创建项目基础结构
opencode init ecommerce-platform
cd ecommerce-platform

# 第二步：设计系统架构
opencode "设计电商平台的系统架构，包括前端、后端、数据库和 API 设计"

# 第三步：实现后端 API
opencode "实现以下 API 端点：
- 用户认证（注册、登录、JWT 令牌刷新）
- 商品管理（CRUD、搜索、分类）
- 购物车（添加、删除、更新数量）
- 订单（创建、查询、状态更新）
- 支付集成（模拟支付网关）"

# 第四步：实现前端界面
opencode "实现以下前端页面：
- 首页（商品展示、轮播图、促销活动）
- 商品详情页（图片画廊、规格选择、评论）
- 购物车页面
- 结算页面
- 用户中心（订单历史、地址管理）"

# 第五步：添加测试
opencode "为所有 API 端点编写单元测试和集成测试，添加 E2E 测试"

# 第六步：文档和部署
opencode "生成 API 文档、部署文档和用户手册"
```

### 8.2 案例二：遗留系统现代化

使用 Oh My OpenCode 现代化遗留系统：

```bash
# 评估遗留系统
opencode "分析现有的单体 Java 应用，评估现代化的复杂度和技术债务"

# 制定迁移计划
opencode "制定从单体应用迁移到微服务架构的计划，包括服务拆分策略和迁移顺序"

# 逐步迁移
opencode "将用户认证模块迁移为独立的微服务，使用 Spring Boot + PostgreSQL"

opencode "将商品目录模块迁移为独立的微服务，使用 FastAPI + Redis 缓存"

opencode "创建 API Gateway 统一管理所有微服务的入口"

opencode "实现分布式追踪和日志聚合系统"
```

### 8.3 案例三：AI 功能集成

在现有应用中集成 AI 功能：

```bash
opencode "为现有应用添加智能搜索功能：
1. 集成向量数据库存储文档嵌入
2. 使用 OpenAI embeddings 生成文档向量
3. 实现语义搜索 API
4. 添加搜索建议和自动补全"

opencode "添加智能客服功能：
1. 集成 RAG 系统回答用户问题
2. 实现多轮对话管理
3. 添加人工客服转接逻辑
4. 实现对话历史记录和分析"
```

## 九、最佳实践

### 9.1 提示词优化

为了获得最佳的 AI 执行效果，需要优化提示词的设计：

明确性原则：提示词应当清晰、具体，避免歧义。好的提示词应包含任务目标、约束条件、预期输出格式等信息。

```yaml
# 好的示例
task: "创建用户认证中间件，要求：
- 使用 JWT 进行令牌验证
- 支持令牌刷新机制
- 返回 401 错误时包含具体的错误信息
- 使用 TypeScript 编写，遵循项目现有的代码风格"

# 不好的示例
task: "创建用户认证中间件"
```

上下文提供：在提示词中提供必要的上下文信息，帮助 AI 理解项目背景和需求。

```yaml
task: |
  为现有的 Next.js 电商项目添加用户认证功能。
  
  项目背景：
  - 使用 TypeScript + Next.js 14
  - 已有的用户表结构在 src/db/schema.ts
  - 使用 Prisma 作为 ORM
  - 认证风格参考：src/auth/ 参考实现
  
  任务要求：
  - 实现登录、注册、登出功能
  - 使用 JWT，令牌有效期 7 天
  - 集成现有的用户表
  - 添加相应的 API 路由和前端页面
```

### 9.2 任务分解策略

对于复杂任务，合理的分解可以显著提高执行效果：

渐进式分解：先完成基础功能，再逐步添加高级特性。

```bash
# 阶段 1：基础功能
opencode "实现用户认证的基础功能：注册、登录、登出"

# 阶段 2：安全增强
opencode "增强用户认证的安全性：添加双因素认证、登录尝试限制、异常检测"

# 阶段 3：体验优化
opencode "优化用户认证的体验：添加单点登录、支持社交账号登录、记住我功能"
```

### 9.3 版本控制最佳实践

使用版本控制系统管理 AI 生成的内容：

提交策略：每次 AI 执行后进行单独提交，便于追踪和回滚。

```bash
# 创建功能分支
git checkout -b feature/new-auth-system

# AI 执行任务
opencode "实现用户认证功能"

# 提交变更
git add .
git commit -m "feat: 添加用户认证功能 (by Oh My OpenCode)"

# 审查代码
git diff main...feature/new-auth-system

# 合并到主分支
git checkout main
git merge feature/new-auth-system
```

回滚策略：当 AI 执行产生问题时，可以轻松回滚到之前的状态。

```bash
# 查看历史
git log --oneline

# 回滚到特定版本
git revert <commit-hash>
```

### 9.4 质量保证

确保 AI 生成代码的质量：

代码审查：所有 AI 生成的代码都应经过人工审查。

```bash
# 生成代码后进行审查
opencode "生成代码审查报告，检查所有新增代码的潜在问题"
```

测试覆盖：确保有足够的测试覆盖。

```bash
# 要求 AI 添加测试
opencode "为所有新增功能编写单元测试，确保测试覆盖率不低于 80%"
```

安全扫描：定期进行安全扫描。

```bash
# 安全检查
opencode "对项目进行安全扫描，检查依赖漏洞和代码安全问题"
```

## 十、故障排除与维护

### 10.1 常见问题与解决方案

在使用 Oh My OpenCode 的过程中，可能会遇到一些常见问题：

API 密钥错误：

```bash
# 错误表现
Error: Invalid API key provided

# 解决方案
# 1. 检查 API 密钥是否正确
cat ~/.config/oh-my-opencode/config.yaml

# 2. 验证 API 密钥是否有效
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models

# 3. 更新配置
opencode config --set openai.api_key="新的密钥"
```

网络连接问题：

```bash
# 错误表现
Error: Connection timeout or network error

# 解决方案
# 1. 检查网络连接
ping api.openai.com

# 2. 配置代理（如果需要）
export HTTPS_PROXY="http://proxy.example.com:8080"

# 3. 增加超时时间
opencode --timeout 120 "任务描述"
```

模型配额不足：

```bash
# 错误表现
Error: Rate limit exceeded or Quota exceeded

# 解决方案
# 1. 检查配额使用情况
opencode status

# 2. 切换到其他模型
opencode --model claude-3-5-sonnet "任务描述"

# 3. 减少请求频率或批量处理任务
```

### 10.2 日志分析

调试和故障排除时，日志是重要的信息来源：

```bash
# 启用详细日志模式
opencode --verbose "任务描述" 2>&1 | tee debug.log

# 查看最近的日志
opencode logs --lines 100

# 查看特定日期的日志
opencode logs --date 2025-01-09

# 过滤错误日志
opencode logs --level error
```

### 10.3 性能优化

提升 Oh My OpenCode 的执行性能：

并行执行：利用并行处理能力加速任务。

```bash
opencode --parallel \
  "实现用户模块" \
  "实现商品模块" \
  "实现订单模块"
```

缓存优化：启用结果缓存避免重复计算。

```yaml
# ~/.config/oh-my-opencode/config.yaml
cache:
  enabled: true
  ttl: 3600  # 缓存 1 小时
  dir: ~/.cache/oh-my-opencode
```

资源限制：根据系统资源调整执行参数。

```yaml
# ~/.config/oh-my-opencode/config.yaml
execution:
  max_concurrent_tasks: 4
  memory_limit: "4GB"
  timeout: 600
```

### 10.4 版本升级

保持 Oh My OpenCode 为最新版本：

```bash
# 检查当前版本
opencode --version

# 检查新版本
opencode update --check

# 升级到最新版本
opencode update

# 升级到特定版本
opencode update --version 2.5.0
```

升级注意事项：

1. 阅读版本发布说明，了解变更内容
2. 在测试环境验证新版本的兼容性
3. 备份配置文件
4. 如果有自定义提示词或工具配置，可能需要更新以适配新版本

## 十一、总结与资源

### 11.1 教程总结

本教程全面介绍了 Oh My OpenCode 多智能体编程框架的各个方面。从项目概述和安装配置，到 Sisyphus 主智能体架构和子智能体协同机制；从基础使用方法到高级功能配置；从实际案例到最佳实践和故障排除，涵盖了有效使用 Oh My OpenCode 所需的所有知识。

Oh My OpenCode 的多智能体架构代表了 AI 辅助编程的重要发展方向。通过让专业化的 AI 智能体协同工作，它可以处理传统单模型系统难以完成的复杂开发任务，同时保持代码质量和开发效率。

### 11.2 进阶学习资源

官方文档：https://ohmyopencode.com/docs

GitHub 仓库：https://github.com/code-yeongyu/oh-my-opencode

官方 Discord：加入社区与其他用户交流经验

视频教程：搜索 "Oh My OpenCode" 观看教学视频

### 11.3 社区与支持

遇到问题时，可以通过以下渠道获得帮助：

GitHub Issues：报告 bug 和提出功能建议

GitHub Discussions：讨论使用问题和分享经验

Discord 社区：实时交流和获取帮助

### 11.4 未来展望

Oh My OpenCode 项目持续活跃开发中，未来计划包括：

更多的 AI 模型支持，包括开源模型如 Llama、Mistral 等

更强大的代码分析和优化能力

更好的团队协作功能

与更多开发工具的集成

深入的企业级功能支持

建议用户关注项目的更新动态，及时了解新特性和改进内容。通过参与社区，用户也可以为项目的发展做出贡献。
