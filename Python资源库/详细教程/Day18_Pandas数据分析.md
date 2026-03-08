---
title: Day 18：AI基础Ⅱ——Pandas数据分析
tags: [python, pandas, 数据分析, 数据处理, AI基础]
aliases: ["Day18"]
date: 2026-03-02
---

# Day 18：AI基础Ⅱ——Pandas数据分析

欢迎来到Python学习的第十八天！今天我们将深入学习数据分析的核心工具——Pandas库。Pandas是Python数据分析的“瑞士军刀”，几乎所有数据处理、清洗和分析任务都离不开它。掌握Pandas是你走向AI和数据科学的关键一步。

## 📦 第一步：安装Pandas

在开始学习前，请确保已安装Pandas库。打开终端或命令提示符，执行以下命令：

```bash
pip install pandas
```

如果需要加速下载，可以使用国内镜像源：

```bash
pip install pandas -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**注意**：Pandas依赖于NumPy库，如果尚未安装NumPy，pip会自动安装。此外，若要读取Excel文件，还需要安装openpyxl：

```bash
pip install openpyxl
```

安装完成后，通过以下代码验证安装是否成功：

```python
import pandas as pd
print("Pandas版本：", pd.__version__)
print("安装成功！" if pd.__version__ else "安装失败，请检查网络或pip配置")
```

预期输出类似：
```
Pandas版本： 2.2.0
安装成功！
```

**常见安装问题**：
- **权限错误**：使用 `pip install pandas --user`
- **依赖冲突**：创建新的虚拟环境 `python -m venv venv`，然后激活并安装
- **读取Excel失败**：确保安装了openpyxl `pip install openpyxl`

## 📺 第一部分：最新视频教程推荐

为了让你直观地学习Pandas的核心概念，我为你筛选了2025-2026年发布的最新Pandas入门视频教程。这些教程都采用最新的Python和Pandas版本，讲解风格通俗易懂，特别适合零基础学员。

### 1. 黑马程序员 - Python人工智能开发：Pandas数据分析入门（2026版）
- **链接**：https://www.boxuegu.com/course/detail-4041.html（第4章第4.2节：Pandas入门）
- **重点内容**：DataFrame和Series核心概念、数据读取与写入、数据清洗、分组聚合、合并连接
- **适合人群**：希望系统学习AI开发、需要掌握完整数据处理体系的学员
- **核心特点**：
  - 紧密结合AI开发实战，讲解Pandas在机器学习中的实际应用
  - 涵盖从基础表格操作到高级数据分析的完整知识体系
  - 包含大量实战案例，如电商用户分析、销售数据处理等实际业务场景
  - 讲师来自一线数据科学行业，分享真实项目经验和最佳实践

### 2. 莫烦Python - Pandas数据处理交互式教程（2025最新版）
- **链接**：https://mofanpy.com/tutorials/data-manipulation/pandas
- **学习方式**：交互式学习网站，边学边练，即时查看代码效果
- **适合人群**：喜欢互动式学习、希望即时验证Pandas各种操作的学员
- **核心特点**：
  - 每个概念都有可运行的代码示例，可直接在浏览器中编辑调试
  - 涵盖数据读取、清洗、筛选、聚合、可视化等完整内容
  - 通过泰坦尼克号数据集、股票数据等经典案例展示Pandas的实际应用价值
  - 支持在线调试和数据可视化，学习过程直观有趣

### 3. B站高质量图解教程 - Pandas从入门到实战（2026最新版）
- **链接**：https://www.bilibili.com/video/BV1Ex411L7oT（第2部分：Pandas数据处理）
- **重点内容**：DataFrame图解说明、行列操作可视化、groupby机制解析
- **适合人群**：希望直观理解Pandas表格结构、喜欢图形化教学的学员
- **核心特点**：
  - 采用图解方法讲解DataFrame的索引对齐和合并操作
  - 深入讲解groupby的分组聚合原理和实际应用
  - 包含大量对比示例，展示Pandas与Excel等工具的效率差异
  - 提供完整配套资料和代码文件，方便跟练

### 学习建议
- **今日首选**：建议先观看黑马程序员课程的第4.2节，系统建立Pandas知识框架
- **互动练习**：学习过程中使用莫烦Python的交互式网站实操，即时验证各种表格操作
- **巩固拓展**：完成今日练习题后，参考B站图解教程深入理解DataFrame的索引与对齐机制

## 📚 第二部分：核心概念详解

### 1. Pandas核心数据结构：Series与DataFrame

**Series（一维带标签数组）**：
```python
import pandas as pd

