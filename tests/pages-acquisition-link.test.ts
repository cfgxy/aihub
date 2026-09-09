import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const root = process.cwd();
const output = path.resolve(root, "dist-pages");

/**
 * 静态 Pages 的获取入口必须与动态站 src/components/acquisition-panel.tsx 同语义：
 * app 用 officialUrl，skill 用 sourceUrl || officialUrl，mcp 用 sourceUrl（无则不渲染按钮）。
 * 文案默认按类型取，profile.actionLabel 可覆盖（两端同口径），但不改变上述跳转目标。
 */
function expectedAcquisition(resource: (typeof resourceSeeds)[number]) {
  const label = getResourceProfile(resource.slug)?.actionLabel;
  if (resource.type === "app") return { label: label || "前往官方下载", href: resource.officialUrl };
  if (resource.type === "skill") return { label: label || "获取技能包", href: resource.sourceUrl || resource.officialUrl };
  return resource.sourceUrl ? { label: label || "查看文档", href: resource.sourceUrl } : undefined;
}

/** 取详情页「获取资源」面板内的主操作锚点，返回文案与原始 href。 */
function readAcquisitionLink(slug: string) {
  const html = fs.readFileSync(path.join(output, "r", slug, "index.html"), "utf8");
  const panel = html.match(/<span class="eyebrow">获取资源<\/span>([\s\S]*?)<\/section>/);
  expect(panel, `${slug} 详情页缺少「获取资源」面板`).not.toBeNull();
  const anchor = panel![1].match(/<a class="primary-link" href="([^"]+)"[^>]*>([^<]+)<\/a>/);
  if (!anchor) return undefined;
  return { href: anchor[1], label: anchor[2].replace(/\s*↗\s*$/, "").trim() };
}

describe("静态 Pages 获取入口与动态站语义一致", () => {
  beforeAll(() => {
    execFileSync("npx", ["tsx", "scripts/build-pages.ts"], { cwd: root, stdio: "pipe" });
  }, 120_000);

  for (const resource of resourceSeeds) {
    it(`${resource.name}（${resource.type}）主操作按钮文案与目标 URL 对应`, () => {
      expect(readAcquisitionLink(resource.slug)).toEqual(expectedAcquisition(resource));
    });
  }

  // RUYI-105 返工验收终点：两条 app 的 sourceUrl 与 officialUrl 不同，是本次缺陷的直接暴露点。
  it("Kilo Code 主按钮指向官网而非源码仓库", () => {
    expect(readAcquisitionLink("kilo-code")).toEqual({ label: "前往官方下载", href: "https://kilo.ai/" });
  });

  it("Almanac 主按钮指向官网而非 HN 讨论帖", () => {
    expect(readAcquisitionLink("almanac")).toEqual({ label: "前往官方下载", href: "https://usealmanac.com/" });
  });

  it("skill 与 MCP 入口保持既有获取语义", () => {
    expect(readAcquisitionLink("shuohao-skills")).toEqual({
      label: "获取技能包",
      href: "https://github.com/eternityspring/shuohao-skills",
    });
    expect(readAcquisitionLink("x64dbg-mcp-server")).toEqual({
      label: "查看文档",
      href: "https://github.com/duty1g/x64dbg-mcp-server",
    });
  });
});
