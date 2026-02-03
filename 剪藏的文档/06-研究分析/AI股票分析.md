---

title: AI股票分析
date: 2026-01-26
tags: ["AI", "人工智能", "智能体", "Agent", "研究报告"]
category: 未分类
---


`📌 TradingAgents-CN 容器介绍TradingAgents-CN是由`**AI4Finance-Foundation** 开源的智能量化平台，专门针对 A股进行了适配。它提供了 **股票数据获取、特征工程、强化学习建模、可视化分析** 一整套工具，并且支持 **Web 界面交互**，让用户可以像使用量化平台一样操作，而不需要复杂的命令行环境。

> 🚀 最新版本 cn-0.1.13-preview: 原生OpenAI支持与Google AI全面集成预览版！新增自定义OpenAI端点、9个Google AI模型、LLM适配器架构优化！

    🎯 **核心功能**: 原生OpenAI支持 | Google AI全面集成 | 自定义端点配置 | 智能模型选择 | 多LLM提供商支持 | 模型选择持久化 | Docker容器化部署 | 专业报告导出 | 完整A股支持 | 中文本地化

基于多智能体大语言模型的**中文ai分析决策框架**。专为中文用户优化，提供完整的A股/港股/美股ai分析能力。

一键部署概览（要点）

克隆仓库 → 配置 `.env`（填入 Tushare、LLM/API Key 等）→ `docker-compose up -d --build` → 浏览器访问 `http://<服务器IP>:8501`。

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFD5UCZMGqH1Ff0s9GVhoJIxIaTavKMJ4KiaKkxdHoyGB2qIiafIu5x2f5A/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFDyjIHuvB8axSQY6e6B8hvUSyvbl1jvKzrxxz6uLElIMlnIEdPJyzlicw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFDrbqPEa3icfuJMe0nrSrTCXGiaRwoAgEFehQmjK9qf2ewMU3XrYGJFa4w/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFDVNUxKm01wOnoD1Wf5LJ2RNCGBs3Do72WZFOOibfW5cW9VQICqVhWnOQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFD1LticF928lZLoQxJHOibQvd1SVRNsIEicVarkPuevtPlsgFTic6BPBylHg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

详细步骤（web界面下操作）

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFDxBVicwPsopzF7ouyMhNibhLkmEBszgk8TI4neAscBE5vnQpTwhUIMPXw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

下载压缩包，上传到文件夹解压

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFD8D5ysUk5ibBOeMnGwibIZznAMntOdfPeZq0LK7ibhQicDk4rlzrHuzrM3g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

.env.example文件如果在线编辑的话改名称txt后打开在线编辑按照自己ai的供应商来找key后面粘贴保存即可（保存后名字修改为:(.env)）我这边使用的是deepseek，防止误删我这边先复制原.env.example重新粘贴新的在里面操作的

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFDf7ZrQBtDuxoXBNgsCKVVjKw7pXTTIwc65Y6oHZwLmqDcLsBmU8BWnw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFDgPEsQdsZAHYg1sdKH6QHia6sXUSSyb2Cxn5YicnW8mKnquSfK6LL704A/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

打开飞牛的docker软件从compose创建新的项目，找到你解压的文件夹

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFDhfUcFh0Mj9Ssiazsnqsn3F5whANpU8dDf8fjSibsiacYqsYlYXv1sHWVA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

根据个人情况我这边说下我遇到的问题是这个端口被占用，有可能是飞牛自身占用

```
redis-commander:    image: ghcr.io/joeferner/redis-commander:latest    container_name: tradingagents-redis-commander    restart: unless-stopped    ports:      - "8085:8081"  （我只修改了这里8085，按个人情况修改）    environment:      - REDIS_HOSTS=local:redis:6379:0:tradingagents123    networks:      - tradingagents-network    depends_on:      - redis    healthcheck:      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:8081"]      interval: 30s      timeout: 10s      retries: 3      start_period: 30s
```

我这边使用的是deepseek的模型，测试了一次下面是单次大概用量

![640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1](https://mmbiz.qpic.cn/sz_mmbiz_png/m0Kvuib3pkclTp1pleS6Ds9BRpUekRZFD0K7msuHlFhbIYkgc0zTn9J4T6pFytza8DI2SsoJ3gu2Vhuwj7IIroQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

目前需要注意的一些点就是docker-compose.yml里面去掉version: '3.8'以防止报错，还有端口需要注意是否被占用；后台的设置管理个人看来只是为了用于查看，修改api等还是要回到env文件里面修改，修改后记得重启就好。



