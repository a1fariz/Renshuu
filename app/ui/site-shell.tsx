'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const belajarLinks = [
  ['/belajar', 'Huruf'],
  ['/konsep', 'Konsep'],
  ['/kanji', 'Kanji'],
  ['/kosakata', 'Kosakata'],
  ['/grammar', 'Grammar'],
] as const;
const latihanLinks = [
  ['/latihan', 'Latihan'],
  ['/baca', 'Baca Kata'],
  ['/mirip', 'Huruf Mirip'],
] as const;
const panduanLinks = [
  ['/aturan', 'Aturan'],
  ['/peta', 'Peta Jalan'],
] as const;

function NavGroup({
  label,
  links,
  active,
  onNavigate,
}: {
  label: string;
  links: readonly (readonly [string, string])[];
  active: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className={[
          'flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150',
          active
            ? 'bg-accent-soft text-accent'
            : 'text-subtle hover:bg-muted hover:text-ink',
        ].join(' ')}
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-30 min-w-[160px] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
          {links.map(([href, text]) => (
            <Link
              key={href}
              href={href}
              onClick={() => { setOpen(false); onNavigate(); }}
              className="block px-4 py-2.5 text-sm text-subtle transition-colors hover:bg-muted hover:text-ink"
            >
              {text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 transition-all duration-300"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" className="origin-center transition-all duration-300" />
          <line x1="6" y1="6" x2="18" y2="18" className="origin-center transition-all duration-300" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (links: readonly (readonly [string, string])[]) =>
    links.some(([href]) => pathname === href);

  const linkClass = (href: string) =>
    [
      'rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150',
      pathname === href
        ? 'bg-accent-soft text-accent'
        : 'text-subtle hover:bg-muted hover:text-ink',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-5">

        {/* Logo */}
        <Link href="/" className="flex flex-shrink-0 items-center gap-2 text-ink">
          <span className="jp text-[28px] leading-none text-accent">練</span>
          <span className="text-base font-semibold tracking-tight">Renshuu</span>
        </Link>

        {/* Desktop nav — tengah kanan */}
        <nav className="ml-auto hidden items-center gap-0.5 md:flex">
          <Link href="/" className={linkClass('/')}>Beranda</Link>
          <NavGroup label="Belajar"  links={belajarLinks}  active={isActive(belajarLinks)}  onNavigate={() => setOpen(false)} />
          <NavGroup label="Latihan"  links={latihanLinks}  active={isActive(latihanLinks)}  onNavigate={() => setOpen(false)} />
          <NavGroup label="Panduan"  links={panduanLinks}  active={isActive(panduanLinks)}  onNavigate={() => setOpen(false)} />
          <Link href="/cadangan" className={linkClass('/cadangan')}>Cadangan</Link>
          <Link href="/sumber"   className={linkClass('/sumber')}>Sumber</Link>
        </nav>

        {/* Kanan: theme toggle + hamburger */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-2 md:ml-3">
          <ThemeToggle />

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-muted md:hidden"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={[
          'overflow-hidden border-t border-line bg-surface transition-all duration-300 ease-in-out md:hidden',
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          <Link href="/" onClick={() => setOpen(false)} className={`${linkClass('/')} text-base`}>Beranda</Link>

          {[
            { label: 'Belajar', links: belajarLinks },
            { label: 'Latihan', links: latihanLinks },
            { label: 'Panduan', links: panduanLinks },
          ].map(group => (
            <div key={group.label}>
              <p className="mb-0.5 mt-2 px-3 text-xs font-semibold uppercase tracking-widest text-subtle">
                {group.label}
              </p>
              {group.links.map(([href, text]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`${linkClass(href)} block text-base`}
                >
                  {text}
                </Link>
              ))}
            </div>
          ))}

          <div className="mt-2 border-t border-line pt-2">
            <Link href="/cadangan" onClick={() => setOpen(false)} className={`${linkClass('/cadangan')} block text-base`}>Cadangan</Link>
            <Link href="/sumber"   onClick={() => setOpen(false)} className={`${linkClass('/sumber')} block text-base`}>Sumber</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-5 sm:py-8">{children}</main>
      <footer className="border-t border-line px-5 py-8 text-center text-sm text-subtle">
        © Renshuu (練習) — Platform Belajar Bahasa Jepang Mandiri.
      </footer>
    </>
  );
}
