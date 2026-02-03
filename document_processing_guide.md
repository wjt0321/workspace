# 文档处理指南

## 概述

本指南提供了处理各种文档格式（包括DOCX、PDF等）的方法，基于Claude Code的文档处理技能理念。

## 文档处理决策树

根据任务类型选择适当的处理方法：

```
用户任务 → 需要读取/分析内容?
    ├─ 是 → 文本提取或原始XML访问
    ├─ 创建新文档 → 使用创建新Word文档工作流
    └─ 编辑现有文档 → 
        ├─ 自己的文档 + 简单更改 → 使用基本OOXML编辑工作流
        ├─ 他人文档 → 使用修订工作流（推荐默认）
        └─ 法律/学术/商业/政府文档 → 使用修订工作流（必需）
```

## 文本提取

### 使用Pandoc进行文档转换

Pandoc提供了出色的格式支持，可以保留文档结构并显示修订：

```bash
# 将文档转换为markdown并显示修订
pandoc --track-changes=all input.docx -o output.md

# 选项：
# --track-changes=accept/reject/all
```

### Python文档处理库

#### 1. DOCX处理

```python
from docx import Document
from docx.document import Document as DocumentObject
from docx.text.paragraph import Paragraph
from docx.table import Table
import zipfile
import xml.etree.ElementTree as ET

def read_docx_content(file_path):
    """读取DOCX文档内容"""
    doc = Document(file_path)
    
    content = {
        'paragraphs': [],
        'tables': [],
        'styles': []
    }
    
    # 读取段落
    for paragraph in doc.paragraphs:
        content['paragraphs'].append({
            'text': paragraph.text,
            'style': paragraph.style.name if paragraph.style else None
        })
    
    # 读取表格
    for table in doc.tables:
        table_data = []
        for row in table.rows:
            row_data = [cell.text for cell in row.cells]
            table_data.append(row_data)
        content['tables'].append(table_data)
    
    return content

def modify_docx_content(input_path, output_path, modifications):
    """修改DOCX文档内容"""
    doc = Document(input_path)
    
    # 应用修改
    for i, paragraph in enumerate(doc.paragraphs):
        if i in modifications:
            paragraph.text = modifications[i]
    
    doc.save(output_path)

def extract_comments(file_path):
    """提取文档评论"""
    # DOCX文件是ZIP存档，需要解压
    with zipfile.ZipFile(file_path, 'r') as zip_file:
        if 'word/comments.xml' in zip_file.namelist():
            comments_xml = zip_file.read('word/comments.xml')
            root = ET.fromstring(comments_xml)
            
            comments = []
            for comment in root.findall('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}comment'):
                comment_text = comment.find('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p')
                if comment_text is not None:
                    text_elements = comment_text.findall('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t')
                    text = ''.join([elem.text for elem in text_elements if elem.text])
                    comments.append(text)
            
            return comments
    return []
```

#### 2. PDF处理

```python
import PyPDF2
import pdfplumber
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import io

def read_pdf_content(file_path):
    """读取PDF文档内容"""
    content = {
        'pages': [],
        'metadata': {},
        'links': []
    }
    
    # 使用PyPDF2读取基本信息
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        content['metadata'] = reader.metadata
        
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            content['pages'].append({
                'page_number': i + 1,
                'text': text
            })
    
    # 使用pdfplumber获取更精确的文本布局
    with pdfplumber.open(file_path) as pdf:
        for i, page in enumerate(pdf.pages):
            # 提取链接
            if page.annots:
                for annot in page.annots:
                    if annot.get('subtype') == 'Link':
                        content['links'].append({
                            'page': i + 1,
                            'uri': annot.get('uri'),
                            'rect': annot.get('rect')
                        })
    
    return content

def extract_pdf_text(file_path):
    """提取PDF纯文本内容"""
    text_content = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text_content += page.extract_text() + "\n"
    return text_content

def create_pdf_from_text(text_content, output_path):
    """从文本创建PDF"""
    packet = io.BytesIO()
    can = canvas.Canvas(packet, pagesize=letter)
    width, height = letter
    
    # 分割文本为行并逐行添加
    lines = text_content.split('\n')
    y_position = height - 50  # 从页面顶部留出边距
    
    for line in lines:
        if y_position <= 50:  # 如果到达页面底部，创建新页
            can.showPage()
            y_position = height - 50
        
        can.drawString(50, y_position, line[:90])  # 限制每行字符数
        y_position -= 15  # 行间距
    
    can.save()
    
    # 移动到开始位置
    packet.seek(0)
    
    # 将内容写入输出文件
    with open(output_path, 'wb') as output_file:
        output_file.write(packet.getvalue())
```

