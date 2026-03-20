---
title: Day30 词向量与Word2Vec
date: 2026-03-09
tags:
  - NLP
  - 词向量
  - Word2Vec
  - 深度学习
aliases:
  - Day30_词向量与Word2Vec
  - 词向量与Word2Vec
previous:
  - null
next:
  - Day31_RNN与LSTM基础
---

# Day 30：词向量与Word2Vec

## 一、核心理论讲解

### 1.1 词向量：从离散符号到连续语义空间

**什么是词向量？**
词向量（Word Embeddings）是自然语言处理中的核心概念，它将离散的词汇符号映射到低维、稠密的实数向量空间中。这种映射使得语义相似的词汇在向量空间中的距离更近，从而让计算机能够“理解”词汇间的语义关系。

**传统方法的局限性：One-Hot编码**
在Word2Vec出现之前，最常用的文本表示方法是独热编码（One-Hot Encoding）。假设词表大小为V，每个词被表示为一个长度为V的向量，其中只有一个位置为1（对应词汇在词表中的索引），其余位置为0。

**One-Hot编码的三大缺陷：**
1. **维度灾难**：词表通常有数万到数百万词汇，导致向量维度极高
2. **语义鸿沟**：任意两个词的向量都是正交的（内积为0），无法反映语义相似性
3. **稀疏低效**：向量中绝大多数元素为0，计算和存储效率低下

**词向量的核心价值：分布式表示**
词向量采用分布式表示（Distributed Representation），其核心思想基于**分布假说（Distributional Hypothesis）**：
> "上下文相似的词，其语义也相似"

一个词的语义由其上下文的分布决定，这种表示方式具有以下优势：
- **低维稠密**：通常50-300维，相比One-Hot极大降低维度
- **语义捕捉**：相似词汇在向量空间距离相近
- **可计算性**：支持向量运算（相似度、类比关系等）

**词向量的数学本质：**
从数学角度看，词向量学习实际上是在寻找一个映射函数 f: V → ℝᵈ，其中 V 是词汇表，d 是向量维度。这个函数需要满足：
1. **语义相似性保持**：对于语义相似的词 wᵢ 和 wⱼ，应有 cos(f(wᵢ), f(wⱼ)) ≈ 1
2. **语义差异性区分**：对于语义不相关的词，应有 cos(f(wᵢ), f(wⱼ)) ≈ 0
3. **线性关系保持**：对于类比关系 wᵢ : wⱼ :: wₖ : wₗ，应有 f(wⱼ) - f(wᵢ) ≈ f(wₗ) - f(wₖ)

**词向量学习的三种范式：**
1. **基于计数的方法**：如LSA，通过矩阵分解学习词向量
   - 优点：充分利用全局统计信息
   - 缺点：无法处理罕见词，对词序不敏感
   
2. **基于预测的方法**：如Word2Vec，通过神经网络预测任务学习
   - 优点：能捕捉复杂语义关系，对罕见词友好
   - 缺点：需要大量数据，训练时间长
   
3. **基于模型的方法**：如GloVe，结合计数与预测的优势
   - 优点：平衡全局信息与局部预测
   - 缺点：实现相对复杂

**词向量质量评估指标：**
- **内部评估**：
  - 相似度任务：计算词向量相似度与人工评分的相关性
  - 类比推理：测试"国王-男人+女人≈女王"等任务的准确率
  
- **外部评估**：
  - 下游任务表现：在文本分类、命名实体识别等任务上的性能提升
  - 聚类质量：词向量在无监督聚类中的表现

### 1.2 Word2Vec模型架构详解

Word2Vec是Google团队于2013年提出的革命性词向量学习框架，包含两种核心模型架构：

#### 1.2.1 CBOW模型：用上下文预测中心词

**模型原理：**
- **任务**：给定上下文词（Context Words），预测中心词（Target Word）
- **输入**：上下文窗口内的词向量（通常求和或取平均）
- **输出**：中心词在词汇表上的概率分布（通过Softmax）
- **网络结构**：输入层→隐藏层（平均池化）→输出层

**数学形式：**
对于上下文窗口大小为m，中心词为wₜ，上下文词为{wₜ₋ₘ, ..., wₜ₋₁, wₜ₊₁, ..., wₜ₊ₘ}
- 隐藏层表示：h = (1/2m) Σᵢ W₁·v(wₜ₊ᵢ)
- 输出概率：P(wₜ|context) = softmax(W₂ᵀ·h)

**CBOW特点：**
- 训练速度快（上下文平均减少计算量）
- 对高频词表现较好
- 适合小数据集

#### 1.2.2 Skip-gram模型：用中心词预测上下文

**模型原理：**
- **任务**：给定中心词，预测其上下文词
- **输入**：中心词向量
- **输出**：上下文窗口内每个词的概率分布
- **网络结构**：输入层→隐藏层→多个输出层（每个上下文位置一个）

**数学形式：**
对于中心词wₜ和上下文词wₜ₊ⱼ：
- P(wₜ₊ⱼ|wₜ) = softmax(W₂ᵀ·W₁·v(wₜ))

**Skip-gram特点：**
- 训练速度相对较慢
- 对低频词更友好，语义捕捉能力更强
- 在大数据集上通常优于CBOW

**两种模型的直观对比：**
- **CBOW**：“这部电影______好看” → 预测“非常”
- **Skip-gram**：“非常” → 预测“这部电影”“好看”

### 1.3 关键技术优化：负采样与层次Softmax

原始Word2Vec使用全词表Softmax计算概率，当词表大小V达到10万时，每次训练需要计算10万维向量，计算量极大。为解决这一问题，引入了两种关键技术：

#### 1.3.1 负采样（Negative Sampling）

**核心思想：**
将多分类问题转化为二分类问题。对于每个正样本（中心词，上下文词）对，同时采样k个负样本（不应该是该上下文的词）。

**损失函数：**
L = -log σ(uₜ·v_c) - Σᵢ 𝔼_{cᵢ∼V} [log σ(-uₜ·v_{cᵢ})]
其中：
- σ为Sigmoid函数
- uₜ为中心词向量
- v_c为上下文词向量
- k通常取5-20

**优势：**
- 计算复杂度从O(V)降至O(k+1) ≈ O(1)
- 训练效率大幅提升
- 实际应用中最常用的优化方法

#### 1.3.2 层次Softmax（Hierarchical Softmax）

**核心思想：**
使用哈夫曼树（Huffman Tree）组织词表，将概率计算转化为树路径遍历。

**实现原理：**
1. 根据词频构建哈夫曼树，高频词路径短
2. 每个内部节点有可学习的参数向量
3. 预测词的概率 = 从根节点到叶节点路径的概率乘积

**数学形式：**
P(w|context) = ∏_{l=1}^{L(w)-1} σ(⟦n(w,l+1) = leftChild(n(w,l))⟧ · θ_{n(w,l)}·v_context)

**优势：**
- 计算复杂度从O(V)降至O(log V)
- 对高频词特别高效

### 1.4 词向量的神奇特性与应用

#### 1.4.1 线性类比关系

词向量最神奇的特性是能够捕捉词汇间的线性关系：

**经典示例：**
- 国王 - 男人 + 女人 ≈ 女王
- 巴黎 - 法国 + 意大利 ≈ 罗马
- 快速 - 慢速 + 温柔 ≈ 温柔地

**数学表达：**
vec("king") - vec("man") + vec("woman") ≈ vec("queen")

