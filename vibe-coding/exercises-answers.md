---
title: "练习题答案与解析"
description: "Vibe Coding 教程各章节练习题的详细答案和代码示例说明"
author: "Vibe Coding 教程"
date: 2026-02-15
tags: ["exercises", "answers", "solutions"]
category: "reference"
---

# 📝 练习题答案与解析

本文档包含《Vibe Coding 从零开始》教程各章节练习题的详细答案和解析。

---

## 第一章：Vibe Coding 简介

### 选择题答案

**1. Vibe Coding 最适合以下哪种场景？**

**答案：B. 快速原型开发**

**解析：**
- A 错误：安全关键系统需要严格验证，不适合完全依赖 AI
- B 正确：Vibe Coding 擅长快速迭代和原型验证
- C 错误：底层系统编程需要精确控制
- D 错误：虽然可以辅助，但不是最适合的场景

**2. 以下哪项不是 Vibe Coding 的优势？**

**答案：C. 代码绝对安全**

**解析：**
- AI 生成的代码可能存在安全漏洞
- 需要人工审查和安全测试
- 其他选项都是 Vibe Coding 的真实优势

**3. 使用 Vibe Coding 时，以下哪种心态是正确的？**

**答案：B. 将 AI 视为助手，保持批判性思维**

**解析：**
- 完全依赖或完全不使用都过于极端
- 正确的态度是协作，既利用 AI 效率，又保持人工判断

### 思考题答案

**问题：你认为 Vibe Coding 会取代传统编程吗？为什么？**

**参考答案：**

Vibe Coding 不会完全取代传统编程，而是会与传统编程深度融合，形成新的开发范式：

1. **互补关系**
   - Vibe Coding 擅长：快速原型、CRUD 应用、样板代码
   - 传统编程擅长：算法优化、系统架构、安全关键代码

2. **演进方向**
   - 初级开发：更多使用 Vibe Coding 完成基础工作
   - 高级开发：专注于架构设计、复杂问题解决
   - 专家级：指导 AI、审查代码、制定规范

3. **长期趋势**
   - 编程门槛降低，更多人能参与开发
   - 对高级工程师的需求从"写代码"转向"设计系统"
   - 代码质量标准和审查流程变得更加重要

---

## 第二章：核心概念与原理

### 练习 1：优化 Prompt

**原 Prompt：**
```
帮我写个登录功能
```

**优化后的 Prompt：**
```markdown
【功能需求】
请帮我实现一个用户登录功能，要求如下：

**功能规格：**
1. 支持邮箱/密码登录
2. 登录成功后返回 JWT Token
3. 密码需要加密存储（bcrypt）
4. 包含输入验证（邮箱格式、密码长度）
5. 错误处理（用户不存在、密码错误）

**技术栈：**
- 后端：Node.js + Express + TypeScript
- 数据库：PostgreSQL + Prisma
- 密码加密：bcryptjs
- Token：jsonwebtoken

**输出要求：**
1. 完整的 API 端点代码
2. Prisma Schema 更新
3. 输入验证逻辑
4. 错误处理中间件
5. 单元测试示例
```

**优化要点解析：**
1. **明确功能边界**：列出具体功能点
2. **指定技术栈**：避免 AI 选择不合适的技术
3. **定义输出格式**：明确需要哪些文件和代码
4. **添加上下文**：帮助 AI 理解项目背景

### 练习 2：上下文管理

**问题：如何组织以下文件结构以优化 AI 理解？**

**推荐结构：**
```
src/
├── 📁 features/
│   └── 📁 auth/
│       ├── auth.controller.ts    # 控制器
│       ├── auth.service.ts       # 业务逻辑
│       ├── auth.schema.ts        # 验证规则
│       └── auth.types.ts         # 类型定义
├── 📁 shared/
│   ├── 📁 utils/
│   │   └── jwt.ts                # JWT 工具
│   └── 📁 middleware/
│       └── error-handler.ts      # 错误处理
└── 📁 config/
    └── database.ts               # 数据库配置
```

**组织原则：**
1. **按功能模块分组**：相关文件放在一起
2. **分离关注点**：控制器、服务、类型分离
3. **共享资源集中**：工具函数、中间件统一管理
4. **清晰的命名**：文件名反映内容职责

