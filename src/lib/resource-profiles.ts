export type ResourceProfile = {
  image: string;
  imageAlt: string;
  /** 外部来源图片的出处链接；原创插图不填，改用 imageCredit。 */
  imageSource?: string;
  /** 原创插图的图注文案，与 imageSource 二选一。 */
  imageCredit?: string;
  /** 可选的详情内容区插图，落在「核心能力」标题前；不配置则不渲染图位。 */
  featureImage?: string;
  featureImageAlt?: string;
  /** 覆盖详情页「获取资源」的按钮文案；不配置则按资源类型使用默认文案。 */
  actionLabel?: string;
  overview: string[];
  highlights: string[];
  bestFor: string;
};

export const resourceProfiles: Record<string, ResourceProfile> = {
  doubao: {
    image: "/media/doubao-cover.png",
    imageAlt: "豆包官方形象与产品名称",
    imageSource: "https://www.doubao.com/",
    overview: [
      "豆包是字节跳动推出的通用 AI 助手，面向中文用户提供问答、写作、翻译、学习辅助和多模态内容创作。Web 版可以直接使用，同时提供移动端和桌面端入口。",
      "它适合从日常信息查询快速进入文档、图片、音视频等任务。具体模型能力、免费额度和客户端支持会随官方版本调整，使用前应以豆包官网说明为准。",
    ],
    highlights: ["中文对话、写作与翻译", "图片、音视频等多模态创作", "Web、移动端与桌面端覆盖"],
    bestFor: "希望用中文完成日常问答、内容创作、学习和轻量办公的个人用户。",
  },
  codex: {
    image: "/media/codex.png",
    imageAlt: "OpenAI Codex 官方 GitHub 仓库预览",
    imageSource: "https://github.com/openai/codex",
    overview: [
      "Codex 是 OpenAI 的编程智能体产品，可在终端、编辑器和云端任务环境中理解代码库、修改文件、执行命令并验证结果。它不是单纯的代码补全工具，而是以任务为单位推进开发工作。",
      "本地 CLI 适合在开发者控制的仓库中交互工作，云端能力则适合并行处理相对独立的任务。使用时仍需审阅改动、命令和权限范围，尤其不要把未经检查的结果直接用于生产环境。",
    ],
    highlights: ["理解并修改完整代码库", "执行命令、测试与工程任务", "支持本地 CLI 与云端工作流"],
    bestFor: "需要把需求、修复或代码分析交给智能体执行，同时保留工程审查控制权的开发者与团队。",
  },
  claude: {
    image: "/media/claude.jpg",
    imageAlt: "Claude 官方品牌视觉",
    imageSource: "https://www.anthropic.com/claude",
    overview: [
      "Claude 是 Anthropic 推出的通用 AI 助手，覆盖写作、分析、编程、资料整理与协作场景。它可通过 Web、桌面端和移动端使用，也提供面向开发者的 Claude Code 与 API 产品。",
      "Claude 擅长处理长文本和结构化任务，但输出仍可能存在事实或推理错误。涉及专业决策、重要代码和外部发布时，应结合来源核验和人工审查。",
    ],
    highlights: ["长文本阅读、分析与写作", "编程与代码库协作", "Web、桌面、移动和开发者工具"],
    bestFor: "需要高质量文字工作、复杂资料分析、软件开发辅助和跨设备协作的个人与团队。",
  },
  workbuddy: {
    image: "/media/workbuddy.png",
    imageAlt: "Tencent WorkBuddy 官方首页产品画面",
    imageSource: "https://www.workbuddy.ai/",
    overview: [
      "Tencent WorkBuddy 是腾讯推出的全场景 AI 办公工作台。用户用自然语言描述目标后，它可以规划并执行文档、表格、演示文稿、数据分析和设计创意等任务，重点是交付可继续编辑的工作成果。",
      "产品支持多智能体协作，并与腾讯办公生态衔接。功能可用范围、系统支持和服务方案可能因地区与版本不同，下载或在线使用前应核对官方页面。",
    ],
    highlights: ["文档、表格与演示文稿交付", "多智能体并行处理复杂任务", "连接腾讯办公生态"],
    bestFor: "希望从一句需求直接获得办公成品的职场用户、运营、研究和创意团队。",
  },
  multica: {
    image: "/media/multica.png",
    imageAlt: "Multica 官方 GitHub 仓库预览",
    imageSource: "https://github.com/multica-ai/multica",
    overview: [
      "Multica 是面向人类与 AI 智能体协作的开源、自托管平台。它用 Issue、评论、运行记录和团队编排组织工作，让多个智能体在可追踪的任务上下文中分工并交付。",
      "它更接近团队运行基础设施，而不是单一聊天客户端。自托管意味着部署者需要负责运行环境、权限、数据和升级策略，采用前应先评估维护成本。",
    ],
    highlights: ["Issue 驱动的智能体协作", "运行记录与交付过程可追踪", "开源并支持自托管"],
    bestFor: "需要组织多智能体长期协作，并希望掌握任务记录与运行环境的技术团队。",
  },
  "codex-plus-plus": {
    image: "/media/codex-plus-plus.png",
    imageAlt: "Codex++ 官方 GitHub 仓库预览",
    imageSource: "https://github.com/BigPizzaV3/CodexPlusPlus",
    overview: [
      "Codex++ 是围绕 CodexApp 使用体验构建的第三方增强工具，目标是让 Codex 的配置、交互和日常工作流更顺手。它属于社区项目，并非 OpenAI 官方产品。",
      "社区工具的能力、兼容版本和安装方式变化较快。使用前应阅读项目 README、Release 与已知问题，确认来源可信，并为本地配置保留可恢复备份。",
    ],
    highlights: ["增强 CodexApp 日常使用体验", "社区驱动、公开源码", "面向 Codex 工作流的辅助能力"],
    bestFor: "已经使用 CodexApp，并愿意自行核对兼容性和社区项目风险的进阶用户。",
  },
  ccswitch: {
    image: "/media/ccswitch.png",
    imageAlt: "CCSwitch 官方 GitHub 仓库预览",
    imageSource: "https://github.com/farion1231/cc-switch",
    overview: [
      "CCSwitch 是跨平台桌面配置管理工具，用于集中切换 Claude Code、Codex 等 AI 编程客户端的服务商、模型和相关配置。它减少了频繁手改配置文件带来的操作成本。",
      "配置切换可能涉及 API 端点和本地凭据。密钥应只保存在受控的本地存储中，不应提交到仓库、截图或日志；更新客户端后也应重新检查配置兼容性。",
    ],
    highlights: ["多种 AI 编程客户端配置切换", "Windows、macOS 与 Linux 桌面支持", "开源且可本地管理配置"],
    bestFor: "同时使用多个 AI 编程客户端或服务端点，需要频繁切换本地配置的开发者。",
  },
  "ai-toolbox": {
    image: "/media/ai-toolbox.png",
    imageAlt: "AI Toolbox 跨助手会话统一检索与多格式导出示意",
    imageSource: "https://www.ai-toolbox.co/",
    overview: [
      "AI Toolbox 是一款 Chromium 内核浏览器扩展（Chrome、Edge、Brave、Opera、Arc），把 ChatGPT、Gemini、Claude、Grok 四个助手的历史会话集中到一处管理。它支持跨助手统一搜索、文件夹与子文件夹归档、置顶与书签，并可将对话导出为 Markdown、PDF、JSON 或 TXT，Markdown 附带 YAML frontmatter，便于导入 Obsidian 等知识库。",
      "扩展需要读取各 AI 站点的会话内容，其中可能包含敏感对话；官网口径为本地优先存储、同步加密并符合 GDPR，但这些均为官方声明，未经第三方审计。产品为商业闭源，未见公开源码仓库，无法独立审计数据流向；功能依赖各平台页面结构，平台改版可能导致临时失效。免费版限制为 2 个文件夹、2 条提示词、每次查询 5 条搜索结果、2 个书签且仅支持 TXT 导出；Premium 月付 $9.99 起、All Access 终身 $199，价格与评分为 2026年09月07日 官网口径，请以官方页面为准。",
    ],
    highlights: [
      "跨 ChatGPT、Gemini、Claude、Grok 统一搜索历史会话",
      "文件夹归档、置顶、智能标签与消息书签整理对话",
      "Markdown / PDF / JSON / TXT 多格式导出，支持批量打包",
      "内置提示词库与提示词链，固化重复使用的流程",
    ],
    bestFor: "跨多个 AI 助手工作、需要统一检索历史会话并把对话沉淀为可导出知识资产的重度用户与内容创作者。",
  },
  "ai-research-skills": {
    image: "/media/ai-research-skills-hero.png",
    imageAlt: "AI Research Skills 原创插图：文献综述→实验验证→论文产出流程",
    imageCredit: "插图：AIHub 原创设计",
    featureImage: "/media/ai-research-skills-feature.png",
    featureImageAlt: "AI Research Skills 原创插图：编码 Agent 编排六类研究技能并汇入论文产出",
    overview: [
      "AI Research Skills（仓库 Orchestra-Research/AI-research-SKILLs）是 Orchestra Research 维护的开源 AI 研究技能库，为 Claude Code、Codex、Gemini CLI 等 AI 编码代理提供覆盖 23 个方向的 98 个研究技能，贯穿文献调研、想法生成、实验执行到论文写作的完整研究生命周期。autoresearch 编排技能以双环架构自主推进整个研究流程，按需路由到微调、分布式训练、推理优化、可解释性等具体领域技能；vLLM、Megatron-LM、TRL、TransformerLens 等框架技能的内容沉淀自官方文档、真实 GitHub issue 与生产级工作流。",
      "技能库以 MIT 许可证开源，官方页面未提供付费计划；技能引用的第三方框架（如 vLLM、Megatron-LM）沿用各自许可证，商用前需逐一核查。仓库最近一次代码更新为 2026-06-16（v1.7.2）。技能是知识包而非可运行软件，实际效果取决于所搭配的模型与代理；安装器会将技能写入 ~/.orchestra/skills/ 并在已检测到的编码代理目录建立链接，敏感环境部署前应先审阅安装行为。技能数与分类数为 2026年09月09日 官方仓库口径，请以 GitHub 仓库最新说明为准。",
    ],
    highlights: [
      "98 个技能覆盖「想法→论文」研究全流程，23 个分类可全装、按类装或单装",
      "autoresearch 编排层以双环架构自主推进文献调研、实验与论文写作",
      "一条 npx 命令装入 Claude Code、Codex、Gemini CLI 等多种编码代理，自动检测已装代理",
      "MIT 开源，与 Orchestra Research 平台自动同步、可一键加入项目",
    ],
    bestFor: "需要把文献综述、实验调参与论文写作交给 AI 编码代理推进的 AI 研究者与机器学习工程团队。",
  },
  "gmail-creator-pro": {
    image: "/media/gmail-creator-pro-hero.png",
    imageAlt: "Gmail Creator Pro 原创插图：账号自动化队列与风险警示，标注非 Google 官方工具",
    imageCredit: "插图：AIHub 原创设计",
    featureImage: "/media/gmail-creator-pro-feature.png",
    featureImageAlt: "Gmail Creator Pro 原创插图：自动化队列指向风险边界卡，标注谨慎使用与未经独立安全审计",
    // 高风险条目不使用 app 默认的「前往官方下载」，避免读作站点推荐下载。
    actionLabel: "查看来源仓库",
    overview: [
      "Gmail Creator Pro（仓库 ShadowHackrs/gmail-account-creator）是署名「Shadow Hacker」的第三方工具，源码在 GitHub 公开可见，但附带专有许可证，不属于开源软件。仓库自述：可批量自动注册 Gmail 账号，提供「高级反检测系统」「手机验证绕过」（集成第三方接码服务）与代理集成等能力，并附界面截图与演示视频。上述能力描述均为仓库自述，本站未独立验证，收录不代表推荐。",
      "该仓库自述的功能涉及账号自动化与验证规避，可能违反 Google 服务条款：若用于创建虚假账号、规避 Google 的系统或保护措施，或为滥用目的创建、使用多个账号，Google 条款明确禁止此类行为并可能停用相关账号；Google 同时说明，拥有多个账号本身（如个人与工作账号）并不违规。相关行为在部分法域还可能触及反垃圾信息与计算机滥用类法律边界。该工具分发渠道可信度有限，同类工具存在凭据窃取与恶意软件的品类性风险，本站未对代码做独立安全审计。其专有许可证仅允许个人非商业、教育与测试评估用途，禁止复制、修改与再分发，并明确要求不得用于任何非法或未经授权的用途。本站收录仅作风险提示与来源指引，不提供安装或使用指导。",
    ],
    highlights: [
      "仓库自述：批量自动注册 Gmail 账号——账号自动化可能违反 Google 条款，相关账号可能被 Google 检测并停用",
      "仓库自述：反检测、代理集成与经第三方接码服务规避手机验证等规避类能力——本站均未独立验证",
      "源码公开可见但为专有许可，禁止修改与再分发；本站未做独立安全审计",
    ],
    bestFor: "本站未核实到明确的合法适用场景；任何账号自动化注册用途都应先评估 Google 服务条款、账号资产风险与当地法律约束。",
  },
  "kilo-code": {
    image: "/media/kilo-code.png",
    imageAlt: "Kilo Code 同一智能体贯通 IDE、CLI 与云端的多入口示意",
    imageSource: "https://kilo.ai/",
    overview: [
      "Kilo Code 是开源的 agentic 编程平台，同一个智能体可在 VS Code/OpenVSX、JetBrains 系 IDE（IntelliJ IDEA、PyCharm、WebStorm）、CLI、Cloud Agents、Slack 与 Code Reviewer 等入口之间共用。它支持自有 API key 与本地模型，官网宣称接入 500+ 模型且按厂商原价零加价转付（kilo.ai，2026年09月08日 抓取）。",
      "许可证需要分开理解：客户端源码以 MIT 许可证开源，官方强调 prompt、上下文窗口与决策过程可审计；而 Gateway 与 Cloud 等商业化后端为 source-available，并非完全开源，无法完整自审计。官网另标注 Kilo 已被 Anaconda 收购，产品后续走向需持续关注；重度 agent 使用场景下 token 开销较大，接入前应评估成本。",
    ],
    highlights: [
      "一个智能体覆盖 VS Code、JetBrains、CLI、Cloud 与 Slack 多入口",
      "500+ 模型接入并按厂商原价零加价，支持自有 API key 与本地模型",
      "客户端 MIT 开源，prompt 与上下文过程可审计",
    ],
    bestFor: "希望在单一开源客户端内跨模型、跨 IDE 开展 agentic 编程，并关注成本透明与过程可审计的开发者与工程团队。",
  },
  almanac: {
    image: "/media/almanac.png",
    imageAlt: "Almanac 连接企业工具自动编译并持续更新知识 wiki 的示意",
    imageSource: "https://usealmanac.com/",
    overview: [
      "Almanac 是面向企业的知识 agent，官网自述为「自更新的 wiki」。它连接 Gmail、Slack 等公司工具后自动学习人员、客户与项目信息，编译成自维护的企业知识库，并把这份 wiki 作为执行任务前的阅读上下文。agent 自带独立的浏览器、文件与登录环境，因此也能操作没有官方集成的工具，用户可在 Slack 频道或 iMessage 中直接派活并接收回报（官网，2026年09月08日 抓取）。",
      "产品为闭源 SaaS 且处于早期阶段（官网标注 Backed by Y Combinator）。定价未公开——官网虽有 Pricing 入口，当前页面无公开价格、主 CTA 为 Join waitlist；SLA、数据合规与隐私细节官方同样未披露，保持未知待官方披露，不作推定。使用它需要接入企业整套工具与账号，数据接入面较大，企业应自行评估数据边界。另需说明：外部候选材料曾提到常驻 Slack/Teams，官网当前仅展示 Slack 与 iMessage 交互，Teams 支持未获官方证实。",
    ],
    highlights: [
      "连接公司工具自动编译并持续更新企业 wiki",
      "agent 自带独立浏览器与登录环境，可操作无官方集成的工具",
      "经 Slack 或 iMessage 派发任务并回报结果",
    ],
    bestFor: "知识散落在多个 SaaS 工具、希望知识库免人工维护，并需要在 IM 中随时派活的运营、销售与客户成功团队。",
  },
  "shuohao-skills": {
    image: "/media/shuohao-skills.png",
    imageAlt: "shuohao-skills 中文短剧制作五段技能链示意",
    imageSource: "https://github.com/eternityspring/shuohao-skills",
    overview: [
      "shuohao-skills 是面向中文微短剧创作的垂直 Agent Skills 合集，把短剧前期制作拆成一条完整技能链：拆角色（人物小传 / character bible）→ 改编大纲 → 场景与道具设定（art bible）→ 剧本写作 → 切分镜。技能以 Agent Skills 形态发布，可在 Claude Code、Codex 等兼容的 agent 中直接调用（仓库 README，2026年09月08日 实查）。",
      "项目开源免费，采用 Apache-2.0 许可证（GitHub API 2026年09月08日 实查：3,126 stars，2026年08月06日 创建、2026年08月26日 最近推送）。需要注意的是最近一次推送后未见新提交，活跃度有所放缓；仓库为个人单点维护，最终创作质量仍取决于底层模型能力，社区尚无统一评测基准。仓库 API 标注的项目主页站点内容未经核验，未作为事实来源引用。",
    ],
    highlights: [
      "覆盖拆角色、排大纲、场景道具、写剧本、切分镜的全流程技能链",
      "以 Agent Skills 形态发布，可在 Claude Code、Codex 等 agent 中调用",
      "Apache-2.0 开源免费，面向中文短剧创作生态",
    ],
    bestFor: "希望用 agent 把短剧前期制作流水线化的中文微短剧创作者、编剧与内容团队。",
  },
  "x64dbg-mcp-server": {
    image: "/media/x64dbg-mcp-server.png",
    imageAlt: "x64dbg 调试器与 LLM agent 经 MCP 协议桥接的抽象示意",
    imageSource: "https://github.com/duty1g/x64dbg-mcp-server",
    overview: [
      "x64dbg-mcp-server 以原生插件形态嵌入 x64dbg，经 HTTP 把调试器能力封装为 MCP（Model Context Protocol）工具供 AI 助手调用，能力清单包括断点设置、单步执行、内存读取与寄存器转储等。项目基于 Zig 构建、零第三方依赖，开源免费并采用 MIT 许可证（GitHub API 2026年09月08日 实查：1,913 stars，2026年08月22日 创建、2026年09月02日 最近推送）。",
      "这是典型的双刃工具：同一套能力既服务于恶意软件分析、漏洞研究等正当场景，也可能被用于恶意目的，使用者必须自行确保操作处于合法授权范围并符合当地法律法规。本站只作能力说明，不提供任何操作教程。项目仅覆盖 Windows / x64dbg 生态，不适用其他调试器或平台；README 中的官方免责与合规声明未逐字核验，合规边界以项目官方声明与当地法律为准。",
    ],
    highlights: [
      "原生插件运行于 x64dbg，经 HTTP 暴露 MCP 接口",
      "断点、单步、内存读取、寄存器转储等能力开放给 LLM agent",
      "基于 Zig 构建、零第三方依赖，MIT 开源",
    ],
    bestFor: "在合法授权前提下从事恶意软件分析、漏洞研究与软件逆向，并希望在 x64dbg 工作流中引入 AI 助手的安全研究者。",
  },
  "papergraph-mcp": {
    image: "/media/papergraph-mcp.png",
    imageAlt: "PaperGraph MCP 原创插图：数学论文中的证据高亮经证据链汇聚为以定理结论（QED 方块）为中心的阅读图谱，右下角为本地工作区数据库图标",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "PaperGraph MCP 把数学论文变成 AI agent 可用的「证据优先」阅读地图。加载一篇论文后，它会生成首屏概览：主结果候选、论文结构、证明路径证据与外部阅读风险；结论抽取针对定理式结果，证明证据附带证明局部引用、来源切片与依赖诊断，每条证据都可回溯到论文原文位置。",
      "围绕精读流程，它提供阅读队列、阅读会话、checkpoint 与笔记管理，多天间断的深度阅读可以随时恢复进度；遇到指向外部文献的引用时，它只生成可审阅的导入计划，不会自动爬取下载。全部阅读状态保存在本地 SQLite 工作区文件中。",
      "边界与依赖需要了解：远程下载仅通过 arXiv 固定 e-print endpoint 构造（不接受任意 URL），arXiv 的可达性是在线加载论文的前提，受限网络环境可能无法使用该路径；PDF 抽取对原生数字 PDF 效果最佳，扫描件/OCR 文件的证据可能稀疏，解析器并非完整 TeX 引擎。它不验证证明正确性、不做语义定理匹配、不猜测隐藏数学依赖。项目以 MIT 许可证开源，README 未提及账号或 API key 要求；抽取质量本站未独立评测。项目较新（2026年09月02日 创建、2026年09月09日 最近推送，2026年09月10日 实查），README 未写明最低 Python/uv 版本与官方支持的操作系统清单。",
    ],
    highlights: [
      "论文加载即生成证据优先的阅读地图（主结果、结构与证明路径）",
      "定理结论抽取与证明证据链追踪，证据可回溯原文切片",
      "阅读队列、会话与笔记管理，状态保存在本地 SQLite 工作区",
    ],
    bestFor: "需要系统精读数学/计算机论文、希望 AI 辅助定位结论与证明证据链的研究者与研究生。",
  },
  "computer-use-mcp": {
    image: "/media/computer-use-mcp.png",
    imageAlt: "computer-use-mcp 原创插图：光标在层叠桌面窗口中点击控件，虚线权限边界与盾牌提示高权限操作，左侧为控件树与跨平台图标",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "computer-use-mcp 让 AI agent 通过 MCP 协议控制真实电脑：发现已安装或运行中的应用、截取窗口与缩放区域、读取无障碍控件树定位按钮与输入框，然后执行点击、填表、选菜单、输入文本、拖拽与快捷键等操作；窗口定位、焦点切换、剪贴板读写、显示器检查等桌面杂务，以及 macOS AppleScript/JXA、Windows PowerShell 应用脚本同样覆盖。",
      "架构上，TypeScript 服务器负责工具请求、权限与取消，Rust 原生模块直连操作系统，经 Rust NAPI 进程内通信。npm 安装无需本地 Rust（从源码构建实时桌面能力才需要）；macOS 需授予辅助功能与屏幕录制权限，应用脚本可能还需自动化权限；Windows 需在已登录的桌面会话中运行，受保护/提权窗口需匹配权限，可能无法操作；Linux 需图形会话与 X11/Wayland 工具，无障碍支持依赖 AT-SPI，实际成熟度无独立评测。",
      "权限边界必须正视：该工具提供完整的电脑控制面，README 原文明确桌面访问可以更改真实应用与文件，需要谨慎配置权限与目标应用。服务端内置工具权限与目标检查层；捆绑的 HTTP 服务仅监听本机回环地址，暴露远程端点必须由宿主自行配置认证。默认暴露 65 个工具（README 未逐项列出完整清单），可用 core、ax、scripting、windows-admin、full 五档 profile 收窄能力面，建议在专用或受控环境从最小 profile 起用；本站未独立审计其沙箱与隔离强度。项目以 MIT 许可证开源，README 页面标注版本 v7.2.0；运行 MCP 本体无需账号或 API key。",
    ],
    highlights: [
      "截屏与无障碍控件读取，控件级点击、填表、拖拽与快捷键操作",
      "macOS AppleScript/JXA 与 Windows PowerShell 应用脚本，窗口、焦点与剪贴板管理",
      "默认 65 个工具、五档 profile 收窄权限，Rust NAPI 进程内高性能运行",
    ],
    bestFor: "需要给 AI agent 接入 Windows/macOS/Linux 真实桌面控制能力，并能在受控环境中评估高权限风险的开发者与自动化工程团队。",
  },
  anything2explainer: {
    image: "/media/anything2explainer.png",
    imageAlt: "anything2explainer 原创插图：黑底动效成片形态示意，白色线稿主体配紫色点缀，带白字黑边字幕、顶部胶囊 HUD 与底部章节进度条",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "anything2explainer 是面向 Claude Code 与 Codex 的开源技能，自述定位为「话题进、解说视频出」：输入一个主题或一篇文章，产出 1280×720 的 H.264 MP4 讲解视频，含同步配音、逐词对齐字幕、章节卡、顶部 HUD 与底部章节进度条。与生成式视频模型不同，它的每一帧都由 Remotion 4（React + TypeScript）代码绘制——无素材拼贴、无生成视频、不取用他人画面；成片中的事实要求逐条回溯到调研文档的来源 URL，时间轴为确定性输出（同输入同画面）。",
      "工作流程为 9 阶段流水线：脚手架、带来源调研、配音与逐帧时间轴、分镜、覆盖层与图元、前 30 秒试点、并行构建（每个镜头由独立 agent 写一个 Remotion 组件）、渲染与量化指标、逐章 QC 修复，全程设 4 个用户检查点。README 给出的参考量级为：3–5 分钟成片约 8 个并行构建 agent、约 2 小时挂钟时间、约 2 GB 磁盘，CPU 渲染无需 GPU。配音中英双语分轨：中文默认 edge-tts 云端语音，英文默认本地 kokoro-82m 模型，也可自带 TTS 或成品音频。",
      "使用前需注意许可与边界：工具包采用 PolyForm Noncommercial 1.0.0，仅限非商业使用，商用需事先获得作者授权（用它做出的视频归用户所有）。依赖 Node ≥18、ffmpeg 与 Python 3，脚本在 macOS 开发验证、Linux 可用、Windows 未测试；并行构建建议预留约 5 GB 空闲磁盘，旁白配音后文案即冻结、改词需整体重新对时；仅支持 1280×720 横屏，不支持竖屏。以上能力均为 README 自述（2026年09月11日 实查），成片质量与耗时本站未独立验证。",
    ],
    highlights: [
      "全代码帧绘制：Remotion 4 模板与图元/光照库输出含字幕、章节进度条与 HUD 的可复现 MP4",
      "多 agent 端到端流水线：调研→旁白→分镜→并行构建→量化 QC 的 9 阶段协议与 4 个检查点",
      "中英双语可替换配音：默认 edge-tts（中）与本地 kokoro-82m（英），支持自带 TTS 或成品音频",
    ],
    bestFor: "需要把概念、论文或产品讲清楚的科普作者、课程开发者与技术布道者，以及习惯在 Claude Code / Codex 内工作的开发者（非商业用途）。",
  },
  "short-video-generator-ai": {
    image: "/media/short-video-generator-ai.png",
    imageAlt: "short-video-generator-AI 原创插图：长视频经转写与高光打分切成多段 9:16 竖屏成片的切片流程示意，画面中的数字为示意样例",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "short-video-generator-AI（README 自述名 AI shorts generator）是免费开源的 Python 命令行/本地网页工具，用途是把 YouTube 长视频自动切成可直接发布的竖屏短视频：粘贴链接后自动下载源片、在本地用 faster-whisper 完成转写，再由 LLM 按传播框架（开场钩子、情绪峰值、观点爆点、冲突、金句等）给候选片段打 0–100 分并排序，去重后选出前 N 段渲染成 9:16 成片，可在片头加一句 AI 生成的 hook。README 自述定位为切片类 SaaS 的免费替代，输出不带水印。",
      "除 CLI 外还提供本地网页版（server.py 加静态前端），可批量排队并可视化调整参数；也支持直接传入本地视频文件路径，用 --language 指定语言（含中文）。LLM 供应商经 .env 配置 OpenAI / Gemini / MuAPI 三选一（Gemini 有每日限额的免费档），转写不依赖所选 LLM，另提供 API 供自有项目调用。安装需 Python 3.10+ 并自备 LLM API key，调用费用以各供应商为准。",
      "合规与边界必须先看清：下载并二次剪辑他人视频存在版权合规风险，仅限自有内容或已获授权素材，本站不提供规避指导。高光排序为 LLM 的主观判断，无独立评测数据；无水印等卖点为 README 自述，成片质量本站未实测。项目 2026年09月08日 建仓（GitHub API 2026年09月11日 实查：217 stars / 80 forks），发布时间短、社区规模尚小。",
    ],
    highlights: [
      "高光自动挑选：LLM 按传播力框架对转写文本打 0–100 分排序，自动去重选出 Top-N 片段",
      "一键竖屏成片：链接或本地文件进、9:16 出，可选 AI hook 开场与 360–1080 分辨率",
      "CLI 与本地网页双形态：本地 faster-whisper 转写，LLM 供应商可换并提供 API",
    ],
    bestFor: "需要把长视频素材切片分发的自媒体运营者与内容创作者，且素材限于自有内容或已获授权来源。",
  },
  tokentab: {
    image: "/media/tokentab.png",
    imageAlt: "tokentab 原创插图：Claude Code、Codex、Gemini CLI 三处会话日志汇入一张终端成本账单表格，表内数字为示意样例",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "tokentab 是开源命令行工具，读取 Claude Code、Codex、Gemini CLI 留在本地的会话日志，把 token 用量与成本按模型、项目、日期和工作类型汇总成报表。默认显示最近 7 天，可切换今天、本月、全部历史、自定义窗口或单一工具/项目，也可用 --json 输出供其他程序处理。项目自述完全本地运行：不要账号、不要 API key、数据不出机器——该表述为 README 自述，本站未独立验证。",
      "数字口径上，token 直接取自官方日志记录，不做猜测；成本按一张手工维护的官方费率表（美元/百万 token）离线计算。README 解释这是有意取舍：宁可轻微过期，也不在厂商改模型名时崩溃；模型名模糊匹配，未命中时显示 $0.00 并明确提示而非静默按免费计；缓存读写单独拆算，避免对同批 token 重复计费。另带本地网页仪表盘（-web，localhost:4747），把同样数字排成月度账单版式，每次请求实时读盘、只绑定 localhost、不拉 CDN 字体。",
      "已知边界：活动类型（编码、调试、重构、测试等）是基于所用工具与首条消息措辞的确定性启发式分类，README 明说「是提示，不是结论」；费率表需要人工维护，新模型或改名后可能出现 $0.00 占位；Cursor 支持为未完成占位；上游会话日志格式变化可能导致解析失效。项目以 MIT 许可证开源，唯一第三方依赖为 rich，2026年09月07日 建仓（GitHub API 2026年09月11日 实查：189 stars / 67 forks）。",
    ],
    highlights: [
      "多 CLI 会话成本汇总：识别 Claude Code、Codex、Gemini CLI 日志，按模型/项目/日期/活动类型拆分",
      "不联网的成本核算：token 取自官方日志，价格用内置手工费率表，缓存拆算避免重复计费",
      "CLI 加本地网页仪表盘：多种时间窗口、--json 机器可读、-web 打开 localhost 月度账单视图",
    ],
    bestFor: "同时使用多个编码 agent、需要按模型与项目核算 AI 编程成本的重度用户与开发团队。",
  },
  "bang-motion": {
    image: "/media/bang-motion.png",
    imageAlt: "Bang Motion 原创插图：单个 index.html 双击即播的 16:9 网页动效画面示意，含运动主体、下三分之一条与动态字幕排版",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "Bang Motion 是遵循开放 Agent Skills 规范的技能包（同时以 Claude Code 插件分发），让编码 agent 在浏览器里做「动效图形」而非幻灯片：产品片头、promo、栏目片花与频道片头、动态字幕排版、下三分之一条与讲解动画。成品是自包含的单个 index.html，双击即播、自动播放加循环、无播放器界面；观看需联网加载 GSAP 与字体（CDN），离线演示会缺样式。",
      "它把职业动效设计师的硬标准写成 agent 可自查的结构规则：连续世界、会运动的镜头、跨场景延续的主体、数字活在场景里，并配反 slide 禁令（无淡出换场、每秒有运动、文字层级不超过 2 层、至少两种转场且其一有真实纵深）。防止千篇一律是核心设计：风格从主题与品牌色出发（必填 style brief），agent 容易偷懒之处全部改成菜单——8 种风格方向、11 种背景运动、6 种背景表面、9 种转场、6 种高亮形状，并规定同一选择不得跨项目重复；讲解动画另提供 5 种风格模板。",
      "配音工作流为 agent 交稿本、用户录制或生成音频后回传、时间轴按人声重排（无 ffmpeg 时可用浏览器端停顿检测）；时间轴为确定性输出，可逐帧导出 PNG 再合成 MP4（需自备 Node + puppeteer + ffmpeg，可选）。项目以 MIT 许可证开源（© 2026 Bang Tutorial），2026年09月05日 建仓、2026年09月06日 之后未再 push（GitHub API 2026年09月11日 实查：130 stars / 20 forks），此处仅陈述采集事实、不外推维护状态。动效审美偏好主观，规则约束的是结构而非品味，实际效果本站未实测。",
    ],
    highlights: [
      "反幻灯片动效生成：结构规则加风格模板产出单文件 index.html 的片头、promo、片花与动态字幕",
      "风格多样性机制：必填 style brief 与菜单化的风格/背景运动/表面/转场/高亮选项，跨项目不重复",
      "配音同步与确定性导出：稿本→音频回传→按人声重排时间轴，可选逐帧导出 MP4",
    ],
    bestFor: "做产品 promo、开场动画与动态排版的开发者和独立创作者，尤其是使用 Claude Code、Codex、Gemini CLI 或 Cursor 的 agent 用户。",
  },
  "hermes-agent": {
    image: "/media/hermes-agent.png",
    imageAlt: "Hermes Agent 原创插图：多平台消息经抽象网关汇入自托管智能体核心，完成的任务经验沉淀为技能并进入本地记忆",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "Hermes Agent 是 Nous Research 官方推出的自托管个人 AI 智能体（Python，MIT 开源），口号「与你一起成长的智能体」：复杂任务完成后自动把经验沉淀为可复用技能，并在后续使用中持续改进；记忆由 Agent 自治维护，会话历史支持全文检索（FTS5）与 LLM 摘要。模型接入与厂商无关，官方称从 5 美元档 VPS 到 GPU 集群均可运行。",
      "它通过单一网关进程接入 Telegram、Discord、Slack、WhatsApp、Signal 与 CLI，内置 cron 定时任务、可并行的子智能体、7 种终端后端（本地、Docker、SSH、Singularity、Modal、Daytona、Vercel Sandbox），并兼容 agentskills.io 开放技能标准。自托管意味着消息网关的 Token 与消息权限须由使用者自行管控。",
      "自托管暴露消息网关，Token/消息权限须自行管控；高热度仓库存在仿冒风险，须认准 NousResearch 官方组织；09-07 版本发布证据沿用候选期快照，未逐版本复核。",
    ],
    highlights: [
      "从经验自动创建并改进技能的自学习闭环",
      "单一网关接入 Telegram/Discord/Slack/WhatsApp/Signal/CLI",
      "跨会话记忆、会话全文检索与内置 cron 调度",
    ],
    bestFor: "想私有化部署个人 AI 助手、愿意自行管理服务器与消息权限的开发者与极客用户。",
  },
  ponytail: {
    image: "/media/ponytail.png",
    imageAlt: "Ponytail 原创插图：决策小球沿 7 级 YAGNI 阶梯逐级下行，最终抵达「最小实现」代码卡",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "Ponytail 把一位「能不写就不写」的资深工程师决策风格写成 Agent 可执行规则（MIT 开源）：理解任务后按 7 级阶梯逐级检查——需要存在吗（YAGNI，跳过）→ 代码库已有（复用）→ 标准库有（用标准库）→ 平台原生有（用原生）→ 依赖已装（用依赖）→ 一行能写（就一行）→ 都不满足才写「最小可用实现」。作者明确「懒而不疏忽」：信任边界校验、数据安全、无障碍等底线永不裁剪。",
      "通过各 Agent 的插件市场或规则文件接入 Claude Code、Codex、Copilot CLI、Gemini CLI、Cursor、Windsurf、Hermes 等 20 余种载体，提供 lite/full/ultra/off 强度档位与 review、audit、debt、gain 等子命令。README 自述在小样本对照中平均减少约 54% 代码量——该数据为作者侧报告（无头 Claude Code 会话，n=4、12 个任务），未经独立复核，表述时须保留「作者自述」属性。",
      "收益数据为作者侧小样本报告，未经独立复核；强约束「最小实现」风格未必适配所有团队规范，需按档位调节。",
    ],
    highlights: [
      "7 级 YAGNI 决策阶梯抑制过度设计",
      "一次接入覆盖 Claude Code/Codex/Gemini CLI 等主流编码 Agent",
      "lite/full/ultra/off 档位与 review、audit 等配套子命令",
    ],
    bestFor: "被编码 Agent 的过度工程产出困扰、希望控制代码量与审查负担的个人开发者与团队。",
  },
  voicestudio: {
    image: "/media/voicestudio.png",
    imageAlt: "VoiceStudio 原创插图：本地语音工作台的三轨波形与麦克风输入，右下角为本地离线标识",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "VoiceStudio（曾名 OmniVoice-Studio，AGPL-3.0 开源）定位「开源自托管的 ElevenLabs 替代」：零样本语音克隆（官方建议 5–15 秒参考音频）、按年龄/口音/风格描述的声音设计、视频配音（转写→翻译→合成→导出）、系统级听写、转写与多角色有声书（EPUB/PDF 导入、.m4b 导出）全部在本机完成；集成 16 个 TTS 与 11 个 ASR 引擎，TTS 语言目录约 646 种（实际覆盖取决于所选引擎）。",
      "技术形态为 Tauri v2 桌面壳 + FastAPI 本地服务（localhost:3900）+ SQLite，支持 CUDA/Apple MPS/MLX/ROCm/CPU，并提供 OpenAI 兼容本地 API 与 MCP 服务器；README 明确本地工作流「无账号、无 API Key、无用量计量」。应用本体 AGPL-3.0（作者另售商业授权），下载的模型沿用各自上游条款——默认 OmniVoice 权重为 CC-BY-NC，商用集成需分别核对。",
      "语音克隆涉及声音肖像权利，须在取得授权后对目标声音使用；AGPL-3.0 对商用集成有传染性约束；默认模型权重 CC-BY-NC 含非商业条款；各语言实际覆盖度未逐一验证。",
    ],
    highlights: [
      "零样本语音克隆与声音设计，全流程本地离线运行",
      "克隆/配音/转写/听写/有声书一体，内置 16 TTS + 11 ASR 引擎与约 646 种语言目录",
      "OpenAI 兼容本地 API 与 MCP 服务器，本地工作流无需账号或 API Key",
    ],
    bestFor: "需要隐私优先、本地化语音生产的播客与有声书创作者、配音本地化团队及开发者。",
  },
  "video-use": {
    image: "/media/video-use.png",
    imageAlt: "video-use 原创插图：素材文件夹经转写、剪辑决策、渲染、自检四步流水线产出 final.mp4",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "video-use 来自 browser-use 官方组织（MIT 开源），把「用编码 Agent 剪视频」工程化为一条流水线：转写 → 打包 → LLM 推理 → 生成 EDL 剪辑决策单 → 渲染 → 逐切点自检（最多 3 轮修正重渲）。它能剪掉口头语与废镜头、按段自动调色、每次剪切加 30ms 音频淡入淡出防爆音、烧录大写字幕，并以 HyperFrames/Remotion/Manim/PIL 并行子智能体生成叠片动画。",
      "核心设计是「LLM 不观看视频，而是阅读视频」：靠约 12KB 的转写文本与按需生成的 timeline_view 时间线截图做剪辑决策；转写使用 ElevenLabs Scribe（词级时间戳、说话人分离），因此需配置 ELEVENLABS_API_KEY——转写环节为云服务并产生相应费用。支持 Claude Code、Codex、Hermes、OpenClaw 等一切有 shell 权限的 Agent；依赖本地 ffmpeg（必需）与 yt-dlp（可选）。",
      "转写环节依赖 ElevenLabs API Key（云依赖与费用，候选期未标注，本次据官方 README 补充）；长视频本地算力与磁盘占用高；剪辑结果需人工复核；配合 yt-dlp 获取素材须注意版权，仅限自有或已授权内容。",
    ],
    highlights: [
      "素材入目录、对话式产出 final.mp4 的完整剪辑流水线（转写→EDL→渲染→自检）",
      "自动去口头语、分段调色、字幕烧录与多引擎叠片动画",
      "支持 Claude Code/Codex/Hermes 等任意有 shell 的编码 Agent",
    ],
    bestFor: "熟悉编码 Agent、想用对话方式完成口播与发布类视频粗剪的内容创作者与开发者。",
  },
  atlas: {
    image: "/media/atlas.png",
    imageAlt: "Atlas 原创插图：时间线上的会话 checkpoint 锚点与提交节点双向关联，左上为桌面窗口",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "Atlas（Tauri + Rust，MIT 开源）自称「给编码 Agent 用的源码管理」：每个 Agent 会话自动产生 checkpoint，把产出的 commit 与引发它的提示词、工具调用和推理过程关联；commit 被 amend/rebase 后按 patch-id 重新对位。会话记录存于本机 `.atlas/sessions.db`（SQLite、默认 gitignore，README 自述写入时清除密钥），可选中任一 checkpoint 直接与它对话。",
      "应用完全离线、无需账号，内置编辑器、Git、终端、知识库、浏览器等工作区；多个 Agent 经 ACP 协议并行运行（Claude Code、Codex，及 Cursor、OpenCode、Kilo Code 等 ACP 注册代理）并共享本地嵌入向量记忆（HNSW 检索），中途切换 Agent 不丢上下文。当前官方分发仅支持 macOS（tryatlas.cc 提供 .dmg），Linux/Windows 未经官方测试；项目较新，成熟度待观察。",
      "项目新（09-12 快照 3.3k 星）、成熟度待观察；仅官方支持 macOS；会话数据（提示词/推理）落盘 `.atlas/` 本地目录，「写入时清除密钥」为 README 自述、未经独立审计，敏感项目使用前自行评估。",
    ],
    highlights: [
      "Agent 运行级 checkpoint：commit 与会话、提示词、工具调用双向关联，rebase/amend 后可重新对位",
      "多 Agent 并行与共享记忆（本地嵌入 + HNSW），切换 Agent 不丢上下文",
      "离线运行无需账号，编辑器/Git/终端/知识库一体化工作区",
    ],
    bestFor: "同时运行多个编码 Agent、需要追溯「这行改动来自哪次会话」的个人开发者与小团队。",
  },
  "patent-disclosure-skill": {
    image: "/media/patent-disclosure-skill.png",
    imageAlt: "patent-disclosure-skill 原创插图：交底书文稿配合检索放大镜与带编号引线的部件附图",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "这是一套面向中国专利实务的中文 Agent 技能（MIT 开源，兼容 agentskills.io 规范），把专利工作拆成 8 个子技能：交底书编写、申请文件、案卷会稿、专利通俗解读、专利地图、审查答复辅助、著录检索与政策简报，覆盖发明、实用新型、外观设计三类文书；流程串联「挖掘专利点 → 查新 → 脱敏 → 撰写 → 版本迭代」，并支持外观线条图、实用新型部件编号图与 CAD 轴测附图生成。",
      "官方安装面向 Claude Code 与 Cursor：把仓库克隆进 `.claude/skills/`（Cursor 为 `~/.cursor/skills/`），前置 Python 3.9+ 与本地 Chrome/Edge（用于查新与附图渲染），依赖经 `pip install -r requirements.txt` 安装；CNIPA 检索、CAD 附图等为可选组件按需安装。README 强调「缺事实就问、绝不瞎编」；但专利文书法律效力要求高，AI 产出必须经专利代理师复核，查新覆盖度受公开数据库限制。",
      "AI 生成文书不当然具备法律效力，提交前须经专利代理师复核；查新结论受公开数据库覆盖度限制；仓库页面未见法律免责声明，使用边界由使用者把握。",
    ],
    highlights: [
      "8 个子技能覆盖挖掘→查新→脱敏→交底书→审查答复全流程",
      "发明/实用新型/外观三类文书与附图（线条图/部件图/CAD 轴测）生成",
      "专利通俗解读、著录检索与政策简报等延伸能力",
    ],
    bestFor: "想把工程创新整理为专利交底书的工程师与研究者，以及需要快速读懂竞争专利的团队。",
  },
  "firecrawl-skill": {
    image: "/media/firecrawl-skill.png",
    imageAlt: "Firecrawl Skill 原创插图：网页内容经漏斗抽取为结构化键值数据",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "Firecrawl（主仓库约 17.9 万星）官方发布的 Skill 与 CLI 把其「网页上下文 API」接进编码 Agent：`scrape`（含 `--schema` 结构化提取、截图、页面动作）、`search`（网页/新闻/图片）、`crawl`、`map`、`research`/`developer` 索引、`interact`（Playwright 浏览器会话）、`monitor`（站点变更监控）等命令；官方提供 `npx skills add firecrawl/skills` 一步装入 Claude Code、Codex、Cursor、Windsurf、OpenCode、Hermes 等 Agent。",
      "默认走 Firecrawl 云端（api.firecrawl.dev），凭 FIRECRAWL_API_KEY 或浏览器登录，按 credits 计量（内置 `credit-usage` 命令）；也可用 `--api-url` 指向自建实例（非默认地址自动跳过认证）。需注意：`firecrawl/cli` 仓库截至 09-12 未标注开源许可证（GitHub API license 字段为 null），主仓库 firecrawl 为 AGPL-3.0——许可证未知须如实保留，商用集成前向官方确认。",
      "cli 仓库许可证未知（09-12 核实：官方仓库未标注）；云服务需 API Key 并产生用量成本；抓取须遵守目标站点 robots 与版权要求；自建实例的部署维护由使用者承担。",
    ],
    highlights: [
      "scrape/crawl/search/map 一站式网页上下文获取，支持 --schema 结构化提取与 monitor 站点监控",
      "npx skills add firecrawl/skills 一步接入 Claude Code/Codex/Cursor 等主流 Agent",
      "云端按 credits 计量与自建实例（--api-url）双模式",
    ],
    bestFor: "需要给编码 Agent 接入实时网页数据与结构化抓取的开发者、数据与增长团队。",
  },
  sie: {
    image: "/media/sie.png",
    imageAlt: "SIE 原创插图：多类模型节点汇入统一的 OpenAI 兼容端点，再分发到多个 Agent",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "SIE（superlinked 出品，Apache-2.0）把 Agent 任务背后的模型收敛到一个自托管推理服务器：`/v1/embeddings`、`/v1/chat/completions`、`/v1/completions`、`/v1/responses` 等 OpenAI 兼容端点统一提供检索嵌入与重排（bge-m3、splade-v3、colbertv2、qwen3-reranker）、文档转 Markdown 与 OCR（lightonocr、glm-ocr、mineru、paddleocr-vl、docling）、结构化抽取/NER（gliner2 等）、内容安全（granite-guardian-2b）与生成（qwen3.6-27b），SDK 暴露 encode/score/extract/generate，支持 100+ 模型按需加载与 LRU 驻留，可与 LangChain、LlamaIndex、Chroma、Qdrant 等集成。",
      "部署按「bundle」拆分 Docker 镜像，依赖不兼容的模型家族天然隔离；本机 `pip install \"sie-server[local]\"` 即可起步，生产侧提供 Helm 图表、网关负载均衡、KEDA 缩容至零与主流云 Terraform 模块。注意：服务端默认开启匿名遥测（版本/系统/GPU 型号），可用 `SIE_TELEMETRY_DISABLED=1` 关闭，隐私敏感部署应显式禁用。",
      "依赖不兼容的模型家族需拆分独立镜像，本地 GPU/内存要求较高；服务端默认开启匿名遥测（可关闭）；各任务最优模型选择需按业务自行评测，本站不作推荐。",
    ],
    highlights: [
      "嵌入、重排、OCR、结构化抽取、内容安全与生成统一为 OpenAI 兼容 API",
      "100+ 模型按需加载与 LRU 驻留，一套服务多 Agent 共享",
      "本机 pip 起步，生产级 Helm/KEDA/Terraform 配套",
    ],
    bestFor: "为多个 Agent 应用自建检索与文档理解基础设施的工程团队。",
  },
  "loadster-mcp": {
    image: "/media/loadster-mcp.png",
    imageAlt: "Loadster MCP 原创插图：Agent 经权限边界与云端压测平台双向通信，产出仪表与柱状报告",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "Loadster 是云端负载测试与合成监控平台；其官方 MCP 服务器为托管服务（Streamable HTTP，端点 `https://api.loadster.com/mcp`，服务端源码未公开，GitHub 仓库提供各客户端接入配置与 Claude Code 插件）。Agent 可创建/试放压测脚本（支持 HTTP 与浏览器/Playwright 脚本类型）、管理场景与数据集、配置监控并读取报告。",
      "平台刻意收窄了 Agent 权限边界：不能启动/停止完整压测、不能启用监控、不能管理通知策略与计费，仅开放「单机器人试放」与脚本/场景/数据集读写。认证走 OAuth 2.1 浏览器授权，或在控制台 Settings → AI Agents → MCP Tokens 生成 Bearer Token（仅显示一次，以创建者身份在其团队内生效）。定价按 Fuel 用量积分：注册赠 50 单位，月订阅 $77–$797，按量付费 $97 起，监控套餐 $29/月起（09-12 官网核实，以官网实时为准）。",
      "依赖商业云账号与付费额度，超出免费额度的用量按 Fuel 计费；压测必须只针对自有或已获授权的目标；MCP 服务端闭源，仓库仅为配置与元数据。",
    ],
    highlights: [
      "Agent 直接编写/试放压测脚本、管理场景与数据集、读取压测与监控报告",
      "Streamable HTTP 托管端点，OAuth 2.1 或 MCP Token 接入 Claude Code/Codex/Cursor 等客户端",
      "平台侧硬性权限边界：完整压测启停、计费等不对 Agent 开放",
    ],
    bestFor: "需要 Agent 化性能测试与合成监控的 QA 与后端团队（Loadster 付费用户）。",
  },
  "agentphone-mcp": {
    image: "/media/agentphone-mcp.png",
    imageAlt: "AgentPhone MCP 原创插图：抽象手机与短信线程、语音通话波弧及工具集点阵，全部内容占位化",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "AgentPhone MCP（MIT 开源，基于 mcp-use 框架）让 MCP 客户端获得真实通信能力，共 28 个工具：购买与管理美国/加拿大号码、收发短信（支持媒体与线程回复）、外呼（`make_call` 经 webhook 驱动，或 `make_conversation_call` 内置 AI 对话无需自建 webhook）、呼入处理、自定义语音与系统提示词的通话 Agent，以及用量与账单查询。",
      "接入提供三种方式：远端 Streamable HTTP（`https://mcp.agentphone.ai/mcp`，OAuth 或 Bearer API Key）、本地 stdio（`npx -y agentphone-mcp` + AGENTPHONE_API_KEY 环境变量）、自托管 HTTP。所有通话经 AgentPhone API；README 未公布费率，需注册 agentphone.ai 后按用量计费，具体定价未知。须特别提示：README 未包含外呼合规、受话方同意或录音披露等声明，此类能力天然涉及通信费用、骚扰/滥用与声音授权风险，仅应在合法合规并取得授权的前提下使用。",
      "外呼涉及通信费用与骚扰/滥用合规风险，README 无合规、同意与录音披露声明；声音与号码使用须取得授权；证据链目前仅官方仓库单一来源，热度未知；运营主体在仓库披露有限；定价未知。",
    ],
    highlights: [
      "28 个工具覆盖购号、短信、外呼（含内置 AI 对话通话）与呼入 webhook",
      "远端 Streamable HTTP / 本地 stdio / 自托管三种接入，OAuth 或 API Key 认证",
      "自定义语音与系统提示词的通话 Agent 及用量账单查询",
    ],
    bestFor: "构建电话客服、外呼提醒与语音自动化，且自行承担通信合规责任的开发团队。",
  },
  superpowers: {
    image: "/media/superpowers.png",
    imageAlt: "Superpowers 原创插图：brainstorming、writing-plans、executing-plans 技能卡片汇入技能链工作流窗口，test-driven-development 执行中并显示 RED→GREEN→REFACTOR 循环",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "Superpowers（MIT 开源）官方定位「An agentic skills framework & software development methodology」，把资深工程师的工作习惯拆成可组合技能：写码前先头脑风暴并落设计文档，经 git worktree 建隔离工作区，把工作拆成 2–5 分钟颗粒度的任务，逐任务派发全新子代理并做「规格合规 + 代码质量」两阶段审查，全程强制测试驱动开发（先写失败测试再写最小实现），分支完成后验证测试并提供 merge/PR/清理选项。README 强调这些是「强制工作流，不是建议」——Agent 在每个任务前自动检查应使用的技能，并称按此运行的 Agent「自主连续工作数小时不偏离计划并不罕见」。",
      "它是当前 Agent 技能生态中规模最大的方法论技能集之一（285,712★，2026-09-13 快照），官方适配 Claude Code、Codex、Cursor、Gemini CLI、GitHub Copilot CLI、Devin CLI 等 14 种编码 Agent；技能库另含 systematic-debugging（四阶段根因调试）、verification-before-completion 等专项技能。须知：工作流约束较强（强制 TDD、计划先行），团队需适应期，且主要面向编码场景；brainstorming 的可选视觉功能默认从官网加载 Prime Radiant logo（README 称不含项目、提示词或 Agent 信息），设 SUPERPOWERS_DISABLE_TELEMETRY 可关闭；企业商业服务定价未公开。",
    ],
    highlights: [
      "头脑风暴 → 设计文档 → 计划拆解 → 子代理执行与双阶段审查的全链路强制工作流",
      "强制 RED-GREEN-REFACTOR 循环，TDD 与完成前验证内建",
      "一套技能官方适配 Claude Code/Codex/Cursor 等 14 种编码 Agent",
    ],
    bestFor: "日常使用 Claude Code/Codex 等编码 Agent、希望把团队工程规范固化进 Agent 工作流的开发者与技术负责人。",
  },
  "i-have-adhd": {
    image: "/media/i-have-adhd.png",
    imageAlt: "i-have-adhd 原创插图：同一问题的 Before 长篇大论与 After 动作先行双栏对比，编号步骤以具体下一步收尾",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "i-have-adhd（MIT 开源）解决单一大痛点：编码 Agent 总把答案埋进长篇大论。它用 10 条输出规则改造 Agent 的回答方式——先给出下一步动作、多步任务编号、以一个具体的下一步结尾、抑制跑题、每轮重述当前状态、给以分钟计的具体时间估算（而不是「一会儿」）、列表不超过 5 项、无开场白、无复述、无客套结尾。官方副标语注明「No ADHD diagnosis needed!」——它是给所有人用的「结论先行」输出规范，灵感来自《The Adult ADHD Tool Kit》（J. Russell Ramsay & Anthony L. Rostain），并被改编为 LLM 的响应方式而非人类日程管理。",
      "安装零门槛：把一句话粘给任意 CLI Agent 即可完成；仓库同时提供 Claude、Codex、Cursor、OpenCode、Gemini、Kimi、Qwen 等多端适配与 AGENTS.md 通用接入。想调整规则，Fork 后编辑 SKILL.md 再按 INSTALL.md 换源安装。热度：43,206★（2026-09-13 快照），GitHub Trending 日榜单日 +3,463。须知：效果为主观体验类主张，无独立验证；简短指令式输出可能与需要详细推理过程的团队偏好冲突，按需取用。",
    ],
    highlights: [
      "「动作先行」输出规则集：先给下一步动作、步骤编号、列表 ≤5 项、零客套",
      "每轮重述当前状态并给出以分钟计的时间估算，进展可见",
      "一段提示词即可安装，覆盖 Claude/Codex/Cursor/Gemini/Kimi/Qwen 等，Fork SKILL.md 可自定义规则",
    ],
    bestFor: "所有被 Agent 长输出淹没、希望结论先行的编码 Agent 用户，无需 ADHD 诊断。",
  },
  mathmodelagent: {
    image: "/media/mathmodelagent.png",
    imageAlt: "MathModelAgent 原创插图：赛题输入经建模手、代码手、论文手流水线产出 res.pdf，9 步自动验收逐项通过并自动匹配赛事模板",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "MathModelAgent（代码公开、可自部署）是专为数学建模竞赛设计的多智能体系统：「建模手、代码手、论文手」分工协作，自动完成问题分析、数学建模、代码编写、纠错与论文撰写，最终产出一份已排好版的完整论文。排版基于 Typst，内置 17 套竞赛论文模板（覆盖国赛、华数杯、华为杯、美赛 MCM/ICM 等），并配套含模型选择决策树与评分标准的建模知识库。",
      "工程完成度是其亮点：Code Interpreter 支持本地 Jupyter 与云端 E2B/Daytona；经 litellm 接入任意模型且每个智能体可配置不同 LLM；通过 Tavily API 联网搜索真实数据；ChromaDB + Rerank 检索建模方法与代码模板；关键节点提供 HIL 人机协作审批（confirm/edit/regenerate/ask/skip/abort），另有四层容错与 9 步自动验收（文本泄漏检测→数值校验→Typst 编译→PDF 检查）。使用入口：桌面版（macOS/Windows）、在线托管版（mathmodel.top）、Docker 一键部署，或作为技能安装。须知：仓库未标注标准开源许可证，仅有「个人免费使用，请勿商业用途，商业用途联系作者」声明，商用集成前必须联系作者确认授权；作者免责声明明确「AI 生成仅供参考，目前水平直接参加国赛获奖是不可能的」，直接提交 AI 产出存在学术诚信风险；项目自述仍处实验迭代阶段；托管版定价未公示。",
    ],
    highlights: [
      "多智能体端到端论文流水线：分析 → 建模 → 编码 → 纠错 → 排版成稿，17 套竞赛模板",
      "建模知识库 + Tavily 联网数据：决策树式模型选择、代码模板 RAG 检索",
      "HIL 关键节点审批、9 步自动验收与四层容错，多模型可配",
    ],
    bestFor: "数学建模竞赛参赛学生与相关教学场景，以及对多智能体工作流设计感兴趣的开发者。",
  },
  "pascal-editor": {
    image: "/media/pascal-editor.png",
    imageAlt: "Pascal Editor 原创插图：楼层爆炸视图与 AI Agent 面板并置，展示 pascal mcp connect、本地连接免账号与官方技能 pascal-3d、furniture-fit",
    imageCredit: "插图：AIHub 原创设计",
    overview: [
      "Pascal Editor（MIT 开源）是基于 React Three Fiber 与 WebGPU 构建的 3D 建筑编辑器，浏览器打开即用，也可通过 CLI 安装为本地持久化服务。场景按「Site → Building → Level → Wall/Slab/Ceiling/Roof/Zone → Item」节点层级组织，墙体系统支持斜接与 CSG 开洞，配有空间碰撞检测、放置校验与 50 步撤销/重做，项目数据存储在本机；官网定位「Free Open-Source 3D Building Editor」，口号「Turn your property into a living digital twin」，另提供配套 iOS 应用 Pascal Capture。",
      "差异化在「为 Agent 而建」：CLI 启动编辑器的同时拉起一个带认证的本地 MCP 服务（npx @pascal-app/cli editor），也可用 pascal mcp connect 单独连接托管端点（editor.pascal.app/api/mcp），AI Agent 因此可直接查询和修改 3D 场景；官方提供 pascal-3d 与 furniture-fit 两个 Agent 技能，一条命令装进 Claude Code/Codex。本地连接器无需 Pascal 账号或 API key；npm 生态提供 core/viewer/editor/nodes/mcp/cli 及 ifc-converter（IFC 转换）等包，并有插件系统扩展节点类型。须知：垂直领域（建筑/3D）受众较窄；每个 CLI 服务仅允许一个活跃 Agent 客户端（多实例需不同 PASCAL_HOME 目录）；官网 AI 构建功能标注消耗 AI credits（定价未公示，未知）；支持的文件格式清单未在 README 列明。",
    ],
    highlights: [
      "浏览器/CLI 双形态 3D 建筑编辑：参数化墙体（斜接、CSG 开洞）、碰撞校验、50 步撤销/重做",
      "MCP 打通人机同台协作：本地或托管端点让 Agent 查询/修改场景，官方技能一键装进 Claude Code/Codex",
      "本地优先与可扩展：数据存本机、IFC 转换包、节点与面板插件系统",
    ],
    bestFor: "建筑/空间设计师与房产数字化从业者，以及想用 Agent 驱动 3D 场景的开发者。",
  },
  "scroll-craft": {
    image: "/media/scroll-craft.png",
    imageAlt: "scroll-craft 精选卡片：官方范例站点实景配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "scroll-craft（MIT 开源）是一套给编码 Agent 用的网页设计技能：交给 Codex、Claude Code 等能读指令、改文件、跑命令、检查浏览器的 Agent，它按一套明确设计标准产出「滚动驱动」的高端网页，自带设计工作流、参考资料、引擎与自动化验证工具，v0.3.0 起沉淀「十个已验收站点标准」（AI Automation Society、PERKFORM、Glaido 等）。它针对 AI 生成网页的两个常见极端——要么平庸保守毫无记忆点，要么堆满浮夸动效却保不住正文可读性；官方拒绝清单点名特性卡片网格、渐变文字、AI 紫渐变等套路。",
      "它设 8 种互斥「页面语法」（电影式一镜到底、章节式编辑排版、连续世界等），强制每个站点发明一处独有的 signature move 交互，并用「指纹闸门」要求新构建在语法、导航、首屏、收尾等 6 个维度中至少 4 个不同于历史作品；页面完成后由 headless 浏览器逐滚动位置自检死滚动、按合成页面逐行实测对比度与视频解码卡死，输出 contact sheet。须知：官方声明仅在 Windows 上完整跑过（macOS/Linux 提供路径覆盖但无实际构建记录）；生成式视频素材有真实开销，用自己的照片与素材则免费，可选 AI 素材生成需自备 KIE_AI_API_KEY。",
    ],
    highlights: [
      "8 种互斥页面语法 + 指纹闸门：每个站点至少 4/6 维度不同于自己的历史作品",
      "headless 浏览器逐滚动位置自检死滚动、逐行对比度与视频解码卡死",
      "情绪曲线先行、单峰原则、45–75ch 排版与明确拒绝清单的工艺底线",
    ],
    bestFor: "前端开发者、独立开发者与设计工程师，想让编码 Agent 产出有记忆点的滚动叙事型站点。",
  },
  "chat-on-steroids": {
    image: "/media/chat-on-steroids.png",
    imageAlt: "Chat On Steroids 精选卡片：GitHub 官方仓库主视觉配深色版式，左侧 APP 徽章、一句话价值与 MIT 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "Chat On Steroids（MIT 开源）给 ChatGPT 装上「手脚」：桌面聊天工作台加本地 MCP server，让网页版 ChatGPT 会话直接读写你批准的本地文件夹、执行终端命令、给代码打补丁。Core 工具集移植自 OpenAI Codex CLI 的工具契约（apply_patch、exec_command、write_stdin 等），模型天然熟悉用法；多文件补丁写入前先预检，命令作为真实进程运行，支持交互式 stdin 与后台结果收集，所有工具调用与真实结果在本地留痕。",
      "它支持多 worker 协作：主会话最多编排 8 个 worker 会话（默认 2 个），worker 就是用户自己浏览器里的普通 ChatGPT 会话，全程可见、可再次唤醒；会话过长时用 Compact & Resume 生成交接简报、开新会话续作。权限模型是「你就是边界」：只有批准的文件夹可见，每项能力独立开关，read-only 一键总闸，身份校验 fail-closed。官方提供 Windows/macOS/Linux、x64/ARM64 安装包（GitHub Releases，附 SHA256SUMS 校验文件）。须知：命令以普通用户权限运行、非 OS 沙箱；配套扩展观察 ChatGPT 网页界面并自动开标签页，属非公开自动化 API，与 OpenAI 服务条款的兼容性需用户自行确认（README 明示）；构建未签名/未公证；当前模型选择器依赖英文界面。",
    ],
    highlights: [
      "Codex 级工具面：真实文件补丁、交互式终端与后台进程，批准文件夹边界 + 逐项能力开关",
      "全部工具调用本地留痕，Compact & Resume 跨会话交接，Goal/Loop 自动跟进任务",
      "主会话编排最多 8 个 worker，身份校验 fail-closed，read-only 一键总闸",
    ],
    bestFor: "重度 ChatGPT 订阅用户与本地自动化爱好者，想在 ChatGPT 会话里直接操作本地项目。",
  },
  "voicemem": {
    image: "/media/voicemem.png",
    imageAlt: "VoiceMem 精选卡片：官方「流式双脑」架构图配深色版式，左侧 APP 徽章、一句话价值与 Apache-2.0 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "VoiceMem（Apache-2.0 开源，官方声明永久保持全部开源）是面向实时语音 Agent 的长期记忆系统，核心是「流式双脑」架构：左脑用 Schema 与实体组织事实记忆，右脑用长短期情绪归因与跨实体节点管理人格、情绪与关系——不只记住「用户说过什么」，也记住「用户是谁、有什么感受」。整条流水线是流式的：用户还在说话时即完成音频分段、转写、记忆提取并写入记忆图；查询先路由再排序，只把 Top-K 条记忆注入上下文，配合 0–300 ms 投机预取，官方称几乎不增加延迟。",
      "项目带完整研究配套：arXiv 技术报告（arXiv:2608.26005）、HuggingFace 开源模型系列（Qwen2.5-Omni、Qwen3-Omni、Step-Audio2-Mini 微调版）、ChatMem-400K 数据集与可复现评测；记忆检索完全在本地运行，仅写入时的信息提取调用 OpenAI API。官方自报基准：LoCoMo 91.2%（对比 Mem0 61.68%，仅需 Top-5 条记忆）、响应 134 ms（对比 Mem0 1,440 ms）、每次约 430 个记忆 token（对比 Mem0 6,956）。须知：研究型项目，工程化成熟度未知；评测数字为官方自报、未经独立复核；基线采集时最后 push 为 2026-09-05，其后暂无新提交。",
    ],
    highlights: [
      "流式双脑记忆：左脑事实（Schema/实体）+ 右脑人格情绪，说话过程中即完成检索",
      "官方自报响应 134 ms、每次约 430 记忆 token，0–300 ms 投机预取",
      "arXiv 报告 + HuggingFace 模型系列 + ChatMem-400K 数据集，评测可复现",
    ],
    bestFor: "语音 Agent 开发者与语音交互研究者，需要低延迟、带人格情绪的长期语音记忆。",
  },
  "agent-memory": {
    image: "/media/agent-memory.png",
    imageAlt: "agent-memory 精选卡片：GitHub 官方仓库主视觉配深色版式，左侧 APP 徽章、一句话价值与 MIT 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "agent-memory（MIT 开源，v0.1.0）解决一个具体问题：Agent 关掉会话就忘掉一切。它是本地优先的长期记忆运行时：一个 store 里的 Markdown 文件是唯一事实源，旁边的 SQLite 索引只是随时可删的缓存——官方以测试保证 rm -rf .index/ 后重建零知识损失。Claude Code、Codex CLI 及一切能跑 shell 命令的宿主共享同一 store，官方验证过全部 9 个跨宿主读写配对：一个宿主写入的，另一个原样找到。",
      "检索走「按路径回答，再按层级读」：recall 返回一行摘要 + 文件路径 + 锚点 + 得分的 L0 列表，Agent 按任务需要逐级展开（大纲 → 全文 → 原始材料），不把大段文本粘进上下文。写入在对话边界自动触发，不依赖 Agent 记得去存；sleep-time 整理按价值合并与遗忘，删除永远只以提案形式出现、需人工确认；库内不含任何 LLM 客户端，零 API key、零计费面。须知：早期版本，PyPI 尚无发布，需 Python 3.12+ 与 uv 从源码安装；官方自报对比数字为其写策略研究结论、未经独立复核；与既往提名的 okf-agent-memory（RUYI-105）为不同团队的同类项目，注意区分。",
    ],
    highlights: [
      "Markdown 单一事实源 + 可重建索引：记忆可 grep、可 git、可迁移",
      "跨宿主共享：Claude Code、Codex CLI 等经 mem CLI、mem-mcp、hook 读写同一 store",
      "分层检索与治理：L0 列表按需展开；sleep-time 整理、删除需人工确认",
    ],
    bestFor: "多 Agent 重度用户与个人知识管理者，想要一份可查、可迁移、不锁平台的 Agent 记忆。",
  },
  "headcount": {
    image: "/media/headcount.png",
    imageAlt: "headcount 精选卡片：官方 org chart 页面实景配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "headcount（MIT 开源）把 Claude Code 组织成一家公司：一名 chief executive 之下设 16 个部门（Technology、Security、Product、Marketing、Revenue、Finance、Legal & Risk 等）、共 172 项技能，把「写更好的 prompt」换成「给组织加一个部门」。每个部门是独立可安装的插件，项目只加载所需职能；技能以 department:skill 形式寻址（如 security:threat-modeling、finance:unit-economics），命名永不冲突。",
      "部门按独占写入面划分，并在 .claude/agents/ 内附 agent charter，可作为 subagent 委派；Security 与 Legal & Risk 为 reviewer-class 部门，其阻塞性发现不可被被审部门推翻；CI 运行统一校验脚本防止本地与 CI 漂移。官方提供可搜索的交互式 org chart，USE-CASES 文档收录 11 个跨部门情境（SOC 2 评审、落地页转化诊断、招聘的财务判断等）。须知：全量安装 16 个部门易稀释模型上下文，官方建议按部门按需安装；README 由脚本生成，页面 About 区与正文存在 15+/125+ 与 16/172 的口径不一致，照录待作者统一；基线采集时最后 push 为 2026-09-03。",
    ],
    highlights: [
      "16 部门/172 技能公司式组织，按需插件化安装，department:skill 寻址不冲突",
      "reviewer-class 治理：Security 与 Legal & Risk 的阻塞发现不可被被审部门推翻",
      "可搜索交互式 org chart + 11 个跨部门实战用例文档",
    ],
    bestFor: "Claude Code 重度用户与工程团队流程搭建者，想给 Agent 配一套带治理的职能组织。",
  },
  "doop": {
    image: "/media/doop.png",
    imageAlt: "doop 精选卡片：官方 OG 主视觉配深色版式，左侧 APP 徽章、一句话价值与 AGPL-3.0 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "doop（AGPL-3.0 开源）是 Paper.design 的开源替代：一张多人设计画布，人与 AI Agent 同台实时共创。画布上的每个 Frame 都是渲染真实 HTML 的沙箱画板——人在浏览器里编辑，Agent 通过内置 MCP server 流式「作画」，光标、presence、逐帧编辑指示、Agent 状态与活动流全员实时可见。",
      "它内置一支「设计团队」：排队一张卡片或 @mention 一个角色，Doop Agent 自动开工；免费额度跑在服务器密钥上，之后接用户自己的 ChatGPT 订阅或 OpenAI key 继续运行，连接 Claude Code 等自有 MCP 客户端则完全跑在自己的订阅上。「设计记忆」把样例 Frame 与设计决策沉淀为所有 Agent 都遵守的持久风格规则。自托管一条命令（内嵌 Postgres，无外部服务依赖），画布默认私有、按画布分享，经 MCP OAuth 接入的 Agent 以其人类身份行动、继承其确切权限；不想自己跑可用官方云版 doop.design。须知：AGPL-3.0 对商用部署有传染性约束；云版定价、云版与自托管的功能差异官方未公示（未知）；README 提示经第三方服务器驱动 ChatGPT 订阅未获 OpenAI 条款认可，重度使用可能限流或封号（API key 路径为受支持替代）。",
    ],
    highlights: [
      "人与 Agent 同画布实时共创：Frame 渲染真实 HTML，Agent 经 MCP 流式作画，全程可见",
      "内置 Doop Agent + 设计记忆：卡片排队自动开工，样例与决策蒸馏为持久风格规则",
      "一条命令自托管（内嵌 Postgres），默认私有、OAuth 鉴权、Agent 权限继承其人类",
    ],
    bestFor: "与 AI 协作的设计师、设计工程师与独立开发者，想要人机同台的实时设计画布。",
  },
  "open-seo-mcp-skills": {
    image: "/media/open-seo-mcp-skills.png",
    imageAlt: "Open SEO MCP Skills 精选卡片：GitHub 官方仓库主视觉配深色版式，左侧 SKILL 徽章、一句话价值与 MIT 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "Open SEO MCP Skills（MIT 开源）反「开源 SEO 工具多为 DataForSEO 套壳」之道而行：排名读你真实的 Google Search Console、流量读你真实的 GA4（含 ChatGPT、Perplexity、Claude、Gemini 的 AI 引荐流量）、关键词量来自 Google Ads 关键词规划师；竞品关键词、外链与 SERP 走内置的 DataForSEO（经 Ryze 连接器，无需自管 key）；已付费的 Ahrefs/Semrush 也可接入。",
      "共 8 项技能：站点审计（seo-audit）、关键词研究、排名追踪、竞品差距、外链检查、AI 可见度、内容简报，以及 seo-vs-ads——分析你正在为本可免费获得的自然排名点击付多少广告费。面向 Claude 设计：一条 MCP 命令连通数据，插件市场两步装技能，然后直接说「给我的站点跑一次 SEO 审计」。官方称工具无订阅、API 调用无加价。须知：站点数据经第三方 Ryze 云连接器中转，敏感站点数据外流需自行评估；「免费/无加价」承诺的可持续性未知；DataForSEO 数据按第三方计费。",
    ],
    highlights: [
      "真实数据 SEO/GEO：GSC 真实排名、GA4 真实流量（含 AI 引荐），非 SERP 估算",
      "8 项即用技能：审计、关键词、排名、竞品差距、外链、AI 可见度、内容简报、广告浪费分析",
      "Claude 原生工作流：一条 MCP 命令 + 插件安装，自然语言直接派活",
    ],
    bestFor: "站长、独立开发者与增长从业者，想用自己的一手数据做 SEO 与 AI 搜索可见度。",
  },
  "lemmalog": {
    image: "/media/lemmalog.png",
    imageAlt: "Lemmalog 精选卡片：GitHub 官方仓库主视觉配深色版式，左侧 MCP 徽章、一句话价值与 MIT 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "Lemmalog（MIT 开源）的论点：Agent 的记忆不该是「比向量库记得更好」，而应是一个演绎数据库——Agent 对自己知道什么建立可验证的模型，用规则机械地推理知识如何变化。基础事实在摄入边界由 LLM 抽取断言，此后一切确定性推导：闭包、时间投影、矛盾候选、相关性扩散；每条事实携带溯源（provenance）可一路指回源对话，每轮对话增量更新派生视图而非重新推导。",
      "工程上同样较真：双时态字段、why() 证明树、置信度 × 溯源的半环注解、实体消解、半朴素增量求值，外加 450 个随机程序的差分测试与解析器 fuzz。交付形态覆盖 Rust crate、MCP server（stdio，12 个工具，支持 Claude Code / Kimi CLI）、REPL 与一个通用 Agent skill——把引擎当作任何长任务的「工作记忆」；仓内设计文档附已实现状态的诚实清单。官方自报基准：MemEval F1 0.487、LoCoMo F1 0.573（其榜单 10 系统中第 2）。须知：概念门槛高、需理解 Datalog 规则语法，面向开发者；基准数字为官方自报；基线采集时最后 push 为 2026-09-02，其后暂缓。",
    ],
    highlights: [
      "可证明的记忆：why() 即出证明树，溯源直达源 episode；双时态支持「某时刻为真」查询",
      "确定性推理 + 增量维护：分层 Datalog、否定即缺席、半朴素求值，每轮只算变化",
      "三种接入：MCP server（12 工具）、REPL 与通用 Agent skill；450 程序差分测试护航",
    ],
    bestFor: "Agent 记忆系统开发者与程序化知识推理研究者，需要可解释、可证明的记忆引擎。",
  },
  "openreality": {
    image: "/media/openreality.png",
    imageAlt: "Open Reality 精选卡片：官方品牌 Hero 视觉配深色版式，左侧 MCP 徽章、一句话价值与 BSD-2-Clause 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "Open Reality（BSD-2-Clause 开源）把「用手机拍段视频」变成「AI 能查询的 3D 场景」：上传一段普通手机视频，几分钟后得到一个持久 3D 场景，AI 助手可在其中测量距离与角度、规划路径、盘点物体、描述空间；它以 41 个 MCP 工具接入 Claude Code、Claude Desktop、Codex 与 Cursor，npm 包 openreality-mcp 即装即用。重建核心基于 MIT SPARK Lab 的 VGGT-SLAM 研究线。一个体现严谨度的细节：未校准前所有尺寸只报相对值，只有用真实距离校准后数字才允许被称作「米」；服务器的拒绝与不确定性标签会原样传达给 AI。",
      "面向机器人场景：扫描可导出为 LeRobot/GR00T 风格训练数据集或 Isaac Sim 场景（托管服务提供）。全部工作流可自托管——自有 GPU 机器，或自己的 Modal 账号；另有内置离线模拟器，用 fixture 数据走通全流程，无账号、无 GPU 即可开发与演示。须知：生态尚小（86★，2026-09-14 快照）；3D 重建是 GPU 作业，自托管依赖 GPU 或付费算力；自托管服务器下载的 VGGT-1B 重建模型按 CC BY-NC 4.0 授权、仅限非商用，商用需改用官方托管服务或自行向模型权利方取得授权；托管服务定价页面未公示（未知）；server/ 与 core/ 目录为私有工作仓的手工同步镜像（各附 MIRROR.md 说明）。",
    ],
    highlights: [
      "视频进、3D 场景出：手机视频数分钟生成持久场景，测量（校准前仅相对值）与路径规划",
      "41 个 MCP 工具全暴露：Claude Code / Codex / Cursor 即装即用，离线模拟器零门槛",
      "机器人训练数据导出：LeRobot/GR00T 数据集与 Isaac Sim 场景，全流程可自托管",
    ],
    bestFor: "机器人、3D 与空间计算开发者，想把现实空间变成 AI 可查询、可训练的数据。",
  },
  "shim-mcp": {
    image: "/media/shim-mcp.png",
    imageAlt: "Shim MCP 精选卡片：WordPress.org 官方插件图标配深色版式，左侧 MCP 徽章、一句话价值与 GPL-2.0 许可证",
    imageCredit: "卡片：AIHub 编辑制作（视觉素材来自各产品官方渠道）",
    overview: [
      "Shim MCP（GPL-2.0-or-later 开源，已上架 WordPress.org 官方插件目录）是一个自包含的 WordPress MCP 服务器：装上插件，WordPress 站点即成为 MCP server，Claude Code、Claude Desktop、Cursor、Windsurf、Cline 等任何 MCP 客户端都能驱动——56 项能力覆盖文章、页面、媒体、用户、插件、菜单、小工具、评论、选项与系统管理。它刻意保持「适配器」定位：无伴随插件、无云中继、无账号、无遥测；能力全部注册在 WordPress 官方 Abilities API 上，其他插件注册的能力也会被自动暴露。",
      "连接有两条路：本地 stdio 走 WP-CLI——wp shim-mcp serve 把服务器作为本地进程运行，没有 HTTP、没有端口、没有令牌，直接消除整条认证面；远程站点走 Streamable HTTP，在 Tools → Shim MCP 生成应用密码，逐调用做能力检查。安全设计：逐对象权限复查（持 edit_posts 不等于能改任何一篇具体文章），唯一危险的 wp-config.php 重写默认关闭、需显式 opt-in；还会检测竞争性 MCP 插件并告警。官方验证记录：WordPress 7.1 / PHP 8.5.9 下全 56 能力注册与完整增删改查回路，Plugin Check 0 错误 0 警告。须知：把站点写权限授予 AI 需谨慎管控（建议从本地 stdio 与受限账号起步）；星数低（46★，2026-09-14 快照），分发依赖 WordPress.org；作者自述功能完整但尚未在广泛主机环境运行过。",
    ],
    highlights: [
      "一个插件 = 站点级 MCP server：56 项能力，无伴随插件、无中继、无账号、无遥测",
      "双传输：WP-CLI 本地 stdio（零端口零令牌）与远程 Streamable HTTP（应用密码逐调用检查）",
      "细粒度权限：逐对象能力复查，危险配置重写默认关闭，自动检测竞争 MCP 插件",
    ],
    bestFor: "WordPress 开发者与站长，想让 Claude Code/Cursor 直接、安全地驱动站点内容管理。",
  },

};

export function getResourceProfile(slug: string) {
  return resourceProfiles[slug];
}
