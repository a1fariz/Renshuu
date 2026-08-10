import {
  HIRAGANA, KATAKANA, DAKUTEN, HANDAKUTEN, YOUON, SEMUA_KANA, HURUF_MIRIP
} from '../data/kana';
import { KATA_HIRAGANA, KATA_KATAKANA, KATA_CAMPURAN } from '../data/kata';
import { SEMUA_KANJI } from '../data/kanji';
import { SEMUA_KOSAKATA } from '../data/kosakata';
import { SEMUA_GRAMMAR } from '../data/grammar';
import {
  PROGRES, kanjiTampil, kosakataTampil, grammarTampil,
  gambarBeranda, gambarGridKana, gambarGridKanji, gambarDaftarKosakata, gambarDaftarGrammar,
  pilihPil
} from './app';
import {
  ambilKartu, perbaruiKartu, simpanProgres, kartuJatuhTempo, ringkasProgres,
  hariIni, acak, ambilAcak, satuAcak
} from '../services/srs';
import { ucapkan } from '../services/speech';
import type { KanaItem, KanjiItem, KosakataItem, GrammarBelajar } from '../types';

export let materiKuis = 'hiragana';
export let jenisKuis = 'acak';

export let soalSekarang: KanaItem | null = null;
export let jenisSoalSekarang: string | null = null;
export let tingkatPetunjuk = 0;
export let sudahDijawab = false;

export const JENIS_TERSEDIA = ['huruf-bunyi', 'bunyi-huruf', 'ketik'];

export function kumpulanKuis(): KanaItem[] {
  if (materiKuis === 'hiragana') return HIRAGANA;
  if (materiKuis === 'katakana') return KATAKANA;
  if (materiKuis === 'campuran') return [...HIRAGANA, ...KATAKANA];
  if (materiKuis === 'dakuten') return [...DAKUTEN, ...HANDAKUTEN];
  if (materiKuis === 'youon') return YOUON;
  if (materiKuis === 'semua') return SEMUA_KANA;

  if (materiKuis === 'jatuhtempo') {
    const semuaId = SEMUA_KANA.map(k => k.tipe + '-' + k.kana);
    const jatuhTempo = kartuJatuhTempo(PROGRES, semuaId);
    const hasil = SEMUA_KANA.filter(k => jatuhTempo.includes(k.tipe + '-' + k.kana));
    return hasil.length > 0 ? hasil : HIRAGANA;
  }

  return HIRAGANA;
}

export const VARIASI_ROMAJI: Record<string, string[]> = {
  shi: ['si'], chi: ['ti'], tsu: ['tu'], fu: ['hu'],
  ji: ['zi', 'di'], zu: ['du'],
  sha: ['sya'], shu: ['syu'], sho: ['syo'],
  cha: ['tya'], chu: ['tyu'], cho: ['tyo'],
  ja: ['zya', 'jya'], ju: ['zyu', 'jyu'], jo: ['zyo', 'jyo']
};

export function romajiDiterima(romaji: string): string[] {
  const dasar = String(romaji).toLowerCase();
  const hasil = new Set<string>();

  dasar.split('/').forEach(bagian => {
    const bersih = bagian.trim();
    if (!bersih) return;
    hasil.add(bersih);
    (VARIASI_ROMAJI[bersih] || []).forEach(v => hasil.add(v));
  });

  return [...hasil];
}

export function romajiUtama(romaji: string): string {
  return String(romaji).split('/')[0].trim();
}

export let riwayatSingkat: string[] = [];

export function pilihSoal(): KanaItem {
  const kumpulan = kumpulanKuis();
  const belumLamaIni = (x: KanaItem) => !riwayatSingkat.includes(x.tipe + '-' + x.kana);

  const jatuhTempo = kumpulan.filter(k => {
    const kartu = PROGRES.kartu[k.tipe + '-' + k.kana];
    return kartu && kartu.jatuhTempo <= hariIni();
  });

  const belum = kumpulan.filter(k => !PROGRES.kartu[k.tipe + '-' + k.kana]);

  let terpilih: KanaItem;

  const jatuhTempoSegar = jatuhTempo.filter(belumLamaIni);
  const belumSegar = belum.filter(belumLamaIni);

  if (jatuhTempoSegar.length > 0 && Math.random() < 0.6) {
    terpilih = satuAcak(jatuhTempoSegar);
  } else if (belumSegar.length > 0) {
    terpilih = belumSegar[0];
  } else if (jatuhTempoSegar.length > 0) {
    terpilih = satuAcak(jatuhTempoSegar);
  } else {
    const segar = kumpulan.filter(belumLamaIni);
    terpilih = satuAcak(segar.length > 0 ? segar : kumpulan);
  }

  riwayatSingkat.push(terpilih.tipe + '-' + terpilih.kana);
  const batas = Math.min(5, Math.max(1, kumpulan.length - 1));
  if (riwayatSingkat.length > batas) riwayatSingkat.shift();

  return terpilih;
}

export function tentukanJenisSoal(): string {
  if (jenisKuis === 'acak') return satuAcak(JENIS_TERSEDIA);
  return jenisKuis;
}

export function petunjukUntuk(k: KanaItem, tingkat: number): string {
  const petunjuk: string[] = [];

  if (k.mnemonic) {
    petunjuk.push(`Cara mengingatnya: ${k.mnemonic}`);
  }

  if (k.contoh && k.contoh.length > 0) {
    const c = k.contoh[0];
    petunjuk.push(`Huruf ini ada di kata <strong>${c.kata}</strong> yang artinya "${c.arti}".`);
  }

  petunjuk.push(`Bunyinya dimulai dengan huruf <strong>${k.romaji[0]}</strong>.`);
  petunjuk.push(`Jawabannya <strong>${k.romaji}</strong>. Coba ucapkan sekali dengan suara, lalu lanjut.`);

  return petunjuk[Math.min(tingkat, petunjuk.length - 1)];
}

