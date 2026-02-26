---
title: ✅ 第五章：Todo List 应用
description: 使用 Vibe Coding 开发第一个实战项目 - 完整的待办事项应用
tags:
  - vibe-coding
  - project
  - todo-list
  - react
  - typescript
category: 实战项目
level: 初级
difficulty: ⭐⭐
estimated_time: 90分钟
---

# ✅ 第五章：Todo List 应用

> 💡 **章节导言**：通过开发一个 Todo List 应用，你将第一次完整体验 Vibe Coding 的开发流程。这是一个经典的入门项目，适合练习基础技能。

## 🎯 学习目标

- [ ] 使用 Vibe Coding 方法从零构建应用
- [ ] 掌握前后端分离的开发模式
- [ ] 学会使用 AI 辅助进行代码审查和优化
- [ ] 完成第一个完整的全栈项目

---

## 📋 5.1 项目需求分析

### 🎯 5.1.1 功能需求

#### ✅ 核心功能

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 添加任务 | 输入任务内容，添加到列表 | P0 |
| 标记完成 | 点击复选框标记任务完成/未完成 | P0 |
| 删除任务 | 删除单个任务 | P0 |
| 编辑任务 | 修改已有任务内容 | P1 |
| 筛选任务 | 查看全部/进行中/已完成 | P1 |
| 数据持久化 | 刷新页面数据不丢失 | P0 |

#### 🎨 界面需求

- 📱 响应式设计，支持移动端
- 🎨 简洁美观的 UI
- ⚡ 流畅的交互体验
- 🌙 支持暗黑模式（可选）

### 🛠️ 5.1.2 技术栈选择

```markdown
🎯 前端技术栈：
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS
- 📦 Vite
- 🔄 Zustand（状态管理）

🎯 后端技术栈：
- 🟢 Node.js + Express
- 🗄️ SQLite（轻量级数据库）
- 📋 Prisma（ORM）

🎯 开发工具：
- 🎯 Cursor / Trae
- 🐙 Git
```

### 📁 5.1.3 项目结构

```
todo-list-app/
├── 📁 client/                 # 前端项目
│   ├── 📁 src/
│   │   ├── 📁 components/     # 组件
│   │   ├── 📁 stores/         # 状态管理
│   │   ├── 📁 types/          # 类型定义
│   │   ├── 📄 App.tsx
│   │   └── 📄 main.tsx
│   ├── 📄 package.json
│   └── 📄 vite.config.ts
├── 📁 server/                 # 后端项目
│   ├── 📁 src/
│   │   ├── 📁 routes/         # 路由
│   │   ├── 📁 controllers/    # 控制器
│   │   ├── 📁 prisma/         # 数据库模型
│   │   └── 📄 index.ts
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
└── 📄 README.md
```

---

## 💻 5.2 前端开发

### 🚀 5.2.1 使用 Vibe Coding 初始化项目

#### 💬 与 AI 对话示例

**Prompt 1：创建项目结构**
```markdown
请帮我创建一个 Todo List 应用的前端项目。

🎯 要求：
- 使用 React 18 + TypeScript + Vite
- 使用 Tailwind CSS 进行样式设计
- 使用 Zustand 进行状态管理
- 项目名称为 todo-client

📤 请提供：
1. 完整的项目目录结构
2. package.json 配置
3. 基础组件框架
4. 类型定义
```

**AI 生成代码后，审查要点：**
- ✅ 目录结构是否合理
- ✅ 依赖版本是否最新
- ✅ TypeScript 配置是否正确
- ✅ 是否有不必要的依赖

#### 📝 生成的核心文件

**package.json**
```json
{
  "name": "todo-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.7",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

### 🎯 5.2.2 实现核心功能

#### 💬 迭代开发对话

**Prompt 2：创建任务列表组件**
```markdown
请帮我创建 Todo List 的核心组件。

🎯 功能需求：
1. 显示任务列表
2. 每个任务包含：复选框、任务内容、删除按钮
3. 支持标记完成（完成的任务显示删除线）
4. 空状态提示

🎨 UI 要求：
- 使用 Tailwind CSS
- 卡片式布局
- 悬停效果
- 响应式设计

📤 请提供：
1. TodoItem 组件
2. TodoList 组件
3. 类型定义
4. 使用示例
```

**Prompt 3：添加任务功能**
```markdown
请帮我添加创建新任务的功能。

🎯 功能需求：
1. 输入框添加新任务
2. 支持回车键提交
3. 输入验证（不能为空）
4. 添加成功后清空输入框

🎨 UI 要求：
- 输入框在列表上方
- 添加按钮带图标
- 错误提示

请更新相关组件代码。
```

**Prompt 4：状态管理**
```markdown
请帮我使用 Zustand 创建任务状态管理。

