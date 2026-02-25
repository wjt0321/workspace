---
title: ⚙️ 第四章：环境配置
description: 配置完整的 Vibe Coding 开发环境，包括开发工具、AI 配置和项目模板
tags:
  - vibe-coding
  - environment
  - setup
  - configuration
category: 环境配置
level: 初级
difficulty: ⭐
estimated_time: 60分钟
---

# ⚙️ 第四章：环境配置

> 💡 **章节导言**：工欲善其事，必先利其器。本章将指导你配置完整的 Vibe Coding 开发环境，为后续的实战项目做好准备。

## 🎯 学习目标

- [ ] 配置 Node.js 和 Python 开发环境
- [ ] 安装和配置 AI 编程工具
- [ ] 设置项目模板和代码规范
- [ ] 验证环境配置是否成功

---

## 💻 4.1 开发环境搭建

### 🟢 4.1.1 Node.js 环境配置

#### 📥 安装 Node.js

1. **下载安装包**
   - 访问 [nodejs.org](https://nodejs.org)
   - 下载 LTS（长期支持）版本
   - 推荐版本：v18.x 或 v20.x

2. **验证安装**
   ```bash
   node --version
   npm --version
   ```

3. **配置 npm 镜像（可选，加速下载）**
   ```bash
   # 使用淘宝镜像
   npm config set registry https://registry.npmmirror.com
   
   # 或使用官方镜像
   npm config set registry https://registry.npmjs.org
   ```

4. **安装常用全局工具**
   ```bash
   # 包管理器
   npm install -g pnpm
   npm install -g yarn
   
   # 构建工具
   npm install -g vite
   npm install -g create-react-app
   npm install -g @angular/cli
   npm install -g @vue/cli
   ```

#### 📝 package.json 模板

```json
{
  "name": "vibe-coding-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css}\""
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "prettier": "^3.1.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

### 🐍 4.1.2 Python 环境配置

#### 📥 安装 Python

1. **下载安装包**
   - 访问 [python.org](https://python.org)
   - 下载 Python 3.10 或更高版本
   - 安装时勾选 "Add Python to PATH"

2. **验证安装**
   ```bash
   python --version
   pip --version
   ```

3. **配置虚拟环境**
   ```bash
   # 创建虚拟环境
   python -m venv venv
   
   # 激活虚拟环境
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

4. **安装常用包**
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic
   pip install requests pytest black isort
   ```

#### 📝 requirements.txt 模板

```
# Web 框架
fastapi==0.104.1
uvicorn[standard]==0.24.0

# 数据库
sqlalchemy==2.0.23
alembic==1.12.1

# 数据验证
pydantic==2.5.2
pydantic-settings==2.1.0

# 工具
python-dotenv==1.0.0
httpx==0.25.2

# 开发工具
pytest==7.4.3
black==23.11.0
isort==5.12.0
mypy==1.7.1
```

### 🗄️ 4.1.3 数据库环境配置

#### 🐘 PostgreSQL

```bash
# Docker 快速启动
docker run --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=vibe_coding \
  -p 5432:5432 \
  -d postgres:15
```

#### 🍃 MongoDB

```bash
# Docker 快速启动
docker run --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -p 27017:27017 \
  -d mongo:7
```

#### 🔴 Redis

```bash
# Docker 快速启动
docker run --name redis \
  -p 6379:6379 \
  -d redis:7-alpine
```

---

## 🤖 4.2 AI 工具配置

### 🔑 4.2.1 API Key 获取

#### 📝 OpenAI API

1. 访问 [platform.openai.com](https://platform.openai.com)
2. 注册/登录账号
3. 进入 "API Keys" 页面
4. 点击 "Create new secret key"
5. **立即保存密钥**（只显示一次）

#### 📝 Anthropic Claude API

1. 访问 [console.anthropic.com](https://console.anthropic.com)
2. 注册/登录账号
3. 进入 "API Keys" 页面
4. 创建新的 API Key

#### 📝 其他 API

| 服务商 | 网址 | 免费额度 |
|--------|------|----------|
| OpenRouter | openrouter.ai | 有 |
| Together AI | together.ai | 有 |
| Groq | groq.com | 有 |

### ⚙️ 4.2.2 模型选择建议

#### 📊 模型对比

| 模型 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| GPT-4 | 能力强，理解好 | 贵，慢 | 复杂任务 |
| GPT-3.5 | 快，便宜 | 能力较弱 | 简单任务 |
| Claude 3 | 上下文长 | 国内访问难 | 大项目 |
| Claude 3.5 | 代码能力强 | 贵 | 代码生成 |

#### 💰 费用优化策略

1. **分层使用**
   - 简单任务：GPT-3.5 / Claude 3 Haiku
   - 复杂任务：GPT-4 / Claude 3.5 Sonnet

2. **缓存响应**
   - 重复问题使用缓存
   - 减少 API 调用次数

3. **批量处理**
   - 合并多个小任务
   - 减少请求次数

### 🔧 4.2.3 工具配置

#### 🎯 Cursor 配置

```json
// ~/.cursor/settings.json
{
  "cursor.aiRules": {
    "alwaysIncludeImports": true,
    "preferTypeScript": true,
    "codeStyle": "modern",
    "maxTokens": 4000
  },
  "cursor.cmdK": {
    "enabled": true,
    "model": "gpt-4",
    "temperature": 0.1
  }
}
```

#### 🔷 Trae 配置

```json
// ~/.trae/config.json
{
  "trae.ai": {
    "model": "claude-3.5-sonnet",
    "autoComplete": true,
    "inlineEdit": true,
    "maxContextLines": 100
  },
  "trae.chat": {
    "context": {
      "includeImports": true,
      "includeRelatedFiles": true
    }
  }
}
```

---

## 📁 4.3 项目模板设置

### ⚛️ 4.3.1 React + TypeScript 模板

#### 🚀 快速创建

```bash
# 使用 Vite
cd d:\workspace\vibe-coding\templates
npm create vite@latest react-ts-template -- --template react-ts

# 安装依赖
cd react-ts-template
npm install
```

#### 📝 推荐目录结构

```
react-ts-template/
├── 📁 src/
│   ├── 📁 components/      # 组件
│   ├── 📁 hooks/          # 自定义 hooks
│   ├── 📁 utils/          # 工具函数
│   ├── 📁 types/          # 类型定义
│   ├── 📁 services/       # API 服务
│   ├── 📁 stores/         # 状态管理
│   ├── 📄 App.tsx
│   └── 📄 main.tsx
├── 📁 public/
├── 📄 index.html
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 .eslintrc.cjs
└── 📄 .prettierrc
```

#### 📝 配置文件

**vite.config.ts**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})
```

**tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 🟢 4.3.2 Vue + TypeScript 模板

```bash
# 使用 create-vue
cd d:\workspace\vibe-coding\templates
npm create vue@latest vue-ts-template

# 选择 TypeScript、Router、Pinia、ESLint、Prettier
```

### 🚀 4.3.3 Node.js + Express 模板

#### 📁 目录结构

```
express-template/
├── 📁 src/
│   ├── 📁 routes/         # 路由
│   ├── 📁 controllers/    # 控制器
│   ├── 📁 middleware/     # 中间件
│   ├── 📁 models/         # 数据模型
│   ├── 📁 utils/          # 工具函数
│   ├── 📁 types/          # 类型定义
│   ├── 📄 app.ts
│   └── 📄 index.ts
├── 📁 tests/
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 .env.example
```

#### 📝 核心文件

**package.json**
```json
{
  "name": "express-template",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.4",
    "tsx": "^4.6.2",
    "typescript": "^5.3.3"
  }
}
```

### 🐍 4.3.4 Python + FastAPI 模板

#### 📁 目录结构

```
fastapi-template/
├── 📁 app/
│   ├── 📁 api/            # API 路由
│   ├── 📁 core/           # 核心配置
│   ├── 📁 models/         # 数据模型
│   ├── 📁 schemas/        # Pydantic 模型
│   ├── 📁 services/       # 业务逻辑
│   ├── 📁 utils/          # 工具函数
│   └── 📄 main.py
├── 📁 tests/
├── 📄 requirements.txt
├── 📄 .env
└── 📄 Dockerfile
```

#### 📝 核心文件

**app/main.py**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Vibe Coding API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello from Vibe Coding!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

---

## ✅ 4.4 环境验证检查清单

### 📝 4.4.1 开发环境检查

```markdown
✅ Node.js 环境
- [ ] Node.js 已安装 (v18+)
- [ ] npm 或 pnpm 可用
- [ ] 能成功运行 npm install
- [ ] 能成功运行 npm run dev

✅ Python 环境
- [ ] Python 已安装 (v3.10+)
- [ ] pip 可用
- [ ] 虚拟环境能正常创建和激活
- [ ] 能成功安装 requirements.txt

✅ 数据库环境
- [ ] PostgreSQL/MongoDB/Redis 已安装或 Docker 可用
- [ ] 能成功连接数据库
- [ ] 能执行基本的 CRUD 操作
```

### 🤖 4.4.2 AI 工具检查

```markdown
✅ Cursor
- [ ] 已安装并登录
- [ ] Cmd+K 功能正常
- [ ] 能生成代码

✅ Trae
- [ ] 已安装并登录
- [ ] AI 补全功能正常
- [ ] Builder 模式可用

✅ API 配置
- [ ] API Key 已获取
- [ ] 余额充足
- [ ] 能成功调用 API
```

### 🧪 4.4.3 验证脚本

**Node.js 验证**
```bash
# 创建测试项目
cd d:\workspace\vibe-coding
cd templates/react-ts-template
npm install
npm run dev

# 访问 http://localhost:3000
```

**Python 验证**
```bash
# 创建测试项目
cd d:\workspace\vibe-coding
cd templates/fastapi-template
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 访问 http://localhost:8000/docs
```

---

## 📝 4.5 本章总结

### 🎯 关键要点

1. 💻 **开发环境**：Node.js 和 Python 是 Vibe Coding 的主要技术栈
2. 🤖 **AI 工具**：配置好 API Key 和工具参数
3. 📁 **项目模板**：准备好标准化的项目模板
4. ✅ **环境验证**：确保所有组件都能正常工作

### 🚀 下一步

环境配置完成！现在你可以开始实战项目了：
- [[chapter-05-todo-list|第五章：Todo List 应用]]
- [[chapter-06-blog|第六章：个人博客系统]]

---

## ✏️ 练习题

### 📝 选择题

**1. 推荐的 Node.js 版本是？**
- [x] A) v18.x 或 v20.x LTS
- [ ] B) v14.x
- [ ] C) v16.x
- [ ] D) 最新版本