export function tanggapanBenar(k: KanaItem): string {
  const konteks: string[] = [];

  if (k.contoh && k.contoh.length > 0) {
    const c = satuAcak(k.contoh);
    konteks.push(`Contoh pemakaiannya: <strong>${c.kata}</strong> (${c.baca}) — ${c.arti}.`);
  }
  if (k.coretan) {
    konteks.push(`Urutan coretannya: ${k.coretan}`);
  }
  if ((k as any).asal) {
    konteks.push(`Ingat, huruf ini asalnya dari <strong>${(k as any).asal}</strong>.`);
  }

  const tambahan = konteks.length > 0 ? satuAcak(konteks) : '';
  return `<p class="benar">Betul, <strong>${k.kana}</strong> dibaca <strong>${k.romaji}</strong>.</p>
          ${tambahan ? `<p class="konteks">${tambahan}</p>` : ''}`;
}

export function tanggapanBelumPas(k: KanaItem): string {
  const pembuka = [
    'Belum pas. Tidak masalah, ini huruf yang memang sering tertukar.',
    'Bukan yang itu. Coba sekali lagi dengan petunjuk ini.',
    'Hampir. Perhatikan petunjuk berikut.',
    'Belum. Santai saja, huruf ini butuh beberapa kali sentuhan.'
  ];
  const petunjuk = petunjukUntuk(k, tingkatPetunjuk);
  return `<p class="belum-pas">${satuAcak(pembuka)}</p>
          <p class="petunjuk-kotak">${petunjuk}</p>`;
}

export function gambarSoal(idArea: string): void {
  const area = document.getElementById(idArea);
  if (!area) return;
  sudahDijawab = false;

  const k = soalSekarang!;
  const jenis = jenisSoalSekarang;
  let isiSoal = '';

  if (jenis === 'huruf-bunyi') {
    const bunyiBenar = romajiUtama(k.romaji);

    let pengecoh = [...new Set(
      kumpulanKuis().map(x => romajiUtama(x.romaji)).filter(r => r !== bunyiBenar)
    )];

    if (pengecoh.length < 3) {
      const cadangan = [...new Set(
        SEMUA_KANA.map(x => romajiUtama(x.romaji)).filter(r => r !== bunyiBenar)
      )];
      pengecoh = [...new Set([...pengecoh, ...cadangan])];
    }

    const pilihan = acak([bunyiBenar, ...ambilAcak(pengecoh, 3)]);

    isiSoal = `
      <p class="soal-perintah">Huruf ini dibaca apa?</p>
      <div class="soal-kana">
        <span class="kana-raksasa">${k.kana}</span>
        <button class="tombol-suara" data-ucap="${k.kana}" title="Dengarkan">&#9834;</button>
      </div>
      <div class="pilihan-jawab">
        ${pilihan.map(p => `<button class="tombol-jawab" data-jawab="${p}">${p}</button>`).join('')}
      </div>`;

  } else if (jenis === 'bunyi-huruf') {
    let pengecoh = kumpulanKuis()
      .filter(x => x.kana !== k.kana && x.romaji !== k.romaji)
      .map(x => x.kana);

    if (pengecoh.length < 3) {
      const cadangan = SEMUA_KANA
        .filter(x => x.kana !== k.kana && x.romaji !== k.romaji)
        .map(x => x.kana);
      pengecoh = [...new Set([...pengecoh, ...cadangan])];
    }

    const pilihan = acak([k.kana, ...ambilAcak(pengecoh, 3)]);

    isiSoal = `
      <p class="soal-perintah">Mana huruf yang dibaca <strong>${romajiUtama(k.romaji)}</strong>?</p>
      <div class="pilihan-jawab pilihan-kana">
        ${pilihan.map(p => `<button class="tombol-jawab kana-pilihan" data-jawab="${p}">${p}</button>`).join('')}
      </div>`;

  } else {
    isiSoal = `
      <p class="soal-perintah">Ketik cara baca huruf ini</p>
      <div class="soal-kana">
        <span class="kana-raksasa">${k.kana}</span>
        <button class="tombol-suara" data-ucap="${k.kana}" title="Dengarkan">&#9834;</button>
      </div>
      <div class="area-ketik">
        <input type="text" id="input-jawab" placeholder="tulis dengan huruf latin" autocomplete="off" autocapitalize="off" spellcheck="false">
        <button class="tombol utama" id="kirim-jawab">Periksa</button>
      </div>`;
  }

  area.innerHTML = `
    <div class="panel kuis">
      ${isiSoal}
      <div id="umpan-balik" class="umpan-balik"></div>
      <div class="kuis-alat">
        <button class="tombol halus" id="tombol-petunjuk">Beri petunjuk</button>
        <button class="tombol halus" id="tombol-ulang">Ulang soal ini</button>
        <button class="tombol halus" id="tombol-lewati">Ganti soal</button>
        <button class="tombol selesai" id="tombol-selesai">Sudah paham, cukup</button>
      </div>
    </div>`;

  area.classList.remove('sembunyi');

  const input = document.getElementById('input-jawab') as HTMLInputElement;
  if (input) {
    input.focus();
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') periksaKetik(idArea);
    });
  }

  const kirim = document.getElementById('kirim-jawab');
  if (kirim) kirim.addEventListener('click', () => periksaKetik(idArea));

  pasangAlatKuis(idArea);
}