#### 1.4.2 相似度计算

词向量支持多种相似度度量方法：
1. **余弦相似度**：最常用，衡量方向相似性
   ```python
   similarity = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
   ```
2. **欧氏距离**：衡量绝对距离
3. **曼哈顿距离**：衡量网格距离

#### 1.4.3 实际应用场景

1. **文本相似度计算**：新闻推荐、问答匹配
2. **词义消歧**：根据上下文确定多义词含义
3. **情感分析**：词汇情感倾向性判断
4. **机器翻译**：跨语言语义对齐
5. **推荐系统**：物品描述向量化

### 1.5 高级词向量技术演进

#### 1.5.1 GloVe：全局向量词表示

**提出时间**：2014年，斯坦福大学
**核心思想**：融合全局共现统计与局部上下文预测的优势

**模型公式：**
J = Σ_{i,j=1}^{V} f(X_{ij}) (w_i·w̃_j + b_i + b̃_j - log X_{ij})²
其中：
- X_{ij}为词i和j的共现频次
- f(X_{ij})为加权函数，降低高频共现的权重

**优势：**
- 同时考虑局部和全局信息
- 在多项NLP任务中表现优于Word2Vec

#### 1.5.2 FastText：子词信息增强

**提出时间**：2016年，Facebook
**核心创新**：引入子词（subword）表示

**实现原理：**
- 将词拆分为字符n-gram（如"apple" → "<ap", "app", "ppl", "ple", "le>"）
- 词向量 = 所有子词向量的平均

**优势：**
1. **处理未登录词**：即使未见过的词，也能通过子词生成向量
2. **形态学丰富语言**：对德语、芬兰语等形态复杂语言更有效
3. **拼写变体鲁棒性**：对拼写错误有一定容忍度

#### 1.5.3 从静态到动态：上下文词向量

**静态词向量局限**：
- 每个词只有单一向量表示
- 无法处理一词多义（如"苹果"既可指水果，也可指公司）

**动态词向量革命**：
- **ELMo**（2018）：双向LSTM，为每个词生成上下文相关向量
- **BERT**（2018）：Transformer编码器，彻底改变NLP格局
- **GPT系列**（2018-2023）：自回归Transformer，推动大语言模型发展

## 二、最新视频教程推荐（2025-2026）

### 2.1 系统性入门课程

**1. 黑马程序员《Word2Vec实战：从原理到工业应用》（2026新课）**
- **课程时长**：25小时，聚焦词向量全流程
- **核心内容**：
  - Word2Vec原理解析（Skip-gram vs CBOW）
  - Gensim库实战训练
  - 词向量质量评估方法
  - 工业级应用案例（推荐系统、文本匹配）
- **特色亮点**：
  - 包含中文语料特殊处理技巧
  - 实际项目：新闻相似度推荐系统
  - 性能优化与生产部署指南
- **获取方式**：B站搜索"黑马程序员Word2Vec 2026"

**2. 莫烦Python《PyTorch实现Word2Vec与词向量应用》（2025升级版）**
- **课程时长**：15小时，代码驱动学习
- **核心模块**：
  - 从零实现Skip-gram模型
  - 负采样与层次Softmax实现
  - 词向量可视化与评估
  - 下游任务迁移学习
- **教学特色**：
  - 每个算法都有可运行的PyTorch实现
  - 对比不同优化技术的效果差异
  - 提供多种数据集实践
- **获取方式**：莫烦Python官网"深度学习/NLP专题"

**3. 跟李沐学AI《动手学词向量：理论与实践》**
- **课程深度**：从数学原理到工程实践
- **核心价值**：
  - 深入理解词向量背后的数学原理
  - 掌握词向量训练中的常见陷阱
  - 学习大规模语料处理技巧
- **发布时间**：2025年持续更新
- **观看地址**：B站"跟李沐学AI"专栏

### 2.2 专项技能提升课程

**4. Kaggle实战课《用Word2Vec赢得NLP竞赛》**
- **实战导向**：4小时密集实战
- **核心技巧**：
  - 竞赛数据预处理最佳实践
  - 超参数调优策略
  - 词向量特征工程
  - 集成学习方法
- **项目案例**：
  - Quora Question Pairs比赛
  - Toxic Comment Classification
- **资源链接**：Kaggle官方Courses → NLP Track

**5. Hugging Face官方教程《从Word2Vec到Transformer词向量》**
- **前沿覆盖**：2026最新技术对比
- **学习路径**：
  - 传统词向量局限性分析
  - 上下文词向量优势详解
  - 实际场景选择指南
- **工具生态**：
  - transformers库完整使用
  - 预训练词向量加载与应用
- **免费访问**：huggingface.co/learn

### 2.3 中文NLP专项课程

**6. 中文词向量特训营《让AI理解中文语义》**
- **中文特色**：全面针对中文NLP挑战
- **核心技术**：
  - 中文分词与词向量协同优化
  - 中文多义词处理方案
  - 领域自适应词向量训练
- **实战项目**：
  - 中文新闻主题分类系统
  - 电商评论情感分析工具
- **课程平台**：阿里云天池/AI研习社

**7. 中文领域词向量构建指南**
- **行业应用**：医疗、金融、法律等垂直领域
- **核心方法**：
  - 领域语料收集与清洗
  - 领域专业词典构建
  - 混合通用与领域词向量
- **发布时间**：2026年Q1
- **学习价值**：解决实际业务中的词向量应用问题

## 三、动手练习题（5道）

### 练习题1：从零实现Skip-gram模型（简化版）

**题目要求：**
1. 实现一个简化版的Skip-gram模型，仅使用负采样优化
2. 使用小型语料进行训练
3. 可视化训练损失变化
4. 测试相似词查找功能

