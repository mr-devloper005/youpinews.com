'use client'

import Link from 'next/link'
import { Globe, Mail, Rss } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[#0A0906] text-[var(--slot4-page-text)]">
      {/* 4-column grid */}
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-16 sm:px-6 sm:grid-cols-2 lg:grid-cols-2 lg:px-8">
        {/* Col 1: Business */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">BUSINESS</p>
          <div className="mt-5 grid gap-3">
            {[
              { label: 'Add your profile', href: '/create' },
              { label: 'About us', href: '/about' },
              { label: 'Contact', href: '/contact' },
              ...(session ? [] : [{ label: 'Sign in', href: '/login' }, { label: 'Create account', href: '/signup' }]),
            ].map(({ label, href }) => (
              <Link key={href + label} href={href} className="text-[13px] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                {label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="text-left text-[13px] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>

        {/* Col 4: Connect / Brand */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
            <span className="editable-display text-[15px] font-black">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 text-[13px] leading-6 text-[var(--slot4-muted-text)]">
            {typeof globalContent.footer?.description === 'string'
              ? globalContent.footer.description.slice(0, 110)
              : 'Your local business discovery platform.'}
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[
              { label: 'Website', icon: Globe, href: '#' },
              { label: 'Newsletter', icon: Mail, href: '#' },
              { label: 'RSS', icon: Rss, href: '#' },
            ].map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
              >
                <Icon className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--editable-border)]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-[12px] text-[var(--slot4-muted-text)]">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-[12px] text-[var(--slot4-muted-text)]">
            {typeof globalContent.footer?.bottomNote === 'string' ? globalContent.footer.bottomNote : 'Built for discovery and connection.'}
          </p>
          <div className="flex gap-4">
            {[['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
              <Link key={href} href={href} className="text-[12px] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
