"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { Sun, Moon, Camera, Leaf } from "lucide-react";

const COLORS = {
  primary: "#2E8B57",
  accent: "#6FBF73",
  beige: "#F7F1E6",
  darkText: "#0F2B1D",
};

const CONTAINER_CLASSES =
  "mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 xl:px-16 2xl:max-w-[1600px]";

type LanguageKey = "es" | "en";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const TIMELINE_VARIANTS: Record<
  NonNullable<TimelineHighlight["direction"]>,
  { text: string; icon: string }
> = {
  up: { text: "text-[#6FBF73]", icon: "▲" },
  down: { text: "text-rose-300", icon: "▼" },
  flat: { text: "text-[#F7F1E6]", icon: "↔" },
};

const SNAPSHOT_VARIANTS: Record<
  NonNullable<SnapshotMetric["direction"]>,
  { text: string; icon: string }
> = {
  up: { text: "text-[#2E8B57]", icon: "▲" },
  down: { text: "text-rose-500", icon: "▼" },
  flat: { text: "text-[#0F2B1D]", icon: "↔" },
};

const directionLabelEs = (direction: "up" | "down" | "flat") => {
  switch (direction) {
    case "up":
      return "Tendencia al alza";
    case "down":
      return "Tendencia a la baja";
    default:
      return "Se mantiene estable";
  }
};

type UIStrings = {
  heroHighlight: string;
  heroPulseLabel: string;
  heroStats: {
    forestLoss: string;
    alerts: string;
    posts: string;
  };
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  headerSubscribe: string;
  weeklySnapshot: {
    title: string;
    subtitle: string;
    seeAll: string;
  };
  postsSection: {
    title: string;
    subtitle: string;
    tag: string;
    empty: string;
    readMore: string;
  };
  vlogSection: {
    title: string;
    badge: string;
    seeAll: string;
    watchCta: string;
    fallbackDescription: string;
    empty: string;
  };
  analysisSection: {
    title: string;
    subtitle: string;
    readMore: string;
    empty: string;
  };
  partnersSection: {
    title: string;
    subtitle: string;
    blurb: string;
    cta: string;
    empty: string;
    newsletter: string;
  };
  cards: {
    readStory: string;
  };
  newsletter: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
  };
  empty: {
    posts: string;
    videos: string;
    analysis: string;
    partners: string;
  };
};

type HeroStats = {
  forestLoss?: string;
  alerts?: string;
  posts?: string | number;
};

type TimelineHighlight = {
  label: string;
  change: string;
  direction?: "up" | "down" | "flat";
};

type SnapshotMetric = {
  id?: string;
  label: string;
  value: string;
  trend?: string;
  direction?: "up" | "down" | "flat";
  description?: string;
  icon?: string;
};

type HeroData = {
  title?: string;
  subtitle?: string;
  ctaUrl?: string;
  ctaText?: string;
  stats?: HeroStats;
  backgroundImage?: string;
};

type PostData = {
  id?: string;
  title?: string;
  excerpt?: string;
  slug?: string;
  image?: string;
  author?: string;
  date?: string;
};

type VideoData = {
  thumbnail?: string;
  title?: string;
  excerpt?: string;
  url?: string;
  preview?: string;
};

type AnalysisData = {
  id?: string;
  range?: string;
  title?: string;
  summary?: string;
  slug?: string;
};

type PartnerData = {
  name?: string;
  logo?: string;
};

type LanguageContent = {
  hero?: HeroData;
  posts?: PostData[];
  analyses?: AnalysisData[];
  videos?: VideoData[];
  partners?: PartnerData[];
  snapshot?: SnapshotMetric[];
  timeline?: TimelineHighlight[];
  strings?: Partial<UIStrings>;
};