export function periksaPilihan(idArea: string, jawaban: string): void {
  if (sudahDijawab) return;

  const k = soalSekarang!;
  const jenis = jenisSoalSekarang;
  const benar = jenis === 'bunyi-huruf'
    ? (jawaban === k.kana)
    : romajiDiterima(k.romaji).includes(String(jawaban).toLowerCase());

  const umpan = document.getElementById('umpan-balik');
  const semuaTombol = document.querySelectorAll('.tombol-jawab') as NodeListOf<HTMLButtonElement>;

  if (benar) {
    sudahDijawab = true;

    semuaTombol.forEach(t => {
      t.disabled = true;
      if (t.dataset.jawab === jawaban) t.classList.add('pilih-benar');
    });

    const id = k.tipe + '-' + k.kana;
    const kartu = ambilKartu(PROGRES, id);
    perbaruiKartu(kartu, tingkatPetunjuk === 0);
    simpanProgres(PROGRES);

    if (umpan) {
      umpan.innerHTML = tanggapanBenar(k) +
        `<button class="tombol utama" id="tombol-lanjut">Soal berikutnya</button>`;
    }

    ucapkan(k.kana);

    const tombolLanjut = document.getElementById('tombol-lanjut');
    if (tombolLanjut) {
      tombolLanjut.addEventListener('click', function () {
        soalBaru(idArea);
      });
    }

  } else {
    semuaTombol.forEach(t => {
      if (t.dataset.jawab === jawaban) t.classList.add('pilih-belum');
    });

    if (umpan) umpan.innerHTML = tanggapanBelumPas(k);
    tingkatPetunjuk += 1;
  }
}

export function periksaKetik(idArea: string): void {
  if (sudahDijawab) return;

  const input = document.getElementById('input-jawab') as HTMLInputElement;
  if (!input) return;

  const jawaban = input.value.trim().toLowerCase();
  if (jawaban === '') return;

  const k = soalSekarang!;
  const umpan = document.getElementById('umpan-balik');

  const benar = romajiDiterima(k.romaji).includes(jawaban);

  if (benar) {
    sudahDijawab = true;
    input.disabled = true;
    input.classList.add('input-benar');

    const id = k.tipe + '-' + k.kana;
    const kartu = ambilKartu(PROGRES, id);
    perbaruiKartu(kartu, tingkatPetunjuk === 0);
    simpanProgres(PROGRES);

    if (umpan) {
      umpan.innerHTML = tanggapanBenar(k) +
        `<button class="tombol utama" id="tombol-lanjut">Soal berikutnya</button>`;
    }

    ucapkan(k.kana);

    const lanjut = document.getElementById('tombol-lanjut');
    if (lanjut) {
      lanjut.addEventListener('click', () => soalBaru(idArea));
      lanjut.focus();
    }

  } else {
    input.classList.add('input-belum');
    if (umpan) umpan.innerHTML = tanggapanBelumPas(k);
    tingkatPetunjuk += 1;
    input.value = '';
    input.focus();
    setTimeout(() => input.classList.remove('input-belum'), 600);
  }
}

export function pasangAlatKuis(idArea: string): void {
  const area = document.getElementById(idArea);
  if (!area) return;

  area.querySelectorAll('.tombol-jawab').forEach(t => {
    t.addEventListener('click', function (this: HTMLElement) {
      if (this.dataset.jawab) periksaPilihan(idArea, this.dataset.jawab);
    });
  });

  const petunjukBtn = document.getElementById('tombol-petunjuk');
  if (petunjukBtn) {
    petunjukBtn.addEventListener('click', function () {
      const umpan = document.getElementById('umpan-balik');
      if (umpan && soalSekarang) {
        umpan.innerHTML = `<p class="petunjuk-kotak">${petunjukUntuk(soalSekarang, tingkatPetunjuk)}</p>`;
        tingkatPetunjuk += 1;
      }
    });
  }

  const ulangBtn = document.getElementById('tombol-ulang');
  if (ulangBtn) {
    ulangBtn.addEventListener('click', function () {
      const jenisLain = JENIS_TERSEDIA.filter(j => j !== jenisSoalSekarang);
      jenisSoalSekarang = jenisKuis === 'acak' ? satuAcak(jenisLain) : jenisKuis;
      gambarSoal(idArea);
    });
  }

  const lewatiBtn = document.getElementById('tombol-lewati');
  if (lewatiBtn) {
    lewatiBtn.addEventListener('click', function () {
      soalBaru(idArea);
    });
  }

  const selesaiBtn = document.getElementById('tombol-selesai');
  if (selesaiBtn) {
    selesaiBtn.addEventListener('click', function () {
      selesaiKuis(idArea);
    });
  }
}

export function soalBaru(idArea: string): void {
  tingkatPetunjuk = 0;
  soalSekarang = pilihSoal();
  jenisSoalSekarang = tentukanJenisSoal();
  gambarSoal(idArea);
}

export function selesaiKuis(idArea: string): void {
  const area = document.getElementById(idArea);
  if (!area) return;
  const kumpulan = kumpulanKuis();
  const daftarId = kumpulan.map(k => k.tipe + '-' + k.kana);
  const r = ringkasProgres(PROGRES, daftarId);

  area.innerHTML = `
    <div class="panel">
      <h2>Sesi selesai</h2>
      <p>Keadaan materi yang tadi kamu latih:</p>
      <ul class="rincian-status besar">
        <li><span class="titik dikuasai"></span> Sudah dikuasai: ${r.dikuasai} huruf</li>
        <li><span class="titik dilatih"></span> Masih dilatih: ${r.dilatih} huruf</li>
        <li><span class="titik belum"></span> Belum disentuh: ${r.belum} huruf</li>
      </ul>
      <p class="catatan-kecil">
        Yang masih dilatih akan muncul lagi sendiri di hari yang tepat.
        Tidak perlu kamu ingat-ingat.
      </p>
      <div class="kuis-alat">
        <button class="tombol utama" id="lanjut-lagi">Latihan lagi</button>
        <button class="tombol" id="ganti-setelan">Ganti materi</button>
        <button class="tombol" data-pintasan="belajar">Pelajari huruf baru</button>
      </div>
    </div>`;

  const lanjutLagi = document.getElementById('lanjut-lagi');
  if (lanjutLagi) lanjutLagi.addEventListener('click', () => soalBaru(idArea));

  const gantiSetelan = document.getElementById('ganti-setelan');
  if (gantiSetelan) {
    gantiSetelan.addEventListener('click', function () {
      area.classList.add('sembunyi');
      area.innerHTML = '';
      const setelan = document.getElementById('setelan-latihan');
      if (setelan) setelan.classList.remove('sembunyi');
    });
  }

  gambarBeranda();
  gambarGridKana();
}

