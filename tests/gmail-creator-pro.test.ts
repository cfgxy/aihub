import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds } from "@/db/seed-data";
import { getResourceProfile } from "@/lib/resource-profiles";

const seed = resourceSeeds.find((resource) => resource.slug === "gmail-creator-pro");

describe("Gmail Creator Pro 条目入库（RUYI-111）", () => {
  it("以 app 类型进入新分类「其他」", () => {
    expect(seed, "种子目录缺少 gmail-creator-pro").toBeDefined();
    expect(seed!.name).toBe("Gmail Creator Pro");
    expect(seed!.type).toBe("app");

    const category = categorySeeds.app.find((item) => item[1] === seed!.category);
    expect(category, `app 类目缺少 ${seed!.category}`).toBeDefined();
    expect(category![0]).toBe("其他");
  });

  it("官方入口与来源链接均锚定唯一来源仓库，且不提供安装命令", () => {
    const repository = "https://github.com/ShadowHackrs/gmail-account-creator";
    expect(seed!.officialUrl).toBe(repository);
    expect(seed!.sourceUrl).toBe(repository);
    expect(seed!.installGuide ?? "", "高风险条目不得提供安装命令").toBe("");
  });

  it("公开正文保留风险、专有许可与未独立审计口径", () => {
    const profile = getResourceProfile("gmail-creator-pro");
    expect(profile, "缺少详情正文").toBeDefined();
    expect(profile!.overview.length).toBeGreaterThanOrEqual(2);
    expect(profile!.highlights.length).toBeGreaterThanOrEqual(3);
    expect(profile!.bestFor.length).toBeGreaterThan(10);

    const body = [seed!.summary, seed!.description, ...profile!.overview, ...profile!.highlights, profile!.bestFor].join(" ");
    expect(body, "正文缺少专有许可口径").toContain("专有许可");
    expect(body, "正文缺少未独立审计口径").toMatch(/未独立审计|未做独立安全审计|未独立验证/);
    expect(body, "正文缺少 Google 条款风险提示").toContain("可能违反 Google");
    expect(body, "正文缺少不推荐限定").toContain("收录不代表推荐");
  });

  it("Google 条款定性保持条件性，不写成无条件禁止", () => {
    const profile = getResourceProfile("gmail-creator-pro")!;
    const published = [seed!.summary, seed!.description, ...seed!.tags, ...profile.overview, ...profile.highlights, profile.bestFor].join(" ");
    for (const overreach of ["明令禁止", "属违法", "一律违反"]) {
      expect(published, `公开正文出现被 Review 否决的无条件定性：${overreach}`).not.toContain(overreach);
    }
  });

  it("公开正文不出现任何操作性指导或背书措辞", () => {
    const profile = getResourceProfile("gmail-creator-pro")!;
    const published = [
      seed!.name, seed!.summary, seed!.description, ...seed!.tags,
      ...profile.overview, ...profile.highlights, profile.bestFor, profile.imageAlt, profile.featureImageAlt!,
    ].join(" ");
    for (const banned of ["npx ", "pip install", "git clone", "5sim", "接码平台", "成功率", "官方出品", "安全可信"]) {
      expect(published, `公开正文出现禁止内容：${banned}`).not.toContain(banned);
    }
    // 「Google 官方」只允许以否定形式出现（插图声明「非 Google 官方工具」）。
    const withoutNegation = published.replace(/非\s?Google 官方/g, "");
    expect(withoutNegation, "不得把该项目表述为 Google 官方").not.toContain("Google 官方");
  });

  it("配置原创 Hero 与 Feature 插图，不生成外部图片来源", () => {
    const profile = getResourceProfile("gmail-creator-pro")!;
    expect(profile.image).toBe("/media/gmail-creator-pro-hero.png");
    expect(profile.featureImage).toBe("/media/gmail-creator-pro-feature.png");
    expect(profile.featureImageAlt!.length).toBeGreaterThan(5);
    expect(profile.imageCredit).toBe("插图：AIHub 原创设计");
    expect(profile.imageSource, "原创插图不得声明外部来源").toBeUndefined();

    for (const file of [profile.image, profile.featureImage!]) {
      expect(fs.existsSync(path.join(process.cwd(), "public", file)), `缺少媒体文件 ${file}`).toBe(true);
    }
    for (const source of ["gmail-creator-pro-hero.svg", "gmail-creator-pro-feature.svg"]) {
      expect(fs.existsSync(path.join(process.cwd(), "docs/design/media-src", source)), `缺少源文件 ${source}`).toBe(true);
    }
  });

  it("详情页 CTA 覆盖为中性的「查看来源仓库」", () => {
    expect(getResourceProfile("gmail-creator-pro")!.actionLabel).toBe("查看来源仓库");
  });

  it("其余 app 资源仍使用默认 CTA，不受本条覆盖影响", () => {
    for (const resource of resourceSeeds.filter((item) => item.type === "app" && item.slug !== "gmail-creator-pro")) {
      expect(getResourceProfile(resource.slug)?.actionLabel, `${resource.slug} 不应覆盖 CTA`).toBeUndefined();
    }
  });
});
