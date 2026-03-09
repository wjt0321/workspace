# Claude Code 双电脑配置合并指南

## 概述

本文档指导如何将电脑A和电脑B的 Claude Code CLI 配置通过 Git 同步。

---

## 重要说明

**Claude Code CLI 的配置路径是用户主目录下的 `.claude` 目录：**

```
C:\Users\用户名\.claude\
```

---

## 方案说明

通过 Git 私有仓库同步配置，敏感信息（如 API Token）不会推送到远程。

**远程仓库地址：** https://github.com/wjt0321/claude-sync.git

---

## 推送的内容

| 包含 | 排除（.gitignore） |
|------|-------------------|
| skills/（所有技能） | settings.json（API Token，敏感） |
| agents/（Agent配置） | settings.local.json |
| plugins/（插件列表） | history.jsonl（对话历史） |
| config.json | cache/、transcripts/ 等 |

> ⚠️ 注意：settings.json 包含 API Token，是敏感信息，已加入 .gitignore 不会推送到远程。

---

## 电脑B：完整配置步骤

请严格按照以下步骤操作。

### 步骤一：备份当前配置（重要！）

在操作前，先备份现有的 `.claude` 目录：

```powershell
# 使用 PowerShell（以管理员身份运行）

# 1. 进入用户目录
cd C:\Users\Administrator

# 2. 备份现有配置
Copy-Item -Path ".claude" -Destination ".claude_backup" -Recurse -Force
```

### 步骤二：克隆仓库

```powershell
# 1. 删除现有的 .claude 目录（已备份，可以删除）
Remove-Item -Path ".claude" -Recurse -Force

# 2. 克隆仓库
git clone https://github.com/wjt0321/claude-sync.git .claude
```

### 步骤三：创建 .agents 目录

skills 目录下的符号链接指向 `.agents` 目录，需要确保该目录存在：

```powershell
# 1. 检查 .agents 是否存在
Test-Path "C:\Users\Administrator\.agents"

# 2. 如果不存在，创建目录
New-Item -ItemType Directory -Path "C:\Users\Administrator\.agents"
New-Item -ItemType Directory -Path "C:\Users\Administrator\.agents\skills"
```

### 步骤四：修复符号链接

将 `.claude/skills` 下的符号链接指向正确的 `.agents/skills` 目录：

```powershell
# 查看哪些是符号链接
Get-ChildItem "C:\Users\Administrator\.claude\skills" | Where-Object { $_.LinkType -eq "SymbolicLink" }

# 删除指向 /c/Users 的错误符号链接
Remove-Item "C:\Users\Administrator\.claude\skills\brainstorming" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\design-md" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\dispatching-parallel-agents" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\enhance-prompt" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\excalidraw-diagram" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\executing-plans" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\finishing-a-development-branch" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\receiving-code-review" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\Requesting-code-review" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\subagent-driven-development" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\systematic-debugging" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\test-driven-development" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\using-git-worktrees" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\using-superpowers" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\verification-before-completion" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\writing-plans" -Force
Remove-Item "C:\Users\Administrator\.claude\skills\writing-skills" -Force

# 重新创建符号链接指向 .agents/skills
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\brainstorming C:\Users\Administrator\.agents\skills\brainstorming"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\design-md C:\Users\Administrator\.agents\skills\design-md"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\dispatching-parallel-agents C:\Users\Administrator\.agents\skills\dispatching-parallel-agents"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\enhance-prompt C:\Users\Administrator\.agents\skills\enhance-prompt"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\excalidraw-diagram C:\Users\Administrator\.agents\skills\excalidraw-diagram"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\executing-plans C:\Users\Administrator\.agents\skills\executing-plans"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\finishing-a-development-branch C:\Users\Administrator\.agents\skills\finishing-a-development-branch"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\receiving-code-review C:\Users\Administrator\.agents\skills\receiving-code-review"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\Requesting-code-review C:\Users\Administrator\.agents\skills\Requesting-code-review"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\subagent-driven-development C:\Users\Administrator\.agents\skills\subagent-driven-development"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\systematic-debugging C:\Users\Administrator\.agents\skills\systematic-debugging"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\test-driven-development C:\Users\Administrator\.agents\skills\test-driven-development"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\using-git-worktrees C:\Users\Administrator\.agents\skills\using-git-worktrees"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\using-superpowers C:\Users\Administrator\.agents\skills\using-superpowers"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\verification-before-completion C:\Users\Administrator\.agents\skills\verification-before-completion"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\writing-plans C:\Users\Administrator\.agents\skills\writing-plans"
cmd /c "mklink /D C:\Users\Administrator\.claude\skills\writing-skills C:\Users\Administrator\.agents\skills\writing-skills"
```

> ⚠️ 注意：如果上面的命令报错，可以直接删除这些目录，它们只是符号链接，不影响实际功能。

### 步骤五：复制 settings.json

由于 settings.json 包含 API Token（敏感信息），不会推送到远程仓库，需要从备份中复制：

```powershell
# 从备份复制 settings.json
Copy-Item "C:\Users\Administrator\.claude_backup\settings.json" "C:\Users\Administrator\.claude\settings.json"
```

### 步骤六：验证配置

1. **重启 Claude Code**
2. 输入 `/help` 测试命令是否正常
3. 输入 `/skills` 查看技能列表是否完整

---

## 后续同步

### 电脑A：更新配置后推送

```powershell
cd C:\Users\Administrator\.claude
git add .
git commit -m "update: 更新配置"
git push
```

### 电脑B：拉取最新配置

```powershell
cd C:\Users\Administrator\.claude
git pull
```

---

## 常见问题

### Q1: 克隆后 Claude Code 无法启动？

1. 检查 `settings.json` 是否正确复制
2. 检查 JSON 格式是否正确（特别是逗号、引号）
3. 检查 API Token 是否正确填入

### Q2: skills 目录下的符号链接失效？

执行步骤四中的命令重新创建符号链接，或者直接删除这些目录（它们指向的技能已包含在仓库中）

### Q3: 如何同步新的 skill？

1. 在电脑A安装新 skill
2. 提交并推送：`git add . && git commit && git push`
3. 在电脑B拉取：`git pull`

### Q4: 推送时出现冲突？

```powershell
# 先拉取
git pull

# 如果有冲突，手动解决后提交
git add .
git commit -m "merge: 解决冲突"
git push
```

---

## 配置路径速查

| 配置项 | 路径 |
|--------|------|
| Claude Code 根目录 | `C:\Users\用户名\.claude\` |
| settings.json | `C:\Users\用户名\.claude\settings.json` |
| settings.local.json | `C:\Users\用户名\.claude\settings.local.json` |
| Skills | `C:\Users\用户名\.claude\skills\` |
| .agents 技能源码 | `C:\Users\用户名\.agents\skills\` |
