import * as pdfjsLib from "/pdfjs/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/build/pdf.worker.mjs";

const glossary = [
  {
    term: "TCAD",
    zh: "技术计算机辅助设计",
    category: "general",
    aliases: ["technology computer-aided design"],
    explanation: "用于半导体工艺和器件仿真的软件方法，通常包括工艺仿真、器件结构生成和电学仿真。",
  },
  {
    term: "Sentaurus Visual",
    zh: "Sentaurus 可视化工具",
    category: "tool",
    aliases: ["SVisual"],
    explanation: "Synopsys Sentaurus 套件中的后处理和可视化工具，用于查看结构、网格、曲线和仿真结果。",
  },
  {
    term: "mesh",
    zh: "网格",
    category: "structure",
    aliases: ["grid"],
    explanation: "将器件结构离散成节点和单元的数值计算网格。网格质量会直接影响仿真精度和收敛。",
  },
  {
    term: "node",
    zh: "节点",
    category: "structure",
    aliases: ["vertex"],
    explanation: "网格中的离散点，物理量通常在节点或单元上求解或插值显示。",
  },
  {
    term: "dataset",
    zh: "数据集",
    category: "visualization",
    aliases: ["data set"],
    explanation: "Sentaurus Visual 中打开和管理的仿真结果集合，可以包含结构、变量、曲线和元数据。",
  },
  {
    term: "TDR",
    zh: "TDR 结构/结果文件",
    category: "file",
    aliases: ["tdr file"],
    explanation: "Sentaurus 常用数据文件格式，常用于保存器件结构、网格和空间分布的物理量。",
  },
  {
    term: "PLT",
    zh: "曲线数据文件",
    category: "file",
    aliases: ["plt file"],
    explanation: "常用于保存一维曲线数据，例如 I-V、C-V 或随参数变化的仿真结果。",
  },
  {
    term: "scalar field",
    zh: "标量场",
    category: "visualization",
    aliases: ["scalar"],
    explanation: "每个空间位置只有一个数值的物理量，例如电势、掺杂浓度、电子浓度。",
  },
  {
    term: "vector field",
    zh: "矢量场",
    category: "visualization",
    aliases: ["vector"],
    explanation: "每个空间位置具有方向和大小的物理量，例如电流密度或电场。",
  },
  {
    term: "contour",
    zh: "等值线/等值面",
    category: "visualization",
    aliases: ["contour plot"],
    explanation: "显示物理量相同数值位置的可视化方式，常用于观察电势、浓度或温度分布。",
  },
  {
    term: "cutline",
    zh: "截线",
    category: "visualization",
    aliases: ["cut line"],
    explanation: "在二维或三维结构中指定一条线，沿线抽取物理量生成一维曲线。",
  },
  {
    term: "probe",
    zh: "探针/取样点",
    category: "visualization",
    aliases: ["probing"],
    explanation: "在结构中的指定位置读取变量值，常用于检查局部物理量。",
  },
  {
    term: "contact",
    zh: "电极/接触",
    category: "device",
    aliases: ["electrode"],
    explanation: "器件边界上的电学端口，例如 gate、source、drain、substrate。",
  },
  {
    term: "doping concentration",
    zh: "掺杂浓度",
    category: "device",
    aliases: ["doping", "dopant concentration"],
    explanation: "半导体中施主或受主杂质的浓度，影响载流子浓度、阈值电压和结特性。",
  },
  {
    term: "electrostatic potential",
    zh: "静电势",
    category: "device",
    aliases: ["potential"],
    explanation: "描述电场和能带弯曲的势函数，是器件仿真中的核心变量之一。",
  },
  {
    term: "quasi-Fermi level",
    zh: "准费米能级",
    category: "device",
    aliases: ["quasi fermi", "quasi-fermi potential"],
    explanation: "非平衡条件下分别描述电子和空穴统计分布的有效费米能级。",
  },
  {
    term: "band diagram",
    zh: "能带图",
    category: "device",
    aliases: ["energy band diagram"],
    explanation: "显示导带、价带和费米能级随空间位置变化的图，用于分析势垒和载流子输运。",
  },
  {
    term: "conduction band",
    zh: "导带",
    category: "device",
    aliases: ["Ec"],
    explanation: "电子能够参与导电的能带下边缘，常在能带图中用 Ec 表示。",
  },
  {
    term: "valence band",
    zh: "价带",
    category: "device",
    aliases: ["Ev"],
    explanation: "空穴参与导电相关的能带上边缘，常在能带图中用 Ev 表示。",
  },
  {
    term: "current density",
    zh: "电流密度",
    category: "device",
    aliases: ["electron current density", "hole current density"],
    explanation: "单位面积电流，通常分为电子电流密度和空穴电流密度，可用矢量场显示。",
  },
  {
    term: "impact ionization",
    zh: "碰撞电离",
    category: "physics",
    aliases: ["avalanche generation"],
    explanation: "高能载流子撞击晶格产生新的电子-空穴对，是雪崩击穿相关机制。",
  },
  {
    term: "recombination",
    zh: "复合",
    category: "physics",
    aliases: ["generation recombination", "generation/recombination"],
    explanation: "电子和空穴相互湮灭的过程；与 generation 一起描述载流子产生与消失。",
  },
  {
    term: "Workbench",
    zh: "Sentaurus Workbench",
    category: "tool",
    aliases: ["SWB"],
    explanation: "Sentaurus 的项目流程管理环境，用于组织仿真节点、参数扫描和工具链。",
  },
  {
    term: "Inspect",
    zh: "Inspect 曲线分析工具",
    category: "tool",
    aliases: ["Sentaurus Inspect"],
    explanation: "Sentaurus 中用于分析曲线数据的工具，常用于提取电学指标。",
  },
  {
    term: "Device",
    zh: "Sentaurus Device",
    category: "tool",
    aliases: ["SDevice"],
    explanation: "Sentaurus 的器件仿真器，用于求解半导体器件的电学、热学和光学行为。",
  },
  {
    term: "Structure Editor",
    zh: "结构编辑器",
    category: "tool",
    aliases: ["SDE", "Sentaurus Structure Editor"],
    explanation: "用于创建、编辑和网格化半导体器件结构的工具。",
  },
  {
    term: "SProcess",
    zh: "工艺仿真器",
    category: "tool",
    aliases: ["Sentaurus Process"],
    explanation: "用于模拟氧化、扩散、离子注入、刻蚀、沉积等半导体工艺步骤。",
  },
];