const DEFAULT_STRINGS: Record<LanguageKey, UIStrings> = {
  es: {
    heroHighlight: "Pulso de la Selva",
    heroPulseLabel: "Pulso de esta semana",
    heroStats: {
      forestLoss: "Bosque perdido (semana)",
      alerts: "Alertas activas",
      posts: "Nuevas historias",
    },
    heroPrimaryCta: "Leer el análisis de esta semana",
    heroSecondaryCta: "Cómo ayudar",
    headerSubscribe: "Suscríbete",
    weeklySnapshot: {
      title: "Radiografía semanal",
      subtitle:
        "Actualizado cada lunes con alertas satelitales, patrullas comunitarias y biodiversidad.",
      seeAll: "Ver todas las alertas →",
    },
    postsSection: {
      title: "Historias y campo",
      subtitle: "Datos y relatos listos para compartir",
      tag: "Desde el territorio",
      empty:
        "Sin artículos por ahora — conecta tu CMS o añade elementos de ejemplo.",
      readMore: "Leer artículo →",
    },
    vlogSection: {
      title: "Vlog destacado",
      badge: "Vlog desde el territorio",
      seeAll: "Ver todos los videos →",
      watchCta: "Ver en YouTube →",
      fallbackDescription:
        "Video corto con el resumen de la semana y acciones sugeridas.",
      empty: "Sin videos — conecta YouTube o añade embeds.",
    },
    analysisSection: {
      title: "Análisis semanal",
      subtitle: "Contexto basado en datos para lo que importa",
      readMore: "Leer análisis →",
      empty: "Sin análisis disponibles aún.",
    },
    partnersSection: {
      title: "Aliados y credibilidad",
      subtitle: "Organizaciones con las que colaboramos o recomendamos",
      blurb:
        "Respaldado por organizaciones que protegen 1.2M de acres de selva en la Selva Maya y la cuenca amazónica.",
      cta: "Únete al movimiento",
      empty: "Sin aliados registrados.",
      newsletter:
        "Súmate al movimiento: boletín con datos abiertos, historias y acciones clave cada semana.",
    },
    cards: {
      readStory: "Leer historia →",
    },
    newsletter: {
      eyebrow: "Mantente al tanto",
      title: "Recibe el correo de los lunes",
      description:
        "Un correo de alto impacto cada lunes: alertas, historias juveniles y tres acciones en menos de cinco minutos.",
      button: "Quiero recibirlo",
    },
    empty: {
      posts:
        "Sin artículos por ahora — conecta tu CMS o añade elementos de ejemplo.",
      videos: "Sin videos — conecta YouTube o añade embeds.",
      analysis: "Sin análisis disponibles aún.",
      partners: "Sin aliados registrados.",
    },
  },
  en: {
    heroHighlight: "Pulse of the Forest",
    heroPulseLabel: "This week's pulse",
    heroStats: {
      forestLoss: "Forest loss (week)",
      alerts: "Active alerts",
      posts: "New stories",
    },
    heroPrimaryCta: "Read this week's analysis",
    heroSecondaryCta: "How to help",
    headerSubscribe: "Subscribe",
    weeklySnapshot: {
      title: "Weekly snapshot",
      subtitle:
        "Updated every Monday with satellite alerts, community patrol intel, and biodiversity checks.",
      seeAll: "See all alerts →",
    },
    postsSection: {
      title: "Stories & Field Vlog",
      subtitle: "Data and storytelling you can share",
      tag: "From the field",
      empty:
        "No posts yet — connect your CMS or add placeholder items.",
      readMore: "Read article →",
    },
    vlogSection: {
      title: "Featured field vlog",
      badge: "Field vlog",
      seeAll: "See all videos →",
      watchCta: "Watch on YouTube →",
      fallbackDescription:
        "Quick weekly rundown with community voices and actions to take.",
      empty: "No videos yet — connect YouTube or add embeds.",
    },
    analysisSection: {
      title: "Weekly analysis",
      subtitle: "Data-driven context for what matters",
      readMore: "Read analysis →",
      empty: "No analysis available yet.",
    },
    partnersSection: {
      title: "Partners & credibility",
      subtitle: "Organizations we work with or recommend",
      blurb:
        "Supported by organizations protecting 1.2M acres of rainforest across the Selva Maya and Amazon basin.",
      cta: "Join the movement",
      empty: "No partners listed.",
      newsletter:
        "Add your name to the movement — weekly briefs, open data, and action links delivered to your inbox.",
    },
    cards: {
      readStory: "Read story →",
    },
    newsletter: {
      eyebrow: "Stay in the loop",
      title: "Get the Monday wake-up email",
      description:
        "One high-impact email every Monday: alerts, youth stories, and three actions you can take in five minutes.",
      button: "Keep me posted",
    },
    empty: {
      posts: "No posts yet — connect your CMS or add placeholder items.",
      videos: "No videos yet — connect YouTube or add embeds.",
      analysis: "No analysis available yet.",
      partners: "No partners listed.",
    },
  },
};