export function soalMirip(): void {
  const area = document.getElementById('area-kuis-mirip');
  if (!area) return;
  const m = satuAcak(HURUF_MIRIP);

  const indeks = Math.floor(Math.random() * m.pasangan.length);
  const jawabanBenar = m.pasangan[indeks];
  const bunyiBenar = m.romaji[indeks];
  const pilihan = acak([...m.pasangan]);

  area.innerHTML = `
    <div class="panel kuis">
      <p class="soal-perintah">Mana huruf yang dibaca <strong>${bunyiBenar}</strong>?</p>
      <div class="pilihan-jawab pilihan-kana">
        ${pilihan.map(p => `<button class="tombol-jawab kana-pilihan" data-mirip="${p}">${p}</button>`).join('')}
      </div>
      <div id="umpan-mirip" class="umpan-balik"></div>
      <div class="kuis-alat">
        <button class="tombol halus" id="petunjuk-mirip">Beri petunjuk</button>
        <button class="tombol halus" id="ganti-mirip">Ganti soal</button>
        <button class="tombol selesai" id="selesai-mirip">Sudah paham, cukup</button>
      </div>
    </div>`;

  area.classList.remove('sembunyi');

  area.querySelectorAll('[data-mirip]').forEach(t => {
    t.addEventListener('click', function (this: HTMLElement) {
      const umpan = document.getElementById('umpan-mirip');
      const val = this.dataset.mirip;

      if (val === jawabanBenar) {
        this.classList.add('pilih-benar');
        area.querySelectorAll('[data-mirip]').forEach(x => (x as HTMLButtonElement).disabled = true);
        if (umpan) {
          umpan.innerHTML = `
            <p class="benar">Betul. <strong>${jawabanBenar}</strong> dibaca <strong>${bunyiBenar}</strong>.</p>
            <p class="konteks">${m.kunci}</p>
            <button class="tombol utama" id="lanjut-mirip">Soal berikutnya</button>`;
        }
        ucapkan(jawabanBenar);
        const lanjutBtn = document.getElementById('lanjut-mirip');
        if (lanjutBtn) lanjutBtn.addEventListener('click', soalMirip);
      } else {
        this.classList.add('pilih-belum');
        if (umpan) {
          umpan.innerHTML = `
            <p class="belum-pas">Belum pas. Ini memang pasangan yang paling sering tertukar.</p>
            <p class="petunjuk-kotak">${m.kunci}</p>`;
        }
      }
    });
  });

  const petunjukBtn = document.getElementById('petunjuk-mirip');
  if (petunjukBtn) {
    petunjukBtn.addEventListener('click', function () {
      const umpan = document.getElementById('umpan-mirip');
      if (umpan) umpan.innerHTML = `<p class="petunjuk-kotak">${m.kunci}</p>`;
    });
  }

  const gantiBtn = document.getElementById('ganti-mirip');
  if (gantiBtn) gantiBtn.addEventListener('click', soalMirip);

  const selesaiBtn = document.getElementById('selesai-mirip');
  if (selesaiBtn) {
    selesaiBtn.addEventListener('click', function () {
      area.innerHTML = `
        <div class="panel">
          <h2>Sesi selesai</h2>
          <p>Latihan huruf mirip paling berguna kalau dikerjakan sedikit-sedikit tapi sering.
             Lima menit sehari lebih ampuh daripada satu jam sekali sepekan.</p>
          <button class="tombol utama" id="mirip-lagi">Latihan lagi</button>
        </div>`;
      const lagiBtn = document.getElementById('mirip-lagi');
      if (lagiBtn) lagiBtn.addEventListener('click', soalMirip);
    });
  }
}

export let tingkatBaca = 'hiragana';
export let kataSekarang: { kata: string; baca: string; arti: string } | null = null;

export function kumpulanKata() {
  if (tingkatBaca === 'hiragana') return KATA_HIRAGANA;
  if (tingkatBaca === 'katakana') return KATA_KATAKANA;
  return [...KATA_HIRAGANA, ...KATA_KATAKANA, ...KATA_CAMPURAN];
}

