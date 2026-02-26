---
title: 🧠 第二章：核心概念
description: 掌握 Prompt Engineering、上下文管理、迭代式开发和 AI 辅助调试
tags:
  - vibe-coding
  - prompt-engineering
  - context-management
  - debugging
category: 理论基础
level: 初级
difficulty: ⭐⭐
estimated_time: 45分钟
---

# 🧠 第二章：核心概念

> 💡 **章节导言**：掌握 Vibe Coding 的核心概念是成为高效 AI 辅助开发者的关键。本章将深入讲解 Prompt Engineering、上下文管理、迭代式开发和 AI 辅助调试四大核心技能。

## 🎯 学习目标

- [ ] 掌握 Prompt Engineering 的基本技巧
- [ ] 理解上下文管理的重要性
- [ ] 学会迭代式开发方法
- [ ] 掌握 AI 辅助调试技术

---

## 🎨 2.1 Prompt Engineering 基础

### 📖 2.1.1 什么是 Prompt Engineering

**Prompt Engineering**（提示工程）是指设计和优化输入给 AI 的提示词（Prompt），以获得最佳输出结果的技术。在 Vibe Coding 中，Prompt 的质量直接决定了生成代码的质量。

> 🎯 **关键认知**：Prompt Engineering 不是简单的"提问"，而是一种结构化沟通的艺术。

### 🏗️ 2.1.2 有效 Prompt 的结构

一个高质量的 Prompt 通常包含以下要素：

```
👤 [角色定义] + 📋 [背景信息] + 🎯 [具体任务] + ⚖️ [约束条件] + 📤 [输出格式]
```

#### 📝 示例：完整的 Prompt 结构

```markdown
👤 【角色定义】
你是一位经验丰富的前端开发工程师，精通 React 和 TypeScript。

📋 【背景信息】
我正在开发一个电商网站，需要实现一个商品列表页面。

🎯 【具体任务】
请帮我创建一个商品列表组件，要求：
1. 显示商品图片、名称、价格和评分
2. 支持按价格排序
3. 支持按分类筛选
4. 响应式设计，适配移动端

⚖️ 【约束条件】
- 使用 React 18 + TypeScript
- 使用 Tailwind CSS 进行样式设计
- 代码需要包含类型定义
- 添加必要的注释

📤 【输出格式】
请提供完整的组件代码，包括：
1. 主组件代码
2. 类型定义
3. 使用示例
```

### ✅ 2.1.3 有效 Prompt 示例

#### 💡 示例 1：明确具体的需求

**❌ 不好的 Prompt：**
```
帮我写一个登录页面
```

**✅ 好的 Prompt：**
```markdown
请帮我创建一个用户登录页面组件，要求：

🛠️ 技术栈：React + TypeScript + Tailwind CSS

🎯 功能需求：
1. 邮箱和密码输入框，带表单验证
2. 显示/隐藏密码切换按钮
3. "记住我"复选框
4. 登录按钮，带加载状态
5. 错误提示信息

🎨 UI 要求：
- 居中卡片布局，最大宽度 400px
- 输入框聚焦时有蓝色边框
- 错误状态显示红色边框和提示
- 响应式设计

请提供完整的组件代码，包含类型定义和基本样式。
```

#### 💡 示例 2：提供上下文信息

**❌ 不好的 Prompt：**
```
修复这个 bug
```

**✅ 好的 Prompt：**
```markdown
我在使用 React 18 开发应用时遇到了一个状态更新问题。

🐛 问题描述：
组件中的计数器状态更新后，UI 没有立即刷新显示新值。

💻 相关代码：
```tsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // 这里显示的还是旧值
};
```

🎯 期望行为：
点击按钮后，计数器立即增加并显示新值。

请帮我分析问题原因并提供修复方案，同时解释为什么。
```

#### 💡 示例 3：要求解释和最佳实践

**✅ 好的 Prompt：**
```markdown
请帮我实现一个 JavaScript 防抖（debounce）函数。

🎯 要求：
1. 函数接受两个参数：要执行的函数和延迟时间
2. 在延迟时间内多次调用只执行最后一次
3. 支持取消功能
4. 使用 TypeScript 编写，包含完整类型定义

📤 请提供：
1. 实现代码
2. 使用示例
3. 解释防抖的工作原理
4. 与节流的区别
5. 实际应用场景
```

### ❌ 2.1.4 常见错误示例