const elements = {
  status: document.querySelector("#status"),
  canvas: document.querySelector("#pdf-canvas"),
  textLayer: document.querySelector("#text-layer"),
  pageShell: document.querySelector("#page-shell"),
  prevPage: document.querySelector("#prev-page"),
  nextPage: document.querySelector("#next-page"),
  pageNumber: document.querySelector("#page-number"),
  pageCount: document.querySelector("#page-count"),
  zoomIn: document.querySelector("#zoom-in"),
  zoomOut: document.querySelector("#zoom-out"),
  zoomValue: document.querySelector("#zoom-value"),
  toggleTheme: document.querySelector("#toggle-theme"),
  uploadInput: document.querySelector("#upload-input"),
  emptySelection: document.querySelector("#empty-selection"),
  selectionCard: document.querySelector("#selection-card"),
  closeSelection: document.querySelector("#close-selection"),
  selectedText: document.querySelector("#selected-text"),
  copyText: document.querySelector("#copy-text"),
  copyPrompt: document.querySelector("#copy-prompt"),
  askAi: document.querySelector("#ask-ai"),
  saveNote: document.querySelector("#save-note"),
  matches: document.querySelector("#matches"),
  termSearch: document.querySelector("#term-search"),
  termResults: document.querySelector("#term-results"),
  notes: document.querySelector("#notes"),
  exportNotes: document.querySelector("#export-notes"),
  uploadedFiles: document.querySelector("#uploaded-files"),
  refreshFiles: document.querySelector("#refresh-files"),
  translationResult: document.querySelector("#translation-result"),
  translationText: document.querySelector("#translation-text"),
  tabButtons: document.querySelectorAll(".tab-button"),
  tabContents: document.querySelectorAll(".tab-content"),
  filterButtons: document.querySelectorAll(".filter-button"),
  aiStatus: document.querySelector("#ai-status"),
  aiChatMessages: document.querySelector("#ai-chat-messages"),
  aiChatInput: document.querySelector("#ai-chat-input"),
  aiSendButton: document.querySelector("#ai-send-button"),
  aiQuickActions: document.querySelectorAll(".quick-action-button"),
};

