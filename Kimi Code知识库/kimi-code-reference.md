# Kimi Code CLI 参考手册

> 维护日期：2026-06-05
> 适用基线：本机当前实测 **Kimi Code 0.9.0**
> 说明：本文以本机 `kimi --help`、近期官方文档检索结果、已有使用经验为基础，作为 Kimi Code 的本地参考手册。对于文档中已提及但本机尚未实装的能力，会标注为“前瞻 / 待官方发包确认”。

---

## 1. 产品定位

Kimi Code CLI 是 MoonshotAI 的终端 Agent 工具，定位不是简单“聊天 CLI”，而是：

- 在终端中完成多步任务
- 阅读 / 编辑文件
- 执行 shell 命令
- 调用内置工具
- 以会话形式持续推进目标
- 支持 ACP、provider 管理、技能目录等扩展能力

它既可以：

- 作为**交互式 TUI Agent**使用
- 也可以：
  - 用 `-p/--prompt` 跑单轮非交互任务
  - 用 `acp` 接入外部系统
  - 用 provider / skills 体系做更复杂集成

---

## 2. 当前本机版本与升级认知

### 当前本机版本

```bash
kimi --version
```

本机当前实测：

- **0.9.0**

### 升级认知

当前本地实际观察到三层信息：

1. 教主经验口径：**`kimi update` 是官方推荐升级路径**
2. 进入 Kimi Code CLI 后，程序本身也会**自动检查更新**
3. 本机 `kimi --help` 当前显式展示的升级子命令是：
   - `kimi upgrade`

### 结论

后续应把“升级方式”理解为多入口并存，而不是单一死规定：

- **推荐认知**：`kimi update` / TUI 内自动更新检查
- **当前本机可见 CLI 子命令**：`kimi upgrade`
- **实际使用原则**：以官方当前行为和可执行结果为准，不只凭某一个帮助输出下结论

---

## 3. 安装与运行

### 常见安装方式

```bash
npm install -g @moonshot-ai/kimi-code
```

也可通过官方脚本或其他包管理器安装，但本工作区目前重点关注的是 **npm 全局安装形态**。

### 启动交互模式

```bash
kimi
```

进入 TUI，会维护当前工作目录下的上下文和会话状态。

### 非交互单轮模式

```bash
kimi -p "帮我总结这个目录的结构"
```

适合：

- 单轮查询
- 简短自动化任务
- 脚本调用
- 外层工具链包裹使用

### 继续会话

```bash
kimi -S <session_id>
kimi -C
```

- `-S`：指定会话 ID 恢复
- `-C`：继续当前工作目录上一轮会话

---

## 4. 当前本机 `kimi --help` 实测参数

以下为 2026-06-05 本机实测可见参数语义整理：

### 顶层参数

| 参数 | 说明 |
|---|---|
| `-V, --version` | 输出版本号 |
| `-S, --session [id]` | 恢复指定或交互选择历史会话 |
| `-C, --continue` | 继续当前工作目录上一轮会话 |
| `-y, --yolo` | 自动批准所有操作 |
| `--auto` | 自动权限模式，比 yolo 更克制 |
| `-m, --model <model>` | 指定本次调用模型别名 |
| `-p, --prompt <prompt>` | 非交互单轮执行并直接输出结果 |
| `--output-format <format>` | prompt 模式输出格式，如 `text`、`stream-json` |
| `--skills-dir <dir>` | 指定额外或替代的 skills 目录，可重复传入 |
| `--plan` | 启动时直接进入 plan 模式 |
| `-h, --help` | 查看帮助 |

### 顶层子命令

| 子命令 | 说明 |
|---|---|
| `export` | 导出会话为 ZIP |
| `provider` | 非交互管理模型供应商 |
| `acp` | 以 ACP server 方式运行 |
| `login` | 通过 device-code 流程登录 |
| `migrate` | 从旧版 `kimi-cli` 迁移数据到 `kimi-code` |
| `upgrade` | 当前本机帮助中可见的升级子命令 |

---

## 5. 登录、凭据与迁移

### 官方登录入口

当前建议优先认：

```bash
kimi login
```

这是明确暴露出来的正式 CLI 子命令。

### `/login` 与 `kimi login` 的区别

- `/login`：**TUI 内部斜杠命令**
- `kimi login`：**终端外部 CLI 子命令**

它们服务的是两个不同层级：

| 入口 | 场景 |
|---|---|
| `/login` | 你已经进入 Kimi Code TUI，要在会话里完成登录 |
| `kimi login` | 你在终端外部，希望直接触发官方登录流程 |

### 自动刷新登录态的实践结论

在 `tools/kimi-usage.py` 的修复中，已经把旧的：

```bash
echo /login | kimi
```

改为官方子命令调用：

```python
[kimi_cmd, "login"]
```

原因：

- Windows 下 `shell=True + 管道 + TUI` 组合脆弱
- `kimi login` 更稳定，也更符合正式接口语义

### 迁移命令

```bash
kimi migrate
```

