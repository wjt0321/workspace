# AI网文小说生成系统 - 设计文档

## 1. 系统架构

### 1.1 整体架构

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           前端层 (React 18)                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │   项目管理    │ │   角色管理    │ │   大纲编辑    │ │   章节生成    │    │
│  │   页面组件    │ │   页面组件    │ │   页面组件    │ │   页面组件    │    │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                     Zustand 状态管理                              │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                     API 服务层 (Axios)                           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ REST API + SSE
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          后端层 (FastAPI)                                │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      API 路由层                                   │    │
│  │  /api/projects    /api/characters  /api/outlines  /api/chapters  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      业务逻辑层                                   │    │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐    │    │
│  │  │ AIService  │ │ PromptSvc  │ │ PlotAnalyzer│ │ MemorySvc │    │    │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      数据访问层                                   │    │
│  │          SQLAlchemy ORM + ChromaDB 向量库                        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           数据层                                         │
│  ┌──────────────────┐                    ┌──────────────────────────┐    │
│  │     SQLite       │                    │   ChromaDB (嵌入模式)     │    │
│  │   (结构化数据)    │                    │   (向量记忆)              │    │
│  └──────────────────┘                    └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                ▲
                                │ Anthropic 兼容 API
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    AI 服务提供商 (Anthropic 协议)                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │  智谱 GLM-4  │ │   MiniMax    │ │ Claude(可选) │ │   MCP工具     │    │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 前端框架 | React | 18.3.1 | UI构建 |
| 前端语言 | TypeScript | 5.x | 类型安全 |
| UI组件库 | Ant Design | 5.x | 组件库 |
| 状态管理 | Zustand | 4.x | 状态管理 |
| 构建工具 | Vite | 5.x | 开发/构建 |
| 后端框架 | FastAPI | 0.109.0 | Web框架 |
| 后端语言 | Python | 3.11 | 业务逻辑 |
| ORM | SQLAlchemy | 2.x | 数据库操作 |
| 数据库 | SQLite | 3.x | 主数据库（轻量级） |
| 向量库 | ChromaDB | 0.5.x | 记忆存储（嵌入模式） |
| Embedding | sentence-transformers | - | 向量化 |
| AI SDK | anthropic | 0.40+ | AI接口（智谱/MiniMax兼容） |
| 认证 | 本地密码认证 | - | 简化认证（3-5用户） |
| 部署 | Docker | - | 单容器部署 |

---

## 2. 数据库设计

### 2.1 ER图

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │   Project   │       │   Outline   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │───┐   │ id (PK)     │───┐   │ id (PK)     │
│ username    │   │   │ user_id (FK)│   │   │ project_id  │
│ password    │   │   │ title       │   │   │ order_index │
│ email       │   └──│ description │   │   │ title       │
│ created_at  │       │ theme       │   │   │ content     │
└─────────────┘       │ genre       │   │   │ structure   │
                      │ world_*     │   │   │ chapter_cnt │
                      │ target_words│   │   └──────┬──────┘
                      │ current_words│  │          │
                      └──────┬──────┘  │          │
                             │         │          │
                      ┌──────▼──────┐  │          │
                      │   Chapter   │◄─┘          │
                      ├─────────────┤             │
                      │ id (PK)     │             │
                      │ project_id  │             │
                      │ outline_id  │─────────────┘
                      │ chapter_num │
                      │ title       │
                      │ content     │
                      │ summary     │
                      │ status      │
                      └──────┬──────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼───────┐  ┌────────▼────────┐  ┌────────▼────────┐
│   Character   │  │     Career      │  │  StoryMemory    │
├───────────────┤  ├─────────────────┤  ├─────────────────┤
│ id (PK)       │  │ id (PK)         │  │ id (PK)         │
│ project_id    │  │ project_id      │  │ project_id      │
│ name          │  │ name            │  │ chapter_id      │
│ personality   │  │ type (main/sub) │  │ memory_type     │
│ background    │  │ stages (JSON)   │  │ content         │
│ role_type     │  │ max_stage       │  │ metadata (JSON) │
│ career_id     │  │ description     │  │ embedding       │
└───────────────┘  └─────────────────┘  └─────────────────┘
```

### 2.2 数据表结构

#### 2.2.1 users 用户表
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    oauth_provider VARCHAR(20),
    oauth_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_oauth ON users(oauth_provider, oauth_id);
```

