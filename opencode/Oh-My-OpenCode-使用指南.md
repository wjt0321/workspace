# Oh My OpenCode 详细使用指南

## 一、快速开始

### 1.1 启动 OpenCode

```bash
# 在任意目录启动 OpenCode
opencode

# 或指定项目目录
opencode /path/to/your/project

# 使用特定代理
opencode --agent oracle "分析这个项目的架构"

# 运行单次命令
opencode "帮我优化这段代码"
```

### 1.2 核心概念

Oh My OpenCode 是一个 AI 编程代理框架，核心特点：

- **多代理协作**: 主代理 (Sisyphus) 协调多个专业子代理
- **并行执行**: 子代理可后台并行运行，大幅提升效率
- **工具丰富**: 内置 LSP、AST、文件系统等 20+ 工具
- **Claude Code 兼容**: 支持现有 Claude Code 配置

### 1.3 魔法关键词

在任意请求中加入以下关键词激活特殊功能：

| 关键词 | 功能 |
|--------|------|
| `ultrawork` / `ulw` | 激活完整多代理并行模式 |
| `ultrathink` | 深度思考模式 |
| `ultrawork` | Sisyphus 自动分析任务并协调子代理 |

**示例**:
```
ultrawork 帮我重构这个登录模块
ulw 将项目从 React 迁移到 Vue
```

---

## 二、专业代理详解

### 2.1 Sisyphus (主代理)

**用途**: 默认主代理，负责任务规划、协调子代理、代码实现

**默认模型**: `anthropic/claude-opus-4-5`

**特点**:
- 创建详细 TODO 列表追踪进度
- 自动判断何时调用子代理
- 强制执行 TODO 持续直到任务完成
- 视觉/UI 变更自动委派给 frontend 代理

**触发时机**: 默认激活

### 2.2 Oracle (架构顾问)

**用途**: 复杂架构决策、代码审查、深度技术分析

**默认模型**: `openai/gpt-5.2`

**适用场景**:
- 系统架构设计决策
- 复杂 bug 根因分析 (2+ 次修复失败后)
- 多系统权衡分析
- 安全/性能审查

**调用方式**:
```
@oracle 帮我分析这个微服务架构的优缺点
@oracle 代码审查这段逻辑并提出改进建议
```

### 2.3 Librarian (代码库分析专家)

**用途**: 多仓库分析、官方文档查询、开源代码示例搜索

**默认模型**: `opencode/glm-4.7-free`

**工具**:
- `context7`: 官方文档查询
- `grep_app`: GitHub 代码搜索
- `gh CLI`: 仓库克隆和分析

**触发关键词**:
- "How do I use [library]?"
- "Best practice for [framework feature]"
- "Why does [external dependency] behave this way?"
- "Find examples of [library] usage"

**调用方式**:
```
@librarian 查找 React Query 官方文档中 useQuery 的用法
@librarian 帮我找一个 Vue 3 项目中 Composition API 的示例
```

### 2.4 Explore (代码探索代理)

**用途**: 快速代码库搜索和模式匹配

**默认模型**: `opencode/grok-code`

**特点**:
- 并行启动多个探索任务
- 支持 "quick" / "medium" / "very thorough" 搜索深度
- 适合查找文件、函数、配置等

**调用方式**:
```
@explore 快速查找所有认证相关的文件
@explore 非常彻底地分析这个项目的目录结构
```

### 2.5 Frontend UI/UX Engineer (前端工程师)

**用途**: 视觉、UI、UX 相关变更

**默认模型**: `opencode/glm-4.7-free`

**触发关键词** (Sisyphus 自动检测):
- style, className, tailwind
- color, background, border, shadow
- margin, padding, width, height
- flex, grid, animation, transition
- hover, responsive, font-size, icon

**调用方式**:
```
@frontend-ui-ux-engineer 美化这个登录表单的样式
@frontend-ui-ux-engineer 添加响应式布局
```

### 2.6 Document Writer (文档工程师)

**用途**: 技术文档编写

**默认模型**: `opencode/glm-4.7-free`

**调用方式**:
```
@document-writer 帮我写一个 API 文档
@document-writer 为这个项目写 README
```

