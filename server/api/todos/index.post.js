import db from "../../utils/db";

export default defineEventHandler(async (event) => {
  const { title } = await readBody(event);
  db.prepare("INSERT INTO todos (title) VALUES (?)").run(title);
  return { message: "Todo created" };
});