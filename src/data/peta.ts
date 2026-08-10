import type { PetaFase, MetodeBelajar, RutinitasHarian } from '../types';

export const PETA_JALAN: PetaFase[] = [
  {
    fase: 'FASE 0',
    judul: 'Huruf Jepang — sebelum masuk LPK',
    periode: '10 Agustus – 31 Agustus 2026 (±3 pekan)',
    warna: 'fase-0',
    target: 'Hafal hiragana dan katakana sampai refleks, di bawah 2 detik per huruf.',
    catatan: 'Ini bagian yang paling mendesak. Selesaikan sebelum LPK mulai.',
    rincian: [
      {
        label: 'Pekan 1 (10–16 Agustus)',
        isi: [
          'Hari 1: baris あ (あいうえお) — mnemonic, coretan, contoh kata',
          'Hari 2: baris か (かきくけこ)',
          'Hari 3: baris さ (さしすせそ)',
          'Hari 4: baris た (たちつてと)',
          'Hari 5: baris な (なにぬねの)',
          'Hari 6: baris は (はひふへほ)',
          'Hari 7: ulang semua yang sudah lewat, tanpa materi baru'
        ]
      },
      {
        label: 'Pekan 2 (17–23 Agustus)',
        isi: [
          'Hari 8: baris ま (まみむめも)',
          'Hari 9: baris や・ら (やゆよ + らりるれろ)',
          'Hari 10: baris わ (わをん) — hiragana LENGKAP',
          'Hari 11: dakuten dan handakuten (が ざ だ ば ぱ)',
          'Hari 12: youon (きゃ しゅ ちょ) + sokuon っ + vokal panjang',
          'Hari 13–14: katakana baris ア sampai サ, sambil terus ulang hiragana'
        ]
      },
      {
        label: 'Pekan 3 (24–31 Agustus)',
        isi: [
          'Hari 15–18: katakana baris タ sampai ワ — katakana LENGKAP',
          'Hari 19: fokus penuh huruf mirip (シ/ツ, ソ/ン, ク/ワ, ノ/メ, ス/ヌ, ラ/ウ)',
          'Hari 20: bunyi serapan (ファ ティ ヴ ジェ)',
          'Hari 21: UJI KELULUSAN — baca 20 kata acak campuran tanpa ragu'
        ]
      }
    ]
  },
  {
    fase: 'N5',
    judul: 'Dasar — berjalan bersama kelas LPK',
    periode: 'September 2026 – Maret 2027 (±7 bulan)',
    warna: 'fase-n5',
    target: '±800 kosakata, ±100 kanji, ±80 poin grammar.',
    catatan: 'Aplikasi ini jadi alat ulangan mandiri di luar jam LPK. Materi utama tetap dari kelas.',
    rincian: [
      {
        label: 'Kanji N5 (±100 huruf)',
        isi: [
          'Angka: 一 二 三 四 五 六 七 八 九 十 百 千 万 円',
          'Waktu: 日 月 火 水 木 金 土 年 時 分 半 今 週 曜',
          'Orang & tubuh: 人 男 女 子 父 母 友 先 生 目 耳 口 手 足',
          'Tempat: 山 川 田 町 国 校 学 会 社 店 駅 道 家 room 上 下 中 外',
          'Kata kerja: 見 聞 言 話 読 書 行 来 帰 食 飲 買 立 休 出 入',
          'Sifat: 大 小 高 安 新 古 長 白 多 少'
        ]
      },
      {
        label: 'Tema kosakata',
        isi: [
          'Salam dan ungkapan harian',
          'Angka, jam, tanggal, hari',
          'Keluarga dan sebutan orang',
          'Makanan dan minuman',
          'Tempat dan arah',
          'Kata kerja dasar (ます bentuk)',
          'Kata sifat い dan な',
          'Benda sehari-hari, transportasi, cuaca'
        ]
      },
      {
        label: 'Skill can-do resmi N5 (JF Can-do)',
        isi: [
          'Memahami kalimat dan ungkapan sehari-hari yang sangat mendasar',
          'Membaca tulisan pendek berbentuk hiragana, katakana, dan kanji dasar',
          'Menangkap informasi penting dari percakapan pelan tentang topik akrab',
          'Memperkenalkan diri dan bertanya hal dasar tentang orang lain'
        ]
      },
      {
        label: 'Latihan rutin',
        isi: [
          'Listening: NHK World Easy Japanese (pelajaran 1–24)',
          'Reading: Tadoku Graded Readers level 0',
          'Shadowing: tirukan audio pelajaran LPK setiap hari 10 menit',
          'SRS: 20 kartu baru per hari, ulang semua yang jatuh tempo'
        ]
      }
    ]
  },
  {
    fase: 'N4',
    judul: 'Menengah awal — persiapan ujian',
    periode: 'April 2027 – November 2027 (±8 bulan)',
    warna: 'fase-n4',
    target: '±1.500 kosakata, ±300 kanji, ±140 poin grammar.',
    catatan: 'Romaji dihentikan total di fase ini. Baca langsung dari kana dan kanji.',
    rincian: [
      {
        label: 'Kanji N4 (+200 huruf baru)',
        isi: [
          'Kata kerja: 開 閉 始 終 使 働 待 持 送 教 習 洗 貸 借 返 知 思 作 走 歩',
          'Sifat & keadaan: 明 暗 早 遅 強 弱 重 軽 広 狭 暑 寒 温 冷 悪 楽 便 利 不 同',
          'Tempat & bangunan: 屋 室 院 館 局 場 界 京 都 府 県 市 区 村 港 空 港 building',
          'Abstrak: 気 心 力 用 事 物 者 者 place 意 味 方 法 理 由 説 明 質 問 答',
          'Alam & waktu: 春 夏 秋 冬 朝 昼 夜 晩 late 天 空 風 雨 雪 花 草 森 池 海 島'
        ]
      },
      {
        label: 'Grammar pokok',
        isi: [
          'Bentuk kamus, ない, た — lepas dari ます bentuk',
          'Potensial (bisa melakukan), pasif, kausatif',
          'Empat bentuk pengandaian: と / ば / たら / なら',
          'Memberi dan menerima: あげる / くれる / もらう',
          'そうです、ようです、らしいです、かもしれません',
          'Keigo dasar: sonkeigo dan kenjougo tingkat pengantar'
        ]
      },
      {
        label: 'Skill can-do resmi N4 (JF Can-do)',
        isi: [
          'Memahami percakapan sehari-hari yang diucapkan dengan kecepatan agak pelan',
          'Membaca tulisan tentang topik akrab sehari-hari',
          'Mengikuti alur cerita percakapan pendek dan menangkap poin utamanya',
          'Menyampaikan keinginan, rencana, alasan, dan pengalaman dengan kalimat sederhana'
        ]
      },
      {
        label: 'Latihan rutin',
        isi: [
          'Listening: JapanesePod101 level N4, NHK Easy News harian',
          'Reading: Tadoku level 1–2, NHK Web Easy',
          'Sentence mining: ambil 5 kalimat baru per hari dari materi asli',
          'Latihan soal: Try! N4, Sou Matome N4, JLPT Sensei'
        ]
      }
    ]
  },
  {
    fase: 'UJIAN',
    judul: 'Sprint terakhir',
    periode: 'Oktober – Desember 2027',
    warna: 'fase-ujian',
    target: 'Siap ujian JLPT N4, Desember 2027.',
    catatan: 'Pendaftaran JLPT biasanya dibuka Agustus–September untuk ujian Desember. Jangan sampai terlewat.',
    rincian: [
      {
        label: 'Delapan pekan terakhir',
        isi: [
          'Pekan 1–2: ulang seluruh grammar N4, kerjakan soal per bab',
          'Pekan 3–4: latihan soal lengkap dengan batas waktu (mogi shiken)',
          'Pekan 5–6: perbaiki bagian yang paling sering meleset',
          'Pekan 7: latihan listening intensif — bagian yang paling sering menjatuhkan orang',
          'Pekan 8: ulangan ringan saja, jaga kondisi badan, jangan materi baru'
        ]
      },
      {
        label: 'Hal teknis yang sering terlupa',
        isi: [
          'Daftar lewat situs resmi JLPT Indonesia — kuota bisa habis',
          'Cek lokasi ujian dan waktu tempuh dari rumah',
          'Siapkan kartu ujian, pensil 2B, penghapus, jam tangan analog',
          'Ujian N4 sekitar 125 menit: bahasa (kosakata+grammar+reading) lalu listening'
        ]
      }
    ]
  }
];