### 2.7 Multimodal Looker (视觉内容分析)

**用途**: PDF、图片、图表内容分析

**默认模型**: `opencode/glm-4.7-free`

**调用方式**:
```
分析这个截图中的界面设计
从这张架构图中提取组件信息
```

---

## 三、内置工具详解

### 3.1 LSP 工具

提供完整的语言服务器协议功能：

| 工具 | 功能 |
|------|------|
| `lsp_hover` | 显示类型信息、文档、签名 |
| `lsp_goto_definition` | 跳转到符号定义 |
| `lsp_find_references` | 查找所有引用 |
| `lsp_document_symbols` | 获取文件符号大纲 |
| `lsp_workspace_symbols` | 全局搜索符号 |
| `lsp_diagnostics` | 获取错误/警告 |
| `lsp_rename` | 重命名符号 |
| `lsp_code_actions` | 获取快速修复/重构 |
| `lsp_prepare_rename` | 验证重命名操作 |

### 3.2 AST 工具

提供 25 种语言的 AST 感知代码搜索：

| 工具 | 功能 |
|------|------|
| `ast_grep_search` | AST 模式搜索 |
| `ast_grep_replace` | AST 模式替换 |

**示例**:
```bash
# 搜索所有 useState 调用
ast_grep_search --pattern 'useState($ARGS)'

# 将所有 class 替换为 className
ast_grep_replace --pattern 'class=$STR' --replacement 'className=$STR'
```

### 3.3 会话管理工具

| 工具 | 功能 |
|------|------|
| `session_list` | 列出所有会话 |
| `session_read` | 读取会话历史 |
| `session_search` | 全文本搜索 |
| `session_info` | 获取会话统计 |

### 3.4 自定义工具

| 工具 | 功能 |
|------|------|
| `call_omo_agent` | 调用专业子代理 |
| `sisyphus_task` | 基于类别的任务委派 |
| `background_task` | 后台任务执行 |
| `background_output` | 获取后台任务结果 |
| `background_cancel` | 取消后台任务 |

---

## 四、配置说明

### 4.1 配置文件位置

```
~/.config/opencode/opencode.json      # 主配置
~/.config/opencode/oh-my-opencode.json  # Oh My OpenCode 配置
.opencode/oh-my-opencode.json         # 项目级配置
```

### 4.2 插件启用

```json
{
  "plugin": [
    "oh-my-opencode"
  ]
}
```

### 4.3 代理模型覆盖

```json
{
  "agents": {
    "oracle": {
      "model": "openai/gpt-5.2-codex"
    },
    "frontend-ui-ux-engineer": {
      "model": "openai/gpt-5.2"
    }
  }
}
```

### 4.4 禁用内置功能

```json
{
  "disabled_skills": ["playwright"],
  "claude_code": {
    "mcp": false,
    "commands": false,
    "skills": false
  }
}
```

### 4.5 认证配置

#### Claude (Anthropic)
```bash
opencode auth login
# 选择 Anthropic → Claude Pro/Max
```

#### ChatGPT (需要插件)
```bash
npm install -g opencode-openai-codex-auth@4.3.0
```

#### Gemini (需要插件)
```bash
npm install -g opencode-antigravity-auth@1.2.8
```

---

## 五、常见使用场景

### 5.1 代码审查

```
@oracle 审查这个 PR 的代码，重点关注安全性和性能
@oracle 检查这段代码是否有潜在的并发问题
```

### 5.2 学习新技术

```
@librarian 帮我查找 React 18 中 concurrent mode 的官方文档
@librarian 找一个 Next.js 14 中 app router 的使用示例
```

### 5.3 项目探索

```
@explore 非常彻底地分析这个项目的认证模块
@explore 查找所有 API 端点的定义
```

### 5.4 重构和优化

```
ultrawork 重构这个单文件组件为多个小组件
ulw 帮我优化这个页面的性能
```

### 5.5 Bug 修复

```
@oracle 这个 bug 已经尝试修复 3 次都失败了，帮我分析根因
@explore 查找项目中所有的错误处理模式
```

### 5.6 文档生成

