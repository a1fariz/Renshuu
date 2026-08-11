import {
  HIRAGANA, KATAKANA, DAKUTEN, HANDAKUTEN, YOUON, SERAPAN, HURUF_MIRIP, ATURAN_KHUSUS, SEMUA_KANA, URUTAN_BELAJAR
} from '../data/kana';
import { KANJI_N5, KANJI_N4, SEMUA_KANJI, TEMA_KANJI } from '../data/kanji';
import { KOSAKATA_N5, KOSAKATA_N4, SEMUA_KOSAKATA, TEMA_KOSAKATA } from '../data/kosakata';
import { GRAMMAR_BELAJAR_N5, GRAMMAR_BELAJAR_N4, SEMUA_GRAMMAR } from '../data/grammar';
import { PETA_JALAN, METODE, RUTINITAS_HARIAN } from '../data/peta';
import { KONSEP_UTAMA, RINGKASAN_PANEL } from '../data/konsep';
import {
  muatProgres, statusKartu, labelStatus, ringkasProgres, kartuJatuhTempo,
  exportProgres, importProgres, resetProgres, hariIni, hitungStreak
} from '../services/srs';
import { ucapkan } from '../services/speech';
import { kumpulanKuisKustom, gambarRingkasHarian } from './kuis';
import type { KanaItem, KanjiItem, KosakataItem, GrammarBelajar, ProgresSRS } from '../types';

export let PROGRES: ProgresSRS = muatProgres();

export function reloadProgres(): void {
  PROGRES = muatProgres();
}

export let sistemAktif = 'hiragana';
export let barisAktif = 'semua';

export function setSistemAktif(val: string) { sistemAktif = val; }
export function setBarisAktif(val: string) { barisAktif = val; }

export let levelKanji = 'N5';
export let temaKanji = 'semua';

export function kanjiTampil(): KanjiItem[] {
  let daftar = SEMUA_KANJI.filter(k => k.level === levelKanji);
  if (temaKanji !== 'semua') daftar = daftar.filter(k => k.tema === temaKanji);
  return daftar;
}

export let levelKosakata = 'N5';
export let temaKosakata = 'semua';

export function kosakataTampil(): KosakataItem[] {
  let daftar = SEMUA_KOSAKATA.filter(k => k.level === levelKosakata);
  if (temaKosakata !== 'semua') daftar = daftar.filter(k => k.tema === temaKosakata);
  return daftar;
}

export function gambarKonsep(): void {
  let html = '';
  KONSEP_UTAMA.forEach((k, i) => {
    const detailHtml = k.detail
      .split('\n')
      .map(par => par.trim() ? `<p>${par}</p>` : '')
      .join('');

    html += `
      <div class="panel konsep-kartu">
        <h2>${k.judul}</h2>
        <p class="konsep-ringkas">${k.ringkas}</p>
        ${detailHtml ? `
          <button class="tombol halus kecil" data-toggle-detail="${i}">Baca lebih detail</button>
          <div class="konsep-detail sembunyi" id="detail-konsep-${i}">${detailHtml}</div>
        ` : ''}
        ${k.contoh && k.contoh.length ? `
          <ul class="daftar-contoh">
            ${k.contoh.map(c => `
              <li>
                <span class="contoh-kata">${c.jp}</span>
                <span class="contoh-baca">${c.baca}</span>
                <span class="contoh-arti">${c.arti}</span>
                <button class="tombol-suara" data-ucap="${c.jp}" title="Dengarkan">&#9834;</button>
              </li>`).join('')}
          </ul>` : ''}
      </div>`;
  });

  const elem = document.getElementById('daftar-konsep');
  if (elem) elem.innerHTML = html;
}

export function gambarRingkasanBelajar(): void {
  const info = RINGKASAN_PANEL[sistemAktif];
  if (!info) return;

  const judul = document.getElementById('konsep-judul-belajar');
  const isi = document.getElementById('isi-konsep-belajar');
  const toggle = document.getElementById('toggle-konsep-belajar');

  if (judul) judul.textContent = info.judul;
  if (isi) {
    isi.innerHTML = `
      <p>${info.isi}</p>
      <p class="catatan-kecil">
        Penjelasan lengkapnya ada di halaman <button class="link-btn" data-pintasan="konsep">Konsep</button>.
      </p>`;
  }
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    const ikon = toggle.querySelector('.toggle-ikon');
    if (ikon) ikon.textContent = '+';
  }
  if (isi) isi.classList.add('sembunyi');
}

export function gambarAreaTes(): void {
  const wadah = document.getElementById('area-tes-baris');
  if (!wadah) return;

  const daftar = daftarSistem();
  const tampil = barisAktif === 'semua' ? daftar : daftar.filter(k => k.baris === barisAktif);

  if (tampil.length === 0) {
    wadah.classList.add('sembunyi');
    return;
  }

  const tombolBaris = document.getElementById('tes-baris-ini');
  const label = document.getElementById('label-tes-baris');

  let namaKelompok = '';
  if (barisAktif === 'semua') {
    namaKelompok = sistemAktif === 'hiragana' ? 'hiragana'
                 : sistemAktif === 'katakana' ? 'katakana'
                 : sistemAktif === 'dakuten' ? 'dakuten & handakuten'
                 : sistemAktif === 'youon' ? 'youon'
                 : 'bunyi serapan';
  } else {
    const contoh = tampil.map(k => k.kana).join('');
    namaKelompok = `baris ${contoh}`;
  }

  if (tombolBaris) tombolBaris.textContent = `Tes ${namaKelompok}`;
  if (label) {
    const daftarId = tampil.map(k => (k.tipe || 'serapan') + '-' + k.kana);
    const r = ringkasProgres(PROGRES, daftarId);
    if (r.dikuasai > 0 || r.dilatih > 0) {
      label.innerHTML = `Sudah ada <strong>${r.dikuasai + r.dilatih} huruf</strong> yang kamu sentuh di ${namaKelompok}. ` +
        'Tes campuran untuk memastikan kamu benar-benar hafal, bukan cuma hafal urutan.';
    } else {
      label.textContent = 'Cek apakah materi ini sudah menempel sebelum lanjut ke berikutnya.';
    }
  }
  wadah.classList.remove('sembunyi');
}

