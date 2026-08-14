'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ProgresSRS } from '../../src/types';
import { HIRAGANA, KATAKANA, DAKUTEN, HANDAKUTEN, YOUON, SERAPAN } from '../../src/data/kana';
import { KANJI_N5 } from '../../src/data/kanji';
import { KOSAKATA_N5 } from '../../src/data/kosakata';
import { GRAMMAR_BELAJAR_N5 } from '../../src/data/grammar';
import { RUTINITAS_HARIAN } from '../../src/data/peta';
import { muatProgres, ringkasProgres } from '../../src/services/srs';
import type { KanaItem } from '../../src/types';

const emptyProgress: ProgresSRS = { kartu: {}, catatan: {}, dibuat: '', versi: 1 };
const kanaGroups = [
  { name: 'Hiragana', items: HIRAGANA, unit: 'huruf' },
  { name: 'Katakana', items: KATAKANA, unit: 'huruf' },
  { name: 'Dakuten', items: [...DAKUTEN, ...HANDAKUTEN], unit: 'huruf' },
  { name: 'Youon', items: YOUON, unit: 'huruf' },
  { name: 'Bunyi Serapan', items: SERAPAN, unit: 'huruf' },
];

function ids(items: KanaItem[]) { return items.map(item => `${item.tipe}-${item.kana}`); }
function CardSummary({ name, items, unit, progress }: { name: string; items: KanaItem[]; unit: string; progress: ProgresSRS }) {
  const result = ringkasProgres(progress, ids(items));
  const total = items.length;
  const percent = total ? Math.round((result.dikuasai / total) * 100) : 0;
  return (
    <article className="rounded-panel border border-line bg-surface p-4 shadow-panel transition hover:-translate-y-0.5">
      <h3 className="mb-1 text-[15px] font-semibold">{name}</h3>
      <div className="mb-2 text-sm text-subtle"><strong className="text-lg text-ink">{result.dikuasai} / {total}</strong> {unit} dikuasai <span className="ml-2 font-semibold text-mastered">{percent}%</span></div>
      <div className="mb-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
        {(['dikuasai', 'hampir', 'dilatih', 'belum'] as const).map(status => <span key={status} className={`bg-${status === 'dikuasai' ? 'mastered' : status === 'hampir' ? 'almost' : status === 'dilatih' ? 'practiced' : 'untouched'}`} style={{ width: `${(result[status] / total) * 100}%` }} />)}
      </div>
      <ul className="space-y-0.5 text-sm text-subtle">
        <li><span className="mr-2 inline-block h-2 w-2 rounded-full bg-mastered" />{result.dikuasai} dikuasai</li>
        <li><span className="mr-2 inline-block h-2 w-2 rounded-full bg-almost" />{result.hampir} hampir hafal</li>
        <li><span className="mr-2 inline-block h-2 w-2 rounded-full bg-practiced" />{result.dilatih} masih dilatih</li>
        <li><span className="mr-2 inline-block h-2 w-2 rounded-full bg-untouched" />{result.belum} belum disentuh</li>
      </ul>
    </article>
  );
}

