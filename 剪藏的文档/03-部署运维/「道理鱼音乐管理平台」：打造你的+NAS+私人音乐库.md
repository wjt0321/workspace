---

title: 「道理鱼音乐管理平台」：打造你的 NAS 私人音乐库
date: 2025-10-15
tags: ["部署", "运维"]
category: 部署运维
---


# 「道理鱼音乐管理平台」：打造你的 NAS 私人音乐库

Original 肖昶 [纳思稻壳](javascript:void(0);)*2025年10月15日 18:05* *广东*

 

🧾 详细介绍

**道理鱼音乐管理平台** 是一款面向 NAS 用户的音乐管理与播放系统，支持媒体扫描、元数据补全、收藏与队列管理、自动转码等功能。支持 Docker 快速部署，也可本地运行，适合技术爱好者和音乐收藏控。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRWx0qKSfvPoKe4FvtOccxuKFica6ich2ibOF2bzjficGlbqVic80dYTaOTrg/640?wx_fmt=gif#imgIndex=0)

---

## ✨ 核心亮点

- • 🔍 **媒体扫描**：支持多目录配置，自动解析 ID3 元数据、封面、歌词并写入数据库。

- • 🎧 **智能播放**：Web 前端支持队列、收藏、音量与进度控制，令牌式音频流与 HLS 播放。

- • 👥 **账号系统**：支持管理员与普通用户权限区分，开放注册、资料修改、密码变更与头像上传。

- • 💖 **收藏体系**：曲目、专辑、歌单收藏一应俱全，可直接加入播放器队列。

- • 📢 **实时通知**：内置 WebSocket 网关，后续可扩展扫描与播放的实时反馈。

- • 🔄 **转码缓存**：集成 FFmpeg 实时转码，自动生成指定码率缓存并后台统计与清理。

- • 🧩 **插件与元数据**：自动识别插件清单，支持多元数据源启用与优先级配置。

---

## 📝 前期准备

1. 1. 在电脑本地新建文件 `.env` 并把下面内容复制到 .env 保存

```Plain Text
# 管理员用户显示名称
ADMIN_DISPLAY_NAME="admin"

# 管理员用户邮箱
ADMIN_EMAIL="artisan@88.com"

# 管理员用户密码 (请务必修改为强密码)
ADMIN_PASSWORD="admin1234"

# AcoustID API 密钥，用于音乐识别
ACOUSTID_API_KEY=""

# Last.fm API 密钥，用于获取音乐元数据
LASTFM_API_KEY=""

# Last.fm API 密钥的秘密
LASTFM_API_SECRET=""

# Spotify Token，用于 Spotify 集成 (如果使用)
SPOTIFY_TOKEN=""

# Spotify 客户端 ID
SPOTIFY_CLIENT_ID=""

# Spotify 客户端秘密
SPOTIFY_CLIENT_SECRET=""
```

上面内容可以根据自己实际需求进行修改，`管理员用户密码` 一定要修改。

2. 上传 .env 文件到 飞牛部署 Docker compose 的相同目录


