---

title: 免费部署私有n8n：免费的2CPU+16GB服务器，在线PostgreSQL数据库，尝鲜体验无限制的工作流
date: 2025-10-17
tags: ["n8n", "工作流", "自动化", "部署", "安装", "搭建", "工作流自动化"]
category: 自动化工具
---


# 免费部署私有n8n：免费的2CPU+16GB服务器，在线PostgreSQL数据库，尝鲜体验无限制的工作流

Original 武穆逸仙 [武穆逸仙](javascript:void(0);)*2025年10月17日 11:52* *江苏*

玩大模型的避免不了要接触到 Hugging Face   （https://huggingface.co/）。尤其他们提供了免费云服务器：2核 CPU、16G 内存、50G 硬盘空间，还提供了3种模板：Gradio、Docker、静态HTML，可以很方便的来部署你的应用。我们本次就通过使用Docker来部署n8n服务。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQ2MeNhoQArpyhcuM8L2a1XjG3OwhcAYbhjEndRAtD5TIOfU0NOOhcYg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

部署n8n还需要用到数据库，我们使用在线免费部署的PostgreSQL 数据库。

Supabase（https://supabase.com/）就提供了你可以拥有创建表、设置表关系等完全控制权限、存储空间用500M的免费版无阉割、完整功能的PostgreSQL 数据库。我们用来尝鲜部署n8n就够用啦！

接下来就开干！

1、创建PostgreSQL 数据库服务

登录Supabase（直接通过GitHub免注册登录即可），访问https://supabase.com/ 点击 Sign in 。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQUzJnqC8x0ReU1Kk7Y6CM5oWFMgtdL0iaOWcKkaL1uSxsugCW6qcAicqQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

通过GitHub登录。

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQa3zagLH8yBagqicQstBzwmAszCJTj5ic0VoEf8V3KJGtDsj7ssXz0how/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

登录进去以后，首次会提示要创建Organization，输入Name，点击 Create organization。

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQQMYuLpxdFEX4NJFOywiavQdNia544Ytnct6Bpr4NOSafC0liaXN714QYg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

点击 New project 创建项目。

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQaia2f5U725ia4KrpbrgGbc8VILedDyicvYR8qsQg9ItzddJq5Mqv5icCTQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

输入项目名称 Project name，PostgreSQL数据库密码 Database password，Region 可以选择West US (North California) us-west-1 ，然后点击 Create new project 。

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQiaCicJFsKYvWXGJUKhBWM1T5nUMribTfQSqp1y49XGFZN3b2yvJpYHcsA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQ1oz3SeOnDzXDOGnyCF4tMEtj3xPOyyGlib86dTCOWQRhns9zyO4CW8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

等待创建完成后，通过点击 Connect ，Type 选择 SQLAlchemy，往下拉找到Transaction pooler 即可查看获取PostgreSQL数据库连接相关信息。

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQnrhK0CrVickakxVk6S3OQKby8CvEG21rKStibicmbTeebYEBITz7g04bA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

