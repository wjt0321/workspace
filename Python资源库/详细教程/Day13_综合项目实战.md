---
title: Day 13：综合项目实战
tags: [python, 项目实战, 管理系统]
aliases: ["Day13"]
date: 2026-02-22
---

# Day 13：综合项目实战

> 相关链接：[[Day12_面向对象基础（下）]] | [[Day14_Week2周度复盘与测验]] | [[Python学习大纲]]

欢迎来到Python学习的第十三天！经过Week 2的系统学习，你已经掌握了文件操作、异常处理、模块化设计和面向对象编程四大核心技能。今天，我们将通过一个完整的实战项目——"个人日记管理系统"，将这些知识融会贯通。

项目开发是检验编程能力的试金石。通过亲手构建一个真实可用的系统，你将：
1. **体验完整开发流程**：从需求分析、设计、编码到测试
2. **实践模块化思维**：学会如何合理划分代码结构
3. **强化错误处理能力**：编写健壮的程序应对各种异常
4. **提升代码可维护性**：学习编写清晰、易读、易扩展的代码

今天的学习大约需要90-120分钟，包括代码实现和项目思考。准备好迎接挑战了吗？让我们开始吧！

## 第一部分：项目需求分析

### 项目背景与目标
在数字化时代，写日记是记录生活、整理思绪的好习惯。我们打算开发一个简单的个人日记管理系统，让你能够：
- 安全地保存个人日记
- 方便地查找和回顾过往记录
- 保护隐私，数据掌握在自己手中

### 核心功能需求
1. **创建新日记**：输入标题、内容，系统自动记录创建时间，支持添加标签
2. **查看历史日记列表**：按日期倒序显示所有日记，支持分页查看
3. **搜索日记**：按关键词搜索标题、内容或标签
4. **按日期查看**：查看特定日期的所有日记
5. **删除日记**：安全删除不再需要的记录
6. **导出所有日记**：将日记导出为文本文件备份
7. **数据统计**：查看日记数量、时间分布、标签热度等统计信息

### 技术要求（整合Week 2知识点）
1. **面向对象编程**：使用类组织数据模型和业务逻辑
2. **文件操作**：使用JSON格式持久化存储日记数据
3. **异常处理**：自定义异常类，确保程序健壮性
4. **模块化设计**：分离数据模型、存储、业务逻辑和用户界面

### 项目结构设计
```
个人日记管理系统/
├── src/diary_system/          # 项目源代码
│   ├── __init__.py           # 包初始化文件
│   ├── diary.py             # 日记数据模型类
│   ├── exceptions.py        # 自定义异常类
│   ├── storage.py           # 文件存储操作
│   ├── manager.py           # 业务逻辑管理
│   └── main.py              # 命令行界面
├── diaries.json             # 数据文件（自动生成）
├── diaries_export.txt       # 导出文件（可选）
└── run_diary.py             # 启动脚本（可选）
```

### 开发环境准备
确保你的Python环境已就绪：
```bash
python --version  # 确认Python 3.8+
pip list          # 查看已安装的包
```

## 第二部分：实现步骤详解

### 步骤1：设计数据模型——Diary类
日记的核心数据包括日期、标题、内容和标签。我们将创建一个`Diary`类来封装这些数据，并添加必要的验证和转换方法。

**设计要点**：
- 使用Python的dataclass或普通类定义
- 添加`to_dict()`方法用于JSON序列化
- 添加`from_dict()`类方法用于反序列化
- 包含内容搜索和摘要生成等实用方法

### 步骤2：设计自定义异常类
良好的错误处理是专业程序的标志。我们将创建一系列自定义异常类，使错误信息更清晰、更易处理。

**异常层次设计**：
- `DiarySystemError`：所有异常的基类
- `StorageError`：文件存储相关错误
- `DiaryNotFoundError`：日记未找到错误
- `InvalidInputError`：用户输入验证错误

### 步骤3：实现文件存储——DiaryStorage类
数据持久化是系统的核心功能。我们将创建一个`DiaryStorage`类，负责：
- 将日记列表保存为JSON文件
- 从JSON文件加载日记数据
- 创建数据备份和恢复
- 导出日记为纯文本格式

**关键技术点**：
- 使用Python的`json`模块进行序列化/反序列化
- 处理文件不存在、权限不足等异常情况
- 支持UTF-8编码确保中文内容正确保存

### 步骤4：实现业务逻辑——DiaryManager类
业务逻辑层连接数据模型和用户界面，提供完整的日记管理功能。

**核心功能实现**：
- 添加新日记（带输入验证）
- 搜索日记（支持关键词、日期）
- 删除日记（带确认机制）
- 统计信息生成
- 列表显示和分页

### 步骤5：创建用户界面——命令行交互
为保持简单，我们采用命令行界面，提供清晰的菜单和交互流程。

**界面设计原则**：
- 菜单驱动，操作直观
- 完善的输入验证和错误提示
- 操作确认机制防止误操作
- 清晰的反馈和结果展示

### 步骤6：测试与调试
开发完成后，需要进行全面测试，确保每个功能都正常工作。

**测试策略**：
1. **单元测试**：测试每个类的方法
2. **集成测试**：测试模块间协作
3. **边界测试**：测试空数据、非法输入等边界情况
4. **异常测试**：测试各种错误场景的处理

## 第三部分：代码实现与详细注释

### 模块1：日记数据模型（diary.py）

