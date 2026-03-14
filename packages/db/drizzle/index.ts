import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { keys } from "../key";
import * as dbSchema from "./schema";

const pool = new Pool({
  connectionString: keys().DATABASE_URL,
});

export const db = drizzle({ client: pool, schema: dbSchema });