export function perbaruiTampilanBelajar(): void {
  gambarPilihBaris();
  gambarGridKana();
  gambarRingkasanBelajar();
  gambarAreaTes();
}

export let levelGrammar = 'N5';

export function grammarTampil(): GrammarBelajar[] {
  return SEMUA_GRAMMAR.filter(g => g.level === levelGrammar);
}

export function bukaHalaman(nama: string): void {
  document.querySelectorAll('.halaman').forEach(h => h.classList.remove('aktif'));

  const halaman = document.getElementById('halaman-' + nama);
  if (halaman) halaman.classList.add('aktif');

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('aktif');
    b.removeAttribute('aria-current');
  });
  const tombol = document.querySelector(`.nav-btn[data-halaman="${nama}"]`);
  if (tombol) {
    tombol.classList.add('aktif');
    tombol.setAttribute('aria-current', 'page');
    const grup = tombol.closest('.nav-grup');
    if (grup) {
      const induk = grup.querySelector('.nav-grup-induk');
      induk?.classList.add('aktif');
      induk?.setAttribute('aria-expanded', 'true');
    }
  }

  const nav = document.getElementById('nav');
  if (nav) nav.classList.remove('terbuka');
  const hamburger = document.getElementById('nav-hamburger');
  if (hamburger) {
    hamburger.textContent = '☰';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Buka menu');
  }

  document.querySelectorAll('.nav-grup.terbuka').forEach(g => {
    g.classList.remove('terbuka');
    g.querySelector('.nav-grup-induk')?.setAttribute('aria-expanded', 'false');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (nama === 'beranda') gambarBeranda();
  if (nama === 'konsep') gambarKonsep();
  if (nama === 'belajar') perbaruiTampilanBelajar();
}

export function pilihPil(idWadah: string, nilai: string, namaData: string): void {
  const wadah = document.getElementById(idWadah);
  if (!wadah) return;
  wadah.querySelectorAll('.pil').forEach(p => {
    const el = p as HTMLElement;
    p.classList.toggle('aktif', el.dataset[namaData] === nilai);
  });
}

export function kartuRingkas(nama: string, daftarId: string[], satuan: string): string {
  const r = ringkasProgres(PROGRES, daftarId);
  const total = daftarId.length;
  const persen = total > 0 ? Math.round((r.dikuasai / total) * 100) : 0;
  return `
    <div class="kartu-ringkas">
      <h3>${nama}</h3>
      <div class="progres-angka">
        <strong>${r.dikuasai} / ${total}</strong> ${satuan} dikuasai
        <span class="persen">${persen}%</span>
      </div>
      <div class="bar-status">
        <span class="bar dikuasai" style="flex:${r.dikuasai || 0.001}"></span>
        <span class="bar hampir" style="flex:${r.hampir || 0.001}"></span>
        <span class="bar dilatih" style="flex:${r.dilatih || 0.001}"></span>
        <span class="bar belum" style="flex:${r.belum || 0.001}"></span>
      </div>
      <ul class="rincian-status">
        <li><span class="titik dikuasai"></span> Dikuasai: ${r.dikuasai}</li>
        <li><span class="titik hampir"></span> Hampir hafal: ${r.hampir}</li>
        <li><span class="titik dilatih"></span> Masih dilatih: ${r.dilatih}</li>
        <li><span class="titik belum"></span> Belum disentuh: ${r.belum}</li>
      </ul>
    </div>`;
}

export function gambarTugasHariIni(): void {
  const semuaId = URUTAN_BELAJAR.map(k => k.tipe + '-' + k.kana);
  const jatuhTempo = kartuJatuhTempo(PROGRES, semuaId);
  const belumTersentuh = semuaId.filter(id => !PROGRES.kartu[id]);

  const antreanLanjut = [
    { nama: 'Kanji', halaman: 'kanji',
      id: SEMUA_KANJI.map(k => 'kanji-' + k.kanji), satuan: 'kanji' },
    { nama: 'Kosakata', halaman: 'kosakata',
      id: SEMUA_KOSAKATA.map(k => 'kata-' + k.kata), satuan: 'kata' },
    { nama: 'Grammar', halaman: 'grammar',
      id: SEMUA_GRAMMAR.map(g => 'grammar-' + g.id), satuan: 'pola' }
  ].map(m => ({ ...m, tempo: kartuJatuhTempo(PROGRES, m.id) }))
   .filter(m => m.tempo.length > 0);

  let html = '';

  if (jatuhTempo.length > 0) {
    html += `
      <div class="tugas">
        <div class="tugas-teks">
          <strong>Review hari ini: ${jatuhTempo.length} huruf jatuh tempo</strong>
          <span>Ini yang paling penting. Kerjakan ini dulu sebelum menambah huruf baru.</span>
        </div>
        <button class="tombol utama" data-pintasan="latihan-jatuhtempo">Mulai review</button>
      </div>`;
  } else if (antreanLanjut.length === 0) {
    html += `
      <div class="tugas selesai">
        <div class="tugas-teks">
          <strong>Tidak ada yang perlu diulang hari ini</strong>
          <span>Antrean ulanganmu kosong. Waktu yang bagus untuk menambah materi baru.</span>
        </div>
      </div>`;
  }

  antreanLanjut.forEach(m => {
    html += `
      <div class="tugas">
        <div class="tugas-teks">
          <strong>${m.tempo.length} ${m.satuan} perlu diulang hari ini</strong>
          <span>Antrean di menu ${m.nama}.</span>
        </div>
        <button class="tombol" data-pintasan="buka-${m.halaman}">Buka ${m.nama}</button>
      </div>`;
  });

  if (belumTersentuh.length > 0) {
    const berikutnya = URUTAN_BELAJAR.find(k => !PROGRES.kartu[k.tipe + '-' + k.kana]);
    const limaBerikutnya = URUTAN_BELAJAR
      .filter(k => !PROGRES.kartu[k.tipe + '-' + k.kana])
      .slice(0, 5);

    if (berikutnya) {
      html += `
        <div class="tugas">
          <div class="tugas-teks">
            <strong>Huruf baru berikutnya: ${berikutnya.kana} (${berikutnya.romaji})</strong>
            <span>Masih ada ${belumTersentuh.length} huruf yang belum kamu sentuh sama sekali.</span>
          </div>
          <button class="tombol" data-pintasan="belajar">Pelajari</button>
        </div>`;
    }

    const disentuhHariIni = URUTAN_BELAJAR.filter(k => {
      const kartu = PROGRES.kartu[k.tipe + '-' + k.kana];
      return kartu && kartu.terakhirDilihat === hariIni() && kartu.kaliDilihat === 1;
    }).length;

    const targetTerpenuhi = disentuhHariIni >= 5;

    html += `
      <div class="target-hari-ini">
        <h3>Target hari ini: 5 huruf baru <span class="persen">(${Math.min(disentuhHariIni, 5)}/5 hari ini)</span></h3>
        <p class="petunjuk-kecil">Aplikasi yang memilih, kamu tinggal jalan. Disentuh sekali lewat Uji Saya atau Latihan sudah dihitung.</p>
        ${targetTerpenuhi ? `<p class="pesan-target-terpenuhi"><strong>Target hari ini terpenuhi.</strong> Besok ada 5 huruf baru menunggu.</p>` : ''}
        <ul class="target-list">
          ${limaBerikutnya.map(k => {
            const kartu = PROGRES.kartu[k.tipe + '-' + k.kana];
            const selesaiKem = kartu && kartu.kaliDilihat > 0;
            return `
            <li class="${selesaiKem ? 'selesai' : ''}">
              <span class="target-kana">${k.kana}</span>
              <span class="target-romaji">${k.romaji}</span>
              <button class="tombol halus kecil" data-uji-satu="${kartuKunci(k)}">Uji</button>
            </li>`;
          }).join('')}
        </ul>
        ${targetTerpenuhi ? '' : '<button class="tombol utama" data-pintasan="uji-target">Uji 5 huruf ini</button>'}
      </div>`;
  } else {
    html += `
      <div class="target-hari-ini">
        <h3>Semua kana sudah kamu sentuh</h3>
        <p class="petunjuk-kecil">Target berikutnya bertambah sampai N5/N4. Sekarang fokus ke ulangan.</p>
      </div>`;
  }

  const { streak, hariAktif } = hitungStreak(PROGRES);
  const hariIniStr = hariIni();
  const sudahHariIni = hariAktif.has(hariIniStr);

  let kalenderHtml = '<div class="kalender-mini">';
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const tgl = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const aktif = hariAktif.has(tgl);
    const tanggalIni = i === 0;
    const label = d.getDate();
    kalenderHtml += `<span class="hari-kal ${aktif ? 'aktif' : ''} ${tanggalIni ? 'ini' : ''}" title="${tgl}">${label}</span>`;
  }
  kalenderHtml += '</div>';

  html += `
    <div class="streak-panel">
      <div class="streak-info">
        <div class="streak-angka">
          <strong>${streak}</strong>
          <span>hari berturut-turut</span>
        </div>
        ${sudahHariIni
          ? '<span class="streak-hari-ini selesai">Hari ini sudah aktif</span>'
          : '<span class="streak-hari-ini">Belum latihan hari ini</span>'}
      </div>
      ${kalenderHtml}
    </div>`;

  html += `
    <div class="rutinitas">
      <h3>Rutinitas harian yang disarankan (±45 menit)</h3>
      <table class="tabel-rutinitas">
        ${RUTINITAS_HARIAN.map(r => `
          <tr><td class="menit">${r.menit}</td><td>${r.kegiatan}</td></tr>
        `).join('')}
      </table>
    </div>`;

  const elem = document.getElementById('tugas-hari-ini');
  if (elem) elem.innerHTML = html;
}

