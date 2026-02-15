---
title: 飞牛NAS防火墙策略
date: 2026-02-10
tags:
  - 飞牛NAS
  - 防火墙
  - 安全策略
  - iptables
  - 网络安全
aliases:
  - NAS防火墙配置
  - fnOS安全策略
---

# 飞牛NAS防火墙策略

> [!warning] 重要提示
> 配置防火墙前请确保你有其他方式可以访问NAS（如物理访问、IPMI等），防止规则错误导致自己被锁在外面。

---

## 目录

1. [基础安全原则](#基础安全原则)
2. [默认拒绝策略](#默认拒绝策略)
3. [分层防御架构](#分层防御架构)
4. [具体防火墙规则](#具体防火墙规则)
5. [WireGuard VPN集成](#wireguard-vpn集成)
6. [自动防御机制](#自动防御机制)
7. [日志与监控](#日志与监控)
8. [备份与恢复](#备份与恢复)

---

## 基础安全原则

### 1. 最小权限原则
- 只开放必要的端口
- 只给必要的IP访问权限
- 定期审查和清理规则

### 2. 分层防御
- 网络层：iptables防火墙
- 应用层：NAS内置访问控制
- 认证层：强密码 + 2FA

### 3. 默认拒绝
- 默认拒绝所有入站连接
- 显式允许合法流量
- 记录可疑活动

---

## 默认拒绝策略

### 基础规则模板

```bash
#!/bin/bash
# 飞牛NAS防火墙配置脚本
# 保存为: /etc/nas-firewall.sh
# 执行: sudo bash /etc/nas-firewall.sh

echo "=== 飞牛NAS防火墙配置 ==="
echo "配置时间: $(date)"

# 1. 清空所有规则
echo "[1/6] 清空现有规则..."
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X
iptables -t mangle -F
iptables -t mangle -X

# 2. 设置默认策略
echo "[2/6] 设置默认策略: 默认拒绝..."
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 3. 允许本地回环
echo "[3/6] 允许本地回环..."
iptables -A INPUT -i lo -j ACCEPT

# 4. 允许已建立的连接
echo "[4/6] 允许已建立的连接..."
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 5. 允许内网访问（根据你的网段修改）
echo "[5/6] 允许内网访问..."
# 修改为你的实际内网网段
iptables -A INPUT -s 192.168.31.0/24 -j ACCEPT
# 如果有多个网段，继续添加
# iptables -A INPUT -s 192.168.1.0/24 -j ACCEPT

# 6. 允许VPN网段（WireGuard）
echo "[6/6] 允许VPN网段..."
iptables -A INPUT -s 10.6.2.0/24 -j ACCEPT

echo "=== 基础规则配置完成 ==="
```

---

## 分层防御架构

### 网络拓扑

```
┌─────────────────────────────────────────────────────────────┐
│                        互联网                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (拒绝所有)
┌─────────────────────────────────────────────────────────────┐
│                    第一层: 网络边界                          │
│              默认拒绝所有入站连接                            │
│              只允许VPN和特定IP                              │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   第二层: VPN   │ │ 第三层: 内网    │ │ 第四层: 应用    │
│   10.6.2.0/24   │ │ 192.168.31.0/24 │ │ 端口级控制      │
│                 │ │                 │ │                 │
│ 公司电脑(受限)  │ │ 家里设备(完全)  │ │ 8000,5000等     │
│ 手机(中等)      │ │                 │ │                 │
│ 家里电脑(完全)  │ │                 │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## 具体防火墙规则

### 场景1：完全关闭公网访问（最安全）

```bash
#!/bin/bash
# 完全关闭公网访问模式
# 只允许内网和VPN访问

echo "=== 完全关闭公网访问模式 ==="

# 清空规则
iptables -F
iptables -X

# 默认拒绝
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 允许本地回环
iptables -A INPUT -i lo -j ACCEPT

# 允许已建立的连接
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许内网（修改为你的网段）
iptables -A INPUT -s 192.168.31.0/24 -j ACCEPT

# 允许VPN网段
iptables -A INPUT -s 10.6.2.0/24 -j ACCEPT

# 拒绝其他所有入站
iptables -A INPUT -j DROP

echo "规则已应用: 只允许内网和VPN访问"
```

### 场景2：只允许特定公网IP

```bash
#!/bin/bash
# 只允许特定公网IP访问（如公司固定IP）

echo "=== 允许特定公网IP模式 ==="

# 基础规则
iptables -F
iptables -X
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -s 192.168.31.0/24 -j ACCEPT
iptables -A INPUT -s 10.6.2.0/24 -j ACCEPT

# 允许特定公网IP（修改为你的IP）
# 公司固定IP
iptables -A INPUT -s 203.45.67.89 -j ACCEPT

# 备用访问IP
iptables -A INPUT -s 114.23.45.67 -j ACCEPT

# 拒绝其他
iptables -A INPUT -j DROP

echo "规则已应用: 允许特定公网IP"
```

### 场景3：端口级精细控制

```bash
#!/bin/bash
# 端口级精细控制
# 不同设备不同权限

echo "=== 端口级精细控制模式 ==="

# 基础规则
iptables -F
iptables -X
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# ========== 内网完全访问 ==========
iptables -A INPUT -s 192.168.31.0/24 -j ACCEPT

# ========== VPN设备分层控制 ==========

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
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 32400 -j ACCEPT # Plex
iptables -A INPUT -s 10.6.2.3 -j DROP

# 家里电脑 (10.6.2.4) - 完全访问
iptables -A INPUT -s 10.6.2.4 -j ACCEPT

# 平板 (10.6.2.5) - 媒体访问
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 8096 -j ACCEPT
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 8920 -j ACCEPT
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 5000 -j ACCEPT
iptables -A INPUT -s 10.6.2.5 -j DROP

# 其他VPN IP默认拒绝
iptables -A INPUT -s 10.6.2.0/24 -j DROP

# 拒绝其他所有
iptables -A INPUT -j DROP

echo "规则已应用: 端口级精细控制"
```

### 场景4：服务隔离模式

```bash
#!/bin/bash
# 服务隔离模式
# 不同服务不同访问级别

echo "=== 服务隔离模式 ==="

iptables -F
iptables -X
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 内网完全访问
iptables -A INPUT -s 192.168.31.0/24 -j ACCEPT

# ========== 核心服务（所有VPN可访问）==========
# DNS
iptables -A INPUT -s 10.6.2.0/24 -p udp --dport 53 -j ACCEPT
# NTP
iptables -A INPUT -s 10.6.2.0/24 -p udp --dport 123 -j ACCEPT

# ========== 管理服务（仅管理员）==========
# 公司电脑 + 家里电脑
iptables -A INPUT -s 10.6.2.2 -p tcp --dport 8000 -j ACCEPT  # NAS管理
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 8000 -j ACCEPT
iptables -A INPUT -s 10.6.2.2 -p tcp --dport 22 -j ACCEPT     # SSH
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 22 -j ACCEPT

# ========== 文件服务（工作设备）==========
iptables -A INPUT -s 10.6.2.2 -p tcp --dport 5000 -j ACCEPT  # 公司电脑
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 5000 -j ACCEPT  # 家里电脑
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 5000 -j ACCEPT  # 手机
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 5000 -j ACCEPT  # 平板

# ========== 媒体服务（娱乐设备）==========
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 8096 -j ACCEPT  # 手机
iptables -A INPUT -s 10.6.2.3 -p tcp --dport 8920 -j ACCEPT
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 8096 -j ACCEPT  # 家里电脑
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 8920 -j ACCEPT
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 8096 -j ACCEPT  # 平板
iptables -A INPUT -s 10.6.2.5 -p tcp --dport 8920 -j ACCEPT

# ========== 下载服务（仅家里电脑）==========
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 8080 -j ACCEPT  # qBittorrent
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 6881 -j ACCEPT  # BT端口
iptables -A INPUT -s 10.6.2.4 -p udp --dport 6881 -j ACCEPT

# ========== Docker管理（仅家里电脑）==========
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 9000 -j ACCEPT  # Portainer
iptables -A INPUT -s 10.6.2.4 -p tcp --dport 9443 -j ACCEPT

# 拒绝其他
iptables -A INPUT -s 10.6.2.0/24 -j DROP
iptables -A INPUT -j DROP

echo "规则已应用: 服务隔离模式"
```

---

## WireGuard VPN集成

### VPN设备管理脚本

```bash
#!/bin/bash
# VPN设备管理脚本
# 用于动态添加/删除VPN设备规则

VPN_SUBNET="10.6.2.0/24"

add_device() {
    local ip=$1
    local name=$2
    local ports=$3
    
    echo "添加设备: $name ($ip)"
    
    # 删除该IP的现有规则
    iptables -D INPUT -s $ip -j DROP 2>/dev/null
    
    # 添加端口规则
    for port in $ports; do
        iptables -A INPUT -s $ip -p tcp --dport $port -j ACCEPT
        echo "  - 允许端口: $port"
    done
    
    # 拒绝该IP的其他访问
    iptables -A INPUT -s $ip -j DROP
}

remove_device() {
    local ip=$1
    echo "删除设备: $ip"
    iptables -D INPUT -s $ip -j DROP 2>/dev/null
    # 删除该IP的所有规则
    iptables -S INPUT | grep "$ip" | while read rule; do
        iptables -D INPUT $(echo $rule | sed 's/-A INPUT //')
    done
}

list_devices() {
    echo "=== 当前VPN设备规则 ==="
    iptables -L INPUT -n | grep "10.6.2"
}

# 使用示例
case $1 in
    add)
        # 添加手机设备
        add_device "10.6.2.3" "手机" "8000 5000 8096 8920"
        ;;
    remove)
        remove_device "10.6.2.3"
        ;;
    list)
        list_devices
        ;;
    *)
        echo "用法: $0 {add|remove|list}"
        ;;
esac
```

---

## 自动防御机制

### 1. 防暴力破解

```bash
#!/bin/bash
# 防暴力破解脚本
# 保存为: /etc/nas-anti-brute.sh

# 安装 fail2ban
apt-get update
apt-get install -y fail2ban

# 创建自定义规则
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[fnos-web]
enabled = true
port = 8000
filter = fnos-web
logpath = /var/log/fnos/web.log
maxretry = 3

[fnos-ssh]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
EOF

# 创建飞牛NAS过滤器
cat > /etc/fail2ban/filter.d/fnos-web.conf << 'EOF'
[Definition]
failregex = ^.*Failed login attempt from <HOST>.*$
ignoreregex =
EOF

# 启动 fail2ban
systemctl enable fail2ban
systemctl start fail2ban

echo "防暴力破解已启用"
```

### 2. 自动封禁可疑IP

```bash
#!/bin/bash
# 自动封禁脚本
# 每分钟检查一次日志

SUSPICIOUS_LOG="/var/log/nas-suspicious.log"
BLOCKED_IPS="/etc/nas-blocked-ips.txt"

# 检查异常登录
 check_suspicious() {
    # 检查短时间内多次失败登录
    tail -n 1000 /var/log/syslog | grep "Failed" | awk '{print $11}' | sort | uniq -c | sort -rn | while read count ip; do
        if [ $count -gt 5 ]; then
            if ! grep -q "$ip" $BLOCKED_IPS; then
                echo "$(date): 封禁可疑IP: $ip (失败次数: $count)" >> $SUSPICIOUS_LOG
                iptables -A INPUT -s $ip -j DROP
                echo $ip >> $BLOCKED_IPS
            fi
        fi
    done
}

# 检查端口扫描
 check_portscan() {
    # 检查短时间内访问多个不同端口
    tail -n 1000 /var/log/syslog | grep "DPT=" | awk -F'SRC=' '{print $2}' | awk '{print $1}' | sort | uniq -c | sort -rn | while read count ip; do
        if [ $count -gt 20 ]; then
            if ! grep -q "$ip" $BLOCKED_IPS; then
                echo "$(date): 封禁扫描IP: $ip (端口访问: $count)" >> $SUSPICIOUS_LOG
                iptables -A INPUT -s $ip -j DROP
                echo $ip >> $BLOCKED_IPS
            fi
        fi
    done
}

# 执行检查
check_suspicious
check_portscan
```

添加到定时任务：

```bash
# 每分钟执行一次
* * * * * /etc/nas-anti-auto.sh
```

### 3. 地理IP封禁（可选）

```bash
#!/bin/bash
# 封禁特定国家IP（需要安装 ipset 和 geoip）

# 安装依赖
apt-get install -y ipset xtables-addons-common

# 创建中国IP集合
ipset create china hash:net maxelem 65536

# 下载中国IP列表
wget -O /tmp/china.txt http://www.ipdeny.com/ipblocks/data/countries/cn.zone

# 添加到集合
while read ip; do
    ipset add china $ip
done < /tmp/china.txt

# 只允许中国IP访问（根据需要调整）
iptables -A INPUT -m set --match-set china src -j ACCEPT
iptables -A INPUT -j DROP
```

---

## 日志与监控

### 启用详细日志

```bash
#!/bin/bash
# 启用防火墙日志

# 创建日志链
iptables -N LOGGING

# 记录被拒绝的连接
iptables -A LOGGING -m limit --limit 2/min -j LOG --log-prefix "NAS_DROP: " --log-level 4
iptables -A LOGGING -j DROP

# 将日志规则应用到INPUT链末尾
iptables -A INPUT -j LOGGING

# 查看日志
echo "查看被拒绝的连接:"
tail -f /var/log/syslog | grep "NAS_DROP"
```

### 连接监控脚本

```bash
#!/bin/bash
# 实时监控连接

echo "=== NAS连接监控 ==="
echo "按 Ctrl+C 停止"
echo ""

while true; do
    clear
    echo "=== $(date) ==="
    echo ""
    
    # 显示当前连接
    echo "当前活动连接:"
    netstat -tn | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -10
    
    echo ""
    echo "VPN连接状态:"
    iptables -L INPUT -n -v | grep "10.6.2" | head -5
    
    echo ""
    echo "最近被拒绝的连接:"
    tail -5 /var/log/syslog | grep "NAS_DROP" | tail -3
    
    sleep 5
done
```

### 每日安全报告

```bash
#!/bin/bash
# 每日安全报告
# 添加到crontab: 0 8 * * * /etc/nas-daily-report.sh

REPORT_FILE="/var/log/nas-daily-report-$(date +%Y%m%d).log"

echo "=== NAS每日安全报告 ===" > $REPORT_FILE
echo "日期: $(date)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# 统计连接
echo "=== 连接统计 ===" >> $REPORT_FILE
echo "总连接数: $(netstat -tn | grep ESTABLISHED | wc -l)" >> $REPORT_FILE
echo "VPN连接数: $(iptables -L INPUT -n -v | grep "10.6.2" | wc -l)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# 被拒绝的连接
echo "=== 被拒绝的连接TOP10 ===" >> $REPORT_FILE
grep "NAS_DROP" /var/log/syslog | awk '{print $11}' | sort | uniq -c | sort -rn | head -10 >> $REPORT_FILE
echo "" >> $REPORT_FILE

# 封禁的IP
echo "=== 已封禁的IP ===" >> $REPORT_FILE
cat /etc/nas-blocked-ips.txt 2>/dev/null >> $REPORT_FILE

# 发送报告（可选）
# mail -s "NAS每日安全报告" your-email@example.com < $REPORT_FILE

echo "报告已保存: $REPORT_FILE"
```

---

## 备份与恢复

### 备份防火墙规则

```bash
#!/bin/bash
# 备份防火墙规则

BACKUP_DIR="/etc/nas-firewall-backup"
mkdir -p $BACKUP_DIR

# 备份iptables规则
iptables-save > $BACKUP_DIR/iptables-backup-$(date +%Y%m%d).rules

# 备份脚本
cp /etc/nas-firewall.sh $BACKUP_DIR/ 2>/dev/null
cp /etc/nas-anti-brute.sh $BACKUP_DIR/ 2>/dev/null
cp /etc/nas-anti-auto.sh $BACKUP_DIR/ 2>/dev/null

# 备份封禁列表
cp /etc/nas-blocked-ips.txt $BACKUP_DIR/ 2>/dev/null

# 压缩备份
tar czvf $BACKUP_DIR/firewall-backup-$(date +%Y%m%d).tar.gz -C $BACKUP_DIR .

echo "防火墙规则已备份到: $BACKUP_DIR"
```

### 恢复防火墙规则

```bash
#!/bin/bash
# 恢复防火墙规则

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "用法: $0 <备份文件>"
    exit 1
fi

# 恢复iptables规则
iptables-restore < $BACKUP_FILE

echo "防火墙规则已恢复"
```

### 开机自动应用规则

```bash
#!/bin/bash
# 设置开机自动应用防火墙规则

# 方法1: 使用rc.local
cat > /etc/rc.local << 'EOF'
#!/bin/bash
# 应用NAS防火墙规则
if [ -f /etc/nas-firewall.sh ]; then
    bash /etc/nas-firewall.sh
fi
exit 0
EOF

chmod +x /etc/rc.local

# 方法2: 使用systemd服务
cat > /etc/systemd/system/nas-firewall.service << 'EOF'
[Unit]
Description=NAS Firewall Rules
After=network.target

[Service]
Type=oneshot
ExecStart=/bin/bash /etc/nas-firewall.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

systemctl enable nas-firewall.service

echo "开机自动应用规则已设置"
```

---

## 快速命令参考

### 查看当前规则

```bash
# 查看所有规则
iptables -L -n -v

# 查看INPUT链
iptables -L INPUT -n -v

# 查看特定IP的规则
iptables -L INPUT -n | grep "10.6.2.2"

# 查看规则编号
iptables -L INPUT --line-numbers
```

### 临时允许/拒绝

```bash
# 临时允许某个IP
iptables -I INPUT -s 192.168.1.100 -j ACCEPT

# 临时拒绝某个IP
iptables -I INPUT -s 192.168.1.100 -j DROP

# 删除特定规则
iptables -D INPUT -s 192.168.1.100 -j ACCEPT

# 按编号删除规则
iptables -D INPUT 5
```

### 测试规则

```bash
# 从另一台机器测试端口
telnet 192.168.31.10 8000
nc -zv 192.168.31.10 8000

# 测试VPN连接
ping 10.6.2.1
```

---

## 常见问题

### Q1: 配置后无法访问NAS

**解决方案：**
```bash
# 1. 检查规则
iptables -L INPUT -n -v

# 2. 临时清空规则（恢复访问）
iptables -F
iptables -P INPUT ACCEPT

# 3. 物理访问NAS，修正规则
```

### Q2: VPN连接但无法访问服务

**解决方案：**
```bash
# 检查VPN IP是否正确
wg show

# 检查NAS防火墙是否允许该IP
iptables -L INPUT -n | grep "10.6.2"

# 检查服务是否监听正确接口
netstat -tlnp | grep 8000
```

### Q3: 规则太多影响性能

**优化方案：**
```bash
# 使用ipset管理大量IP
apt-get install ipset

# 创建IP集合
ipset create vpn_clients hash:ip

# 添加IP
ipset add vpn_clients 10.6.2.2
ipset add vpn_clients 10.6.2.3

# 使用集合
iptables -A INPUT -m set --match-set vpn_clients src -j ACCEPT
```

---

## 参考资源

- [iptables手册](https://linux.die.net/man/8/iptables)
- [Fail2ban文档](https://www.fail2ban.org/wiki/index.php/Main_Page)
- [WireGuard文档](https://www.wireguard.com/)

---

> [!note] 最后更新
> 本文档最后更新于 2026-02-10

---

*配置防火墙前请确保有备用访问方式，防止被锁在外面。*