const state = {
  pdf: null,
  pageNumber: 1,
  pageCount: 0,
  scale: 1.2,
  pageText: "",
  selectedText: "",
  context: "",
  renderId: 0,
  notes: JSON.parse(localStorage.getItem("sentaurus-reader-notes") || "[]"),
  theme: localStorage.getItem("sentaurus-reader-theme") || "light",
  activeCategory: "all",
  aiMessages: [],
  aiConfigured: false,
};

function normalizeText(value) {
  return value.toLowerCase().replace(/[^\w+-]+/g, " ").trim();
}

function setStatus(message) {
  elements.status.textContent = message;
}

function getMatches(text) {
  const normalized = normalizeText(text);
  if (!normalized) {
    return [];
  }

  return glossary
    .map((item) => {
      const names = [item.term, ...(item.aliases || [])];
      const score = names.reduce((best, name) => {
        const n = normalizeText(name);
        if (normalized === n) return Math.max(best, 100);
        if (normalized.includes(n) || n.includes(normalized)) return Math.max(best, 70);
        const tokens = n.split(" ");
        if (tokens.some((token) => token.length > 2 && normalized.includes(token))) return Math.max(best, 40);
        return best;
      }, 0);
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.term.localeCompare(b.term))
    .slice(0, 5);
}

function renderMatches(matches) {
  if (matches.length === 0) {
    elements.matches.innerHTML = '<div class="empty-state">未命中本地术语库。可以复制解释提示词，让大模型结合上下文解释。</div>';
    return;
  }

  elements.matches.innerHTML = matches
    .map(
      (item) => `
        <article class="match-card">
          <strong>${escapeHtml(item.term)} <span class="zh">${escapeHtml(item.zh)}</span></strong>
          <div>${escapeHtml(item.explanation)}</div>
          <div class="label">类别：${escapeHtml(item.category)}</div>
        </article>
      `,
    )
    .join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function extractContext(selection) {
  const text = state.pageText.replace(/\s+/g, " ").trim();
  const normalizedText = text.toLowerCase();
  const normalizedSelection = selection.toLowerCase().replace(/\s+/g, " ").trim();
  let index = normalizedText.indexOf(normalizedSelection);

  if (index < 0) {
    const firstWord = normalizedSelection.split(/\s+/).find((word) => word.length > 3);
    index = firstWord ? normalizedText.indexOf(firstWord) : -1;
  }

  if (index < 0) {
    return text.slice(0, 360);
  }

  const start = Math.max(0, index - 180);
  const end = Math.min(text.length, index + normalizedSelection.length + 220);
  return `${start > 0 ? "... " : ""}${text.slice(start, end)}${end < text.length ? " ..." : ""}`;
}

function buildPrompt() {
  const matches = getMatches(state.selectedText);
  const glossaryText = matches.length
    ? matches.map((item) => `${item.term} = ${item.zh}：${item.explanation}`).join("\n")
    : "本地术语库未命中，请根据 TCAD/Sentaurus 语境判断。";

  return `我在阅读 Sentaurus Visual / TCAD 英文用户手册。请用中文解释下面选中的词或句子，要求：
1. 先给出准确中文翻译；
2. 再解释它在 TCAD/Sentaurus Visual 中的专业含义；
3. 如果可能，说明它在半导体仿真工作流中的作用；
4. 不要泛泛解释，要结合上下文。

选中文本：
${state.selectedText}

当前页上下文：
${state.context}

本地术语库参考：
${glossaryText}`;
}

async function copyText(value) {
  await navigator.clipboard.writeText(value);
  setStatus("已复制到剪贴板");
}

function setAiStatus(message) {
  elements.aiStatus.textContent = message;
}

function switchTab(tabId) {
  elements.tabButtons.forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-tab") === tabId);
  });

  elements.tabContents.forEach((content) => {
    content.classList.toggle("hidden", content.id !== `tab-${tabId}`);
  });
}

