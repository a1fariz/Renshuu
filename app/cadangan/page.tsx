'use client';

import { useState } from 'react';
import { SiteShell } from '../ui/site-shell';
import { useProgress } from '../components/progress';
import type { ProgresSRS } from '../../src/types';

function download(progress: ProgresSRS) {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `backup-belajar-jepang-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function BackupPage() {
  const { progress, mounted, replace } = useProgress();
  const [message, setMessage] = useState('');
  function importFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const data = JSON.parse(String(event.target?.result));
        if (!data.kartu || typeof data.kartu !== 'object') throw new Error('invalid');
        replace({ kartu: data.kartu, catatan: data.catatan || {}, dibuat: data.dibuat || new Date().toISOString().slice(0, 10), versi: data.versi || 1 });
        setMessage('Progres berhasil dipulihkan.');
      } catch {
        setMessage('File backup tidak valid.');
      }
    };
    reader.readAsText(file);
  }
  function reset() {
    if (!window.confirm('Hapus semua progres? Tindakan ini tidak bisa dibatalkan.')) return;
    localStorage.removeItem('belajar-jepang-progres');
    replace({ kartu: {}, catatan: {}, dibuat: new Date().toISOString().slice(0, 10), versi: 1 });
    setMessage('Progres sudah dihapus.');
  }
  return <SiteShell><div className="animate-enter"><h1 className="mb-1 text-2xl font-semibold">Cadangan Progres</h1><p className="mb-5 max-w-3xl text-[15px] text-subtle">Simpan progres ke file JSON agar aman saat pindah browser atau perangkat.</p><section className="mb-[18px] rounded-panel border border-line bg-surface p-5 shadow-panel"><h2 className="text-lg font-semibold">Kelola data</h2><p className="mt-1 text-sm text-subtle">{mounted ? `${Object.keys(progress.kartu).length} kartu sudah tersimpan.` : 'Memuat progres...'}</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => download(progress)} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark">Export progres</button><label className="cursor-pointer rounded-lg border border-line px-4 py-2.5 text-sm text-subtle hover:bg-muted">Import progres<input type="file" accept="application/json" onChange={event => importFile(event.target.files?.[0])} className="hidden" /></label><button type="button" onClick={reset} className="rounded-lg border border-red-300 px-4 py-2.5 text-sm text-red-700 hover:bg-red-50">Reset progres</button></div>{message && <p className="mt-4 rounded-lg bg-muted p-3 text-sm text-subtle">{message}</p>}</section></div></SiteShell>;
}
