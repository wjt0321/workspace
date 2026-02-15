---
title: Tailscale快速配置指南
date: 2026-02-10
tags:
  - Tailscale
  - 快速入门
  - 零配置
---

# Tailscale快速配置指南

> [!tip] 本指南适合
> - 不想折腾的小白用户
> - 没有公网IP的用户
> - 追求简单快速的用户

---

## 3分钟快速配置

### 1. 注册账号

1. 访问 https://login.tailscale.com/
2. 使用Google/Microsoft/GitHub账号登录
3. 记录你的Tailscale域名（如 `xxx.github.beta.tailscale.net`）

### 2. 飞牛NAS安装

```bash
# SSH登录NAS后执行

# 运行Tailscale容器
docker run -d \
  --name=tailscale \
  --restart=always \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_MODULE \
  -v /var/lib/tailscale:/var/lib/tailscale \
  -v /dev/net/tun:/dev/net/tun \
  tailscale/tailscale:latest

# 登录（会显示链接，复制到浏览器授权）
docker exec -it tailscale tailscale up
```

### 3. 其他设备安装

| 平台 | 操作 |
|------|------|
| 手机 | App Store/Google Play搜索"Tailscale"安装 |
| 电脑 | 访问 https://tailscale.com/download 下载安装 |

### 4. 访问NAS

1. 访问 https://login.tailscale.com/admin/machines
2. 查看NAS的Tailscale IP（如 `100.x.x.x`）
3. 浏览器访问 `http://100.x.x.x:8000`

---

## 高级配置

### 访问整个内网

如果需要访问NAS所在的所有内网设备：

```bash
# 在NAS上执行
docker exec -it tailscale tailscale up \
  --advertise-routes=192.168.31.0/24 \
  --accept-dns=false

# 然后在Tailscale控制台启用路由
# https://login.tailscale.com/admin/machines
```

### 常用命令

```bash
# 查看状态
docker exec -it tailscale tailscale status

# 查看IP
docker exec -it tailscale tailscale ip

# 退出登录
docker exec -it tailscale tailscale logout

# 重新登录
docker exec -it tailscale tailscale up

# 查看日志
docker logs -f tailscale
```

---

## 故障排查

| 问题 | 解决方案 |
|------|----------|
| 设备显示离线 | 检查NAS网络连接，重启容器 |
| 无法访问NAS | 检查NAS防火墙是否阻挡100.x.x.x网段 |
| 速度慢 | Tailscale会自动选择最佳路径，尝试重启服务 |
| 连接不稳定 | 检查是否有其他VPN冲突 |

---

## 免费版限制

- 最多20台设备
- 1个用户
- 社区支持

对于个人NAS使用完全足够。

---

## 下一步

详细配置请参考：[飞牛NAS安全访问完整方案](飞牛NAS安全访问完整方案.md)
