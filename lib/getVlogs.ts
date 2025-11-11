import { client } from "./sanity.client";

export type VlogDocument = {
  _id: string;
  title: string;
  date: string;
  summary?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
};

export async function getVlogs(): Promise<VlogDocument[]> {
  const query = `
    *[_type == "vlog"] | order(date desc) {
      _id,
      title,
      date,
      summary,
      videoUrl,
      "thumbnailUrl": thumbnail.asset->url
    }
  `;

  try {
    const vlogs = await client.fetch<VlogDocument[]>(query);
    return vlogs ?? [];
  } catch (error) {
    console.error("Error fetching vlogs:", error);
    return [];
  }
}

