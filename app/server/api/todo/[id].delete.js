import { db } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  await db.query("DELETE FROM todos WHERE id=?", [id]);
  return { message: "Todo deleted" };
});