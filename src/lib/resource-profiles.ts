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
};

export function getResourceProfile(slug: string) {
  return resourceProfiles[slug];
}
