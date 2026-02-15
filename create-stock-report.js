const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, WidthType, Table, TableRow, TableCell, ShadingType, VerticalAlign, LevelFormat, TabStopType, TabStopPosition } = require('docx');
const fs = require('fs');

// 创建文档
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 }
      }
    },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "000000" },
        paragraph: { spacing: { before: 400, after: 300 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "000000" },
        paragraph: { spacing: { before: 300, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "333333" },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
      { id: "Subtitle", name: "Subtitle", basedOn: "Normal",
        run: { size: 24, color: "666666" },
        paragraph: { spacing: { after: 200 }, alignment: AlignmentType.CENTER } }
    ]
  },
  numbering: {
    config: [
      { reference: "number-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      // 标题
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun({ text: "A股短线股票分析报告", bold: true })]
      }),
      new Paragraph({
        style: "Subtitle",
        children: [new TextRun({ text: "利欧股份（002571）短线操作建议", color: "666666" })]
      }),

      // 基本信息
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "报告日期：2026年2月14日", color: "888888", size: 20 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 300 },
        children: [new TextRun({ text: "分析标的：利欧股份（002571）", color: "888888", size: 20 })]
      }),

      // 目录
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "一、市场背景分析" })]
      }),

      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "近期A股市场呈现以下特点：" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "主线热点：AI算力硬件（液冷服务器、CPO）、有色金属、AI应用端" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "短线情绪：连板股晋级率约50%，情绪回暖" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "资金流向：主力资金持续流入算力、半导体板块" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "风险提示：2月13日出现部分个股闪崩，节前需谨慎" })]
      }),

      // 公司概况
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300 },
        children: [new TextRun({ text: "二、公司概况" })]
      }),

      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "利欧股份（002571）基本情况：" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "主营业务：数字营销+液冷服务器" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "近期催化剂：英伟达液冷供应商维谛技术财报超预期，液冷渗透率预计从14%提升至40%" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "市场表现：2月12日涨停成交110亿，2月13日下跌1.32%，2月14日大跌7.42%" })]
      }),

      // 专家分析
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300 },
        children: [new TextRun({ text: "三、各专家独立分析" })]
      }),

      // 基本面大师
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200 },
        children: [new TextRun({ text: "1. 基本面大师（20年价值投资经验）" })]
      }),
      new Paragraph({
        spacing: { before: 150 },
        children: [new TextRun({ text: "财务状况：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "2024年1-9月实现营业收入158.48亿元，同比增长1.08%；归母净利润-1.60亿元，同比减少107.58%" })]
      }),
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({ text: "估值判断：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "当前市值适中，题材溢价明显，属于典型的题材驱动型投资标的" })]
      }),
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({ text: "投资观点：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "短期可关注液冷业务带来的业绩增量，但需注意基本面支撑不足的风险" })]
      }),

      // 技术分析派
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200 },
        children: [new TextRun({ text: "2. 技术分析派（15年短线交易经验）" })]
      }),
      new Paragraph({
        spacing: { before: 150 },
        children: [new TextRun({ text: "压力与支撑：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "压力位：10.40元、10.65元（技术强压）、11.00元（整数关口）" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "支撑位：9.80元、9.50元、9.00元、8.50元" })]
      }),
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({ text: "技术形态：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "近期波动较大，2月12日涨停后连续调整，筹码平均成本8.97元，43.94%换手显示筹码松动" })]
      }),
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({ text: "短线建议：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "等待企稳信号，9.00元是关键支撑位，不宜追高" })]
      }),

      // 量化模型师
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200 },
        children: [new TextRun({ text: "3. 量化模型师（机器学习/统计套利）" })]
      }),
      new Paragraph({
        spacing: { before: 150 },
        children: [new TextRun({ text: "资金流向分析：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "2月12日主力资金净买入29.81亿元位居首位" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "2月13日主力资金净流出约19.18亿元" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "2月14日主力资金净流出5.02亿元，连续3日被主力减仓" })]
      }),
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({ text: "量化信号：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "短期资金分歧较大，若后续主力资金持续流出，股价可能继续承压" })]
      }),

      // 风险控制官
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200 },
        children: [new TextRun({ text: "4. 风险控制官（18年风控经验）" })]
      }),
      new Paragraph({
        spacing: { before: 150 },
        children: [new TextRun({ text: "风险评估：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "波动风险：中高（近期振幅超过30%）" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "流动性风险：低（成交额持续超50亿）" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "杠杆风险：融资余额15.95亿元，占流通市值5.43%，处于高位" })]
      }),
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({ text: "风控建议：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "单票仓位不超过20%，止损位设为8%" })]
      }),

      // 宏观策略师
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200 },
        children: [new TextRun({ text: "5. 宏观策略师（全球宏观对冲）" })]
      }),
      new Paragraph({
        spacing: { before: 150 },
        children: [new TextRun({ text: "政策与资金面：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "央行2月13日开展10000亿买断式逆回购，流动性充裕" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "低空保险、AI算力等政策持续利好" })]
      }),
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({ text: "策略建议：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "把握节后红包行情，重点配置硬科技（液冷、CPO、算力），关注补涨板块" })]
      }),

      // 操作计划
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300 },
        children: [new TextRun({ text: "四、具体操作计划" })]
      }),

      // 核心价位
      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "核心价位锚定：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "11.00元 — 强压力位（整数关口）" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "10.40元 — 短线压力位" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "9.80元 — 反弹第一目标" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "9.50元 — 今日收盘附近" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "9.00元 — 强支撑位（重点关注）" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "8.50元 — 最后一档支撑" })]
      }),

      // 分场景操作
      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "分场景操作计划：", bold: true })]
      }),

      // 表格 - 操作场景
      new Table({
        columnWidths: [2340, 2340, 2340],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "4472C4", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "场景", bold: true, color: "FFFFFF" })] })]
              }),
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "4472C4", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "触发条件", bold: true, color: "FFFFFF" })] })]
              }),
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "4472C4", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "操作建议", bold: true, color: "FFFFFF" })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "A：高开高走", bold: true })] })]
              }),
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "开盘涨幅>3%且成交量放大" })] })]
              }),
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "等回踩9.50元再买，首仓20%" })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "B：低开低走", bold: true })] })]
              }),
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "开盘下跌>3%或跌破9.00元" })] })]
              }),
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "8.50-9.00元区间分批建仓" })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "C：震荡整理", bold: true })] })]
              }),
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "在8.50-9.80元区间波动" })] })]
              }),
              new TableCell({
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "高抛低吸，做T降低成本" })] })]
              })
            ]
          })
        ]
      }),

      // 仓位管理
      new Paragraph({
        spacing: { before: 300 },
        children: [new TextRun({ text: "仓位管理方案：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "总资金分成5份进行管理" })]
      }),
      new Paragraph({
        numbering: { reference: "number-list", level: 0 },
        children: [new TextRun({ text: "第1份20%：首仓，确认趋势后入场" })]
      }),
      new Paragraph({
        numbering: { reference: "number-list", level: 0 },
        children: [new TextRun({ text: "第2份15%：浮盈后加仓" })]
      }),
      new Paragraph({
        numbering: { reference: "number-list", level: 0 },
        children: [new TextRun({ text: "第3份10%：极端情况补仓" })]
      }),
      new Paragraph({
        numbering: { reference: "number-list", level: 0 },
        children: [new TextRun({ text: "第4份30%：备用资金，绝不all in" })]
      }),
      new Paragraph({
        numbering: { reference: "number-list", level: 0 },
        children: [new TextRun({ text: "第5份25%：永远不动的风险储备金" })]
      }),

      // 风险控制铁律
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300 },
        children: [new TextRun({ text: "五、风险控制铁律" })]
      }),
      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "必须遵守以下规则：", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "单票上限：总资金30%，绝不超过" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "止损线：8%必须割，绝不硬扛" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "盈利锁盈：浮盈15%必须减半仓" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "不抄底：连续下跌3天不抄底，等企稳" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "不追高：涨幅>8%绝不追买" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "不补仓：首次买入后下跌才能补，不支撑位补仓" })]
      }),

      // 综合结论
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300 },
        children: [new TextRun({ text: "六、综合结论" })]
      }),

      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "当前建议：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "• 如果你已持有：建议持有但设好止损，反弹至9.80元可减仓" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "• 如果你想买入：等待2月17日开盘再看，如果低开>3%可以8.50-9.00元分批买" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "• 如果你是空仓：建议选择更稳的华胜天成，利欧波动太大" })]
      }),

      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "备选标的：", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "• 华胜天成（600410）：算力龙头，主力流入21亿，回调至14元以下可买" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "• 中际旭创（300308）：CPO龙头，业绩确定性强，回调至160元可买" })]
      }),

      // 风险提示
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300 },
        children: [new TextRun({ text: "七、风险提示" })]
      }),

      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: "重要提醒：", bold: true, color: "FF0000" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "市场波动风险：2月13日出现多只个股闪崩，短线操作需快进快出" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "题材炒作风险：液冷、CPO属于题材炒作，需关注行业实际订单落地情况" })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "节后不确定性：春节假期较长，外盘和消息面存在不确定性" })]
      }),

      new Paragraph({
        spacing: { before: 300 },
        children: [new TextRun({ text: "免责声明", bold: true, color: "FF0000" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "以上分析仅供参考，不构成投资建议。股市有风险，投资需谨慎。", italics: true })]
      }),

      // 页脚
      new Paragraph({
        spacing: { before: 400 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "—— 报告完成 ——", color: "888888", size: 18 })]
      })
    ]
  }]
});

// 生成文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("D:/workspace/股票分析报告-利欧股份.docx", buffer);
  console.log("文档已生成: D:/workspace/股票分析报告-利欧股份.docx");
});
