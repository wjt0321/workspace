# OpenClaw 从 Docker 迁移到 Windows 的可直接执行操作清单

## 适用范围

- 源端：Linux 上的 Docker 版 OpenClaw
- 目标端：Windows 非 Docker
- 推荐目标形态：**Windows + WSL2 + Ubuntu + OpenClaw**

## 执行原则

- 先做冷备，再迁移
- 先恢复 OpenClaw，再考虑 CoPaw
- 在新环境完全验证前，不删除旧 Docker 环境

---

## A. 迁移前准备

### 1. 在源端确认部署目录

在当前 Docker 宿主机执行：

```bash
cd /你的/openclaw/docker/项目目录
pwd
ls -la
```

你需要确认以下文件存在：

- `.env`
- `docker-compose.yml`

### 2. 读入当前环境变量

```bash
cd /你的/openclaw/docker/项目目录
set -a
. ./.env
set +a

printf 'OPENCLAW_CONFIG_DIR=%s\n' "$OPENCLAW_CONFIG_DIR"
printf 'OPENCLAW_WORKSPACE_DIR=%s\n' "$OPENCLAW_WORKSPACE_DIR"
printf 'OPENCLAW_HOME_VOLUME=%s\n' "${OPENCLAW_HOME_VOLUME:-}"
printf 'OPENCLAW_EXTRA_MOUNTS=%s\n' "${OPENCLAW_EXTRA_MOUNTS:-}"
```

你要确认两件事：

- `OPENCLAW_CONFIG_DIR` 已正确指向状态目录
- `OPENCLAW_WORKSPACE_DIR` 已正确指向工作区目录

### 3. 定义备份输出目录

建议你先定义一个明确的迁移包目录：

```bash
export MIGRATION_ROOT="$HOME/openclaw-migration-bundle"
mkdir -p "$MIGRATION_ROOT"/{00-manifest,10-openclaw-state,20-openclaw-workspace,30-compose-and-env,40-extra-mounts,50-optional-home-volume,99-checksums}
```

---

## B. 在 Docker 源端制作完整冷备

### 4. 记录源端信息

```bash
date -Is > "$MIGRATION_ROOT/00-manifest/backup-time.txt"
hostname > "$MIGRATION_ROOT/00-manifest/source-host.txt"
docker compose ps > "$MIGRATION_ROOT/00-manifest/docker-compose-ps.txt"
docker images > "$MIGRATION_ROOT/00-manifest/docker-images.txt"
```

### 5. 停止网关容器

```bash
cd /你的/openclaw/docker/项目目录
docker compose stop openclaw-cn-gateway
```

如果你的服务名不是 `openclaw-cn-gateway`，这里改成你自己的实际服务名。

### 6. 复制状态目录与工作区

```bash
rsync -aH --delete "$OPENCLAW_CONFIG_DIR"/ "$MIGRATION_ROOT/10-openclaw-state/"
rsync -aH --delete "$OPENCLAW_WORKSPACE_DIR"/ "$MIGRATION_ROOT/20-openclaw-workspace/"
```

### 7. 复制 Compose 与环境文件

```bash
cp -a .env "$MIGRATION_ROOT/30-compose-and-env/.env"
cp -a docker-compose.yml "$MIGRATION_ROOT/30-compose-and-env/docker-compose.yml"

if [ -f docker-compose.extra.yml ]; then
  cp -a docker-compose.extra.yml "$MIGRATION_ROOT/30-compose-and-env/docker-compose.extra.yml"
fi
```

### 8. 备份额外挂载目录

如果你配置过 `OPENCLAW_EXTRA_MOUNTS`，逐条备份它们对应的宿主机目录。

先把原值记下来：

```bash
printf '%s\n' "${OPENCLAW_EXTRA_MOUNTS:-}" > "$MIGRATION_ROOT/00-manifest/extra-mounts.txt"
```

然后按你自己的挂载项逐个复制到：

- `40-extra-mounts/挂载名-1/`
- `40-extra-mounts/挂载名-2/`

### 9. 备份命名卷

如果你配置过 `OPENCLAW_HOME_VOLUME`，执行：

```bash
if [ -n "${OPENCLAW_HOME_VOLUME:-}" ]; then
  docker run --rm \
    -v "${OPENCLAW_HOME_VOLUME}:/from:ro" \
    -v "$MIGRATION_ROOT/50-optional-home-volume:/to" \
    alpine sh -lc 'cd /from && tar cf - . | tar xf - -C /to'
fi
```

### 10. 生成校验文件

```bash
cd "$MIGRATION_ROOT"
find . -type f -print0 | sort -z | xargs -0 sha256sum > "99-checksums/SHA256SUMS.txt"
```

### 11. 启动旧环境

```bash
cd /你的/openclaw/docker/项目目录
docker compose start openclaw-cn-gateway
docker compose ps
```

### 12. 打包迁移包

