# 練 Renshuu (練習) — Japanese Learning Application

> **Aplikasi Web Interaktif Pembelajaran Bahasa Jepang (Fase 0 hingga JLPT N4)**  
> Dilengkapi mesin **Spaced Repetition System (SRS)** ter-diversifikasi, modul audio sintesis suara, 678 kartu materi (Kana, Kanji, Kosakata, Grammar), kuis interaktif, dan peta jalan kurikulum mandiri.

---

## 📌 Daftar Isi
- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Arsitektur & Teknologi](#-arsitektur--teknologi)
- [Struktur Proyek](#-struktur-proyek)
- [Cara Memulai (Quick Start)](#-cara-memulai-quick-start)
- [Metode Belajar & Algoritma SRS](#-metode-belajar--algoritma-srs)
- [Validasi & Pengujian](#-validasi--pengujian)
- [Panduan Deploy ke Vercel](#-panduan-deploy-ke-vercel)
- [Lisensi & Sumber Rujukan](#-lisensi--sumber-rujukan)

---

## 🌸 Tentang Proyek

**Renshuu (練習)** dirancang khusus sebagai platform belajar mandiri bahasa Jepang dari tingkat dasar (Fase 0: Hiragana & Katakana) hingga tingkat menengah (JLPT N5 & N4).

Aplikasi ini fokus pada **efektivitas daya ingat panjang (long-term memory)** tanpa membebankan tekanan nilai atau hukuman salah. Semua progres tersimpan aman di browser pengguna (*Client-Side Persistence*).

> [!NOTE]
> **Prinsip Utama**: Tanpa skor, tanpa nilai, tanpa hukuman. Jawaban belum pas dibantu petunjuk bertahap dan pengulangan otomatis di hari yang sama.

---

## ✨ Fitur Utama

### 📋 Ringkasan Fitur
- [x] **Beranda & Ulangan Harian**: Ringkasan progres (Belum, Dilatih, Dikuasai) dan antrean materi jatuh tempo harian.
- [x] **Modul Belajar Kana**: 150 huruf (Hiragana, Katakana, Dakuten, Handakuten, Youon, Serapan) dilengkapi mnemonic, urutan coretan, dan contoh kata.
- [x] **Modul Kanji N5 & N4**: 244 Kanji lengkap dengan arti, *On-yomi*, *Kun-yomi*, jumlah coretan, dan contoh kata.
- [x] **Modul Kosakata N5 & N4**: 224 kata dikelompokkan per tema dengan fitur audio pelafalan.
- [x] **Modul Grammar N5 & N4**: 60 pola kalimat lengkap dengan penjelasan penggunaan, contoh kalimat, dan catatan jebakan.
- [x] **Mesin Kuis Interaktif**: Mode Pilihan Ganda, Ketik Latin, Bunyi-ke-Huruf, Huruf Mirip, Kata Utuh, dan Ulangan Harian Gabungan.
- [x] **Sintesis Suara (Audio)**: Pembungkus Web Speech API native (`ja-JP`) untuk mendengar pengucapan alami.
- [x] **Peta Jalan Kurikulum**: Panduan jadwal belajar Fase 0 hingga persiapan Ujian JLPT N4.
- [x] **Sistem Cadangan Data**: Ekspor & Impor progres pengguna via file format `.json`.

---

## ⚡ Arsitektur & Teknologi

| Komponen | Teknologi | Deskripsi |
|---|---|---|
| **Bahasa Utama** | **TypeScript 5.3+** | Mode `strict: true` dengan struktur ES Modules modular. |
| **Bundler / Dev Tools** | **Vite 5.4+** | Performa dev server instan dan paket produksi yang cepat. |
| **Script Runner** | **TSX** | Eksekusi skrip TypeScript pengujian data otomatis di Node.js. |
| **Penyimpanan** | **HTML5 LocalStorage** | Penyimpanan progres *client-side* tanpa server backend. |
| **Audio** | **Web Speech API** | Sintesis suara bahasa Jepang native browser (`ja-JP`). |

---

## 📂 Struktur Proyek

```text
renshuu/
├── index.html              # Entry point HTML utama
├── package.json            # Konfigurasi npm, dependensi, dan naskah perintah
├── tsconfig.json           # Konfigurasi TypeScript strict compiler
├── vite.config.ts          # Konfigurasi Vite bundler
├── periksa.ts              # Skrip pengujian otomatis & integritas data
├── css/
│   └── style.css           # Sistem gaya & variabel CSS3
└── src/
    ├── main.ts             # Entry point utama aplikasi
    ├── types/
    │   └── index.ts        # Antarmuka tipe data domain (TypeScript Interfaces)
    ├── services/
    │   ├── srs.ts          # Algoritma memori Spaced Repetition (SM-2)
    │   └── speech.ts       # Service Web Speech API (suara ja-JP)
    ├── data/
    │   ├── kana.ts         # Dataset Kana (150 huruf + mnemonic)
    │   ├── kata.ts         # Dataset Kata latihan membaca
    │   ├── kanji.ts        # Dataset Kanji N5 (109) & N4 (135)
    │   ├── kosakata.ts     # Dataset Kosakata N5 (129) & N4 (95)
    │   ├── grammar.ts      # Dataset Grammar N5 (30) & N4 (30)
    │   └── peta.ts         # Dataset Peta Jalan & Rutinitas
    └── ui/
        ├── app.ts          # Pengendali render DOM & antarmuka utama
        └── kuis.ts         # Pengendali mesin kuis & ulangan harian
```

---

## 🚀 Cara Memulai (Quick Start)

### Prasyarat
- Node.js versi 18.x atau lebih baru terpasang di sistem.

### Langkah Instalasi & Menjalankan

1. **Clone / Buka Direktori Proyek**:
   ```bash
   cd belajar-jepang-project
   ```

2. **Install Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Mode Pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan aktif di `http://localhost:5173`.

---

## 🧠 Metode Belajar & Algoritma SRS

Aplikasi ini mengimplementasikan variasi algoritma **SM-2 (Spaced Repetition System)**:

### 1. Interval Pengulangan Kartu
- **Tahap 0**: Hari ini (0 hari)
- **Tahap 1**: 1 hari
- **Tahap 2**: 2 hari
- **Tahap 3**: 4 hari
- **Tahap 4**: 7 hari
- **Tahap 5**: 14 hari $\rightarrow$ *(Mulai dianggap **Dikuasai**)*
- **Tahap 6**: 30 hari
- **Tahap 7**: 60 hari

### 2. Aturan Penyesuaian Tahap
- **Jawaban Lancar**: Kartu naik 1 tahap ($+1$).
- **Jawaban Belum Pas**: Kartu turun 2 tahap (tidak kembali ke 0) dan dijadwalkan ulang untuk hari ini.

---

## 🧪 Validasi & Pengujian

Proyek ini dilengkapi dengan suite validasi otomatis untuk menjamin tidak ada bug runtime, data duplikat, maupun bentrok ID.

### Perintah Periksa & Build

```bash
# 1. Pemeriksaan Tipe TypeScript
npm run check

# 2. Validasi Data & Integrasi DOM HTML
npm run periksa

# 3. Build Bundel Produksi
npm run build
```

> [!TIP]
> Perintah `npm run periksa` memverifikasi 678 kartu SRS, 150 Kana, 244 Kanji, 224 Kosakata, 60 Grammar, serta memastikan seluruh ID elemen HTML terikat sempurna dengan pengendali TypeScript.

---

## 🌐 Panduan Deploy ke Vercel

Proyek ini siap di-deploy secara langsung ke **Vercel**:

### Metode 1: Menggunakan Vercel CLI
```bash
npx vercel
```

### Metode 2: Menggunakan Dashboard Vercel & GitHub
1. Push repositori ini ke **GitHub**.
2. Buka [Vercel Dashboard](https://vercel.com) $\rightarrow$ Pilih **New Project**.
3. Import repositori GitHub ini. Vercel akan otomatis mendeteksi konfigurasi **Vite**.
4. Klik **Deploy**.

---

## 📚 Lisensi & Sumber Rujukan

- **Acuan Ujian & Materi**: JLPT Official (`jlpt.jp`), Japan Foundation, Tofugu Guide, Bunpro, Tae Kim's Guide, Minna no Nihongo, Try! N5 & N4.
- **Lisensi Data**: Lisensi berbasis *Creative Commons* dari EDRDG (JMdict & KANJIDIC2) dan Tatoeba.

---

<p center="align">
  <i>Dikembangkan dengan semangat pembelajaran mandiri yang efektif dan menyenangkan. 頑張ってください！</i>
</p>
