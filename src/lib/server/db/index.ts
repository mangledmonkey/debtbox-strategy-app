import { DB_PATH } from '$env/static/private'
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from 'better-sqlite3';

const options = {
    verbose: console.log,
}

const sqlite = new Database(DB_PATH, options);
sqlite.pragma('journal_mode = WAL');
export const db = drizzle(sqlite)

await migrate(db, { migrationsFolder: "./src/lib/server/db/drizzle" });