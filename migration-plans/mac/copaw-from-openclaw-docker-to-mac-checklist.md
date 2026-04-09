# CoPaw 从 OpenClaw Docker 备份迁移到 Mac 的可直接执行操作清单

## 适用范围

- 源端：Linux 上的 Docker 版 OpenClaw
- 目标端：Mac 非 Docker 版 CoPaw
- 迁移方式：**完整冷备 + 中间转换包 + Mac 端重建**

## 迁移原则

- 不直接把 `~/.openclaw` 原样改名成 `~/.copaw`
- 先完整冷备，再抽取 CoPaw 真正可用的数据
- 会话、凭据、队列数据库默认只归档，不直接导入

---

## A. 在 Docker 源端制作原始冷备

### 1. 进入 Docker 项目目录并加载变量

```bash
cd /你的/openclaw/docker/项目目录
set -a
. ./.env
set +a
```

### 2. 创建原始冷备目录

```bash
export MIGRATION_ROOT="$HOME/openclaw-migration-bundle"
mkdir -p "$MIGRATION_ROOT"/{00-manifest,10-openclaw-state,20-openclaw-workspace,30-compose-and-env,40-extra-mounts,50-optional-home-volume,99-checksums}
```

### 3. 停止网关

```bash
docker compose stop openclaw-cn-gateway
```

### 4. 复制状态目录和工作区

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

### 6. 备份命名卷

```bash
if [ -n "${OPENCLAW_HOME_VOLUME:-}" ]; then
  docker run --rm \
    -v "${OPENCLAW_HOME_VOLUME}:/from:ro" \
    -v "$MIGRATION_ROOT/50-optional-home-volume:/to" \
    alpine sh -lc 'cd /from && tar cf - . | tar xf - -C /to'
fi
```

### 7. 启动旧环境并打包

```bash
docker compose start openclaw-cn-gateway
docker compose ps

cd "$(dirname "$MIGRATION_ROOT")"
tar -czf openclaw-migration-bundle.tar.gz "$(basename "$MIGRATION_ROOT")"
```

---

## B. 生成 CoPaw 中间转换包

### 8. 解压原始冷备

```bash
mkdir -p "$HOME/copaw-convert"
cp "$HOME/openclaw-migration-bundle.tar.gz" "$HOME/copaw-convert/"
cd "$HOME/copaw-convert"
tar -xzf openclaw-migration-bundle.tar.gz
export MIGRATION_ROOT="$HOME/copaw-convert/openclaw-migration-bundle"
```

### 9. 创建 CoPaw 中间包目录

```bash
export COPAW_BUNDLE="$HOME/copaw-import-bundle"
mkdir -p "$COPAW_BUNDLE"/{00-manifest,10-knowledge,20-prompts-and-memory,30-skills-reference,40-sessions-archive,50-channels-manual,60-jobs-manual,99-import-notes}
```

### 10. 提取可直接迁移的知识资料

```bash
rsync -aH "$MIGRATION_ROOT/20-openclaw-workspace/"/ "$COPAW_BUNDLE/10-knowledge/"
```

然后手工删除这几类内容：

- 明显只服务于 OpenClaw 的内部状态文件
- 只在 Linux Docker 中有效的路径引用
- 你已确认不再继续使用的临时资料

### 11. 单独整理提示词和记忆

把最重要的长期资料复制到：

- `20-prompts-and-memory/`

优先整理：

- `AGENTS.md`
- `SOUL.md`
- `USER.md`
- `IDENTITY.md`
- `MEMORY.md`
- `memory/`

### 12. 提取技能源码参考

```bash
rsync -aH "$MIGRATION_ROOT/10-openclaw-state/skills/"/ "$COPAW_BUNDLE/30-skills-reference/" 2>/dev/null || true
rsync -aH "$MIGRATION_ROOT/10-openclaw-state/extensions/"/ "$COPAW_BUNDLE/30-skills-reference/extensions-reference/" 2>/dev/null || true
```

### 13. 归档历史会话

```bash
rsync -aH "$MIGRATION_ROOT/10-openclaw-state/agents/"/ "$COPAW_BUNDLE/40-sessions-archive/agents/" 2>/dev/null || true
```

注意：

- 这一步只是保留历史，不表示 CoPaw 能直接读取这些会话

### 14. 整理手工重建清单

你需要额外输出两份人工清单：

- `50-channels-manual/README.md`
- `60-jobs-manual/README.md`

