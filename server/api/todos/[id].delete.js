import db from "../../utils/db";

export default defineEventHandler((event) => {
  const id = event.context.params.id;
  db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  return { message: "Todo deleted" };
});