import { client } from "./sanity.client";

export type BlogDocument = {
  _id: string;
  title: string;
  date: string;
  author?: string;
  summary?: string;
  tags?: string[];
  thumbnailUrl?: string;
  slug?: string;
};

export async function getBlogs(): Promise<BlogDocument[]> {
  const query = `
    *[_type == "blog"] | order(date desc) {
      _id,
      title,
      date,
      author,
      summary,
      tags,
      "slug": slug.current,
      "thumbnailUrl": thumbnail.asset->url
    }
  `;

  try {
    const blogs = await client.fetch<BlogDocument[]>(query);
    return blogs ?? [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