## 原始XML访问

对于需要访问复杂格式、注释、嵌入媒体和元数据的情况，需要解包文档并读取其原始XML内容。

### 解包OOXML文档

```python
import zipfile
import os
from pathlib import Path

def unpack_document(file_path, output_dir):
    """解包OOXML文档（如DOCX、XLSX、PPTX）"""
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    with zipfile.ZipFile(file_path, 'r') as zip_file:
        zip_file.extractall(output_dir)
    
    print(f"Document unpacked to: {output_dir}")
    print("Key files:")
    print("- word/document.xml - 主文档内容")
    print("- word/comments.xml - 评论")
    print("- word/styles.xml - 样式")
    print("- docProps/ - 属性")

def pack_document(source_dir, output_file):
    """将解包的文档重新打包"""
    with zipfile.ZipFile(output_file, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arc_path = os.path.relpath(file_path, source_dir)
                zip_file.write(file_path, arc_path)
```

## 文档转换工具

### 多格式文档转换器

```python
import os
from pathlib import Path

class DocumentConverter:
    def __init__(self):
        self.supported_formats = {
            'docx': ['.doc', '.rtf', '.odt', '.html'],
            'pdf': ['.doc', '.docx', '.rtf', '.odt', '.html', '.txt'],
            'html': ['.doc', '.docx', '.pdf', '.txt'],
            'txt': ['.doc', '.docx', '.pdf', '.html']
        }
    
    def convert(self, input_path, output_format):
        """转换文档格式"""
        input_path = Path(input_path)
        base_name = input_path.stem
        output_path = input_path.parent / f"{base_name}.{output_format}"
        
        input_ext = input_path.suffix.lower()
        
        if output_format not in self.supported_formats or input_ext not in self.supported_formats[output_format]:
            raise ValueError(f"Cannot convert from {input_ext} to {output_format}")
        
        # 使用pandoc进行转换（如果安装了pandoc）
        try:
            import subprocess
            result = subprocess.run([
                'pandoc', 
                str(input_path), 
                '-o', 
                str(output_path)
            ], capture_output=True, text=True)
            
            if result.returncode != 0:
                raise Exception(f"Pandoc conversion failed: {result.stderr}")
                
            return str(output_path)
        except FileNotFoundError:
            # 如果pandoc未安装，则使用Python库
            return self._convert_with_python_libs(str(input_path), str(output_path))
    
    def _convert_with_python_libs(self, input_path, output_path):
        """使用Python库进行转换"""
        input_ext = Path(input_path).suffix.lower()
        output_ext = Path(output_path).suffix.lower()
        
        if input_ext == '.pdf' and output_ext == '.txt':
            return self._pdf_to_txt(input_path, output_path)
        elif input_ext == '.docx' and output_ext == '.txt':
            return self._docx_to_txt(input_path, output_path)
        else:
            raise NotImplementedError(f"Conversion from {input_ext} to {output_ext} not implemented")
    
    def _pdf_to_txt(self, input_path, output_path):
        """PDF转TXT"""
        text = extract_pdf_text(input_path)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        return output_path
    
    def _docx_to_txt(self, input_path, output_path):
        """DOCX转TXT"""
        content = read_docx_content(input_path)
        text = '\n'.join([p['text'] for p in content['paragraphs']])
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        return output_path

# 使用示例
converter = DocumentConverter()
# converted_file = converter.convert('input.docx', 'pdf')
```