export function soalBaca(): void {
  const area = document.getElementById('area-baca');
  if (!area) return;
  kataSekarang = satuAcak(kumpulanKata());

  area.innerHTML = `
    <div class="panel kuis">
      <p class="soal-perintah">Baca kata ini dengan suara, baru buka jawabannya</p>
      <div class="soal-kata">
        <span class="kata-raksasa">${kataSekarang.kata}</span>
        <button class="tombol-suara besar" data-ucap="${kataSekarang.kata}" title="Dengarkan">&#9834;</button>
      </div>
      <div id="jawab-baca" class="jawab-baca tersembunyi">
        <p class="baca-romaji">${kataSekarang.baca}</p>
        <p class="baca-arti">${kataSekarang.arti}</p>
      </div>
      <div class="kuis-alat">
        <button class="tombol utama" id="buka-baca">Buka jawaban</button>
        <button class="tombol halus" id="ganti-baca">Kata berikutnya</button>
        <button class="tombol selesai" id="selesai-baca">Sudah paham, cukup</button>
      </div>
    </div>`;

  area.classList.remove('sembunyi');

  const bukaBtn = document.getElementById('buka-baca');
  if (bukaBtn) {
    bukaBtn.addEventListener('click', function () {
      const elem = document.getElementById('jawab-baca');
      if (elem) elem.classList.remove('tersembunyi');
      this.textContent = 'Dengarkan lagi';
      if (kataSekarang) ucapkan(kataSekarang.kata);
    });
  }

  const gantiBtn = document.getElementById('ganti-baca');
  if (gantiBtn) gantiBtn.addEventListener('click', soalBaca);

  const selesaiBtn = document.getElementById('selesai-baca');
  if (selesaiBtn) {
    selesaiBtn.addEventListener('click', function () {
      area.innerHTML = `
        <div class="panel">
          <h2>Sesi selesai</h2>
          <p>Kalau kamu sudah bisa membaca 20 kata acak beruntun tanpa ragu dan tanpa
             berhenti mengurai huruf satu-satu, Fase 0 kamu sudah lulus.</p>
          <button class="tombol utama" id="baca-lagi">Baca lagi</button>
        </div>`;
      const lagiBtn = document.getElementById('baca-lagi');
      if (lagiBtn) lagiBtn.addEventListener('click', soalBaca);
    });
  }
}

export interface ProfilKuisN {
  idArea: string;
  prefiks: string;
  campuran?: boolean;
  kumpulan: () => any[];
  kunci: (item: any) => string;
  tanya: (item: any) => string;
  jawab: (item: any) => string;
  perintah: string;
  perintahBalik: (item: any) => string;
  petunjuk: (item: any) => string[];
  konteks: (item: any) => string;
}

export function profilUntukItem(item: any): ProfilKuisN {
  if (item.kanji) return PROFIL_KUIS.kanji;
  if (item.pola) return PROFIL_KUIS.grammar;
  return PROFIL_KUIS.kosakata;
}

export const PROFIL_KUIS: Record<string, ProfilKuisN> = {
  kanji: {
    idArea: 'area-kuis-kanji',
    prefiks: 'kanji-',
    kumpulan: () => kanjiTampil(),
    kunci: (k: KanjiItem) => k.kanji,
    tanya: (k: KanjiItem) => k.kanji,
    jawab: (k: KanjiItem) => k.arti,
    perintah: 'Kanji ini artinya apa?',
    perintahBalik: (k: KanjiItem) => `Mana kanji yang artinya <strong>${k.arti}</strong>?`,
    petunjuk: (k: KanjiItem) => [
      `Kanji ini punya ${k.coretan} coretan. Bacaan on-nya <strong>${k.on}</strong>.`,
      k.kata && k.kata[0]
        ? `Muncul di kata <strong>${k.kata[0].kata}</strong> (${k.kata[0].baca}).`
        : `Bacaan kun-nya <strong>${k.kun}</strong>.`,
      `Artinya <strong>${k.arti}</strong>. Tulis sekali di kertas, lalu lanjut.`
    ],
    konteks: (k: KanjiItem) => k.kata && k.kata.length
      ? `Contoh pemakaian: <strong>${k.kata[0].kata}</strong> (${k.kata[0].baca}) — ${k.kata[0].arti}.`
      : `Bacaan: on <strong>${k.on}</strong>, kun <strong>${k.kun}</strong>.`
  },

  kosakata: {
    idArea: 'area-kuis-kosakata',
    prefiks: 'kata-',
    kumpulan: () => kosakataTampil(),
    kunci: (k: KosakataItem) => k.kata,
    tanya: (k: KosakataItem) => k.kata,
    jawab: (k: KosakataItem) => k.arti,
    perintah: 'Kata ini artinya apa?',
    perintahBalik: (k: KosakataItem) => `Mana kata Jepang yang artinya <strong>${k.arti}</strong>?`,
    petunjuk: (k: KosakataItem) => [
      `Bacanya <strong>${k.kana}</strong>.`,
      `Termasuk kata ${k.jenis}. Coba ingat dari bunyinya.`,
      `Artinya <strong>${k.arti}</strong>. Ucapkan sekali dengan suara, lalu lanjut.`
    ],
    konteks: (k: KosakataItem) => `Dibaca <strong>${k.kana}</strong> — termasuk kata ${k.jenis}.`
  },

  grammar: {
    idArea: 'area-kuis-grammar',
    prefiks: 'grammar-',
    kumpulan: () => grammarTampil(),
    kunci: (g: GrammarBelajar) => g.id,
    tanya: (g: GrammarBelajar) => g.pola,
    jawab: (g: GrammarBelajar) => g.arti,
    perintah: 'Pola ini artinya apa?',
    perintahBalik: (g: GrammarBelajar) => `Mana pola yang berarti <strong>${g.arti}</strong>?`,
    petunjuk: (g: GrammarBelajar) => [
      `Cara pakainya: ${g.cara}`,
      g.contoh && g.contoh[0]
        ? `Contohnya: <strong>${g.contoh[0].jp}</strong> — ${g.contoh[0].arti}`
        : `Ini poin nomor ${g.urutan} di daftar ${g.level}.`,
      `Artinya <strong>${g.arti}</strong>. Baca ulang contohnya sekali, lalu lanjut.`
    ],
    konteks: (g: GrammarBelajar) => g.contoh && g.contoh.length
      ? `Contoh: <strong>${g.contoh[0].jp}</strong> — ${g.contoh[0].arti}`
      : g.cara
  }
};