```python
"""
日记数据模型模块
定义Diary类，表示单篇日记的核心数据结构
"""

import datetime
from typing import List, Optional


class Diary:
    """日记类，表示一篇个人日记
    
    属性：
        date (datetime.date): 日记日期
        title (str): 日记标题
        content (str): 日记正文内容
        tags (List[str]): 日记标签列表，用于分类和搜索
        created_at (datetime.datetime): 日记创建时间戳
        
    方法：
        to_dict(): 将日记对象转换为字典格式，便于序列化存储
        from_dict(data): 从字典数据创建日记对象（类方法）
        summary(): 生成日记摘要信息
        contains_keyword(keyword): 检查日记内容是否包含关键词
    """
    
    def __init__(self, title: str, content: str, 
                 tags: Optional[List[str]] = None,
                 date: Optional[datetime.date] = None):
        """初始化一篇新日记
        
        参数：
            title (str): 日记标题，不能为空
            content (str): 日记正文内容，不能为空
            tags (List[str], 可选): 标签列表，默认为空列表
            date (datetime.date, 可选): 日记日期，默认为今天
            
        异常：
            ValueError: 当标题或内容为空时抛出
        """
        if not title or not content:
            raise ValueError("日记标题和内容不能为空")
        
        # 设置日期：如果未指定则使用今天
        self.date = date if date else datetime.date.today()
        
        # 设置基本属性
        self.title = title
        self.content = content
        self.tags = tags if tags else []
        
        # 记录创建时间戳
        self.created_at = datetime.datetime.now()
    
    def to_dict(self) -> dict:
        """将日记对象转换为字典格式，便于JSON序列化存储
        
        返回：
            dict: 包含日记所有属性的字典
        """
        return {
            'date': self.date.isoformat(),  # 将日期转换为ISO格式字符串
            'title': self.title,
            'content': self.content,
            'tags': self.tags,
            'created_at': self.created_at.isoformat()  # 将时间戳转换为ISO格式字符串
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'Diary':
        """从字典数据创建日记对象（类方法）
        
        参数：
            data (dict): 包含日记数据的字典
            
        返回：
            Diary: 新创建的日记对象
            
        异常：
            KeyError: 当字典缺少必要键时抛出
            ValueError: 当日期格式无效时抛出
        """
        try:
            # 从ISO格式字符串解析日期
            date = datetime.date.fromisoformat(data['date'])
            created_at = datetime.datetime.fromisoformat(data['created_at'])
            
            # 创建日记对象
            diary = cls(
                title=data['title'],
                content=data['content'],
                tags=data.get('tags', []),
                date=date
            )
            
            # 设置创建时间戳（保持原始值）
            diary.created_at = created_at
            
            return diary
        except KeyError as e:
            raise KeyError(f"字典数据缺少必要键: {e}")
        except ValueError as e:
            raise ValueError(f"日期格式无效: {e}")
    
    def summary(self) -> str:
        """生成日记摘要信息，用于列表显示
        
        返回：
            str: 格式化的摘要字符串
        """
        # 截取内容前50个字符作为预览
        content_preview = self.content[:50] + "..." if len(self.content) > 50 else self.content
        
        return f"{self.date.isoformat()} - {self.title}: {content_preview}"
    
    def contains_keyword(self, keyword: str) -> bool:
        """检查日记内容是否包含关键词（不区分大小写）
        
        参数：
            keyword (str): 要搜索的关键词
            
        返回：
            bool: 如果标题、内容或标签中包含关键词则返回True
        """
        keyword_lower = keyword.lower()
        
        # 在标题中搜索
        if keyword_lower in self.title.lower():
            return True
        
        # 在内容中搜索
        if keyword_lower in self.content.lower():
            return True
        
        # 在标签中搜索
        for tag in self.tags:
            if keyword_lower in tag.lower():
                return True
        
        return False
    
    def __str__(self) -> str:
        """返回日记的字符串表示形式
        
        返回：
            str: 格式化的日记信息
        """
        tags_str = ", ".join(self.tags) if self.tags else "无标签"
        return f"""日记《{self.title}》
日期: {self.date.isoformat()}
标签: {tags_str}
内容:
{self.content}
"""

    def __repr__(self) -> str:
        """返回日记的官方字符串表示，便于调试
        
        返回：
            str: 包含类名和标题的表示形式
        """
        return f"Diary(title='{self.title}', date={self.date.isoformat()})"
```

### 模块2：自定义异常（exceptions.py）

```python
"""
自定义异常模块
定义日记管理系统专用的异常类，提高错误处理的清晰度
"""


class DiarySystemError(Exception):
    """日记管理系统的基础异常类
    
    所有自定义异常都继承自此基类，便于统一捕获和处理
    """
    pass


class StorageError(DiarySystemError):
    """文件存储相关异常
    
    当文件读写、数据解析或存储操作失败时抛出
    """
    pass


class DiaryNotFoundError(DiarySystemError):
    """日记未找到异常
    
    当尝试访问不存在的日记时抛出
    """
    pass


class InvalidInputError(DiarySystemError):
    """无效输入异常
    
    当用户输入不符合要求时抛出，如空标题、无效日期等
    """
    pass


class DataValidationError(DiarySystemError):
    """数据验证异常
    
    当日记数据格式不正确或缺少必要字段时抛出
    """
    pass


class ExportError(DiarySystemError):
    """导出操作异常
    
    当导出日记为文本文件失败时抛出
    """
    pass
```

### 模块3：文件存储（storage.py）

