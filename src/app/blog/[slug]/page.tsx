import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import BlogPDF from "../../../components/BlogPDF";
import { getBlogBySlug } from "../../../../lib/getBlogBySlug";

export const dynamic = "force-dynamic";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
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
          className="font-semibold text-[#0A361E] hover:text-[#052812]"
        >
          {children}
        </Link>
      );
    },
  },
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || !blog.title) {
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
    <article className="mx-auto max-w-4xl space-y-10 px-6 pb-20 pt-16 lg:px-10">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0A361E] transition hover:text-[#052812]"
          >
            ← Volver a la portada
          </Link>
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0A361E] transition hover:text-[#052812]"
          >
            Archivo de historias
          </Link>
        </div>
        <h1 className="font-display text-4xl font-semibold leading-[1.05] text-[#0F2B1D] sm:text-5xl dark:text-[#f0efe9]">
          {blog.title}
        </h1>
        {publishedDate ? (
          <p className="text-sm uppercase tracking-[0.35em] text-[#1F5F3A]">
            {publishedDate}
          </p>
        ) : null}
        {blog.author ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Por {blog.author}
          </p>
        ) : null}
        {blog.tags && blog.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#0A361E]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0A361E]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {blog.thumbnailUrl ? (
        <div className="overflow-hidden rounded-3xl border border-[#1F5F3A]/30 shadow-lg">
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
        <p className="rounded-[32px] bg-[#F3F0E0] p-7 text-sm leading-relaxed text-[#0F2B1D] shadow-inner shadow-[#0A361E]/10 dark:text-neutral-100">
          {blog.summary}
        </p>
      ) : null}

      {pdfUrl ? (
        <div className="space-y-4 rounded-[36px] border border-[#1F5F3A]/15 bg-white/90 p-6 shadow-lg shadow-[#0A361E]/10 dark:bg-[#04150c]">
          <h2 className="font-display text-2xl font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
            Vista previa del documento
          </h2>
          <BlogPDF pdfUrl={pdfUrl} />
        </div>
      ) : null}

      <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-[#0F2B1D] prose-p:text-neutral-600 prose-strong:text-[#0F2B1D] prose-a:text-[#0A361E] dark:prose-invert">
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
        <div className="rounded-[32px] border border-[#1F5F3A]/15 bg-white/90 p-6 shadow-lg shadow-[#0A361E]/10 dark:bg-[#04150c]">
          <h2 className="font-display text-xl font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
            Descargar artículo
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Guarda la versión completa para leerla offline o compartirla con tu comunidad.
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0A361E] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#052812]"
          >
            Descargar {blog.documentFile?.originalFilename ?? "documento"}
          </a>
        </div>
      ) : null}
    </article>
  );
}