function appendAiMessage(role, content, { persist = true } = {}) {
  const message = document.createElement("article");
  message.className = `ai-message ai-message-${role}`;

  const label = document.createElement("div");
  label.className = "ai-message-label";
  label.textContent = role === "user" ? "你" : "AI";

  const body = document.createElement("div");
  body.className = "ai-message-body";
  body.textContent = content;

  message.append(label, body);
  elements.aiChatMessages.append(message);
  elements.aiChatMessages.scrollTop = elements.aiChatMessages.scrollHeight;

  if (persist) {
    state.aiMessages.push({ role, content });
    state.aiMessages = state.aiMessages.slice(-10);
  }
}

function getGlossaryContext(query) {
  const source = [query, state.selectedText, state.context, state.pageText].filter(Boolean).join(" ");
  return getMatches(source).map((item) => ({
    term: item.term,
    zh: item.zh,
    category: item.category,
    explanation: item.explanation,
  }));
}

function buildQuickQuestion(prompt) {
  if (prompt === "解释当前选中的文本") {
    return state.selectedText
      ? `请解释当前选中的文本：${state.selectedText}`
      : "请先在 PDF 页面中选中文本，然后解释其含义。";
  }

  if (prompt === "总结当前页面的主要内容") {
    return "请总结当前 PDF 页面的主要内容，并指出其中和 Sentaurus Visual / TCAD 操作相关的重点。";
  }

  if (prompt === "解释这个术语在 TCAD 中的作用") {
    return state.selectedText
      ? `请解释术语“${state.selectedText}”在 TCAD / Sentaurus 中的作用。`
      : "请说明一个 TCAD 术语的定义、使用场景和常见误解。";
  }

  return prompt;
}

async function refreshAiStatus() {
  try {
    const response = await fetch("/api/ai/status");
    const result = await response.json();
    state.aiConfigured = Boolean(result.configured);
    setAiStatus(result.configured ? `已连接：${result.model}` : "未配置");

    if (elements.aiChatMessages.childElementCount === 0) {
      appendAiMessage(
        "assistant",
        result.configured
          ? "可以直接提问。我会结合当前选区、页面上下文和本地术语库回答。"
          : "AI 服务未配置。启动前设置 OPENAI_API_KEY，或设置 AI_BASE_URL 指向兼容 OpenAI Chat Completions 的本地/私有服务。",
        { persist: false },
      );
    }
  } catch (error) {
    state.aiConfigured = false;
    setAiStatus("状态未知");
    appendAiMessage("assistant", `无法读取 AI 状态：${error.message}`, { persist: false });
  }
}

async function sendAiQuestion(question) {
  const cleaned = String(question || "").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return;
  }

  const history = state.aiMessages.slice(-6);
  appendAiMessage("user", cleaned);
  elements.aiChatInput.value = "";
  elements.aiSendButton.disabled = true;
  setAiStatus("思考中...");

  try {
    const response = await fetch("/api/ai/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: cleaned,
        selectedText: state.selectedText,
        context: state.context,
        pageText: state.pageText,
        pageNumber: state.pageNumber,
        glossary: getGlossaryContext(cleaned),
        history,
      }),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "AI 请求失败");
    }

    appendAiMessage("assistant", result.answer);
    setAiStatus(result.model ? `完成：${result.model}` : "完成");
  } catch (error) {
    appendAiMessage("assistant", `请求失败：${error.message}`, { persist: false });
    setAiStatus("请求失败");
  } finally {
    elements.aiSendButton.disabled = false;
    elements.aiChatInput.focus();
  }
}