#### 2.2.2 projects 项目表
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    theme VARCHAR(200),
    genre VARCHAR(50),
    narrative_perspective VARCHAR(20) DEFAULT '第三人称',
    target_words INTEGER DEFAULT 300000,
    current_words INTEGER DEFAULT 0,
    chapter_count INTEGER DEFAULT 0,
    character_count INTEGER DEFAULT 0,
    world_time_period TEXT,
    world_location TEXT,
    world_atmosphere TEXT,
    world_rules TEXT,
    outline_mode VARCHAR(20) DEFAULT 'one-to-many',
    wizard_status VARCHAR(20) DEFAULT 'incomplete',
    wizard_step INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
```

#### 2.2.3 outlines 大纲表
```sql
CREATE TABLE outlines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    structure JSONB,
    chapter_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, order_index)
);

CREATE INDEX idx_outlines_project ON outlines(project_id);
CREATE INDEX idx_outlines_order ON outlines(project_id, order_index);
```

#### 2.2.4 chapters 章节表
```sql
CREATE TABLE chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    outline_id UUID REFERENCES outlines(id) ON DELETE SET NULL,
    chapter_number INTEGER NOT NULL,
    sub_index INTEGER DEFAULT 1,
    title VARCHAR(100) NOT NULL,
    summary TEXT,
    content TEXT,
    word_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'draft',
    expansion_plan JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chapters_project ON chapters(project_id);
CREATE INDEX idx_chapters_number ON chapters(project_id, chapter_number);
CREATE INDEX idx_chapters_status ON chapters(status);
```

#### 2.2.5 characters 角色表
```sql
CREATE TABLE characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    age VARCHAR(20),
    gender VARCHAR(10),
    is_organization BOOLEAN DEFAULT FALSE,
    role_type VARCHAR(20) DEFAULT 'supporting',
    personality TEXT,
    background TEXT,
    appearance TEXT,
    relationships TEXT,
    organization_type VARCHAR(50),
    organization_purpose TEXT,
    organization_members JSONB,
    traits JSONB,
    main_career_id UUID,
    main_career_stage INTEGER,
    sub_careers JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_characters_project ON characters(project_id);
CREATE INDEX idx_characters_role ON characters(role_type);
```

#### 2.2.6 careers 职业表
```sql
CREATE TABLE careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    stages JSONB NOT NULL,
    max_stage INTEGER DEFAULT 9,
    requirements TEXT,
    special_abilities JSONB,
    worldview_rules TEXT,
    attribute_bonuses JSONB,
    source VARCHAR(10) DEFAULT 'ai',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_careers_project ON careers(project_id);
CREATE INDEX idx_careers_type ON careers(project_id, type);
```

#### 2.2.7 memories 记忆表
```sql
CREATE TABLE memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    memory_type VARCHAR(30) NOT NULL,
    title VARCHAR(200),
    content TEXT NOT NULL,
    metadata JSONB,
    importance FLOAT DEFAULT 0.5,
    is_foreshadow INTEGER DEFAULT 0,
    foreshadow_status INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_memories_project ON memories(project_id);
