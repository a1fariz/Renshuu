'use client';

import { useState } from 'react';
import { SiteShell } from '../ui/site-shell';
import { HIRAGANA, KATAKANA, DAKUTEN, HANDAKUTEN, YOUON, SERAPAN } from '../../src/data/kana';
import { useProgress, SpeakButton } from '../components/progress';
import type { KanaItem } from '../../src/types';

const pools: Record<string, KanaItem[]> = {
  hiragana: HIRAGANA,
  katakana: KATAKANA,
  dakuten: [...DAKUTEN, ...HANDAKUTEN],
  youon: YOUON,
  serapan: SERAPAN,
  campuran: [...HIRAGANA, ...KATAKANA],
};

export default function PracticePage() {
  const [material, setMaterial] = useState('hiragana');
  const [mode, setMode] = useState('huruf-bunyi');
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const { review } = useProgress();
  const pool = pools[material] || HIRAGANA;
  const question = pool[questionIndex % pool.length];
  const choices = [question, ...pool.filter(item => item !== question).slice(0, 3)];
  function choose(value: string) {
    if (answer) return;
    const correct = value === question.romaji;
    setAnswer(value);
    review(`${question.tipe}-${question.kana}`, correct);
  }
  function next() { setAnswer(null); setQuestionIndex(index => index + 1); }
  return <SiteShell><div className="animate-enter"><h1 className="mb-1 text-2xl font-semibold">Latihan</h1><p className="mb-5 max-w-3xl text-[15px] text-subtle">Uji ingatanmu dengan active recall. Jawab dulu sebelum melihat petunjuk.</p>{!started ? <section className="rounded-panel border border-line bg-surface p-5 shadow-panel"><h2 className="text-lg font-semibold">Atur latihan</h2><div className="mt-4 grid gap-4 md:grid-cols-2"><label className="text-sm text-subtle">Materi<select value={material} onChange={event => setMaterial(event.target.value)} className="mt-1 block w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink"><option value="hiragana">Hiragana</option><option value="katakana">Katakana</option><option value="dakuten">Dakuten & Handakuten</option><option value="youon">Youon</option><option value="serapan">Bunyi Serapan</option><option value="campuran">Campuran</option></select></label><label className="text-sm text-subtle">Jenis soal<select value={mode} onChange={event => setMode(event.target.value)} className="mt-1 block w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink"><option value="huruf-bunyi">Huruf → bunyi</option><option value="bunyi-huruf">Bunyi → huruf</option><option value="ketik">Ketik jawaban</option><option value="mendengar">Dengar → bunyi</option></select></label></div><button type="button" onClick={() => setStarted(true)} className="mt-5 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark">Mulai latihan</button></section> : <section className="rounded-panel border border-line bg-surface p-5 text-center shadow-panel"><p className="text-sm text-subtle">{mode === 'huruf-bunyi' ? 'Baca huruf ini, lalu pilih bunyinya' : 'Pilih jawaban yang paling tepat'}</p><span className="jp my-8 block text-8xl">{question.kana}</span><SpeakButton text={question.kana} /><div className="mx-auto mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">{choices.map(choice => <button key={choice.kana} type="button" onClick={() => choose(choice.romaji)} className={`rounded-lg border px-4 py-3 text-left transition ${answer ? choice.romaji === question.romaji ? 'border-mastered bg-mastered/15 text-mastered' : answer === choice.romaji ? 'border-accent bg-accent-soft' : 'border-line opacity-60' : 'border-line hover:bg-muted'}`}>{choice.romaji}</button>)}</div>{answer && <div className="mt-5 rounded-lg bg-muted p-4 text-sm"><strong>{answer === question.romaji ? 'Betul.' : `Jawaban: ${question.romaji}`}</strong><p className="mt-1 text-subtle">{question.mnemonic}</p><button type="button" onClick={next} className="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">Soal berikutnya</button></div>}<button type="button" onClick={() => setStarted(false)} className="mt-5 text-sm text-subtle underline">Ganti materi</button></section>}</div></SiteShell>;
}
