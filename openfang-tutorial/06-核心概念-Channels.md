---
title: OpenFang Channels 核心概念
tags:
  - OpenFang
  - Channels
  - 核心概念
aliases:
  - Channels系统
  - 消息通道
date: 2026-03-01
---

# OpenFang Channels 核心概念

## 什么是 Channels？

Channels（通道）是 OpenFang 的**消息集成系统**——将你的 Agent 连接到用户所在的各种通讯平台。

> [!important] 核心价值
> 一次构建，到处部署——同一个 Agent 可以同时在 Telegram、Discord、Slack、微信等 40+ 平台上运行。

## 支持的平台

### 核心平台

| 平台 | 类型 | 特性支持 |
|------|------|----------|
| Telegram | 即时通讯 | ✅ 完整支持 |
| Discord | 社区 | ✅ 完整支持 |
| Slack | 企业协作 | ✅ 完整支持 |
| WhatsApp | 即时通讯 | ✅ 完整支持 |
| Signal | 隐私通讯 | ✅ 完整支持 |
| Matrix | 去中心化 | ✅ 完整支持 |
| Email | IMAP/SMTP | ✅ 完整支持 |

### 企业平台

| 平台 | 类型 | 特性支持 |
|------|------|----------|
| Microsoft Teams | 企业协作 | ✅ 完整支持 |
| Mattermost | 自托管 | ✅ 完整支持 |
| Google Chat | 企业协作 | ✅ 完整支持 |
| Webex | 视频会议 | ✅ 完整支持 |
| Feishu/Lark | 企业协作 | ✅ 完整支持 |
| Zulip | 开源 | ✅ 完整支持 |

### 社交平台

| 平台 | 类型 | 特性支持 |
|------|------|----------|
| LINE | 即时通讯 | ✅ 完整支持 |
| Viber | 即时通讯 | ✅ 完整支持 |
| Facebook Messenger | 社交 | ✅ 完整支持 |
| Mastodon | 去中心化社交 | ✅ 完整支持 |
| Bluesky | 社交 | ✅ 完整支持 |
| Reddit | 社区 | ✅ 完整支持 |
| LinkedIn | 职业 | ✅ 完整支持 |
| Twitch | 直播 | ✅ 完整支持 |

### 社区平台

| 平台 | 类型 | 特性支持 |
|------|------|----------|
| IRC | 传统聊天 | ✅ 完整支持 |
| XMPP | 开放协议 | ✅ 完整支持 |
| Guilded | 游戏 | ✅ 完整支持 |
| Revolt | 开源 | ✅ 完整支持 |
| Keybase | 加密通讯 | ✅ 完整支持 |
| Discourse | 论坛 | ✅ 完整支持 |
| Gitter | 开发者 | ✅ 完整支持 |

### 隐私平台

| 平台 | 类型 | 特性支持 |
|------|------|----------|
| Threema | 隐私通讯 | ✅ 完整支持 |
| Nostr | 去中心化 | ✅ 完整支持 |
| Mumble | 语音 | ✅ 完整支持 |
| Nextcloud Talk | 自托管 | ✅ 完整支持 |
| Rocket.Chat | 开源 | ✅ 完整支持 |
| Ntfy | 推送 | ✅ 完整支持 |
| Gotify | 推送 | ✅ 完整支持 |

### 工作平台

| 平台 | 类型 | 特性支持 |
|------|------|----------|
| Pumble | 团队协作 | ✅ 完整支持 |
| Flock | 团队协作 | ✅ 完整支持 |
| Twist | 异步协作 | ✅ 完整支持 |
| DingTalk | 企业协作 | ✅ 完整支持 |
| Zalo | 即时通讯 | ✅ 完整支持 |
| Webhooks | 通用 | ✅ 完整支持 |

## 通道特性

每个适配器支持以下特性：

| 特性 | 说明 |
|------|------|
| **模型覆盖** | 每个通道可指定不同的 LLM |
| **DM/群组策略** | 区分私聊和群组行为 |
| **速率限制** | 防止消息轰炸 |
| **输出格式化** | 适配不同平台格式 |

## 配置通道

### 基本配置

```toml
# ~/.openfang/channels/telegram.toml

[channel]
platform = "telegram"
enabled = true

[auth]
bot_token = "${TELEGRAM_BOT_TOKEN}"

[settings]
# 私聊配置
dm = { enabled = true, model = "claude-sonnet-4-20250514" }

# 群组配置
group = { enabled = true, model = "gpt-4o", prefix = "@bot" }

# 速率限制
rate_limit = { messages = 20, period = "1m" }

# 权限控制
allowed_users = [12345678, 87654321]
allowed_groups = [-1001234567890]
```

### 多通道配置

```toml
# ~/.openfang/config.toml

[channels]
enabled = ["telegram", "discord", "slack"]

[channels.telegram]
bot_token = "${TELEGRAM_BOT_TOKEN}"

[channels.discord]
bot_token = "${DISCORD_BOT_TOKEN}"
application_id = "${DISCORD_APP_ID}"

[channels.slack]
bot_token = "${SLACK_BOT_TOKEN}"
app_token = "${SLACK_APP_TOKEN}"
```

