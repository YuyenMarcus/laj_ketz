import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "a9nysmmt",
  dataset: "production",
  apiVersion: "2025-11-10",
  useCdn: true,
});

export const client = sanityClient;

