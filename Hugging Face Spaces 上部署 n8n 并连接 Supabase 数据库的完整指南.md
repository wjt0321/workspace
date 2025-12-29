---
tags:
  - n8n
  - Agent
title: n8n新手入门教程
created: 2025-11-29
source: Cherry Studio
---
# 🎯 将 n8n 部署在 Hugging Face Spaces 上

💡 这是一个非常棒的想法！将 n8n 部署在 Hugging Face Spaces 上，并连接到 Supabase 数据库，可以为你创建一个免费、强大且可公开访问的自动化工作流中心。

✨ 这个方案的核心是利用 Hugging Face Spaces 的免费 GPU/CPU 资源来运行 n8n，同时使用 Supabase 作为后端数据库来存储工作流、凭证和执行历史。

📝 下面我将为你提供一个详细的、分步的实施方案。

─── ❖ ───

## 📋 方案概述

### 1️⃣ Hugging Face Spaces
作为 n8n 的托管环境。我们将使用 Docker 容器来部署，这样可以精确控制 n8n 的版本和配置。

### 2️⃣ Supabase
作为 n8n 的外部数据库。我们将创建一个 Supabase 项目，配置好数据库，并将连接信息提供给 n8n。

### 3️⃣ 连接
通过环境变量，让运行在 Hugging Face Space 中的 n8n 实例知道如何连接到你的 Supabase 数据库。

─── ❖ ───

## 🗄️ 第一步：在 Supabase 中设置数据库

### 1️⃣ 创建 Supabase项目
- 访问 https://supabase.com/ 并注册一个免费账户。
- 点击 "New Project"，创建一个新项目。选择一个组织，设置项目名称和数据库密码（**请务必记住这个密码！**）。

### 2️⃣ 获取数据库连接信息
- 项目创建完成后，进入项目的 Dashboard。
- 在左侧菜单中，点击 Settings > Database。
- 向下滚动找到 Connection string 区域。
- 选择 URI，然后点击 "Copy" 按钮。这个字符串长这样：
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
  ```
- **重要提示**: Supabase 的 `Connection pooling` 功能对于像 n8n 这样需要频繁建立数据库连接的应用非常有用，可以防止单个应用耗尽数据库连接数。建议使用 `Connection pooling` 的连接字符串。在 `Connection string` 页面，选择 `Connection pooling` -> `Session mode`，然后复制那个 URI。它看起来像这样：
  ```
  postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
  ```

### 3️⃣ 配置数据库 SSL 模式（可选但推荐）
- Supabase 的连接字符串默认包含 `sslmode=require`。这是安全的。在某些情况下，你可能需要调整 SSL 设置，但对于大多数应用，默认设置即可。

ℹ️ 现在，你已经有了 Supabase 数据库的连接字符串，先把它保存在一个安全的地方。

─── ❖ ───

## 🚀 第二步：在 Hugging Face Spaces 上部署 n8n

我们将使用 Docker 部署，因为这是最灵活和可靠的方式。

### 1️⃣ 创建一个新的 Space
- 访问 https://huggingface.co/ 并登录。
- 点击你的头像，选择 "New Space"。
- **Space name**: 给你的 Space 起一个名字，例如 `my-n8n-automation`。
- **License**: 选择一个开源许可证，如 `MIT`。
- **Space Hardware**: 选择免费的 **CPU Basic** (对于大多数 n8n 工作流已足够) 或 **CPU Upgrade**。如果你的工作流涉及大量计算，可以选择 **T4 GPU** (免费)。
- **SDK**: 选择 **Docker**。这是关键！
- 勾选 "Make this a public space"（如果你想公开访问）。
- 点击 "Create Space"。

### 2️⃣ 准备配置文件
- 创建好 Space 后，你会进入一个代码编辑界面。你需要创建三个文件：`Dockerfile`, `requirements.txt` (虽然这里可能用不到，但这是个好习惯), 以及 `.env` (用于本地测试，我们会在 Space 设置中配置环境变量)。

### 3️⃣ 编写 `Dockerfile`
- 在编辑器中，点击 "Add file" -> "Create a new file"，命名为 `Dockerfile`。
- 将以下内容粘贴进去。这个 `Dockerfile` 做了三件事：
  1. 使用官方的 n8n 镜像。
  2. 安装 `Supabase` Python 客户端库，这样 n8n 就可以通过原生节点连接 Supabase (虽然我们这里是用它作为后端 DB)。
  3. 启动 n8n。

```dockerfile
# 使用官方的 n8n 镜像
FROM n8nio/n8n:latest

# 设置工作目录
WORKDIR /data

# (可选) 安装 Python 客户端，以备后续在 n8n 工作流中直接连接 Supabase
# 这不是作为后端数据库所必需的，但强烈推荐
RUN npm install -g @supabase/supabase-js

# n8n 默认会暴露端口 5678，Hugging Face Spaces 会自动处理端口转发
# 我们不需要在这里写 EXPOSE 5678，但知道这一点有好处

# 启动 n8n。我们使用 `npx n8n start` 而不是直接运行，因为这样更灵活。
# --tunnel 不需要，因为 Hugging Face 提供了公共 URL
CMD ["npx", "n8n", "start"]
```

### 4️⃣ 编写 `README.md`
- 在编辑器中，创建一个 `README.md` 文件。这会显示在你的 Space 页面上。
- 可以简单写一下这个 Space 的用途。

```markdown
---
title: n8n Automation Hub
emoji: 🤖
colorFrom: blue
colorTo: pink
sdk: docker
pinned: false
license: mit
---

# My n8n Automation Hub

