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
    <article className="mx-auto max-w-4xl space-y-10 px-6 pb-20 pt-16 lg:px-10">
      <header className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0A361E] transition hover:text-[#052812]"
          >
            ← Volver a la portada
          </Link>
          <Link
            href="/analysis"
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0A361E] transition hover:text-[#052812]"
          >
            Pulso semanal
          </Link>
        </div>
        <div className="space-y-3">
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-[#0F2B1D] sm:text-5xl dark:text-[#f0efe9]">
            {analysis.title}
          </h1>
          {formattedDate ? (
            <p className="text-sm uppercase tracking-[0.35em] text-[#1F5F3A]">
              {formattedDate}
            </p>
          ) : null}
        </div>
      </header>

      {analysis.summary ? (
        <p className="rounded-[32px] bg-[#F3F0E0] p-7 text-sm leading-relaxed text-[#0F2B1D] shadow-inner shadow-[#0A361E]/10 dark:text-neutral-100">
          {analysis.summary}
        </p>
      ) : null}

      {(analysis.forestLoss != null || analysis.activeAlerts != null) && (
        <section className="grid gap-4 rounded-[32px] border border-[#1F5F3A]/15 bg-white/90 p-6 shadow-lg shadow-[#0A361E]/10 dark:bg-[#04150c] sm:grid-cols-2">
          {analysis.forestLoss != null ? (
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#1F5F3A]">
                Pérdida forestal
              </p>
              <p className="font-display text-2xl font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
                {analysis.forestLoss} ha
              </p>
            </div>
          ) : null}
          {analysis.activeAlerts != null ? (
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#1F5F3A]">
                Alertas activas
              </p>
              <p className="font-display text-2xl font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
                {analysis.activeAlerts}
              </p>
            </div>
          ) : null}
        </section>
      )}

      {analysis.thumbnailUrl ? (
        <div className="overflow-hidden rounded-[40px] border border-[#1F5F3A]/15 shadow-xl shadow-[#0A361E]/10">
          <Image
            src={analysis.thumbnailUrl}
            alt={analysis.title}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <section className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-[#0F2B1D] prose-p:text-neutral-600 prose-strong:text-[#0F2B1D] prose-a:text-[#0A361E] dark:prose-invert">
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