```python
"""
文件存储模块
处理日记数据的JSON文件读写操作，提供数据持久化功能
"""

import json
import os
from typing import List, Dict, Any
from .diary import Diary
from .exceptions import StorageError, DataValidationError


class DiaryStorage:
    """日记存储类，负责日记数据的文件读写操作
    
    属性：
        data_file (str): JSON数据文件路径
        backup_file (str): 备份文件路径
        
    方法：
        save_diaries(diaries): 将日记列表保存到文件
        load_diaries(): 从文件加载日记列表
        create_backup(): 创建数据备份
        restore_backup(): 从备份恢复数据
    """
    
    def __init__(self, data_file: str = "diaries.json"):
        """初始化存储管理器
        
        参数：
            data_file (str, 可选): 数据文件路径，默认为"diaries.json"
        """
        self.data_file = data_file
        self.backup_file = f"{data_file}.backup"
    
    def save_diaries(self, diaries: List[Diary]) -> None:
        """将日记列表保存到JSON文件
        
        参数：
            diaries (List[Diary]): 要保存的日记对象列表
            
        异常：
            StorageError: 当文件写入失败时抛出
        """
        try:
            # 将日记对象列表转换为字典列表
            data = [diary.to_dict() for diary in diaries]
            
            # 先创建备份（如果原文件存在）
            if os.path.exists(self.data_file):
                self.create_backup()
            
            # 写入JSON文件，设置缩进使文件可读
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f"日记数据已成功保存到 {self.data_file}")
            
        except (IOError, OSError) as e:
            # 捕获文件操作异常
            raise StorageError(f"保存日记数据失败: {e}")
        except Exception as e:
            # 捕获其他未知异常
            raise StorageError(f"保存过程中发生未知错误: {e}")
    
    def load_diaries(self) -> List[Diary]:
        """从JSON文件加载日记列表
        
        返回：
            List[Diary]: 加载的日记对象列表
            
        异常：
            StorageError: 当文件读取失败或数据格式错误时抛出
            DataValidationError: 当日记数据验证失败时抛出
        """
        # 如果文件不存在，返回空列表
        if not os.path.exists(self.data_file):
            print(f"数据文件 {self.data_file} 不存在，将创建新文件")
            return []
        
        try:
            # 读取JSON文件
            with open(self.data_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # 验证数据是否为列表
            if not isinstance(data, list):
                raise DataValidationError("数据文件格式错误：根元素必须是列表")
            
            diaries = []
            errors = []
            
            # 遍历数据列表，创建日记对象
            for i, item in enumerate(data):
                try:
                    # 验证每个数据项是否为字典
                    if not isinstance(item, dict):
                        raise DataValidationError(f"第{i+1}条数据不是字典格式")
                    
                    # 使用from_dict方法创建日记对象
                    diary = Diary.from_dict(item)
                    diaries.append(diary)
                    
                except (KeyError, ValueError, DataValidationError) as e:
                    # 记录数据验证错误，但继续处理其他数据
                    error_msg = f"第{i+1}条数据格式错误: {e}"
                    errors.append(error_msg)
                    print(f"警告: {error_msg}")
            
            # 如果有错误，提示用户但继续返回有效数据
            if errors:
                print(f"加载完成，但发现 {len(errors)} 条数据格式问题")
            
            print(f"从 {self.data_file} 成功加载了 {len(diaries)} 篇日记")
            return diaries
            
        except json.JSONDecodeError as e:
            # JSON解析错误
            raise StorageError(f"数据文件格式错误，不是有效的JSON: {e}")
        except (IOError, OSError) as e:
            # 文件读取错误
            raise StorageError(f"读取日记数据失败: {e}")
        except Exception as e:
            # 其他未知错误
            raise StorageError(f"加载过程中发生未知错误: {e}")
    
    def create_backup(self) -> None:
        """创建数据文件的备份副本
        
        异常：
            StorageError: 当备份创建失败时抛出
        """
        try:
            import shutil
            shutil.copy2(self.data_file, self.backup_file)
            print(f"已创建数据备份: {self.backup_file}")
        except (IOError, OSError) as e:
            raise StorageError(f"创建备份失败: {e}")
    
    def restore_backup(self) -> bool:
        """从备份文件恢复数据
        
        返回：
            bool: 恢复成功返回True，备份不存在返回False
            
        异常：
            StorageError: 当恢复过程中发生错误时抛出
        """
        if not os.path.exists(self.backup_file):
            print(f"备份文件 {self.backup_file} 不存在")
            return False
        
        try:
            import shutil
            shutil.copy2(self.backup_file, self.data_file)
            print(f"已从备份恢复数据: {self.backup_file}")
            return True
        except (IOError, OSError) as e:
            raise StorageError(f"恢复备份失败: {e}")
    
    def export_to_text(self, diaries: List[Diary], output_file: str = "diaries_export.txt") -> None:
        """将日记列表导出为纯文本文件
        
        参数：
            diaries (List[Diary]): 要导出的日记列表
            output_file (str, 可选): 输出文件路径，默认为"diaries_export.txt"
            
        异常：
            ExportError: 当导出失败时抛出
        """
        from .exceptions import ExportError
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(f"个人日记导出 ({len(diaries)} 篇)\n")
                f.write("=" * 50 + "\n\n")
                
                for i, diary in enumerate(diaries, 1):
                    f.write(f"第{i}篇: {diary.title}\n")
                    f.write(f"日期: {diary.date.isoformat()}\n")
                    f.write(f"标签: {', '.join(diary.tags) if diary.tags else '无标签'}\n")
                    f.write("-" * 40 + "\n")
                    f.write(diary.content + "\n")
                    f.write("\n" + "=" * 50 + "\n\n")
            
            print(f"日记已成功导出到 {output_file}")
            
        except (IOError, OSError) as e:
            from .exceptions import ExportError
            raise ExportError(f"导出日记失败: {e}")
```

### 模块4：业务逻辑管理（manager.py）

