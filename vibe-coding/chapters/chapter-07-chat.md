---
title: 💬 第七章：实时聊天应用
description: 开发支持实时消息、用户认证和消息持久化的聊天应用
tags:
  - vibe-coding
  - project
  - chat
  - websocket
category: 实战项目
level: 中级
difficulty: ⭐⭐⭐
estimated_time: 150分钟
---

# 💬 第七章：实时聊天应用

> 💡 **章节导言**：本章将带你开发一个功能完整的实时聊天应用，学习 WebSocket 通信、用户认证和消息持久化等高级技术。

## 🎯 学习目标

- [ ] 掌握 WebSocket 实时通信
- [ ] 实现用户在线状态管理
- [ ] 学习消息持久化和历史记录
- [ ] 优化性能和扩展性

---

## 📋 7.1 项目需求分析

### 🎯 7.1.1 功能需求

#### 💬 核心功能

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 实时消息 | 即时发送和接收消息 | P0 |
| 用户列表 | 显示在线用户 | P0 |
| 私聊 | 一对一聊天 | P0 |
| 群聊 | 多人群组聊天 | P1 |
| 消息历史 | 加载历史消息 | P0 |
| 已读回执 | 显示消息已读状态 | P1 |

#### 🛠️ 技术栈

```markdown
🎯 前端：
- ⚛️ React + TypeScript
- 🔌 Socket.io Client
- 🎨 Tailwind CSS

🎯 后端：
- 🟢 Node.js + Express
- 🔌 Socket.io
- 🔴 Redis（消息队列）
- 🗄️ MongoDB（消息存储）
- 🔐 JWT 认证
```

---

## 🔌 7.2 WebSocket 服务器

### 💬 使用 Vibe Coding 搭建

**Prompt 1：Socket.io 服务器**
```markdown
请帮我创建实时聊天应用的后端服务器。

🎯 技术栈：
- Express + Socket.io
- Redis Adapter（支持多实例）
- JWT 认证

🎯 功能需求：
1. 用户连接认证
2. 加入/离开房间
3. 发送/接收消息
4. 广播在线用户列表
5. 消息持久化到 MongoDB

📤 请提供完整的 server 代码。
```

### 📝 核心代码

**server/index.ts**
```typescript
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import jwt from 'jsonwebtoken'
import { Message } from './models/Message'

const app = express()
const httpServer = createServer(app)

// Redis 适配器
const pubClient = createClient({ url: process.env.REDIS_URL })
const subClient = pubClient.duplicate()

// Socket.io 配置
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
})

io.adapter(createAdapter(pubClient, subClient))

// 在线用户管理
const onlineUsers = new Map<string, UserInfo>()

interface UserInfo {
  id: string
  username: string
  avatar?: string
  socketId: string
  status: 'online' | 'away' | 'busy'
}

// 认证中间件
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new Error('Authentication error'))
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      username: string
    }
    
    socket.data.user = decoded
    next()
  } catch (err) {
    next(new Error('Authentication error'))
  }
})

io.on('connection', (socket) => {
  const user = socket.data.user
  console.log(`User connected: ${user.username}`)
  
  // 添加到在线用户列表
  onlineUsers.set(user.id, {
    ...user,
    socketId: socket.id,
    status: 'online'
  })
  
  // 广播在线用户列表
  io.emit('users:online', Array.from(onlineUsers.values()))
  
  // 加入个人房间（用于私聊）
  socket.join(`user:${user.id}`)
  
  // 处理发送消息
  socket.on('message:send', async (data) => {
    try {
      const { content, to, type = 'text' } = data
      
      // 保存消息到数据库
      const message = await Message.create({
        from: user.id,
        to,
        content,
        type,
        timestamp: new Date()
      })
      
      // 发送给接收者
      io.to(`user:${to}`).emit('message:receive', {
        id: message._id,
        from: user,
        content,
        type,
        timestamp: message.timestamp
      })
      
      // 确认发送成功
      socket.emit('message:sent', { id: message._id })
    } catch (error) {
      socket.emit('error', { message: '发送失败' })
    }
  })
  
  // 加载历史消息
  socket.on('message:history', async (data) => {
    try {
      const { with: userId, page = 1, limit = 50 } = data
      
      const messages = await Message.find({
        $or: [
          { from: user.id, to: userId },
          { from: userId, to: user.id }
        ]
      })
        .sort({ timestamp: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('from', 'username avatar')
      
      socket.emit('message:history', messages.reverse())
    } catch (error) {
      socket.emit('error', { message: '加载历史消息失败' })
    }
  })
  
  // 更新状态
  socket.on('user:status', (status) => {
    const userInfo = onlineUsers.get(user.id)
    if (userInfo) {
      userInfo.status = status
      io.emit('users:online', Array.from(onlineUsers.values()))
    }
  })
  
  // 断开连接
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${user.username}`)
    onlineUsers.delete(user.id)
    io.emit('users:online', Array.from(onlineUsers.values()))
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