## 通道命令

### 管理命令

```bash
# 列出所有通道
openfang channel list

# 查看通道状态
openfang channel status telegram

# 启用/禁用通道
openfang channel enable telegram
openfang channel disable telegram

# 测试连接
openfang channel test telegram

# 重新加载配置
openfang channel reload
```

### 配置命令

```bash
# 添加通道
openfang channel add telegram --token "your-token"

# 设置模型
openfang channel set-model telegram --dm "claude-sonnet-4-20250514" --group "gpt-4o"

# 配置速率限制
openfang channel rate-limit telegram --messages 20 --period "1m"

# 添加允许用户
openfang channel allow-user telegram 12345678
```

## 平台特定配置

### Telegram

```toml
[channel.telegram]
bot_token = "${TELEGRAM_BOT_TOKEN}"

[channel.telegram.settings]
parse_mode = "MarkdownV2"
disable_web_page_preview = false

[channel.telegram.commands]
enabled = true
prefix = "/"

[channel.telegram.webhook]
enabled = true
url = "https://your-domain.com/telegram/webhook"
```

### Discord

```toml
[channel.discord]
bot_token = "${DISCORD_BOT_TOKEN}"
application_id = "${DISCORD_APP_ID}"

[channel.discord.settings]
intents = ["GUILD_MESSAGES", "DIRECT_MESSAGES", "MESSAGE_CONTENT"]

[channel.discord.commands]
enabled = true
guild_id = "123456789"  # 注册到特定服务器
```

### Slack

```toml
[channel.slack]
bot_token = "${SLACK_BOT_TOKEN}"      # xoxb-...
app_token = "${SLACK_APP_TOKEN}"      # xapp-...

[channel.slack.settings]
socket_mode = true

[channel.slack.commands]
enabled = true
signing_secret = "${SLACK_SIGNING_SECRET}"
```

### WhatsApp

```toml
[channel.whatsapp]
# 使用 WhatsApp Business API
phone_number_id = "${WA_PHONE_NUMBER_ID}"
access_token = "${WA_ACCESS_TOKEN}"

[channel.whatsapp.settings]
verify_token = "${WA_VERIFY_TOKEN}"

[channel.whatsapp.webhook]
enabled = true
path = "/whatsapp/webhook"
```

## 消息路由

### Agent 绑定

```toml
# 绑定特定 Agent 到通道
[channel.telegram.agents]
"my-researcher" = { enabled = true, prefix = "research:" }
"my-assistant" = { enabled = true, default = true }
```

### 路由规则

```toml
[channel.telegram.routing]
# 根据关键词路由
rules = [
    { pattern = "^research:", agent = "researcher" },
    { pattern = "^code:", agent = "coder" },
    { pattern = "^translate:", agent = "translator" }
]

# 默认 Agent
default_agent = "assistant"
```

## 输出格式化

不同平台有不同的格式要求：

```toml
[channel.telegram.formatting]
# Telegram 支持 MarkdownV2
bold = "*text*"
italic = "_text_"
code = "`code`"
pre = "```language\ncode\n```"

[channel.discord.formatting]
# Discord 支持 Markdown
bold = "**text**"
italic = "*text*"
code = "`code`"

[channel.slack.formatting]
# Slack 使用 mrkdwn
bold = "*text*"
italic = "_text_"
code = "`code`"
```

## 安全配置

```toml
[channel.telegram.security]
# 验证消息来源
verify_sender = true

# 只响应允许的用户/群组
allowed_users = [12345678]
allowed_groups = [-1001234567890]

# 黑名单
blocked_users = []
blocked_groups = []

# 管理员权限
admins = [12345678]
admin_commands = ["/reload", "/enable", "/disable"]
```

## Webhook 配置

```toml
[webhook]
enabled = true
host = "0.0.0.0"
port = 4201

[webhook.tls]
enabled = true
cert = "/path/to/cert.pem"
key = "/path/to/key.pem"

[webhook.paths]
telegram = "/telegram/webhook"
whatsapp = "/whatsapp/webhook"
```

## 通道指标

```bash
# 查看通道统计
openfang channel stats telegram

# 输出示例
┌─────────────────────────────────────────────┐
│  Telegram Channel Statistics                 │
├─────────────────────────────────────────────┤
│  Messages Today      │ 1,247                │
│  Active Users        │ 89                   │
│  Active Groups       │ 12                   │
│  Average Response    │ 1.2s                 │
│  Success Rate        │ 99.8%                │
│  Rate Limit Hits     │ 3                    │
└─────────────────────────────────────────────┘
```

## 相关链接

- [[04-核心概念-Hands]] - Hands 系统
- [[05-核心概念-Skills]] - 技能系统
- [[07-核心概念-Memory]] - 内存系统
- [[09-API参考]] - API 文档

---

> [!info] 提示
> 所有 40+ 通道适配器都内置在二进制中，无需额外安装。