# 创建Series
s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print("Series:")
print(s)
print("索引：", s.index)
print("值：", s.values)
print("数据类型：", s.dtype)
```

**DataFrame（二维表格）**：
```python
# 创建DataFrame
data = {
    '姓名': ['张三', '李四', '王五', '赵六'],
    '年龄': [25, 32, 28, 45],
    '城市': ['北京', '上海', '广州', '深圳'],
    '薪资': [15000, 23000, 18000, 35000]
}
df = pd.DataFrame(data)
print("DataFrame:")
print(df)
print("形状（行×列）：", df.shape)
print("列名：", df.columns)
print("行索引：", df.index)
print("数据类型：\n", df.dtypes)
```

### 2. 数据读取与写入：多种格式支持

```python
# 读取CSV文件
csv_df = pd.read_csv('data.csv', encoding='utf-8')

# 读取Excel文件
excel_df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# 读取JSON文件
json_df = pd.read_json('data.json')

# 数据写入
df.to_csv('output.csv', index=False)  # 不保存行索引
df.to_excel('output.xlsx', sheet_name='结果', index=False)
df.to_json('output.json', orient='records')
```

### 3. 数据探索：了解你的数据

```python
# 基本信息
print("前3行：\n", df.head(3))
print("后2行：\n", df.tail(2))
print("形状（行数, 列数）：", df.shape)
print("数据类型：\n", df.dtypes)
print("列名：", df.columns.tolist())

# 统计信息
print("\n统计描述：\n", df.describe())

# 缺失值检查
print("\n缺失值统计：")
print(df.isnull().sum())

# 唯一值统计
print("\n唯一值数量：")
print(df.nunique())
```

### 4. 数据清洗：处理现实中的"脏数据"

```python
# 处理缺失值
df_filled = df.fillna(0)  # 用0填充
df_dropped = df.dropna()  # 删除含缺失值的行
df_forward_fill = df.fillna(method='ffill')  # 前向填充

# 处理重复值
df_no_duplicates = df.drop_duplicates()  # 删除完全重复的行
df_no_duplicates_subset = df.drop_duplicates(subset=['姓名'])  # 根据姓名去重

# 数据类型转换
df['年龄'] = df['年龄'].astype(int)  # 转为整数
df['入职日期'] = pd.to_datetime(df['入职日期'])  # 转为日期时间类型

# 字符串处理
df['姓名'] = df['姓名'].str.strip()  # 去除空格
df['城市'] = df['城市'].str.lower()  # 转为小写
```

### 5. 数据筛选与索引：精准获取需要的数据

```python
# 列选择
single_column = df['姓名']  # 返回Series
multiple_columns = df[['姓名', '年龄']]  # 返回DataFrame

# 行选择（标签索引）
row_by_label = df.loc[0]  # 选择索引为0的行
rows_by_labels = df.loc[[0, 2]]  # 选择索引为0和2的行

# 行选择（位置索引）
row_by_position = df.iloc[0]  # 选择第一行
rows_by_positions = df.iloc[0:3]  # 选择第1-3行（不包含索引3）

# 条件筛选
high_salary = df[df['薪资'] > 20000]  # 薪资大于20000
beijing_young = df[(df['城市'] == '北京') & (df['年龄'] < 30)]  # 北京且年龄<30

