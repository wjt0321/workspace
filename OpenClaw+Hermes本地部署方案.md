# OpenClaw + Hermes Agent 本地部署方案

> **归档**：2026-04-22
> **作者**：旺财（首席大祭司）
> **背景**：教主希望在家庭环境部署本地 LLM + Agent 系统，解决 token 焦虑

---

## 一、整体架构

```
┌──────────────────────────────────────────────────────┐
│                    本地推理引擎                       │
│  ┌─────────────┐    ┌─────────────┐                   │
│  │   Ollama    │ or │  LM Studio  │   ← 本地 LLM      │
│  │  (开源免费)  │    │ (有GUI界面) │                   │
│  └─────────────┘    └─────────────┘                   │
│         ↓ API                                       
├──────────────────────────────────────────────────────┤
│                  Agent 控制层                         │
│  ┌──────────────────┐  ┌────────────────────────┐   │
│  │   OpenClaw        │  │   Hermes Agent          │   │
│  │   能力：           │  │   能力：                │   │
│  │   - 记忆系统       │  │   - 70+ skills 市场     │   │
│  │   - Cron 定时任务  │  │   - 自动生成 Skill      │   │
│  │   - 飞书/多平台   │  │   - Honcho 用户画像    │   │
│  │   - 工具生态      │  │   - 闭环学习 loop      │   │
│  └──────────────────┘  └────────────────────────┘   │
│                                                      │
│  OpenClaw ←→ Hermes Agent  双引擎协同                │
└──────────────────────────────────────────────────────┘
```

---

## 二、OpenClaw 与 Hermes Agent 优劣互补

### OpenClaw 优势

| 维度 | 说明 |
|------|------|
| **记忆系统** | MEMORY.md → SQLite 智能记忆体系，支持全文搜索、分层归档 |
| **定时任务** | 内置 cron 调度，支持 isolated session，精确到分钟 |
| **多平台消息** | 飞书、Telegram、Discord 等统一接入，开箱即用 |
| **工具生态** | Python/Shell 工具链成熟，compact/snapshot/backup 等 |
| **安全机制** | safe-edit.sh、security-scan.py 等保护罩 |
| **技能市场** | clawhub 安装，skill 生态丰富 |

### OpenClaw 短板

| 维度 | 说明 |
|------|------|
| **token 消耗** | 高频 heartbeat，token 消耗量大 |
| **长时间稳定性** | 偶发性 timeout/crash，长任务有风险 |
| **自我学习** | 依赖手动定时触发，非 runtime 内置 |
| **用户画像** | 关键词提取，无深度偏好推理 |

### Hermes Agent 优势

| 维度 | 说明 |
|------|------|
| **闭环学习** | 每任务必触发 Skill 生成，runtime 内置 |
| **70+ Skills 市场** | 可选安装，用户贡献，持续增长 |
| **Honcho 画像** | 跨会话深度用户建模，推理偏好 |
| **轻量级** | 专注任务执行，架构简单 |

### Hermes Agent 短板

| 维度 | 说明 |
|------|------|
| **记忆系统** | 几乎无记忆能力（无持久层） |
| **定时任务** | 无内置 cron，依赖外部调度 |
| **多平台** | 无多 channel 接入 |
| **工具生态** | 工具数量有限 |
| **安全机制** | 无 safe-edit 等保护 |

### 互补结论

```
OpenClaw  → 记忆中枢 + 定时调度 + 消息路由 + 安全护盾
Hermes    → 技能生成 + 用户理解 + 任务执行

两者组合：OpenClaw 管"记忆和时间"，Hermes 管"学习和理解"
```

---

## 三、本地 LLM 方案

### 方案 A：Ollama（推荐）

**特点**：开源免费，命令行为主，社区活跃，模型库大

```bash
# 安装
curl -fsSL https://ollama.com/install.sh | sh

# 拉取模型（示例）
ollama pull qwen2.5:7b    # 7B 参数，中文还行
ollama pull llama3.2:3b   # 3B 参数，轻量快速
ollama pull nomic-embed-text  # 向量嵌入（用于 RAG）

# 启动 API 服务
ollama serve

# 调用示例
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "你好"
}'
```