### 练习 3：迭代开发

**迭代计划示例：**

```markdown
## 用户认证系统迭代计划

### 迭代 1：基础登录（2小时）
**目标：** 实现基本的邮箱密码登录

**Prompt 序列：**
1. "创建用户表 Prisma Schema，包含 email 和 password 字段"
2. "实现 /api/auth/login 端点，验证邮箱密码"
3. "添加 bcrypt 密码加密"
4. "生成 JWT Token 并返回"

**验证清单：**
- [ ] 可以成功登录
- [ ] 密码正确加密存储
- [ ] 返回有效 JWT

---

### 迭代 2：输入验证（1小时）
**目标：** 添加数据验证

**Prompt 序列：**
1. "添加 Zod 验证 schema，验证邮箱格式"
2. "验证密码长度至少 8 位"
3. "添加统一的错误响应格式"

---

### 迭代 3：错误处理（1小时）
**目标：** 完善错误处理

**Prompt 序列：**
1. "创建自定义错误类（AuthError、ValidationError）"
2. "实现全局错误处理中间件"
3. "添加详细的错误日志"

---

### 迭代 4：单元测试（2小时）
**目标：** 添加测试覆盖

**Prompt 序列：**
1. "为登录功能编写单元测试"
2. "测试各种错误场景"
3. "添加测试数据库配置"
```

---

## 第三章：工具生态

### 练习 1：Cursor 快捷键

**答案：**

| 操作 | Windows/Linux | Mac |
|-----|---------------|-----|
| 打开 AI 聊天面板 | `Ctrl + L` | `Cmd + L` |
| 内联编辑 | `Ctrl + K` | `Cmd + K` |
| 接受建议 | `Tab` | `Tab` |
| 拒绝建议 | `Esc` | `Esc` |
| 切换侧边栏 | `Ctrl + B` | `Cmd + B` |
| 命令面板 | `Ctrl + Shift + P` | `Cmd + Shift + P` |

### 练习 2：工具选择

**场景分析：**

1. **个人学习项目**
   - **推荐：** Cursor 免费版
   - **理由：** 功能完整、免费额度充足、适合学习

2. **企业团队开发**
   - **推荐：** GitHub Copilot Business
   - **理由：** 企业级安全、团队管理、代码隐私保护

3. **快速原型验证**
   - **推荐：** Cursor 或 Windsurf
   - **理由：** Agent 模式支持、快速生成完整项目

4. **中国开发者**
   - **推荐：** Trae IDE
   - **理由：** 国内网络优化、中文支持好、免费使用

---

## 第四章：环境搭建

### 练习 1：环境验证脚本

**Windows PowerShell 验证脚本：**

```powershell
# check-environment.ps1
Write-Host "🔍 检查开发环境..." -ForegroundColor Cyan

$checks = @(
    @{ Name = "Node.js"; Command = "node --version"; Pattern = "v\d+\.\d+\.\d+" },
    @{ Name = "npm"; Command = "npm --version"; Pattern = "\d+\.\d+\.\d+" },
    @{ Name = "Python"; Command = "python --version"; Pattern = "Python \d+\.\d+\.\d+" },
    @{ Name = "Git"; Command = "git --version"; Pattern = "git version \d+\.\d+" }
)

$allPassed = $true

foreach ($check in $checks) {
    Write-Host "  检查 $($check.Name)..." -NoNewline
    try {
        $output = Invoke-Expression $check.Command 2>&1
        if ($output -match $check.Pattern) {
            Write-Host " ✅ $output" -ForegroundColor Green
        } else {
            Write-Host " ❌ 版本格式异常" -ForegroundColor Red
            $allPassed = $false
        }
    } catch {
        Write-Host " ❌ 未安装" -ForegroundColor Red
        $allPassed = $false
    }
}

if ($allPassed) {
    Write-Host "`n🎉 所有环境检查通过！" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ 部分环境未就绪，请参考安装指南" -ForegroundColor Yellow
}
```

### 练习 2：项目模板

**React + TypeScript + Vite 模板结构：**

```
my-react-app/
├── 📁 src/
│   ├── 📁 components/
│   │   └── ui/           # UI 组件
│   ├── 📁 hooks/         # 自定义 Hooks
│   ├── 📁 utils/         # 工具函数
│   ├── 📁 types/         # 类型定义
│   ├── App.tsx
│   └── main.tsx
├── 📁 public/            # 静态资源
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 第五章：Todo List 应用

