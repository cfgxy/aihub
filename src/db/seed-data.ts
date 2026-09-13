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
  },
];
