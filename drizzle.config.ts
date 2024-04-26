import { defineConfig, type Config } from 'drizzle-kit'

export default defineConfig({
 schema: "./src/lib/server/db/schema/*",
  driver: "better-sqlite",
  out: "./src/lib/server/db/drizzle",
  dbCredentials: {
    url: './data/debtstrategy.db',
//     connectionString: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
}) satisfies Config