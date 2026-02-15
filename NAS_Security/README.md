# NAS安全访问方案

本文件夹包含飞牛NAS安全访问的完整解决方案，帮助你在飞牛fnOS安全漏洞事件后，建立安全的远程访问通道。

## 📁 文件说明

| 文件 | 说明 |
|------|------|
| [飞牛NAS安全访问完整方案.md](飞牛NAS安全访问完整方案.md) | 📖 主文档，包含所有方案的详细说明 |
| [WireGuard快速入门.md](WireGuard快速入门.md) | ⚡ WireGuard 5分钟快速部署指南 |
| [Tailscale快速配置.md](Tailscale快速配置.md) | 🚀 Tailscale 3分钟零配置指南 |
| [安全检查清单.md](安全检查清单.md) | ✅ 已暴露公网的NAS紧急检查清单 |
| [docker-compose.yml](docker-compose.yml) | 🐳 WireGuard Docker配置文件模板 |
| [images/](images/) | 📷 相关图片资源 |

## 🎯 快速选择

### 我是小白用户，想最简单方案
→ 查看 [Tailscale快速配置.md](Tailscale快速配置.md)

### 我有一定技术基础，追求最高安全性
→ 查看 [WireGuard快速入门.md](WireGuard快速入门.md)

### 我的NAS已经暴露在公网，可能中招了
→ 立即查看 [安全检查清单.md](安全检查清单.md)

### 我想了解所有方案的详细对比
→ 查看 [飞牛NAS安全访问完整方案.md](飞牛NAS安全访问完整方案.md)

## 🚨 紧急提醒

飞牛fnOS近期遭遇严重安全漏洞攻击，如果你：
- 开启了公网访问
- 使用了端口转发
- 启用了中继服务

**请立即**：
1. 切断公网访问
2. 运行官方查杀脚本
3. 按照本方案部署VPN安全访问

## 📞 获取帮助

- 飞牛官方论坛：https://bbs.fnnas.com/
- WireGuard文档：https://www.wireguard.com/
- Tailscale文档：https://tailscale.com/kb/

---

*本文档最后更新：2026-02-10*