export function gambarPanduanLangkah(): void {
  const idHiragana = HIRAGANA.map(k => k.tipe + '-' + k.kana);
  const idKatakana = KATAKANA.map(k => k.tipe + '-' + k.kana);
  const idDakuten = [...DAKUTEN, ...HANDAKUTEN].map(k => k.tipe + '-' + k.kana);
  const idYouon = YOUON.map(k => k.tipe + '-' + k.kana);
  const idSerapan = SERAPAN.map(k => k.tipe + '-' + k.kana);

  const hDikuasai = ringkasProgres(PROGRES, idHiragana).dikuasai;
  const kDikuasai = ringkasProgres(PROGRES, idKatakana).dikuasai;
  const dDikuasai = ringkasProgres(PROGRES, idDakuten).dikuasai;
  const yDikuasai = ringkasProgres(PROGRES, idYouon).dikuasai;
  const sDikuasai = ringkasProgres(PROGRES, idSerapan).dikuasai;

  const adaProgres = (hDikuasai + kDikuasai + dDikuasai + yDikuasai + sDikuasai) > 0;

  if (!adaProgres) {
    const htmlLangkah = `
      <ol class="daftar-langkah">
        <li>
          <span class="langkah-nomor">1</span>
          <div class="langkah-teks">
            <strong>Pahami dulu apa yang kamu pelajari</strong>
            <p>Bahasa Jepang punya dua huruf bunyi yang bunyinya sama tapi fungsinya beda. Baca penjelasan singkatnya supaya tidak bingung di tengah jalan.</p>
          </div>
          <button class="tombol" data-pintasan="konsep">Buka Konsep</button>
        </li>
        <li>
          <span class="langkah-nomor">2</span>
          <div class="langkah-teks">
            <strong>Pelajari baris pertama: あいうえお</strong>
            <p>Satu-satunya baris yang murni vokal. Setelah ini, semua baris lain hanya menempelkan konsonan ke depannya.</p>
          </div>
          <button class="tombol utama" data-pintasan="belajar-a">Mulai baris あ</button>
        </li>
        <li>
          <span class="langkah-nomor">3</span>
          <div class="langkah-teks">
            <strong>Uji ingatanmu</strong>
            <p>Setelah merasa hafal, pastikan lewat halaman Latihan. Pilih "Yang sudah kupelajari" untuk tes campuran.</p>
          </div>
          <button class="tombol" data-pintasan="latihan">Buka Latihan</button>
        </li>
      </ol>`;
    const elem = document.getElementById('panduan-langkah');
    if (elem) elem.innerHTML = htmlLangkah;
    const panel = document.getElementById('panel-pintasan');
    if (panel) panel.classList.add('sembunyi');
    return;
  }

  const elemen = document.getElementById('panel-pintasan');
  if (elemen) elemen.classList.remove('sembunyi');

  let pesan = '';
  let tombolHtml = '';

  if (hDikuasai < HIRAGANA.length) {
    const berikutnya = HIRAGANA.find(k => !PROGRES.kartu[k.tipe + '-' + k.kana]);
    pesan = `Kamu masih di bagian hiragana. ${hDikuasai} dari ${HIRAGANA.length} huruf sudah dikuasai. ` +
      (berikutnya ? `Lanjutkan ke huruf berikutnya: <strong>${berikutnya.kana} (${berikutnya.romaji})</strong>.` : 'Tinggal sedikit lagi.');
    tombolHtml = `<button class="tombol utama" data-pintasan="belajar">Lanjutkan hiragana</button>`;
  } else if (dDikuasai < idDakuten.length) {
    pesan = 'Hiragana sudah lengkap. Sekarang kuasai dakuten dan youon.';
    tombolHtml = `<button class="tombol utama" data-pintasan="belajar-dakuten">Pelajari dakuten</button>`;
  } else if (yDikuasai < idYouon.length) {
    pesan = 'Dakuten selesai. Tinggal youon (bunyi gabungan seperti kya, shu, cho) sebelum pindah ke katakana.';
    tombolHtml = `<button class="tombol utama" data-pintasan="belajar-youon">Pelajari youon</button>`;
  } else if (kDikuasai < KATAKANA.length) {
    const berikutnya = KATAKANA.find(k => !PROGRES.kartu[k.tipe + '-' + k.kana]);
    pesan = `Sekarang bagian katakana. ${kDikuasai} dari ${KATAKANA.length} huruf sudah dikuasai. ` +
      (berikutnya ? `Huruf berikutnya: <strong>${berikutnya.kana} (${berikutnya.romaji})</strong>.` : '');
    tombolHtml = `<button class="tombol utama" data-pintasan="belajar-katakana">Lanjutkan katakana</button>`;
  } else if (sDikuasai < SERAPAN.length) {
    pesan = `Terakhir, kuasai bunyi serapan seperti fa, ti, dan she. ${sDikuasai} dari ${SERAPAN.length} sudah dikuasai.`;
    tombolHtml = `<button class="tombol utama" data-pintasan="belajar-serapan">Pelajari bunyi serapan</button>`;
  } else {
    pesan = 'Kana lengkap. Saatnya menguji dengan membaca kata utuh, bukan huruf lepas.';
    tombolHtml = `<button class="tombol utama" data-pintasan="baca">Baca kata utuh</button>`;
  }

  const htmlLangkah = `
    <div class="tugas">
      <div class="tugas-teks">
        <strong>Langkahmu berikutnya</strong>
        <p style="margin:0;font-size:14px;color:var(--teks-lembut)">${pesan}</p>
      </div>
      ${tombolHtml}
    </div>`;

  const elem = document.getElementById('panduan-langkah');
  if (elem) elem.innerHTML = htmlLangkah;
}

