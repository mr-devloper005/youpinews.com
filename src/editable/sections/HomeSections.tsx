import Link from 'next/link'
import {
  ArrowRight, Bookmark, Building2, CheckCircle, ChevronRight,
  FileText, Image as ImageIcon, MapPin, Megaphone, Sparkles,
  Star, Trophy, UserRound, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.7 + (h % 13) / 10) * 10) / 10
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < rounded ? 'fill-[var(--slot4-accent)] text-[var(--slot4-accent)]' : 'fill-[rgba(242,97,63,0.18)] text-[rgba(242,97,63,0.18)]'}`}
        />
      ))}
    </span>
  )
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  return (
    <div className="mt-2 flex items-center gap-2">
      <Stars rating={rating} className="h-3.5 w-3.5" />
      <span className="text-xs font-bold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
      <span className="text-xs text-[var(--slot4-muted-text)]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* ----------------------------- Hero (Shutterfly split panel) ----------------------------- */

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)

  return (
    <section>
      {/* Split hero grid: left dark-maroon text panel + right image collage */}
      <div className="grid min-h-[340px] lg:grid-cols-[0.46fr_0.54fr] lg:min-h-[500px]">

        {/* Left: Dark maroon text panel */}
        <div className="relative flex items-center justify-start overflow-hidden bg-[#481E14] px-8 py-14 sm:px-12 lg:px-16 lg:py-0">
          {/* Subtle diagonal stripe pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, #F2613F 0, #F2613F 1px, transparent 0, transparent 24px)',
              backgroundSize: '36px 36px',
            }}
          />
          <div className="relative z-10 max-w-lg">
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#F2613F]/80">
              {pagesContent.home.hero.badge}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-[1.03] tracking-[-0.03em] text-[#FAF4EF] sm:text-5xl lg:text-[3.2rem]">
              {pagesContent.home.hero.title?.[0]}
              <br />
              <span className="text-[#F2613F]">{pagesContent.home.hero.title?.[1]}</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-[#FAF4EF]/75">
              {pagesContent.home.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={pagesContent.home.hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[#F2613F] px-7 py-3 text-[13px] font-bold text-[#FAF4EF] transition hover:brightness-110 active:scale-[0.98]"
              >
                {pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={pagesContent.home.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#FAF4EF]/30 px-7 py-3 text-[13px] font-bold text-[#FAF4EF] transition hover:bg-[#FAF4EF]/10 active:scale-[0.98]"
              >
                {pagesContent.home.hero.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-6 text-[11px] tracking-wide text-[#FAF4EF]/45">
              Free to list · Verified profiles · Updated daily
            </p>
          </div>
        </div>

        {/* Right: Image collage */}
        <div className="relative min-h-[220px] overflow-hidden bg-[var(--slot4-media-bg)] lg:min-h-0">
          {heroImages.length ? (
            <EditableHeroCollage images={heroImages} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#481E14] via-[#9B3922] to-[#F2613F] opacity-70" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(72,30,20,0.55)_0%,transparent_40%)]" />
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
        <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3.5 ${container}`}>
          <span className="inline-flex items-center gap-2 text-sm text-[var(--slot4-muted-text)]">
            <Star className="h-3.5 w-3.5 fill-[var(--slot4-accent)] text-[var(--slot4-accent)]" /> Verified profiles
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-[var(--slot4-muted-text)]">
            <MapPin className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> Local discovery
          </span>
          <span className="hidden items-center gap-2 text-sm text-[var(--slot4-muted-text)] sm:inline-flex">
            <Zap className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> Updated daily
          </span>
          <Link
            href={primaryRoute}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline"
          >
            Browse {taskLabel(primaryTask).toLowerCase()} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------------------- Browse by category (Shutterfly tile row) ---------------------- */

