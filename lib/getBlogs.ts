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
    *[_type == "blog" && defined(slug.current)] | order(coalesce(publishedAt, date) desc) {
      _id,
      title,
      author,
      "date": coalesce(publishedAt, date),
      summary,
      tags,
      "thumbnailUrl": thumbnail.asset->url,
      "slug": slug.current
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

