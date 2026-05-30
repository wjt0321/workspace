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