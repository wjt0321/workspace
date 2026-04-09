# CoPaw 从 OpenClaw Docker 备份迁移到 Windows 的可直接执行操作清单

## 适用范围

- 源端：Linux 上的 Docker 版 OpenClaw
- 目标端：Windows 非 Docker 版 CoPaw
- 迁移方式：**完整冷备 + 中间转换包 + Windows CoPaw 重建**

## 这份清单解决什么

它不是把 OpenClaw 内部状态“原样导入”到 CoPaw。

它解决的是：

- 先把 Docker 版 OpenClaw 完整打包
- 再从中提取 CoPaw 真正能复用的资料
- 最后在 Windows 上重建一个可用的 CoPaw

---

## A. 在 Docker 源端制作原始冷备

### 1. 确认源端目录

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

### 2. 创建原始冷备目录

```bash
export MIGRATION_ROOT="$HOME/openclaw-migration-bundle"
mkdir -p "$MIGRATION_ROOT"/{00-manifest,10-openclaw-state,20-openclaw-workspace,30-compose-and-env,40-extra-mounts,50-optional-home-volume,99-checksums}
```

### 3. 停止 OpenClaw 网关

```bash
docker compose stop openclaw-cn-gateway
```

### 4. 备份状态目录和工作区

```bash
rsync -aH --delete "$OPENCLAW_CONFIG_DIR"/ "$MIGRATION_ROOT/10-openclaw-state/"
rsync -aH --delete "$OPENCLAW_WORKSPACE_DIR"/ "$MIGRATION_ROOT/20-openclaw-workspace/"
```

### 5. 备份 Compose 文件

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

### 7. 重新启动旧环境

```bash
docker compose start openclaw-cn-gateway
docker compose ps
```

### 8. 打包冷备

```bash
cd "$(dirname "$MIGRATION_ROOT")"
tar -czf openclaw-migration-bundle.tar.gz "$(basename "$MIGRATION_ROOT")"
```

---

## B. 从原始冷备生成 CoPaw 中间转换包

### 9. 解开原始冷备

```bash
mkdir -p "$HOME/copaw-convert"
cp "$HOME/openclaw-migration-bundle.tar.gz" "$HOME/copaw-convert/"
cd "$HOME/copaw-convert"
tar -xzf openclaw-migration-bundle.tar.gz
export MIGRATION_ROOT="$HOME/copaw-convert/openclaw-migration-bundle"
```

### 10. 创建 CoPaw 中间转换包目录

```bash
export COPAW_BUNDLE="$HOME/copaw-import-bundle"
mkdir -p "$COPAW_BUNDLE"/{00-manifest,10-knowledge,20-prompts-and-memory,30-skills-reference,40-sessions-archive,50-channels-manual,60-jobs-manual,99-import-notes}
```

### 11. 提取知识资料

把你确认要继续给 CoPaw 使用的资料复制进去：

```bash
rsync -aH "$MIGRATION_ROOT/20-openclaw-workspace/"/ "$COPAW_BUNDLE/10-knowledge/"
```

然后手工删除这些不适合直接导入 CoPaw 的内容：

- 明显只属于 OpenClaw 内部运行态的目录
- 旧环境专用脚本
- 仅容器内有效的路径引用

### 12. 单独整理提示词和长期记忆

从 `10-knowledge/` 中提取你真正要长期保留的内容，复制到：

- `20-prompts-and-memory/`

建议优先整理：

- `AGENTS.md`
- `SOUL.md`
- `USER.md`
- `IDENTITY.md`
- `MEMORY.md`
- `memory/`

### 13. 提取技能参考

```bash
rsync -aH "$MIGRATION_ROOT/10-openclaw-state/skills/"/ "$COPAW_BUNDLE/30-skills-reference/" 2>/dev/null || true
rsync -aH "$MIGRATION_ROOT/10-openclaw-state/extensions/"/ "$COPAW_BUNDLE/30-skills-reference/extensions-reference/" 2>/dev/null || true
```

这里的目标不是原样导入，而是：

- 保留源码
- 后续人工改写成 CoPaw 的 Skills

### 14. 归档历史会话

```bash
rsync -aH "$MIGRATION_ROOT/10-openclaw-state/agents/"/ "$COPAW_BUNDLE/40-sessions-archive/agents/" 2>/dev/null || true
```

这一步只为归档和查阅，不代表 CoPaw 能直接导入。

### 15. 整理频道与任务清单

把下面几类信息从 `openclaw.json`、工作区文档、你的运维记录中手工整理出来：

- 当前使用了哪些频道
- 每个频道的接入方式
- 定时任务有哪些
- 哪些模型必须继续使用
- 哪些脚本依赖外部目录

