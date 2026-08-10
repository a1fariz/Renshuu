import fs from 'node:fs';
import path from 'node:path';

import {
  HIRAGANA, KATAKANA, DAKUTEN, HANDAKUTEN, YOUON, SERAPAN,
  HURUF_MIRIP, ATURAN_KHUSUS, SEMUA_KANA
} from './src/data/kana';
import { KATA_HIRAGANA, KATA_KATAKANA, KATA_CAMPURAN } from './src/data/kata';
import { KANJI_N5, KANJI_N4, SEMUA_KANJI } from './src/data/kanji';
import { KOSAKATA_N5, KOSAKATA_N4, SEMUA_KOSAKATA, TEMA_KOSAKATA } from './src/data/kosakata';
import { GRAMMAR_BELAJAR_N5, GRAMMAR_BELAJAR_N4, SEMUA_GRAMMAR } from './src/data/grammar';
import { PETA_JALAN } from './src/data/peta';
import {
  buatKartu, perbaruiKartu, statusKartu, ringkasProgres, hariIni
} from './src/services/srs';

let masalah = 0;

function lapor(pesan: string): void {
  console.log('  [MASALAH] ' + pesan);
  masalah++;
}

console.log('========================================');
console.log('PEMERIKSAAN MANDIRI DATA BELAJAR JEPANG');
console.log('========================================\n');

console.log('=== JUMLAH HURUF ===');
console.log('Hiragana utama  :', HIRAGANA.length);
console.log('Katakana utama  :', KATAKANA.length);
console.log('Dakuten/Handaku :', DAKUTEN.length + HANDAKUTEN.length);
console.log('Youon           :', YOUON.length);
console.log('Serapan Katakana:', SERAPAN.length);
console.log('Total kana      :', SEMUA_KANA.length);
console.log('Huruf mirip     :', HURUF_MIRIP.length, 'pasangan');
console.log('Aturan khusus   :', ATURAN_KHUSUS.length, 'aturan');

if (HIRAGANA.length !== 46) lapor('Hiragana bukan 46');
if (KATAKANA.length !== 46) lapor('Katakana bukan 46');
if (DAKUTEN.length !== 20) lapor('Dakuten bukan 20');
if (HANDAKUTEN.length !== 5) lapor('Handakuten bukan 5');

console.log('\n=== FIELD WAJIB KANA ===');
([['HIRAGANA', HIRAGANA], ['KATAKANA', KATAKANA]] as const).forEach(([nama, daftar]) => {
  daftar.forEach(k => {
    if (!k.kana)     lapor(nama + ': ada entri tanpa kana');
    if (!k.romaji)   lapor(nama + ' ' + k.kana + ': tidak ada romaji');
    if (!k.tipe)     lapor(nama + ' ' + k.kana + ': tidak ada tipe');
    if (!k.baris)    lapor(nama + ' ' + k.kana + ': tidak ada baris');
    if (!k.mnemonic) lapor(nama + ' ' + k.kana + ': tidak ada mnemonic');
    if (!k.coretan)  lapor(nama + ' ' + k.kana + ': tidak ada coretan');
    if (!k.contoh || k.contoh.length < 2) lapor(nama + ' ' + k.kana + ': contoh kurang dari 2');
  });
});

([['DAKUTEN', DAKUTEN], ['HANDAKUTEN', HANDAKUTEN], ['YOUON', YOUON]] as const).forEach(([nama, daftar]) => {
  daftar.forEach(k => {
    if (!k.kana)   lapor(nama + ': entri tanpa kana');
    if (!k.romaji) lapor(nama + ' ' + k.kana + ': tidak ada romaji');
    if (!k.tipe)   lapor(nama + ' ' + k.kana + ': tidak ada tipe');
    if (!k.contoh || k.contoh.length < 1) lapor(nama + ' ' + k.kana + ': tidak ada contoh');
  });
});

