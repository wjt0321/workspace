# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a multi-project workspace containing AI agent learning materials, n8n automation workflows, and intelligent language learning systems. The workspace is organized as separate project directories without a unified build system.

### Project Structure

```
D:\workspace\
├── 智能体学习\                    # Datawhale Hello-Agents tutorial (Chinese)
├── n8n-nodes\                    # n8n workflow automation for content collection
├── 智能体英语日语学习\              # Multi-language learning system
└── [other project directories]
```

## Project-Specific Guidance

### 1. 智能体学习 (Hello-Agents)

A comprehensive tutorial project from Datawhale community for building AI-native agents from scratch.

**Key Topics:**
- Agent paradigms (ReAct, Plan-and-Solve, Reflection)
- Low-code platforms (Coze, Dify, n8n)
- Agent frameworks (AutoGen, AgentScope, LangGraph)
- Custom agent framework development
- Memory, RAG, context engineering
- Multi-agent communication protocols (MCP, A2A, ANP)
- Agentic RL (SFT to GRPO training)
- Performance evaluation

**Documentation:** Tutorial content is in Chinese Markdown files organized by chapters and sections.

### 2. n8n-nodes

Contains n8n workflow automation configurations for collecting and organizing Chinese literature content (散文/essays).

**Key Files:**
- `README.md` - Node configuration guide and implementation status
- `实施记录-20251228-001.md` - Verified configuration records
- `美文收集完整工作流.json` - Complete workflow JSON for n8n import
- Various `.md` files with technical specifications

**Architecture:**
- Uses Cloudflare R2 (S3-compatible) for storage
- LLM-based content analysis and generation
- 4-level content classification system (初中/高中/大学/成人)
- Automated article collection, verification, and indexing

**Important Implementation Details:**
- Articles stored directly in level directory root (no `articles/` subdirectory)
- Binary data handling requires Code nodes for text transformation
- Node references use syntax: `$('节点名').item.json.property`
- All S3 operations configured for R2 endpoint

**Status:**
- Nodes 00-06: Verified and working
- Node 07: Binary data issue pending fix
- Nodes 08-36: Pending implementation

### 3. 智能体英语日语学习

Intelligent language learning system integration project.

**Components:**
- Obsidian (learning hub)
- n8n (automation engine)
- Telegram Bot (notifications)
- 智谱AI/Gemini (AI assistants)

## Common Development Patterns

### n8n Workflow Development

When working with n8n workflows:

1. **Testing Approach**: Test step-by-step (nodes 00-03, then 04-07, etc.)
2. **Data References**:
   - `{{ $json.property }}` - Current node JSON data
   - `{{ $binary.data }}` - Binary data access
   - `$('NodeName').item.json.property` - Cross-node data access
3. **Binary Data Handling**: Use Code nodes to convert between binary/base64/text
4. **Credentials**: Configure R2 credentials with custom endpoint for Cloudflare

### LLM Integration

Projects use various LLM providers:
- OpenAI-compatible APIs (GPT-4)
- 智谱AI (GLM models)
- Gemini

Always check model compatibility and API format when integrating across projects.

## File Conventions

- **Language**: Mixed Chinese and English documentation
- **Markdown**: Primary documentation format
- **JSON**: Workflow configurations (n8n)
- **Date Format**: YYYYMMDD for implementation logs

## Project Interdependencies

While projects are largely independent, they share common themes:
- Agent architecture patterns
- LLM prompt engineering
- Workflow automation concepts
- RAG and memory systems

## Important Notes

1. **No Unified Build**: Each project directory is independent
2. **Documentation-First**: Refer to README files in each project directory first
3. **Implementation Logs**: n8n-nodes uses dated implementation records for tracking changes
4. **Community Contribution**: 智能体学习 follows Datawhale's open contribution model

## Getting Started

For new development work:
1. Identify the target project directory
2. Read that directory's README.md first
3. Check for implementation logs or status files
4. Follow project-specific conventions (e.g., n8n node numbering)