```
@document-writer 为这个 REST API 编写完整的文档
@document-writer 写一个项目贡献指南
```

### 5.7 前端开发

```
@frontend-ui-ux-engineer 重写这个按钮组件，添加 hover 和 focus 状态
@frontend-ui-ux-engineer 使用 Tailwind 重写这段 CSS
```

### 5.8 多代理并行

```
ultrawork 实现用户认证模块，同时实现支付模块
ulw 分析这个前端项目并实现一个类似的仪表盘
```

---

## 六、上下文注入规则

### 6.1 AGENTS.md 注入

OpenCode 会自动注入 AGENTS.md 文件：

```
project/
├── AGENTS.md              # 项目级上下文
├── src/
│   ├── AGENTS.md          # src 目录上下文
│   └── components/
│       ├── AGENTS.md      # components 目录上下文
│       └── Button.tsx     # 读取时注入以上所有 AGENTS.md
```

### 6.2 条件规则注入

`.claude/rules/` 目录下的规则会在条件匹配时注入：

```yaml
---
globs: ["*.ts", "src/**/*.js"]
description: "TypeScript/JavaScript 编码规范"
alwaysApply: true
---
- 使用 PascalCase 命名接口
- 使用 camelCase 命名函数
```

---

## 七、工作流最佳实践

### 7.1 简单任务

直接描述需求，Sisyphus 会处理：

```
修复这个按钮的点击事件
添加一个用户设置页面
```

### 7.2 复杂任务

使用 `ultrawork` 激活完整模式：

```
ultrawork 将这个项目从 JavaScript 迁移到 TypeScript
ulw 帮我重构登录模块并添加双因素认证
```

### 7.3 研究类任务

使用 `@librarian` 和 `@explore`：

```
@librarian 帮我查找 NestJS 官方文档中模块的用法
@explore 查找我们项目中现有的模块定义模式
```

### 7.4 架构决策

使用 `@oracle` 获取专业建议：

```
@oracle 帮我分析是否应该使用微服务架构
@oracle 这个数据访问层的设计有什么问题
```

---

## 八、故障排除

### 8.1 常见问题

| 问题 | 解决方案 |
|------|----------|
| 代理无响应 | 使用 `session_interrupt` 中断当前任务 |
| 认证失败 | 运行 `opencode auth login` 重新认证 |
| 响应慢 | 使用 `opencode serve` 避免 MCP 冷启动 |
| 内存占用高 | 减少 MCP 服务器数量 |

### 8.2 调试命令

```bash
# 查看配置
opencode debug config

# 查看路径
opencode debug paths

# 查看代理配置
opencode debug agent oracle

# 调试 MCP
opencode mcp debug <name>

# 列出可用代理
opencode agent list

# 列出可用模型
opencode models
```

### 8.3 卸载 Oh My OpenCode

```bash
# 从 package.json 移除
cd ~/.config/opencode
npm uninstall oh-my-opencode

# 从配置中移除插件
# 编辑 opencode.json，删除 "oh-my-opencode"
```

---

## 九、资源链接

- **官方仓库**: https://github.com/code-yeongyu/oh-my-opencode
- **文档**: https://github.com/code-yeongyu/oh-my-opencode#readme
- **问题反馈**: https://github.com/code-yeongyu/oh-my-opencode/issues
- **更新日志**: https://github.com/code-yeongyu/oh-my-opencode/releases

---

## 十、进阶技巧

### 10.1 自定义代理

在 `.claude/agents/` 目录下添加 Markdown 文件定义自定义代理：

```markdown
# MyCustomAgent

**用途**: 自定义任务

**模型**: anthropic/claude-sonnet-4-5

**提示词**:
你是一个...
```

### 10.2 自定义命令

在 `.claude/commands/` 目录下添加 Markdown 文件：

```markdown
# /mycommand

执行自定义任务
```

### 10.3 技能加载

在 `.claude/skills/` 目录下创建技能：

```
.claude/skills/my-skill/
├── SKILL.md      # 技能定义
└── ...           # 相关文件
```

---

**Happy Coding! 🚀**

如有问题，请查看官方文档或提交 Issue。
