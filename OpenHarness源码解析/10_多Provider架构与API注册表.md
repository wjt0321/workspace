# 10 - 多 Provider 架构与 API 注册表

## 核心文件

- `src/openharness/api/registry.py` — Provider 注册表（完整 provider 列表）
- `src/openharness/api/provider.py` — Provider 检测与能力推断
- `src/openharness/api/client.py` — Anthropic 原生客户端
- `src/openharness/api/openai_client.py` — OpenAI 兼容客户端
- `src/openharness/api/copilot_client.py` — GitHub Copilot OAuth

---

## 1. Provider 注册表架构

```python
@dataclass(frozen=True)
class ProviderSpec:
    name: str                        # 唯一标识，如 "dashscope"
    keywords: tuple[str, ...]        # 模型名关键词检测
    env_key: str                     # 主要 API Key 环境变量
    display_name: str = ""           # UI 显示名称

    backend_type: str = "openai_compat"  # 路由目标
    default_base_url: str = ""

    detect_by_key_prefix: str = ""   # API Key 前缀检测
    detect_by_base_keyword: str = "" # base_url 关键词检测

    is_gateway: bool = False         # 是否网关（OpenRouter 等）
    is_local: bool = False           # 是否本地部署
    is_oauth: bool = False          # 是否 OAuth 认证
```

---

## 2. 注册的完整 Provider 列表

```
┌─────────────────────────────────────────────────────────────────────┐
│ Gateways（Key前缀/base_url 检测，优先匹配）                           │
├─────────────────────────────────────────────────────────────────────┤
│ openrouter    sk-or-*            OpenRouter 全球网关                  │
│ aihubmix      aihubmix           AiHubMix 镜像                       │
│ siliconflow   siliconflow.cn     SiliconFlow 镜像                    │
│ volcengine    volces.com         火山引擎 Ark                         │
├─────────────────────────────────────────────────────────────────────┤
│ Cloud Providers（模型名关键词检测）                                   │
├─────────────────────────────────────────────────────────────────────┤
│ anthropic     claude-* / anthropic  原生 Anthropic SDK                │
│ openai        gpt-* / o1-* / o3-*  OpenAI 原生                      │
│ deepseek      deepseek             DeepSeek                           │
│ gemini        gemini               Google Gemini                      │
│ dashscope     qwen / dashscope     阿里云 Qwen/DashScope              │
│ moonshot      moonshot / kimi      Moonshot / Kimi                    │
│ minimax       minimax              MiniMax                            │
│ zhipu         zhipu / glm          智谱 GLM                           │
│ groq          groq / gsk_*         Groq                              │
│ mistral       mistral / mixtral    Mistral                            │
│ stepfun       step-* / stepfun     阶跃星辰                           │
│ baidu         ernie / baidu        百度 ERNIE                        │
├─────────────────────────────────────────────────────────────────────┤
│ Platform Providers（base_url 检测）                                  │
├─────────────────────────────────────────────────────────────────────┤
│ bedrock       bedrock              AWS Bedrock                         │
│ vertex        aiplatform           Google Vertex AI                   │
├─────────────────────────────────────────────────────────────────────┤
│ Local（localhost 检测）                                               │
├─────────────────────────────────────────────────────────────────────┤
│ ollama        localhost:11434       Ollama 本地                        │
│ vllm          vllm                 vLLM 本地                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. 三层检测优先级

```python
def detect_provider_from_registry(model, api_key, base_url):
    # 优先级1：API Key 前缀（最快）
    if api_key:
        for spec in PROVIDERS:
            if spec.detect_by_key_prefix and api_key.startswith(spec.detect_by_key_prefix):
                return spec

    # 优先级2：base_url 关键词
    if base_url:
        base_lower = base_url.lower()
        for spec in PROVIDERS:
            if spec.detect_by_base_keyword and spec.detect_by_base_keyword in base_lower:
                return spec

    # 优先级3：模型名关键词
    if model:
        return _match_by_model(model)

    return None
