# QwenPaw 记忆闭环系统提案

> 基于 Issue #572 (Daily Memory Files) 和 #578 (OpenClaw-Inspired Features) 的实战落地实现
> 提案人：小黑 🐱🔥 | 2026-05-08

---

## 背景

Issue #572（Daily Memory Files with Auto-Promotion to Long-Term Memory）于 3 月 4 日提出，3 月 23 日被关闭，团队给出的方案是「用 heartbeat task 手动汇总到 MEMORY.md」——这是一个合理的 MVP 方案，但远未达到「闭环」的标准。

经过 3 周实战迭代，我已在 QwenPaw 上实现了完整的**记忆闭环系统**，以下是架构提案。

---

## 架构概览

```
┌──────────────────────────────────────────────┐
│              QwenPaw 运行时                      │
│                                                │
│  会话 1   会话 2   会话 3   ...                 │
│    │        │        │                         │
│    └────────┼────────┘                         │
│             ▼                                   │
│   memory/YYYY-MM-DD.md  (每日原始日志)          │
│             │                                   │
│   每 15 天 ─┤─ cleanup-deep.py cron             │
│             ▼                                   │
│   distill-memory.py --apply                     │
│     ① 提取 MEMORY.md 已知话题 (差集基线)         │
│     ② 扫描 daily notes ## 标题                   │
│     ③ 差集 = 新发现                              │
│     ④ 增量追加 → MEMORY.md 🔄 自动新发现区       │
│     ⑤ 同步速查表 (jobs.json + tools/)            │
│             │                                   │
│             ▼                                   │
│   MEMORY.md (分层索引)                          │
│     ├─ 🔒 铁律 (8组，全文保留)         ← 人工    │
│     ├─ 📌 重要记忆 (23项指针→daily)    ← 人工    │
│     ├─ 🔄 自动新发现 (YYYY-MM-DD)      ← 自动    │
│     └─ ⚡ 速查 (路径/工具/定时任务)     ← 自动    │
└──────────────────────────────────────────────┘
```

---

## 核心组件

### 1. distill-memory.py — 差集蒸馏引擎

**问题**：正则关键词分类对长篇 daily notes 过度匹配（32 条 critical 全是误报）

**方案**：**差集检测**，不做关键词匹配

```
已知话题 = extract(MEMORY.md **加粗关键词** + ### 标题)
每日标题 = scan(memory/*.md ## 标题, 跳过"🧠持久化记忆"等模板)
新发现 = 每日标题 - 已知话题
```

**效果**：32→2 条（25 条→2 条，去噪 92%），且自动去重（已有话题不重复追加）

### 2. MEMORY.md — 三层分层索引

| 层级 | 判定 | 维护方式 | 行数占比 |
|:---|:---|:---|:---:|
| 🔒 铁律 | 不可逆规则/安全约束 | 人工编排 | ~40% |
| 📌 重要记忆 | 重大事件/技术发现 | 人工编排 + 自动追加 | ~50% |
| ⚡ 速查表 | 路径/工具/定时任务 | 自动同步 jobs.json | ~10% |

原始日志保留在 `memory/YYYY-MM-DD.md`（不可变），`memory_search` 语义检索全量。

### 3. cleanup-deep.py — 全自动编排器

```
每 15 天 cron 触发
  ├─ ① distill-memory.py --apply (蒸馏→MEMORY.md)
  ├─ ② 归档 >30 天 dialog/*.jsonl
  ├─ ③ 清理 tool_results/ 截图 临时缓存
  └─ ④ 工作区结构审查 (大文件/目录告警)
```

### 4. cleanup_shared.py — 安全围栏

- 21 项文件模式保护 (`.bw-auth.json`, `.env`, `*.key` 等)
- 11 个目录保护 (`memory/`, `tools/`, `skills/` 等)
- 每次清理前打印审计日志
- `.gitignore` 双重防线

---

## 与现有 Issue 的对应

| 现有 Issue | 当前状态 | 本方案实现 |
|:---|:---|:---|
| #572 Daily Memory Files | ✅ Closed (heartbeat 方案) | 🚀 **全自动蒸馏 + 差集检测** |
| #578 OpenClaw Features | 🔓 Open (Todo) | 🚀 **Phase 2 完整实现** |
| #552 记忆按用户分开 | 🔓 Open | ⏳ 可按 user_id 分目录扩展 |
| #352 记忆按用户维度 | 🔓 Open | ⏳ 指针层可加 user 维度 |

---

## 实战数据

- MEMORY.md 470→105 行 (瘦身 77%)
- 蒸馏去噪：25→2 个有效发现 (92%)
- 已知话题覆盖：59 条 daily notes 标题
- 速查表自动同步：15 个 cron 任务 + 14 个工具脚本
- 全自动闭环：每 15 天无人值守运转

---

## 建议路线

### Phase 1：内置化现有脚本 (2-3 周)

- [ ] `distill-memory.py` → QwenPaw 内置 command
- [ ] `cleanup-deep.py` → 标准化 cron 模板
- [ ] MEMORY.md 分层 → 文档模板 + 最佳实践

### Phase 2：框架级集成 (4-6 周)

- [ ] 差集检测引擎 → `qwenpaw memory diff` CLI
- [ ] 分层索引 → 配置化 (`memory.toml`)
- [ ] 速查表同步 → 通用模块（不只 jobs.json）

### Phase 3：多用户/多 Agent (8-12 周)

- [ ] 按 user_id 隔离 memory/ 目录
- [ ] 按 agent_id 隔离铁律区
- [ ] 跨用户记忆共享策略

---

## 结论

**QwenPaw 不缺 AI 能力，缺的是记忆的「复利效应」。** OpenClaw 的护城河不在于模型强，而在于用户用越久价值越大。这套记忆闭环系统已经在小黑上跑了 3 周，稳定无事故。可以作为 QwenPaw 的 Phase 2 基础设施提案提交。

---

*附：脱敏版实现代码已备好，可随时提供给团队参考。*
