---
type: guide
tags: [MyAgent, AI-Agent, Gateway, TUI, Web-UI]
created: 2026-04-26
updated: 2026-04-26
---

# MyAgent 使用指南

> 教主原创的自主 AI Agent 平台，支持多通道网关、Web UI、TUI、任务引擎和 Agent 团队协作。
> 源码：https://github.com/wjt0321/MyAgent

---

## 导航

- [[快速上手]] — 5 分钟安装启动
- [[核心概念]] — Workspace、Memory、Task Engine、Agent Teams
- [[配置参考]] — API Key、平台接入、环境变量
- [[部署指南]] — Docker、本地开发、K8s Helm

---

## 一句话定位

MyAgent 是一个**自主运行的 AI Agent 平台**，通过 Gateway 连接你已在使用的消息渠道（飞书/Slack/Discord/Telegram 等），用 Web UI 或 TUI 与 Agent 交互，支持任务规划和多 Agent 团队协作。

核心功能：
- 🌐 **多通道网关** — 一个 Agent 连接多个消息平台
- 🖥️ **Web UI** — 浏览器里的工作台，实时 WebSocket 聊天
- ⌨️ **TUI** — 终端爱好者的富文本界面
- 📋 **任务引擎** — Plan → Execute → Review 循环
- 👥 **Agent 团队** — Planner / Explorer / Executor / Reviewer 协作
- 🧠 **记忆系统** — 自动提取 + RAG 检索

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 语言 | Python 3.11+ |
| Web 框架 | FastAPI + WebSocket |
| TUI | Textual |
| LLM | 30+ 提供商（Anthropic / OpenAI / DeepSeek / Gemini / 国内各厂商）|
| 部署 | Docker / Helm / systemd |
| 监控 | Prometheus + Grafana |

---

## 数据流架构

```
飞书/Slack/Discord/Telegram
         ↓
      Gateway
         ↓
┌─────────────────────────┐
│   Web UI / TUI / CLI    │
│      (用户交互层)         │
└─────────┬───────────────┘
          ↓
    ┌──────────┐
    │  Engine  │ ← LLM + Tools
    └────┬─────┘
         ↓
   Memory / Tasks / Teams
```

---

## 与 OpenClaw 的关系

MyAgent 和 OpenClaw 有相同的基因（参考了 Hermes Agent / Claude Code / OpenHarness），但架构不同：

| | OpenClaw | MyAgent |
|---|---|---|
| 定位 | 个人 AI 助手 | 企业/团队 Agent 平台 |
| 多渠道 | 插件制 | 内置 Gateway 适配器 |
| 任务流 | Cron 驱动 | Plan→Execute→Review 引擎 |
| Agent 团队 | 无 | 内置编排器 |
| Web UI | 基础 | 完整工作台 |
| 部署 | 单一进程 | 支持 K8s Helm |

---

*最后更新：2026-04-26*
