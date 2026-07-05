# Open Source Tool Evaluation

目标：阅读英文版 Sentaurus/TCAD PDF 手册时，支持划词翻译、专业术语解释、上下文理解，并尽量减少对手册内容的外发。

## 候选工具

| 工具 | 类型 | 适合点 | 局限 |
| --- | --- | --- | --- |
| [Translate for Zotero](https://github.com/windingwind/zotero-pdf-translate) | Zotero 插件 | 在 Zotero PDF/EPub/Web 阅读器中选中文本后弹出翻译，支持 20+ 翻译服务、词典、注释翻译 | 需要把 PDF 放入 Zotero；术语解释仍依赖翻译服务 |
| [Saladict](https://github.com/crimx/ext-saladict) | 浏览器扩展 | Chrome/Firefox 划词词典，README 明确提到 PDF support 和 PDF selection searching | 更偏词典查询；对 TCAD 专业语境需要自定义词典或外部服务 |
| [Pot](https://github.com/pot-app/pot-desktop) | 桌面划词/OCR | 跨平台划词翻译和 OCR，适合任意 PDF 阅读器 | PDF 内文本定位、上下文和手册术语库不是核心能力 |
| [Easydict](https://github.com/tisfeng/Easydict) | macOS 词典翻译 App | macOS 体验好，支持离线 OCR 和多翻译服务 | 只适合 macOS；专业术语解释仍需扩展 |
| [PDFMathTranslate](https://github.com/PDFMathTranslate/PDFMathTranslate) | PDF 全文翻译 | 面向论文/技术文档，保留排版，支持 CLI/GUI/Docker/Zotero | 更适合整本双语翻译，不适合边读边查 |
| [BabelDOC](https://github.com/funstory-ai/BabelDOC) | 文档翻译 | 保留布局的 PDF 文档翻译方向，适合批量处理 | 仍是全文翻译路线，不是取词解释工具 |
| [Immersive Translate](https://github.com/immersive-translate/immersive-translate) | 浏览器扩展 | 支持 PDF/Epub/字幕/TXT 翻译，产品成熟 | GitHub 仓库说明当前并非开源源码仓库，不适合作为二次开发基础 |

## 结论

最接近需求的现成开源工具是 Translate for Zotero 和 Saladict；Pot/Easydict 适合系统级辅助；PDFMathTranslate/BabelDOC 适合整本文档翻译。

本仓库选择做一个轻量本地 PDF 阅读辅助原型，原因是：

1. 当前手册是可抽取文本的数字 PDF，不需要 OCR 才能取词。
2. 专业术语解释需要保留上下文，而不是只做通用机器翻译。
3. 本地术语库可以逐步沉淀 Sentaurus/TCAD 高频词。
4. 默认不调用外部翻译 API，降低手册内容泄露风险。

## 后续优化方向

- 增加从阅读笔记反向生成术语库的功能。
- 支持自定义 OpenAI/DeepL/LibreTranslate endpoint，但默认关闭外发。
- 针对 Sentaurus Visual 手册抽取章节标题，增加章节内术语解释。
- 支持跨页上下文和全文术语搜索。

