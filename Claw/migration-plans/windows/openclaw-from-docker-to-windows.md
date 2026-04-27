# OpenClaw 从 Docker 迁移到 Windows 的完整方案

## 目标

本方案解决的是这一条路径：

- 源端：当前正在运行的 **Docker 版 OpenClaw**
- 目标端：**Windows 非 Docker 版 OpenClaw**
- 目标要求：尽量保留配置、认证、会话、记忆、工作区与常用运行资料

## 最终结论

当前最稳妥的目标方案不是“原生 Windows 直接跑 OpenClaw”，而是：

- **Windows 主机**
- **WSL2 Ubuntu**
- 在 **WSL2 里安装并运行 OpenClaw**

这样做的原因很简单：

- 当前 OpenClaw 文档明确推荐 Windows 通过 WSL2 运行。
- 你现在源端本质上也是 Linux 容器环境，迁移到 WSL2 时路径语义、权限模型、运行时依赖更接近。
- 这样是“从 Linux 迁到 Linux”，比“从 Linux 内部结构硬改成原生 Windows”风险更低。

## 迁移原则

- 不直接从容器内部临时拷文件作为唯一备份，而是以 **宿主机挂载目录** 为主做完整冷备。
- 备份时把“状态目录”和“工作区”一起打包，不能只备份其中一项。
- 在 Windows 端优先 **还原相同的数据结构**，再做最少量修复。
- 在新环境验证成功前，Docker 源环境不下线。

---

## 第一部分：Docker 端完整备份

### 1. 先确认你真正要备份的对象

在 Docker 部署里，真正决定迁移成败的不是镜像本身，而是下面这些持久化数据：

- `OPENCLAW_CONFIG_DIR`
  - 对应 OpenClaw 的状态目录
  - 常见默认值：`~/.openclaw`
- `OPENCLAW_WORKSPACE_DIR`
  - 对应工作区目录
  - 常见默认值：`~/clawd`
- `.env`
  - 保存 Docker 部署时的变量定义
- `docker-compose.yml`
  - 保存挂载关系、端口与启动方式
- 额外挂载目录
  - 如果你配置过 `OPENCLAW_EXTRA_MOUNTS`
- 可选命名卷
  - 如果你配置过 `OPENCLAW_HOME_VOLUME`

### 2. 你需要备份哪些内容

#### A. 必备目录

- 状态目录完整备份
  - 重点包括：
    - `openclaw.json`
    - `credentials/`
    - `agents/`
    - `cron/`
    - `skills/`
    - `extensions/`
    - `command-queue.db`
- 工作区完整备份
  - 重点包括：
    - `AGENTS.md`
    - `SOUL.md`
    - `USER.md`
    - `IDENTITY.md`
    - `MEMORY.md`
    - `memory/`
    - `skills/`
    - 你自己的业务资料、脚本、提示词、模板

#### B. 必备配置文件

- Docker 项目目录下的 `.env`
- `docker-compose.yml`
- 如果存在：
  - `docker-compose.extra.yml`
  - 自定义覆盖文件
  - 你手工维护的脚本

#### C. 条件性备份

- `OPENCLAW_EXTRA_MOUNTS` 对应的宿主机目录
- `OPENCLAW_HOME_VOLUME` 对应的 Docker 命名卷

这两类不是所有人都有，但如果你用了，就必须一起带走，否则恢复后会出现“主程序能启动，但部分技能、外挂脚本或历史依赖丢失”的问题。

### 3. 推荐的备份窗口

建议在一个短暂停机窗口里做冷备：

1. 暂停外部消息进入
2. 停止 OpenClaw 网关容器
3. 对挂载目录做打包
4. 生成校验文件
5. 备份完成后再启动容器

原因是：

- 会话、队列、cron、认证状态可能在运行中持续变化
- 热备份不是不能做，但一致性会差一些
- 你这次目标是跨平台迁移，优先要一份可回滚的“冻结快照”

### 4. 推荐的备份包结构

建议你把源端备份整理成下面这种结构：

