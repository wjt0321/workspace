---
title: OpenFang API 参考
tags:
  - OpenFang
  - API
  - 参考
aliases:
  - API文档
  - REST API
date: 2026-03-01
---

# OpenFang API 参考

## 概述

OpenFang 提供 **140+ REST/WebSocket/SSE 端点**，覆盖 Agents、Memory、Workflows、Channels、Models、Skills、A2A、Hands 等。

> [!important] 兼容性
> 提供 OpenAI 兼容 API，现有工具可直接迁移。

## 基础信息

### 基础URL

```
http://localhost:4200
```

### 认证

```bash
# API Key 认证
curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:4200/v1/agents

# 或使用查询参数
curl "http://localhost:4200/v1/agents?api_key=YOUR_API_KEY"
```

### 响应格式

所有API返回JSON格式：

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-03-15T10:30:00Z",
    "request_id": "req_abc123"
  }
}
```

错误响应：

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required field: model",
    "details": { ... }
  }
}
```

---

## OpenAI 兼容 API

### Chat Completions

**端点**: `POST /v1/chat/completions`

```bash
curl -X POST http://localhost:4200/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "researcher",
    "messages": [
      {"role": "user", "content": "分析AI市场趋势"}
    ],
    "stream": true,
    "temperature": 0.7,
    "max_tokens": 4096
  }'
```

**响应（非流式）**:

```json
{
  "id": "chatcmpl_abc123",
  "object": "chat.completion",
  "created": 1710497400,
  "model": "researcher",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "基于我的研究..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

**响应（流式）**:

```
data: {"id":"chatcmpl_abc123","choices":[{"delta":{"content":"基于"},"index":0}]}
data: {"id":"chatcmpl_abc123","choices":[{"delta":{"content":"我的"},"index":0}]}
data: {"id":"chatcmpl_abc123","choices":[{"delta":{"content":"研究"},"index":0}]}
data: [DONE]
```

### Models

**端点**: `GET /v1/models`

```bash
curl http://localhost:4200/v1/models
```

**响应**:

```json
{
  "object": "list",
  "data": [
    {
      "id": "researcher",
      "object": "model",
      "created": 1710497400,
      "owned_by": "openfang"
    },
    {
      "id": "coder",
      "object": "model",
      "created": 1710497400,
      "owned_by": "openfang"
    }
  ]
}
```

### Embeddings

**端点**: `POST /v1/embeddings`

```bash
curl -X POST http://localhost:4200/v1/embeddings \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-small",
    "input": "Hello world"
  }'
```

---

## Agents API

### 列出所有 Agents

**端点**: `GET /v1/agents`

```bash
curl http://localhost:4200/v1/agents
```

**响应**:

```json
{
  "success": true,
  "data": {
    "agents": [
      {
        "id": "agent_researcher_001",
        "name": "researcher",
        "status": "active",
        "model": "claude-sonnet-4-20250514",
        "skills": ["research-methodology", "fact-checking"],
        "created_at": "2024-03-15T10:00:00Z"
      }
    ],
    "total": 1
  }
}
```

### 创建 Agent

**端点**: `POST /v1/agents`

```bash
curl -X POST http://localhost:4200/v1/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-agent",
    "model": "claude-sonnet-4-20250514",
    "skills": ["technical-writing"],
    "system_prompt": "You are a helpful assistant...",
    "capabilities": ["web_search", "memory_store"]
  }'
```

### 获取 Agent

**端点**: `GET /v1/agents/{agent_id}`

```bash
curl http://localhost:4200/v1/agents/agent_researcher_001
```

### 更新 Agent

**端点**: `PUT /v1/agents/{agent_id}`

```bash
curl -X PUT http://localhost:4200/v1/agents/agent_researcher_001 \
  -H "Content-Type: application/json" \
  -d '{
    "skills": ["research-methodology", "citation-apa"]
  }'
```

### 删除 Agent

**端点**: `DELETE /v1/agents/{agent_id}`

```bash
curl -X DELETE http://localhost:4200/v1/agents/agent_researcher_001
```

### 与 Agent 对话

**端点**: `POST /v1/agents/{agent_id}/chat`

```bash
curl -X POST http://localhost:4200/v1/agents/agent_researcher_001/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "研究AI智能体市场",
    "stream": true
  }'
