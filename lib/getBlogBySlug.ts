import { client } from "./sanity.client";

export type BlogDetailDocument = {
  _id: string;
  title: string;
  author?: string;
  date?: string;
  summary?: string;
  tags?: string[];
  thumbnailUrl?: string;
  content?: any[];
  documentFile?: {
    url: string;
    originalFilename?: string;
  } | null;
};

export async function getBlogBySlug(
  slug: string,
): Promise<BlogDetailDocument | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    author,
    "date": coalesce(publishedAt, date),
    summary,
    tags,
    content,
    "thumbnailUrl": thumbnail.asset->url,
    "documentFile": select(
      defined(documentFile) => {
        "url": documentFile.asset->url,
        "originalFilename": documentFile.asset->originalFilename
      },
      null
    )
  }`;

  try {
    const blog = await client.fetch<BlogDetailDocument | null>(query, { slug });
    return blog ?? null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

