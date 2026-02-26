---
title: 🎨 第八章：AI 图像生成器
description: 开发集成第三方 AI API 的图像生成应用，学习异步任务处理和错误处理
tags:
  - vibe-coding
  - project
  - ai
  - image-generation
  - fastapi
category: 实战项目
level: 中级
difficulty: ⭐⭐⭐
estimated_time: 120分钟
---

# 🎨 第八章：AI 图像生成器

> 💡 **章节导言**：本章将带你开发一个 AI 图像生成应用，学习如何集成第三方 API、处理异步任务和优化用户体验。

## 🎯 学习目标

- [ ] 集成第三方 AI 图像 API
- [ ] 实现异步任务处理
- [ ] 学习错误处理和重试机制
- [ ] 优化性能和用户体验

---

## 📋 8.1 项目需求分析

### 🎯 8.1.1 功能需求

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 文生图 | 输入提示词生成图像 | P0 |
| 图库管理 | 查看历史生成的图像 | P0 |
| 图像下载 | 下载生成的图像 | P0 |
| 批量生成 | 一次生成多张图像 | P1 |
| 风格选择 | 选择不同的艺术风格 | P1 |

### 🛠️ 8.1.2 技术栈

```markdown
🎯 前端：
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 📤 文件上传

🎯 后端：
- 🐍 Python + FastAPI
- 🎨 Stable Diffusion API / DALL-E
- 📦 任务队列（Celery + Redis）
- 🗄️ 文件存储（AWS S3 / 本地）
```

---

## 🔌 8.2 第三方 API 集成

### 💬 API 选择与配置

**Prompt 1：API 集成**
```markdown
请帮我集成 AI 图像生成 API。

🎯 选择：
- 方案1：OpenAI DALL-E 3
- 方案2：Stability AI
- 方案3：本地 Stable Diffusion

🎯 功能需求：
1. 封装 API 调用
2. 错误处理
3. 限流控制
4. 结果缓存

📤 请提供 Python 封装代码。
```

### 📝 核心代码

**app/services/image_service.py**
```python
import httpx
import asyncio
from typing import Optional, List
from app.core.config import settings
from app.models.image import ImageGenerationRequest, ImageGenerationResult

class ImageService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=60.0)
        
    async def generate_image(
        self,
        prompt: str,
        size: str = "1024x1024",
        quality: str = "standard",
        style: Optional[str] = None,
        n: int = 1
    ) -> ImageGenerationResult:
        """生成图像"""
        try:
            if settings.USE_OPENAI:
                return await self._generate_with_openai(
                    prompt, size, quality, style, n
                )
            else:
                return await self._generate_with_stability(
                    prompt, size, style, n
                )
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 429:
                raise Exception("API 限流，请稍后重试")
            raise Exception(f"API 错误: {e.response.text}")
        except Exception as e:
            raise Exception(f"生成失败: {str(e)}")
    
    async def _generate_with_openai(
        self,
        prompt: str,
        size: str,
        quality: str,
        style: Optional[str],
        n: int
    ) -> ImageGenerationResult:
        """使用 OpenAI DALL-E"""
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
                "style": style or "vivid",
                "n": n
            }
        )
        response.raise_for_status()
        
        data = response.json()
        return ImageGenerationResult(
            urls=[img["url"] for img in data["data"]],
            revised_prompt=data["data"][0].get("revised_prompt", prompt)
        )
    
    async def _generate_with_stability(
        self,
        prompt: str,
        size: str,
        style: Optional[str],
        n: int
    ) -> ImageGenerationResult:
        """使用 Stability AI"""
        # 实现 Stability AI 调用
        pass
    
    async def download_image(self, url: str) -> bytes:
        """下载图像"""
        response = await self.client.get(url)
        response.raise_for_status()
        return response.content

image_service = ImageService()
```

---

## ⏳ 8.3 异步任务处理

### 💬 任务队列设计

**Prompt 2：异步处理**
```markdown
请帮我实现图像生成的异步任务处理。

🎯 需求：
1. 图像生成是耗时操作（10-30秒）
2. 需要任务队列管理
3. 实时进度通知
4. 超时和重试机制

🎯 技术栈：
- Celery + Redis
- WebSocket 进度推送
- 任务状态持久化

📤 请提供完整实现。
```

### 📝 核心代码

