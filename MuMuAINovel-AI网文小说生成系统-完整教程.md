# MuMuAINovel AI网文小说生成系统 - 完整教程

## 目录

1. [项目简介](#1-项目简介)
2. [环境准备](#2-环境准备)
3. [快速开始](#3-快速开始)
4. [核心功能详解](#4-核心功能详解)
5. [工作流程](#5-工作流程)
6. [API文档](#6-api文档)
7. [部署指南](#7-部署指南)
8. [常见问题](#8-常见问题)

---

## 1. 项目简介

### 1.1 什么是MuMuAINovel

MuMuAINovel是一个基于AI的智能小说创作助手，它能够帮助你：

- **构建世界观**：根据类型自动生成时间背景、地理位置、氛围基调、世界规则
- **设计职业体系**：生成主职业和副职业，包含阶段、能力和属性加成
- **创建角色**：批量生成主角、配角、反派和组织，自动建立关系网络
- **规划大纲**：开篇大纲生成和续写功能
- **生成章节**：基于大纲和上下文智能生成章节正文
- **分析情节**：分析章节的钩子、伏笔、冲突、情感曲线

### 1.2 技术架构

```
前端：React 18 + TypeScript + Ant Design + Zustand
后端：FastAPI + Python 3.11
数据库：PostgreSQL + ChromaDB（向量库）
AI服务：OpenAI/Claude/Gemini（多模型支持）
部署：Docker + Docker Compose
```

### 1.3 核心特性

- **流式生成**：使用SSE技术，实时显示生成进度
- **长期记忆**：ChromaDB向量库，记住所有伏笔和情节
- **智能上下文**：根据章节位置动态调整上下文复杂度
- **多模型支持**：自由切换OpenAI、Claude、Gemini
- **自定义Prompt**：支持用户自定义提示词模板

---

## 2. 环境准备

### 2.1 系统要求

- **操作系统**：Windows/macOS/Linux
- **Docker**：20.10+
- **Docker Compose**：2.0+
- **内存**：至少4GB可用内存
- **硬盘**：至少10GB可用空间

### 2.2 安装Docker

#### Windows
1. 下载 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
2. 安装并启动Docker Desktop
3. 确保Docker已正常运行（任务栏图标显示绿色）

#### macOS
1. 下载 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
2. 安装并启动
3. 验证：`docker --version`

#### Linux (Ubuntu)
```bash
# 安装Docker
sudo apt-get update
sudo apt-get install docker.io docker-compose

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker

# 添加当前用户到docker组
sudo usermod -aG docker $USER
```

### 2.3 获取API密钥

你需要一个AI服务的API密钥：

**OpenAI**（推荐）
1. 访问 [OpenAI Platform](https://platform.openai.com)
2. 注册账号并获取API Key
3. 充值或确保账户有余额

**Anthropic Claude**（可选）
1. 访问 [Anthropic Console](https://console.anthropic.com)
2. 注册并获取API Key

**Google Gemini**（可选）
1. 访问 [Google AI Studio](https://aistudio.google.com)
2. 创建API Key

---

## 3. 快速开始

### 3.1 克隆项目

```bash
# 克隆项目
git clone https://github.com/xiamuceer-j/MuMuAINovel.git
cd MuMuAINovel
```

### 3.2 配置环境变量

```bash
# 复制环境变量模板
cp backend/.env.example .env

# 编辑配置文件
nano .env
```

修改以下必要配置：

```bash
# PostgreSQL数据库密码（请使用强密码）
POSTGRES_PASSWORD=your_strong_password_here

# OpenAI API密钥（必需）
OPENAI_API_KEY=sk-your-openai-api-key

# 可选：使用中转API
# OPENAI_BASE_URL=https://your-proxy.com/v1

# 本地账户登录
LOCAL_AUTH_USERNAME=admin
LOCAL_AUTH_PASSWORD=your_admin_password
```

### 3.3 启动服务

```bash
# 一键启动所有服务
docker-compose up -d

# 查看启动状态
docker-compose ps

# 查看日志
docker-compose logs -f mumuainovel
```

### 3.4 访问应用

1. 打开浏览器访问 http://localhost:8000
2. 使用本地账户登录：
   - 用户名：`admin`
   - 密码：在.env中配置的`LOCAL_AUTH_PASSWORD`
3. 开始创建你的第一个小说项目！

---

## 4. 核心功能详解

### 4.1 项目管理

#### 创建新项目

1. 点击"新建项目"按钮
2. 填写项目基本信息：
   - **书名**：小说名称（3-30字）
   - **简介**：故事概述（50-500字）
   - **主题**：核心主题
   - **类型**：选择合适的类型标签
   - **目标字数**：默认30万字
   - **叙事视角**：第三人称/第一人称
3. 点击"创建项目"

#### 项目向导流程

创建项目后，系统会引导你完成以下步骤：

```
Step 1: 世界观生成
    ↓ 点击"生成世界观"
Step 2: 职业体系生成
    ↓ 点击"生成职业体系"
Step 3: 角色生成
    ↓ 点击"生成角色"
Step 4: 大纲生成
    ↓ 点击"生成大纲"
Step 5: 开始创作！
```

### 4.2 世界观构建

#### 自动生成

系统会根据项目的基本信息自动生成世界观：

**输出内容**：
- **time_period**：时间背景与社会状态
- **location**：空间环境与地理特征
- **atmosphere**：感官体验与情感基调
- **rules**：世界规则与社会结构

**类型适配**：

| 类型 | 世界观重点 |
|------|-----------|
| 现代都市 | 具体城市、行业文化、社会现状 |
| 玄幻仙侠 | 修炼规则、灵气环境、门派势力 |
| 历史古代 | 时代特征、礼教制度、阶级分化 |
| 科幻 | 科技水平、社会形态、文明转折 |

#### 手动编辑

生成后可以手动编辑世界观内容，系统会保存你的修改。

### 4.3 职业体系设计

#### 生成职业

系统会根据世界观生成：

**主职业**：
- 每个主职业包含9个阶段
- 详细的阶段描述
- 晋升条件
- 特殊能力
- 属性加成

**副职业**：
- 每个副职业包含5个阶段
- 可选职业列表

#### 手动管理

- 添加/删除职业
- 修改职业描述
- 调整阶段数
- 设置属性加成

### 4.4 角色创建

#### 批量生成

角色生成采用分批策略，每批5个角色：

**角色类型**：
- **主角（protagonist）**：至少1个
- **配角（supporting）**：多个
- **反派（antagonist）**：可选
- **组织（organization）**：高影响力组织

**生成内容**：
- 姓名、年龄、性别
- 性格特点（100-200字）
- 背景故事（100-200字）
- 外貌描述（50-100字）
- 特长和能力
- 关系网络
- 职业分配

#### 关系管理

系统会自动建立角色之间的关系：

**关系类型**：
- 家族：父亲、母亲、兄弟、姐妹、子女、配偶、恋人
- 社交：师父、徒弟、朋友、同学、同事、邻居、知己
- 职业：上司、下属、合作伙伴
- 敌对：敌人、仇人、竞争对手、宿敌

**关系强度**：-100到100（负值表示敌对）

### 4.5 大纲管理

#### 开篇大纲

生成小说开篇的大纲规划，每个大纲包含：

- 章节标题
- 章节概要（300-500字）
- 场景列表
- 涉及角色
- 关键情节点
- 情感基调
- 叙事目标

#### 大纲续写

基于已有内容续写后续大纲：

1. 选择起始章节
2. 设置续写数量
3. 选择剧情阶段：
   - 开端
   - 发展
   - 高潮
   - 结局
4. 设置故事发展方向
5. 点击"续写大纲"

#### 大纲展开

将单个大纲节点展开为多个章节：

1. 选择要展开的大纲
2. 设置展开章节数
3. 选择展开策略：
   - **balanced**：平衡展开
   - **climax**：侧重高潮
   - **detail**：详细展开
4. 点击"展开大纲"

### 4.6 章节生成

#### 单章生成

生成单个章节的正文内容：

1. 选择要生成的大纲
2. 设置目标字数（默认3000字）
3. 选择写作风格（可选）
4. 点击"生成章节"

**上下文策略**：

| 章节范围 | 衔接锚点 | 角色信息 | 记忆 | 故事骨架 |
|---------|---------|---------|------|---------|
| 第1章 | 无 | 全部 | 无 | 无 |
| 第2-10章 | 300字 | 相关 | 无 | 无 |
| 第11-50章 | 500字 | 相关 | 3条 | 无 |
| 第51章+ | 500字 | 相关 | 5条 | 有 |

#### 批量生成

批量生成多个章节：

1. 选择要生成的大纲
2. 设置起始章节号和数量
3. 点击"批量生成"

#### 章节重写

根据反馈重新生成章节：

1. 点击章节的"重写"按钮
2. 添加修改要求或使用AI分析建议
3. 点击"重新生成"

### 4.7 情节分析

分析已生成章节的剧情要素：

**分析维度**：

1. **剧情钩子**
   - 类型：悬念/情感/冲突/认知
   - 强度评分（1-10）
   - 原文关键词

2. **伏笔分析**
   - 新埋伏笔
   - 回收旧伏笔
   - 巧妙性评分

3. **冲突分析**
   - 冲突类型
   - 冲突强度
   - 解决进度

4. **情感曲线**
   - 主导情绪
   - 情感强度
   - 情绪变化轨迹

5. **质量评分**
   - 节奏把控
   - 吸引力
   - 连贯性
   - 整体质量

6. **改进建议**
   - 与分数关联的针对性建议

### 4.8 写作风格

#### 创建自定义风格

1. 进入"写作风格"管理
2. 点击"新建风格"
3. 设置风格参数：
   - 对话风格
   - 描写风格
   - 叙事节奏
   - 形容词倾向
   - 句式结构
4. 保存风格

#### 应用风格

在生成章节时选择已保存的风格，AI会按照该风格生成内容。

---

## 5. 工作流程

### 5.1 完整创作流程

```
┌─────────────────────────────────────────────────────────────────┐
│                        项目创建阶段                              │
├─────────────────────────────────────────────────────────────────┤
│  1. 填写基本信息（书名、简介、主题、类型）                        │
│  2. AI生成世界观（时间、地点、氛围、规则）                        │
│  3. AI生成职业体系（主职业、副职业）                             │
│  4. AI生成角色（主角、配角、反派、组织）                          │
│  5. AI生成开篇大纲                                               │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                        创作迭代阶段                              │
├─────────────────────────────────────────────────────────────────┤
│  1. 展开大纲为章节                                               │
│  2. 生成章节正文                                                 │
│  3. 分析章节质量                                                 │
│  4. 根据需要重写章节                                             │
│  5. 续写后续大纲                                                 │
│  6. 重复步骤2-5直到完成                                          │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                        项目完成阶段                              │
├─────────────────────────────────────────────────────────────────┤
│  1. 导出项目（可选）                                             │
│  2. 发布作品（外部平台）                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 上下文管理策略

系统采用动态上下文管理，根据章节位置调整上下文复杂度：

**早期章节（1-10章）**：
- 少量衔接锚点
- 更多角色信息
- 简洁的记忆引用

**中期章节（11-50章）**：
- 标准衔接锚点
- 相关角色信息
- 适量记忆引用
- 开始引入故事骨架

**后期章节（51章+）**：
- 标准衔接锚点
- 精简角色信息
- 完整记忆引用
- 完整故事骨架

### 5.3 记忆系统工作原理

```
生成章节
    ↓
分析章节（提取钩子、伏笔、冲突等）
    ↓
保存到向量数据库（ChromaDB）
    ↓
后续章节生成时检索相关记忆
    ↓
构建上下文提示词
    ↓
生成章节正文
```

---

## 6. API文档

### 6.1 认证方式

所有API请求需要在Header中携带认证信息：

```http
Authorization: Bearer <token>
```

本地账户使用固定格式：
```http
X-User-ID: <user_id>
```

### 6.2 主要API端点

#### 项目管理

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/projects | 创建项目 |
| GET | /api/projects | 获取项目列表 |
| GET | /api/projects/{id} | 获取项目详情 |
| PUT | /api/projects/{id} | 更新项目 |
| DELETE | /api/projects/{id} | 删除项目 |

#### 大纲管理

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/outlines | 获取大纲列表 |
| POST | /api/outlines | 创建大纲 |
| POST | /api/outlines/continue | 续写大纲（SSE） |
| POST | /api/outlines/expand | 展开大纲（SSE） |

#### 章节管理

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/chapters/project/{id} | 获取项目章节 |
| POST | /api/chapters/generate | 生成章节（SSE） |
| POST | /api/chapters/{id}/analyze | 分析章节 |
| POST | /api/chapters/{id}/regenerate | 重写章节（SSE） |

#### 角色管理

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/characters | 获取角色列表 |
| POST | /api/characters/batch-generate | 批量生成（SSE） |

### 6.3 SSE事件类型

```javascript
// 开始生成
event: start
data: {"message": "开始生成..."}

// 准备阶段
event: preparing
data: {"message": "准备AI提示词..."}

// 生成中
event: generating
data: {"progress": 0.5, "retry_count": 0, "max_retries": 3}

// 内容块
event: generating_chunk
data: "生成的文本内容..."

// 保存阶段
event: saving
data: {"message": "保存数据..."}

// 完成
event: complete
data: {"message": "生成完成"}

// 结束
event: done
data: {"result": {...}}
```

### 6.4 错误响应

```json
{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "API密钥无效",
    "details": {...}
  }
}
```

---

## 7. 部署指南

### 7.1 Docker部署（推荐）

#### 快速部署

```bash
# 1. 克隆项目
git clone https://github.com/xiamuceer-j/MuMuAINovel.git
cd MuMuAINovel

# 2. 配置环境变量
cp backend/.env.example .env
nano .env

# 3. 启动服务
docker-compose up -d

# 4. 检查状态
docker-compose ps
```

#### 使用Docker Hub镜像

```bash
# 1. 拉取镜像
docker pull mumujie/mumuainovel:latest

# 2. 创建docker-compose.yml
cat > docker-compose.yml << 'EOF'
services:
  postgres:
    image: postgres:18-alpine
    environment:
      POSTGRES_DB: mumuai_novel
      POSTGRES_USER: mumuai
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  mumuainovel:
    image: mumujie/mumuainovel:latest
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://mumuai:your_password@postgres:5432/mumuai_novel
      - OPENAI_API_KEY=your_api_key
    depends_on:
      - postgres

volumes:
  postgres_data:
EOF

# 3. 启动
docker-compose up -d
```

### 7.2 本地开发部署

#### 后端

```bash
# 创建虚拟环境
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
nano .env

# 启动PostgreSQL（Docker）
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=mumuai_novel \
  -p 5432:5432 \
  postgres:18-alpine

# 启动后端
python -m uvicorn app.main:app --host localhost --port 8000 --reload
```

#### 前端

```bash
cd frontend

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

### 7.3 生产环境配置

#### Nginx反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 环境变量模板

```bash
# 基础配置
POSTGRES_PASSWORD=your_very_secure_password
OPENAI_API_KEY=sk-your-api-key
DEFAULT_MODEL=gpt-4o-mini

# 安全配置
SESSION_SECRET_KEY=your_session_secret_key

# 可选：使用外部数据库
# DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/dbname
```

### 7.4 数据备份

```bash
# 备份PostgreSQL
docker exec mumuainovel-postgres pg_dump -U mumuai mumuai_novel > backup.sql

# 恢复数据
docker exec -i mumuainovel-postgres psql -U mumuai mumuai_novel < backup.sql

# 备份向量库
cp -r data/chroma_db backup_chroma_db/
```

---

## 8. 常见问题

### 8.1 生成相关

**Q: 章节生成很慢怎么办？**
A: 检查网络连接和API响应速度。可以尝试：
- 使用更快的网络
- 切换到更快的模型（如gpt-4o-mini）
- 检查是否达到API限流

**Q: 生成的内容不符合预期怎么办？**
A: 尝试以下方法：
- 在项目向导中重新生成
- 手动修改大纲内容
- 添加更详细的大纲要求
- 使用章节重写功能

**Q: 如何让AI生成更长的章节？**
A: 在生成章节时设置更高的目标字数（最大10000字）。

**Q: 章节之间不连贯怎么办？**
A: 系统会自动使用衔接锚点。如果仍有问题：
- 检查上一章结尾是否有明确的转折点
- 在大纲中明确标注衔接要求
- 适当增加目标字数

### 8.2 角色相关

**Q: 生成的角色数量不对？**
A: 系统采用精确控制。如果数量不对：
- 检查是否在重试过程中多次提交
- 使用重写功能重新生成

**Q: 角色关系混乱怎么办？**
A: 可以在角色详情中手动编辑关系。系统会：
- 自动清理无效引用
- 验证关系逻辑

**Q: 如何引入新角色？**
A: 使用自动角色引入功能：
- 进入大纲续写
- 系统会预测是否需要新角色
- 确认后自动生成

### 8.3 部署相关

**Q: Docker启动失败？**
A: 检查以下内容：
- Docker是否正常运行
- 端口是否被占用
- 环境变量是否正确配置
- 查看日志：`docker-compose logs`

**Q: 无法连接数据库？**
A: 检查：
- PostgreSQL容器是否运行
- 连接字符串是否正确
- 防火墙是否阻止连接

**Q: API密钥泄露怎么办？**
A: 立即：
- 在OpenAI平台撤销该密钥
- 生成新的API密钥
- 更新.env文件
- 重启服务

### 8.4 性能优化

**Q: 如何提高生成速度？**
A: 优化建议：
- 使用流式生成
- 减少不必要的上下文
- 使用更快的模型
- 增加API并发（多账户）

**Q: 内存占用过高？**
A: 优化建议：
- 定期清理不需要的向量索引
- 限制历史章节数量
- 使用较小的Embedding模型

---

## 附录

### A. 环境变量完整列表

| 变量 | 必需 | 默认值 | 描述 |
|------|------|--------|------|
| POSTGRES_PASSWORD | 是 | - | 数据库密码 |
| OPENAI_API_KEY | 是 | - | OpenAI API密钥 |
| DATABASE_URL | 否 | 自动生成 | 数据库连接URL |
| DEFAULT_MODEL | 否 | gpt-4o-mini | 默认模型 |
| DEFAULT_TEMPERATURE | 否 | 0.7 | 默认温度 |
| APP_PORT | 否 | 8000 | 应用端口 |
| LOCAL_AUTH_USERNAME | 否 | admin | 本地账户用户名 |
| LOCAL_AUTH_PASSWORD | 否 | admin123 | 本地账户密码 |

### B. 支持的模型

| 模型 | 描述 | 速度 | 质量 |
|------|------|------|------|
| gpt-4o | 最新旗舰模型 | 快 | 最好 |
| gpt-4o-mini | 轻量版 | 最快 | 较好 |
| gpt-4-turbo | GPT-4增强版 | 快 | 最好 |
| claude-3-opus | Claude旗舰 | 中 | 最好 |
| claude-3-sonnet | Claude平衡版 | 快 | 较好 |
| gemini-pro | Gemini平衡版 | 快 | 较好 |

### C. 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl+S | 保存当前编辑 |
| Ctrl+N | 新建项目 |
| Ctrl+G | 生成章节 |
| Ctrl+R | 重写章节 |

---

**祝你创作愉快！**
