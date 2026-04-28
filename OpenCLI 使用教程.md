# OpenCLI 使用教程

> **版本**: 1.7.8 | **安装位置**: `C:\Users\wxb\AppData\Roaming\npm\opencli.cmd`
>
> **一句话**: 让任何网站变成你的 CLI — 零配置，AI 友好，628 条命令覆盖 103 个网站

---

## 目录

- [1. 什么是 OpenCLI](#1-什么是-opencli)
- [2. 安装](#2-安装)
- [3. 基本用法](#3-基本用法)
- [4. 新闻资讯](#4-新闻资讯)
- [5. 学术搜索](#5-学术搜索)
- [6. 开发者工具](#6-开发者工具)
- [7. 金融数据](#7-金融数据)
- [8. 媒体娱乐](#8-媒体娱乐)
- [9. 中文生态（知乎/B站/豆瓣/36氪）](#9-中文生态)
- [10. 电商数据](#10-电商数据)
- [11. 网页抓取](#11-网页抓取)
- [12. 社交平台](#12-社交平台)
- [13. AI 工具](#13-ai-工具)
- [14. 搜索引掣](#14-搜索引掣)
- [15. 办公协作（飞书/钉钉/企微）](#15-办公协作)
- [16. 输出格式控制](#16-输出格式控制)
- [17. 在 Python 脚本中调用](#17-在-python-脚本中调用)
- [18. 完整命令速查表](#18-完整命令速查表)

---

## 1. 什么是 OpenCLI

OpenCLI 是一个**命令行工具**，把各种网站的数据封装成终端命令。无需登录、无需 API Key，零配置即可使用。

**核心特性：**
- ✅ 零 API Key — 直接爬取网站公开数据
- ✅ AI 友好 — 输出格式支持 `json` / `yaml` / `md` / `csv` / `table`
- ✅ 跨平台 — Windows / macOS / Linux 都能用
- ✅ 开源 — 社区持续添加新站点
- ✅ 浏览器桥 — 需要登录的站点可借助本地浏览器

**典型场景：**
```
# 看 HackerNews 头条
opencli hackernews top --limit 10

# 搜学术论文
opencli arxiv search "transformer" --limit 5

# 看 B 站热门
opencli bilibili hot
```

---

## 2. 安装

```bash
# npm 全局安装（已安装）
npm i -g @jackwerner/opencli

# 验证
opencli --version    # → 1.7.8
opencli list         # → 列出所有可用命令
```

**Windows 路径：** `C:\Users\wxb\AppData\Roaming\npm\opencli.cmd`

> ⚠️ 在 `subprocess` 调用时必须用绝对路径：
> ```python
> cmd = r'C:\Users\wxb\AppData\Roaming\npm\opencli.cmd'
> ```

---

## 3. 基本用法

### 命令结构

```
opencli <站点> <子命令> [选项]
```

### 查看帮助

```bash
# 查看站点支持的命令
opencli hackernews --help

# 查看某个子命令的详细参数
opencli hackernews top --help
```

### 通用选项

| 选项 | 说明 | 默认值 |
|:---|:---|:---:|
| `--limit <n>` | 返回条数上限 | 各命令不同 |
| `--format` / `-f` | 输出格式：`table`, `plain`, `json`, `yaml`, `md`, `csv` | `table` |
| `-v` / `--verbose` | 调试输出 | 关闭 |
| `--help` / `-h` | 帮助信息 | — |

---

## 4. 新闻资讯

### 4.1 HackerNews

```bash
# 热门文章（按分数排）
opencli hackernews top --limit 10

# 最新文章
opencli hackernews new --limit 10

# Show HN（展示作品）
opencli hackernews show --limit 5

# Ask HN（问答）
opencli hackernews ask --limit 5

# 招聘帖
opencli hackernews jobs --limit 5

# 搜索
opencli hackernews search "AI agent" --limit 10

# 查用户
opencli hackernews user "pg"
```

**输出示例：**
```
- rank: 1
  title: 'Microsoft and OpenAI end their exclusive deal'
  score: 930
  author: elsewhen
  comments: 787
  url: https://www.bloomberg.com/...
```

### 4.2 36氪

```bash
opencli 36kr hot                      # 热榜（人气/综合/收藏/目录）
opencli 36kr news --limit 10          # 最新科技创业新闻
opencli 36kr search "AI 投资"          # 搜索
opencli 36kr article --url <url>      # 获取文章正文
```

### 4.3 BBC

```bash
opencli bbc top --limit 10            # BBC 头条
opencli bbc search "technology"       # 搜索
```

### 4.4 Bloomberg（彭博）

```bash
opencli bloomberg search "OpenAI"     # 搜索彭博新闻
```

### 4.5 华尔街日报 / 其他财经媒体

```bash
opencli wsj search "China"            # 华尔街日报搜索
opencli ft search "AI"                # 金融时报搜索
opencli reuters search "trade"        # 路透社搜索
opencli economist search "climate"    # 经济学人搜索
```

### 4.6 ProductHunt

```bash
# 今日新品（最常用）
opencli producthunt today --limit 10

# 热门产品
opencli producthunt hot --limit 10

# 按分类浏览
opencli producthunt posts --limit 10

# 按分类浏览热门
opencli producthunt browse "developer-tools"
```

---

## 5. 学术搜索

### 5.1 arXiv

```bash
# 搜索论文（关键词）
opencli arxiv search "large language model" --limit 10

# 按 ID 查论文详情
opencli arxiv paper "2401.14295"
```

**常用格式（JSON）：**
```bash
opencli arxiv search "reinforcement learning" --limit 5 -f json
```

### 5.2 百度学术

```bash
opencli baidu-scholar search "transformer" --limit 10
```

### 5.3 CNKI（中国知网）

```bash
opencli cnki search "人工智能" --limit 10
```

---

## 6. 开发者工具

### 6.1 Web 网页抓取

```bash
# 抓取任意网页转为 Markdown
opencli web read --url https://example.com --stdout true

# 保存到文件
opencli web read --url https://zhuanlan.zhihu.com/p/123 --output ./articles
```

### 6.2 Docker

_需要安装 Docker CLI_

```bash
opencli docker ps
opencli docker images
```

### 6.3 GitHub CLI

_需要安装 `gh` CLI_

```bash
opencli gh repo list
opencli gh pr list
```

### 6.4 Vercel

_需要安装 Vercel CLI_

```bash
opencli vercel projects
opencli vercel logs
```

---

## 7. 金融数据

### 7.1 Binance（币安）

```bash
opencli binance price --symbol BTCUSDT    # 实时价格
opencli binance klines --symbol BTCUSDT   # K线数据
opencli binance ticker --symbol ETHUSDT   # Ticker 信息
```

### 7.2 CoinMarketCap

```bash
opencli coinmarketcap top --limit 20      # 加密货币排行
opencli coinmarketcap search "bitcoin"    # 搜索
```

### 7.3 东方财富 / 股票

```bash
opencli eastmoney search "贵州茅台"        # 搜索股票
opencli eastmoney quote --code 600519     # 实时行情
```

### 7.4 Barchart

```bash
opencli barchart flow                    # 资金流向
opencli barchart futures                 # 期货行情
opencli barchart forex                   # 外汇
```

---

## 8. 媒体娱乐

### 8.1 Bilibili（B站）

```bash
opencli bilibili hot                          # B站热门
opencli bilibili search "AI 教程" --limit 10  # 搜索
opencli bilibili video --id BV1GJ411m...      # 视频详情
opencli bilibili user --id 12345              # UP主信息
opencli bilibili comments --id BV1GJ...       # 评论
```

### 8.2 豆瓣

```bash
opencli douban movie-hot --limit 20       # 电影热门榜
opencli douban top250                     # 豆瓣电影 Top250
opencli douban book-hot                   # 图书热门榜
opencli douban search "肖申克的救赎"        # 搜索
opencli douban subject --id 1292052       # 条目详情
opencli douban photos --id 1292052        # 剧照列表
opencli douban download --id 1292052      # 下载海报/剧照
opencli douban marks                      # 导出观影标记
opencli douban reviews                    # 导出影评
```

### 8.3 Apple Podcasts

```bash
opencli apple-podcasts top                # 热门播客排行
opencli apple-podcasts search "AI"        # 搜索播客
opencli apple-podcasts episodes --id 123  # 节目列表
```

### 8.4 音乐

```bash
opencli spotify search "Bohemian Rhapsody"   # Spotify 搜索
opencli soundcloud search "lofi"             # SoundCloud 搜索
```

---

## 9. 中文生态

### 9.1 知乎

```bash
opencli zhihu hot                               # 知乎热榜
opencli zhihu search "大模型" --limit 10         # 搜索
opencli zhihu question --id 123456              # 问题详情+回答
opencli zhihu download                          # 导出文章为 Markdown
```

### 9.2 36氪（见 4.2）

### 9.3 百度学术（见 5.2）

### 9.4 小红书

```bash
opencli xiaohongshu search "旅行"                # 搜索笔记
opencli xiaohongshu hot                         # 热门内容
opencli xiaohongshu note --id 123               # 笔记详情
```

### 9.5 微博

```bash
opencli weibo hot                               # 微博热搜
opencli weibo search "AI"                       # 搜索
opencli weibo user --id 123                     # 用户信息
```

### 9.6 抖音

```bash
opencli douyin hot                              # 抖音热门
opencli douyin search "教程"                      # 搜索
```

---

## 10. 电商数据

### 10.1 1688

```bash
opencli 1688 search "运动鞋"                     # 商品搜索
opencli 1688 item --id 12345                   # 商品详情
opencli 1688 store --id 6789                   # 店铺信息
opencli 1688 assets --id 12345                 # 图片/视频素材列表
opencli 1688 download --id 12345               # 批量下载素材
```

### 10.2 Amazon

```bash
opencli amazon search "wireless mouse"           # 搜索
opencli amazon product --id B08N5...             # 商品详情
opencli amazon bestsellers                       # 畅销榜
opencli amazon new-releases                      # 新品榜
opencli amazon movers-shakers                    # 增长最快
opencli amazon discussion --id B08N5...          # 评论摘要
```

### 10.3 淘宝

```bash
opencli taobao search "机械键盘"                  # 搜索
opencli taobao item --id 12345                  # 商品详情
opencli taobao shop --id 6789                   # 店铺信息
```

### 10.4 京东

```bash
opencli jd search "显示器"                       # 搜索
opencli jd item --id 10001234                   # 商品详情
```

### 10.5 拼多多

```bash
opencli pinduoduo search "手机"                  # 搜索
opencli pinduoduo item --id 12345               # 商品详情
```

---

## 11. 网页抓取

```bash
# 抓取网页转为 Markdown
opencli web read --url https://example.com --stdout true

# 保存到指定目录
opencli web read --url https://example.com/article --output ./my-articles

# 下载图片
opencli web read --url https://example.com --download-images true

# 等待页面加载（适合 JS 渲染页）
opencli web read --url https://example.com --wait 5
```

---

## 12. 社交平台

```bash
# Bluesky（去中心化社交）
opencli bluesky timeline                       # 时间线
opencli bluesky search "AI"                    # 搜索

# Reddit
opencli reddit hot --subreddit "ArtificialIntelligence"   # 热门帖子
opencli reddit search "machine learning"                  # 搜索
opencli reddit search --subreddit "MachineLearning" "LLM" # 子版块搜索

# Twitter/X
opencli twitter trending                      # 趋势
opencli twitter search "AI agents"            # 搜索
```

---

## 13. AI 工具

```bash
# ChatGPT
opencli chatgpt search "prompt engineering"    # 搜索ChatGPT相关内容

# Perplexity
opencli perplexity search "quantum computing"  # Perplexity AI 搜索

# Hugging Face
opencli huggingface models --limit 20          # 热门模型
opencli huggingface datasets --limit 10        # 热门数据集
opencli huggingface search "text-to-image"     # 搜索模型

# Anthropic / Claude
opencli anthropic docs                         # 文档搜索
```

---

## 14. 搜索引掣

```bash
# Bing
opencli bing search "AI agent"                 # Bing 搜索

# Brave Search
opencli brave search "Rust programming"        # Brave 搜索

# Google
opencli google search "machine learning"       # Google 搜索

# Sogou（搜狗）
opencli sogou search "天气"                     # 搜狗搜索

# DuckDuckGo
opencli duckduckgo search "privacy"            # DuckDuckGo 搜索
```

---

## 15. 办公协作

```bash
# 飞书（需要登录）
opencli lark-cli message send --text "hello"
opencli lark-cli doc create --title "日报"
opencli lark-cli calendar list

# 钉钉（需要登录）
opencli dws message send --text "通知"
opencli dws doc create --title "周报"

# 企业微信（需要登录）
opencli wecom-cli message send --text "提醒"
opencli wecom-cli meeting create

# Obsidian（需要 Obsidian 运行中）
opencli obsidian search "TODO"
opencli obsidian notes list
opencli obsidian tasks
```

---

## 16. 输出格式控制

OpenCLI 支持多种输出格式，AI 友好度极高：

```bash
# Table（默认，人类可读）
opencli hackernews top --limit 5 -f table

# JSON（程序解析最佳）
opencli hackernews top --limit 5 -f json

# YAML（AI 友好）
opencli hackernews top --limit 5 -f yaml

# Markdown（可直接粘贴）
opencli hackernews top --limit 5 -f md

# CSV（表格工具）
opencli hackernews top --limit 5 -f csv

# Plain（纯文本，最小输出）
opencli hackernews top --limit 5 -f plain
```

---

## 17. 在 Python 脚本中调用

```python
import subprocess
import json

OPENCLI = r'C:\Users\wxb\AppData\Roaming\npm\opencli.cmd'

def hackernews_top(limit=10):
    """获取 HackerNews 头条"""
    result = subprocess.run(
        [OPENCLI, 'hackernews', 'top', '--limit', str(limit), '-f', 'json'],
        capture_output=True, text=True, timeout=30
    )
    if result.returncode != 0:
        return []
    return json.loads(result.stdout)

def producthunt_today(limit=10):
    """获取 ProductHunt 今日新品"""
    result = subprocess.run(
        [OPENCLI, 'producthunt', 'today', '--limit', str(limit), '-f', 'json'],
        capture_output=True, text=True, timeout=60
    )
    if result.returncode != 0:
        return []
    return json.loads(result.stdout)

def arxiv_search(query, limit=10):
    """搜索 arXiv 论文"""
    result = subprocess.run(
        [OPENCLI, 'arxiv', 'search', query, '--limit', str(limit), '-f', 'json'],
        capture_output=True, text=True, timeout=30
    )
    if result.returncode != 0:
        return []
    return json.loads(result.stdout)


# 使用示例
if __name__ == '__main__':
    news = hackernews_top(5)
    for item in news:
        print(f"  {item['title']} [{item['score']} pts]")
```

---

## 18. 完整命令速查表

### 🔥 最常用（绿色 — 无需任何配置，即开即用）

| 命令 | 用途 | 策略 |
|:---|:---|:---:|
| `hackernews top/ask/show/jobs` | HackerNews 内容 | public |
| `producthunt today/hot/posts` | ProductHunt 新品 | public |
| `arxiv search/paper` | arXiv 学术论文 | public |
| `web read` | 任意网页转 Markdown | cookie/browser |
| `36kr hot/news/search` | 36氪新闻 | public |
| `baidu-scholar search` | 百度学术搜索 | public |
| `bing search` | Bing 搜索 | public |
| `google search` | Google 搜索 | public |
| `brave search` | Brave 搜索 | public |
| `sogou search` | 搜狗搜索 | public |

### 🟡 中度常用（可能需要简单配置）

| 命令 | 用途 | 策略 |
|:---|:---|:---:|
| `douban movie-hot/top250/search` | 豆瓣内容 | public |
| `bilibili hot/search/video` | B站内容 | public |
| `zhihu hot/search/question` | 知乎内容 | public |
| `weibo hot/search` | 微博内容 | public |
| `xiaohongshu search/note` | 小红书内容 | public |
| `douyin hot/search` | 抖音内容 | public |
| `spotify search` | Spotify 音乐 | public |
| `apple-podcasts top/search` | Apple 播客 | public |

### 🟠 购物/电商（可能需要 Cookie）

| 命令 | 用途 | 策略 |
|:---|:---|:---:|
| `1688 search/item/store` | 1688 商品 | cookie |
| `taobao search/item` | 淘宝商品 | cookie |
| `jd search/item` | 京东商品 | cookie |
| `pinduoduo search` | 拼多多商品 | cookie |
| `amazon search/product/...` | Amazon 商品 | cookie |

### 🔵 金融

| 命令 | 用途 | 策略 |
|:---|:---|:---:|
| `binance price/klines/ticker` | 币安行情 | public |
| `coinmarketcap top/search` | 加密货币排行 | public |
| `eastmoney search/quote` | 东方财富股票 | public |
| `barchart flow/futures/forex` | 资金流向/期货/外汇 | cookie |

### 🟣 办公/外部 CLI（需额外安装或运行中）

| 命令 | 用途 | 依赖 |
|:---|:---|:---:|
| `obsidian ...` | Obsidian 笔记管理 | Obsidian 运行中 |
| `gh ...` | GitHub CLI | 已安装 `gh` |
| `docker ...` | Docker 管理 | 已安装 Docker |
| `vercel ...` | Vercel 部署 | 已安装 Vercel CLI |
| `lark-cli ...` | 飞书操作 | 已安装 lark-cli |
| `dws ...` | 钉钉操作 | 已安装 dws |
| `wecom-cli ...` | 企业微信操作 | 已安装 wecom-cli |

---

### 查看所有可用命令

```bash
# 完整列表（628 条）
opencli list

# 查看某站点支持的命令
opencli <站点名> --help

# 查看某子命令的详细参数
opencli <站点名> <子命令> --help
```

---

> 📌 **本地路径：** `C:\Users\wxb\AppData\Roaming\npm\opencli.cmd`
>
> 📌 **版本：** 1.7.8
>
> 📌 **标签说明：**
> - `public` — 无需任何配置，直接使用
> - `cookie` — 需要浏览器 Cookie（通过 opencli browser bridge）
> - `intercept` — 需要网络拦截（通过 opencli browser bridge）
> - `External` — 需要独立安装对应的 CLI 工具

---

*教程生成时间：2026-04-28 | 数据来源：OpenCLI `list` 命令输出*
