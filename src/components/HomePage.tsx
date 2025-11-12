import React from "react";

type NavLink = {
  label: string;
  href: string;
};

type Story = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  href: string;
  tag?: string;
};

type SnapshotStat = {
  label: string;
  value: string;
  trendLabel?: string;
  trendDirection?: "up" | "down" | "neutral";
};

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  imageUrl?: string;
  category?: string;
  readTime?: string;
};

type Vlog = {
  title: string;
  videoUrl: string;
  transcriptUrl: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
};

type ActionLink = {
  label: string;
  href: string;
  description: string;
};

type SocialLink = {
  label: string;
  href: string;
};

type FooterLinkGroup = {
  title: string;
  links: NavLink[];
};

type HeroContent = {
  tagline: string;
  subheading: string;
  primaryCta: NavLink;
  secondaryCta?: NavLink;
  highlight?: string;
};

export type HomePageProps = {
  logoText: string;
  navLinks: NavLink[];
  hero: HeroContent;
  topStories: Story[];
  weeklySnapshot: SnapshotStat[];
  latestPosts: BlogPost[];
  featuredVlog: Vlog;
  howToHelp: ActionLink[];
  newsletterAction: {
    actionUrl: string;
    buttonLabel: string;
    description: string;
  };
  footer: {
    description: string;
    linkGroups: FooterLinkGroup[];
    socialLinks: SocialLink[];
    copyright: string;
  };
};

const trendColors: Record<NonNullable<SnapshotStat["trendDirection"]>, string> =
  {
    up: "text-[#1F5F3A]",
    down: "text-red-500",
    neutral: "text-[#0F2B1D]",
  };

const trendIcons: Record<NonNullable<SnapshotStat["trendDirection"]>, string> =
  {
    up: "▲",
    down: "▼",
    neutral: "◆",
  };

const Header: React.FC<{ logoText: string; navLinks: NavLink[] }> = ({
  logoText,
  navLinks,
}) => (
  <header className="sticky top-0 z-20 bg-[#E3E0C9]/95 backdrop-blur-md border-b border-[#1F5F3A]/20">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A361E] text-white font-bold">
          LK
        </span>
        <span className="text-lg font-semibold text-[#0F2B1D]">
          {logoText}
        </span>
      </div>
      <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-[#0F2B1D] hover:text-[#0A361E] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="hidden rounded-full border border-[#0A361E] px-4 py-2 text-sm font-semibold text-[#0A361E] transition hover:bg-[#0A361E] hover:text-white md:block"
        >
          Subscribe
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F5F3A]/40 text-[#0F2B1D] transition hover:border-[#0A361E] hover:text-[#0A361E]"
          aria-label="Search"
        >
          🔍
        </button>
      </div>
    </div>
  </header>
);

