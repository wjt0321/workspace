# MCP 配置文件备份说明

这份文档用于说明如何恢复和使用备份的 MCP 配置文件。

## 目录结构

*   `Trae/`: Trae 编辑器的 MCP 配置文件
*   `claude/`: Claude Desktop 的 MCP 配置文件
*   `opencode/`: Opencode 编辑器的 MCP 配置文件

## 恢复与使用方法

### 1. Trae

*   **配置文件位置**: `%APPDATA%\Trae\User\mcp.json`
*   **恢复方法**:
    1.  打开 Trae 编辑器。
    2.  进入设置，找到 "Edit MCP Servers" 选项（或直接打开上述路径的文件）。
    3.  将 `Trae/mcp.json` 中的内容复制到 `%APPDATA%\Trae\User\mcp.json` 中。
    4.  保存文件并重启 Trae。

### 2. Claude Desktop

*   **配置文件位置**: `%APPDATA%\Claude\claude_desktop_config.json`
*   **恢复方法**:
    1.  打开文件资源管理器，输入 `%APPDATA%\Claude` 并回车。
    2.  如果目录中没有 `claude_desktop_config.json` 文件，请手动创建。
    3.  将 `claude/claude_desktop_config.json` (如果存在备份) 的内容复制进去。
    4.  **注意**: 如果备份目录中没有找到配置文件，可能是因为您尚未配置 Claude Desktop 的 MCP 服务。

### 3. Opencode

*   **配置文件位置**: `C:\Users\wxb\.config\opencode\opencode.json`
*   **恢复方法**:
    1.  找到 Opencode 的配置目录 `C:\Users\wxb\.config\opencode`。
    2.  将 `opencode/opencode.json` 的内容复制到该目录下的 `opencode.json` 文件中。
    3.  **注意**: Opencode 的配置目录可能还包含其他文件（如 `.env` 设置脚本等），此备份仅包含核心配置文件 `opencode.json`。

## 常用 MCP 服务器配置示例 (Trae/Claude)

```json
{
  "mcpServers": {
    "MiniMax": {
      "command": "uvx",
      "args": [
        "minimax-coding-plan-mcp",
        "-y"
      ],
      "env": {
        "MINIMAX_API_KEY": "your_key_here",
        "MINIMAX_API_HOST": "https://api.minimaxi.com"
      }
    }
  }
}
```

## 注意事项

*   **API Key 安全**: 配置文件中可能包含敏感的 API Key，请妥善保管此备份文件夹，不要随意分享。
*   **环境依赖**: 部分 MCP 服务器（如基于 Python 的）可能需要预先安装 `uv` 或其他依赖工具。