PROFIL_KUIS.harian = {
  idArea: 'area-kuis-harian',
  campuran: true,
  kumpulan: () => {
    const semua = [
      ...SEMUA_KANJI.map(x => ({ item: x, profil: PROFIL_KUIS.kanji })),
      ...SEMUA_KOSAKATA.map(x => ({ item: x, profil: PROFIL_KUIS.kosakata })),
      ...SEMUA_GRAMMAR.map(x => ({ item: x, profil: PROFIL_KUIS.grammar }))
    ];

    return semua
      .map(({ item, profil }) => ({
        item,
        kartu: PROGRES.kartu[profil.prefiks + profil.kunci(item)]
      }))
      .filter(x => x.kartu && x.kartu.jatuhTempo <= hariIni())
      .sort((a, b) => a.kartu.jatuhTempo.localeCompare(b.kartu.jatuhTempo))
      .map(x => x.item);
  },
  get prefiks() { return ''; },
  kunci: (item: any) => profilUntukItem(item).prefiks + profilUntukItem(item).kunci(item),
  tanya: (item: any) => profilUntukItem(item).tanya(item),
  jawab: (item: any) => profilUntukItem(item).jawab(item),
  get perintah() { return 'Ini artinya apa?'; },
  perintahBalik: (item: any) => profilUntukItem(item).perintahBalik(item),
  petunjuk: (item: any) => profilUntukItem(item).petunjuk(item),
  konteks: (item: any) => profilUntukItem(item).konteks(item)
};

export let profilAktif: ProfilKuisN = PROFIL_KUIS.kanji;
export let itemSekarang: any = null;
export let arahSoal = 'maju';
export let petunjukN = 0;
export let terjawab = false;
export let riwayatN: string[] = [];

export function semuaSejenis(profil: ProfilKuisN): any[] {
  if (profil === PROFIL_KUIS.kanji) return SEMUA_KANJI;
  if (profil === PROFIL_KUIS.kosakata) return SEMUA_KOSAKATA;
  return SEMUA_GRAMMAR;
}

export function pilihItemN(): any {
  const p = profilAktif;
  const kumpulan = p.kumpulan();
  if (kumpulan.length === 0) return null;

  const idDari = (x: any) => p.campuran ? p.kunci(x) : p.prefiks + p.kunci(x);
  const segar = (x: any) => !riwayatN.includes(idDari(x));

  const jatuhTempo = kumpulan.filter((x: any) => {
    const kartu = PROGRES.kartu[idDari(x)];
    return kartu && kartu.jatuhTempo <= hariIni();
  }).filter(segar);

  const belum = kumpulan.filter((x: any) => !PROGRES.kartu[idDari(x)]).filter(segar);

  let terpilih: any;

  if (p.campuran) {
    const segarDulu = kumpulan.filter(segar);
    terpilih = (segarDulu.length > 0 ? segarDulu : kumpulan)[0];
  } else if (jatuhTempo.length > 0 && Math.random() < 0.6) {
    terpilih = satuAcak(jatuhTempo);
  } else if (belum.length > 0) {
    terpilih = belum[0];
  } else if (jatuhTempo.length > 0) {
    terpilih = satuAcak(jatuhTempo);
  } else {
    const sisa = kumpulan.filter(segar);
    terpilih = satuAcak(sisa.length > 0 ? sisa : kumpulan);
  }

  riwayatN.push(idDari(terpilih));
  const batas = Math.min(5, Math.max(1, kumpulan.length - 1));
  if (riwayatN.length > batas) riwayatN.shift();

  return terpilih;
}

export function gambarSoalN(): void {
  const p = profilAktif;
  const area = document.getElementById(p.idArea);
  if (!area) return;
  const item = itemSekarang;
  terjawab = false;

  const pe = p.campuran ? profilUntukItem(item) : p;
  const kumpulan = p.campuran ? semuaSejenis(pe) : p.kumpulan();
  let isiSoal = '';

  if (arahSoal === 'maju') {
    const benar = pe.jawab(item);
    let pengecoh = [...new Set(
      kumpulan.map(x => pe.jawab(x)).filter(a => a !== benar)
    )];

    if (pengecoh.length < 3) {
      pengecoh = [...new Set([...pengecoh,
        ...semuaSejenis(pe).map(x => pe.jawab(x)).filter(a => a !== benar)])];
    }

    const pilihan = acak([benar, ...ambilAcak(pengecoh, 3)]);

    isiSoal = `
      <p class="soal-perintah">${pe.perintah}</p>
      <div class="soal-kata">
        <span class="${pe === PROFIL_KUIS.grammar ? 'pola-raksasa' : 'kata-raksasa'}">${pe.tanya(item)}</span>
        <button class="tombol-suara besar" data-ucap="${pe.tanya(item)}" title="Dengarkan">&#9834;</button>
      </div>
      <div class="pilihan-jawab pilihan-arti">
        ${pilihan.map(x => `<button class="tombol-jawab" data-jawab="${x}">${x}</button>`).join('')}
      </div>`;

  } else {
    const benar = pe.tanya(item);
    let pengecoh = [...new Set(
      kumpulan.map(x => pe.tanya(x)).filter(a => a !== benar)
    )];

    if (pengecoh.length < 3) {
      pengecoh = [...new Set([...pengecoh,
        ...semuaSejenis(pe).map(x => pe.tanya(x)).filter(a => a !== benar)])];
    }

    const pilihan = acak([benar, ...ambilAcak(pengecoh, 3)]);
    const kelasTombol = pe === PROFIL_KUIS.grammar ? 'tombol-jawab pola-pilihan' : 'tombol-jawab kana-pilihan';

    isiSoal = `
      <p class="soal-perintah">${pe.perintahBalik(item)}</p>
      <div class="pilihan-jawab ${pe === PROFIL_KUIS.grammar ? 'pilihan-arti' : 'pilihan-kana'}">
        ${pilihan.map(x => `<button class="${kelasTombol}" data-jawab="${x}">${x}</button>`).join('')}
      </div>`;
  }

  area.innerHTML = `
    <div class="panel kuis">
      ${isiSoal}
      <div id="umpan-n" class="umpan-balik"></div>
      <div class="kuis-alat">
        <button class="tombol halus" id="petunjuk-n">Beri petunjuk</button>
        <button class="tombol halus" id="ulang-n">Tanya dengan cara lain</button>
        <button class="tombol halus" id="lewati-n">Ganti soal</button>
        <button class="tombol selesai" id="selesai-n">Sudah paham, cukup</button>
      </div>
    </div>`;

  area.classList.remove('sembunyi');
  area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  area.querySelectorAll('.tombol-jawab').forEach(t => {
    t.addEventListener('click', function (this: HTMLElement) {
      if (this.dataset.jawab) periksaJawabN(this.dataset.jawab);
    });
  });

  const petunjukBtn = document.getElementById('petunjuk-n');
  if (petunjukBtn) {
    petunjukBtn.addEventListener('click', function () {
      const daftar = p.petunjuk(itemSekarang);
      const umpan = document.getElementById('umpan-n');
      if (umpan) {
        umpan.innerHTML = `<p class="petunjuk-kotak">${daftar[Math.min(petunjukN, daftar.length - 1)]}</p>`;
      }
      petunjukN += 1;
    });
  }

  const ulangBtn = document.getElementById('ulang-n');
  if (ulangBtn) {
    ulangBtn.addEventListener('click', function () {
      arahSoal = arahSoal === 'maju' ? 'balik' : 'maju';
      gambarSoalN();
    });
  }

  const lewatiBtn = document.getElementById('lewati-n');
  if (lewatiBtn) lewatiBtn.addEventListener('click', soalBaruN);

  const selesaiBtn = document.getElementById('selesai-n');
  if (selesaiBtn) selesaiBtn.addEventListener('click', selesaiKuisN);
}

