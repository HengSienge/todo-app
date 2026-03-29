import db from "../../utils/db";

export default defineEventHandler(() => {
  return db.prepare("SELECT * FROM todos ORDER BY created_at DESC").all();
});