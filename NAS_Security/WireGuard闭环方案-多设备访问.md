---
title: WireGuard闭环方案-多设备安全访问
date: 2026-02-10
tags:
  - WireGuard
  - 闭环方案
  - 多设备访问
  - 端口控制
  - 安全策略
aliases:
  - WireGuard多设备方案
  - 家庭NAS安全访问
---

# WireGuard闭环方案-多设备安全访问

> [!tip] 方案概述
> 本方案实现公司电脑、手机、家庭电脑通过WireGuard VPN安全访问家中NAS，并精确控制开放端口，实现最小权限原则。

---

## 网络拓扑

```
┌─────────────────────────────────────────────────────────────────┐
│                         互联网                                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    云服务器 (WireGuard服务端)                    │
│                    公网IP: xxx.xxx.xxx.xxx                      │
│                    VPN网段: 10.6.2.0/24                         │
│                    监听端口: UDP 51820                          │
└─────────────────────────────────────────────────────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   公司电脑       │  │     手机        │  │   家里电脑       │
│ 10.6.2.2/32     │  │  10.6.2.3/32    │  │  10.6.2.4/32    │
│ (仅开放工作端口) │  │ (仅开放必要端口)│  │ (完全访问)      │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      家庭路由器                                   │
│                   内网网段: 192.168.31.0/24                     │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    飞牛NAS       │  │   智能家居      │  │   其他设备      │
│  192.168.31.10  │  │   192.168.31.x  │  │   192.168.31.x  │
│  :8000 - 管理    │  │                 │  │                 │
│  :5000 - 文件    │  │                 │  │                 │
│  :8096 - Emby   │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 服务端配置 (wg-easy)

### 1. 基础配置

```yaml
version: "3.8"
services:
  wg-easy:
    image: ghcr.io/wg-easy/wg-easy:latest
    container_name: wg-easy
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    sysctls:
      - net.ipv4.ip_forward=1
      - net.ipv4.conf.all.src_valid_mark=1
    volumes:
      - ./data:/etc/wireguard
    environment:
      - PASSWORD_HASH=$$2a$$12$$你的密码哈希
      - PORT=51821
      - WG_PORT=51820
      - WG_HOST=你的服务器公网IP
      - WG_DEFAULT_ADDRESS=10.6.2.x
      # 允许访问的网段：内网 + VPN网段
      - WG_ALLOWED_IPS=192.168.31.0/24,10.6.2.0/24
      - WG_DEFAULT_DNS=223.6.6.6,119.29.29.29
      - WG_PERSISTENT_KEEPALIVE=25
      - TZ=Asia/Shanghai
      - LANG=zh
    ports:
      - "51820:51820/udp"
      - "51821:51821/tcp"
    restart: unless-stopped
```

### 2. 创建不同权限的客户端

在 wg-easy Web 界面中创建以下客户端：

| 客户端名称 | VPN IP | 权限级别 | 用途 |
|-----------|--------|---------|------|
| company-pc | 10.6.2.2 | 受限 | 公司电脑，仅工作相关端口 |
| mobile-phone | 10.6.2.3 | 中等 | 手机，必要服务端口 |
| home-pc | 10.6.2.4 | 完全 | 家里电脑，完全访问 |
| tablet | 10.6.2.5 | 中等 | 平板，媒体访问 |

---

## 精细化端口控制方案

### 方案A：WireGuard服务端ACL（推荐）

在 wg-easy 中，通过修改客户端的 `AllowedIPs` 来实现访问控制。

#### 公司电脑配置（仅工作端口）

```ini
[Interface]
PrivateKey = 公司电脑私钥
Address = 10.6.2.2/32
DNS = 223.6.6.6

[Peer]
PublicKey = 服务器公钥
PresharedKey = 预共享密钥
# 只允许访问特定端口：NAS管理(8000)、文件(5000)
AllowedIPs = 192.168.31.10/32, 10.6.2.0/24
Endpoint = 你的服务器IP:51820
PersistentKeepalive = 25
```

然后在 NAS 上配置防火墙：

```bash
# 只允许公司电脑VPN IP访问工作端口
iptables -A INPUT -s 10.6.2.2 -p tcp --dport 8000 -j ACCEPT
iptables -A INPUT -s 10.6.2.2 -p tcp --dport 5000 -j ACCEPT
iptables -A INPUT -s 10.6.2.2 -j DROP
```

#### 手机配置（必要服务）

```ini
[Interface]
PrivateKey = 手机私钥
Address = 10.6.2.3/32
DNS = 223.6.6.6

