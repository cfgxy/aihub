import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resourceSeeds } from "@/db/seed-data";

const testDb = path.resolve(process.cwd(), "data/test-aihub.db");
const companionToolCount = resourceSeeds.filter(
  (resource) => resource.type === "app" && resource.category === "companion-tools",
).length;

describe("资源仓储", () => {
  beforeEach(async () => {
    process.env.AIHUB_DB_PATH = testDb;
    const { resetDbForTests } = await import("@/db");
    resetDbForTests();
    fs.rmSync(testDb, { force: true });
  });
  afterEach(async () => {
    const { resetDbForTests } = await import("@/db");
    resetDbForTests();
    fs.rmSync(testDb, { force: true });
  });
  it("初始化三种资源类型和全部种子条目", async () => {
    const { listResources, listTypes } = await import("@/lib/repository");
    expect(listTypes().map((item) => item.key)).toEqual(["app", "skill", "mcp"]);
    expect(listResources()).toHaveLength(resourceSeeds.length);
  });
  it("按关键词、类型和分类筛选", async () => {
    const { listResources } = await import("@/lib/repository");
    expect(listResources({ query: "豆包" }).map((item) => item.slug)).toEqual(["doubao"]);
    expect(listResources({ typeKey: "skill" })).toEqual([]);
    expect(listResources({ typeKey: "app", categorySlug: "companion-tools" })).toHaveLength(companionToolCount);
  });
  it("草稿默认不会出现在公开查询中", async () => {
    const { listCategories, listResources, listTypes, saveResource } = await import("@/lib/repository");
    const type = listTypes()[0];
    const category = listCategories(type.key)[0];
    saveResource({ name: "测试资源", slug: "test-resource", typeId: type.id, categoryId: category.id, summary: "测试摘要", description: "", tags: [], officialUrl: "https://example.com", sourceUrl: "", installGuide: "", configText: "", iconUrl: "", status: "draft" });
    expect(listResources({ query: "测试资源" })).toHaveLength(0);
    expect(listResources({ query: "测试资源", includeDrafts: true })).toHaveLength(1);
  });
  it("拒绝资源类型与主分类错配", async () => {
    const { listCategories, listTypes, saveResource } = await import("@/lib/repository");
    const appType = listTypes().find((item) => item.key === "app")!;
    const skillCategory = listCategories("skill")[0];
    expect(() => saveResource({ name: "错误归属", slug: "invalid-category", typeId: appType.id, categoryId: skillCategory.id, summary: "测试摘要", description: "", tags: [], officialUrl: "https://example.com", sourceUrl: "", installGuide: "", configText: "", iconUrl: "", status: "draft" })).toThrow("资源类型与主分类不匹配");
  });
});
