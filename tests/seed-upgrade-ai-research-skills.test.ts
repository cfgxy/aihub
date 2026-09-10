import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds, typeSeeds } from "@/db/seed-data";
import { upSql } from "@/db/schema";

const testDb = path.resolve(process.cwd(), "data/test-upgrade-ruyi111.db");

/** WAL 模式会留下 -wal/-shm 边车文件，残留会造成下一个用例锁等待。 */
function removeTestDb() {
  for (const suffix of ["", "-wal", "-shm"]) fs.rmSync(`${testDb}${suffix}`, { force: true });
}

/** 构造一个「AI 研究工作流分类尚未存在」的旧数据库：既缺该分类，也缺该分类下的条目。 */
function createLegacyDatabase() {
  fs.mkdirSync(path.dirname(testDb), { recursive: true });
  const db = new DatabaseSync(testDb);
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec(upSql);
  // 逐条 INSERT 各自 fsync 会让构造耗时随种子条数线性增长，用事务包裹一次落盘。
  db.exec("BEGIN");

  const insertType = db.prepare("INSERT INTO resource_types (key, name, description, sort, accent) VALUES (?, ?, ?, ?, ?)");
  for (const type of typeSeeds) insertType.run(type.key, type.name, type.description, type.sort, type.accent);

  const types = db.prepare("SELECT id, key FROM resource_types").all() as Array<{ id: number; key: string }>;
  const insertCategory = db.prepare("INSERT INTO categories (type_id, name, slug, description, sort) VALUES (?, ?, ?, ?, ?)");
  for (const type of types) {
    categorySeeds[type.key as keyof typeof categorySeeds]
      .filter((category) => category[1] !== "ai-research-workflow")
      .forEach((category, index) => insertCategory.run(type.id, category[0], category[1], category[2], index + 1));
  }

  const categories = db.prepare(`SELECT c.id, c.slug, t.key AS type_key FROM categories c
    JOIN resource_types t ON t.id = c.type_id`).all() as Array<{ id: number; slug: string; type_key: string }>;
  const insertResource = db.prepare(`INSERT INTO resources
    (name, slug, type_id, category_id, summary, description, tags, official_url, source_url, install_guide, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`);
  for (const resource of resourceSeeds.filter((item) => item.slug !== "ai-research-skills")) {
    const type = types.find((item) => item.key === resource.type)!;
    const category = categories.find((item) => item.type_key === resource.type && item.slug === resource.category)!;
    insertResource.run(resource.name, resource.slug, type.id, category.id, resource.summary, resource.description,
      JSON.stringify(resource.tags), resource.officialUrl, resource.sourceUrl, resource.installGuide || "");
  }

  // 模拟管理后台产生的用户数据，升级过程不得破坏。
  const skillType = types.find((item) => item.key === "skill")!;
  const skillCategory = categories.find((item) => item.type_key === "skill" && item.slug === "development")!;
  insertResource.run("站长自建技能", "operator-skill", skillType.id, skillCategory.id, "管理后台手工录入的技能。", "",
    "[]", "https://example.com/", "", "");
  db.exec("COMMIT");
  db.close();
}

describe("既有数据库补入新分类与新条目（RUYI-111）", () => {
  beforeEach(async () => {
    process.env.AIHUB_DB_PATH = testDb;
    const { resetDbForTests } = await import("@/db");
    resetDbForTests();
    removeTestDb();
    createLegacyDatabase();
  });
  afterEach(async () => {
    const { resetDbForTests } = await import("@/db");
    resetDbForTests();
    removeTestDb();
  });

  it("旧库补入「AI 研究工作流」分类并挂上 AI Research Skills", async () => {
    const { listCategories, listResources } = await import("@/lib/repository");
    const category = listCategories("skill").find((item) => item.slug === "ai-research-workflow");
    expect(category, "升级后仍缺少 ai-research-workflow 分类").toBeDefined();
    expect(category!.name).toBe("AI 研究工作流");

    const seeded = listResources().find((item) => item.slug === "ai-research-skills");
    expect(seeded, "升级后仍缺少 ai-research-skills").toBeDefined();
    expect(seeded!.categorySlug).toBe("ai-research-workflow");
    expect(seeded!.installGuide).toBe("npx @orchestra-research/ai-research-skills");
  });

  it("补种是幂等的，重复初始化不会产生重复分类或条目", async () => {
    const { resetDbForTests, seedDatabase, getDb } = await import("@/db");
    seedDatabase(getDb());
    seedDatabase(getDb());
    resetDbForTests();

    const { listCategories, listResources } = await import("@/lib/repository");
    expect(listCategories("skill").filter((item) => item.slug === "ai-research-workflow")).toHaveLength(1);
    expect(listResources({ includeDrafts: true }).filter((item) => item.slug === "ai-research-skills")).toHaveLength(1);
  });

  it("补种不删除也不覆盖既有用户数据", async () => {
    const { listResources } = await import("@/lib/repository");
    const custom = listResources({ includeDrafts: true }).find((item) => item.slug === "operator-skill");
    expect(custom, "管理后台自建条目被删除").toBeDefined();
    expect(custom!.name).toBe("站长自建技能");
  });
});