const mergeStrings = (
  base: UIStrings,
  override?: Partial<UIStrings>,
): UIStrings => {
  if (!override) {
    return base;
  }
  return {
    ...base,
    ...override,
    heroStats: { ...base.heroStats, ...override.heroStats },
    weeklySnapshot: {
      ...base.weeklySnapshot,
      ...override.weeklySnapshot,
    },
    postsSection: {
      ...base.postsSection,
      ...override.postsSection,
    },
    vlogSection: {
      ...base.vlogSection,
      ...override.vlogSection,
    },
    analysisSection: {
      ...base.analysisSection,
      ...override.analysisSection,
    },
    partnersSection: {
      ...base.partnersSection,
      ...override.partnersSection,
    },
    cards: {
      ...base.cards,
      ...override.cards,
    },
    newsletter: {
      ...base.newsletter,
      ...override.newsletter,
    },
    empty: {
      ...base.empty,
      ...override.empty,
    },
  };
};

const DEFAULT_TIMELINE: Record<LanguageKey, TimelineHighlight[]> = {
  es: [
    { label: "Deforestación", change: "+4% vs. la semana pasada", direction: "up" },
    { label: "Alertas activas", change: "-1% esta semana", direction: "down" },
    { label: "Biodiversidad", change: "↔ se mantiene estable", direction: "flat" },
  ],
  en: [
    { label: "Deforestation", change: "+4% vs last week", direction: "up" },
    { label: "Active alerts", change: "-1% this week", direction: "down" },
    { label: "Biodiversity", change: "↔ holding steady", direction: "flat" },
  ],
};

const DEFAULT_SNAPSHOT: Record<LanguageKey, SnapshotMetric[]> = {
  es: [
    {
      id: "forest",
      label: "Vigilancia de dosel satelital",
      value: "312 ha afectadas",
      trend: "+4% semana contra semana",
      direction: "up",
      description: "Mayores focos cerca de Carmelita y Naachtún.",
      icon: "🌳",
    },
    {
      id: "alerts",
      label: "Alertas comunitarias activas",
      value: "3 patrullas movilizadas",
      trend: "-1 alerta vs la semana pasada",
      direction: "down",
      description: "Brigadas juveniles contuvieron dos líneas de fuego.",
      icon: "🛡️",
    },
    {
      id: "wildlife",
      label: "Biodiversidad destacada",
      value: "5 especies prioritarias",
      trend: "↔ avistamientos estables",
      direction: "flat",
      description: "Nidos de guacamaya roja monitoreados en la Cuenca del Mirador.",
      icon: "🦜",
    },
  ],
  en: [
    {
      id: "forest",
      label: "Satellite canopy watch",
      value: "312 ha impacted",
      trend: "+4% week over week",
      direction: "up",
      description: "Largest clusters near Carmelita & Naachtún.",
      icon: "🌳",
    },
    {
      id: "alerts",
      label: "Active community alerts",
      value: "3 patrols mobilized",
      trend: "-1 alert vs last week",
      direction: "down",
      description: "Youth brigades held the line overnight.",
      icon: "🛡️",
    },
    {
      id: "wildlife",
      label: "Biodiversity spotlight",
      value: "5 priority species",
      trend: "↔ stable sightings",
      direction: "flat",
      description: "Scarlet macaw nests monitored along Mirador Basin.",
      icon: "🦜",
    },
  ],
};

export type LajKetzHomeProps = {
  hero?: HeroData;
  posts?: PostData[];
  analyses?: AnalysisData[];
  videos?: VideoData[];
  partners?: PartnerData[];
  snapshot?: SnapshotMetric[];
  timeline?: TimelineHighlight[];
  strings?: Partial<UIStrings>;
  localized?: Partial<Record<LanguageKey, LanguageContent>>;
  defaultLanguage?: LanguageKey;
};

function useDarkMode(): [boolean, (value: boolean) => void] {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("ljk_dark");
    if (saved !== null) {
      const enabled = saved === "1";
      setIsDark(enabled);
      document.documentElement.classList.toggle("dark", enabled);
      return;
    }

    const prefers =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : false;
    setIsDark(prefers);
    document.documentElement.classList.toggle("dark", prefers);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("ljk_dark", isDark ? "1" : "0");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return [isDark, setIsDark];
}