export function periksaJawabN(jawaban: string): void {
  if (terjawab) return;

  const p = profilAktif;
  const item = itemSekarang;
  const pe = p.campuran ? profilUntukItem(item) : p;

  const benar = arahSoal === 'maju'
    ? jawaban === pe.jawab(item)
    : jawaban === pe.tanya(item);

  const umpan = document.getElementById('umpan-n');
  const area = document.getElementById(p.idArea);
  if (!area) return;
  const tombol = area.querySelectorAll('.tombol-jawab') as NodeListOf<HTMLButtonElement>;

  if (benar) {
    terjawab = true;
    tombol.forEach(t => {
      t.disabled = true;
      if (t.dataset.jawab === jawaban) t.classList.add('pilih-benar');
    });

    const idKartu = pe.prefiks + pe.kunci(item);
    const kartu = ambilKartu(PROGRES, idKartu);
    perbaruiKartu(kartu, petunjukN === 0);
    simpanProgres(PROGRES);

    if (umpan) {
      umpan.innerHTML = `
        <p class="benar">Betul. <strong>${pe.tanya(item)}</strong> — ${pe.jawab(item)}.</p>
        <p class="konteks">${pe.konteks(item)}</p>
        <button class="tombol utama" id="lanjut-n">Soal berikutnya</button>`;
    }

    ucapkan(pe.tanya(item));
    const lanjutBtn = document.getElementById('lanjut-n');
    if (lanjutBtn) lanjutBtn.addEventListener('click', soalBaruN);

    if (pe === PROFIL_KUIS.kanji) gambarGridKanji();
    else if (pe === PROFIL_KUIS.kosakata) gambarDaftarKosakata();
    else gambarDaftarGrammar();

  } else {
    tombol.forEach(t => {
      if (t.dataset.jawab === jawaban) t.classList.add('pilih-belum');
    });

    const pembuka = [
      'Belum pas. Wajar, ini butuh beberapa kali sentuhan.',
      'Bukan yang itu. Coba lagi dengan petunjuk ini.',
      'Hampir. Perhatikan petunjuk berikut.',
      'Belum. Santai saja, tidak ada yang dihitung di sini.'
    ];
    const daftar = pe.petunjuk(item);

    if (umpan) {
      umpan.innerHTML = `
        <p class="belum-pas">${satuAcak(pembuka)}</p>
        <p class="petunjuk-kotak">${daftar[Math.min(petunjukN, daftar.length - 1)]}</p>`;
    }
    petunjukN += 1;
  }
}

export function soalBaruN(): void {
  petunjukN = 0;
  itemSekarang = pilihItemN();

  if (!itemSekarang) {
    const area = document.getElementById(profilAktif.idArea);
    if (area) {
      area.innerHTML = '<div class="panel"><p class="petunjuk">Tidak ada materi di pilihan ini. Ganti level atau temanya dulu.</p></div>';
    }
    return;
  }

  arahSoal = Math.random() < 0.5 ? 'maju' : 'balik';
  gambarSoalN();
}

