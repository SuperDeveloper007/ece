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
  layout: document.querySelector(".layout"),
  status: document.querySelector("#status"),
  canvas: document.querySelector("#pdf-canvas"),
  textLayer: document.querySelector("#text-layer"),
  pageShell: document.querySelector("#page-shell"),
  panelResizer: document.querySelector("#panel-resizer"),
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
  aiProviderSelect: document.querySelector("#ai-provider-select"),
  aiModeSelect: document.querySelector("#ai-mode-select"),
  aiModelSelect: document.querySelector("#ai-model-select"),
  aiChatMessages: document.querySelector("#ai-chat-messages"),
  aiChatInput: document.querySelector("#ai-chat-input"),
  aiSendButton: document.querySelector("#ai-send-button"),
  aiEditingBanner: document.querySelector("#ai-editing-banner"),
  aiCancelEdit: document.querySelector("#ai-cancel-edit"),
  aiAttachments: document.querySelector("#ai-attachments"),
  aiAttachTrigger: document.querySelector("#ai-attach-trigger"),
  aiFileInput: document.querySelector("#ai-file-input"),
  aiNewSession: document.querySelector("#ai-new-session"),
  aiClearHistory: document.querySelector("#ai-clear-history"),
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
  aiProvider: localStorage.getItem("sentaurus-reader-ai-provider") || "",
  aiProviders: [],
  aiMode: localStorage.getItem("sentaurus-reader-ai-mode") === "plan" ? "plan" : "answer",
  aiModel: localStorage.getItem("sentaurus-reader-ai-model") || "",
  aiModels: [],
  aiAttachments: [],
  aiBusy: false,
  aiRequestController: null,
  editingMessageId: null,
};

const panelSize = {
  minPanel: 300,
  minReader: 420,
  storageKey: "sentaurus-reader-assistant-width",
};

const aiSession = {
  storageKey: "sentaurus-reader-ai-session",
  maxMessages: 40,
};

const aiAttachmentLimits = {
  maxFiles: 5,
  maxFileBytes: 2 * 1024 * 1024,
  maxContentChars: 8000,
  maxTotalChars: 24000,
};

function normalizeText(value) {
  return value.toLowerCase().replace(/[^\w+-]+/g, " ").trim();
}

function setStatus(message) {
  elements.status.textContent = message;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getPanelWidthBounds() {
  const layoutWidth = elements.layout.getBoundingClientRect().width;
  return {
    min: panelSize.minPanel,
    max: Math.max(panelSize.minPanel, layoutWidth - panelSize.minReader),
  };
}

function setPanelWidth(width, { persist = true } = {}) {
  const bounds = getPanelWidthBounds();
  const nextWidth = clamp(width, bounds.min, bounds.max);
  document.documentElement.style.setProperty("--assistant-width", `${nextWidth}px`);
  elements.panelResizer.setAttribute("aria-valuenow", String(Math.round(nextWidth)));

  if (persist) {
    localStorage.setItem(panelSize.storageKey, String(Math.round(nextWidth)));
  }
}

function getPanelWidthFromPointer(clientX) {
  const layoutRect = elements.layout.getBoundingClientRect();
  return layoutRect.right - clientX - elements.panelResizer.offsetWidth / 2;
}

function getCurrentPanelWidth() {
  const width = getComputedStyle(document.documentElement).getPropertyValue("--assistant-width");
  return Number(width.replace("px", ""));
}

function initPanelResizer() {
  const savedValue = localStorage.getItem(panelSize.storageKey);
  const savedWidth = savedValue ? Number(savedValue) : NaN;
  if (Number.isFinite(savedWidth)) {
    setPanelWidth(savedWidth, { persist: false });
  } else {
    setPanelWidth(getCurrentPanelWidth(), { persist: false });
  }

  const bounds = getPanelWidthBounds();
  elements.panelResizer.setAttribute("aria-valuemin", String(bounds.min));
  elements.panelResizer.setAttribute("aria-valuemax", String(bounds.max));

  elements.panelResizer.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    event.preventDefault();
    elements.panelResizer.setPointerCapture(event.pointerId);
    elements.panelResizer.classList.add("dragging");
    document.body.classList.add("resizing-panel");
    setPanelWidth(getPanelWidthFromPointer(event.clientX));
  });

  elements.panelResizer.addEventListener("pointermove", (event) => {
    if (!elements.panelResizer.hasPointerCapture(event.pointerId)) {
      return;
    }

    setPanelWidth(getPanelWidthFromPointer(event.clientX));
  });

  const stopDragging = (event) => {
    if (elements.panelResizer.hasPointerCapture(event.pointerId)) {
      elements.panelResizer.releasePointerCapture(event.pointerId);
    }
    elements.panelResizer.classList.remove("dragging");
    document.body.classList.remove("resizing-panel");
  };

  elements.panelResizer.addEventListener("pointerup", stopDragging);
  elements.panelResizer.addEventListener("pointercancel", stopDragging);

  elements.panelResizer.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const delta = event.key === "ArrowLeft" ? 24 : -24;
    setPanelWidth(getCurrentPanelWidth() + delta);
  });

  window.addEventListener("resize", () => {
    setPanelWidth(getCurrentPanelWidth(), { persist: false });
    const nextBounds = getPanelWidthBounds();
    elements.panelResizer.setAttribute("aria-valuemin", String(nextBounds.min));
    elements.panelResizer.setAttribute("aria-valuemax", String(nextBounds.max));
  });
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
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
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