console.log('\n=== PEMERIKSAAN KATA UJI ===');
console.log('Kata Hiragana   :', KATA_HIRAGANA.length);
console.log('Kata Katakana   :', KATA_KATAKANA.length);
console.log('Kata Campuran   :', KATA_CAMPURAN.length);

[...KATA_HIRAGANA, ...KATA_KATAKANA, ...KATA_CAMPURAN].forEach(k => {
  if (!k.kata || !k.baca || !k.arti) {
    lapor('Kata uji tidak lengkap: ' + JSON.stringify(k));
  }
});

console.log('\n=== UJI LOGIKA SRS (SM-2 DIVERSIFIKASI) ===');
let kartuUji = buatKartu('uji-1');
console.log('Baru dibuat     : tahap', kartuUji.tahap, '| status', statusKartu(kartuUji));
if (statusKartu(kartuUji) !== 'belum') lapor('Kartu baru harusnya berstatus belum');

for (let i = 1; i <= 6; i++) {
  perbaruiKartu(kartuUji, true);
  console.log('Lancar ke-' + i + '     : tahap', kartuUji.tahap, '| jatuh tempo', kartuUji.jatuhTempo, '| status', statusKartu(kartuUji));
}
if (statusKartu(kartuUji) !== 'dikuasai') lapor('Setelah 6x lancar harusnya dikuasai');

perbaruiKartu(kartuUji, false);
console.log('Belum lancar    : tahap', kartuUji.tahap, '| status', statusKartu(kartuUji));
if (kartuUji.tahap !== 4) lapor('Turun harusnya 2 tahap dari 6 jadi 4, dapatnya ' + kartuUji.tahap);

let kartuBaru = buatKartu('uji-2');
perbaruiKartu(kartuBaru, false);
if (kartuBaru.tahap !== 0) lapor('Tahap tidak boleh negatif, dapatnya ' + kartuBaru.tahap);

const jatuhTempoHariIni = kartuBaru.jatuhTempo === hariIni();
console.log('Salah -> ulang hari ini?', jatuhTempoHariIni ? 'ya' : 'TIDAK');
if (!jatuhTempoHariIni) lapor('Kartu yang belum lancar harus muncul lagi hari ini');

console.log('\n=== UJI RINGKASAN ===');
const progresUji = { kartu: {} as Record<string, any>, catatan: {}, dibuat: hariIni(), versi: 1 };
const idUji = HIRAGANA.slice(0, 5).map(k => k.tipe + '-' + k.kana);
progresUji.kartu[idUji[0]] = { id: idUji[0], tahap: 6, jatuhTempo: hariIni(), kaliDilihat: 8, terakhirDilihat: hariIni() };
progresUji.kartu[idUji[1]] = { id: idUji[1], tahap: 2, jatuhTempo: hariIni(), kaliDilihat: 3, terakhirDilihat: hariIni() };
const r = ringkasProgres(progresUji, idUji);
console.log('Ringkasan 5 huruf:', JSON.stringify(r));
if (r.dikuasai !== 1 || r.dilatih !== 1 || r.belum !== 3) lapor('Ringkasan salah hitung');

console.log('\n=== PETA JALAN ===');
console.log('Fase          :', PETA_JALAN.length);
PETA_JALAN.forEach(f => {
  if (!f.fase || !f.judul || !f.periode || !f.target) lapor('Fase tidak lengkap: ' + f.judul);
});

console.log('\n=== KANJI ===');
console.log('Kanji N5      :', KANJI_N5.length);
console.log('Kanji N4      :', KANJI_N4.length);
console.log('Total kanji   :', SEMUA_KANJI.length);

