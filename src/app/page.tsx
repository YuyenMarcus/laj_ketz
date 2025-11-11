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

const partnerLogos = [
  {
    name: "WCS Guatemala",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/WCS_logo.svg/512px-WCS_logo.svg.png",
    url: "https://guatemala.wcs.org/",
  },
  {
    name: "Rainforest Alliance",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Rainforest_Alliance_logo.svg/512px-Rainforest_Alliance_logo.svg.png",
    url: "https://www.rainforest-alliance.org/",
  },
  {
    name: "CONAP Guatemala",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/CONAP_logo.svg/512px-CONAP_logo.svg.png",
    url: "https://www.conap.gob.gt/",
  },
  {
    name: "WWF Mesoamérica",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/WWF_logo.svg/512px-WWF_logo.svg.png",
    url: "https://www.wwfca.org/",
  },
];

const ICONS = ["🌳", "🛡️", "🦜"];

export const revalidate = 3600;

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
  const heroAnalysis = analyses[0];

  const hero = hasAnalyses
    ? {
        title: heroAnalysis?.title ?? mockHero.title,
        subtitle: heroAnalysis?.summary ?? mockHero.subtitle,
        ctaUrl: heroAnalysis ? `/analysis/${heroAnalysis._id}` : mockHero.ctaUrl,
        ctaText: "Leer el análisis de esta semana",
        backgroundImage: "/hero.jpg",
        stats: {
          forestLoss: heroAnalysis?.forestLoss
            ? `${heroAnalysis.forestLoss} ha`
            : "—",
          alerts: heroAnalysis?.activeAlerts
            ? `${heroAnalysis.activeAlerts}`
            : "—",
          posts: hasBlogs ? blogs.length : mockHero.stats.posts,
        },
      }
    : mockHero;

  const posts = hasBlogs
    ? blogs.slice(0, 6).map((blog: BlogDocument) => ({
        id: blog._id,
        title: blog.title,
        excerpt: blog.summary ?? "",
        slug: blog.slug ?? blog._id,
        image:
          blog.thumbnailUrl ??
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        author: blog.author ?? "Laj Ketz",
        date: blog.date ?? new Date().toISOString(),
      }))
    : [];

  const analysesData = hasAnalyses
    ? analyses.map((analysis: AnalysisDocument) => ({
        id: analysis._id,
        range:
          formatDate(analysis.date, "es-GT") ?? "Fecha no disponible",
        title: analysis.title,
        summary: analysis.summary ?? "",
        slug: analysis._id,
      }))
    : mockAnalyses;

  const videos = hasVlogs
    ? vlogs.slice(0, 3).map((vlog: VlogDocument) => ({
        title: vlog.title,
        excerpt: vlog.summary ?? "",
        thumbnail: vlog.thumbnailUrl ?? undefined,
        url: vlog.videoUrl ?? "#",
        preview: undefined,
      }))
    : mockVideos;

  const snapshot = hasAnalyses
    ? analyses.slice(0, 3).map((analysis: AnalysisDocument, index: number) => ({
        id: analysis._id,
        label: analysis.title ?? `Análisis ${index + 1}`,
        value:
          analysis.forestLoss != null
            ? `${analysis.forestLoss} ha`
            : analysis.summary ?? "Ver detalles",
        trend:
          analysis.activeAlerts != null
            ? `${analysis.activeAlerts} alertas activas`
            : analysis.summary ?? "",
        direction: "flat" as const,
        description: analysis.summary ?? "",
        icon: ICONS[index % ICONS.length],
      }))
    : mockSnapshot;

  const timeline = hasAnalyses
    ? analyses.slice(0, 3).map((analysis: AnalysisDocument, index: number) => ({
        label: analysis.title ?? `Historia ${index + 1}`,
        change: analysis.summary ?? "Actualización disponible",
        direction: "flat" as const,
      }))
    : mockTimeline;

  const englishHero = hasAnalyses
    ? {
        title: heroAnalysis?.title ?? mockHeroEn.title,
        subtitle: heroAnalysis?.summary ?? mockHeroEn.subtitle,
        ctaUrl: heroAnalysis ? `/analysis/${heroAnalysis._id}` : mockHeroEn.ctaUrl,
        ctaText: "Read this week's analysis",
        backgroundImage: "/hero.jpg",
        stats: hero.stats,
      }
    : mockHeroEn;

  const analysesEn = hasAnalyses
    ? analyses.map((analysis: AnalysisDocument) => ({
        id: analysis._id,
        range: formatDate(analysis.date, "en-US") ?? "Date unavailable",
        title: analysis.title,
        summary: analysis.summary ?? "",
        slug: analysis._id,
      }))
    : mockAnalysesEn;

  const postsEn = hasBlogs ? posts : [];

  const snapshotEn = hasAnalyses
    ? analyses.slice(0, 3).map((analysis: AnalysisDocument, index: number) => ({
        id: analysis._id,
        label: analysis.title ?? `Story ${index + 1}`,
        value:
          analysis.forestLoss != null
            ? `${analysis.forestLoss} ha lost`
            : analysis.summary ?? "See details",
        trend:
          analysis.activeAlerts != null
            ? `${analysis.activeAlerts} active alerts`
            : analysis.summary ?? "",
        direction: "flat" as const,
        description: analysis.summary ?? "",
        icon: ICONS[index % ICONS.length],
      }))
    : mockSnapshotEn;

  const timelineEn = hasAnalyses
    ? analyses.slice(0, 3).map((analysis: AnalysisDocument, index: number) => ({
        label: analysis.title ?? `Story ${index + 1}`,
        change: analysis.summary ?? "Update available",
        direction: "flat" as const,
      }))
    : mockTimelineEn;

  const videosEn = hasVlogs ? videos : mockVideosEn;

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