[Peer]
PublicKey = 服务器公钥
PresharedKey = 预共享密钥
AllowedIPs = 192.168.31.0/24, 10.6.2.0/24
Endpoint = 你的服务器IP:51820
PersistentKeepalive = 25
```

NAS防火墙规则：

```bash
# 手机可以访问：管理、文件、Emby媒体
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 8000 -j ACCEPT
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 5000 -j ACCEPT
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 8096 -j ACCEPT
iptables -A INPUT -s 10.6.2.3 -j DROP
```

#### 家里电脑配置（完全访问）

```ini
[Interface]
PrivateKey = 家里电脑私钥
Address = 10.6.2.4/32
DNS = 223.6.6.6

[Peer]
PublicKey = 服务器公钥
PresharedKey = 预共享密钥
AllowedIPs = 192.168.31.0/24, 10.6.2.0/24
Endpoint = 你的服务器IP:51820
PersistentKeepalive = 25
```

NAS防火墙规则：

```bash
# 家里电脑完全访问
iptables -A INPUT -s 10.6.2.4 -j ACCEPT
```

---

### 方案B：NAS端防火墙控制（更精细）

在飞牛NAS上配置完整的iptables规则：

```bash
#!/bin/bash
# NAS防火墙配置脚本
# 保存为 /etc/nas-firewall.sh

# 清空现有规则
iptables -F
iptables -X

# 默认策略
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 允许本地回环
iptables -A INPUT -i lo -j ACCEPT

# 允许已建立的连接
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许内网访问（192.168.31.0/24）
iptables -A INPUT -s 192.168.31.0/24 -j ACCEPT

# ========== VPN设备访问控制 ==========

# 公司电脑 (10.6.2.2) - 仅工作端口
iptables -A INPUT -s 10.6.2.2 -p tcp --dport 8000 -j ACCEPT  # NAS管理
iptables -A INPUT -s 10.6.2.2 -p tcp --dport 5000 -j ACCEPT  # 文件管理
iptables -A INPUT -s 10.6.2.2 -p tcp --dport 22 -j ACCEPT    # SSH
iptables -A INPUT -s 10.6.2.2 -j DROP

# 手机 (10.6.2.3) - 必要服务
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 8000 -j ACCEPT  # NAS管理
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 5000 -j ACCEPT  # 文件管理
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 8096 -j ACCEPT  # Emby
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 8920 -j ACCEPT  # Emby HTTPS
iptables -A INPUT -s 10.6.2.3 -j DROP

# 家里电脑 (10.6.2.4) - 完全访问
iptables -A INPUT -s 10.6.2.4 -j ACCEPT

# 平板 (10.6.2.5) - 媒体访问
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 8096 -j ACCEPT  # Emby
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 8920 -j ACCEPT  # Emby HTTPS
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 5000 -j ACCEPT  # 文件管理
iptables -A INPUT -s 10.6.2.5 -j DROP

# 拒绝其他VPN IP
iptables -A INPUT -s 10.6.2.0/24 -j DROP

echo "防火墙规则已应用"
```

设置开机自动运行：

```bash
chmod +x /etc/nas-firewall.sh
echo "/etc/nas-firewall.sh" >> /etc/rc.local
```

---

## 端口开放对照表

| 服务 | 端口 | 公司电脑 | 手机 | 家里电脑 | 平板 |
|------|------|---------|------|---------|------|
| NAS管理界面 | 8000 | ✅ | ✅ | ✅ | ❌ |
| 文件管理 | 5000 | ✅ | ✅ | ✅ | ✅ |
| SSH | 22 | ✅ | ❌ | ✅ | ❌ |
| Emby媒体 | 8096 | ❌ | ✅ | ✅ | ✅ |
| Emby HTTPS | 8920 | ❌ | ✅ | ✅ | ✅ |
| qBittorrent | 8080 | ❌ | ❌ | ✅ | ❌ |
| Docker管理 | 9000 | ❌ | ❌ | ✅ | ❌ |
| 数据库 | 3306 | ❌ | ❌ | ✅ | ❌ |

---

## 各平台客户端配置

### 1. Windows (公司电脑)

1. 下载 WireGuard 客户端：https://www.wireguard.com/install/
2. 导入配置文件（从 wg-easy 下载）
3. 修改配置，限制路由：

```ini
[Interface]
PrivateKey = xxx
Address = 10.6.2.2/32
DNS = 223.6.6.6