```text
openclaw-migration-bundle/
├── 00-manifest/
│   ├── backup-notes.md
│   ├── source-host.txt
│   ├── openclaw-version.txt
│   └── backup-time.txt
├── 10-openclaw-state/
├── 20-openclaw-workspace/
├── 30-compose-and-env/
│   ├── .env
│   ├── docker-compose.yml
│   └── docker-compose.extra.yml
├── 40-extra-mounts/
├── 50-optional-home-volume/
└── 99-checksums/
```

### 5. 备份时的重点校验

备份完成后，至少核对这几件事：

- `10-openclaw-state/openclaw.json` 存在
- `10-openclaw-state/credentials/` 存在
- `10-openclaw-state/agents/` 存在
- `20-openclaw-workspace/` 不为空
- `.env` 里能看出原始挂载路径和端口配置
- 如果你启用了 cron、持久队列、插件、外部脚本，它们都在备份包中

### 6. 这一步的本质

这一步不是“把 Docker 搬到 Windows”，而是先把当前 Docker 部署**还原成一份宿主机层面的完整数据资产**。

只有做到了这一点，后续才能：

- 还原到 Windows WSL2 的 OpenClaw
- 继续转换给 CoPaw
- 在需要时重新回到 Linux 或 Docker

---

## 第二部分：Windows 端如何恢复为可用的 OpenClaw

## 目标恢复形态

这里建议的目标形态是：

- Windows 安装 WSL2
- WSL2 内安装 Ubuntu
- Ubuntu 内安装 OpenClaw
- 把备份目录恢复为新的状态目录和工作区

## 1. Windows 端先不要急着导入备份

正确顺序应该是：

1. 先在 Windows 上装好 WSL2
2. 再在 WSL2 里装 OpenClaw
3. 先让 OpenClaw 生成一次基础目录
4. 然后停止服务
5. 再覆盖恢复备份

这样做的好处是：

- 目标端目录结构先成型
- 依赖先装好
- 后面如果要修复路径，只需要处理数据，不需要边装边猜

## 2. Windows 端建议目录策略

不要急着把 Docker 里的 Linux 路径改成纯 Windows 路径。

更稳妥的做法是：

- 在 WSL2 内部继续使用 Linux 风格路径
- 让 OpenClaw 仍然看到自己熟悉的目录语义

推荐思路：

- 状态目录恢复到：
  - `~/.openclaw`
- 工作区恢复到以下二选一之一：
  - 按你原来的真实路径恢复
  - 或恢复到 `~/.openclaw/workspace`

哪一种更合适，取决于你源端真实配置：

- 如果你原来明确使用 `~/clawd`，那就优先在 WSL2 复刻这个路径
- 如果你原来实际已经围绕 `~/.openclaw/workspace` 工作，那就统一到这个路径

重点不是“选哪个默认值”，而是 **按当前实际配置还原**。

## 3. 备份数据如何转换为 Windows 可用

你这次的“转换”本质上不是文件格式转换，而是 **运行环境转换**。

需要转换的主要是下面几类信息：

### A. 路径语义转换

从 Docker 到 WSL2 时：

