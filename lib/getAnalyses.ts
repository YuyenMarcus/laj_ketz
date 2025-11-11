import { client } from "./sanity.client";

export type AnalysisDocument = {
  _id: string;
  title: string;
  date: string;
  summary?: string;
  forestLoss?: number;
  activeAlerts?: number;
  thumbnailUrl?: string;
};

export async function getAnalyses(): Promise<AnalysisDocument[]> {
  const query = `
    *[_type == "analysis"] | order(date desc) {
      _id,
      title,
      date,
      summary,
      forestLoss,
      activeAlerts,
      "thumbnailUrl": thumbnail.asset->url
    }
  `;

  try {
    const analyses = await client.fetch<AnalysisDocument[]>(query);
    return analyses ?? [];
  } catch (error) {
    console.error("Error fetching analyses:", error);
    return [];
  }
}