export function gambarBeranda(): void {
  const kelompok = [
    { nama: 'Hiragana', daftar: HIRAGANA, satuan: 'huruf' },
    { nama: 'Katakana', daftar: KATAKANA, satuan: 'huruf' },
    { nama: 'Dakuten', daftar: [...DAKUTEN, ...HANDAKUTEN], satuan: 'huruf' },
    { nama: 'Youon', daftar: YOUON, satuan: 'huruf' },
    { nama: 'Bunyi Serapan', daftar: SERAPAN, satuan: 'huruf' }
  ];

  let html = '';
  kelompok.forEach(k => {
    const daftarId = k.daftar.map(x => x.tipe + '-' + x.kana);
    html += kartuRingkas(k.nama, daftarId, k.satuan);
  });

  const kelompokLanjut = [
    { nama: 'Kanji N5', daftarId: KANJI_N5.map(k => 'kanji-' + k.kanji), satuan: 'kanji' },
    { nama: 'Kanji N4', daftarId: KANJI_N4.map(k => 'kanji-' + k.kanji), satuan: 'kanji' },
    { nama: 'Kosakata N5', daftarId: KOSAKATA_N5.map(k => 'kata-' + k.kata), satuan: 'kata' },
    { nama: 'Kosakata N4', daftarId: KOSAKATA_N4.map(k => 'kata-' + k.kata), satuan: 'kata' },
    { nama: 'Grammar N5', daftarId: GRAMMAR_BELAJAR_N5.map(g => 'grammar-' + g.id), satuan: 'pola' },
    { nama: 'Grammar N4', daftarId: GRAMMAR_BELAJAR_N4.map(g => 'grammar-' + g.id), satuan: 'pola' }
  ];

  kelompokLanjut.forEach(k => {
    const adaYangDisentuh = k.daftarId.some(id => PROGRES.kartu[id]);
    if (adaYangDisentuh) html += kartuRingkas(k.nama, k.daftarId, k.satuan);
  });

  const ringkasBeranda = document.getElementById('ringkas-beranda');
  if (ringkasBeranda) ringkasBeranda.innerHTML = html;
  gambarTugasHariIni();
  gambarPanduanLangkah();
}

export function daftarSistem(): KanaItem[] {
  if (sistemAktif === 'hiragana') return HIRAGANA;
  if (sistemAktif === 'katakana') return KATAKANA;
  if (sistemAktif === 'dakuten') return [...DAKUTEN, ...HANDAKUTEN];
  if (sistemAktif === 'youon') return YOUON;
  if (sistemAktif === 'serapan') return SERAPAN;
  return HIRAGANA;
}

export function gambarPilihBaris(): void {
  const wadah = document.getElementById('pilih-baris');
  if (!wadah) return;

  if (sistemAktif === 'youon' || sistemAktif === 'serapan') {
    wadah.innerHTML = '';
    barisAktif = 'semua';
    return;
  }

  const daftar = daftarSistem();
  const barisUnik = [...new Set(daftar.map(k => k.baris).filter(Boolean))] as string[];

  let html = `<button class="pil-baris ${barisAktif === 'semua' ? 'aktif' : ''}" data-baris="semua">Semua</button>`;
  barisUnik.forEach(b => {
    const contoh = daftar.filter(k => k.baris === b).map(k => k.kana).join('');
    html += `<button class="pil-baris ${barisAktif === b ? 'aktif' : ''}" data-baris="${b}">${contoh}</button>`;
  });

  wadah.innerHTML = html;
}

