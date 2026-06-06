---
tags:
  - kimi
  - troubleshooting
  - upgrade
---

# Kimi 升级与登录排障

> [!info]
> 记录 Kimi Code 在 Windows 环境下升级、入口切换、登录刷新与常见故障的稳定经验。

## 当前稳定结论
- 默认 `kimi` 入口已切到 npm 全局安装版本
- 当前稳定版本基线：`0.6.0`
- 新版主要调用方式：`kimi -p "..."`
- 自动登录刷新优先：`echo /login | kimi`

## 升级规则
1. 优先使用：`npm install -g @moonshot-ai/kimi-code@latest`
2. 升级后必须验证：
   - `kimi --version`
   - `where kimi`
   - `echo /login | kimi`
   - 常用脚本是否正常
3. 不要只看“装上了”，要验证真实可用性

## 登录规则
- 新版不再依赖 `kimi login` 子命令
- 登录态异常时，优先自动尝试 `/login`
- 若自动刷新失败，再考虑人工接管

## 常见问题
### `--print` 失效
- 新版 `0.6.x` 默认应改用 `kimi -p`
- `--print` 报 unknown option 不代表整体不可用，只是命令面变了

### 明明装了新版，但 `kimi --version` 还是旧版
- 优先怀疑 PATH 命中顺序
- Windows 下 `.exe` 可能抢在 `.cmd` 前命中
- 需用 `where kimi` 实查入口

### token 过期
- 先自动尝试：`echo /login | kimi`
- 成功提示如 `Already logged in. Model configuration refreshed.`

## 相关主题
- [[Kimi Code 使用规则]]
- [[问题排查地图]]
- [[当前工作台]]

## 2026-06-06 补充：npm 全局升级验证
- 已验证 Kimi Code 可通过 `npm install -g @moonshot-ai/kimi-code@latest` 从 `0.10.1` 升级到 `0.11.0`。
- 升级前先定位入口：`where kimi`；再确认包名：`npm list -g --depth=0 | findstr /i kimi`。
- 升级后用双重验证：`kimi --version` 与 `npm list -g --depth=0 | findstr /i kimi`。
- 若用户追问更新内容，优先查官方 changelog/README；若没有发布说明，可用 `npm pack` 或 `npm diff` 对比相邻版本，但结论应标明“基于包差异反推”。