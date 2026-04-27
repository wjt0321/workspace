# OpenClaw Docker 跨平台部署与升级实战指南（Windows / macOS / Linux）

> 来源：https://clawd.org.cn/install/docker.md
> 最后更新：2026-03-30

---

## Docker 适合哪些场景

| 场景 | 建议 |
|------|------|
| 需要隔离环境，便于重建 | ✅ 使用 Docker |
| 主机不想装完整运行时（Node 等） | ✅ 使用 Docker |
| 追求最快本地开发迭代 | ❌ 优先原生安装 |

---

## 一、三平台统一前置条件

### 1.1 软件要求

- Docker Desktop（Windows/macOS）或 Docker Engine（Linux）
- Docker Compose v2
- 可用端口：`18789`（网关 UI）

### 1.2 目录与持久化策略

- 配置目录：`~/.openclaw/`
- 工作区目录：`~/clawd/`
- 可选命名卷：`OPENCLAW_HOME_VOLUME=clawdbot_home`

### 1.3 建议先准备 `.env`

```bash
OPENCLAW_IMAGE=jiulingyun803/openclaw-cn:latest
OPENCLAW_GATEWAY_PORT=18789
OPENCLAW_GATEWAY_BIND=lan
OPENCLAW_HOME_VOLUME=clawdbot_home
```

> Claude 相关变量可选，不设置只会告警，不影响飞书/Telegram 等渠道。

---

## 二、Windows 部署（推荐 WSL2）

### 2.1 方案 A：WSL2（强烈推荐）

先在 PowerShell（管理员）执行：

```powershell
wsl --install
wsl --install -d Ubuntu-24.04
wsl --shutdown
```

进入 Ubuntu 后，按 Linux 流程部署（见第四章），兼容性最好。

### 2.2 方案 B：Windows 原生 Docker Desktop + PowerShell

在项目目录执行：

```powershell
$env:OPENCLAW_IMAGE="jiulingyun803/openclaw-cn:latest"
$env:OPENCLAW_HOME_VOLUME="clawdbot_home"
docker compose pull
docker compose up -d openclaw-cn-gateway
docker compose run --rm openclaw-cn-cli onboard
```

部署完成后访问：`http://127.0.0.1:18789/`。

---

## 三、macOS 部署

```bash
# 1) 设置镜像与持久化参数（可选）
export OPENCLAW_IMAGE="jiulingyun803/openclaw-cn:latest"
export OPENCLAW_HOME_VOLUME="clawdbot_home"

# 2) 快速部署
./docker-setup.sh
```

如果你不想走脚本，也可以手动：

```bash
docker compose pull
docker compose up -d openclaw-cn-gateway
docker compose run --rm openclaw-cn-cli onboard
```

---

## 四、Linux 部署

```bash
# 1) 设置镜像与持久化参数（可选）
export OPENCLAW_IMAGE="jiulingyun803/openclaw-cn:latest"
export OPENCLAW_HOME_VOLUME="clawdbot_home"

# 2) 快速部署
./docker-setup.sh
```

如果你在服务器上倾向显式控制流程，建议手动：

```bash
docker compose pull
docker compose up -d openclaw-cn-gateway
docker compose run --rm openclaw-cn-cli onboard
```

---

## 五、跨平台升级流程（Windows/macOS/Linux 通用）

### 5.1 标准升级（推荐）

```bash
# 1) 拉取最新镜像
docker pull jiulingyun803/openclaw-cn:latest

# 2) 重建并启动网关服务
docker compose up -d openclaw-cn-gateway

# 3) 运行诊断
docker compose run --rm openclaw-cn-cli doctor
```

### 5.2 有源码变更时

```bash
# 重建本地镜像
docker compose build openclaw-cn-gateway

# 启动新镜像
docker compose up -d openclaw-cn-gateway
```

### 5.3 脚本重装（macOS/Linux）

```bash
./docker-setup.sh
```

---

## 六、常用运维命令（跨平台统一）

```bash
# 查看容器状态
docker compose ps

# 查看网关日志
docker compose logs -f openclaw-cn-gateway

# 重启网关
docker compose restart openclaw-cn-gateway

# 停止网关
docker compose stop openclaw-cn-gateway

# 启动网关
docker compose up -d openclaw-cn-gateway

# 完全重建并启动
docker compose up -d --build openclaw-cn-gateway

# 进入容器调试
docker compose exec openclaw-cn-gateway sh
```

---

## 七、常用 CLI 命令（通过 Docker 运行）

```bash
# 查看配置
docker compose run --rm openclaw-cn-cli config get

# 查看渠道状态
docker compose run --rm openclaw-cn-cli channels status

# 查看配对请求
docker compose run --rm openclaw-cn-cli pairing list

# 审批飞书配对
docker compose run --rm openclaw-cn-cli pairing approve feishu <pairing_code>

# 诊断
docker compose run --rm openclaw-cn-cli doctor

# 配置向导
docker compose run --rm openclaw-cn-cli onboard

# 健康检查
docker compose exec openclaw-cn-gateway node dist/index.js health --token "$OPENCLAW_GATEWAY_TOKEN"
```

---

## 八、三平台差异与配置重点

### 8.1 环境变量写法

- Linux/macOS：`export VAR=value`
- Windows PowerShell：`$env:VAR="value"`

### 8.2 脚本可用性

- `docker-setup.sh` 主要适用于 macOS/Linux。
- Windows 建议使用 WSL2 执行脚本，或直接用 PowerShell 手动 compose。

### 8.3 路径与权限

- Linux 需关注 Docker socket 权限与目录属主（避免 `EACCES`）。
- Windows 注意磁盘共享与路径映射（建议在项目目录下运行 compose）。

---

## 九、数据持久化与备份建议

### 9.1 默认持久化

- `~/.openclaw/`（配置、技能、会话、cron）
- `~/clawd/`（工作区）

### 9.2 可选持久化 `/home/node`

```bash
export OPENCLAW_HOME_VOLUME="clawdbot_home"
./docker-setup.sh
```

### 9.3 升级前备份（建议）

```bash
tar -czf openclaw-docker-backup-$(date +%Y%m%d).tar.gz ~/.openclaw ~/clawd
```

---

## 十、常见问题

### Q1：日志提示 Claude 变量未设置，是否异常？

不是异常，可忽略，不影响飞书/Telegram 等渠道。

### Q2：容器重建后数据会丢吗？

只要绑定挂载或命名卷配置正确，数据不会丢。

### Q3：Web UI 提示 `pairing required` 怎么办？

先执行：

```bash
docker compose run --rm openclaw-cn-cli config set gateway.controlUi.allowInsecureAuth true
docker compose restart openclaw-cn-gateway
```

### Q4：升级后渠道不工作怎么办？

按顺序排查：`docker compose ps` → `logs` → `doctor` → `channels status`。

---

## 十一、服务说明

| 服务 | 类型 | 说明 |
|------|------|------|
| `openclaw-cn-gateway` | 常驻 | 后台网关服务，`docker compose up -d` 启动 |
| `openclaw-cn-cli` | 一次性 | 交互式命令工具，`docker compose run --rm` 调用 |

---

*圣火喵喵教，圣火永存！🐱🔥*