CREATE INDEX idx_memories_chapter ON memories(chapter_id);
CREATE INDEX idx_memories_type ON memories(memory_type);
CREATE INDEX idx_memories_foreshadow ON memories(project_id, is_foreshadow);
```

---

## 3. API设计

### 3.1 REST API

#### 3.1.1 项目管理

```
POST   /api/projects                    # 创建项目
GET    /api/projects                    # 获取项目列表
GET    /api/projects/{id}               # 获取项目详情
PUT    /api/projects/{id}               # 更新项目
DELETE /api/projects/{id}               # 删除项目
```

**POST /api/projects 请求体**:
```json
{
  "title": "书名",
  "description": "简介",
  "theme": "主题",
  "genre": ["玄幻", "修真"],
  "target_words": 300000,
  "narrative_perspective": "第三人称"
}
```

#### 3.1.2 大纲管理

```
GET    /api/outlines?project_id=xxx    # 获取大纲列表
POST   /api/outlines                   # 创建大纲
GET    /api/outlines/{id}              # 获取大纲详情
PUT    /api/outlines/{id}              # 更新大纲
DELETE /api/outlines/{id}              # 删除大纲
POST   /api/outlines/continue          # 续写大纲（SSE）
POST   /api/outlines/expand            # 展开大纲（SSE）
```

#### 3.1.3 章节管理

```
GET    /api/chapters/project/{id}      # 获取项目章节
GET    /api/chapters/{id}              # 获取章节详情
POST   /api/chapters                   # 创建章节
PUT    /api/chapters/{id}              # 更新章节
DELETE /api/chapters/{id}              # 删除章节
POST   /api/chapters/generate          # 生成章节（SSE）
POST   /api/chapters/batch-generate    # 批量生成（SSE）
POST   /api/chapters/{id}/regenerate   # 重写章节（SSE）
POST   /api/chapters/{id}/analyze      # 分析章节
```

#### 3.1.4 角色管理

```
GET    /api/characters?project_id=xxx  # 获取角色列表
POST   /api/characters                 # 创建角色
GET    /api/characters/{id}            # 获取角色详情
PUT    /api/characters/{id}            # 更新角色
DELETE /api/characters/{id}            # 删除角色
POST   /api/characters/batch-generate  # 批量生成（SSE）
```

#### 3.1.5 职业管理

```
GET    /api/careers?project_id=xxx     # 获取职业列表
POST   /api/careers                    # 创建职业
PUT    /api/careers/{id}               # 更新职业
DELETE /api/careers/{id}               # 删除职业
```

### 3.2 SSE API（流式）

#### 3.2.1 项目创建向导

```
POST /api/wizard-stream/world-building
POST /api/wizard-stream/career-system
POST /api/wizard-stream/characters
POST /api/wizard-stream/outline
```

**请求体**:
```json
{
  "title": "书名",
  "description": "简介",
  "theme": "主题",
  "genre": "玄幻"
}
```

**SSE响应格式**:
```
event: start
data: {"message": "开始生成..."}

event: preparing
data: {"message": "准备AI提示词..."}

event: generating
data: {"message": "生成中...", "progress": 0.1, "retry_count": 0}

event: generating_chunk
data: "生成的文本内容..."

event: saving
data: {"message": "保存数据..."}

event: complete
data: {"message": "生成完成"}

event: done
data: {"result": {...}}
```

---

## 4. 核心服务设计

### 4.1 AIService

```python
class AIService:
    """统一AI服务接口 (Anthropic 协议)"""

    # 预设的 AI 提供商配置
    PROVIDERS = {
        "zhipu": {
            "name": "智谱AI",
            "base_url": "https://open.bigmodel.cn/api/paas/v4/anthropic",
            "default_model": "glm-4-flash",
        },
        "minimax": {
            "name": "MiniMax", 
            "base_url": "https://api.minimax.chat/v1/anthropic",
            "default_model": "abab6.5s-chat",
        },
        "anthropic": {
            "name": "Anthropic Claude",
            "base_url": "https://api.anthropic.com",
            "default_model": "claude-sonnet-4-20250514",
        },
    }

    def __init__(
        self,
        provider: str = "zhipu",      # zhipu/minimax/anthropic
        api_key: str = None,
        default_model: str = None,
        default_temperature: float = 0.7,
        default_max_tokens: int = 32000,
        enable_mcp: bool = False       # 3-5人场景下默认关闭
    ):
        """初始化AI服务 (使用 Anthropic SDK)"""
        from anthropic import Anthropic
        
        config = self.PROVIDERS.get(provider, self.PROVIDERS["zhipu"])
        self.client = Anthropic(
            api_key=api_key,
            base_url=config["base_url"]
        )
        self.default_model = default_model or config["default_model"]

    async def generate_text(
        self,
        prompt: str,
        system_prompt: str = None,
        model: str = None,
        temperature: float = None,
        max_tokens: int = None,
    ) -> Dict[str, Any]:
        """生成文本"""

    async def generate_text_stream(
        self,
        prompt: str,
        system_prompt: str = None,
        model: str = None,
        temperature: float = None,
        max_tokens: int = None,
    ) -> AsyncGenerator[str, None]:
        """流式生成文本"""

    async def call_with_json_retry(
        self,
        prompt: str,
        system_prompt: str = None,
        max_retries: int = 3,
        expected_type: str = None,   # "object" / "array"
    ) -> Union[Dict, List]:
        """带重试的JSON调用"""