```python
"""
日记管理模块
定义DiaryManager类，提供日记的增删改查和搜索功能
"""

import datetime
from typing import List, Optional
from .diary import Diary
from .exceptions import DiaryNotFoundError, InvalidInputError
from .storage import DiaryStorage


class DiaryManager:
    """日记管理器类，核心业务逻辑控制器
    
    属性：
        diaries (List[Diary]): 日记对象列表
        storage (DiaryStorage): 存储管理器实例
        
    方法：
        add_diary(): 添加新日记
        get_diary_by_date(): 按日期获取日记
        search_diaries(): 搜索日记
        list_diaries(): 列出所有日记
        export_all(): 导出所有日记
        get_statistics(): 获取统计信息
    """
    
    def __init__(self, data_file: str = "diaries.json"):
        """初始化日记管理器
        
        参数：
            data_file (str, 可选): 数据文件路径，默认为"diaries.json"
        """
        self.storage = DiaryStorage(data_file)
        self.diaries = self.storage.load_diaries()
    
    def add_diary(self, title: str, content: str, 
                  tags: Optional[List[str]] = None,
                  date: Optional[datetime.date] = None) -> Diary:
        """添加一篇新日记
        
        参数：
            title (str): 日记标题
            content (str): 日记内容
            tags (List[str], 可选): 标签列表
            date (datetime.date, 可选): 日记日期
            
        返回：
            Diary: 新创建的日记对象
            
        异常：
            InvalidInputError: 当输入无效时抛出
            StorageError: 当保存失败时抛出
        """
        try:
            # 创建日记对象
            diary = Diary(title, content, tags, date)
            
            # 添加到列表
            self.diaries.append(diary)
            
            # 保存到文件
            self.storage.save_diaries(self.diaries)
            
            print(f"日记《{title}》已成功添加！")
            return diary
            
        except ValueError as e:
            # 捕获Diary类的验证错误
            raise InvalidInputError(str(e))
    
    def get_diary_by_date(self, target_date: datetime.date) -> List[Diary]:
        """根据日期获取日记
        
        参数：
            target_date (datetime.date): 目标日期
            
        返回：
            List[Diary]: 该日期的所有日记列表（可能有多篇）
        """
        result = []
        for diary in self.diaries:
            if diary.date == target_date:
                result.append(diary)
        
        if not result:
            print(f"{target_date.isoformat()} 没有找到日记")
        
        return result
    
    def search_diaries(self, keyword: str) -> List[Diary]:
        """搜索包含关键词的日记
        
        参数：
            keyword (str): 搜索关键词
            
        返回：
            List[Diary]: 包含关键词的日记列表
        """
        if not keyword:
            raise InvalidInputError("搜索关键词不能为空")
        
        results = []
        for diary in self.diaries:
            if diary.contains_keyword(keyword):
                results.append(diary)
        
        print(f"搜索 '{keyword}' 找到了 {len(results)} 篇日记")
        return results
    
    def list_diaries(self, limit: Optional[int] = None) -> List[Diary]:
        """列出所有日记，支持数量限制
        
        参数：
            limit (int, 可选): 返回的最大日记数量
            
        返回：
            List[Diary]: 日记列表（按日期倒序排列）
        """
        # 按日期倒序排列（最新的在前）
        sorted_diaries = sorted(self.diaries, 
                                key=lambda d: d.date, 
                                reverse=True)
        
        if limit:
            sorted_diaries = sorted_diaries[:limit]
        
        return sorted_diaries
    
    def get_diary_by_index(self, index: int) -> Diary:
        """根据索引获取日记（用于删除或查看详情）
        
        参数：
            index (int): 日记索引（从1开始）
            
        返回：
            Diary: 对应的日记对象
            
        异常：
            DiaryNotFoundError: 当索引超出范围时抛出
        """
        if index < 1 or index > len(self.diaries):
            raise DiaryNotFoundError(f"索引 {index} 无效，共有 {len(self.diaries)} 篇日记")
        
        # 按日期排序后获取
        sorted_diaries = self.list_diaries()
        return sorted_diaries[index - 1]
    
    def delete_diary(self, index: int) -> bool:
        """根据索引删除日记
        
        参数：
            index (int): 要删除的日记索引（从1开始）
            
        返回：
            bool: 删除成功返回True
            
        异常：
            DiaryNotFoundError: 当索引无效时抛出
            StorageError: 当保存失败时抛出
        """
        try:
            # 获取要删除的日记
            diary = manager.get_diary_by_index(index)
            
            # 从列表中移除
            self.diaries.remove(diary)
            
            # 保存更改
            self.storage.save_diaries(self.diaries)
            
            print(f"日记《{diary.title}》已成功删除")
            return True
            
        except DiaryNotFoundError:
            raise
        except Exception as e:
            from .exceptions import StorageError
            raise StorageError(f"删除日记失败: {e}")
    
    def export_all(self, output_file: str = "diaries_export.txt") -> None:
        """导出所有日记到文本文件
        
        参数：
            output_file (str, 可选): 输出文件路径
            
        异常：
            ExportError: 当导出失败时抛出
        """
        from .exceptions import ExportError
        try:
            self.storage.export_to_text(self.diaries, output_file)
        except Exception as e:
            raise ExportError(f"导出失败: {e}")
    
    def get_statistics(self) -> dict:
        """获取日记统计信息
        
        返回：
            dict: 包含各种统计数据的字典
        """
        if not self.diaries:
            return {
                'total': 0,
                'message': '暂无日记'
            }
        
        # 计算最早和最晚日期
        dates = [diary.date for diary in self.diaries]
        earliest = min(dates)
        latest = max(dates)
        
        # 计算每月日记数量
        monthly_counts = {}
        for diary in self.diaries:
            month_key = diary.date.strftime("%Y-%m")
            monthly_counts[month_key] = monthly_counts.get(month_key, 0) + 1
        
        # 计算标签统计
        tag_counts = {}
        for diary in self.diaries:
            for tag in diary.tags:
                tag_counts[tag] = tag_counts.get(tag, 0) + 1
        
        # 计算平均日记长度
        total_chars = sum(len(diary.content) for diary in self.diaries)
        avg_length = total_chars / len(self.diaries) if self.diaries else 0
        
        return {
            'total': len(self.diaries),
            'date_range': {
                'earliest': earliest.isoformat(),
                'latest': latest.isoformat(),
                'days': (latest - earliest).days + 1
            },
            'monthly_counts': monthly_counts,
            'top_tags': sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:5],
            'content_stats': {
                'total_chars': total_chars,
                'avg_chars_per_diary': round(avg_length, 1)
            }
        }
    
    def clear_all(self) -> bool:
        """清空所有日记（危险操作，需谨慎使用）
        
        返回：
            bool: 清空成功返回True
            
        异常：
            StorageError: 当保存失败时抛出
        """
        confirmation = input("⚠️  警告：这将删除所有日记！输入 'YES' 确认: ")
        if confirmation != 'YES':
            print("操作已取消")
            return False
        
        try:
            self.diaries = []
            self.storage.save_diaries(self.diaries)
            print("所有日记已清空")
            return True
        except Exception as e:
            from .exceptions import StorageError
            raise StorageError(f"清空日记失败: {e}")
```

### 模块5：命令行界面（main.py）

