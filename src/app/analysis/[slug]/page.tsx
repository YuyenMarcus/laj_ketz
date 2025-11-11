import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { getAnalysisBySlug } from "../../../../lib/getAnalysisBySlug";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type AnalysisPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AnalysisPage({ params }: AnalysisPageProps) {
  const { slug } = await params;
  const analysis = await getAnalysisBySlug(slug);

  if (!analysis) {
    notFound();
  }

  const formattedDate = analysis.date
    ? new Date(analysis.date).toLocaleDateString("es-GT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="text-sm font-semibold text-[#2E8B57] transition hover:text-[#256b45]"
          >
            ← Volver a la portada
          </Link>
          <Link
            href="/cms-test"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2E8B57]"
          >
            Pulso semanal
          </Link>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-[#0F2B1D] dark:text-[#f0efe9]">
            {analysis.title}
          </h1>
          {formattedDate ? (
            <p className="text-sm text-neutral-500">{formattedDate}</p>
          ) : null}
        </div>
      </header>

      {analysis.summary ? (
        <p className="rounded-3xl bg-[#2E8B57]/10 p-6 text-base text-[#0F2B1D] dark:text-neutral-100">
          {analysis.summary}
        </p>
      ) : null}

      {(analysis.forestLoss != null || analysis.activeAlerts != null) && (
        <section className="grid gap-4 rounded-3xl border border-[#6FBF73]/30 bg-white p-6 shadow-lg dark:bg-[#04150c] sm:grid-cols-2">
          {analysis.forestLoss != null ? (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#2E8B57]">
                Pérdida forestal
              </p>
              <p className="text-2xl font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
                {analysis.forestLoss} ha
              </p>
            </div>
          ) : null}
          {analysis.activeAlerts != null ? (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#2E8B57]">
                Alertas activas
              </p>
              <p className="text-2xl font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
                {analysis.activeAlerts}
              </p>
            </div>
          ) : null}
        </section>
      )}

      {analysis.thumbnailUrl ? (
        <div className="overflow-hidden rounded-3xl border border-[#6FBF73]/30 shadow-lg">
          <Image
            src={analysis.thumbnailUrl}
            alt={analysis.title}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <section className="prose prose-neutral max-w-none dark:prose-invert">
        {analysis.content && analysis.content.length > 0 ? (
          <PortableText value={analysis.content} />
        ) : (
          <p className="text-base text-neutral-600 dark:text-neutral-300">
            Este análisis estará disponible pronto. Vuelve a consultar en las próximas horas.
          </p>
        )}
      </section>
    </article>
  );
}