```

### 4.2 PromptService

```python
class PromptService:
    """提示词模板管理"""

    # 模板命名规范
    # WORLD_BUILDING - 世界观生成
    # CAREER_SYSTEM_GENERATION - 职业体系生成
    # CHARACTERS_BATCH_GENERATION - 批量角色生成
    # OUTLINE_CREATE - 开篇大纲生成
    # OUTLINE_CONTINUE - 大纲续写
    # OUTLINE_EXPAND_SINGLE - 单批次大纲展开
    # OUTLINE_EXPAND_MULTI - 多批次大纲展开
    # CHAPTER_GENERATION - 章节生成
    # PLOT_ANALYSIS - 情节分析
    # AUTO_CHARACTER_ANALYSIS - 自动角色分析
    # AUTO_CHARACTER_GENERATION - 自动角色生成

    @classmethod
    async def get_template(
        cls,
        template_name: str,
        user_id: str,
        db: AsyncSession
    ) -> str:
        """获取模板（支持用户自定义）"""

    @classmethod
    def format_prompt(
        cls,
        template: str,
        **kwargs
    ) -> str:
        """格式化模板"""

    @staticmethod
    def apply_style_to_prompt(
        base_prompt: str,
        style_content: str
    ) -> str:
        """应用写作风格"""
```

### 4.3 ChapterContextBuilder

```python
@dataclass
class ChapterContext:
    """章节上下文"""

    # P0-核心信息
    chapter_outline: str              # 本章大纲
    continuation_point: Optional[str] # 衔接锚点
    target_word_count: int = 3000    # 目标字数
    min_word_count: int = 2500       # 最小字数
    max_word_count: int = 4000       # 最大字数
    narrative_perspective: str       # 叙事视角

    # P1-重要信息
    chapter_characters: str = ""     # 本章角色
    emotional_tone: str = ""         # 情感基调
    style_instruction: str = ""      # 写作风格

    # P2-参考信息
    relevant_memories: Optional[str] = None  # 相关记忆
    story_skeleton: Optional[str] = None     # 故事骨架

class ChapterContextBuilder:
    """章节上下文构建器"""

    # 配置常量
    ENDING_LENGTH_SHORT = 300        # 1-10章：短衔接
    ENDING_LENGTH_NORMAL = 500       # 11章+：标准衔接
    MEMORY_COUNT_LIGHT = 3           # 11-50章：轻量记忆
    MEMORY_COUNT_FULL = 5            # 51章+：完整记忆
    SKELETON_THRESHOLD = 50          # 启用故事骨架的阈值

    async def build(
        self,
        chapter: Chapter,
        project: Project,
        outline: Optional[Outline],
        user_id: str,
        db: AsyncSession,
        style_content: Optional[str] = None,
        target_word_count: int = 3000,
        temp_narrative_perspective: Optional[str] = None
    ) -> ChapterContext:
        """构建章节上下文"""

    async def _get_last_ending(
        self,
        chapter: Chapter,
        db: AsyncSession,
        max_length: int
    ) -> Optional[str]:
        """获取上一章结尾"""

    async def _get_relevant_memories(
        self,
        user_id: str,
        project_id: str,
        chapter_number: int,
        chapter_outline: str,
        limit: int = 3
    ) -> Optional[str]:
        """获取相关记忆"""

    async def _build_story_skeleton(
        self,
        project_id: str,
        chapter_number: int,
        db: AsyncSession
    ) -> Optional[str]:
        """构建故事骨架"""
