import { readFile, writeFile } from "node:fs/promises";
import type { User } from "../types/user.js";

export async function save(user: User) {
  const old = await read();
  old.users.push(user);
  await writeFile("./src/database/users.json", JSON.stringify(old), "utf-8");
}

export async function read(): Promise<{ users: User[] }> {
  const data = await readFile("./src/database/users.json", "utf-8");
  const database = JSON.parse(data) as { users: User[] };
  return database;
}
