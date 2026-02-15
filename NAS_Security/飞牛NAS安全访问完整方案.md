---
title: 飞牛NAS安全访问完整方案
date: 2026-02-10
tags:
  - NAS
  - WireGuard
  - 内网穿透
  - 网络安全
  - 飞牛OS
aliases:
  - NAS安全方案
  - WireGuard部署指南
category: 技术教程
status: 已完成
---

# 飞牛NAS安全访问完整方案

> [!danger] 紧急警告
> 飞牛fnOS近期遭遇有组织的定向攻击，攻击者利用系统漏洞绕过登录验证，直接访问NAS上的所有文件。部分用户设备被植入木马，沦为"肉鸡"。**如果你正在使用飞牛NAS的公网访问功能，请立即按照本方案进行安全加固！**

---

## 目录

1. [背景：飞牛NAS安全危机](#背景飞牛nas安全危机)
2. [方案对比：选择最适合你的方案](#方案对比选择最适合你的方案)
3. [方案一：WireGuard VPN（推荐）](#方案一wireguard-vpn推荐)
4. [方案二：Tailscale零配置组网](#方案二tailscale零配置组网)
5. [紧急处理：已暴露公网的NAS](#紧急处理已暴露公网的nas)
6. [常见问题与排查](#常见问题与排查)

---

## 背景：飞牛NAS安全危机

### 漏洞概述

2025年初，飞牛fnOS遭遇严重安全漏洞攻击：

- **漏洞类型**：路径穿越漏洞 + 后门植入
- **攻击方式**：利用系统漏洞绕过登录验证
- **影响范围**：开启公网访问的NAS设备
- **危害程度**：攻击者可完全控制设备，访问所有文件

### 官方应对措施

飞牛官方已发布紧急修复方案：

1. **立即升级到v1.1.15或更高版本**
2. **运行官方查杀脚本**：

```bash
curl -L https://static2.fnnas.com/aptfix/trim-sec -o trim-sec && chmod +x trim-sec && ./trim-sec
```

> [!warning] 重要提示
> 升级和查杀只能解决已知威胁，**最根本的解决方案是关闭公网直接访问，改用VPN等安全方案**。

---

## 方案对比：选择最适合你的方案

| 方案 | 难度 | 成本 | 安全性 | 速度 | 适用场景 |
|------|------|------|--------|------|----------|
| **WireGuard自托管** | ⭐⭐⭐ | 低（需云服务器） | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 技术用户，追求极致安全 |
| **Tailscale** | ⭐ | 免费版够用 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 小白用户，零配置需求 |
| **OpenWrt路由器** | ⭐⭐⭐⭐ | 已有软路由 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 有软路由的高级用户 |

---

## 方案一：WireGuard VPN（推荐）

### 方案概述

WireGuard是一款现代化、快速且安全的开源VPN工具，设计用于替代传统的VPN解决方案（如IPSec和OpenVPN）。

**核心优势**：
- 🔐 最先进的加密技术（Curve25519等）
- ⚡ 极简代码库，性能卓越
- 🐳 支持Docker一键部署
- 📱 全平台客户端支持
- 🏠 内网IP直接访问NAS

### 准备工作

#### 1. 购买云服务器（推荐）

| 服务商 | 推荐配置 | 价格/月 |
|--------|----------|---------|
| 阿里云 | 1核2G 1M带宽 | ~30元 |
| 腾讯云 | 1核2G 1M带宽 | ~30元 |
| Vultr | 1核1G | $5 |

#### 2. 开放端口

在云服务器安全组/防火墙中开放：
- **UDP 51820** - WireGuard通信端口
- **TCP 51821** - Web管理界面（可选）

### 部署步骤

#### 步骤1：云服务器安装Docker

```bash
# 一键安装Docker
curl -sSL https://get.docker.com | sh

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker
```

#### 步骤2：生成密码哈希值

```bash
# 生成管理员密码哈希（将'YOUR_PASSWORD'替换为你的密码）
docker run --rm -it ghcr.io/wg-easy/wg-easy wgpw 'YOUR_PASSWORD'

# 复制输出的哈希值（不包括引号）
```

#### 步骤3：创建docker-compose.yml

```bash
mkdir -p ~/wg-easy && cd ~/wg-easy
```

创建 `docker-compose.yml` 文件：

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
      # 修改：替换为你的密码哈希
      - PASSWORD_HASH=$$2a$$12$$xxxxx
      # 修改：替换为你的服务器公网IP或域名
      - WG_HOST=你的服务器IP或域名
      - PORT=51821
      - WG_PORT=51820
      - WG_DEFAULT_ADDRESS=10.6.2.x
      # 修改：替换为你的内网网段
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

#### 步骤4：启动服务

```bash
docker-compose up -d
```

#### 步骤5：访问Web管理界面

浏览器访问：`http://你的服务器IP:51821`

### 客户端配置

#### 创建客户端

1. 在Web界面点击 **"新建"** 或 **"New"**
2. 输入客户端名称（如：手机、笔记本、平板）
3. 点击创建

#### 各平台客户端下载

| 平台 | 下载地址 |
|------|----------|
| Windows | https://www.wireguard.com/install/ |
| Android | Google Play搜索"WireGuard" |
| iOS | App Store搜索"WireGuard" |
| macOS | App Store搜索"WireGuard" |

#### 导入配置

**方法一：扫描二维码**
- 在wg-easy界面点击客户端的 **"显示二维码"**
- 手机端WireGuard应用点击 **"+"** → **"扫描二维码"**

**方法二：导入配置文件**
- 在wg-easy界面点击 **"下载配置"**
- WireGuard应用点击 **"+"** → **"从文件或压缩包导入"**

### 飞牛NAS端配置

#### 1. 关闭公网访问

登录飞牛NAS管理界面：
1. 进入 **设置** → **网络**
2. 关闭 **远程访问**
3. 关闭 **中继服务**
4. 删除所有端口转发规则

#### 2. 验证内网访问

确保VPN连接后可以通过内网IP访问：
```
http://192.168.x.x:8000  # 飞牛管理界面
```

---

## 方案二：Tailscale零配置组网

### 方案概述

Tailscale是基于WireGuard的零配置组网工具，无需公网IP，无需配置端口转发，几分钟即可完成组网。

**核心优势**：
- 🚀 零配置，一键组网
- 🆓 个人免费版支持20设备
- 🔒 基于WireGuard，安全可靠
- 🌐 NAT穿透，P2P直连

### 部署步骤

#### 步骤1：注册Tailscale账号

1. 访问 https://login.tailscale.com/
2. 使用Google/Microsoft/GitHub账号登录

#### 步骤2：飞牛NAS安装Tailscale

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

#### 步骤3：其他设备安装Tailscale

| 平台 | 操作 |
|------|------|
| 手机 | App Store/Google Play搜索"Tailscale" |
| 电脑 | https://tailscale.com/download |

#### 步骤4：访问NAS

1. 访问 https://login.tailscale.com/admin/machines
2. 查看NAS的Tailscale IP（如 `100.x.x.x`）
3. 浏览器访问 `http://100.x.x.x:8000`

---

## 紧急处理：已暴露公网的NAS

### 立即执行的安全措施

如果你的NAS已经暴露在公网，请立即执行以下操作：

#### 1. 切断公网访问（最紧急）

- [ ] 登录路由器，删除所有指向NAS的端口转发规则
- [ ] 登录飞牛NAS，关闭"远程访问"功能
- [ ] 关闭"中继服务"

#### 2. 运行官方查杀脚本

```bash
# SSH登录飞牛NAS执行
curl -L https://static2.fnnas.com/aptfix/trim-sec -o trim-sec && chmod +x trim-sec && ./trim-sec
```

#### 3. 检查系统异常

```bash
# 查看可疑进程
ps aux | grep -E "(gots|trim_https|unknown|miner|xmr)"

# 查看异常连接
netstat -tulpn | grep ESTABLISHED

# 查看系统日志
tail -n 100 /var/log/syslog
```

#### 4. 修改所有密码

- [ ] NAS管理员密码（强密码，12位以上）
- [ ] 所有用户密码
- [ ] 共享文件夹密码

#### 5. 升级系统

升级到最新版本（v1.1.15+）

#### 6. 部署VPN方案

按照本方案部署WireGuard或Tailscale安全访问方案。

---

## 常见问题与排查

### Q1: WireGuard连接成功但无法访问内网

**解决方案**：
```bash
# 检查IP转发
cat /proc/sys/net/ipv4/ip_forward
# 应为1

# 检查WG_ALLOWED_IPS是否包含你的内网网段
```

### Q2: Tailscale显示连接但无法访问NAS

**解决方案**：
```bash
# 检查NAS防火墙是否阻挡100.x.x.x网段
iptables -L -n | grep 100.64

# 确保服务监听所有接口
netstat -tulpn | grep 8000
```

### Q3: 连接速度慢/不稳定

**优化建议**：
```yaml
# 修改MTU值
environment:
  - WG_MTU=1280  # 尝试1280-1420之间的值
```

---

## 参考资源

- [WireGuard官方文档](https://www.wireguard.com/)
- [wg-easy GitHub](https://github.com/wg-easy/wg-easy)
- [Tailscale官方文档](https://tailscale.com/kb/)
- [飞牛NAS官方论坛](https://bbs.fnnas.com/)

---

> [!note] 最后更新
> 本文档最后更新于 2026-02-10

---

*本文档由AI助手生成，仅供参考。请根据实际情况调整配置。操作前请备份重要数据。*
