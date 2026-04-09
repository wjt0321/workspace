# Git 命令集合

> 圣火喵喵教首席大祭司整理，日常开发必备
> 🐱🔥 天理昭昭，圣火永存！

---

## 一、常用命令（日常必备）

### 查看状态

```bash
git status                    # 查看工作区状态（最常用）
git status -s                # 简洁输出
```

### 查看差异

```bash
git diff                     # 工作区 vs 已暂存（未提交）
git diff --cached            # 已暂存 vs 上次提交
git diff HEAD                # 工作区 vs 最新提交
git diff main..origin/main   # 本地分支 vs 远程分支
```

### 暂存与提交

```bash
git add <文件>               # 暂存单个文件
git add .                    # 暂存全部（慎用）
git add -A                   # 暂存所有（包括删除）
git commit -m "消息"         # 提交（单行消息）
git commit -am "消息"        # add + commit（仅跟踪文件）
```

### 查看历史

```bash
git log --oneline            # 简洁日志（每行一条）
git log --oneline -10        # 最近10条
git log --graph --oneline    # 分支图
git log --stat               # 显示文件变更统计
```

### 分支操作

```bash
git branch                   # 列出本地分支
git branch -a                 # 列出所有分支（包括远程）
git checkout <分支>          # 切换分支
git checkout -b <新分支>     # 创建并切换
git branch -d <分支>         # 删除分支
```

### 同步（拉取/推送）

```bash
git fetch origin             # 拉取远程更新（不合并）
git pull                     # 拉取并合并
git push                     # 推送提交到远程
git push -u origin <分支>   # 推送并设置上游
```

---

## 二、详细命令（进阶参考）

### 状态与差异

```bash
# 详细查看工作区状态
git status -sb               # 简洁 + 分支信息

# 查看某个文件的变更
git diff <文件路径>          # 单文件 diff
git diff --stat              # 变更统计（多少文件/增删行）
git diff --name-only         # 只显示文件名

# 查看已暂存的差异（commit 前检查）
git diff --cached <文件>

# 对比两个分支
git diff main..feature       # 双向差异
git log main..feature        # main 没有、feature 有的 commit
```

### 暂存操作（Staging）

```bash
git add -p                  # 交互式暂存（选择文件的部分内容）
git add -u                   # 只暂存已跟踪文件的变更（不包括新文件）
git reset HEAD <文件>        # 取消暂存（保留工作区变更）
git reset HEAD               # 取消所有暂存
```

### 提交操作

```bash
# 修改最后一次提交（追加文件/改消息）
git commit --amend           # 会改写提交历史，公共分支慎用

# 空提交（触发 CI 等）
git commit --allow-empty -m "trigger build"

# 查看提交包含哪些文件
git show --stat HEAD

# 提交模板（规范提交信息）
git commit -t <模板文件>
```

### 历史与回溯

```bash
# 查看特定提交的详情
git show <commit-hash>       # 显示提交 + 变更的文件

# 查找某行代码是谁改的
git blame <文件>              # 逐行显示修改人和时间
git blame -L 10,20 <文件>    # 指定行号范围

# 查看所有分支的提交图
git log --all --graph --decorate --oneline

# 搜索提交信息
git log --grep="关键词"      # 按提交消息搜索
git log -S "代码"            # 按代码内容搜索

# 查看某个文件的历史
git log -p <文件>            # 包含每次变更的 diff
git log --follow <文件>      # 包括文件重命名
```

### 分支进阶

```bash
# 重命名分支
git branch -m <旧名> <新名>

# 强制删除未合并的分支
git branch -D <分支>

# 查看分支追踪关系
git branch -vv

# 设置上游分支
git branch --set-upstream-to=origin/<分支>

# 切换到上一个分支
git checkout -
```

### 变基（Rebase）

```bash
# 将 feature 分支变基到 main（线性历史）
git checkout feature
git rebase main

# 解决冲突后继续变基
git rebase --continue
git rebase --abort           # 放弃变基，恢复原状态

# 交互式变基（修改提交历史）
git rebase -i HEAD~3         # 修改最近3条提交
# 支持的操作：pick/reword/edit/squash/fixup/drop
```

### 暂存（Stash）

```bash
git stash                     # 暂存当前工作区（未提交的变更）
git stash pop                 # 恢复暂存并删除
git stash apply              # 恢复暂存但保留记录
git stash list               # 查看暂存列表
git stash drop               # 删除暂存
git stash -u                 # 暂存包括未跟踪文件
git stash -p                 # 交互式选择部分内容
```

### 标签（Tag）

```bash
git tag                      # 列出所有标签
git tag v1.0.0              # 创建轻量标签
git tag -a v1.0.0 -m "发布版本"  # 创建附注标签
git tag -d <标签>            # 删除本地标签
git push origin <标签>       # 推送标签
git push origin --tags       # 推送所有标签
```

