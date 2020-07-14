// dbconnector.ts: the database connector
import { Database } from "./depts.ts";
import User from "./Models/User.ts";
import Survey from "./Models/Survey.ts";

// Database credentials are specified on a .env file on the same level as server.ts
const db: Database = new Database("postgres", {
  host: `${Deno.env.get("DB_HOST")}`,
  username: `${Deno.env.get("DB_USERNAME")}`,
  password: `${Deno.env.get("DB_PASSWORD")}`,
  database: `${Deno.env.get("DB_NAME")}`,
});

// Models to link:
db.link([User, Survey]);

export default db;