#### 🚫 错误 1：过于模糊
```
帮我写点代码
```
**⚠️ 问题**：AI 不知道要写什么，输出可能完全不符合需求。

#### 🚫 错误 2：缺少技术栈信息
```
创建一个用户管理系统
```
**⚠️ 问题**：不知道使用什么技术，可能生成不兼容的代码。

#### 🚫 错误 3：一次要求太多
```
帮我创建一个完整的电商平台，包括用户系统、商品管理、订单系统、支付集成、物流跟踪、评价系统...
```
**⚠️ 问题**：超出 AI 的上下文限制，生成的代码会不完整。

#### 🚫 错误 4：没有指定输出格式
```
解释一下 React hooks
```
**⚠️ 问题**：输出可能过于简单或过于复杂，不符合预期。

### 📊 2.1.5 Prompt 优化对比

| 维度 | ❌ 优化前 | ✅ 优化后 |
|------|----------|----------|
| **明确性** | "做个按钮" | "创建一个带有加载状态的提交按钮，使用蓝色主题" |
| **完整性** | "修复 bug" | "在用户点击提交时，表单验证失败但页面刷新了，请修复" |
| **上下文** | "怎么优化？" | "这个函数处理 10万条数据时很慢，如何优化性能？" |
| **约束条件** | "写个组件" | "使用 React.memo 优化，支持 ref 转发" |

---

## 🧩 2.2 上下文管理

### 📏 2.2.1 上下文窗口概念

**上下文窗口**（Context Window）是 AI 模型能够同时处理的文本长度限制。不同的模型有不同的上下文限制：

| 🤖 模型 | 📏 上下文窗口 | 📄 大约代码量 |
|--------|-------------|-------------|
| GPT-3.5 | 16K tokens | ~12,000 行代码 |
| GPT-4 | 128K tokens | ~96,000 行代码 |
| Claude 3 | 200K tokens | ~150,000 行代码 |

> 💡 **Token 说明**：Token 是 AI 处理文本的基本单位，一个 token 大约等于 0.75 个英文单词或 0.5 个汉字。

### 🎯 2.2.2 上下文优化技巧

#### 💡 技巧 1：模块化开发

将大项目拆分成小模块，每次只处理一个模块：

```markdown
❌ 不好的做法：
"请帮我 review 这个项目的所有代码"

✅ 好的做法：
"请帮我 review 用户认证模块的代码，这是文件路径：src/auth/login.ts"
```

#### 💡 技巧 2：提供精简的上下文

只提供相关的代码片段，而不是整个文件：

```markdown
我在实现用户注册功能时遇到了问题。

💻 相关代码片段：
```typescript
// src/services/auth.ts
export async function registerUser(data: RegisterData) {
  const user = await db.user.create({ data });
  // 这里需要发送验证邮件
  return user;
}
```

🎯 问题：
如何在创建用户后异步发送验证邮件，但不阻塞响应？
```

#### 💡 技巧 3：使用摘要代替完整代码

对于已讨论过的代码，使用摘要引用：

```markdown
基于之前讨论的 UserService 类（实现了用户 CRUD 操作），
现在需要添加缓存功能。请帮我：
1. 集成 Redis 缓存
2. 实现缓存更新策略
3. 处理缓存穿透问题
```

### 📁 2.2.3 代码片段管理

#### 📌 方法 1：使用文件引用

```markdown
请参考以下文件中的类型定义：
- src/types/user.ts - 用户相关类型
- src/types/api.ts - API 响应类型

基于这些类型，帮我实现用户列表 API。
```

#### 📌 方法 2：创建上下文摘要

```markdown
📋 项目技术栈摘要：
- 前端：React 18 + TypeScript + Vite
- 状态管理：Zustand
- UI 库：Ant Design
- 后端：Node.js + Express
- 数据库：PostgreSQL + Prisma

🎯 当前任务：
实现用户个人资料编辑页面

✅ 已完成的组件：
- UserProfileCard - 显示用户信息
- AvatarUploader - 头像上传

📝 需要实现：
- ProfileEditForm - 编辑表单
```

---

## 🔄 2.3 迭代式开发

### 🔄 2.3.1 增量开发流程

Vibe Coding 的核心是**迭代式开发**，通过多轮对话逐步完善代码：

