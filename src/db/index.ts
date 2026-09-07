import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { upSql } from "./schema";
import { categorySeeds, resourceSeeds, typeSeeds } from "./seed-data";

let database: DatabaseSync | undefined;

function databasePath() {
  const configured = process.env.AIHUB_DB_PATH;
  return configured
    ? path.resolve(/* turbopackIgnore: true */ process.cwd(), configured)
    : path.join(process.cwd(), "data", "aihub.db");
}

export function getDb() {
  if (database) return database;
  const filename = databasePath();
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  database = new DatabaseSync(filename);
  database.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  database.exec(upSql);
  seedDatabase(database);
  return database;
}

export function seedDatabase(db = getDb()) {
  const count = Number((db.prepare("SELECT COUNT(*) AS count FROM resource_types").get() as { count: number }).count);
  if (count > 0) {
    const workBuddy = resourceSeeds.find((resource) => resource.slug === "workbuddy");
    if (workBuddy) {
      db.prepare(`UPDATE resources SET summary=?, description=?, tags=?, official_url=?, source_url=?, updated_at=CURRENT_TIMESTAMP
        WHERE slug='workbuddy' AND official_url='https://www.workbuddy.com/'`).run(
        workBuddy.summary, workBuddy.description, JSON.stringify(workBuddy.tags), workBuddy.officialUrl, workBuddy.sourceUrl,
      );
    }
    backfillSeeds(db);
    return;
  }

  db.exec("BEGIN");
  try {
    const insertType = db.prepare("INSERT INTO resource_types (key, name, description, sort, accent) VALUES (?, ?, ?, ?, ?)");
    const insertCategory = db.prepare("INSERT INTO categories (type_id, name, slug, description, sort) VALUES (?, ?, ?, ?, ?)");
    const insertResource = db.prepare(`INSERT INTO resources
      (name, slug, type_id, category_id, summary, description, tags, official_url, source_url, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`);

    for (const type of typeSeeds) {
      insertType.run(type.key, type.name, type.description, type.sort, type.accent);
    }
    const types = db.prepare("SELECT id, key FROM resource_types").all() as Array<{ id: number; key: string }>;
    for (const type of types) {
      const categories = categorySeeds[type.key as keyof typeof categorySeeds];
      categories.forEach((category, index) => insertCategory.run(type.id, category[0], category[1], category[2], index + 1));
    }
    const categories = db.prepare(`SELECT c.id, c.slug, t.key AS type_key FROM categories c
      JOIN resource_types t ON t.id = c.type_id`).all() as Array<{ id: number; slug: string; type_key: string }>;
    for (const resource of resourceSeeds) {
      const type = types.find((item) => item.key === resource.type);
      const category = categories.find((item) => item.type_key === resource.type && item.slug === resource.category);
      if (!type || !category) throw new Error(`种子归属不存在：${resource.slug}`);
      insertResource.run(resource.name, resource.slug, type.id, category.id, resource.summary, resource.description,
        JSON.stringify(resource.tags), resource.officialUrl, resource.sourceUrl);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

/**
 * 已初始化的数据库补入后续新增的种子条目。
 * 只按 slug 插入缺失项，不更新也不删除既有记录，避免覆盖管理后台改过的内容。
 */
function backfillSeeds(db: DatabaseSync) {
  const existing = new Set((db.prepare("SELECT slug FROM resources").all() as Array<{ slug: string }>)
    .map((row) => row.slug));
  const missing = resourceSeeds.filter((resource) => !existing.has(resource.slug));
  if (!missing.length) return;

  const types = db.prepare("SELECT id, key FROM resource_types").all() as Array<{ id: number; key: string }>;
  const categories = db.prepare(`SELECT c.id, c.slug, t.key AS type_key FROM categories c
    JOIN resource_types t ON t.id = c.type_id`).all() as Array<{ id: number; slug: string; type_key: string }>;
  const insertResource = db.prepare(`INSERT INTO resources
    (name, slug, type_id, category_id, summary, description, tags, official_url, source_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`);

  db.exec("BEGIN");
  try {
    for (const resource of missing) {
      const type = types.find((item) => item.key === resource.type);
      const category = categories.find((item) => item.type_key === resource.type && item.slug === resource.category);
      if (!type || !category) throw new Error(`种子归属不存在：${resource.slug}`);
      insertResource.run(resource.name, resource.slug, type.id, category.id, resource.summary, resource.description,
        JSON.stringify(resource.tags), resource.officialUrl, resource.sourceUrl);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function resetDbForTests() {
  database?.close();
  database = undefined;
}