const kanjiTerlihat = new Set();
SEMUA_KANJI.forEach(k => {
  if (!k.kanji)  lapor('KANJI: ada entri tanpa huruf');
  if (!k.arti)   lapor('KANJI ' + k.kanji + ': tidak ada arti');
  if (!k.on)     lapor('KANJI ' + k.kanji + ': tidak ada on-yomi');
  if (!k.kun)    lapor('KANJI ' + k.kanji + ': tidak ada kun-yomi');
  if (!k.level)  lapor('KANJI ' + k.kanji + ': tidak ada level');
  if (!k.tema)   lapor('KANJI ' + k.kanji + ': tidak ada tema');
  if (!k.coretan || k.coretan < 1) lapor('KANJI ' + k.kanji + ': jumlah coretan tidak masuk akal');
  if (!k.kata || k.kata.length < 1) lapor('KANJI ' + k.kanji + ': tidak ada contoh kata');
  (k.kata || []).forEach(c => {
    if (!c.kata || !c.baca || !c.arti) lapor('KANJI ' + k.kanji + ': contoh kata tidak lengkap');
  });
  if (kanjiTerlihat.has(k.kanji)) lapor('KANJI duplikat: ' + k.kanji);
  kanjiTerlihat.add(k.kanji);
});

const polaJepang = /^[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uff66-\uff9f]+$/;
SEMUA_KANJI.forEach(k => {
  if (!polaJepang.test(k.kanji)) lapor('KANJI bukan huruf Jepang: "' + k.kanji + '"');
  (k.kata || []).forEach(c => {
    if (!polaJepang.test(c.kata)) lapor('KANJI ' + k.kanji + ': contoh "' + c.kata + '" mengandung huruf non-Jepang');
  });
});

console.log('\n=== KOSAKATA ===');
console.log('Kosakata N5   :', KOSAKATA_N5.length);
console.log('Kosakata N4   :', KOSAKATA_N4.length);
console.log('Total kosakata:', SEMUA_KOSAKATA.length);

const kataTerlihat = new Set();
SEMUA_KOSAKATA.forEach(k => {
  if (!k.kata)   lapor('KOSAKATA: ada entri tanpa kata');
  if (!k.kana)   lapor('KOSAKATA ' + k.kata + ': tidak ada kana');
  if (!k.romaji) lapor('KOSAKATA ' + k.kata + ': tidak ada romaji');
  if (!k.arti)   lapor('KOSAKATA ' + k.kata + ': tidak ada arti');
  if (!k.level)  lapor('KOSAKATA ' + k.kata + ': tidak ada level');
  if (!k.tema)   lapor('KOSAKATA ' + k.kata + ': tidak ada tema');
  if (!polaJepang.test(k.kata)) lapor('KOSAKATA bukan huruf Jepang: "' + k.kata + '"');
  if (!polaJepang.test(k.kana)) lapor('KOSAKATA ' + k.kata + ': kana "' + k.kana + '" bukan huruf Jepang');
  if (kataTerlihat.has(k.kata)) lapor('KOSAKATA duplikat: ' + k.kata);
  kataTerlihat.add(k.kata);
});

const temaTerdaftar = new Set(TEMA_KOSAKATA.map(t => t.id));
[...new Set(SEMUA_KOSAKATA.map(k => k.tema))].forEach(t => {
  if (!temaTerdaftar.has(t)) lapor('KOSAKATA: tema "' + t + '" tidak punya label di TEMA_KOSAKATA');
});

console.log('\n=== GRAMMAR ===');
console.log('Grammar N5    :', GRAMMAR_BELAJAR_N5.length);
console.log('Grammar N4    :', GRAMMAR_BELAJAR_N4.length);
console.log('Total grammar :', SEMUA_GRAMMAR.length);