export default function LajKetzHome(props: LajKetzHomeProps = {}) {
  const {
    hero: _hero = {},
    posts: _posts = [],
    analyses: _analyses = [],
    videos: _videos = [],
    partners: _partners = [],
    snapshot: _snapshot = [],
    timeline: _timeline = [],
  } = props || {};

  const localized = props.localized ?? {};
  const baseLanguage = props.defaultLanguage ?? "es";
  const [language, setLanguage] = useState<LanguageKey>(baseLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("lk_lang");
    if (saved === "es" || saved === "en") {
      setLanguage(saved);
    }
  }, [baseLanguage]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("lk_lang", language);
  }, [language]);

  const currentContent = localized[language];

  const baseStrings = mergeStrings(
    DEFAULT_STRINGS[baseLanguage],
    language === baseLanguage ? props.strings : undefined,
  );
  const strings =
    language === baseLanguage
      ? mergeStrings(baseStrings, currentContent?.strings)
      : mergeStrings(DEFAULT_STRINGS[language], currentContent?.strings);

  const hero = (currentContent?.hero ?? _hero) ?? {};
  const posts = Array.isArray(currentContent?.posts)
    ? currentContent.posts!
    : Array.isArray(_posts)
    ? _posts
    : [];
  const analyses = Array.isArray(currentContent?.analyses)
    ? currentContent.analyses!
    : Array.isArray(_analyses)
    ? _analyses
    : [];
  const videos = Array.isArray(currentContent?.videos)
    ? currentContent.videos!
    : Array.isArray(_videos)
    ? _videos
    : [];
  const partners = Array.isArray(currentContent?.partners)
    ? currentContent.partners!
    : Array.isArray(_partners)
    ? _partners
    : [];
  const snapshot = Array.isArray(currentContent?.snapshot)
    ? currentContent.snapshot!
    : Array.isArray(_snapshot)
    ? _snapshot
    : [];
  const timeline = Array.isArray(currentContent?.timeline)
    ? currentContent.timeline!
    : Array.isArray(_timeline)
    ? _timeline
    : [];

  const [isDark, setIsDark] = useDarkMode();
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fogY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fogOpacity = useTransform(scrollYProgress, [0, 1], [0.65, 0.25]);

  const scrollToSection = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const defaultHeroBackground =
    hero.backgroundImage ??
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80";

  const parseValueParts = (raw: string | number | undefined) => {
    if (raw === undefined || raw === null) {
      return { numeric: null, suffix: "" };
    }
    if (typeof raw === "number") {
      return { numeric: raw, suffix: "" };
    }
    const numericMatch = raw.match(/[\d,.]+/);
    const numeric = numericMatch
      ? Number.parseFloat(numericMatch[0].replace(/,/g, ""))
      : null;
    const suffix = raw.replace(/[\d.,\s]/g, "").trim();
    return { numeric, suffix };
  };

  const forestParts = parseValueParts(hero.stats?.forestLoss ?? "312");
  const alertParts = parseValueParts(hero.stats?.alerts ?? "3");
  const postParts = parseValueParts(
    hero.stats?.posts ?? (posts.length > 0 ? posts.length : "5"),
  );

  const heroCounters = [
    {
      label: strings.heroStats.forestLoss,
      value: forestParts.numeric ?? 312,
      suffix: forestParts.suffix || "",
    },
    {
      label: strings.heroStats.alerts,
      value: alertParts.numeric ?? 3,
      suffix: alertParts.suffix || "",
    },
    {
      label: strings.heroStats.posts,
      value: postParts.numeric ?? Math.max(posts.length, 5),
      suffix: postParts.suffix || "",
    },
  ];

  const timelineHighlights =
    timeline.length > 0 ? timeline : DEFAULT_TIMELINE[language];

  const snapshotMetrics =
    snapshot.length > 0 ? snapshot : DEFAULT_SNAPSHOT[language];

  const navItems = [
    { href: "#hero", label: strings.heroHighlight },
    { href: "#weekly-snapshot", label: strings.weeklySnapshot.title },
    { href: "#stories", label: strings.postsSection.title },
    { href: "#weekly-analysis", label: strings.analysisSection.title },
    { href: "#partners", label: strings.partnersSection.title },
  ];

  const darkToggleLabel =
    language === "es" ? "Cambiar modo oscuro" : "Toggle dark mode";

  const footerLinks =
    language === "es"
      ? [
          { href: "/privacy", label: "Aviso de privacidad" },
          { href: "/terms", label: "Términos" },
          { href: "/contact", label: "Contacto" },
        ]
      : [
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
          { href: "/contact", label: "Contact" },
        ];

  const footerCopy =
    language === "es"
      ? `© ${new Date().getFullYear()} Laj Ketz — Despierta por la Selva.`
      : `© ${new Date().getFullYear()} Laj Ketz — Wake Up for the Jungle.`;

  return (
    <div className="min-h-screen bg-beige text-darkText transition-colors dark:bg-[#0b1a12] dark:text-[#f0efe9]">
      <header className="sticky top-0 z-30 border-b border-[#6FBF73]/20 bg-beige/90 backdrop-blur">
        <div className={`${CONTAINER_CLASSES} flex items-center justify-between py-4`}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/60 shadow-sm dark:bg-white/5">
              <Leaf className="text-[#2E8B57] dark:text-[#6FBF73]" />
            </div>
            <Link href="/" className="text-lg font-semibold tracking-wide">
              Laj Ketz
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[#0F2B1D] transition hover:text-[#2E8B57] dark:text-[#f0efe9]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex h-9 items-center overflow-hidden rounded-full border border-[#2E8B57]/40 bg-white/70 text-xs font-semibold text-[#0F2B1D] shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-[#f0efe9]">
                {(["es", "en"] as LanguageKey[]).map((code) => {
                  const isActive = language === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLanguage(code)}
                      className={`relative px-3 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8B57] ${
                        isActive
                          ? "text-white"
                          : "text-[#0F2B1D] dark:text-[#f0efe9] hover:text-[#2E8B57]"
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="relative z-10">{code.toUpperCase()}</span>
                      {isActive ? (
                        <motion.span
                          layoutId="lang-pill"
                          className="absolute inset-0 rounded-full bg-[#2E8B57]"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <button
                aria-label={darkToggleLabel}
                onClick={() => setIsDark(!isDark)}
                className="hidden rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-white/10 lg:inline-flex"
                type="button"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <Link
                href="/subscribe"
                className="hidden items-center gap-2 rounded-full bg-[#2E8B57] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#2E8B57]/30 transition hover:bg-[#256b45] lg:inline-flex"
              >
                <Camera className="h-4 w-4" />
                <span>{strings.headerSubscribe}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className={`${CONTAINER_CLASSES} space-y-20 pb-24 pt-28 md:snap-y md:snap-mandatory`}>
        <motion.section
          id="hero"
          ref={heroSectionRef}
          className="relative overflow-hidden rounded-[40px] bg-[#04150c] text-white shadow-2xl ring-1 ring-[#6FBF73]/20 snap-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${defaultHeroBackground})`,
              y: parallaxY,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04150c]/75 via-[#0f2b1d]/65 to-[#14402a]/55" />
          <motion.div
            className="pointer-events-none absolute -bottom-32 left-0 right-0 h-64 bg-[radial-gradient(circle,rgba(111,191,115,0.35)_0%,rgba(111,191,115,0)_70%)]"
            style={{ opacity: fogOpacity, y: fogY }}
          />
          <div className="relative z-10 flex flex-col gap-12 px-8 py-16 md:px-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-6">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {strings.heroHighlight}
              </motion.span>
              <motion.h1
                className="text-4xl font-black leading-tight sm:text-5xl lg:text-[3.2rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {hero.title ??
                  "La selva pierde 312 árboles por semana. Este es el panorama."}
              </motion.h1>
              <motion.p
                className="text-base leading-relaxed text-white/80 sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {hero.subtitle ??
                  "Laj Ketz convierte alertas satelitales, patrullajes juveniles e historias locales en acciones concretas para la Selva Maya y la red amazónica."}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <button
                  type="button"
                  onClick={() => scrollToSection("weekly-snapshot")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#6FBF73] px-5 py-3 text-sm font-semibold text-[#0F2B1D] shadow-lg shadow-[#6FBF73]/40 transition hover:bg-[#5aa762]"
                >
                  {hero.ctaText ?? strings.heroPrimaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("partners")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white/10"
                >
                  {strings.heroSecondaryCta}
                </button>
              </motion.div>
            </div>
            <motion.div
              className="flex flex-1 flex-col gap-4 rounded-[28px] bg-white/10 p-6 backdrop-blur"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {strings.heroPulseLabel}
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroCounters.map((counter, idx) => (
                  <HeroStatCard
                    key={counter.label}
                    label={counter.label}
                    value={counter.value}
                    suffix={counter.suffix}
                    index={idx}
                    language={language}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="weekly-snapshot"
          className="snap-start rounded-[32px] bg-white p-10 shadow-xl shadow-[#2E8B57]/10 ring-1 ring-[#6FBF73]/15 dark:bg-[#03160d]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-[#0F2B1D] dark:text-[#f0efe9]">
                {strings.weeklySnapshot.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {strings.weeklySnapshot.subtitle}
              </p>
            </div>
            <TimelineStrip
              timeline={timelineHighlights}
              language={language}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {snapshotMetrics.map((metric, index) => (
                <SnapshotMetricCard
                  key={metric.id ?? metric.label}
                  metric={metric}
                  index={index}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToSection("weekly-analysis")}
              className="inline-flex items-center text-sm font-semibold text-[#2E8B57] transition hover:text-[#256b45]"
            >
              {strings.weeklySnapshot.seeAll}
            </button>
          </div>
        </motion.section>

        <motion.section
          id="stories"
          className="snap-start space-y-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeader
            title={strings.postsSection.title}
            subtitle={strings.postsSection.subtitle}
          />
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#2E8B57]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#2E8B57]">
            {strings.postsSection.tag}
          </span>
          <div className="flex flex-col gap-8">
            <div className="flex flex-1 gap-6 overflow-x-auto pb-2 md:snap-x md:snap-mandatory lg:overflow-visible">
              {posts.length > 0 ? (
                posts.map((post, idx) => (
                  <PostCard
                    key={post?.id ?? `post-${idx}`}
                    post={post ?? {}}
                    strings={strings}
                    language={language}
                  />
                ))
              ) : (
                <div className="min-w-full">
                  <EmptyCard message={strings.empty.posts} />
                </div>
              )}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2E8B57]">
                {strings.vlogSection.badge}
              </p>
              {videos.length > 0 ? (
                <VideoCard video={videos[0] ?? {}} strings={strings} />
              ) : (
                <EmptyCard message={strings.vlogSection.empty} />
              )}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="weekly-analysis"
          className="snap-start space-y-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeader
            title={strings.analysisSection.title}
            subtitle={strings.analysisSection.subtitle}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {analyses.length > 0 ? (
              analyses.slice(0, 3).map((analysis, idx) => (
                <AnalysisCard
                  key={analysis?.id ?? `analysis-${idx}`}
                  analysis={analysis ?? {}}
                  strings={strings}
                />
              ))
            ) : (
              <EmptyCard message={strings.analysisSection.empty} />
            )}
          </div>
        </motion.section>

        <motion.section
          id="partners"
          className="snap-start rounded-[32px] bg-white p-10 shadow-xl shadow-[#2E8B57]/10 ring-1 ring-[#6FBF73]/15 dark:bg-[#03160d]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeader
            title={strings.partnersSection.title}
            subtitle={strings.partnersSection.subtitle}
          />
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            {strings.partnersSection.blurb}
          </p>
          <div className="mt-6">
            <PartnersCarousel partners={partners} emptyLabel={strings.partnersSection.empty} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {strings.partnersSection.newsletter}
            </p>
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-2 rounded-full bg-[#2E8B57] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#2E8B57]/30 transition hover:bg-[#256b45]"
            >
              {strings.partnersSection.cta}
            </Link>
          </div>
        </motion.section>
      </main>

      <footer className="mt-12 border-t border-neutral-200 py-8 dark:border-white/5">
        <div className={`${CONTAINER_CLASSES} flex flex-col items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400 md:flex-row`}>
          <p>{footerCopy}</p>
          <div className="flex items-center gap-4">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[#2E8B57]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

type HeroStatCardProps = {
  label: string;
  value: number;
  suffix?: string;
  index?: number;
  language: LanguageKey;
};

function HeroStatCard({
  label,
  value,
  suffix,
  index = 0,
  language,
}: HeroStatCardProps) {
  const delay = 0.2 + index * 0.1;
  return (
    <motion.div
      className="rounded-2xl border border-white/20 bg-white/5 p-4 text-white shadow-lg shadow-black/20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2 text-2xl font-bold">
        <AnimatedCounter value={value} language={language} />
        {suffix ? (
          <span className="text-sm font-semibold text-white/70">{suffix}</span>
        ) : null}
      </div>
    </motion.div>
  );
}

function AnimatedCounter({
  value,
  language,
}: {
  value: number;
  language: LanguageKey;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return () => unsubscribe();
  }, [motionValue]);

  return (
    <span ref={ref} className="tabular-nums tracking-tight">
      {new Intl.NumberFormat(
        language === "es" ? "es-GT" : "en-US",
      ).format(display)}
    </span>
  );
}

type TimelineStripProps = {
  timeline: TimelineHighlight[];
  language: LanguageKey;
};

function TimelineStrip({ timeline, language }: TimelineStripProps) {
  if (!timeline.length) {
    return null;
  }
  return (
    <motion.div
      className="grid gap-4 rounded-[28px] bg-[#0F2B1D] p-6 text-[#F7F1E6] shadow-lg shadow-[#0F2B1D]/40 sm:grid-cols-3"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {timeline.map((item) => {
        const direction = (item.direction ?? "flat") as
          | "up"
          | "down"
          | "flat";
        const variant = TIMELINE_VARIANTS[direction];
        return (
          <div
            key={`${item.label}-${item.change}`}
            className="flex flex-col gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{item.label}</span>
              <span className={`text-base font-bold ${variant.text}`}>
                {variant.icon}
              </span>
            </div>
            <span className={`text-xs font-semibold ${variant.text}`}>
              {item.change}
            </span>
            {language === "es" ? (
              <span className="text-xs text-[#F7F1E6]/70">
                {directionLabelEs(direction)}
              </span>
            ) : null}
          </div>
        );
      })}
    </motion.div>
  );
}

type SnapshotMetricCardProps = {
  metric: SnapshotMetric;
  index: number;
};

function SnapshotMetricCard({ metric, index }: SnapshotMetricCardProps) {
  const direction = (metric.direction ?? "flat") as "up" | "down" | "flat";
  const variant = SNAPSHOT_VARIANTS[direction];
  return (
    <motion.div
      className="group flex h-full flex-col gap-4 rounded-2xl bg-[#F7F1E6] p-6 shadow-lg shadow-[#2E8B57]/10 ring-1 ring-[#6FBF73]/20 transition dark:bg-[#04150c]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{metric.icon ?? "•"}</span>
        <div>
          <p className="text-sm font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
            {metric.label}
          </p>
          {metric.trend ? (
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold ${variant.text}`}
            >
              {variant.icon} {metric.trend}
            </span>
          ) : null}
        </div>
      </div>
      <p className="text-2xl font-bold text-[#0F2B1D] dark:text-white">
        {metric.value}
      </p>
      {metric.description ? (
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {metric.description}
        </p>
      ) : null}
    </motion.div>
  );
}

type PartnersCarouselProps = {
  partners: PartnerData[];
};

function PartnersCarousel({
  partners,
  emptyLabel,
}: PartnersCarouselProps & { emptyLabel: string }) {
  if (!partners.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#6FBF73]/30 bg-white/80 p-6 text-sm text-neutral-500 dark:border-[#6FBF73]/40 dark:bg-white/5">
        {emptyLabel}
      </div>
    );
  }

  const marqueePartners =
    partners.length >= 4 ? [...partners, ...partners] : [...partners, ...partners, ...partners];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#6FBF73]/20 bg-white/70 p-4 dark:border-[#6FBF73]/25 dark:bg-[#04150c]">
      <motion.div
        className="flex items-center gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {marqueePartners.map((partner, idx) => (
          <div
            key={`${partner?.name ?? "partner"}-${idx}`}
            className="flex min-w-[160px] items-center gap-3 rounded-xl border border-[#6FBF73]/20 bg-white/90 px-5 py-3 shadow-sm dark:border-[#6FBF73]/30 dark:bg-[#04150c]"
          >
            {partner?.logo ? (
              <Image
                src={partner.logo}
                alt={`${partner?.name ?? "Partner"} logo`}
                width={56}
                height={40}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div className="h-10 w-14 rounded bg-neutral-100 dark:bg-white/10" />
            )}
            <span className="text-sm font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
              {partner?.name ?? "Partner"}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-[#0F2B1D] dark:text-[#f0efe9]">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type PostCardProps = {
  post: PostData;
  strings: UIStrings;
  language: LanguageKey;
};

function PostCard({
  post = {} as PostData,
  strings,
  language,
}: PostCardProps) {
  const title = post?.title ?? "Untitled";
  const excerpt = post?.excerpt ?? "";
  const slug = post?.slug ?? "";
  const image = post?.image ?? null;
  const author = post?.author ?? "Laj Ketz";
  const locale = language === "es" ? "es-GT" : "en-US";
  const dateDisplay =
    post?.date != null
      ? (() => {
          try {
            return new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          } catch (error) {
            console.warn("Invalid date value provided to PostCard", error);
            return "";
          }
        })()
      : "";

  return (
    <motion.article
      className="group min-w-[260px] overflow-hidden rounded-2xl bg-white shadow-lg shadow-[#2E8B57]/10 ring-1 ring-[#6FBF73]/20 transition dark:bg-[#04150c] md:snap-center"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <Link href={slug ? `/blog/${slug}` : "#"} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 768px) 50vw, 90vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-neutral-100 dark:bg-white/10" />
          )}
        </div>

        <div className="space-y-3 px-6 pb-6 pt-5">
          <h3 className="text-lg font-semibold leading-tight text-[#0F2B1D] transition group-hover:text-[#2E8B57] dark:text-[#f0efe9]">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span>{author}</span>
            <span>{dateDisplay}</span>
          </div>
          <span className="inline-flex items-center text-sm font-semibold text-[#2E8B57]">
            {strings.postsSection.readMore}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

type VideoCardProps = {
  video: VideoData;
  strings: UIStrings;
};

function VideoCard({ video = {} as VideoData, strings }: VideoCardProps) {
  const thumbnail = video?.thumbnail ?? null;
  const title = video?.title ?? "Untitled video";
  const excerpt =
    video?.excerpt ?? strings.vlogSection.fallbackDescription;
  const url = video?.url ?? "#";
  const preview = video?.preview ?? null;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.6, once: false });

  useEffect(() => {
    if (!preview) return;
    const node = videoRef.current;
    if (!node) return;
    if (isInView) {
      const playPromise = node.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      node.pause();
    }
  }, [isInView, preview]);

  const handlePlay = () => {
    if (!preview) return;
    videoRef.current?.play().catch(() => {});
  };

  const handlePause = () => {
    if (!preview) return;
    videoRef.current?.pause();
  };

  return (
    <motion.div
      ref={containerRef}
      className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-[#2E8B57]/10 ring-1 ring-[#6FBF73]/20 transition hover:-translate-y-1 dark:bg-[#04150c]"
      whileHover={{ y: -6 }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        {preview ? (
          <video
            ref={videoRef}
            src={preview}
            poster={thumbnail ?? undefined}
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            onMouseEnter={handlePlay}
            onFocus={handlePlay}
            onMouseLeave={handlePause}
            onBlur={handlePause}
          />
        ) : thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-neutral-100 dark:bg-white/10" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {strings.vlogSection.badge}
        </div>
      </div>
      <div className="space-y-3 px-5 pb-6 pt-5">
        <h4 className="text-lg font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
          {title}
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{excerpt}</p>
        <Link
          href={url}
          className="inline-flex items-center text-sm font-semibold text-[#2E8B57] transition hover:text-[#256b45]"
        >
          {strings.vlogSection.watchCta}
        </Link>
      </div>
    </motion.div>
  );
}

type AnalysisCardProps = {
  analysis: AnalysisData;
  strings: UIStrings;
};

function AnalysisCard({
  analysis = {} as AnalysisData,
  strings,
}: AnalysisCardProps) {
  const range = analysis?.range ?? "";
  const title = analysis?.title ?? "Analysis";
  const summary = analysis?.summary ?? "";
  const slug = analysis?.slug ?? "";

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-lg shadow-[#2E8B57]/10 ring-1 ring-[#6FBF73]/20 transition hover:-translate-y-1 dark:bg-[#04150c]">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2E8B57]/70 dark:text-[#6FBF73]">
          {range}
        </p>
        <h3 className="text-lg font-semibold text-[#0F2B1D] dark:text-[#f0efe9]">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{summary}</p>
      </div>
      <Link
        href={slug ? `/analysis/${slug}` : "#"}
        className="mt-6 inline-flex items-center text-sm font-semibold text-[#2E8B57] transition hover:text-[#256b45]"
      >
        {strings.analysisSection.readMore}
      </Link>
    </article>
  );
}

type EmptyCardProps = {
  message: string;
};

function EmptyCard({ message }: EmptyCardProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#2E8B57]/30 bg-white/70 p-6 text-sm text-neutral-500 dark:border-[#6FBF73]/40 dark:bg-white/5">
      {message}
    </div>
  );
}

