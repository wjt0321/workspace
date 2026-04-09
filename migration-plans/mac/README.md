# Mac 迁移方案总览

本目录用于整理“当前 OpenClaw Docker 完整部署”迁移到 Mac 非 Docker 环境的两套独立方案。

如果你只想看所有脚本怎么串起来执行，优先看：

- `../scripts/README.md`

## 文档划分

- `openclaw-from-docker-to-mac-checklist.md`
  - 目标是把当前 Docker 里的 OpenClaw 完整迁移到 Mac 端继续运行 OpenClaw。
  - 推荐目标形态是 **Mac 本地安装 OpenClaw CLI + Mac App**。
- `copaw-from-openclaw-docker-to-mac-checklist.md`
  - 目标是把当前 Docker 中的 OpenClaw 数据做完整备份，再迁移到 Mac 端运行 CoPaw。
  - 主体方法仍然是 **完整冷备 + 中间转换包 + Mac 端重建**。

## 适用前提

- 当前源端是 **Docker 完整部署的 OpenClaw**
- 目标端 **不继续使用 Docker 运行**
- 重点仍然是先把现有 Docker 数据做成一份完整冷备，再恢复或转换到 Mac

## 关键结论

- 对 OpenClaw 而言，Mac 端不是把 Docker 容器直接复制过去，而是恢复：
  - `~/.openclaw`
  - 工作区
  - 然后让 Mac 上的本地 CLI 与 App 接管运行
- 对 CoPaw 而言，Mac 路径与 Windows 路径不同，但迁移逻辑与 Windows 一样：
  - 可直接迁移的资料
  - 需要人工重建的配置
  - 只归档不导入的内部状态

## 建议执行顺序

1. 先按任一清单中的“Docker 端完整冷备”做原始备份。
2. 如果你希望业务先稳定落地，优先执行 OpenClaw 的 Mac 清单。
3. 如果你还想转 CoPaw，再基于同一份冷备生成 CoPaw 的中间转换包。
4. 在 Mac 新环境完全验收前，不下线旧 Docker 环境。

## 一键备份脚本

- 通用脚本路径：`migration-plans/scripts/backup-openclaw-docker.sh`
- 默认在当前 Docker 项目目录读取 `.env` 与 `docker-compose.yml`
- 默认输出到 `<project-dir>/backups`

最常用执行方式：

```bash
bash migration-plans/scripts/backup-openclaw-docker.sh --project-dir /你的/openclaw/docker/项目目录
```

## 一键恢复脚本

- Mac 版 OpenClaw 恢复脚本：`migration-plans/scripts/restore-openclaw-mac.sh`

最常用执行方式：

```bash
bash migration-plans/scripts/restore-openclaw-mac.sh --bundle ~/Downloads/openclaw-migration-bundle-时间戳.tar.gz
```

## CoPaw 脚本

- 转换脚本：`migration-plans/scripts/convert-openclaw-backup-to-copaw.sh`
- Mac 导入脚本：`migration-plans/scripts/import-copaw-mac.sh`

最常用执行方式：

```bash
bash migration-plans/scripts/convert-openclaw-backup-to-copaw.sh --bundle ~/Downloads/openclaw-migration-bundle-时间戳.tar.gz
bash migration-plans/scripts/import-copaw-mac.sh --bundle ~/Downloads/copaw-import-bundle-时间戳.tar.gz
```
