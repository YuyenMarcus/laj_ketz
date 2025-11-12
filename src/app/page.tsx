import LajKetzHome from "../components/LajKetzHome";
import { getAnalyses } from "../../lib/getAnalyses";
import type { AnalysisDocument } from "../../lib/getAnalyses";
import { getBlogs } from "../../lib/getBlogs";
import type { BlogDocument } from "../../lib/getBlogs";
import { getVlogs } from "../../lib/getVlogs";
import type { VlogDocument } from "../../lib/getVlogs";

const mockHero = {
  title: "La selva respira: cada scroll revela su lucha.",
  subtitle:
    "El Pulso Selva traduce alertas satelitales, voces juveniles y microacciones que puedes activar en minutos.",
  ctaUrl: "/analysis/latest",
  ctaText: "Leer el análisis de esta semana",
  backgroundImage: "/hero.jpg",
  stats: {
    forestLoss: "312",
    alerts: "3",
    posts: 5,
  },
};

const mockHeroEn = {
  title: "The rainforest breathes — every scroll uncovers its struggle.",
  subtitle:
    "The Selva Pulse distills satellite anomalies, youth patrol intel, and actions you can take in minutes.",
  ctaUrl: "/analysis/latest",
  ctaText: "Read this week's analysis",
  backgroundImage: "/hero.jpg",
  stats: {
    forestLoss: "312",
    alerts: "3",
    posts: 5,
  },
};

const mockPosts = [
  {
    id: "post-1",
    title: "Selva Maya 101: lo esencial para jóvenes",
    excerpt:
      "Por qué la Selva Maya es clave para el clima, la biodiversidad y las comunidades que la defienden a diario.",
    slug: "selva-maya-101",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    author: "Equipo Laj Ketz",
    date: new Date().toISOString(),
  },
  {
    id: "post-2",
    title: "Cómo fortalecer el ecoturismo comunitario en Petén",
    excerpt:
      "Cinco acciones concretas para que el turismo regenere bosque y apoye a guías jóvenes.",
    slug: "support-community-ecotourism",
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    author: "Camila Ajpop",
    date: new Date().toISOString(),
  },
  {
    id: "post-3",
    title: "Juventud en patrulla: Sky Patrol Mirador",
    excerpt:
      "Conoce al equipo que usa drones y TikTok para resguardar sitios arqueológicos y bordes de selva.",
    slug: "teen-spotlight-mirador",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    author: "Diego Ku",
    date: new Date().toISOString(),
  },
];

const mockPostsEn = [
  {
    id: "post-en-1",
    title: "Selva Maya 101: What teens need to know",
    excerpt:
      "Why the Selva Maya matters for climate resilience, biodiversity, and community-led stewardship.",
    slug: "selva-maya-101-en",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    author: "Laj Ketz Team",
    date: new Date().toISOString(),
  },
  {
    id: "post-en-2",
    title: "Supporting community ecotourism in Petén",
    excerpt:
      "Five actionable steps to keep conservation funding local and amplify youth guides.",
    slug: "support-community-ecotourism-en",
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    author: "Camila Ajpop",
    date: new Date().toISOString(),
  },
  {
    id: "post-en-3",
    title: "Teen spotlight: Mirador Sky Patrol",
    excerpt:
      "Meet the crew using drones and TikTok to protect archaeological sites and rainforest edges.",
    slug: "teen-spotlight-mirador-en",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    author: "Diego Ku",
    date: new Date().toISOString(),
  },
];

const mockAnalyses = [
  {
    id: "analysis-1",
    range: "Semana del 10 de noviembre",
    title: "Pico de pérdida forestal cerca de Carmelita",
    summary:
      "La tala ilegal subió 13% vs la semana anterior. Brigadas juveniles frenaron la expansión cerca de zonas núcleo.",
    slug: "forest-loss-spike-carmelita",
  },
  {
    id: "analysis-2",
    range: "Semana del 10 de noviembre",
    title: "Cuellos de botella en el corredor del jaguar",
    summary:
      "Los datos satelitales muestran puntos críticos donde se pierden pasos de fauna. Detallamos prioridades de incidencia.",
    slug: "jaguar-corridor-pinch-points",
  },
  {
    id: "analysis-3",
    range: "Semana del 10 de noviembre",
    title: "Ecoturismo comunitario despega en Uaxactún",
    summary:
      "Nuevos fondos forman a 30 guías adolescentes con equipo y mentoría para turismo responsable.",
    slug: "community-ecotourism-wins-uaxactun",
  },
];

