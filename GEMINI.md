# GEMINI.md - Prose Collection System Context

## 🎨 Project Overview

This workspace is a **Structured Prose Collection & Curation System** designed for gathering high-quality Chinese prose (美文) for various age groups (Primary School to Adult). It functions as a **Human-in-the-Loop AI Workflow**, where you (the AI agent) act as the executor of defined "Skills" to collect, format, verify, and index literature.

The project is built on top of **Obsidian** for knowledge management and follows a strict **Standard Operating Procedure (SOP)**.

## 🏗️ System Architecture

### 1. The "Skills" (System Logic)
The core logic resides in the `.skills/` directory. Each subfolder represents a distinct capability (Skill) defined in a `SKILL.md` file. These are effectively the "source code" or "prompt instructions" you must follow.

*   `prose-snippet-collector`: Collects short, classic segments.
*   `prose-fulltext-hunter`: Finds and verifies full texts (strict anti-censorship rules).
*   `prose-article-formatter`: Formats articles into a strict teaching template.
*   `prose-index-manager`: Manages indices and sequence numbers.
*   `prose-link-weaver`: Handles bidirectional linking in Obsidian.
*   `prose-deduplicator`: Checks for duplicates and conflicts.
*   `prose-master-index-updater`: Updates the global master index.

### 2. The Database (Content)
Content is categorized by target audience:
*   `小学生美文/` (Primary School)
*   `初中生美文/` (Junior High)
*   `高中生美文/` (Senior High)
*   `大学生美文/` (University)
*   `成人美文/` (Adult)

### 3. Documentation & Guides
*   `美文收集标准操作程序(SOP).md`: **The Bible.** The absolute rulebook for the workflow.
*   `美文总索引.md`: The master registry of all collected content.
*   `.skills/README.md`: System architecture diagram and overview.

## 🚀 How to Work in This Project

**Your Role:** You are the **Execution Agent**. When asked to "collect prose" or "follow the workflow," you must strictly adhere to the **9-Step SOP**.

### The 9-Step Standard Operating Procedure (SOP)
*Refer to `美文收集标准操作程序(SOP).md` for the authoritative details.*

1.  **Step 0: Pre-Check (Mandatory)** - Read `美文总索引.md` to prevent duplicates.
2.  **Step 1: Snippet Collection** - Use `prose-snippet-collector`.
3.  **Step 2: Update Index** - Use `prose-index-manager`.
4.  **Step 3: Search Full Text** - Use `prose-fulltext-hunter` (Verify versions!).
5.  **Step 4: Format Article** - Use `prose-article-formatter` (Apply Template).
6.  **Step 5: Deduplication** - Use `prose-deduplicator`.
7.  **Step 6: Link Weaving** - Use `prose-link-weaver`.
8.  **Step 7: QA & Repair** - Quality Assurance check.
9.  **Step 8: Master Index Update (Iron Rule)** - Use `prose-master-index-updater`. **NEVER SKIP.**

### Critical Rules
*   **Version Control:** Always search for "textbook vs. original differences" (课文与原文区别). Reject sanitized versions.
*   **Formatting:** Strictly follow the `美文赏析与教学通用模版.md` (General Appreciation & Teaching Template).
*   **Emoji Usage:** Strictly adhere to emoji placement rules (Header, Start, Body).
*   **Sequence:** Steps must be performed in order. Step 8 is mandatory for completion.

## 🛠️ Key Commands / Actions

Since this is a content repository, "Running" the project means executing the skills conceptually:

*   **To Learn a Skill:** `read_file .skills/<skill-name>/SKILL.md`
*   **To Check Status:** `read_file 美文总索引.md`
*   **To Get Template:** `read_file <category>/美文赏析与教学通用模版.md`

## 📂 Directory Map
```
D:\workspace\
├── .skills/                  # Skill definitions (The Brain)
├── 美文总索引.md             # Master Index (The Database Registry)
├── 美文收集标准操作程序(SOP).md # The Rules (The Law)
├── <Category>美文/           # Content Folders
│   ├── <ID>.<Title>-<Author>.md  # Articles
│   ├── <Category>美文精选100篇.md # Snippet Collections
│   └── 美文赏析与教学通用模版.md   # Formatting Template
└── .obsidian/                # Obsidian Configuration
```
