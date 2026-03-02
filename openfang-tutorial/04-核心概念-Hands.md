---
title: OpenFang Hands 核心概念
tags:
  - OpenFang
  - Hands
  - 核心概念
aliases:
  - Hands系统
  - 自主能力包
date: 2026-03-01
---

# OpenFang Hands 核心概念

## 什么是 Hands？

Hands（手）是 OpenFang 的核心创新——**预构建的自主能力包**，能够独立运行、按计划执行、无需用户手动提示。

> [!quote] 设计理念
> "传统智能体等待你输入。Hands 为你工作。"

这不是一个聊天机器人。这是一个会在早上6点醒来、研究你的竞争对手、构建知识图谱、评分发现、并在你喝咖啡前将报告发送到你的 Telegram 的智能体。

## Hand 的组成结构

每个 Hand 包含以下组件：

```
┌─────────────────────────────────────────────────────────┐
│                    Hand 结构                            │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │ HAND.toml                                       │   │
│  │ - 清单声明                                       │   │
│  │ - 工具、设置、要求                               │   │
│  │ - Dashboard 指标                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ System Prompt                                   │   │
│  │ - 多阶段操作手册                                 │   │
│  │ - 500+ 字专家流程                                │   │
│  │ - 执行策略                                       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ SKILL.md                                        │   │
│  │ - 领域专业知识                                   │   │
│  │ - 运行时注入上下文                               │   │
│  │ - 参考知识库                                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Guardrails                                      │   │
│  │ - 审批门控                                       │   │
│  │ - 敏感操作限制                                   │   │
│  │ - 安全边界                                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### HAND.toml 示例

```toml
# HAND.toml - Researcher Hand 清单

[hand]
name = "researcher"
version = "0.1.0"
description = "深度自主研究助手"

[tools]
required = [
    "web_search",
    "web_fetch",
    "memory_store",
    "file_write"
]

[settings]
max_iterations = 50
timeout = "30m"
output_format = "markdown"

[metrics]
track = [
    "sources_consulted",
    "credibility_score",
    "report_length"
]

[guardrails]
requires_approval = false  # 只读操作无需审批
rate_limit = "100 requests/hour"
```

## 内置 Hands 详解

### 1. Clip - 视频处理专家

**功能**：将 YouTube 视频转换为短视频内容

```
输入：YouTube URL
    ↓
┌─────────────────────────────────────┐
│  8阶段处理流水线                    │
├─────────────────────────────────────┤
│  1. 下载视频 (yt-dlp)               │
│  2. 音频提取                        │
│  3. 语音转文字 (5种STT后端)         │
│  4. 精彩片段识别                    │
│  5. 垂直裁剪                        │
│  6. 字幕生成                        │
│  7. 缩略图制作                      │
│  8. AI配音（可选）                  │
└─────────────────────────────────────┘
    ↓
输出：短视频 → Telegram/WhatsApp
```

**使用示例**：

```bash
# 基本使用
openfang hand activate clip --input "https://youtube.com/watch?v=xxx"

# 高级配置
openfang hand configure clip \
  --format vertical \
  --duration 60 \
  --add-captions \
  --add-voiceover \
  --output telegram,whatsapp
```

### 2. Lead - 销售线索生成器

**功能**：自动发现、丰富、评分潜在客户

```
每日运行流程：
┌─────────────────────────────────────┐
│  发现 → 丰富 → 评分 → 去重 → 交付   │
├─────────────────────────────────────┤
│  发现：匹配ICP画像                  │
│  丰富：网络研究补充信息              │
│  评分：0-100质量评分                 │
│  去重：排除已有客户                  │
│  交付：CSV/JSON/Markdown            │
└─────────────────────────────────────┘
```

**ICP 配置**：

```bash
openfang hand configure lead --icp '
industry:
  - SaaS
  - FinTech
  - HealthTech
company_size:
  min: 50
  max: 500
location:
  - US
  - EU
  - UK
keywords:
  - "AI agent"
  - "automation"
'
```

### 3. Collector - 情报收集器

**功能**：OSINT级持续情报监控

```
监控能力：
├─ 变化检测
│  └─ 网站、价格、功能变更
├─ 情感追踪
│  └─ 社交媒体情绪分析
├─ 知识图谱构建
│  └─ 实体关系映射
└─ 关键警报
   └─ 重要变化即时通知
```

**使用示例**：

```bash
# 监控竞争对手
openfang hand configure collector --targets '
- type: company
  name: "CompetitorX"
  watch:
    - pricing_page
    - features_page
    - blog
    - news
  alerts:
    - pricing_change
    - new_feature
    - funding_round
'