### 功能实现答案

**完整的 Todo Store（Zustand）：**

```typescript
// stores/todoStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  searchQuery: string;
  
  // Actions
  addTodo: (text: string, priority?: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  setFilter: (filter: TodoState['filter']) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
  reorderTodos: (newOrder: Todo[]) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      searchQuery: '',
      
      addTodo: (text, priority = 'medium') => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
          createdAt: new Date(),
          priority
        };
        set((state) => ({ todos: [newTodo, ...state.todos] }));
      },
      
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }));
      },
      
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }));
      },
      
      editTodo: (id, text) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: text.trim() } : todo
          )
        }));
      },
      
      setFilter: (filter) => set({ filter }),
      
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed)
        }));
      },
      
      reorderTodos: (newOrder) => set({ todos: newOrder })
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({ todos: state.todos })
    }
  )
);

// Selector hooks for performance
export const useFilteredTodos = () => {
  const { todos, filter, searchQuery } = useTodoStore();
  
  return todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
};

export const useTodoStats = () => {
  const todos = useTodoStore((state) => state.todos);
  
  return {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
    highPriority: todos.filter((t) => t.priority === 'high' && !t.completed).length
  };
};
```

---

## 第六章：个人博客系统

### 数据库设计答案

**完整的 Prisma Schema：**

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  role          Role      @default(USER)
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
  comments      Comment[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  coverImage  String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  authorId    String
  categoryId  String?
  
  author      User       @relation(fields: [authorId], references: [id])
  category    Category?  @relation(fields: [categoryId], references: [id])
  tags        Tag[]
  comments    Comment[]
  
  @@index([slug])
  @@index([published, publishedAt])
}

model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  posts       Post[]
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  slug  String @unique
  posts Post[]
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  postId    String
  authorId  String
  parentId  String?
  
  post     Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  author   User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  parent   Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies  Comment[] @relation("CommentReplies")
}

enum Role {
  USER
  ADMIN
  EDITOR
}
```

---

## 第七章：实时聊天应用

### WebSocket 事件处理答案

**完整的 Socket.io 事件处理器：**

```typescript
// socket/handlers/messageHandler.ts
import { Server, Socket } from 'socket.io';
import { MessageModel } from '../models/Message';
import { RoomModel } from '../models/Room';

