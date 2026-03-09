# iFlow 配置合并指南

## 背景

- **电脑A**：已推送配置到 `https://github.com/wjt0321/iflow-sync.git`
- **电脑B**：本地已有 iFlow 配置，需要与电脑A的配置合并
- **目标**：合并两台电脑的配置，更新远程仓库

## 前置准备

确认电脑B的代理设置（如需要）：
```powershell
git config --global http.proxy http://127.0.0.1:10808
git config --global https.proxy http://127.0.0.1:10808
```

## 步骤一：备份电脑B现有配置

```powershell
# 备份整个 .iflow 目录
Copy-Item -Path "$env:USERPROFILE\.iflow" -Destination "$env:USERPROFILE\.iflow.backup" -Recurse

# 单独备份敏感文件（这些不会被Git追踪）
Copy-Item "$env:USERPROFILE\.iflow\settings.json" "$env:USERPROFILE\settings.json.bak"
Copy-Item "$env:USERPROFILE\.iflow\iflow_accounts.json" "$env:USERPROFILE\iflow_accounts.json.bak" -ErrorAction SilentlyContinue
Copy-Item "$env:USERPROFILE\.iflow\oauth_creds.json" "$env:USERPROFILE\oauth_creds.json.bak" -ErrorAction SilentlyContinue
```

## 步骤二：克隆远程仓库到临时目录

```powershell
# 克隆到临时位置
git clone https://github.com/wjt0321/iflow-sync.git "$env:USERPROFILE\.iflow-remote"
```

## 步骤三：比较差异

```powershell
# 比较agents目录
Compare-Object (Get-ChildItem "$env:USERPROFILE\.iflow\agents" -Name) (Get-ChildItem "$env:USERPROFILE\.iflow-remote\agents" -Name)

# 比较skills目录
Compare-Object (Get-ChildItem "$env:USERPROFILE\.iflow\skills" -Name) (Get-ChildItem "$env:USERPROFILE\.iflow-remote\skills" -Name)
```

## 步骤四：合并配置（方案B推荐）

### 方案A：手动复制补充

```powershell
cd "$env:USERPROFILE\.iflow-remote"

# 复制电脑B独有的agents
$localAgents = Get-ChildItem "$env:USERPROFILE\.iflow\agents\*.md" -Name
$remoteAgents = Get-ChildItem "$env:USERPROFILE\.iflow-remote\agents\*.md" -Name
$newAgents = $localAgents | Where-Object { $_ -notin $remoteAgents }

foreach ($agent in $newAgents) {
    Copy-Item "$env:USERPROFILE\.iflow\agents\$agent" "$env:USERPROFILE\.iflow-remote\agents\"
}

# 复制电脑B独有的skills
$localSkills = Get-ChildItem "$env:USERPROFILE\.iflow\skills" -Directory -Name
$remoteSkills = Get-ChildItem "$env:USERPROFILE\.iflow-remote\skills" -Directory -Name
$newSkills = $localSkills | Where-Object { $_ -notin $remoteSkills }

foreach ($skill in $newSkills) {
    Copy-Item "$env:USERPROFILE\.iflow\skills\$skill" "$env:USERPROFILE\.iflow-remote\skills\$skill" -Recurse
}

git add .
git commit -m "合并电脑B独有配置"
git push
```

### 方案B：使用Git合并（推荐）

```powershell
cd "$env:USERPROFILE\.iflow"
git init

# 创建.gitignore
Set-Content -Path ".gitignore" -Value @"
iflow_accounts.json
oauth_creds.json
installation_id
settings.json
cache/
log/
tmp/
projects/
ide/
acp/
"@

git add .
git commit -m "电脑B本地配置"
git remote add origin https://github.com/wjt0321/iflow-sync.git
git fetch origin
git merge origin/main --allow-unrelated-histories -m "合并电脑A和电脑B的配置"

# 如有冲突，解决后：
git add .
git commit -m "解决合并冲突"
git push -u origin main
```

## 步骤五：恢复敏感文件

```powershell
Copy-Item "$env:USERPROFILE\settings.json.bak" "$env:USERPROFILE\.iflow\settings.json"
```

## 步骤六：清理临时文件

```powershell
Remove-Item "$env:USERPROFILE\.iflow-remote" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:USERPROFILE\.iflow.backup" -Recurse -Force -ErrorAction SilentlyContinue
```

## 步骤七：恢复网络设置

```powershell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 注意事项

1. 敏感文件（settings.json、oauth_creds.json、iflow_accounts.json）永不提交，已在 .gitignore 中排除
2. 合并前先备份，避免意外丢失配置
3. 同名但内容不同的skill需要手动合并

## 快速参考

| 操作 | 命令 |
|:---|:---|
| 备份配置 | `Copy-Item ~/.iflow ~/.iflow.backup -Recurse` |
| 查看差异 | `git diff origin/main` |
| 合并配置 | `git merge origin/main --allow-unrelated-histories` |
| 推送更新 | `git push` |
| 恢复代理 | `git config --global --unset http.proxy` |
