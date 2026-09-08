export type ResourceProfile = {
  image: string;
  imageAlt: string;
  imageSource: string;
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
};

export function getResourceProfile(slug: string) {
  return resourceProfiles[slug];
}