export const messageHandler = (io: Server, socket: Socket) => {
  // 加入房间
  socket.on('room:join', async (roomId: string) => {
    try {
      // 验证用户是否有权限加入房间
      const canJoin = await RoomModel.canUserJoin(roomId, socket.data.user.id);
      if (!canJoin) {
        socket.emit('error', { message: '无权加入此房间' });
        return;
      }
      
      // 离开之前的房间
      const previousRooms = Array.from(socket.rooms);
      previousRooms.forEach(room => {
        if (room !== socket.id) {
          socket.leave(room);
        }
      });
      
      // 加入新房间
      socket.join(roomId);
      
      // 获取历史消息
      const messages = await MessageModel.getRecentMessages(roomId, 50);
      socket.emit('room:history', messages);
      
      // 通知其他用户
      socket.to(roomId).emit('user:joined', {
        userId: socket.data.user.id,
        username: socket.data.user.name,
        timestamp: new Date()
      });
      
      console.log(`User ${socket.data.user.name} joined room ${roomId}`);
    } catch (error) {
      socket.emit('error', { message: '加入房间失败' });
    }
  });
  
  // 发送消息
  socket.on('message:send', async (data: {
    roomId: string;
    content: string;
    type?: 'text' | 'image' | 'file';
  }) => {
    try {
      // 验证输入
      if (!data.content?.trim()) {
        socket.emit('error', { message: '消息内容不能为空' });
        return;
      }
      
      if (data.content.length > 2000) {
        socket.emit('error', { message: '消息过长' });
        return;
      }
      
      // 检查用户是否在房间中
      if (!socket.rooms.has(data.roomId)) {
        socket.emit('error', { message: '未加入该房间' });
        return;
      }
      
      // 保存消息到数据库
      const message = await MessageModel.create({
        roomId: data.roomId,
        senderId: socket.data.user.id,
        senderName: socket.data.user.name,
        content: data.content.trim(),
        type: data.type || 'text',
        createdAt: new Date()
      });
      
      // 广播消息给房间内所有用户
      io.to(data.roomId).emit('message:received', {
        id: message._id,
        roomId: data.roomId,
        sender: {
          id: socket.data.user.id,
          name: socket.data.user.name,
          avatar: socket.data.user.avatar
        },
        content: data.content.trim(),
        type: data.type || 'text',
        createdAt: message.createdAt
      });
      
      // 更新房间的 lastMessage
      await RoomModel.updateLastMessage(data.roomId, {
        content: data.content.slice(0, 100),
        sender: socket.data.user.name,
        timestamp: new Date()
      });
      
    } catch (error) {
      console.error('Message send error:', error);
      socket.emit('error', { message: '发送消息失败' });
    }
  });
  
  // 正在输入状态
  socket.on('typing:start', (roomId: string) => {
    socket.to(roomId).emit('typing:update', {
      userId: socket.data.user.id,
      username: socket.data.user.name,
      isTyping: true
    });
  });
  
  socket.on('typing:stop', (roomId: string) => {
    socket.to(roomId).emit('typing:update', {
      userId: socket.data.user.id,
      username: socket.data.user.name,
      isTyping: false
    });
  });
  
  // 离开房间
  socket.on('room:leave', (roomId: string) => {
    socket.leave(roomId);
    socket.to(roomId).emit('user:left', {
      userId: socket.data.user.id,
      username: socket.data.user.name,
      timestamp: new Date()
    });
  });
};
```

---

## 第八章：AI 图像生成器

### 异步任务处理答案

**完整的 Celery 任务实现：**

```python
# tasks/image_generation.py
import asyncio
from celery import Celery
from celery.exceptions import MaxRetriesExceededError
import httpx
from datetime import datetime
from models import ImageGenerationTask, TaskStatus
from services.storage import StorageService
from config import settings

celery_app = Celery('image_generation')
celery_app.config_from_object({
    'broker_url': settings.REDIS_URL,
    'result_backend': settings.REDIS_URL,
    'task_serializer': 'json',
    'accept_content': ['json'],
    'result_serializer': 'json',
    'timezone': 'UTC',
    'enable_utc': True,
    'task_track_started': True,
    'task_time_limit': 600,  # 10 分钟超时
    'worker_prefetch_multiplier': 1,  # 公平调度
})

class ImageGenerationService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=300.0)
        self.storage = StorageService()
    
    async def generate_with_openai(
        self, 
        prompt: str, 
        size: str = "1024x1024",
        quality: str = "standard"
    ) -> dict:
        """使用 OpenAI DALL-E 生成图像"""
        response = await self.client.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "dall-e-3",
                "prompt": prompt,
                "size": size,
                "quality": quality,
                "n": 1,
                "response_format": "url"
            }
        )
        response.raise_for_status()
        return response.json()
    
    async def download_and_store(self, image_url: str, task_id: str) -> str:
        """下载图像并存储到本地/S3"""
        response = await self.client.get(image_url)
        response.raise_for_status()
        
        # 存储图像
        storage_path = f"generated/{task_id}.png"
        await self.storage.upload(storage_path, response.content)
        
        return storage_path

service = ImageGenerationService()

