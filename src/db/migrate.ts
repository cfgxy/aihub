import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { downSql, upSql } from "./schema";

const filename = path.resolve(process.cwd(), process.env.AIHUB_DB_PATH || "data/aihub.db");
fs.mkdirSync(path.dirname(filename), { recursive: true });
const db = new DatabaseSync(filename);
db.exec(process.argv.includes("--down") ? downSql : upSql);
db.close();
console.log(process.argv.includes("--down") ? "数据库结构已回滚。" : "数据库结构已就绪。");