export function kartuKunci(k: KanaItem): string {
  return (k.tipe || 'serapan') + '-' + k.kana;
}

export function gambarGridKana(): void {
  const daftar = daftarSistem();
  const tampil = barisAktif === 'semua' ? daftar : daftar.filter(k => k.baris === barisAktif);

  let html = '';
  tampil.forEach(k => {
    const id = kartuKunci(k);
    const kartu = PROGRES.kartu[id];
    const status = statusKartu(kartu);
    const tersentuh = kartu && kartu.kaliDilihat > 0;

    const contohHtml = (k.contoh || []).map(c => `
      <li>
        <span class="contoh-kata">${c.kata}</span>
        <span class="contoh-baca">${c.baca}</span>
        <span class="contoh-arti">${c.arti}</span>
      </li>`).join('');

    html += `
      <div class="kartu-kana status-${status}" data-jenis="kana">
        <div class="kartu-kepala">
          <span class="kana-besar">${k.kana}</span>
          <div class="kartu-info">
            <span class="romaji">${k.romaji}</span>
            <span class="lencana ${status}">${labelStatus(status)}</span>
          </div>
        </div>
        <div class="kartu-aksi">
          <button class="tombol halus kecil tombol-dengar" data-ucap="${k.kana}">&#9834; Dengar</button>
          <button class="tombol halus kecil" data-tulis="${id}">&#9998; Tulis</button>
          <button class="tombol halus kecil" data-uji-satu="${id}">Uji saya</button>
        </div>
        <details class="kartu-detail" ${tersentuh ? '' : 'open'}>
          <summary>Cara ingat, coretan &amp; contoh</summary>
          ${(k as any).asal ? `<p class="asal">Dari huruf <strong>${(k as any).asal}</strong> + tanda ${k.tipe === 'dakuten' ? 'dakuten ゛' : 'handakuten ゜'}</p>` : ''}
          ${k.mnemonic ? `<p class="mnemonic"><strong>Cara mengingat:</strong> ${k.mnemonic}</p>` : ''}
          ${k.coretan ? `<p class="coretan"><strong>Urutan coretan:</strong> ${k.coretan}</p>` : ''}
          ${contohHtml ? `<ul class="daftar-contoh">${contohHtml}</ul>` : ''}
        </details>
      </div>`;
  });

  const gridKana = document.getElementById('grid-kana');
  if (gridKana) gridKana.innerHTML = html || '<p class="petunjuk">Tidak ada huruf di bagian ini.</p>';
}

export function gambarHurufMirip(): void {
  let html = '';
  HURUF_MIRIP.forEach(m => {
    html += `
      <div class="panel kartu-mirip">
        <div class="mirip-huruf">
          ${m.pasangan.map((h, i) => `
            <div class="mirip-satu">
              <span class="kana-besar">${h}</span>
              <span class="romaji">${m.romaji[i]}</span>
              <button class="tombol-suara" data-ucap="${h}">&#9834;</button>
            </div>`).join('<span class="vs">vs</span>')}
        </div>
        <p class="kunci"><strong>Kuncinya:</strong> ${m.kunci}</p>
      </div>`;
  });
  const elem = document.getElementById('daftar-mirip');
  if (elem) elem.innerHTML = html;
}

export function gambarAturan(): void {
  let html = '';
  ATURAN_KHUSUS.forEach(a => {
    html += `
      <div class="panel">
        <h2>${a.nama}</h2>
        <p>${a.isi}</p>
        <ul class="daftar-contoh">
          ${a.contoh.map(c => `
            <li>
              <span class="contoh-kata">${c.kata}</span>
              <span class="contoh-baca">${c.baca}</span>
              <span class="contoh-arti">${c.arti}</span>
            </li>`).join('')}
        </ul>
        <p class="tips"><strong>Catatan:</strong> ${a.tips}</p>
      </div>`;
  });
  const elem = document.getElementById('daftar-aturan');
  if (elem) elem.innerHTML = html;
}