```

### 4.4 MemoryService

```python
class MemoryService:
    """向量记忆服务"""

    def __init__(self):
        """初始化ChromaDB和Embedding模型"""

    def get_collection(
        self,
        user_id: str,
        project_id: str
    ) -> chromadb.Collection:
        """获取项目记忆集合"""

    async def add_memory(
        self,
        user_id: str,
        project_id: str,
        memory_id: str,
        content: str,
        memory_type: str,
        metadata: Dict[str, Any]
    ) -> bool:
        """添加记忆"""

    async def batch_add_memories(
        self,
        user_id: str,
        project_id: str,
        memories: List[Dict[str, Any]]
    ) -> int:
        """批量添加记忆"""

    async def search_memories(
        self,
        user_id: str,
        project_id: str,
        query: str,
        memory_types: Optional[List[str]] = None,
        limit: int = 10,
        min_importance: float = 0.0,
        chapter_range: Optional[tuple] = None
    ) -> List[Dict[str, Any]]:
        """语义搜索相关记忆"""

    async def get_recent_memories(
        self,
        user_id: str,
        project_id: str,
        current_chapter: int,
        recent_count: int = 3,
        min_importance: float = 0.5
    ) -> List[Dict[str, Any]]:
        """获取最近章节记忆"""

    async def find_unresolved_foreshadows(
        self,
        user_id: str,
        project_id: str,
        current_chapter: int
    ) -> List[Dict[str, Any]]:
        """查找未完结伏笔"""
```

### 4.5 PlotAnalyzer

```python
class PlotAnalyzer:
    """情节分析服务"""

    async def analyze_chapter(
        self,
        chapter_id: str,
        user_id: str,
        db: AsyncSession
    ) -> PlotAnalysis:
        """分析章节"""

    async def save_analysis(
        self,
        chapter_id: str,
        analysis: PlotAnalysis,
        db: AsyncSession
    ) -> bool:
        """保存分析结果到记忆库"""
```

---

## 5. Prompt模板设计

### 5.1 RTCO框架

```
<system>
    [角色定义]
    你是{role}，擅长{genre}类型创作
</system>

<task>
    [任务描述]
    {task_description}
</task>

<context>
    [上下文信息 - 按优先级组织]
    <input priority="P0">
        [核心输入：项目信息、世界观等]
    </input>
    <guidelines priority="P1">
        [指导原则：类型适配规则等]
    </guidelines>
    <worldview priority="P2>
        [世界观背景]
    </worldview>
    <characters priority="P3">
        [角色信息]
    </characters>
    <previous_context priority="P4">
        [已有内容回顾]
    </previous_context>
</context>

<output>
    [输出格式]
    {format_specification}
</output>

<constraints>
    [约束条件]
    {constraints}
