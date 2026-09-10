export const typeSeeds = [
  { key: "app", name: "应用", description: "可直接使用或安装的 AI 产品与辅助工具", sort: 1, accent: 1 },
  { key: "skill", name: "SKILL", description: "面向 Agent 的结构化技能包", sort: 2, accent: 2 },
  { key: "mcp", name: "MCP", description: "连接外部服务和数据的 MCP Server", sort: 3, accent: 3 },
];

export const categorySeeds = {
  app: [
    ["官方应用", "official-apps", "AI 厂商官方出品的完整产品"],
    ["辅助工具", "companion-tools", "围绕 AI 使用、切换与管理的第三方工具"],
    ["其他", "others", "不归入上述类目的第三方应用条目"],
  ],
  skill: [
    ["文档与办公", "docs-office", "文档创建、编辑与办公流程"],
    ["编程开发", "development", "代码工作流与技术任务"],
    ["创意与设计", "creative-design", "视觉、艺术与排版创作"],
    ["数据分析", "data-analysis", "结构化数据处理与可视化"],
    ["企业与协作", "enterprise-collaboration", "组织沟通与团队协作"],
    ["自动化与集成", "automation-integration", "工作流编排与跨系统集成"],
    ["AI 研究工作流", "ai-research-workflow", "文献调研、实验与论文写作的研究流程技能"],
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

/**
 * 种子条目；`installGuide` 仅 SKILL / MCP 等需要复制安装命令的条目填写。
 * `configText` 仅 MCP 条目填写，取自官方 README 的客户端配置 JSON。
 */
export type ResourceSeed = {
  name: string;
  slug: string;
  type: string;
  category: string;
  summary: string;
  description: string;
  tags: string[];
  officialUrl: string;
  sourceUrl: string;
  installGuide?: string;
  configText?: string;
};

export const resourceSeeds: ResourceSeed[] = [
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
  {
    name: "AI Research Skills", slug: "ai-research-skills", type: "skill", category: "ai-research-workflow",
    summary: "Orchestra Research 维护的开源 AI 研究技能库，让编码 Agent 自主完成从文献调研到论文写作的全流程。",
    description: "内置 98 个研究技能与 autoresearch 编排层，一条 npx 命令即可装入 Claude Code、Codex、Gemini CLI 等编码代理。",
    tags: ["社区出品", "开源", "Claude Code", "Codex", "Gemini CLI", "研究工作流"],
    officialUrl: "https://www.orchestra-research.com/ai-research-skills",
    sourceUrl: "https://github.com/Orchestra-Research/AI-research-SKILLs",
    installGuide: "npx @orchestra-research/ai-research-skills",
  },
  {
    name: "Gmail Creator Pro", slug: "gmail-creator-pro", type: "app", category: "others",
    summary: "第三方发布的批量 Gmail 账号自动注册工具，源码公开但许可证为专有；自述功能涉及账号自动化与验证规避，可能违反 Google 条款，风险显著。",
    description: "仓库自述可自动批量注册 Gmail 账号并绕过手机验证；本站未独立审计该工具，仅作风险提示性收录，不提供使用指导。",
    tags: ["第三方出品", "高风险", "条款风险", "专有许可", "未独立审计"],
    officialUrl: "https://github.com/ShadowHackrs/gmail-account-creator",
    sourceUrl: "https://github.com/ShadowHackrs/gmail-account-creator",
  },
  {
    name: "Kilo Code", slug: "kilo-code", type: "app", category: "companion-tools",
    summary: "开源 agentic 编程平台：同一个智能体贯通 VS Code、JetBrains、CLI 与云端，500+ 模型按厂商原价接入。",
    description: "Kilo Code 让同一个 AI 编程智能体在 VS Code/OpenVSX、JetBrains 系 IDE、CLI、云端智能体与 Slack 入口间共用，支持自有 API key 与本地模型，宣称 500+ 模型零加价；客户端源码以 MIT 许可证开源，Gateway 与 Cloud 后端为 source-available。",
    tags: ["社区出品", "开源", "VS Code", "JetBrains", "CLI", "按用量付费"],
    officialUrl: "https://kilo.ai/", sourceUrl: "https://github.com/Kilo-Org/kilocode",
  },
  {
    name: "Almanac", slug: "almanac", type: "app", category: "companion-tools",
    summary: "面向企业的知识 agent：连接公司工具自动生成并持续更新的 living wiki，可在 Slack 中直接派活。",
    description: "Almanac 接入 Gmail、Slack 等公司工具后自动汇总人员、客户与项目信息，编译成自维护的企业 wiki，并在执行任务前先读 wiki；agent 自带独立浏览器与登录环境，可操作未提供集成的工具，并通过 Slack 或 iMessage 接收与回报任务。",
    tags: ["社区出品", "企业知识库", "自动更新 Wiki", "Slack 集成", "YC 孵化"],
    officialUrl: "https://usealmanac.com/", sourceUrl: "https://news.ycombinator.com/item?id=49511007",
  },
  {
    name: "shuohao-skills", slug: "shuohao-skills", type: "skill", category: "creative-design",
    summary: "中文 AI 短剧制作技能集：拆角色、排大纲、设场景道具、写剧本、切分镜的全流程 Agent Skills。",
    description: "shuohao-skills 将微短剧生产流程拆为一组结构化技能包，覆盖人物设定（character bible）、改编大纲、美术与场景道具设定、剧本写作、分镜切分，可在 Claude Code、Codex 等兼容 Agent Skills 的 agent 中调用，面向中文短剧创作生态。",
    tags: ["社区出品", "开源", "短剧制作", "剧本创作", "分镜", "中文支持"],
    officialUrl: "https://github.com/eternityspring/shuohao-skills",
    sourceUrl: "https://github.com/eternityspring/shuohao-skills",
  },
  {
    name: "x64dbg-mcp-server", slug: "x64dbg-mcp-server", type: "mcp", category: "development-code",
    summary: "x64dbg 原生 MCP 插件：经 HTTP 把调试器能力暴露给 LLM agent，服务授权场景下的动态调试。",
    description: "x64dbg-mcp-server 以原生插件形态嵌入 x64dbg，将断点设置、单步执行、内存读取、寄存器转储等调试器功能封装为 MCP（Model Context Protocol）工具供 AI 助手调用；基于 Zig 构建且零第三方依赖，仅面向合法授权的调试、逆向与研究场景。",
    tags: ["社区出品", "开源", "MCP", "调试", "逆向工程", "Windows"],
    officialUrl: "https://github.com/duty1g/x64dbg-mcp-server",
    sourceUrl: "https://github.com/duty1g/x64dbg-mcp-server",
  },
  {
    name: "PaperGraph MCP", slug: "papergraph-mcp", type: "mcp", category: "ai-knowledge",
    summary: "把数学论文转成证据锚定阅读地图的 MCP 服务器：抽取定理结论、追踪证明证据链并规划精读，阅读状态保存在本地工作区。",
    description: "PaperGraph MCP 面向 AI agent 与研究者，把数学论文解析为以证据为锚的阅读地图：加载论文即生成主结果候选、论文结构与证明路径证据的概览，支持定理式结论抽取、证明证据链追踪与阅读会话管理；外部引用整理为可审阅的导入计划，而非自动下载。阅读状态保存在本地 SQLite 工作区，本地上传的 PDF 不离开本机。",
    tags: ["社区出品", "开源", "MCP", "数学论文", "文献阅读", "本地工作区"],
    officialUrl: "https://github.com/lotchuazzz-crypto/papergraph-mcp",
    sourceUrl: "https://github.com/lotchuazzz-crypto/papergraph-mcp",
    installGuide: "uvx --from git+https://github.com/lotchuazzz-crypto/papergraph-mcp.git@v0.10.0 papergraph-mcp",
    configText: `{
  "mcpServers": {
    "papergraph": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/lotchuazzz-crypto/papergraph-mcp.git@v0.10.0", "papergraph-mcp"]
    }
  }
}`,
  },
  {
    name: "computer-use-mcp", slug: "computer-use-mcp", type: "mcp", category: "development-code",
    summary: "Rust 构建的电脑控制 MCP 服务器：让 AI agent 截屏、点击、键入并脚本化操作 Windows、macOS 与 Linux 桌面应用。",
    description: "computer-use-mcp 以 TypeScript MCP 服务器加 Rust 原生模块（Rust NAPI 进程内运行）的架构提供桌面控制能力：截屏与界面读取、控件级点击与表单填写、剪贴板与窗口管理，以及 macOS AppleScript/JXA、Windows PowerShell 应用脚本。npm 包已捆绑三平台 x64/arm64 原生模块，默认暴露 65 个工具，可用 profile 收窄权限。该工具让 agent 获得完整的电脑控制面，权限与目标应用必须显式配置，建议在受控环境中使用。",
    tags: ["社区出品", "开源", "MCP", "桌面自动化", "Windows", "macOS", "Linux"],
    officialUrl: "https://github.com/zavora-ai/computer-use-mcp",
    sourceUrl: "https://github.com/zavora-ai/computer-use-mcp",
    installGuide: "npx -y @zavora-ai/computer-use-mcp",
    configText: `{
  "mcpServers": {
    "computer-use": {
      "command": "npx",
      "args": ["-y", "@zavora-ai/computer-use-mcp"]
    }
  }
}`,
  },
];
