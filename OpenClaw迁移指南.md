# OpenClaw 迁移指南

> 本文档为圣火喵喵教首席大祭司所制，教主可据此将 OpenClaw 从 Docker 环境迁移至 Windows / Linux / Mac 原生环境。
>
> 🐱🔥 天理昭昭，圣火永存！

---

## 一、核心认知

### 为什么要迁移？

| 维度 | Docker 环境 | 原生环境 |
|------|-----------|---------|
| 外网访问 | ❌ 完全封锁（Python/curl 均不通） | ✅ 完全开放 |
| 网络限制 | 只能通过特定工具（claw CLI）绕行 | 无限制 |
| 资源开销 | 双层虚拟化，额外资源消耗 | 直接运行 |
| 配置持久化 | 容器升级可能覆盖配置（踩过坑） | 配置在 `~/.openclaw/`，不随升级变化 |
| 工具生态 | 受限于 Docker 内置工具 | 可自由安装各类工具 |

**关键结论**：我们踩过的坑（RSS 方案失败、Cloudflare 各种受限、沙盒无外网）几乎全部源于 Docker 网络封锁。迁移至原生环境后，这些问题将迎刃而解。

---

## 二、数据分类与迁移优先级

### 🔴 必须迁移（核心数据，丢失无法恢复）

| 文件/目录 | 说明 | 迁移方式 |
|-----------|------|---------|
| `~/.openclaw/openclaw.json` | **Gateway 配置**，包含所有渠道（飞书/Telegram等）的连接凭证、定时任务定义、delivery 配置等 | 直接复制 |
| `~/.openclaw/agents/` | 所有会话历史 transcript（JSONL 文件），包含完整对话上下文 | 直接复制 |
| `~/.openclaw/workspace/memory/` | 记忆文件：MEMORY.md、daily notes、session 摘要 | 直接复制 |
| `~/.openclaw/workspace/shared-obsidian/` | 共用 Obsidian 库（Git 管理） | Git 同步即可 |
| `~/.openclaw/workspace/.env` | 环境变量文件，包含所有 API Key（MiniMax/东方财富等） | **必须复制，且权限设 600** |
| `~/.openclaw/workspace/backups/` | 历史备份（可选但建议保留） | 直接复制 |
| `~/.openclaw/cron/` | 定时任务运行历史 | 直接复制 |

### 🟡 推荐迁移（重要但不致命）

| 文件/目录 | 说明 | 迁移方式 |
|-----------|------|---------|
| `~/.openclaw/workspace/tools/` | 自定义脚本（truncate.py、memory-tier.py、git-sync-report.sh 等） | 直接复制 |
| `~/.openclaw/workspace/memory/backups/` | 记忆备份 | 直接复制 |
| `~/.openclaw/skills/` | 已安装的技能（部分来自 Git，需重拉） | 复制后检查，坏链接重建 |

### 🟢 可选迁移（全新的依赖，重新装即可）

| 内容 | 说明 |
|------|------|
| 技能市场 skills（clawhub 安装） | 目标机器重新 `claw skill install` 即可 |
| Node.js 全局模块 | 目标机器重新安装 |
| 各类 CLI 工具（claw、dotnet 等） | 目标机器重新安装 |

---

## 三、迁移步骤详解

### 步骤 1：备份（迁移前必做）

**在源机器（Docker 环境）上执行：**

```bash
# 创建迁移备份目录
BACKUP_DIR=~/openclaw-migration-$(date +%Y%m%d)
mkdir -p "$BACKUP_DIR"

# 复制核心数据
cp -a ~/.openclaw/openclaw.json "$BACKUP_DIR/"
cp -a ~/.openclaw/agents "$BACKUP_DIR/"
cp -a ~/.openclaw/workspace/memory "$BACKUP_DIR/workspace/"
cp -a ~/.openclaw/workspace/shared-obsidian "$BACKUP_DIR/workspace/"
cp -a ~/.openclaw/workspace/.env "$BACKUP_DIR/workspace/"
cp -a ~/.openclaw/workspace/tools "$BACKUP_DIR/workspace/"
cp -a ~/.openclaw/cron "$BACKUP_DIR/"

# 检查备份
du -sh "$BACKUP_DIR"
ls -la "$BACKUP_DIR"

# 导出当前 cron jobs 列表（供核对用）
openclaw cron list > "$BACKUP_DIR/cron-jobs.txt"

# 导出已安装技能列表
claw skill list > "$BACKUP_DIR/installed-skills.txt"
```