**参考实现框架：**
```python
import numpy as np
import matplotlib.pyplot as plt
from collections import defaultdict, Counter

class SimpleSkipGram:
    def __init__(self, vocab_size, embedding_dim=50):
        self.vocab_size = vocab_size
        self.embedding_dim = embedding_dim
        # 中心词向量矩阵
        self.W1 = np.random.randn(vocab_size, embedding_dim) * 0.01
        # 上下文词向量矩阵
        self.W2 = np.random.randn(vocab_size, embedding_dim) * 0.01
        
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -20, 20)))
    
    def train_one_step(self, center_idx, context_idx, negative_samples, lr=0.01):
        """训练一个样本"""
        # 正样本损失
        u_center = self.W1[center_idx]  # 中心词向量
        v_context = self.W2[context_idx]  # 上下文词向量
        
        # 正样本得分
        pos_score = np.dot(u_center, v_context)
        pos_loss = -np.log(self.sigmoid(pos_score))
        
        # 负样本损失
        neg_loss = 0
        for neg_idx in negative_samples:
            v_neg = self.W2[neg_idx]
            neg_score = np.dot(u_center, v_neg)
            neg_loss += -np.log(self.sigmoid(-neg_score))
        
        total_loss = pos_loss + neg_loss
        
        # 计算梯度
        # 正样本梯度
        pos_grad = (self.sigmoid(pos_score) - 1) * v_context
        # 更新中心词向量
        self.W1[center_idx] -= lr * pos_grad
        
        # 上下文词向量梯度
        context_grad = (self.sigmoid(pos_score) - 1) * u_center
        self.W2[context_idx] -= lr * context_grad
        
        # 负样本梯度
        for neg_idx in negative_samples:
            v_neg = self.W2[neg_idx]
            neg_score = np.dot(u_center, v_neg)
            neg_grad = self.sigmoid(neg_score) * u_center
            self.W2[neg_idx] -= lr * neg_grad
        
        return total_loss
    
    def get_similar_words(self, word_idx, top_k=5):
        """查找相似词"""
        word_vec = self.W1[word_idx]
        # 计算余弦相似度
        similarities = []
        for i in range(self.vocab_size):
            if i != word_idx:
                other_vec = self.W1[i]
                sim = np.dot(word_vec, other_vec) / (
                    np.linalg.norm(word_vec) * np.linalg.norm(other_vec)
                )
                similarities.append((i, sim))
        
        # 按相似度排序
        similarities.sort(key=lambda x: x[1], reverse=True)
        return similarities[:top_k]

# 示例用法
if __name__ == "__main__":
    # 构建小型语料
    corpus = [
        ["自然", "语言", "处理", "是", "人工智能", "重要", "分支"],
        ["深度", "学习", "推动", "自然", "语言", "处理", "发展"],
        ["词向量", "是", "自然", "语言", "处理", "基础", "技术"]
    ]
    
    # 构建词表
    word_freq = Counter()
    for sentence in corpus:
        word_freq.update(sentence)
    
    vocab = {word: idx for idx, (word, _) in enumerate(word_freq.items())}
    vocab_size = len(vocab)
    
    # 创建模型
    model = SimpleSkipGram(vocab_size, embedding_dim=30)
    
    # 简单训练循环
    losses = []
    for epoch in range(100):
        epoch_loss = 0
        for sentence in corpus:
            # 简单跳过复杂的采样逻辑
            pass  # 这里需要实现完整的训练样本生成
        losses.append(epoch_loss)
    
    # 可视化损失
    plt.plot(losses)
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Skip-gram Training Loss')
    plt.show()
```

### 练习题2：使用Gensim训练中文词向量

**题目要求：**
1. 使用jieba进行中文分词
2. 使用Gensim的Word2Vec训练词向量
3. 探索不同的超参数影响
4. 实现词向量可视化

**参考实现：**
```python
import jieba
import numpy as np
from gensim.models import Word2Vec
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['Noto Sans CJK JP']
plt.rcParams['axes.unicode_minus'] = False

class ChineseWord2Vec:
    def __init__(self, sentences=None, vector_size=100, window=5, min_count=5):
        self.sentences = sentences
        self.vector_size = vector_size
        self.window = window
        self.min_count = min_count
        self.model = None
        
    def preprocess_chinese(self, text_list):
        """中文文本预处理"""
        processed = []
        for text in text_list:
            # 分词
            words = jieba.lcut(text)
            # 去除空格和空字符
            words = [w.strip() for w in words if w.strip()]
            processed.append(words)
        return processed
    
    def train(self, corpus_texts, sg=1, workers=4, epochs=10):
        """训练Word2Vec模型"""
        # 预处理
        processed_corpus = self.preprocess_chinese(corpus_texts)
        
        # 训练模型
        self.model = Word2Vec(
            sentences=processed_corpus,
            vector_size=self.vector_size,
            window=self.window,
            min_count=self.min_count,
            sg=sg,  # 1=Skip-gram, 0=CBOW
            workers=workers,
            epochs=epochs
        )
        
        return self.model
    
    def visualize_word_vectors(self, words_list, save_path=None):
        """可视化词向量"""
        if not self.model:
            print("请先训练模型")
            return
            
        # 收集词向量
        vectors = []
        labels = []
        for word in words_list:
            if word in self.model.wv:
                vectors.append(self.model.wv[word])
                labels.append(word)
        
        if len(vectors) < 2:
            print("有效词汇不足，无法可视化")
            return
            
        vectors = np.array(vectors)
        
        # PCA降维到2D
        pca = PCA(n_components=2)
        vectors_2d = pca.fit_transform(vectors)
        
        # 绘图
        plt.figure(figsize=(12, 8))
        plt.scatter(vectors_2d[:, 0], vectors_2d[:, 1], alpha=0.7)
        
        # 标注词
        for i, label in enumerate(labels):
            plt.annotate(
                label,
                xy=(vectors_2d[i, 0], vectors_2d[i, 1]),
                xytext=(5, 2),
                textcoords='offset points',
                fontsize=12,
                alpha=0.8
            )
        
        plt.title(f'中文词向量可视化 (维度: {self.vector_size})')
        plt.xlabel('PCA Component 1')
        plt.ylabel('PCA Component 2')
        plt.grid(True, alpha=0.3)
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        plt.show()
        return vectors_2d, labels
    
    def analogical_reasoning(self, word_a, word_b, word_c, top_k=5):
        """词汇类比推理"""
        if not all(w in self.model.wv for w in [word_a, word_b, word_c]):
            print("部分词汇不在词表中")
            return
            
        # 计算：word_b - word_a + word_c
        vec_result = self.model.wv[word_b] - self.model.wv[word_a] + self.model.wv[word_c]
        
        # 查找最相似的词
        similar_words = self.model.wv.similar_by_vector(vec_result, topn=top_k+3)
        
        # 过滤掉输入的词
        result = []
        for word, score in similar_words:
            if word not in [word_a, word_b, word_c]:
                result.append((word, score))
            if len(result) >= top_k:
                break
                
        return result

# 示例使用
if __name__ == "__main__":
    # 示例中文语料
    chinese_corpus = [
        "自然语言处理是人工智能的重要分支",
        "深度学习技术推动自然语言处理快速发展",
        "词向量是自然语言处理的基础技术",
        "中文分词是中文自然语言处理的关键步骤",
        "BERT模型在多项自然语言处理任务中取得突破"
    ]
    
    # 创建词向量训练器
    word2vec_trainer = ChineseWord2Vec(vector_size=100, window=5, min_count=1)
    
    # 训练模型
    model = word2vec_trainer.train(chinese_corpus, sg=1, epochs=20)
    
    # 测试相似词
    test_words = ["自然语言", "人工智能", "深度学习", "词向量", "分词"]
    for word in test_words:
        if word in model.wv:
            similar = model.wv.most_similar(word, topn=3)
            print(f"'{word}'的相似词: {similar}")
    
    # 可视化
    viz_words = ["自然", "语言", "处理", "智能", "深度", "学习", "向量", "模型"]
    word2vec_trainer.visualize_word_vectors(viz_words, save_path="chinese_word_vectors.png")
    
    # 类比推理测试
    analogy = word2vec_trainer.analogical_reasoning("自然", "语言", "处理", top_k=3)
    print(f"类比推理结果: {analogy}")
```

### 练习题3：词向量质量评估与对比

**题目要求：**
1. 使用不同超参数训练多个Word2Vec模型
2. 设计词向量质量评估指标
3. 对比不同模型在相似度计算任务上的表现
4. 分析超参数对模型性能的影响