function LevelChooser({ progress }: { progress: ProgresSRS }) {
  const [selected, setSelected] = useState<string | null>(null);
  const zero = Object.keys(progress.kartu).length === 0;
  return (
    <section className="rounded-panel mb-[18px] border border-line bg-surface p-5 shadow-panel">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div><h2 className="mb-1 text-lg font-semibold">Mulai dari mana?</h2><p className="max-w-3xl text-sm text-subtle">Pilih yang paling mirip dengan kemampuanmu. Tidak yakin? Pilih <strong>belum tahu apa-apa</strong> — kamu akan diarahkan ke tutorial pertama.</p></div>
        <a href="/peta" className="rounded-lg px-3 py-2 text-sm text-subtle hover:bg-muted hover:text-ink">Lihat peta belajar</a>
      </div>
      {selected && <div className="mb-4 rounded-lg border border-accent bg-accent-soft p-4 text-sm text-ink">{selected === 'pemula' ? 'Mulai dari Konsep Dasar, lalu buka Belajar Huruf untuk baris あいうえお.' : selected === 'kenal' ? 'Buka Belajar Huruf untuk melanjutkan materi yang belum dikuasai, lalu lanjutkan ke Latihan.' : 'Buka Baca Kata untuk menguji kemampuan membaca, lalu lanjut ke Kosakata N5.'}</div>}
      <div className="grid gap-2.5 md:grid-cols-3">
        {[
          ['pemula', 'LEVEL 1 · MULAI DARI NOL', 'Aku belum tahu apa-apa', 'Tutorial pemula → Belajar Huruf'],
          ['kenal', 'LEVEL 2 · SUDAH PERNAH BELAJAR', 'Aku sudah tahu beberapa huruf', 'Materi berikutnya → Latihan'],
          ['mahir', 'LEVEL 3 · SUDAH MAHIR KANA', 'Aku sudah mahir membaca kana', 'Baca Kata → Kosakata N5'],
        ].map(([key, label, title, direction]) => (
          <button key={key} type="button" onClick={() => setSelected(key)} className={`flex min-h-44 flex-col items-start gap-1 rounded-lg border p-4 text-left transition hover:bg-muted ${key === 'pemula' && zero ? 'border-accent' : 'border-line'}`}>
            <span className="text-[11px] font-bold tracking-wider text-accent">{label}</span><strong className="text-[15px] font-semibold">{title}</strong><span className="text-sm text-subtle">{key === 'pemula' ? 'Belum hafal hiragana? Mulai tutorial singkat dan belajar baris あいうえお.' : key === 'kenal' ? 'Lanjutkan dari materi yang belum dikuasai, lalu cek ingatanmu lewat latihan.' : 'Lewati pengenalan huruf dan mulai membaca kata.'}</span><span className="mt-auto text-xs font-semibold text-accent">Klik → {direction}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function Dashboard() {
  const [progress, setProgress] = useState<ProgresSRS>(emptyProgress);
  useEffect(() => {
    const timer = window.setTimeout(() => setProgress(muatProgres()), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const extended = useMemo(() => [
    { name: 'Kanji N5', items: KANJI_N5.map(item => `kanji-${item.kanji}`), unit: 'kanji' },
    { name: 'Kosakata N5', items: KOSAKATA_N5.map(item => `kata-${item.kata}`), unit: 'kata' },
    { name: 'Grammar N5', items: GRAMMAR_BELAJAR_N5.map(item => `grammar-${item.id}`), unit: 'pola' },
  ], []);
  return (
    <div className="animate-enter">
      <section className="mb-6 rounded-2xl border border-line bg-gradient-to-br from-surface to-accent-soft px-7 py-7 shadow-panel"><h1 className="jp text-3xl font-semibold">おはよう。Mari mulai.</h1><p className="mt-2 max-w-3xl text-[15px] text-subtle">Tidak ada nilai atau skor. Yang ada hanya tiga keadaan: belum disentuh, masih dilatih, dan sudah dikuasai.</p></section>
      <div className="mb-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">{kanaGroups.map(group => <CardSummary key={group.name} name={group.name} items={group.items} unit={group.unit} progress={progress} />)}</div>
      <LevelChooser progress={progress} />
      <section className="rounded-panel mb-[18px] border border-line bg-surface p-5 shadow-panel"><h2 className="mb-2 text-lg font-semibold">Hari ini</h2><p className="text-sm text-subtle">Ulangi kartu yang jatuh tempo, pelajari satu baris baru, lalu uji ingatanmu di Latihan.</p><table className="mt-4 w-full text-sm"><tbody>{RUTINITAS_HARIAN.map(item => <tr key={item.menit} className="border-t border-line"><td className="w-24 py-2 font-semibold text-accent">{item.menit}</td><td className="py-2 text-subtle">{item.kegiatan}</td></tr>)}</tbody></table></section>
      <section className="rounded-panel border border-line bg-surface p-5 shadow-panel"><h2 className="mb-3 text-lg font-semibold">Ringkasan materi lanjutan</h2><div className="grid gap-3 md:grid-cols-3">{extended.filter(group => group.items.some(id => progress.kartu[id])).map(group => { const result = ringkasProgres(progress, group.items); return <div key={group.name} className="rounded-lg bg-muted p-4 text-sm"><strong>{group.name}</strong><p className="mt-1 text-subtle">{result.dikuasai} / {group.items.length} {group.unit} dikuasai</p></div>; })}</div></section>
    </div>
  );
}
