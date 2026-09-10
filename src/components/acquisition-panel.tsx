import type { Resource } from "@/lib/types";
import { hostname } from "@/lib/content";
import { getResourceProfile } from "@/lib/resource-profiles";
import { CopyBlock } from "./copy-block";
import { ExternalLink } from "./external-link";

export function AcquisitionPanel({ resource }: { resource: Resource }) {
  const target = resource.sourceUrl || resource.officialUrl;
  // 个别条目（如高风险第三方工具）需要中性按钮文案，由 profile 覆盖默认值。
  const actionLabel = getResourceProfile(resource.slug)?.actionLabel;
  return <section className="acquisition-panel">
    <div className="section-kicker">获取资源</div>
    {resource.typeKey === "app" && <ExternalLink href={resource.officialUrl} className="primary-link">{actionLabel || "前往官方下载"}</ExternalLink>}
    {resource.typeKey === "skill" && <>
      <ExternalLink href={target} className="primary-link">{actionLabel || "获取技能包"}</ExternalLink>
      <CopyBlock label="安装说明" value={resource.installGuide || "下载技能包，将完整目录放入 Agent 的 skills 目录后重新加载。"} />
    </>}
    {resource.typeKey === "mcp" && <>
      {resource.sourceUrl && <ExternalLink href={resource.sourceUrl} className="primary-link">查看文档</ExternalLink>}
      {/* 未录入配置的 MCP 不渲染空复制块，避免公开目录出现面向管理员的占位文案。 */}
      {resource.configText && <CopyBlock label="MCP 配置" value={resource.configText} />}
      {resource.installGuide && <CopyBlock label="安装命令" value={resource.installGuide} />}
    </>}
    <p className="external-note">将跳转至 {hostname(target)}。本站不托管安装包，请遵循目标站点条款。</p>
    <p className="source-note">来源：{hostname(target)} · 信息以官方页面为准</p>
  </section>;
}