```bash
cd "$(dirname "$MIGRATION_ROOT")"
tar -czf openclaw-migration-bundle.tar.gz "$(basename "$MIGRATION_ROOT")"
```

---

## C. 在 Windows 上准备目标环境

### 13. 安装 WSL2 与 Ubuntu

在 Windows PowerShell 管理员终端执行：

```powershell
wsl --install -d Ubuntu-24.04
```

如果系统要求重启，先重启，再继续。

### 14. 在 WSL2 启用 systemd

进入 Ubuntu 后执行：

```bash
sudo tee /etc/wsl.conf >/dev/null <<'EOF'
[boot]
systemd=true
EOF
```

回到 Windows PowerShell 执行：

```powershell
wsl --shutdown
```

重新打开 Ubuntu，验证：

```bash
systemctl --user status
```

### 15. 在 WSL2 安装 OpenClaw CLI

```bash
curl -fsSL https://clawd.org.cn/install.sh | bash -s -- --no-onboard
```

安装完成后，新开一个 WSL 终端，再检查：

```bash
openclaw-cn --version
```

### 16. 把迁移包复制到 Windows

把 `openclaw-migration-bundle.tar.gz` 放到 Windows 某个固定目录，例如：

- `C:\openclaw-migration\openclaw-migration-bundle.tar.gz`

---

## D. 在 WSL2 中恢复备份

### 17. 把 Windows 文件复制进 WSL2

在 WSL2 中执行：

```bash
mkdir -p "$HOME/migration"
cp /mnt/c/openclaw-migration/openclaw-migration-bundle.tar.gz "$HOME/migration/"
cd "$HOME/migration"
tar -xzf openclaw-migration-bundle.tar.gz
export MIGRATION_ROOT="$HOME/migration/openclaw-migration-bundle"
```

### 18. 先备份新环境自动生成的空目录

```bash
mv "$HOME/.openclaw" "$HOME/.openclaw.bootstrap.$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
mv "$HOME/clawd" "$HOME/clawd.bootstrap.$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
```

### 19. 恢复状态目录

```bash
mkdir -p "$HOME/.openclaw"
rsync -aH --delete "$MIGRATION_ROOT/10-openclaw-state/"/ "$HOME/.openclaw/"
```

### 20. 恢复工作区

如果你原来就是 `~/clawd`：

```bash
mkdir -p "$HOME/clawd"
rsync -aH --delete "$MIGRATION_ROOT/20-openclaw-workspace/"/ "$HOME/clawd/"
```

如果你原来实际使用的是 `~/.openclaw/workspace`，把目标路径改成那个目录。

### 21. 恢复额外挂载与可选 home 卷资料

你只恢复自己真正还要继续使用的目录。

推荐放在：

- `$HOME/migrated-mounts/`

例如：

```bash
mkdir -p "$HOME/migrated-mounts"
rsync -aH "$MIGRATION_ROOT/40-extra-mounts/"/ "$HOME/migrated-mounts/" 2>/dev/null || true
```

如果 `50-optional-home-volume/` 有你确认还需要的内容，再按需合并到 WSL2 用户目录，不要盲目整包覆盖。

### 22. 检查配置中的工作区路径

```bash
python3 - <<'PY'
from pathlib import Path
print(Path.home() / ".openclaw" / "openclaw.json")
PY
```

然后手工打开 `~/.openclaw/openclaw.json`，确认其中涉及 workspace 或外部路径的配置已改成 WSL2 可访问路径。

---

## E. 在 WSL2 中做迁移后修复

### 23. 执行体检

```bash
openclaw-cn doctor
```

### 24. 安装并启动网关服务

```bash
openclaw-cn onboard --install-daemon
```

如果你只想先验证配置，不想立即开放给外部，也可以先手动启动后再决定是否安装服务。

### 25. 验证状态

```bash
openclaw-cn status
```

如果需要打开控制台：

```bash
openclaw-cn dashboard
```

---

## F. 迁移完成后的验收清单

下面每一项都通过，再考虑关闭旧 Docker 环境：

- `~/.openclaw/openclaw.json` 已恢复
- `~/.openclaw/credentials/` 已恢复
- `~/.openclaw/agents/` 已恢复
- 工作区资料已恢复
- `openclaw-cn doctor` 无阻断性错误
- `openclaw-cn status` 正常
- 控制台能打开
- 历史会话仍可见
- 常用技能仍可执行
- 需要的定时任务仍存在
- 依赖外部路径的脚本已经改到 WSL2 可访问的新路径

---

## G. 迁移失败时的回滚方法

如果 WSL2 恢复不理想，先不要继续修文件，直接回滚：

- 保留 Windows 当前恢复现场，便于事后分析
- 继续让旧 Docker 环境提供服务
- 回到原始 `openclaw-migration-bundle/` 重新恢复

你的回滚条件很简单：

- 旧 Docker 容器还能正常启动
- 原挂载目录没被覆盖
- 迁移包还在

只要这三件事还在，这次迁移就始终可逆。
