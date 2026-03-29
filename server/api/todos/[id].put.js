import db from "../../utils/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const { status } = await readBody(event);
  db.prepare("UPDATE todos SET status = ? WHERE id = ?").run(status ? 1 : 0, id);
  return { message: "Todo updated" };
});