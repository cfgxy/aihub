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
    ["工程与制造", "engineering-manufacturing", "CAD/CAE/CAM、机器人与制造执行流程技能"],
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
  updatedAt?: string;
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
  {
    name: "anything2explainer", slug: "anything2explainer", type: "skill", category: "creative-design",
    summary: "开源 Agent 技能「话题进、解说视频出」：为 Claude Code 与 Codex 把任意主题变成带配音字幕的黑底动效讲解视频，全代码逐帧绘制，中英双语。",
    description: "anything2explainer 用 Remotion 4 以代码逐帧绘制 1280×720 讲解视频，覆盖调研、旁白、分镜、并行构建与量化 QC 的 9 阶段流水线，中英双语配音可替换；工具包采用 PolyForm Noncommercial 非商业许可。",
    tags: ["社区出品", "开源", "SKILL", "Claude Code", "Codex", "Remotion", "视频生成", "中英双语", "非商业许可"],
    officialUrl: "https://github.com/Vincentwei1021/anything2explainer",
    sourceUrl: "https://github.com/Vincentwei1021/anything2explainer",
    installGuide: `git clone https://github.com/Vincentwei1021/anything2explainer.git
ln -s "$PWD/anything2explainer" ~/.claude/skills/anything2explainer`,
  },
  {
    name: "short-video-generator-AI", slug: "short-video-generator-ai", type: "app", category: "others",
    summary: "开源短视频切片工具：粘贴 YouTube 链接，自动转写、按传播潜力挑出高光片段并产出 9:16 竖屏成片，可选 AI 钩子开场。",
    description: "short-video-generator-AI（README 自述名 AI shorts generator）在本地用 faster-whisper 转写，再由 LLM 给候选片段打分排序并渲染竖屏成片，提供 CLI 与本地网页两种形态；二次剪辑他人视频存在版权合规风险，仅限自有或已授权素材。",
    tags: ["社区出品", "开源", "视频切片", "YouTube", "字幕", "竖屏", "自媒体", "MIT"],
    officialUrl: "https://github.com/Colafornia/short-video-generator-AI",
    sourceUrl: "https://github.com/Colafornia/short-video-generator-AI",
  },
  {
    name: "tokentab", slug: "tokentab", type: "app", category: "companion-tools",
    summary: "读取 Claude Code、Codex、Gemini CLI 本地会话日志的命令行工具，按模型、项目、日期与工作类型汇总 token 用量与成本。",
    description: "tokentab 直接解析各 CLI 留在本地的会话日志统计 token，成本按内置手工费率表离线计算，缓存读写单独拆算；另带 localhost 网页仪表盘。项目自述完全本地运行、不需要账号与 API key，该表述为 README 自述，本站未独立验证。",
    tags: ["社区出品", "开源", "CLI", "成本统计", "Claude Code", "Codex", "Gemini CLI", "本地运行", "MIT"],
    officialUrl: "https://github.com/crwdla/tokentab",
    sourceUrl: "https://github.com/crwdla/tokentab",
  },
  {
    name: "Bang Motion", slug: "bang-motion", type: "skill", category: "creative-design",
    summary: "浏览器动效图形 Agent 技能：让 AI 产出片头、promo、动态字幕与讲解动画，成品为双击即播的单个 index.html，内置反「PPT 感」结构检查。",
    description: "Bang Motion 遵循开放 Agent Skills 规范，把职业动效设计师的硬标准写成 agent 可自查的结构规则与菜单化风格选项，产出自包含的单文件网页动画，并支持配音同步与确定性逐帧导出；以 MIT 许可证开源。",
    tags: ["社区出品", "开源", "SKILL", "动效设计", "动画", "片头", "动态字幕", "Claude Code", "MIT"],
    officialUrl: "https://github.com/bangtutorial/bang-motion",
    sourceUrl: "https://github.com/bangtutorial/bang-motion",
    installGuide: `/plugin marketplace add bangtutorial/bang-motion
/plugin install bang-motion@bang-motion`,
  },
  {
    name: "Hermes Agent", slug: "hermes-agent", type: "app", category: "official-apps",
    summary: "Nous Research 官方推出的开源自托管个人 AI 智能体，内置「从经验中创建技能」的自学习闭环、跨会话记忆与多平台消息网关。",
    description: "Hermes Agent 是 Nous Research 官方推出的自托管个人 AI 智能体（Python，MIT 开源），口号「与你一起成长的智能体」：复杂任务完成后自动把经验沉淀为可复用技能，并在后续使用中持续改进；记忆由 Agent 自治维护，会话历史支持全文检索（FTS5）与 LLM 摘要。模型接入与厂商无关，官方称从 5 美元档 VPS 到 GPU 集群均可运行。它通过单一网关进程接入 Telegram、Discord、Slack、WhatsApp、Signal 与 CLI，内置 cron 定时任务、可并行的子智能体、7 种终端后端（本地、Docker、SSH、Singularity、Modal、Daytona、Vercel Sandbox），并兼容 agentskills.io 开放技能标准。自托管意味着消息网关的 Token 与消息权限须由使用者自行管控。",
    tags: ["官方出品", "开源", "MIT", "自托管", "个人智能体", "Telegram", "Discord", "Slack", "技能自学习"],
    officialUrl: "https://hermes-agent.nousresearch.com", sourceUrl: "https://github.com/NousResearch/hermes-agent",
    installGuide: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash",
    updatedAt: "2026-09-12",
  },
  {
    name: "Ponytail", slug: "ponytail", type: "skill", category: "development",
    summary: "让编码 Agent 按「房间里最懒的资深工程师」的 YAGNI 决策阶梯行事的开源技能，抑制过度设计。",
    description: "Ponytail 把一位「能不写就不写」的资深工程师决策风格写成 Agent 可执行规则（MIT 开源）：理解任务后按 7 级阶梯逐级检查——需要存在吗（YAGNI，跳过）→ 代码库已有（复用）→ 标准库有（用标准库）→ 平台原生有（用原生）→ 依赖已装（用依赖）→ 一行能写（就一行）→ 都不满足才写「最小可用实现」。作者明确「懒而不疏忽」：信任边界校验、数据安全、无障碍等底线永不裁剪。通过各 Agent 的插件市场或规则文件接入 Claude Code、Codex、Copilot CLI、Gemini CLI、Cursor、Windsurf、Hermes 等 20 余种载体，提供 lite/full/ultra/off 强度档位与 review、audit、debt、gain 等子命令。README 自述在小样本对照中平均减少约 54% 代码量——该数据为作者侧报告（无头 Claude Code 会话，n=4、12 个任务），未经独立复核，表述时须保留「作者自述」属性。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "YAGNI", "Claude Code", "Codex", "编码规范"],
    officialUrl: "https://github.com/DietrichGebert/ponytail", sourceUrl: "https://github.com/DietrichGebert/ponytail",
    installGuide: `/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail`,
    updatedAt: "2026-09-12",
  },
  {
    name: "VoiceStudio", slug: "voicestudio", type: "app", category: "others",
    summary: "全本地运行的开源语音工作室：语音克隆、声音设计、配音、转写、听写与有声书制作，本地工作流无需账号与 API Key。",
    description: "VoiceStudio（曾名 OmniVoice-Studio，AGPL-3.0 开源）定位「开源自托管的 ElevenLabs 替代」：零样本语音克隆（官方建议 5–15 秒参考音频）、按年龄/口音/风格描述的声音设计、视频配音（转写→翻译→合成→导出）、系统级听写、转写与多角色有声书（EPUB/PDF 导入、.m4b 导出）全部在本机完成；集成 16 个 TTS 与 11 个 ASR 引擎，TTS 语言目录约 646 种（实际覆盖取决于所选引擎）。技术形态为 Tauri v2 桌面壳 + FastAPI 本地服务（localhost:3900）+ SQLite，支持 CUDA/Apple MPS/MLX/ROCm/CPU，并提供 OpenAI 兼容本地 API 与 MCP 服务器；README 明确本地工作流「无账号、无 API Key、无用量计量」。应用本体 AGPL-3.0（作者另售商业授权），下载的模型沿用各自上游条款——默认 OmniVoice 权重为 CC-BY-NC，商用集成需分别核对。",
    tags: ["社区出品", "开源", "AGPL-3.0", "本地运行", "语音克隆", "配音", "转写", "有声书", "Windows", "macOS", "Linux"],
    officialUrl: "https://voicestudio.sh", sourceUrl: "https://github.com/debpalash/VoiceStudio",
    installGuide: "git clone https://github.com/debpalash/VoiceStudio.git && cd VoiceStudio && bun install && bun run desktop",
    updatedAt: "2026-09-12",
  },
  {
    name: "video-use", slug: "video-use", type: "skill", category: "creative-design",
    summary: "browser-use 官方团队的视频剪辑 Agent 技能：素材放进文件夹、与编码 Agent 对话，产出剪辑成片 final.mp4。",
    description: "video-use 来自 browser-use 官方组织（MIT 开源），把「用编码 Agent 剪视频」工程化为一条流水线：转写 → 打包 → LLM 推理 → 生成 EDL 剪辑决策单 → 渲染 → 逐切点自检（最多 3 轮修正重渲）。它能剪掉口头语与废镜头、按段自动调色、每次剪切加 30ms 音频淡入淡出防爆音、烧录大写字幕，并以 HyperFrames/Remotion/Manim/PIL 并行子智能体生成叠片动画。核心设计是「LLM 不观看视频，而是阅读视频」：靠约 12KB 的转写文本与按需生成的 timeline_view 时间线截图做剪辑决策；转写使用 ElevenLabs Scribe（词级时间戳、说话人分离），因此需配置 ELEVENLABS_API_KEY——转写环节为云服务并产生相应费用。支持 Claude Code、Codex、Hermes、OpenClaw 等一切有 shell 权限的 Agent；依赖本地 ffmpeg（必需）与 yt-dlp（可选）。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "视频剪辑", "Claude Code", "Codex", "ffmpeg", "字幕"],
    officialUrl: "https://github.com/browser-use/video-use", sourceUrl: "https://github.com/browser-use/video-use",
    installGuide: `git clone https://github.com/browser-use/video-use ~/Developer/video-use
ln -sfn ~/Developer/video-use ~/.claude/skills/video-use
cd ~/Developer/video-use && uv sync && brew install ffmpeg && cp .env.example .env`,
    updatedAt: "2026-09-12",
  },
  {
    name: "Atlas", slug: "atlas", type: "app", category: "companion-tools",
    summary: "面向并行编码 Agent 的「源码管理」桌面应用：每次 Agent 运行生成 checkpoint，commit 与会话、提示词、推理双向关联。",
    description: "Atlas（Tauri + Rust，MIT 开源）自称「给编码 Agent 用的源码管理」：每个 Agent 会话自动产生 checkpoint，把产出的 commit 与引发它的提示词、工具调用和推理过程关联；commit 被 amend/rebase 后按 patch-id 重新对位。会话记录存于本机 `.atlas/sessions.db`（SQLite、默认 gitignore，README 自述写入时清除密钥），可选中任一 checkpoint 直接与它对话。应用完全离线、无需账号，内置编辑器、Git、终端、知识库、浏览器等工作区；多个 Agent 经 ACP 协议并行运行（Claude Code、Codex，及 Cursor、OpenCode、Kilo Code 等 ACP 注册代理）并共享本地嵌入向量记忆（HNSW 检索），中途切换 Agent 不丢上下文。当前官方分发仅支持 macOS（tryatlas.cc 提供 .dmg），Linux/Windows 未经官方测试；项目较新，成熟度待观察。",
    tags: ["社区出品", "开源", "MIT", "源码管理", "Agent 会话", "checkpoint", "macOS", "Rust"],
    officialUrl: "https://www.tryatlas.cc/", sourceUrl: "https://github.com/pacifio/atlas",
    updatedAt: "2026-09-12",
  },
  {
    name: "patent-disclosure-skill", slug: "patent-disclosure-skill", type: "skill", category: "docs-office",
    summary: "中国专利全流程中文技能包：从项目材料挖掘专利点、查新检索、脱敏，到生成发明/实用新型/外观交底书，附解读、检索与政策简报共 8 个子技能。",
    description: "这是一套面向中国专利实务的中文 Agent 技能（MIT 开源，兼容 agentskills.io 规范），把专利工作拆成 8 个子技能：交底书编写、申请文件、案卷会稿、专利通俗解读、专利地图、审查答复辅助、著录检索与政策简报，覆盖发明、实用新型、外观设计三类文书；流程串联「挖掘专利点 → 查新 → 脱敏 → 撰写 → 版本迭代」，并支持外观线条图、实用新型部件编号图与 CAD 轴测附图生成。官方安装面向 Claude Code 与 Cursor：把仓库克隆进 `.claude/skills/`（Cursor 为 `~/.cursor/skills/`），前置 Python 3.9+ 与本地 Chrome/Edge（用于查新与附图渲染），依赖经 `pip install -r requirements.txt` 安装；CNIPA 检索、CAD 附图等为可选组件按需安装。README 强调「缺事实就问、绝不瞎编」；但专利文书法律效力要求高，AI 产出必须经专利代理师复核，查新覆盖度受公开数据库限制。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "专利", "交底书", "查新", "中文支持"],
    officialUrl: "https://github.com/handsomestWei/patent-disclosure-skill", sourceUrl: "https://github.com/handsomestWei/patent-disclosure-skill",
    installGuide: `mkdir -p .claude/skills && git clone https://github.com/handsomestWei/patent-disclosure-skill .claude/skills/patent-disclosure-skill
python -m pip install -r .claude/skills/patent-disclosure-skill/requirements.txt`,
    updatedAt: "2026-09-12",
  },
  {
    name: "Firecrawl Skill", slug: "firecrawl-skill", type: "skill", category: "automation-integration",
    summary: "Firecrawl 官方 Agent 技能与 CLI：为支持 Skills 协议的 Agent 提供网页抓取、搜索、爬取、结构化提取与站点监控能力。",
    description: "Firecrawl（主仓库约 17.9 万星）官方发布的 Skill 与 CLI 把其「网页上下文 API」接进编码 Agent：`scrape`（含 `--schema` 结构化提取、截图、页面动作）、`search`（网页/新闻/图片）、`crawl`、`map`、`research`/`developer` 索引、`interact`（Playwright 浏览器会话）、`monitor`（站点变更监控）等命令；官方提供 `npx skills add firecrawl/skills` 一步装入 Claude Code、Codex、Cursor、Windsurf、OpenCode、Hermes 等 Agent。默认走 Firecrawl 云端（api.firecrawl.dev），凭 FIRECRAWL_API_KEY 或浏览器登录，按 credits 计量（内置 `credit-usage` 命令）；也可用 `--api-url` 指向自建实例（非默认地址自动跳过认证）。需注意：`firecrawl/cli` 仓库截至 09-12 未标注开源许可证（GitHub API license 字段为 null），主仓库 firecrawl 为 AGPL-3.0——许可证未知须如实保留，商用集成前向官方确认。",
    tags: ["官方出品", "SKILL", "CLI", "网页抓取", "结构化提取", "Firecrawl", "Claude Code", "Codex", "按量付费"],
    officialUrl: "https://github.com/firecrawl/cli", sourceUrl: "https://github.com/firecrawl/cli",
    installGuide: `npm install -g firecrawl-cli
npx skills add firecrawl/skills`,
    updatedAt: "2026-09-12",
  },
  {
    name: "SIE", slug: "sie", type: "app", category: "companion-tools",
    summary: "面向 Agent 工作负载的开源共享推理服务器：嵌入、重排、OCR、结构化抽取统一为 OpenAI 兼容端点。",
    description: "SIE（superlinked 出品，Apache-2.0）把 Agent 任务背后的模型收敛到一个自托管推理服务器：`/v1/embeddings`、`/v1/chat/completions`、`/v1/completions`、`/v1/responses` 等 OpenAI 兼容端点统一提供检索嵌入与重排（bge-m3、splade-v3、colbertv2、qwen3-reranker）、文档转 Markdown 与 OCR（lightonocr、glm-ocr、mineru、paddleocr-vl、docling）、结构化抽取/NER（gliner2 等）、内容安全（granite-guardian-2b）与生成（qwen3.6-27b），SDK 暴露 encode/score/extract/generate，支持 100+ 模型按需加载与 LRU 驻留，可与 LangChain、LlamaIndex、Chroma、Qdrant 等集成。部署按「bundle」拆分 Docker 镜像，依赖不兼容的模型家族天然隔离；本机 `pip install \"sie-server[local]\"` 即可起步，生产侧提供 Helm 图表、网关负载均衡、KEDA 缩容至零与主流云 Terraform 模块。注意：服务端默认开启匿名遥测（版本/系统/GPU 型号），可用 `SIE_TELEMETRY_DISABLED=1` 关闭，隐私敏感部署应显式禁用。",
    tags: ["社区出品", "开源", "Apache-2.0", "推理服务", "Embeddings", "Rerank", "OCR", "OpenAI 兼容", "自托管"],
    officialUrl: "https://superlinked.com/docs/", sourceUrl: "https://github.com/superlinked/sie",
    installGuide: `pip install "sie-server[local]" && sie-server serve`,
    updatedAt: "2026-09-12",
  },
  {
    name: "Loadster MCP", slug: "loadster-mcp", type: "mcp", category: "cloud-infrastructure",
    summary: "Loadster 官方 MCP 服务器：让 Agent 编写与试放压测脚本、管理场景与数据集、读取报告，对接 Loadster 云端压测与合成监控。",
    description: "Loadster 是云端负载测试与合成监控平台；其官方 MCP 服务器为托管服务（Streamable HTTP，端点 `https://api.loadster.com/mcp`，服务端源码未公开，GitHub 仓库提供各客户端接入配置与 Claude Code 插件）。Agent 可创建/试放压测脚本（支持 HTTP 与浏览器/Playwright 脚本类型）、管理场景与数据集、配置监控并读取报告。平台刻意收窄了 Agent 权限边界：不能启动/停止完整压测、不能启用监控、不能管理通知策略与计费，仅开放「单机器人试放」与脚本/场景/数据集读写。认证走 OAuth 2.1 浏览器授权，或在控制台 Settings → AI Agents → MCP Tokens 生成 Bearer Token（仅显示一次，以创建者身份在其团队内生效）。定价按 Fuel 用量积分：注册赠 50 单位，月订阅 $77–$797，按量付费 $97 起，监控套餐 $29/月起（09-12 官网核实，以官网实时为准）。",
    tags: ["官方出品", "MCP", "压测", "合成监控", "Streamable HTTP", "商业服务", "Playwright"],
    officialUrl: "https://loadster.com", sourceUrl: "https://github.com/loadster/loadster-mcp",
    installGuide: `/plugin marketplace add loadster/loadster-mcp
/plugin install loadster@loadster
claude mcp add --transport http loadster https://api.loadster.com/mcp`,
    configText: `{
  "mcpServers": {
    "loadster": {
      "type": "http",
      "url": "https://api.loadster.com/mcp"
    }
  }
}`,
    updatedAt: "2026-09-12",
  },
  {
    name: "AgentPhone MCP", slug: "agentphone-mcp", type: "mcp", category: "office-collaboration",
    summary: "给 AI Agent 真实电话号码、短信与语音通话能力的 MCP 服务器：购号、收发短信、AI 外呼与呼入 webhook 一体。",
    description: "AgentPhone MCP（MIT 开源，基于 mcp-use 框架）让 MCP 客户端获得真实通信能力，共 28 个工具：购买与管理美国/加拿大号码、收发短信（支持媒体与线程回复）、外呼（`make_call` 经 webhook 驱动，或 `make_conversation_call` 内置 AI 对话无需自建 webhook）、呼入处理、自定义语音与系统提示词的通话 Agent，以及用量与账单查询。接入提供三种方式：远端 Streamable HTTP（`https://mcp.agentphone.ai/mcp`，OAuth 或 Bearer API Key）、本地 stdio（`npx -y agentphone-mcp` + AGENTPHONE_API_KEY 环境变量）、自托管 HTTP。所有通话经 AgentPhone API；README 未公布费率，需注册 agentphone.ai 后按用量计费，具体定价未知。须特别提示：README 未包含外呼合规、受话方同意或录音披露等声明，此类能力天然涉及通信费用、骚扰/滥用与声音授权风险，仅应在合法合规并取得授权的前提下使用。",
    tags: ["社区出品", "开源", "MIT", "MCP", "语音通话", "短信", "电话号码", "Streamable HTTP"],
    officialUrl: "https://agentphone.ai", sourceUrl: "https://github.com/AgentPhone-AI/agentphone-mcp",
    installGuide: "npx -y agentphone-mcp",
    configText: `{
  "mcpServers": {
    "agentphone": {
      "type": "streamable-http",
      "url": "https://mcp.agentphone.ai/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}`,
    updatedAt: "2026-09-12",
  },
  {
    name: "Superpowers", slug: "superpowers", type: "skill", category: "development",
    summary: "给编码 Agent 装上一整套「资深工程师工作法」的开源技能框架：头脑风暴、任务拆解、TDD 与子代理双阶段审查全流程强制执行。",
    description: "Superpowers（MIT 开源）官方定位「An agentic skills framework & software development methodology」，把资深工程师的工作习惯拆成可组合技能：写码前先头脑风暴并落设计文档，经 git worktree 建隔离工作区，把工作拆成 2–5 分钟颗粒度的任务，逐任务派发全新子代理并做「规格合规 + 代码质量」两阶段审查，全程强制测试驱动开发（先写失败测试再写最小实现），分支完成后验证测试并提供 merge/PR/清理选项。README 强调这些是「强制工作流，不是建议」——Agent 在每个任务前自动检查应使用的技能，并称按此运行的 Agent「自主连续工作数小时不偏离计划并不罕见」。它是当前 Agent 技能生态中规模最大的方法论技能集之一（285,712★，2026-09-13 快照），官方适配 Claude Code、Codex、Cursor、Gemini CLI、GitHub Copilot CLI、Devin CLI 等 14 种编码 Agent；技能库另含 systematic-debugging（四阶段根因调试）、verification-before-completion 等专项技能。须知：工作流约束较强（强制 TDD、计划先行），团队需适应期，且主要面向编码场景；brainstorming 的可选视觉功能默认从官网加载 Prime Radiant logo（README 称不含项目、提示词或 Agent 信息），设 SUPERPOWERS_DISABLE_TELEMETRY 可关闭；企业商业服务定价未公开。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "TDD", "工作流", "Claude Code", "Codex", "Cursor"],
    officialUrl: "https://github.com/obra/superpowers", sourceUrl: "https://github.com/obra/superpowers",
    installGuide: "/plugin install superpowers@claude-plugins-official",
    updatedAt: "2026-09-13",
  },
  {
    name: "i-have-adhd", slug: "i-have-adhd", type: "skill", category: "development",
    summary: "用 10 条输出规则改造编码 Agent 的回答方式：结论先行、动作先行、列表不超 5 项、零客套。",
    description: "i-have-adhd（MIT 开源）解决单一大痛点：编码 Agent 总把答案埋进长篇大论。它用 10 条输出规则改造 Agent 的回答方式——先给出下一步动作、多步任务编号、以一个具体的下一步结尾、抑制跑题、每轮重述当前状态、给以分钟计的具体时间估算（而不是「一会儿」）、列表不超过 5 项、无开场白、无复述、无客套结尾。官方副标语注明「No ADHD diagnosis needed!」——它是给所有人用的「结论先行」输出规范，灵感来自《The Adult ADHD Tool Kit》（J. Russell Ramsay & Anthony L. Rostain），并被改编为 LLM 的响应方式而非人类日程管理。安装零门槛：把一句话粘给任意 CLI Agent 即可完成；仓库同时提供 Claude、Codex、Cursor、OpenCode、Gemini、Kimi、Qwen 等多端适配与 AGENTS.md 通用接入。想调整规则，Fork 后编辑 SKILL.md 再按 INSTALL.md 换源安装。热度：43,206★（2026-09-13 快照），GitHub Trending 日榜单日 +3,463。须知：效果为主观体验类主张，无独立验证；简短指令式输出可能与需要详细推理过程的团队偏好冲突，按需取用。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "输出质量", "结论先行", "Claude Code", "Codex"],
    officialUrl: "https://github.com/ayghri/i-have-adhd", sourceUrl: "https://github.com/ayghri/i-have-adhd",
    installGuide: "Install the i-have-adhd skill/plugin from https://github.com/ayghri/i-have-adhd, refer to the repo's AGENTS.md for instructions.",
    updatedAt: "2026-09-13",
  },
  {
    name: "MathModelAgent", slug: "mathmodelagent", type: "app", category: "others",
    summary: "面向数学建模竞赛的多智能体系统：建模手、代码手、论文手分工协作，端到端产出已排版的完整论文。",
    description: "MathModelAgent（代码公开、可自部署）是专为数学建模竞赛设计的多智能体系统：「建模手、代码手、论文手」分工协作，自动完成问题分析、数学建模、代码编写、纠错与论文撰写，最终产出一份已排好版的完整论文。排版基于 Typst，内置 17 套竞赛论文模板（覆盖国赛、华数杯、华为杯、美赛 MCM/ICM 等），并配套含模型选择决策树与评分标准的建模知识库。工程完成度是其亮点：Code Interpreter 支持本地 Jupyter 与云端 E2B/Daytona；经 litellm 接入任意模型且每个智能体可配置不同 LLM；通过 Tavily API 联网搜索真实数据；ChromaDB + Rerank 检索建模方法与代码模板；关键节点提供 HIL 人机协作审批（confirm/edit/regenerate/ask/skip/abort），另有四层容错与 9 步自动验收（文本泄漏检测→数值校验→Typst 编译→PDF 检查）。使用入口：桌面版（macOS/Windows）、在线托管版（mathmodel.top）、Docker 一键部署，或作为技能安装。须知：仓库未标注标准开源许可证，仅有「个人免费使用，请勿商业用途，商业用途联系作者」声明，商用集成前必须联系作者确认授权；作者免责声明明确「AI 生成仅供参考，目前水平直接参加国赛获奖是不可能的」，直接提交 AI 产出存在学术诚信风险；项目自述仍处实验迭代阶段；托管版定价未公示。",
    tags: ["社区出品", "代码公开", "多智能体", "数学建模", "论文生成", "Typst", "自部署", "Docker"],
    officialUrl: "https://mathmodel.top", sourceUrl: "https://github.com/jihe520/MathModelAgent",
    installGuide: "npx skills add jihe520/MathModelAgent --all",
    updatedAt: "2026-09-13",
  },
  {
    name: "Pascal Editor", slug: "pascal-editor", type: "app", category: "others",
    summary: "开源本地优先的 3D 建筑编辑器：浏览器即用，内置 MCP 服务让 AI Agent 直接查询和修改 3D 场景。",
    description: "Pascal Editor（MIT 开源）是基于 React Three Fiber 与 WebGPU 构建的 3D 建筑编辑器，浏览器打开即用，也可通过 CLI 安装为本地持久化服务。场景按「Site → Building → Level → Wall/Slab/Ceiling/Roof/Zone → Item」节点层级组织，墙体系统支持斜接与 CSG 开洞，配有空间碰撞检测、放置校验与 50 步撤销/重做，项目数据存储在本机；官网定位「Free Open-Source 3D Building Editor」，口号「Turn your property into a living digital twin」，另提供配套 iOS 应用 Pascal Capture。差异化在「为 Agent 而建」：CLI 启动编辑器的同时拉起一个带认证的本地 MCP 服务（npx @pascal-app/cli editor），也可用 pascal mcp connect 单独连接托管端点（editor.pascal.app/api/mcp），AI Agent 因此可直接查询和修改 3D 场景；官方提供 pascal-3d 与 furniture-fit 两个 Agent 技能，一条命令装进 Claude Code/Codex。本地连接器无需 Pascal 账号或 API key；npm 生态提供 core/viewer/editor/nodes/mcp/cli 及 ifc-converter（IFC 转换）等包，并有插件系统扩展节点类型。须知：垂直领域（建筑/3D）受众较窄；每个 CLI 服务仅允许一个活跃 Agent 客户端（多实例需不同 PASCAL_HOME 目录）；官网 AI 构建功能标注消耗 AI credits（定价未公示，未知）；支持的文件格式清单未在 README 列明。",
    tags: ["社区出品", "开源", "MIT", "3D 建模", "建筑", "MCP", "本地优先", "WebGPU"],
    officialUrl: "https://editor.pascal.app", sourceUrl: "https://github.com/pascalorg/editor",
    installGuide: "npx @pascal-app/cli editor",
    updatedAt: "2026-09-13",
  },  {
    name: "scroll-craft", slug: "scroll-craft", type: "skill", category: "creative-design",
    summary: "给编码 Agent 一套滚动驱动高端网页的设计标准：8 种互斥页面语法、指纹闸门防自我重复与逐滚动位置自动自检。",
    description: "scroll-craft（MIT 开源）是一套给编码 Agent 用的网页设计技能：交给 Codex、Claude Code 等能读指令、改文件、跑命令、检查浏览器的 Agent，它按一套明确设计标准产出「滚动驱动」的高端网页，自带设计工作流、参考资料、引擎与自动化验证工具，v0.3.0 起沉淀「十个已验收站点标准」（AI Automation Society、PERKFORM、Glaido 等）。它针对 AI 生成网页的两个常见极端——要么平庸保守毫无记忆点，要么堆满浮夸动效却保不住正文可读性；官方拒绝清单点名特性卡片网格、渐变文字、AI 紫渐变等套路。它设 8 种互斥「页面语法」（电影式一镜到底、章节式编辑排版、连续世界等），强制每个站点发明一处独有的 signature move 交互，并用「指纹闸门」要求新构建在语法、导航、首屏、收尾等 6 个维度中至少 4 个不同于历史作品；页面完成后由 headless 浏览器逐滚动位置自检死滚动、按合成页面逐行实测对比度与视频解码卡死，输出 contact sheet。须知：官方声明仅在 Windows 上完整跑过（macOS/Linux 提供路径覆盖但无实际构建记录）；生成式视频素材有真实开销，用自己的照片与素材则免费，可选 AI 素材生成需自备 KIE_AI_API_KEY。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "网页设计", "滚动叙事", "设计规范", "Claude Code", "Codex"],
    officialUrl: "https://github.com/nateherkai/scroll-craft", sourceUrl: "https://github.com/nateherkai/scroll-craft",
    installGuide: `/plugin marketplace add nateherkai/scroll-craft
/plugin install nateherk-design`,
    updatedAt: "2026-09-14",
  },
  {
    name: "Chat On Steroids", slug: "chat-on-steroids", type: "app", category: "companion-tools",
    summary: "让网页版 ChatGPT 会话直接读写本地文件、跑终端、多 worker 协作的桌面工作台，权限以批准文件夹为边界。",
    description: "Chat On Steroids（MIT 开源）给 ChatGPT 装上「手脚」：桌面聊天工作台加本地 MCP server，让网页版 ChatGPT 会话直接读写你批准的本地文件夹、执行终端命令、给代码打补丁。Core 工具集移植自 OpenAI Codex CLI 的工具契约（apply_patch、exec_command、write_stdin 等），模型天然熟悉用法；多文件补丁写入前先预检，命令作为真实进程运行，支持交互式 stdin 与后台结果收集，所有工具调用与真实结果在本地留痕。它支持多 worker 协作：主会话最多编排 8 个 worker 会话（默认 2 个），worker 就是用户自己浏览器里的普通 ChatGPT 会话，全程可见、可再次唤醒；会话过长时用 Compact & Resume 生成交接简报、开新会话续作。权限模型是「你就是边界」：只有批准的文件夹可见，每项能力独立开关，read-only 一键总闸，身份校验 fail-closed。官方提供 Windows/macOS/Linux、x64/ARM64 安装包（GitHub Releases，附 SHA256SUMS 校验文件）。须知：命令以普通用户权限运行、非 OS 沙箱；配套扩展观察 ChatGPT 网页界面并自动开标签页，属非公开自动化 API，与 OpenAI 服务条款的兼容性需用户自行确认（README 明示）；构建未签名/未公证；当前模型选择器依赖英文界面。",
    tags: ["社区出品", "开源", "MIT", "APP", "ChatGPT", "MCP", "桌面工作台", "多 Agent", "本地自动化"],
    officialUrl: "https://github.com/totec448-spec/chat-on-steroids", sourceUrl: "https://github.com/totec448-spec/chat-on-steroids",
    updatedAt: "2026-09-14",
  },
  {
    name: "VoiceMem", slug: "voicemem", type: "app", category: "others",
    summary: "面向实时语音 Agent 的长期记忆系统：「流式双脑」架构在对话进行中完成记忆提取，附 arXiv 报告与开源模型、数据集。",
    description: "VoiceMem（Apache-2.0 开源，官方声明永久保持全部开源）是面向实时语音 Agent 的长期记忆系统，核心是「流式双脑」架构：左脑用 Schema 与实体组织事实记忆，右脑用长短期情绪归因与跨实体节点管理人格、情绪与关系——不只记住「用户说过什么」，也记住「用户是谁、有什么感受」。整条流水线是流式的：用户还在说话时即完成音频分段、转写、记忆提取并写入记忆图；查询先路由再排序，只把 Top-K 条记忆注入上下文，配合 0–300 ms 投机预取，官方称几乎不增加延迟。项目带完整研究配套：arXiv 技术报告（arXiv:2608.26005）、HuggingFace 开源模型系列（Qwen2.5-Omni、Qwen3-Omni、Step-Audio2-Mini 微调版）、ChatMem-400K 数据集与可复现评测；记忆检索完全在本地运行，仅写入时的信息提取调用 OpenAI API。官方自报基准：LoCoMo 91.2%（对比 Mem0 61.68%，仅需 Top-5 条记忆）、响应 134 ms（对比 Mem0 1,440 ms）、每次约 430 个记忆 token（对比 Mem0 6,956）。须知：研究型项目，工程化成熟度未知；评测数字为官方自报、未经独立复核；基线采集时最后 push 为 2026-09-05，其后暂无新提交。",
    tags: ["社区出品", "开源", "Apache-2.0", "APP", "语音", "Agent 记忆", "多模态", "流式"],
    officialUrl: "https://xzf-thu.github.io/VoiceMem/", sourceUrl: "https://github.com/xzf-thu/VoiceMem",
    installGuide: `pip install voicemem`,
    updatedAt: "2026-09-14",
  },
  {
    name: "agent-memory", slug: "agent-memory", type: "app", category: "others",
    summary: "本地优先的 Agent 长期记忆运行时：Markdown 为唯一事实源、索引随时可删可重建、零 API key、跨宿主共享同一记忆库。",
    description: "agent-memory（MIT 开源，v0.1.0）解决一个具体问题：Agent 关掉会话就忘掉一切。它是本地优先的长期记忆运行时：一个 store 里的 Markdown 文件是唯一事实源，旁边的 SQLite 索引只是随时可删的缓存——官方以测试保证 rm -rf .index/ 后重建零知识损失。Claude Code、Codex CLI 及一切能跑 shell 命令的宿主共享同一 store，官方验证过全部 9 个跨宿主读写配对：一个宿主写入的，另一个原样找到。检索走「按路径回答，再按层级读」：recall 返回一行摘要 + 文件路径 + 锚点 + 得分的 L0 列表，Agent 按任务需要逐级展开（大纲 → 全文 → 原始材料），不把大段文本粘进上下文。写入在对话边界自动触发，不依赖 Agent 记得去存；sleep-time 整理按价值合并与遗忘，删除永远只以提案形式出现、需人工确认；库内不含任何 LLM 客户端，零 API key、零计费面。须知：早期版本，PyPI 尚无发布，需 Python 3.12+ 与 uv 从源码安装；官方自报对比数字为其写策略研究结论、未经独立复核；与既往提名的 okf-agent-memory（RUYI-105）为不同团队的同类项目，注意区分。",
    tags: ["社区出品", "开源", "MIT", "APP", "Agent 记忆", "本地优先", "Markdown", "Claude Code", "Codex"],
    officialUrl: "https://github.com/tigerless-labs/agent-memory", sourceUrl: "https://github.com/tigerless-labs/agent-memory",
    updatedAt: "2026-09-14",
  },
  {
    name: "headcount", slug: "headcount", type: "skill", category: "development",
    summary: "把 Claude Code 组织成一家公司：16 个部门 172 项技能按需安装，Security 与 Legal 部门的阻塞性发现不可被推翻。",
    description: "headcount（MIT 开源）把 Claude Code 组织成一家公司：一名 chief executive 之下设 16 个部门（Technology、Security、Product、Marketing、Revenue、Finance、Legal & Risk 等）、共 172 项技能，把「写更好的 prompt」换成「给组织加一个部门」。每个部门是独立可安装的插件，项目只加载所需职能；技能以 department:skill 形式寻址（如 security:threat-modeling、finance:unit-economics），命名永不冲突。部门按独占写入面划分，并在 .claude/agents/ 内附 agent charter，可作为 subagent 委派；Security 与 Legal & Risk 为 reviewer-class 部门，其阻塞性发现不可被被审部门推翻；CI 运行统一校验脚本防止本地与 CI 漂移。官方提供可搜索的交互式 org chart，USE-CASES 文档收录 11 个跨部门情境（SOC 2 评审、落地页转化诊断、招聘的财务判断等）。须知：全量安装 16 个部门易稀释模型上下文，官方建议按部门按需安装；README 由脚本生成，页面 About 区与正文存在 15+/125+ 与 16/172 的口径不一致，照录待作者统一；基线采集时最后 push 为 2026-09-03。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "Agent 组织", "Claude Code", "插件化", "治理"],
    officialUrl: "https://cbrock84.github.io/headcount/", sourceUrl: "https://github.com/cbrock84/headcount",
    installGuide: `/plugin marketplace add cbrock84/headcount
/plugin install security@headcount`,
    updatedAt: "2026-09-14",
  },
  {
    name: "doop", slug: "doop", type: "app", category: "others",
    summary: "开源版 Paper.design：人与 AI Agent 在同一多人画布实时共创设计，内置 MCP server 与 Doop Agent，一条命令自托管。",
    description: "doop（AGPL-3.0 开源）是 Paper.design 的开源替代：一张多人设计画布，人与 AI Agent 同台实时共创。画布上的每个 Frame 都是渲染真实 HTML 的沙箱画板——人在浏览器里编辑，Agent 通过内置 MCP server 流式「作画」，光标、presence、逐帧编辑指示、Agent 状态与活动流全员实时可见。它内置一支「设计团队」：排队一张卡片或 @mention 一个角色，Doop Agent 自动开工；免费额度跑在服务器密钥上，之后接用户自己的 ChatGPT 订阅或 OpenAI key 继续运行，连接 Claude Code 等自有 MCP 客户端则完全跑在自己的订阅上。「设计记忆」把样例 Frame 与设计决策沉淀为所有 Agent 都遵守的持久风格规则。自托管一条命令（内嵌 Postgres，无外部服务依赖），画布默认私有、按画布分享，经 MCP OAuth 接入的 Agent 以其人类身份行动、继承其确切权限；不想自己跑可用官方云版 doop.design。须知：AGPL-3.0 对商用部署有传染性约束；云版定价、云版与自托管的功能差异官方未公示（未知）；README 提示经第三方服务器驱动 ChatGPT 订阅未获 OpenAI 条款认可，重度使用可能限流或封号（API key 路径为受支持替代）。",
    tags: ["社区出品", "开源", "AGPL-3.0", "APP", "设计画布", "MCP", "实时协作", "自托管"],
    officialUrl: "https://doop.design", sourceUrl: "https://github.com/kgoedecke/doop",
    installGuide: `git clone https://github.com/kgoedecke/doop && cd doop
docker compose up`,
    updatedAt: "2026-09-14",
  },
  {
    name: "Open SEO MCP Skills", slug: "open-seo-mcp-skills", type: "skill", category: "data-analysis",
    summary: "跑在自家 GSC/GA4 真实数据上的开源 SEO·GEO 技能包：8 项技能覆盖审计、关键词、排名、竞品差距与 AI 可见度。",
    description: "Open SEO MCP Skills（MIT 开源）反「开源 SEO 工具多为 DataForSEO 套壳」之道而行：排名读你真实的 Google Search Console、流量读你真实的 GA4（含 ChatGPT、Perplexity、Claude、Gemini 的 AI 引荐流量）、关键词量来自 Google Ads 关键词规划师；竞品关键词、外链与 SERP 走内置的 DataForSEO（经 Ryze 连接器，无需自管 key）；已付费的 Ahrefs/Semrush 也可接入。共 8 项技能：站点审计（seo-audit）、关键词研究、排名追踪、竞品差距、外链检查、AI 可见度、内容简报，以及 seo-vs-ads——分析你正在为本可免费获得的自然排名点击付多少广告费。面向 Claude 设计：一条 MCP 命令连通数据，插件市场两步装技能，然后直接说「给我的站点跑一次 SEO 审计」。官方称工具无订阅、API 调用无加价。须知：站点数据经第三方 Ryze 云连接器中转，敏感站点数据外流需自行评估；「免费/无加价」承诺的可持续性未知；DataForSEO 数据按第三方计费。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "SEO", "GEO", "Search Console", "GA4", "DataForSEO"],
    officialUrl: "https://www.get-ryze.ai/how-to-connect-claude-to-google-meta-ads-mcp", sourceUrl: "https://github.com/Ryze-AI-Adgent/open-seo-mcp-skills",
    installGuide: `claude mcp add ryze --transport http https://connector.get-ryze.ai/mcp
claude plugin marketplace add Ryze-AI-Adgent/open-seo-mcp-skills
claude plugin install open-seo-mcp-skills@ryze`,
    updatedAt: "2026-09-14",
  },
  {
    name: "Lemmalog", slug: "lemmalog", type: "mcp", category: "ai-knowledge",
    summary: "把 Agent 记忆做成可证明、可溯源的 Datalog 演绎数据库：why() 证明树、双时态事实与增量维护，MCP 即插即用。",
    description: "Lemmalog（MIT 开源）的论点：Agent 的记忆不该是「比向量库记得更好」，而应是一个演绎数据库——Agent 对自己知道什么建立可验证的模型，用规则机械地推理知识如何变化。基础事实在摄入边界由 LLM 抽取断言，此后一切确定性推导：闭包、时间投影、矛盾候选、相关性扩散；每条事实携带溯源（provenance）可一路指回源对话，每轮对话增量更新派生视图而非重新推导。工程上同样较真：双时态字段、why() 证明树、置信度 × 溯源的半环注解、实体消解、半朴素增量求值，外加 450 个随机程序的差分测试与解析器 fuzz。交付形态覆盖 Rust crate、MCP server（stdio，12 个工具，支持 Claude Code / Kimi CLI）、REPL 与一个通用 Agent skill——把引擎当作任何长任务的「工作记忆」；仓内设计文档附已实现状态的诚实清单。官方自报基准：MemEval F1 0.487、LoCoMo F1 0.573（其榜单 10 系统中第 2）。须知：概念门槛高、需理解 Datalog 规则语法，面向开发者；基准数字为官方自报；基线采集时最后 push 为 2026-09-02，其后暂缓。",
    tags: ["社区出品", "开源", "MIT", "MCP", "Agent 记忆", "Datalog", "知识推理", "Rust"],
    officialUrl: "https://github.com/JordyZomer/lemmalog", sourceUrl: "https://github.com/JordyZomer/lemmalog",
    installGuide: `git clone https://github.com/JordyZomer/lemmalog && cd lemmalog
cargo build --release --features mcp
claude mcp add lemmalog -- $(pwd)/target/release/lemmalog-mcp`,
    updatedAt: "2026-09-14",
  },
  {
    name: "Open Reality", slug: "openreality", type: "mcp", category: "database-data",
    summary: "手机视频转 AI 可查询的持久 3D 场景：41 个 MCP 工具支持测量、路径规划，可导出 LeRobot/GR00T 风格机器人训练数据。",
    description: "Open Reality（BSD-2-Clause 开源）把「用手机拍段视频」变成「AI 能查询的 3D 场景」：上传一段普通手机视频，几分钟后得到一个持久 3D 场景，AI 助手可在其中测量距离与角度、规划路径、盘点物体、描述空间；它以 41 个 MCP 工具接入 Claude Code、Claude Desktop、Codex 与 Cursor，npm 包 openreality-mcp 即装即用。重建核心基于 MIT SPARK Lab 的 VGGT-SLAM 研究线。一个体现严谨度的细节：未校准前所有尺寸只报相对值，只有用真实距离校准后数字才允许被称作「米」；服务器的拒绝与不确定性标签会原样传达给 AI。面向机器人场景：扫描可导出为 LeRobot/GR00T 风格训练数据集或 Isaac Sim 场景（托管服务提供）。全部工作流可自托管——自有 GPU 机器，或自己的 Modal 账号；另有内置离线模拟器，用 fixture 数据走通全流程，无账号、无 GPU 即可开发与演示。须知：生态尚小（86★，2026-09-14 快照）；3D 重建是 GPU 作业，自托管依赖 GPU 或付费算力；自托管服务器下载的 VGGT-1B 重建模型按 CC BY-NC 4.0 授权、仅限非商用，商用需改用官方托管服务或自行向模型权利方取得授权；托管服务定价页面未公示（未知）；server/ 与 core/ 目录为私有工作仓的手工同步镜像（各附 MIRROR.md 说明）。",
    tags: ["社区出品", "开源", "BSD-2-Clause", "MCP", "3D", "空间数据", "机器人", "VGGT-SLAM"],
    officialUrl: "https://open-reality.io/mcp", sourceUrl: "https://github.com/reality-opened/openreality",
    installGuide: `claude mcp add openreality -- npx -y openreality-mcp serve`,
    configText: `{
  "mcpServers": {
    "openreality": {
      "command": "npx",
      "args": ["-y", "openreality-mcp", "serve"]
    }
  }
}`,
    updatedAt: "2026-09-14",
  },
  {
    name: "Shim MCP", slug: "shim-mcp", type: "mcp", category: "office-collaboration",
    summary: "把 WordPress 站点变成 MCP server 的官方目录插件：56 项能力、无中继无账号，本地 stdio 与远程 HTTP 双传输。",
    description: "Shim MCP（GPL-2.0-or-later 开源，已上架 WordPress.org 官方插件目录）是一个自包含的 WordPress MCP 服务器：装上插件，WordPress 站点即成为 MCP server，Claude Code、Claude Desktop、Cursor、Windsurf、Cline 等任何 MCP 客户端都能驱动——56 项能力覆盖文章、页面、媒体、用户、插件、菜单、小工具、评论、选项与系统管理。它刻意保持「适配器」定位：无伴随插件、无云中继、无账号、无遥测；能力全部注册在 WordPress 官方 Abilities API 上，其他插件注册的能力也会被自动暴露。连接有两条路：本地 stdio 走 WP-CLI——wp shim-mcp serve 把服务器作为本地进程运行，没有 HTTP、没有端口、没有令牌，直接消除整条认证面；远程站点走 Streamable HTTP，在 Tools → Shim MCP 生成应用密码，逐调用做能力检查。安全设计：逐对象权限复查（持 edit_posts 不等于能改任何一篇具体文章），唯一危险的 wp-config.php 重写默认关闭、需显式 opt-in；还会检测竞争性 MCP 插件并告警。官方验证记录：WordPress 7.1 / PHP 8.5.9 下全 56 能力注册与完整增删改查回路，Plugin Check 0 错误 0 警告。须知：把站点写权限授予 AI 需谨慎管控（建议从本地 stdio 与受限账号起步）；星数低（46★，2026-09-14 快照），分发依赖 WordPress.org；作者自述功能完整但尚未在广泛主机环境运行过。",
    tags: ["社区出品", "开源", "GPL-2.0-or-later", "MCP", "WordPress", "CMS", "Abilities API"],
    officialUrl: "https://wordpress.org/plugins/shim-mcp/", sourceUrl: "https://github.com/justadityaraj/shim-mcp",
    installGuide: `git clone https://github.com/justadityaraj/shim-mcp.git wp-content/plugins/shim-mcp
wp plugin activate shim-mcp
claude mcp add shim -- wp shim-mcp serve --user=admin --path=/full/path/to/wordpress`,
    updatedAt: "2026-09-14",
  },
  {
    name: "OpenClaw", slug: "openclaw", type: "app", category: "others",
    summary: "「真正替你干活」的开源个人 AI 助理：20+ 聊天渠道接入、全平台原生应用，状态、记忆与凭据留在本地硬件。",
    description: "OpenClaw 是一个跑在用户自己电脑上的开源个人 AI 助理，通过你已经在用的聊天渠道直接对话——Discord、iMessage、Slack、Teams、Telegram、WhatsApp 等 20+ 渠道，官方口号「The AI that really does things. Any OS. Any Platform.」。它强调「真正替你干活」之外的数据主权：状态、记忆和凭据都保存在用户自己的硬件上，遥测只做每日版本检查、功能统计需主动选择加入且可关闭。项目按 MIT 许可证开源（© OpenClaw Foundation），官方声明无付费档、无托管服务、无代币，由捐赠资助、独立 501(c)(3) 基金会治理。架构上由本地 Gateway 控制面统一管理会话、工具、事件与渠道连接，配套 Control UI 仪表盘、CLI 与 TUI 客户端，原生应用覆盖 macOS、iOS、Android、Windows、Linux；模型侧支持可插拔 harness（Claude、Codex、本地模型等以插件接入），工具/技能/插件体系配插件 SDK 与 ClawHub 市场。须知：定位为执行真实操作，涉及系统级权限授予，权限边界需使用方自行评估；GitHub open issues 约 7,403（2026-09-16 快照）。",
    tags: ["社区出品", "开源", "MIT", "APP", "个人 AI 助理", "全平台", "本地优先", "Claude", "Codex"],
    officialUrl: "https://openclaw.ai", sourceUrl: "https://github.com/openclaw/openclaw",
    installGuide: `npm install -g openclaw@latest --allow-scripts=openclaw`,
    updatedAt: "2026-09-18",
  },
  {
    name: "pi", slug: "pi", type: "app", category: "companion-tools",
    summary: "统一 LLM API、agent 运行时、TUI 与编码 agent CLI 的 TypeScript 工具箱，可单独取用或自由组合。",
    description: "pi 是 earendil-works 的 agent harness 项目集，用一套 TypeScript 包覆盖从模型调用到终端交互的完整链路：`pi-ai` 提供统一多供应商 LLM API（OpenAI、Anthropic、Google 等），`pi-agent-core` 提供带工具调用与状态管理的 agent 运行时，`pi-tui` 提供差分渲染的终端 UI 库，`pi-coding-agent` 则是开箱即用的交互式编码 agent CLI。定位是「可组装的轻量工具箱」，与完整产品型编码代理形成形态差异。工程化配套完整：`chord` 提供服务组合运行时（服务、复制状态、RPC、插件），`pi-telemetry` 提供供应商中立的遥测契约、参考适配器与一致性测试。分发上支持 npm 安装或独立二进制；隔离方案可走 Docker、Gondolin micro-VM 或 OpenShell 沙箱。项目还倡导共享真实 agent 会话数据（Hugging Face 有会话数据集）替代「玩具基准」来改进 agent。MIT 开源、免费；官方托管/云服务定价仓库未载明（未知），使用需自备模型 API 凭据、调用费用由用户承担。",
    tags: ["社区出品", "开源", "MIT", "APP", "Agent 工具链", "CLI", "TypeScript", "多供应商 LLM"],
    officialUrl: "https://pi.dev", sourceUrl: "https://github.com/earendil-works/pi",
    installGuide: `npm install -g @earendil-works/pi-coding-agent`,
    updatedAt: "2026-09-18",
  },
  {
    name: "text-to-cad", slug: "text-to-cad", type: "skill", category: "engineering-manufacturing",
    summary: "给 AI 编码 agent 的 CAD/CAE/CAM 技能库：文字或图片生成可制造 CAD 模型，覆盖出图、切片到打印下发。",
    description: "text-to-cad 自述为「a library of agent skills for CAD, CAE and CAM」——给 AI 编码 agent 配上一整套机械设计的动手能力：从自然语言或图片请求生成与编辑 CAD 模型（输出 STEP，可导出 STL/3MF/GLB），本地浏览器预览模型，再到检索现货标准件（step.parts 技能可查螺丝、轴承、电机、连接器等 STEP 件）与出 2D 图纸（DXF），覆盖「文字 → 可制造」的完整链路。技能清单共 11 项，并延伸到机器人与制造执行：URDF/SRDF/SDF 技能覆盖机器人结构文件（连杆、关节、限位、惯性、网格）与仿真世界建模；DfAM Check 按工艺度量网格可打印性（壁厚、悬垂、支撑量、打印朝向）；G-code 技能调用真实切片器 CLI 产出打印机档位的 FDM 文件；Bambu Labs 技能可干跑并启动本地打印任务。接入上为 Codex（0.142.0+）、Claude Code、Grok Build 提供原生插件，其余 agent 走通用 Skills CLI，本地优先。MIT 开源、免费，本地运行不依赖托管服务，官网服务定价未载明（未知）。须知：生成结果用于实际制造前需专业校核。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "CAD", "CAE", "CAM", "机器人", "3D 打印"],
    officialUrl: "https://www.texttocad.dev", sourceUrl: "https://github.com/earthtojake/text-to-cad",
    installGuide: `npx skills add earthtojake/text-to-cad`,
    updatedAt: "2026-09-18",
  },
  {
    name: "Graphify", slug: "graphify", type: "app", category: "companion-tools",
    summary: "把代码库、文档、SQL schema 与 PDF 转成可溯源查询的知识图谱：无嵌入、无向量库，本地确定性 AST 解析。",
    description: "graphify 把代码库连同其文档、SQL schema、配置和 PDF 转成「可查询的知识图谱」，口号是查图谱而不是 grep 文件。它刻意与 RAG 划清界限：无嵌入、无向量库，基于本地确定性 AST 解析构建真实图谱（约 40 种语言、37 个 tree-sitter 语法），每条边都标注 EXTRACTED（源码显式）或 INFERRED（推断）以便溯源；官方引用 LOCOMO 基准 recall@10 0.497（对比 mem0 的 0.048），且建图不消耗 LLM 额度（以上为官方宣称数据）。输入面很宽：除代码外还支持 Markdown/HTML/RST/YAML 文档、SQL schema 与在线 PostgreSQL、PDF、图片、音视频、YouTube/URL、Terraform/HCL、MCP server 配置文件、包清单、Office 与 Google Workspace 文件。查询接口有 query（自然语言）、path（实体间最短路）、explain（节点深挖），产出 graph.html 交互图谱、GRAPH_REPORT.md 与 graph.json；本地优先，代码解析不出机器，仅文档/媒体语义加工用到 LLM。README 声明 Apache-2.0 与 MIT 双许可；托管平台处于公开发布前 early access、企业版免费试用「即将推出」，均无公开定价 → 定价：未知。须知：索引涉密代码时的部署方式与数据边界需使用方自查。",
    tags: ["社区出品", "开源", "Apache-2.0", "MIT", "APP", "知识图谱", "代码库理解", "本地优先", "MCP"],
    officialUrl: "https://www.graphify.com", sourceUrl: "https://github.com/Graphify-Labs/graphify",
    installGuide: `pip install graphifyy
graphify install`,
    updatedAt: "2026-09-18",
  },
  {
    name: "serena", slug: "serena", type: "mcp", category: "development-code",
    summary: "为编码 agent 提供 IDE 级符号语义能力的 MCP 工具包：语义检索与符号级编辑，40+ 语言 LSP。",
    description: "Serena 自称「The IDE for Your Coding Agent」——为编码 agent 提供 IDE 级语义能力的 MCP 工具包：在符号层面操作并利用代码的关系结构，而非行号或原始文本搜索这类低层概念。检索侧提供找符号、文件大纲、找引用、找声明、找实现、诊断检查等工具；编辑侧提供符号体替换、符号前后插入、安全删除等符号级编辑，官方称比整文件改写更不易错、更省 token，在更大更复杂的代码库上收益最明显。生态适配广：LSP 支持 40+ 语言（Python、TypeScript、Java、Go、Rust 等）；终端侧接 Claude Code、Codex、OpenCode、Gemini-CLI，IDE 侧接 VSCode、Cursor 与 JetBrains 全家桶，桌面/Web 侧接 Claude Desktop、Codex App、OpenWebUI；另有跨会话/用户/项目共享知识的记忆系统与多层 YAML 配置。许可为按组件双许可：SolidLSP 组件 MIT，其余 GPL-3.0-or-later（组合分发按 GPL）；Serena 本体免费开源，JetBrains 插件为付费（提供免费试用）。须知：直接改写代码，须在版本控制保护下使用；组合分发的 GPL-3.0 义务请商用前自行核对。",
    tags: ["社区出品", "开源", "GPL-3.0-or-later", "MCP", "语义检索", "代码编辑", "LSP", "Claude Code", "Codex"],
    officialUrl: "https://oraios.github.io/serena/", sourceUrl: "https://github.com/oraios/serena",
    installGuide: `uv tool install -p 3.13 serena-agent
serena init`,
    updatedAt: "2026-09-18",
  },
  {
    name: "OpenResearch", slug: "openresearch", type: "app", category: "others",
    summary: "把编码 agent 变成研究 agent：local-first 研究工作区，git 实验树让每次实验可复现、可追溯。",
    description: "OpenResearch 的口号是「Turn your coding agents into research agents」：一个 local-first 的研究工作区，把编码 agent 变成能做文献综述、提出假设、跑实验、产出研究材料的研究 agent，并支撑「提出想法 → 改代码 → 启动实验 → 检查证据 → 决定下一步」的自主研究循环（Autoresearch）。工程化保障可复现：每个探索方向获得独立 agent 会话与隔离的 git worktree；实验组织为 git 原生的实验树，每次运行都有不可变的 commit 归档，日志、diff、文件、结果与产出物始终绑定在产生它们的工作上。运行面覆盖本地、SSH 及 Slurm、Kubernetes、Ray、Hugging Face Jobs、Modal、Tinker 等托管算力；底层 agent 支持 Claude Code、Codex、OpenCode、Cursor（按会话可选 harness 与模型）；本地 SQLite 存储，orx up 在 127.0.0.1:4791 起本地 web 仪表盘，并有 macOS 应用与 Windows beta 下载。MIT 开源、免费；官网提及注册账号可用托管算力（managed compute）但未列价格 → 定价：未知。须知：项目年轻（2026-09-16 快照 3,164★），研究结论需人工复核。",
    tags: ["社区出品", "开源", "MIT", "APP", "研究智能体", "实验管理", "本地优先", "Claude Code", "Codex"],
    officialUrl: "https://openresearch.sh", sourceUrl: "https://github.com/alphaXiv/OpenResearch",
    installGuide: `curl -LsSf https://openresearch.sh/install.sh | sh`,
    updatedAt: "2026-09-18",
  },
  {
    name: "HyperFrames", slug: "hyperframes", type: "app", category: "companion-tools",
    summary: "HeyGen 官方开源的视频渲染框架：用 HTML 让 AI agent 直接渲染成确定性 MP4 视频。",
    description: "HyperFrames 是 HeyGen 官方开源的视频渲染框架，口号「Write HTML. Render video. Built for agents.」：把 HTML、CSS、媒体与可寻址（seekable）动画转换成确定性的 MP4 视频——同样的输入每次渲染结果一致，适合程序化批量生产。它既能本地用 CLI 驱动，也能作为 AI 编码 agent 的技能使用，还可充当托管类视频创作产品的渲染内核。面向 agent 是它的核心设计：项目内置 20 个技能，由 /hyperframes 路由技能按需分发到 10 类创作工作流——产品发布视频、无脸讲解视频、PR 变更讲解、字幕嵌入、访谈包装、动效图形、音乐卡点视频、幻灯片等——覆盖「规划 → 写 HTML → 接线动画 → 加媒体 → lint → 预览 → 渲染」完整制作回路。README 表明技能可与 Claude Code、Cursor、Gemini CLI、Codex 等支持 skills 的编码 agent 协作；动画层支持 GSAP、Lottie、Three.js、Anime.js、CSS、WAAPI 等运行时。Apache-2.0 开源、免费；本地运行需 Node.js ≥22 与 FFmpeg，渲染效果未实测；托管云渲染的额度与收费方式：未知。",
    tags: ["官方出品", "开源", "Apache-2.0", "APP", "视频渲染", "HTML", "AI Agent", "HeyGen"],
    officialUrl: "https://hyperframes.heygen.com", sourceUrl: "https://github.com/heygen-com/hyperframes",
    installGuide: `npx hyperframes init my-video`,
    updatedAt: "2026-09-18",
  },
  {
    name: "Humanizer", slug: "humanizer", type: "skill", category: "docs-office",
    summary: "把「AI 味」文本改写成自然人事表达的 agent 技能：25 类痕迹模式化标记与改写，只改表达不改事实。",
    description: "Humanizer 是一个把「AI 味」文本改写成自然人事表达的 agent 技能，官方定义「rewrites AI-sounding text so it reads like a person wrote it, without changing what it says」——只改表达、不改事实。本体只是一个 Markdown 技能文件，任何支持 skills 标准的 agent 均可使用：Skills CLI 一条命令安装（npx skills add blader/humanizer --global），Claude Code 2.1.142+ 可走插件市场，Claude Desktop 可作为技能上传，调用口令 /humanizer。它的方法论成体系：基于维基百科「Signs of AI writing」页面（WikiProject AI Cleanup 维护）整理出 25 类 AI 写作痕迹模式，按强度分五组——铺垫代替陈述、节奏套路化、夸大与借势权威、格式套路、对话残留——先逐条标记、再出改写稿、自查残余机器感、最后交定稿。改写中姓名、数字、日期、引用等事实细节缺失时会向写作者追问而非编造；支持「声线匹配」——贴 2–3 段本人写作样本，改写即跟随其节奏、用词、标点乃至刻意的小习惯；对文件操作时只改正文，不碰代码、数据、frontmatter 与链接目标。MIT 开源、免费；25 类模式与全部示例以英文写作为主，中文文本改写效果未知。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "写作去痕", "声线匹配", "Markdown", "多端安装"],
    officialUrl: "https://github.com/blader/humanizer", sourceUrl: "https://github.com/blader/humanizer",
    installGuide: `npx skills add blader/humanizer --global`,
    updatedAt: "2026-09-18",
  },
  {
    name: "OpenMAIC", slug: "openmaic", type: "app", category: "others",
    summary: "清华大学 MAIC 团队开源的一键沉浸式多智能体课堂：主题或文档进，含幻灯片、测验与 PBL 的完整课堂出。",
    description: "OpenMAIC（Open Multi-Agent Interactive Classroom）是清华大学 MAIC 团队开源的 AI 课堂平台：把任意主题或文档变成可交互的沉浸式课堂，由多智能体编排生成幻灯片、测验、交互模拟与项目式学习（PBL）活动，交给会开口讲课、能在白板上画图写公式的 AI 老师与 AI 同学，与学习者实时讨论。技术栈为 Next.js + React + TypeScript + LangGraph，提供中英文双语 README 与 v1.0.0 中英文使用指南（飞书）。2026-08-27 发布的 v1.0.0 新增 Pro 工作台：一段话描述需求，agent 即规划大纲、逐页构建并按反馈修订整门课程；支持上传文档、音频、视频或联网检索作为素材，会话服务器化、可中断续跑；内置 20 个课程技能（幻灯片、测验、交互件、PBL、图像、视频、语音、.pptx 导入）。架构保持中立：模型、媒体、搜索与存储后端均可自带替换。成品可导出可编辑 .pptx、交互 .html 或 MP4；OpenMAIC Skill 可接入 OpenClaw、Codex、DeepSeek、WorkBuddy 等工作台，从飞书、Slack、Telegram 等 20+ 消息应用或 IDE 直接生成课堂。MIT 开源（v0.3.0 起由 AGPL-3.0 重授权）、免费；多智能体系统部署偏重，本地部署需 Node.js ≥22.19、pnpm ≥10 并自备至少一个模型服务商 API key；托管 Demo（open.maic.chat）的额度与限制：未知。",
    tags: ["社区出品", "开源", "MIT", "APP", "多智能体", "AI 教育", "课堂生成", "清华 MAIC"],
    officialUrl: "https://open.maic.chat", sourceUrl: "https://github.com/THU-MAIC/OpenMAIC",
    installGuide: `git clone https://github.com/THU-MAIC/OpenMAIC.git && cd OpenMAIC && pnpm install`,
    updatedAt: "2026-09-18",
  },
  {
    name: "Context Mode", slug: "context-mode", type: "app", category: "companion-tools",
    summary: "为 AI 编码 agent 做上下文窗口优化的 MCP 服务器：沙箱化工具输出、会话记忆续跑，只把结果带进上下文。",
    description: "Context Mode 定位「上下文问题的另一半」：MCP 工具调用会把原始数据整块倒进上下文窗口——一次网页快照、一批 issue、一份日志即可吃掉几十 KB，半小时后可用上下文所剩无几；而对话压缩（compact）又会让 agent 忘掉正在改的文件与进行中的任务。它以 MCP 服务器形态同时处理这四个侧面：沙箱化工具输出、会话连续性、以代码代替模型计算、以及不干预模型文风（README 引证激进简短提示会损害推理表现的研究）。机制上：6 个沙箱工具（ctx_execute、ctx_batch_execute 等）把原始输出挡在上下文之外、只回传结果，官方称 315 KB 可降至 5.4 KB（削减 98%，官方口径，未实测）；文件编辑、git 操作、任务、报错与用户决策写入 SQLite 并建 FTS5 全文索引，压缩后按 BM25 检索只取相关片段支撑续跑——不续会话则数据立即删除；「Think in Code」范式要求 agent 写脚本处理数据、只把结果带进上下文，README 称一个脚本可替代十次工具调用。共 11 个 MCP 工具、官方称支持 17 个客户端；Claude Code（v1.0.33+）可从插件市场一键安装，亦可 claude mcp add context-mode -- npx -y context-mode 以纯 MCP 方式接入。免费使用、源码公开；许可证为 ELv2（Elastic License 2.0，source-available 自定义许可，GitHub API 标记 NOASSERTION），商用与托管服务条款需自行审阅；沙箱化可能损失细节感知，需按项目验证；README 所载节省比例为官方口径、未实测；托管 Insight 仪表盘的收费模式：未知。",
    tags: ["社区出品", "开源", "ELv2", "APP", "上下文优化", "MCP", "会话记忆", "Claude Code"],
    officialUrl: "https://context-mode.com", sourceUrl: "https://github.com/mksglu/context-mode",
    installGuide: `claude mcp add context-mode -- npx -y context-mode`,
    updatedAt: "2026-09-18",
  },
  {
    name: "gongwen-gbt9704-skill", slug: "gongwen-gbt9704-skill", type: "skill", category: "docs-office",
    summary: "按国标 GB/T 9704-2012 生成可直接交付的公文 DOCX：版心/文号/页码/红头套打，可生成、可检查。",
    description: "gongwen-gbt9704-skill 是一个面向中文公文写作场景的开源 SKILL：按国家标准 GB/T 9704-2012 生成可直接交付、可继续编辑的公文 DOCX，把公文格式从「手工对照国标逐项排版」变成「可生成、可检查」。A4 版心、字体、标题层级、文号、页码、附件、版记等版式要素由技能统一处理；普通稿不误用红头，正式发文支持预印红头纸套打或完整电子红头，并保留 Word/WPS 可更新目录。按 README 的 2.0 更新说明，该版本重新核验了红头场景、首页预留、红线下标题间距、Word/WPS 标题样式、目录引用、特殊格式与跨平台安装，并完成 18 份 DOCX、37 个 PNG 页面与版头坐标量测；机构名称与文号走 --org、--doc-no 参数定位，正式版式会拒绝明显不符合年份、六角括号、顺序号和「号」规则的文号，letter/command/minutes 等特定格式使用对应生成分支。同一份规则可安装到 Codex、Claude Code、OpenCode、Trae Code、Kimi、TraeWork、WorkBuddy 和 ZCode。MIT 开源、免费；README 已置信息安全提醒——涉密与受限文件不得上传未授权的在线模型或公共仓库，公文涉密合规由用户按本单位规范自担，红头使用需符合本单位规范。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "公文排版", "GB/T 9704", "DOCX", "红头套打"],
    officialUrl: "https://github.com/mizzlelover/gongwen-gbt9704-skill", sourceUrl: "https://github.com/mizzlelover/gongwen-gbt9704-skill",
    installGuide: `git clone https://github.com/mizzlelover/gongwen-gbt9704-skill.git`,
    updatedAt: "2026-09-19",
  },
  {
    name: "pcb-skill", slug: "pcb-skill", type: "skill", category: "engineering-manufacturing",
    summary: "agent 驱动 EasyEDA Pro 的 PCB 全流程技能：从硬件想法到可下单打样，全流程门控校验。",
    description: "pcb-skill 是一个用 AI agent 驱动 EasyEDA Pro 的开源 SKILL，目标是把硬件想法一路推进到「可下单、可焊接、可点亮」的 PCB：从概念、原理图、选料，到布局、布线、验证，再到把采购推进到支付页，全流程由 agent 按阶段推进。它不是 PCB 理论教程，而是一套门控：专门捕获理论管不住的实体错误——插座转向导致屏幕永远插不上、模块体下的电容、只存在于图纸层的禁布区、悄悄量测上一版固件的检查器——每条规则都来自真实板子上付过学费的案例（docs/case-study.md）。技能运行在 Claude Code（桌面版）或 Codex（桌面版）内，通过 MCP 驱动 EasyEDA Pro，并在用户已登录的浏览器里完成选料与下单准备；采购环节止步于支付页，付款始终由人工确认。安装时 SKILL.md 需与 references/、scripts/、setup/ 同目录落位（README 提醒只复制 skills/pcb/ 会得到缺失校验器的残缺技能），并要求按 setup/README.md 完成启动前检查。MIT 开源、免费；打样与元件费用由用户自担；依赖 EasyEDA Pro 与已登录浏览器环境。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "PCB", "EasyEDA", "硬件设计", "门控校验"],
    officialUrl: "https://github.com/daishuge/pcb-skill", sourceUrl: "https://github.com/daishuge/pcb-skill",
    installGuide: `git clone https://github.com/daishuge/pcb-skill.git && cd pcb-skill && mkdir -p ~/.claude/skills/pcb && cp -R skills/pcb/. scripts setup ~/.claude/skills/pcb/`,
    updatedAt: "2026-09-19",
  },
  {
    name: "motion-web", slug: "motion-web", type: "skill", category: "creative-design",
    summary: "「动效即材质」的前端动效技能：物理阻尼求解器 + 7 大案例自动化 Headless 验证。",
    description: "motion-web 是一个前端动效 SKILL，主张「动效即材质」——把动效当作界面的一种材质来系统化生产，而非零散的手调动画。技能内置物理阻尼求解器，让动效参数具备物理依据，并配套排版规范输出一致的高手感动效方案；面向 Agent 与前端工程师，覆盖 vanilla Three.js / Canvas 2D / WebGL / CSS 技术栈。它的工程质量保障是自动化验证：内置 7 大完整案例全部通过自动化 Headless 验证（README 标注 Cases 7/7 PASS），动效效果可被机器复核，并以 token 纪律约束生成成本。个人学习、学术研究与非商业展示可免费使用；许可证为 CC BY-NC 4.0（知识共享署名-非商业性使用 4.0 国际），禁止任何未经授权的商业集成、平台内置或营利性分发，商用授权或企业合作需联系作者；项目内嵌的第三方开源字体子集保留各自许可（SIL Open Font License）。纯前端动效技能，适用面相对较窄。",
    tags: ["社区出品", "开源", "CC BY-NC 4.0", "SKILL", "前端动效", "Three.js", "物理阻尼", "Headless 验证"],
    officialUrl: "https://github.com/feitangyuan/motion-web", sourceUrl: "https://github.com/feitangyuan/motion-web",
    installGuide: `git clone https://github.com/feitangyuan/motion-web.git ~/.claude/skills/motion-web`,
    updatedAt: "2026-09-19",
  },
  {
    name: "skillbox", slug: "skillbox", type: "skill", category: "development",
    summary: "自托管、可版本化的 AI agent 技能库：MCP 接口、scoped clients 按客户端授权。",
    description: "skillbox 是一个自托管、可版本化的 AI agent 技能库：把分散在多工具链（Claude Code、Codex、Cursor 等）中的技能资产集中起来统一管理，按版本沉淀、按需分发。它以基础设施形态提供能力：通过 MCP 接口对外服务，支持 scoped clients 按客户端授权，并提供带独立创建、更新、归档与提案权限的 Profiles。部署形态为 Docker Compose 自托管（要求 Docker Engine/Desktop with Compose v2 与 Bash，无需宿主机 Bun/Node）：setup 一键生成含随机凭据的 .env（mode 0600、拒绝覆盖已有文件），start 后从本机端口以 SKILLBOX_ADMIN_TOKEN 登录；远程部署需自设 HTTPS origin 并配置 TLS 反向代理。获取侧校验每个路径、文件哈希、大小、可执行位与包校验和后原子写入，不执行代码、不安装依赖；集成凭据在 PostgreSQL 内以 AES-256-GCM 加密存储、不经设置 API 或浏览器包返回，更换管理令牌会使已存集成凭据不可读（README 提供轮换指引）。MIT 开源、免费自托管；项目上线时间短（2026-09-17 创建）、成熟度未知；可选的 Jev 推荐功能依赖第三方服务。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "技能管理", "自托管", "版本化", "MCP"],
    officialUrl: "https://github.com/kitze/skillbox", sourceUrl: "https://github.com/kitze/skillbox",
    installGuide: `git clone https://github.com/kitze/skillbox.git && cd skillbox && bash scripts/skillbox.sh setup && bash scripts/skillbox.sh start`,
    updatedAt: "2026-09-19",
  },
  {
    name: "Jev Review", slug: "jev-review", type: "mcp", category: "development-code",
    summary: "编码 agent 的持续软件质量审查 MCP：本地优先、无托管后端、stdio 接入。",
    description: "Jev Review 是面向编码 agent 的持续软件质量审查 MCP：以本地优先、无托管后端的方式部署，通过标准 stdio 接口接入编码 agent 工作流，对代码质量做持续性把关，而非一次性的单点审查。官方承诺「Your API key stays on your machine」——无托管后端、数据库、遥测服务或作者运营的代理，唯一远端请求是直达所配置的 Jev API。审查维度取自官方 README：Correctness（正确性）、Complexity（复杂度）、Changeability（可变更性）、Modularity（模块化）、Tests（测试）、Security（安全）等评分维度。客户端覆盖：Claude Code、Codex、Cursor 均可用 npx plugins add 一条命令安装（亦支持仅 MCP 的手动配置），OpenCode 走手动配置，运行需 Node.js 20+。它是 TypeSafe AI 于 2026-09-15 发布的 System One 决策模型 Jev（闭源早期访问、仅输出结构化决策）在代码质量场景的落地条目：MIT 开源、工具本身免费，但审查能力依赖闭源 Jev API（需自备 TypeSafe 控制台的 API key），调用费用未知；单作者项目、上线时间短（2026-09-17 创建）。",
    tags: ["社区出品", "开源", "MIT", "MCP", "代码质量", "持续审查", "本地优先", "Jev"],
    officialUrl: "https://github.com/NiazMorshed2007/jev-review", sourceUrl: "https://github.com/NiazMorshed2007/jev-review",
    installGuide: `npx plugins add NiazMorshed2007/jev-review --target claude-code`,
    configText: `{
  "mcpServers": {
    "jev-review": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/jev-review/dist/server.js"],
      "env": {
        "JEV_API_KEY": "\${env:JEV_API_KEY}"
      }
    }
  }
}`,
    updatedAt: "2026-09-19",
  },
  {
    name: "agent-skills", slug: "agent-skills", type: "skill", category: "development",
    summary: "生产级 AI 编码 agent 工程技能集：全生命周期命令、专家评审 persona 与跨 agent 可移植。",
    description: "agent-skills 是 Google 工程师 Addy Osmani 维护的生产级 AI 编码 agent 技能集，把资深工程师在真实项目中的工作流、质量门禁与最佳实践打包成 AI agent 可以一致执行的技能库。它覆盖从需求定义、规划、构建、验证、评审到上线的完整开发生命周期：提供 9 个对应生命周期各阶段的斜杠命令（/spec、/plan、/build、/test、/review、/ship 等）和共 25 个技能（24 个生命周期技能 + 1 个元技能），并会根据正在进行的任务自动激活对应技能——设计 API 时触发 api-and-interface-design，构建 UI 时触发 frontend-ui-engineering。截至 2026-09-20 快照，仓库获 96,882 星、周增 3,051 星，居 skill 类前列；最近 push 为 09-18。每个技能不是一段泛泛建议，而是带步骤、检查点与证据要求的结构化工作流：内置「反合理化表」逐条反驳 agent 常见的跳步借口（如「测试以后再补」），并以「验证不可协商」收尾——测试通过、构建输出、运行时数据才算证据。技能集融入 Google 工程文化：API 设计中的 Hyrum's Law、测试金字塔与 Beyonce Rule、代码评审的变更尺寸规范、trunk-based 开发、CI/CD 的 Shift Left 与特性开关等。通过开源 skills CLI 一条命令即可装入 70+ agent（Claude Code、Cursor、Codex、Copilot、Cline 等）：npx skills add addyosmani/agent-skills。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "工程技能", "代码评审", "测试驱动", "Addy Osmani"],
    officialUrl: "https://github.com/addyosmani/agent-skills", sourceUrl: "https://github.com/addyosmani/agent-skills",
    installGuide: `npx skills add addyosmani/agent-skills`,
    updatedAt: "2026-09-22",
  },
  {
    name: "WeKnora", slug: "weknora", type: "app", category: "others",
    summary: "腾讯开源 LLM 知识平台：文档转可检索 RAG、ReAct 自主推理 agent、自维护 Wiki 知识库。",
    description: "WeKnora 是腾讯开源的 LLM 知识框架，面向企业级文档理解、语义检索与自主推理，围绕三大核心能力组织：基于 RAG 的快速问答负责日常查询；ReAct Agent 自主编排知识检索、MCP 工具、租户技能目录、会话持久沙箱与联网搜索，处理复杂多步任务；Wiki 模式让 agent 把原始文档蒸馏成自维护、互链的 Markdown 知识库，配交互式知识图谱、手动编辑、版本历史与一键回滚，另有跨会话长期记忆。该项目 2025-07 创建，本期为热度回升而非新发布：截至 2026-09-20 快照，仓库获 27,364 星、周增 4,703 星，为本周 AI 项目星增最高之一。工程化能力覆盖全链路：支持 PDF、Word、Excel、图片等 10+ 文档格式，可从飞书知识库、GitLab、Notion、语雀、钉钉文档等来源自动同步；问答可经企业微信、飞书、Slack、Telegram 等 IM 渠道直达；兼容 OpenAI、DeepSeek、Qwen、混元、Gemini 等 20+ 模型供应商，向量库支持 pgvector、Elasticsearch、Milvus、Qdrant；提供工作区四级 RBAC、作用域 API Key 与 Langfuse 全链路可观测，支持本地/私有云 Docker/K8s 部署、数据主权自持。许可证（2026-09-22 采集）：仓库 README 徽章与 LICENSE 文件均标注 MIT，LICENSE 实为含第三方组件例外说明的 Tencent 附加条款版（GitHub 机器检测显示 Other）；官方安全提示要求生产部署置于内网/私有网络、避免直接暴露公网。",
    tags: ["官方出品", "开源", "MIT", "APP", "知识库", "RAG", "企业搜索", "腾讯"],
    officialUrl: "https://github.com/Tencent/WeKnora", sourceUrl: "https://github.com/Tencent/WeKnora",
    installGuide: `git clone https://github.com/Tencent/WeKnora.git && cd WeKnora && cp .env.example .env && docker compose pull && docker compose up -d`,
    updatedAt: "2026-09-22",
  },
  {
    name: "jianying-headless", slug: "jianying-headless", type: "skill", category: "creative-design",
    summary: "面向剪映专业版（macOS）的本地自动化：结构化计划生成可编辑草稿、隔离编辑、原生引擎导出 MP4。",
    description: "jianying-headless 是面向剪映专业版（macOS）的本地自动化工具，让 AI agent 以无界面方式驱动剪映：用结构化 JSON 剪辑计划生成原生可编辑草稿，在独立副本中修改多轨工程（不覆盖原项目），再调用本机剪映引擎把验证过的快照导出为 H.264/AAC MP4。核心流程为「素材与剪辑计划 → 可编辑剪映草稿 → 原生引擎导出」，提供 Python 命令行与配套 Agent Skill 双入口，定位 AI 视频工作流的工程交接、批量草稿生成与 agent 辅助剪辑。截至 2026-09-20 快照，仓库获 1,481 星（09-15 新建，5 天破 1,400），push 09-19。项目对环境与版本的校验非常严格：目前适配剪映专业版 11.5.0（兼容 11.4.2），要求 Apple Silicon Mac、macOS 26.0+、Python 3.9+、FFmpeg 与 Xcode 命令行工具；doctor 命令核对剪映版本、组件身份与工具链，未知版本或不匹配组件会被直接拒绝。导出在隔离进程中运行，默认不联网、不读取账号数据；剪映官方引擎、账号数据、原始素材库与效果资源不随源码分发。许可证（2026-09-22 采集）：原创部分采用「个人学习和非商业使用许可」，商业使用需取得作者书面授权，非 MIT/Apache-2.0 整包授权；维护持续性与剪映草稿格式兼容风险待观察。",
    tags: ["社区出品", "私有源预览", "非商业许可", "SKILL", "剪映", "视频创作", "macOS", "AI 剪辑"],
    officialUrl: "https://github.com/mcncarl/jianying-headless", sourceUrl: "https://github.com/mcncarl/jianying-headless",
    installGuide: `git clone https://github.com/mcncarl/jianying-headless.git && cd jianying-headless && python3 tools/build_native_codec.py`,
    updatedAt: "2026-09-22",
  },
  {
    name: "Easel", slug: "easel", type: "app", category: "others",
    summary: "浙大 REAL 实验室开源社媒内容工作台：发现、策划、创作、发布、归因五层闭环，画像驱动多平台适配。",
    description: "Easel 是浙江大学 REAL 实验室开源的社交媒体内容工作台，把 OpenClaw Agent、账号画像、112 项内容技能与真实媒体工具接在一起：agent 不止回答「应该怎么做」，而是直接把内容做出来、归档并按需发布。工作流分五层——发现（聚合微博、抖音、知乎、B 站等平台热榜与垂类趋势、竞品动态）、策划（选题矩阵、标题与 Hook、分镜脚本、内容日历）、创作（文案、卡片、海报、配音、视频）、发布（多平台格式适配与真实发布）、归因（回收播放与互动数据，把有效经验沉淀回账号画像）。截至 2026-09-20 快照，仓库获 1,238 星（08-28 新建），push 09-19。它强调「画像驱动，而不是一次性生成」：每个账号有独立的六维画像（定位、风格、受众、平台、偏好与红线、长期记忆），跨平台、跨会话持续使用；同一份母版内容可改写成小红书卡片、短视频、知乎长文等不同平台形态并遵循各自格式与字数要求。目前支持小红书、抖音、快手、知乎、B 站、微信视频号六个平台的登录、适配与发布，提供 Web 工作台与 CLI 双入口。风险提示：社媒平台自动化操作存在各平台合规风险；README 官方提示对小红书谨慎自动发布——平台可能检测自动化操作并触发验证、限流或账号风控，建议使用预览与发布前检查、由用户确认后手动发布。",
    tags: ["社区出品", "开源", "Apache-2.0", "APP", "社交媒体", "内容创作", "多平台发布", "浙大 REAL"],
    officialUrl: "https://github.com/ZJU-REAL/Easel", sourceUrl: "https://github.com/ZJU-REAL/Easel",
    installGuide: `git clone https://github.com/ZJU-REAL/Easel.git && cd Easel && bash setup.sh`,
    updatedAt: "2026-09-22",
  },
  {
    name: "huashu-report", slug: "huashu-report", type: "skill", category: "docs-office",
    summary: "机构级研究报告 Agent Skill：规范从 42 份顶级机构报告反向提炼，四角色流水线产出行业报告与白皮书。",
    description: "huashu-report 是一个「做机构级研究报告」的 Agent Skill，让 agent 按顶级机构的成稿规范产出行业报告、白皮书、年度调研、数据洞察与论文。它的规范不是凭空设计，而是从 2026 年 8 月下载的 42 份顶级机构报告 PDF（Stanford HAI、McKinsey、BCG、OpenAI、Anthropic、PwC、Deloitte、世界银行等，其中 41 份进入量化统计）反向拆解提炼而来——量化结论例如：正文 40/41 份使用近黑色文字、图表标题写结论而非主题、顶级报告都有「预先反驳自己」的段落。截至 2026-09-20 快照，仓库获 409 星（08-31 新建），push 09-14。技能内部是一条四角色流水线：研究员、编辑、信息设计师、数据可视化师依次工作，覆盖六种报告原型的骨架选型、行文规范（口径标注、hedge 技巧、三层增值）、视觉系统（字号阶、网格、配色方向库、8 种图型模式库）与「数据表/生成器/渲染器」三文件生产架构；附带 chart.py 内联 SVG 图表库与 render.py 渲染自检。纯文本加三个 Python 文件、无外部服务依赖，说「做一份 XX 的调研报告」即可触发。README 自述限制：单篇文章、PPT、演示稿不适用；规范源自英文机构报告，中文语境行文习惯需自行校对；样本框偏 AI 与科技主题。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "研究报告", "白皮书", "数据可视化", "行业分析"],
    officialUrl: "https://github.com/alchaincyf/huashu-report", sourceUrl: "https://github.com/alchaincyf/huashu-report",
    installGuide: `git clone https://github.com/alchaincyf/huashu-report ~/.claude/skills/huashu-report`,
    updatedAt: "2026-09-22",
  },
  {
    name: "Blitz Strike", slug: "blitzstrike", type: "mcp", category: "development-code",
    summary: "把结构化渗透测试方法论打包为 MCP 服务器：侦察枚举、可达性追踪与实测验证三层流程，仅限授权测试。",
    description: "Blitz Strike 是一个把结构化渗透测试方法论打包为 MCP 服务器的开源工具（TypeScript/Bun 编写），供 Claude、Cursor、Gemini 等 MCP 客户端以单次调用执行授权安全评估。核心理念是「扫描命中只是假设，实测验证才是结论」：三层方法论中 BLITZ 负责侦察与攻击面枚举，EAGLE-EYE 做静态分析与数据流追踪（source-to-sink 可达性判断），STRIKE 负责实时验证、测试范围强制执行与报告前确认。截至 2026-09-20 快照，仓库获 637 星（09-12 新建），push 09-19。工程配套完整：内置 130 个安全工具的知识库、317+ 份深度工具手册与 17 个评估剧本；报告阶段支持 CVSS v3.1 评分计算、发现去重、生成带 SHA-256 哈希的 Markdown/JSON 报告与覆盖矩阵；scope_check 在测试前强制校验授权范围（禁止 DoS、支持排除项），并支持负责任披露身份标识。安装零门槛：npx -y blitzstrike doctor 做环境检查，install 自动注册到检测到的 agent CLI。仅限授权测试用途：未经系统所有者明确许可不得对任何系统使用，收录仅作工具信息介绍，使用须遵守授权与当地法律；README 所载基准指标为项目方自述，未经独立验证。",
    tags: ["社区出品", "开源", "MIT", "MCP", "安全测试", "渗透测试", "授权评估", "Red Team"],
    officialUrl: "https://github.com/shinthink/blitzstrike", sourceUrl: "https://github.com/shinthink/blitzstrike",
    installGuide: `npx -y blitzstrike install`,
    configText: `{
  "mcpServers": {
    "blitzstrike": {
      "command": "blitzstrike",
      "args": ["serve", "--mcp"]
    }
  }
}`,
    updatedAt: "2026-09-22",
  },
  {
    name: "Taste Skill", slug: "taste-skill", type: "skill", category: "creative-design",
    summary: "给 AI 装「品味」，抑制模板化平庸输出。",
    description: "Taste Skill 是一个为 AI 注入「品味」的技能包，目标是抑制模板化、平庸的「AI 味」输出，让生成内容带有审美判断；品味范围覆盖文章、文案写作与界面设计两类场景。项目保持活跃（2026-09-20 有推送，进入 GitHub Trending 2026-09-22 JavaScript 日榜），累计 89,268 星（2026-09-23 快照值）。与在库 Humanizer（去除 AI 写作痕迹）为不同产品、不同官方站点：Taste-Skill 范围更宽、以审美判断注入为主，两者可并存。官方提供独立网站 tasteskill.dev，安装走官方 npx skills add 命令。效果主观、暂无量化评测，需按项目调校；README 含 Kimi（Moonshot AI）赞助位，引用素材时注意识别性引用边界（沿用 RUYI-164 期核验记录，现状以官方仓库为准）。MIT 开源、免费。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "设计品味", "写作品味", "反 slop", "AI 味"],
    officialUrl: "https://github.com/Leonxlnx/taste-skill", sourceUrl: "https://github.com/Leonxlnx/taste-skill",
    installGuide: `npx skills add https://github.com/Leonxlnx/taste-skill`,
    updatedAt: "2026-09-23",
  },
  {
    name: "World Monitor", slug: "world-monitor", type: "app", category: "others",
    summary: "实时全球情报仪表盘：AI 新闻聚合、地缘监测、基础设施追踪一屏呈现。",
    description: "World Monitor 是一个实时全球情报仪表盘，把 AI 新闻聚合、地缘监测与基础设施追踪放进同一个态势界面，一屏呈现。对需要每天跨多个信息源盯全球动态的人来说，它把「翻多处信息源」压缩成「看一块面板」。项目处于活跃迭代期（2026-09-08 发布 v2.10.0），README 提供包括简体中文在内的多语言版本，官方站点为 worldmonitor.app。AGPL-3.0 开源、免费；AGPL-3.0 对商用集成有传染性，商用集成前需评估许可影响；AI 聚合内容的准确性与情报内容敏感性需自查；数据源清单与更新频率以官方仓库为准。",
    tags: ["社区出品", "开源", "AGPL-3.0", "情报聚合", "地缘监测", "基础设施追踪", "仪表盘"],
    officialUrl: "https://github.com/koala73/worldmonitor", sourceUrl: "https://github.com/koala73/worldmonitor",
    updatedAt: "2026-09-21",
  },
  {
    name: "Appllama Skills", slug: "appllama-skills", type: "skill", category: "development",
    summary: "对照头部畅销应用研究出的 agent 技能集，让 agent 真正会做移动 App。",
    description: "Appllama Skills 是一套移动 App 构建 agent 技能，方法论来自对头部畅销应用的研究，目标是让 agent 真正会做移动应用。对想做移动端、但缺少成熟设计与工程范式的开发者来说，这类「对照优秀成品总结出的技能」是可直接复用的经验注入。官方站点为 appllama.io。活跃度需如实提示：截至 2026-09-21 快照，最近一次推送为 2026-09-06，近两周无推送，活跃度偏弱。研究头部应用设计模式存在版权边界，需注意；技能数量与覆盖平台（iOS/Android 等）以官方仓库为准。安装走官方 README 的 npx skills add 命令。MIT 开源、免费。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "移动应用", "App 构建", "畅销应用研究"],
    officialUrl: "https://github.com/Appllama/appllama-skills", sourceUrl: "https://github.com/Appllama/appllama-skills",
    installGuide: `npx skills@latest add appllama/appllama-skills`,
    updatedAt: "2026-09-21",
  },
  {
    name: "AI Data Extractor", slug: "ai-data-extractor", type: "app", category: "companion-tools",
    summary: "一键提取 Claude Code、Cursor、Windsurf、Aider、Cline/Roo 等 AI 编码工具的聊天历史。",
    description: "AI Data Extractor 做的事很聚焦：一键提取 Claude Code、Cursor、Windsurf、Aider、Cline/Roo 等 AI 编码工具的聊天历史。重度使用 AI 编码工具的用户，会话记录散落在各款工具中，想备份、迁移或做分析时缺少统一出口，这个项目补的就是这个出口。项目很新（2026-09-11 建仓），官方入口为 GitHub 仓库。会话记录涉及隐私与敏感代码，导出后的保管责任在用户；代码公开可审计——对经手敏感会话数据的工具尤为重要。支持的操作系统与导出格式以官方仓库 README 为准。MIT 开源、免费。",
    tags: ["社区出品", "开源", "MIT", "会话历史", "数据提取", "Claude Code", "Cursor", "隐私"],
    officialUrl: "https://github.com/kruzovic7/ai-data-extractor", sourceUrl: "https://github.com/kruzovic7/ai-data-extractor",
    updatedAt: "2026-09-21",
  },
  {
    name: "OrcaReplay", slug: "orcareplay", type: "app", category: "others",
    summary: "给 agent「时间旅行」：录制、回放、分叉、调试任意模型驱动的 agent 运行。",
    description: "OrcaReplay 给 agent 运行加上「时间旅行」：录制、回放、分叉、调试任意模型驱动的 agent 运行。agent 应用出问题时最难的是复现，有了运行录制，回放即是复现，分叉即可从既有运行派生新的调试路径——这类能力是 agent 工程化基建的新品类。出品方为 OrcaRouter.ai 团队（出品方官网 orcarouter.ai），项目约 3 周大（截至 2026-09-21 快照）。名称辨析：与 stablyai 的桌面 ADE 产品 Orca 名称近似，但为不同团队、不同产品。录制内容可能含凭据/敏感数据，共享回放前需脱敏；支持的 agent 框架清单以官方仓库为准。Apache-2.0 开源、免费。",
    tags: ["社区出品", "开源", "Apache-2.0", "agent 调试", "录制回放", "时间旅行", "agent 工程"],
    officialUrl: "https://github.com/Continuum-AI-Corp/OrcaReplay", sourceUrl: "https://github.com/Continuum-AI-Corp/OrcaReplay",
    updatedAt: "2026-09-21",
  },
  {
    name: "Gap Trap", slug: "gap-trap", type: "skill", category: "development",
    summary: "把 vibe coding 变成高质量代码：仓库内规则与门控让 AI 代码保持正确。",
    description: "Gap Trap 处理 vibe coding 的后遗问题：用仓库内规则与门控让 AI 写出的代码保持正确，按官方定位减少逐行人工 review 的依赖。AI 编码产能上来之后，质量保障往往成为新瓶颈，它把质量约束前置进仓库本身，而不是靠人事后逐行盯。文档站为 pliablepixels.github.io/gap-trap。项目很新：2026-09-13 建仓，社区尚小（截至 2026-09-21 快照）。门控规则需按团队规范调整，具体规则条目与接入方式以官方文档站为准。安装走官方 README 的 npx skills add 命令。MIT 开源、免费。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "质量门控", "vibe coding", "代码质量"],
    officialUrl: "https://github.com/pliablepixels/gap-trap", sourceUrl: "https://github.com/pliablepixels/gap-trap",
    installGuide: `npx skills add pliablepixels/gap-trap`,
    updatedAt: "2026-09-21",
  },
  {
    name: "ZCode", slug: "zcode", type: "app", category: "official-apps",
    summary: "Z.ai 官方开源 AI 编程工作台，桌面应用+浏览器双形态，覆盖本地与云端编程代理场景。",
    description: "ZCode 是 Z.ai 官方出品的开源 AI 编程工作台，提供桌面应用与浏览器两种形态。它定位为完整的编程代理（coding agent）工作台，覆盖开发者的本地与云端编程场景，而不是单一的模型切换或配置工具。项目于 2026-09-20 创建，上线 2 天即收获 5,426 星（2026-09-22 快照值），热度上升显著。在本站目录中，它与已收录的 Codex、Claude 形成同类对照——一线模型厂商官方开源的编程代理入口；与在库 CCSwitch（供应商切换器）定位不同。Apache-2.0 开源，Z.ai 官方维护；托管与商用定价未知，发布极新、成熟度未知，能力与路线图以官方仓库为准。",
    tags: ["官方出品", "开源", "Apache-2.0", "AI 编程", "编程工作台", "Coding Agent", "GLM"],
    officialUrl: "https://github.com/zai-org/ZCode", sourceUrl: "https://github.com/zai-org/ZCode",
    updatedAt: "2026-09-22",
  },
  {
    name: "Cua", slug: "cua", type: "app", category: "others",
    summary: "给 AI 代理「可用的电脑」：computer-use 2.0 驱动、跨 OS 虚拟机机队与评测基准。",
    description: "Cua 为 AI 代理提供「可用的电脑」：以 computer-use 2.0 驱动的代理运行环境，配套跨操作系统虚拟机机队与评测基准。开发者可以基于它搭建、运行并评测 computer-use 代理。项目位列 GitHub Trending 日榜第 2（2026-09-22），累计 25,597 星、单日增长 +609（快照值）。在本站目录中，已收录的 computer-use-mcp 是单点 MCP Server，而 Cua 是「框架 + 机队 + 基准」的完整方案，定位不同。MIT 开源，云服务定价未知；代理操作本机属高权限场景，使用前应评估权限边界。",
    tags: ["社区出品", "开源", "MIT", "Computer Use", "Agent 基础设施", "虚拟机机队", "评测基准"],
    officialUrl: "https://cua.ai", sourceUrl: "https://github.com/trycua/cua",
    updatedAt: "2026-09-22",
  },
  {
    name: "Claude for Financial Services", slug: "claude-financial-services", type: "skill", category: "enterprise-collaboration",
    summary: "Anthropic 官方金融工作流参考库：投行、行研、PE、财富管理 agents+skills。",
    description: "Anthropic 官方出品的金融工作流参考库，以 agents + skills 的形式覆盖投资银行、行业研究、私募股权与财富管理四类场景，供专业金融团队在 Claude 生态内搭建金融自动化工作流。项目位列 GitHub Trending 日榜第 6（2026-09-22），累计 35,715 星、单日增长 +425（快照值）。支持两种接入方式：作为 Claude Cowork 插件安装，或经 Managed Agents API 集成。本站目录此前尚无金融领域 skill，本条填补该品类空白。Apache-2.0 开源，定价信息未知；输出仅供专业人士复核，非投资建议。",
    tags: ["官方出品", "开源", "Apache-2.0", "SKILL", "金融", "投行", "财富管理", "工作流"],
    officialUrl: "https://github.com/anthropics/financial-services", sourceUrl: "https://github.com/anthropics/financial-services",
    installGuide: `作为 Claude Cowork 插件安装，或通过 Claude Managed Agents API 部署（官方 README 两种接入方式）。`,
    updatedAt: "2026-09-22",
  },
  {
    name: "Agent-Native", slug: "agent-native", type: "app", category: "others",
    summary: "构建代理式应用（agentic apps）的开源框架，把应用改造为代理可调用形态。",
    description: "Builder.io 出品的面向代理式应用（agentic apps）的构建框架，帮助前端与全栈开发者把应用改造为代理可调用（agent-ready）的形态——让 AI 代理能够直接调用应用的能力，而不只是面向人类用户的界面。项目位列 GitHub Trending 日榜第 1（2026-09-22），累计 5,750 星、单日增长 +607（快照值）。本站目录现有条目以终端侧代理工具为主，缺少「面向代理的应用框架」品类，本条填补该方向。当前免费，许可证未声明（截至 2026-09-22 快照），影响商用评估；能力边界以官方仓库与官网为准。",
    tags: ["社区出品", "Agent 基础设施", "agentic apps", "应用框架", "Builder.io", "免费"],
    officialUrl: "https://www.agent-native.com", sourceUrl: "https://github.com/BuilderIO/agent-native",
    updatedAt: "2026-09-22",
  },
  {
    name: "AutoClip", slug: "autoclip", type: "app", category: "others",
    summary: "把长视频自动切成值得分享的高光片段的桌面二创工具。",
    description: "AutoClip 是一款桌面端 AI 视频剪辑工具，主打「长视频 → 高光片段」：自动把播客、直播等长视频切分成值得分享的片段，服务二创与切片场景。项目位列 GitHub Trending 日榜第 9（2026-09-22），累计 8,122 星、单日增长 +266（快照值）。在库已收录 anything2explainer（讲解视频）与 short-video-generator-AI（短视频生成），AutoClip 的「长视频高光切片」场景与之互补，定位不同。MIT 开源；二创所用素材版权由用户自查。",
    tags: ["社区出品", "开源", "MIT", "AI 视频剪辑", "高光切片", "桌面端", "二创"],
    officialUrl: "https://zhouxiaoka.github.io/autoclip_intro/", sourceUrl: "https://github.com/zhouxiaoka/autoclip",
    updatedAt: "2026-09-22",
  },
  {
    name: "geo-sleuth", slug: "geo-sleuth", type: "skill", category: "data-analysis",
    summary: "定位照片拍摄地并展示推理过程的 OSINT Agent Skill。",
    description: "geo-sleuth 是一个开源 OSINT Agent Skill：输入照片，定位其拍摄地，并把完整推理过程可视化展示——不只给出坐标结论，还呈现「怎么推出来的」。项目 2026-09-18 创建，截至 2026-09-22 已 233 星，且 09-21 仍有推送，处于活跃迭代期。「照片地理定位 + 推理过程可视化」的组合在本站目录与历史候选中均无同类。MIT 开源；照片定位涉及个人隐私，须合规使用。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "OSINT", "地理定位", "照片取证"],
    officialUrl: "https://github.com/Oldcircle/geo-sleuth", sourceUrl: "https://github.com/Oldcircle/geo-sleuth",
    installGuide: `npx skills add Oldcircle/geo-sleuth`,
    updatedAt: "2026-09-22",
  },
  {
    name: "guizang-product-video-skill", slug: "guizang-product-video-skill", type: "skill", category: "creative-design",
    summary: "复用真实产品组件与设计语言，用代码产出软件更新宣传片。",
    description: "归藏（op7418）出品的 Agent Skill，思路是「复用真实产品」：直接复用产品真实的组件与设计语言，用代码生成软件更新宣传片，而非用虚构素材拼贴演示。项目 2026-09-18 创建，截至 2026-09-22 已 211 星。支持 Claude Code 与 Codex 两种宿主环境。与在库视频类条目及历史候选 video-shotcraft 定位均不同，主打「复用真实产品 UI」的差异化路线。AGPL-3.0 开源，具传染性，集成前应评估合规影响；成片素材版权由用户自查。",
    tags: ["社区出品", "开源", "AGPL-3.0", "SKILL", "产品视频", "宣传片", "归藏"],
    officialUrl: "https://github.com/op7418/guizang-product-video-skill", sourceUrl: "https://github.com/op7418/guizang-product-video-skill",
    installGuide: `npx skills add https://github.com/op7418/guizang-product-video-skill --skill guizang-product-video-skill`,
    updatedAt: "2026-09-22",
  },
  {
    name: "post-production-skill", slug: "post-production-skill", type: "skill", category: "creative-design",
    summary: "把创意素材改写为电影级视频提示词：VFX、转场、三维 UI、动态镜头。",
    description: "post-production-skill 是一套视频后期提示词工程库：把创意素材改写为电影级视频提示词，覆盖 VFX、转场、三维 UI 与动态镜头等场景，面向以 Seedance 2.5 为目标模型的后期创作流程。项目 2026-09-19 创建，发布即获 231 星（截至 2026-09-22），中文社区热度较高。「电影级 VFX / 三维 UI 提示词」方向为本站目录现有空白。当前免费，许可证未声明（截至 2026-09-22 快照）；与 Seedance 官方关系未知。",
    tags: ["社区出品", "SKILL", "视频提示词", "VFX", "三维 UI", "Seedance 2.5", "免费"],
    officialUrl: "https://github.com/huangbai-AI/post-production-skill", sourceUrl: "https://github.com/huangbai-AI/post-production-skill",
    installGuide: `mkdir -p ~/.codex/skills && cp -R post-production-skill ~/.codex/skills/sd-2-5-retro-vfx`,
    updatedAt: "2026-09-22",
  },
  {
    name: "ClipmivoAI Tools", slug: "clipmivoai-tools", type: "mcp", category: "ai-knowledge",
    summary: "同一视频生成 API 的 REST/CLI/本地 MCP/Agent Skill 四合一客户端。",
    description: "ClipmivoAI Tools 为同一 AI 视频生成 API 提供四种客户端接入形态——REST API、CLI、本地 MCP 与 Agent Skill，让开发者可以在脚本、终端或 Agent 工作流中以一致方式调用视频生成能力。项目 2026-09-14 创建，截至 2026-09-22 已 142 星，OpenAPI 文档齐备。它是本期唯一合格的 MCP 类候选：「同一 API、四种接入形态」的组合在库内少见，适合要把视频生成嵌入 Agent 工作流的开发者。商业 API 按账号余额计费，具体定价未知；依赖第三方商业服务与账号，API key 须自行保管。",
    tags: ["社区出品", "MCP", "商业 API", "视频生成", "CLI", "Agent Skill", "REST API"],
    officialUrl: "https://clipmivoai.com", sourceUrl: "https://github.com/BarneyD66/clipmivo-tools",
    installGuide: `npm install -g https://github.com/BarneyD66/clipmivo-tools/releases/download/v0.1.1/clipmivo-mcp-0.1.8.tgz`,
    configText: `{
  "mcpServers": {
    "clipmivo": {
      "command": "clipmivo-mcp",
      "env": {
        "CLIPMIVO_API_KEY": "YOUR_SCOPED_API_KEY",
        "CLIPMIVO_FILES_DIR": "/absolute/path/to/video-files"
      }
    }
  }
}`,
    updatedAt: "2026-09-22",
  },
  {
    name: "Open Glean", slug: "open-glean", type: "app", category: "others",
    summary: "基于 Hydra DB 的开源自托管企业知识问答，回答带来源引用。",
    description: "Open Glean 是基于 Hydra DB 的开源自托管企业知识问答方案：连接企业应用、检索内部知识，并生成带来源引用的回答，定位为 Glean 的开源替代。项目 2026-09-17 创建，发布即获 557 星（截至 2026-09-22）。「连接应用 + 检索 + 带引用回答」的能力组合为本站目录空白；与在库 OpenResearch（研究向）定位不同，Open Glean 面向企业内部知识场景。Apache-2.0 开源；项目极新，稳定性未知。",
    tags: ["社区出品", "开源", "Apache-2.0", "企业知识", "自托管", "知识问答", "Glean 替代"],
    officialUrl: "https://hydradb.com", sourceUrl: "https://github.com/hydra-db/open-glean",
    updatedAt: "2026-09-22",
  },
  {
    name: "ECC", slug: "ecc", type: "app", category: "companion-tools",
    summary: "给编码 Agent 做性能优化的 harness 系统：技能、本能、记忆、安全一体。",
    description: "ECC 是一套面向编码 Agent 的 harness 性能优化系统，把技能、本能、记忆与安全机制整合在同一框架之下，帮助开发者与团队系统性地提升编码 Agent 的实际表现。项目保持活跃（2026-09-21 有代码推送，列 fossy.dev 2026-09-21 日榜第 1），星数 ★265,247（GitHub 2026-09-23 快照值）。与在库 Agent 本体类条目（Codex、Kilo Code、Hermes Agent 等）定位互补：ECC 不替代 Agent，而是围绕 harness 配置做优化的「优化层」，覆盖技能、本能、记忆、安全与研究优先开发等维度。对 Agent 配置改动较深，权限边界未知，采用前请自行评估影响面。官方站点为 ecc.tools，安装走官方 npx ecc-universal 引导式设置（支持 Claude Code/Codex/Kimi Code 插件配置）。MIT 开源；GitHub App 免费安装，官方 Pro 托管的私有仓库方案自 $19/席/月起（官网 pricing 口径，README 快照 2026-09-24）。",
    tags: ["社区出品", "开源", "MIT", "Agent 优化", "Harness", "编码 Agent", "性能优化"],
    officialUrl: "https://ecc.tools", sourceUrl: "https://github.com/affaan-m/ECC",
    installGuide: `npx ecc-universal@2.2.2 setup`,
    updatedAt: "2026-09-23",
  },
  {
    name: "DeepSeek-Reasonix", slug: "deepseek-reasonix", type: "app", category: "companion-tools",
    summary: "DeepSeek 原生终端编码 Agent，为长会话前缀缓存稳定性设计。",
    description: "DeepSeek-Reasonix 是 DeepSeek 原生的终端编码 Agent，面向在终端里以 DeepSeek 模型完成日常编码的开发者；核心设计点是长会话的前缀缓存稳定性，以改善长会话下的使用成本（模型 API 费用另计）。项目保持活跃（2026-09-22 有代码推送，进入 GitHub Trending 2026-09-22 Go 日榜），星数 ★35,676（GitHub 2026-09-23 快照值）。需要特别说明：这是第三方项目，并非 DeepSeek 官方出品，与 DeepSeek 官方无隶属关系。当前目录在库条目中尚无 DeepSeek 专用编码 Agent，本条差异化明确，适合作为 DeepSeek 终端编码工作流的候选选项。官网 reasonix.io，安装走官方 npm 原生二进制（npm i -g reasonix）。MIT 开源。",
    tags: ["社区出品", "开源", "MIT", "终端 Agent", "编码 Agent", "DeepSeek"],
    officialUrl: "https://reasonix.io", sourceUrl: "https://github.com/esengine/DeepSeek-Reasonix",
    installGuide: `npm i -g reasonix`,
    updatedAt: "2026-09-23",
  },
  {
    name: "book-to-skill", slug: "book-to-skill", type: "skill", category: "development",
    summary: "一键把技术书 PDF 转成 Claude Code 技能，边工作边查阅。",
    description: "book-to-skill 提供「书籍 → 技能」的转换路径：一键把技术书 PDF 转成 Claude Code 技能，让开发者在编码过程中随时查阅书中内容，把学习资料直接接入编码工作流。项目保持活跃（2026-09-22 有代码推送，进入 GitHub Trending 2026-09-22 Python 日榜），星数 ★31,981（GitHub 2026-09-23 快照值）。「把技术书变成 Agent 可随时引用的参考」这一形态，在当前目录中暂无同类条目，学习与编码工作流的结合点较新。安装走官方 npx skills add 命令。项目为个人项目，维护持续性未知，采用时请留意其更新情况。MIT 开源。",
    tags: ["社区出品", "开源", "MIT", "SKILL", "技术书", "PDF 转换", "编码工作流"],
    officialUrl: "https://github.com/virgiliojr94/book-to-skill", sourceUrl: "https://github.com/virgiliojr94/book-to-skill",
    installGuide: `npx skills add virgiliojr94/book-to-skill`,
    updatedAt: "2026-09-23",
  },
];
