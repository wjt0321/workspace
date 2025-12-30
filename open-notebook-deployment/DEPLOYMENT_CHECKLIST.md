# Open Notebook 部署准备清单

## 项目概述

Open Notebook 是一个开源的、隐私优先的 NotebookLM 替代品，支持多模型、100%本地部署。它提供了完整的研究管理功能，包括：

- 多模态内容管理（PDF、视频、音频、网页等）
- 多 AI 提供商支持（16+ 提供商）
- 专业播客生成
- 智能搜索
- 上下文感知的 AI 对話

## 一、硬件要求

### 最低配置（测试用途）
| 资源 | 要求 |
|------|------|
| **内存** | 2GB RAM |
| **CPU** | 2 核心 |
| **存储** | 10GB 可用空间 |
| **网络** | 互联网连接（用于 AI 提供商） |

### 推荐配置（生产用途）
| 资源 | 要求 |
|------|------|
| **内存** | 4GB+ RAM |
| **CPU** | 4+ 核心 |
| **存储** | 50GB+ 可用空间 |
| **网络** | 稳定高速互联网 |

### 支持的平台
- **Linux**: Ubuntu 20.04+, CentOS 7+, 或类似发行版
- **Windows**: Windows 10+ 配合 WSL2（用于 Docker）
- **macOS**: macOS 10.14+

## 二、软件依赖

### 必须安装的软件

#### 1. Docker（必须）
- **版本要求**: Docker 20.10 或更高
- **安装方式**:
  - Linux: `sudo apt-get install docker.io docker-compose`
  - macOS/Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **验证安装**: `docker --version`

#### 2. Docker Compose（推荐）
- **版本要求**: 与 Docker 版本兼容
- **验证安装**: `docker compose version`

#### 3. Git（可选，用于源码部署）
- **用途**: 克隆项目源码
- **安装方式**: 各系统包管理器

## 三、网络配置

### 必须开放的端口

| 端口 | 协议 | 用途 | 是否必须 |
|------|------|------|----------|
| **8502** | TCP | 前端 Web 界面 | ✅ 必须 |
| **5055** | TCP | API 后端服务 | ✅ 必须 |

### 端口说明

**端口 8502（前端界面）**
- Next.js/React 前端
- 用户通过浏览器访问的界面
- 访问地址：`http://your-server-ip:8502`

**端口 5055（API 后端）**
- FastAPI 后端 API
- 前端通过此端口与后端通信
- API 文档：`http://your-server-ip:5055/docs`

### 防火墙配置示例

```bash
# Ubuntu UFW
sudo ufw allow 8502/tcp
sudo ufw allow 5055/tcp
sudo ufw reload

# CentOS/RHEL Firewalld
sudo firewall-cmd --permanent --add-port=8502/tcp
sudo firewall-cmd --permanent --add-port=5055/tcp
sudo firewall-cmd --reload
```

## 四、API 密钥准备

### 必须的密钥