export const METODE: MetodeBelajar[] = [
  {
    nama: 'SRS harian',
    isi: 'Huruf yang sudah lancar makin jarang muncul, yang masih goyah makin sering. Kamu tidak perlu memutuskan sendiri apa yang perlu diulang.'
  },
  {
    nama: 'Active recall',
    isi: 'Selalu berusaha mengingat dulu sebelum melihat jawaban. Membaca ulang catatan terasa produktif tapi jauh lebih lemah daripada mengingat aktif.'
  },
  {
    nama: 'Mnemonic',
    isi: 'Tiap huruf diberi jembatan keledai dalam Bahasa Indonesia. Otak lebih mudah menyimpan cerita daripada bentuk abstrak.'
  },
  {
    nama: 'Comprehensible input',
    isi: 'Mulai pekan ketiga, baca dan dengar materi yang sedikit di atas kemampuanmu sekarang. Tidak perlu paham seratus persen.'
  },
  {
    nama: 'Shadowing',
    isi: 'Tirukan audio segera setelah mendengar, seperti bayangan. Melatih telinga dan mulut sekaligus. Mulai sejak Fase 0.'
  },
  {
    nama: 'Prioritas 80/20',
    isi: 'Sebagian kecil kosakata muncul di sebagian besar kalimat. Kuasai yang sering dulu, yang jarang belakangan.'
  }
];

export const RUTINITAS_HARIAN: RutinitasHarian[] = [
  { menit: '5 menit', kegiatan: 'Ulang huruf yang jatuh tempo di menu Latihan' },
  { menit: '15 menit', kegiatan: 'Pelajari baris baru: baca mnemonic, tulis tiap huruf 10 kali di kertas' },
  { menit: '10 menit', kegiatan: 'Latihan huruf baru sampai terasa otomatis' },
  { menit: '10 menit', kegiatan: 'Baca kata utuh di menu Baca Kata — ucapkan dengan suara' },
  { menit: '5 menit', kegiatan: 'Ulang huruf mirip kalau sudah masuk katakana' }
];