**2. 配置 npm 淘宝镜像的命令是？**
- [x] A) npm config set registry https://registry.npmmirror.com
- [ ] B) npm set mirror taobao
- [ ] C) npm use taobao
- [ ] D) npm config registry taobao

**3. 以下哪个不是推荐的 AI 模型？**
- [ ] A) GPT-4
- [ ] B) Claude 3.5
- [x] C) GPT-2
- [ ] D) Claude 3

### 💻 实践题

**4. 按照本章指导，配置你的开发环境，并运行验证脚本。**

**5. 创建一个你自己的项目模板，包含你常用的配置和依赖。**

---

## 🔑 答案

1. **A** - 推荐使用 Node.js 的 LTS 版本，目前 v18.x 和 v20.x 都是稳定版本。

2. **A** - 使用 `npm config set registry` 命令配置镜像源。

3. **C** - GPT-2 是较早的模型，不推荐用于 Vibe Coding。

4. **参考答案**：成功运行验证脚本，访问对应的 localhost 地址能看到正常页面。

5. **参考答案**：根据个人技术栈创建模板，如 React + Zustand + Tailwind 等组合。

---

## 📚 延伸阅读

- [[chapter-03-tools|第三章：工具生态]]
- [[chapter-05-todo-list|第五章：Todo List 应用]]
- [Node.js 官方文档](https://nodejs.org/docs)
- [Python 官方文档](https://docs.python.org)

---

> 🎉 **恭喜完成第四章！** 你的开发环境已经准备就绪，让我们开始第一个实战项目吧！
