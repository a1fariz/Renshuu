'use client';

import { useEffect, useState } from 'react';

const THEME_KEY = 'renshuu-tema';

export function ThemeToggle() {
  const [gelap, setGelap] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tema = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = tema ? tema === 'gelap' : prefersDark;
    if (next) document.documentElement.setAttribute('data-theme', 'gelap');
    setGelap(next);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !gelap;
    if (next) document.documentElement.setAttribute('data-theme', 'gelap');
    else document.documentElement.removeAttribute('data-theme');
    window.localStorage.setItem(THEME_KEY, next ? 'gelap' : 'terang');
    setGelap(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={gelap ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      aria-pressed={gelap}
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.2s' }}
      className={[
        'relative h-7 w-12 flex-shrink-0 cursor-pointer rounded-full',
        'border-2 transition-all duration-300 ease-in-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        gelap
          ? 'border-[#4a4240] bg-[#2e2b29]'
          : 'border-[#ddd6cc] bg-[#e8e2d9]',
      ].join(' ')}
    >
      {/* track icons */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-[5px]">
        <span
          className="text-[9px] leading-none transition-opacity duration-300"
          style={{ opacity: gelap ? 0.4 : 1 }}
        >
          ☀
        </span>
        <span
          className="text-[9px] leading-none transition-opacity duration-300"
          style={{ opacity: gelap ? 1 : 0.35 }}
        >
          ☾
        </span>
      </span>

      {/* thumb */}
      <span
        className={[
          'pointer-events-none absolute top-[2px] flex h-[19px] w-[19px] items-center justify-center rounded-full shadow-md',
          'transition-all duration-300 ease-in-out',
          gelap
            ? 'left-[20px] bg-[#d4766c]'
            : 'left-[2px] bg-[#f5c842]',
        ].join(' ')}
      />
      <span className="sr-only">{gelap ? 'Mode gelap aktif' : 'Mode terang aktif'}</span>
    </button>
  );
}
