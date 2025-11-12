import { getAnalyses } from "../../../lib/getAnalyses";
import { getBlogs } from "../../../lib/getBlogs";
import { getVlogs } from "../../../lib/getVlogs";

export default async function CmsTestPage() {
  const analyses = await getAnalyses();
  const blogs = await getBlogs();
  const vlogs = await getVlogs();

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold">Sanity CMS Test</h1>
        <p className="mt-2 text-sm text-neutral-600">
          This page fetches analyses from Sanity to confirm the connection before
          wiring them into the homepage sections.
        </p>
      </div>

      {analyses.length === 0 ? (
        <p>
          No analyses found. Publish an entry in Sanity Studio and reload this
          page.
        </p>
      ) : (
        <ul className="space-y-4">
          {analyses.map((item) => (
            <li key={item._id} className="rounded-lg border border-neutral-200 p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-xs text-neutral-500">
                {item.date ? new Date(item.date).toLocaleDateString() : "Sin fecha"}
              </p>
              {item.summary ? (
                <p className="mt-2 text-sm text-neutral-700">{item.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Latest Blogs</h2>
        {blogs.length === 0 ? (
          <p>No blog posts found. Publish one and refresh.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog._id} className="rounded-lg border border-neutral-200 p-4">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-xs text-neutral-500">
                  {blog.date ? new Date(blog.date).toLocaleDateString() : "Sin fecha"}
                </p>
                {blog.summary ? (
                  <p className="mt-2 text-sm text-neutral-700">{blog.summary}</p>
                ) : null}
                {blog.tags && blog.tags.length > 0 ? (
                  <p className="mt-2 text-xs uppercase tracking-wide text-[#0A361E]">
                    {blog.tags.join(", ")}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Latest Vlogs</h2>
        {vlogs.length === 0 ? (
          <p>No vlogs found. Publish one and refresh.</p>
        ) : (
          <ul className="space-y-4">
            {vlogs.map((vlog) => (
              <li key={vlog._id} className="rounded-lg border border-neutral-200 p-4">
                <h3 className="text-lg font-semibold">{vlog.title}</h3>
                <p className="text-xs text-neutral-500">
                  {vlog.date ? new Date(vlog.date).toLocaleDateString() : "Sin fecha"}
                </p>
                {vlog.summary ? (
                  <p className="mt-2 text-sm text-neutral-700">{vlog.summary}</p>
                ) : null}
                {vlog.videoUrl ? (
                  <a
                    href={vlog.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-semibold text-[#0A361E] hover:text-[#052812]"
                  >
                    Ver video →
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

