import { client } from "./sanity.client";

export type AnalysisDetailDocument = {
  _id: string;
  title: string;
  date?: string;
  summary?: string;
  content?: any[];
  forestLoss?: number;
  activeAlerts?: number;
  thumbnailUrl?: string;
};

export async function getAnalysisBySlug(
  slug: string,
): Promise<AnalysisDetailDocument | null> {
  const query = `*[_type == "analysis" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    title,
    date,
    summary,
    content,
    forestLoss,
    activeAlerts,
    "thumbnailUrl": thumbnail.asset->url
  }`;

  try {
    const analysis = await client.fetch<AnalysisDetailDocument | null>(query, { slug });
    return analysis ?? null;
  } catch (error) {
    console.error("Error fetching analysis by slug:", error);
    return null;
  }
}
