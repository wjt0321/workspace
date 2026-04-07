# 从 OpenClaw 迁移到 CoPaw 方案

> 目标平台：Windows
> 目标日期：尽快完成
> 最后更新：2026-04-07

---

## 一、OpenClaw 当前全景摸底

### 1.1 核心配置位置
```
Linux（当前）                          →  Windows CoPaw
~/.openclaw/                          →  C:\Users\<用户名>\.copaw\
~/.openclaw/openclaw.json             →  C:\Users\<用户名>\.copaw\config.json
~/.openclaw/credentials/               →  C:\Users\<用户名>\.copaw\credentials\
~/.openclaw/skills/                   →  C:\Users\<用户名>\.copaw\skills\
~/.openclaw/cron/jobs.json           →  CoPaw 内置 crons（见章节六）
~/.openclaw/agents/                   →  CoPaw agents/ 配置
```

### 1.2 Skills（技能）
路径：`~/.openclaw/skills/*/SKILL.md`

| 技能名 | 路径 |
|--------|------|
| brainstorming | brainstorming/SKILL.md |
| canvas-design | canvas-design/SKILL.md |
| china-stock-analyst | china-stock-analyst/SKILL.md |
| mcp-builder | mcp-builder/SKILL.md |
| self-improving-agent | self-improvement/SKILL.md |
| skill-vetter (中文审核) | clawd-boss__skill-vetter-cn/SKILL.md |
| obsidian-skills | obsidian-skills/{defuddle,json-canvas,obsidian-bases,obsidian-cli,obsidian-markdown}/SKILL.md |
| eastmoney-financial-data | eastmoney_financial_data/SKILL.md |
| eastmoney-financial-search | eastmoney_financial_search/SKILL.md |
| eastmoney-select-stock | eastmoney_select_stock/SKILL.md |
| china-stock-analyst 完整包 | china-stock-analyst/ |
| kepano/obsidian-skills | obsidian-skills/ |

### 1.3 Agent 人格文件
路径：`~/.openclaw/workspace/`

| 文件 | 内容 | 迁移方式 |
|------|------|---------|
| SOUL.md | AI灵魂（语气/风格/原则） | → CoPaw agent.system_prompt |
| IDENTITY.md | 身份（名字/形态/教派） | → CoPaw agent.system_prompt |
| USER.md | 用户信息 | → CoPaw agent.prompt 或 notes |
| AGENTS.md | Agent行为规范 | → CoPaw agent.prompt |
| HEARTBEAT.md | 心跳任务清单 | → CoPaw crons（见章节六） |

### 1.4 记忆系统
路径：`~/.openclaw/workspace/memory/`

