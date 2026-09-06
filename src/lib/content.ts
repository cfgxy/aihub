export const siteName = "AI 工具集市";
export const disclaimer = "本站为第三方 AI 资源信息聚合目录。页面所涉产品名称、Logo、商标仅用于识别性引用，版权归原作者及权利人所有；条目信息均来自公开渠道，请以官方页面为准。本站不托管、不重分发任何安装包；跳转外部站点后请自行遵循其服务条款与安全提示。";

export function hostname(value: string) {
  try { return new URL(value).hostname.replace(/^www\./, ""); } catch { return "外部站点"; }
}