![Image 8](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQqJLmNpXBOC9UuO7QIEeA6ezdVV9Cx134DnzRTJpicGJufwmon7Lxy6Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

![Image 9](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQvLxiaztoibB7hNQLVAb7gQCrkYv6IY5l3ICR8YaRVF2L7gMfdbiaNHAkg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

Transaction pooler 里面的数据库连接信息是可以公网访问的地址。

记住这些数据库连接信息，等下配置n8n的时候需要用上。

2、部署n8n服务

登录Hugging Face 访问 https://huggingface.co/ 点击 Log In ,没有账号的话就需要通过点击 Sign Up 注册。

![Image 10](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQLIyNAwbEgak1JxZ3DsqF7ZZF5ORtjJO6Q9fq0J664HmDtYtRlBPTtQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

输入Username or Email address  和 Password 点击Login  登录到Hugging Face 。

![Image 11](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQ1QNiclvMQJnabicAL8UwEjHibPXWn2Riaf1bo4rtSdMiaPbvIE7icTPXCWQQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

点击 New > Space 创建Space。

![Image 12](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQNwMnK0Wrarq918SehqeQt5OPM4ibS1BX9WWDafwVIibvpICXFiaP4iahJg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

输入space name、Short description（可不填），选择Docker，Docker template 已默认选中了 Blank，可以不用改，Space hardware 现在也已经默认选中，也不用改；Public 也已默认选中，即可公网访问，也不用改。

点击下方的 Create Space 即可完成创建。

![Image 13](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQPzWiawQGIloEBYJ28TGOjS9IQfNh8uNeYhcmicCGXU5W9RUS68LPbcAg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

![Image 14](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQd1eysEbZQ5gjWtSib5sQ5JpFC4ZNJgvLPXYhakspNmNnD12jsawh4yg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

Space创建后，进入Space 工作台，点击 Setting 设置环境变量，主要就是设置PostgreSQL数据库连接相关信息。

![Image 15](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQibKCQZg7sAw8rdKHFO9OHlUq7SibXBtTiaFibusu1WGHTlRyjtroVGzSLw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

往下拉，找到 Variables and secrets ，

点击 New variable 添加 公开 的环境变量，

![Image 16](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQ6xObEhY1DwEy7jGWWBJ6AeYytuxjibUAnDsRCw93n0fFL9tUWYlSf6Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

公开环境变量名称有：

||
|-|
|DB_TYPE|
|DB_POSTGRESDB_HOST|
|DB_POSTGRESDB_PORT|
|DB_POSTGRESDB_DATABASE|
|N8N_PORT|
|N8N_PROTOCOL|
|N8N_EDITOR_BASE_URL|
|DB_POSTGRESDB_SSL|
|N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS|




点击 New secret 添加 私密 的环境变量，

![Image 17](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQoYNAJLlubO94jRySuGLOicZGib7Msia7NZo4a5icmryU9q1DpxnQgQzYvA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

私密环境变量名称有：

||
|-|
|DB_POSTGRESDB_USER|
|DB_POSTGRESDB_PASSWORD|
|N8N_ENCRYPTION_KEY|
|WEBHOOK_URL|

添加完环境变量后，页面如下：

![Image 18](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQcHDeLOgOZ3h5vsEZzCOiclqRjCRNIdnmjIicuU0EiagHVhT7EDh3cwhAQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

环境变量设置完以后，还需要添加Docker的 Dockerfile 文件，

点击 Files > Contribute > Create a new file 

![Image 19](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQdBfxV5X8GjYlyBk6H9fibFicEBcfUFgWSfBWr4FMZQvrSiaqibCialrFdiag/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

![Image 20](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQLI2iaUpJmv0O06WQQuibTHION9XgTrShCjPFBnTib5ibjBibI0Ij4E4B37Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

输入文件名：Dockerfile

内容输入：FROM n8nio/n8n

然后点击 Commit new file to main 提交

![Image 21](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQKS8nCbLPgkUYg1llYT8h9b3M1x3S4Szc1ROWtq8oia9P1oFib128ic72A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

以上工作做完后，Hugging Face Spaces 会自动开始构建和部署n8n。

部署过程中，你可以通过点击 Log 查看构建日志。等状态由 Building 变为 Running  即部署完成。

![Image 22](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQm0kfWRBRfwOgDggK4pH3iclaVA7rFCB0hY4u46vkBM2FicpfD1p1yp8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

在日志中看到如图，即说明已经部署成功，可以通过该网址访问n8n啦！

![Image 23](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQ3A2Fry1ia74SibOayUzwnE3RE8Xf5jBIpe10dpD5alcRDibErHSDvOm6w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

若部署失败，查看原因，检查数据库的环境变量，尤其是数据库用户名、密码、端口、连接地址等。

访问n8n服务，网址是 https://[YourName]-[YourSpaceName].hf.space/

首次登录，系统会创建所有者账户，输入Email、First Name、Last Name、Password ，点击【Next】即可创建所有者账户。

然后登录。

![Image 24](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQImYoD8vcyz1DCnxJyPjF771pic8lBVZKFvOC6SQyvzibef7fAN9ia5Bcg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

![Image 25](https://mmbiz.qpic.cn/sz_mmbiz_png/NskkNmuRknHSviaostQfgYJ8TUUbwrNTQveZLk49Y5VCfbSmEzHwa6X1vEqeeQJQ6WsbXCqBBciaw3bicmETBR9yQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)

到此，你已经完美的部署好了一个免费的、完整权限的n8n服务啦，可以去尝鲜体验啦！

> 小提醒：Hugging Face Spaces 的免费 CPU 套餐有休眠策略哟，即一段时间内不访问n8n服务，Space会自动休眠，你可以通过定时任务、监控服务工具等定时去访问一下n8n服务，就可以保持服务正常访问。

![Image 26](https://mmbiz.qpic.cn/mmbiz_png/bL2iaicTYdZn7AhvP8FxjjUW8jibfbKssroylf8KicQCIib0uF1I3kCKoeYKeKBUicyDLW7yr1rqBdUhrweKO5FB02Hg/640?wx_fmt=png&from=appmsg#imgIndex=26)

![Image](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgxqPrEXF34G6aWiahN0FI9QNoLnjvCPo9zdL2nq6SfkLPibDWJWswcBhNicP3p3X0YIzhXHzKiaH0CQA/640?wx_fmt=gif&from=appmsg#imgIndex=27)

**E**

**N**

**D**

![Image 1](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWh5gLsXiaV56WIr34CqGET1N1r7t93jYcW3Y6yyQE3N0lNvLj0eg0HnMtY78Lmia81wz0K6JNN9BFEg/640?wx_fmt=gif&from=appmsg#imgIndex=28)

**感恩一路相伴**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/NskkNmuRknF3te7DeZQ4iaf0VCs1gicNkH22xljFHTb67Opy8tsyaicbnxtgOpj27MHQAHF7VZULdLQYOwW5uewww/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=29)

![Image 27](https://mmbiz.qpic.cn/mmbiz_png/bL2iaicTYdZn7ShRwRWZiaUlsQ0bF8IH0Hq8e0u1HO3Bzt6K8GWtwiaPkJt73ib82IFGsJIjicKzNhX2IV17wekUnyjA/640?wx_fmt=png#imgIndex=30)

没有高度、深度和广度，只是凑字数。利用读书、参考、引用、复制和粘贴等多种方式打造的纯镀 24k 文章！

如若有侵权，请联系删除。

