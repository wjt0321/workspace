---
title: 📝 第六章：个人博客系统
description: 开发功能完善的个人博客系统，包含文章管理、用户认证和评论功能
tags:
  - vibe-coding
  - project
  - blog
  - nextjs
  - prisma
category: 实战项目
level: 中级
difficulty: ⭐⭐⭐
estimated_time: 120分钟
---

# 📝 第六章：个人博客系统

> 💡 **章节导言**：本章将带你开发一个功能完善的个人博客系统，包含文章管理、用户认证、评论系统等核心功能。这是一个中级难度的全栈项目。

## 🎯 学习目标

- [ ] 掌握 Next.js 全栈开发
- [ ] 学习数据库设计和 Prisma ORM
- [ ] 实现用户认证和权限管理
- [ ] 完成部署上线

---

## 📋 6.1 项目需求分析

### 🎯 6.1.1 功能需求

#### 👤 用户模块

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 用户注册 | 邮箱+密码注册 | P0 |
| 用户登录 | JWT 认证 | P0 |
| 个人资料 | 修改昵称、头像 | P1 |

#### 📝 文章模块

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 文章列表 | 分页展示，支持分类筛选 | P0 |
| 文章详情 | Markdown 渲染 | P0 |
| 文章管理 | 创建、编辑、删除（管理员） | P0 |
| 文章分类 | 分类和标签管理 | P1 |

#### 💬 评论模块

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 发表评论 | 登录用户可评论 | P0 |
| 评论列表 | 嵌套展示 | P1 |
| 评论管理 | 删除评论 | P1 |

### 🛠️ 6.1.2 技术栈

```markdown
🎯 核心技术：
- ⚛️ Next.js 14 (App Router)
- 🔷 TypeScript
- 🎨 Tailwind CSS + shadcn/ui
- 🗄️ PostgreSQL + Prisma
- 🔐 NextAuth.js
- 📝 React Markdown

🎯 部署：
- ▲ Vercel (前端)
- 🐘 Railway / Supabase (数据库)
```

---

## 🗄️ 6.2 数据库设计

### 💬 使用 Vibe Coding 设计 Schema

**Prompt 1：数据库设计**
```markdown
请帮我设计个人博客系统的数据库 Schema。

🎯 功能需求：
1. 用户管理（注册、登录、角色）
2. 文章管理（CRUD、分类、标签）
3. 评论系统（嵌套评论）

🎯 技术要求：
- 使用 Prisma
- PostgreSQL 数据库
- 包含索引优化
- 软删除支持

📤 请提供：
1. 完整的 Prisma schema
2. 表关系说明
3. 索引设计
```

### 📝 生成的 Schema

**prisma/schema.prisma**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts    Post[]
  comments Comment[]
  
  @@map("users")
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  published   Boolean  @default(false)
  views       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  author   User   @relation(fields: [authorId], references: [id])
  authorId String

  category   Category? @relation(fields: [categoryId], references: [id])
  categoryId String?

  tags     Tag[]
  comments Comment[]
  
  @@index([published])
  @@index([createdAt])
  @@index([authorId])
  @@map("posts")
}

model Category {
  id          String @id @default(cuid())
  name        String @unique
  slug        String @unique
  description String?
  
  posts Post[]
  
  @@map("categories")
}

model Tag {
  id   String @id @default(cuid())
  name String @unique
  slug String @unique
  
  posts Post[]
  
  @@map("tags")
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  author   User   @relation(fields: [authorId], references: [id])
  authorId String

  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId String

  parent   Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  parentId String?
  replies  Comment[] @relation("CommentReplies")
  
  @@index([postId])
  @@index([authorId])
  @@map("comments")
}

enum Role {
  USER
  ADMIN
}
```

---

## 💻 6.3 后端开发

### 🔐 6.3.1 用户认证

**Prompt 2：实现认证**
```markdown
请帮我实现用户认证系统。

🎯 技术栈：
- Next.js 14 App Router
- NextAuth.js v5
- Prisma Adapter

🎯 功能需求：
1. 邮箱密码登录
2. GitHub OAuth 登录
3. JWT 会话管理
4. 受保护路由

📤 请提供：
1. NextAuth 配置
2. 登录页面
3. 受保护 API 路由
```

### 📝 API 路由

**app/api/auth/[...nextauth]/route.ts**
```typescript
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (!user?.password) return null
        
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )
        
        if (!isValid) return null
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    }
  },
  pages: {
    signIn: '/login'
  }
})
```

### 📝 6.3.2 文章 API

**app/api/posts/route.ts**
```typescript
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/posts - 获取文章列表
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const category = searchParams.get('category')
  const published = searchParams.get('published')

  const where = {
    ...(category && { category: { slug: category } }),
    ...(published !== null && { published: published === 'true' })
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: { select: { name: true, image: true } },
        category: true,
        tags: true,
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.post.count({ where })
  ])

  return NextResponse.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  })
}

