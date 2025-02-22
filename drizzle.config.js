import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_KD0mpiJUX5fL@ep-twilight-moon-a8fkajkc-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  }
});