![Image](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRDRyu5u2k1pxa0Ex7VLtATwG0XRncnt3ico700KSfdFmiaJD8y7FpLf7A/640?wx_fmt=png&watermark=1#imgIndex=1)

---

1. 

## 🐳部署指南

### 🎯 Docker Compose

`docker-compose.yml` 文件

```Plain Text
services:
  backend:
    image: msmkls/daoliyu-backend:latest
    container_name: daoliyu-backend
    restart: unless-stopped
    environment:
      DATABASE_PROVIDER: "sqlite"
      DATABASE_URL: "file:/app/data/dev.db"
      APP_PORT: 4000
      ADMIN_DISPLAY_NAME: "${ADMIN_DISPLAY_NAME}"
      ADMIN_EMAIL: "${ADMIN_EMAIL}"
      ADMIN_PASSWORD: "${ADMIN_PASSWORD}"
      LIBRARY_ROOT: "/data/media"
      PLAYLISTS_IMPORT_ROOT: "/data/playlists"
      REGISTRATION_OPEN: "true"
      PLUGINS_DIR: "/plugins"
      ACOUSTID_API_KEY: "${ACOUSTID_API_KEY}"
      LASTFM_API_KEY: "${LASTFM_API_KEY}"
      LASTFM_API_SECRET: "${LASTFM_API_SECRET}"
      SPOTIFY_TOKEN: "${SPOTIFY_TOKEN}"
      SPOTIFY_CLIENT_ID: "${SPOTIFY_CLIENT_ID}"
      SPOTIFY_CLIENT_SECRET: "${SPOTIFY_CLIENT_SECRET}"
      REDIS_URL: "redis://redis:6379/0"
      LOG_LEVEL: "debug"
      DEBUG: "true"
    volumes:
      # 下面冒号左侧是本地数据库文件夹，右侧是容器内路径，不要改动容器内路径
      - ./backend-data:/app/data
      # 下面冒号左侧是本地数据文件夹，右侧是容器内路径，不要改动容器内路径
      - ./backend-storage:/app/storage
      # 下面冒号左侧是本地音乐文件夹，右侧是容器内路径，不要改动容器内路径
      - ./media:/data/media
      # 下面冒号左侧是本地播放列表文件夹，右侧是容器内路径，不要改动容器内路径
      - ./playlists:/data/playlists
      # 下面冒号左侧是本地插件文件夹，右侧是容器内路径，不要改动容器内路径（目前未启用不用动）
      - ./plugins:/plugins
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:4000/health"]
      interval: 30s
      timeout: 5s
      retries: 5
frontend:
    image: msmkls/daoliyu-frontend:latest
    container_name: daoliyu-frontend
    restart: unless-stopped
    depends_on:
      - backend
    ports:
    #  5173是本地访问端口，可以自行修改，8080是容器内端口，不要改动
      - "5173:8080"
redis:
    image: redis:7-alpine
    container_name: daoliyu-redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis_data:/data
volumes:
  redis_data:
```

`- ./media:/data/media`： ./media 设置为音乐文件所在目录。

---

1. 1. 在飞牛主页面找到 **Docker** 打开后，切换菜单 **Compose** -> **新增项目**。

    ![Image 1](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPR5zpZZicPwsjEcK5hImcdsgJCcWKokH9VHDab0XCTk4ZmsfrHNThHIoQ/640?wx_fmt=png&watermark=1#imgIndex=2)

1. 2. 创建项目页面根据实际情况定义 **项目名称**、选择 **路径**，并把上面 **docker-compose.yml** 文件内容复制填入 **来源** 文本框内容。按需修改检查无误后点击 **确定** 按钮进行部署。

    ![Image 2](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRpNx10Xn0iaINS2okEicONCCiaVQuv0Cx8Nic0IaWrWDHaewCtUddDWfBLw/640?wx_fmt=png&watermark=1#imgIndex=3)

1. 3. 返回 **Docker**管理页面，在 **容器** 菜单，就可以看到运行情况。

    ![Image 3](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRegYMebenXsV3Mc4iadGBn7ISJmK3kiaJYoYvcs3SmoOgyMh0Cqmgn6NQ/640?wx_fmt=png&watermark=1#imgIndex=4)

---

## 📖使用

1. 1. 浏览器访问 `http://nas-ip:5173` 并登录

    ![Image 4](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRR5afBhichTz1xz8LMt3iaZQeEvrryb9FGygJxs0WAEZKFAlkPdXOYXmQ/640?wx_fmt=png&watermark=1#imgIndex=5)

- • 邮箱是上面 `.env` 中 `ADMIN_EMAIL` 填入的内容。

- • 密码是上面 `.env` 中 `ADMIN_PASSWORD` 填入的内容。

1. 2. 首页

    ![Image 5](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPR5sde7mRtPDdpBlvvpbJoeialrhic76AYSITGXsmiaEVJRLunrKQ7bjKng/640?wx_fmt=png&watermark=1#imgIndex=6)

1. 3. 媒体库扫描

    ![Image 6](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRCV2r0d7xv11UBFTiaLyv24QQDScu0AiavncZgUAaJFnOvJzicHXgtq0Lg/640?wx_fmt=png&watermark=1#imgIndex=7)

    ![Image 7](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRrX0r5gSD2QpNlR6faVc3KkicdK7RZRFBxiak5kmf8GMFATZw3HjW4CLw/640?wx_fmt=png&watermark=1#imgIndex=8)

    ![Image 8](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRibgsmYgXAVXvNjH3j2skSthMZliayleGR2DMeMryn8DFTCZicJzw16Tmw/640?wx_fmt=png&watermark=1#imgIndex=9)

1. 4. 返回首页播放音乐

    ![Image 9](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRaxAtRAwyMz0TM2OYvOiaUcVS4gOwWwHfWzfszmUXTmUriaa3Kiaf4gUXQ/640?wx_fmt=png&watermark=1#imgIndex=10)

    ![Image 10](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRuibicJ7FmAJjt5BhVNw9BdalvwZSWeLIttJ1wObCY9iagpeibIDbIVxY5A/640?wx_fmt=png&watermark=1#imgIndex=11)

1. 5. 其它个性化设可以进入 `系统设置` 设置

    ![Image 11](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPR7bKaGSVB1flFkpFHZoBOW1vA9ry0hk0CLqMwOK64UgcQG3Vb3xJyKg/640?wx_fmt=png&watermark=1#imgIndex=12)

    ![Image 12](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRkL8Zz3h0WbjWiaexN2DaMmQ5ibparZ4hzw3S8Xovxic2NaA5IKm4Wm7QA/640?wx_fmt=png&watermark=1#imgIndex=13)

    ![Image 13](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRtUeA4oQofl6lMK9ibTlLrc04MFIRqKhNicPOFImjjlHgVKd50lIUKZnw/640?wx_fmt=png&watermark=1#imgIndex=14)

    ![Image 14](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRN7ajJUcvTjsqgZMAMefzHQsklJmh4C8j13Od4bSOAaU0yZsr4y0YsA/640?wx_fmt=png&watermark=1#imgIndex=15)

    ![Image 15](https://mmbiz.qpic.cn/mmbiz_png/qib7pDESibgwcT2lN2dXswFIK4d1UDeTPRbZMTxD1NjEibHdD7pUtTegjrj0IJiamx8Wwf51bEpGkicEoM1Wu3o4C9A/640?wx_fmt=png&watermark=1#imgIndex=16)

---

## ⚠️ 总结

🎶 **道理鱼音乐管理平台**作为一款面向 NAS 用户的全栈音乐系统，已经具备了从媒体扫描到播放、收藏、转码、通知等一系列实用功能。通过 Docker 快速部署，几步操作即可拥有属于自己的音乐空间。

---

#### 往期推荐

#### [NAS部署免费开源的网易云播放器：YesPlayMusic](https://mp.weixin.qq.com/s?__biz=MjM5MzY0NTk2MQ==&mid=2447971177&idx=1&sn=0b80aaeff0d262b125698193741a2e23&scene=21#wechat_redirect)

#### [飞牛 NAS 手动更新 Docker 镜像：dockerCopilot](https://mp.weixin.qq.com/s?__biz=MjM5MzY0NTk2MQ==&mid=2447971097&idx=1&sn=adc433332821f1c3e7f93bccf98bce58&scene=21#wechat_redirect)

#### [一键生成 STRM 文件，SmartStrm 让你的网盘秒变媒体库！](https://mp.weixin.qq.com/s?__biz=MjM5MzY0NTk2MQ==&mid=2447971836&idx=1&sn=9f821aecfaab9ea91cee84a1881ed2af&scene=21#wechat_redirect)

#### [飞牛 Docker 部署跨本地音乐播放器：nas-music](https://mp.weixin.qq.com/s?__biz=MjM5MzY0NTk2MQ==&mid=2447971845&idx=1&sn=de01fe52ff01fe1dd7aabc47034a2326&scene=21#wechat_redirect)

