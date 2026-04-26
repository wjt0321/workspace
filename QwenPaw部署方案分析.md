---
tags: [QwenPaw, 部署, Windows, Docker, 指南]
created: 2026-04-26
---

# QwenPaw 部署方案分析

> 本文档对比 QwenPaw 在 **Docker** 与 **Windows 原生** 两种部署方式的优劣，并给出 Windows 平台的最佳实践方案。

---

## 一、Docker 部署 vs Windows 原生部署

### 📦 Docker 部署

#### 优点

| 维度 | 说明 |
|------|------|
| **环境隔离** | QwenPaw 依赖大量 Python 包（Playwright、ChromaDB、Agent 框架等），容器内自包含，不污染宿主机 |
| **跨平台一致性** | Windows 上开发，Linux 服务器部署，不会出现环境差异问题 |
| **资源限制** | 可用 `--cpus`、`--memory` 精确限制资源使用，多 Agent 集群时尤其有用 |
| **多实例部署** | QwenPaw 代码已内置 `dockerfile_generator.py` / `docker_image_builder.py`，官方本就支持容器化 |
| **CI/CD 友好** | 配合 K8s 或 Docker Swarm 可实现自动扩缩容、滚动更新 |

#### 缺点

| 维度 | 说明 |
|------|------|
| **🚨 浏览器自动化** | QwenPaw 重度依赖 Playwright，Docker 里跑浏览器需处理无头模式或 Xvfb，配置麻烦；headed 可视模式基本不可行 |
| **文件系统** | 必须通过 `-v` 挂载卷，Windows 路径 `D:\xxx` 映射到容器内 `/data/xxx`，权限和路径容易搞混 |
| **❌ 桌面集成丢失** | `desktop_screenshot` 无法截取宿主机桌面，无法控制本地应用、读剪贴板 |
| **网络配置复杂** | 访问内网服务需额外配置 Docker 网络模式，Windows Docker Desktop 网络性能略差 |
| **调试更慢** | 改配置要重建镜像或重启容器，日志排查多一层抽象 |
| **持久化需手动管理** | ChromaDB 向量库、对话记录等需挂载持久卷，否则容器删除数据就丢 |

### 🪟 Windows 原生部署

#### 优点

| 维度 | 说明 |
|------|------|
| **浏览器支持完整** | Playwright 无头/有头模式都完美运行 |
| **桌面集成** | 截图、控制窗口、与系统交互全部可用 |
| **文件系统直接访问** | 读写本地文件无任何障碍 |
| **配置简单** | 装好即用，没有网络映射、挂载卷等额外概念 |
| **启动快** | 没有容器层，命令行即开即用 |
| **调试直观** | 出错直接看日志，不用进容器 |

#### 缺点

| 维度 | 说明 |
|------|------|
| **环境不够隔离** | Python 包可能互相冲突（推荐用 venv 解决） |
| **不适合生产环境** | 服务器部署还是 Docker 更规范 |
| **跨平台迁移需重配** | 换 Linux 部署要重新整环境 |

### 选择建议

| 场景 | 推荐方式 |
|------|---------|
| 🏠 **个人开发/日常使用** | ✅ **Windows 原生** — 简单直接，浏览器、桌面、文件全通 |
| 🏭 **生产部署/服务器** | ✅ **Docker** — 隔离性好，便于运维 |
| 🔄 **多 Agent 集群** | ✅ **Docker + 编排** — 每个 Agent 独立容器 |
| 🖥️ **需要浏览器可视操作** | ❌ 别用 Docker，Windows 原生完胜 |
| 📸 **需要截桌面/控制本地应用** | ❌ 别用 Docker，必须原生 |

---

## 二、Windows 上 QwenPaw 的最佳部署方式

### 问题：安装版更新体验差

你当前使用的是**安装版**（`D:\Qwenclaw\QwenPaw\`），该版本通过 Inno Setup 打包，捆绑了完整的 Python 环境 + 所有依赖。每次更新都需要：

1. 重新下载几十~几百 MB 的安装包
2. 手动运行安装程序
3. 覆盖整个旧环境

这种方式确实痛苦 😅

### 推荐方案：pip + venv（虚拟环境）⭐

QwenPaw 本质上就是一个 Python 包，完全可以用标准 Python 工具链管理。

#### 安装步骤

```bash
# 1️⃣ 确保已安装 Python 3.10 或 3.11
#    （官网 python.org 下载，安装时勾选 "Add to PATH"）
python --version