# 使用query方法
query_result = df.query('薪资 > 20000 and 年龄 < 35')
```

### 6. 数据分组与聚合：挖掘深层次信息

```python
# 基本分组聚合
grouped = df.groupby('城市').agg({
    '年龄': 'mean',
    '薪资': ['sum', 'mean', 'count']
})
print("按城市分组聚合：\n", grouped)

# 多级分组
multi_grouped = df.groupby(['城市', '性别']).agg({
    '薪资': 'mean',
    '年龄': ['min', 'max']
})

# 分组后筛选
high_avg_salary = df.groupby('城市').filter(lambda x: x['薪资'].mean() > 25000)

# 分组后转换
df['部门平均薪资'] = df.groupby('部门')['薪资'].transform('mean')
```

### 7. 数据合并与连接：整合多个数据源

```python
# 创建两个示例DataFrame
df1 = pd.DataFrame({'员工ID': [1, 2, 3], '姓名': ['张三', '李四', '王五']})
df2 = pd.DataFrame({'员工ID': [2, 3, 4], '薪资': [15000, 18000, 20000]})

# 合并（类似SQL JOIN）
merged_inner = pd.merge(df1, df2, on='员工ID', how='inner')  # 内连接
merged_left = pd.merge(df1, df2, on='员工ID', how='left')  # 左连接
merged_outer = pd.merge(df1, df2, on='员工ID', how='outer')  # 外连接

# 拼接
concatenated = pd.concat([df1, df2], axis=0)  # 垂直拼接（增加行）
concatenated_horizontal = pd.concat([df1, df2], axis=1)  # 水平拼接（增加列）
```

### 8. 数据可视化：直观展示分析结果

```python
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 基本图表
df['薪资'].plot(kind='hist', bins=10, title='薪资分布直方图')
plt.show()

# 分组柱状图
df.groupby('城市')['薪资'].mean().plot(kind='bar', title='各城市平均薪资')
plt.show()

# 散点图
df.plot(kind='scatter', x='年龄', y='薪资', title='年龄与薪资关系')
plt.show()
```

## 🧪 第三部分：动手练习题

请完成以下练习题，巩固Pandas数据处理的核心操作。每道题都有预期输出和提示。

### 练习题1：数据读取与基本探索
创建一个学生成绩表并完成基本探索。

```python
import pandas as pd
import numpy as np

# 创建学生成绩DataFrame
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '孙七'],
    '数学': [85, 92, 78, 65, 95],
    '语文': [90, 88, 85, 72, 96],
    '英语': [82, 90, 88, 70, 94],
    '班级': ['一班', '一班', '二班', '二班', '一班']
}
df = pd.DataFrame(data)

# 任务1：显示前3行数据
print("前3行：")
# 你的代码

# 任务2：显示数据形状和列名
print("\n数据形状：")
# 你的代码
print("列名：")
# 你的代码

# 任务3：计算每门课程的平均分
print("\n各科平均分：")
# 你的代码

# 任务4：计算每个学生的总分
print("\n每个学生总分：")
# 你的代码

# 任务5：找出数学成绩最高的学生
print("\n数学成绩最高的学生：")
# 你的代码
```

**预期输出**：
```
前3行：
   姓名  数学  语文  英语  班级
0  张三  85  90  82  一班
1  李四  92  88  90  一班
2  王五  78  85  88  二班

数据形状：
(5, 5)
列名：
['姓名', '数学', '语文', '英语', '班级']

各科平均分：
数学    83.0
语文    86.2
英语    84.8
dtype: float64

每个学生总分：
张三    257
李四    270
王五    251
赵六    207
孙七    285
dtype: int64

数学成绩最高的学生：
姓名    孙七
数学    95
语文    96
英语    94
班级    一班
Name: 4, dtype: object
```

**提示**：
- 使用`.head()`、`.shape`、`.columns`、`.mean()`等方法
- 求总分：`df[['数学', '语文', '英语']].sum(axis=1)`
- 找最高分：`df.loc[df['数学'].idxmax()]`

### 练习题2：数据清洗与处理
处理含有缺失值和重复值的数据。

```python
import pandas as pd
import numpy as np

