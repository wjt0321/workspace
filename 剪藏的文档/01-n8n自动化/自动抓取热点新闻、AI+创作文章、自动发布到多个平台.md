---

title: 自动抓取热点新闻、AI 创作文章、自动发布到多个平台
date: 2025-10-01
tags: ["AI", "人工智能", "智能体", "Agent", "n8n", "工作流自动化"]
category: 未分类
---


# 自动抓取热点新闻、AI 创作文章、自动发布到多个平台

Original 几乎满级 [几乎满级](javascript:void(0);)*2025年10月01日 07:55* *广西*

**声明：**该公众号分享的工具和项目均来源于网络，仅供安全研究与学习之用，下载试用后请24小时内删除，不得用于任何商业用途。如用于其他用途，由使用者承担全部法律及连带责任，与工具作者和本公众号无关。

> **AIMedia** 是一款开源的 AI 驱动媒体自动化工具，支持从多源（如抖音、网易、微博）自动抓取热点新闻，利用 AI 生成文章并配图后一键发布到头条、微信公众号、小红书等平台。

### 功能速览

•

**热点抓取**：自动从抖音、网易新闻、微博热搜、澎湃新闻、中国日报、搜狐新闻等源采集热点，支持定时/手动触发。

•

**AI 文章创作**：基于抓取内容，AI 生成原创文章，智能配图（文本内容用 Stable Diffusion 生成图像，提升原创度）。

•

**多平台发布**：一键推送至头条、企鹅媒体平台、微信公众号、百家平台，支持自动化 Chrome 浏览器模拟操作。

•

**Web 界面**：Streamlit 构建的简易 UI，配置参数/监控进度/查看日志。

•

**局限**：仅 Windows 支持，Plus 版商用（视频生成等），开源版无服务器持久化。

### 安装与部署

**Windows 安装**

•

**前提**：Windows 10+，4 核 CPU/8GB RAM。

•

克隆：`git clone https://github.com/Anning01/AIMedia.git`。

•

配置：`cp config.py local_config.py`，编辑 zhipu_aip_key 等 API Key，启用 Stable Diffusion 若需图像。

•

虚拟环境：

•

Conda：`conda create -n AIMedia python=3.12.4`，`conda activate AIMedia`，`pip install -r requirements.txt`。

•

venv：`python -m venv venv`，`.\venv\Scripts\activate`，`pip install -r requirements.txt`。

•

Chrome：下载测试版，解压到 ./chrome。

•

启动：`streamlit run main.py`（Conda）或 `webui.bat`（venv，管理员权限）。

•

浏览器：自动打开 http://localhost:8501。

**一键包**：下载启动包，解压 venv.tar.gz，运行 `update.bat`（需 Git），`webui.bat`（管理员）。

**更新** ：`update.bat` 或 `pip install --upgrade -r requirements.txt`。

### 项目信息速览

•

项目地址：github.com/Anning01/AIMedia

•

开发者：Anning01

•

Stars / Forks：578 ⭐ / 110 Forks

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/6SfPkcUDfbRzyaUNzAFzC0XW48moM2qljPXxlMYG8oNvOAlyVD1KXCia5V0U3WQNYnoUvWCmqSAfwrudXEe6Uicw/640?wx_fmt=jpeg&from=appmsg#imgIndex=0)