```

---

## Hands API

### 列出所有 Hands

**端点**: `GET /v1/hands`

```bash
curl http://localhost:4200/v1/hands
```

**响应**:

```json
{
  "success": true,
  "data": {
    "hands": [
      {
        "name": "researcher",
        "description": "深度自主研究助手",
        "status": "inactive",
        "built_in": true
      },
      {
        "name": "lead",
        "description": "销售线索生成器",
        "status": "active",
        "built_in": true
      }
    ]
  }
}
```

### 激活 Hand

**端点**: `POST /v1/hands/{name}/activate`

```bash
curl -X POST http://localhost:4200/v1/hands/researcher/activate
```

### 暂停 Hand

**端点**: `POST /v1/hands/{name}/pause`

```bash
curl -X POST http://localhost:4200/v1/hands/researcher/pause
```

### 恢复 Hand

**端点**: `POST /v1/hands/{name}/resume`

```bash
curl -X POST http://localhost:4200/v1/hands/researcher/resume
```

### 停止 Hand

**端点**: `POST /v1/hands/{name}/stop`

```bash
curl -X POST http://localhost:4200/v1/hands/researcher/stop
```

### 获取 Hand 状态

**端点**: `GET /v1/hands/{name}/status`

```bash
curl http://localhost:4200/v1/hands/researcher/status
```

**响应**:

```json
{
  "success": true,
  "data": {
    "name": "researcher",
    "status": "running",
    "current_task": "研究AI市场趋势",
    "progress": 0.65,
    "started_at": "2024-03-15T10:00:00Z",
    "metrics": {
      "sources_consulted": 12,
      "credibility_score": 0.85
    }
  }
}
```

### 配置 Hand

**端点**: `PUT /v1/hands/{name}/config`

```bash
curl -X PUT http://localhost:4200/v1/hands/lead/config \
  -H "Content-Type: application/json" \
  -d '{
    "icp": {
      "industry": ["SaaS", "FinTech"],
      "company_size": {"min": 50, "max": 500}
    },
    "schedule": "0 9 * * *"
  }'
```

---

## Memory API

### 搜索记忆

**端点**: `GET /v1/memory/search`

```bash
curl "http://localhost:4200/v1/memory/search?q=AI%20market&top_k=5"
```

**响应**:

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "mem_abc123",
        "content": "AI市场2024年规模约$50亿...",
        "score": 0.92,
        "session_id": "sess_xyz",
        "created_at": "2024-03-15T10:30:00Z"
      }
    ]
  }
}
```

### 存储知识

**端点**: `POST /v1/memory/knowledge`

```bash
curl -X POST http://localhost:4200/v1/memory/knowledge \
  -H "Content-Type: application/json" \
  -d '{
    "key": "market_size_2024",
    "value": "AI Agent市场2024年规模约$50亿",
    "source": "研究报告",
    "tags": ["market", "AI"]
  }'
```

### 检索知识

**端点**: `GET /v1/memory/knowledge/{key}`

```bash
curl http://localhost:4200/v1/memory/knowledge/market_size_2024
```

### 列出会话

**端点**: `GET /v1/memory/sessions`

```bash
curl "http://localhost:4200/v1/memory/sessions?agent=researcher&limit=10"
```

### 获取会话

**端点**: `GET /v1/memory/sessions/{session_id}`

```bash
curl http://localhost:4200/v1/memory/sessions/sess_abc123
```

### 导出记忆

**端点**: `GET /v1/memory/export`

```bash
curl "http://localhost:4200/v1/memory/export?format=json" -o memory_backup.json
```

---

## Channels API

### 列出通道

**端点**: `GET /v1/channels`

```bash
curl http://localhost:4200/v1/channels
```

### 获取通道状态

**端点**: `GET /v1/channels/{name}/status`

```bash
curl http://localhost:4200/v1/channels/telegram/status
```

**响应**:

```json
{
  "success": true,
  "data": {
    "name": "telegram",
    "status": "connected",
    "messages_today": 1247,
    "active_users": 89,
    "rate_limit_remaining": 15
  }
}
```

### 启用/禁用通道

```bash
# 启用
curl -X POST http://localhost:4200/v1/channels/telegram/enable

# 禁用
curl -X POST http://localhost:4200/v1/channels/telegram/disable
```

### 测试通道

**端点**: `POST /v1/channels/{name}/test`

```bash
curl -X POST http://localhost:4200/v1/channels/telegram/test \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "12345678",
    "message": "测试消息"
  }'
```

---

## Skills API

### 列出技能

**端点**: `GET /v1/skills`

```bash
curl http://localhost:4200/v1/skills
```

### 获取技能详情

**端点**: `GET /v1/skills/{name}`

```bash
curl http://localhost:4200/v1/skills/research-methodology
```