[Peer]
PublicKey = xxx
PresharedKey = xxx
# 只访问NAS，不走全部流量
AllowedIPs = 192.168.31.10/32, 10.6.2.0/24
Endpoint = 服务器IP:51820
PersistentKeepalive = 25
```

### 2. Android/iOS (手机)

1. 安装 WireGuard App
2. 扫描二维码或导入配置文件
3. 配置允许访问的IP段

### 3. macOS/Linux (家里电脑)

```bash
# 安装 WireGuard
sudo apt install wireguard  # Ubuntu/Debian
brew install wireguard-tools  # macOS

# 配置
sudo nano /etc/wireguard/wg0.conf

# 启动
sudo wg-quick up wg0

# 开机自启
sudo systemctl enable wg-quick@wg0
```

---

## 高级安全配置

### 1. 启用预共享密钥增强安全性

在 wg-easy 中为每个客户端添加 PresharedKey：

```bash
# 生成预共享密钥
wg genpsk

# 在客户端配置中添加
PresharedKey = 生成的密钥
```

### 2. 配置连接保活

```ini
PersistentKeepalive = 25
```

### 3. 限制连接时间（可选）

在公司电脑上使用 cron 定时断开：

```bash
# 晚上8点自动断开VPN
0 20 * * * wg-quick down wg0
```

### 4. 双因素认证

在 NAS 管理界面启用 2FA：
- 飞牛NAS：设置 → 安全 → 双因素认证
- 使用 Google Authenticator 或类似应用

---

## 监控与日志

### 查看连接状态

```bash
# 在服务器上查看
wg show

# 查看特定客户端
docker exec wg-easy wg show
```

### 查看访问日志

```bash
# NAS上查看谁访问了什么
tail -f /var/log/syslog | grep 10.6.2

# 查看iptables日志
iptables -A INPUT -j LOG --log-prefix "NAS_ACCESS: "
```

### 连接通知（可选）

在 NAS 上配置连接通知脚本：

```bash
#!/bin/bash
# 当VPN客户端连接时发送通知

WG_IP=$1
DEVICE_NAME=""

case $WG_IP in
    "10.6.2.2") DEVICE_NAME="公司电脑" ;;
    "10.6.2.3") DEVICE_NAME="手机" ;;
    "10.6.2.4") DEVICE_NAME="家里电脑" ;;
    "10.6.2.5") DEVICE_NAME="平板" ;;
esac

curl -X POST "https://你的通知服务" \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"$DEVICE_NAME 已连接到NAS\"}"
```

---

## 故障排查

### 问题1：公司电脑无法访问NAS

排查步骤：
```bash
# 1. 检查VPN是否连接
wg show

# 2. 检查能否ping通NAS
ping 192.168.31.10

# 3. 检查端口是否开放
telnet 192.168.31.10 8000

# 4. 检查NAS防火墙
iptables -L -n | grep 10.6.2.2
```

### 问题2：手机连接但无法播放视频

可能原因：
- Emby端口未开放给手机IP
- MTU设置问题

解决方案：
```bash
# 检查Emby端口
iptables -L -n | grep 8096

# 调整MTU
# 在客户端配置中添加
MTU = 1280
```

### 问题3：家里电脑访问速度慢

优化方案：
```bash
# 启用BBR拥塞控制
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
sysctl -p
```

---

## 备份与恢复

### 备份 WireGuard 配置

```bash
# 备份服务器配置
cd ~/wg-easy
tar czvf wireguard-backup-$(date +%Y%m%d).tar.gz data/

# 备份客户端配置
# 保存所有.conf文件到安全位置
```

### 恢复配置

```bash
# 解压备份
tar xzvf wireguard-backup-xxx.tar.gz

# 重启服务
docker-compose restart
```

---

## 参考资源

- [WireGuard官方文档](https://www.wireguard.com/)
- [wg-easy GitHub](https://github.com/wg-easy/wg-easy)
- [iptables教程](https://www.netfilter.org/)

---

> [!note] 最后更新
> 本文档最后更新于 2026-02-10

---

*本文档由AI助手生成，请根据实际网络环境调整配置。*