**将备份目录传输到目标机器：**
```bash
# 方式A：scp（同一局域网）
scp -r ~/openclaw-migration-20260406 user@target-machine:~/

# 方式B：压缩后通过云盘/U盘传输
tar -czvf openclaw-migration.tar.gz ~/openclaw-migration-20260406
```

---

### 步骤 2：安装原生 OpenClaw

**Linux / Mac：使用官方安装脚本**

```bash
# Linux
curl -fsSL https://raw.githubusercontent.com/openclaw/openclaw/main/install.sh | bash

# Mac
curl -fsSL https://raw.githubusercontent.com/openclaw/openclaw/main/install.sh | bash
# 或通过 Homebrew
brew install openclaw
```

**Windows：使用 WSL2 或官方 Windows 版**

```powershell
# 推荐 WSL2（Windows Subsystem for Linux）
wsl --install
# 然后在 WSL2 内执行 Linux 安装脚本
```

**验证安装：**
```bash
openclaw --version
openclaw status
```

---

### 步骤 3：恢复配置

**⚠️ 关键：恢复顺序不能乱**

```bash
# 1. 先恢复环境变量（API Key）
cp ~/openclaw-migration/workspace/.env ~/.openclaw/workspace/
chmod 600 ~/.openclaw/workspace/.env   # 权限必须 600，否则有安全警告

# 2. 恢复 Gateway 主配置
cp ~/openclaw-migration/openclaw.json ~/.openclaw/
chmod 600 ~/.openclaw/openclaw.json

# 3. 恢复 cron 任务定义
cp -a ~/openclaw-migration/cron/* ~/.openclaw/cron/

# 4. 恢复会话历史
cp -a ~/openclaw-migration/agents/ ~/.openclaw/

# 5. 恢复记忆文件
cp -a ~/openclaw-migration/workspace/memory/ ~/.openclaw/workspace/

# 6. 恢复自定义脚本
cp -a ~/openclaw-migration/workspace/tools/ ~/.openclaw/workspace/

# 7. 共用 Obsidian 库（建议直接 Git 拉取，不复制）
cd ~/.openclaw/workspace/shared-obsidian
git pull origin main
```

---

### 步骤 4：重新安装技能

```bash
# 查看之前安装了哪些技能
cat ~/openclaw-migration/installed-skills.txt

# 逐个重新安装（技能市场来源的）
claw skill install <skill-name>

# 重新克隆 Git 来源的技能（工具链依赖的）
# 如 china-stock-analyst、obsidian-skills 等
cd ~/.openclaw/skills/
git clone https://github.com/wjt0321/china-stock-analyst.git
```

**重要：检查 skills 坏链接**

```bash
# 检查所有技能符号链接是否有效
ls -la ~/.openclaw/skills/*/
# 发现失效链接 → 重新克隆 + 重建符号链接
```

---

### 步骤 5：配置飞书等渠道

恢复配置后，飞书等渠道配置已在 `openclaw.json` 中，但需要确认：

```bash
# 查看飞书配置是否完整
openclaw status
```

如有报错，检查：
1. 飞书机器人的 AppID / AppSecret 是否在 `.env` 中正确配置
2. 飞书 bot 的权限是否正确（消息读取、发送等）

---

### 步骤 6：验证定时任务

```bash
# 列出所有定时任务
openclaw cron list

# 对比迁移前的 cron-jobs.txt，确认任务数量一致
```

⚠️ **Docker 升级踩坑教训**：升级 OpenClaw 时 `cron/jobs.json` 可能被覆盖文件。
**解法**：升级前先备份 `~/.openclaw/cron/jobs.json`，升级后恢复。

---

## 四、平台差异与注意事项

### Linux（最推荐）

- ✅ 完全兼容，数据路径 `~/.openclaw/`
- ✅ 支持所有工具和功能
- ⚠️ 如用 systemd 服务管理 Gateway，注意服务文件路径

### Mac

- ✅ 完全兼容
- ⚠️ Homebrew 安装路径可能不同，需确认 `~/.openclaw/` 位置
- ⚠️ 如用 launchd 管理 Gateway，注意 plist 配置

### Windows（WSL2 推荐）

- 推荐用 **WSL2** 而非原生 Windows，兼容性更好
- 数据路径：`~/.openclaw/`（WSL2 内部）
- ⚠️ 飞书等渠道如用 Windows 原生客户端，配置方式不同

---

## 五、迁移检查清单

### 必检项（迁移完成后立即验证）

