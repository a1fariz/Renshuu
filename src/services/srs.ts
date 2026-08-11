import type { KartuSRS, ProgresSRS, StatusKartu, HasilRingkasan } from '../types';

export const KUNCI_SIMPANAN = 'belajar-jepang-progres';
export const JADWAL_HARI = [0, 1, 2, 4, 7, 14, 30, 60];
export const TAHAP_DIKUASAI = 5;
export const TAHAP_HAMPIR = 3;

export function hariIni(): string {
  const d = new Date();
  const bulan = String(d.getMonth() + 1).padStart(2, '0');
  const tanggal = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${bulan}-${tanggal}`;
}

export function tambahHari(jumlah: number): string {
  const d = new Date();
  d.setDate(d.getDate() + jumlah);
  const bulan = String(d.getMonth() + 1).padStart(2, '0');
  const tanggal = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${bulan}-${tanggal}`;
}

export function buatKartu(id: string): KartuSRS {
  return {
    id: id,
    tahap: 0,
    jatuhTempo: hariIni(),
    kaliDilihat: 0,
    terakhirDilihat: null,
  };
}

export function perbaruiKartu(kartu: KartuSRS, lancar: boolean): KartuSRS {
  kartu.kaliDilihat += 1;
  kartu.terakhirDilihat = hariIni();

  if (lancar) {
    kartu.tahap = Math.min(kartu.tahap + 1, JADWAL_HARI.length - 1);
  } else {
    kartu.tahap = Math.max(kartu.tahap - 2, 0);
    kartu.jatuhTempo = hariIni();
    return kartu;
  }

  const jarakHari = JADWAL_HARI[kartu.tahap];
  kartu.jatuhTempo = jarakHari === 0 ? hariIni() : tambahHari(jarakHari);

  return kartu;
}

export function statusKartu(kartu?: KartuSRS): StatusKartu {
  if (!kartu || kartu.kaliDilihat === 0) return 'belum';
  if (kartu.tahap >= TAHAP_DIKUASAI) return 'dikuasai';
  if (kartu.tahap >= TAHAP_HAMPIR) return 'hampir';
  return 'dilatih';
}

export function labelStatus(status: StatusKartu | string): string {
  const label: Record<string, string> = {
    belum: 'Belum disentuh',
    dilatih: 'Masih dilatih',
    hampir: 'Hampir hafal',
    dikuasai: 'Sudah dikuasai',
  };
  return label[status] || 'Belum disentuh';
}

export function progresKosong(): ProgresSRS {
  return {
    kartu: {},
    catatan: {},
    dibuat: hariIni(),
    versi: 1,
  };
}

export function muatProgres(): ProgresSRS {
  try {
    const mentah = localStorage.getItem(KUNCI_SIMPANAN);
    if (!mentah) return progresKosong();
    const data = JSON.parse(mentah);

    return {
      kartu: data.kartu || {},
      catatan: data.catatan || {},
      dibuat: data.dibuat || hariIni(),
      versi: data.versi || 1,
    };
  } catch (e) {
    console.warn('Gagal membaca progres, memulai dari kosong:', e);
    return progresKosong();
  }
}

export function simpanProgres(progres: ProgresSRS): boolean {
  try {
    localStorage.setItem(KUNCI_SIMPANAN, JSON.stringify(progres));
    return true;
  } catch (e) {
    console.error('Gagal menyimpan progres:', e);
    return false;
  }
}

export function ambilKartu(progres: ProgresSRS, id: string): KartuSRS {
  if (!progres.kartu[id]) {
    progres.kartu[id] = buatKartu(id);
  }
  return progres.kartu[id];
}

export function kartuJatuhTempo(progres: ProgresSRS, daftarId: string[]): string[] {
  const sekarang = hariIni();
  return daftarId.filter(id => {
    const kartu = progres.kartu[id];
    if (!kartu) return false;
    return kartu.jatuhTempo <= sekarang;
  });
}

export function ringkasProgres(progres: ProgresSRS, daftarId: string[]): HasilRingkasan {
  const hasil: HasilRingkasan = { belum: 0, dilatih: 0, hampir: 0, dikuasai: 0 };
  daftarId.forEach(id => {
    const st = statusKartu(progres.kartu[id]);
    hasil[st] += 1;
  });
  return hasil;
}

export function exportProgres(): void {
  const progres = muatProgres();
  const isi = JSON.stringify(progres, null, 2);
  const blob = new Blob([isi], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `backup-belajar-jepang-${hariIni()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importProgres(file: File, saatSelesai: (sukses: boolean, pesan: string) => void): void {
  const pembaca = new FileReader();

  pembaca.onload = function (e) {
    try {
      const resultText = e.target?.result;
      if (typeof resultText !== 'string') {
        saatSelesai(false, 'Gagal membaca file.');
        return;
      }
      const data = JSON.parse(resultText);

      if (!data.kartu || typeof data.kartu !== 'object') {
        saatSelesai(false, 'File ini sepertinya bukan backup yang benar.');
        return;
      }

      simpanProgres({
        kartu: data.kartu,
        catatan: data.catatan || {},
        dibuat: data.dibuat || hariIni(),
        versi: data.versi || 1,
      });

      saatSelesai(true, 'Progres berhasil dipulihkan.');
    } catch (err) {
      saatSelesai(false, 'File rusak atau bukan format JSON.');
    }
  };

  pembaca.onerror = function () {
    saatSelesai(false, 'Gagal membaca file.');
  };

  pembaca.readAsText(file);
}

export function resetProgres(): void {
  localStorage.removeItem(KUNCI_SIMPANAN);
}

export function acak<T>(array: T[]): T[] {
  const salinan = [...array];
  for (let i = salinan.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [salinan[i], salinan[j]] = [salinan[j], salinan[i]];
  }
  return salinan;
}

export function ambilAcak<T>(array: T[], jumlah: number): T[] {
  return acak(array).slice(0, jumlah);
}

export function satuAcak<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function hitungStreak(progres: ProgresSRS): { streak: number; hariAktif: Set<string> } {
  const hariSet = new Set<string>();
  Object.values(progres.kartu).forEach(k => {
    if (k.terakhirDilihat) hariSet.add(k.terakhirDilihat);
  });

  const hariAktif = new Set(hariSet);
  let streak = 0;
  const tanggal = new Date();
  const hariIniStr = hariIni();
  const tanggalMulai = hariSet.has(hariIniStr) ? tanggal : new Date(tanggal.setDate(tanggal.getDate() - 1));
  let tanggalCek = tanggalMulai;

  while (true) {
    const tgl = `${tanggalCek.getFullYear()}-${String(tanggalCek.getMonth() + 1).padStart(2, '0')}-${String(tanggalCek.getDate()).padStart(2, '0')}`;
    if (hariSet.has(tgl)) {
      streak++;
      tanggalCek = new Date(tanggalCek);
      tanggalCek.setDate(tanggalCek.getDate() - 1);
    } else {
      break;
    }
  }

  return { streak, hariAktif };
}

export function formatHari(tgl: string): string {
  const [, m, d] = tgl.split('-').map(Number);
  return `${d}/${m}`;
}