@celery_app.task(bind=True, max_retries=3)
def generate_image_task(
    self,
    task_id: str,
    prompt: str,
    user_id: str,
    settings_dict: dict = None
):
    """
    异步生成图像任务
    
    Args:
        task_id: 任务 ID
        prompt: 图像生成提示词
        user_id: 用户 ID
        settings_dict: 生成设置（尺寸、质量等）
    """
    settings_dict = settings_dict or {}
    
    try:
        # 更新任务状态为处理中
        self.update_state(
            state='PROGRESS',
            meta={
                'progress': 10,
                'message': '正在初始化...',
                'stage': 'initialization'
            }
        )
        
        # 获取任务记录
        task = ImageGenerationTask.get_by_id(task_id)
        if not task:
            raise ValueError(f"Task {task_id} not found")
        
        # 更新状态
        task.update_status(TaskStatus.PROCESSING)
        
        # 步骤 1: 调用 AI API
        self.update_state(
            state='PROGRESS',
            meta={
                'progress': 30,
                'message': '正在生成图像，这可能需要几秒钟...',
                'stage': 'generation'
            }
        )
        
        result = asyncio.run(service.generate_with_openai(
            prompt=prompt,
            size=settings_dict.get('size', '1024x1024'),
            quality=settings_dict.get('quality', 'standard')
        ))
        
        image_url = result['data'][0]['url']
        revised_prompt = result['data'][0].get('revised_prompt', prompt)
        
        # 步骤 2: 下载并存储图像
        self.update_state(
            state='PROGRESS',
            meta={
                'progress': 70,
                'message': '正在保存图像...',
                'stage': 'storage'
            }
        )
        
        storage_path = asyncio.run(
            service.download_and_store(image_url, task_id)
        )
        
        # 步骤 3: 更新任务记录
        self.update_state(
            state='PROGRESS',
            meta={
                'progress': 90,
                'message': '正在完成...',
                'stage': 'finalization'
            }
        )
        
        task.complete(
            image_url=storage_path,
            revised_prompt=revised_prompt,
            metadata={
                'original_prompt': prompt,
                'size': settings_dict.get('size'),
                'quality': settings_dict.get('quality')
            }
        )
        
        return {
            'status': 'success',
            'task_id': task_id,
            'image_url': storage_path,
            'revised_prompt': revised_prompt
        }
        
    except httpx.HTTPStatusError as e:
        # API 错误处理
        error_msg = f"API error: {e.response.status_code}"
        
        if e.response.status_code == 429:
            # 限流错误，重试
            error_msg = "API 限流，正在重试..."
            self.retry(countdown=60)
        elif e.response.status_code >= 500:
            # 服务器错误，重试
            self.retry(countdown=30)
        else:
            # 客户端错误，不重试
            task.fail(error_msg)
            raise Exception(error_msg)
            
    except MaxRetriesExceededError:
        # 超过最大重试次数
        error_msg = "超过最大重试次数，请稍后重试"
        task.fail(error_msg)
        return {'status': 'failed', 'error': error_msg}
        
    except Exception as e:
        # 其他错误
        error_msg = str(e)
        
        # 记录错误
        if 'task' in dir():
            task.fail(error_msg)
        
        # 尝试重试
        if self.request.retries < self.max_retries:
            self.retry(countdown=30, exc=e)
        
        return {'status': 'failed', 'error': error_msg}

# 任务监控和清理
@celery_app.task
def cleanup_old_tasks():
    """清理过期任务"""
    from datetime import timedelta
    
    cutoff_date = datetime.utcnow() - timedelta(days=7)
    deleted_count = ImageGenerationTask.delete_old(cutoff_date)
    
    return {'deleted_tasks': deleted_count}

@celery_app.task
def check_stuck_tasks():
    """检查并恢复卡住的任务"""
    stuck_tasks = ImageGenerationTask.find_stuck_tasks(timeout_minutes=30)
    
    for task in stuck_tasks:
        task.update_status(TaskStatus.FAILED, error='任务超时')
    
    return {'fixed_tasks': len(stuck_tasks)}
```

---

## 第九章：最佳实践与高级技巧

### 练习 1：重构挑战答案

**原始代码重构后：**

```typescript
// 使用策略模式重构

// 1. 定义策略接口
interface OrderStrategy {
  canHandle(order: OrderData): boolean;
  process(order: OrderData): Promise<OrderResult>;
}

// 2. 实现具体策略
class OnlineCreditCardStrategy implements OrderStrategy {
  canHandle(order: OrderData): boolean {
    return order.type === 'online' && order.payment === 'credit';
  }
  
  async process(order: OrderData): Promise<OrderResult> {
    if (order.amount > 1000) {
      return this.processLargeOrder(order);
    }
    return this.processSmallOrder(order);
  }
  
