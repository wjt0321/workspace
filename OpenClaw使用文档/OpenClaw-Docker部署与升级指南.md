# OpenClaw Docker 部署与升级指南

> 来源：https://clawd.org.cn/install/docker.md
> 最后更新：2026-03-29

---

## Docker 适合我吗？

| 场景 | 推荐 |
|------|------|
| 想要隔离的、可丢弃的网关环境 | ✅ 用 Docker |
| 在没有本地安装的主机上运行 | ✅ 用 Docker |
| 在自己的机器上运行，想要最快开发循环 | ❌ 用正常安装 |

---

## 快速部署（使用预构建镜像）

**推荐方式，无需从源码构建，10分钟内部署完成。**

### 1. 安装依赖

- Docker Desktop（或 Docker Engine）+ Docker Compose v2
- 足够的磁盘空间

### 2. 设置环境变量并启动

```bash
# 使用官方预构建镜像（自动适配 amd64/arm64）
export OPENCLAW_IMAGE="jiulingyun803/openclaw-cn:latest"

# 可选：持久化容器 home 目录
export OPENCLAW_HOME_VOLUME="clawdbot_home"

# 运行安装脚本
./docker-setup.sh
```

### 3. 完成配置

安装脚本会自动：
- 拉取/构建镜像
- 运行引导向导
- 通过 Docker Compose 启动网关
- 生成令牌写入 `.env`

完成后访问：`http://127.0.0.1:18789/`，将令牌粘贴到控制 UI（设置 → 令牌）。

---

## 升级流程

### 方式 1：预构建镜像（推荐）

```bash
# 拉取最新镜像
docker pull jiulingyun803/openclaw-cn:latest

# 重启网关容器
docker compose up -d openclaw-cn-gateway
```

### 方式 2：从源码构建

```bash
# 重新构建本地镜像
docker compose build openclaw-cn-gateway

# 重启
docker compose up -d openclaw-cn-gateway
```

### 方式 3：从源码构建（有代码修改时）

```bash
# 重新运行安装脚本
./docker-setup.sh
```

---

## 常用 Docker 命令

```bash
# 查看所有容器状态
docker compose ps

# 查看网关实时日志
docker compose logs -f openclaw-cn-gateway

# 查看 CLI 日志
docker compose logs -f openclaw-cn-cli

# 重启网关
docker compose restart openclaw-cn-gateway

# 停止网关
docker compose stop openclaw-cn-gateway

# 启动网关
docker compose up -d openclaw-cn-gateway

# 完全重建（代码变更后）
docker compose up -d --build openclaw-cn-gateway

# 进入容器调试
docker compose exec openclaw-cn-gateway sh
```

---

## 常用 CLI 命令（通过 Docker）

```bash
# 查看当前配置
docker compose run --rm openclaw-cn-cli config get

# 查看渠道状态
docker compose run --rm openclaw-cn-cli channels status

# 列出待审批配对请求
docker compose run --rm openclaw-cn-cli pairing list

# 批准飞书配对请求
docker compose run --rm openclaw-cn-cli pairing approve feishu <pairing_code>

# 运行诊断
docker compose run --rm openclaw-cn-cli doctor

# 交互式配置向导
docker compose run --rm openclaw-cn-cli onboard

# 健康检查
docker compose exec openclaw-cn-gateway node dist/index.js health --token "$OPENCLAW_GATEWAY_TOKEN"
```

---

## 环境变量配置（.env 文件）

在项目根目录创建/编辑 `.env` 文件：

```bash
# 镜像配置（必选）
OPENCLAW_IMAGE=jiulingyun803/openclaw-cn:latest

# 网关配置（可选，有默认值）
OPENCLAW_GATEWAY_PORT=18789
OPENCLAW_GATEWAY_BIND=lan

# 持久化（可选）
OPENCLAW_HOME_VOLUME=clawdbot_home

# Claude 集成（可选，仅使用 Claude AI 时需要）
CLAUDE_AI_SESSION_KEY=your_session_key_here
CLAUDE_WEB_SESSION_KEY=your_web_session_key_here
CLAUDE_WEB_COOKIE=your_cookie_here
```

> 注意：Claude 相关变量是**可选的**，不设置只会在日志中输出警告，**不影响飞书/Telegram 等渠道功能**。

---

## 数据持久化

### 配置和工作空间（默认绑定挂载）

- `~/.openclaw/` — 配置目录
- `~/clawd` — 工作区目录

这些目录默认通过绑定挂载持久化，容器重建后数据保留。

### 容器 home 目录持久化（可选）

```bash
export OPENCLAW_HOME_VOLUME="clawdbot_home"
./docker-setup.sh
```

这会创建 Docker 命名卷，持久化 `/home/node` 目录。

---

## 常见问题

### Q: 日志出现 Claude 环境变量警告，正常吗？

正常。这些警告（`CLAUDE_AI_SESSION_KEY variable is not set`）不影响任何渠道功能（飞书/Telegram等），可以忽略。

### Q: 容器重建后数据会丢失吗？

不会。`~/.openclaw/` 和 `~/clawd` 通过绑定挂载持久化。但如果使用了 `OPENCLAW_HOME_VOLUME`，需要确保卷存在。

### Q: 如何更新技能库（skills）？

技能库在 `~/.openclaw/skills/`，随绑定挂载持久化。更新方法：
```bash
docker compose exec openclaw-cn-gateway openclaw skills update
# 或重启容器自动重载
docker compose restart openclaw-cn-gateway
```

---

## 服务说明

| 服务 | 类型 | 说明 |
|------|------|------|
| `openclaw-cn-gateway` | 常驻 | 后台网关服务，`docker compose up -d` 自动启动 |
| `openclaw-cn-cli` | 一次性 | 交互式 CLI 工具，每次执行 `docker compose run --rm` |

---

*圣火喵喵教，圣火永存！🐱🔥*