</constraints>
```

### 5.2 章节生成模板示例

```python
CHAPTER_GENERATION_V2_WITH_CONTEXT = """<system>
你是《{project_title}》的作者，一位专注于{genre}类型的网络小说家。
</system>

<task>
【创作任务】
撰写第{chapter_number}章《{chapter_title}》的完整正文。

【基本要求】
- 目标字数：{target_word_count}字（允许±500字浮动）
- 叙事视角：{narrative_perspective}
</task>

<outline priority="P0">
【本章大纲 - 必须遵循】
{chapter_outline}
</outline>

<continuation priority="P0">
【衔接锚点 - 必须承接】
上一章结尾：
「{continuation_point}」

⚠️ 要求：从此处自然续写，不得重复上述内容
</continuation>

<characters priority="P1">
【本章角色】
{characters_info}
</characters>

<memory priority="P2">
【相关记忆 - 参考】
{relevant_memories}
</memory>

<skeleton priority="P2">
【故事骨架 - 背景】
{story_skeleton}
</skeleton>

<constraints>
【必须遵守】
✅ 严格按照大纲推进情节
✅ 自然承接上一章结尾，不重复已发生事件
✅ 保持角色性格、说话方式一致
✅ 字数控制在目标范围内

【禁止事项】
❌ 输出章节标题、序号等元信息
❌ 使用"总之"、"综上所述"等AI常见总结语
❌ 在结尾处使用开放式反问
❌ 重复叙述上一章已发生的事件
</constraints>

<output>
【输出规范】
直接输出小说正文内容，从故事场景或动作开始。
无需任何前言、后记或解释性文字。

现在开始创作：
</output>"""
```

---

## 6. 业务流程时序图

### 6.1 项目创建流程

```
用户           前端            后端           AI服务
  │              │               │              │
  │ 1.创建项目   │               │              │
  │─────────────>│               │              │
  │              │ 2.POST /projects             │
  │              │───────────────>              │
  │              │               │              │
  │              │ 3.生成世界观  │              │
  │              │───────────────>─────────────>│
  │              │               │              │
  │              │               │ 4.返回世界观 │
  │              │<───────────────<─────────────│
  │              │               │              │
  │              │ 5.生成职业体系               │
  │              │───────────────>─────────────>│
  │              │               │              │
  │              │ 6.返回职业体系               │
  │              │<───────────────<─────────────│
  │              │               │              │
  │              │ 7.生成角色   │              │
  │              │───────────────>─────────────>│
  │              │               │              │
  │              │ 8.返回角色   │              │
  │              │<───────────────<─────────────│
  │              │               │              │
  │              │ 9.生成大纲   │              │
  │              │───────────────>─────────────>│
  │              │               │              │
  │              │ 10.返回大纲  │              │
  │              │<───────────────<─────────────│
  │              │               │              │
  │ 11.项目创建完成              │              │
  │<─────────────│               │              │
```

### 6.2 章节生成流程

```
用户           前端            后端           AI服务        向量库
  │              │               │              │             │
  │ 1.生成章节   │               │              │             │
  │─────────────>│               │              │             │
  │              │ 2.POST /chapters/generate     │             │
  │              │───────────────>              │             │
  │              │               │              │             │
  │              │ 3.获取上下文  │              │             │
  │              │───────────────>              │             │
  │              │               │ 4.检索记忆   │             │
  │              │               │─────────────>│             │
  │              │               │              │ 5.返回记忆  │
  │              │               │<─────────────<│             │
  │              │               │              │             │
  │              │ 6.构建提示词  │              │             │
  │              │               │              │             │
  │              │ 7.流式生成   │─────────────>│             │
  │              │               │              │             │
  │              │ 8.SSE流式推送│<─────────────<│             │
  │              │<───────────────              │             │
  │              │               │              │             │
  │ 9.显示生成内容│               │              │             │
  │<─────────────│               │              │             │
  │              │               │              │             │
  │              │ 10.分析章节  │─────────────>│             │
  │              │               │              │             │
  │              │ 11.保存记忆  │─────────────>│             │
  │              │               │─────────────>│             │
```

---

## 7. 部署架构

### 7.1 Docker 单容器部署

```yaml
version: '3.8'

