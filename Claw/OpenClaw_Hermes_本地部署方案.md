---
title: OpenClaw + Hermes Agent 本地部署方案
date: 2026-04-23
tags:
  - AI-Agent
  - 本地部署
  - OpenClaw
  - Hermes-Agent
  - Ollama
  - 部署方案
aliases:
  - OpenClaw Hermes 部署
  - 双引擎 Agent 部署
status: complete
---

# OpenClaw + Hermes Agent 本地部署方案

> [!abstract] 概要
> 本方案基于 2026 年 4 月对 GitHub 两个热门开源 AI Agent 项目的深度调研，设计了一套完整的本地私有化部署方案。通过 Ollama 本地推理引擎 + OpenClaw 执行网关 + Hermes Agent 学习框架的三层架构，实现完全离线、零 API 成本、数据不外泄的 AI Agent 系统。

## 目录

- [[#1. 项目调研概览]]
- [[#2. 整体架构设计]]
- [[#3. OpenClaw 详细介绍]]
- [[#4. Hermes Agent 详细介绍]]
- [[#5. 本地推理引擎选择]]
- [[#6. 硬件配置推荐]]
- [[#7. 详细部署步骤]]
- [[#8. 双引擎协同配置]]
- [[#9. 常见问题与排错]]
- [[#10. 后续优化与生产建议]]

---

## 1. 项目调研概览

### 1.1 OpenClaw

| 属性 | 详情 |
|------|------|
| **GitHub** | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| **Stars** | 179K+（60 天内从 9K 增长到 179K，比 Kubernetes 快 18 倍） |
| **协议** | MIT License |
| **语言** | TypeScript |
| **最新版本** | 2026.4.21（几乎每日更新） |
| **创始人** | Peter Steinberger（@steipete），PSPDFKit 创始人 |
| **定位** | 开源本地优先 AI Agent ==执行网关== |

> [!note] 项目名称历史
> - 2025.11 → Clawdbot（初始名称）
> - 2026.01.27 → Moltbot（Anthropic 商标投诉）
> - 2026.01.30 → **OpenClaw**（社区投票决定）

### 1.2 Hermes Agent

| 属性 | 详情 |
|------|------|
| **GitHub** | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) |
| **Stars** | 33K+ |
| **协议** | MIT License |
| **语言** | Python（主体）+ Node.js（部分工具） |
| **最新版本** | v0.10.0（2026.04.16） |
| **组织** | Nous Research（美国开源 AI 研究实验室） |
| **定位** | ==唯一内置闭环学习系统==的开源 Agent 框架 |

### 1.3 为什么选择这两个项目？

> [!tip] 组合优势
> - **OpenClaw** 擅长：多渠道接入（50+）、执行网关、技能生态（5700+）、Cron 定时任务
> - **Hermes** 擅长：闭环学习、自动技能生成、用户画像建模、IDE 集成
> - **两者互补**：OpenClaw 做"手脚"，Hermes 做"大脑的学习系统"，1+1 > 2

---

## 2. 整体架构设计

![[assets/architecture_2100x1200.png|800]]

### 2.1 三层架构

```
┌─────────────────────────────────────────────────────────────┐
│                     用户交互层                                │
│  飞书 / 微信 / QQ / Telegram / Discord / Web / CLI / IDE    │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   Agent 控制层                               │
│  ┌──────────────────┐    ↔    ┌─────────────────────────┐   │
│  │    OpenClaw       │         │    Hermes Agent          │   │
│  │  · Gateway 网关   │         │  · 闭环学习系统          │   │
│  │  · 消息路由       │         │  · 技能自动生成          │   │
│  │  · 渠道适配器     │         │  · Honcho 用户画像      │   │
│  │  · Cron 调度      │         │  · MCP/ACP 协议         │   │
│  └──────────────────┘         └─────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           ↓ OpenAI 兼容 API
┌─────────────────────────────────────────────────────────────┐
│                   本地推理引擎层                              │
│  ┌─────────────┐    ┌─────────────┐                         │
│  │   Ollama    │ or │  LM Studio  │   ← 本地 LLM            │
│  │  :11434     │    │  :1234      │                         │
│  └─────────────┘    └─────────────┘                         │
│         推荐模型: Qwen2.5-Coder / DeepSeek-V3 / Gemma4      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 数据流说明

1. **用户消息** 通过飞书/微信等渠道进入 OpenClaw Gateway
2. **Gateway 路由** 根据消息类型和配置，决定由 OpenClaw 直接处理或转发给 Hermes
3. **Agent 处理** 调用本地 Ollama API 进行 LLM 推理，执行工具/技能
4. **结果返回** 通过原渠道回传给用户
5. **学习闭环** Hermes 从执行结果中自动提取经验，生成/改进技能

---

## 3. OpenClaw 详细介绍

### 3.1 核心架构（6 层）

| 层级 | 功能 | 说明 |
|------|------|------|
| **Gateway** | 中央控制平面 | 消息路由、会话管理、插件加载、工具执行策略 |
| **Channels** | 渠道适配 | 将 Telegram/WhatsApp/飞书等消息标准化为统一格式 |
| **Routing + Sessions** | 路由 + 会话 | 决定哪个 Agent 处理特定对话 |
| **Agent Runtime** | Agent 运行时 | 处理上下文、调用模型提供商、流式响应、请求工具 |
| **Tools** | 工具层 | 网页抓取、浏览器控制、命令执行、设备配对 |
| **Surfaces** | 交互面 | 聊天应用、Web 仪表盘、macOS 菜单栏、Live Canvas |

### 3.2 四大核心子系统

#### 记忆系统
- **持久记忆**：跨会话保持上下文，了解你的笔记、习惯、偏好
- **Active Memory**：内置主动记忆能力
- **可插拔后端**：SQLite（默认）、PostgreSQL、Redis
- **上下文压缩**：支持 Compaction，防止上下文溢出

#### Cron 定时任务 + 心跳
- **心跳系统**：后台 24/7 运行，不会只是等待指令
- **Cron 调度**：标准 cron 表达式，运行时执行状态分离存储到 `jobs-state.json`
- **主动评估**：独立评估如何帮助你，监控应用、通过 webhook 捕获错误并自动解决
- **后台 Worker**：自主检查航班状态、总结公司对话等

#### 50+ 通信渠道

> [!example] 支持的中国用户常用渠道
> - **飞书** (Feishu)
> - **微信** (WeChat)
> - **QQ**
> - **钉钉**（通过 Webhook）
> - **企业微信**（通过 Webhook）

其他渠道：WhatsApp、Telegram、Discord、Slack、Signal、iMessage、IRC、Google Chat、Microsoft Teams、Matrix、LINE、Email、SMS 等。

#### 技能生态
- **5,700+ 社区技能**（通过 ClawHub）
- **50+ 内置集成**：Gmail、Google Calendar、Notion、Linear、Jira、GitHub、Spotify、HomeAssistant 等
- **MCP 支持**：Model Context Protocol 扩展工具能力
- **AI 自建技能**：可根据 YouTube 视频或笔记为自己编写新技能
- **插件架构**：TypeScript 编写，支持热重载

### 3.3 支持的 LLM 提供商

OpenClaw 采用 **BYOM (Bring Your Own Model)** 架构：

| 提供商 | 模型示例 | 备注 |
|--------|----------|------|
| **Ollama** | Llama, Mistral, Qwen 等 | ==完全离线运行，零 API 成本== |
| Anthropic | Claude Opus 4.5/4.6 | 推荐，支持 thinking 模式 |
| OpenAI | GPT-5.3 Codex, GPT-4o | 支持 OAuth |
| Google | Gemini 3.1 Pro | Flash-Lite 有免费层 |
| DeepSeek | DeepSeek V3 | 性价比最高的推理模型 |
| Moonshot | Kimi K2.6 | 内置 Web 搜索 |
| OpenRouter | 200+ 模型 | 统一 API |
| **任何 OpenAI 兼容端点** | 自定义 | 通过配置接入 |

### 3.4 安装方式

```bash
# 方式一：npm 安装（推荐）
npm install -g openclaw@latest
openclaw onboard --install-daemon

# 方式二：官方安装脚本
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard --install-daemon

# 方式三：Docker
git clone https://github.com/openclaw/openclaw.git
cd openclaw
./docker-setup.sh
```

### 3.5 系统要求

| 组件 | 最低 | 推荐（本地 LLM） |
|------|------|------------------|
| 操作系统 | macOS 11+ / Ubuntu 22.04+ / WSL2 | 同左 |
| Node.js | 22+ | 24 |
| 内存 | 2 GB | 16-24 GB |
| CPU | 2 核 | 2-4 核 |
| 存储 | 10 GB SSD | 30-50 GB SSD |
| GPU | 无（云模型） | 12-24 GB VRAM |

---

## 4. Hermes Agent 详细介绍

### 4.1 核心特性

#### 闭环学习系统（核心差异化）

> [!important] 这是 Hermes Agent 最独特的功能
> 它是==唯一一个内置闭环学习系统==的开源 Agent 框架。

- **自动创建技能**：当 Agent 完成复杂任务（通常 5+ 次工具调用）后，会自动生成结构化的 Markdown 技能文档
- **技能自我改进**：在后续使用中发现更好的方法时，会自动更新技能文档
- **持久记忆**：维护 `MEMORY.md` 文件，Agent 主动管理并定期"提醒"自己持久化重要知识
- **跨会话搜索**：基于 SQLite + FTS5 全文搜索，可检索历史会话内容

#### Honcho 用户建模
- 集成 [Honcho](https://github.com/plastic-labs/honcho) 辩证式用户建模系统
- 跨会话构建对用户的深度理解（偏好、目标、沟通风格等）
- 支持 Gateway 模式下的多用户隔离

#### 70+ 技能市场
- 内置 40+ 技能，涵盖 MLOps、GitHub 工作流、绘图、笔记等
- 兼容 [agentskills.io](https://agentskills.io/) 开放标准
- 支持从多个来源安装：

```bash
hermes skills browse                    # 浏览所有来源
hermes skills search kubernetes         # 搜索
hermes skills inspect openai/skills/k8s # 预览
hermes skills install openai/skills/k8s # 安装
```

#### 多平台消息网关
- 支持 Telegram、Discord、Slack、WhatsApp、Signal、Email (IMAP/SMTP)、Home Assistant
- 单一 Gateway 进程，跨平台会话连续性
- 语音消息转录、媒体附件支持

#### IDE 集成（ACP 协议）
- 支持 VS Code、Zed、JetBrains 通过 ACP (Agent Communication Protocol) 标准连接
- 作为 ACP Server 运行，IDE 可直接调用

#### RL 训练管线
- 集成 Tinker-Atropos RL 框架
- 支持 GRPO + LoRA 微调
- 批量轨迹生成、轨迹压缩

### 4.2 支持的 LLM 提供商

| 提供商 | 说明 |
|--------|------|
| **Ollama** | 本地免费离线运行 |
| Nous Portal | Nous Research 自有平台 |
| OpenRouter | 200+ 模型 |
| Anthropic | 原生 Claude API |
| OpenAI | API Key 或 ChatGPT 订阅 |
| NVIDIA NIM | Nemotron 模型 |
| Hugging Face | HF 推理端点 |
| **自定义端点** | 任意 OpenAI 兼容 API |

### 4.3 安装方式

```bash
# 方式一：一键脚本安装（推荐）
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc
hermes

# 方式二：Docker
docker pull nousresearch/hermes-agent:latest
mkdir -p ~/.hermes
docker run -it --rm \
  -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent:latest hermes setup
docker run -it --rm \
  -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent:latest hermes

# 方式三：pip 开发者模式
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv .venv --python 3.11
source .venv/bin/activate
uv pip install -e ".[all,dev]"
```

### 4.4 系统要求

| 组件 | 最低 | 推荐 |
|------|------|------|
| 操作系统 | Linux / macOS / Windows WSL2 | 同左 |
| Python | 3.11+ | 3.12+ |
| 内存 | 4 GB | 8 GB+ |
| 存储 | 2 GB | 10 GB+ |
| 模型上下文 | ==至少 64,000 tokens== | 128K+ |
| GPU（本地模型） | 8 GB VRAM | 16 GB+ |

> [!warning] 重要限制
> Hermes Agent 要求本地模型上下文大小至少 ==64K tokens==，低于此值的模型会被拒绝启动。配置 Ollama 时需确保：
> ```bash
> ollama run gemma4 --ctx-size 65536
> ```

---

## 5. 本地推理引擎选择

### 5.1 Ollama（推荐）

| 属性 | 详情 |
|------|------|
| **官网** | [ollama.com](https://ollama.com) |
| **费用** | 完全免费开源 |
| **API** | OpenAI 兼容 API（`/v1/chat/completions`） |
| **默认端口** | 11434 |
| **GUI** | 无（命令行） |
| **模型管理** | `ollama pull/run/list/rm` |

**优势**：
- 完全离线运行，数据不外发
- OpenAI 兼容 API，OpenClaw 和 Hermes 均原生支持
- 社区活跃，模型更新快
- 支持多 GPU 并行推理

### 5.2 LM Studio

| 属性 | 详情 |
|------|------|
| **官网** | [lmstudio.ai](https://lmstudio.ai) |
| **费用** | 免费基础版 / Pro $15/月 |
| **API** | OpenAI 兼容 API |
| **默认端口** | 1234 |
| **GUI** | 有（桌面应用） |
| **模型管理** | 图形界面搜索、下载、配置 |

**优势**：
- 友好的 GUI 界面，适合非技术用户
- 内置模型搜索和下载
- 实时查看推理速度和资源占用

### 5.3 推荐模型

| 模型 | 参数量 | 上下文 | VRAM 需求 | 适用场景 |
|------|--------|--------|-----------|----------|
| **Qwen2.5-Coder:32B** | 32B | 128K | 20 GB | 编码、通用 |
| **DeepSeek-V3** | 671B MoE | 128K | 40 GB+ | 复杂推理 |
| **Gemma4** | 27B | 128K | 16 GB | 通用对话 |
| **Llama-4-Scout** | 17B MoE | 10M | 10 GB | 长上下文 |
| **Qwen2.5:7B** | 7B | 128K | 6 GB | 轻量级 |

> [!tip] 推荐选择
> - **性价比最优**：Qwen2.5-Coder:32B（20GB VRAM 即可流畅运行）
> - **低配机器**：Qwen2.5:7B（6GB VRAM，Apple Silicon Metal 加速可达 50-80 tokens/秒）
> - **最强推理**：DeepSeek-V3（需要 40GB+ VRAM 或多卡）

---

## 6. 硬件配置推荐

![[assets/hardware_1800x825.png|700]]

### 6.1 三档配置方案

#### 最低配置（7B 模型）

| 组件 | 要求 |
|------|------|
| CPU | 4 核+ |
| RAM | 16 GB |
| GPU | 8 GB VRAM（GTX 1660 Super / RTX 2060） |
| 存储 | 30 GB SSD |
| 系统 | Ubuntu 22.04+ / macOS |
| 预估成本 | 现有开发机即可 |

#### 推荐配置（32B 模型）⭐

| 组件 | 要求 |
|------|------|
| CPU | 8 核+ |
| RAM | 32 GB |
| GPU | 16-24 GB VRAM（RTX 4090 / Mac Studio M2 Ultra） |
| 存储 | 100 GB SSD |
| 系统 | Ubuntu 22.04+ / macOS |
| 预估成本 | ¥15,000-25,000（GPU 主机）或 Mac Studio |

#### 高性能配置（72B 模型）

| 组件 | 要求 |
|------|------|
| CPU | 16 核+ |
| RAM | 64 GB |
| GPU | 48 GB+ VRAM（A100 80G / 2×RTX 4090） |
| 存储 | 200 GB NVMe |
| 系统 | Ubuntu 22.04+ |
| 预估成本 | ¥50,000+ |

### 6.2 Apple Silicon 特别说明

> [!note] Mac 用户优势
> Apple Silicon (M2/M3/M4) 通过 Metal 加速可在 7B 模型上达到 ==50-80 tokens/秒==，体验接近云端 API。
> - M2/M3 (16GB 统一内存)：可流畅运行 7B 模型
> - M3/M4 Pro (36GB)：可运行 32B 模型
> - M2/M3/M4 Ultra (64-192GB)：可运行 70B+ 模型

---

## 7. 详细部署步骤

![[assets/deploy_flow_2100x1050.png|800]]

### Step 1: 环境准备（~10 分钟）

#### 1.1 系统更新

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# macOS
brew update && brew upgrade
```

#### 1.2 安装 Node.js 22+

```bash
# 使用 nvm（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
node --version  # 应显示 v22.x.x
```

#### 1.3 安装 Python 3.11+

```bash
# Ubuntu/Debian
sudo apt install -y python3.11 python3.11-venv python3-pip

# macOS
brew install python@3.11

# 验证
python3 --version  # 应显示 3.11.x+
```

#### 1.4 安装 Git

```bash
# Ubuntu/Debian
sudo apt install -y git

# macOS
brew install git
```

#### 1.5 安装 Docker（可选，用于沙箱）

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# macOS
brew install --cask docker
```

#### 1.6 安装其他依赖

```bash
# Ubuntu/Debian
sudo apt install -y ripgrep ffmpeg

# macOS
brew install ripgrep ffmpeg
```

---

### Step 2: 部署 Ollama 推理引擎（~15 分钟）

#### 2.1 安装 Ollama

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# macOS
brew install ollama
# 或从 https://ollama.com/download 下载 GUI 应用

# 启动 Ollama 服务
ollama serve
# 默认监听 http://localhost:11434
```

#### 2.2 拉取推荐模型

```bash
# 拉取 Qwen2.5-Coder 32B（推荐，需 20GB VRAM）
ollama pull qwen2.5-coder:32b

# 或拉取轻量版（需 6GB VRAM）
ollama pull qwen2.5-coder:7b

# 或拉取 DeepSeek-V3（需 40GB+ VRAM）
ollama pull deepseek-v3

# 查看已安装模型
ollama list
```

#### 2.3 配置模型参数

> [!warning] 关键配置
> Hermes Agent 要求模型上下文至少 64K tokens，必须显式设置：

```bash
# 创建 Modelfile 自定义模型
cat > Modelfile.qwen << 'EOF'
FROM qwen2.5-coder:32b

# 设置上下文大小为 128K
PARAMETER num_ctx 131072

# 设置温度
PARAMETER temperature 0.7

# 系统提示
SYSTEM """你是一个专业的 AI 助手，擅长编程、分析和执行任务。"""
EOF

# 构建自定义模型
ollama create qwen2.5-coder:32b-128k -f Modelfile.qwen

# 验证
ollama run qwen2.5-coder:32b-128k "你好，请自我介绍"
```

#### 2.4 验证 API

```bash
# 测试 Ollama API
curl http://localhost:11434/v1/models

# 测试 OpenAI 兼容接口
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5-coder:32b-128k",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 50
  }'
```

#### 2.5 配置 Ollama 为系统服务（推荐）

```bash
# 创建 systemd 服务
sudo tee /etc/systemd/system/ollama.service << 'EOF'
[Unit]
Description=Ollama Service
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=/usr/local/bin/ollama serve
Restart=always
RestartSec=3
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_ORIGINS=*"

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable ollama
sudo systemctl start ollama

# 验证状态
sudo systemctl status ollama
```

---

### Step 3: 部署 OpenClaw（~20 分钟）

#### 3.1 安装

```bash
# 方式一：npm 全局安装（推荐）
npm install -g openclaw@latest

# 方式二：官方安装脚本
curl -fsSL https://openclaw.ai/install.sh | bash

# 验证安装
openclaw --version
```

#### 3.2 初始化配置

```bash
# 交互式初始化（会引导你配置 API Key、渠道等）
openclaw onboard --install-daemon

# 如果只想配置 Ollama 而跳过其他
openclaw onboard
```

#### 3.3 配置 Ollama 作为 LLM 后端

```bash
# 设置模型提供商为 Ollama
openclaw config set model.provider ollama

# 设置模型名称
openclaw config set model.name qwen2.5-coder:32b-128k

# 设置 API 基础 URL（Ollama 默认）
openclaw config set model.apiBase http://localhost:11434/v1

# API Key 留空（Ollama 不需要）
openclaw config set model.apiKey ""
```

#### 3.4 配置文件详解

OpenClaw 的配置文件通常位于 `~/.openclaw/config.yaml`：

```yaml
# ~/.openclaw/config.yaml 示例

# 模型配置
model:
  provider: ollama
  name: qwen2.5-coder:32b-128k
  apiBase: http://localhost:11434/v1
  apiKey: ""
  temperature: 0.7
  maxTokens: 4096

# 模型故障转移（可选）
modelFailover:
  - provider: ollama
    model: qwen2.5-coder:7b
  - provider: ollama
    model: gemma4

# Gateway 配置
gateway:
  port: 18789
  host: 0.0.0.0

# 记忆配置
memory:
  backend: sqlite
  path: ~/.openclaw/memory.db

# Cron 配置
cron:
  enabled: true
  timezone: Asia/Shanghai

# 安全配置
security:
  allowFrom:
    - 127.0.0.1
    - 192.168.1.0/24
```

#### 3.5 启动 OpenClaw

```bash
# 启动 Gateway（前台运行）
openclaw gateway --port 18789 --verbose

# 或以 daemon 模式运行
openclaw onboard --install-daemon

# 验证 Gateway 状态
openclaw status

# 测试 Agent
openclaw agent --message "你好，请自我介绍" --thinking high
```

#### 3.6 Docker 部署（可选）

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 使用 Docker Compose
docker-compose up -d

# 或手动运行
docker build -t openclaw .
docker run -d \
  --name openclaw \
  -p 18789:18789 \
  -v ~/.openclaw:/root/.openclaw \
  -e OLLAMA_HOST=http://host.docker.internal:11434 \
  openclaw
```

---

### Step 4: 部署 Hermes Agent（~20 分钟）

#### 4.1 安装

```bash
# 方式一：一键安装脚本（推荐）
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc

# 方式二：pip 开发者模式
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv .venv --python 3.11
source .venv/bin/activate
uv pip install -e ".[all,dev]"

# 验证安装
hermes --version
```

#### 4.2 初始化配置

```bash
# 交互式配置
hermes setup

# 会提示你选择：
# 1. LLM 提供商 → 选择 "Custom endpoint"
# 2. API Base URL → 输入 http://127.0.0.1:11434/v1
# 3. API Key → 留空
# 4. 模型名称 → 输入 qwen2.5-coder:32b-128k
```

#### 4.3 手动编辑配置文件

Hermes 的配置文件位于 `~/.hermes/config.yaml`：

```yaml
# ~/.hermes/config.yaml 示例

# LLM 配置
llm:
  provider: custom
  model: qwen2.5-coder:32b-128k
  api_base: http://127.0.0.1:11434/v1
  api_key: ""
  temperature: 0.7
  max_tokens: 4096
  context_size: 131072

# 提供商回退链
fallback_providers:
  - provider: custom
    model: qwen2.5-coder:7b
  - provider: custom
    model: gemma4

# 记忆配置
memory:
  enabled: true
  backend: sqlite
  path: ~/.hermes/memory.db

# Honcho 用户画像
honcho:
  enabled: true

# MCP 服务器配置
mcp_servers:
  # 示例：GitHub MCP
  # github:
  #   command: npx
  #   args: ["-y", "@modelcontextprotocol/server-github"]
  #   env:
  #     GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"
  #   timeout: 120

# Cron 配置
cron:
  enabled: true
  timezone: Asia/Shanghai

# 技能配置
skills:
  auto_learn: true  # 自动从经验中学习
  auto_improve: true  # 自动改进已有技能
```

#### 4.4 启动 Hermes Agent

```bash
# 启动交互式 Agent
hermes

# 启动 Gateway 模式（多平台消息）
hermes gateway

# 验证
hermes chat "你好，请自我介绍"
```

#### 4.5 Docker 部署（可选）

```bash
docker pull nousresearch/hermes-agent:latest
mkdir -p ~/.hermes

# 首次配置
docker run -it --rm \
  -v ~/.hermes:/opt/data \
  -e OLLAMA_HOST=http://host.docker.internal:11434 \
  nousresearch/hermes-agent:latest hermes setup

# 启动
docker run -d \
  --name hermes-agent \
  -v ~/.hermes:/opt/data \
  -e OLLAMA_HOST=http://host.docker.internal:11434 \
  nousresearch/hermes-agent:latest hermes
```

---

### Step 5: 双引擎协同配置（~15 分钟）

详见下一章节 [[#8. 双引擎协同配置]]。

---

## 8. 双引擎协同配置

![[assets/comparison_1800x900.png|700]]

### 8.1 协同策略总览

```
┌─────────────────────────────────────────────────────┐
│                  协同策略                             │
├──────────────┬──────────────────────────────────────┤
│  技能共享     │ OpenClaw 5700+ ↔ Hermes 70+          │
│  消息路由     │ OpenClaw Gateway → Hermes 子代理      │
│  记忆协同     │ OpenClaw 会话 + Honcho 用户画像       │
│  学习闭环     │ Hermes 生成技能 → OpenClaw 验证执行   │
└──────────────┴──────────────────────────────────────┘
```

### 8.2 技能共享

两者均支持 [agentskills.io](https://agentskills.io/) 开放标准，技能格式兼容：

```bash
# 在 Hermes 中浏览和安装技能
hermes skills browse
hermes skills search "web scraping"
hermes skills install some-org/skills/web-scraper

# OpenClaw 通过 ClawHub 安装技能
openclaw skills search "web scraping"
openclaw skills install clawhub://web-scraper

# 手动共享：将技能 Markdown 文件复制到双方技能目录
# OpenClaw: ~/.openclaw/skills/
# Hermes: ~/.hermes/skills/
```

### 8.3 消息路由配置

将 OpenClaw 配置为统一入口，将特定任务路由到 Hermes：

```yaml
# ~/.openclaw/config.yaml 中添加路由规则

routing:
  rules:
    # 编码和学习类任务路由到 Hermes
    - match:
        type: "coding"
      agent: "hermes"
      endpoint: "http://localhost:4224"
    
    - match:
        type: "research"
      agent: "hermes"
      endpoint: "http://localhost:4224"
    
    # 其他任务由 OpenClaw 直接处理
    - match:
        type: "*"
      agent: "openclaw"
```

### 8.4 Hermes 迁移工具

Hermes Agent 提供了完整的 OpenClaw 迁移工具：

```bash
# 从 OpenClaw 迁移设置、记忆、技能、API Key
hermes claw migrate

# 会自动导入：
# - API Key 配置
# - 记忆数据
# - 已安装技能
# - 用户偏好设置
```

### 8.5 记忆协同方案

```
用户交互
    ↓
OpenClaw (会话管理 + 上下文)
    ↓ 记忆数据
Hermes (Honcho 用户画像 + FTS5 搜索)
    ↓ 用户洞察
反馈给 OpenClaw 优化响应
```

### 8.6 学习闭环工作流

```
1. 用户提出任务
       ↓
2. OpenClaw 执行任务（调用工具/技能）
       ↓
3. Hermes 观察执行过程
       ↓
4. 如果任务复杂度 ≥ 5 次工具调用：
   → Hermes 自动生成技能文档
   → 技能保存到共享技能目录
       ↓
5. 下次类似任务时：
   → OpenClaw 直接使用新技能
   → 执行效率提升
       ↓
6. Hermes 持续监控技能效果
   → 自动改进/更新技能
```

### 8.7 MCP 服务器共享

两者都支持 MCP (Model Context Protocol)，可以共享 MCP 服务器：

```yaml
# 在双方配置中添加相同的 MCP 服务器

# ~/.openclaw/config.yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"

# ~/.hermes/config.yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"
```

---

## 9. 常见问题与排错

### 9.1 Ollama 相关

> [!bug] Ollama 启动失败
> ```bash
> # 检查 Ollama 状态
> sudo systemctl status ollama
> 
> # 查看日志
> journalctl -u ollama -f
> 
> # 常见原因：
> # 1. 端口被占用 → lsof -i :11434
> # 2. GPU 驱动问题 → nvidia-smi 检查
> # 3. 内存不足 → 减小模型或增加 swap
> ```

> [!bug] 模型推理速度很慢
> ```bash
> # 检查 GPU 是否被正确使用
> nvidia-smi  # 应显示 ollama 进程占用 GPU
> 
> # 如果 GPU 未被使用：
> # 1. 确认 NVIDIA 驱动已安装
> # 2. 确认 CUDA toolkit 已安装
> # 3. 重启 Ollama 服务
> sudo systemctl restart ollama
> ```

> [!bug] 上下文长度不够
> ```bash
> # Hermes 要求至少 64K 上下文
> # 检查当前模型配置
> ollama show qwen2.5-coder:32b | grep context
> 
> # 重新创建模型并设置上下文
> # 见 Step 2.3 的 Modelfile 配置
> ```

### 9.2 OpenClaw 相关

> [!bug] onboard 过程中崩溃
> - 最低 2GB RAM 可能在 onboard 时不足，建议 4GB+
> - 尝试增加 swap：`sudo fallocate -l 4G /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`

> [!bug] 渠道连接失败（飞书/微信）
> - 确认 API Token/Secret 配置正确
> - 确认网络可达（飞书需要能访问 open.feishu.cn）
> - 查看 Gateway 日志：`openclaw gateway --verbose`

### 9.3 Hermes Agent 相关

> [!bug] 模型上下文不足被拒绝启动
> ```
> Error: Model context size must be at least 65536 tokens
> ```
> 解决方案：见 Step 2.3，使用 Modelfile 设置 `num_ctx 131072`

> [!bug] 技能安装失败
> ```bash
> # 检查网络连接
> curl -I https://agentskills.io
> 
> # 手动安装技能
> hermes skills install --local /path/to/skill
> ```

### 9.4 双引擎协同相关

> [!bug] OpenClaw 无法连接 Hermes
> ```bash
> # 检查 Hermes Gateway 是否运行
> curl http://localhost:4224/health
> 
> # 检查 OpenClaw 路由配置
> openclaw config get routing
> 
> # 检查防火墙
> sudo ufw allow 4224
> ```

---

## 10. 后续优化与生产建议

### 10.1 四阶段推进路线

> [!success] 推荐路径
> 
> **Phase 1 — 快速验证（1-2 天）**
> - Ollama + OpenClaw 基础部署
> - 接入 1-2 个通信渠道（如飞书）
> - 验证核心场景可用
> 
> **Phase 2 — 学习增强（3-5 天）**
> - 接入 Hermes Agent
> - 启用闭环学习系统
> - 配置 Honcho 用户画像
> 
> **Phase 3 — 双引擎协同（1 周）**
> - 配置技能共享
> - 设置消息路由规则
> - 验证学习闭环工作流
> 
> **Phase 4 — 生产优化（持续）**
> - 性能监控和告警
> - 安全加固（网络隔离、访问控制）
> - 技能持续积累和优化

### 10.2 安全建议

- **网络隔离**：Ollama 默认只监听 localhost，不要暴露到公网
- **访问控制**：OpenClaw 配置 `allowFrom` 限制来源 IP
- **数据加密**：敏感配置使用环境变量，不要写入配置文件
- **定期更新**：两个项目更新频繁，建议每周检查更新

### 10.3 监控建议

```bash
# Ollama 资源监控
watch -n 5 'nvidia-smi && ollama list'

# OpenClaw Gateway 状态
openclaw status

# Hermes Agent 日志
hermes logs --follow
```

### 10.4 备份策略

```bash
# 备份 OpenClaw 数据
tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz ~/.openclaw/

# 备份 Hermes 数据
tar -czf hermes-backup-$(date +%Y%m%d).tar.gz ~/.hermes/

# 备份 Ollama 模型
ollama list  # 记录已安装模型列表
```

---

## 附录

### A. 关键链接

| 项目 | 链接 |
|------|------|
| OpenClaw GitHub | [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) |
| OpenClaw 文档 | [docs.openclaw.ai](https://docs.openclaw.ai/) |
| ClawHub 技能市场 | [clawhub.com](https://clawhub.com/) |
| Hermes Agent GitHub | [github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) |
| Hermes Agent 文档 | [hermes-agent.nousresearch.com/docs/](https://hermes-agent.nousresearch.com/docs/) |
| agentskills.io | [agentskills.io](https://agentskills.io/) |
| Ollama | [ollama.com](https://ollama.com/) |
| LM Studio | [lmstudio.ai](https://lmstudio.ai/) |
| Honcho 用户建模 | [github.com/plastic-labs/honcho](https://github.com/plastic-labs/honcho) |

### B. 版本信息

| 项目 | 最新版本 | 调研日期 |
|------|----------|----------|
| OpenClaw | 2026.4.21 | 2026-04-23 |
| Hermes Agent | v0.10.0 | 2026-04-23 |
| Ollama | 最新版 | 2026-04-23 |

---

> [!quote] 总结
> OpenClaw + Hermes Agent + Ollama 的组合提供了一套完全本地化、零 API 成本、数据不外泄的 AI Agent 系统。OpenClaw 作为执行网关负责多渠道接入和任务执行，Hermes Agent 作为学习框架负责闭环技能生成和用户画像建模，两者通过共享技能目录和消息路由实现深度协同。最低 $5/月 VPS 即可运行基础方案，推荐配置约 ¥15,000-25,000 的 GPU 主机或 Mac Studio。