### 安装技能

**端点**: `POST /v1/skills/install`

```bash
curl -X POST http://localhost:4200/v1/skills/install \
  -H "Content-Type: application/json" \
  -d '{
    "name": "technical-writing",
    "source": "fanghub"
  }'
```

### 验证技能

**端点**: `POST /v1/skills/{name}/validate`

```bash
curl -X POST http://localhost:4200/v1/skills/my-skill/validate
```

---

## WebSocket API

### 连接

```
ws://localhost:4200/ws
```

### 消息格式

```json
{
  "type": "chat",
  "payload": {
    "agent": "researcher",
    "message": "Hello"
  }
}
```

### 订阅事件

```json
{
  "type": "subscribe",
  "events": ["agent.message", "hand.status", "channel.message"]
}
```

### 事件类型

| 事件 | 说明 |
|------|------|
| `agent.message` | Agent消息 |
| `agent.status` | Agent状态变更 |
| `hand.status` | Hand状态变更 |
| `hand.progress` | Hand进度更新 |
| `channel.message` | 通道消息 |
| `system.alert` | 系统告警 |

### JavaScript 示例

```javascript
const ws = new WebSocket('ws://localhost:4200/ws');

ws.onopen = () => {
  // 订阅事件
  ws.send(JSON.stringify({
    type: 'subscribe',
    events: ['agent.message', 'hand.status']
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Event:', data.type, data.payload);
};

// 发送消息
ws.send(JSON.stringify({
  type: 'chat',
  payload: {
    agent: 'researcher',
    message: '分析市场趋势'
  }
}));
```

---

## Server-Sent Events (SSE)

### 端点

```
GET /v1/events
```

### 示例

```javascript
const eventSource = new EventSource('http://localhost:4200/v1/events');

eventSource.addEventListener('hand.status', (event) => {
  const data = JSON.parse(event.data);
  console.log('Hand status:', data);
});

eventSource.addEventListener('agent.message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Agent message:', data);
});
```

---

## 系统API

### 健康检查

**端点**: `GET /health`

```bash
curl http://localhost:4200/health
```

**响应**:

```json
{
  "status": "ok"
}
```

### 详细状态

**端点**: `GET /v1/system/status`

```bash
curl -H "Authorization: Bearer $API_KEY" \
  http://localhost:4200/v1/system/status
```

**响应**:

```json
{
  "success": true,
  "data": {
    "version": "0.1.0",
    "uptime": "3d 5h 23m",
    "memory": {
      "used": "128MB",
      "total": "512MB"
    },
    "agents": {
      "active": 3,
      "total": 5
    },
    "hands": {
      "active": 2
    },
    "channels": {
      "connected": 4
    }
  }
}
```

### 配置

**端点**: `GET /v1/system/config`

```bash
curl http://localhost:4200/v1/system/config
```

---

## 错误码

| 错误码 | HTTP状态码 | 说明 |
|--------|-----------|------|
| `INVALID_REQUEST` | 400 | 请求格式错误 |
| `UNAUTHORIZED` | 401 | 认证失败 |
| `FORBIDDEN` | 403 | 权限不足 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `RATE_LIMITED` | 429 | 请求过于频繁 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |
| `SERVICE_UNAVAILABLE` | 503 | 服务不可用 |

---

## SDK 示例

### Python

```python
import httpx

class OpenFangClient:
    def __init__(self, base_url="http://localhost:4200", api_key=None):
        self.base_url = base_url
        self.api_key = api_key
        self.client = httpx.Client()
    
    def chat(self, agent, message, stream=False):
        headers = {}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"
        
        response = self.client.post(
            f"{self.base_url}/v1/agents/{agent}/chat",
            headers=headers,
            json={"message": message, "stream": stream}
        )
        return response.json()

# 使用
client = OpenFangClient()
result = client.chat("researcher", "分析AI市场")
print(result)
```

### Node.js

```javascript
class OpenFangClient {
  constructor(baseUrl = 'http://localhost:4200', apiKey = null) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async chat(agent, message, stream = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(`${this.baseUrl}/v1/agents/${agent}/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, stream })
    });

    return response.json();
  }
}

// 使用
const client = new OpenFangClient();
const result = await client.chat('researcher', '分析AI市场');
console.log(result);
```

---

## 相关链接

- [[03-快速入门]] - 快速入门
- [[04-核心概念-Hands]] - Hands 系统
- [[10-架构设计]] - 系统架构

---

> [!info] 提示
> 使用 `openfang api docs` 在本地启动交互式API文档。