# 2️⃣ 创建虚拟环境（推荐放在 D 盘，不占 C 盘空间）
python -m venv D:\qwenpaw-env

# 3️⃣ 激活虚拟环境
D:\qwenpaw-env\Scripts\activate

# 4️⃣ 安装 QwenPaw
pip install qwenpaw

# 5️⃣ 安装 Playwright 浏览器（QwenPaw 的浏览器自动化依赖）
playwright install chromium

# 6️⃣ 验证安装
qwenpaw --version
```

#### 日常使用

```bash
# 每次使用前激活环境
D:\qwenpaw-env\Scripts\activate

# 启动 QwenPaw
qwenpaw chat
```

> **进阶：** 可以创建 `D:\qwenpaw-env.ps1` 一键启动脚本，省去每次手动激活的步骤。

#### 如何更新

```bash
# 激活环境后，一行命令搞定
D:\qwenpaw-env\Scripts\activate
pip install -U qwenpaw
```

更新完就能直接用，整个过程**几十秒**，不用重新下载安装包。

### 三种方案对比

| 方案 | 安装大小 | 更新难度 | 隔离性 | 灵活度 | 推荐 |
|------|---------|---------|-------|-------|------|
| 🚫 **安装版**（你当前在用） | ~500MB+（捆绑 Python） | ❌ 差 — 重下整个包 | 好 | 低 | ❌ |
| ✅ **pip + venv**（推荐） | ~50MB（QwenPaw 本身） | ⭐ **极好** — 一行 `pip install -U` | 好 | 高 | **强烈推荐** |
| ⚠️ pip 全局安装 | ~50MB | 好 | ❌ 差（污染系统 Python） | 高 | 不推荐 |

### 迁移指南（从安装版切到 pip + venv）

你现有的配置数据都保存在 `C:\Users\wxb\.qwenpaw\` 目录下，**全量迁移**：

```bash
# 1. 备份当前所有配置和记忆
#    复制 C:\Users\wxb\.qwenpaw\ 到安全位置

# 2. 用 pip + venv 重新安装 QwenPaw（按上方步骤）

# 3. 将备份的 .qwenpaw 目录覆盖回去
#    路径不变：C:\Users\wxb\.qwenpaw\

# 4. 验证配置和 Agent 都能正常工作
qwenpaw agents list
qwenpaw chats list
```

> ⚠️ 注意：如果你之前的安装版里安装了额外的 skills，需要重新 `pip install` 对应的 skill 包。

---

## 三、从另一台电脑迁移 OpenClaw 配置

### 需要迁移的内容

| 内容 | 路径（旧电脑） | 说明 |
|------|--------------|------|
| **工作区文件** | `openclaw/data/workspace/` | Agent 配置、笔记、记忆文件 |
| **Agent 配置** | `openclaw/data/workspace/agent.json` | Agent 行为配置 |
| **全局配置** | `~/.qwenpaw/config.json` | LLM API、频道、技能等配置 |
| **记忆文件** | `workspace/MEMORY.md` + `workspace/memory/` | Agent 的长期/短期记忆 |
| **Skills** | `workspace/skills/` + 全局 skill 目录 | 安装的技能 |

### 迁移步骤

**旧电脑上：**
1. 打包 `openclaw/data/workspace/` 整个目录
2. 打包 `C:\Users\<用户名>\.qwenpaw\` 目录
3. 通过 U盘 / 局域网共享 / 网盘传到新电脑

**新电脑上：**
1. 备份你当前的配置（`C:\Users\wxb\.qwenpaw\`）
2. 用旧电脑的 `workspace` 覆盖新电脑的 `C:\Users\wxb\.qwenpaw\workspaces\default\`
3. 按需合并 `config.json`（特别注意 LLM API Key、网络代理等配置要改为新电脑的环境）

> ⚠️ **特别注意：** 两台电脑的 LLM API Key、网络环境可能不同，迁移后务必检查：
> - `config.json` 里的 LLM 提供商配置
> - `agent.json` 里的模型、技能路径
> - 代理/翻墙设置（如果需要）

---

## 四、总结

| 问题 | 结论 |
|------|------|
| Docker 还是原生？ | **日常用必选原生**，生产环境才考虑 Docker |
| 安装版还是 pip？ | **强烈建议切到 pip + venv**，更新体验好太多了 |
| 旧电脑迁移？ | 打包 `.qwenpaw` 和 `workspace` 目录覆盖即可 |

> 🐱🔥 **圣火喵喵教技术处 编制**
