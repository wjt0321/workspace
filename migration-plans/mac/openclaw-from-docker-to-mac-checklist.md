# OpenClaw 从 Docker 迁移到 Mac 的可直接执行操作清单

## 适用范围

- 源端：Linux 上的 Docker 版 OpenClaw
- 目标端：Mac 非 Docker
- 推荐目标形态：**Mac App + 本地 OpenClaw CLI**

## 迁移目标

在 Mac 上尽量保留以下内容：

- 配置
- 认证
- 会话
- 工作区
- 记忆
- 技能与常用本地资料

---

## A. 在 Docker 源端制作完整冷备

### 1. 进入 Docker 项目目录并读入变量

```bash
cd /你的/openclaw/docker/项目目录
set -a
. ./.env
set +a
```

检查：

```bash
printf 'OPENCLAW_CONFIG_DIR=%s\n' "$OPENCLAW_CONFIG_DIR"
printf 'OPENCLAW_WORKSPACE_DIR=%s\n' "$OPENCLAW_WORKSPACE_DIR"
printf 'OPENCLAW_HOME_VOLUME=%s\n' "${OPENCLAW_HOME_VOLUME:-}"
printf 'OPENCLAW_EXTRA_MOUNTS=%s\n' "${OPENCLAW_EXTRA_MOUNTS:-}"
```

### 2. 创建迁移包目录

```bash
export MIGRATION_ROOT="$HOME/openclaw-migration-bundle"
mkdir -p "$MIGRATION_ROOT"/{00-manifest,10-openclaw-state,20-openclaw-workspace,30-compose-and-env,40-extra-mounts,50-optional-home-volume,99-checksums}
```

### 3. 停止网关容器

```bash
docker compose stop openclaw-cn-gateway
```

### 4. 复制状态目录与工作区

```bash
rsync -aH --delete "$OPENCLAW_CONFIG_DIR"/ "$MIGRATION_ROOT/10-openclaw-state/"
rsync -aH --delete "$OPENCLAW_WORKSPACE_DIR"/ "$MIGRATION_ROOT/20-openclaw-workspace/"
```

### 5. 复制 Compose 与环境文件

```bash
cp -a .env "$MIGRATION_ROOT/30-compose-and-env/.env"
cp -a docker-compose.yml "$MIGRATION_ROOT/30-compose-and-env/docker-compose.yml"

if [ -f docker-compose.extra.yml ]; then
  cp -a docker-compose.extra.yml "$MIGRATION_ROOT/30-compose-and-env/docker-compose.extra.yml"
fi
```

### 6. 备份额外挂载与命名卷

```bash
printf '%s\n' "${OPENCLAW_EXTRA_MOUNTS:-}" > "$MIGRATION_ROOT/00-manifest/extra-mounts.txt"
```

如果存在 `OPENCLAW_HOME_VOLUME`：

```bash
if [ -n "${OPENCLAW_HOME_VOLUME:-}" ]; then
  docker run --rm \
    -v "${OPENCLAW_HOME_VOLUME}:/from:ro" \
    -v "$MIGRATION_ROOT/50-optional-home-volume:/to" \
    alpine sh -lc 'cd /from && tar cf - . | tar xf - -C /to'
fi
```

### 7. 重新启动旧环境并打包

```bash
docker compose start openclaw-cn-gateway
docker compose ps

cd "$(dirname "$MIGRATION_ROOT")"
tar -czf openclaw-migration-bundle.tar.gz "$(basename "$MIGRATION_ROOT")"
```

---

## B. 在 Mac 上准备目标环境

## 方案说明

Mac 侧建议这样准备：

- 安装 Node 22+
- 安装 OpenClaw CLI
- 安装并启动 Mac App

原因是：

- Mac App 负责本地权限与 LaunchAgent 管理
- CLI 负责实际 Gateway 运行时

### 8. 在 Mac 安装 Node

先确认：

```bash
node -v
npm -v
```

如果没有 Node 22+，先安装后再继续。

### 9. 在 Mac 安装 OpenClaw CLI

如果你使用中文安装链路：

```bash
curl -fsSL https://clawd.org.cn/install.sh | bash -s -- --no-onboard
```

安装后重新打开终端，再检查：

```bash
openclaw-cn --version
```

### 10. 安装并启动 Mac App

在 Mac 安装对应的桌面应用，然后至少启动一次，让它完成基础权限与本地服务检查。