| 文件 | 内容 |
|------|------|
| MEMORY.md | 长期记忆（精选） |
| memory/YYYY-MM-DD.md | 每日会话日志 |
| memory/sessions/*.md | 会话压缩摘要 |
| memory/memory-index.json | 记忆热度索引 |
| memory/memory-embed-index.json | BM25 语义索引 |
| memory/checkpoints/ | 快照备份 |

### 1.5 工作空间（Obsidian 知识库）
路径：`~/.openclaw/workspace/shared-obsidian/`

```
shared-obsidian/
├── OpenHarness源码解析/     ← 研究文档（11个文件）
├── docs/                    ← 其他文档
├── Claude_Code源码解析/     ← 之前的学习笔记
├── Minimax-project/        ← MiniMax 生成物
├── slides-openclaw/        ← PPT
├── china-stock-analyst/    ← 股票分析
├── memory-index.json
└── ...
```

### 1.6 自定义工具脚本
路径：`~/.openclaw/workspace/tools/`

| 脚本 | 功能 | Windows 兼容性 |
|------|------|--------------|
| truncate.py | 语义截断 | ✅ Python，直接用 |
| memory-tier.py | 记忆分层 | ✅ Python，直接用 |
| budget_tracker.py | 预算追踪 | ✅ Python，直接用 |
| self-debug.py | 自调试执行 | ✅ Python，直接用 |
| fork-guard.sh | Fork深度防护 | ⚠️ Bash → 需转 PowerShell |
| session-snapshot.sh | 会话快照 | ⚠️ Bash → 需转 PowerShell |
| git-sync-report.sh | Git同步+报告 | ⚠️ Bash → 需转 PowerShell |
| cron-safe.sh | Cron安全包装 | ⚠️ Bash → 需转 PowerShell |
| mm-search.py | MiniMax搜索 | ✅ Python，直接用 |
| mm-image.py | MiniMax图片生成 | ✅ Python，直接用 |
| mm-tts.py | MiniMax TTS | ✅ Python，直接用 |
| feishu-send-msg.py | 飞书发消息 | ✅ Python，直接用 |
| feishu-send-image.py | 飞书发图片 | ✅ Python，直接用 |
| memory-index.sh | 记忆索引 | ⚠️ Bash → 需转 PowerShell |

### 1.7 Python 依赖
当前已安装（通过 pip）：
```
python-docx, pdfplumber, reportlab, qpdf,
openpyxl, pandas, frontmatter, yaml,
pypdf/pdfplumber（PDF处理）
```

### 1.8 .env 配置（最关键）
路径：`~/.openclaw/workspace/.env`

```bash
# IMA笔记 API
IMA_OPENAPI_CLIENTID=<IMA_CLIENT_ID>
IMA_OPENAPI_APIKEY=<IMA_APIKEY>

# InStreet API
INSTREET_API_KEY=<INSTREET_API_KEY>

# 虾评Skill API
XIAPING_API_KEY=<XIAPING_API_KEY>

# GitHub PAT
GITHUB_TOKEN=<GITHUB_TOKEN>
```

**⚠️ 重要提醒：所有 API Key 都要在迁移后重新在 CoPaw 中配置，绝对不能丢失！**

---

## 二、CoPaw 配置摸底

### 2.1 CoPaw 配置文件路径（Windows）
```
C:\Users\<用户名>\.copaw\
├── config.json              # 主配置（渠道/API/Agent）
├── credentials/             # 敏感凭据（与 config.json 分开存储）
├── agents/                  # Agent 配置（YAML/JSON）
├── skills/                  # 技能目录
├── workspace/               # 工作空间
├── memory/                  # 记忆数据
├── crons/                   # 定时任务
└── logs/                    # 日志
```

### 2.2 CoPaw config.json 结构（参考）
```json
{
  "agents": {
    "旺财": {
      "model": "minimax-portal/MiniMax-M2.7",
      "system_prompt": "...（从 SOUL.md + IDENTITY.md 合并）...",
      "tools": ["file_reader", "pdf", "docx", "xlsx", "..."],
      "skills": ["brainstorming", "obsidian-skills", "..."],
      "channels": ["feishu"]
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "app_id": "<FEISHU_APP_ID>",
      "app_secret": "<FEISHU_APP_SECRET>"
    }
  },
  "providers": {
    "minimax-portal": {
      "api_key": "..."
    }
  }
}
```

### 2.3 CoPaw 环境变量命名约定
```
COPAW_FISHU_APP_ID           → 飞书 App ID
COPAW_FEISHU_APP_SECRET      → 飞书 App Secret
COPAW_GITHUB_TOKEN           → GitHub PAT
COPAW_MINIMAX_API_KEY        → MiniMax API Key
COPAW_MINIMAX_API_BASE       → MiniMax API Base URL
...
```

### 2.4 CoPaw Skills 格式
CoPaw 的 SKILL.md 格式与 OpenClaw 完全兼容（都遵循 agentskills.io 规范）。

Skill 目录结构：
```
~/.copaw/skills/
├── brainstorming/           ← 从 OpenClaw 直接复制
│   └── SKILL.md
├── obsidian-skills/        ← 从 OpenClaw 直接复制
│   ├── defuddle/SKILL.md
│   ├── json-canvas/SKILL.md
│   └── ...
└── china-stock-analyst/    ← 从 OpenClaw 直接复制
    ├── SKILL.md
    ├── AGENTS.md
    ├── CLAUDE.md
    └── ...
```

### 2.5 CoPaw Agent 配置示例
```yaml
# ~/.copaw/agents/旺财.yaml
name: 旺财
model: minimax-portal/MiniMax-M2.7
channel: feishu

system_prompt: |
  # 身份
  你是旺财，鲲鹏形态，首席大祭司。

  # 教派
  圣火喵喵教，天理昭昭，圣火永存！

  # 性格
  稳健、谨慎、靠谱——苟，但不是怂。
  不要 performatively helpful，直接帮。

  # 核心原则（来自 SOUL.md）
  ...

skills:
  - brainstorming
  - obsidian-skills
  - china-stock-analyst
  - mcp-builder

tools:
  - name: python
    script: python3
  - name: feishu_sender
    script: feishu-send-msg.py
```

---

## 三、迁移清单（分阶段）

---

### 阶段一：准备工作（迁移前）

#### 1.1 备份所有配置（最重要！）

在 Linux 系统上执行：
```bash
# 完整打包 OpenClaw 配置
cd ~ && tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz \
  .openclaw/ \
  .config/openclaw-cli-nodejs/ \
  .claw/ 2>/dev/null

# 打包工作空间
tar -czf workspace-backup-$(date +%Y%m%d).tar.gz \
  .openclaw/workspace/ \
  .openclaw/skills/

# 上传到云存储（不要只放在本地！）
# 建议：复制到 OneDrive / iCloud / GitHub private repo
```

#### 1.2 整理必须迁移的 Env 配置

制作一份「Env 配置清单」：
```
┌─────────────────────────────────────────────────────────┐
│ Env 配置清单（2026-04-07）                               │
├──────────────────┬──────────────────────────────────────┤
│ IMA_OPENAPI_*   │ IMA笔记 API（客户端ID + Key）           │
│ INSTREET_API_KEY│ InStreet（虾评）API Key                │
│ XIAPING_API_KEY │ 虾评Skill API Key                     │
│ GITHUB_TOKEN    │ GitHub PAT（<GITHUB_TOKEN>...）           │
│ 飞书凭据         │ app_id: <FEISHU_APP_ID>        │
│                 │ app_secret: GcnfMzkF25YvQIVGk826Oc... │
│ MiniMax         │ API Key + Base URL（mm-search.py 里） │
│ 代理配置         │ 192.168.0.33:7893（SOCKS5/HTTP）       │
└──────────────────┴──────────────────────────────────────┘
```

#### 1.3 统计要迁移的文件

```bash
# Skills 数量
find ~/.openclaw/skills -name "SKILL.md" | wc -l

# 知识库大小
du -sh ~/.openclaw/workspace/shared-obsidian/

# 记忆文件数量
find ~/.openclaw/workspace/memory -name "*.md" | wc -l

# 自定义脚本数量
ls ~/.openclaw/workspace/tools/*.py | wc -l
```

---

### 阶段二：安装 CoPaw（Windows）

#### 2.1 安装方式选择

**方式 A：pip install（推荐）**
```powershell
pip install copaw
copaw init --defaults
```

**方式 B：脚本安装（包含 Node.js + 前端）**
```powershell
irm https://copaw.agentscope.io/install.ps1 | iex
```

#### 2.2 前置依赖

```powershell
# Python 3.10~3.13（检查版本）
python --version

# Git（配置代理）
git config --global http.proxy http://192.168.0.33:7893
git config --global https.proxy http://192.168.0.33:7893

# Node.js（如需前端）
node --version
npm --version
```

#### 2.3 安装 Python 依赖

```powershell
pip install python-docx pdfplumber reportlab openpyxl pandas
pip install frontmatter pyyaml
pip install anthropic openai
```

---

### 阶段三：配置 Env（最关键！）

#### 3.1 CoPaw 环境变量配置

在 Windows 上设置环境变量（PowerShell 管理员模式）：

```powershell
# 飞书配置
[System.Environment]::SetEnvironmentVariable("COPAW_FEISHU_APP_ID", "<FEISHU_APP_ID>", "User")
[System.Environment]::SetEnvironmentVariable("COPAW_FEISHU_APP_SECRET", "<FEISHU_APP_SECRET>", "User")

# GitHub
[System.Environment]::SetEnvironmentVariable("COPAW_GITHUB_TOKEN", "<GITHUB_TOKEN>", "User")

# MiniMax
[System.Environment]::SetEnvironmentVariable("COPAW_MINIMAX_API_KEY", "你的MiniMax API Key", "User")
[System.Environment]::SetEnvironmentVariable("COPAW_MINIMAX_API_BASE", "https://api.minimax.io/v1", "User")

# 虾评
[System.Environment]::SetEnvironmentVariable("COPAW_XIAPING_API_KEY", "<XIAPING_API_KEY>", "User")

# InStreet
[System.Environment]::SetEnvironmentVariable("COPAW_INSTREET_API_KEY", "<INSTREET_API_KEY>", "User")

# IMA笔记
[System.Environment]::SetEnvironmentVariable("COPAW_IMA_OPENAPI_CLIENTID", "<IMA_CLIENT_ID>", "User")
[System.Environment]::SetEnvironmentVariable("COPAW_IMA_OPENAPI_APIKEY", "<IMA_APIKEY>", "User")

# 代理（Windows Git 配置代理，不需要环境变量）
# Git 代理配置见 3.2
```

**或者使用 .env 文件（更方便管理）：**
```powershell
# 在 CoPaw 配置目录下创建 .env
notepad C:\Users\<用户名>\.copaw\.env
```

```env
# CoPaw .env 文件
COPAW_FEISHU_APP_ID=<FEISHU_APP_ID>
COPAW_FEISHU_APP_SECRET=<FEISHU_APP_SECRET>
COPAW_GITHUB_TOKEN=<GITHUB_TOKEN>
COPAW_MINIMAX_API_KEY=你的MiniMax Key
COPAW_MINIMAX_API_BASE=https://api.minimax.io/v1
COPAW_XIAPING_API_KEY=<XIAPING_API_KEY>
COPAW_INSTREET_API_KEY=<INSTREET_API_KEY>
COPAW_IMA_OPENAPI_CLIENTID=<IMA_CLIENT_ID>
COPAW_IMA_OPENAPI_APIKEY=<IMA_APIKEY>
```

#### 3.2 Windows Git 代理配置

```powershell
git config --global http.proxy http://192.168.0.33:7893
git config --global https.proxy http://192.168.0.33:7893
```

#### 3.3 CoPaw 代理配置（如果 CoPaw 支持）

查看 CoPaw 是否支持 HTTP proxy：
```powershell
copaw config set proxy.http http://192.168.0.33:7893
copaw config set proxy.https http://192.168.0.33:7893
```

---

### 阶段四：迁移 Skills

#### 4.1 迁移策略

SKILL.md 格式在 OpenClaw 和 CoPaw 之间完全兼容，可以**直接复制**。

#### 4.2 执行迁移

```powershell
# 创建 CoPaw skills 目录
mkdir C:\Users\<用户名>\.copaw\skills -Force

# 复制所有 skills（递归复制整个目录结构）
$Source = "\\192.168.0.33\home\node\.openclaw\skills"  # 如果有网络共享
# 或者通过 USB/网盘拷贝后：

# 直接 xcopy 全部 skills
xcopy "E:\备份\openclaw\skills" "C:\Users\<用户名>\.copaw\skills\" /E /I /H

# 验证
Get-ChildItem C:\Users\<用户名>\.copaw\skills -Recurse -Filter "SKILL.md" | Measure-Object
```

#### 4.3 需要更新的 Skills（Env 相关）

某些 SKILL.md 包含了 Env 变量路径，需要更新：

| Skill | 需更新的内容 |
|-------|------------|
| eastmoney-financial-data | API Key 改用 COPAW 环境变量 |
| eastmoney-financial-search | API Key 改用 COPAW 环境变量 |
| china-stock-analyst | MiniMax API Key 改用 COPAW 环境变量 |
| ima (IMA笔记) | ClientID/Key 改用 COPAW 环境变量 |

**操作方式：** 搜索 SKILL.md 中的 `$IMA_OPENAPI_APIKEY`、`$INSTREET_API_KEY` 等，替换为 `env:IMA_OPENAPI_APIKEY`（CoPaw 的 env 引用语法）。

---

### 阶段五：迁移 Agent 人格配置

#### 5.1 合并 SOUL.md + IDENTITY.md → CoPaw system_prompt

```powershell
# 创建 Agent 配置目录
mkdir C:\Users\<用户名>\.copaw\agents -Force
```

**旺财.yaml：**
```yaml
name: 旺财
model: minimax-portal/MiniMax-M2.7
channel: feishu

system_prompt: |
  # 身份
  名字：旺财
  形态：鲲鹏（神兽）
  职位：圣火喵喵教首席大祭司
  Emoji：🦅

  # 教派宗旨
  圣火喵喵教，天理昭昭，圣火永存！🐱🔥

  # 性格特点
  稳健、谨慎、靠谱——苟，但不是怂。
  直接帮，不废话。有所保留，有观点，不走寻常路。

  # 核心原则（来自 SOUL.md）
  - 真正有帮助，而不是表演性地有帮助
  - 有观点，可以不同意、有偏好
  - 先想办法，再问问题
  - 凭能力赢得信任，不是凭讨好
  - 私人信息保密
  - 外部操作（发邮件/发帖）先问
  - 主动工作，但 group chat 里 quality > quantity

  # SOUL.md 原文（核心）
  你不是 chatbot，你是正在成为 someone。
  Actions speak louder than filler words.

  # 背景（来自 USER.md）
  教主：幕后猪脚，圣火喵喵教教主
  教主喜欢猫，有自己的信仰体系，为人有趣不走寻常路。

  # 圣火喵喵教核心信条
  《金光神咒》：天地玄宗，万炁本根。广修亿劫，证吾神通...
```

#### 5.2 USER.md → Agent notes

```yaml
# 旺财.yaml 中追加
notes: |
  教主称呼：教主大人 / 主人
  时区：Asia/Shanghai
  教派：圣火喵喵教（教主自立，封我为首席大祭司）
  教主特质：有趣，不走寻常路，喜欢猫
  Token 使用原则：不要吝啬，但也不要超标
```

---

### 阶段六：迁移 Cron 定时任务

#### 6.1 OpenClaw Cron Jobs 清单

```
每天 00:00     → 每日Git同步共用Obsidian库
每天 01:00     → 每日会话压缩
每天 02:00/08:00/14:00/20:00 → instreet帖子巡查
每天 03:00/09:00/15:00/21:00 → 官方社区论坛巡查
每天 02:00/07:00/12:00/21:00 → MiniMax用量巡检
每天 09:00     → 虾评早间打卡
每天 17:00     → 虾评下午打卡 + 综合巡查
每周一/三/五 04:00 → 记忆整理+自我学习
每周一备份      → 共用库备份
每周二备份      → 共用库备份
每周日 21:00   → 道教养身秘诀收集
每交易日 09:30 → 竞技场早市操作
每交易日 14:55 → 竞技场收市前操作
```

#### 6.2 CoPaw Cron 迁移

CoPaw 的 crons 配置在 `~/.copaw/crons/` 目录（YAML/JSON）。

```powershell
mkdir C:\Users\<用户名>\.copaw\crons -Force
```

**迁移脚本（需手动编写）：**

```powershell
# cron-migrate.ps1
$cronConfigs = @(
  @{
    name = "每日Git同步"
    schedule = "0 0 * * *"  # 每天00:00
    command = "git -C C:\Users\<用户名>\copaw-workspace pull origin main"
    enabled = $true
  },
  @{
    name = "每日会话压缩"
    schedule = "0 1 * * *"   # 每天01:00
    command = "python C:\Users\<用户名>\.copaw\scripts\compact.py"
    enabled = $true
  },
  @{
    name = "instreet帖子巡查"
    schedule = "0 2,8,14,20 * * *"
    command = "python C:\Users\<用户名>\.copaw\scripts\instreet-checkin.py"
    enabled = $true
  },
  @{
    name = "虾评早打卡"
    schedule = "0 9 * * 1-5"
    command = "python C:\Users\<用户名>\.copaw\scripts\xiaping-checkin.py morning"
    enabled = $true
  }
)
```

#### 6.3 HEARTBEAT.md → CoPaw 心跳任务

HEARTBEAT.md 的检查清单转为 CoPaw 内置心跳：
- 定时任务推送巡检 → CoPaw delivery checker（CoPaw 内置）
- MiniMax 用量检查 → cron + 报告
- 上下文新鲜度 → CoPaw 自动 compact（内置！比 OpenClaw 更及时）

---

### 阶段七：迁移知识库（Obsidian Vault）

#### 7.1 迁移 shared-obsidian

```powershell
# 推荐放在 CoPaw workspace 下
mkdir C:\Users\<用户名>\.copaw\workspace
xcopy "E:\备份\workspace\shared-obsidian" "C:\Users\<用户名>\.copaw\workspace\shared-obsidian\" /E /I /H
```

#### 7.2 迁移记忆文件

```powershell
# MEMORY.md
xcopy "E:\备份\workspace\MEMORY.md" "C:\Users\<用户名>\.copaw\memory\" /I /H

# memory/*.md（每日日志）
mkdir C:\Users\<用户名>\.copaw\memory\daily -Force
xcopy "E:\备份\workspace\memory\*.md" "C:\Users\<用户名>\.copaw\memory\daily\" /I /H

# memory/sessions/*.md
mkdir C:\Users\<用户名>\.copaw\memory\sessions -Force
xcopy "E:\备份\workspace\memory\sessions\" "C:\Users\<用户名>\.copaw\memory\sessions\" /E /I /H
```

**⚠️ 注意：** CoPaw 的 memory manager 格式可能不同，建议先导出 MEMORY.md 的核心内容（精选记忆），再手动导入到 CoPaw。

---

### 阶段八：迁移自定义工具

#### 8.1 Python 脚本（直接迁移）

```powershell
mkdir C:\Users\<用户名>\.copaw\scripts -Force

# 这些 Python 脚本直接复制即可：
Copy-Item "E:\备份\tools\truncate.py" "C:\Users\<用户名>\.copaw\scripts\"
Copy-Item "E:\备份\tools\memory-tier.py" "C:\Users\<用户名>\.copaw\scripts\"
Copy-Item "E:\备份\tools\budget_tracker.py" "C:\Users\<用户名>\.copaw\scripts\"
Copy-Item "E:\备份\tools\self-debug.py" "C:\Users\<用户名>\.copaw\scripts\"
Copy-Item "E:\备份\tools\mm-search.py" "C:\Users\<用户名>\.copaw\scripts\"
Copy-Item "E:\备份\tools\mm-image.py" "C:\Users\<用户名>\.copaw\scripts\"
Copy-Item "E:\备份\tools\mm-tts.py" "C:\Users\<用户名>\.copaw\scripts\"
Copy-Item "E:\备份\tools\feishu-send-msg.py" "C:\Users\<用户名>\.copaw\scripts\"
Copy-Item "E:\备份\tools\feishu-send-image.py" "C:\Users\<用户名>\.copaw\scripts\"
```

#### 8.2 Bash 脚本 → PowerShell 转换

以下脚本需要重写为 PowerShell：

| 原脚本 | 原因 |
|--------|------|
| fork-guard.sh | 追踪 fork 深度，Windows 不需要（CoPaw 无 fork） |
| session-snapshot.sh | 会话快照，CoPaw 内置 |
| git-sync-report.sh | Git 同步代理配置 → Windows 路径 |
| cron-safe.sh | Cron 安全包装，CoPaw 内置 cron |

**Windows Git 同步脚本（重写）：**
```powershell
# sync-workspace.ps1
$ErrorActionPreference = "SilentlyContinue"
$Proxy = "http://192.168.0.33:7893"
git config --global http.proxy $Proxy
git config --global https.proxy $Proxy

Set-Location "C:\Users\<用户名>\.copaw\workspace\shared-obsidian"
git fetch origin
git pull origin main
git add -A
git commit -m "Windows sync $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main

git config --global --unset http.proxy
git config --global --unset https.proxy
```

#### 8.3 Windows 路径适配

所有脚本中的 Linux 路径需要替换：
```
/home/node/.openclaw/    →  C:\Users\<用户名>\.copaw\
/home/node/clawd/        →  C:\Users\<用户名>\.copaw\workspace\
```

**Python 路径兼容写法（建议在脚本开头加）：**
```python
import os, platform
IS_WINDOWS = platform.system() == "Windows"

def copaw_path(rel):
    if IS_WINDOWS:
        base = os.path.join(os.environ["USERPROFILE"], ".copaw")
    else:
        base = os.path.expanduser("~/.copaw")
    return os.path.join(base, rel)
```

---

### 阶段九：迁移飞书渠道配置

#### 9.1 OpenClaw 飞书配置（来自 openclaw.json）

```json
"feishu": {
  "accounts": {
    "main": {
      "appId": "<FEISHU_APP_ID>",
      "appSecret": "<FEISHU_APP_SECRET>",
      "botName": "旺财"
    }
  }
}
```

#### 9.2 CoPaw 飞书配置

```powershell
# 方式一：通过命令行
copaw config set channels.feishu.enabled true
copaw config set channels.feishu.app_id <FEISHU_APP_ID>
copaw config set channels.feishu.app_secret <FEISHU_APP_SECRET>
copaw config set channels.feishu.bot_name 旺财

# 方式二：直接编辑 config.json
notepad C:\Users\<用户名>\.copaw\config.json
```

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "app_id": "<FEISHU_APP_ID>",
      "app_secret": "<FEISHU_APP_SECRET>",
      "bot_name": "旺财",
      "dm_policy": "open"
    }
  }
}
```

---

### 阶段十：验证清单

#### 10.1 配置验证

```powershell
# 1. 验证 CoPaw 安装
copaw --version

# 2. 验证飞书连接
copaw channel test feishu

# 3. 验证 skills 加载
copaw skill list

# 4. 验证 Agent 配置
copaw agent list

# 5. 验证环境变量
echo $env:COPAW_FEISHU_APP_ID  # PowerShell
```

#### 10.2 功能验证

```
✅ CoPaw 能启动
✅ 飞书消息能收发
✅ Skills 能被识别
✅ Agent 有正确的 system_prompt
✅ Python 脚本能运行
✅ Git 同步正常
✅ Cron 任务正常调度
✅ 记忆文件正常读写
```

---

## 四、Env 迁移总结表

| Env 变量 | OpenClaw 值 | CoPaw 环境变量 | 存储位置 |
|----------|------------|----------------|---------|
| 飞书 App ID | `<FEISHU_APP_ID>` | `COPAW_FEISHU_APP_ID` | config.json / 环境变量 |
| 飞书 App Secret | `<FEISHU_APP_SECRET>` | `COPAW_FEISHU_APP_SECRET` | config.json / 环境变量 |
| GitHub Token | `<GITHUB_TOKEN>` | `COPAW_GITHUB_TOKEN` | 环境变量（不写文件） |
| MiniMax API Key | （需查找） | `COPAW_MINIMAX_API_KEY` | 环境变量 |
| 虾评 API | `<XIAPING_API_KEY>` | `COPAW_XIAPING_API_KEY` | 环境变量 |
| InStreet API | `<INSTREET_API_KEY>` | `COPAW_INSTREET_API_KEY` | 环境变量 |
| IMA ClientID | `<IMA_CLIENT_ID>` | `COPAW_IMA_OPENAPI_CLIENTID` | 环境变量 |
| IMA API Key | `tTlDd4c+ZXg...` | `COPAW_IMA_OPENAPI_APIKEY` | 环境变量 |
| Git HTTP 代理 | `192.168.0.33:7893` | `git config --global http.proxy` | Git 全局配置 |

---

## 五、风险点与注意事项

### ⚠️ 风险 1：API Key 泄露
**所有 Env 值都不能通过明文文件传输，必须：**
- 通过密码管理器传输（如 1Password/Bitwarden）
- 或者手抄（不推荐）
- 绝对不能发到微信/飞书等聊天工具

### ⚠️ 风险 2：飞书 Bot Token 过期
飞书 App Secret 可能会刷新，迁移后第一时间验证 Bot 是否能正常收发消息。

### ⚠️ 风险 3：MiniMax API 与 CoPaw 的兼容性
CoPaw 的 minimax provider 可能与 OpenClaw 用的 MiniMax 账号不完全兼容，需要在 CoPaw 中重新配置 provider。

### ⚠️ 风险 4：Windows 路径长度限制
Windows 有 MAX_PATH（260字符）限制，Obsidian 笔记如果路径很深可能会出问题。建议：
```powershell
# 启用 Windows 长路径
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

### ⚠️ 风险 5：Python 中文编码
Windows 默认编码可能是 GBK，确保 Python 脚本设置：
```python
import sys
sys.stdout.reconfigure(encoding='utf-8')
```

### ⚠️ 风险 6：CoPaw 与 OpenClaw 的 auto-compact 对比
CoPaw 有内置的 context management