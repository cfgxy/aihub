export const typeSeeds = [
  { key: "app", name: "应用", description: "可直接使用或安装的 AI 产品与辅助工具", sort: 1, accent: 1 },
  { key: "skill", name: "SKILL", description: "面向 Agent 的结构化技能包", sort: 2, accent: 2 },
  { key: "mcp", name: "MCP", description: "连接外部服务和数据的 MCP Server", sort: 3, accent: 3 },
];

export const categorySeeds = {
  app: [
    ["官方应用", "official-apps", "AI 厂商官方出品的完整产品"],
    ["辅助工具", "companion-tools", "围绕 AI 使用、切换与管理的第三方工具"],
  ],
  skill: [
    ["文档与办公", "docs-office", "文档创建、编辑与办公流程"],
    ["编程开发", "development", "代码工作流与技术任务"],
    ["创意与设计", "creative-design", "视觉、艺术与排版创作"],
    ["数据分析", "data-analysis", "结构化数据处理与可视化"],
    ["企业与协作", "enterprise-collaboration", "组织沟通与团队协作"],
    ["自动化与集成", "automation-integration", "工作流编排与跨系统集成"],
  ],
  mcp: [
    ["搜索与网页", "search-web", "网页搜索、抓取与浏览"],
    ["开发与代码", "development-code", "代码托管、版本控制与文件系统"],
    ["数据库与数据", "database-data", "数据库连接与数据分析"],
    ["办公与协作", "office-collaboration", "消息、邮件、日历与文档"],
    ["AI 与知识", "ai-knowledge", "记忆、知识库、RAG 与模型增强"],
    ["云与基础设施", "cloud-infrastructure", "云服务、部署与监控"],
  ],
} as const;

export const resourceSeeds = [
  {
    name: "豆包", slug: "doubao", type: "app", category: "official-apps",
    summary: "字节跳动推出的 AI 助手，支持对话、创作、学习和多模态能力。",
    description: "豆包面向大众用户提供中文 AI 助手体验，覆盖 Web 与移动端。",
    tags: ["官方出品", "Web", "iOS", "Android", "免费增值", "中文支持"],
    officialUrl: "https://www.doubao.com/", sourceUrl: "https://www.doubao.com/",
  },
  {
    name: "Codex", slug: "codex", type: "app", category: "official-apps",
    summary: "OpenAI 的编程智能体，可在云端或本地终端中协助完成软件开发任务。",
    description: "Codex 支持理解代码库、修改代码、执行命令并协助完成工程任务。",
    tags: ["官方出品", "Web", "CLI", "macOS"],
    officialUrl: "https://openai.com/codex/", sourceUrl: "https://github.com/openai/codex",
  },
  {
    name: "Claude", slug: "claude", type: "app", category: "official-apps",
    summary: "Anthropic 推出的通用 AI 助手，覆盖写作、分析、编程与协作场景。",
    description: "Claude 可通过 Web、桌面端和移动端使用，并提供面向开发者的工具。",
    tags: ["官方出品", "Web", "Windows", "macOS", "iOS", "Android"],
    officialUrl: "https://claude.ai/", sourceUrl: "https://www.anthropic.com/claude",
  },
  {
    name: "WorkBuddy", slug: "workbuddy", type: "app", category: "official-apps",
    summary: "腾讯推出的全场景 AI 办公工作台，可规划并交付文档、表格、演示和设计等成果。",
    description: "Tencent WorkBuddy 面向职场用户提供多智能体协作能力，将自然语言需求转化为可继续编辑的办公成果。",
    tags: ["官方出品", "Windows", "macOS", "中文支持"],
    officialUrl: "https://www.workbuddy.ai/", sourceUrl: "https://www.workbuddy.ai/docs/zh/workbuddy/Overview",
  },
  {
    name: "Multica", slug: "multica", type: "app", category: "companion-tools",
    summary: "面向多智能体任务协作的工作平台，用 Issue、运行记录和交付流程组织 AI 团队。",
    description: "Multica 为多智能体协作提供任务管理、评论、运行追踪和团队编排能力。",
    tags: ["社区出品", "Web", "开源"],
    officialUrl: "https://github.com/multica-ai/multica", sourceUrl: "https://github.com/multica-ai/multica",
  },
  {
    name: "Codex++", slug: "codex-plus-plus", type: "app", category: "companion-tools",
    summary: "围绕 Codex 工作流提供增强体验的第三方辅助工具。",
    description: "Codex++ 属于 Codex 生态辅助工具，功能与获取方式请以项目来源页为准。",
    tags: ["社区出品", "开发工具"],
    officialUrl: "https://codexpp.cc/", sourceUrl: "https://github.com/BigPizzaV3/CodexPlusPlus",
  },
  {
    name: "CCSwitch", slug: "ccswitch", type: "app", category: "companion-tools",
    summary: "用于管理和切换 Claude Code 配置与服务端点的第三方辅助工具。",
    description: "CCSwitch 帮助开发者在不同 Claude Code 配置之间切换，详情以来源仓库为准。",
    tags: ["社区出品", "Windows", "macOS", "Linux", "开源"],
    officialUrl: "https://github.com/farion1231/cc-switch", sourceUrl: "https://github.com/farion1231/cc-switch",
  },
  {
    name: "AI Toolbox", slug: "ai-toolbox", type: "app", category: "companion-tools",
    summary: "统一管理 ChatGPT、Gemini、Claude、Grok 会话的浏览器扩展，支持跨助手搜索、归档整理与多格式导出。",
    description: "AI Toolbox 是面向多 AI 助手用户的 Chromium 扩展，把 ChatGPT、Gemini、Claude、Grok 的历史会话集中检索与沉淀。",
    tags: ["社区出品", "浏览器扩展", "会话管理", "知识管理", "免费增值"],
    officialUrl: "https://www.ai-toolbox.co/",
    sourceUrl: "https://chromewebstore.google.com/detail/ai-toolbox-folders-prompt/jlalnhjkfiogoeonamcnngdndjbneina",
  },
];
