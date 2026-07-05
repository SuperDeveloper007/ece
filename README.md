# Sentaurus Reading Helper

本仓库提供一个本地 PDF 阅读辅助工具，用来阅读英文版 Sentaurus/TCAD 手册时进行划词解释、术语匹配和上下文提示词生成。

## 快速开始

```bash
npm run start
```

打开终端输出的本地地址，默认会加载：

```text
docs/svisual_ug.pdf
```

在 PDF 页面里选中英文术语或句子，右侧面板会显示：

- 选中文本
- 当前页上下文片段
- 本地 TCAD/Sentaurus 术语库命中
- 可复制给大模型的中文解释提示词
- 阅读笔记保存与导出

## 为什么先做本地工具

调研后，现成工具可以覆盖大部分通用翻译，但 Sentaurus 用户手册的痛点主要是专业术语和上下文解释。这个原型默认不把手册内容发送到第三方翻译服务，先用本地术语库和提示词流转保证隐私和可控性。

## 开源工具调研结论

详细见 [docs/open-source-tool-evaluation.md](/Users/treelin/Documents/code/repo/svisual-practise/docs/open-source-tool-evaluation.md)。

推荐组合：

- 如果希望直接获得成熟划词体验：Zotero + Translate for Zotero。
- 如果希望系统级划词和 OCR：Pot 或 Easydict。
- 如果希望浏览器里打开 PDF 并划词：Saladict。
- 如果希望整本 PDF 双语重排：PDFMathTranslate 或 BabelDOC。
- 如果希望针对 Sentaurus 手册做术语优化：使用本仓库的本地阅读辅助工具继续扩展术语库。

