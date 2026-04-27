# Windows 迁移方案总览

本目录用于整理“当前 OpenClaw Docker 完整部署”迁移到 Windows 非 Docker 环境的两套独立方案。

如果你只想看所有脚本怎么串起来执行，优先看：

- `../scripts/README.md`
- `../scripts/windows-openclaw-to-copaw-runbook.md`

## 文档划分

- `openclaw-from-docker-to-windows.md`
  - 目标是把当前 Docker 里的 OpenClaw 完整迁移到 Windows 端继续运行 OpenClaw。
  - 主方案基于 **Windows + WSL2**，因为当前官方文档明确更推荐这一条路径。
- `openclaw-from-docker-to-windows-checklist.md`
  - 上面这份方案对应的 **可直接执行操作清单**。
- `copaw-from-openclaw-docker-to-windows.md`
  - 目标是把当前 Docker 中的 OpenClaw 数据做完整备份，再迁移到 Windows 端运行 CoPaw。
  - 这不是“原样无损导入”，而是“完整冷备 + 可转换数据导入 + 不可转换数据归档”方案。
- `copaw-from-openclaw-docker-to-windows-checklist.md`
  - 上面这份方案对应的 **可直接执行操作清单**。

## 适用前提

- 当前源端是 **Docker 完整部署的 OpenClaw**。
- Windows 目标端 **不再安装 Docker 版本**。
- 迁移重点是先在现有 Docker 环境做出一份完整、可回滚、可校验的备份，再把备份数据转换为 Windows 可用形态。

## 关键结论

- 对 OpenClaw 而言，最稳妥的 Windows 目标不是原生 Windows，而是 **WSL2 内运行 OpenClaw**。
- 对 CoPaw 而言，当前公开资料能确认它支持 Windows、本地工作目录默认在 `~/.copaw`，但没有证据表明它可以直接原样读取 OpenClaw 的内部状态目录，所以必须采用 **分层迁移**：
  - 可直接搬运的数据
  - 需要重建的数据
  - 只保留归档、不直接导入的数据

## 建议执行顺序

1. 先按两份方案中的“Docker 端完整备份”执行一次冷备。
2. 先落地 `openclaw-from-docker-to-windows.md`，确保你始终有一条可完整恢复的 OpenClaw Windows 路线。
3. 再按 `copaw-from-openclaw-docker-to-windows.md` 做第二目标迁移。
4. 在 CoPaw 迁移验证完成前，不删除 Docker 源环境。

## 一键备份脚本

- 通用脚本路径：`migration-plans/scripts/backup-openclaw-docker.sh`
- 默认在当前 Docker 项目目录读取 `.env` 与 `docker-compose.yml`
- 默认输出到 `<project-dir>/backups`

最常用执行方式：

```bash
bash migration-plans/scripts/backup-openclaw-docker.sh --project-dir /你的/openclaw/docker/项目目录
```

## 一键恢复脚本

- Windows 入口脚本：`migration-plans/scripts/restore-openclaw-windows.ps1`
- WSL 执行脚本：`migration-plans/scripts/restore-openclaw-wsl.sh`
- 推荐目标仍然是 **Windows + WSL2 + Ubuntu**

最常用执行方式：

```powershell
pwsh -File .\migration-plans\scripts\restore-openclaw-windows.ps1 -BundlePath C:\openclaw-migration\openclaw-migration-bundle-时间戳.tar.gz
```

## CoPaw 脚本

- 转换脚本：`migration-plans/scripts/convert-openclaw-backup-to-copaw.sh`
- Windows 导入脚本：`migration-plans/scripts/import-copaw-windows.ps1`
- Mac 导入脚本：`migration-plans/scripts/import-copaw-mac.sh`

最常用执行方式：

```bash
bash migration-plans/scripts/convert-openclaw-backup-to-copaw.sh --bundle /你的/openclaw/backups/openclaw-migration-bundle-时间戳.tar.gz
```

```powershell
pwsh -File .\migration-plans\scripts\import-copaw-windows.ps1 -BundlePath C:\copaw-migration\copaw-import-bundle-时间戳.tar.gz
```

## 建议备份产物结构

建议最终得到一个统一迁移包，例如：

```text
openclaw-migration-bundle/
├── 00-manifest/
├── 10-openclaw-state/
├── 20-openclaw-workspace/
├── 30-compose-and-env/
├── 40-extra-mounts/
├── 50-optional-home-volume/
└── 99-checksums/
```

这样做的意义是：

- 你可以先恢复到 Windows 版 OpenClaw。
- 也可以在同一份原始冷备基础上继续转换给 CoPaw。
- 后续即使改方案，也不需要重新从 Docker 容器里二次抽取数据。
