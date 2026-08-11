export interface KonsepItem {
  judul: string;
  ringkas: string;
  detail: string;
  contoh?: { jp: string; baca: string; arti: string }[];
}

export const KONSEP_UTAMA: KonsepItem[] = [
  {
    judul: 'Hiragana (ひらがな)',
    ringkas: 'Huruf dasar bahasa Jepang. Dipakai untuk kata asli Jepang, akhiran kata kerja, dan partikel kalimat. Semua halaman pertama buku anak Jepang ditulis dengan hiragana.',
    detail: 'Hiragana adalah sistem tulis paling dasar, berbentuk melengkung dan halus. Setiap huruf mewakili satu suku bunyi (seperti "ka", "shi", "tsu") bukan satu huruf alfabet seperti "k" atau "a". Bahasa Jepang tidak punya tulisan "k" sendirian, hanya "ka, ki, ku, ke, ko". Karena itu hiragana disebut sistem syllabary, bukan alphabet.\n\nDalam kalimat sehari-hari, hiragana dipakai untuk:\n- Partikel kalimat (wa, ga, wo, ni, de)\n- Akhiran kata kerja dan kata sifat (tabe-MAS, takai, TAKA-katta)\n- Kata-kata asli Jepang yang tidak punya kanji umum atau ditulis tanpa kanji\n- Furigana — tulisan kecil di atas kanji untuk membantu pembaca\n\nKalau kamu bisa hiragana sampai refleks, kamu bisa membaca hampir semua buku pembelajaran pemula.',
    contoh: [
      { jp: 'わたしはインドネシアじんです', baca: 'watashi wa Indoneshia-jin desu', arti: 'Saya orang Indonesia' },
      { jp: 'きのう、ともだちとごはんをたべました', baca: 'kinou, tomodachi to gohan wo tabemashita', arti: 'Kemarin saya makan dengan teman' }
    ]
  },
  {
    judul: 'Katakana (カタカナ)',
    ringkas: 'Huruf untuk kata serapan asing, nama orang asing, onomatope (tiruan bunyi), dan penekanan. Bentuknya lebih tajam dan kaku dibanding hiragana.',
    detail: 'Katakana mewakili bunyi yang sama persis dengan hiragana (ko = こ = コ), tapi punya fungsi berbeda. Katakana dipakai untuk:\n\n- Kata serapan dari bahasa asing (terutama Inggris): kompyuuta, basu, koohii\n- Nama orang dan tempat non-Jepang: Alisa, Amerika, Jakarta\n- Onomatope — tiruan bunyi: dokidoki (jantung berdebar), wanwan (gonggongan)\n- Penekanan, mirip huruf kapital atau miring\n- Istilah sains dan teknis\n\nKenapa dibedakan? Karena kalimat Jepang tidak pakai spasi. Dalam satu kalimat, kamu tahu kata serapan mana hanya dengan melihat bentuk hurufnya. Walaupun bunyinya sama, mata bisa langsung pisahkan "kata asli" dan "kata asing" tanpa berhenti membaca.\n\nKatakana biasanya terasa lebih sulit karena huruf seperti シ, ツ, ソ, ン, ノ sangat mirip satu sama lain. Ini memang bagian paling menantang, dan ada halaman khusus untuk melatihnya.',
    contoh: [
      { jp: 'パンをたべます', baca: 'pan wo tabemasu', arti: 'Makan roti' },
      { jp: 'アイスクリームがすきです', baca: 'aisukuriimu ga suki desu', arti: 'Suka es krim' }
    ]
  },
  {
    judul: 'Dakuten (゛) dan Handakuten (゜)',
    ringkas: 'Tanda kecil yang mengubah bunyi huruf. Dakuten = dua tanda petik kecil, handakuten = lingkaran kecil. Bukan huruf baru, hanya variasi bunyi dari huruf dasar.',
    detail: 'Dakuten mengubah bunyi "pita suara tidak bergetar" menjadi "bergetar":\n- ka (か) → ga (が)\n- sa (さ) → za (ざ)\n- ta (た) → da (だ)\n- ha (は) → ba (ば)\n\nHandakuten hanya berlaku untuk baris H, mengubahnya menjadi suara P:\n- ha (は) → pa (ぱ)\n- hi (ひ) → pi (ぴ)\n\nKarena ini cuma penambahan tanda, bukan huruf baru, orang sering bilang "belajar hiragana 46 huruf" padahal sebenarnya variasinya lebih banyak. Tapi kalau kamu sudah kenal baris dasar, tinggal tambah 2 aturan ini.',
  },
  {
    judul: 'Youon (きゃ, しゅ, ちょ)',
    ringkas: 'Gabungan dua huruf yang bunyinya menyatu jadi satu suku bunyi pendek. Huruf kecil ゃ ゅ ょ menempel di huruf akhiran "i" dan melebur bunyinya.',
    detail: 'Youon secara literal berarti "bunyi melengkung". Pola ini terjadi karena menggabungkan baris I dengan huruf kecil YA/YU/YO:\n- ki + ya = kya (きゃ)\n- shi + yu = shu (しゅ)\n- chi + yo = cho (ちょ)\n\nContoh nyata: Tokyo bukan dibaca "to-ki-yo" tapi "to-kyo" — huruf き kecilnya menyatu dengan よ jadi satu bunyi. Ini penting karena kalau salah baca, kata bisa berubah arti.\n\nYouon juga muncul di katakana dengan aturan yang sama: キャ、シュ、チョ.',
  },
  {
    judul: 'Kenapa ada dua sistem? Kenapa tidak satu saja?',
    ringkas: 'Sebab kalimat Jepang tidak punya spasi. Dua sistem huruf membantu mata memisahkan kata dan fungsi kata tanpa perlu spasi atau tanda baca tambahan.',
    detail: 'Bahasa Jepang menggunakan tiga sistem tulis sekaligus dalam satu kalimat: kanji, hiragana, dan katakana. Kanji dipakai untuk kata inti (orang, benda, kata kerja), hiragana untuk penghubung dan akhiran, katakana untuk kata asing.\n\nBayangkan kalimat bahasa Inggris tanpa spasi dan semuanya huruf kecil: "iliketoeatsushieveryday". Sulit dibaca kan? Dengan tiga sistem, kalimat Jepang secara visual langsung memberi tahu: ini kata benda, ini kata kerja, ini kata asing.\n\nJadi memang lebih banyak yang harus dihafal di awal, tapi setelah terbiasa, justru lebih cepat dibaca. Ini seperti belajar naik sepeda dengan roda bantu — merepotkan di hari pertama, tapi membuatmu tidak jatuh.',
  },
  {
    judul: 'Cara pakai aplikasi ini biar paham semuanya',
    ringkas: 'Belajar satu baris per hari, jangan lebih. Gunakan halaman Huruf untuk mengenali bentuk, halaman Latihan untuk tes ingatan, dan halaman Baca Kata untuk menguji kemampuan membaca kata utuh.',
    detail: 'Strategi yang direkomendasikan:\n\n1. Buka halaman Huruf, pilih sistem (hiragana/katakana), pelajari satu baris (misal a-i-u-e-o). Baca mnemonic-nya keras-keras, tulis di kertas 5–10 kali sambil mengucapkan bunyinya.\n2. Setelah merasa lumayan ingat, klik tombol "Tes baris ini" di bawah grid huruf. Ulangi sampai bisa menjawab tanpa ragu.\n3. Besoknya, ulangi baris kemarin lewat halaman Latihan > "Yang sudah kupelajari". Kalau masih sering salah, kembali ke halaman Huruf.\n4. Setelah dua-tiga baris, coba halaman Baca Kata untuk melatih membaca kata utuh, bukan huruf lepas.\n5. Kalau sudah masuk katakana, rutin buka halaman Huruf Mirip 5 menit setiap hari.\n\nJangan terburu-buru menyelesaikan semua huruf. 10 menit setiap hari lebih baik daripada 2 jam sekali seminggu.',
  }
];