openfang hand activate collector
```

### 4. Predictor - 超级预测引擎

**功能**：多源信号分析预测

```
预测流程：
┌─────────────────────────────────────┐
│  信号收集 → 推理链构建 → 预测输出   │
├─────────────────────────────────────┤
│  多源信号：新闻、社交媒体、市场数据  │
│  校准推理：置信区间、概率分布        │
│  准确追踪：Brier分数                 │
│  逆向模式：挑战共识观点              │
└─────────────────────────────────────┘
```

**使用示例**：

```bash
# 创建预测任务
openfang hand activate predictor --question "2026年AI Agent市场规模？"

# 逆向模式
openfang hand configure predictor --contrarian true
```

### 5. Researcher - 深度研究员

**功能**：自主交叉验证研究

```
研究流程：
┌─────────────────────────────────────┐
│  搜索 → 收集 → 验证 → 报告         │
├─────────────────────────────────────┤
│  多源交叉验证                       │
│  CRAAP可信度评估                    │
│    ├─ Currency 时效性               │
│    ├─ Relevance 相关性              │
│    ├─ Authority 权威性              │
│    ├─ Accuracy 准确性               │
│    └─ Purpose 目的性                │
│  APA格式引用                        │
│  多语言支持                         │
└─────────────────────────────────────┘
```

### 6. Twitter - 社媒管理者

**功能**：自主 Twitter/X 账号管理

```
能力矩阵：
├─ 内容创作
│  └─ 7种轮换格式
├─ 发布调度
│  └─ 最佳时间优化
├─ 互动管理
│  └─ 回复提及
├─ 性能追踪
│  └─ 参与度指标
└─ 审批队列
   └─ 发布前确认
```

**安全机制**：

> [!warning] 审批队列
> 所有推文在发布前都需要用户确认，不会自动发布。

### 7. Browser - 网页自动化

**功能**：网页操作自动化

```
能力：
├─ 页面导航
├─ 表单填写
├─ 按钮点击
├─ 多步骤工作流
├─ 会话持久化
└─ Playwright桥接
```

**安全机制**：

> [!danger] 强制购买审批
> Browser Hand 有强制审批门控——在执行任何购买操作前必须获得用户确认。它永远不会在未经明确确认的情况下花费你的钱。

```bash
# Browser Hand 遇到购买时会暂停等待
Browser: 检测到购买操作，需要审批
  商品: Premium Plan
  金额: $29.99
  是否继续？[y/N]
```

## 自定义 Hand 开发

### 创建新 Hand

```bash
# 创建 Hand 骨架
openfang hand create my-custom-hand

# 生成的文件结构
~/.openfang/hands/my-custom-hand/
├── HAND.toml
├── system_prompt.md
├── SKILL.md
└── guardrails.toml
```

### HAND.toml 模板

```toml
[hand]
name = "my-custom-hand"
version = "0.1.0"
description = "自定义Hand描述"

[tools]
required = ["web_search", "memory_store"]
optional = ["file_write", "email_send"]

[settings]
max_iterations = 20
timeout = "15m"

[guardrails]
requires_approval = true
approval_actions = ["file_write", "email_send"]
```

### 发布到 FangHub

```bash
# 验证 Hand 格式
openfang hand validate my-custom-hand

# 发布到 FangHub
openfang hand publish my-custom-hand
```

## Hand 生命周期管理

```
┌─────────────────────────────────────────────────────────┐
│                  Hand 生命周期                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  create ──► activate ──► running ──► pause ──► resume  │
│     │           │            │          │         │    │
│     │           │            │          └─────────┘    │
│     │           │            │                         │
│     │           │            └──► stop ──► archived    │
│     │           │                                        │
│     │           └──► error ──► retry ──► running       │
│     │                                                    │
│     └──► delete                                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 命令速查

| 命令 | 说明 |
|------|------|
| `openfang hand list` | 列出所有可用 Hands |
| `openfang hand show <name>` | 显示详细信息 |
| `openfang hand activate <name>` | 激活并开始运行 |
| `openfang hand pause <name>` | 暂停（保留状态） |
| `openfang hand resume <name>` | 恢复运行 |
| `openfang hand stop <name>` | 停止并清除状态 |
| `openfang hand configure <name>` | 配置参数 |
| `openfang hand report <name>` | 查看运行报告 |

## 相关链接

- [[05-核心概念-Skills]] - 技能系统
- [[06-核心概念-Channels]] - 消息通道
- [[07-核心概念-Memory]] - 内存系统
- [[09-API参考]] - API 文档

---

> [!info] 提示
> 所有 Hands 都编译到二进制中，无需下载、无需 pip install、无需 Docker pull。
