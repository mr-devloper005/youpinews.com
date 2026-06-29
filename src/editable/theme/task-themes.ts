import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  YoupiNews dark warm task surfaces.

  Every task (archive + detail) shares one cohesive dark identity:
  deep near-black bg, warm orange-red accent (#F2613F), hairline warm-orange
  borders, and DM Sans — a playful geometric sans that fits the directory vibe.
  Per-task copy (kicker / note) still varies so each section keeps a little
  voice, but the visual language is unified. Tokens delivered via --tk-* vars.
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const YOUPI_FONT = "'DM Sans', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: true,
  fontDisplay: YOUPI_FONT,
  fontBody: YOUPI_FONT,
  bg: '#0C0C0C',
  surface: '#1A0E08',
  raised: '#221408',
  text: '#FAF4EF',
  muted: '#B89070',
  line: 'rgba(242,97,63,0.18)',
  accent: '#F2613F',
  accentSoft: 'rgba(242,97,63,0.12)',
  onAccent: '#FAF4EF',
  glow: 'rgba(242,97,63,0.08)',
  radius: '0.625rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Businesses', note: 'Find, compare and connect with local businesses.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and listings, ready to act on.' },
  image: { ...base, kicker: 'Gallery', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Resources', note: 'Curated links and resources worth saving.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'Profiles', note: 'Discover creators, businesses and professional profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
