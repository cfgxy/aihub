import { getDb } from "@/db";
import type { Category, Resource, ResourceInput, ResourceType } from "./types";

const resourceSelect = `SELECT r.*, t.key AS type_key, t.name AS type_name, t.accent AS type_accent,
  c.name AS category_name, c.slug AS category_slug
  FROM resources r JOIN resource_types t ON t.id = r.type_id
  JOIN categories c ON c.id = r.category_id`;

type ResourceRow = Record<string, unknown>;

function mapResource(row: ResourceRow): Resource {
  return {
    id: Number(row.id), name: String(row.name), slug: String(row.slug), typeId: Number(row.type_id),
    typeKey: String(row.type_key), typeName: String(row.type_name), typeAccent: Number(row.type_accent),
    categoryId: Number(row.category_id), categoryName: String(row.category_name), categorySlug: String(row.category_slug),
    summary: String(row.summary), description: String(row.description), tags: JSON.parse(String(row.tags || "[]")),
    officialUrl: String(row.official_url), sourceUrl: String(row.source_url), installGuide: String(row.install_guide),
    configText: String(row.config_text), iconUrl: String(row.icon_url), status: row.status as Resource["status"],
    createdAt: String(row.created_at), updatedAt: String(row.updated_at),
  };
}

export function listTypes(): ResourceType[] {
  return getDb().prepare("SELECT id, key, name, description, sort, accent FROM resource_types ORDER BY sort, id").all() as ResourceType[];
}

export function listCategories(typeKey?: string): Category[] {
  const sql = `SELECT c.id, c.type_id AS typeId, t.key AS typeKey, c.name, c.slug, c.description, c.sort
    FROM categories c JOIN resource_types t ON t.id = c.type_id ${typeKey ? "WHERE t.key = ?" : ""} ORDER BY t.sort, c.sort`;
  return (typeKey ? getDb().prepare(sql).all(typeKey) : getDb().prepare(sql).all()) as Category[];
}

export function listResources(options: { typeKey?: string; categorySlug?: string; query?: string; tags?: string[]; includeDrafts?: boolean; limit?: number } = {}) {
  const conditions: string[] = [];
  const params: Array<string | number | null> = [];
  if (!options.includeDrafts) conditions.push("r.status = 'published'");
  if (options.typeKey) { conditions.push("t.key = ?"); params.push(options.typeKey); }
  if (options.categorySlug) { conditions.push("c.slug = ?"); params.push(options.categorySlug); }
  if (options.query?.trim()) {
    conditions.push("(LOWER(r.name) LIKE ? OR LOWER(r.summary) LIKE ? OR LOWER(r.tags) LIKE ?)");
    const query = `%${options.query.trim().toLowerCase()}%`;
    params.push(query, query, query);
  }
  for (const tag of options.tags || []) { conditions.push("r.tags LIKE ?"); params.push(`%\"${tag}\"%`); }
  const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const limit = options.limit ? ` LIMIT ${Math.max(1, options.limit)}` : "";
  return getDb().prepare(`${resourceSelect}${where} ORDER BY r.updated_at DESC, r.id DESC${limit}`).all(...params).map((row) => mapResource(row as ResourceRow));
}

export function getResource(slug: string, includeDrafts = false) {
  const row = getDb().prepare(`${resourceSelect} WHERE r.slug = ? ${includeDrafts ? "" : "AND r.status = 'published'"}`).get(slug);
  return row ? mapResource(row as ResourceRow) : null;
}

export function getResourceById(id: number) {
  const row = getDb().prepare(`${resourceSelect} WHERE r.id = ?`).get(id);
  return row ? mapResource(row as ResourceRow) : null;
}

export function saveResource(input: ResourceInput, id?: number) {
  const db = getDb();
  const category = db.prepare("SELECT id FROM categories WHERE id = ? AND type_id = ?").get(input.categoryId, input.typeId);
  if (!category) throw new Error("资源类型与主分类不匹配");
  const values = [input.name, input.slug, input.typeId, input.categoryId, input.summary, input.description,
    JSON.stringify(input.tags), input.officialUrl, input.sourceUrl, input.installGuide, input.configText, input.iconUrl, input.status];
  if (id) {
    db.prepare(`UPDATE resources SET name=?, slug=?, type_id=?, category_id=?, summary=?, description=?, tags=?,
      official_url=?, source_url=?, install_guide=?, config_text=?, icon_url=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`).run(...values, id);
    return id;
  }
  return Number(db.prepare(`INSERT INTO resources (name, slug, type_id, category_id, summary, description, tags,
    official_url, source_url, install_guide, config_text, icon_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(...values).lastInsertRowid);
}

export function deleteResource(id: number) {
  getDb().prepare("DELETE FROM resources WHERE id = ?").run(id);
}

export function setResourceStatus(id: number, status: Resource["status"]) {
  getDb().prepare("UPDATE resources SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(status, id);
}