  private async processLargeOrder(order: OrderData): Promise<OrderResult> {
    // 大额订单需要额外验证
    await this.fraudCheck(order);
    return { status: 'success', type: 'large_credit_online' };
  }
  
  private async processSmallOrder(order: OrderData): Promise<OrderResult> {
    return { status: 'success', type: 'small_credit_online' };
  }
  
  private async fraudCheck(order: OrderData): Promise<void> {
    // 欺诈检查逻辑
  }
}

class OnlinePayPalStrategy implements OrderStrategy {
  canHandle(order: OrderData): boolean {
    return order.type === 'online' && order.payment === 'paypal';
  }
  
  async process(order: OrderData): Promise<OrderResult> {
    // PayPal 特定处理
    return { status: 'success', type: 'paypal_online' };
  }
}

class OfflineRetailStrategy implements OrderStrategy {
  canHandle(order: OrderData): boolean {
    return order.type === 'offline' && order.store === 'retail';
  }
  
  async process(order: OrderData): Promise<OrderResult> {
    // 零售店处理
    return { status: 'success', type: 'retail_offline' };
  }
}

class OfflineWholesaleStrategy implements OrderStrategy {
  canHandle(order: OrderData): boolean {
    return order.type === 'offline' && order.store === 'wholesale';
  }
  
  async process(order: OrderData): Promise<OrderResult> {
    // 批发处理
    return { status: 'success', type: 'wholesale_offline' };
  }
}

// 3. 策略上下文
class OrderProcessor {
  private strategies: OrderStrategy[] = [
    new OnlineCreditCardStrategy(),
    new OnlinePayPalStrategy(),
    new OfflineRetailStrategy(),
    new OfflineWholesaleStrategy()
  ];
  
  async process(order: OrderData): Promise<OrderResult> {
    const strategy = this.strategies.find(s => s.canHandle(order));
    
    if (!strategy) {
      throw new Error(`No strategy found for order type: ${order.type}`);
    }
    
    return strategy.process(order);
  }
  
  // 支持动态添加策略
  addStrategy(strategy: OrderStrategy): void {
    this.strategies.push(strategy);
  }
}

// 4. 类型定义
interface OrderData {
  type: 'online' | 'offline';
  payment?: 'credit' | 'paypal';
  store?: 'retail' | 'wholesale';
  amount: number;
}

interface OrderResult {
  status: 'success' | 'failed';
  type: string;
  error?: string;
}

// 使用示例
const processor = new OrderProcessor();
const result = await processor.process({
  type: 'online',
  payment: 'credit',
  amount: 1500
});
```

### 练习 2：安全审计答案

**识别出的安全漏洞：**

```typescript
// 原始代码中的问题

// ❌ 问题 1: SQL 注入
app.get('/api/users/:id', async (req, res) => {
  // 危险！直接拼接用户输入到 SQL
  const user = await db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
  res.json(user);
});