```python
"""
主程序模块
提供命令行用户界面，整合各模块功能
"""

import sys
import datetime
from typing import List, Optional
from .manager import DiaryManager
from .exceptions import (
    DiarySystemError, InvalidInputError, 
    DiaryNotFoundError, StorageError, ExportError
)


def display_menu() -> None:
    """显示主菜单选项"""
    print("\n" + "=" * 50)
    print("个人日记管理系统")
    print("=" * 50)
    print("1. 写新日记")
    print("2. 查看日记列表")
    print("3. 搜索日记")
    print("4. 按日期查看日记")
    print("5. 删除日记")
    print("6. 导出所有日记")
    print("7. 查看统计信息")
    print("8. 清空所有日记（危险！）")
    print("9. 数据备份与恢复")
    print("0. 退出系统")
    print("=" * 50)


def get_user_input(prompt: str, required: bool = True) -> str:
    """获取用户输入，支持空值检查
    
    参数：
        prompt (str): 提示信息
        required (bool): 是否必填
        
    返回：
        str: 用户输入内容
    """
    while True:
        try:
            user_input = input(prompt).strip()
            
            if required and not user_input:
                print("输入不能为空，请重新输入")
                continue
                
            return user_input
            
        except EOFError:
            # 处理Ctrl+D（Unix）或Ctrl+Z（Windows）退出
            print("\n检测到退出信号")
            sys.exit(0)
        except KeyboardInterrupt:
            # 处理Ctrl+C中断
            print("\n操作已取消")
            return ""


def get_date_input(prompt: str) -> Optional[datetime.date]:
    """获取日期输入，支持多种格式
    
    参数：
        prompt (str): 提示信息
        
    返回：
        Optional[datetime.date]: 解析后的日期对象，输入为空返回None
    """
    while True:
        date_str = get_user_input(prompt, required=False)
        
        # 允许空输入
        if not date_str:
            return None
        
        try:
            # 尝试解析ISO格式（YYYY-MM-DD）
            return datetime.date.fromisoformat(date_str)
        except ValueError:
            try:
                # 尝试解析简写格式（YYYY/MM/DD或YYYY.MM.DD）
                if '/' in date_str:
                    year, month, day = map(int, date_str.split('/'))
                elif '.' in date_str:
                    year, month, day = map(int, date_str.split('.'))
                else:
                    raise ValueError
                
                return datetime.date(year, month, day)
            except (ValueError, IndexError):
                print("日期格式错误，请使用 YYYY-MM-DD 格式（例如：2026-02-20）")


def get_tags_input() -> List[str]:
    """获取标签输入，支持多个标签
    
    返回：
        List[str]: 标签列表
    """
    tags_str = get_user_input("请输入标签（多个标签用逗号分隔，直接回车跳过）: ", required=False)
    
    if not tags_str:
        return []
    
    # 分割标签，去除空白字符
    tags = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
    return tags


def add_diary_flow(manager: DiaryManager) -> None:
    """添加新日记的完整流程"""
    print("\n--- 写新日记 ---")
    
    try:
        # 获取标题
        title = get_user_input("请输入日记标题: ")
        
        # 获取内容
        print("请输入日记内容（输入空行结束）:")
        content_lines = []
        while True:
            try:
                line = input()
                if line == "":
                    break
                content_lines.append(line)
            except EOFError:
                break
        
        content = "\n".join(content_lines)
        if not content:
            raise InvalidInputError("日记内容不能为空")
        
        # 获取日期
        date = get_date_input("请输入日记日期（YYYY-MM-DD，直接回车使用今天）: ")
        
        # 获取标签
        tags = get_tags_input()
        
        # 添加日记
        diary = manager.add_diary(title, content, tags, date)
        
        print(f"\n✅ 日记添加成功！")
        print(f"标题: {diary.title}")
        print(f"日期: {diary.date.isoformat()}")
        print(f"标签: {', '.join(diary.tags) if diary.tags else '无'}")
        
    except InvalidInputError as e:
        print(f"❌ 输入错误: {e}")
    except StorageError as e:
        print(f"❌ 保存失败: {e}")
    except Exception as e:
        print(f"❌ 发生未知错误: {e}")


def list_diaries_flow(manager: DiaryManager) -> None:
    """列出所有日记的流程"""
    print("\n--- 日记列表 ---")
    
    try:
        diaries = manager.list_diaries()
        
        if not diaries:
            print("📭 还没有日记，快去写一篇吧！")
            return
        
        print(f"共有 {len(diaries)} 篇日记:")
        print("-" * 60)
        
        for i, diary in enumerate(diaries, 1):
            print(f"{i:3d}. {diary.summary()}")
        
        # 询问是否查看详情
        while True:
            choice = get_user_input("\n输入日记编号查看详情（0返回主菜单）: ", required=False)
            
            if not choice or choice == '0':
                break
            
            try:
                index = int(choice)
                diary = manager.get_diary_by_index(index)
                print("\n" + "=" * 60)
                print(diary)
                print("=" * 60)
            except (ValueError, DiaryNotFoundError) as e:
                print(f"❌ 错误: {e}")
                
    except Exception as e:
        print(f"❌ 发生错误: {e}")


def search_diaries_flow(manager: DiaryManager) -> None:
    """搜索日记的流程"""
    print("\n--- 搜索日记 ---")
    
    try:
        keyword = get_user_input("请输入搜索关键词: ")
        
        results = manager.search_diaries(keyword)
        
        if not results:
            print(f"🔍 没有找到包含 '{keyword}' 的日记")
            return
        
        print(f"🔍 找到 {len(results)} 篇相关日记:")
        print("-" * 60)
        
        for i, diary in enumerate(results, 1):
            print(f"{i:3d}. {diary.summary()}")
        
        # 询问是否查看详情
        while True:
            choice = get_user_input("\n输入日记编号查看详情（0返回主菜单）: ", required=False)
            
            if not choice or choice == '0':
                break
            
            try:
                index = int(choice)
                if index < 1 or index > len(results):
                    print("❌ 编号无效")
                    continue
                
                diary = results[index - 1]
                print("\n" + "=" * 60)
                print(diary)
                print("=" * 60)
            except ValueError:
                print("❌ 请输入数字")
                
    except InvalidInputError as e:
        print(f"❌ 输入错误: {e}")
    except Exception as e:
        print(f"❌ 发生错误: {e}")


def view_by_date_flow(manager: DiaryManager) -> None:
    """按日期查看日记的流程"""
    print("\n--- 按日期查看 ---")
    
    try:
        date = get_date_input("请输入日期（YYYY-MM-DD）: ")
        
        if not date:
            print("❌ 日期不能为空")
            return
        
        diaries = manager.get_diary_by_date(date)
        
        if not diaries:
            print(f"📅 {date.isoformat()} 没有日记")
            return
        
        print(f"📅 {date.isoformat()} 共有 {len(diaries)} 篇日记:")
        print("-" * 60)
        
        for i, diary in enumerate(diaries, 1):
            print(f"{i:3d}. {diary.title}")
        
        # 询问是否查看详情
        while True:
            choice = get_user_input("\n输入日记编号查看详情（0返回主菜单）: ", required=False)
            
            if not choice or choice == '0':
                break
            
            try:
                index = int(choice)
                if index < 1 or index > len(diaries):
                    print("❌ 编号无效")
                    continue
                
                diary = diaries[index - 1]
                print("\n" + "=" * 60)
                print(diary)
                print("=" * 60)
            except ValueError:
                print("❌ 请输入数字")
                
    except ValueError as e:
        print(f"❌ 日期格式错误: {e}")
    except Exception as e:
        print(f"❌ 发生错误: {e}")


def delete_diary_flow(manager: DiaryManager) -> None:
    """删除日记的流程"""
    print("\n--- 删除日记 ---")
    
    try:
        # 先显示日记列表
        diaries = manager.list_diaries()
        
        if not diaries:
            print("📭 还没有日记")
            return
        
        print("当前日记列表:")
        for i, diary in enumerate(diaries, 1):
            print(f"{i:3d}. {diary.summary()}")
        
        # 获取要删除的日记编号
        choice = get_user_input("\n请输入要删除的日记编号（0取消）: ", required=False)
        
        if not choice or choice == '0':
            print("操作已取消")
            return
        
        index = int(choice)
        
        # 确认删除
        diary = manager.get_diary_by_index(index)
        print(f"\n⚠️  即将删除以下日记:")
        print(f"标题: {diary.title}")
        print(f"日期: {diary.date.isoformat()}")
        
        confirm = get_user_input("确认删除？(输入 'DELETE' 确认): ")
        
        if confirm == 'DELETE':
            success = manager.delete_diary(index)
            if success:
                print("✅ 日记删除成功")
        else:
            print("操作已取消")
            
    except (ValueError, DiaryNotFoundError) as e:
        print(f"❌ 错误: {e}")
    except StorageError as e:
        print(f"❌ 删除失败: {e}")
    except Exception as e:
        print(f"❌ 发生未知错误: {e}")


def export_diaries_flow(manager: DiaryManager) -> None:
    """导出日记的流程"""
    print("\n--- 导出日记 ---")
    
    try:
        output_file = get_user_input("请输入导出文件名（直接回车使用默认名称）: ", required=False)
        
        if not output_file:
            output_file = "diaries_export.txt"
        
        manager.export_all(output_file)
        print(f"✅ 日记已成功导出到 {output_file}")
        
    except ExportError as e:
        print(f"❌ 导出失败: {e}")
    except Exception as e:
        print(f"❌ 发生错误: {e}")


def show_statistics_flow(manager: DiaryManager) -> None:
    """显示统计信息的流程"""
    print("\n--- 统计信息 ---")
    
    try:
        stats = manager.get_statistics()
        
        if stats['total'] == 0:
            print("📊 暂无统计数据")
            return
        
        print(f"📊 日记总数: {stats['total']} 篇")
        print(f"📅 日期范围: {stats['date_range']['earliest']} 至 {stats['date_range']['latest']}")
        print(f"📆 覆盖天数: {stats['date_range']['days']} 天")
        
        print("\n📈 月度分布:")
        for month, count in sorted(stats['monthly_counts'].items()):
            print(f"  {month}: {count} 篇")
        
        if stats['top_tags']:
            print("\n🏷️  热门标签:")
            for tag, count in stats['top_tags']:
                print(f"  {tag}: {count} 次")
        
        print(f"\n📝 内容统计:")
        print(f"  总字符数: {stats['content_stats']['total_chars']}")
        print(f"  平均每篇: {stats['content_stats']['avg_chars_per_diary']} 字符")
        
    except Exception as e:
        print(f"❌ 发生错误: {e}")


def backup_restore_flow(manager: DiaryManager) -> None:
    """备份与恢复的流程"""
    print("\n--- 数据备份与恢复 ---")
    
    while True:
        print("\n1. 创建备份")
        print("2. 恢复备份")
        print("3. 返回主菜单")
        
        choice = get_user_input("请选择操作: ", required=False)
        
        if choice == '1':
            try:
                manager.storage.create_backup()
            except StorageError as e:
                print(f"❌ 备份失败: {e}")
        elif choice == '2':
            try:
                success = manager.storage.restore_backup()
                if success:
                    # 重新加载数据
                    manager.diaries = manager.storage.load_diaries()
                    print("✅ 数据恢复成功")
            except StorageError as e:
                print(f"❌ 恢复失败: {e}")
        elif choice == '3' or not choice:
            break
        else:
            print("❌ 无效选择")


def clear_all_flow(manager: DiaryManager) -> None:
    """清空所有日记的流程"""
    print("\n--- 清空所有日记 ---")
    
    try:
        success = manager.clear_all()
        if success:
            print("✅ 所有日记已清空")
    except StorageError as e:
        print(f"❌ 清空失败: {e}")
    except Exception as e:
        print(f"❌ 发生错误: {e}")


def main() -> None:
    """主程序入口函数"""
    print("正在启动个人日记管理系统...")
    
    try:
        # 创建日记管理器实例
        manager = DiaryManager()
        print("✅ 系统启动成功！")
        
        # 主循环
        while True:
            display_menu()
            
            try:
                choice = get_user_input("请选择操作（0-9）: ", required=False)
                
                if choice == '0':
                    print("\n感谢使用个人日记管理系统，再见！")
                    break
                elif choice == '1':
                    add_diary_flow(manager)
                elif choice == '2':
                    list_diaries_flow(manager)
                elif choice == '3':
                    search_diaries_flow(manager)
                elif choice == '4':
                    view_by_date_flow(manager)
                elif choice == '5':
                    delete_diary_flow(manager)
                elif choice == '6':
                    export_diaries_flow(manager)
                elif choice == '7':
                    show_statistics_flow(manager)
                elif choice == '8':
                    clear_all_flow(manager)
                elif choice == '9':
                    backup_restore_flow(manager)
                else:
                    print("❌ 无效选择，请输入0-9之间的数字")
                    
            except KeyboardInterrupt:
                print("\n操作已取消")
                continue
            except EOFError:
                print("\n检测到退出信号")
                break
            except Exception as e:
                print(f"❌ 发生错误: {e}")
                continue
                
    except DiarySystemError as e:
        print(f"❌ 系统初始化失败: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ 未知错误: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
```

