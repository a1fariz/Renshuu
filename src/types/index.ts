export interface ContohKata {
  kata: string;
  baca: string;
  arti: string;
}

export interface KanaItem {
  kana: string;
  romaji: string;
  tipe: 'hiragana' | 'katakana' | 'dakuten' | 'handakuten' | 'youon' | 'serapan';
  baris?: string;
  coretan?: string;
  mnemonic?: string;
  contoh: ContohKata[];
}

export interface HurufMirip {
  pasangan: string[];
  romaji: string[];
  kunci: string;
}

export interface KataLatihan {
  kata: string;
  baca: string;
  arti: string;
}

export interface TemaKosakataN5 {
  tema: string;
  contoh: string[];
}

export interface KanjiItem {
  kanji: string;
  arti: string;
  on: string;
  kun: string;
  coretan: number;
  level: 'N5' | 'N4';
  tema: string;
  kata: ContohKata[];
}

export interface KosakataItem {
  kata: string;
  kana: string;
  romaji: string;
  arti: string;
  level: 'N5' | 'N4';
  tema: string;
  jenis: string;
}

export interface GrammarContoh {
  jp: string;
  baca: string;
  arti: string;
}

export interface GrammarBelajar {
  id: string;
  urutan: number;
  level: 'N5' | 'N4';
  pola: string;
  arti: string;
  cara: string;
  contoh: GrammarContoh[];
  catatan?: string;
}

export interface GrammarPola {
  urutan: number;
  pola: string;
  arti: string;
  contoh: string;
}

export interface PetaRincian {
  label: string;
  isi: string[];
}

export interface PetaFase {
  fase: string;
  judul: string;
  periode: string;
  warna: string;
  target: string;
  catatan: string;
  rincian: PetaRincian[];
}

export interface MetodeBelajar {
  nama: string;
  isi: string;
}

export interface RutinitasHarian {
  menit: string;
  kegiatan: string;
}

export interface KartuSRS {
  id: string;
  tahap: number;
  jatuhTempo: string;
  kaliDilihat: number;
  terakhirDilihat: string | null;
}

export interface ProgresSRS {
  kartu: Record<string, KartuSRS>;
  catatan: Record<string, string>;
  dibuat: string;
  versi: number;
}

export type StatusKartu = 'belum' | 'dilatih' | 'hampir' | 'dikuasai';

export interface HasilRingkasan {
  belum: number;
  dilatih: number;
  hampir: number;
  dikuasai: number;
}

// Soal Kuis Types
export type TipeItemKuis = KanaItem | KanjiItem | KosakataItem | GrammarBelajar;

export interface SoalKuis {
  item: TipeItemKuis;
  tanya: string;
  kunci: string | string[];
  pilihan: string[];
  kategori: string;
  hint?: string;
  labelTanya?: string;
  labelSub?: string;
}