function safeLinkUrl(value) {
  const trimmed = String(value || "").trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) {
    return trimmed;
  }
  return "";
}

function renderInlineMarkdown(value) {
  const source = String(value ?? "");
  const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let html = "";
  let lastIndex = 0;
  let match;

  const formatText = (text) =>
    escapeHtml(text)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/__([^_]+)__/g, "<strong>$1</strong>");

  while ((match = linkPattern.exec(source)) !== null) {
    html += formatText(source.slice(lastIndex, match.index));
    const href = safeLinkUrl(match[2]);
    const label = formatText(match[1]);
    html += href
      ? `<a href="${escapeAttribute(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
      : label;
    lastIndex = match.index + match[0].length;
  }

  html += formatText(source.slice(lastIndex));
  return html;
}

function isTableSeparator(line) {
  const cells = line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(lines, startIndex) {
  const header = splitTableRow(lines[startIndex]);
  const bodyRows = [];
  let index = startIndex + 2;

  while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
    bodyRows.push(splitTableRow(lines[index]));
    index += 1;
  }

  const columnCount = header.length;
  const headHtml = header.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join("");
  const bodyHtml = bodyRows
    .map((row) => {
      const cells = Array.from({ length: columnCount }, (_, cellIndex) => row[cellIndex] || "");
      return `<tr>${cells.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`;
    })
    .join("");

  return {
    html: `<div class="ai-markdown-table-wrapper"><table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`,
    nextIndex: index,
  };
}

function renderMarkdown(value) {
  const lines = String(value ?? "").replace(/\r\n?/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let index = 0;

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }
    html.push(`<p>${paragraph.map(renderInlineMarkdown).join("<br>")}</p>`);
    paragraph = [];
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      index += 1;
      continue;
    }

    const fenceMatch = trimmed.match(/^```\s*([A-Za-z0-9_-]+)?\s*$/);
    if (fenceMatch) {
      flushParagraph();
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) {
        index += 1;
      }
      const language = fenceMatch[1] ? ` data-language="${escapeAttribute(fenceMatch[1])}"` : "";
      html.push(`<pre><code${language}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    if (line.includes("|") && lines[index + 1] && isTableSeparator(lines[index + 1])) {
      flushParagraph();
      const rendered = renderTable(lines, index);
      html.push(rendered.html);
      index = rendered.nextIndex;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      const level = Math.min(headingMatch[1].length + 2, 6);
      html.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      const quoteLines = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote>${quoteLines.map(renderInlineMarkdown).join("<br>")}</blockquote>`);
      continue;
    }

    const listMatch = trimmed.match(/^((?:[-*+])|\d+\.)\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      const ordered = /^\d+\./.test(listMatch[1]);
      const items = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        const currentMatch = current.match(/^((?:[-*+])|\d+\.)\s+(.+)$/);
        if (!currentMatch || /^\d+\./.test(currentMatch[1]) !== ordered) {
          break;
        }
        items.push(currentMatch[2]);
        index += 1;
      }
      const tag = ordered ? "ol" : "ul";
      html.push(`<${tag}>${items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</${tag}>`);
      continue;
    }

    paragraph.push(line);
    index += 1;
  }

  flushParagraph();
  return html.join("");
}

function formatMessageTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
}

function createMessageId() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `message-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function setAiBusy(busy) {
  state.aiBusy = busy;
  elements.aiSendButton.textContent = busy ? "Stop" : "Send";
  elements.aiSendButton.classList.toggle("ai-stop-button", busy);
  elements.aiChatInput.disabled = busy;
  elements.aiFileInput.disabled = busy;
  elements.aiAttachTrigger.disabled = busy;
  elements.aiProviderSelect.disabled = busy;
  elements.aiModeSelect.disabled = busy;
  elements.aiModelSelect.disabled = busy;
  elements.aiQuickActions.forEach((button) => {
    button.disabled = busy;
  });
}

function formatFileSize(value) {
  const bytes = Number(value) || 0;
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function renderAiAttachments() {
  elements.aiAttachments.replaceChildren();
  elements.aiAttachments.classList.toggle("hidden", state.aiAttachments.length === 0);

  state.aiAttachments.forEach((attachment) => {
    const chip = document.createElement("div");
    chip.className = "ai-attachment-chip";

    const label = document.createElement("span");
    label.textContent = `${attachment.name} · ${formatFileSize(attachment.size)}`;
    label.title = attachment.name;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.title = `Remove ${attachment.name}`;
    removeButton.setAttribute("aria-label", `Remove ${attachment.name}`);
    removeButton.addEventListener("click", () => {
      state.aiAttachments = state.aiAttachments.filter((item) => item.id !== attachment.id);
      renderAiAttachments();
    });

    chip.append(label, removeButton);
    elements.aiAttachments.append(chip);
  });
}

function setAiAttachments(attachments) {
  state.aiAttachments = attachments.map((item) => ({
    id: item.id || createMessageId(),
    name: String(item.name || "Untitled file"),
    type: String(item.type || "text/plain"),
    size: Number(item.size) || 0,
    content: String(item.content || ""),
  }));
  renderAiAttachments();
}

async function extractPdfAttachment(file) {
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const pdf = await loadingTask.promise;
  const pages = [];
  let length = 0;

  try {
    for (let pageNumber = 1; pageNumber <= Math.min(pdf.numPages, 10); pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str || "").join(" ").trim();
      if (pageText) {
        const section = `[Page ${pageNumber}]\n${pageText}`;
        pages.push(section);
        length += section.length;
      }
      if (length >= aiAttachmentLimits.maxContentChars) {
        break;
      }
    }
  } finally {
    await pdf.destroy();
  }

  return pages.join("\n\n").slice(0, aiAttachmentLimits.maxContentChars);
}

async function extractAiAttachment(file) {
  if (file.size > aiAttachmentLimits.maxFileBytes) {
    throw new Error(`${file.name} is larger than 2 MB`);
  }

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  const content = isPdf
    ? await extractPdfAttachment(file)
    : (await file.text()).replace(/\0/g, "").slice(0, aiAttachmentLimits.maxContentChars);

  if (!content.trim()) {
    throw new Error(`No readable text found in ${file.name}`);
  }

  return {
    id: createMessageId(),
    name: file.name,
    type: file.type || "text/plain",
    size: file.size,
    content,
  };
}

async function addAiFiles(fileList) {
  const availableSlots = aiAttachmentLimits.maxFiles - state.aiAttachments.length;
  const files = Array.from(fileList || []).slice(0, Math.max(0, availableSlots));
  if (files.length === 0) {
    setAiStatus(`Up to ${aiAttachmentLimits.maxFiles} files per message`);
    return;
  }

  setAiStatus("Reading files…");
  const added = [];
  const errors = [];
  let totalChars = state.aiAttachments.reduce((sum, item) => sum + item.content.length, 0);

  for (const file of files) {
    try {
      const attachment = await extractAiAttachment(file);
      const remaining = aiAttachmentLimits.maxTotalChars - totalChars;
      if (remaining <= 0) {
        throw new Error("The attachment text limit has been reached");
      }
      attachment.content = attachment.content.slice(0, remaining);
      totalChars += attachment.content.length;
      added.push(attachment);
    } catch (error) {
      errors.push(error.message);
    }
  }

  setAiAttachments([...state.aiAttachments, ...added]);
  setAiStatus(errors.length ? `Added ${added.length} · ${errors[0]}` : `Added ${added.length} file${added.length === 1 ? "" : "s"}`);
}

function renderAiMessages() {
  elements.aiChatMessages.replaceChildren();
  state.aiMessages.forEach((message) => renderAiMessage(message));
  elements.aiChatMessages.scrollTop = elements.aiChatMessages.scrollHeight;
}

function cancelMessageEdit({ clearInput = true } = {}) {
  state.editingMessageId = null;
  elements.aiEditingBanner.classList.add("hidden");
  if (clearInput) {
    elements.aiChatInput.value = "";
  }
  setAiAttachments([]);
}

function beginMessageEdit(messageData) {
  if (state.aiBusy) {
    return;
  }
  state.editingMessageId = messageData.id;
  elements.aiChatInput.value = messageData.content;
  setAiAttachments(messageData.attachments || []);
  if (["answer", "plan"].includes(messageData.mode)) {
    state.aiMode = messageData.mode;
    elements.aiModeSelect.value = messageData.mode;
  }
  if (messageData.provider && state.aiProviders.some((item) => item.id === messageData.provider)) {
    selectAiProvider(messageData.provider);
  }
  if (messageData.model && state.aiModels.includes(messageData.model)) {
    state.aiModel = messageData.model;
    elements.aiModelSelect.value = messageData.model;
  }
  elements.aiEditingBanner.classList.remove("hidden");
  setAiStatus("Editing message");
  elements.aiChatInput.focus();
  elements.aiChatInput.setSelectionRange(elements.aiChatInput.value.length, elements.aiChatInput.value.length);
}

function persistAiMessages() {
  const messages = state.aiMessages.slice(-aiSession.maxMessages).map((item) => ({
    id: item.id,
    role: item.role,
    content: item.content,
    createdAt: item.createdAt,
    pageNumber: item.pageNumber,
    selectedText: item.selectedText,
    isError: Boolean(item.isError),
    attachments: item.attachments || [],
    mode: item.mode || "answer",
    model: item.model || "",
    provider: item.provider || "",
  }));
  localStorage.setItem(aiSession.storageKey, JSON.stringify(messages));
}

function renderAiMessage(messageData) {
  const { role, content, createdAt, transient, isError, attachments = [] } = messageData;
  const message = document.createElement("article");
  message.className = `ai-message ai-message-${role}`;
  message.classList.toggle("ai-message-error", Boolean(isError));

  const header = document.createElement("div");
  header.className = "ai-message-header";

  const label = document.createElement("div");
  label.className = "ai-message-label";
  label.textContent = role === "user" ? "You" : "AI";

  const meta = document.createElement("span");
  meta.className = "ai-message-meta";
  meta.textContent = formatMessageTime(createdAt);

  const labelGroup = document.createElement("div");
  labelGroup.className = "ai-message-title";
  labelGroup.append(label);
  if (meta.textContent) {
    labelGroup.append(meta);
  }

  const actions = document.createElement("div");
  actions.className = "ai-message-actions";

  if (role === "user" && !transient) {
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "ai-message-action";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => beginMessageEdit(messageData));
    actions.append(editButton);
  }

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "ai-message-action";
  copyButton.textContent = "Copy";
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(content);
      copyButton.textContent = "Copied";
      setAiStatus("Copied to clipboard");
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1400);
    } catch (error) {
      setAiStatus(`Copy failed: ${error.message}`);
    }
  });
  actions.append(copyButton);

  if (role === "assistant" && !transient) {
    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.className = "ai-message-action";
    retryButton.textContent = "Retry";
    retryButton.addEventListener("click", () => retryAiMessage(messageData.id));
    actions.append(retryButton);
  }
  header.append(labelGroup, actions);

  const body = document.createElement("div");
  body.className = "ai-message-body";
  body.innerHTML = renderMarkdown(content);

  if (role === "user" && attachments.length > 0) {
    const attachmentList = document.createElement("div");
    attachmentList.className = "ai-message-attachment-list";
    attachments.forEach((attachment) => {
      const item = document.createElement("span");
      item.textContent = `📎 ${attachment.name}`;
      attachmentList.append(item);
    });
    body.append(attachmentList);
  }

  message.append(header, body);
  elements.aiChatMessages.append(message);
  elements.aiChatMessages.scrollTop = elements.aiChatMessages.scrollHeight;
}

function appendAiMessage(
  role,
  content,
  {
    persist = true,
    id,
    createdAt,
    pageNumber,
    selectedText,
    isError = false,
    attachments = [],
    mode = "answer",
    model = "",
    provider = "",
  } = {},
) {
  const messageData = {
    id: id || createMessageId(),
    role,
    content: String(content ?? ""),
    createdAt: createdAt || new Date().toISOString(),
    pageNumber: pageNumber ?? state.pageNumber,
    selectedText: selectedText ?? state.selectedText,
    isError,
    transient: !persist,
    attachments,
    mode,
    model,
    provider,
  };

  renderAiMessage(messageData);

  if (persist) {
    state.aiMessages.push(messageData);
    state.aiMessages = state.aiMessages.slice(-aiSession.maxMessages);
    persistAiMessages();
  }
}

function restoreAiMessages() {
  let savedMessages = [];
  try {
    const parsed = JSON.parse(localStorage.getItem(aiSession.storageKey) || "[]");
    if (Array.isArray(parsed)) {
      savedMessages = parsed
        .filter((item) => item && ["user", "assistant"].includes(item.role) && item.content)
        .map((item) => ({
          id: String(item.id || createMessageId()),
          role: item.role,
          content: String(item.content),
          createdAt: item.createdAt || new Date().toISOString(),
          pageNumber: Number.isFinite(Number(item.pageNumber)) ? Number(item.pageNumber) : null,
          selectedText: String(item.selectedText || ""),
          isError: Boolean(item.isError),
          attachments: Array.isArray(item.attachments) ? item.attachments : [],
          mode: item.mode === "plan" ? "plan" : "answer",
          model: String(item.model || ""),
          provider: String(item.provider || ""),
        }))
        .slice(-aiSession.maxMessages);
    }
  } catch {
    savedMessages = [];
  }

  state.aiMessages = savedMessages;
  renderAiMessages();
  return savedMessages.length;
}

function clearAiSession(message = "History cleared. Start a new conversation whenever you're ready.") {
  state.aiRequestController?.abort();
  state.aiMessages = [];
  localStorage.removeItem(aiSession.storageKey);
  elements.aiChatMessages.replaceChildren();
  cancelMessageEdit();
  appendAiMessage("assistant", message, { persist: false });
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

function buildQuickQuestion(action) {
  if (action === "explain-selection") {
    return state.selectedText
      ? `Explain this selected text in its Sentaurus Visual / TCAD context: ${state.selectedText}`
      : "Explain the key concepts on the current PDF page.";
  }

  if (action === "summarize-page") {
    return "Summarize the current PDF page and highlight the parts most relevant to Sentaurus Visual / TCAD workflows.";
  }

  if (action === "study-cards") {
    return state.selectedText
      ? `Create a study card for “${state.selectedText}” with its meaning, TCAD use case, common pitfall, and a memory cue.`
      : "Create three concise study cards from the current PDF page, including meaning, use case, pitfall, and memory cue.";
  }

  if (action === "follow-ups") {
    const latestAnswer = [...state.aiMessages].reverse().find((item) => item.role === "assistant")?.content || "";
    return latestAnswer
      ? `Suggest three useful follow-up questions based on your previous answer, and briefly explain why each matters. Previous answer: ${latestAnswer}`
      : "Suggest three useful follow-up questions based on the current PDF page, and briefly explain why each matters.";
  }

  if (action === "translate") {
    return state.selectedText
      ? `Translate the selected text into Chinese, then explain its technical meaning and practical use in Sentaurus Visual / TCAD: ${state.selectedText}`
      : "Identify the key English terms on the current PDF page, translate them into Chinese, and explain their TCAD meaning.";
  }

  return action;
}

function getActiveAiProvider() {
  return state.aiProviders.find((item) => item.id === state.aiProvider) || null;
}

function selectAiProvider(providerId, { persist = true } = {}) {
  const provider = state.aiProviders.find((item) => item.id === providerId) || state.aiProviders[0];
  if (!provider) {
    state.aiProvider = "";
    state.aiModels = [];
    state.aiModel = "";
    elements.aiModelSelect.replaceChildren();
    return;
  }

  state.aiProvider = provider.id;
  state.aiModels = provider.models;
  elements.aiProviderSelect.value = provider.id;
  if (persist) {
    localStorage.setItem("sentaurus-reader-ai-provider", provider.id);
  }

  const providerModelKey = `sentaurus-reader-ai-model:${provider.id}`;
  const savedModel = localStorage.getItem(providerModelKey);
  const preferredModel = provider.models.includes(savedModel)
    ? savedModel
    : provider.models.includes(state.aiModel)
      ? state.aiModel
      : provider.model || provider.models[0] || "";

  elements.aiModelSelect.replaceChildren();
  provider.models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    elements.aiModelSelect.append(option);
  });
  state.aiModel = preferredModel;
  elements.aiModelSelect.value = preferredModel;
  if (preferredModel) {
    localStorage.setItem(providerModelKey, preferredModel);
    localStorage.setItem("sentaurus-reader-ai-model", preferredModel);
  }
}

async function refreshAiStatus() {
  try {
    const response = await fetch("/api/ai/status");
    const result = await response.json();
    state.aiConfigured = Boolean(result.configured);
    const rawProviders = Array.isArray(result.providers) && result.providers.length
      ? result.providers
      : [{
          id: String(result.provider || "default"),
          label: "Default provider",
          configured: Boolean(result.configured),
          model: String(result.model || "gpt-4o-mini"),
          models: Array.isArray(result.models) ? result.models : [result.model || "gpt-4o-mini"],
        }];
    state.aiProviders = rawProviders.map((provider) => ({
      id: String(provider.id),
      label: String(provider.label || provider.id),
      configured: Boolean(provider.configured),
      model: String(provider.model || ""),
      models: Array.isArray(provider.models) ? provider.models.map(String) : [],
    }));

    elements.aiProviderSelect.replaceChildren();
    state.aiProviders.forEach((provider) => {
      const option = document.createElement("option");
      option.value = provider.id;
      option.textContent = provider.configured ? provider.label : `${provider.label} (not configured)`;
      elements.aiProviderSelect.append(option);
    });
    const preferredProvider = state.aiProviders.some((item) => item.id === state.aiProvider)
      ? state.aiProvider
      : String(result.provider || state.aiProviders[0]?.id || "");
    selectAiProvider(preferredProvider, { persist: false });
    const activeProvider = getActiveAiProvider();
    setAiStatus(activeProvider?.configured ? `${activeProvider.label} · ${state.aiModel}` : "Not configured");

    if (elements.aiChatMessages.childElementCount === 0) {
      appendAiMessage(
        "assistant",
        result.configured
          ? "Ask about the current page, selected text, or an attached file."
          : "The AI service is not configured. Add a provider to .env.local, then restart the app.",
        { persist: false },
      );
    }
  } catch (error) {
    state.aiConfigured = false;
    setAiStatus("Connection unavailable");
    if (elements.aiChatMessages.childElementCount === 0) {
      appendAiMessage("assistant", `Could not load the AI service status: ${error.message}`, { persist: false });
    }
  }
}

function getAiHistory(messages) {
  return messages.filter((item) => !item.isError).slice(-6);
}

function stopAiRequest() {
  if (state.aiRequestController) {
    state.aiRequestController.abort();
  }
}

async function sendAiQuestion(
  question,
  {
    appendUser = true,
    historyOverride = null,
    attachmentsOverride = null,
    modeOverride = null,
    modelOverride = null,
    providerOverride = null,
  } = {},
) {
  const attachmentSource = attachmentsOverride || state.aiAttachments;
  const typedQuestion = String(question || "").replace(/\r\n?/g, "\n").trim();
  const cleaned = typedQuestion || (attachmentSource.length ? "Analyze the attached files." : "");
  if (!cleaned || state.aiBusy) {
    return;
  }

  let historySource = historyOverride;
  if (appendUser && state.editingMessageId) {
    const editIndex = state.aiMessages.findIndex(
      (item) => item.id === state.editingMessageId && item.role === "user",
    );
    if (editIndex >= 0) {
      historySource = state.aiMessages.slice(0, editIndex);
      state.aiMessages = state.aiMessages.slice(0, editIndex);
      persistAiMessages();
      renderAiMessages();
    }
    cancelMessageEdit({ clearInput: false });
  }

  const history = getAiHistory(historySource || state.aiMessages);
  const attachments = attachmentSource;
  const mode = modeOverride || state.aiMode;
  const model = modelOverride || state.aiModel;
  const provider = providerOverride || state.aiProvider;
  if (appendUser) {
    appendAiMessage("user", cleaned, { attachments, mode, model, provider });
  }
  elements.aiChatInput.value = "";
  setAiAttachments([]);
  const controller = new AbortController();
  state.aiRequestController = controller;
  setAiBusy(true);
  setAiStatus("Thinking…");

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
        attachments,
        mode,
        model,
        provider,
      }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      throw new Error(result.error || `Request failed (${response.status})`);
    }

    appendAiMessage("assistant", result.answer);
    setAiStatus(result.model ? `${result.providerLabel || provider} · ${result.model}` : "Done");
  } catch (error) {
    if (error.name === "AbortError") {
      setAiStatus("Generation stopped");
    } else {
      appendAiMessage("assistant", `Request failed: ${error.message}`, { isError: true });
      setAiStatus("Request failed · Retry available");
    }
  } finally {
    if (state.aiRequestController === controller) {
      state.aiRequestController = null;
      setAiBusy(false);
      elements.aiChatInput.focus();
    }
  }
}

function retryAiMessage(messageId) {
  if (state.aiBusy) {
    return;
  }

  const assistantIndex = state.aiMessages.findIndex(
    (item) => item.id === messageId && item.role === "assistant",
  );
  if (assistantIndex < 0) {
    return;
  }

  let userIndex = assistantIndex - 1;
  while (userIndex >= 0 && state.aiMessages[userIndex].role !== "user") {
    userIndex -= 1;
  }
  if (userIndex < 0) {
    setAiStatus("No question found to retry");
    return;
  }

  const question = state.aiMessages[userIndex].content;
  const attachments = state.aiMessages[userIndex].attachments || [];
  const mode = state.aiMessages[userIndex].mode || "answer";
  const model = state.aiMessages[userIndex].model || state.aiModel;
  const provider = state.aiMessages[userIndex].provider || state.aiProvider;
  const history = state.aiMessages.slice(0, userIndex);
  state.aiMessages = state.aiMessages.slice(0, assistantIndex);
  persistAiMessages();
  renderAiMessages();
  cancelMessageEdit();
  sendAiQuestion(question, {
    appendUser: false,
    historyOverride: history,
    attachmentsOverride: attachments,
    modeOverride: mode,
    modelOverride: model,
    providerOverride: provider,
  });
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
initPanelResizer();

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
  sendAiQuestion(state.selectedText
    ? `Explain this selected text in its Sentaurus Visual / TCAD context: ${state.selectedText}`
    : "Summarize the key points on the current page.");
});

elements.aiSendButton.addEventListener("click", () => {
  if (state.aiBusy) {
    stopAiRequest();
    return;
  }
  sendAiQuestion(elements.aiChatInput.value);
});

elements.aiCancelEdit.addEventListener("click", () => {
  cancelMessageEdit();
  setAiStatus(state.aiConfigured ? "Ready" : "Not configured");
  elements.aiChatInput.focus();
});

elements.aiFileInput.addEventListener("change", async () => {
  await addAiFiles(elements.aiFileInput.files);
  elements.aiFileInput.value = "";
  elements.aiChatInput.focus();
});

elements.aiAttachTrigger.addEventListener("click", () => {
  elements.aiFileInput.click();
});

elements.aiProviderSelect.addEventListener("change", () => {
  selectAiProvider(elements.aiProviderSelect.value);
  const provider = getActiveAiProvider();
  setAiStatus(provider?.configured ? `${provider.label} · ${state.aiModel}` : `${provider?.label || "Provider"} is not configured`);
});

elements.aiModeSelect.addEventListener("change", () => {
  state.aiMode = elements.aiModeSelect.value === "plan" ? "plan" : "answer";
  localStorage.setItem("sentaurus-reader-ai-mode", state.aiMode);
  setAiStatus(state.aiMode === "plan" ? "Plan mode" : "Answer mode");
});

elements.aiModelSelect.addEventListener("change", () => {
  state.aiModel = elements.aiModelSelect.value;
  if (state.aiProvider) {
    localStorage.setItem(`sentaurus-reader-ai-model:${state.aiProvider}`, state.aiModel);
  }
  localStorage.setItem("sentaurus-reader-ai-model", state.aiModel);
  const provider = getActiveAiProvider();
  setAiStatus(`${provider?.label || state.aiProvider} · ${state.aiModel}`);
});

elements.aiNewSession.addEventListener("click", () => {
  clearAiSession("New conversation started. Page context and selected text remain available.");
  setAiStatus(state.aiConfigured ? "New conversation" : "Not configured");
  elements.aiChatInput.focus();
});

elements.aiClearHistory.addEventListener("click", () => {
  clearAiSession();
  setAiStatus("History cleared");
  elements.aiChatInput.focus();
});

elements.aiChatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing && event.keyCode !== 229) {
    event.preventDefault();
    sendAiQuestion(elements.aiChatInput.value);
  }
});

elements.aiQuickActions.forEach((button) => {
  button.addEventListener("click", () => {
    switchTab("ai");
    sendAiQuestion(buildQuickQuestion(button.getAttribute("data-action") || ""));
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
elements.aiModeSelect.value = state.aiMode;
renderAiAttachments();
restoreAiMessages();
refreshAiStatus();
loadUploadedFiles().then(() => {
  const firstFile = elements.uploadedFiles.querySelector("button");
  if (firstFile) {
    firstFile.click();
  } else {
    setStatus("请先上传 PDF 文件");
  }
});