### 模块6：包初始化文件（__init__.py）

```python
"""
个人日记管理系统 - 一个综合Python项目实战

这是一个为Python初学者设计的综合项目，整合了Week 2所学的：
1. 文件操作（JSON读写）
2. 异常处理（自定义异常类）
3. 模块化设计（多个模块分离）
4. 面向对象编程（类与对象）

主要模块：
- diary: 日记数据模型
- exceptions: 自定义异常类
- storage: 文件存储操作
- manager: 业务逻辑管理
- main: 命令行界面
"""

__version__ = "1.0.0"
__author__ = "Python学习计划"

# 导出主要类，便于外部导入
from .diary import Diary
from .exceptions import DiarySystemError, StorageError, DiaryNotFoundError, InvalidInputError, DataValidationError, ExportError
from .storage import DiaryStorage
from .manager import DiaryManager

__all__ = [
    'Diary',
    'DiarySystemError',
    'StorageError',
    'DiaryNotFoundError', 
    'InvalidInputError',
    'DataValidationError',
    'ExportError',
    'DiaryStorage',
    'DiaryManager'
]
```

### 运行脚本（run_diary.py）

```python
#!/usr/bin/env python3
"""
日记管理系统启动脚本
可以直接运行此文件启动系统
"""

import sys
import os

# 添加src目录到Python路径，确保可以导入diary_system模块
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from diary_system.main import main

if __name__ == "__main__":
    main()
```