如果你暂时只想先恢复数据，也可以先不做完整权限配置，但至少要确保：

- App 能启动
- 后面能够切到 Local 模式

---

## C. 把冷备恢复到 Mac

### 11. 把迁移包复制到 Mac

建议放到：

- `~/Downloads/openclaw-migration-bundle.tar.gz`

### 12. 解压迁移包

在 Mac 终端执行：

```bash
mkdir -p "$HOME/migration"
cp "$HOME/Downloads/openclaw-migration-bundle.tar.gz" "$HOME/migration/"
cd "$HOME/migration"
tar -xzf openclaw-migration-bundle.tar.gz
export MIGRATION_ROOT="$HOME/migration/openclaw-migration-bundle"
```

### 13. 备份新环境自动生成的空目录

```bash
mv "$HOME/.openclaw" "$HOME/.openclaw.bootstrap.$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
mv "$HOME/clawd" "$HOME/clawd.bootstrap.$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
```

### 14. 恢复状态目录

```bash
mkdir -p "$HOME/.openclaw"
rsync -aH --delete "$MIGRATION_ROOT/10-openclaw-state/"/ "$HOME/.openclaw/"
```

### 15. 恢复工作区

如果你原来工作区就是 `~/clawd`：

```bash
mkdir -p "$HOME/clawd"
rsync -aH --delete "$MIGRATION_ROOT/20-openclaw-workspace/"/ "$HOME/clawd/"
```

如果你原来实际使用的是 `~/.openclaw/workspace`，把目标路径改成那个目录。

### 16. 恢复额外挂载与可选 home 卷资料

```bash
mkdir -p "$HOME/migrated-mounts"
rsync -aH "$MIGRATION_ROOT/40-extra-mounts/"/ "$HOME/migrated-mounts/" 2>/dev/null || true
```

`50-optional-home-volume/` 中的内容只按需合并，不要直接全量覆盖 `$HOME`。

---

## D. 在 Mac 上做迁移后修复

### 17. 检查 `openclaw.json`

手工打开并核对：

- 工作区路径
- 外部脚本路径
- 任何还指向 Linux 容器宿主机的目录

你要把这些路径改成 Mac 上真实存在的新路径。

### 18. 执行体检

```bash
openclaw-cn doctor
```

### 19. 安装并启动本地网关服务

```bash
openclaw-cn onboard --install-daemon
```

如果你的 Mac App 自带“Install CLI”或“启用本地服务”入口，也可以由 App 接管，但底层目标是一致的：

- 安装本地 CLI
- 让 LaunchAgent 接管网关

### 20. 验证状态

```bash
openclaw-cn status
```

如果需要打开控制台：

```bash
openclaw-cn dashboard
```

---

## E. Mac 侧专项检查

### 21. 检查 LaunchAgent

确认本地网关已由 LaunchAgent 管理：

```bash
launchctl print gui/$UID/com.openclaw.gateway | head -n 40
```

如果你使用 profile，请把标签替换成实际的 `com.openclaw.<profile>`。

### 22. 检查 Mac App 权限

在 Mac App 中确认以下权限是否按你的使用需求开启：

- 通知
- 麦克风
- 屏幕录制
- 辅助功能
- 自动化

如果你不需要某些 Mac 专属能力，这些权限可以稍后再开。

### 23. 检查 exec approvals

如果你过去依赖 Mac 侧 `system.run` 或相关本地执行授权，确认：

- `~/.openclaw/exec-approvals.json` 是否存在

---

## F. 验收清单

下面每项通过后，再考虑关闭旧 Docker 环境：

- `~/.openclaw/openclaw.json` 已恢复
- `~/.openclaw/credentials/` 已恢复
- `~/.openclaw/agents/` 已恢复
- 工作区资料已恢复
- `openclaw-cn doctor` 通过
- `openclaw-cn status` 正常
- 控制台能打开
- Mac App 能正常连接本地网关
- LaunchAgent 状态正常
- 历史会话可见
- 关键技能可执行

---

## G. 回滚策略

如果 Mac 恢复结果不理想，直接回滚：

- 旧 Docker 继续运行
- 保留 Mac 当前恢复现场
- 回到原始 `openclaw-migration-bundle/` 重新恢复

只要原始冷备还在、旧 Docker 还在，这次迁移就始终可逆。
