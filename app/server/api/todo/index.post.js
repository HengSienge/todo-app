import { db } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title } = body;
  await db.query("INSERT INTO todos (title) VALUES (?)", [title]);
  return { message: "Todo created" };
});