```
🔄 第1轮：基础框架
    ↓
🔄 第2轮：添加核心功能
    ↓
🔄 第3轮：完善细节和边界处理
    ↓
🔄 第4轮：优化和重构
    ↓
🔄 第5轮：测试和调试
```

### 💡 2.3.2 迭代示例

#### 📝 第 1 轮：基础框架

**Prompt：**
```markdown
请帮我创建一个 Todo List 应用的基础结构，使用 React + TypeScript。
先实现最基本的添加和显示功能。
```

**AI 输出：**
```tsx
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>添加</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 📝 第 2 轮：添加核心功能

**Prompt：**
```markdown
很好！现在请帮我添加以下功能：
1. 标记任务完成/未完成
2. 删除任务
3. 本地存储持久化
```

#### 📝 第 3 轮：完善细节

**Prompt：**
```markdown
请帮我优化以下细节：
1. 添加空状态提示
2. 支持回车键添加
3. 添加简单的样式
4. 显示任务统计（总数/已完成）
```

#### 📝 第 4 轮：优化重构

**Prompt：**
```markdown
请帮我重构代码：
1. 将逻辑提取到自定义 hook
2. 拆分小组件
3. 添加类型定义文件
4. 优化性能（使用 useMemo/useCallback）
```

### 🔄 2.3.3 反馈循环机制

```
┌─────────────┐
│  📝 描述需求  │
└──────┬──────┘
       ↓
┌─────────────┐
│  🤖 AI 生成代码 │
└──────┬──────┘
       ↓
┌─────────────┐     🐛 有问题
│  ✅ 测试验证  │────────→ 📝 反馈修改意见
└──────┬──────┘
       ↓ ✅ 通过
┌─────────────┐
│  🔄 进入下一轮 │
└─────────────┘
```

### 🌿 2.3.4 版本控制策略

在 Vibe Coding 中，版本控制尤为重要：

1. 📝 **频繁提交**：每完成一个功能点就提交
2. 🌿 **清晰的分支**：使用特性分支进行实验
3. 📝 **详细的提交信息**：记录 AI 生成的内容和修改

```bash
# 好的提交信息示例
git commit -m "feat: add user authentication (AI generated)

- Implement login form with validation
- Add JWT token handling
- Create auth context provider

Generated with GPT-4, reviewed and modified"
```

---

## 🐛 2.4 AI 辅助调试

### 🔍 2.4.1 错误诊断技巧

#### 💡 技巧 1：提供完整的错误信息

**❌ 不好的方式：**
```
我的代码报错了，怎么办？
```

**✅ 好的方式：**
```markdown
我的 React 应用运行时出现了以下错误：

🐛 错误信息：
```
TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (UserList.tsx:15:1)
```

💻 相关代码：
```tsx
// UserList.tsx
export function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (  // 第15行
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

📞 调用方式：
```tsx
<UserList />  // 没有传递 users 属性
```

请帮我分析错误原因并提供修复方案。
```

#### 💡 技巧 2：提供上下文信息

```markdown
我在调用 API 时遇到了问题。

💻 请求代码：
```typescript
const response = await fetch('/api/users');
const data = await response.json();
```

🐛 错误信息：
```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

🔍 网络面板显示返回了 HTML 而不是 JSON。

🤔 可能的原因：
1. API 路径错误，返回了 404 页面
2. 服务器端错误，返回了错误页面
3. 认证失败，被重定向到登录页

请帮我分析可能的原因和排查步骤。
```

### 📝 2.4.2 日志分析方法

#### 💡 添加日志进行调试

```markdown
我的函数执行结果不符合预期。

💻 代码：
```typescript
async function processData(items: Item[]) {
  const results = [];
  for (const item of items) {
    const processed = await transform(item);
    results.push(processed);
  }
  return results;
}
```

🐛 问题：处理 100 条数据需要很长时间，我想知道瓶颈在哪里。

🎯 请帮我添加日志，记录：
1. 每条数据的处理时间
2. 总体进度
3. 可能的性能瓶颈
```

### ✅ 2.4.3 修复验证流程

```markdown
✅ 修复验证清单：

1. 🔍 理解问题
   - [ ] 复现错误
   - [ ] 分析错误原因
   - [ ] 确定修复方案

2. 🛠️ 实施修复
   - [ ] 让 AI 生成修复代码
   - [ ] 审查修复方案
   - [ ] 应用修复