**OpenAI API Key（推荐用于基础功能）**
- **用途**: GPT 模型、嵌入生成、文本转语音
- **获取方式**: 访问 [platform.openai.com](https://platform.openai.com)
- **费用**: 按使用量付费
- **是否必须**: 需要至少一个 AI 提供商的密钥

### 可选的 AI 提供商

Open Notebook 项目主要需要以下四类 AI 能力：

- **LLM（大语言模型）**: 对话、推理、文本生成
- **Embedding（嵌入向量）**: 语义搜索、内容理解、向量化
- **TTS（语音合成）**: 播客生成、文本转语音
- **STT（语音识别）**: 音视频转文字

#### 1. 功能支持矩阵（国外厂商）

| 提供商 | LLM | Embedding | TTS | STT | API 申请地址 |
|--------|-----|-----------|-----|-----|--------------|
| **OpenAI** | ✅ | ✅ | ✅ | ✅ | https://platform.openai.com |
| **Anthropic** | ✅ | ❌ | ❌ | ❌ | https://console.anthropic.com |
| **Google (GenAI)** | ✅ | ✅ | ✅ | ❌ | https://aistudio.google.com |
| **Groq** | ✅ | ❌ | ❌ | ❌ | https://console.groq.com |
| **Mistral** | ✅ | ✅ | ❌ | ❌ | https://console.mistral.ai |
| **DeepSeek** | ✅ | ❌ | ❌ | ❌ | https://platform.deepseek.com |
| **Azure OpenAI** | ✅ | ✅ | ✅ | ✅ | https://portal.azure.com |
| **ElevenLabs** | ❌ | ❌ | ✅ | ❌ | https://elevenlabs.io |
| **Voyage** | ❌ | ✅ | ❌ | ❌ | https://dash.voyageai.com |
| **Ollama** | ✅ | ✅ | ❌ | ❌ | https://ollama.com |
| **LM Studio** | ✅ | ❌ | ❌ | ❌ | https://lmstudio.ai |

#### 2. 功能支持矩阵（国内厂商）

| 提供商 | LLM | Embedding | TTS | STT | API 申请地址 |
|--------|-----|-----------|-----|-----|--------------|
| **百度文心一言** | ✅ | ✅ | ✅ | ✅ | https://cloud.baidu.com |
| **阿里通义千问** | ✅ | ✅ | ✅ | ✅ | https://bailian.console.aliyun.com |
| **智谱 AI** | ✅ | ✅ | ❌ | ❌ | https://open.bigmodel.cn |
| **讯飞星火** | ✅ | ✅ | ✅ | ✅ | https://xinghuo.xfyun.cn |
| **腾讯混元** | ✅ | ✅ | ✅ | ❌ | https://console.cloud.tencent.com/hunyuan |
| **月之暗面 Kimi** | ✅ | ❌ | ❌ | ❌ | https://platform.moonshot.cn |
| **MiniMax 海螺** | ✅ | ✅ | ✅ | ❌ | https://api.minimax.chat |
| **零一万物** | ✅ | ❌ | ❌ | ❌ | https://platform.lingyiwanwu.com |
| **百川智能** | ✅ | ✅ | ❌ | ❌ | https://www.baichuan-ai.com |
| **商汤日日新** | ✅ | ✅ | ✅ | ✅ | https://platform.sensenova.cn |
| **书生·浦语** | ✅ | ✅ | ❌ | ❌ | https://internlm.intern-ai.org.cn |

---

#### 3. 按功能需求选择 AI 提供商

##### A. 需要完整功能（LLM + Embedding + TTS + STT）

需要所有四项能力的完整支持，推荐以下厂商：

| 提供商 | 推荐理由 | 新用户福利 | API 申请 |
|--------|----------|------------|----------|
| **百度文心一言** | 国内生态最完整，中文优化强 | 实名认证后可用 | https://cloud.baidu.com |
| **阿里通义千问** | 阿里云生态整合，性能优秀 | 赠送一定额度 | https://bailian.console.aliyun.com |
| **讯飞星火** | 语音技术领先，Spark Lite 永久免费 | 免费额度充足 | https://xinghuo.xfyun.cn |
| **OpenAI** | 行业标杆，功能最全 | 按量付费 | https://platform.openai.com |

##### B. 仅需要 LLM（大语言模型）

仅用于对话、推理、文本生成，可选：

| 提供商 | 推荐理由 | 新用户福利 | API 申请 |
|--------|----------|------------|----------|
| **深度求索 DeepSeek** | 推理能力强，性价比高 | 注册即用 | https://platform.deepseek.com |
| **月之暗面 Kimi** | 长文本处理专家，200万字上下文 | 赠送15元 | https://platform.moonshot.cn |
| **智谱 AI** | 清华技术，中文理解优秀 | 赠送tokens | https://open.bigmodel.cn |
| **零一万物 Yi** | 200K超长上下文，高性价比 | 赠送60元 | https://platform.lingyiwanwu.com |
| **Anthropic Claude** | 对话体验优秀，Claude 3.5 | 按量付费 | https://console.anthropic.com |
| **Groq** | 推理速度极快 | 按量付费 | https://console.groq.com |

##### C. 需要 Embedding（向量嵌入）

用于语义搜索、内容向量化：

| 提供商 | 推荐理由 | API 申请 |
|--------|----------|----------|
| **百度文心** | 中文Embedding效果优秀 | https://cloud.baidu.com |
| **阿里通义** | Text-Embedding v3 强大 | https://bailian.console.aliyun.com |
| **智谱 AI** | 中文优化，GLM嵌入 | https://open.bigmodel.cn |
| **Voyage** | 专业Embedding，英文为主 | https://dash.voyageai.com |

##### D. 需要 TTS（语音合成）

用于播客生成、文本转语音：

| 提供商 | 推荐理由 | 新用户福利 | API 申请 |
|--------|----------|------------|----------|
| **ElevenLabs** | 音质最佳，自然度高 | 有免费额度 | https://elevenlabs.io |
| **百度文心** | 中文TTS效果好 | 实名认证可用 | https://cloud.baidu.com |
| **讯飞星火** | 语音技术领先 | Spark Lite免费 | https://xinghuo.xfyun.cn |
| **阿里通义** | 多种音色可选 | 赠送额度 | https://bailian.console.aliyun.com |

##### E. 需要 STT（语音识别）

用于音视频转文字：

| 提供商 | 推荐理由 | 新用户福利 | API 申请 |
|--------|----------|------------|----------|
| **讯飞星火** | 语音识别准确率最高 | 有免费额度 | https://xinghuo.xfyun.cn |
| **百度语音** | 中文识别成熟 | 实名认证可用 | https://cloud.baidu.com |
| **OpenAI Whisper** | 开源免费，精度高 | 按量付费 | https://platform.openai.com |

##### F. 本地部署（无需 API Key）

完全离线，数据隐私最佳：

| 提供商 | 模型大小 | 要求 | 特点 |
|--------|----------|------|------|
| **Ollama** | 7B - 70B | 本地GPU推荐 | 部署最简单 |
| **LM Studio** | 7B - 70B | 本地GPU推荐 | 图形界面友好 |
| **书生·浦语** | 7B - 20B | 消费级GPU | 开源免费 |

---

#### 4. 场景化推荐方案

##### 方案一：国内用户最佳性价比（推荐）

| 功能 | 推荐提供商 | 原因 |
|------|------------|------|
| **LLM** | 深度求索 DeepSeek | 推理强，价格低 |
| **Embedding** | 百度文心 | 中文效果好 |
| **TTS** | 讯飞星火 | 语音技术领先 |
| **STT** | 讯飞星火 | 识别准确 |

**预计月费用**: ¥50-200（根据使用量）

##### 方案二：追求最高质量

| 功能 | 推荐提供商 | 原因 |
|------|------------|------|
| **LLM** | OpenAI GPT-4 / Anthropic Claude | 业界最佳 |
| **Embedding** | OpenAI / Voyage | 精度最高 |
| **TTS** | ElevenLabs | 音质最佳 |
| **STT** | OpenAI Whisper | 开源免费 |

**预计月费用**: ¥500-2000+

##### 方案三：完全本地离线

| 功能 | 推荐方案 | 原因 |
|------|----------|------|
| **全部功能** | Ollama + 本地Whisper | 隐私最佳，零费用 |
| **LLM** | InternLM 20B | 开源免费，性能强 |
| **Embedding** | BGE 模型 | 中文效果好 |

**硬件要求**: 推荐 16GB+ 显存

---

#### 5. 国内厂商 API 申请详细指南

##### 百度文心一言
- **申请地址**: https://cloud.baidu.com/product/wenxin
- **注册要求**: 百度账号 + 实名认证
- **特点**: ERNIE-4.5/ERNIE-4.5-Turbo 提供强大的中文理解和生成能力

##### 阿里通义千问
- **申请地址**: https://bailian.console.aliyun.com
- **注册要求**: 阿里云账号 + 实名认证
- **新用户福利**: 赠送一定额度免费使用
- **特点**: Qwen2.5/Qwen-Max 系列，开源模型友好

##### 智谱 AI (ChatGLM)
- **申请地址**: https://open.bigmodel.cn
- **注册要求**: 手机号注册 + 实名认证
- **新用户福利**: 赠送tokens体验额度
- **特点**: GLM-4 系列，清华技术背景，中文优化

##### 讯飞星火
- **申请地址**: https://xinghuo.xfyun.cn/sparkapi
- **注册要求**: 讯飞账号 + 实名认证
- **免费额度**: Spark Lite 永久免费使用
- **特点**: 认知大模型，语音技术领先

##### 腾讯混元
- **申请地址**: https://console.cloud.tencent.com/hunyuan
- **注册要求**: 腾讯云账号 + 实名认证
- **审核时间**: 5-15天审核期
- **特点**: 腾讯生态整合，多模态能力

##### 月之暗面 (Moonshot/Kimi)
- **申请地址**: https://platform.moonshot.cn/console/api-keys
- **注册要求**: 手机号注册
- **新用户福利**: 赠送15元体验金
- **特点**: Kimi 长文本处理，支持200万字上下文

##### MiniMax (海螺AI)
- **申请地址**: https://api.minimax.chat
- **注册要求**: 手机号注册 + 企业/个人认证
- **特点**: 视频生成模型 Hailuo 领先，API 定价实惠

##### 零一万物 (01AI)
- **申请地址**: https://platform.lingyiwanwu.com
- **注册要求**: 手机号注册
- **新用户福利**: 赠送60元体验金
- **特点**: Yi-34B/ Yi-VL 系列，200K 超长上下文

##### 深度求索 (DeepSeek)
- **申请地址**: https://platform.deepseek.com/api_keys
- **注册要求**: 邮箱/手机号注册
- **特点**: DeepSeek-R1 推理能力强，代码能力优秀

##### 百川智能
- **申请地址**: https://www.baichuan-ai.com/home
- **注册要求**: 身份证/营业执照实名认证
- **特点**: Baichuan2-Turbo 系列，搜索增强技术

##### 商汤日日新 (SenseNova)
- **申请地址**: https://platform.sensenova.cn
- **注册要求**: 企业账号注册
- **特点**: 多模态大模型，图像生成能力强

##### 上海人工智能实验室 (书生·浦语)
- **申请地址**: https://internlm.intern-ai.org.cn
- **注册要求**: GitHub账号或手机号
- **特点**: 开源免费，InternLM2.5 系列

#### 4. 密钥设置方式

##### 方式一：环境变量（推荐）
```bash
export OPENAI_API_KEY="sk-your-api-key-here"
export ANTHROPIC_API_KEY="sk-ant-your-api-key-here"

# 国内厂商
export ZHIPUAI_API_KEY="your-zhipuai-key"
export DEEPSEEK_API_KEY="your-deepseek-key"
export MOONSHOT_API_KEY="your-moonshot-key"
```

##### 方式二：Docker Compose 配置
```yaml
environment:
  # 国外厂商
  - OPENAI_API_KEY=your_openai_key
  - ANTHROPIC_API_KEY=your_anthropic_key
  
  # 国内厂商
  - ZHIPUAI_API_KEY=your_zhipuai_key
  - DEEPSEEK_API_KEY=your_deepseek_key
  - MOONSHOT_API_KEY=your_moonshot_key
  - BAIDU_API_KEY=your_baidu_key
  - TENCENT_API_KEY=your_tencent_key
```

## 五、存储准备

### 需要创建的目录

```
open-notebook/
├── notebook_data/     # 笔记和研究内容存储
│   ├── notebooks/     # 笔记本文件
│   ├── sources/       # 源文件（PDF、视频等）
│   └── exports/       # 导出的内容
└── surreal_data/      # SurrealDB 数据库文件
```

### 存储空间估算

| 数据类型 | 预估大小 | 说明 |
|----------|----------|------|
| **应用数据** | 500MB - 1GB | 基础应用文件 |
| **笔记内容** | 取决于使用量 | 文本、Markdown 文件 |
| **源文件** | 取决于上传量 | PDF、视频、音频等 |
| **数据库** | 1-5GB | 随着使用量增长 |
| **临时文件** | 1-2GB | 处理过程中的临时存储 |

**建议**: 预留至少 20GB 初始空间

### 目录创建命令

```bash
mkdir -p /path/to/open-notebook/{notebook_data,s surreal_data}
```

## 六、部署方式选择

### 方式一：单容器部署（推荐用于简单部署）

**适用场景**:
- 个人使用
- 资源有限的服务器
- PikaPods、Railway 等云托管平台

**优点**:
- 部署简单
- 资源占用少
- 易于管理

**启动命令**:
```bash
mkdir open-notebook && cd open-notebook

docker run -d \
  --name open-notebook \
  -p 8502:8502 \
  -p 5055:5055 \
  -v ./notebook_data:/app/data \
  -v ./surreal_data:/mydata \
  -e OPENAI_API_KEY=your_key_here \
  -e SURREAL_URL="ws://localhost:8000/rpc" \
  -e SURREAL_USER="root" \
  -e SURREAL_PASSWORD="root" \
  -e SURREAL_NAMESPACE="open_notebook" \
  -e SURREAL_DATABASE="production" \
  lfnovo/open_notebook:v1-latest-single
```

### 方式二：Docker Compose 部署（推荐）

**适用场景**:
- 生产环境
- 需要更灵活的配置
- 团队使用

**优点**:
- 配置版本控制
- 易于更新
- 支持多个服务

**docker-compose.yml**:
```yaml
services:
  open_notebook:
    image: lfnovo/open_notebook:v1-latest-single
    ports:
      - "8502:8502"  # Web UI
      - "5055:5055"  # API (required!)
    environment:
      - OPENAI_API_KEY=your_key_here
      # For remote access, uncomment and set your server IP/domain:
      # - API_URL=http://192.168.1.100:5055
      # Database connection (required for single-container)
      - SURREAL_URL=ws://localhost:8000/rpc
      - SURREAL_USER=root
      - SURREAL_PASSWORD=root
      - SURREAL_NAMESPACE=open_notebook
      - SURREAL_DATABASE=production
    volumes:
      - ./notebook_data:/app/data
      - ./surreal_data:/mydata
    restart: always
```

**启动命令**:
```bash
docker compose up -d
```

### 方式三：多容器部署（高级用户）

**适用场景**:
- 需要分离数据库
- 需要水平扩展
- 开发环境

**特点**:
- SurrealDB 独立容器
- 更灵活的配置
- 更高的资源占用

### 方式四：源码部署（开发用途）

**适用场景**:
- 开发者贡献代码
- 自定义修改
- 学习项目结构

**要求**:
- Python 3.10+
- Node.js 18+
- UV 包管理器

## 七、部署前检查清单

### 系统检查

- [ ] 确认 Docker 已安装并运行
- [ ] 确认端口 8502 和 5055 可用
- [ ] 确认有足够的磁盘空间（建议 20GB+）
- [ ] 确认有足够的内存（建议 4GB+）

### 网络检查

- [ ] 服务器可访问互联网
- [ ] 防火墙已开放必要端口
- [ ] 可访问 AI 提供商的 API（需要网络权限）

### 配置准备

- [ ] 已获取至少一个 AI 提供商的 API Key
- [ ] 已创建项目目录
- [ ] 已创建数据存储目录
- [ ] 已准备 docker-compose.yml 文件

### 可选配置

- [ ] 准备域名（如需自定义域名访问）
- [ ] 准备 SSL 证书（如需 HTTPS）
- [ ] 准备反向代理配置（如 nginx、Caddy）

## 八、常见问题快速排查

### 问题 1：无法连接到服务器
**解决方案**：
- 检查 `API_URL` 环境变量是否设置正确
- 确认访问方式与 `API_URL` 配置一致
- 远程服务器不要使用 `localhost`

### 问题 2：页面空白或报错
**解决方案**：
- 确保两个端口（8502 和 5055）都已暴露
- 检查 Docker 容器是否正常运行：`docker ps`

### 问题 3：服务器上能访问但其他设备不行
**解决方案**：
- 不要在 `API_URL` 中使用 `localhost`
- 使用服务器的实际 IP 地址

### 问题 4：404 或配置端点错误
**解决方案**：
- 不要在 `API_URL` 末尾添加 `/api`
- 正确格式：`http://your-ip:5055`

## 九、后续步骤

部署完成后：

1. **访问应用**: http://your-server-ip:8502
2. **配置 AI 模型**: 在设置中添加你的 API Key
3. **创建第一个笔记本**: 参考官方文档
4. **添加源文件**: 上传 PDF、视频等研究材料
5. **开始使用**: 创建笔记、开始对话、生成播客

## 十、参考资源

- **官方文档**: https://docs.open-notebook.ai
- **GitHub 仓库**: https://github.com/lfnovo/open-notebook
- **Discord 社区**: https://discord.gg/37XJPXfz2w
- **官方网站**: https://www.open-notebook.ai

---

**文档生成时间**: 2025-12-30
**项目版本**: v1.0+
