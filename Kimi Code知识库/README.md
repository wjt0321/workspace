# Kimi Code 知识库索引

> 位置：`D:\Qwenclaw\s-black\kimi-project\`
> 目的：沉淀 Kimi Code 官方文档、更新日志、命令参考、插件与迁移审计，作为后续 Kimi Code 相关工作的本地知识库入口。
> 最近维护：2026-06-05

## 文件清单

- `README.md`：本索引文件
- `updates/2026-06-05-kimi-code-0.9.0-update-audit.md`：本次更新、官方文档梳理、旧版数据审计
- `kimi-code-getting-started.md`：入门与安装/升级
- `kimi-code-reference.md`：CLI 能力与结构化笔记
- `kimi-code-plugins.md`：插件系统
- `kimi-datasource-plugin.md`：数据源插件
- `kimi-slash-commands.md`：斜杠命令整理（旧稿，待按新官方文档继续刷新）

## 推荐读取顺序

1. 先看 `updates/2026-06-05-kimi-code-0.9.0-update-audit.md`
2. 再按主题看：
   - 安装/升级 → `kimi-code-getting-started.md`
   - 命令与行为 → `kimi-code-reference.md`
   - 斜杠命令 → `kimi-slash-commands.md`
   - 插件 → `kimi-code-plugins.md` / `kimi-datasource-plugin.md`

## 维护约定

- 新版本更新优先新增 `updates/YYYY-MM-DD-*.md`
- 如官方命令/斜杠命令发生明显变化，再回写刷新专题文档
- 若发现旧版 `kimi-cli` 遗留数据仍有价值，优先做“是否保留/是否归档”的审计说明，不直接删除