export function selesaiKuisN(): void {
  const p = profilAktif;
  const area = document.getElementById(p.idArea);
  if (!area) return;

  if (p.campuran) {
    const sisa = p.kumpulan().length;
    area.innerHTML = `
      <div class="panel">
        <h2>Sesi selesai</h2>
        ${sisa === 0
          ? `<p>Antrean ulangan hari ini sudah habis. Semua yang jatuh tempo
               sudah kamu sentuh — waktu yang bagus untuk menambah materi baru.</p>`
          : `<p>Masih ada <strong>${sisa} materi</strong> di antrean hari ini.
               Tidak harus habis sekarang, sisanya bisa besok.</p>`}
        <p class="catatan-kecil">
          Yang masih dilatih akan muncul lagi sendiri di hari yang tepat.
        </p>
        <div class="kuis-alat">
          ${sisa > 0 ? '<button class="tombol utama" id="lagi-n">Lanjut ulangan</button>' : ''}
          <button class="tombol" data-pintasan="buka-kanji">Buka Kanji</button>
          <button class="tombol" data-pintasan="buka-kosakata">Buka Kosakata</button>
        </div>
      </div>`;

    const lagi = document.getElementById('lagi-n');
    if (lagi) lagi.addEventListener('click', soalBaruN);
    gambarBeranda();
    gambarRingkasHarian();
    return;
  }

  const kumpulan = p.kumpulan();
  const daftarId = kumpulan.map(x => p.prefiks + p.kunci(x));
  const r = ringkasProgres(PROGRES, daftarId);

  const satuan = p === PROFIL_KUIS.kanji ? 'kanji'
               : p === PROFIL_KUIS.kosakata ? 'kata' : 'pola';

  area.innerHTML = `
    <div class="panel">
      <h2>Sesi selesai</h2>
      <p>Keadaan materi yang tadi kamu latih:</p>
      <ul class="rincian-status besar">
        <li><span class="titik dikuasai"></span> Sudah dikuasai: ${r.dikuasai} ${satuan}</li>
        <li><span class="titik dilatih"></span> Masih dilatih: ${r.dilatih} ${satuan}</li>
        <li><span class="titik belum"></span> Belum disentuh: ${r.belum} ${satuan}</li>
      </ul>
      <p class="catatan-kecil">
        Yang masih dilatih akan muncul lagi sendiri di hari yang tepat.
      </p>
      <button class="tombol utama" id="lagi-n">Latihan lagi</button>
    </div>`;

  const lagiBtn = document.getElementById('lagi-n');
  if (lagiBtn) lagiBtn.addEventListener('click', soalBaruN);
  gambarBeranda();
  gambarRingkasHarian();
}

export function mulaiKuisN(namaProfil: string): void {
  profilAktif = PROFIL_KUIS[namaProfil];
  riwayatN = [];
  soalBaruN();
}

export function gambarRingkasHarian(): void {
  const antre = PROFIL_KUIS.harian.kumpulan();
  const wadah = document.getElementById('ringkas-harian');
  if (!wadah) return;

  if (antre.length === 0) {
    wadah.innerHTML = `
      <div class="tugas selesai">
        <div class="tugas-teks">
          <strong>Antrean ulangan kosong</strong>
          <span>Tidak ada kanji, kosakata, atau grammar yang perlu diulang hari ini.
                Waktu yang bagus untuk menambah materi baru.</span>
        </div>
      </div>`;
    return;
  }

  const jumlahKanji = antre.filter(x => x.kanji).length;
  const jumlahPola  = antre.filter(x => x.pola).length;
  const jumlahKata  = antre.length - jumlahKanji - jumlahPola;

  const bagian: string[] = [];
  if (jumlahKanji) bagian.push(`${jumlahKanji} kanji`);
  if (jumlahKata)  bagian.push(`${jumlahKata} kata`);
  if (jumlahPola)  bagian.push(`${jumlahPola} pola grammar`);

  wadah.innerHTML = `
    <div class="tugas">
      <div class="tugas-teks">
        <strong>${antre.length} materi perlu diulang hari ini</strong>
        <span>Terdiri dari ${bagian.join(', ')}. Kerjakan ini dulu sebelum menambah materi baru.</span>
      </div>
      <button class="tombol utama" id="mulai-harian">Mulai ulangan</button>
    </div>`;

  const mulaiBtn = document.getElementById('mulai-harian');
  if (mulaiBtn) {
    mulaiBtn.addEventListener('click', function () {
      mulaiKuisN('harian');
    });
  }
}

export function inisialisasiKuisListeners(): void {
  const pilihMateri = document.getElementById('pilih-materi');
  if (pilihMateri) {
    pilihMateri.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil') as HTMLElement;
      if (!pil || !pil.dataset.materi) return;
      materiKuis = pil.dataset.materi;
      pilihPil('pilih-materi', materiKuis, 'materi');
    });
  }

  const pilihJenis = document.getElementById('pilih-jenis');
  if (pilihJenis) {
    pilihJenis.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil') as HTMLElement;
      if (!pil || !pil.dataset.jenis) return;
      jenisKuis = pil.dataset.jenis;
      pilihPil('pilih-jenis', jenisKuis, 'jenis');
    });
  }

  const mulaiLatihan = document.getElementById('mulai-latihan');
  if (mulaiLatihan) {
    mulaiLatihan.addEventListener('click', function () {
      const setelan = document.getElementById('setelan-latihan');
      if (setelan) setelan.classList.add('sembunyi');
      soalBaru('area-kuis');
    });
  }

  const mulaiMirip = document.getElementById('mulai-mirip');
  if (mulaiMirip) mulaiMirip.addEventListener('click', soalMirip);

  const pilihTingkatBaca = document.getElementById('pilih-tingkat-baca');
  if (pilihTingkatBaca) {
    pilihTingkatBaca.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil') as HTMLElement;
      if (!pil || !pil.dataset.tingkat) return;
      tingkatBaca = pil.dataset.tingkat;
      pilihPil('pilih-tingkat-baca', tingkatBaca, 'tingkat');
    });
  }

  const mulaiBaca = document.getElementById('mulai-baca');
  if (mulaiBaca) mulaiBaca.addEventListener('click', soalBaca);

  const kKanji = document.getElementById('mulai-kuis-kanji');
  if (kKanji) kKanji.addEventListener('click', () => mulaiKuisN('kanji'));

  const kKosakata = document.getElementById('mulai-kuis-kosakata');
  if (kKosakata) kKosakata.addEventListener('click', () => mulaiKuisN('kosakata'));

  const kGrammar = document.getElementById('mulai-kuis-grammar');
  if (kGrammar) kGrammar.addEventListener('click', () => mulaiKuisN('grammar'));

  gambarRingkasHarian();
}
