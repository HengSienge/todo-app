import { db } from "../../utils/db";

export default defineEventHandler(async () => {
  const [rows] = await db.query("SELECT * FROM todos");
  return rows;
});