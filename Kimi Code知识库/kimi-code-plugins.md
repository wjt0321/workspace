# Kimi Code CLI — Plugins 插件系统

> 来源：https://moonshotai.github.io/kimi-code/zh/customization/plugins.html （2026-06-03 摘录）

---

## 一、概述

Plugins 把可复用的 Kimi Code CLI 能力打包成可安装单元。一个 plugin 可以：

- 添加 **Agent Skills**，在会话启动时加载指定 Skill
- 声明 **MCP servers**，提供真实工具能力

适用场景：共享工作流、连接外部服务、从官方 marketplace 安装扩展。

> ⚠️ **安全策略**：Kimi Code CLI 对 plugin 采用保守加载策略——安装 plugin **不会执行**其中的 Python、Node.js、Shell、hook 或命令脚本。

---

## 二、安装与管理

### 打开 Plugin 管理器

在 TUI 中运行：

```
/plugins
```

可以：
- 安装 plugins
- 浏览官方 marketplace
- 查看 plugin 详情
- 启用 / 禁用 plugins
- 移除 plugins
- 重载安装记录
- 管理 plugin 的 MCP servers

### 常用按键

| 按键 | 操作 |
|:---|:---|
| `Enter` 或 `→` | 打开选中项 / 安装 marketplace 选中 plugin |
| `←` | 返回上级 |
| `Space` | 多选 / 切换状态 |
| `Tab` | 切换面板焦点 |
| `Ctrl+C` | 退出管理器 |
| `r` | 重载安装记录 |
| `d` | 查看 plugin 详情 |

---

## 三、安装方式

### 方式一：从 Marketplace 安装（推荐）

1. 运行 `/plugins`
2. 选择 **Marketplace**
3. 浏览可用 plugins，选中后按 `Enter` 安装

### 方式二：从本地路径安装

```
/plugins install /path/to/plugin
```

### 方式三：从 Git 仓库安装

```
/plugins install https://github.com/user/plugin-repo.git
```

也支持安装特定子目录：

```
/plugins install https://github.com/user/monorepo.git#subdir=packages/my-plugin
```

### 方式四：从 npm 包安装

```
/plugins install @scope/plugin-name
```

---

## 四、Plugin 结构

一个 plugin 是一个包含 `kimi-plugin.json` 的目录（或 npm 包）：

```
my-plugin/
├── kimi-plugin.json    ← 必须：plugin 清单文件
├── SKILL.md            ← 可选：Agent Skill 定义
├── mcp.json            ← 可选：MCP server 配置
└── ...（其他文件）
```

### `kimi-plugin.json` 示例

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "一个示例 plugin",
  "skills": {
    "my-skill": "./SKILL.md"
  },
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["./server.js"]
    }
  }
}
```

### 字段说明

| 字段 | 必须 | 说明 |
|:---|:---:|:---|
| `name` | ✅ | Plugin 唯一标识 |
| `version` | ✅ | 语义化版本号 |
| `description` | ❌ | 简短描述 |
| `skills` | ❌ | 技能名 → SKILL.md 路径的映射 |
| `mcpServers` | ❌ | MCP server 配置，格式同 MCP 标准 |

---

## 五、Plugin 的生命周期

```
安装 → 启用 → 加载（每次会话启动）→ 运行
                    ↓
               禁用（暂停但保留）
                    ↓
               移除（彻底删除）
```

- **安装**：plugin 文件复制到本地 plugin 目录
- **启用**：plugin 的 skills 和 MCP servers 在会话启动时加载
- **禁用**：暂停 plugin，skills/MCP 不再加载，但文件保留
- **移除**：删除 plugin 文件

---

## 六、MCP Servers 管理

Plugin 可以声明 MCP servers，在 `/plugins` 管理器中可以：

- 查看每个 plugin 注册的 MCP servers
- 单独启用 / 禁用某个 MCP server
- 查看 MCP server 的运行状态

MCP servers 的配置格式与 [MCP 标准](https://modelcontextprotocol.io/) 一致。

---

## 七、与 Agent Skills 的关系

- Plugin 的 `skills` 字段指向 `SKILL.md` 文件
- 启用 plugin 后，对应的 Skill 会在**每次新会话启动时**自动加载
- 加载行为等同于在 `AGENTS.md` 中配置 Skill
- 多个 plugins 可以注册同名 skill（后加载的覆盖先加载的）

---

## 八、与 Hooks 的配合

Plugins 本身不直接包含 hooks 脚本（安全策略不允许），但 plugin 加载的 skills 可以配合全局 hooks 使用。详见 [Hooks 文档](https://moonshotai.github.io/kimi-code/zh/customization/hooks.html)。

---

## 九、实用提示

1. **Marketplace 优先级**：优先从 marketplace 安装，可获得自动更新
2. **本地开发**：插件开发时用本地路径安装，改完 `/plugins` → `r` 重载即生效
3. **安全原则**：安装前用 `d` 查看详情，确认 plugin 只注册 skills/MCP，不包含可执行脚本
4. **冲突处理**：多个 plugin 注册同名 skill 时，后安装/启用的优先

---

## 十、相关文档

| 文档 | 链接 |
|:---|:---|
| Agent Skills | https://moonshotai.github.io/kimi-code/zh/customization/skills.html |
| Hooks | https://moonshotai.github.io/kimi-code/zh/customization/hooks.html |
| Agent 与子 Agent | https://moonshotai.github.io/kimi-code/zh/customization/agents.html |
| MCP | https://moonshotai.github.io/kimi-code/zh/customization/mcp.html |
