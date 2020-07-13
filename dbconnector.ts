import { Database } from "./depts.ts";
import User from "./Models/User.ts";

// Database credentials are specified on a .env file on the same level as server.ts
const db: Database = new Database("postgres", {
  host: `${Deno.env.get("dbhost")}`,
  username: `${Deno.env.get("dbusername")}`,
  password: `${Deno.env.get("dbpassword")}`,
  database: `${Deno.env.get("database")}`,
});

// Models to link:
db.link([User]);

export default db;
