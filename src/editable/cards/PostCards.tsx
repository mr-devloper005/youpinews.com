import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

/* EditorialFeatureCard — large dark hero card with full-bleed image and gradient overlay */
export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="group block min-w-0 overflow-hidden rounded-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(242,97,63,0.2)]"
    >
      <div className="relative min-h-[480px] bg-[var(--slot4-media-bg)] sm:min-h-[560px] lg:min-h-[620px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,12,0.08)_0%,rgba(12,12,12,0.90)_100%)]" />
        <div className="relative z-10 flex h-full min-h-[480px] flex-col justify-end p-6 sm:min-h-[560px] sm:p-8 lg:min-h-[620px]">
          <span className="mb-4 inline-flex w-fit rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-on-accent)]">
            {label}
          </span>
          <h3 className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            {getEditableExcerpt(post, 190)}
          </p>
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-[var(--slot4-on-accent)] transition group-hover:brightness-110">
            View profile <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* RailPostCard — Shutterfly-style compact card (square image + numbered badge + title below) */
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/50 hover:shadow-[0_10px_28px_rgba(242,97,63,0.15)]`}
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.72)_100%)]" />
        <span className="absolute left-2.5 top-2.5 rounded-md bg-[var(--slot4-accent)] px-2 py-0.5 text-[11px] font-black text-white">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
          {getEditableCategory(post)}
        </p>
        <h3 className="mt-2 line-clamp-3 text-[15px] font-bold leading-snug tracking-tight text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[var(--slot4-muted-text)]">
          {getEditableExcerpt(post, 90)}
        </p>
      </div>
    </Link>
  )
}

/* CompactIndexCard — numbered list item with orange numbered circle */
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className="group block min-w-0 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-200 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_8px_24px_rgba(242,97,63,0.10)]"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[13px] font-black text-[var(--slot4-on-accent)]">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
            <Clock3 className="h-3 w-3" /> {getEditableCategory(post)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-[16px] font-bold leading-snug tracking-tight text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
            {getEditableExcerpt(post, 105)}
          </p>
        </div>
      </div>
    </Link>
  )
}

/* ArticleListCard — horizontal image + text card */
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className="group grid min-w-0 overflow-hidden rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 transition duration-200 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_8px_24px_rgba(242,97,63,0.10)] sm:grid-cols-[200px_minmax(0,1fr)]"
    >
      <div className="relative aspect-[16/12] overflow-hidden rounded-lg bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[170px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="min-w-0 py-3 sm:pl-5 sm:pr-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
          View {String(index + 1).padStart(2, '0')}
        </p>
        <h2 className="mt-2.5 line-clamp-3 text-xl font-black leading-snug tracking-[-0.02em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)] sm:text-2xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">
          {getEditableExcerpt(post, 180)}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)]">
          Open profile <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
