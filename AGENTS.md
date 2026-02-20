# AGENTS.md - AI Agent Instructions

This file provides guidance for AI coding assistants operating in this repository.

## Repository Overview

This is a **personal knowledge management and AI automation workspace** containing:
- **美文收集系统** (Essay Collection System) - n8n workflows (`n8n实战之美文收集/`) and essay library (`美文库/`)
- **OpenSpec 规范管理** (OpenSpec specs) - Spec-driven development process (`openspec/`)
- **n8n 自动化参考** (n8n automation) - Workflow case studies (`n8n实战之美文收集/`)
- **Learning Resources** - AI agent tutorials, Python resources, language learning
- **Visual Design** - Obsidian Canvas visualizations (`canvas/`)

This is **not a software project** with build/test commands. It's a documentation and knowledge management repository.

## Build & Test Commands

**None available** - This is a documentation-only repository with no build system.

If Python development is needed:
```bash
.venv\Scripts\activate  # Activate virtual environment
```

## Code Style Guidelines

Since this is primarily a Markdown-based workspace, follow these conventions:

### Writing Style
- Use Chinese punctuation（，。：；？！）instead of English punctuation
- Use Markdown link format for file references: `[Link Text](path/to/file.md)`
- Add Chinese comments and documentation when creating any code

### File Organization
- Prefer editing existing files over creating new ones
- Keep modules reusable - avoid one-off scripts
- Target file size of 200-300 lines; split larger files

### OpenSpec Workflow

When working with specs, follow the OpenSpec process:

1. **Creating Changes** - Use `openspec/` commands:
   ```bash
   openspec list                  # List active changes
   openspec show [item]           # Display change or spec
   openspec validate [item]       # Validate changes or specs
   openspec archive <change-id>   # Archive after deployment
   ```

2. **When to create proposals**:
   - Adding new features or capabilities
   - Breaking changes (API, schema)
   - Architecture or pattern changes
   - Performance optimizations
   - Security pattern changes

3. **Skip proposals for**:
   - Bug fixes restoring intended behavior
   - Typos, formatting, comments
   - Non-breaking dependency updates
   - Configuration changes
   - Tests for existing behavior

### OpenSpec Triggers

Create proposals when user mentions:
- "proposal", "change", "spec" combined with "create", "plan", "make", "start", "help"

### OpenSpec Structure
```
openspec/
├── project.md              # Project conventions
├── specs/                  # Current truth - what's built
│   └── [capability]/
│       ├── spec.md         # Requirements and scenarios
│       └── design.md       # Technical patterns
└── changes/                # Proposals - what SHOULD change
    ├── [change-name]/
    │   ├── proposal.md     # Why, what, impact
    │   ├── tasks.md        # Implementation checklist
    │   └── specs/          # Delta changes
    └── archive/            # Completed changes
```

### Spec Writing Format

**Correct Scenario Format** (required):
```markdown
#### Scenario: User login success
- **WHEN** valid credentials provided
- **THEN** return JWT token
```

**Requirements Wording**:
- Use SHALL/MUST for normative requirements
- Avoid should/may unless intentionally non-normative

### Change ID Naming
- Use kebab-case, verb-led: `add-`, `update-`, `remove-`, `refactor-`
- Example: `add-two-factor-auth`, `update-user-profile`

## Important Rules

### GitHub Upload Safety (Critical)
- **Upload local changes为主** - Prioritize local uploads, never let remote overwrite local
- **Must pause and warn** if risk detected
- Only proceed after user confirmation ("再三确认")

### Environment Safety
- **Never modify `.env` files**
- Do not expose or log secrets/keys

### Verification
- Always verify results after making changes
- Check for `nul` files and delete immediately
- Avoid using `> nul` in generated commands

## Cursor/Copilot Rules

No Cursor rules (`.cursor/rules/` or `.cursorrules`) or Copilot rules (`.github/copilot-instructions.md`) found.

## Key Files Reference

| Path | Purpose |
| :--- | :--- |
| `openspec/AGENTS.md` | OpenSpec workflow detailed instructions |
| `openspec/project.md` | Project conventions |
| `.skills/` | Essay collection system skills |
| `CLAUDE.md` | Main Claude Code instructions |

## Tool Selection

| Task | Tool |
| :--- | :--- |
| Find files by pattern | Glob |
| Search code content | Grep |
| Read specific files | Read |
| Explore unknown scope | Task (subagent) |

## Quick Reference

- This is a documentation/knowledge repository, not a software project
- Follow OpenSpec workflow for spec-driven work
- Use Chinese punctuation and language in content
- Prioritize local changes on GitHub uploads
- Verify all changes before completion
