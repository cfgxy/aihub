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
    name: "MiroFish", slug: "mirofish", type: "app", category: "others",
    summary: "开源群体智能预测引擎：把「预测」变成多智能体社会仿真——用种子信息构建并行数字世界，让数千个智能体交互演化后输出预测结论。",
    description: "MiroFish 是一个开源群体智能引擎，定位为「简洁通用的群体智能引擎，预测万物」（项目方口径）。工作方式是：从现实世界提取种子信息（突发新闻、政策草案、金融信号等），自动构建高保真的并行数字世界，其中数千个具备独立人格、长期记忆和行为逻辑的智能体自由交互并经历社会演化；用户可以「上帝视角」动态注入变量，观察系统推演未来轨迹，最终得到一份详细的预测报告和一个可继续深度交互的数字世界。宏观上它被项目方定位为决策者的零风险演练实验室（政策推演、公关推演），微观上也可作为个人创意沙盒，例如推演一部小说的结局。技术实现上，MiroFish 的仿真流水线分为五阶段：图构建（种子提取、个体/集体记忆注入、GraphRAG 知识图谱）→ 环境搭建（实体关系抽取与智能体人格生成）→ 并行仿真 → 报告生成（ReportAgent 智能体）→ 深度交互（与仿真世界中任意智能体对话）。仿真引擎基于 CAMEL-AI 团队的开源项目 OASIS，项目获盛大集团战略支持与孵化；支持任何 OpenAI SDK 兼容的 LLM API，提供源码部署与 Docker 两种部署方式。须知：「预测万物」为项目宣传口径，预测准确性无独立第三方验证，输出不可作为投资或重大决策依据；AGPL-3.0 对闭源商用集成有传染性约束；运行需自备 LLM API Key（官方推荐阿里云百炼 qwen-plus）与 Zep Cloud 记忆服务（有免费月度额度），仿真 token 消耗较高（README 建议先跑 40 轮以内）；仓库最近推送 2026-09-03，活跃度中等；星数 73,020 为 2026-09-15 GitHub API 快照值。",
    tags: ["社区出品", "开源", "AGPL-3.0", "APP", "群体智能", "社会仿真", "预测", "OASIS"],
    officialUrl: "https://mirofish.ai", sourceUrl: "https://github.com/666ghj/MiroFish",
    updatedAt: "2026-09-15",
  },
  {
    name: "YuE（YuE2）", slug: "yue", type: "app", category: "others",
    summary: "先写「乐谱规划」再渲染成歌的开源音乐生成模型——旋律与和弦显式可编辑，支持零样本翻唱与对话式改歌。",
    description: "YuE2 是统一符号与音频两种模态的开源音乐生成模型：用户输入歌词和风格提示词，模型先生成旋律与和弦的符号规划（symbolic plan），再将规划渲染为带人声与伴奏的完整歌曲（48 kHz 立体声）。与「黑盒直出」不同，这条「先规划、后渲染」的流水线让旋律和和弦成为显式控制项，可以在渲染前被人工或智能体检查、修改。项目方口径称其在 WildSongBench 上与 Suno v5/v6 具有竞争力（YuE2 best-of-8 达 SongBench 均值 6.9632，为项目方评测数据，未经独立验证）。模型本体为 YuE2-3B（Hugging Face: m-a-p/YuE2-3B），运行环境要求 Linux、Python 3.12 与 24 GB 显存的 NVIDIA GPU（BF16 支持），模型文件首次使用时自动下载。项目提供阶段式 Python API（plan → generate_semantic → synthesize → decode），并配套 SheetSage2 转录、YuE2-Vae 解码器等关联模型。须知：采用双许可证结构——第一方代码、agent skill 与文档为 Apache-2.0，模型权重单独采用 CC BY-NC 4.0（非商业许可），商业使用受限制，需另行评估授权；24 GB VRAM 的硬件门槛较高；README 未提供明确的支持语言清单（示例涵盖中文与英文），实际语言覆盖未知；与 Suno 的对比为项目方评测口径，未经独立验证；星数 8,348 为 2026-09-15 GitHub API 快照值。",
    tags: ["社区出品", "开源", "Apache-2.0", "CC BY-NC 4.0", "APP", "音乐生成", "零样本翻唱", "Agent 编辑"],
    officialUrl: "https://map-yue2.github.io/", sourceUrl: "https://github.com/multimodal-art-projection/YuE",
    updatedAt: "2026-09-15",
  },
  {
    name: "flowsint", slug: "flowsint", type: "app", category: "others",
    summary: "开源 OSINT 图谱调查平台——关系图谱 + 自动化情报丰富器，让实体关系调查可视化、可扩展，且数据全程留在本机。",
    description: "flowsint 是一个面向道德调查、透明与验证场景的开源图谱调查平台（README 原文：designed for ethical investigation, transparency, and verification），为网络安全分析师与调查人员设计。它通过可视化图谱界面组织调查对象——域名、IP、邮箱、社交账号、加密货币钱包等实体——并以自动化 enrichers 批量扩展实体关系：反查 DNS 与子域名枚举、WHOIS 与历史记录、用户名跨平台搜索（Maigret）、钱包交易与 NFT 查询、网站爬虫与追踪器识别、邮箱与电话的数据泄露查询等；界面宣称在数千节点规模下依然流畅。工程上，flowsint 采用 Python/FastAPI + Neo4j 图数据库 + PostgreSQL/Redis/Celery 的技术栈，提供 Docker Compose 部署与 GitHub Container Registry 预构建镜像，支持局域网/服务器部署供团队协作，内置实时事件流（FastAPI）与 N8n 集成。数据架构强调「一切存储在你的机器上」（Everything is stored on your machine），适合对数据驻留敏感的调查团队。须知：调查能力天然涉及个人信息与第三方数据查询，数据合规使用责任在使用方；README 明确禁止用于未授权入侵、监控、骚扰、doxxing、政治操纵等场景，并要求遵循其 ETHICS.md 负责任使用指南；活跃度中等（最近推送 2026-09-06）；星数 8,344 为 2026-09-15 GitHub API 快照值。",
    tags: ["社区出品", "开源", "Apache-2.0", "APP", "OSINT", "图谱分析", "调查", "自托管"],
    officialUrl: "https://flowsint.io", sourceUrl: "https://github.com/reconurge/flowsint",
    updatedAt: "2026-09-15",
  },
  {
    name: "TradingAgents", slug: "tradingagents", type: "app", category: "others",
    summary: "模拟真实交易公司分工的多智能体 LLM 框架——分析师、多空研究员、交易员、风控层层辩论，输出研究向交易分析（输出不可作投资依据）。",
    description: "TradingAgents 是一个模拟真实交易公司运作的多智能体交易分析框架（README 原文：mirrors the dynamics of real-world trading firms）。其决策链还原了交易机构的组织分工：分析师团队（基本面、情绪、新闻、技术四类分析师分别评估公司财务、聚合 StockTwits/Reddit 情绪、监测全球新闻与宏观指标、以 MACD/RSI 等指标识别形态）产出研究报告；「看多 vs 看空」研究员通过结构化辩论权衡收益与风险；交易员智能体汇总报告决定交易时机与规模；风控与投资组合经理持续评估波动率与流动性，批准后订单发送至模拟交易所执行。框架基于 LangGraph 构建，提供交互式 CLI 与 Python API 两种入口；每次运行的决策追加至本地交易记忆文件，下次分析同一标的时注入已实现收益与反思，支持检查点续跑。市场覆盖美股、港股、中国 A 股、东京、伦敦、印度、加拿大、澳洲及加密货币（行情基于 Yahoo Finance 等），LLM 支持面广（OpenAI、Gemini、Claude、Grok、DeepSeek、Qwen、GLM、MiniMax、Ollama 本地模型、Azure/Bedrock 及任意 OpenAI 兼容端点）。项目附论文（arXiv:2412.20138）与 Trading-R1 技术报告（arXiv:2509.11420），研究背景完整。须知：涉资金域，框架定位为研究用途（designed for research purposes），输出不可作投资依据——README 原文声明「It is not intended as financial, investment, or trading advice」；交易表现受骨干模型、温度、分析时段与数据质量等因素影响，回测结果不保证与任何已发表数字相符；订单仅在模拟交易所执行，非实盘交易；LLM API 与部分数据源费用由用户自备，使用 Ollama 本地模型可零 API 成本；星数 106,136 为 2026-09-15 GitHub API 快照值。",
    tags: ["社区出品", "开源", "Apache-2.0", "APP", "多智能体", "金融分析", "LangGraph", "研究向"],
    officialUrl: "https://github.com/TauricResearch/TradingAgents", sourceUrl: "https://github.com/TauricResearch/TradingAgents",
    updatedAt: "2026-09-15",
  },
];