**参考实现框架：**
```python
import numpy as np
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import matplotlib.pyplot as plt

class Word2VecEvaluator:
    def __init__(self, test_pairs, analogy_tests):
        """
        test_pairs: [(word1, word2, human_score), ...] 相似度测试对
        analogy_tests: [(a, b, c, expected_d), ...] 类比推理测试
        """
        self.test_pairs = test_pairs
        self.analogy_tests = analogy_tests
        
    def evaluate_model(self, model, model_name="model"):
        """评估单个模型"""
        results = {}
        
        # 1. 相似度计算评估
        similarities = []
        human_scores = []
        
        for word1, word2, human_score in self.test_pairs:
            if word1 in model.wv and word2 in model.wv:
                vec1 = model.wv[word1]
                vec2 = model.wv[word2]
                sim = cosine_similarity([vec1], [vec2])[0][0]
                similarities.append(sim)
                human_scores.append(human_score)
        
        if similarities:
            # 计算Spearman相关系数
            from scipy.stats import spearmanr
            corr, p_value = spearmanr(similarities, human_scores)
            results['similarity_correlation'] = corr
            results['similarity_p_value'] = p_value
            results['valid_pairs'] = len(similarities)
        
        # 2. 类比推理评估
        correct = 0
        total = 0
        
        for a, b, c, expected_d in self.analogy_tests:
            if all(w in model.wv for w in [a, b, c, expected_d]):
                # 计算 b - a + c
                vec_result = model.wv[b] - model.wv[a] + model.wv[c]
                
                # 查找最相似的词（排除a,b,c）
                similar_words = model.wv.similar_by_vector(vec_result, topn=10)
                
                # 检查预期词是否在前5个结果中
                top_words = [word for word, _ in similar_words[:5]]
                if expected_d in top_words:
                    correct += 1
                total += 1
        
        if total > 0:
            results['analogy_accuracy'] = correct / total
            results['analogy_total'] = total
        
        # 3. 词汇覆盖度
        all_test_words = set()
        for pair in self.test_pairs:
            all_test_words.add(pair[0])
            all_test_words.add(pair[1])
        
        covered = sum(1 for word in all_test_words if word in model.wv)
        results['vocab_coverage'] = covered / len(all_test_words) if all_test_words else 0
        
        return results
    
    def hyperparameter_sweep(self, corpus, param_grid, fixed_params=None):
        """超参数网格搜索"""
        if fixed_params is None:
            fixed_params = {}
        
        results = []
        
        # 生成所有参数组合
        from itertools import product
        param_names = list(param_grid.keys())
        param_values = list(param_grid.values())
        
        for param_combo in product(*param_values):
            params = dict(zip(param_names, param_combo))
            params.update(fixed_params)
            
            print(f"训练模型: {params}")
            
            # 训练模型
            model = Word2Vec(
                sentences=corpus,
                vector_size=params.get('vector_size', 100),
                window=params.get('window', 5),
                min_count=params.get('min_count', 5),
                sg=params.get('sg', 1),
                negative=params.get('negative', 5),
                workers=params.get('workers', 4),
                epochs=params.get('epochs', 10)
            )
            
            # 评估模型
            eval_results = self.evaluate_model(model, f"model_{len(results)}")
            eval_results.update(params)
            
            results.append(eval_results)
            
            print(f"评估结果: 相似度相关性={eval_results.get('similarity_correlation', 0):.3f}, "
                  f"类比准确率={eval_results.get('analogy_accuracy', 0):.3f}")
        
        return pd.DataFrame(results)

# 示例测试数据
test_similarity_pairs = [
    ("汽车", "轿车", 0.9),
    ("汽车", "火车", 0.6),
    ("苹果", "水果", 0.8),
    ("苹果", "手机", 0.7),
    ("学习", "教育", 0.85),
]

test_analogy_tests = [
    ("国王", "男人", "女人", "女王"),
    ("巴黎", "法国", "中国", "北京"),
    ("快速", "慢速", "高", "低"),
]

# 使用示例
if __name__ == "__main__":
    # 准备语料（这里需要真实语料）
    # corpus = ...  # 分词后的语料列表
    
    # 创建评估器
    evaluator = Word2VecEvaluator(test_similarity_pairs, test_analogy_tests)
    
    # 定义参数网格
    param_grid = {
        'vector_size': [50, 100, 200],
        'window': [3, 5, 8],
        'sg': [0, 1],  # 0=CBOW, 1=Skip-gram
        'negative': [5, 10, 20],
    }
    
    fixed_params = {
        'min_count': 5,
        'workers': 4,
        'epochs': 20,
    }
    
    # 执行网格搜索（需要真实语料）
    # results_df = evaluator.hyperparameter_sweep(corpus, param_grid, fixed_params)
    
    # 分析结果
    # print(results_df.sort_values('similarity_correlation', ascending=False).head())
    
    # 可视化
    # fig, axes = plt.subplots(1, 2, figsize=(15, 6))
    # 
    # # 相似度相关性vs向量维度
    # for sg_val in [0, 1]:
    #     subset = results_df[results_df['sg'] == sg_val]
    #     axes[0].scatter(subset['vector_size'], subset['similarity_correlation'], 
    #                    label=f"sg={sg_val}", alpha=0.7)
    # 
    # axes[0].set_xlabel('Vector Size')
    # axes[0].set_ylabel('Similarity Correlation')
    # axes[0].set_title('向量维度对相似度相关性的影响')
    # axes[0].legend()
    # axes[0].grid(True, alpha=0.3)
    # 
    # # 窗口大小vs类比准确率
    # for vector_size in [50, 100, 200]:
    #     subset = results_df[results_df['vector_size'] == vector_size]
    #     axes[1].scatter(subset['window'], subset['analogy_accuracy'], 
    #                    label=f"vec={vector_size}", alpha=0.7)
    # 
    # axes[1].set_xlabel('Window Size')
    # axes[1].set_ylabel('Analogy Accuracy')
    # axes[1].set_title('窗口大小对类比推理准确率的影响')
    # axes[1].legend()
    # axes[1].grid(True, alpha=0.3)
    # 
    # plt.tight_layout()
    # plt.show()
```

### 练习题4：词向量在文本分类中的应用

**题目要求：**
1. 使用预训练词向量初始化嵌入层
2. 构建基于词向量的文本分类模型
3. 对比使用预训练词向量和随机初始化的效果
4. 分析词向量维度对分类性能的影响

