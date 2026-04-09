# CoPaw 从 OpenClaw Docker 备份迁移到 Windows 的方案

## 目标

本方案解决的是另一条路径：

- 源端：当前正在运行的 **Docker 版 OpenClaw**
- 目标端：**Windows 非 Docker 版 CoPaw**
- 目标要求：在不再使用 Docker 的前提下，尽可能复用现有资料、提示词、知识库、业务脚本与可迁移配置

## 最终结论

这条路和“OpenClaw 迁移到 Windows 继续运行 OpenClaw”不一样。

这里不是同产品迁移，而是 **跨产品迁移**，所以必须先接受一个现实：

- **可以完整备份 OpenClaw**
- **但不能承诺把 OpenClaw 的所有内部状态原样导入 CoPaw**

目前能高置信确认的是：

- CoPaw 支持 Windows
- CoPaw 默认工作目录是 `~/.copaw`
- 初始化会生成 `config.json` 与 `HEARTBEAT.md`
- CoPaw 提供脚本安装、pip 安装、桌面应用等多种 Windows 路径

但目前没有证据表明：

- CoPaw 能直接读取 OpenClaw 的 `~/.openclaw`
- CoPaw 能直接导入 OpenClaw 的会话历史内部结构
- CoPaw 能直接复用 OpenClaw 的认证状态和频道凭据

所以本方案采用的是：

- **第一层：完整冷备**
- **第二层：分类转换**
- **第三层：Windows 端重建可运行 CoPaw**

---

## 第一部分：Docker 端完整备份

## 1. 先把 OpenClaw 当成“源数据系统”

你现在的 Docker 版 OpenClaw，不只是一个运行中的服务，它还是后续所有迁移动作的“唯一可信源”。

因此第一步不是直接研究 CoPaw 怎么导入，而是先把 OpenClaw 当前数据 **完整、可校验地冻结出来**。

## 2. 必须纳入备份的内容

### A. OpenClaw 状态目录

完整打包 `OPENCLAW_CONFIG_DIR`，常见默认值是：

- `~/.openclaw`

其中尤其要保留：

- `openclaw.json`
- `credentials/`
- `agents/`
- `cron/`
- `skills/`
- `extensions/`
- `command-queue.db`

### B. OpenClaw 工作区

完整打包 `OPENCLAW_WORKSPACE_DIR`，常见默认值是：

- `~/clawd`

或某些实际部署里使用的：

- `~/.openclaw/workspace`

这里通常会包含你最有价值、最适合迁移给 CoPaw 的内容：

- 各种 Markdown 说明文件
- 记忆文件
- 提示词
- 技能脚本
- 业务资料
- 模板
- 工作过程产物

### C. Docker 配置侧文件

- `.env`
- `docker-compose.yml`
- `docker-compose.extra.yml`
- 自定义覆盖文件
- 你自己维护的启动/修复脚本

### D. 额外挂载与命名卷

如果你使用过：

- `OPENCLAW_EXTRA_MOUNTS`
- `OPENCLAW_HOME_VOLUME`

那这些也必须纳入冷备。

原因是：

- 有些技能依赖额外挂载目录里的文件
- 有些自定义工具或缓存可能只存在于命名卷

## 3. 备份打包建议

推荐仍然使用统一迁移包结构：

```text
openclaw-migration-bundle/
├── 00-manifest/
├── 10-openclaw-state/
├── 20-openclaw-workspace/
├── 30-compose-and-env/
├── 40-extra-mounts/
├── 50-optional-home-volume/
└── 99-checksums/
```

这份包不是只给 OpenClaw 用，而是给后续 CoPaw 转换做基础材料。

---

## 第二部分：把 Docker 备份转换成 CoPaw 可利用的数据包

## 1. 转换思路不是“直接导入整个 .openclaw”

如果你把 `~/.openclaw` 整体复制到 Windows 的 `~/.copaw`，大概率并不会变成一个可用的 CoPaw。

