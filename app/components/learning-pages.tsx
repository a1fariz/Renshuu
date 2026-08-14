'use client';

import { useState } from 'react';
import { HIRAGANA, KATAKANA, DAKUTEN, HANDAKUTEN, YOUON, SERAPAN, HURUF_MIRIP, ATURAN_KHUSUS } from '../../src/data/kana';
import { KANJI_N4, KANJI_N5, TEMA_KANJI } from '../../src/data/kanji';
import { KOSAKATA_N4, KOSAKATA_N5, TEMA_KOSAKATA } from '../../src/data/kosakata';
import { GRAMMAR_BELAJAR_N4, GRAMMAR_BELAJAR_N5 } from '../../src/data/grammar';
import { KONSEP_UTAMA } from '../../src/data/konsep';
import { METODE, PETA_JALAN } from '../../src/data/peta';
import { KATA_HIRAGANA, KATA_KATAKANA, KATA_CAMPURAN } from '../../src/data/kata';
import { KALIMAT_CAMPURAN, KALIMAT_HIRAGANA } from '../../src/data/kalimat';
import type { KanaItem, KanjiItem, KosakataItem, GrammarBelajar, ProgresSRS } from '../../src/types';
import { statusKartu } from '../../src/services/srs';
import { ProgressBar, SegmentedPills, SpeakButton, StatusBadge, useProgress } from './progress';

const panel = 'mb-[18px] rounded-panel border border-line bg-surface p-5 shadow-panel';
const systems = [
  { value: 'hiragana', label: 'Hiragana', items: HIRAGANA },
  { value: 'katakana', label: 'Katakana', items: KATAKANA },
  { value: 'dakuten', label: 'Dakuten & Handakuten', items: [...DAKUTEN, ...HANDAKUTEN] },
  { value: 'youon', label: 'Youon', items: YOUON },
  { value: 'serapan', label: 'Bunyi Serapan', items: SERAPAN },
] as const;

export function PageTitle({ title, children }: { title: string; children: React.ReactNode }) {
  return <><h1 className="mb-1 text-2xl font-semibold tracking-tight">{title}</h1><p className="mb-5 max-w-3xl text-[15px] text-subtle">{children}</p></>;
}