**参考实现：**
```python
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

class WordVectorTextClassifier(nn.Module):
    def __init__(self, vocab_size, embedding_dim, num_classes, 
                 pretrained_embeddings=None, freeze_embeddings=True):
        super().__init__()
        
        # 嵌入层
        if pretrained_embeddings is not None:
            self.embedding = nn.Embedding.from_pretrained(
                torch.FloatTensor(pretrained_embeddings),
                freeze=freeze_embeddings
            )
            self.embedding_dim = pretrained_embeddings.shape[1]
        else:
            self.embedding = nn.Embedding(vocab_size, embedding_dim)
            self.embedding_dim = embedding_dim
        
        # 文本编码器（简单版本：双向LSTM）
        self.lstm = nn.LSTM(
            input_size=self.embedding_dim,
            hidden_size=128,
            num_layers=2,
            bidirectional=True,
            batch_first=True,
            dropout=0.3
        )
        
        # 分类器
        self.fc = nn.Sequential(
            nn.Linear(128 * 2, 64),  # 双向LSTM，hidden_size * 2
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(64, num_classes)
        )
        
    def forward(self, x):
        # x shape: (batch_size, seq_len)
        
        # 词嵌入
        embedded = self.embedding(x)  # (batch_size, seq_len, embedding_dim)
        
        # LSTM编码
        lstm_out, (hidden, cell) = self.lstm(embedded)
        
        # 取最后一个时间步的隐藏状态
        # 双向LSTM：前向和后向的最后一个隐藏状态拼接
        forward_last = hidden[-2, :, :]  # 前向最后一层
        backward_last = hidden[-1, :, :]  # 后向最后一层
        combined = torch.cat((forward_last, backward_last), dim=1)
        
        # 分类
        output = self.fc(combined)
        
        return output

class TextClassificationPipeline:
    def __init__(self, max_vocab_size=10000, max_seq_len=100):
        self.max_vocab_size = max_vocab_size
        self.max_seq_len = max_seq_len
        self.word2idx = {}
        self.idx2word = {}
        
    def build_vocab(self, texts):
        """构建词表"""
        from collections import Counter
        import itertools
        
        # 统计词频
        word_freq = Counter()
        for text in texts:
            # 假设text是已经分词的列表
            word_freq.update(text)
        
        # 取最高频词汇
        most_common = word_freq.most_common(self.max_vocab_size - 2)  # 保留UNK和PAD位置
        
        # 构建映射
        self.word2idx = {'<PAD>': 0, '<UNK>': 1}
        self.idx2word = {0: '<PAD>', 1: '<UNK>'}
        
        for idx, (word, _) in enumerate(most_common, start=2):
            self.word2idx[word] = idx
            self.idx2word[idx] = word
        
        return self.word2idx, self.idx2word
    
    def text_to_sequence(self, texts):
        """文本转序列"""
        sequences = []
        for text in texts:
            seq = []
            for word in text:
                idx = self.word2idx.get(word, self.word2idx['<UNK>'])
                seq.append(idx)
            
            # 截断或填充
            if len(seq) > self.max_seq_len:
                seq = seq[:self.max_seq_len]
            else:
                seq = seq + [self.word2idx['<PAD>']] * (self.max_seq_len - len(seq))
            
            sequences.append(seq)
        
        return np.array(sequences)
    
    def load_pretrained_embeddings(self, embedding_path, embedding_dim=100):
        """加载预训练词向量"""
        print(f"加载预训练词向量: {embedding_path}")
        
        # 初始化嵌入矩阵
        embedding_matrix = np.zeros((self.max_vocab_size, embedding_dim))
        found_count = 0
        
        # 假设预训练词向量格式：每行"word v1 v2 ... vd"
        try:
            with open(embedding_path, 'r', encoding='utf-8') as f:
                for line in f:
                    values = line.strip().split()
                    word = values[0]
                    
                    if word in self.word2idx:
                        idx = self.word2idx[word]
                        vector = np.array(values[1:], dtype=np.float32)
                        
                        if len(vector) == embedding_dim:
                            embedding_matrix[idx] = vector
                            found_count += 1
        
        except FileNotFoundError:
            print(f"文件未找到: {embedding_path}")
            print("将使用随机初始化的嵌入")
            return None
        
        print(f"预训练词向量覆盖: {found_count}/{len(self.word2idx)} 词汇")
        
        # 处理未覆盖的词汇（随机初始化）
        for idx in range(len(self.word2idx)):
            if idx < 2:  # PAD和UNK
                continue
            if np.all(embedding_matrix[idx] == 0):
                embedding_matrix[idx] = np.random.randn(embedding_dim) * 0.01
        
        return embedding_matrix
    
    def train(self, train_texts, train_labels, test_texts, test_labels,
              embedding_matrix=None, num_epochs=20, batch_size=32):
        """训练分类模型"""
        
        # 构建词表
        self.build_vocab(train_texts)
        
        # 文本转序列
        X_train = self.text_to_sequence(train_texts)
        X_test = self.text_to_sequence(test_texts)
        
        # 转换为Tensor
        X_train_tensor = torch.LongTensor(X_train)
        X_test_tensor = torch.LongTensor(X_test)
        y_train_tensor = torch.LongTensor(train_labels)
        y_test_tensor = torch.LongTensor(test_labels)
        
        # 创建数据加载器
        train_dataset = torch.utils.data.TensorDataset(X_train_tensor, y_train_tensor)
        train_loader = torch.utils.data.DataLoader(
            train_dataset, batch_size=batch_size, shuffle=True
        )
        
        # 创建模型
        model = WordVectorTextClassifier(
            vocab_size=self.max_vocab_size,
            embedding_dim=100,
            num_classes=len(np.unique(train_labels)),
            pretrained_embeddings=embedding_matrix,
            freeze_embeddings=True  # 训练时冻结预训练词向量
        )
        
        # 损失函数和优化器
        criterion = nn.CrossEntropyLoss()
        optimizer = optim.Adam(
            filter(lambda p: p.requires_grad, model.parameters()),
            lr=0.001
        )
        
        # 训练循环
        train_losses = []
        test_accuracies = []
        
        for epoch in range(num_epochs):
            model.train()
            epoch_loss = 0
            
            for batch_X, batch_y in train_loader:
                optimizer.zero_grad()
                
                outputs = model(batch_X)
                loss = criterion(outputs, batch_y)
                
                loss.backward()
                optimizer.step()
                
                epoch_loss += loss.item()
            
            avg_loss = epoch_loss / len(train_loader)
            train_losses.append(avg_loss)
            
            # 测试集评估
            model.eval()
            with torch.no_grad():
                test_outputs = model(X_test_tensor)
                test_preds = torch.argmax(test_outputs, dim=1)
                test_acc = accuracy_score(test_labels, test_preds.numpy())
                test_accuracies.append(test_acc)
            
            if (epoch + 1) % 5 == 0:
                print(f"Epoch {epoch+1}/{num_epochs}, Loss: {avg_loss:.4f}, Test Acc: {test_acc:.4f}")
        
        # 最终评估
        model.eval()
        with torch.no_grad():
            test_outputs = model(X_test_tensor)
            test_preds = torch.argmax(test_outputs, dim=1)
            
            print("\n分类报告:")
            print(classification_report(test_labels, test_preds.numpy()))
        
        # 可视化训练过程
        self.plot_training_history(train_losses, test_accuracies)
        
        return model, train_losses, test_accuracies
    
    def plot_training_history(self, train_losses, test_accuracies):
        """可视化训练历史"""
        fig, axes = plt.subplots(1, 2, figsize=(14, 5))
        
        # 损失曲线
        axes[0].plot(train_losses, 'b-', label='Training Loss')
        axes[0].set_xlabel('Epoch')
        axes[0].set_ylabel('Loss')
        axes[0].set_title('Training Loss Curve')
        axes[0].legend()
        axes[0].grid(True, alpha=0.3)
        
        # 准确率曲线
        axes[1].plot(test_accuracies, 'r-', label='Test Accuracy')
        axes[1].set_xlabel('Epoch')
        axes[1].set_ylabel('Accuracy')
        axes[1].set_title('Test Accuracy Curve')
        axes[1].legend()
        axes[1].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()

# 示例使用
if __name__ == "__main__":
    # 示例数据（需要真实数据）
    # 假设train_texts是分词后的列表，如[["我", "爱", "自然语言", "处理"], ...]
    # train_labels是类别标签
    
    # 创建处理管道
    pipeline = TextClassificationPipeline(max_vocab_size=5000, max_seq_len=50)
    
    # 示例：训练没有预训练词向量的模型
    print("实验1: 随机初始化嵌入")
    # model_random, losses_random, accs_random = pipeline.train(
    #     train_texts, train_labels, test_texts, test_labels,
    #     embedding_matrix=None, num_epochs=20
    # )
    
    # 示例：训练有预训练词向量的模型
    print("\n实验2: 使用预训练词向量")
    # 假设有预训练词向量文件
    # embedding_matrix = pipeline.load_pretrained_embeddings(
    #     "pretrained_vectors.txt", embedding_dim=100
    # )
    
    # if embedding_matrix is not None:
    #     model_pretrained, losses_pretrained, accs_pretrained = pipeline.train(
    #         train_texts, train_labels, test_texts, test_labels,
    #         embedding_matrix=embedding_matrix, num_epochs=20
    #     )
    
    # 对比实验
    print("\n对比分析:")
    print("预训练词向量通常能:")
    print("1. 提升模型在小数据集上的表现")
    print("2. 加速模型收敛")
    print("3. 提供更好的语义理解能力")
    print("4. 但可能在某些特定领域表现不如领域自训练的词向量")
```