const CATEGORY_GRADIENTS = [
  'from-[#481E14] to-[#9B3922]',
  'from-[#9B3922] to-[#F2613F]',
  'from-[#221408] to-[#481E14]',
  'from-[#3D1205] to-[#9B3922]',
  'from-[#481E14] to-[#2A1810]',
  'from-[#9B3922]/70 to-[#481E14]',
  'from-[#F2613F]/40 to-[#481E14]',
]

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null

  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`py-12 sm:py-14 ${container}`}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold tracking-[-0.01em] sm:text-2xl">Browse by category</h2>
          <Link
            href={primaryRoute}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Horizontal scroll on mobile, auto-fill grid on desktop */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-[repeat(auto-fill,minmax(130px,1fr))] sm:overflow-visible sm:pb-0 sm:gap-4">
          {categories.map((task, index) => {
            const Icon = taskIcon[task.key] || FileText
            const grad = CATEGORY_GRADIENTS[index % CATEGORY_GRADIENTS.length]
            return (
              <Link
                key={task.key}
                href={task.route}
                className="group flex w-[130px] shrink-0 flex-col overflow-hidden rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/60 hover:shadow-[0_10px_28px_rgba(242,97,63,0.18)] sm:w-auto"
              >
                <div className={`flex h-[110px] w-full items-center justify-center bg-gradient-to-br ${grad} sm:h-[124px]`}>
                  <Icon
                    className="h-11 w-11 text-[#FAF4EF]/90 transition duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="px-3 py-3 text-center">
                  <span className="block text-[12px] font-bold text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
                    {task.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- JUST ADDED! grid ----------------------------- */

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 8)
  if (!activity.length) return null

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--slot4-accent)]">JUST ADDED!</p>
          <h2 className="editable-display mt-3 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            New profiles &amp; images, right now.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {activity.map((post, index) => {
            const image = getEditablePostImage(post)
            const category = categoryOf(post)
            const href = postHref(primaryTask, post, primaryRoute)
            const isNew = index < 4
            return (
              <article key={post.id || post.slug} className="group">
                <Link href={href} className="block">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--slot4-media-bg)]">
                    <img
                      src={image}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.80)_100%)]" />
                    {isNew ? (
                      <span className="absolute left-2.5 top-2.5 rounded-md bg-[#F2613F] px-2 py-0.5 text-[11px] font-black text-white">
                        New!
                      </span>
                    ) : null}
                    {category ? (
                      <span className="absolute right-2.5 top-2.5 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
                        {category}
                      </span>
                    ) : null}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="line-clamp-2 text-[13px] font-bold leading-tight text-white">{post.title}</p>
                    </div>
                  </div>
                </Link>
                <Link href={href} className="mt-2 block text-xs font-semibold text-[var(--slot4-accent)] hover:underline">
                  View →
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={primaryRoute}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-8 py-3 text-[13px] font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based discovery sections -------------------- */

function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_8px_24px_rgba(242,97,63,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-accent)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--slot4-on-accent)]">
            {category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug tracking-tight text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section
            key={section.key}
            className={index % 2 === 0 ? 'bg-[var(--slot4-surface-bg)]' : 'bg-[var(--slot4-panel-bg)]'}
          >
            <div className={`py-12 sm:py-14 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">{copy.title}</h2>
                </div>
                <Link
                  href={section.href || primaryRoute}
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline"
                >
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ----------- CTA: "Experience the Difference" 3-col + orange band ----------- */

export function EditableHomeCta() {
  return (
    <section>
      {/* "Experience the Difference" 3-column section */}
      <div className="border-y border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
        <div className={`py-16 sm:py-20 ${container}`}>
          <h2 className="editable-display text-center text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Experience the {SITE_CONFIG.name} Difference
          </h2>
          <div className="mt-12 grid gap-0 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'Connect your way',
                description: 'Find exactly the right business, profile, or service. Browse by category, location, or keyword.',
              },
              {
                icon: CheckCircle,
                title: '100% free listing',
                description: 'List your business with no fees, no contracts, no credit card needed. Start growing today.',
              },
              {
                icon: Trophy,
                title: 'Quality profiles',
                description: 'Every listed profile is reviewed for quality. Browse with confidence and connect directly.',
              },
            ].map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className={`flex flex-col items-center px-8 py-10 text-center ${
                  i < 2 ? 'border-b border-[var(--editable-border)] sm:border-b-0 sm:border-r' : ''
                }`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)]">
                  <Icon className="h-8 w-8 text-[var(--slot4-accent)]" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-[17px] font-extrabold text-[var(--slot4-page-text)]">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--slot4-muted-text)]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orange CTA band */}
      <div className="bg-[var(--slot4-accent)]">
        <div className={`flex flex-col items-center gap-6 py-14 text-center sm:py-16 ${container}`}>
          <h2 className="editable-display max-w-xl text-3xl font-extrabold tracking-[-0.02em] text-[var(--slot4-on-accent)] sm:text-4xl">
            List your business free — reach real customers.
          </h2>
          <p className="max-w-lg text-base text-[var(--slot4-on-accent)]/80">
            Add your profile, showcase your services, and connect with thousands looking for exactly what you offer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-bg)] px-8 py-3.5 text-sm font-black text-[var(--slot4-accent)] transition hover:brightness-105 active:scale-[0.98]"
            >
              List Your Business Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-on-accent)]/40 px-8 py-3.5 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:bg-[var(--slot4-on-accent)]/10 active:scale-[0.98]"
            >
              Browse Directory
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