---

## 💻 7.3 前端开发

### 💬 聊天界面

**Prompt 2：聊天组件**
```markdown
请帮我创建聊天应用的前端界面。

🎯 功能需求：
1. 侧边栏显示在线用户列表
2. 聊天窗口显示消息
3. 消息输入框
4. 用户状态显示

🎨 UI 要求：
- 类似微信的界面布局
- 响应式设计
- 消息气泡样式
- 滚动自动到底部

📤 请提供 React 组件代码。
```

**components/Chat.tsx**
```typescript
import { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '@/hooks/useAuth'
import { MessageList } from './MessageList'
import { UserList } from './UserList'
import { MessageInput } from './MessageInput'

interface Message {
  id: string
  from: { id: string; username: string; avatar?: string }
  content: string
  timestamp: Date
}

interface User {
  id: string
  username: string
  avatar?: string
  status: 'online' | 'away' | 'busy'
}

export function Chat() {
  const { user, token } = useAuth()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // 连接 Socket.io
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token }
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    newSocket.on('users:online', (users: User[]) => {
      setOnlineUsers(users.filter((u) => u.id !== user?.id))
    })

    newSocket.on('message:receive', (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [token, user?.id])

  // 加载历史消息
  useEffect(() => {
    if (socket && selectedUser) {
      socket.emit('message:history', { with: selectedUser.id })
      
      socket.on('message:history', (history: Message[]) => {
        setMessages(history)
      })
    }
  }, [socket, selectedUser])

  const sendMessage = (content: string) => {
    if (socket && selectedUser) {
      socket.emit('message:send', {
        content,
        to: selectedUser.id
      })
      
      // 乐观更新
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          from: user!,
          content,
          timestamp: new Date()
        }
      ])
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 侧边栏 - 用户列表 */}
      <div className="w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="font-medium">
              {isConnected ? '已连接' : '未连接'}
            </span>
          </div>
        </div>
        <UserList
          users={onlineUsers}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      </div>

      {/* 聊天区域 */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* 聊天头部 */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedUser.avatar || '/default-avatar.png'}
                    alt={selectedUser.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      selectedUser.status === 'online'
                        ? 'bg-green-500'
                        : selectedUser.status === 'away'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedUser.username}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedUser.status === 'online'
                      ? '在线'
                      : selectedUser.status === 'away'
                      ? '离开'
                      : '忙碌'}
                  </p>
                </div>
              </div>
            </div>

            {/* 消息列表 */}
            <MessageList messages={messages} currentUser={user} />

            {/* 输入框 */}
            <MessageInput onSend={sendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>选择一个用户开始聊天</p>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## ⚡ 7.4 性能优化

### 💬 优化对话

**Prompt 3：性能优化**
```markdown
请帮我优化聊天应用的性能。

🎯 当前问题：
1. 消息量大时页面卡顿
2. 图片消息加载慢
3. 重连时消息丢失

📤 请提供：
1. 虚拟列表实现
2. 图片懒加载
3. 消息队列和断线重连
```

### 📝 优化方案

1. **虚拟列表** - 使用 react-window
2. **消息分页** - 每次加载 50 条
3. **图片压缩** - 上传前压缩
4. **心跳检测** - 保持连接稳定

---

## 📝 7.5 本章总结

### 🎯 关键要点

1. 🔌 **WebSocket** - Socket.io 实现实时通信
2. 👥 **用户管理** - 在线状态和用户列表
3. 💾 **消息持久化** - MongoDB 存储历史消息
4. ⚡ **性能优化** - 虚拟列表、懒加载

### 🚀 下一步

- [[chapter-08-ai-image|第八章：AI 图像生成器]]
- 添加文件传输功能
- 实现端到端加密

---

> 🎉 **恭喜完成第七章！** 你已经掌握了实时应用开发的核心技术！