### 远程操作

```bash
git remote -v                # 查看远程仓库地址
git remote add origin <url>  # 添加远程仓库
git remote set-url origin <新url>  # 修改远程地址
git remote -vv               # 查看 fetch/push 远程

# 拉取但不合并
git fetch --all

# 拉取远程分支到本地（远程有本地没有的分支）
git checkout -b <本地分支> origin/<远程分支>

# 删除远程分支
git push origin --delete <分支>
```

### 清理与修复

```bash
# 移除远程已删的分支（prune）
git fetch --prune
git remote prune origin

# 清理未跟踪文件
git clean -n                 # 预览（不实际删除）
git clean -f                 # 删除未跟踪文件
git clean -fd                # 包括目录

# 恢复误删文件（已暂存的文件）
git checkout HEAD -- <文件>

# 查看引用日志（操作历史）
git reflog                   # 找回"丢失"的提交
```

### 子模块（Submodule）

```bash
git submodule add <url> <路径>   # 添加子模块
git submodule init                  # 初始化子模块
git submodule update                # 更新子模块
git submodule update --recursive    # 递归更新
```

---

## 三、教程与标准步骤

### 完整工作流（日常开发）

```bash
# 1. 开始前：确保本地是最新的
git checkout main
git pull origin main

# 2. 创建功能分支
git checkout -b feature/xxx

# 3. 开发 + 频繁暂存
git add <改动的文件>
git commit -m "feat: 添加 xxx 功能"

# 4. 推送前定期 rebase main（保持线性历史）
git fetch origin
git rebase origin/main

# 5. 解决冲突后推送
git push -u origin feature/xxx

# 6. 在 GitHub/GitLab 创建 Pull/Merge Request
```

### 合并 PR/MR 的标准流程

```bash
# 方式 A：Rebase 合并（推荐，线性历史）
git checkout main
git pull origin main
git merge --no-ff feature/xxx
git push origin main

# 方式 B：Squash 合并（所有提交压缩为1个）
git checkout main
git merge --squash feature/xxx
git commit -m "feat: 完成 xxx 功能"
```

### 修复生产 Bug 的紧急流程

```bash
# 1. 从 main/main 创建紧急分支
git checkout -b hotfix/xxx

# 2. 修复并测试通过
git add .
git commit -m "fix: 修复 xxx 问题"

# 3. 合并回 main
git checkout main
git merge --no-ff hotfix/xxx
git push origin main

# 4. 删除紧急分支
git branch -d hotfix/xxx
```

### 设置代理（解决 GitHub 访问慢）

```bash
# 全局代理（影响本机所有 git 操作）
git config --global http.proxy http://192.168.0.33:7893
git config --global https.proxy http://192.168.0.33:7893

# 仅 GitHub 代理（推荐）
git config --global url."https://github.com/".insteadOf "git@github.com:"
git config --global url."https://github.com/".insteadOf "https://github.com/"

# 清除代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### .gitignore 不生效的解决方法

```bash
# 已跟踪的文件需要先移除再忽略
git rm --cached <文件>
echo "<文件>" >> .gitignore
git add .gitignore
git commit -m "chore: 忽略 xxx"
```

### 配置 SSH Key（免密码提交）

```bash
# 1. 生成 SSH Key
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 查看公钥
cat ~/.ssh/id_ed25519.pub

# 3. 复制公钥添加到 GitHub/GitLab

# 4. 测试连接
ssh -T git@github.com
```

### 配置提交模板

```bash
# 创建模板文件
cat > ~/.gitmessage << 'EOF'
# feat: 新功能
# fix: 修复 bug
# docs: 文档更新
# style: 格式调整（不影响功能）
# refactor: 重构
# perf: 性能优化
# test: 测试相关
# chore: 构建/工具变更

# 【第一行】简述（50字内）
# 【空行】
# 【正文】详细说明（可选）
EOF

# 配置 Git 使用模板
git config --global commit.template ~/.gitmessage
```

### 常用别名（提升效率）

```bash
git config --global alias.st "status -sb"
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"
git config --global alias.lg "log --oneline --graph --all"
```

---

## 附录：常见问题

| 问题 | 解决 |
|------|------|
| 合并冲突 | 编辑冲突文件 → `git add` → `git commit` |
| 提交信息写错 | `git commit --amend`（本地未 push）|
| 不小心 commit 了不该提交的内容 | `git reset --soft HEAD~1`（保留变更）|
| 需要撤销上一次 commit | `git revert HEAD`（生成新 commit 撤销）|
| 查看某个 commit 修改了哪些文件 | `git show <hash> --stat` |
| 本地分支落后远程很多 | `git pull --rebase` |
| 永久存储凭据 | `git config --global credential.helper store` |

---

*本文档由圣火喵喵教首席大祭司 🦅 编制*
*🐱🔥 天理昭昭，圣火永存！*