原因是两者不是同一产品，内部目录和状态结构不应直接假定兼容。

所以正确思路是把 OpenClaw 备份拆成三层：

- **可直接迁移层**
- **可参考重建层**
- **仅保留归档层**

## 2. 可直接迁移层

这一层是最适合搬进 CoPaw 的内容：

- 你的知识库 Markdown 文件
- 业务说明文档
- 提示词文件
- 通用文本模板
- 与具体运行时无关的技能源码
- 纯数据型附件
- 可复用的脚本逻辑

建议从这些位置提取：

- `20-openclaw-workspace/` 下的 Markdown、文本、模板、业务文件
- `10-openclaw-state/skills/` 中的可复用技能
- `10-openclaw-state/extensions/` 中可作为功能参考的实现

## 3. 可参考重建层

这一层不能直接导入，但可以作为 Windows CoPaw 重建配置时的依据：

- 模型配置
- 频道配置
- cron/定时任务定义
- 插件启用列表
- 工具白名单、黑名单、路径策略
- 自定义环境变量

建议整理为人工可读的迁移清单，例如：

- 原有频道有哪些
- 各频道分别用了哪些 token 或 webhook
- 哪些模型在用
- 哪些技能依赖外部路径
- 哪些定时任务是必须恢复的

## 4. 仅保留归档层

这一层建议归档保存，但不要直接导入 CoPaw：

- `credentials/` 里的原始凭据
- `agents/*/sessions/` 里的原始会话历史
- `command-queue.db`
- 媒体缓存
- Docker 专属覆盖文件
- 只在容器中生效的临时运行状态

保留这些文件的意义不是直接导入，而是：

- 后续审计
- 手工查阅历史
- 必要时二次开发导入器

## 5. 推荐增加一个“中间转换包”

为了让 CoPaw 迁移更清晰，建议从原始冷备中再加工一份中间包：

```text
copaw-import-bundle/
├── 00-manifest/
├── 10-knowledge/
├── 20-prompts-and-memory/
├── 30-skills-reference/
├── 40-sessions-archive/
├── 50-channels-manual/
├── 60-jobs-manual/
└── 99-import-notes/
```

各目录建议含义如下：

- `10-knowledge/`
  - 业务知识、说明文档、通用资料
- `20-prompts-and-memory/`
  - 角色设定、记忆文本、长期提示词
- `30-skills-reference/`
  - 可以移植或重写的技能实现
- `40-sessions-archive/`
  - 只做归档，不直接导入
- `50-channels-manual/`
  - 频道配置参考与重新接入说明
- `60-jobs-manual/`
  - 定时任务重建清单

这样做的核心价值是：

- 让“可以复制的”和“只能参考的”彻底分开
- 防止把 OpenClaw 的内部状态误塞进 CoPaw 导致脏数据

---

## 第三部分：Windows 端如何恢复为可用的 CoPaw

## 1. 目标形态选择

CoPaw 的 Windows 端可以优先考虑这两种形态：

- **桌面应用**
  - 适合你想要最低操作门槛
- **脚本安装或 pip 安装**
  - 适合你希望更容易控制工作目录、备份和后续自动化

如果你的目标是“长期维护、便于二次转换、便于再备份”，更建议：

- **Windows 脚本安装**
- 或 **pip 安装**

因为这样对 `~/.copaw` 的控制更直接。

## 2. 先初始化一套 CoPaw 空环境

正确步骤是：

1. 在 Windows 安装 CoPaw
2. 运行初始化
3. 让 CoPaw 在默认工作目录 `~/.copaw` 下生成基础结构
4. 启动一次，确认控制台可打开
5. 停止 CoPaw
6. 再导入转换后的数据

这样做的原因是：

- 你先拿到 CoPaw 自己认可的目录结构
- 后续导入只是在“已有骨架”上填充内容

## 3. Windows 端导入策略

### A. 直接导入的内容

优先导入：