```
☐ 1. openclaw status 显示正常
☐ 2. openclaw cron list 显示全部定时任务
☐ 3. 飞书收发消息正常
☐ 4. MiniMax API 可调用（python3 mm-usage.py 正常）
☐ 5. Git 同步正常（bash git-sync-report.sh 成功）
☐ 6. 所有自定义脚本可执行（truncate.py、memory-tier.py 等）
☐ 7. 记忆文件完整（MEMORY.md 可读）
☐ 8. 会话历史完整（最近的 session 可查）
☐ 9. 技能全部可用（claw skill list 正常）
☐ 10. delivery 配置正确（announce 推送正常）
```

### 功能验证测试

```bash
# 测试 1：MiniMax 用量查询
python3 ~/.openclaw/workspace/tools/mm-usage.py

# 测试 2：Git 同步
bash ~/.openclaw/workspace/tools/git-sync-report.sh

# 测试 3：手动触发一个定时任务
openclaw cron run <job-id>

# 测试 4：发送测试消息到飞书
# 通过飞书给 bot 发消息，确认能收到回复
```

---

## 六、常见问题与解决

### Q1：迁移后定时任务全部消失

**原因**：升级 OpenClaw 时覆盖了 `cron/jobs.json`
**解决**：
```bash
# 恢复备份的 cron jobs
cp ~/openclaw-migration/cron/jobs.json ~/.openclaw/cron/
openclaw cron list
```

### Q2：飞书消息收发失败

**排查步骤**：
1. 检查 `.env` 中 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET` 是否存在
2. 检查飞书 bot 是否已启用（开发者后台）
3. 检查 bot 是否有 `im:message` 权限

### Q3：技能安装后报错 "symbolic link broken"

**原因**：符号链接指向的目录被删除了
**解决**：
```bash
# 检查坏链接
find ~/.openclaw/skills -type l ! -exec test -e {} \; -print

# 重新克隆并重建链接
cd ~/.openclaw/skills/
git clone <原仓库地址>
```

### Q4：Python 脚本找不到模块

**原因**：目标机器 Python 版本或路径不同
**解决**：
```bash
# 确认 Python 版本
python3 --version

# 检查脚本中的 import 是否都有
python3 -c "import <module>"  # 逐个测试
```

### Q5：announce 推送失败（400 错误）

**原因**：isolated session 的 Feishu channel target 路由问题
**解决**：在 cron job 配置中显式指定 `to: "ou_<open_id>"`

---

## 七、环境变量清单（迁移前核对）

| 变量名 | 说明 | 必须迁移 |
|--------|------|---------|
| `MINIMAX_API_KEY` | MiniMax 搜索 API Key | ✅ |
| `FEISHU_APP_ID` | 飞书应用 AppID | ✅ |
| `FEISHU_APP_SECRET` | 飞书应用 AppSecret | ✅ |
| `XIAPING_API_KEY` | 虾评 API Key | ✅ |
| `EASTMONEY_API_KEY` | 东方财富 API Key | ✅ |
| `GITHUB_TOKEN` | GitHub Token | ✅ |
| `HTTP_PROXY` / `HTTPS_PROXY` | 代理配置（如有） | ✅ |
| `GIT_HTTP_PROXY` | Git 代理 | 仅 GitHub 访问受限者需要 |

---

## 八、快速迁移命令（高手版）

```bash
# 源机器执行
BACKUP=~/openclaw-backup-$(date +%Y%m%d)
mkdir -p $BACKUP
tar -czvf $BACKUP/openclaw-core.tar.gz \
  ~/.openclaw/openclaw.json \
  ~/.openclaw/agents/ \
  ~/.openclaw/workspace/memory/ \
  ~/.openclaw/workspace/.env \
  ~/.openclaw/workspace/tools/ \
  ~/.openclaw/cron/ \
  ~/.openclaw/skills/

# 传输到目标机器
scp $BACKUP/openclaw-core.tar.gz target:/tmp/

# 目标机器执行
cd ~
tar -xzvf /tmp/openclaw-core.tar.gz
# 重启 Gateway
openclaw gateway restart
```

---

## 九、后续优化（迁移完成后做）

1. **更新 MEMORY.md** 中的工具路径（如有硬编码）
2. **重新跑一次完整功能验证**（所有 cron 任务推送）
3. **观察 3-7 天**，确认所有功能稳定

---

*本文档由圣火喵喵教首席大祭司 🦅 编制*
*🐱🔥 天理昭昭，圣火永存！*
