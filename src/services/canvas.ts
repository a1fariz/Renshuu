import { ucapkan } from './speech';
import { GORESAN_KANA } from '../data/strokes';

interface StateKanvas {
  aktif: boolean;
  menggambar: boolean;
  konteks: CanvasRenderingContext2D | null;
  kanvas: HTMLCanvasElement | null;
  kanaId: string | null;
  timerAnimasi: number | null;
}

const state: StateKanvas = {
  aktif: false,
  menggambar: false,
  konteks: null,
  kanvas: null,
  kanaId: null,
  timerAnimasi: null,
};

function overlayEl(): HTMLElement | null {
  return document.getElementById('overlay-tulis');
}

function ambilKonteks(): CanvasRenderingContext2D | null {
  if (state.konteks) return state.konteks;
  if (!state.kanvas) return null;
  state.konteks = state.kanvas.getContext('2d');
  return state.konteks;
}

function posisi(e: MouseEvent | TouchEvent): { x: number; y: number } {
  const rect = state.kanvas!.getBoundingClientRect();
  if (e instanceof TouchEvent) {
    const t = e.touches[0] || e.changedTouches[0];
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function mulaiGoresan(e: MouseEvent | TouchEvent): void {
  e.preventDefault();
  const ctx = ambilKonteks();
  if (!ctx || !state.kanvas) return;
  state.menggambar = true;
  const { x, y } = posisi(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
  beriGayaGambar(ctx);
}

function lanjutGoresan(e: MouseEvent | TouchEvent): void {
  if (!state.menggambar) return;
  e.preventDefault();
  const ctx = ambilKonteks();
  if (!ctx) return;
  const { x, y } = posisi(e);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function akhiriGoresan(): void {
  state.menggambar = false;
}

function beriGayaGambar(ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = '#2c2825';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}

function siapkanUkuranKanvas(): void {
  if (!state.kanvas) return;
  const lebar = state.kanvas.offsetWidth;
  const tinggi = state.kanvas.offsetHeight || 320;
  const skala = window.devicePixelRatio || 1;
  state.kanvas.width = lebar * skala;
  state.kanvas.height = tinggi * skala;
  const ctx = ambilKonteks();
  if (ctx) {
    ctx.setTransform(skala, 0, 0, skala, 0, 0);
    ctx.clearRect(0, 0, lebar, tinggi);
  }
}

function bersihkanKanvas(): void {
  siapkanUkuranKanvas();
}

function tampilTab(nama: 'tonton' | 'tulis'): void {
  const tonton = document.getElementById('tulis-tonton');
  const tulis = document.getElementById('tulis-tulis');
  if (!tonton || !tulis) return;

  const inginTonton = nama === 'tonton';
  tonton.classList.toggle('sembunyi', !inginTonton);
  tulis.classList.toggle('sembunyi', inginTonton);

  document.querySelectorAll('[data-tab-tulis]').forEach(pil => {
    const aktif = (pil as HTMLElement).dataset.tabTulis === nama;
    pil.classList.toggle('aktif', aktif);
  });

  if (nama === 'tonton' && state.kanaId) mainkanAnimasi(state.kanaId);
  if (nama === 'tulis') bersihkanKanvas();
}

function tampilTabTanpaAnimasi(nama: 'tonton' | 'tulis'): void {
  const tonton = document.getElementById('tulis-tonton');
  const tulis = document.getElementById('tulis-tulis');
  if (!tonton || !tulis) return;

  const inginTonton = nama === 'tonton';
  tonton.classList.toggle('sembunyi', !inginTonton);
  tulis.classList.toggle('sembunyi', inginTonton);

  document.querySelectorAll('[data-tab-tulis]').forEach(pil => {
    const aktif = (pil as HTMLElement).dataset.tabTulis === nama;
    pil.classList.toggle('aktif', aktif);
  });
}

function mainkanAnimasi(kanaId: string): void {
  const svg = document.getElementById('stroke-svg') as SVGSVGElement | null;
  const status = document.getElementById('stroke-status');
  if (!svg) return;

  if (state.timerAnimasi !== null) {
    window.clearTimeout(state.timerAnimasi);
    state.timerAnimasi = null;
  }

  const goresan = GORESAN_KANA[kanaId];
  if (!goresan) {
    if (status) status.textContent = 'Tidak ada data animasi untuk huruf ini.';
    svg.innerHTML = '';
    return;
  }

  svg.innerHTML = '';
  const ns = 'http://www.w3.org/2000/svg';

  goresan.forEach((g) => {
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', g.d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#b04a3f');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.style.strokeDasharray = '0 2000';
    path.style.strokeDashoffset = '0';
    path.style.opacity = '0';
    svg.appendChild(path);
  });

  if (status) status.textContent = `Coretan 1 / ${goresan.length}`;

  const mainkanGoresan = (idx: number): void => {
    const path = svg.children[idx] as SVGPathElement | null;
    if (!path) return;

    const panjang = path.getTotalLength();
    path.style.strokeDasharray = `${panjang} ${panjang}`;
    path.style.strokeDashoffset = String(panjang);
    path.style.opacity = '1';

    window.requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 1s ease-in-out';
      path.style.strokeDashoffset = '0';
    });

    if (status) status.textContent = `Coretan ${idx + 1} / ${goresan.length}`;

    state.timerAnimasi = window.setTimeout(() => {
      const berikutnya = idx + 1;
      if (berikutnya < goresan.length) {
        mainkanGoresan(berikutnya);
      } else if (status) {
        status.textContent = `Selesai. ${goresan.length} coretan.`;
      }
    }, 1100);
  };

  mainkanGoresan(0);
}

export function bukaTulis(kana: string, romaji: string, coretan?: string): void {
  const overlay = overlayEl();
  if (!overlay) return;

  state.aktif = true;
  overlay.classList.remove('sembunyi');
  document.body.style.overflow = 'hidden';

  const labelKana = document.getElementById('tulis-kana');
  const labelRomaji = document.getElementById('tulis-romaji');
  const labelCoretan = document.getElementById('tulis-coretan');
  const panduan = document.getElementById('tulis-panduan');

  if (labelKana) labelKana.textContent = kana;
  if (labelRomaji) labelRomaji.textContent = romaji;
  if (labelCoretan) {
    labelCoretan.textContent = coretan || '';
    labelCoretan.classList.toggle('sembunyi', !coretan);
  }
  if (panduan) {
    panduan.textContent = kana;
    panduan.classList.remove('sembunyi');
  }

  const tombolMode = document.getElementById('tulis-mode') as HTMLButtonElement | null;
  if (tombolMode) {
    tombolMode.dataset.mode = 'panduan';
    tombolMode.textContent = 'Mode: panduan';
  }

  const tombolModeIngatan = document.getElementById('tulis-mode');
  if (tombolModeIngatan) tombolModeIngatan.dataset.mode = 'panduan';

  bersihkanKanvas();
  tampilTabTanpaAnimasi('tonton');
  ucapkan(kana);
}

export function tutupTulis(): void {
  const overlay = overlayEl();
  if (!overlay) return;
  state.aktif = false;
  overlay.classList.add('sembunyi');
  document.body.style.overflow = '';
  if (state.timerAnimasi !== null) {
    window.clearTimeout(state.timerAnimasi);
    state.timerAnimasi = null;
  }
}

export function inisialisasiCanvasTulis(): void {
  const overlay = overlayEl();
  if (!overlay) return;

  state.kanvas = document.getElementById('kanvas-tulis') as HTMLCanvasElement | null;
  if (!state.kanvas) return;

  window.addEventListener('resize', () => {
    if (state.aktif) bersihkanKanvas();
  });

  state.kanvas.addEventListener('mousedown', mulaiGoresan);
  state.kanvas.addEventListener('mousemove', lanjutGoresan);
  window.addEventListener('mouseup', akhiriGoresan);

  state.kanvas.addEventListener('touchstart', mulaiGoresan, { passive: false });
  state.kanvas.addEventListener('touchmove', lanjutGoresan, { passive: false });
  window.addEventListener('touchend', akhiriGoresan);

  document.addEventListener('click', function (e) {
    const target = e.target as HTMLElement;

    const buka = target.closest('[data-tulis]') as HTMLElement;
    if (buka && buka.dataset.tulis) {
      const kanaId = buka.dataset.tulis;
      const [tipe, kana] = kanaId.split('-', 2);
      const kartu = buka.closest('.kartu-kana');
      const coretanEl = kartu ? kartu.querySelector('.coretan') : null;
      const coretan = coretanEl ? coretanEl.textContent?.replace('Urutan coretan: ', '') : '';
      const romaji = kartu ? (kartu.querySelector('.romaji')?.textContent || '') : '';
      void tipe;
      bukaTulis(kana, romaji, coretan || undefined);
      state.kanaId = kanaId;
      tampilTabTanpaAnimasi('tonton');
      return;
    }

    if (target.closest('#tulis-tutup') || target === overlay) {
      tutupTulis();
      return;
    }

    if (target.closest('#tulis-hapus')) {
      bersihkanKanvas();
      return;
    }

    if (target.closest('#tulis-dengar')) {
      const labelKana = document.getElementById('tulis-kana');
      if (labelKana && labelKana.textContent) ucapkan(labelKana.textContent);
      return;
    }

    const pilTab = target.closest('[data-tab-tulis]') as HTMLElement | null;
    if (pilTab && pilTab.dataset.tabTulis) {
      tampilTab(pilTab.dataset.tabTulis as 'tonton' | 'tulis');
      return;
    }

    if (target.closest('#stroke-ulang')) {
      if (state.kanaId) mainkanAnimasi(state.kanaId);
      return;
    }

    const tombolMode = target.closest('#tulis-mode') as HTMLButtonElement | null;
    if (tombolMode) {
      const panduan = document.getElementById('tulis-panduan');
      const modeSekarang = tombolMode.dataset.mode || 'panduan';
      if (modeSekarang === 'panduan') {
        tombolMode.dataset.mode = 'ingatan';
        tombolMode.textContent = 'Mode: ingatan';
        if (panduan) panduan.classList.add('sembunyi');
      } else {
        tombolMode.dataset.mode = 'panduan';
        tombolMode.textContent = 'Mode: panduan';
        if (panduan) panduan.classList.remove('sembunyi');
      }
      return;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && state.aktif) tutupTulis();
  });
}