🎯 功能需求：
1. 添加任务
2. 切换任务完成状态
3. 删除任务
4. 筛选任务（全部/进行中/已完成）
5. 持久化到 localStorage

📤 请提供完整的 store 实现。
```

#### 📝 生成的核心代码

**src/stores/todoStore.ts**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export type FilterType = 'all' | 'active' | 'completed'

interface TodoState {
  todos: Todo[]
  filter: FilterType
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  setFilter: (filter: FilterType) => void
  getFilteredTodos: () => Todo[]
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      
      addTodo: (text: string) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text,
          completed: false,
          createdAt: new Date()
        }
        set((state) => ({ todos: [...state.todos, newTodo] }))
      },
      
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }))
      },
      
      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }))
      },
      
      setFilter: (filter: FilterType) => set({ filter }),
      
      getFilteredTodos: () => {
        const { todos, filter } = get()
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed)
          case 'completed':
            return todos.filter((todo) => todo.completed)
          default:
            return todos
        }
      }
    }),
    {
      name: 'todo-storage'
    }
  )
)
```

**src/components/TodoInput.tsx**
```typescript
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTodoStore } from '../stores/todoStore'

export function TodoInput() {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!text.trim()) {
      setError('请输入任务内容')
      return
    }
    
    addTodo(text.trim())
    setText('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setError('')
          }}
          placeholder="添加新任务..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          添加
        </button>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </form>
  )
}
```

**src/components/TodoItem.tsx**
```typescript
import { Trash2 } from 'lucide-react'
import { useTodoStore, Todo } from '../stores/todoStore'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore()

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 group hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
      />
      <span
        className={`flex-1 ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded transition-all"
        title="删除"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
```

**src/components/TodoList.tsx**
```typescript
import { useTodoStore } from '../stores/todoStore'
import { TodoItem } from './TodoItem'
import { ClipboardList } from 'lucide-react'

export function TodoList() {
  const todos = useTodoStore((state) => state.getFilteredTodos())
  const filter = useTodoStore((state) => state.filter)
  const setFilter = useTodoStore((state) => state.setFilter)
  const allTodos = useTodoStore((state) => state.todos)
  
  const activeCount = allTodos.filter((t) => !t.completed).length
  const completedCount = allTodos.filter((t) => t.completed).length

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <ClipboardList size={48} className="mx-auto mb-4" />
        <p>
          {filter === 'all' && '暂无任务，添加一个吧！'}
          {filter === 'active' && '没有进行中的任务'}
          {filter === 'completed' && '没有已完成的任务'}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* 筛选按钮 */}
      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' && `全部 (${allTodos.length})`}
            {f === 'active' && `进行中 (${activeCount})`}
            {f === 'completed' && `已完成 (${completedCount})`}
          </button>
        ))}
      </div>

      {/* 任务列表 */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}
```

**src/App.tsx**
```typescript
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Todo List
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </div>
  )
}

export default App
```

### ✅ 5.2.3 代码审查与优化

#### 💬 让 AI 审查代码

**Prompt 5：代码审查**
```markdown
请帮我审查以下 Todo List 前端代码，找出潜在问题：

[粘贴代码]

🎯 审查要点：
1. 性能问题（不必要的重渲染）
2. 可访问性（ARIA 标签、键盘导航）
3. 错误处理
4. 代码风格一致性
5. TypeScript 类型安全

📤 请提供：
1. 发现的问题列表
2. 优化后的代码
3. 改进说明
```

#### 📝 常见优化建议

1. **性能优化** - 使用 React.memo 和 useMemo
2. **可访问性** - 添加 ARIA 标签
3. **错误边界** - 添加 Error Boundary
4. **加载状态** - 添加骨架屏

---

## 🔧 5.3 后端开发

### 🚀 5.3.1 使用 Vibe Coding 搭建 API

#### 💬 与 AI 对话示例

**Prompt 6：创建后端项目**
```markdown
请帮我创建 Todo List 应用的后端 API。

🎯 技术栈：
- Node.js + Express + TypeScript
- SQLite 数据库
- Prisma ORM

🎯 功能需求：
1. RESTful API
2. CRUD 操作（创建、读取、更新、删除任务）
3. 数据验证
4. 错误处理

📤 请提供：
1. 项目结构和配置文件
2. Prisma schema
3. API 路由和控制器
4. 完整的 CRUD 实现
```

#### 📝 生成的核心文件

**prisma/schema.prisma**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Todo {
  id        String   @id @default(uuid())
  text      String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**src/routes/todos.ts**
```typescript
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// 获取所有任务
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: '获取任务失败' })
  }
})

// 创建任务
router.post('/', async (req, res) => {
  try {
    const { text } = req.body
    
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: '任务内容不能为空' })
    }
    
    const todo = await prisma.todo.create({
      data: { text: text.trim() }
    })
    
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({ error: '创建任务失败' })
  }
})