// ❌ 问题 2: 明文密码比较
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  // 危险！明文比较
  if (user.password === password) {
    // 问题 3: 硬编码密钥
    const token = jwt.sign({ userId: user.id }, 'secret');
    res.json({ token });
  }
});
```

**修复后的代码：**

```typescript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// ✅ 修复 1: 使用参数化查询防止 SQL 注入
app.get('/api/users/:id', async (req, res) => {
  try {
    // 验证 ID 格式
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    // 使用参数化查询
    const user = await db.query('SELECT id, email, name FROM users WHERE id = ?', [userId]);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 登录验证 Schema
const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

// ✅ 修复 2: 安全的登录实现
app.post('/api/login', async (req, res) => {
  try {
    // 验证输入
    const result = LoginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        error: 'Invalid input',
        details: result.error.errors 
      });
    }
    
    const { email, password } = result.data;
    
    // 查询用户（包含密码哈希）
    const user = await db.query(
      'SELECT id, email, password_hash FROM users WHERE email = ?', 
      [email]
    );
    
    // 使用恒定时间比较防止时序攻击
    const passwordValid = user 
      ? await bcrypt.compare(password, user.password_hash)
      : false;
    
    // 无论用户是否存在，都执行相同的操作
    if (!user || !passwordValid) {
      // 添加随机延迟防止时序攻击
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // ✅ 修复 3: 使用环境变量存储密钥
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,  // 从环境变量读取
      { 
        expiresIn: '1h',
        algorithm: 'HS256'
      }
    );
    
    // 设置 HTTP-only Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 小时
    });
    
    res.json({ 
      success: true,
      user: { id: user.id, email: user.email }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

**漏洞风险说明：**

| 漏洞 | 风险等级 | 风险描述 |
|-----|---------|---------|
| SQL 注入 | 🔴 严重 | 攻击者可执行任意 SQL，窃取/删除数据 |
| 明文密码 | 🔴 严重 | 密码泄露，用户账户被盗 |
| 硬编码密钥 | 🟠 高 | 密钥泄露，Token 可被伪造 |
| 时序攻击 | 🟡 中 | 通过响应时间推断用户信息 |

### 练习 3：性能优化答案

```typescript
import React, { useState, useMemo, useCallback, memo } from 'react';
import { FixedSizeList as List } from 'react-window';

// 使用 memo 避免不必要的重渲染
const ProductCard = memo(function ProductCard({ 
  product, 
  onClick 
}: { 
  product: Product; 
  onClick: (product: Product) => void;
}) {
  return (
    <div 
      className="product-card"
      onClick={() => onClick(product)}
    >
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
});

function ProductList({ products, onSelect }: ProductListProps) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'name'>('price');
  
  // ✅ 使用 useMemo 缓存过滤和排序结果
  const processedProducts = useMemo(() => {
    // 先过滤
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.description?.toLowerCase().includes(filter.toLowerCase())
    );
    
    // 再排序（创建新数组避免修改原数组）
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price') {
        return b.price - a.price; // 价格降序
      }
      return a.name.localeCompare(b.name); // 名称升序
    });
  }, [products, filter, sortBy]); // 只在依赖变化时重新计算
  
  // ✅ 使用 useCallback 缓存回调函数
  const handleProductClick = useCallback((product: Product) => {
    onSelect(product);
  }, [onSelect]);
  
  // ✅ 使用 useCallback 缓存输入处理
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);
  
  // 大数据量时使用虚拟列表
  const isLargeList = processedProducts.length > 100;
  
  return (
    <div className="product-list">
      <div className="controls">
        <input 
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="搜索产品..."
          className="filter-input"
        />
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'price' | 'name')}
        >
          <option value="price">按价格排序</option>
          <option value="name">按名称排序</option>
        </select>
      </div>
      
      <p className="results-info">
        显示 {processedProducts.length} / {products.length} 个产品
      </p>
      
      {isLargeList ? (
        // 虚拟列表处理大数据
        <List
          height={600}
          itemCount={processedProducts.length}
          itemSize={80}
          width="100%"
        >
          {({ index, style }) => (
            <div style={style}>
              <ProductCard 
                product={processedProducts[index]}
                onClick={handleProductClick}
              />
            </div>
          )}
        </List>
      ) : (
        // 普通列表处理小数据
        <div className="products-grid">
          {processedProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(ProductList);
```

**优化要点：**

1. **useMemo**: 缓存过滤和排序结果，避免每次渲染都重新计算
2. **useCallback**: 缓存事件处理函数，避免子组件不必要的重渲染
3. **React.memo**: 包装组件，只在 props 变化时重渲染
4. **虚拟列表**: 大数据量时使用 react-window 只渲染可见项
5. **避免修改原数组**: 排序时创建新数组，保持数据不可变性

---

## 附录：代码示例说明

### 如何阅读代码示例

每个代码示例包含以下部分：

1. **文件路径**：代码应该放在哪个文件中
2. **依赖说明**：需要安装哪些依赖包
3. **代码注释**：关键逻辑的说明
4. **使用示例**：如何在项目中使用

### 运行环境要求

- Node.js 18+
- TypeScript 5.0+
- React 18+
- Python 3.10+（用于后端示例）

### 依赖安装命令

```bash
# React 项目
npm install zustand react-window @types/react-window

# Node.js 后端
npm install express bcrypt jsonwebtoken zod

# Python 后端
pip install celery redis httpx
```

---

*最后更新：2026-02-15 | [[README|返回首页]]*
