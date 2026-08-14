'use client';

import { useCallback, useEffect, useState } from 'react';
import type { KartuSRS, ProgresSRS, StatusKartu } from '../../src/types';
import { ambilKartu, muatProgres, perbaruiKartu, simpanProgres, statusKartu, labelStatus } from '../../src/services/srs';

export const EMPTY_PROGRESS: ProgresSRS = { kartu: {}, catatan: {}, dibuat: '', versi: 1 };

export function useProgress() {
  const [progress, setProgress] = useState<ProgresSRS>(EMPTY_PROGRESS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProgress(muatProgres());
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const review = useCallback((id: string, correct: boolean) => {
    setProgress(current => {
      const next: ProgresSRS = {
        ...current,
        kartu: { ...current.kartu },
      };
      const card: KartuSRS = { ...ambilKartu(next, id) };
      next.kartu[id] = perbaruiKartu(card, correct);
      simpanProgres(next);
      return next;
    });
  }, []);

  const replace = useCallback((next: ProgresSRS) => {
    simpanProgres(next);
    setProgress(next);
  }, []);

  return { progress, mounted, review, replace };
}

const statusClasses: Record<StatusKartu, string> = {
  belum: 'bg-untouched/15 text-subtle',
  dilatih: 'bg-practiced/15 text-practiced',
  hampir: 'bg-almost/15 text-almost',
  dikuasai: 'bg-mastered/15 text-mastered',
};

export function StatusBadge({ status }: { status: StatusKartu }) {
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusClasses[status]}`}>{labelStatus(status)}</span>;
}

export function SpeakButton({ text }: { text: string }) {
  function speak() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = 'ja-JP';
    voice.rate = 0.85;
    const japanese = window.speechSynthesis.getVoices().find(item => item.lang === 'ja-JP' || item.lang.startsWith('ja'));
    if (japanese) voice.voice = japanese;
    window.speechSynthesis.speak(voice);
  }
  return <button type="button" onClick={speak} title="Dengarkan" className="rounded-lg px-2 py-1 text-subtle hover:bg-muted hover:text-accent">♫</button>;
}

export function SegmentedPills({ options, value, onChange }: { options: readonly { value: string; label: string }[]; value: string; onChange: (value: string) => void }) {
  return <div className="flex flex-wrap gap-2">{options.map(option => <button key={option.value} type="button" onClick={() => onChange(option.value)} className={`rounded-full border px-4 py-2 text-sm transition ${value === option.value ? 'border-accent bg-accent text-white' : 'border-line bg-surface text-subtle hover:border-accent hover:text-ink'}`}>{option.label}</button>)}</div>;
}

export function ProgressBar({ status }: { status: StatusKartu }) {
  const width = status === 'dikuasai' ? '100%' : status === 'hampir' ? '75%' : status === 'dilatih' ? '40%' : '0%';
  const color = status === 'dikuasai' ? 'bg-mastered' : status === 'hampir' ? 'bg-almost' : status === 'dilatih' ? 'bg-practiced' : 'bg-untouched';
  return <div className="h-1.5 overflow-hidden rounded-full bg-muted"><span className={`block h-full ${color}`} style={{ width }} /></div>;
}

export { statusKartu };
