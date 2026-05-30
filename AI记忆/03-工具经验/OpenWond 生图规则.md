---
tags:
  - openwond
  - image-generation
  - workflow
---

# OpenWond 生图规则

> [!info]
> 记录 OpenWond / GPT Image 2 在当前工作流中的稳定使用规则与排障顺序。

## 当前策略
- 仅使用 **GPT Image 2**
- 不再使用 Nano Banana 系列
- 外层脚本 timeout 不直接等于失败

## 正确站点
- 正确入口：`https://openwond.com/`
- 真实后台 iframe 源：`https://api.binyweb.com/`
- 不要再把 `https://image.openwond.com` 当成唯一正确站点

## 查询与排障顺序
1. 优先确认站点是否正确
2. 带 cookie 的网页操作优先用 **Kimi WebBridge**
3. 脚本超时后，先查调用日志
4. 若日志显示已成功，先下载首图
5. 再决定是否继续迭代

## 使用规则
- 登录态网页操作优先 WebBridge，不默认用隔离浏览器
- 用户说“发给我看看”时，先交付图片，再评价
- 角色氛围图与产品能力图是两种不同目标，先判断再改
- 产品拟人化时，能力表达要压缩成少量明确 UI 语言

## 常见误区
### 把脚本 timeout 当作任务失败
- 这是错误判断
- 正确动作是：先看官网/后台调用日志

### 查错站点
- 曾误用 `image.openwond.com`
- 后续统一以 `openwond.com` 与其真实后台链路为准

## 相关主题
- [[WebBridge 排障]]
- [[问题排查地图]]
- [[当前工作台]]