services:
  mumuainovel:
    image: mumujie/mumuainovel:latest
    container_name: mumuainovel
    ports:
      - "${APP_PORT:-8000}:8000"
    volumes:
      - ./data:/app/data          # SQLite 数据库 + ChromaDB 数据
      - ./logs:/app/logs
      - ./.env:/app/.env:ro
    environment:
      - DATABASE_URL=sqlite+aiosqlite:///./data/novel.db
      - AI_PROVIDER=${AI_PROVIDER:-zhipu}
      - ZHIPU_API_KEY=${ZHIPU_API_KEY}
      - DEFAULT_MODEL=${DEFAULT_MODEL:-glm-4-flash}
      - DEFAULT_TEMPERATURE=${DEFAULT_TEMPERATURE:-0.7}
      - MAX_CONCURRENT_REQUESTS=5   # 3-5人并发限制
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]
      interval: 30s
      timeout: 10s
      retries: 3
```

> **注意**: 无需额外的数据库容器，SQLite 数据存储在 `./data` 目录中。

### 7.2 环境变量配置

```bash
# ========== AI 服务配置（Anthropic 兼容接口）==========
# 默认使用智谱 AI
AI_PROVIDER=zhipu
ZHIPU_API_KEY=your-zhipu-api-key

# MiniMax（备选）
# AI_PROVIDER=minimax
# MINIMAX_API_KEY=your-minimax-api-key

# Claude 原生（可选，成本较高）
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=your-anthropic-key

# AI 生成参数
DEFAULT_MODEL=glm-4-flash
DEFAULT_TEMPERATURE=0.7
DEFAULT_MAX_TOKENS=32000

# ========== 应用配置 ==========
APP_NAME=MuMuAINovel
APP_HOST=0.0.0.0
APP_PORT=8000
DEBUG=false

# 并发控制（3-5人场景）
MAX_CONCURRENT_REQUESTS=5

# ========== 本地认证（简化版）==========
LOCAL_AUTH_ENABLED=true
LOCAL_AUTH_USERNAME=admin
LOCAL_AUTH_PASSWORD=your_password

# 会话配置
SESSION_EXPIRE_MINUTES=120
```

---

## 8. 目录结构

```
MuMuAINovel/
├── backend/                      # 后端服务
│   ├── app/
│   │   ├── api/                 # API路由
│   │   │   ├── projects.py      # 项目管理
│   │   │   ├── outlines.py      # 大纲管理
│   │   │   ├── chapters.py      # 章节管理
│   │   │   ├── characters.py    # 角色管理
│   │   │   ├── careers.py       # 职业管理
│   │   │   ├── wizard_stream.py # 向导SSE
│   │   │   └── ...
│   │   ├── models/              # 数据模型
│   │   │   ├── project.py
│   │   │   ├── outline.py
│   │   │   ├── chapter.py
│   │   │   ├── character.py
│   │   │   ├── career.py
│   │   │   ├── memory.py
│   │   │   └── ...
│   │   ├── schemas/             # Pydantic模型
│   │   │   ├── project.py
│   │   │   ├── outline.py
│   │   │   ├── chapter.py
│   │   │   └── ...
│   │   ├── services/            # 业务逻辑
│   │   │   ├── ai_service.py    # AI服务
│   │   │   ├── prompt_service.py # 提示词模板
│   │   │   ├── memory_service.py # 向量记忆
│   │   │   ├── plot_analyzer.py # 情节分析
│   │   │   ├── chapter_context_service.py # 上下文构建
│   │   │   ├── plot_expansion_service.py # 大纲展开
│   │   │   ├── auto_character_service.py # 自动角色
│   │   │   └── ...
│   │   ├── middleware/          # 中间件
│   │   ├── database.py          # 数据库连接
│   │   ├── config.py            # 配置
│   │   ├── main.py              # 应用入口
│   │   └── ...
│   ├── scripts/                 # 工具脚本
│   ├── embedding/              # Embedding模型
│   └── requirements.txt        # Python依赖
│
├── frontend/                    # 前端应用
│   ├── src/
│   │   ├── pages/              # 页面组件
│   │   │   ├── Projects/       # 项目页面
│   │   │   ├── Editor/         # 编辑页面
│   │   │   └── ...
│   │   ├── components/         # 通用组件
│   │   ├── services/           # API服务
│   │   ├── store/              # Zustand状态
│   │   ├── hooks/              # 自定义hooks
│   │   ├── utils/              # 工具函数
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── docker-compose.yml          # Docker Compose
├── Dockerfile                  # Docker镜像
└── README.md                   # 项目说明
```

---

## 9. 关键算法设计

### 9.1 分批生成策略

```python
async def generate_chapters_in_batches(
    target_chapter_count: int,
    batch_size: int = 5,
    previous_chapters: List[Chapter] = None
) -> List[Chapter]:
    """
    分批生成章节，避免单次生成过多导致的幻觉问题

    Args:
        target_chapter_count: 目标章节数
        batch_size: 每批生成的章节数
        previous_chapters: 已有章节列表

    Returns:
        生成的章节列表
    """
    total_batches = (target_chapter_count + batch_size - 1) // batch_size
    all_chapters = []

    for batch_num in range(total_batches):
        # 计算当前批次的章节数
        remaining = target_chapter_count - len(all_chapters)
        current_batch_size = min(batch_size, remaining)

        # 构建上下文（包含前序章节信息）
        context = build_context(
            previous=all_chapters + (previous_chapters or []),
            start_index=len(all_chapters) + 1,
            count=current_batch_size
        )

        # 生成当前批次
        batch_chapters = await ai_service.generate(
            prompt=build_prompt(context),
            stream=True
        )

        all_chapters.extend(batch_chapters)

        # 清理缓存，避免上下文无限增长
        clear_context_cache()

    return all_chapters