This is a public instance of n8n, deployed on Hugging Face Spaces, using Supabase as its backend database.
```

─── ❖ ───

## 🔗 第三步：连接 n8n 与 Supabase

这是最关键的一步，通过环境变量来实现。

### 1️⃣ 在 Hugging Face Space 中配置环境变量
- 在你的 Space 页面，点击顶部的 **Settings** 标签页。
- 向下滚动找到 **Repository secrets** 或 **Environment variables** 部分。
- 点击 "New secret" 或 "Add variable"。

### 2️⃣ 添加必要的环境变量
- **`DB_TYPE`**: 设置为 `postgresdb`。这告诉 n8n 要使用 PostgreSQL 数据库。
- **`DB_POSTGRESDB_HOST`**: 从你的 Supabase 连接字符串中解析出来的主机名。例如：`db.[PROJECT-REF].supabase.co` 或 `aws-0-[region].pooler.supabase.co`。
- **`DB_POSTGRESDB_PORT`**: 数据库端口，通常是 `5432` (直连) 或 `6543` (连接池)。
- **`DB_POSTGRESDB_DATABASE`**: 数据库名称，通常是 `postgres`。
- **`DB_POSTGRESDB_USER`**: 用户名，通常是 `postgres` (直连) 或 `postgres.[PROJECT-REF]` (连接池)。
- **`DB_POSTGRESDB_PASSWORD`**: 你在创建 Supabase 项目时设置的数据库密码。
- **`N8N_BASIC_AUTH_ACTIVE`**: 设置为 `true`。为了安全，必须启用基础认证！
- **`N8N_BASIC_AUTH_USER`**: 设置你想要的登录用户名，例如 `admin`。
- **`N8N_BASIC_AUTH_PASSWORD`**: 设置一个强密码。

📊 **示例配置**:
| Variable Name | Value | Example |
|---|---|---|
| `DB_TYPE` | `postgresdb` | |
| `DB_POSTGRESDB_HOST` | `aws-0-us-east-1.pooler.supabase.co` | |
| `DB_POSTGRESDB_PORT` | `6543` | |
| `DB_POSTGRESDB_DATABASE` | `postgres` | |
| `DB_POSTGRESDB_USER` | `postgres.abcdefg` | |
| `DB_POSTGRESDB_PASSWORD` | `Your_Supabase_DB_Password` | |
| `N8N_BASIC_AUTH_ACTIVE` | `true` | |
| `N8N_BASIC_AUTH_USER` | `my-secure-user` | |
| `N8N_BASIC_AUTH_PASSWORD`| `a-very-strong-password` | |

### 3️⃣ 提交并构建
- 添加完所有环境变量后，返回到 Space 的主页面。
- Hugging Face 会自动检测到 `Dockerfile` 的变化并开始构建。这个过程可能需要几分钟。
- 你可以在 "Building app" 标签页中查看构建日志。

─── ❖ ───

## ✅ 第四步：验证与使用

### 1️⃣ 等待构建完成
- 当构建成功后，你的 Space 页面会显示一个 "App" 区域，里面有一个可点击的 URL。

### 2️⃣ 访问你的 n8n 实例
- 点击这个 URL。它可能会将你重定向到一个 `...huggingface.space` 的地址。
- 你应该会看到 n8n 的登录界面。

### 3️⃣ 登录
- 使用你之前在环境变量 `N8N_BASIC_AUTH_USER` 和 `N8N_BASIC_AUTH_PASSWORD` 中设置的用户名和密码进行登录。

### 4️⃣ 创建你的第一个工作流
- 登录成功！你现在可以开始创建工作流了。
- **验证数据库连接**: 你可以在 Supabase 的 **Table Editor** 中查看 `public` schema。n8n 会自动创建几张表（如 `workflow_entity`, `credentials_entity` 等）。当你创建第一个工作流并保存后，你应该能在 Supabase 中看到 `workflow_entity` 表里出现了新数据。这证明连接成功了！

### 5️⃣ 在工作流中连接 Supabase
- 现在，你不仅将 Supabase 用作后端，还可以在 n8n 工作流中通过 "Supabase" 节点来操作你的 Supabase 数据（增删改查）。
- 为此，你需要在 n8n 中创建一个新的 "Supabase API Credential"。
- 你需要从你的 Supabase 项目设置中获取 **API URL** 和 **Service Role Key** (`Settings` > `API`)。
- 将这些信息填入 n8n 的凭证中，就可以在工作流里自由使用 Supabase 了。

─── ❖ ───

## 📝 总结与注意事项

### ⚠️ 免费资源限制
- Hugging Face 的免费 Space 有运行时长和内存限制。如果长时间没有活动，它可能会进入休眠状态，再次访问时需要一点时间来唤醒。对于高频或长时间运行的自动化任务，请留意这一点。

### 🔒 安全
- **必须启用基础认证** (`N8N_BASIC_AUTH_ACTIVE=true`)，否则任何人都能访问你的 n8n 实例。
- 在 n8n 中存储 API 密钥等凭证时，使用 n8n 的 "Credentials" 功能，而不是直接写在工作流代码里。
- 你的 Supabase 连接字符串包含密码，请妥善保管。

### 💾 持久化
- n8n 的所有数据（工作流、凭证、执行历史）都存储在 Supabase 中，而不是在 Hugging Face Space 的临时文件系统里。这意味着即使 Space 重建或休眠，你的数据也不会丢失。这正是使用外部数据库的核心优势。

### 🔄 更新
- 当 n8n 发布新版本时，你只需要修改 `Dockerfile` 中的 `FROM n8nio/n8n:latest` 为具体版本号（如 `FROM n8nio/n8n:1.23.1`），然后提交更改，Hugging Face 就会自动重新构建和部署新版本。

🎉 恭喜你！你现在拥有了一个在云端免费运行、数据持久化、且可公开访问（或私有）的 n8n 自动化平台了。