输出到：

- `50-channels-manual/README.md`
- `60-jobs-manual/README.md`

### 16. 打包 CoPaw 中间转换包

```bash
cd "$(dirname "$COPAW_BUNDLE")"
tar -czf copaw-import-bundle.tar.gz "$(basename "$COPAW_BUNDLE")"
```

---

## C. 在 Windows 上安装 CoPaw

## 方案一：桌面应用

适合你想尽快把界面跑起来。

执行顺序：

1. 下载 macOS 或 Windows 对应发行包中的 Windows 版本
2. 安装并启动
3. 等待浏览器自动打开控制台

## 方案二：脚本安装

适合你希望更可控、更方便后续备份。

在 Windows PowerShell 执行：

```powershell
irm https://copaw.agentscope.io/install.ps1 | iex
```

安装完成后重新打开终端，检查：

```powershell
copaw --version
```

## 方案三：pip 安装

如果你愿意自己管理 Python 环境，可以执行：

```powershell
py -3.11 -m venv .venv
.venv\Scripts\Activate.ps1
pip install copaw
copaw --version
```

---

## D. 在 Windows 上初始化 CoPaw

### 17. 先创建一套空白工作目录

无论你用桌面应用还是 CLI，目标都是先让 CoPaw 生成默认工作目录。

如果你使用 CLI：

```powershell
copaw init --defaults
```

这一步会生成默认工作目录，通常是：

- `%USERPROFILE%\.copaw`

并初始化至少这些文件：

- `config.json`
- `HEARTBEAT.md`

### 18. 启动一次 CoPaw

```powershell
copaw app
```

看到控制台可打开后，再停止 CoPaw。

---

## E. 导入 CoPaw 中间转换包

### 19. 把中间转换包放到 Windows

建议放到：

- `C:\copaw-migration\copaw-import-bundle.tar.gz`

### 20. 解压中间转换包

如果你有 tar：

```powershell
mkdir C:\copaw-migration -Force | Out-Null
cd C:\copaw-migration
tar -xzf .\copaw-import-bundle.tar.gz
```

### 21. 导入知识与提示词

把这些目录中的内容复制进 `%USERPROFILE%\.copaw` 下你准备给 CoPaw 使用的位置：

- `10-knowledge`
- `20-prompts-and-memory`
- `30-skills-reference`

推荐做法：

- `10-knowledge` 作为知识资料根目录
- `20-prompts-and-memory` 作为长期设定与提示词归档目录
- `30-skills-reference` 作为后续改写 Skills 的源码参考区

### 22. 不直接导入的内容

下面这些内容保留归档，不直接复制到 CoPaw 运行目录：

- `40-sessions-archive`
- OpenClaw 的 `credentials/`
- OpenClaw 的 `command-queue.db`
- 任何 OpenClaw 专属内部状态文件

---

## F. 在 CoPaw 中手工重建必须能力

### 23. 配置模型

启动 CoPaw 后，在控制台中：

- 打开“设置 → 模型”
- 重新填写 API Key
- 或重新下载本地模型

### 24. 重建频道

根据 `50-channels-manual/` 中的清单，在 CoPaw 控制台重新接入：

- 钉钉
- 飞书
- Discord
- Telegram
- 其他你原来启用的频道

### 25. 重建定时任务

根据 `60-jobs-manual/` 中的清单，在 CoPaw 控制台或 CLI 中重建：

- 定时发送
- 定时提问
- 自检与摘要

### 26. 改写技能

把 `30-skills-reference/` 中真正需要延续的能力，按 CoPaw 的 Skills 机制重新组织。

不要把 OpenClaw 插件或状态目录直接视为 CoPaw 可运行插件。

---

## G. 验收清单

下面每项完成后，才算 CoPaw 迁移通过：

- CoPaw 能正常启动
- 控制台能打开
- 模型已配置完成
- 关键知识文件已导入
- 长期提示词与记忆资料已导入
- 至少一个关键频道已重新接入
- 至少一个关键定时任务已重建
- 至少一个关键技能已改写或验证可替代
- 原始 OpenClaw 冷备仍完整保留

---

## H. 失败回滚策略

如果 CoPaw 迁移不理想，不要硬改 OpenClaw 原始数据：

- 保留 `openclaw-migration-bundle/`
- 保留 `copaw-import-bundle/`
- 继续使用原 Docker OpenClaw
- 之后再做第二轮转换

这条路线的关键不是“一次就全转完”，而是：

- 原始冷备不丢
- 中间转换包可反复迭代
- 旧环境始终可回退