内容至少包括：

- 原来用了哪些频道
- 每个频道需要哪些接入凭据
- 需要恢复的定时任务
- 哪些模型必须继续使用
- 哪些脚本依赖额外目录

### 15. 打包中间转换包

```bash
cd "$(dirname "$COPAW_BUNDLE")"
tar -czf copaw-import-bundle.tar.gz "$(basename "$COPAW_BUNDLE")"
```

---

## C. 在 Mac 上安装 CoPaw

## 方案一：桌面应用

适合你想最快把 CoPaw 跑起来。

执行方式：

1. 下载 CoPaw 的 macOS 安装包
2. 解压得到 `CoPaw.app`
3. 首次右键选择“打开”
4. 等待浏览器自动打开控制台

适用前提：

- macOS 14+
- 推荐 Apple Silicon

## 方案二：脚本安装

适合你想更可控地管理工作目录：

```bash
curl -fsSL https://copaw.agentscope.io/install.sh | bash
```

完成后打开新终端，验证：

```bash
copaw --version
```

## 方案三：pip 安装

适合你习惯自己管理 Python 环境：

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install copaw
copaw --version
```

---

## D. 在 Mac 上初始化 CoPaw

### 16. 生成默认工作目录

如果你使用 CLI，先执行：

```bash
copaw init --defaults
```

默认工作目录通常是：

- `~/.copaw`

这一步至少会生成：

- `config.json`
- `HEARTBEAT.md`

### 17. 启动一次 CoPaw

```bash
copaw app
```

确认控制台可打开后，再停止 CoPaw。

---

## E. 把 CoPaw 中间转换包导入 Mac

### 18. 把中间包复制到 Mac

建议放到：

- `~/Downloads/copaw-import-bundle.tar.gz`

### 19. 解压中间包

```bash
mkdir -p "$HOME/copaw-migration"
cp "$HOME/Downloads/copaw-import-bundle.tar.gz" "$HOME/copaw-migration/"
cd "$HOME/copaw-migration"
tar -xzf copaw-import-bundle.tar.gz
export COPAW_BUNDLE="$HOME/copaw-migration/copaw-import-bundle"
```

### 20. 导入知识资料

把下面这些目录的内容复制到 `~/.copaw` 中你准备给 CoPaw 使用的位置：

- `10-knowledge/`
- `20-prompts-and-memory/`
- `30-skills-reference/`

推荐思路：

- `10-knowledge/` 作为资料区
- `20-prompts-and-memory/` 作为长期设定区
- `30-skills-reference/` 作为待改写技能参考区

### 21. 不直接导入的内容

下面这些只归档保留，不直接塞进 CoPaw 运行目录：

- `40-sessions-archive/`
- OpenClaw 的 `credentials/`
- OpenClaw 的 `command-queue.db`
- Docker 覆盖文件

---

## F. 在 CoPaw 中手工重建能力

### 22. 配置模型

启动 CoPaw 后，在控制台中重新完成：

- API Key 配置
- 本地模型配置
- 默认 LLM 选择

### 23. 重建频道

根据 `50-channels-manual/` 中的清单重新接入：

- 飞书
- 钉钉
- Discord
- Telegram
- 其他你原先使用的渠道

### 24. 重建定时任务

根据 `60-jobs-manual/` 中的清单重新创建：

- 定时发送
- 定时提问
- 自检/摘要

### 25. 改写技能

将 `30-skills-reference/` 中真正还需要的能力，改写成 CoPaw 的 Skills。

不要把 OpenClaw 的插件或状态目录直接当成 CoPaw 可运行组件。

---

## G. 验收清单

下面各项通过后，才算 CoPaw 的 Mac 迁移达标：

- CoPaw 能正常启动
- 控制台能打开
- 模型已配置好
- 关键知识资料已导入
- 长期提示词已导入
- 至少一个关键频道已恢复
- 至少一个关键定时任务已恢复
- 至少一个关键技能已改写或确认有替代方案
- 原始 OpenClaw 冷备与 CoPaw 中间包都仍然保留

---

## H. 回滚策略

如果 Mac 端 CoPaw 恢复不理想：

- 不改动原始 OpenClaw 冷备
- 不销毁 CoPaw 中间转换包
- 继续让旧 Docker OpenClaw 运行
- 后续重新迭代中间转换包

这样你可以反复调整 CoPaw 导入方式，而不用再回 Docker 里重复抽原始数据。
