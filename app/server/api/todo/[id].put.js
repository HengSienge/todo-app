import { db } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const body = await readBody(event);
  const { status } = body;
  await db.query("UPDATE todos SET status=? WHERE id=?", [status, id]);
  return { message: "Todo updated" };
});