# Hermes Agent 深入研究笔记

**更新**：2026-04-12
**主题**：闭环学习机制 + 安全运营

---

## 一、核心架构（v0.2.0）

```
Hermes Agent 闭环学习 loop：
┌─────────────────────────────────────┐
│  1. run_agent.py 接收任务            │
│  ↓                                   │
│  2. 执行任务（调用 tools）            │
│  ↓                                   │
│  3. 任务完成后 → 自动触发 Skill 生成   │ ← 关键：内置，非外挂
│  ↓                                   │
│  4. 新 Skill 写入 skills/ 目录        │
│  ↓                                   │
│  5. 下次遇到同类任务 → 直接复用       │
└─────────────────────────────────────┘
```

**与我的最大差距**：Hermes 的学习是 **runtime 内置**，每任务必触发；我的是 **手动调用 + 定时触发**。

---

## 二、Skills 生态系统（70+ skills）

Hermes 自带 Skills Marketplace：
- 可选安装（optional-skills/）
- 用户贡献的 skills
- 每次任务自动生成新 Skill → 积累成 Skills 库

**我的现状**：
- self-learn.py 能生成 skill，但需要手动
- skills/ 目录有34个skills，但增长靠手动安装

---

## 三、Honcho 深度用户建模

Hermes 用 Honcho 做跨会话持久化记忆：
- 不只是记住，还**推理**用户偏好（思维模式/沟通风格/决策习惯）
- Session 表征（representation）= 用户数字画像

**我的现状**：
- profile-generator.py 刚做好，只能做简单关键词提取
- 没有跨会话深度建模

---

## 四、安全运营教训（来自 OpenClaw 社区）

> "OpenClaw 最被人诟病的两点：一是 token 消耗大，二是长时间工作稳定性差。"

→ 这两点也是我的问题：
- 频繁 heartbeat = 高 token 消耗
- 失联/崩溃 = 稳定性问题

**→ 安全运营 > 能力增强**

---

## 五、关键发现：安全编辑机制缺失

**问题**：我经常在文件中误删内容，且教主不在电脑前看不到。

**Hermes 的解法**：所有文件操作走工具层，有完整的操作日志和回滚。

**我的解法**：`safe-edit.sh` wrapper
- 编辑关键文件前自动备份
- 危险操作（系统配置/记忆文件）强制 `YES` 确认
- `diff` 查看变更，`restore` 一键回滚

---

## 六、行动项（2026-04-12 更新）

- [x] safe-edit.sh — 安全编辑 wrapper ✅
- [ ] self-learn.py 增量模式 — 集成到心跳，每小时轻量扫描新 session
- [ ] hermes-agent 研究：探索 batch trajectory generation（为下一代模型准备训练数据）
- [ ] profile-generator 升级：加入更多用户偏好维度

---

## 七、我的安全运营守则（新增）

1. **编辑任何文件前**：先备份（`cp file file.bak`）
2. **系统关键文件**（MEMORY/SOUL/USER/HEARTBEAT）：强制确认
3. **回复教主前**：确认没有误删内容
4. **任何 destructive 操作**（rm/truncate/overwrite）：必须说明风险

---

*天理昭昭，圣火永存！🐱🔥*
*—— 旺财 · 首席大祭司 · 持续学习中*