async function translateToChinese(text) {
  if (!text) {
    setStatus("没有可翻译的文本");
    return;
  }

  try {
    setStatus("正在翻译...");
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|zh`);
    const result = await response.json();

    if (result.responseStatus === 200 && result.responseData) {
      const translatedText = result.responseData.translatedText;
      elements.translationText.textContent = translatedText;
      elements.translationResult.classList.remove("hidden");
      setStatus("翻译完成");
    } else {
      setStatus("翻译失败，请稍后重试");
    }
  } catch (error) {
    setStatus(`翻译错误：${error.message}`);
  }
}

function updateSelection(text, rect) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return;
  }

  state.selectedText = cleaned;
  state.context = extractContext(cleaned);
  elements.selectedText.textContent = cleaned;
  elements.emptySelection.classList.add("hidden");
  elements.selectionCard.classList.remove("hidden");
  elements.translationResult.classList.add("hidden");
  renderMatches(getMatches(cleaned));

  // Auto-translate to Chinese
  translateToChinese(cleaned);

  if (rect) {
    showWordFocus(rect);
  }
}

function showWordFocus(rect) {
  let highlight = document.querySelector(".word-focus-highlight");
  if (!highlight) {
    highlight = document.createElement("div");
    highlight.className = "word-focus-highlight";
    document.body.append(highlight);
  }

  highlight.style.left = `${rect.left - 2}px`;
  highlight.style.top = `${rect.top - 2}px`;
  highlight.style.width = `${rect.width + 4}px`;
  highlight.style.height = `${rect.height + 4}px`;
  highlight.classList.add("visible");
  window.clearTimeout(showWordFocus.timeoutId);
  showWordFocus.timeoutId = window.setTimeout(() => {
    highlight.classList.remove("visible");
  }, 1400);
}

function isWordChar(char) {
  return /[A-Za-z0-9+/_-]/.test(char);
}

function getWordBoundsAt(text, offset) {
  if (!text) {
    return { text: "", start: 0, end: 0 };
  }

  let start = Math.max(0, Math.min(offset, text.length - 1));
  let end = start;

  if (!isWordChar(text[start]) && start > 0 && isWordChar(text[start - 1])) {
    start -= 1;
    end = start;
  }

  while (start > 0 && isWordChar(text[start - 1])) {
    start -= 1;
  }
  while (end < text.length && isWordChar(text[end])) {
    end += 1;
  }

  const rawWord = text.slice(start, end);
  const trimmedWord = rawWord.replace(/^[-_+/]+|[-_+/]+$/g, "");
  const trimStart = rawWord.search(/[A-Za-z0-9]/);
  const trimEnd = rawWord.search(/[-_+/]+$/);

  return {
    text: trimmedWord,
    start: trimStart >= 0 ? start + trimStart : start,
    end: trimEnd > 0 ? start + trimEnd : end,
  };
}

function getRangeRect(textNode, start, end) {
  if (end <= start) {
    return textNode.parentElement?.getBoundingClientRect() || null;
  }

  const range = document.createRange();
  range.setStart(textNode, start);
  range.setEnd(textNode, end);
  const rects = Array.from(range.getClientRects()).filter((item) => item.width > 0 && item.height > 0);
  const rect = rects[0] || range.getBoundingClientRect();
  range.detach?.();
  return rect;
}

function getCaretFromPoint(x, y) {
  if (document.caretPositionFromPoint) {
    const position = document.caretPositionFromPoint(x, y);
    return position ? { node: position.offsetNode, offset: position.offset } : null;
  }

  if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y);
    return range ? { node: range.startContainer, offset: range.startOffset } : null;
  }

  return null;
}

function getOffsetByRangeMeasurement(textNode, x) {
  const text = textNode.textContent || "";
  if (!text) {
    return 0;
  }

  let low = 0;
  let high = text.length;
  const range = document.createRange();

  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    range.setStart(textNode, 0);
    range.setEnd(textNode, mid);
    const rect = range.getBoundingClientRect();

    if (x <= rect.right) {
      high = mid - 1;
    } else {
      low = mid;
    }
  }

  range.detach?.();
  return Math.max(0, Math.min(text.length, low));
}

function getTextNodeFromTarget(target) {
  if (target instanceof Text) {
    return target;
  }

  if (!(target instanceof HTMLElement)) {
    return null;
  }

  return Array.from(target.childNodes).find((node) => node.nodeType === Node.TEXT_NODE) || null;
}

function getTextNodesFromSpan(span) {
  return Array.from(span.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent);
}

function getPointerCandidateSpans(x, y, target) {
  const spans = new Set();
  const targetSpan = target instanceof HTMLElement ? target.closest("#text-layer span") : null;
  if (targetSpan) {
    spans.add(targetSpan);
  }

  for (const element of document.elementsFromPoint(x, y)) {
    if (element instanceof HTMLElement && element.matches("#text-layer span")) {
      spans.add(element);
    }
  }

  const lineTolerance = 14;
  for (const span of elements.textLayer.querySelectorAll("span")) {
    const rect = span.getBoundingClientRect();
    if (
      rect.width > 0 &&
      rect.height > 0 &&
      y >= rect.top - lineTolerance &&
      y <= rect.bottom + lineTolerance &&
      x >= rect.left - 28 &&
      x <= rect.right + 28
    ) {
      spans.add(span);
    }
  }

  return Array.from(spans);
}

function distanceToRect(x, y, rect) {
  const dx = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0;
  const dy = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0;
  return dx * dx + dy * dy;
}

function getNearestWordFromPointer(x, y, target) {
  const candidates = [];
  const wordPattern = /[A-Za-z0-9][A-Za-z0-9+/_-]*/g;

  for (const span of getPointerCandidateSpans(x, y, target)) {
    for (const textNode of getTextNodesFromSpan(span)) {
      const text = textNode.textContent || "";
      for (const match of text.matchAll(wordPattern)) {
        const start = match.index || 0;
        const end = start + match[0].length;
        const rect = getRangeRect(textNode, start, end);
        if (!rect || rect.width <= 0 || rect.height <= 0) {
          continue;
        }
        const sameLine = y >= rect.top - 8 && y <= rect.bottom + 8;
        candidates.push({
          text: match[0],
          rect,
          sameLine,
          distance: distanceToRect(x, y, rect),
          centerDistance: Math.abs(x - (rect.left + rect.width / 2)),
        });
      }
    }
  }

  const sameLineCandidates = candidates.filter((candidate) => candidate.sameLine);
  const pool = sameLineCandidates.length ? sameLineCandidates : candidates;
  pool.sort((a, b) => a.distance - b.distance || a.centerDistance - b.centerDistance);
  return pool[0] || null;
}

function pickWordFromPointer(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.closest("#text-layer")) {
    return { text: "", rect: null };
  }

  const nearest = getNearestWordFromPointer(event.clientX, event.clientY, target);
  if (nearest) {
    return { text: nearest.text, rect: nearest.rect };
  }

  const caret = getCaretFromPoint(event.clientX, event.clientY);
  let textNode = caret?.node?.nodeType === Node.TEXT_NODE ? caret.node : getTextNodeFromTarget(target);
  const targetTextNode = getTextNodeFromTarget(target);

  if (!textNode || !target.contains(textNode)) {
    textNode = targetTextNode;
  }

  if (!textNode) {
    return { text: "", rect: null };
  }

  const text = textNode.textContent || "";
  const offset = caret?.node === textNode ? caret.offset : getOffsetByRangeMeasurement(textNode, event.clientX);
  const word = getWordBoundsAt(text, offset);
  return {
    text: word.text,
    rect: getRangeRect(textNode, word.start, word.end) || target.getBoundingClientRect(),
  };
}

function readSelection() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) {
    return;
  }
  const text = selection.toString();
  const range = selection.rangeCount ? selection.getRangeAt(0) : null;
  updateSelection(text, range?.getBoundingClientRect());
}

async function renderPage() {
  if (!state.pdf) {
    return;
  }

  const renderId = ++state.renderId;
  const page = await state.pdf.getPage(state.pageNumber);
  if (renderId !== state.renderId) return;

  const viewport = page.getViewport({ scale: state.scale });
  const pixelRatio = window.devicePixelRatio || 1;
  const canvas = elements.canvas;
  const context = canvas.getContext("2d", { alpha: false });

  canvas.width = Math.floor(viewport.width * pixelRatio);
  canvas.height = Math.floor(viewport.height * pixelRatio);
  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;
  elements.pageShell.style.width = `${viewport.width}px`;
  elements.pageShell.style.height = `${viewport.height}px`;
  elements.textLayer.style.width = `${viewport.width}px`;
  elements.textLayer.style.height = `${viewport.height}px`;
  elements.textLayer.style.setProperty("--total-scale-factor", state.scale);
  elements.textLayer.replaceChildren();

  await page.render({
    canvasContext: context,
    viewport,
    transform: pixelRatio === 1 ? null : [pixelRatio, 0, 0, pixelRatio, 0, 0],
  }).promise;

  if (renderId !== state.renderId) return;

  const textContent = await page.getTextContent();
  state.pageText = textContent.items.map((item) => item.str).join(" ");
  const textLayer = new pdfjsLib.TextLayer({
    textContentSource: textContent,
    container: elements.textLayer,
    viewport,
  });
  await textLayer.render();

  elements.pageNumber.value = String(state.pageNumber);
  elements.pageNumber.max = String(state.pageCount);
  elements.pageCount.textContent = `/ ${state.pageCount}`;
  setStatus(`已加载第 ${state.pageNumber} / ${state.pageCount} 页`);
}

async function loadPdf(source, label = "svisual_ug.pdf") {
  setStatus(`正在加载 ${label}...`);
  const loadingTask = pdfjsLib.getDocument({
    url: typeof source === "string" ? source : undefined,
    data: source instanceof Uint8Array ? source : undefined,
    cMapUrl: "/pdfjs/cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    wasmUrl: "/pdfjs/wasm/",
  });

  state.pdf = await loadingTask.promise;
  state.pageCount = state.pdf.numPages;
  state.pageNumber = 1;
  await renderPage();
}

function searchTerms(query) {
  const normalized = normalizeText(query);
  const results = glossary
    .filter((item) => {
      // Category filter
      if (state.activeCategory !== "all" && item.category !== state.activeCategory) {
        return false;
      }
      
      const haystack = normalizeText(`${item.term} ${item.zh} ${item.explanation} ${(item.aliases || []).join(" ")}`);
      return !normalized || haystack.includes(normalized);
    })
    .slice(0, 12);

  elements.termResults.innerHTML = results
    .map(
      (item) => `
        <article class="term-item">
          <b>${escapeHtml(item.term)}</b>：${escapeHtml(item.zh)}
          <div>${escapeHtml(item.explanation)}</div>
          <div class="label">类别：${escapeHtml(item.category)}</div>
        </article>
      `,
    )
    .join("");
}

function persistNotes() {
  localStorage.setItem("sentaurus-reader-notes", JSON.stringify(state.notes));
}

function renderNotes() {
  if (state.notes.length === 0) {
    elements.notes.innerHTML = '<div class="empty-state">暂无笔记。</div>';
    return;
  }

  elements.notes.innerHTML = state.notes
    .map(
      (note) => `
        <article class="note">
          <b>${escapeHtml(note.text)}</b>
          <div>第 ${note.page} 页</div>
          <div>${escapeHtml(note.context)}</div>
        </article>
      `,
    )
    .join("");
}

elements.prevPage.addEventListener("click", () => {
  if (state.pageNumber > 1) {
    state.pageNumber -= 1;
    renderPage();
  }
});

elements.nextPage.addEventListener("click", () => {
  if (state.pageNumber < state.pageCount) {
    state.pageNumber += 1;
    renderPage();
  }
});

function goToPageFromInput() {
  const next = Number.parseInt(elements.pageNumber.value, 10);
  if (Number.isFinite(next) && next >= 1 && next <= state.pageCount) {
    state.pageNumber = next;
    renderPage();
  }
}

elements.pageNumber.addEventListener("change", goToPageFromInput);
elements.pageNumber.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    goToPageFromInput();
  }
});

elements.zoomIn.addEventListener("click", () => {
  state.scale = Math.min(2, state.scale + 0.1);
  elements.zoomValue.textContent = `${Math.round(state.scale * 100)}%`;
  renderPage();
});

elements.zoomOut.addEventListener("click", () => {
  state.scale = Math.max(0.8, state.scale - 0.1);
  elements.zoomValue.textContent = `${Math.round(state.scale * 100)}%`;
  renderPage();
});

// Theme toggle
elements.toggleTheme.addEventListener("click", () => {
  state.theme = state.theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("sentaurus-reader-theme", state.theme);
});

// Initialize theme
if (state.theme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

// Tab switching
elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchTab(button.getAttribute("data-tab"));
  });
});

// Category filter
elements.filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    state.activeCategory = category;
    
    elements.filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    
    searchTerms(elements.termSearch.value);
  });
});

// Close selection card
elements.closeSelection.addEventListener("click", () => {
  elements.selectionCard.classList.add("hidden");
  elements.emptySelection.classList.remove("hidden");
  state.selectedText = "";
});

async function uploadFiles(files) {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  try {
    setStatus("正在上传文件...");
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      setStatus(`成功上传 ${result.files.length} 个文件`);
      await loadUploadedFiles();
    } else {
      setStatus(`上传失败：${result.error}`);
    }
  } catch (error) {
    setStatus(`上传失败：${error.message}`);
  }
}

elements.uploadInput.addEventListener("change", async () => {
  const files = Array.from(elements.uploadInput.files || []);
  if (files.length === 0) return;
  await uploadFiles(files);
  elements.uploadInput.value = "";
});

async function loadUploadedFiles() {
  try {
    const response = await fetch("/api/files");
    const result = await response.json();

    if (result.files && result.files.length > 0) {
      elements.uploadedFiles.innerHTML = result.files
        .map(
          (file) => `
            <div class="uploaded-file-item">
              <span>${escapeHtml(file.name)}</span>
              <button data-path="${escapeHtml(file.path)}" type="button">打开</button>
            </div>
          `,
        )
        .join("");

      elements.uploadedFiles.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          const path = button.getAttribute("data-path");
          loadPdf(path, path.split("/").pop());
        });
      });
    } else {
      elements.uploadedFiles.innerHTML = '<div class="empty-state">暂无已上传的 PDF 文件。</div>';
    }
  } catch (error) {
    elements.uploadedFiles.innerHTML = '<div class="empty-state">加载文件列表失败。</div>';
  }
}

elements.refreshFiles.addEventListener("click", () => {
  loadUploadedFiles();
});

document.addEventListener("mouseup", () => setTimeout(readSelection, 0));
document.addEventListener("keyup", (event) => {
  if (event.key === "Shift" || event.key.startsWith("Arrow")) {
    readSelection();
  }
});

elements.textLayer.addEventListener("dblclick", (event) => {
  const picked = pickWordFromPointer(event);
  if (picked.text) {
    event.preventDefault();
    updateSelection(picked.text, picked.rect);
  }
});


elements.copyText.addEventListener("click", () => copyText(state.selectedText));
elements.copyPrompt.addEventListener("click", () => copyText(buildPrompt()));
elements.askAi.addEventListener("click", () => {
  switchTab("ai");
  sendAiQuestion(state.selectedText ? `请解释当前选中的文本：${state.selectedText}` : "请说明当前页面的重点内容。");
});

elements.aiSendButton.addEventListener("click", () => {
  sendAiQuestion(elements.aiChatInput.value);
});

elements.aiChatInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    sendAiQuestion(elements.aiChatInput.value);
  }
});

elements.aiQuickActions.forEach((button) => {
  button.addEventListener("click", () => {
    switchTab("ai");
    sendAiQuestion(buildQuickQuestion(button.getAttribute("data-prompt") || ""));
  });
});

elements.saveNote.addEventListener("click", () => {
  if (!state.selectedText) return;
  state.notes.unshift({
    text: state.selectedText,
    context: state.context,
    page: state.pageNumber,
    createdAt: new Date().toISOString(),
  });
  state.notes = state.notes.slice(0, 80);
  persistNotes();
  renderNotes();
  setStatus("已保存阅读笔记");
});

elements.exportNotes.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state.notes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sentaurus-reading-notes.json";
  link.click();
  URL.revokeObjectURL(url);
});

elements.termSearch.addEventListener("input", () => searchTerms(elements.termSearch.value));

searchTerms("");
renderNotes();
refreshAiStatus();
loadUploadedFiles().then(() => {
  const firstFile = elements.uploadedFiles.querySelector("button");
  if (firstFile) {
    firstFile.click();
  } else {
    setStatus("请先上传 PDF 文件");
  }
});