3. ✅ 验证修复
   - [ ] 测试原错误场景
   - [ ] 测试边界情况
   - [ ] 运行回归测试

4. 📊 代码质量
   - [ ] 代码审查
   - [ ] 性能检查
   - [ ] 安全检查
```

---

## 📝 2.5 本章总结

### 🎯 关键要点

1. 🎨 **Prompt Engineering**：高质量的 Prompt 需要明确角色、背景、任务、约束和输出格式
2. 🧩 **上下文管理**：注意上下文窗口限制，采用模块化开发和精简上下文策略
3. 🔄 **迭代式开发**：通过多轮对话逐步完善代码，建立有效的反馈循环
4. 🐛 **AI 辅助调试**：提供完整的错误信息和上下文，使用日志分析定位问题

### ✅ 最佳实践

- 📝 始终提供清晰、具体的 Prompt
- 🧩 将大任务拆分成小模块
- 🌿 使用版本控制管理 AI 生成的代码
- 👀 仔细审查 AI 生成的代码
- ✅ 建立系统化的调试流程

---

## ✏️ 练习题

### 📝 选择题

**1. 以下哪个不是高质量 Prompt 的要素？**
- [ ] A) 角色定义
- [ ] B) 技术栈信息
- [x] C) 个人喜好描述
- [ ] D) 约束条件

**2. GPT-4 的上下文窗口大约能容纳多少行代码？**
- [ ] A) ~1,000 行
- [ ] B) ~12,000 行
- [x] C) ~96,000 行
- [ ] D) ~1,000,000 行

**3. 在 Vibe Coding 中，以下哪种做法最好？**
- [ ] A) 一次性让 AI 生成整个项目
- [x] B) 分模块迭代开发
- [ ] C) 不使用版本控制
- [ ] D) 完全依赖 AI，不做代码审查

### 💻 实践题

**4. 优化以下 Prompt：**
```
帮我写个登录功能
```

> 💡 **提示**：参考本章的 Prompt 结构模板

**5. 设计一个迭代式开发计划，用于开发一个"商品购物车"功能，列出每轮要实现的内容。**

> 💡 **提示**：参考 2.3.2 节的迭代示例

---

## 🔑 答案

1. **C** - 个人喜好描述通常不是高质量 Prompt 的必要要素，更重要的是技术细节和功能需求。

2. **C** - GPT-4 有 128K tokens 的上下文窗口，大约相当于 96,000 行代码。

3. **B** - 分模块迭代开发是 Vibe Coding 的最佳实践，可以避免超出上下文限制，也便于代码审查。

4. **参考答案**：
```markdown
请帮我实现一个用户登录功能。

🛠️ 技术栈：React 18 + TypeScript + Tailwind CSS

🎯 功能需求：
1. 邮箱和密码输入框
2. 表单验证（邮箱格式、密码长度）
3. 登录按钮带加载状态
4. 错误提示显示
5. 登录成功后跳转到首页

🎨 UI 要求：
- 居中卡片布局，最大宽度 400px
- 输入框聚焦时蓝色边框
- 错误状态红色提示
- 响应式设计

⚙️ 其他要求：
- 使用 React Hook Form 进行表单管理
- 使用 Zod 进行验证
- 代码包含完整类型定义
- 添加必要的注释

请提供完整的组件代码和使用示例。
```

5. **参考答案**：

🔄 **第 1 轮：基础结构**
- 创建购物车状态管理（添加商品）
- 显示购物车商品列表
- 显示商品基本信息（名称、价格、数量）

🔄 **第 2 轮：核心功能**
- 增加/减少商品数量
- 从购物车移除商品
- 计算总价
- 空购物车状态

🔄 **第 3 轮：完善功能**
- 商品选择/取消选择
- 优惠券功能
- 运费计算
- 库存检查

🔄 **第 4 轮：UI 优化**
- 添加动画效果
- 响应式设计
- 加载状态
- 错误处理

🔄 **第 5 轮：测试和优化**
- 单元测试
- 性能优化
- 边界情况处理
- 代码重构

---

## 📚 延伸阅读

- [[chapter-01-introduction|第一章：Vibe Coding 简介]]
- [[chapter-03-tools|第三章：工具生态]]
- [[chapter-04-environment|第四章：环境配置]]

---

> 🎉 **恭喜完成第二章！** 你已经掌握了 Vibe Coding 的核心概念，准备好了解各种强大的工具了吗？
