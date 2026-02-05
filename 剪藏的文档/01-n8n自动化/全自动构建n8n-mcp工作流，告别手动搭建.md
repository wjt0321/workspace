---

title: 全自动构建n8n-mcp工作流，告别手动搭建
date: 2025-09-26
tags: ["n8n", "工作流", "自动化", "工作流自动化"]
category: 自动化工具
---


# 全自动构建n8n-mcp工作流，告别手动搭建

easypay007 [小智AI指南](javascript:void(0);)*2025年09月26日 13:15* *北京*

 

> 大家好，我是小智，专注 AI 工具，AI 智能体和编程提效

今天给大家分享一个可以全自动构建n8n工作流的方案。

![Image+1:+n8n工作流](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYT7H3vbpy9ia1pnbzmDHROZ6vPnvWLDUnpK15Pkx3iayKdnZSFKZpXyXKg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

方案来源于github上7.3K Star的一个开源项目：n8n-mcp
`https://github.com/czlonkowski/n8n-mcp`

![Image+2:+n8n-mc](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTATQqmC9z7mSffv42pFib2ODoxkDUBrEdIxicMic4Bqlgj0SBSW31Kj6jw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

### n8n-mcp功能介绍

n8n-mcp是专为AI代理（例如Claude Code, Trae, codebuddy, Vecli, codeX等）设计的n8n外挂知识库。它赋予AI深度理解和使用n8n的能力。通过实时、准确、全面的n8n官方文档和工具信息库，AI代理能够：

- • 精确查找n8n的节点。

- • 准确理解每个节点的具体参数和配置。

- • 验证工作流配置是否正确，避免部署出错。

- • 复用数千个社区工作流模板。

- • 直接操作n8n，自动创建、更新和执行工作流。

如果想要更深入地理解这个开源项目，可以通过Github项目解读神器Zread来查看项目的详细代码和文档:
Zread

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTrvkXbIfictUP8ibLGZlllx6IS5pdialnZUzWx8wiau1EkRwicyaaItYOoTw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

## n8n-mcp的安装与使用

下面咱们来看看如何安装和使用这个开源项目：

### 配置步骤

以三个CLI工具为例，分别是OpenAI的CodeX，腾讯的codebuddy和火山刚出的Vecli。

对于不熟悉这些AI CLI工具的朋友，可以参考下面的官方文档：

- • codeX官方文档

- • codebuddy官方文档

- • Vecli官方文档

### 配置文件路径

codebuddy的mcp配置文件路径：

- • macOS/Linux: `~/.codebuddy.json`

- • Windows: `%USERPROFILE%\.codebuddy.json`

CodeX的配置路径：

- • macOS/Linux: `~/.codex/config.toml`

- • Windows: `%USERPROFILE%\.codex/config.toml`

Vecli的配置文件位置：

- • macOS/Linux: `~/.ve/settings.json`

- • Windows: `%USERPROFILE%\.ve\settings.json`

n8n-mcp的配置示例：

```Plain Text
{
    "mcpServers": {
        "n8n-mcp": {
            "command": "npx",
            "args": ["n8n-mcp"],
            "env": {
                "MCP_MODE": "stdio",
                "LOG_LEVEL": "error",
                "DISABLE_CONSOLE_OUTPUT": "true",
                "N8N_API_URL": "https://your-n8n-instance.com",
                "N8N_API_KEY": "your-api-key"
            }
        }
    }
}
```

### 配置步骤详解

第一步：找到mcp的配置文件位置（以codebuddy为例）：

- • macOS/Linux: `~/.codebuddy.json`

- • Windows: `%USERPROFILE%\.codebuddy.json`

![Image+12:+配置文件路径](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTFhlwzVdE5xUB67YKoq1weGib8hzgXYKpiahPicbfQ5LsyK0Gp92NxlZ1Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

第二步：编辑`.codebuddy.json`，添加n8n-mcp的配置。配置示例中有两个重要的配置：`N8N_API_URL`和`N8N_API_KEY`。

在获取这两个配置之前，建议先升级n8n，因为n8n更新频率较高。当前最新版是1.111.1，建议修改`docker-compose.yml`文件。

然后在该文件的当前目录执行`docker-compose up -d`即可更新。

![Image 1](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTtaND2iaicuiaia2Qoqzlx0FbEKrcvvz5a7t2hhF4KmVMT9UZcYJ3arfwCQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

更新成功后，访问`http://localhost:32905`。`N8N_API_URL`即为`http://localhost:32905`，如果未修改端口，默认是`5678`。

![Image 2](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTNibZctYibCZflPvZBsHl39tpUgTCGFSoGKtg8WEqxsGmFZugMSniaH4gg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

n8n的API key可以在左下角->settings->n8n API中创建。

![Image 3](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTUjF1BfQ9tWcyVFkJ58LicxWVPttX6icxkNvLO4LzDVelbW6c9oXgzuwg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

### 配置示例与启动

最终`.codebuddy.json`中的n8n-mcp配置如下：

![Image 4](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTuk4Et0pqIBIYmNdtA93jLzP5eJuSicqWYcMJo74AcGNwx8UpxgscgAw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

保存后，重新启动codebuddy或vecli。对于codex，配置格式为toml而非json，由gemini帮助转换如下：

![Image+20:+toml格](https://mmbiz.qpic.cn/sz_mmbiz_jpg/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTVUJiczxby2D5w2ia6v4Xwxkp72EfBoBzPfhWhLgxJUlHQScmyG65GwCA/640?wx_fmt=jpeg&watermark=1#imgIndex=8)

codex的n8n-mcp配置示例：

```Plain Text
[mcp_servers.n8n-mcp]
command = "npx"
args = ["n8n-mcp"]
env = { MCP_MODE = "stdio", LOG_LEVEL = "error", DISABLE_CONSOLE_OUTPUT = "true", N8N_API_URL = "https://your-n8n-instance.com", N8N_API_KEY = "your-api-key" }
```

终端执行codex启动，选择允许Codex在此文件夹中工作，无需每次请求批准。

![Image 5](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYThlTGcaTugWoYLdYPib7Mfqj1MocGeQupiakib2VLHqv5MkouGFAQnXm2g/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

使用OpenAI专为Codex设计的GPT-5-Codex模型。

![Image+22:+GPT-5](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTsBN8zpeRzick2JCXEquwSGFJoTadq0Qmf5sBicDv6T6ZWJMvI8AgItRw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

### 常见问题和解决方案

遇到一个问题：Codex无法安装mcp。使用多个AI CLI首次遇到基础功能存在bug的情况。

![Image+23:+安装问题](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTEF8FUdPlQBY4sotib6OtuggHmJWTMClNHibCEUReloBNMX9N3qn5PKzg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

经过多次尝试和查阅资料后，最终选择使用n8n-mcp的docker方式。

首先执行：

```Plain Text
docker pull ghcr.io/czlonkowski/n8n-mcp:latest
```

docker方式的mcp配置示例：

```Plain Text
{
    "mcpServers": {
        "n8n-mcp": {
            "command": "docker",
            "args": ["run", "-i", "--rm", "--init", "-e", "MCP_MODE=stdio", "-e", "LOG_LEVEL=error", "-e", "DISABLE_CONSOLE_OUTPUT=true", "-e", "N8N_API_URL=http://host.docker.internal:5678", "-e", "N8N_API_KEY=your-api-key", "ghcr.io/czlonkowski/n8n-mcp:latest"]
        }
    }
}
```

codex的配置示例：

```Plain Text
[mcp_servers.n8n - mcp] command = "docker"args = ["run", "-i", "--rm", "--init", "-e", "MCP_MODE=stdio", "-e", "LOG_LEVEL=error", "-e", "DISABLE_CONSOLE_OUTPUT=true", "-e", "N8N_API_URL=http://host.docker.internal:5678", "-e", "N8N_API_KEY=n8n的apikey", "ghcr.io/czlonkowski/n8n-mcp:latest", ]
```

注意：如果你的n8n在本地docker中启动，N8N_API_URL为`http://host.docker.internal:5678`。

最终vecli和Codex的配置如下：左边是json格式，右边是toml格式。

![Image 6](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTRHWz6SSrajfia8QFl1Za8C262bRfKa6sMRJuy1jqT5fsPe3G7ClRicCg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

![Image 7](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTadyFx0tENpiaktU2ZialiaGUlvk0Ao2u7SP7fSicmPoygwIeQ8A68ViaENg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

## 测试与工作流生成

接下来开始测试，首先需要重启这些cli工具。注意到codex有些不稳定，总是生成n8n的json文件。使用codebuddy代码、搭配kimi-k2的vecli及搭配glm-4.5的Claude Code生成了多个n8n工作流。

生成的工作流如下（完全自动创建）：

![Image+26:+工作流案例](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYT3SsImOIMSJyDCBl5WTHufP7VFRticbicIflgibtRzFU54Xdq3SbYiaLYMg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

### 案例一：简单工作流

```Plain Text
帮我创建一个带Agent的n8n工作流,使用OpenAI的大模型,对外提供HTTP调用
```

完成效果良好（需配置OpenAI的apikey）。

![Image+27:+简单案例效果](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTxK7KyhG9GuhOtgBHA4t5Cvs9fysMu8DjT54iaI4QRP1JBMRRXH8aVjw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

### 案例二：中等难度工作流

提示词由gemini生成：

需求：创建一个n8n工作流处理用户注册，包含Webhook、IF和Google Sheets节点。

![Image+29:+中等案例结果](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYTXjwLPgWPib5TNBAicyFofBmquLul4vnItRh30zBApElgAO6o0G9U6ODw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

### 案例三：复杂工作流

提示词由gemini生成：

需求：创建个人每日新闻助手工作流，自动信息抓取、AI总结和汇总发送。

![Image+31:+复杂案例效果](https://mmbiz.qpic.cn/sz_mmbiz_png/AHzK08U0OodB2N6GNVicNvekw7LwI4LYT7H3vbpy9ia1pnbzmDHROZ6vPnvWLDUnpK15Pkx3iayKdnZSFKZpXyXKg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

## n8n-mcp的改进与未来

虽然目前使用n8n-mcp不能一次性生成直接可用的n8n工作流，但相比几个月前的测试效果已有显著提升。之前生成的中等难度工作流最多完成50%，而现在生成的中等难度的工作流80%是可用的。

### n8n-mcp的技术提升

1. 1. 模型各方面能力提升。

2. 2. 上下文工程做得更好（n8n-mcp）。

n8n-mcp对于小白来说能生成简单的工作流用于学习，对于有编程基础或n8n使用经验的用户来说能极大的提高效率。

### n8n-MCP的信息来源

n8n-MCP的信息来源是在项目构建时，通过解析n8n的源代码包和官方文档库生成的，最终打包成一个预构建的数据库。更新流程如下：

- • n8n官方发布新版本。

- • n8n-MCP维护者更新项目中的n8n源代码包依赖到最新版并重新运行构建脚本。

- • 维护者发布新版本的n8n-MCP，包含全新的数据库。

- • 用户运行npx或docker命令以获取最新版。

## 总结

n8n-MCP提供的信息是静态的，反映的是其所基于的n8n版本状态。配置n8n API的作用是让AI管理你的n8n工作流。随着上下文工程和AI模型的进步，未来n8n工作流可能完全由AI自动生成。只要Agent执行速度和稳定性得到提升，工作流将不会被淘汰。

> 如果本文对您有帮助，也请帮忙点个 赞👍 + 在看 哈！❤️关注`小智AI指南`公众号，后台回复**内容提取提示词**获取本文所有测试数据集验证后的提示词

 

