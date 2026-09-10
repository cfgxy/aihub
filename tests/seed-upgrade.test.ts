import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { categorySeeds, resourceSeeds, typeSeeds } from "@/db/seed-data";
import { upSql } from "@/db/schema";

const testDb = path.resolve(process.cwd(), "data/test-upgrade.db");

/** WAL 模式会留下 -wal/-shm 边车文件，残留会造成下一个用例锁等待。 */
function removeTestDb() {
  for (const suffix of ["", "-wal", "-shm"]) fs.rmSync(`${testDb}${suffix}`, { force: true });
}

/** 构造一个「AI Toolbox 入库之前」的旧数据库：只含该条目以外的种子。 */
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
    categorySeeds[type.key as keyof typeof categorySeeds].forEach((category, index) =>
      insertCategory.run(type.id, category[0], category[1], category[2], index + 1));
  }

  const categories = db.prepare(`SELECT c.id, c.slug, t.key AS type_key FROM categories c
    JOIN resource_types t ON t.id = c.type_id`).all() as Array<{ id: number; slug: string; type_key: string }>;
  const insertResource = db.prepare(`INSERT INTO resources
    (name, slug, type_id, category_id, summary, description, tags, official_url, source_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`);
  for (const resource of resourceSeeds.filter((item) => item.slug !== "ai-toolbox")) {
    const type = types.find((item) => item.key === resource.type)!;
    const category = categories.find((item) => item.type_key === resource.type && item.slug === resource.category)!;
    insertResource.run(resource.name, resource.slug, type.id, category.id, resource.summary, resource.description,
      JSON.stringify(resource.tags), resource.officialUrl, resource.sourceUrl);
  }

  // 模拟管理后台产生的用户数据，升级过程不得破坏。
  const appType = types.find((item) => item.key === "app")!;
  const appCategory = categories.find((item) => item.type_key === "app" && item.slug === "companion-tools")!;
  insertResource.run("站长自建条目", "operator-custom", appType.id, appCategory.id, "管理后台手工录入的条目。", "",
    "[]", "https://example.com/", "");
  db.prepare("UPDATE resources SET summary = ? WHERE slug = 'doubao'").run("站长改写过的豆包摘要");
  db.exec("COMMIT");
  db.close();
}

describe("既有数据库升级补种（RUYI-97）", () => {
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

  it("旧数据库升级后补入 AI Toolbox，且动态查询与种子目录一致", async () => {
    const { listResources } = await import("@/lib/repository");
    const slugs = listResources().map((item) => item.slug);
    expect(slugs, "升级后仍缺少 ai-toolbox").toContain("ai-toolbox");
    for (const seed of resourceSeeds) {
      expect(slugs, `升级后缺少种子条目 ${seed.slug}`).toContain(seed.slug);
    }
  });

  it("补种是幂等的，重复初始化不会产生重复条目", async () => {
    const { resetDbForTests, seedDatabase, getDb } = await import("@/db");
    seedDatabase(getDb());
    seedDatabase(getDb());
    resetDbForTests();

    const { listResources } = await import("@/lib/repository");
    const aiToolbox = listResources({ includeDrafts: true }).filter((item) => item.slug === "ai-toolbox");
    expect(aiToolbox).toHaveLength(1);
  });

  it("补种不删除也不覆盖既有用户数据", async () => {
    const { listResources } = await import("@/lib/repository");
    const all = listResources({ includeDrafts: true });

    const custom = all.find((item) => item.slug === "operator-custom");
    expect(custom, "管理后台自建条目被删除").toBeDefined();
    expect(custom!.name).toBe("站长自建条目");

    const doubao = all.find((item) => item.slug === "doubao");
    expect(doubao!.summary, "站长改写过的既有条目被种子覆盖").toBe("站长改写过的豆包摘要");
  });

  it("新建数据库仍然初始化全部种子", async () => {
    const { resetDbForTests } = await import("@/db");
    resetDbForTests();
    removeTestDb();

    const { listResources, listTypes } = await import("@/lib/repository");
    expect(listTypes().map((item) => item.key)).toEqual(["app", "skill", "mcp"]);
    expect(listResources()).toHaveLength(resourceSeeds.length);
  });
});