# 创建含有缺失值和重复值的数据
data = {
    '订单号': ['A001', 'A002', 'A003', 'A001', 'A004'],
    '客户姓名': ['张三', '李四', '王五', np.nan, '赵六'],
    '金额': [150.5, 280.0, np.nan, 150.5, 320.0],
    '日期': ['2025-01-10', '2025-01-10', '2025-01-11', '2025-01-10', '2025-01-12']
}
df = pd.DataFrame(data)

print("原始数据：")
print(df)

# 任务1：删除完全重复的行
df_cleaned = # 你的代码
print("\n删除重复行后：")
print(df_cleaned)

# 任务2：用"未知"填充客户姓名的缺失值
df_cleaned['客户姓名'] = # 你的代码
print("\n填充客户姓名后：")
print(df_cleaned)

# 任务3：用金额的平均值填充缺失的金额
mean_amount = # 你的代码
df_cleaned['金额'] = # 你的代码
print("\n填充金额后：")
print(df_cleaned)

# 任务4：将日期列转换为datetime类型
df_cleaned['日期'] = # 你的代码
print("\n日期类型转换后：")
print(df_cleaned.dtypes)
```

**预期输出**：
```
原始数据：
  订单号 客户姓名   金额        日期
0  A001    张三  150.5  2025-01-10
1  A002    李四  280.0  2025-01-10
2  A003    王五   NaN  2025-01-11
3  A001    NaN  150.5  2025-01-10
4  A004    赵六  320.0  2025-01-12

删除重复行后：
  订单号 客户姓名   金额        日期
0  A001    张三  150.5  2025-01-10
1  A002    李四  280.0  2025-01-10
2  A003    王五   NaN  2025-01-11
4  A004    赵六  320.0  2025-01-12

填充客户姓名后：
  订单号 客户姓名   金额        日期
0  A001    张三  150.5  2025-01-10
1  A002    李四  280.0  2025-01-10
2  A003    王五   NaN  2025-01-11
4  A004    赵六  320.0  2025-01-12

填充金额后：
  订单号 客户姓名        金额        日期
0  A001    张三  150.500000  2025-01-10
1  A002    李四  280.000000  2025-01-10
2  A003    王五  250.166667  2025-01-11
4  A004    赵六  320.000000  2025-01-12

日期类型转换后：
订单号               object
客户姓名             object
金额               float64
日期       datetime64[ns]
dtype: object
```

**提示**：
- 使用`.drop_duplicates()`删除重复行
- 使用`.fillna()`填充缺失值
- 使用`.mean()`计算平均值
- 使用`pd.to_datetime()`转换日期类型

### 练习题3：数据筛选与分组聚合
分析销售数据，完成分组统计。

```python
import pandas as pd
import numpy as np

# 创建销售数据
data = {
    '销售员': ['张三', '李四', '王五', '张三', '李四', '王五', '张三', '李四'],
    '产品类别': ['电子产品', '电子产品', '电子产品', '日用品', '日用品', '日用品', '电子产品', '日用品'],
    '销售额': [15000, 18000, 22000, 8000, 12000, 9500, 17000, 11000],
    '月份': ['2025-01', '2025-01', '2025-01', '2025-01', '2025-02', '2025-02', '2025-02', '2025-02']
}
df = pd.DataFrame(data)

print("销售数据：")
print(df)

# 任务1：按销售员分组，计算总销售额
sales_by_salesman = # 你的代码
print("\n每个销售员总销售额：")
print(sales_by_salesman)

# 任务2：按产品类别分组，计算平均销售额
avg_sales_by_category = # 你的代码
print("\n每个产品类别平均销售额：")
print(avg_sales_by_category)