**app/tasks/image_tasks.py**
```python
from celery import Celery
from app.services.image_service import image_service
from app.models.task import TaskStatus
from app.core.database import db

 celery_app = Celery('image_tasks', broker='redis://localhost:6379')

@celery_app.task(bind=True, max_retries=3)
def generate_image_task(self, prompt: str, user_id: str, settings: dict):
    """图像生成任务"""
    try:
        # 更新任务状态为处理中
        self.update_state(
            state='PROGRESS',
            meta={'progress': 10, 'message': '正在生成图像...'}
        )
        
        # 调用 API 生成图像
        result = asyncio.run(image_service.generate_image(
            prompt=prompt,
            size=settings.get('size', '1024x1024'),
            style=settings.get('style')
        ))
        
        self.update_state(
            state='PROGRESS',
            meta={'progress': 80, 'message': '正在保存图像...'}
        )
        
        # 下载并保存图像
        image_data = asyncio.run(image_service.download_image(result.urls[0]))
        
        # 保存到数据库
        image_record = db.images.insert_one({
            'user_id': user_id,
            'prompt': prompt,
            'revised_prompt': result.revised_prompt,
            'image_data': image_data,
            'created_at': datetime.utcnow()
        })
        
        return {
            'status': 'success',
            'image_id': str(image_record.inserted_id),
            'url': result.urls[0]
        }
        
    except Exception as exc:
        # 重试逻辑
        if self.request.retries < self.max_retries:
            self.retry(countdown=60, exc=exc)
        
        return {
            'status': 'failed',
            'error': str(exc)
        }
```

---

## 🎨 8.4 前端界面

### 💬 界面设计

**Prompt 3：前端界面**
```markdown
请帮我创建 AI 图像生成器的前端界面。

🎯 功能需求：
1. 提示词输入框（带示例）
2. 参数设置（尺寸、风格）
3. 生成按钮和进度显示
4. 图库展示
5. 下载功能

🎨 UI 要求：
- 现代化设计
- 加载动画
- 错误提示
- 响应式布局

📤 请提供 React 组件代码。
```

### 📝 核心组件

**components/ImageGenerator.tsx**
```typescript
import { useState } from 'react'
import { Loader2, Download, Sparkles } from 'lucide-react'

interface GenerationSettings {
  size: '1024x1024' | '1024x1792' | '1792x1024'
  style: 'vivid' | 'natural'
  quality: 'standard' | 'hd'
}

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [settings, setSettings] = useState<GenerationSettings>({
    size: '1024x1024',
    style: 'vivid',
    quality: 'standard'
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入提示词')
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setError('')

    try {
      const response = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, settings })
      })

      if (!response.ok) {
        throw new Error('生成失败')
      }

      const data = await response.json()
      setGeneratedImages((prev) => [data.url, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async (url: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `generated-image-${Date.now()}.png`
    link.click()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="text-purple-500" />
          AI 图像生成器
        </h1>
        <p className="text-gray-600 mt-2">输入提示词，让 AI 为你创作图像</p>
      </div>

      {/* 生成区域 */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        {/* 提示词输入 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">提示词</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想要生成的图像，例如：一只穿着宇航服的猫在月球上..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={3}
          />
        </div>

        {/* 参数设置 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">尺寸</label>
            <select
              value={settings.size}
              onChange={(e) =>
                setSettings({ ...settings, size: e.target.value as any })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="1024x1024">正方形 (1024x1024)</option>
              <option value="1024x1792">竖屏 (1024x1792)</option>
              <option value="1792x1024">横屏 (1792x1024)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">风格</label>
            <select
              value={settings.style}
              onChange={(e) =>
                setSettings({ ...settings, style: e.target.value as any })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="vivid">生动 (Vivid)</option>
              <option value="natural">自然 (Natural)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">质量</label>
            <select
              value={settings.quality}
              onChange={(e) =>
                setSettings({ ...settings, quality: e.target.value as any })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="standard">标准</option>
              <option value="hd">高清</option>
            </select>
          </div>
        </div>

        {/* 生成按钮 */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" />
              生成中... {progress}%
            </>
          ) : (
            <>
              <Sparkles size={20} />
              生成图像
            </>
          )}
        </button>

        {/* 错误提示 */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* 图库 */}
      {generatedImages.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">生成的图像</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {generatedImages.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Generated ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button
                  onClick={() => handleDownload(url)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  title="下载"
                >
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## 📝 8.5 本章总结

### 🎯 关键要点

1. 🔌 **API 集成** - 封装第三方 AI API
2. ⏳ **异步处理** - Celery 任务队列
3. 🎨 **用户体验** - 进度显示和错误处理
4. 💾 **数据管理** - 图像存储和历史记录

### 🚀 下一步

- [[chapter-09-best-practices|第九章：最佳实践]]
- 添加图像编辑功能
- 实现用户积分系统

---

> 🎉 **恭喜完成第八章！** 你已经掌握了 AI 应用开发的核心技能！