const grammarTerlihat = new Set();
SEMUA_GRAMMAR.forEach(g => {
  if (!g.id)     lapor('GRAMMAR: ada entri tanpa id');
  if (!g.pola)   lapor('GRAMMAR ' + g.id + ': tidak ada pola');
  if (!g.arti)   lapor('GRAMMAR ' + g.id + ': tidak ada arti');
  if (!g.cara)   lapor('GRAMMAR ' + g.id + ': tidak ada penjelasan cara');
  if (!g.level)  lapor('GRAMMAR ' + g.id + ': tidak ada level');
  if (!g.urutan) lapor('GRAMMAR ' + g.id + ': tidak ada urutan');
  if (!g.contoh || g.contoh.length < 1) lapor('GRAMMAR ' + g.id + ': tidak ada contoh kalimat');
  (g.contoh || []).forEach(c => {
    if (!c.jp || !c.baca || !c.arti) lapor('GRAMMAR ' + g.id + ': contoh tidak lengkap');
  });
  if (grammarTerlihat.has(g.id)) lapor('GRAMMAR id duplikat: ' + g.id);
  grammarTerlihat.add(g.id);
});

console.log('\n=== ID KARTU SRS ANTAR-MATERI ===');
const semuaIdKartu = [
  ...SEMUA_KANA.map(k => k.tipe + '-' + k.kana),
  ...SEMUA_KANJI.map(k => 'kanji-' + k.kanji),
  ...SEMUA_KOSAKATA.map(k => 'kata-' + k.kata),
  ...SEMUA_GRAMMAR.map(g => 'grammar-' + g.id)
];
const idSet = new Set();
semuaIdKartu.forEach(id => {
  if (idSet.has(id)) lapor('ID kartu bentrok antar-materi: ' + id);
  idSet.add(id);
});
console.log('Total kartu   :', semuaIdKartu.length, '| unik:', idSet.size);

console.log('\n========================================');
console.log(masalah === 0 ? 'SEMUA BERSIH' : 'DITEMUKAN ' + masalah + ' MASALAH');
console.log('========================================');

// Inspection of index.html & static files
let masalahLuar = 0;
function laporLuar(pesan: string) { console.log('  [MASALAH] ' + pesan); masalahLuar++; }

const rootDir = process.cwd();
const htmlPath = path.join(rootDir, 'index.html');

console.log('\n=== ID DOM: JS vs HTML ===');
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const idHtml = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  console.log('ID di index.html :', idHtml.size);

  const dibuatDinamis = new Set([
    'input-jawab', 'kirim-jawab', 'umpan-balik', 'tombol-petunjuk', 'tombol-ulang',
    'tombol-lewati', 'tombol-selesai', 'tombol-lanjut', 'lanjut-lagi', 'ganti-setelan',
    'umpan-mirip', 'petunjuk-mirip', 'ganti-mirip', 'selesai-mirip', 'lanjut-mirip',
    'mirip-lagi', 'jawab-baca', 'buka-baca', 'ganti-baca', 'selesai-baca', 'baca-lagi',
    'umpan-n', 'petunjuk-n', 'ulang-n', 'lewati-n', 'selesai-n', 'lanjut-n', 'lagi-n',
    'mulai-harian'
  ]);

  ['src/ui/app.ts', 'src/ui/kuis.ts'].forEach(relFile => {
    const filePath = path.join(rootDir, relFile);
    if (fs.existsSync(filePath)) {
      const isi = fs.readFileSync(filePath, 'utf8');
      isi.split('\n').forEach((baris: string, i: number) => {
        const cocok = baris.match(/getElementById\('([^']+)'\)/g) || [];
        cocok.forEach((c: string) => {
          const idMatch = c.match(/getElementById\('([^']+)'\)/);
          if (idMatch) {
            const id = idMatch[1];
            if (!idHtml.has(id) && !dibuatDinamis.has(id)) {
              laporLuar(relFile + ':' + (i + 1) + ' memanggil id "' + id + '" yang tidak ada di HTML');
            }
          }
        });
      });
    }
  });
}

console.log('\n========================================');
console.log((masalah + masalahLuar) === 0 ? 'PEMERIKSAAN LENGKAP: SEMUA BERSIH!' : `PEMERIKSAAN LENGKAP: ${masalah + masalahLuar} MASALAH`);
console.log('========================================');
if (masalah + masalahLuar > 0) {
  process.exit(1);
}