### 练习题5：构建词向量探索工具

**题目要求：**
1. 开发交互式词向量探索工具
2. 实现词汇相似度计算、类比推理、最近邻查询
3. 添加词向量降维可视化功能
4. 提供多种预训练词向量选择

**参考实现框架：**
```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
import ipywidgets as widgets
from IPython.display import display, clear_output
import plotly.graph_objects as go
import plotly.express as px

class WordVectorExplorer:
    def __init__(self, word_vectors, vocabulary):
        """
        word_vectors: dict {word: np.array}
        vocabulary: list of words
        """
        self.word_vectors = word_vectors
        self.vocabulary = vocabulary
        self.dim = next(iter(word_vectors.values())).shape[0]
        
    def get_vector(self, word):
        """获取词向量"""
        return self.word_vectors.get(word, None)
    
    def cosine_similarity(self, word1, word2):
        """计算余弦相似度"""
        vec1 = self.get_vector(word1)
        vec2 = self.get_vector(word2)
        
        if vec1 is None or vec2 is None:
            return None
        
        dot_product = np.dot(vec1, vec2)
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)
        
        if norm1 == 0 or norm2 == 0:
            return 0
        
        return dot_product / (norm1 * norm2)
    
    def most_similar(self, word, top_k=10):
        """查找最相似的词"""
        if word not in self.word_vectors:
            return []
        
        target_vec = self.word_vectors[word]
        similarities = []
        
        for other_word, other_vec in self.word_vectors.items():
            if other_word == word:
                continue
            
            sim = self.cosine_similarity(word, other_word)
            if sim is not None:
                similarities.append((other_word, sim))
        
        # 按相似度排序
        similarities.sort(key=lambda x: x[1], reverse=True)
        
        return similarities[:top_k]
    
    def analogical_reasoning(self, a, b, c, top_k=5):
        """类比推理: a is to b as c is to ?"""
        if not all(w in self.word_vectors for w in [a, b, c]):
            return []
        
        # 计算: b - a + c
        result_vec = self.word_vectors[b] - self.word_vectors[a] + self.word_vectors[c]
        
        # 查找最相似的词（排除a,b,c）
        similarities = []
        for word, vec in self.word_vectors.items():
            if word in [a, b, c]:
                continue
            
            sim = np.dot(result_vec, vec) / (
                np.linalg.norm(result_vec) * np.linalg.norm(vec)
            )
            similarities.append((word, sim))
        
        similarities.sort(key=lambda x: x[1], reverse=True)
        
        return similarities[:top_k]
    
    def visualize_embeddings(self, words=None, method='tsne', 
                            perplexity=30, n_iter=1000,
                            title="词向量可视化"):
        """可视化词向量"""
        if words is None:
            words = list(self.word_vectors.keys())[:100]
        else:
            # 过滤在词表中的词
            words = [w for w in words if w in self.word_vectors]
        
        if len(words) < 2:
            print("有效词汇不足，无法可视化")
            return
        
        # 收集词向量
        vectors = np.array([self.word_vectors[w] for w in words])
        
        # 降维
        if method.lower() == 'tsne':
            reducer = TSNE(n_components=2, perplexity=perplexity,
                          n_iter=n_iter, random_state=42)
            reduced_vectors = reducer.fit_transform(vectors)
        elif method.lower() == 'pca':
            reducer = PCA(n_components=2)
            reduced_vectors = reducer.fit_transform(vectors)
        else:
            raise ValueError("method必须是'tsne'或'pca'")
        
        # 使用plotly交互式可视化
        fig = go.Figure()
        
        # 添加散点
        fig.add_trace(go.Scatter(
            x=reduced_vectors[:, 0],
            y=reduced_vectors[:, 1],
            mode='markers+text',
            text=words,
            textposition="top center",
            marker=dict(
                size=10,
                color=np.arange(len(words)),
                colorscale='Viridis',
                showscale=True,
                colorbar=dict(title="词汇索引")
            ),
            textfont=dict(size=10),
            hoverinfo='text'
        ))
        
        # 布局设置
        fig.update_layout(
            title=dict(
                text=title,
                x=0.5,
                font=dict(size=20)
            ),
            xaxis_title=f"{method.upper()} Component 1",
            yaxis_title=f"{method.upper()} Component 2",
            template='plotly_white',
            hovermode='closest',
            width=1000,
            height=700,
            showlegend=False
        )
        
        # 添加网格
        fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='LightGray')
        fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='LightGray')
        
        return fig
    
    def create_interactive_app(self):
        """创建交互式应用"""
        # 创建控件
        word_input = widgets.Text(
            value='人工智能',
            placeholder='输入词汇',
            description='词汇:',
            disabled=False
        )
        
        top_k_slider = widgets.IntSlider(
            value=10,
            min=1,
            max=50,
            step=1,
            description='相似词数量:',
            disabled=False,
            continuous_update=False,
            orientation='horizontal',
            readout=True,
            readout_format='d'
        )
        
        similarity_button = widgets.Button(
            description='计算相似词',
            disabled=False,
            button_style='primary',
            tooltip='点击计算最相似的词'
        )
        
        analogy_a = widgets.Text(value='国王', description='A:')
        analogy_b = widgets.Text(value='男人', description='B:')
        analogy_c = widgets.Text(value='女人', description='C:')
        analogy_button = widgets.Button(
            description='进行类比推理',
            disabled=False,
            button_style='info'
        )
        
        output_area = widgets.Output()
        
        # 回调函数
        def on_similarity_button_clicked(b):
            with output_area:
                clear_output(wait=True)
                word = word_input.value.strip()
                top_k = top_k_slider.value
                
                if not word:
                    print("请输入有效词汇")
                    return
                
                if word not in self.word_vectors:
                    print(f"词汇'{word}'不在词表中")
                    return
                
                similar_words = self.most_similar(word, top_k)
                
                print(f"与'{word}'最相似的{top_k}个词:")
                print("-" * 50)
                for idx, (similar_word, similarity) in enumerate(similar_words, 1):
                    print(f"{idx:2d}. {similar_word:20s} 相似度: {similarity:.4f}")
                
                # 可视化
                viz_words = [word] + [w for w, _ in similar_words[:min(20, len(similar_words))]]
                fig = self.visualize_embeddings(
                    words=viz_words,
                    title=f"'{word}'及其相似词向量空间分布"
                )
                fig.show()
        
        def on_analogy_button_clicked(b):
            with output_area:
                clear_output(wait=True)
                a = analogy_a.value.strip()
                b = analogy_b.value.strip()
                c = analogy_c.value.strip()
                
                if not all([a, b, c]):
                    print("请输入完整的类比词汇")
                    return
                
                if not all(w in self.word_vectors for w in [a, b, c]):
                    print("部分词汇不在词表中")
                    return
                
                results = self.analogical_reasoning(a, b, c, top_k=10)
                
                print(f"类比推理: {a} : {b} :: {c} : ?")
                print("-" * 50)
                for idx, (result_word, similarity) in enumerate(results, 1):
                    print(f"{idx:2d}. {result_word:20s} 匹配度: {similarity:.4f}")
                
                # 可视化
                viz_words = [a, b, c] + [w for w, _ in results[:min(10, len(results))]]
                fig = self.visualize_embeddings(
                    words=viz_words,
                    title=f"类比推理: {a} - {b} + {c}"
                )
                fig.show()
        
        # 绑定回调
        similarity_button.on_click(on_similarity_button_clicked)
        analogy_button.on_click(on_analogy_button_clicked)
        
        # 布局
        similarity_box = widgets.VBox([
            widgets.HBox([word_input, top_k_slider]),
            similarity_button
        ])
        
        analogy_box = widgets.VBox([
            widgets.HBox([analogy_a, analogy_b, analogy_c]),
            analogy_button
        ])
        
        app = widgets.VBox([
            widgets.HTML("<h2>词向量探索工具</h2>"),
            widgets.HTML("<h3>1. 词汇相似度计算</h3>"),
            similarity_box,
            widgets.HTML("<h3>2. 类比推理</h3>"),
            analogy_box,
            widgets.HTML("<h3>3. 结果展示</h3>"),
            output_area
        ])
        
        return app

# 示例使用（在Jupyter Notebook中）
if __name__ == "__main__":
    # 示例：加载预训练词向量
    # 假设我们有预训练的词向量文件
    def load_word_vectors(file_path, max_words=10000):
        """加载词向量文件"""
        word_vectors = {}
        vocabulary = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                for i, line in enumerate(f):
                    if i >= max_words:
                        break
                    
                    parts = line.strip().split()
                    if len(parts) < 50:  # 假设向量维度至少50
                        continue
                    
                    word = parts[0]
                    vector = np.array([float(x) for x in parts[1:]])
                    
                    word_vectors[word] = vector
                    vocabulary.append(word)
            
            print(f"加载了 {len(word_vectors)} 个词向量")
            return word_vectors, vocabulary
        
        except FileNotFoundError:
            print(f"文件未找到: {file_path}")
            return {}, []
    
    # 加载词向量（示例）
    # word_vectors, vocabulary = load_word_vectors("pretrained_vectors.txt")
    
    # 创建探索器
    # explorer = WordVectorExplorer(word_vectors, vocabulary)
    
    # 启动交互式应用（在Jupyter中）
    # app = explorer.create_interactive_app()
    # display(app)
    
    print("注意：此代码需要在Jupyter Notebook环境中运行，以显示交互式控件")
```