const mockAnalysesEn = [
  {
    id: "analysis-en-1",
    range: "Week of Nov 10",
    title: "Forest loss spike around Carmelita",
    summary:
      "Illegal clearing surged 13% week-over-week. Youth fire brigades stopped expansion near protected zones.",
    slug: "forest-loss-spike-carmelita-en",
  },
  {
    id: "analysis-en-2",
    range: "Week of Nov 10",
    title: "Jaguar corridor pinch points",
    summary:
      "Satellite data reveals hotspots where wildlife crossings are disappearing. Advocacy targets outlined.",
    slug: "jaguar-corridor-pinch-points-en",
  },
  {
    id: "analysis-en-3",
    range: "Week of Nov 10",
    title: "Community ecotourism wins in Uaxactún",
    summary:
      "New funding supports 30 teen guides with training and equipment to host responsible travel.",
    slug: "community-ecotourism-wins-uaxactun-en",
  },
];

const mockVideos = [
  {
    title: "Pulso Selva — Semana 1",
    excerpt:
      "Resumen rápido de alertas de deforestación, patrullas juveniles y acciones que puedes amplificar hoy.",
    thumbnail: "https://img.youtube.com/vi/Scxs7L0vhZ4/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Scxs7L0vhZ4",
    preview: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
  },
];

const mockVideosEn = [
  {
    title: "Selva Maya watch — Week 1 rundown",
    excerpt:
      "Quick hits on deforestation alerts, youth patrol updates, and how you can amplify community needs right now.",
    thumbnail: "https://img.youtube.com/vi/Scxs7L0vhZ4/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Scxs7L0vhZ4",
    preview: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
  },
];

const mockTimeline = [
  { label: "Deforestación", change: "+4% vs. la semana pasada", direction: "up" as const },
  { label: "Alertas activas", change: "-1% esta semana", direction: "down" as const },
  { label: "Biodiversidad", change: "↔ avistamientos estables", direction: "flat" as const },
];

const mockTimelineEn = [
  { label: "Deforestation", change: "+4% vs last week", direction: "up" as const },
  { label: "Active alerts", change: "-1% this week", direction: "down" as const },
  { label: "Biodiversity", change: "↔ stable sightings", direction: "flat" as const },
];

const mockSnapshot = [
  {
    id: "forest",
    label: "Cobertura monitoreada",
    value: "312 ha impactadas",
    trend: "+4% semana vs semana",
    direction: "up" as const,
    description: "Focos mayores cerca de Carmelita y Naachtún",
    icon: "🌳",
  },
  {
    id: "alerts",
    label: "Alertas comunitarias",
    value: "3 patrullas activas",
    trend: "-1 vs semana previa",
    direction: "down" as const,
    description: "Brigadas juveniles contuvieron dos líneas de fuego nocturnas",
    icon: "🛡️",
  },
  {
    id: "wildlife",
    label: "Biodiversidad clave",
    value: "5 especies prioritarias",
    trend: "↔ avistamientos estables",
    direction: "flat" as const,
    description: "Nidos de guacamaya roja monitoreados en la Cuenca del Mirador",
    icon: "🦜",
  },
];

const mockSnapshotEn = [
  {
    id: "forest",
    label: "Satellite canopy watch",
    value: "312 ha impacted",
    trend: "+4% week over week",
    direction: "up" as const,
    description: "Largest clusters near Carmelita & Naachtún",
    icon: "🌳",
  },
  {
    id: "alerts",
    label: "Community alert crews",
    value: "3 patrols mobilized",
    trend: "-1 vs last week",
    direction: "down" as const,
    description: "Youth brigades contained two fire lines overnight",
    icon: "🛡️",
  },
  {
    id: "wildlife",
    label: "Biodiversity spotlight",
    value: "5 priority species",
    trend: "↔ sightings steady",
    direction: "flat" as const,
    description: "Scarlet macaw nests monitored around Mirador Basin",
    icon: "🦜",
  },
];

const FALLBACK_ANALYSIS_SUMMARY_ES =
  "Actualización en curso — prontamente liberaremos los detalles del campo.";
const FALLBACK_ANALYSIS_SUMMARY_EN =
  "Update in progress — full field notes arrive shortly.";

