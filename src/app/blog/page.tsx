import Image from "next/image";
import Link from "next/link";

import { getBlogs } from "../../../lib/getBlogs";
import type { BlogDocument } from "../../../lib/getBlogs";

export const revalidate = 3600;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

function formatDate(value: string | undefined, locale = "es-GT") {
  if (!value) return undefined;
  try {
    return new Date(value).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return value;
  }
}

export default async function BlogIndexPage() {
  const blogs = await getBlogs();
  const hasBlogs = blogs.length > 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
      <header className="space-y-4 text-center sm:space-y-5">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Link
            href="/"
            className="text-sm font-semibold text-[#0A361E] transition hover:text-[#052812]"
          >
            ← Volver a la portada
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0A361E]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#0A361E]">
            Archivo de historias
          </span>
          <div className="w-[180px]" />
        </div>
        <h1 className="text-4xl font-extrabold leading-tight text-[#0F2B1D] dark:text-[#f0efe9] sm:text-5xl">
          Historias desde la selva y quienes la defienden
        </h1>
        <p className="mx-auto max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
          Explora todos los reportes, crónicas juveniles y acciones rápidas publicadas
          desde el pulso semanal de la Selva Maya.
        </p>
      </header>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        {hasBlogs ? (
          blogs.map((blog: BlogDocument) => {
            const href = blog.slug ? `/blog/${blog.slug}` : `/blog/${blog._id}`;
            const publishedDate = formatDate(blog.date);
            const tagLine =
              blog.tags && blog.tags.length > 0
                ? blog.tags.slice(0, 2).join(" • ")
                : "Blog";

            return (
              <article
                key={blog._id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#1F5F3A]/20 bg-white shadow-lg shadow-[#0A361E]/10 transition hover:border-[#0A361E]/60 hover:shadow-xl dark:border-[#1F5F3A]/25 dark:bg-[#04150c]"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={blog.thumbnailUrl ?? FALLBACK_IMAGE}
                    alt={blog.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={false}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 px-8 py-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#0A361E]">
                    <span>{tagLine}</span>
                    {publishedDate ? <span>{publishedDate}</span> : null}
                  </div>
                  <h2 className="text-2xl font-semibold leading-snug text-[#0F2B1D] transition group-hover:text-[#0A361E] dark:text-[#f0efe9]">
                    {blog.title}
                  </h2>
                  {blog.summary ? (
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      {blog.summary}
                    </p>
                  ) : null}
                  <div className="mt-auto flex items-center justify-between text-sm font-semibold text-[#0A361E]">
                    <Link href={href} className="inline-flex items-center gap-2">
                      Leer artículo completo →
                    </Link>
                    {blog.documentFileUrl ? (
                      <Link
                        href={blog.documentFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold underline"
                      >
                        Descargar PDF/Doc
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-[#1F5F3A]/30 bg-white/80 p-10 text-center text-sm text-neutral-500 dark:border-[#1F5F3A]/30 dark:bg-white/5">
            Aún no hay historias publicadas. Publica un blog en Sanity Studio y vuelve a
            cargar esta página.
          </div>
        )}
      </section>
    </main>
  );
}