作用：

- 将旧版 `kimi-cli` 数据迁入 `kimi-code`
- 包括可能的会话、配置、凭据、插件等

本机当前已检测到：

- `C:\Users\wxb\.kimi\.migrated-to-kimi-code`

说明迁移动作已经做过。

---

## 6. Provider、模型与扩展能力

### provider 体系

当前帮助中已经明确有：

```bash
kimi provider
```

这意味着 provider 管理已经不是附属能力，而是 CLI 顶层功能之一。

结合已有资料，可把它理解为：

- 管理不同 LLM provider
- 配置模型目录与模型来源
- 替代更早期、较旧的 `/connect` 直观念头

### 模型选择

可通过：

```bash
kimi -m <model>
```

在单次调用时切模型，而不必每次都改全局配置。

### ACP

```bash
kimi acp
```

用途：

- 将 Kimi Code 暴露为 Agent Client Protocol server
- 便于 IDE 或外部代理系统接入
- 在多智能体 / IDE 联动场景里有价值

---

## 7. 会话与导出

### 会话恢复

```bash
kimi -S <id>
kimi -C
```

适合：

- 恢复历史任务
- 延续上一次工作流
- 在相同工作目录延续上下文

### 会话导出

```bash
kimi export [sessionId]
```

适合：

- 归档
- 调试
- 备份某次对话资产

---

## 8. 本地目录与旧版数据价值判断

本机可见旧目录：

- `C:\Users\wxb\.kimi\`

其中包括：

- `sessions/`
- `plugins/`
- `logs/`
- `config.toml`
- `credentials/`
- `device_id`
- `plans/`
- `telemetry/`
- `user-history/`
- `kimi.json`
- `kimi-claw/`

### 价值分层

#### 建议保留观察

- `sessions/`：历史任务轨迹有价值
- `plugins/`：例如 `kimi-datasource`
- `logs/`：排障仍有价值
- `config.toml` / `kimi.json` / `device_id`：迁移痕迹与结构参考价值高

#### 价值偏低

- `telemetry/`
- `user-history/`
- 明显重复的兼容性凭据或缓存

### 当前策略

- 暂时**不自动清理旧目录**
- 后续若教主手动删旧目录，再由小黑协助处理旧版环境变量

---

## 9. 工作区内现有 Kimi 文档状态

当前 `kimi-project/` 已形成 Kimi 专属知识库雏形，包含：

- `README.md`
- `kimi-code-getting-started.md`
- `kimi-code-reference.md`
- `kimi-code-plugins.md`
- `kimi-datasource-plugin.md`
- `kimi-slash-commands.md`
- `updates/*.md`

### 当前维护重点

1. 修复 `kimi-code-reference.md` 乱码
2. 重写 `kimi-slash-commands.md`
3. 后续按版本持续把变更写入 `updates/`

---

## 10. 使用建议（结合本机工作流）

### 适合直接用 `kimi -p` 的场景

- 单轮搜索
- 单轮说明文档生成
- 单个代码问题
- 浏览器 / 图像 / 网页能力的简短调度

### 适合进入 TUI 的场景

- 多轮复杂任务
- 需要 slash commands
- 需要持续会话推进
- 需要 plan / yolo / session 管理

### 适合做成本地知识库的内容

- 版本变化
- 命令变化
- slash commands 演进
- provider / plugin / ACP 认知
- 迁移与排障经验

不适合沉淀到长期知识库的内容：

- 一次性临时报错
- 无法稳定复现的偶发现象
- 纯运行日志

---

## 11. 仍待后续确认的点

以下点当前仍建议保持“观察”而非绝对结论：

1. `kimi update` 与 `kimi upgrade` 的关系
   - 教主经验明确认为 `kimi update` 是官方推荐升级路径
   - 本机 `--help` 目前可见的是 `upgrade`
   - 需结合后续官方版本与文档继续验证

2. `0.10.x` 的真实发布状态
   - 升级检查提示可见
   - npm 当前尚未提供可安装对应版本
   - 属于发布链路不同步问题，后续要继续观察

3. `/connect` 到 provider 体系的正式废弃边界
   - 当前可判断为“迁移中”
   - 需要更多官方文档版本比对来定稿

---

## 12. 参考入口

- 官方文档总入口：<https://www.kimi.com/code/docs/>
- 新版 CLI 文档：<https://moonshotai.github.io/kimi-code/zh/>
- 更新日志：<https://www.kimi.com/code/docs/kimi-code-cli/release-notes/changelog.html>
- 斜杠命令参考：<https://moonshotai.github.io/kimi-code/zh/reference/slash-commands.html>
- CLI 命令参考：<https://moonshotai.github.io/kimi-code/zh/reference/kimi-command.html>
- 仓库：<https://github.com/MoonshotAI/kimi-cli>

---

> 备注：本文是“当前稳定参考底稿”。后续如官方更新斜杠命令、升级方式、provider 体系或版本发布链路，应优先在 `updates/` 下追加审计，再回写本参考文档。
