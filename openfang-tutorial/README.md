---
title: OpenFang 完全指南
aliases:
  - OpenFang Wiki
  - OpenFang 教程
tags:
  - AI
  - Agent
  - Rust
  - 教程
date: 2026-03-01
---

# OpenFang 完全指南

![OpenFang Logo](https://raw.githubusercontent.com/RightNow-AI/openfang/main/public/assets/openfang-logo.png)

> **OpenFang** —— 开源智能体操作系统（Agent Operating System）

## 📖 文档导航

### 入门篇

| 文档 | 描述 |
|------|------|
| [[01-项目概述]] | OpenFang 项目介绍、核心特性、与其他框架对比 |
| [[02-安装指南]] | 多平台安装方法、系统要求、故障排除 |
| [[03-快速入门]] | 5分钟快速上手、第一个Agent、基本操作 |

### 核心概念篇

| 文档 | 描述 |
|------|------|
| [[04-核心概念-Hands]] | 自主能力包详解、内置Hands、自定义开发 |
| [[05-核心概念-Skills]] | 技能系统、SKILL.md格式、FangHub市场 |
| [[06-核心概念-Channels]] | 40+消息通道适配器、配置与使用 |
| [[07-核心概念-Memory]] | 内存系统、向量嵌入、会话管理 |

### 进阶篇

| 文档 | 描述 |
|------|------|
| [[08-安全架构]] | 16层安全体系、WASM沙箱、审计追踪 |
| [[09-API参考]] | REST/WebSocket/SSE接口、OpenAI兼容API |
| [[10-架构设计]] | 14个Crate架构、模块设计、扩展机制 |

### 开发篇

| 文档 | 描述 |
|------|------|
| [[11-开发指南]] | 源码构建、测试、贡献流程 |
| [[12-迁移指南]] | 从OpenClaw、LangChain、AutoGPT迁移 |

## 🚀 快速开始

```bash
# macOS/Linux
curl -fsSL https://openfang.sh/install | sh

# Windows PowerShell
irm https://openfang.sh/install.ps1 | iex

# 初始化并启动
openfang init
openfang start
# Dashboard: http://localhost:4200
```

## ✨ 核心特性

- **单二进制文件** ~32MB，一次安装即可运行
- **7个内置Hands** 开箱即用的自主能力包
- **16层安全防护** 企业级安全保障
- **40+消息通道** 覆盖主流通讯平台
- **60+技能** 预置技能，可扩展
- **Rust原生** 137K行代码，1767+测试，零警告

## 🔗 官方链接

- 📚 官方文档：https://www.openfang.sh/docs
- 💻 GitHub仓库：https://github.com/RightNow-AI/openfang
- 🐦 Twitter/X：[@openfang_ai](https://twitter.com/openfang_ai)

## 📊 项目概览

```
┌─────────────────────────────────────────────────────────────┐
│                     OpenFang Architecture                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  CLI    │  │ Desktop │  │   API   │  │ Dashboard│        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       └────────────┴────────────┴────────────┘              │
│                         │                                    │
│  ┌──────────────────────┴──────────────────────────────┐   │
│  │                   openfang-kernel                    │   │
│  │  (Orchestration, Workflows, RBAC, Scheduler)        │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Runtime │  │ Memory  │  │Channels │  │  Hands  │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Skills  │  │  Wire   │  │Extensions│ │ Migrate │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
└─────────────────────────────────────────────────────────────┘
```

---

> [!info] 版本信息
> - 当前版本：v0.1.0（2026年2月首次发布）
> - 许可证：MIT
> - 开发语言：Rust
> - 作者：Jaber（RightNow创始人）
