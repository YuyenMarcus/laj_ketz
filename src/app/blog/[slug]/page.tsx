import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { getBlogBySlug } from "../../../../lib/getBlogBySlug";

export const dynamic = "force-dynamic";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600;

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const url = value.asset.url as string | undefined;
      if (!url) return null;
      return (
        <div className="my-6 overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value.alt || ""} className="h-auto w-full" />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 text-3xl font-bold text-[#0F2B1D] dark:text-[#f0efe9]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 text-2xl font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-4 text-xl font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc space-y-2 pl-6 text-neutral-700 dark:text-neutral-200">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-neutral-700 dark:text-neutral-200">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="text-neutral-700 dark:text-neutral-200">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-semibold text-[#2E8B57] hover:text-[#256b45]"
        >
          {children}
        </Link>
      );
    },
  },
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const publishedDate = blog.date
    ? new Date(blog.date).toLocaleDateString("es-GT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const pdfUrl = blog.documentFile?.url;

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <div className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-[#2E8B57] transition hover:text-[#256b45]"
          >
            ← Volver a la portada
          </Link>
          <Link
            href="/blog"
            className="text-sm font-semibold text-[#2E8B57] transition hover:text-[#256b45]"
          >
            Archivo de historias
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-[#0F2B1D] dark:text-[#f0efe9]">
          {blog.title}
        </h1>
        {publishedDate ? (
          <p className="text-sm text-neutral-500">{publishedDate}</p>
        ) : null}
        {blog.author ? (
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            Por {blog.author}
          </p>
        ) : null}
        {blog.tags && blog.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#2E8B57]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2E8B57]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {blog.thumbnailUrl ? (
        <div className="overflow-hidden rounded-3xl border border-[#6FBF73]/30 shadow-lg">
          <Image
            src={blog.thumbnailUrl}
            alt={blog.title}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      ) : null}

      {blog.summary ? (
        <p className="rounded-2xl bg-[#2E8B57]/10 p-6 text-base text-[#0F2B1D] dark:text-neutral-100">
          {blog.summary}
        </p>
      ) : null}

      {pdfUrl ? (
        <div className="space-y-4 rounded-3xl border border-[#6FBF73]/30 bg-white p-6 shadow-lg dark:bg-[#04150c]">
          <h2 className="text-lg font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
            Vista previa del documento
          </h2>
          <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#6FBF73]/20 bg-neutral-50 dark:bg-white/5">
            <iframe
              src={`${pdfUrl}#view=FitH`}
              title={blog.title}
              className="h-full w-full"
            />
          </div>
        </div>
      ) : null}

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        {blog.content && blog.content.length > 0 ? (
          <PortableText value={blog.content} components={components} />
        ) : pdfUrl ? (
          <p className="text-base text-neutral-600 dark:text-neutral-300">
            Lee el documento incrustado o descárgalo para revisarlo sin conexión.
          </p>
        ) : (
          <p className="text-base text-neutral-600 dark:text-neutral-300">
            Este artículo estará disponible pronto.
          </p>
        )}
      </div>

      {pdfUrl ? (
        <div className="rounded-2xl border border-[#2E8B57]/20 bg-white p-6 shadow-sm dark:bg-[#04150c]">
          <h2 className="text-lg font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
            Descargar artículo
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Guarda la versión completa para leerla offline o compartirla con tu comunidad.
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-full bg-[#2E8B57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256b45]"
          >
            Descargar {blog.documentFile?.originalFilename ?? "documento"}
          </a>
        </div>
      ) : null}
    </article>
  );
}