# 任务3：按月份和产品类别分组，计算总销售额
sales_by_month_category = # 你的代码
print("\n每月各类产品总销售额：")
print(sales_by_month_category)

# 任务4：找出销售额最高的销售员
top_salesman = # 你的代码
print("\n销售额最高的销售员：")
print(top_salesman)

# 任务5：计算每月销售总额
monthly_total = # 你的代码
print("\n每月销售总额：")
print(monthly_total)
```

**预期输出**：
```
销售数据：
  销售员  产品类别   销售额      月份
0  张三  电子产品  15000  2025-01
1  李四  电子产品  18000  2025-01
2  王五  电子产品  22000  2025-01
3  张三    日用品   8000  2025-01
4  李四    日用品  12000  2025-02
5  王五    日用品   9500  2025-02
6  张三  电子产品  17000  2025-02
7  李四    日用品  11000  2025-02

每个销售员总销售额：
销售员
张三    40000
李四    41000
王五    31500
Name: 销售额, dtype: int64

每个产品类别平均销售额：
产品类别
电子产品    18000.000000
日用品     10125.000000
Name: 销售额, dtype: float64

每月各类产品总销售额：
月份      产品类别
2025-01  电子产品    55000
          日用品      8000
2025-02  电子产品    17000
          日用品     32500
Name: 销售额, dtype: int64

销售额最高的销售员：
销售员    李四
销售额    41000
Name: 销售额, dtype: object

每月销售总额：
月份
2025-01    63000
2025-02    49500
Name: 销售额, dtype: int64
```

**提示**：
- 使用`.groupby()`进行分组
- 使用`.agg()`进行聚合计算
- 使用`.sum()`、`.mean()`等聚合函数
- 多级分组：`df.groupby(['月份', '产品类别'])['销售额'].sum()`

### 练习题4：数据合并与连接
合并两个相关的数据集。

```python
import pandas as pd

# 创建员工信息表
employees = pd.DataFrame({
    '员工ID': [1, 2, 3, 4],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '部门': ['技术部', '市场部', '技术部', '财务部']
})

# 创建薪资信息表
salaries = pd.DataFrame({
    '员工ID': [1, 2, 3, 5],
    '薪资': [15000, 18000, 20000, 22000],
    '奖金': [3000, 4000, 3500, 5000]
})

print("员工信息表：")
print(employees)
print("\n薪资信息表：")
print(salaries)

# 任务1：内连接（只保留两边都有的员工）
inner_merged = # 你的代码
print("\n内连接结果：")
print(inner_merged)

# 任务2：左连接（保留所有员工信息，薪资缺失用NaN）
left_merged = # 你的代码
print("\n左连接结果：")
print(left_merged)

# 任务3：外连接（保留所有记录，缺失部分用NaN）
outer_merged = # 你的代码
print("\n外连接结果：")
print(outer_merged)

# 任务4：计算每个员工的总收入（薪资+奖金）
merged = pd.merge(employees, salaries, on='员工ID', how='left')
merged['总收入'] = # 你的代码
print("\n员工总收入表：")
print(merged)

# 任务5：计算各部门平均总收入
dept_avg_income = # 你的代码
print("\n各部门平均总收入：")
print(dept_avg_income)
```

**预期输出**：
```
员工信息表：
   员工ID  姓名   部门
0     1  张三  技术部
1     2  李四  市场部
2     3  王五  技术部
3     4  赵六  财务部

薪资信息表：
   员工ID    薪资    奖金
0     1  15000  3000
1     2  18000  4000
2     3  20000  3500
3     5  22000  5000

内连接结果：
   员工ID  姓名   部门    薪资    奖金
0     1  张三  技术部  15000  3000
1     2  李四  市场部  18000  4000
2     3  王五  技术部  20000  3500

左连接结果：
   员工ID  姓名   部门    薪资    奖金