- `10-knowledge/`
- `20-prompts-and-memory/`
- 经过检查后的 `30-skills-reference/`

这些内容进入 CoPaw 后，通常会作为：

- 工作目录资料
- 智能体知识文件
- 提示词与模板
- 可再利用的技能源码参考

### B. 手工重建的内容

下面这些建议在 CoPaw 控制台或 CLI 中重新配置，而不是直接复制 OpenClaw 的内部文件：

- 模型提供商
- 频道接入
- 定时任务
- 安全策略
- MCP 服务配置

### C. 只归档不导入的内容

下面这些建议保存在 `40-sessions-archive/` 等归档目录中：

- 原始 session 历史
- 原始 token 文件
- 原始队列数据库
- 原始 Docker 覆盖脚本

## 4. “转换过去”到底怎么理解

你这次特别强调的是：

- 不在 Windows 装 Docker
- 重点是把 Docker 里的完整备份转换到 Windows 可用

针对 CoPaw，这里的“转换”不应理解成：

- 把 Docker 目录原样复制到 Windows 即可运行

而应理解成：

- 先把 OpenClaw Docker 数据抽象成一份 **平台无关的业务资产包**
- 再把这份资产包导入到 Windows CoPaw

真正能跨产品长期复用的，是：

- 文档
- 记忆
- 提示词
- 技能思路
- 业务脚本
- 配置映射关系

而不是：

- OpenClaw 的内部数据库
- OpenClaw 的凭据缓存
- OpenClaw 的历史运行时状态

---

## 第四部分：OpenClaw 数据到 CoPaw 的映射建议

## 建议直接映射

- OpenClaw 工作区中的业务文档
  - 映射到 CoPaw 工作目录中的知识资料
- OpenClaw 的角色/提示词文件
  - 映射到 CoPaw 的智能体设定或提示词材料
- OpenClaw 中通用型技能代码
  - 映射为 CoPaw Skills 的参考实现

## 建议人工重建

- OpenClaw 的频道配置
  - 在 CoPaw 中重新接入
- OpenClaw 的定时任务
  - 在 CoPaw 中重新建立
- OpenClaw 的模型配置
  - 在 CoPaw 中重新填写

## 建议只保留归档

- OpenClaw 的 session 原始文件
- OpenClaw 的凭据目录
- OpenClaw 的持久队列数据库
- OpenClaw 的媒体缓存

---

## 第五部分：推荐的执行顺序

### 阶段一：固定源数据

- 对当前 Docker 版 OpenClaw 做完整冷备
- 不直接在源环境上做任何破坏性变更

### 阶段二：先做中间转换包

- 从原始冷备中提取知识、提示词、技能和配置清单
- 形成 `copaw-import-bundle/`

### 阶段三：在 Windows 安装 CoPaw

- 初始化 `~/.copaw`
- 验证控制台正常

### 阶段四：导入可迁移资产

- 导入知识文件
- 导入记忆与提示词
- 导入可复用技能
- 手工重建模型、频道、定时任务

### 阶段五：保留双轨运行

- 在 CoPaw 功能完全验证前，保留原 Docker OpenClaw
- 必要时短期双跑
- 等 CoPaw 路径稳定后再考虑下线旧环境

---

## 第六部分：这条方案的现实边界

本方案适合的目标是：

- 迁移知识资产
- 迁移角色设定
- 迁移工作区资料
- 迁移技能思路
- 迁移业务脚本
- 迁移运维清单

本方案不适合承诺的目标是：

- OpenClaw 到 CoPaw 的原样无损会话导入
- OpenClaw 到 CoPaw 的原样无损认证态继承
- 不经验证就直接复用全部内部状态

如果你要的是“成功率最高”，建议优先级这样排：

1. 先按 OpenClaw 方案把 Docker 数据完整保住
2. 再按本方案把其中可迁移的资产转换给 CoPaw

这才是兼顾稳妥性和后续可维护性的路径。
