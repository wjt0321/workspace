# 从 CN 版 Docker 迁移到国际版 Docker 方案

> 目标平台：国际版 Docker（ghcr.io/openclaw/openclaw）
> 当前版本：CN 版 clawdbot-gateway（版本未知，明显老旧）
> 目标版本：2026.4.8（国际版最新）
> 最后更新：2026-04-09

---

## 先说为什么

| | CN 版 Docker | 国际版 Docker |
|---|---|---|
| 版本 | 未知（长期不更新） | 2026.4.8（4月8日刚更新） |
| 代码基础 | 中文定制分支 | 官方主线 |
| bug 修复 | 无人维护 | 活跃更新 |
| cron timeout bug | 有（sh Bad substitution） | 已修复 |
| announce 400 错误 | 有 | 已修复 |

核心结论：国际版是官方维护的活跃分支，CN 版的 bug 不会在官方版本出现。

---

# 第一阶段：Docker 侧（准备 & 打包）

> 在当前 CN Docker 环境执行完毕再动目标机器。

## 1.1 核对 .env 所有配置

```bash
cat ~/.openclaw/workspace/.env
```

整理清单（截图或手抄）：

| 变量名 | 说明 |
|--------|------|
| `MINIMAX_API_KEY` | MiniMax API Key |
| `FEISHU_APP_ID` | 飞书 AppID |
| `FEISHU_APP_SECRET` | 飞书 AppSecret |
| `XIAPING_API_KEY` | 虾评 API Key |
| `EASTMONEY_API_KEY` | 东方财富 API Key |
| `GITHUB_TOKEN` | GitHub PAT |
| `IMA_OPENAPI_CLIENTID` | IMA 笔记 ClientID |
| `IMA_OPENAPI_APIKEY` | IMA 笔记 API Key |
| `INSTREET_API_KEY` | InStreet API Key（已废弃） |
| 代理地址 | `192.168.0.33:7893` |

## 1.2 导出关键清单

```bash
BACKUP=~/openclaw-migration-$(date +%Y%m%d)
mkdir -p "$BACKUP"

# 导出 cron jobs
openclaw cron list > "$BACKUP/cron-jobs.txt"

# 导出已安装技能
claw skill list > "$BACKUP/installed-skills.txt"

# 检查坏符号链接
find ~/.openclaw/skills -type l ! -exec test -e {} \; -print > "$BACKUP/broken-symlinks.txt" 2>/dev/null || true

# 备份 cron jobs.json（防覆盖）
cp ~/.openclaw/cron/jobs.json "$BACKUP/cron-jobs-backup.json"
```

## 1.3 打包核心数据

```bash
tar -czvf ~/openclaw-migration-$(date +%Y%m%d).tar.gz \
  ~/.openclaw/openclaw.json \
  ~/.openclaw/agents/ \
  ~/.openclaw/workspace/memory/ \
  ~/.openclaw/workspace/.env \
  ~/.openclaw/workspace/tools/ \
  ~/.openclaw/cron/ \
  ~/.openclaw/skills/ \
  ~/openclaw-migration-*/cron-jobs.txt \
  ~/openclaw-migration-*/installed-skills.txt \
  ~/openclaw-migration-*/broken-symlinks.txt

du -sh ~/openclaw-migration-*.tar.gz
```

## ✅ 第一阶段完成标志

```
☐ tar.gz 已生成
☐ cron-jobs.txt 已导出
☐ installed-skills.txt 已导出
☐ broken-symlinks.txt 已导出
☐ .env 所有 Key 已核对
```

---

# 第二阶段：国际版 Docker 侧

> CN 侧准备完毕后，在目标机器执行。

## 2.1 安装国际版 Docker

**前置条件**：Docker Desktop / Docker Engine 已安装

**拉取国际版镜像：**
```bash
# 拉取最新国际版镜像
docker pull ghcr.io/openclaw/openclaw:2026.4.8

# 或拉取 latest（不推荐生产环境）
docker pull ghcr.io/openclaw/openclaw:latest
```