0     1  张三  技术部  15000.0  3000.0
1     2  李四  市场部  18000.0  4000.0
2     3  王五  技术部  20000.0  3500.0
3     4  赵六  财务部     NaN     NaN

外连接结果：
   员工ID  姓名   部门      薪资      奖金
0   1.0  张三  技术部  15000.0  3000.0
1   2.0  李四  市场部  18000.0  4000.0
2   3.0  王五  技术部  20000.0  3500.0
3   4.0  赵六  财务部     NaN     NaN
4   5.0  NaN   NaN  22000.0  5000.0

员工总收入表：
   员工ID  姓名   部门      薪资      奖金     总收入
0     1  张三  技术部  15000.0  3000.0  18000.0
1     2  李四  市场部  18000.0  4000.0  22000.0
2     3  王五  技术部  20000.0  3500.0  23500.0
3     4  赵六  财务部     NaN     NaN      NaN

各部门平均总收入：
部门
技术部    20750.0
市场部    22000.0
财务部       NaN
Name: 总收入, dtype: float64
```

**提示**：
- 使用`pd.merge()`进行合并操作
- 指定`on`参数为连接键
- 指定`how`参数为连接方式（'inner'、'left'、'outer'、'right'）
- 总收入计算：`merged['薪资'] + merged['奖金']`
- 注意处理NaN值，可使用`.fillna(0)`或`.dropna()`

### 练习题5：综合应用 - 电商用户行为分析
分析电商平台的用户行为数据。

```python
import pandas as pd
import numpy as np

# 创建用户行为数据
data = {
    '用户ID': [1001, 1002, 1003, 1001, 1002, 1003, 1001, 1004, 1005],
    '行为类型': ['浏览', '浏览', '购买', '购买', '收藏', '浏览', '购买', '浏览', '购买'],
    '商品类别': ['电子产品', '日用品', '电子产品', '日用品', '电子产品', '日用品', '电子产品', '日用品', '电子产品'],
    '金额': [np.nan, np.nan, 2999.0, 199.0, np.nan, np.nan, 1899.0, np.nan, 3599.0],
    '时间戳': ['2025-01-10 09:30', '2025-01-10 10:15', '2025-01-10 11:20',
              '2025-01-10 14:45', '2025-01-10 16:10', '2025-01-11 09:05',
              '2025-01-11 10:30', '2025-01-11 11:15', '2025-01-11 15:40']
}

df = pd.DataFrame(data)
df['时间戳'] = pd.to_datetime(df['时间戳'])

print("原始数据：")
print(df)

# 任务1：统计每种行为类型的次数
behavior_counts = # 你的代码
print("\n行为类型统计：")
print(behavior_counts)

# 任务2：计算每个用户的购买总金额
purchase_df = df[df['行为类型'] == '购买'].copy()
purchase_df['金额'] = purchase_df['金额'].fillna(0)
user_purchase_total = # 你的代码
print("\n每个用户购买总金额：")
print(user_purchase_total)

# 任务3：找出购买次数最多的用户
top_buyer = # 你的代码
print("\n购买次数最多的用户：")
print(top_buyer)

# 任务4：按商品类别统计购买次数和总金额
category_stats = # 你的代码
print("\n各商品类别购买统计：")
print(category_stats)

# 任务5：分析用户行为的时间分布（按小时统计行为次数）
df['小时'] = df['时间戳'].dt.hour
hourly_behavior = # 你的代码
print("\n每小时行为次数统计：")
print(hourly_behavior)
```

**预期输出**：
```
原始数据：
   用户ID 行为类型  商品类别     金额               时间戳
0  1001   浏览  电子产品    NaN 2025-01-10 09:30:00
1  1002   浏览    日用品    NaN 2025-01-10 10:15:00
2  1003   购买  电子产品  2999.0 2025-01-10 11:20:00
3  1001   购买    日用品   199.0 2025-01-10 14:45:00
4  1002   收藏  电子产品    NaN 2025-01-10 16:10:00
5  1003   浏览    日用品    NaN 2025-01-11 09:05:00
6  1001   购买  电子产品  1899.0 2025-01-11 10:30:00
7  1004   浏览    日用品    NaN 2025-01-11 11:15:00
8  1005   购买  电子产品  3599.0 2025-01-11 15:40:00

