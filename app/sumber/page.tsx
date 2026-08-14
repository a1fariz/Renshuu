'use client';

import { useState } from 'react';
import { SiteShell } from '../ui/site-shell';
import { KANJI_N4, KANJI_N5 } from '../../src/data/kanji';
import { KOSAKATA_N4, KOSAKATA_N5 } from '../../src/data/kosakata';
import { GRAMMAR_BELAJAR_N4, GRAMMAR_BELAJAR_N5 } from '../../src/data/grammar';
import { SEMUA_KANA } from '../../src/data/kana';
import { KONSEP_UTAMA } from '../../src/data/konsep';

export default function SourcesPage() {
  const [open, setOpen] = useState<number | null>(null);
  return <SiteShell><div className="animate-enter"><h1 className="mb-1 text-2xl font-semibold">Sumber & Tentang Aplikasi</h1><p className="mb-5 max-w-3xl text-[15px] text-subtle">Renshuu dibuat sebagai alat belajar mandiri dengan materi yang ringkas, latihan aktif, dan pengulangan berkala.</p><section className="mb-[18px] rounded-panel border border-line bg-surface p-5 shadow-panel"><h2 className="text-lg font-semibold">Ringkasan konten</h2><ul className="mt-3 space-y-2 text-sm text-subtle"><li>{SEMUA_KANA.length} huruf kana untuk belajar dan latihan.</li><li>{KANJI_N5.length} kanji N5 + {KANJI_N4.length} kanji N4.</li><li>{KOSAKATA_N5.length} kosakata N5 + {KOSAKATA_N4.length} kosakata N4.</li><li>{GRAMMAR_BELAJAR_N5.length} pola grammar N5 + {GRAMMAR_BELAJAR_N4.length} pola grammar N4.</li></ul></section><section className="mb-[18px] rounded-panel border border-line bg-surface p-5 shadow-panel"><h2 className="text-lg font-semibold">Konsep belajar</h2>{KONSEP_UTAMA.slice(0, 3).map((item, index) => <div key={item.judul} className="border-b border-line py-3 last:border-0"><button type="button" onClick={() => setOpen(open === index ? null : index)} className="font-semibold hover:text-accent">{item.judul}</button>{open === index && <p className="mt-2 text-sm text-subtle">{item.ringkas}</p>}</div>)}</section><section className="rounded-panel border border-line bg-surface p-5 shadow-panel"><h2 className="text-lg font-semibold">Referensi</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-subtle"><li>Tofugu Learn Hiragana/Katakana Guide, Real Kana, dan NHK World Easy Japanese.</li><li>JLPT Official, JEES, dan Japan Foundation JF Can-do.</li><li>Minna no Nihongo, Genki, Tae Kim, Imabi, dan Bunpro.</li><li>Jisho.org, WaniKani, Anki Kaishi/Core, Tadoku, dan NHK Easy News.</li></ul></section></div></SiteShell>;
}
