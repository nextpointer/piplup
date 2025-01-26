import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd(), true);



export default defineConfig({
    schema: "./src/app/db/schema.ts",
    out: "./src/app/db/migrations",
    dialect: "postgresql",
    verbose: true,
    strict: true,
    dbCredentials: {
      url: process.env.DATABASE_URL!,
    },
  });