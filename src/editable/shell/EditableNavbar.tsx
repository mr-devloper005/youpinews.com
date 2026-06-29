'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const ANNOUNCEMENTS = [
  'New profiles added daily — discover fresh businesses today',
  'Free to list your business · No credit card needed',
  '500+ verified business profiles and growing',
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [annIdx, setAnnIdx] = useState(0)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'image' && task.key !== 'profile').slice(0, 6).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  const prevAnn = () => setAnnIdx((i) => (i - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)
  const nextAnn = () => setAnnIdx((i) => (i + 1) % ANNOUNCEMENTS.length)

  return (
    <header className="sticky top-0 z-50">
      {/* Tier 1 — Announcement ticker */}
      <div className="flex min-h-[36px] items-center justify-center gap-3 border-b border-[var(--editable-border)] bg-[#0C0C0C] px-4">
        <button
          type="button"
          onClick={prevAnn}
          className="shrink-0 text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-center text-[12px] font-medium text-[var(--slot4-page-text)]">
          {ANNOUNCEMENTS[annIdx]}
          {annIdx === 1 && (
            <>
              {' · '}
              <Link href="/create" className="font-bold text-[var(--slot4-accent)] underline-offset-2 hover:underline">
                Get started
              </Link>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={nextAnn}
          className="shrink-0 text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
          aria-label="Next announcement"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tier 2 — Logo + search + auth */}
      <div className="border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]">
        <div className="mx-auto flex min-h-[64px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="mr-4 flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--slot4-accent)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-6 w-6 object-contain" />
            </span>
            <span className="editable-display hidden text-[1.05rem] font-black tracking-[-0.01em] text-[var(--slot4-page-text)] md:block">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Wide search bar — Shutterfly style */}
          <form action="/search" className="mx-auto hidden max-w-2xl flex-1 md:block">
            <div className="flex overflow-hidden rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
              <div className="flex flex-1 items-center gap-2 px-4">
                <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
                <input
                  name="q"
                  type="search"
                  placeholder="Search businesses, profiles, images..."
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 bg-[var(--slot4-accent)] px-5 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:brightness-110"
              >
                Search
              </button>
            </div>
          </form>

          {/* Auth actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            {session ? (
              <>
                <Link
                  href="/create"
                  className="hidden items-center gap-1.5 rounded-lg bg-[var(--slot4-accent)] px-4 py-2 text-[13px] font-bold text-[var(--slot4-on-accent)] transition hover:brightness-110 sm:inline-flex"
                >
                  <PlusCircle className="h-4 w-4" /> Add Profile
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden px-3 py-2 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
                >
                  <LogIn className="h-4 w-4" /> Sign In
                </Link>
                <Link
                  href="/signup"
                  className="hidden items-center gap-1.5 rounded-lg bg-[var(--slot4-accent)] px-4 py-2 text-[13px] font-bold text-[var(--slot4-on-accent)] transition hover:brightness-110 sm:inline-flex"
                >
                  <UserPlus className="h-4 w-4" /> Add Profile
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-[var(--editable-border)] p-2 transition hover:border-[var(--slot4-accent)]/50 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3 — Free listing strip */}
      <div className="border-b border-[var(--editable-border)] bg-[#481E14]">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center justify-center px-4 py-2 text-center sm:px-6 lg:px-8">
          <p className="text-[12px] font-medium text-[#FAF4EF]/90">
            Free to list your business profile today —{' '}
            <Link href="/create" className="font-bold text-[#F2613F] underline-offset-2 hover:underline">
              Get started →
            </Link>
          </p>
        </div>
      </div>

      {/* Tier 4 — Category tabs + Browse All */}
      <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8">
          <Link
            href="/"
            className={`flex shrink-0 items-center border-b-2 px-4 py-3 text-[12px] font-semibold transition ${
              pathname === '/'
                ? 'border-[var(--slot4-accent)] text-[var(--slot4-accent)]'
                : 'border-transparent text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
            }`}
          >
            All
          </Link>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center border-b-2 px-4 py-3 text-[12px] font-semibold transition ${
                  active
                    ? 'border-[var(--slot4-accent)] text-[var(--slot4-accent)]'
                    : 'border-transparent text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="ml-auto shrink-0 py-2 pl-4">
            <Link
              href="/search"
              className="rounded-lg bg-[var(--slot4-accent)] px-4 py-1.5 text-[12px] font-bold text-[var(--slot4-on-accent)] transition hover:brightness-110"
            >
              BROWSE ALL
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex items-center gap-2 overflow-hidden rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search..."
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </form>
          <div className="grid gap-0.5">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-[13px] font-semibold transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="mt-4 grid gap-2">
            {session ? (
              <>
                <Link
                  href="/create"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[var(--slot4-accent)] py-3 text-[13px] font-bold text-[var(--slot4-on-accent)]"
                >
                  <PlusCircle className="h-4 w-4" /> Add Profile
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); setOpen(false) }}
                  className="rounded-lg border border-[var(--editable-border)] py-3 text-[13px] font-semibold text-[var(--slot4-muted-text)]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[var(--slot4-accent)] py-3 text-[13px] font-bold text-[var(--slot4-on-accent)]"
                >
                  <UserPlus className="h-4 w-4" /> Add Profile
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[var(--editable-border)] py-3 text-[13px] font-semibold text-[var(--slot4-muted-text)]"
                >
                  <LogIn className="h-4 w-4" /> Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