## 文档比较工具

```python
def compare_documents(doc1_path, doc2_path):
    """比较两个文档的差异"""
    ext1 = Path(doc1_path).suffix.lower()
    ext2 = Path(doc2_path).suffix.lower()
    
    # 读取文档内容
    if ext1 == '.docx':
        content1 = read_docx_content(doc1_path)
    elif ext1 == '.pdf':
        content1 = {'text': extract_pdf_text(doc1_path)}
    
    if ext2 == '.docx':
        content2 = read_docx_content(doc2_path)
    elif ext2 == '.pdf':
        content2 = {'text': extract_pdf_text(doc2_path)}
    
    # 比较文本内容
    text1 = '\n'.join([p['text'] for p in content1.get('paragraphs', [])]) if 'paragraphs' in content1 else content1['text']
    text2 = '\n'.join([p['text'] for p in content2.get('paragraphs', [])]) if 'paragraphs' in content2 else content2['text']
    
    # 简单比较
    lines1 = text1.splitlines()
    lines2 = text2.splitlines()
    
    differences = {
        'added_lines': [],
        'removed_lines': [],
        'common_lines': []
    }
    
    for line in lines1:
        if line not in lines2:
            differences['removed_lines'].append(line)
        else:
            differences['common_lines'].append(line)
    
    for line in lines2:
        if line not in lines1:
            differences['added_lines'].append(line)
    
    return differences
```

## 最佳实践

### 1. 性能优化

- 对于大型文档，考虑分块处理
- 使用流式处理方法处理大文件
- 在处理前验证文档格式和完整性

### 2. 错误处理

- 检查文件是否存在且可访问
- 验证文档格式是否受支持
- 处理损坏的文档

### 3. 安全性

- 验证上传的文档类型
- 对文档内容进行适当的清理
- 限制处理的文档大小

### 4. 用户体验

- 提供进度指示器用于长时间操作
- 提供清晰的错误消息
- 保留原始文档的格式和样式

## 实用脚本

### 文档批量处理

```bash
#!/bin/bash
# 批量转换目录中的所有DOCX文件为PDF

for file in *.docx; do
    if [ -f "$file" ]; then
        base_name="${file%.docx}"
        echo "Converting $file to ${base_name}.pdf"
        pandoc "$file" -o "${base_name}.pdf"
    fi
done
```

### 文档内容提取

```python
def extract_key_info_from_document(file_path):
    """从文档中提取关键信息"""
    ext = Path(file_path).suffix.lower()
    
    if ext == '.docx':
        content = read_docx_content(file_path)
        paragraphs = [p['text'] for p in content['paragraphs']]
    elif ext == '.pdf':
        paragraphs = extract_pdf_text(file_path).split('\n')
    else:
        raise ValueError(f"Unsupported file format: {ext}")
    
    # 提取关键信息
    info = {
        'title': '',
        'author': '',
        'keywords': [],
        'summary': ''
    }
    
    # 尝试从文档内容中提取信息
    if paragraphs:
        info['title'] = paragraphs[0] if paragraphs[0].strip() else (paragraphs[1] if len(paragraphs) > 1 else '')
        
        # 搜索关键词
        keywords_indicators = ['关键字', '关键词', 'keywords', 'key words', 'tag', 'tags']
        for para in paragraphs[:10]:  # 检查前10个段落
            for indicator in keywords_indicators:
                if indicator.lower() in para.lower():
                    # 提取关键词
                    import re
                    # 简单的关键词提取
                    words = re.findall(r'[\w\u4e00-\u9fff]+', para)
                    info['keywords'] = [w for w in words if w.lower() not in [indicator.lower() for indicator in keywords_indicators]]
                    break
    
    return info
```

这个文档处理指南提供了全面的文档处理方法，涵盖了从基本读取到高级转换和比较的各种操作。