const Hero: React.FC<{ content: HeroContent }> = ({ content }) => (
  <section className="bg-[#E3E0C9]">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center">
      <div className="flex-1">
        {content.highlight ? (
          <p className="inline-flex items-center rounded-full bg-[#1F5F3A]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#0A361E]">
            {content.highlight}
          </p>
        ) : null}
        <h1 className="mt-4 text-4xl font-black text-[#0F2B1D] md:text-5xl lg:text-6xl">
          {content.tagline}
        </h1>
        <p className="mt-6 max-w-lg text-lg text-[#0F2B1D]/80">
          {content.subheading}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={content.primaryCta.href}
            className="rounded-full bg-[#0A361E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#052812]"
          >
            {content.primaryCta.label}
          </a>
          {content.secondaryCta ? (
            <a
              href={content.secondaryCta.href}
              className="rounded-full border border-[#0A361E] px-6 py-3 text-sm font-semibold text-[#0A361E] transition hover:bg-[#0A361E] hover:text-white"
            >
              {content.secondaryCta.label}
            </a>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0A361E] p-1 shadow-xl">
          <div className="rounded-[26px] bg-white/95 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0A361E]">
              Weekly Pulse
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#0F2B1D]">
              Selva Maya Watchlist
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-[#0F2B1D]/80">
              <li>
                🌳 <span className="font-semibold">13% spike</span> in illegal
                logging alerts vs. last week.
              </li>
              <li>
                🦜 Scarlet Macaw nests reported near{" "}
                <span className="font-semibold">Reserva Naachtún</span>.
              </li>
              <li>
                🧭 Community patrols expanding to{" "}
                <span className="font-semibold">Mirador Basin</span>.
              </li>
            </ul>
            <a
              href={content.primaryCta.href}
              className="mt-6 inline-flex items-center text-sm font-semibold text-[#0A361E] hover:text-[#052812]"
            >
              Read full briefing →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TopStories: React.FC<{ stories: Story[] }> = ({ stories }) => (
  <section className="bg-white py-14">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-[#0F2B1D]">Top stories</h2>
        <a
          href="/analysis"
          className="text-sm font-semibold text-[#0A361E] hover:text-[#052812]"
        >
          See all analysis →
        </a>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {stories.map((story) => (
          <article
            key={story.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#1F5F3A]/20 bg-[#E3E0C9]/50 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#0A361E]/20">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              {story.tag ? (
                <span className="absolute left-4 top-4 rounded-full bg-[#0A361E] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  {story.tag}
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-lg font-semibold text-[#0F2B1D] group-hover:text-[#0A361E]">
                {story.title}
              </h3>
              <p className="text-sm text-[#0F2B1D]/70">{story.summary}</p>
              <a
                href={story.href}
                className="mt-auto text-sm font-semibold text-[#0A361E] group-hover:text-[#052812]"
              >
                Read story →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const WeeklySnapshot: React.FC<{ stats: SnapshotStat[] }> = ({ stats }) => (
  <section className="bg-[#E3E0C9] py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-[#0F2B1D]">Weekly snapshot</h2>
        <p className="text-sm text-[#0F2B1D]/70">
          Updated every Monday • data sources: WCS, CONAP, NASA FIRMS
        </p>
      </div>
      <dl className="mt-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#1F5F3A]/10"
          >
            <dt className="text-sm font-semibold uppercase tracking-wider text-[#0A361E]">
              {stat.label}
            </dt>
            <dd className="mt-3 text-3xl font-black text-[#0F2B1D]">
              {stat.value}
            </dd>
            {stat.trendLabel && stat.trendDirection ? (
              <p
                className={`mt-3 flex items-center gap-2 text-sm font-medium ${trendColors[stat.trendDirection]}`}
              >
                <span>{trendIcons[stat.trendDirection]}</span>
                {stat.trendLabel}
              </p>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  </section>
);

const LatestPosts: React.FC<{ posts: BlogPost[] }> = ({ posts }) => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-[#0F2B1D]">Latest guides & blogs</h2>
        <a
          href="/blog"
          className="text-sm font-semibold text-[#0A361E] hover:text-[#052812]"
        >
          Explore all →
        </a>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#1F5F3A]/20 bg-[#E3E0C9]/40 transition hover:-translate-y-1 hover:shadow-md"
          >
            {post.imageUrl ? (
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#0A361E]">
                {post.category ? <span>{post.category}</span> : null}
                {post.readTime ? (
                  <span className="text-[#0F2B1D]/60">{post.readTime}</span>
                ) : null}
              </div>
              <h3 className="text-lg font-semibold text-[#0F2B1D] hover:text-[#0A361E]">
                {post.title}
              </h3>
              <p className="text-sm text-[#0F2B1D]/70 line-clamp-3">
                {post.excerpt}
              </p>
              <a
                href={post.href}
                className="mt-auto text-sm font-semibold text-[#0A361E] hover:text-[#052812]"
              >
                Read article →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedVlog: React.FC<{ vlog: Vlog }> = ({ vlog }) => (
  <section className="bg-[#E3E0C9] py-16">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
      <div>
        <div className="aspect-video overflow-hidden rounded-3xl border border-[#1F5F3A]/30 bg-black shadow-lg">
          <iframe
            title={vlog.title}
            src={vlog.videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-[#0A361E]">
          Featured vlog
        </p>
        <h2 className="mt-3 text-2xl font-bold text-[#0F2B1D]">{vlog.title}</h2>
        {vlog.duration ? (
          <p className="mt-2 text-sm text-[#0F2B1D]/60">{vlog.duration}</p>
        ) : null}
        {vlog.description ? (
          <p className="mt-4 text-sm text-[#0F2B1D]/80">{vlog.description}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={vlog.videoUrl}
            className="rounded-full bg-[#0A361E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#052812]"
          >
            Watch on YouTube
          </a>
          <a
            href={vlog.transcriptUrl}
            className="rounded-full border border-[#0A361E] px-5 py-3 text-sm font-semibold text-[#0A361E] transition hover:bg-[#0A361E] hover:text-white"
          >
            Read transcript
          </a>
        </div>
      </div>
    </div>
  </section>
);

const HowToHelp: React.FC<{ actions: ActionLink[] }> = ({ actions }) => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="rounded-3xl bg-gradient-to-br from-[#0A361E] to-[#052812] p-10 text-white shadow-xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E3E0C9]/80">
            Take action
          </p>
          <h2 className="mt-4 text-3xl font-bold">How to help this week</h2>
          <p className="mt-3 text-sm text-[#E3E0C9]/90">
            Pick one micro-action, share the impact, and tag{" "}
            <span className="font-semibold">#WakeUpSelva</span>.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="flex flex-col gap-2 rounded-2xl bg-white/10 p-6 transition hover:bg-white/20"
            >
              <span className="text-lg font-semibold text-white">
                {action.label}
              </span>
              <span className="text-sm text-[#E3E0C9]/90">
                {action.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Newsletter: React.FC<{ action: HomePageProps["newsletterAction"] }> = ({
  action,
}) => (
  <section className="bg-[#E3E0C9] py-16">
    <div className="mx-auto max-w-3xl rounded-3xl border border-[#1F5F3A]/30 bg-white/80 p-10 shadow-sm backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#0A361E]">
        Stay in the loop
      </p>
      <h2 className="mt-4 text-3xl font-bold text-[#0F2B1D]">
        Get the Monday wake-up email
      </h2>
      <p className="mt-3 text-sm text-[#0F2B1D]/80">{action.description}</p>
      <form
        action={action.actionUrl}
        method="post"
        className="mt-6 flex flex-col gap-4 sm:flex-row"
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="flex-1 rounded-full border border-[#1F5F3A]/40 bg-white px-5 py-3 text-sm text-[#0F2B1D] shadow-sm focus:border-[#0A361E] focus:outline-none focus:ring-2 focus:ring-[#1F5F3A]/60"
        />
        <button
          type="submit"
          className="rounded-full bg-[#0A361E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#052812]"
        >
          {action.buttonLabel}
        </button>
      </form>
    </div>
  </section>
);

const Footer: React.FC<{ footer: HomePageProps["footer"] }> = ({ footer }) => (
  <footer className="bg-[#0F2B1D] py-16 text-[#E3E0C9]">
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h3 className="text-2xl font-bold">Laj Ketz</h3>
          <p className="mt-4 max-w-md text-sm text-[#E3E0C9]/80">
            {footer.description}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {footer.linkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#1F5F3A]">
                {group.title}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#E3E0C9]/80">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col justify-between gap-6 border-t border-white/10 pt-6 text-sm text-[#E3E0C9]/60 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          {footer.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#1F5F3A]/40 px-4 py-2 font-semibold text-[#E3E0C9]/80 transition hover:border-[#1F5F3A] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p>{footer.copyright}</p>
      </div>
    </div>
  </footer>
);

export const HomePage: React.FC<HomePageProps> = ({
  logoText,
  navLinks,
  hero,
  topStories,
  weeklySnapshot,
  latestPosts,
  featuredVlog,
  howToHelp,
  newsletterAction,
  footer,
}) => (
  <div className="min-h-screen bg-[#E3E0C9]">
    <Header logoText={logoText} navLinks={navLinks} />
    <main>
      <Hero content={hero} />
      <TopStories stories={topStories} />
      <WeeklySnapshot stats={weeklySnapshot} />
      <LatestPosts posts={latestPosts} />
      <FeaturedVlog vlog={featuredVlog} />
      <HowToHelp actions={howToHelp} />
      <Newsletter action={newsletterAction} />
    </main>
    <Footer footer={footer} />
  </div>
);

export const mockHomePageData: HomePageProps = {
  logoText: "Laj Ketz",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Jungle Guatemala", href: "/jungle-guatemala" },
    { label: "Analysis", href: "/analysis" },
    { label: "Blog", href: "/blog" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Resources", href: "/resources" },
  ],
  hero: {
    tagline: "Wake Up. Save the Selva.",
    subheading:
      "Laj Ketz translates news, videos, and real-world action into things you can actually do — focused on Guatemala's jungles and the people who protect them.",
    primaryCta: { label: "Read this week's analysis", href: "/analysis/latest" },
    secondaryCta: { label: "Join the movement", href: "/get-involved" },
    highlight: "New: Weekly Selva Pulse",
  },
  topStories: [
    {
      id: "1",
      title: "Community fire brigades stop illegal clearing near Carmelita",
      summary:
        "Youth-led brigades worked overnight to contain illegal burns, protecting 250 hectares in the Maya Biosphere Reserve.",
      imageUrl:
        "https://images.unsplash.com/photo-1594737625785-c66858b5373f?auto=format&fit=crop&w=900&q=80",
      href: "/analysis/community-fire-brigades",
      tag: "Alert",
    },
    {
      id: "2",
      title: "Mapping the jaguar corridor across Petén",
      summary:
        "Fresh satellite data reveals pinch points where wildlife crossings are disappearing. Here's where advocacy matters most.",
      imageUrl:
        "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=900&q=80",
      href: "/analysis/jaguar-corridor",
      tag: "Analysis",
    },
    {
      id: "3",
      title: "New ecotourism agreement lifts youth guides in Uaxactún",
      summary:
        "Local cooperatives secure funding to train 30 teen guides, keeping tourism dollars in the community while protecting forests.",
      imageUrl:
        "https://images.unsplash.com/photo-1521292270410-a8c23fba3400?auto=format&fit=crop&w=900&q=80",
      href: "/analysis/uaxactun-ecotourism",
      tag: "Op-Ed",
    },
  ],
  weeklySnapshot: [
    {
      label: "Forest loss this week",
      value: "312 ha",
      trendLabel: "Down 5% vs last week",
      trendDirection: "down",
    },
    {
      label: "Protected areas at risk",
      value: "Mirador Basin, Naachtún, Carmelita",
      trendLabel: "3 active alerts",
      trendDirection: "neutral",
    },
    {
      label: "Wildlife alerts",
      value: "Scarlet Macaw, Baird's Tapir",
      trendLabel: "2 emergency rescues",
      trendDirection: "up",
    },
  ],
  latestPosts: [
    {
      id: "post-1",
      title: "What the Selva Maya means for Guatemala's future",
      excerpt:
        "This launch explainer breaks down why the Selva Maya is ground zero for climate resilience, community rights, and the biodiversity teens are fighting for.",
      href: "/blog/selva-maya-future",
      imageUrl:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      category: "Launch",
      readTime: "6 min read",
    },
    {
      id: "post-2",
      title: "How to support community ecotourism in Petén",
      excerpt:
        "From picking certified lodges to tipping patrollers directly, here are five actionable ways to keep conservation dollars local.",
      href: "/blog/support-ecotourism-peten",
      imageUrl:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80",
      category: "Guide",
      readTime: "5 min read",
    },
    {
      id: "post-3",
      title: "Teen spotlight: the Mirador Sky Patrol",
      excerpt:
        "Meet the crew using drones and TikTok to protect archaeological sites and rainforest edges from illegal logging.",
      href: "/blog/teen-spotlight-mirador",
      imageUrl:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      category: "Spotlight",
      readTime: "4 min read",
    },
  ],
  featuredVlog: {
    title: "Selva Maya watch — Week 1 rundown",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
    transcriptUrl: "/vlog/selva-maya-watch-week-1/transcript",
    description:
      "Quick hits on deforestation alerts, youth patrol updates, and how you can amplify community needs right now.",
    duration: "6:12 min",
  },
  howToHelp: [
    {
      label: "Sign the petition",
      href: "/action/petition-conap-funding",
      description: "Back full funding for CONAP rangers safeguarding Mirador Basin.",
    },
    {
      label: "Donate to brigades",
      href: "/action/donate-community-brigades",
      description: "Equip youth fire brigades with radios, boots, and fuel stipends.",
    },
    {
      label: "Volunteer remotely",
      href: "/action/volunteer-mapathon",
      description: "Join the Selva map-a-thon to flag fresh satellite alerts weekly.",
    },
  ],
  newsletterAction: {
    actionUrl: "/api/newsletter",
    buttonLabel: "Keep me posted",
    description:
      "One high-impact email every Monday: alerts, youth stories, and three clear actions you can take in under five minutes.",
  },
  footer: {
    description:
      "Youth-powered environmental journalism and action alerts for Guatemala's Selva Maya, Petén, and beyond.",
    linkGroups: [
      {
        title: "Explore",
        links: [
          { label: "Jungle Guatemala hub", href: "/jungle-guatemala" },
          { label: "Weekly analysis", href: "/analysis" },
          { label: "Blog & guides", href: "/blog" },
          { label: "Vlog", href: "/vlog" },
        ],
      },
      {
        title: "Get involved",
        links: [
          { label: "Partner with us", href: "/partners" },
          { label: "Submit a tip", href: "/contact" },
          { label: "Youth submissions", href: "/contribute" },
        ],
      },
    ],
    socialLinks: [
      { label: "TikTok", href: "https://www.tiktok.com/@lajketz" },
      { label: "Instagram", href: "https://www.instagram.com/lajketz" },
      { label: "YouTube", href: "https://www.youtube.com/@lajketz" },
      { label: "Threads", href: "https://www.threads.net/@lajketz" },
    ],
    copyright: "© 2025 Laj Ketz. Built for Guatemala's jungle guardians.",
  },
};

export const HomePageDemo = () => <HomePage {...mockHomePageData} />;

