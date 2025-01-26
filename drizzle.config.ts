import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/app/db/schema.ts",
    out: "./src/app/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.DATABASE_URL!,
    },
  });