export const RINGKASAN_PANEL: Record<string, { judul: string; isi: string }> = {
  hiragana: {
    judul: 'Apa itu hiragana?',
    isi: 'Huruf dasar untuk kata asli Jepang, partikel, dan akhiran kata kerja. Berbentuk melengkung halus. Misalnya: あいしてる (aishiteru = sayang), <strong>は</strong> (wa) penanda topik kalimat. Kuasai ini dulu sebelum katakana.'
  },
  katakana: {
    judul: 'Apa itu katakana?',
    isi: 'Huruf untuk kata serapan asing dan nama non-Jepang: コンピュータ (kompyuuta), ジャカルタ (Jakarta), ワンワン (guk guk). Bentuknya lebih tajam. Bunyinya sama dengan hiragana, hanya fungsinya beda.'
  },
  dakuten: {
    judul: 'Apa itu dakuten & handakuten?',
    isi: 'Tanda " kecil (dakuten) mengubah K→G, S→Z, T→D, H→B. Tanda ° kecil (handakuten) khusus baris H mengubah H→P. Bukan huruf baru, hanya variasi bunyi.'
  },
  youon: {
    judul: 'Apa itu youon?',
    isi: 'Gabungan dua huruf jadi satu bunyi: き+ゃ = きゃ (kya), し+ゅ = しゅ (shu). Huruf kecil ゃゅょ menempel di huruf berakhiran "i" dan bunyinya melebur. Tokyo dibaca "to-kyo", bukan "to-ki-yo".'
  },
  serapan: {
    judul: 'Apa itu bunyi serapan?',
    isi: 'Katakana punya kombinasi tambahan untuk meniru bunyi Inggris yang tidak ada di Jepang: ファ (fa), ティ (ti), ヴァ (va). Dipakai di kata modern dan merek.'
  }
};

export const URUTAN_BARIS: Record<string, string[]> = {
  hiragana: ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'],
  katakana: ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'],
  dakuten: ['dakuten', 'handakuten'],
  youon: [],
  serapan: []
};
