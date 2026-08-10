import {
  HIRAGANA, KATAKANA, DAKUTEN, HANDAKUTEN, YOUON, SERAPAN, HURUF_MIRIP, ATURAN_KHUSUS, SEMUA_KANA
} from '../data/kana';
import { KANJI_N5, KANJI_N4, SEMUA_KANJI, TEMA_KANJI } from '../data/kanji';
import { KOSAKATA_N5, KOSAKATA_N4, SEMUA_KOSAKATA, TEMA_KOSAKATA } from '../data/kosakata';
import { GRAMMAR_BELAJAR_N5, GRAMMAR_BELAJAR_N4, SEMUA_GRAMMAR } from '../data/grammar';
import { PETA_JALAN, METODE, RUTINITAS_HARIAN } from '../data/peta';
import {
  muatProgres, statusKartu, labelStatus, ringkasProgres, kartuJatuhTempo,
  exportProgres, importProgres, resetProgres
} from '../services/srs';
import { ucapkan } from '../services/speech';
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

export let levelGrammar = 'N5';

export function grammarTampil(): GrammarBelajar[] {
  return SEMUA_GRAMMAR.filter(g => g.level === levelGrammar);
}

export function bukaHalaman(nama: string): void {
  document.querySelectorAll('.halaman').forEach(h => h.classList.remove('aktif'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('aktif'));

  const halaman = document.getElementById('halaman-' + nama);
  if (halaman) halaman.classList.add('aktif');

  const tombol = document.querySelector(`.nav-btn[data-halaman="${nama}"]`);
  if (tombol) tombol.classList.add('aktif');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (nama === 'beranda') gambarBeranda();
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
  return `
    <div class="kartu-ringkas">
      <h3>${nama}</h3>
      <div class="bar-status">
        <span class="bar dikuasai" style="flex:${r.dikuasai || 0.001}"></span>
        <span class="bar dilatih" style="flex:${r.dilatih || 0.001}"></span>
        <span class="bar belum" style="flex:${r.belum || 0.001}"></span>
      </div>
      <ul class="rincian-status">
        <li><span class="titik dikuasai"></span> Sudah dikuasai: ${r.dikuasai} ${satuan}</li>
        <li><span class="titik dilatih"></span> Masih dilatih: ${r.dilatih} ${satuan}</li>
        <li><span class="titik belum"></span> Belum disentuh: ${r.belum} ${satuan}</li>
      </ul>
      <p class="total-kecil">dari ${daftarId.length} ${satuan}</p>
    </div>`;
}

export function gambarTugasHariIni(): void {
  const semuaId = SEMUA_KANA.map(k => k.tipe + '-' + k.kana);
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
          <strong>${jatuhTempo.length} huruf perlu diulang hari ini</strong>
          <span>Ini yang paling penting. Kerjakan ini dulu sebelum menambah huruf baru.</span>
        </div>
        <button class="tombol utama" data-pintasan="latihan-jatuhtempo">Ulang sekarang</button>
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
    const berikutnya = SEMUA_KANA.find(k => !PROGRES.kartu[k.tipe + '-' + k.kana]);
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
  }

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

export function gambarBeranda(): void {
  const kelompok = [
    { nama: 'Hiragana', daftar: HIRAGANA, satuan: 'huruf' },
    { nama: 'Katakana', daftar: KATAKANA, satuan: 'huruf' },
    { nama: 'Dakuten', daftar: [...DAKUTEN, ...HANDAKUTEN], satuan: 'huruf' },
    { nama: 'Youon', daftar: YOUON, satuan: 'huruf' }
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

export function gambarGridKana(): void {
  const daftar = daftarSistem();
  const tampil = barisAktif === 'semua' ? daftar : daftar.filter(k => k.baris === barisAktif);

  let html = '';
  tampil.forEach(k => {
    const id = (k.tipe || 'serapan') + '-' + k.kana;
    const kartu = PROGRES.kartu[id];
    const status = statusKartu(kartu);

    const contohHtml = (k.contoh || []).map(c => `
      <li>
        <span class="contoh-kata">${c.kata}</span>
        <span class="contoh-baca">${c.baca}</span>
        <span class="contoh-arti">${c.arti}</span>
      </li>`).join('');

    html += `
      <div class="kartu-kana status-${status}">
        <div class="kartu-kepala">
          <span class="kana-besar">${k.kana}</span>
          <div class="kartu-info">
            <span class="romaji">${k.romaji}</span>
            <span class="lencana ${status}">${labelStatus(status)}</span>
          </div>
          <button class="tombol-suara" data-ucap="${k.kana}" title="Dengarkan">&#9834;</button>
        </div>
        ${(k as any).asal ? `<p class="asal">Dari huruf <strong>${(k as any).asal}</strong> + tanda ${k.tipe === 'dakuten' ? 'dakuten ゛' : 'handakuten ゜'}</p>` : ''}
        ${k.mnemonic ? `<p class="mnemonic"><strong>Cara mengingat:</strong> ${k.mnemonic}</p>` : ''}
        ${k.coretan ? `<p class="coretan"><strong>Urutan coretan:</strong> ${k.coretan}</p>` : ''}
        ${contohHtml ? `<ul class="daftar-contoh">${contohHtml}</ul>` : ''}
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
      <div class="kartu-kana status-${status}">
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
  const nav = document.getElementById('nav');
  if (nav) {
    nav.addEventListener('click', function (e) {
      const target = e.target as HTMLElement;
      const tombol = target.closest('.nav-btn') as HTMLElement;
      if (tombol && tombol.dataset.halaman) bukaHalaman(tombol.dataset.halaman);
    });
  }

  document.addEventListener('click', function (e) {
    const target = e.target as HTMLElement;
    const tombol = target.closest('[data-pintasan]') as HTMLElement;
    if (!tombol || !tombol.dataset.pintasan) return;

    const aksi = tombol.dataset.pintasan;
    if (aksi === 'belajar-a') {
      sistemAktif = 'hiragana';
      barisAktif = 'a';
      bukaHalaman('belajar');
      gambarPilihBaris();
      gambarGridKana();
    } else if (aksi === 'belajar') {
      bukaHalaman('belajar');
    } else if (aksi === 'latihan') {
      bukaHalaman('latihan');
    } else if (aksi === 'mirip') {
      bukaHalaman('mirip');
    } else if (aksi === 'buka-kanji') {
      bukaHalaman('kanji');
    } else if (aksi === 'buka-kosakata') {
      bukaHalaman('kosakata');
    } else if (aksi === 'buka-grammar') {
      bukaHalaman('grammar');
    }
  });

  const pilihSistem = document.getElementById('pilih-sistem');
  if (pilihSistem) {
    pilihSistem.addEventListener('click', function (e) {
      const pil = (e.target as HTMLElement).closest('.pil') as HTMLElement;
      if (!pil || !pil.dataset.sistem) return;
      sistemAktif = pil.dataset.sistem;
      barisAktif = 'semua';
      pilihPil('pilih-sistem', sistemAktif, 'sistem');
      gambarPilihBaris();
      gambarGridKana();
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

      const kotak = document.getElementById('pesan-import');
      if (kotak) {
        kotak.className = 'pesan sukses';
        kotak.textContent = 'Progres sudah dikosongkan. Mulai lagi dari awal.';
      }
    });
  }
}