## 四、常见问题解答（FAQ）

### Q1：Word2Vec的CBOW和Skip-gram模型哪个更好？

**A：** 两种模型各有优势，选择取决于具体场景：

**CBOW优势：**
1. **训练速度快**：上下文词平均后减少计算量
2. **高频词表现好**：适合高频词丰富的语料
3. **小数据更稳定**：在小型数据集上通常效果更好

**Skip-gram优势：**
1. **低频词表现好**：每个中心词生成多个训练样本
2. **复杂语义捕捉强**：能学习更细微的语义关系
3. **大规模数据更优**：在大型语料库上表现通常超过CBOW

**实际建议：**
- 对于中文NLP：Skip-gram通常更优，因为中文词汇分布更稀疏
- 对于领域特定任务：CBOW可能更适合，领域词汇相对集中
- 最佳实践：两种都尝试，选择在验证集上表现更好的

### Q2：如何选择合适的词向量维度？

**A：** 词向量维度选择需要权衡表达能力与计算效率：

**低维度（50-100）：**
- 优点：训练快，内存占用小，适合简单任务
- 适用场景：情感分析、简单文本分类、小数据集
- 风险：可能欠拟合，语义表示不够丰富

**中等维度（100-300）：**
- 优点：平衡性能与效率，大多数场景的默认选择
- 适用场景：通用NLP任务、中等规模语料
- 建议：从200维开始，根据效果调整

**高维度（300+）：**
- 优点：表达能力强，适合复杂语义关系
- 适用场景：大规模语料、专业领域、研究用途
- 缺点：容易过拟合，训练时间长

**经验法则：**
- 词汇量 < 10万：100-200维
- 词汇量 10万-100万：200-300维  
- 词汇量 > 100万：300维以上
- 中文NLP：建议150-250维（考虑中文语义复杂性）

### Q3：负采样中的负样本如何选择？

**A：** 负样本选择是Word2Vec训练的关键技术：

**传统方法：均匀采样**
- 从词汇表中随机选择词汇作为负样本
- 简单但效率低，高频普通词汇被过度采样

**改进方法：基于频率的采样**
- 按照词频分布采样：P(word) ∝ freq(word)^(3/4)
- 平衡高频词与低频词的采样概率
- 这是Word2Vec默认采用的方法

**高级方法：对抗性采样**
- 选择模型当前最难区分的词汇作为负样本
- 训练更高效，但实现复杂

**负样本数量选择：**
- **小数据集**：5-10个负样本
- **中等数据集**：10-15个负样本  
- **大数据集**：15-25个负样本
- **中文NLP**：建议8-12个（中文词汇更稀疏）

**实践建议：**
```python
# Gensim中的负采样设置
model = Word2Vec(
    sentences=corpus,
    negative=10,  # 负样本数量
    ns_exponent=0.75,  # 采样指数，3/4=0.75
    # ...
)
```

### Q4：如何处理未登录词（OOV）问题？

**A：** 未登录词是Word2Vec的固有局限，有多种应对策略：

**1. 传统方法：默认向量**
- 为所有未登录词分配相同的随机向量
- 简单但效果差，无法区分不同OOV

**2. FastText方法：子词向量**
- 使用字符n-gram生成词向量
- 即使未见过的词也能生成有意义的向量
- 对拼写变体和新词有较好鲁棒性

**3. 字符级方法：**
- 基于字符序列生成向量（如CharCNN、CharLSTM）
- 能处理任意词汇，但训练复杂

**4. 上下文感知方法：**
- 使用BERT等上下文模型生成动态向量
- 即使OOV也能根据上下文生成合适向量
- 但计算成本高，需要大模型

**中文特殊处理：**
- **新词发现**：结合分词工具的新词发现功能
- **领域适应**：在领域语料上重新训练或微调
- **混合策略**：通用词向量 + 领域词典补充

**推荐方案：**
```
1. 中小规模项目：FastText（平衡效果与效率）
2. 专业领域任务：领域语料重训练 + 专业词典
3. 前沿研究应用：BERT等预训练模型
4. 生产系统：FastText + 缓存机制 + 定期更新
```

### Q5：词向量训练需要多少数据？

**A：** 数据量需求取决于多种因素：

**最低要求：**
- **简单任务**（如情感倾向）：1万-5万句子
- **中等任务**（如文本分类）：10万-50万句子
- **复杂任务**（如机器翻译）：100万+句子