// POST /api/posts - 创建文章（需要认证）
export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    const post = await prisma.post.create({
      data: {
        ...data,
        authorId: session.user.id,
        slug: data.title.toLowerCase().replace(/\s+/g, '-')
      },
      include: {
        author: { select: { name: true, image: true } },
        category: true,
        tags: true
      }
    })
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}
```

---

## 🎨 6.4 前端开发

### 📄 6.4.1 文章列表页面

**Prompt 3：文章列表**
```markdown
请帮我创建博客的文章列表页面。

🎯 功能需求：
1. 展示文章卡片网格
2. 分页加载
3. 分类筛选
4. 响应式布局

🎨 UI 要求：
- 使用 Tailwind CSS
- 卡片式设计
- 悬停效果
- 加载骨架屏

📤 请提供 Next.js 页面组件代码。
```

**app/page.tsx**
```typescript
import { PostCard } from '@/components/post-card'
import { Pagination } from '@/components/pagination'
import { prisma } from '@/lib/prisma'

export default async function Home({
  searchParams
}: {
  searchParams: { page?: string; category?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const limit = 9

  const [posts, total, categories] = await Promise.all([
    prisma.post.findMany({
      where: {
        published: true,
        ...(searchParams.category && {
          category: { slug: searchParams.category }
        })
      },
      include: {
        author: { select: { name: true, image: true } },
        category: true,
        tags: true,
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.post.count({
      where: {
        published: true,
        ...(searchParams.category && {
          category: { slug: searchParams.category }
        })
      }
    }),
    prisma.category.findMany()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 分类筛选 */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <a
          href="/"
          className={`px-4 py-2 rounded-full text-sm ${
            !searchParams.category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          全部
        </a>
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/?category=${category.slug}`}
            className={`px-4 py-2 rounded-full text-sm ${
              searchParams.category === category.slug
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </a>
        ))}
      </div>

      {/* 文章网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* 分页 */}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(total / limit)}
        baseUrl="/"
      />
    </div>
  )
}
```

### 📝 6.4.2 文章详情页面

**components/post-card.tsx**
```typescript
import Link from 'next/link'
import { Calendar, User, MessageCircle } from 'lucide-react'

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    createdAt: Date
    author: { name: string | null; image: string | null }
    category: { name: string; slug: string } | null
    tags: { name: string }[]
    _count: { comments: number }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* 分类标签 */}
        {post.category && (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full mb-3">
            {post.category.name}
          </span>
        )}
        
        {/* 标题 */}
        <h2 className="text-xl font-bold mb-2 line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        
        {/* 摘要 */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt || '暂无摘要'}
        </p>
        
        {/* 元信息 */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <User size={14} />
            {post.author.name || '匿名'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.createdAt).toLocaleDateString('zh-CN')}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={14} />
            {post._count.comments}
          </span>
        </div>
        
        {/* 标签 */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag.name}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
```

---

## 🚀 6.5 部署上线

### ▲ 6.5.1 部署到 Vercel

**Prompt 4：部署配置**
```markdown
请帮我配置博客系统的部署。

🎯 部署目标：
- 前端：Vercel
- 数据库：Supabase / Railway

🎯 配置需求：
1. 环境变量配置
2. 数据库迁移
3. 构建配置
4. 域名设置

📤 请提供详细的部署步骤。
```

### 📝 部署步骤

1. **准备环境变量**
```bash
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID="..."
GITHUB_SECRET="..."
```

2. **数据库迁移**
```bash
npx prisma migrate deploy
npx prisma db seed
```

3. **Vercel 部署**
```bash
vercel --prod
```

---

## 📝 6.6 本章总结

### 🎯 关键要点

1. 🗄️ **数据库设计** - 合理的表结构和关系设计
2. 🔐 **用户认证** - NextAuth.js 实现多种登录方式
3. 📝 **内容管理** - 文章的 CRUD 和 Markdown 渲染
4. 🚀 **部署上线** - 完整的部署流程

### 🚀 下一步

- [[chapter-07-chat|第七章：实时聊天应用]] - WebSocket 实时通信
- 添加更多功能（搜索、RSS、邮件订阅）
- 优化性能（ISR、图片优化）

---

## ✏️ 练习题

### 📝 选择题

**1. Next.js 14 推荐使用哪种路由？**
- [x] A) App Router
- [ ] B) Pages Router
- [ ] C) 两者都可以
- [ ] D) Express Router

**2. Prisma 中，@relation 用于定义什么？**
- [x] A) 表之间的关系
- [ ] B) 字段类型
- [ ] C) 索引
- [ ] D) 默认值

**3. NextAuth.js 的 session 策略推荐？**
- [ ] A) 数据库存储
- [x] B) JWT
- [ ] C) 内存存储
- [ ] D) 文件存储

### 💻 实践题

**4. 为博客添加文章搜索功能。**

**5. 实现文章草稿功能，支持自动保存。**

---

## 🔑 答案

1. **A** - Next.js 14 推荐使用 App Router。

2. **A** - @relation 用于定义模型之间的关系。

3. **B** - JWT 策略性能更好，适合无服务器环境。

4. **参考答案**：使用全文搜索或 Algolia 实现搜索功能。

5. **参考答案**：使用 localStorage 自动保存草稿，定时同步到服务器。

---

> 🎉 **恭喜完成第六章！** 你已经掌握了全栈博客开发的核心技能！