export function ConceptPage() {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="animate-enter"><PageTitle title="Konsep Dasar">Sebelum menghafal huruf, pahami dulu apa yang sedang kamu pelajari dan cara paling efektif memakai aplikasi ini.</PageTitle><section className={`${panel} border-accent/40 bg-gradient-to-br from-surface to-accent-soft`}><span className="text-[11px] font-bold tracking-wider text-accent">TUTORIAL PEMULA</span><h2 className="mt-1 text-lg font-semibold">Rute belajar pertamamu</h2><p className="text-sm text-subtle">Ikuti urutan ini: kenali hiragana, mulai dari あいうえお, lalu latihan setelah satu baris.</p><div className="mt-4 grid gap-3 md:grid-cols-3">{['Kenali dua jenis huruf', 'Mulai dari hiragana あいうえお', 'Latihan setelah satu baris'].map((item, index) => <div key={item} className="rounded-lg border border-line bg-surface p-3"><span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">{index + 1}</span><strong className="text-sm">{item}</strong></div>)}</div><a href="/belajar" className="mt-4 inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark">Mulai belajar あいうえお</a></section>{KONSEP_UTAMA.map((item, index) => <section key={item.judul} className={panel}><h2 className="text-[17px] font-semibold">{item.judul}</h2><p className="mt-1 text-sm text-ink">{item.ringkas}</p><button type="button" onClick={() => setOpen(open === index ? null : index)} className="mt-3 rounded-lg border border-line px-3 py-2 text-sm text-subtle hover:bg-muted">{open === index ? 'Tutup detail' : 'Baca lebih detail'}</button>{open === index && <div className="mt-3 border-t border-line pt-3 text-sm text-subtle">{item.detail.split('\n').map((paragraph, paragraphIndex) => <p key={`${item.judul}-${paragraphIndex}`} className="mb-2 last:mb-0">{paragraph}</p>)}{item.contoh && <ul className="mt-3 space-y-2">{item.contoh.map(example => <li key={example.jp} className="flex flex-wrap items-center gap-2 rounded-lg bg-muted p-2"><strong className="jp text-lg">{example.jp}</strong><span>{example.baca}</span><span className="text-subtle">{example.arti}</span><SpeakButton text={example.jp} /></li>)}</ul>}</div>}</section>)}</div>;
}

function KanaCard({ item, progress, review }: { item: KanaItem; progress: ProgresSRS; review: (id: string, correct: boolean) => void }) {
  const id = `${item.tipe}-${item.kana}`;
  const status = statusKartu(progress.kartu[id]);
  return <article className={`${panel} !mb-0 border-l-4 ${status === 'dikuasai' ? 'border-l-mastered' : status === 'dilatih' ? 'border-l-practiced' : status === 'hampir' ? 'border-l-almost' : 'border-l-untouched'}`}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="jp text-5xl leading-none">{item.kana}</span><div><strong className="block text-base">{item.romaji}</strong><StatusBadge status={status} /></div></div><SpeakButton text={item.kana} /></div><div className="mt-3 flex flex-wrap gap-1.5"><button type="button" onClick={() => review(id, true)} className="rounded-lg border border-line px-2.5 py-1 text-xs text-subtle hover:bg-muted">Saya ingat</button><button type="button" onClick={() => review(id, false)} className="rounded-lg border border-line px-2.5 py-1 text-xs text-subtle hover:bg-muted">Ulangi</button></div><ProgressBar status={status} /><details className="mt-3 text-sm text-subtle" open={!progress.kartu[id]}><summary className="cursor-pointer font-semibold text-ink">Cara ingat, coretan & contoh</summary>{item.mnemonic && <p className="mt-2"><strong>Cara mengingat:</strong> {item.mnemonic}</p>}{item.coretan && <p className="mt-2"><strong>Urutan coretan:</strong> {item.coretan}</p>}<ul className="mt-2 space-y-1">{item.contoh.map(example => <li key={example.kata} className="flex flex-wrap gap-2"><span className="jp font-semibold">{example.kata}</span><span>{example.baca}</span><span>— {example.arti}</span></li>)}</ul></details></article>;
}

export function LearnPage() {
  const [system, setSystem] = useState('hiragana');
  const [row, setRow] = useState('semua');
  const { progress, mounted, review } = useProgress();
  const active = systems.find(item => item.value === system) ?? systems[0];
  const rows = [...new Set(active.items.map(item => item.baris).filter(Boolean))] as string[];
  const visible = row === 'semua' ? active.items : active.items.filter(item => item.baris === row);
  return <div className="animate-enter"><PageTitle title="Belajar Huruf">Pelajari satu sampai dua baris per hari. Baca mnemonic, tulis ulang di kertas, lalu ucapkan contoh katanya dengan suara.</PageTitle><section className={panel}><h2 className="mb-3 text-base font-semibold">Pilih sistem huruf</h2><SegmentedPills options={systems.map(item => ({ value: item.value, label: item.label }))} value={system} onChange={value => { setSystem(value); setRow('semua'); }} /><div className="mt-4 rounded-lg bg-muted p-3 text-sm text-subtle">{active.label}: pilih satu baris agar fokus belajar tetap ringan.</div></section>{rows.length > 0 && <section className={panel}><h2 className="mb-3 text-base font-semibold">Pilih baris</h2><SegmentedPills options={[{ value: 'semua', label: 'Semua' }, ...rows.map(value => ({ value, label: active.items.filter(item => item.baris === value).map(item => item.kana).join('') }))]} value={row} onChange={setRow} /></section>}<div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-semibold">{active.label} {row !== 'semua' ? `· baris ${row}` : ''}</h2><span className="text-sm text-subtle">{visible.length} huruf</span></div>{mounted ? <div className="grid gap-3 md:grid-cols-2">{visible.map(item => <KanaCard key={`${item.tipe}-${item.kana}`} item={item} progress={progress} review={review} />)}</div> : <div className={panel}>Memuat progres...</div>}</div>;
}

export function SimilarPage() {
  return <div className="animate-enter"><PageTitle title="Huruf Mirip">Bandingkan bentuknya, ucapkan bunyinya, lalu gunakan kunci visual untuk membedakannya.</PageTitle><div className="grid gap-4 md:grid-cols-2">{HURUF_MIRIP.map(pair => <section key={pair.pasangan.join('-')} className={panel}><div className="flex items-center justify-center gap-5">{pair.pasangan.map((char, index) => <div key={char} className="text-center"><span className="jp block text-6xl">{char}</span><span className="text-sm text-subtle">{pair.romaji[index]}</span><SpeakButton text={char} /></div>)}</div><p className="mt-4 border-t border-line pt-3 text-sm text-subtle"><strong className="text-ink">Kuncinya:</strong> {pair.kunci}</p></section>)}</div></div>;
}

export function RulesPage() {
  return <div className="animate-enter"><PageTitle title="Aturan Khusus">Beberapa bunyi Jepang mengikuti aturan kecil yang penting untuk dibaca dengan benar.</PageTitle>{ATURAN_KHUSUS.map(rule => <section key={rule.nama} className={panel}><h2 className="text-lg font-semibold">{rule.nama}</h2><p className="mt-2 text-sm text-subtle">{rule.isi}</p><ul className="mt-3 space-y-2">{rule.contoh.map(example => <li key={example.kata} className="flex flex-wrap gap-2 rounded-lg bg-muted p-2 text-sm"><strong className="jp text-lg">{example.kata}</strong><span>{example.baca}</span><span className="text-subtle">{example.arti}</span></li>)}</ul><p className="mt-3 text-sm text-subtle"><strong className="text-ink">Catatan:</strong> {rule.tips}</p></section>)}</div>;
}

export function RoadmapPage() {
  return <div className="animate-enter"><PageTitle title="Peta Jalan">Prioritas nomor satu adalah menuntaskan kana sebelum masuk materi lanjutan. Ikuti fase sesuai kemampuanmu, bukan sekadar tanggal.</PageTitle>{PETA_JALAN.map(phase => <section key={phase.fase} className={panel}><div className="flex flex-col justify-between gap-2 border-b border-line pb-3 md:flex-row md:items-start"><div><span className="text-xs font-bold tracking-wider text-accent">{phase.fase}</span><h2 className="mt-1 text-lg font-semibold">{phase.judul}</h2></div><span className="text-sm text-subtle">{phase.periode}</span></div><p className="mt-3 text-sm"><strong>Target:</strong> {phase.target}</p><p className="mt-1 text-sm text-subtle">{phase.catatan}</p><div className="mt-4 grid gap-3 md:grid-cols-3">{phase.rincian.map(detail => <div key={detail.label} className="rounded-lg bg-muted p-3"><h3 className="mb-2 text-sm font-semibold">{detail.label}</h3><ul className="list-disc space-y-1 pl-4 text-sm text-subtle">{detail.isi.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>)}<section className={panel}><h2 className="text-lg font-semibold">Metode yang dipakai</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{METODE.map(method => <p key={method.nama} className="rounded-lg bg-muted p-3 text-sm text-subtle"><strong className="text-ink">{method.nama}.</strong> {method.isi}</p>)}</div></section></div>;
}

function CatalogCard({ item, progress }: { item: KanjiItem | KosakataItem | GrammarBelajar; progress: ProgresSRS }) {
  const id = 'kanji' in item ? `kanji-${item.kanji}` : 'pola' in item ? `grammar-${item.id}` : `kata-${item.kata}`;
  const status = statusKartu(progress.kartu[id]);
  if ('kanji' in item) return <article className={panel}><div className="flex items-start justify-between"><span className="jp text-5xl">{item.kanji}</span><StatusBadge status={status} /></div><p className="mt-2 text-sm font-semibold">{item.arti}</p><p className="text-sm text-subtle">On: {item.on} · Kun: {item.kun} · {item.coretan} coretan</p><ul className="mt-3 space-y-1 text-sm text-subtle">{item.kata.map(example => <li key={example.kata}><strong className="jp text-ink">{example.kata}</strong> · {example.baca} · {example.arti}</li>)}</ul></article>;
  if ('pola' in item) return <article className={panel}><div className="flex items-start justify-between gap-3"><div><span className="text-xs text-subtle">#{item.urutan}</span><h2 className="mt-1 text-xl font-semibold">{item.pola}</h2><p className="text-sm text-subtle">{item.arti}</p></div><StatusBadge status={status} /></div><p className="mt-3 text-sm text-subtle">{item.cara}</p><ul className="mt-3 space-y-1 text-sm text-subtle">{item.contoh.map(example => <li key={example.jp}><strong className="jp text-ink">{example.jp}</strong> — {example.arti}</li>)}</ul></article>;
  return <article className={panel}><div className="flex items-start justify-between gap-3"><div><span className="jp text-2xl font-semibold">{item.kata}</span><p className="text-sm text-subtle">{item.kana} · {item.romaji}</p></div><StatusBadge status={status} /></div><p className="mt-3 text-sm">{item.arti}</p><p className="mt-1 text-xs text-subtle">{item.jenis} · {item.level}</p></article>;
}

export function CatalogPage({ kind }: { kind: 'kanji' | 'kosakata' | 'grammar' }) {
  const [level, setLevel] = useState<'N5' | 'N4'>('N5');
  const [theme, setTheme] = useState('semua');
  const { progress, mounted } = useProgress();
  const all = kind === 'kanji' ? [...KANJI_N5, ...KANJI_N4] : kind === 'kosakata' ? [...KOSAKATA_N5, ...KOSAKATA_N4] : [...GRAMMAR_BELAJAR_N5, ...GRAMMAR_BELAJAR_N4];
  const themes = kind === 'kanji' ? TEMA_KANJI : kind === 'kosakata' ? TEMA_KOSAKATA : [];
  const items = all.filter(item => item.level === level && (theme === 'semua' || ('tema' in item ? item.tema === theme : true)));
  const title = kind === 'kanji' ? 'Kanji' : kind === 'kosakata' ? 'Kosakata' : 'Grammar';
  return <div className="animate-enter"><PageTitle title={title}>Pelajari materi {title.toLowerCase()} per level, lihat contoh pemakaian, dan ulangi kartu yang masih belum dikuasai.</PageTitle><section className={panel}><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><SegmentedPills options={[{ value: 'N5', label: 'N5' }, { value: 'N4', label: 'N4' }]} value={level} onChange={value => { setLevel(value as 'N5' | 'N4'); setTheme('semua'); }} /><span className="text-sm text-subtle">{items.length} materi</span></div>{themes.length > 0 && <SegmentedPills options={[{ value: 'semua', label: 'Semua' }, ...themes.map(item => ({ value: item.id, label: item.label }))]} value={theme} onChange={setTheme} />}</section>{mounted ? <div className="grid gap-3 md:grid-cols-2">{items.map(item => <CatalogCard key={'kanji' in item ? item.kanji : 'pola' in item ? item.id : item.kata} item={item} progress={progress} />)}</div> : <div className={panel}>Memuat progres...</div>}</div>;
}

export function ReadingPage() {
  const [level, setLevel] = useState('hiragana');
  const [item, setItem] = useState(() => KATA_HIRAGANA[0]);
  const [revealed, setRevealed] = useState(false);
  const groups = level === 'hiragana' ? KATA_HIRAGANA : level === 'katakana' ? KATA_KATAKANA : level === 'kalimat-hiragana' ? KALIMAT_HIRAGANA : level === 'kalimat-campuran' ? KALIMAT_CAMPURAN : [...KATA_HIRAGANA, ...KATA_KATAKANA, ...KATA_CAMPURAN];
  function next() { setItem(groups[Math.floor(Math.random() * groups.length)]); setRevealed(false); }
  return <div className="animate-enter"><PageTitle title="Baca Kata">Baca kata ini dengan suara sebelum membuka jawabannya. Jangan mengurai huruf satu-satu terlalu lama.</PageTitle><section className={panel}><SegmentedPills options={[{ value: 'hiragana', label: 'Kata hiragana' }, { value: 'katakana', label: 'Kata katakana' }, { value: 'kalimat-hiragana', label: 'Kalimat hiragana' }, { value: 'kalimat-campuran', label: 'Kalimat campuran' }]} value={level} onChange={value => { setLevel(value); setRevealed(false); }} /></section><section className={`${panel} text-center`}><p className="text-sm text-subtle">Baca kata ini, lalu buka jawaban</p><strong className="jp my-7 block text-5xl">{item.kata}</strong><SpeakButton text={item.kata} /><div className={`mt-5 rounded-lg bg-muted p-4 ${revealed ? '' : 'hidden'}`}><p className="text-lg">{item.baca}</p><p className="text-sm text-subtle">{item.arti}</p></div><div className="mt-5 flex flex-wrap justify-center gap-2"><button type="button" onClick={() => setRevealed(true)} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark">Buka jawaban</button><button type="button" onClick={next} className="rounded-lg border border-line px-4 py-2.5 text-sm text-subtle hover:bg-muted">Kata berikutnya</button></div></section></div>;
}