行为类型统计：
行为类型
浏览    4
购买    4
收藏    1
Name: 行为类型, dtype: int64

每个用户购买总金额：
用户ID
1001    2098.0
1003    2999.0
1005    3599.0
Name: 金额, dtype: float64

购买次数最多的用户：
用户ID    1001
购买次数      2
Name: 行为类型, dtype: object

各商品类别购买统计：
         购买次数  总金额
商品类别                   
电子产品      3  8497.0
日用品        1   199.0

每小时行为次数统计：
小时
9     2
10    2
11    2
14    1
15    1
16    1
Name: 行为类型, dtype: int64
```

**提示**：
- 使用`.value_counts()`统计频次
- 筛选购买行为：`df[df['行为类型'] == '购买']`
- 分组统计：`df.groupby('用户ID')['金额'].sum()`
- 时间提取：`df['时间戳'].dt.hour`

## ❓ 第四部分：常见问题解答

### 问题1：DataFrame和Series有什么区别？什么时候用哪个？
**回答**：
- **Series**：一维数据结构，类似带标签的数组或Excel中的一列数据。适用于单个变量或特征的数据存储和操作。
- **DataFrame**：二维表格数据结构，由多个Series组成，类似整个Excel工作表或数据库表。适用于多变量、多特征的数据集。
- **选择建议**：处理单列数据用Series，处理多列表格数据用DataFrame。DataFrame是数据分析的主要工具，Series是其基础组件。

### 问题2：loc和iloc有什么区别？如何正确使用？
**回答**：
- **loc**：基于标签的索引，使用行/列的名称进行选择。语法：`df.loc[行标签, 列标签]`。切片包含结束位置。
- **iloc**：基于位置的索引，使用整数位置进行选择。语法：`df.iloc[行位置, 列位置]`。切片不包含结束位置（Python标准）。
- **使用建议**：当知道具体标签时用loc；当知道具体位置时用iloc。避免混合使用导致混淆。

### 问题3：如何处理缺失值（NaN）？有哪些常用方法？
**回答**：
缺失值处理的常用方法：
1. **删除**：`df.dropna()` 删除包含NaN的行或列
2. **填充**：
   - 常数填充：`df.fillna(0)` 用0填充
   - 统计值填充：`df.fillna(df.mean())` 用列平均值填充
   - 前向/后向填充：`df.fillna(method='ffill')` 用前一个值填充
3. **插值**：`df.interpolate()` 用线性插值填充
4. **标记**：保留NaN但标记处理，在后续分析中特殊处理

选择方法需根据数据特点和业务需求决定。

### 问题4：groupby的工作原理是什么？有哪些常用聚合函数？
**回答**：
- **工作原理**：groupby遵循"拆分-应用-合并"模式：
  1. 拆分：根据指定键将数据分成多个组
  2. 应用：对每个组应用聚合函数（如求和、平均值等）
  3. 合并：将各组结果合并为新的DataFrame
- **常用聚合函数**：
  - `sum()`：求和
  - `mean()`：平均值
  - `count()`：计数
  - `min()/max()`：最小值/最大值
  - `std()`：标准差
  - `var()`：方差
  - `first()/last()`：第一个/最后一个值
- **高级用法**：可自定义聚合函数，或对不同列应用不同聚合。

### 问题5：如何优化Pandas性能？处理大数据时有哪些技巧？
**回答**：
性能优化技巧：
1. **使用向量化操作**：避免Python循环，使用Pandas内置函数
2. **选择合适的数据类型**：如用`category`类型处理低基数分类变量
3. **使用高效的方法**：
   - 用`.iloc`而非链式索引
   - 用`.loc`而非`.ix`（已弃用）
   - 用`.query()`方法优化复杂条件筛选
4. **内存优化**：
   - 使用`pd.read_csv(usecols=)`只读取需要的列
   - 对大数据使用分块读取：`pd.read_csv(chunksize=10000)`
   - 使用`df.memory_usage()`检查内存使用
5. **其他技巧**：
   - 避免在循环中修改DataFrame
   - 使用`.copy()`显式复制数据
   - 考虑使用Dask或Polars处理超大数据集

## 🚀 第五部分：扩展学习建议

### 1. 下一步学习方向

完成Pandas学习后，你已经掌握了数据分析的核心工具。接下来建议的学习路径：

1. **Matplotlib数据可视化**（Day 19）
   - 基本图表绘制（折线图、柱状图、散点图）
   - 多子图布局
   - 自定义样式和颜色
   - 交互式可视化

2. **机器学习入门**（Day 20）
   - 监督学习基本概念
   - 常用算法简介（线性回归、KNN、决策树）
   - 模型评估方法
   - Scikit-learn库使用

3. **实战项目深化**
   - 完整数据分析项目
   - 数据清洗与特征工程
   - 模型构建与评估
   - 结果可视化与报告

### 2. 实践项目推荐

通过实际项目巩固Pandas技能：

1. **电商用户行为分析项目**
   - 数据来源：模拟电商平台用户行为数据
   - 分析内容：用户活跃时段、购买偏好、用户价值分层
   - 技能应用：数据清洗、分组聚合、可视化

2. **股票数据分析项目**
   - 数据来源：公开股票历史数据（CSV格式）
   - 分析内容：股价趋势、波动性分析、相关性分析
   - 技能应用：时间序列处理、数据合并、统计计算

3. **社交媒体情感分析项目**
   - 数据来源：社交媒体评论数据
   - 分析内容：情感倾向、关键词提取、趋势分析
   - 技能应用：文本数据处理、分组统计、可视化

### 3. 资源拓展

1. **官方文档深入学习**
   - Pandas官方文档：https://pandas.pydata.org/docs/
   - 用户指南：https://pandas.pydata.org/docs/user_guide/index.html
   - API参考：https://pandas.pydata.org/docs/reference/index.html

2. **进阶书籍推荐**
   - 《Python数据科学手册》第3章（Pandas详解）
   - 《利用Python进行数据分析》第5-12章（Pandas实战）
   - 《Pandas Cookbook》第二版（高级技巧与最佳实践）

3. **相关库学习**
   - **Scikit-learn**：机器学习库，与Pandas无缝集成
   - **Seaborn**：统计可视化库，基于Matplotlib和Pandas
   - **Plotly**：交互式可视化库，支持Pandas DataFrame

### 4. 学习技巧

1. **项目驱动学习**：通过实际项目学习Pandas，边做边学
2. **文档习惯**：遇到新函数先看官方文档，理解参数和返回值
3. **代码复用**：积累常用数据处理代码片段，形成个人工具库
4. **性能意识**：培养数据处理的性能意识，学习优化技巧
5. **社区参与**：关注Pandas社区，学习最新功能和最佳实践

---

**今日学习目标检查**：
- [ ] 成功安装Pandas库并验证版本
- [ ] 理解DataFrame和Series的核心概念与区别
- [ ] 掌握多种数据格式的读取与写入方法
- [ ] 熟练使用数据探索和清洗的基本操作
- [ ] 掌握数据筛选与索引的多种方法
- [ ] 理解分组聚合的原理并熟练应用
- [ ] 掌握数据合并与连接的基本操作
- [ ] 完成至少4道练习题
- [ ] 了解Pandas在数据分析中的核心作用

祝你学习顺利！如果在学习过程中遇到问题，可以参考视频教程或查阅Pandas官方文档。明天我们将深入学习[[Day19_数据可视化Matplotlib|Matplotlib数据可视化]]库，将数据分析结果转化为直观的图表。