```

### 9.2 记忆检索策略

```python
async def get_relevant_memories(
    user_id: str,
    project_id: str,
    chapter_number: int,
    chapter_outline: str,
    character_names: List[str] = None
) -> Dict[str, Any]:
    """
    智能检索相关记忆

    策略：
    1. 获取最近章节记忆（时间连续性）
    2. 语义搜索相关记忆（内容相关性）
    3. 查找未回收伏笔（剧情连贯性）
    4. 检索角色相关记忆（角色状态）
    """
    # 1. 最近章节记忆
    recent = await memory_service.get_recent_memories(
        user_id, project_id, chapter_number,
        recent_count=3, min_importance=0.5
    )

    # 2. 语义搜索
    relevant = await memory_service.search_memories(
        user_id, project_id,
        query=chapter_outline,
        limit=10, min_importance=0.4
    )

    # 3. 未回收伏笔
    foreshadows = await memory_service.find_unresolved_foreshadows(
        user_id, project_id, chapter_number
    )

    # 4. 角色记忆
    character_memories = []
    if character_names:
        character_query = " ".join(character_names)
        character_memories = await memory_service.search_memories(
            user_id, project_id,
            query=character_query,
            memory_types=["character_event"],
            limit=5
        )

    return {
        "recent_context": format_memories(recent),
        "relevant_memories": format_memories(relevant),
        "foreshadows": format_memories(foreshadows[:3]),
        "character_states": format_memories(character_memories)
    }
```

### 9.3 衔接锚点提取

```python
def extract_continuation_point(
    previous_content: str,
    max_length: int = 500
) -> str:
    """
    从上一章内容中提取衔接锚点

    策略：
    1. 优先提取结尾段落
    2. 如果结尾段落太短，回退到倒数第二段
    3. 保留完整的句子结构
    """
    if not previous_content:
        return None

    # 按段落分割
    paragraphs = previous_content.split('\n\n')

    # 从结尾开始尝试
    for i in range(len(paragraphs) - 1, -1, -1):
        paragraph = paragraphs[i].strip()
        if len(paragraph) >= 100:  # 至少100字
            if len(paragraph) <= max_length:
                return paragraph
            else:
                # 截取结尾
                return paragraph[-max_length:]

    # 如果所有段落都太短，拼接最后两段
    if len(paragraphs) >= 2:
        result = paragraphs[-2] + '\n\n' + paragraphs[-1]
        return result[-max_length:]

    return previous_content[-max_length:]
```
