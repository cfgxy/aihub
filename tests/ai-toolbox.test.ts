import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const seed = resourceSeeds.find((resource) => resource.slug === "ai-toolbox");

describe("AI Toolbox 条目入库（RUYI-97）", () => {
  it("以 app 类型、辅助工具分类进入种子目录", () => {
    expect(seed, "种子目录缺少 ai-toolbox").toBeDefined();
    expect(seed!.name).toBe("AI Toolbox");
    expect(seed!.type).toBe("app");
    expect(seed!.category).toBe("companion-tools");
    expect(categorySeeds.app.some((category) => category[1] === seed!.category)).toBe(true);
  });

  it("正式名称不带无官方依据的版本号", () => {
    const fields = [seed!.name, seed!.summary, seed!.description, ...seed!.tags].join(" ");
    expect(fields).not.toMatch(/3\.0/);
  });

  it("官方入口与来源链接指向已核验的公开地址", () => {
    expect(seed!.officialUrl).toBe("https://www.ai-toolbox.co/");
    expect(seed!.sourceUrl).toMatch(/^https:\/\/chromewebstore\.google\.com\//);
  });

  it("摘要覆盖四个受支持的 AI 助手", () => {
    const text = `${seed!.summary} ${seed!.description}`;
    for (const platform of ["ChatGPT", "Gemini", "Claude", "Grok"]) {
      expect(text, `摘要缺少受支持助手 ${platform}`).toContain(platform);
    }
  });

  it("详情正文含核心能力、适用人群、定价与风险口径，并配已验收插图", () => {
    const profile = getResourceProfile("ai-toolbox");
    expect(profile, "AI Toolbox 缺少详情正文").toBeDefined();
    expect(profile!.overview.length).toBeGreaterThanOrEqual(2);
    expect(profile!.highlights.length).toBeGreaterThanOrEqual(3);
    expect(profile!.bestFor.length).toBeGreaterThan(10);

    const body = `${profile!.overview.join(" ")} ${profile!.highlights.join(" ")} ${profile!.bestFor}`;
    expect(body, "正文缺少定价口径").toMatch(/免费版|Premium/);
    expect(body, "正文缺少风险或来源提示").toMatch(/闭源|会话内容|以官网为准|官网口径/);

    expect(fs.existsSync(path.join(process.cwd(), "public", profile!.image))).toBe(true);
    expect(profile!.imageSource).toMatch(/^https:\/\//);
  });

  it("公开正文不含正文交付件的 internal 附录内容", () => {
    const profile = getResourceProfile("ai-toolbox")!;
    const published = [
      seed!.name, seed!.summary, seed!.description, ...seed!.tags,
      ...profile.overview, ...profile.highlights, profile.bestFor, profile.imageAlt,
    ].join(" ");

    // 以下均为 aitoolbox3-detail.json 的 internal 段口径，不得进入公开详情页。
    for (const leak of ["内部口径", "待确认", "未核实", "候选卡", "Product Hunt 徽章", "badge-ai-toolbox"]) {
      expect(published, `公开正文泄露 internal 附录内容：${leak}`).not.toContain(leak);
    }
  });

  it("不托管安装包，来源链接均为外部官方渠道", () => {
    const profile = getResourceProfile("ai-toolbox")!;
    for (const url of [seed!.officialUrl, seed!.sourceUrl, profile.imageSource]) {
      expect(url).not.toMatch(/\.(crx|zip|exe|dmg)$/i);
    }
  });
});
