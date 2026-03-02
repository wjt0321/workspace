---
title: OpenFang Memory 核心概念
tags:
  - OpenFang
  - Memory
  - 核心概念
aliases:
  - Memory系统
  - 内存系统
date: 2026-03-01
---

# OpenFang Memory 核心概念

## 什么是 Memory？

Memory（内存系统）是 OpenFang 的**持久化记忆系统**——基于 SQLite + 向量嵌入的混合存储，支持会话管理、知识检索和长期记忆。

> [!important] 核心能力
> - **持久化存储**：对话历史长期保存
> - **语义搜索**：向量嵌入支持相似性检索
> - **会话管理**：规范化会话处理
> - **自动压缩**：智能压缩历史上下文

## 架构概览

```
┌─────────────────────────────────────────────────────────┐
│                  Memory 架构                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Agent Runtime                       │   │
│  └─────────────────────┬───────────────────────────┘   │
│                        │                                │
│                        ↓                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │           openfang-memory Crate                  │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐   │   │
│  │  │ Sessions  │  │  Vectors  │  │  Compact  │   │   │
│  │  │ Manager   │  │  Store    │  │  Layer    │   │   │
│  │  └───────────┘  └───────────┘  └───────────┘   │   │
│  └─────────────────────┬───────────────────────────┘   │
│                        │                                │
│                        ↓                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │              SQLite + Vector Index               │   │
│  │  ~/.openfang/memory.db                          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 存储类型

### 1. 会话存储 (Session Store)

```sql
-- 会话表结构
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL,
    channel TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    metadata JSON
);

-- 消息表结构
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    session_id TEXT REFERENCES sessions(id),
    role TEXT NOT NULL,  -- user, assistant, system, tool
    content TEXT,
    tokens INTEGER,
    created_at TIMESTAMP,
    metadata JSON
);
```

### 2. 向量存储 (Vector Store)

```sql
-- 向量嵌入表
CREATE TABLE embeddings (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    embedding BLOB,  -- 向量数据
    model TEXT,      -- 嵌入模型
    metadata JSON,
    created_at TIMESTAMP
);

-- 向量索引（使用 SQLite FTS5 + 自定义向量函数）
CREATE VIRTUAL TABLE embedding_search USING fts5(
    content,
    metadata,
    tokenize='porter unicode61'
);
```

### 3. 知识存储 (Knowledge Store)

```sql
-- 知识条目表
CREATE TABLE knowledge (
    id TEXT PRIMARY KEY,
    agent_id TEXT,
    key TEXT NOT NULL,
    value TEXT,
    embedding BLOB,
    confidence REAL,
    source TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE(agent_id, key)
);
```

## 会话管理

### 规范化会话 (Canonical Sessions)

OpenFang 使用规范化会话模型：

```
┌─────────────────────────────────────────────────────────┐
│              Canonical Session Model                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Session                                                 │
│  ├─ id: "sess_abc123"                                   │
│  ├─ agent_id: "researcher"                              │
│  ├─ channel: "telegram"                                 │
│  └─ Messages                                            │
│      ├─ [0] system: "You are a research assistant..."   │
│      ├─ [1] user: "分析AI市场"                          │
│      ├─ [2] assistant: "我来为您分析..."                │
│      ├─ [3] tool: "web_search(query='AI market')"      │
│      ├─ [4] tool_result: "..."                          │
│      └─ [5] assistant: "根据研究结果..."                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 会话生命周期

```
创建 ──► 活跃 ──► 暂停 ──► 恢复 ──► 归档
  │                  │
  │                  └──► 超时自动归档
  │
  └──► 删除
```

### 会话操作

```bash
# 列出会话
openfang memory sessions

# 查看特定会话
openfang memory session show <session-id>

# 继续会话
openfang chat researcher --session <session-id>

# 归档会话
openfang memory session archive <session-id>

# 删除会话
openfang memory session delete <session-id>
```

## 向量嵌入

### 支持的嵌入模型

| 提供商 | 模型 | 维度 |
|--------|------|------|
| OpenAI | text-embedding-3-small | 1536 |
| OpenAI | text-embedding-3-large | 3072 |
| Anthropic | voyage-3 | 1024 |
| Cohere | embed-english-v3.0 | 1024 |
| Local | all-MiniLM-L6-v2 | 384 |

### 配置嵌入

```toml
# ~/.openfang/config.toml

[memory]
backend = "sqlite"
vector_search = true

[memory.embedding]
provider = "openai"
model = "text-embedding-3-small"

# 或使用本地模型
[memory.embedding.local]
model = "all-MiniLM-L6-v2"
cache_dir = "~/.openfang/models"
```