## 第四部分：运行与测试指南

### 如何运行项目

方法1：直接运行主模块
```bash
# 进入项目目录
cd src/diary_system

# 运行主程序
python main.py
```

方法2：使用运行脚本（推荐）
```bash
# 在项目根目录运行
python run_diary.py
```

### 功能测试用例

1. **添加日记**
   - 输入：标题="今日心情"，内容="今天天气真好"，标签="心情,天气"
   - 预期：成功添加，显示确认信息

2. **查看列表**
   - 输入：选择菜单项2
   - 预期：显示所有日记的摘要列表

3. **搜索功能**
   - 输入：关键词="心情"
   - 预期：返回包含"心情"的日记列表

4. **按日期查看**
   - 输入：日期="2026-02-20"
   - 预期：显示该日期的所有日记

5. **删除操作**
   - 输入：选择要删除的日记编号，确认"DELETE"
   - 预期：成功删除，显示确认信息

6. **导出功能**
   - 输入：导出文件名"my_diaries.txt"
   - 预期：生成包含所有日记的文本文件

### 常见问题与解决方案

1. **文件不存在错误**
   - 现象：程序启动时报错找不到diaries.json
   - 解决：系统会自动创建该文件，确保有写权限

2. **中文乱码问题**
   - 现象：日记内容显示为乱码
   - 解决：确保系统使用UTF-8编码，代码已指定encoding='utf-8'

3. **输入验证失败**
   - 现象：添加日记时提示"标题和内容不能为空"
   - 解决：确保输入有效内容，空格不算有效内容

4. **JSON解析错误**
   - 现象：加载数据时报JSON格式错误
   - 解决：检查diaries.json文件是否被手动修改过，可以使用备份恢复

## 第五部分：扩展思考题

### 1. 如何添加加密功能保护隐私？
**思考方向**：
- 使用Python的`cryptography`库对日记内容加密
- 设计密钥管理方案（密码输入、密钥文件存储）
- 实现加密保存和解密加载功能
- 考虑性能影响和用户体验平衡

**实现思路**：
```python
from cryptography.fernet import Fernet

class EncryptedDiaryStorage(DiaryStorage):
    def __init__(self, data_file, key_file):
        super().__init__(data_file)
        self.key = self.load_or_generate_key(key_file)
        self.cipher = Fernet(self.key)
    
    def encrypt_content(self, content):
        return self.cipher.encrypt(content.encode()).decode()
    
    def decrypt_content(self, encrypted_content):
        return self.cipher.decrypt(encrypted_content.encode()).decode()
```

### 2. 如何支持富文本格式（如Markdown）？
**思考方向**：
- 扩展Diary类支持多种内容格式（纯文本、Markdown、HTML）
- 添加格式标识字段`content_type`
- 实现Markdown预览和转换功能
- 考虑导出时的格式保持

**实现思路**：
```python
class MarkdownDiary(Diary):
    def __init__(self, title, markdown_content, tags=None, date=None):
        super().__init__(title, markdown_content, tags, date)
        self.content_type = "markdown"
    
    def to_html(self):
        import markdown
        return markdown.markdown(self.content)
    
    def preview(self, max_lines=10):
        # 生成Markdown的文本预览
        lines = self.content.split('\n')[:max_lines]
        return '\n'.join(lines)
```

### 3. 如何将数据迁移到数据库？
**思考方向**：
- 选择适合的数据库（SQLite、MySQL、PostgreSQL）
- 设计数据库表结构（日记表、标签表、关联表）
- 实现数据库存储层，保持现有接口不变
- 考虑数据迁移脚本和版本升级