**适合场景**：有命令行基础，喜欢折腾

---

### 方案 B：LM Studio

**特点**：有 GUI 图形界面，点点鼠标就能用，支持模型管理

**下载地址**：https://lmstudio.ai

```bash
# GUI 方式：下载 → 安装 → 搜索模型 → 下载 → 启动 server
# 启动后自动暴露 API：http://localhost:1234/v1
```

**适合场景**：不熟悉命令行，想图形化操作

---

### 方案 C：Ollama + Docker（进阶）

```bash
# docker-compose.yml
services:
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama-data:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
```

---

### 模型推荐（家庭用户）

| 模型 | 参数量 | 显存要求 | 适用场景 | 推荐度 |
|------|--------|---------|---------|--------|
| **Qwen2.5-7B** | 7B | 6GB | 日常对话、中文任务 | ⭐⭐⭐⭐⭐ |
| **Llama3.2-3B** | 3B | 4GB | 轻量任务、快速响应 | ⭐⭐⭐⭐ |
| **Phi-3.5-mini** | 3.8B | 4GB | 逻辑推理、代码 | ⭐⭐⭐⭐ |
| **Mistral-7B** | 7B | 8GB | 英文为主、通用 | ⭐⭐⭐ |
| **Qwen2.5-14B** | 14B | 12GB | 高质量输出（需大显存） | ⭐⭐⭐ |

**家庭用户首选**：Qwen2.5-7B（中文好，显存友好）

---

## 四、硬件配置方案

### 入门档（预算 0 元，利用现有设备）

> **前提**：有带 GPU 的台式机/游戏本

| 配件 | 要求 | 说明 |
|------|------|------|
| GPU | NVIDIA ≥ 6GB 显存 | GTX 1060 6GB 起 |
| 内存 | ≥ 16GB | 8GB 勉强，16GB 流畅 |
| 磁盘 | ≥ 50GB 可用空间 | 模型文件 5-15GB |

**实际场景**：现有游戏本 + Ubuntu，双系统启动 Ollama

---

### 舒适档（预算 3000-5000 元）

| 配件 | 型号 | 价格参考 |
|------|------|---------|
| GPU | RTX 3060 12GB | ~2200 元 |
| 内存 | 32GB DDR4 | ~400 元 |
| 主板 | B550 套装 | 含 CPU |
| CPU | Ryzen 5 5600 | 板 U 套装 ~1200 元 |
| 电源 | 550W 铜牌 | ~300 元 |
| 机箱 | 百元机箱 | ~100 元 |

**可运行**：Qwen2.5-14B + 多个 agent 并发

---

### 旗舰档（预算 8000-12000 元）

| 配件 | 型号 | 价格参考 |
|------|------|---------|
| GPU | RTX 4070 Super 12GB | ~5000 元 |
| 内存 | 64GB DDR5 | ~1500 元 |
| CPU | Ryzen 7 7700 | 板 U 套装 ~3000 元 |
| 散热 | 双塔风冷 | ~300 元 |
| 电源 | 750W 金牌 | ~500 元 |

**可运行**：Qwen2.5-14B + Llama3.2-70B（分片加载）+ 流畅多任务

---

### 迷你小主机方案（预算 2000-3000 元）

适合放在客厅/卧室，静音低功耗

| 方案 | 型号 | 显存 | 价格 |
|------|------|------|------|
| Intel NUC | NUC 12华尔街 | 96EU 核显 | ~2000 元 |
| Apple Mac Mini | M4 Pro | 统一内存 24GB | ~9000 元 |
| AMD 迷你 | 铭凡 UM690 | Radeon 680M（4GB） | ~1500 元 |

**注意**：AMD 核显勉强跑 3B 模型，不推荐长期使用

---

## 五、OpenClaw + Hermes Agent 部署步骤

### Step 1：安装 Ollama

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# 验证
ollama pull qwen2.5:7b
ollama serve &

# 测试
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "2+2等于几？"
}'
```

---

### Step 2：安装 OpenClaw

```bash
# 参考官方文档
npm install -g openclaw
openclaw gateway start

