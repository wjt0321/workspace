---
tags:
  - kimi
  - search
  - usage
---

# Kimi 搜索与用量规则

> [!info]
> 记录 Kimi 在搜索、用量查询、超时与调用方式上的稳定规则。

## 搜索原则
- 日常联网搜索优先 `tools/kimi-search.py`
- 不必默认走 Tavily
- Kimi 搜索超时不要传过短 timeout，默认脚本内置 180s 更稳

## 命令面变化
- 新版默认使用 `kimi -p` / `--prompt`
- `--print` 已不再作为默认写法
- 搜索脚本应优先适配 stdout 直出正文

## 登录与刷新
- token 过期时优先自动尝试：`echo /login | kimi`
- 若返回成功提示，则继续执行，不先打扰用户

## 用量规则
- 周配额按紧缺资源看待
- 用量以脚本实查为准：`tools/kimi-usage.py`
- 升级或迁移后，要验证用量脚本是否仍正常

## 相关主题
- [[Kimi Code 使用规则]]
- [[Kimi 升级与登录排障]]
- [[当前工作台]]

## 用量查询异常处理
- 执行 `tools/kimi-usage.py` 后，必须先自检输出是否正常。
- 若 token 刷新后出现 Windows/libuv 断言：`Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)`，不要立即判定脚本坏。
- 若同时出现 `Logged in to managed:kimi-code.`，通常说明登录态已刷新成功，但 Kimi CLI / Node / libuv 在 Windows 退出阶段触发竞态。
- 正确流程：先复跑一次 `python tools\\kimi-usage.py`；复跑正常，则按脚本原始格式转发输出；连续失败，才原样报告最终报错/失败原因。
- 用户要求原始输出时，必须保留进度条、缩进、分段布局与文案，不得总结、改写、表格化。



## 2026-06-06 补充：用量原始输出与刷新竞态
- 用户明确要求 Kimi 用量原始输出时，最终回复必须原样保留脚本输出的进度条、缩进、分段布局与文案；不得总结、改写、重排、表格化或提炼。
- `tools/kimi-usage.py` 若先提示 Token 过期并自动刷新登录态，随后出现 Windows/libuv 退出阶段断言或警告，但继续打印完整用量，可视为已知退出竞态；先自检输出，必要时复跑，不要静默结束。
- 若脚本连续失败，必须把最终原始报错或失败原因直接发给用户。