// 更新任务
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { text, completed } = req.body
    
    const todo = await prisma.todo.update({
      where: { id },
      data: { text, completed }
    })
    
    res.json(todo)
  } catch (error) {
    res.status(500).json({ error: '更新任务失败' })
  }
})

// 删除任务
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    await prisma.todo.delete({
      where: { id }
    })
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: '删除任务失败' })
  }
})

export default router
```

**src/index.ts**
```typescript
import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todos'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/todos', todoRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

### 🔌 5.3.2 前后端联调

#### 💬 连接前后端

**Prompt 7：添加 API 调用**
```markdown
请帮我修改前端代码，使用真实的后端 API 替代 localStorage。

🎯 后端 API 地址：http://localhost:3001/api/todos

🎯 功能需求：
1. 页面加载时从 API 获取任务列表
2. 添加任务时调用 POST API
3. 切换状态时调用 PATCH API
4. 删除任务时调用 DELETE API
5. 添加加载状态和错误处理

📤 请提供修改后的 store 和组件代码。
```

---

## 🧪 5.4 测试与优化

### 📝 5.4.1 功能测试清单

```markdown
✅ 功能测试
- [ ] 可以添加新任务
- [ ] 可以标记任务完成/未完成
- [ ] 可以删除任务
- [ ] 可以筛选任务
- [ ] 数据持久化正常

✅ 边界测试
- [ ] 空任务内容提示错误
- [ ] 超长任务内容处理
- [ ] 快速连续点击处理
- [ ] 网络错误处理

✅ UI 测试
- [ ] 响应式布局正常
- [ ] 暗黑模式正常（如有）
- [ ] 动画效果流畅
```

### 🔍 5.4.2 性能优化

#### 💬 性能优化对话

**Prompt 8：性能优化**
```markdown
请帮我优化 Todo List 应用的性能。

🎯 当前问题：
1. 任务列表长时滚动卡顿
2. 频繁的状态更新导致重渲染
3. 首次加载较慢

📤 请提供：
1. 性能分析结果
2. 优化方案
3. 优化后的代码
```

#### 📝 优化建议

1. **虚拟列表** - 大量数据时使用 react-window
2. **防抖节流** - 搜索和输入处理
3. **代码分割** - 按需加载组件
4. **缓存策略** - React Query 或 SWR

---

## 📝 5.5 本章总结

### 🎯 关键要点

1. 🏗️ **项目规划** - 明确需求和技术栈是开发的第一步
2. 🤖 **Vibe Coding 流程** - 描述需求 → AI 生成 → 审查修改 → 测试验证
3. 🔄 **迭代开发** - 分步骤实现功能，逐步完善
4. ✅ **代码审查** - 让 AI 帮助发现潜在问题
5. 🧪 **测试验证** - 功能测试、边界测试、性能测试

### 🚀 下一步

完成 Todo List 后，你可以：
- [[chapter-06-blog|第六章：个人博客系统]] - 更复杂的全栈项目
- 添加更多功能（编辑、拖拽排序、分类标签）
- 部署到线上（Vercel + Railway）

---

## ✏️ 练习题

### 📝 选择题

**1. 在 Vibe Coding 中，以下哪个步骤最重要？**
- [ ] A) 一次性生成所有代码
- [x] B) 分步骤迭代开发
- [ ] C) 完全依赖 AI，不做审查
- [ ] D) 跳过测试直接部署

**2. Todo List 项目中，推荐使用哪个状态管理库？**
- [ ] A) Redux
- [x] B) Zustand
- [ ] C) MobX
- [ ] D) Context API

**3. 前后端分离项目中，后端应该提供什么？**
- [x] A) RESTful API
- [ ] B) 完整的 HTML 页面
- [ ] C) 数据库直接访问
- [ ] D) 文件系统操作

### 💻 实践题

**4. 为 Todo List 添加编辑功能，允许用户修改已有任务的内容。**

**5. 实现拖拽排序功能，让用户可以重新排列任务顺序。**

---

## 🔑 答案

1. **B** - 分步骤迭代开发是 Vibe Coding 的核心，可以确保代码质量。

2. **B** - Zustand 轻量简单，适合小型项目如 Todo List。

3. **A** - RESTful API 是前后端分离的标准方式。

4. **参考答案**：添加编辑模式状态，双击任务进入编辑，显示输入框和保存/取消按钮。

5. **参考答案**：使用 @dnd-kit 或 react-beautiful-dnd 实现拖拽排序。

---

## 📚 延伸阅读

- [[chapter-04-environment|第四章：环境配置]]
- [[chapter-06-blog|第六章：个人博客系统]]
- [React 官方文档](https://react.dev)
- [Prisma 文档](https://prisma.io)

---

> 🎉 **恭喜完成第五章！** 你已经使用 Vibe Coding 完成了第一个全栈项目！准备好迎接更复杂的挑战了吗？
