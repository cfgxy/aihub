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
};

export function getResourceProfile(slug: string) {
  return resourceProfiles[slug];
}
