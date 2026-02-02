---

title: 【AI领域】n8n+Ollama+Qwen3构建企业级RAG检索系统-知识库
date: 2025-12-17
tags: ["n8n", "工作流", "自动化", "AI", "人工智能", "智能体", "Agent", "工作流自动化"]
category: 自动化工具
---


# 【AI领域】n8n+Ollama+Qwen3构建企业级RAG检索系统-知识库

Original 梦无矶小仔 [梦无矶测开实录](javascript:void(0);)*2025年12月17日 08:03* *上海*



在小说阅读器中沉浸阅读

# n8n+Ollama+Qwen3构建企业级RAG检索系统-知识库

## 1、Qwen3-Embedding介绍

硅基流动：https://cloud.siliconflow.cn/me/models

魔搭社区：https://www.modelscope.cn/search?search=Qwen3-Embedding

HuggingFace：https://huggingface.co/Qwen/collections

![Image](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIf3kTiaPcicam67gFfyWlwIOSPf4MoSRZUHQOtWibEA2CpNw1U1no0pfJA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![Image 1](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIZkeww12XreQp7hwkG603wIhEbs2JKybeZLJK05KHX3VZCOF8D5IGWQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

## 2、Ollama安装下载

Ollama官方地址：https://ollama.com/ 

我的Ollama安装路径：`E:\S_Software\Ollama`

### ① 手动创建Ollama安装目录

我手动创建的文件夹目录为：`E:\S_Software\Ollama`

### ② 运行安装命令

创建好之后，把Ollama的安装包exe放在这个目录下，接着再到这个目录下运行cmd命令：

```Plain Text
OllamaSetup.exe /DIR=E:\S_Software\Ollama
```

`DIR`后面的路径是之前手动创建的文件夹路径。

输入命令后直接回车，Ollama就会进入安装程序，这个时候可以看到安装的路径变成了我们刚刚创建的文件夹。

### ③ 安装完毕

安装好了之后，在控制台输入`ollama`，可以正常显示ollama版本则表示安装成功。

![Image 2](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIJlFqicpXIHhGaXYYxae9Cm1gsBaAWvwUHf8cNsJwHZHORJZYZSICWfw/640?wx_fmt=png&from=appmsg#imgIndex=2)

### 2.1、修改模型下载目录

#### ① 创建models目录&修改默认模型下载目录

在之前的安装目录下创建一个models文件夹：`E:\S_Software\Ollama\models`。

![Image 3](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIytwDiaYWYibsMPzfXQ8bquluJhJv1XLV9wEDvluW1MibCGJ0ASLgFXx7g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

打开ollama软件，点击`settings`，找到`Model location`，把路径修改成上面创建好的这个。

![Image 4](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xI6icNqvDxfpLEYrACI1lfOpibr2zxx0bDhDcrxztxKIrLUNuaxZVY7Cibg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

#### ② 模型转移

在命令行输入`ollama list`，如果发现有模型，则进行这一步操作。

![Image 5](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIicvALkhEVk5PHtuBhqbmHibDxnq7AIoKiadiciaP5zCDyDPR2ju8GpL15nA/640?wx_fmt=png&from=appmsg#imgIndex=5)

先退出ollama，接着进入`C盘-->用户-->你自己的电脑名称-->.ollama-->`剪切整个`models`下的内容到刚刚上面新建的存储目录下，之后删掉C盘的这个`models`文件夹。

如果之前修改过存储目录，那就自己找到再去复制。

这个时候就是正常的了。

![Image 6](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIZvXx3683jOJD8D3YxysneULbbvemZAwYtZjaHgp51CBkzicSFgkY37g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![Image 7](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xImjbem3bevibCGU6XAnraqqRvOmBSVTvZPiarGcZZTjUF8Gkf1UCTlObQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

### 2.2、安装nodejs

如果想用nodejs安装n8n，可以安装nodejs，推荐安装v22以上的版本，这里我安装的是v24.11.1。 

nodejs官网：https://nodejs.cn/download/

![Image 8](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIbMO6KcFE7uEFsOGC9Fbp0r4Hkib2kJt8ktmf1wmfQSwQpqKSbz3aQGA/640?wx_fmt=png&from=appmsg#imgIndex=8)

一路默认安装就行，有其他想法的自行AI搜索。 使用如下命令下载即可：

```Plain Text
npm install -g n8n   # -g表示全局安装，可在任意目录运行，整个过程大概需要5-10分钟
```

- **Windows报错**`gyp ERR! find VS`：需安装Visual Studio的C++桌面开发工具（勾选Windows SDK）。

- **Linux/macOS报错`distutils`缺失**：安装Python 3.x并确保`distutils`可用。

#### 解决`gyp ERR! find VS`报错

**1、报错内容**

```Plain Text
npm error gyp ERR! stack Error: Could not find any Visual Studio installation to use
```

原因是：n8n 依赖的 sqlite3 模块需要本地编译，但你的系统缺少 Visual Studio 的 C++ 编译工具链。而Visual Studio几乎是必备工具，因为支持：

- C++ 开发工具链

- .NET 框架

- Windows SDK 和系统库

**2、解决方案**


下载对应的工具：https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/

下载2022版本，最新版2026的VS在npm没兼容无法识别

旧版下载链接：https://visualstudio.microsoft.com/zh-hans/vs/older-downloads/

实在下载不了就直接找我给安装包

- **① 选择 "C++ 桌面开发"，勾选windows sdk（我的是win11，勾选的是win11的sdk）注意要是2022**

    ![Image 9](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIO5tRnHCMPvVp0JxAsoYRHtmVyg6KyarhTzSzw63FXcPoyrYIeuOEGg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

- **② 自定义安装目录**


    安装需要十几个G的空间，建议更改盘符，另外一个windows11的sdk也勾上，win10那个也勾上，我在这踩了好多坑，我也不知道为什么我win11的电脑装win11还是报错找不到windows sdk，建议还是用docker安装，一个命令就结束。

    ![Image 10](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIibSN0w7rT9DHsohmWjIFOmB7mrsibPmNr8D9DAsqxiclVSic4GO1yHRguQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

这是后面我补充安装好的配置。

![Image 11](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIVukjz8jficcriaumnGhibCKC8KsU4U7kqjgOl3icXic1UPSnicia2ZJic9gDow/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

等待安装完毕即可，安装完成之后重启电脑。

![Image 12](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIAzBv6EEVmmQeVbnHic0WThiaH3QKNiayJNGN3pXialDubwrSgO20K6uH2A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

### 3、重新安装n8n

```Plain Text
# 1、卸载全局安装的 n8n 包
npm uninstall -g n8n

# 2、强制清理 npm 缓存文件
npm cache clean --force

# 3、验证缓存完整性并优化空间
npm cache verify

# 4、全局安装 n8n 包
npm install -g n8n

# 5、查看全局安装的 n8n 版本和依赖
npm list -g n8n
```

### 4、启动n8n

配置好环境变量后，在命令行中输入`n8n`即可启动。

![Image 13](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIxIpLXYhdcEhKiaibrXM9VicQ9KZCj5eDhibFm9C4Tj9Dopf6fEftYJvibfg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

浏览器输入`http://localhost:5678/setup`即可访问。

![Image 14](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIrBZ24y9CopcKnxXuxjOG0pYzUNr7kYU6QeDmOib8FTVSpwMuKITh8SA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

## 3、Qwen3-Embedding本地模型下载及配置

### ① 模型下载

**方式一：在HuggingFace里面下载**下载量化之后的GGUF格式的模型：https://huggingface.co/Qwen/Qwen3-Embedding-4B-GGUF/tree/main

如果使用这种方法下载的模型，需要使用ollama再创建嵌入模型，推荐使用方式二。

**Ollama创建嵌入模型**

1. 创建最简Modefile

    ```Plain Text
    echo FROM 上一步你下载的模型路径 > Modelfile
    # 示列
    echo FROM E:\Ollama\Qwen3-Embedding-4B-Q4_K_M.gguf > Modelfile
    ```

1. 创建模型

    ```Plain Text
    ollama create qwen3_embedding -f Modelfile
    ```

**方式二：使用Ollama命令直接下载模型**

```Plain Text
ollama run hf.co/Qwen/Qwen3-Embedding-4B-GGUF:Q4_K_M
```

### ② 测试嵌入模型

**方式一的测试方法：**命令行输入（注意windows需要双引号裹住json，所以需要转义）

```Plain Text
curl http://localhost:11434/api/embed -d "{\"model\":\"qwen3_embedding\",\"input\":\"Hello\"}"
```

`model`的名称要看`ollama list`输出的name，需要一致，方式一只做展示，推荐方式二。

**方式二的测试方法：**在命令行中输入：

```Plain Text
ollama run hf.co/Qwen/Qwen3-Embedding-4B-GGUF:Q4_K_M "这是一个测试文本"
```

效果就是会输出一堆向量化的内容。

![Image 15](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIaaib393aRyG576p1QpfRA27RXzCTZECxicAsARxbzURt3yuQLJic9lAaQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

方式二用curl命令测试：

```Plain Text
curl http://localhost:11434/api/embed -d "{\"model\": \"hf.co/Qwen/Qwen3-Embedding-4B-GGUF:Q4_K_M\",\"input\": \"Hello World\"}"
```

效果如下。

![Image 16](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xISobNOj84DQKqibQ1pBjTjhN0BcZsq6niadN4b2rcicicicfzuNwtN9tXqOg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

## 4、n8n创建RAG工作流

### 1、选择触发方式

这里暂时选择的是`Trigger manually`。

![Image 17](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIib2BAxTDpQx6ovHdCehzsgccPYZbicgu4Szv9v39uhLzTTxQcJp1U2TQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

### 2、添加步骤，搜索`file`

找到`Read/Write Files from Disk`，选择`Read`即可（因为是本地知识库，所以选的这个，还有其他方式）。

![Image 18](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIkKFQY6l7wzicicicaEn12Xst4fllMFz8qw0ibicwjxPWHrHYgUDX0qqKnLg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

![Image 19](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xI9dBXlAf8icb0GvrLb6qEuWtXnhrbd1toJAGIRMhuZKo7n3aj90BInGw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

![Image 20](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIDqlh7icibQGEQ7F04t8KJCCAib0VpE4LHm7zxzPYlHKibkiaAtWCZTicjXPg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

填入的`E:\\F_File\\RAG\\**`，表示读取RAG文件夹下的所有文件。

点击测试，提示成功则表示通过了。

![Image 21](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIO0oujoibloDbR3DYYTMkQ7aVPkic3ru48qNyibZaJb7hvCploiaicwNkDcQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

![Image 22](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIcKAK2CbdgnHEr3Uajia2WOOENBuW1eyFWPWvSLU159TcpmqqziaIZQgg/640?wx_fmt=png&from=appmsg#imgIndex=22)

也可以直接在这一个步骤里面运行，在右侧可以看到输出，这里可以看到直接输出了我在这个文件夹下面的两个文件，一个md格式，一个pdf格式。

![Image 23](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIiag7tvbmtyGblic0fdiaG2Rs132tjoWiaZCW27ia47gouzytsJ9WrKjNewg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

![Image 24](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xItLl9ds4SYLCNNGuVwtuHJJsromaFibcn4uYUrw60q1ySCnLdnicjREvw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

### 3、添加循环组件`Loop over Items`

对应的中文文档：https://docs.n8ncn.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/

循环组件loop，这个步骤是为了一直读取文件夹下的文件，循环读取。

![Image 25](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIw22ZqPzZLGYkoyYHiate73kRFkk9fiaqAoJuOn5gSFrTmxqlzplNFLuQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=25)

`Batch Size`表示输入每次调用要返回的项目数。

![Image 26](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIDGyhZe3PCE3DI74PDhPCebOnCYh9nqVzasPCCp09x2TgFKbgs7BScQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=26)

执行当前整个业务流。

![Image 27](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xI3kWgDSRdp9OgQM8qygI4RhmRx9ZicG5KXoo7ox59uTlomic9go0icmaicQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=27)

### 4、加入向量数据库

1. 在loop的节点中加入`Vector`，这里我们作为学习演示，选择`Simple Vector Store`即可。

    ![Image 28](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIofGS6cwILjPQr5WtZHyYVBULGQKlgt4Zfskh1MbyGstrepePXQMsDw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=28)

1. 选择第二个`Add documents from vector store`，将文档转换为向量。

    ![Image 29](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIHhQ2HGj8xfRZAju9E3p7fPIOU6DYjNq7HWlQMiaU6ORe95hN54qz90g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=29)

1. `Memory key`这里直接使用的是默认的，也可以自己进行修改添加，后续将会使用到。

    ![Image 30](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIlyIfnp13PJklttCbUmiaKLHRvNen9mx8OmZ5Z4Vehiab0OsusTLb5xxw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=30)

1. 发现有红色感叹号，是因为还需要配置两个组件，一个是Embedding模型配置，一个是Document。

    ![Image 31](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xI8yKp58BJuWSZtHKZ0QHcyA6EG53130wEOIqaghMdMVGfmLS1qmCiaRQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=31)

### 5、配置文件解析模型&语义分割

#### 1、Embedding模型配置

我们选择的是本地Ollama模型部署。

![Image 32](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIcwHP4icDSEIy9MossXQiaC5XFj2ibLn9VulgXVtHkqouPIibebPIoZ05vQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=32)

配置Ollama默认的是`localhost`，如果`localhost`提示连接不上，就修改成`127.0.0.1`。

![Image 33](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xId74jELcrPoUIL3lGWUxpibKibqc3bgEFvRKJETkr4nmcmKSuyD84peMQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=33)

选择对应的Embedding模型。

![Image 34](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIdomlTSI6ybgKESxnclTYn8icB5uLdrkWCZREPcbDcxeQ3JI1lehTTUA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=34)

#### 2、Document对文件进行分块

选择`Default Data Loader`。

![Image 35](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIoeic5H8x6Eibia9gakHBibzOCDsvle1xaQW9hw8A4Fn8JG560ISbL0vScA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=35)

- **Type of Data** 可以选择JSON或者Binary（二进制），这里我们选择二进制。

- **Mode**选择默认的`Load All Input Data`。

- **Data Format**选择自己的文件类型，或者选择自动解析。

- **Text Splitting**选择自定义`Custom`。

    ![Image 36](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIOXibAuS2iapDz5O4JVib4ibj1ic4icicqvhAkxPGPtrRbMicZwp3UV7ibr4wrYw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=36)

这个时候工作流如下图所示，需要对文本分割进行处理了。

![Image 37](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xI5y36fDXia4IvN75xH1yicQ9xyiaj1v0yVrn7A7RBkb0JiaeibEPfmDN8e8Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=37)

#### 3、选择语义分割

![Image 38](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIjpn5nBh929H7bMLlAugt0CwZV0r2EZobw3zLMxeCvXEFOJ8MhmhEibw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=38)

![Image 39](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIDUsn7S5PCicjkmhHrlduYZVxnpMd1FaucUbeDibDbVzAQRWTEIVSLfWA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=39)

#### 

## 6、创建检索知识库工作流

当前完整工作流如下图所示。

![Image 40](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xInVWruKcd9k3E2mOosCjicWmIhSUIexFfrKLzERbRqeUNsBaNw0iacjsg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=40)

### 1、当前工作流运行成功显示

![Image 41](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIr1B4clZJuQr775ejB0OB8zOkFiazrJ50yHTfibNrPQOhnMP9btMzfBFg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=41)

### 

### 2、创建一个新的工作流

选择`On chat message`。

![Image 42](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIicjElFTeNCIxhXPMfL0OS1ibS0SGbQF3BZVjtX2lvEbSsw3tc71766Ww/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=42)

### 3、创建一个AI Agent节点

AI Agent下方的`Chat Mode`接入一个对话大模型，这里我选择的是Deepseek，需要有API Key，使用硅基流动或者Deepseek官方API生成ApiKey填入即可。 第一次建立需要点击`Create new credential`。

接着在AI Agent下方的`Tool`接入`Answer questions with vector store`(使用向量存储回答问题)，在描述里面填入：当前工具是用来检索向量数据的。

![Image 43](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIscX6fAFBB9DrMyKicEMNOzyJq7N9BXWZCYI4fNIVUkl45rSYEewmt0g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=43)

到这一步创建完，工作流如图所示。

![Image 44](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIZamC80Uzl1WZPyuC0iclrpAEHuhrmcq3U0oVrRAuJIMlhuP6bl1cjMA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=44)

### 4、接入向量数据库、向量模型、对话模型

接上一步骤，在`Answer questions with vector store`(使用向量存储回答问题)下面的`Vector Store`接入向量数据库：`Simple Vector Store`。

注意：和创建向量数据库那个时候的`key`要匹配一致。

![Image 45](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIv5Qy3OWU1tB44G1qSU0fibDka1vsYluG5IF0ib2u9e1zFibiakuKpia5Atw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=45)

在`Model`节点中继续接入`Deepseek Chat model`。

![Image 46](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIfQeBNcWGaDM68RlJ97dEAia0qIb0oh8Ty9CTzl9oCQ8JQmAge5gk3kw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=46)

最后一步，在`Simple Vector Store`下面的`Embedding`模型中接入我们的本地向量模型，依旧和5-1步骤一样，最终工作流如下所示：

![Image 47](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIJgibiaZH7HZwUynbCB5CqzKia72ck2bbtI7d5u6aNCliae1OZo6KKVpQKw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=47)

## 7、测试知识库的准确性

点击`open chat`进行对话，输入问题：`找一下ios禁止系统更新的网址`。 发现可以很精准的回答问题，并且没有任何的添油加醋，完全就是我笔记里面的内容，只是进行了一个简单的排版。

![Image 48](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIMI8eSM8yoyHGwSeeBUk8HySF6Prib9cAgpzkNJTCZOicfjF4icGEMNIBg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=48)

而在`deepseek`的官方对话里面问的是找不到我笔记里面的这个网址的。

![Image 49](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIovxMBqg2kuaBMb3WQ2lFw1wflh9ib9funHUP865lFA8uCAu97iaWKCbw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=49)

使用另外一个问题，发现分段式的内容不能非常精准的找到，但进一步进行提示后，还是可以准确的回答。 这就是后续可以优化的点。

![Image 50](https://mmbiz.qpic.cn/mmbiz_png/jZO99VmF9Gt6put7hknFpVhibz116L5xIseduMvPqIqItKDtXt0iap45GpoaShSj2BTnlyODTk0PNO2xCKUxQMng/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=50)

# 

## 8、知识点补充 - Ollama 常用命令大全

1、下载/运行模型：ollama run <模型名字>

2、清除模型上下文：/clear

3、退出对话 / 关闭模型：/bye

4、查看模型运行速度&token数细节：

    ollama run <模型名字> --verbose

5、查看你有什么模型：ollama list

6、删除模型：ollama rm <模型名字>

7、查看模型的详细信息：ollama show <模型名字>

8、启动Ollama服务器：ollama serve

9、创建模型文件（用于自定义模型）：

    ollama create <自定义的模型名字> -f Modelfile