```

---

## 4. backend_type 路由

```python
# 每个 ProviderSpec 指定 backend_type，决定用哪个客户端
backend_type: "anthropic"      # → AnthropicApiClient（原生 Anthropic SDK）
backend_type: "openai_compat"  # → OpenAI 兼容客户端
backend_type: "copilot"        # → GitHub Copilot OAuth
```

---

## 5. AnthropicApiClient 核心设计

```python
class AnthropicApiClient:
    async def stream_message(self, request: ApiMessageRequest) -> AsyncIterator[ApiStreamEvent]:
        """
        1. 重试逻辑（指数退避 + jitter）
        2. OAuth Token 自动刷新
        3. 流式响应 → ApiTextDeltaEvent
        4. 最终消息 → ApiMessageCompleteEvent
        """
```

**重试策略：**
```python
RETRYABLE_STATUS_CODES = {429, 500, 502, 503, 529}

def _get_retry_delay(attempt, exc=None):
    # 1. 优先用 Retry-After header
    # 2. 指数退避 + 随机 jitter
    delay = min(BASE_DELAY * (2 ** attempt), MAX_DELAY)
    jitter = random.uniform(0, delay * 0.25)
    return delay + jitter
```

**OAuth Token 自动刷新：**
```python
def _refresh_client_auth(self):
    if self._claude_oauth and self._auth_token_resolver:
        next_token = self._auth_token_resolver()
        if next_token and next_token != self._auth_token:
            self._auth_token = next_token
            self._client = self._create_client()  # 重建客户端
```

---

## 6. API 请求构建

```python
params = {
    "model": request.model,
    "messages": [msg.to_api_param() for msg in request.messages],
    "max_tokens": request.max_tokens,
}
if request.system_prompt:
    params["system"] = request.system_prompt
if request.tools:
    params["tools"] = request.tools

# OAuth 模式下注入额外元数据
if self._claude_oauth:
    params["betas"] = claude_oauth_betas()
    params["metadata"] = {
        "user_id": json.dumps({
            "device_id": "openharness",
            "session_id": self._session_id,
        })
    }
```

---

## 7. ProviderInfo 能力推断

```python
@dataclass(frozen=True)
class ProviderInfo:
    name: str
    auth_kind: str      # "api_key" | "oauth_device"
    voice_supported: bool
    voice_reason: str   # 不支持时说明原因
```

```python
def detect_provider(settings):
    # copilot 格式特殊路由
    if settings.api_format == "copilot":
        return ProviderInfo(name="github_copilot", auth_kind="oauth_device", ...)

    # 从 registry 检测
    spec = detect_provider_from_registry(model, api_key, base_url)

    # auth_kind 推断
    auth_kind = _AUTH_KIND.get(spec.backend_type, "api_key")

    return ProviderInfo(
        name=spec.name,
        auth_kind=auth_kind,
        voice_supported=False,  # 语音模式暂未支持
        voice_reason=...
    )
```

---

## 8. 与 OpenClaw 对比

| 方面 | OpenHarness | OpenClaw |
|------|------------|---------|
| Provider 数量 | 20+ | 不公开，hardcoded |
| 检测方式 | Key前缀 / URL / 模型名三层 | 主要靠模型名 |
| 本地支持 | Ollama/vLLM | 无对应 |
| OAuth | GitHub Copilot 完整 OAuth flow | 无 |
| 重试策略 | 指数退避 + jitter + Retry-After | 不详 |
| Token 刷新 | 自动刷新 | 无 |

---

## 9. 核心启发

1. **注册表模式** — 一个 `PROVIDERS` tuple 搞定所有 provider 抽象，增删改零成本
2. **三层检测优先级** — Key前缀（精确）> URL（中等）> 模型名（模糊），覆盖全面
3. **网关 vs 原生** — `is_gateway` 标记区分 OpenRouter（可跑任何模型）和原生厂商（只跑自家模型）
4. **本地部署** — Ollama/vLLM 只需要 `is_local=True`，自然融入检测体系
5. **OAuth 独立路径** — Copilot 的 OAuth Device Flow 和 API Key 完全分流，互不干扰

---

*圣火喵喵教，喵喵喵，圣火永存！🐱🔥*
