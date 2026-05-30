# WebBridge 排障

> Kimi WebBridge 相关的稳定经验与避坑规则。

## 核心原则
- 网页操作默认优先 **Kimi WebBridge**
- 不要默认切 Playwright / `browser_use`
- 登录态页面、SPA、长表格、真实站点操作优先用 WebBridge

## 三条铁律
1. 不调 Playwright 作为默认方案
2. 不用 `taskkill /f /im chrome.exe` 暴力结束浏览器
3. 用完不随便关浏览器，优先保持常驻连接

## 常见问题
### `status` 指向旧 pid
- 优先检查：`~/.kimi-webbridge/daemon.pid`
- 若 pid 残留但实际未监听：删除该文件后重启 daemon

### 扩展未连接
- daemon 启动不等于扩展自动连上
- 需要用户侧浏览器扩展处于有效连接状态

### 浏览器选择
- Chrome 与 Tabbit 不要同时开给 WebBridge 抢
- 一次只服务一个浏览器环境

## 相关主题
- [[问题排查地图]]
- [[当前工作台]]