**影响因素：**
1. **词汇复杂度**：专业领域需要更多数据
2. **向量维度**：高维度需要更多数据避免过拟合
3. **模型架构**：Skip-gram比CBOW需要更多数据
4. **语言特性**：中文比英文需要更多数据（分词误差、语义复杂）

**数据质量的重要性：**
- **干净数据 > 大量噪声数据**：10万清洗数据可能优于100万原始数据
- **领域匹配**：领域特定数据优于通用大数据
- **标注质量**：高质量标注大幅减少数据需求

**实践指南：**
```python
# 数据量评估表
data_requirements = {
    "sentiment_analysis": {
        "min_sentences": 10_000,
        "recommended": 50_000,
        "vocab_size": 5_000
    },
    "text_classification": {
        "min_sentences": 50_000,
        "recommended": 200_000,
        "vocab_size": 20_000
    },
    "ner": {
        "min_sentences": 100_000,
        "recommended": 500_000,
        "vocab_size": 50_000
    }
}
```

**资源有限时的策略：**
1. **使用预训练词向量**：避免从零训练
2. **数据增强**：回译、同义词替换、随机删除
3. **迁移学习**：在相关领域预训练，目标领域微调
4. **半监督学习**：少量标注数据 + 大量无标注数据

## 五、进一步学习资源推荐

### 5.1 核心论文与文献

**基础必读：**
1. **《Efficient Estimation of Word Representations in Vector Space》** (Mikolov et al., 2013)
   - Word2Vec的奠基论文，提出Skip-gram和CBOW模型

2. **《Distributed Representations of Words and Phrases and their Compositionality》** (Mikolov et al., 2013)
   - 提出负采样和层次Softmax优化技术

3. **《GloVe: Global Vectors for Word Representation》** (Pennington et al., 2014)
   - 结合全局统计与局部预测的GloVe模型

**进阶阅读：**
4. **《Enriching Word Vectors with Subword Information》** (Bojanowski et al., 2016)
   - FastText：引入子词信息处理未登录词

5. **《BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding》** (Devlin et al., 2018)
   - BERT模型开创上下文词向量新时代

6. **《Attention Is All You Need》** (Vaswani et al., 2017)
   - Transformer架构，现代NLP的基础

### 5.2 开源工具与框架

**词向量训练：**
1. **Gensim**：Python中最常用的Word2Vec实现库
   - 安装：`pip install gensim`
   - 文档：https://radimrehurek.com/gensim/

2. **FastText**：Facebook开源的词向量工具
   - 支持子词信息，多种语言
   - 官网：https://fasttext.cc/

3. **Word2Vec (Google原版)**：C语言实现，效率极高
   - GitHub：https://github.com/tmikolov/word2vec

**预训练词向量：**
4. **Chinese Word Vectors**：中文预训练词向量集合
   - 覆盖多种领域和架构
   - 项目：https://github.com/Embedding/Chinese-Word-Vectors

5. **Tencent AI Lab Embedding**：大规模中文词向量
   - 800万中文词汇，高质量预训练
   - 下载：https://ai.tencent.com/ailab/nlp/zh/embedding.html

### 5.3 实践项目与数据集

**入门项目：**
1. **新闻文本分类**：使用THUCNews数据集训练词向量
   - 数据集：http://thuctc.thunlp.org/
   - 任务：基于词向量的文本分类

2. **电影评论情感分析**：IMDB或中文电影评论数据集
   - 实践词向量在情感分析中的应用

**进阶项目：**
3. **智能问答系统**：基于词向量相似度的QA匹配
   - 数据集：WebQA、NLPCC-DBQA

4. **跨语言词向量对齐**：学习不同语言间的语义对应关系

**专业领域：**
5. **医疗文本处理**：在医学文献上训练领域词向量
6. **法律文本分析**：法律领域专用词向量训练

### 5.4 在线课程与社区

**中文社区：**
1. **AI研习社**：NLP实战课程与竞赛
2. **Datawhale**：开源学习项目，包含NLP专题
3. **知乎NLP话题**：技术讨论与资源分享

**国际平台：**
4. **Coursera**：斯坦福大学《Natural Language Processing with Deep Learning》
5. **fast.ai**：实践导向的深度学习与NLP课程
6. **Hugging Face Course**：免费的Transformers实战课程

**学术会议：**
7. **ACL**：计算语言学顶级会议
8. **EMNLP**：自然语言处理实证方法会议
9. **NAACL**：北美计算语言学会议

### 5.5 持续学习路径

**短期目标（1个月）：**
1. 掌握Word2Vec原理与Gensim使用
2. 完成3个基于词向量的NLP项目
3. 理解词向量评估方法

**中期目标（3个月）：**
1. 深入学习FastText和GloVe
2. 掌握上下文词向量（BERT等）
3. 参与NLP竞赛或开源项目贡献

**长期目标（1年）：**
1. 研究前沿词向量技术
2. 在特定领域（医疗、金融等）深度应用
3. 发表技术博客或研究论文

---

## 学习总结与下一步计划

### 今日学习成果

1. **深入理解词向量原理**：掌握了从One-Hot到Word2Vec的演进逻辑，理解了分布式表示的核心价值
2. **掌握Word2Vec两大架构**：详细学习了CBOW和Skip-gram模型的原理、特点与适用场景
3. **学习关键技术优化**：理解了负采样和层次Softmax的工作原理与实现方式
4. **实践词向量训练与应用**：通过5道练习题，掌握了从训练到评估的全流程
5. **了解高级词向量技术**：学习了GloVe、FastText及上下文词向量的发展方向

### 关键知识点回顾

- **词向量本质**：将离散词汇映射到连续向量空间，捕捉语义关系
- **Word2Vec核心**：通过上下文预测任务学习词向量
- **CBOW vs Skip-gram**：前者训练快适合高频词，后者语义捕捉强适合低频词
- **负采样优化**：将多分类问题转化为二分类，大幅提升训练效率
- **线性类比关系**：词向量最神奇的特性，支持"国王-男人+女人≈女王"等运算

### 明日学习预告：Day 31 RNN与LSTM基础

**学习重点：**
1. 循环神经网络（RNN）基本原理与结构
2. RNN的局限性：梯度消失与梯度爆炸问题
3. 长短时记忆网络（LSTM）的创新设计
4. LSTM在序列数据处理中的应用实践

**准备建议：**
1. 复习今日的词向量知识，理解序列数据的特点
2. 安装PyTorch或TensorFlow深度学习框架
3. 准备时间序列数据（如文本序列、股票价格等）
4. 思考传统神经网络处理序列数据的局限性

---

**学习卡片生成时间**：2026年3月9日  
**建议学习时长**：90-120分钟  
**代码运行环境**：Python 3.10+，Gensim 4.0+，PyTorch 2.0+  
**学习效果自查**：完成全部5道练习题，理解不同模型架构的差异，能够独立训练和应用词向量

**记住**：词向量是现代NLP的基石，理解其原理不仅有助于掌握基础技术，更能为学习更高级的深度学习模型奠定坚实基础。词向量的质量直接影响下游任务的效果，因此在实际应用中需要精心调整超参数、准备高质量数据、选择合适的优化技术。
---

## 学习导航

> [!info] 学习进度
> - 上一讲：基础入门（词向量是NLP的基石）
> - [[Day31_RNN与LSTM基础|下一讲 →]]：RNN与LSTM基础

[[Day31_RNN与LSTM基础|下一讲：RNN与LSTM基础 →]]