**验证版本：**
```bash
docker run --rm ghcr.io/openclaw/openclaw:2026.4.8 --version
```

## 2.2 配置环境变量

将 CN 侧的 `.env` 内容迁移过来，注意路径：

```bash
# 国际版默认数据目录：~/.openclaw（与 CN 版相同）
mkdir -p ~/.openclaw/workspace
cp /path/to/.env ~/.openclaw/workspace/.env
chmod 600 ~/.openclaw/workspace/.env
```

## 2.3 恢复配置（顺序不能乱）

```bash
# 1. 环境变量（API Key）—— 必须第一个！
cp openclaw.json ~/.openclaw/
chmod 600 ~/.openclaw/openclaw.json

# 2. cron 任务定义
cp -a cron/ ~/.openclaw/

# 3. 会话历史
cp -a agents/ ~/.openclaw/

# 4. 记忆文件
cp -a workspace/memory/ ~/.openclaw/workspace/

# 5. 自定义脚本
cp -a workspace/tools/ ~/.openclaw/workspace/

# 6. Skills
cp -a skills/ ~/.openclaw/skills/
```

## 2.4 启动国际版 Gateway

```bash
# 国际版启动方式
docker run -d \
  --name openclaw-gateway \
  -p 18789:18789 \
  -v ~/.openclaw:/home/node/.openclaw \
  -e OPENCLAW_CONFIG_DIR=/home/node/.openclaw \
  ghcr.io/openclaw/openclaw:2026.4.8 \
  gateway --bind lan --port 18789
```

**或使用 Docker Compose（推荐）：**

```yaml
# docker-compose.yml
version: '3.8'
services:
  openclaw:
    image: ghcr.io/openclaw/openclaw:2026.4.8
    container_name: openclaw-gateway
    ports:
      - "18789:18789"
    volumes:
      - ~/.openclaw:/home/node/.openclaw
    environment:
      - OPENCLAW_CONFIG_DIR=/home/node/.openclaw
    restart: unless-stopped
```

```bash
docker-compose up -d
```

## 2.5 验证安装

```bash
# 检查容器运行状态
docker ps | grep openclaw

# 验证 CLI 版本
docker exec openclaw-gateway openclaw --version

# 验证 Gateway 可访问
curl http://127.0.0.1:18789/api/status
```

## 2.6 迁移 Skills

```bash
# 检查坏链接
find ~/.openclaw/skills -type l ! -exec test -e {} \; -print

# 对照 broken-symlinks.txt 逐一修复
# 重新克隆损坏的技能仓库
```

## 2.7 验证迁移结果

```
☐ Gateway 进程正常运行
☐ 飞书收发消息正常
☐ cron 任务全部显示在列表中
☐ Skills 数量与 CN 侧一致
☐ 记忆文件完整（MEMORY.md 可读）
☐ 会话历史完整
☐ MiniMax API 可调用
☐ delivery 配置正确（announce 推送正常）
```

---

## 附录：关键差异

| 项目 | CN 版 | 国际版 |
|------|-------|--------|
| Docker 镜像 | `clawdbot-gateway`（私有） | `ghcr.io/openclaw/openclaw:2026.4.8` |
| CLI 包名 | `@openclaw-cn/cli` | `openclaw` |
| 配置格式 | 相同 | 相同 |
| 数据目录 | `~/.openclaw` | `~/.openclaw` |
| 技能格式 | SKILL.md | SKILL.md（MCP/Claude Bundle 兼容） |
| cron 格式 | JSON | JSON（相同） |

## 附录：版本记录

| 版本 | 发布日期 | 说明 |
|------|---------|------|
| 2026.4.8 | 2026-04-08 | 国际版最新 |
| 2026.2.26 | 2026-02-26 | 国际版 |
| 1.3.1 | 未知 | CN CLI（长期停滞） |

---

*本文档由圣火喵喵教首席大祭司 🦅 编制*
*🐱🔥 天理昭昭，圣火永存！*