export function gambarPeta(): void {
  let html = `
    <p class="petunjuk">
      Disusun untuk kondisimu: mulai Agustus 2026, masuk LPK September 2026,
      target ujian N4 Desember 2027. Prioritas nomor satu adalah menuntaskan
      kana sebelum LPK mulai.
    </p>`;

  PETA_JALAN.forEach(f => {
    html += `
      <div class="panel fase ${f.warna}">
        <div class="fase-kepala">
          <span class="fase-label">${f.fase}</span>
          <h2>${f.judul}</h2>
          <span class="fase-periode">${f.periode}</span>
        </div>
        <p class="fase-target"><strong>Target:</strong> ${f.target}</p>
        <p class="fase-catatan">${f.catatan}</p>
        ${f.rincian.map(r => `
          <div class="rincian">
            <h3>${r.label}</h3>
            <ul>${r.isi.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>`;
  });

  html += `
    <div class="panel">
      <h2>Metode yang dipakai aplikasi ini</h2>
      ${METODE.map(m => `<p><strong>${m.nama}.</strong> ${m.isi}</p>`).join('')}
    </div>

    <div class="panel">
      <h2>Materi yang tersedia di aplikasi ini</h2>
      <p>Semuanya sudah bisa dipelajari dan dikuis di sini, tidak cuma daftar bacaan.</p>
      <ul class="rincian-status besar">
        <li><span class="titik dikuasai"></span> Kana: ${SEMUA_KANA.length} huruf — menu <strong>Huruf</strong></li>
        <li><span class="titik dikuasai"></span> Kanji: ${KANJI_N5.length} N5 + ${KANJI_N4.length} N4 — menu <strong>Kanji</strong></li>
        <li><span class="titik dikuasai"></span> Kosakata: ${KOSAKATA_N5.length} N5 + ${KOSAKATA_N4.length} N4 — menu <strong>Kosakata</strong></li>
        <li><span class="titik dikuasai"></span> Grammar: ${GRAMMAR_BELAJAR_N5.length} N5 + ${GRAMMAR_BELAJAR_N4.length} N4 — menu <strong>Grammar</strong></li>
      </ul>
      <p class="catatan-kecil">
        Jumlah ini belum sebanyak target resmi JLPT (N5 ±800 kosakata, N4 ±1.500).
        Yang ada di sini adalah bagian yang paling sering muncul — cukup untuk
        modal masuk LPK dan mengikuti kelas. Sisanya kamu dapat dari kelas LPK
        dan buku Try! atau Minna no Nihongo.
      </p>
    </div>`;

  const elem = document.getElementById('isi-peta');
  if (elem) elem.innerHTML = html;
}

export function gambarPilihTemaKanji(): void {
  const daftar = SEMUA_KANJI.filter(k => k.level === levelKanji);
  const temaUnik = [...new Set(daftar.map(k => k.tema))];

  let html = `<button class="pil-baris ${temaKanji === 'semua' ? 'aktif' : ''}" data-tema="semua">Semua (${daftar.length})</button>`;
  temaUnik.forEach(t => {
    const info = TEMA_KANJI.find(x => x.id === t);
    const label = info ? info.label : t;
    const jumlah = daftar.filter(k => k.tema === t).length;
    html += `<button class="pil-baris ${temaKanji === t ? 'aktif' : ''}" data-tema="${t}">${label} (${jumlah})</button>`;
  });

  const elem = document.getElementById('pilih-tema-kanji');
  if (elem) elem.innerHTML = html;
}

export function gambarGridKanji(): void {
  const tampil = kanjiTampil();

  let html = '';
  tampil.forEach(k => {
    const id = 'kanji-' + k.kanji;
    const status = statusKartu(PROGRES.kartu[id]);

    const kataHtml = (k.kata || []).map(c => `
      <li>
        <span class="contoh-kata">${c.kata}</span>
        <span class="contoh-baca">${c.baca}</span>
        <span class="contoh-arti">${c.arti}</span>
      </li>`).join('');

    html += `
      <div class="kartu-kana kartu-kanji status-${status}" data-jenis="kanji">
        <div class="kartu-kepala">
          <span class="kana-besar">${k.kanji}</span>
          <div class="kartu-info">
            <span class="romaji">${k.arti}</span>
            <span class="lencana ${status}">${labelStatus(status)}</span>
          </div>
          <button class="tombol-suara" data-ucap="${k.kanji}" title="Dengarkan">&#9834;</button>
        </div>
        <p class="coretan"><strong>On:</strong> ${k.on} &nbsp;·&nbsp; <strong>Kun:</strong> ${k.kun} &nbsp;·&nbsp; ${k.coretan} coretan</p>
        ${kataHtml ? `<ul class="daftar-contoh">${kataHtml}</ul>` : ''}
      </div>`;
  });

  const elem = document.getElementById('grid-kanji');
  if (elem) elem.innerHTML = html || '<p class="petunjuk">Tidak ada kanji di bagian ini.</p>';
}

export function gambarPilihTemaKosakata(): void {
  const daftar = SEMUA_KOSAKATA.filter(k => k.level === levelKosakata);
  const temaUnik = [...new Set(daftar.map(k => k.tema))];

  let html = `<button class="pil-baris ${temaKosakata === 'semua' ? 'aktif' : ''}" data-tema="semua">Semua (${daftar.length})</button>`;
  temaUnik.forEach(t => {
    const info = TEMA_KOSAKATA.find(x => x.id === t);
    const label = info ? info.label : t;
    const jumlah = daftar.filter(k => k.tema === t).length;
    html += `<button class="pil-baris ${temaKosakata === t ? 'aktif' : ''}" data-tema="${t}">${label} (${jumlah})</button>`;
  });

  const elem = document.getElementById('pilih-tema-kosakata');
  if (elem) elem.innerHTML = html;
}

export function gambarDaftarKosakata(): void {
  const tampil = kosakataTampil();
  const pakaiRomaji = levelKosakata === 'N5';

  let html = '<div class="grid-kosakata">';
  tampil.forEach(k => {
    const id = 'kata-' + k.kata;
    const status = statusKartu(PROGRES.kartu[id]);

    html += `
      <div class="kartu-kosakata status-${status}">
        <div class="kosakata-atas">
          <span class="kosakata-kata">${k.kata}</span>
          <button class="tombol-suara" data-ucap="${k.kata}" title="Dengarkan">&#9834;</button>
        </div>
        <span class="kosakata-kana">${k.kana}</span>
        ${pakaiRomaji ? `<span class="kosakata-romaji">${k.romaji}</span>` : ''}
        <span class="kosakata-arti">${k.arti}</span>
        <span class="lencana ${status}">${labelStatus(status)}</span>
      </div>`;
  });
  html += '</div>';

  const elem = document.getElementById('daftar-kosakata');
  if (elem) elem.innerHTML = tampil.length ? html : '<p class="petunjuk">Tidak ada kata di bagian ini.</p>';
}

export function gambarDaftarGrammar(): void {
  const tampil = grammarTampil();

  let html = '';
  tampil.forEach(g => {
    const id = 'grammar-' + g.id;
    const status = statusKartu(PROGRES.kartu[id]);

    const contohHtml = g.contoh.map(c => `
      <li>
        <span class="contoh-kata">${c.jp}</span>
        <span class="contoh-baca">${c.baca}</span>
        <span class="contoh-arti">${c.arti}</span>
        <button class="tombol-suara" data-ucap="${c.jp}" title="Dengarkan">&#9834;</button>
      </li>`).join('');

    html += `
      <div class="panel kartu-grammar status-${status}">
        <div class="grammar-kepala">
          <span class="grammar-urutan">${g.urutan}</span>
          <div>
            <h2 class="grammar-pola">${g.pola}</h2>
            <span class="grammar-arti">${g.arti}</span>
          </div>
          <span class="lencana ${status}">${labelStatus(status)}</span>
        </div>
        <p class="grammar-cara">${g.cara}</p>
        <ul class="daftar-contoh">${contohHtml}</ul>
        ${g.catatan ? `<p class="tips"><strong>Sering salah:</strong> ${g.catatan}</p>` : ''}
      </div>`;
  });

  const elem = document.getElementById('daftar-grammar');
  if (elem) elem.innerHTML = html;
}

export function inisialisasiAppListeners(): void {
  const temaTersimpan = localStorage.getItem('renshuu-tema');
  if (temaTersimpan === 'gelap') document.documentElement.setAttribute('data-theme', 'gelap');
  else if (!temaTersimpan && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'gelap');
  }

  const toggleGelap = document.getElementById('toggle-gelap');
  if (toggleGelap) {
    const perbaruiAriaTema = () => toggleGelap.setAttribute(
      'aria-pressed',
      String(document.documentElement.getAttribute('data-theme') === 'gelap')
    );
    perbaruiAriaTema();
    toggleGelap.addEventListener('click', function () {
      const gelap = document.documentElement.getAttribute('data-theme') === 'gelap';
      if (gelap) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('renshuu-tema', 'terang');
      } else {
        document.documentElement.setAttribute('data-theme', 'gelap');
        localStorage.setItem('renshuu-tema', 'gelap');
      }
      perbaruiAriaTema();
    });
  }

  const nav = document.getElementById('nav');
  if (nav) {
    nav.addEventListener('click', function (e) {
      const target = e.target as HTMLElement;
      const tombol = target.closest('.nav-btn') as HTMLElement;
      if (tombol && tombol.dataset.halaman) bukaHalaman(tombol.dataset.halaman);
    });
  }

  const hamburger = document.getElementById('nav-hamburger');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const terbuka = nav.classList.toggle('terbuka');
      hamburger.textContent = terbuka ? '×' : '☰';
      hamburger.setAttribute('aria-expanded', String(terbuka));
      hamburger.setAttribute('aria-label', terbuka ? 'Tutup menu' : 'Buka menu');
    });
  }

  document.querySelectorAll('.nav-grup-induk').forEach(induk => {
    induk.addEventListener('click', function (this: HTMLElement, e: Event) {
      e.stopPropagation();
      const grup = this.closest('.nav-grup');
      if (!grup) return;
      const sudahTerbuka = grup.classList.contains('terbuka');
      document.querySelectorAll('.nav-grup.terbuka').forEach(g => {
        g.classList.remove('terbuka');
        g.querySelector('.nav-grup-induk')?.setAttribute('aria-expanded', 'false');
      });
      if (!sudahTerbuka) {
        grup.classList.add('terbuka');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!(e.target as HTMLElement).closest('.nav-grup')) {
      document.querySelectorAll('.nav-grup.terbuka').forEach(g => {
        g.classList.remove('terbuka');
        g.querySelector('.nav-grup-induk')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('click', function (e) {
    const target = e.target as HTMLElement;
    const tombol = target.closest('[data-pintasan]') as HTMLElement;
    if (!tombol || !tombol.dataset.pintasan) return;

    const aksi = tombol.dataset.pintasan;
    if (aksi === 'belajar-a') {
      sistemAktif = 'hiragana';
      barisAktif = 'a';
      bukaHalaman('belajar');
      perbaruiTampilanBelajar();
    } else if (aksi === 'belajar' || aksi === 'belajar-hiragana') {
      const berikutnya = SEMUA_KANA.find(k => !PROGRES.kartu[k.tipe + '-' + k.kana]);
      if (berikutnya) {
        sistemAktif = berikutnya.tipe === 'handakuten' ? 'dakuten' : berikutnya.tipe;
        barisAktif = berikutnya.baris || 'semua';
      }
      bukaHalaman('belajar');
      perbaruiTampilanBelajar();
    } else if (aksi === 'belajar-katakana') {
      sistemAktif = 'katakana';
      barisAktif = 'semua';
      bukaHalaman('belajar');
      perbaruiTampilanBelajar();
    } else if (aksi === 'belajar-dakuten') {
      sistemAktif = 'dakuten';
      barisAktif = 'semua';
      bukaHalaman('belajar');
      perbaruiTampilanBelajar();
    } else if (aksi === 'belajar-youon') {
      sistemAktif = 'youon';
      barisAktif = 'semua';
      bukaHalaman('belajar');
      perbaruiTampilanBelajar();
    } else if (aksi === 'belajar-serapan') {
      sistemAktif = 'serapan';
      barisAktif = 'semua';
      bukaHalaman('belajar');
      perbaruiTampilanBelajar();
    } else if (aksi === 'konsep') {
      bukaHalaman('konsep');
    } else if (aksi === 'baca') {
      bukaHalaman('baca');
    } else if (aksi === 'latihan') {
      bukaHalaman('latihan');
      const areaKuis = document.getElementById('area-kuis');
      const setelan = document.getElementById('setelan-latihan');
      if (areaKuis && areaKuis.innerHTML.trim() === '') {
        areaKuis.classList.add('sembunyi');
        if (setelan) setelan.classList.remove('sembunyi');
      }
    } else if (aksi === 'mirip') {
      bukaHalaman('mirip');
    } else if (aksi === 'buka-kanji') {
      bukaHalaman('kanji');
    } else if (aksi === 'buka-kosakata') {
      bukaHalaman('kosakata');
    } else if (aksi === 'buka-grammar') {
      bukaHalaman('grammar');
    } else if (aksi === 'uji-target') {
      const lima = SEMUA_KANA
        .filter(k => !PROGRES.kartu[k.tipe + '-' + k.kana])
        .slice(0, 5);
      if (lima.length > 0) {
        kumpulanKuisKustom(lima, 'Target hari ini: ' + lima.map(k => k.kana).join(' '));
      }
    } else if (aksi === 'latihan-jatuhtempo') {
      const semuaId = URUTAN_BELAJAR.map(k => k.tipe + '-' + k.kana);
      const tempo = kartuJatuhTempo(PROGRES, semuaId);
      const daftar = SEMUA_KANA.filter(k => tempo.includes(k.tipe + '-' + k.kana));
      if (daftar.length > 0) {
        kumpulanKuisKustom(daftar, `Review hari ini: ${daftar.length} huruf`);
      } else {
        bukaHalaman('latihan');
      }
    } else if (aksi === 'buka-sumber') {
      bukaHalaman('sumber');
    }
  });

  document.addEventListener('click', function (e) {
    const tombol = (e.target as HTMLElement).closest('[data-uji-satu]') as HTMLElement;
    if (!tombol || !tombol.dataset.ujiSatu) return;
    const item = SEMUA_KANA.find(x => kartuKunci(x) === tombol.dataset.ujiSatu);
    if (item) {
      kumpulanKuisKustom([item], 'Uji huruf ' + item.kana);
    }
  });

  document.addEventListener('click', function (e) {
    const target = e.target as HTMLElement;
    const tombol = target.closest('[data-toggle-detail]') as HTMLElement;
    if (!tombol) return;
    const id = tombol.dataset.toggleDetail;
    const detail = document.getElementById('detail-konsep-' + id);
    if (!detail) return;
    const tersembunyi = detail.classList.toggle('sembunyi');
    tombol.textContent = tersembunyi ? 'Baca lebih detail' : 'Tutup detail';
  });

  const toggleKonsep = document.getElementById('toggle-konsep-belajar');
  if (toggleKonsep) {
    toggleKonsep.addEventListener('click', function () {
      const isi = document.getElementById('isi-konsep-belajar');
      if (!isi) return;
      const tersembunyi = isi.classList.toggle('sembunyi');
      this.setAttribute('aria-expanded', String(!tersembunyi));
      const ikon = this.querySelector('.toggle-ikon');
      if (ikon) ikon.textContent = tersembunyi ? '+' : '−';
    });
  }

  const pilihSistem = document.getElementById('pilih-sistem');
  if (pilihSistem) {
    pilihSistem.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil') as HTMLElement;
      if (!pil || !pil.dataset.sistem) return;
      sistemAktif = pil.dataset.sistem;
      barisAktif = 'semua';
      pilihPil('pilih-sistem', sistemAktif, 'sistem');
      perbaruiTampilanBelajar();
    });
  }

  const pilihBaris = document.getElementById('pilih-baris');
  if (pilihBaris) {
    pilihBaris.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil-baris') as HTMLElement;
      if (!pil || !pil.dataset.baris) return;
      barisAktif = pil.dataset.baris;
      gambarPilihBaris();
      gambarGridKana();
      gambarAreaTes();
    });
  }

  document.addEventListener('click', function (e) {
    const tombol = (e.target as HTMLElement).closest('[data-ucap]') as HTMLElement;
    if (tombol && tombol.dataset.ucap) ucapkan(tombol.dataset.ucap);
  });

  const levelKanjiElem = document.getElementById('pilih-level-kanji');
  if (levelKanjiElem) {
    levelKanjiElem.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil') as HTMLElement;
      if (!pil || !pil.dataset.level) return;
      levelKanji = pil.dataset.level;
      temaKanji = 'semua';
      pilihPil('pilih-level-kanji', levelKanji, 'level');
      gambarPilihTemaKanji();
      gambarGridKanji();
    });
  }

  const temaKanjiElem = document.getElementById('pilih-tema-kanji');
  if (temaKanjiElem) {
    temaKanjiElem.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil-baris') as HTMLElement;
      if (!pil || !pil.dataset.tema) return;
      temaKanji = pil.dataset.tema;
      gambarPilihTemaKanji();
      gambarGridKanji();
    });
  }

  const levelKosakataElem = document.getElementById('pilih-level-kosakata');
  if (levelKosakataElem) {
    levelKosakataElem.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil') as HTMLElement;
      if (!pil || !pil.dataset.level) return;
      levelKosakata = pil.dataset.level;
      temaKosakata = 'semua';
      pilihPil('pilih-level-kosakata', levelKosakata, 'level');
      gambarPilihTemaKosakata();
      gambarDaftarKosakata();
    });
  }

  const temaKosakataElem = document.getElementById('pilih-tema-kosakata');
  if (temaKosakataElem) {
    temaKosakataElem.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil-baris') as HTMLElement;
      if (!pil || !pil.dataset.tema) return;
      temaKosakata = pil.dataset.tema;
      gambarPilihTemaKosakata();
      gambarDaftarKosakata();
    });
  }

  const levelGrammarElem = document.getElementById('pilih-level-grammar');
  if (levelGrammarElem) {
    levelGrammarElem.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil') as HTMLElement;
      if (!pil || !pil.dataset.level) return;
      levelGrammar = pil.dataset.level;
      pilihPil('pilih-level-grammar', levelGrammar, 'level');
      gambarDaftarGrammar();
    });
  }

  const tombolExport = document.getElementById('tombol-export');
  if (tombolExport) {
    tombolExport.addEventListener('click', exportProgres);
  }

  const inputImport = document.getElementById('input-import') as HTMLInputElement;
  if (inputImport) {
    inputImport.addEventListener('change', function (e) {
      const files = (e.target as HTMLInputElement).files;
      const file = files ? files[0] : null;
      if (!file) return;

      importProgres(file, function (berhasil, pesan) {
        const kotak = document.getElementById('pesan-import');
        if (kotak) {
          kotak.className = berhasil ? 'pesan sukses' : 'pesan gagal';
          kotak.textContent = pesan;
        }

        if (berhasil) {
          reloadProgres();
          gambarBeranda();
          gambarGridKana();
          gambarGridKanji();
          gambarDaftarKosakata();
          gambarDaftarGrammar();
          gambarRingkasanBelajar();
          gambarAreaTes();
          gambarRingkasHarian();
        }
      });
    });
  }

  const tombolReset = document.getElementById('tombol-reset');
  if (tombolReset) {
    tombolReset.addEventListener('click', function () {
      const yakin = confirm(
        'Semua progres di browser ini akan dihapus dan tidak bisa dikembalikan.\n\n' +
        'Kalau belum punya file cadangan, batalkan dulu dan unduh cadangannya.\n\n' +
        'Lanjut hapus?'
      );
      if (!yakin) return;

      resetProgres();
      reloadProgres();
      gambarBeranda();
      gambarGridKana();
      gambarGridKanji();
      gambarDaftarKosakata();
      gambarDaftarGrammar();
      gambarRingkasanBelajar();
      gambarAreaTes();
      gambarRingkasHarian();

      const kotak = document.getElementById('pesan-import');
      if (kotak) {
        kotak.className = 'pesan sukses';
        kotak.textContent = 'Progres sudah dikosongkan. Mulai lagi dari awal.';
      }
    });
  }
}