const partnerLogos = [
  {
    name: "WCS Guatemala",
    logo: "https://logo.clearbit.com/wcs.org",
    url: "https://guatemala.wcs.org/",
  },
  {
    name: "Rainforest Alliance",
    logo: "https://logo.clearbit.com/rainforest-alliance.org",
    url: "https://www.rainforest-alliance.org/",
  },
  {
    name: "CONAP Guatemala",
    logo: "https://logo.clearbit.com/conap.gob.gt",
    url: "https://www.conap.gob.gt/",
  },
  {
    name: "WWF Mesoamérica",
    logo: "https://logo.clearbit.com/wwf.org",
    url: "https://www.wwfca.org/",
  },
];

const ICONS = ["🌳", "🛡️", "🦜"];

export const revalidate = 60;

function formatDate(value: string | undefined, locale: string) {
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

export default async function Page() {
  const [analyses, blogs, vlogs] = await Promise.all([
    getAnalyses(),
    getBlogs(),
    getVlogs(),
  ]);

  const hasAnalyses = analyses.length > 0;
  const hasBlogs = blogs.length > 0;
  const hasVlogs = vlogs.length > 0;

  const mappedPosts = blogs
    .filter((blog: BlogDocument) => Boolean(blog.slug))
    .map((blog: BlogDocument) => ({
      id: blog._id,
      title: blog.title,
      excerpt:
        blog.summary?.trim().length ? blog.summary : "Resumen en redacción — vuelve pronto.",
      slug: blog.slug!,
      image:
        blog.thumbnailUrl ??
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      author: blog.author ?? "Laj Ketz",
      date: blog.date ?? new Date().toISOString(),
    }));

  const posts = mappedPosts.length > 0 ? mappedPosts : mockPosts;

  const heroCandidate = analyses.find(
    (analysis) => (analysis.summary?.trim().length ?? 0) > 80 && analysis.slug,
  );

  const hero = heroCandidate
    ? {
        title: heroCandidate.title ?? mockHero.title,
        subtitle: heroCandidate.summary!,
        ctaUrl: `/analysis/${heroCandidate.slug}`,
        ctaText: "Leer el análisis de esta semana",
        backgroundImage: "/hero.jpg",
        stats: {
          forestLoss:
            heroCandidate.forestLoss != null
              ? `${heroCandidate.forestLoss} ha`
              : mockHero.stats.forestLoss,
          alerts:
            heroCandidate.activeAlerts != null
              ? `${heroCandidate.activeAlerts}`
              : mockHero.stats.alerts,
          posts: mappedPosts.length || mockHero.stats.posts,
        },
      }
    : mockHero;

  const analysesData = hasAnalyses
    ? analyses
        .filter((analysis: AnalysisDocument) => Boolean(analysis.slug))
        .map((analysis: AnalysisDocument) => ({
          id: analysis._id,
          range:
            formatDate(analysis.date, "es-GT") ?? "Fecha no disponible",
          title: analysis.title,
          summary:
            analysis.summary?.trim().length
              ? analysis.summary!
              : FALLBACK_ANALYSIS_SUMMARY_ES,
          slug: analysis.slug!,
        }))
    : mockAnalyses;

  const videos = hasVlogs
    ? vlogs.slice(0, 3).map((vlog: VlogDocument) => ({
        title: vlog.title,
        excerpt: vlog.summary ?? "Video disponible próximamente",
        thumbnail: vlog.thumbnailUrl ?? undefined,
        url: vlog.videoUrl ?? "#",
        preview: undefined,
      }))
    : mockVideos;

  const snapshotRaw = hasAnalyses
    ? analyses
        .filter((analysis): analysis is AnalysisDocument & { slug: string } => Boolean(analysis.slug))
        .slice(0, 3)
        .map((analysis: AnalysisDocument, index: number) => ({
          id: analysis._id,
          label: analysis.title ?? `Análisis ${index + 1}`,
          value:
            analysis.forestLoss != null
              ? `${analysis.forestLoss} ha impactadas`
              : FALLBACK_ANALYSIS_SUMMARY_ES,
          trend:
            analysis.activeAlerts != null
              ? `${analysis.activeAlerts} alertas activas`
              : FALLBACK_ANALYSIS_SUMMARY_ES,
          direction: "flat" as const,
          description:
            analysis.summary?.trim().length
              ? analysis.summary!
              : FALLBACK_ANALYSIS_SUMMARY_ES,
          icon: ICONS[index % ICONS.length],
        }))
    : [];

  const timelineRaw = hasAnalyses
    ? analyses
        .filter((analysis): analysis is AnalysisDocument & { slug: string } => Boolean(analysis.slug))
        .slice(0, 3)
        .map((analysis: AnalysisDocument, index: number) => ({
          label: analysis.title ?? `Historia ${index + 1}`,
          change:
            analysis.summary?.trim().length
              ? analysis.summary!
              : FALLBACK_ANALYSIS_SUMMARY_ES,
          direction: "flat" as const,
        }))
    : [];

  const snapshot = snapshotRaw.length
    ? [...snapshotRaw, ...mockSnapshot].slice(0, 3)
    : mockSnapshot;

  const timeline = timelineRaw.length
    ? [...timelineRaw, ...mockTimeline].slice(0, 3)
    : mockTimeline;

  const englishHero = heroCandidate
    ? {
        title: heroCandidate.title ?? mockHeroEn.title,
        subtitle: heroCandidate.summary!,
        ctaUrl: `/analysis/${heroCandidate.slug}`,
        ctaText: "Read this week's analysis",
        backgroundImage: "/hero.jpg",
        stats: hero.stats,
      }
    : mockHeroEn;

  const analysesEn = hasAnalyses
    ? analyses
        .filter((analysis: AnalysisDocument) => Boolean(analysis.slug))
        .map((analysis: AnalysisDocument) => ({
          id: analysis._id,
          range: formatDate(analysis.date, "en-US") ?? "Date unavailable",
          title: analysis.title,
          summary:
            analysis.summary?.trim().length
              ? analysis.summary!
              : FALLBACK_ANALYSIS_SUMMARY_EN,
          slug: analysis.slug!,
        }))
    : mockAnalysesEn;

  const postsEn = mappedPosts.length > 0 ? mappedPosts : mockPostsEn;

  const snapshotEnRaw = hasAnalyses
    ? analyses
        .filter((analysis): analysis is AnalysisDocument & { slug: string } => Boolean(analysis.slug))
        .slice(0, 3)
        .map((analysis: AnalysisDocument, index: number) => ({
          id: analysis._id,
          label: analysis.title ?? `Story ${index + 1}`,
          value:
            analysis.forestLoss != null
              ? `${analysis.forestLoss} ha lost`
              : FALLBACK_ANALYSIS_SUMMARY_EN,
          trend:
            analysis.activeAlerts != null
              ? `${analysis.activeAlerts} active alerts`
              : FALLBACK_ANALYSIS_SUMMARY_EN,
          direction: "flat" as const,
          description:
            analysis.summary?.trim().length
              ? analysis.summary!
              : FALLBACK_ANALYSIS_SUMMARY_EN,
          icon: ICONS[index % ICONS.length],
        }))
    : [];

  const timelineEnRaw = hasAnalyses
    ? analyses
        .filter((analysis): analysis is AnalysisDocument & { slug: string } => Boolean(analysis.slug))
        .slice(0, 3)
        .map((analysis: AnalysisDocument, index: number) => ({
          label: analysis.title ?? `Story ${index + 1}`,
          change:
            analysis.summary?.trim().length
              ? analysis.summary!
              : FALLBACK_ANALYSIS_SUMMARY_EN,
          direction: "flat" as const,
        }))
    : [];

  const timelineEn = timelineEnRaw.length
    ? [...timelineEnRaw, ...mockTimelineEn].slice(0, 3)
    : mockTimelineEn;

  const videosEn = hasVlogs ? videos : mockVideosEn;

  const snapshotEn = snapshotEnRaw.length
    ? [...snapshotEnRaw, ...mockSnapshotEn].slice(0, 3)
    : mockSnapshotEn;

  return (
    <LajKetzHome
      hero={hero}
      posts={posts}
      analyses={analysesData}
      videos={videos}
      partners={partnerLogos}
      snapshot={snapshot}
      timeline={timeline}
      defaultLanguage="es"
      localized={{
        en: {
          hero: englishHero,
          posts: postsEn,
          analyses: analysesEn,
          videos: videosEn,
          snapshot: snapshotEn,
          timeline: timelineEn,
        },
      }}
    />
  );
}