- 容器内部路径不再重要
- 真正重要的是宿主机挂载出来的数据目录
- 在 Windows 端，你要把这些目录放进 WSL2 的 Linux 文件系统，而不是直接扔到 `C:\` 下让 OpenClaw 原样读取

换句话说：

- 原先容器里 `/home/node/.openclaw`
- 不需要在 Windows 复刻成 `C:\home\node\.openclaw`
- 而是恢复到 WSL2 用户目录下的 `~/.openclaw`

### B. 启动方式转换

从 Docker Compose 启动，转换为：

- WSL2 里的本地 OpenClaw 安装
- 通过 `openclaw-cn onboard --install-daemon` 或等价方式安装服务

### C. 环境变量转换

原来的 `.env` 仍然有价值，但用途会变化：

- 保留其中与模型、网关、端口、认证相关的变量
- 清理只属于 Docker Compose 的变量
- 重新用于 WSL2 本地运行环境

例如下面这些需要重新审视：

- `OPENCLAW_CONFIG_DIR`
- `OPENCLAW_WORKSPACE_DIR`
- `OPENCLAW_GATEWAY_PORT`
- `OPENCLAW_GATEWAY_BIND`
- `OPENCLAW_BRIDGE_PORT`
- Claude 相关会话变量

### D. 挂载转换

如果你以前依赖 `OPENCLAW_EXTRA_MOUNTS`：

- 现在不再是“挂载”
- 而是要把这些目录的内容真实放到 WSL2 可访问的位置
- 然后在 OpenClaw 配置、技能脚本或调用路径里改为新位置

### E. 可选命名卷转换

如果你用了 `OPENCLAW_HOME_VOLUME`：

- 要把这个命名卷里的内容抽出来
- 判断哪些是真正长期有用的数据
- 再并入 WSL2 用户目录

这一步通常只在你把额外工具、缓存或个性化 home 内容也放进容器时才需要。

## 4. Windows 端恢复步骤

### 第一步：安装目标环境

- 安装 WSL2
- 安装 Ubuntu
- 启用 systemd
- 在 WSL2 里安装 OpenClaw

### 第二步：初始化一次

在 WSL2 里先完成一次最基础安装，让以下内容先被创建出来：

- `~/.openclaw`
- 默认工作区
- 本地服务脚本或守护安装结构

然后停止 OpenClaw 服务。

### 第三步：导入备份

把备份包复制到 Windows 后，再放入 WSL2 文件系统。

恢复时按下面逻辑进行：

- 用 `10-openclaw-state/` 覆盖目标状态目录
- 用 `20-openclaw-workspace/` 覆盖目标工作区
- 把 `30-compose-and-env/` 留作参考，不要机械原样照搬
- 把 `40-extra-mounts/` 中实际仍需要的目录恢复到新的 WSL2 路径
- 把 `50-optional-home-volume/` 里确认仍需要的内容合并回 WSL2 用户目录

### 第四步：做一次迁移后修复

导入完成后，先不要马上开始对外提供服务，先做修复与体检：

- 运行 `openclaw doctor`
- 检查配置文件中的工作区路径是否指向正确目录
- 检查凭据目录是否存在
- 检查 sessions 是否可见
- 检查 cron、插件、技能是否还引用旧路径

### 第五步：启动并验证

至少验证以下项目：

- OpenClaw 能正常启动
- 控制台可以打开
- 历史会话仍在
- 工作区资料完整
- 关键频道配置仍然存在
- 必要技能仍能工作
- 定时任务未丢失

---

## 第三部分：哪些数据可以直接用，哪些需要人工调整

## 可直接恢复的数据

- 状态目录的大部分内容
- 会话历史
- 认证与凭据
- 工作区 Markdown 资料
- 记忆文件
- cron 持久化文件
- 插件目录
- skills 目录

## 需要人工核对的数据

- 端口配置
- 监听地址
- 外部路径引用
- 依赖宿主机目录的技能
- 依赖 Linux 系统包的工具
- 额外挂载内容

## 不建议直接照搬的数据

- 只为 Docker 写死的 Compose 配置逻辑
- 只在容器里存在的临时缓存
- 已失效的媒体缓存

---

## 第四部分：推荐的实际迁移策略

建议按“三阶段”执行：

### 阶段一：先做可回滚冷备

- 不碰目标端
- 只生成完整迁移包

### 阶段二：先恢复到 Windows 版 OpenClaw

- 让 OpenClaw 在 Windows WSL2 先成功跑起来
- 验证配置、历史、技能和频道都基本正常

### 阶段三：再考虑第二目标

- 如果后面还要转 CoPaw，就从这份已经验证过的迁移包继续做二次转换

这样做的好处是：

- 先保住完整业务连续性
- 再尝试跨产品迁移
- 任一步失败都能快速回滚

---

## 第五部分：本方案的边界

本方案可以尽量保证：

- OpenClaw 的配置迁移
- 工作区迁移
- 会话历史迁移
- 认证状态迁移
- 大部分本地能力迁移

本方案不能天然保证：

- 所有依赖宿主机二进制的技能百分百无改动复用
- 所有硬编码路径在 WSL2 中自动正确
- 原生 Windows 路线和 WSL2 路线拥有同样稳定性

所以如果目标是“成功率第一”，结论仍然是：

- **当前 Docker 版 OpenClaw**
- **完整冷备**
- **恢复到 Windows 的 WSL2 OpenClaw**

这是现阶段最稳妥的正迁移路线。
