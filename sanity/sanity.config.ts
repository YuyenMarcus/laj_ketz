import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import analysis from "./schemas/analysis";
import blog from "./schemas/blog";
import vlog from "./schemas/vlog";

export default defineConfig({
  name: "default",
  title: "Laj Ketz Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a9nysmmt",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-10",
  basePath: "/",
  plugins: [deskTool()],
  schema: {
    types: [analysis, blog, vlog],
  },
});

