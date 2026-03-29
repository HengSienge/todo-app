import { DatabaseSync } from "node:sqlite";
import { join } from "path";

const db = new DatabaseSync(join(process.cwd(), "todos.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;