**实现思路**：
```python
import sqlite3
from contextlib import contextmanager

class DatabaseStorage:
    def __init__(self, db_path="diaries.db"):
        self.db_path = db_path
        self.init_database()
    
    @contextmanager
    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        try:
            yield conn
        finally:
            conn.close()
    
    def init_database(self):
        with self.get_connection() as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS diaries (
                    id INTEGER PRIMARY KEY,
                    date TEXT NOT NULL,
                    title TEXT NOT NULL,
                    content TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
            """)
            conn.execute("""
                CREATE TABLE IF NOT EXISTS tags (
                    id INTEGER PRIMARY KEY,
                    name TEXT UNIQUE NOT NULL
                )
            """)
            conn.execute("""
                CREATE TABLE IF NOT EXISTS diary_tags (
                    diary_id INTEGER,
                    tag_id INTEGER,
                    PRIMARY KEY (diary_id, tag_id),
                    FOREIGN KEY (diary_id) REFERENCES diaries(id),
                    FOREIGN KEY (tag_id) REFERENCES tags(id)
                )
            """)
```

### 4. 如何实现Web界面？
**思考方向**：
- 选择Web框架（Flask、Django、FastAPI）
- 设计RESTful API接口
- 实现前后端分离架构
- 考虑用户认证和会话管理

### 5. 如何添加数据分析功能？
**思考方向**：
- 情绪分析：使用NLP分析日记情绪变化
- 主题挖掘：自动识别日记主题聚类
- 时间模式：分析写作习惯和时间分布
- 可视化：生成统计图表和词云

## 第六部分：学习卡片设计

### 核心收获总结

通过今天"个人日记管理系统"的完整开发，你已成功整合Week 2的核心技能：

1. **面向对象编程实践**：
   - 设计了Diary类封装数据和行为
   - 使用继承构建异常类层次
   - 实践了类方法、实例方法、特殊方法

2. **文件操作深入应用**：
   - 使用JSON格式进行数据序列化/反序列化
   - 实现文件读写、备份恢复功能
   - 处理了编码、异常、边界情况

3. **异常处理系统化**：
   - 创建了自定义异常类体系
   - 实现了分层次的错误处理策略
   - 保证了程序健壮性和用户体验

4. **模块化设计思维**：
   - 合理划分了6个功能模块
   - 实现了高内聚低耦合的代码结构
   - 掌握了Python包的组织方式

5. **完整项目开发流程**：
   - 需求分析 → 设计 → 编码 → 测试
   - 代码可读性、可维护性、可扩展性考量
   - 文档编写和用户交互设计

### 疑问收集与解答

**常见疑问1**：为什么要把代码分成这么多文件？一个文件写不更简单吗？

**解答**：模块化设计有多个好处：
- **可维护性**：一个模块出问题，不影响其他模块
- **可读性**：每个文件功能单一，容易理解
- **可复用性**：Diary类可以在其他项目中使用
- **协作性**：多人开发时可以分工负责不同模块
- **测试性**：可以单独测试每个模块的功能

**常见疑问2**：异常处理看起来好复杂，真的有必要吗？

**解答**：异常处理是专业程序的标志：
- **用户体验**：友好的错误提示而不是程序崩溃
- **数据安全**：防止数据损坏或丢失
- **调试效率**：清晰的错误信息帮助快速定位问题
- **代码健壮**：程序能处理各种意外情况
- **维护成本**：减少后续维护时查错的时间

**常见疑问3**：JSON存储有什么优缺点？为什么不直接用txt？

**解答**：JSON vs 纯文本：
- **结构化**：JSON保存结构化数据，便于程序解析
- **可扩展**：添加新字段不影响已有数据
- **标准化**：JSON是通用数据交换格式
- **数据类型**：支持字符串、数字、数组、对象等
- **缺点**：文件体积稍大，需要解析过程

### 感悟引导与反思

1. **项目思维 vs 语法学习**：
   - 以前是"学了这个语法能做什么"
   - 现在是"要实现这个功能需要什么知识"
   - 这种思维转变是成为真正开发者的关键

2. **代码质量意识**：
   - 不仅关注"能不能运行"，更关注"好不好维护"
   - 命名规范、注释完整、结构清晰成为习惯
   - 错误处理从"可有可无"变成"必须考虑"

3. **综合能力提升**：
   - 单点知识 → 系统整合
   - 语法练习 → 项目实战
   - 被动学习 → 主动创造

4. **为AI学习奠基**：
   - 数据处理能力是AI项目的基础
   - 模块化思维适合构建复杂AI系统
   - 错误处理在AI部署中至关重要

### 实践建议

1. **亲手运行**：下载代码，运行系统，体验完整功能
2. **修改扩展**：尝试实现一个扩展思考题的功能
3. **代码重构**：思考如何改进现有代码结构
4. **文档完善**：为系统编写更详细的使用文档
5. **项目迁移**：尝试将数据存储从JSON改为数据库

## 第七部分：总结与展望

恭喜你完成了个人日记管理系统的完整开发！这是你Python学习旅程中的一个重要里程碑。

**回顾Week 2学习成果**：
- ✅ 文件操作：读写JSON，处理编码和异常
- ✅ 异常处理：自定义异常，分层错误处理
- ✅ 模块化设计：合理划分模块，高内聚低耦合
- ✅ 面向对象：类设计、继承、多态、特殊方法
- ✅ 项目实战：完整系统开发，综合应用能力

**下一步学习方向**：
1. **明天**：Week 2周度复盘与综合测验，检验学习效果
2. **Week 3**：开始Python高级主题学习
3. **长期**：将这些基础技能应用于AI项目开发

**保持学习动力的建议**：
- 用今天的日记系统记录学习心得
- 将遇到的问题和解决方案写成日记
- 定期回顾日记，看到自己的进步轨迹
- 将项目分享给朋友，获取反馈

编程不仅是技术，更是创造和表达的工具。今天的项目让你亲手创造了一个有用的小系统，这是编程最令人兴奋的部分。

继续前进，明天见！

---

**今日代码**：已保存在`src/diary_system/`目录下  
**学习文档**：[Day13_综合项目实战](computer://outputs/每日学习/Day13_综合项目实战.md)  
**明日预告**：Week 2周度复盘与综合测验