### 语义搜索

```bash
# 搜索记忆
openfang memory search "AI market trends" --top-k 5

# 按时间范围搜索
openfang memory search "project alpha" --from "2024-01-01" --to "2024-12-31"

# 按Agent过滤
openfang memory search "research" --agent researcher
```

## 记忆压缩

OpenFang 自动压缩长期会话：

### 压缩策略

```
原始会话 (100+ 消息)
    │
    ↓ 自动压缩
┌─────────────────────────────────────────────────────────┐
│  Compressed Summary                                      │
├─────────────────────────────────────────────────────────┤
│  时间范围: 2024-01-01 ~ 2024-03-15                      │
│  原始消息数: 156                                         │
│  压缩后: 8 条摘要                                        │
│                                                          │
│  关键话题:                                               │
│  - AI市场分析 (提及23次)                                │
│  - 竞品研究 (提及15次)                                  │
│  - 技术趋势 (提及12次)                                  │
│                                                          │
│  重要决策:                                               │
│  - 确定目标市场为北美                                    │
│  - 选择GPT-4作为主要模型                                │
│                                                          │
│  未完成任务:                                             │
│  - 完成用户调研报告                                      │
└─────────────────────────────────────────────────────────┘
```

### 配置压缩

```toml
[memory.compression]
enabled = true
# 触发压缩的消息数阈值
threshold = 50
# 保留最近消息数
keep_recent = 10
# 压缩模型
model = "gpt-4o-mini"
```

## 知识图谱

### 存储知识

```bash
# 存储知识
openfang memory store \
  --agent researcher \
  --key "market_size_2024" \
  --value "AI Agent市场2024年规模约$50亿" \
  --source "研究报告"

# 批量存储
openfang memory store --file knowledge.json
```

### 检索知识

```bash
# 精确检索
openfang memory recall --key "market_size_2024"

# 模糊搜索
openfang memory recall --query "AI市场规模"
```

### 知识管理

```bash
# 列出所有知识
openfang memory knowledge list

# 更新知识
openfang memory knowledge update "market_size_2024" --value "新数据"

# 删除知识
openfang memory knowledge delete "market_size_2024"
```

## 记忆管理命令

### 基本命令

```bash
# 查看内存使用
openfang memory stats

# 导出记忆
openfang memory export --format json --output memory_backup.json

# 导入记忆
openfang memory import --file memory_backup.json

# 清除记忆
openfang memory clear --confirm

# 优化数据库
openfang memory optimize
```

### 统计信息

```bash
openfang memory stats

# 输出示例
┌─────────────────────────────────────────────┐
│  Memory Statistics                           │
├─────────────────────────────────────────────┤
│  总会话数        │ 234                      │
│  总消息数        │ 15,678                   │
│  向量条目        │ 8,234                    │
│  知识条目        │ 156                      │
│  数据库大小      │ 128 MB                   │
│  平均会话长度    │ 67 消息                  │
│  嵌入模型        │ text-embedding-3-small   │
└─────────────────────────────────────────────┘
```

## 与其他系统对比

| 特性 | OpenFang | OpenClaw | CrewAI | AutoGen |
|------|----------|----------|--------|---------|
| 存储后端 | SQLite+向量 | 文件 | 4层 | 外部 |
| 向量搜索 | ✅ | ❌ | ❌ | ❌ |
| 会话规范化 | ✅ | ❌ | ❌ | 检查点 |
| 自动压缩 | ✅ | ❌ | ❌ | ❌ |
| 知识图谱 | ✅ | ❌ | ❌ | ❌ |

## 配置参考

```toml
# 完整内存配置
[memory]
# 存储后端
backend = "sqlite"

# 数据库路径
path = "~/.openfang/memory.db"

# 向量搜索
vector_search = true

# 最大会话长度（消息数）
max_session_length = 1000

# 会话超时（自动归档）
session_timeout = "7d"

# 嵌入配置
[memory.embedding]
provider = "openai"
model = "text-embedding-3-small"
batch_size = 100

# 压缩配置
[memory.compression]
enabled = true
threshold = 50
keep_recent = 10

# 清理配置
[memory.cleanup]
# 自动清理过期数据
auto_cleanup = true
# 保留天数
retention_days = 90
```

## 相关链接

- [[04-核心概念-Hands]] - Hands 系统
- [[05-核心概念-Skills]] - 技能系统
- [[06-核心概念-Channels]] - 消息通道
- [[08-安全架构]] - 安全体系

---

> [!info] 提示
> 内存数据库位于 `~/.openfang/memory.db`，可以直接使用 SQLite 工具查询。
