---
title: WireGuard快速入门指南
date: 2026-02-10
tags:
  - WireGuard
  - 快速入门
  - 教程
---

# WireGuard快速入门指南

> [!tip] 本指南适合
> - 有一定Linux基础的用户
> - 希望快速部署WireGuard的用户
> - 追求高安全性的NAS用户

---

## 5分钟快速部署

### 1. 准备云服务器

购买任意云服务器（推荐1核1G配置）：
- 阿里云/腾讯云/华为云：~30元/月
- Vultr/DigitalOcean：$5/月

开放端口：
- UDP 51820
- TCP 51821（Web管理）

### 2. 一键安装脚本

```bash
# 安装Docker
curl -sSL https://get.docker.com | sh

# 创建目录
mkdir -p ~/wg-easy && cd ~/wg-easy

# 生成密码哈希（将YOUR_PASSWORD替换为你的密码）
docker run --rm -it ghcr.io/wg-easy/wg-easy wgpw 'YOUR_PASSWORD'
# 复制输出的哈希值

# 创建docker-compose.yml
cat > docker-compose.yml << 'EOF'
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
      - PASSWORD_HASH=$$2a$$12$$xxxxx  # 替换为你的哈希
      - PORT=51821
      - WG_PORT=51820
      - WG_HOST=你的服务器IP
      - WG_DEFAULT_ADDRESS=10.6.2.x
      - WG_ALLOWED_IPS=192.168.31.0/24,10.6.2.0/24
      - WG_DEFAULT_DNS=223.6.6.6,119.29.29.29
      - WG_PERSISTENT_KEEPALIVE=25
      - TZ=Asia/Shanghai
      - LANG=zh
    ports:
      - "51820:51820/udp"
      - "51821:51821/tcp"
    restart: unless-stopped
EOF

# 启动服务
docker-compose up -d
```

### 3. 配置客户端

1. 访问 `http://服务器IP:51821`
2. 登录后点击 **"新建"** 创建客户端
3. 手机扫描二维码或下载配置文件
4. 安装WireGuard客户端并导入配置

### 4. 访问NAS

连接VPN后，直接通过内网IP访问：
```
http://192.168.x.x:8000
```

---

## 常用命令

```bash
# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 更新镜像
docker-compose pull
docker-compose up -d

# 备份配置
tar czvf backup-$(date +%Y%m%d).tar.gz data/

# 进入容器
docker exec -it wg-easy sh
```

---

## 客户端下载

| 平台 | 下载链接 |
|------|----------|
| Windows | https://www.wireguard.com/install/ |
| Android | https://play.google.com/store/apps/details?id=com.wireguard.android |
| iOS | App Store搜索"WireGuard" |
| macOS | App Store搜索"WireGuard" |

---

## 故障排查

| 问题 | 解决方案 |
|------|----------|
| 无法连接 | 检查防火墙是否开放UDP 51820 |
| 连接但无法访问内网 | 检查`WG_ALLOWED_IPS`是否包含你的内网网段 |
| 速度慢 | 尝试修改MTU值为1280 |
| 经常断线 | 检查`WG_PERSISTENT_KEEPALIVE`是否设置 |

---

## 下一步

详细配置请参考：[飞牛NAS安全访问完整方案](飞牛NAS安全访问完整方案.md)