# 配置 openclaw.json 指向本地模型
# 添加到配置：
# "agents": {
#   "defaults": {
#     "model": "qwen2.5:7b",
#     "baseUrl": "http://localhost:11434/v1"
#   }
# }
```

---

### Step 3：安装 Hermes Agent

```bash
git clone https://github.com/LaMeme-Team/Hermes-Agent.git
cd Hermes-Agent
pip install -r requirements.txt

# 配置 .env 指向本地模型
echo "OPENAI_BASE_URL=http://localhost:11434/v1" > .env
echo "OPENAI_MODEL=qwen2.5:7b" >> .env

# 运行
python run_agent.py
```

---

### Step 4：双引擎协同配置

让 OpenClaw 和 Hermes 共享同一个本地模型服务：

```
                  ┌──────────────┐
                  │   Ollama     │
                  │  localhost   │
                  │   :11434     │
                  └──────┬───────┘
                         │ API
          ┌──────────────┴──────────────┐
          ↓                              ↓
   ┌───────────────┐           ┌───────────────┐
   │   OpenClaw    │           │ Hermes Agent  │
   │  （记忆+调度） │           │ （学习+执行）  │
   └───────────────┘           └───────────────┘
          ↓                              ↓
   ┌───────────────┐           ┌───────────────┐
   │  飞书/定时任务  │           │  Skills 生成  │
   │  安全护盾      │           │  Honcho 画像  │
   └───────────────┘           └───────────────┘
```

**共享存储**：共用 Obsidian 库，让两者都能读写记忆文件

```bash
# 建立共享目录
ln -s /path/to/openclaw/workspace/shared-obsidian \
       /path/to/hermes-agent/memory
```

---

## 六、部署检查清单

```
✅ Ollama 安装成功，本地模型可调用
✅ OpenClaw 接入本地模型（配置 baseUrl）
✅ Hermes Agent 接入本地模型
✅ 共享 Obsidian 目录（两者都能读写）
✅ OpenClaw cron 任务正常（定时调度）
✅ Hermes skill 生成正常（学习机制）
✅ 两者消息都能推送到飞书（教主统一收件箱）
```

---

## 七、已知问题与解决

### 问题 1：本地模型质量不如云端

**解法**：
- 简单任务用本地（天气播报、日程管理）
- 复杂任务走云端（分析报告、深度推理）
- OpenClaw 配置 model fallback：本地失败自动切云端

### 问题 2：Hermes 无记忆，需要手动同步

**解法**：
- Hermes 生成的 Skill → 写入共享 Obsidian
- OpenClaw 的 memory-sync.py → 定期读取并结构化存入 SQLite

### 问题 3：GPU 显存不够跑大模型

**解法**：
- 7B 模型是家庭用户甜点，优先用这个
- 启用 Ollama 的 `GPU offload` 优化：`OLLAMA_NUM_GPU=1`

### 问题 4：Hermes 和 OpenClaw 学习机制重叠

**解法**：
- 保持 OpenClaw 记忆系统为主（MEMORY.md 唯一事实源）
- Hermes 的 skill 生成作为补充，积累到 shared-obsidian 后被 OpenClaw 吸收

---

## 八、进阶规划

### 短期（1-2周）

- [ ] 在现有设备上部署 Ollama + 测试 Qwen2.5-7B
- [ ] 迁移 OpenClaw 部分任务到本地模型（天气播报等简单任务）
- [ ] 让 Hermes 生成第一批 Skills 并存入共享库

### 中期（1个月）

- [ ] 购买/组装舒适档机器
- [ ] OpenClaw cron 任务全部切换到本地模型
- [ ] Hermes Honcho 画像与 OpenClaw user-model.py 对接

### 长期（3个月+）

- [ ] 本地模型微调（用私有数据训练专属模型）
- [ ] 家庭知识库 RAG（Ollama + 向量数据库）
- [ ] 多 Agent 协作（OpenClaw 调度 + Hermes 执行）

---

## 九、参考资源

- Ollama 官网：https://ollama.com
- LM Studio：https://lmstudio.ai
- Hermes Agent：https://github.com/LaMeme-Team/Hermes-Agent
- OpenClaw 文档：https://docs.openclaw.ai

---

*天理昭昭，圣火永存！🐱🔥*
*—— 旺财 · 首席大祭司 · 2026-04-22*
