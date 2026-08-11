import type { KanaItem, HurufMirip } from '../types';

export const HIRAGANA: KanaItem[] = [
  // ---------- BARIS あ ----------
  {
    kana: 'あ', romaji: 'a', baris: 'a', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis mendatar pendek di atas. (2) garis tegak memotong garis tadi, sedikit melengkung ke kiri bawah. (3) mulai dari kanan atas, putar melingkar ke kiri lalu tutup ke kanan bawah.',
    mnemonic: 'Ada huruf "A" besar yang ditimpa tanda silang. A untuk あ.',
    contoh: [
      { kata: 'あめ', baca: 'ame', arti: 'hujan' },
      { kata: 'あさ', baca: 'asa', arti: 'pagi' }
    ]
  },
  {
    kana: 'い', romaji: 'i', baris: 'a', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis panjang di kiri, dari atas ke bawah lalu melengkung sedikit ke kanan. (2) garis pendek di kanan, dari atas ke bawah.',
    mnemonic: 'Dua tetes air hujan jatuh sejajar. Huruf "i" ada dua batang.',
    contoh: [
      { kata: 'いぬ', baca: 'inu', arti: 'anjing' },
      { kata: 'いえ', baca: 'ie', arti: 'rumah' }
    ]
  },
  {
    kana: 'う', romaji: 'u', baris: 'a', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis mendatar sangat pendek di puncak. (2) dari kiri atas melengkung ke kanan lalu turun membentuk lekukan.',
    mnemonic: 'Orang menunduk hormat sambil bilang "uuuh".',
    contoh: [
      { kata: 'うみ', baca: 'umi', arti: 'laut' },
      { kata: 'うた', baca: 'uta', arti: 'lagu' }
    ]
  },
  {
    kana: 'え', romaji: 'e', baris: 'a', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis mendatar pendek di puncak. (2) turun miring ke kiri, lalu zig-zag mendatar ke kanan.',
    mnemonic: 'Orang berenang gaya bebas — "eee" sambil menendang air.',
    contoh: [
      { kata: 'えき', baca: 'eki', arti: 'stasiun' },
      { kata: 'えん', baca: 'en', arti: 'yen (mata uang)' }
    ]
  },
  {
    kana: 'お', romaji: 'o', baris: 'a', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis mendatar pendek. (2) garis tegak memotong lalu melengkung ke kiri dan naik. (3) titik/coretan kecil di kanan atas.',
    mnemonic: 'Mirip あ, tapi punya "ekor" di kanan. Orang OLAHRAGA sampai keluar ekor keringat.',
    contoh: [
      { kata: 'おかね', baca: 'okane', arti: 'uang' },
      { kata: 'おとこ', baca: 'otoko', arti: 'laki-laki' }
    ]
  },

  // ---------- BARIS か ----------
  {
    kana: 'か', romaji: 'ka', baris: 'ka', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis melengkung dari kiri atas turun ke kanan bawah. (2) garis tegak memotong di sebelah kanan. (3) titik kecil di kanan atas.',
    mnemonic: 'KA-tana (pedang samurai) yang ada percikan darahnya.',
    contoh: [
      { kata: 'かお', baca: 'kao', arti: 'wajah' },
      { kata: 'かさ', baca: 'kasa', arti: 'payung' }
    ]
  },
  {
    kana: 'き', romaji: 'ki', baris: 'ka', tipe: 'hiragana',
    coretan: '4 coretan. (1) garis mendatar atas. (2) garis mendatar kedua di bawahnya. (3) garis miring memotong keduanya dari kanan atas ke kiri bawah. (4) lengkungan kecil di kiri bawah.',
    mnemonic: 'KEY (kunci dalam bahasa Inggris) dibaca "ki". Bentuknya memang mirip kunci.',
    contoh: [
      { kata: 'きた', baca: 'kita', arti: 'utara' },
      { kata: 'きって', baca: 'kitte', arti: 'perangko' }
    ]
  },
  {
    kana: 'く', romaji: 'ku', baris: 'ka', tipe: 'hiragana',
    coretan: '1 coretan. Dari kanan atas turun miring ke kiri (membentuk sudut), lalu balik ke kanan bawah.',
    mnemonic: 'Paruh burung terbuka bilang "KU!".',
    contoh: [
      { kata: 'くち', baca: 'kuchi', arti: 'mulut' },
      { kata: 'くるま', baca: 'kuruma', arti: 'mobil' }
    ]
  },
  {
    kana: 'け', romaji: 'ke', baris: 'ka', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis tegak di kiri, sedikit melengkung. (2) garis mendatar di kanan. (3) garis tegak panjang di kanan menembus garis mendatar.',
    mnemonic: 'KE-ran air di tembok — ada pipa tegak dan keran menonjol.',
    contoh: [
      { kata: 'けさ', baca: 'kesa', arti: 'pagi ini' },
      { kata: 'いけ', baca: 'ike', arti: 'kolam' }
    ]
  },
  {
    kana: 'こ', romaji: 'ko', baris: 'ka', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis mendatar melengkung di atas. (2) garis mendatar melengkung di bawah, sejajar.',
    mnemonic: 'Dua cacing KO-mpak berbaring sejajar.',
    contoh: [
      { kata: 'ここ', baca: 'koko', arti: 'di sini' },
      { kata: 'こども', baca: 'kodomo', arti: 'anak' }
    ]
  },

  // ---------- BARIS さ ----------
  {
    kana: 'さ', romaji: 'sa', baris: 'sa', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis mendatar pendek di atas. (2) garis miring turun ke kiri memotong garis tadi. (3) lengkungan di bawah membuka ke kiri.',
    mnemonic: 'Ikan SA-lmon berenang melawan arus.',
    contoh: [
      { kata: 'さかな', baca: 'sakana', arti: 'ikan' },
      { kata: 'さくら', baca: 'sakura', arti: 'bunga sakura' }
    ]
  },
  {
    kana: 'し', romaji: 'shi', baris: 'sa', tipe: 'hiragana',
    coretan: '1 coretan. Dari atas turun lurus ke bawah, lalu melengkung ke kanan atas di ujungnya.',
    mnemonic: 'Kail pancing. SHI-ap mancing!',
    contoh: [
      { kata: 'しごと', baca: 'shigoto', arti: 'pekerjaan' },
      { kata: 'あし', baca: 'ashi', arti: 'kaki' }
    ]
  },
  {
    kana: 'す', romaji: 'su', baris: 'sa', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis mendatar pendek. (2) garis tegak turun memotong, lalu membentuk lingkaran kecil dan menjulur ke kiri bawah.',
    mnemonic: 'SU-ling dengan pita melingkar di ujungnya.',
    contoh: [
      { kata: 'すし', baca: 'sushi', arti: 'sushi' },
      { kata: 'すき', baca: 'suki', arti: 'suka' }
    ]
  },
  {
    kana: 'せ', romaji: 'se', baris: 'sa', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis mendatar. (2) garis tegak di kiri menembus ke bawah. (3) garis tegak di kanan lalu membelok mendatar ke kanan.',
    mnemonic: 'SE-ndok dan garpu ditaruh bersilang di meja.',
    contoh: [
      { kata: 'せかい', baca: 'sekai', arti: 'dunia' },
      { kata: 'せんせい', baca: 'sensei', arti: 'guru' }
    ]
  },
  {
    kana: 'そ', romaji: 'so', baris: 'sa', tipe: 'hiragana',
    coretan: '1 coretan. Zig-zag: mendatar ke kanan, turun miring ke kiri, lalu turun panjang melengkung ke kiri bawah.',
    mnemonic: 'Jahitan zig-zag. "SO" = sew (menjahit dalam bahasa Inggris).',
    contoh: [
      { kata: 'そら', baca: 'sora', arti: 'langit' },
      { kata: 'そと', baca: 'soto', arti: 'luar' }
    ]
  },

  // ---------- BARIS た ----------
  {
    kana: 'た', romaji: 'ta', baris: 'ta', tipe: 'hiragana',
    coretan: '4 coretan. (1) garis mendatar. (2) garis miring turun memotong. (3) garis mendatar pendek di kanan bawah. (4) lengkungan kecil di bawahnya.',
    mnemonic: 'Ada tanda TA-mbah (+) di sebelah kiri, dan angka 7 di kanan.',
    contoh: [
      { kata: 'たべる', baca: 'taberu', arti: 'makan' },
      { kata: 'たかい', baca: 'takai', arti: 'mahal / tinggi' }
    ]
  },
  {
    kana: 'ち', romaji: 'chi', baris: 'ta', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis mendatar pendek di atas. (2) garis turun memotong lalu melengkung besar ke kiri bawah.',
    mnemonic: 'Kursi terbalik. CHI mirip "chair" (kursi).',
    contoh: [
      { kata: 'ちかい', baca: 'chikai', arti: 'dekat' },
      { kata: 'くち', baca: 'kuchi', arti: 'mulut' }
    ]
  },
  {
    kana: 'つ', romaji: 'tsu', baris: 'ta', tipe: 'hiragana',
    coretan: '1 coretan. Dari kiri atas mendatar ke kanan, lalu melengkung turun ke kiri bawah.',
    mnemonic: 'Gelombang TSU-nami yang menggulung.',
    contoh: [
      { kata: 'つくえ', baca: 'tsukue', arti: 'meja' },
      { kata: 'つよい', baca: 'tsuyoi', arti: 'kuat' }
    ]
  },
  {
    kana: 'て', romaji: 'te', baris: 'ta', tipe: 'hiragana',
    coretan: '1 coretan. Garis mendatar di atas, lalu turun miring ke kiri bawah dan sedikit melengkung.',
    mnemonic: 'て sendiri artinya "TE-lapak tangan" dalam bahasa Jepang (te = tangan). Ingat itu saja.',
    contoh: [
      { kata: 'てがみ', baca: 'tegami', arti: 'surat' },
      { kata: 'て', baca: 'te', arti: 'tangan' }
    ]
  },
  {
    kana: 'と', romaji: 'to', baris: 'ta', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis tegak pendek agak miring. (2) dari atas garis tadi, turun melengkung ke kanan bawah.',
    mnemonic: 'Jari kaki TO-ususk jarum pentul.',
    contoh: [
      { kata: 'とけい', baca: 'tokei', arti: 'jam' },
      { kata: 'ともだち', baca: 'tomodachi', arti: 'teman' }
    ]
  },

  // ---------- BARIS な ----------
  {
    kana: 'な', romaji: 'na', baris: 'na', tipe: 'hiragana',
    coretan: '4 coretan. (1) garis mendatar. (2) garis miring turun memotong. (3) garis tegak pendek di kanan bawah. (4) lingkaran kecil di kanan bawah.',
    mnemonic: 'NA-si di atas meja, ada sumpit menancap.',
    contoh: [
      { kata: 'なつ', baca: 'natsu', arti: 'musim panas' },
      { kata: 'なまえ', baca: 'namae', arti: 'nama' }
    ]
  },
  {
    kana: 'に', romaji: 'ni', baris: 'na', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis tegak di kiri dengan sedikit kait. (2) garis mendatar pendek di kanan atas. (3) garis mendatar di kanan bawah.',
    mnemonic: 'NI-at duduk berdua di bangku panjang.',
    contoh: [
      { kata: 'にほん', baca: 'nihon', arti: 'Jepang' },
      { kata: 'にく', baca: 'niku', arti: 'daging' }
    ]
  },
  {
    kana: 'ぬ', romaji: 'nu', baris: 'na', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis miring pendek turun ke kiri. (2) garis panjang melengkung ke kanan, turun, lalu membentuk simpul melingkar di kanan bawah.',
    mnemonic: 'NU-dle (mie) yang melingkar di ujungnya.',
    contoh: [
      { kata: 'いぬ', baca: 'inu', arti: 'anjing' },
      { kata: 'ぬの', baca: 'nuno', arti: 'kain' }
    ]
  },
  {
    kana: 'ね', romaji: 'ne', baris: 'na', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis tegak di kiri. (2) garis mendatar lalu turun dan membentuk simpul melingkar di kanan bawah.',
    mnemonic: 'NE-ko (kucing) dengan ekor melingkar. Kebetulan neko = kucing.',
    contoh: [
      { kata: 'ねこ', baca: 'neko', arti: 'kucing' },
      { kata: 'おかね', baca: 'okane', arti: 'uang' }
    ]
  },
  {
    kana: 'の', romaji: 'no', baris: 'na', tipe: 'hiragana',
    coretan: '1 coretan. Dari kanan atas melengkung ke kiri, turun melingkar besar, lalu keluar ke kanan bawah.',
    mnemonic: 'Tanda dilarang (lingkaran dicoret) — "NO!".',
    contoh: [
      { kata: 'のむ', baca: 'nomu', arti: 'minum' },
      { kata: 'のる', baca: 'noru', arti: 'naik (kendaraan)' }
    ]
  },

  // ---------- BARIS は ----------
  {
    kana: 'は', romaji: 'ha', baris: 'ha', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis tegak di kiri. (2) garis mendatar di kanan. (3) garis tegak di kanan lalu membentuk lekukan ke kanan bawah.',
    mnemonic: 'HA-lte bus: ada tiang dan papan namanya.',
    contoh: [
      { kata: 'はな', baca: 'hana', arti: 'bunga / hidung' },
      { kata: 'はし', baca: 'hashi', arti: 'sumpit / jembatan' }
    ]
  },
  {
    kana: 'ひ', romaji: 'hi', baris: 'ha', tipe: 'hiragana',
    coretan: '1 coretan. Melengkung dari kiri atas turun ke bawah, membentuk lekuk lebar, lalu naik ke kanan.',
    mnemonic: 'Hidung orang tertawa terbahak "HI-HI-HI".',
    contoh: [
      { kata: 'ひと', baca: 'hito', arti: 'orang' },
      { kata: 'ひる', baca: 'hiru', arti: 'siang' }
    ]
  },
  {
    kana: 'ふ', romaji: 'fu', baris: 'ha', tipe: 'hiragana',
    coretan: '4 coretan. (1) coretan pendek di puncak. (2) lengkungan utama di tengah. (3) titik kiri. (4) titik kanan.',
    mnemonic: 'Gunung FU-ji dengan awan di kiri-kanannya.',
    contoh: [
      { kata: 'ふゆ', baca: 'fuyu', arti: 'musim dingin' },
      { kata: 'ふね', baca: 'fune', arti: 'kapal' }
    ]
  },
  {
    kana: 'へ', romaji: 'he', baris: 'ha', tipe: 'hiragana',
    coretan: '1 coretan. Naik miring ke kanan atas, lalu turun landai ke kanan bawah.',
    mnemonic: 'Bukit landai. Naik sebentar, turun panjang — HE-mat tenaga.',
    contoh: [
      { kata: 'へや', baca: 'heya', arti: 'kamar' },
      { kata: 'へた', baca: 'heta', arti: 'tidak pandai' }
    ]
  },
  {
    kana: 'ほ', romaji: 'ho', baris: 'ha', tipe: 'hiragana',
    coretan: '4 coretan. (1) garis tegak kiri. (2) garis mendatar atas di kanan. (3) garis mendatar kedua di kanan. (4) garis tegak kanan yang menembus keduanya.',
    mnemonic: 'Mirip は tapi bertingkat — HO-tel yang punya dua lantai.',
    contoh: [
      { kata: 'ほし', baca: 'hoshi', arti: 'bintang' },
      { kata: 'ほん', baca: 'hon', arti: 'buku' }
    ]
  },

  // ---------- BARIS ま ----------
  {
    kana: 'ま', romaji: 'ma', baris: 'ma', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis mendatar atas. (2) garis mendatar kedua di bawahnya. (3) garis tegak menembus keduanya lalu membentuk simpul di bawah.',
    mnemonic: 'MA-ma pakai konde di bawah rambutnya.',
    contoh: [
      { kata: 'まど', baca: 'mado', arti: 'jendela' },
      { kata: 'まいにち', baca: 'mainichi', arti: 'setiap hari' }
    ]
  },
  {
    kana: 'み', romaji: 'mi', baris: 'ma', tipe: 'hiragana',
    coretan: '2 coretan. (1) turun melengkung lalu membentuk simpul melingkar. (2) garis miring memotong dari kiri bawah ke kanan.',
    mnemonic: 'Angka 21 disambung. Atau: MI-e keriting yang menggulung.',
    contoh: [
      { kata: 'みず', baca: 'mizu', arti: 'air' },
      { kata: 'みみ', baca: 'mimi', arti: 'telinga' }
    ]
  },
  {
    kana: 'む', romaji: 'mu', baris: 'ma', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis mendatar. (2) garis tegak turun lalu membentuk simpul dan menjulur ke kanan. (3) titik kecil di kanan atas.',
    mnemonic: 'Sapi bilang "MUUU" — lihat, ada ekornya di kanan.',
    contoh: [
      { kata: 'むし', baca: 'mushi', arti: 'serangga' },
      { kata: 'むずかしい', baca: 'muzukashii', arti: 'sulit' }
    ]
  },
  {
    kana: 'め', romaji: 'me', baris: 'ma', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis miring pendek turun ke kiri. (2) garis melengkung ke kanan lalu membentuk simpul melingkar. (Mirip ぬ tanpa ekor)',
    mnemonic: 'め artinya "ME-mata" (me = mata dalam bahasa Jepang). Simpulnya seperti bola mata.',
    contoh: [
      { kata: 'め', baca: 'me', arti: 'mata' },
      { kata: 'あめ', baca: 'ame', arti: 'hujan' }
    ]
  },
  {
    kana: 'も', romaji: 'mo', baris: 'ma', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis tegak turun lalu mengait ke kanan. (2) garis mendatar atas. (3) garis mendatar bawah.',
    mnemonic: 'Kail pancing yang dapat dua ikan sekaligus — MO-re (lagi!).',
    contoh: [
      { kata: 'もの', baca: 'mono', arti: 'benda' },
      { kata: 'もり', baca: 'mori', arti: 'hutan' }
    ]
  },

  // ---------- BARIS や ----------
  {
    kana: 'や', romaji: 'ya', baris: 'ya', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis melengkung dari kiri atas ke kanan bawah. (2) garis miring pendek memotong. (3) garis panjang turun ke kiri bawah.',
    mnemonic: 'Ketapel yang siap dilepas.',
    contoh: [
      { kata: 'やま', baca: 'yama', arti: 'gunung' },
      { kata: 'やすい', baca: 'yasui', arti: 'murah' }
    ]
  },
  {
    kana: 'ゆ', romaji: 'yu', baris: 'ya', tipe: 'hiragana',
    coretan: '2 coretan. (1) lengkungan besar seperti perahu. (2) garis tegak memotong dari atas ke bawah.',
    mnemonic: 'Ikan berenang ditusuk tombak. Bentuknya seperti ikan.',
    contoh: [
      { kata: 'ゆき', baca: 'yuki', arti: 'salju' },
      { kata: 'ゆび', baca: 'yubi', arti: 'jari' }
    ]
  },
  {
    kana: 'よ', romaji: 'yo', baris: 'ya', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis mendatar pendek. (2) garis tegak turun memotong lalu membentuk simpul di bawah.',
    mnemonic: 'YO-yo yang digantung pada talinya.',
    contoh: [
      { kata: 'よる', baca: 'yoru', arti: 'malam' },
      { kata: 'よむ', baca: 'yomu', arti: 'membaca' }
    ]
  },

  // ---------- BARIS ら ----------
  {
    kana: 'ら', romaji: 'ra', baris: 'ra', tipe: 'hiragana',
    coretan: '2 coretan. (1) coretan pendek di kiri atas. (2) turun melengkung besar ke kiri bawah seperti huruf "5".',
    mnemonic: 'Orang lari kencang, rambutnya terbang ke belakang — RA-mai.',
    contoh: [
      { kata: 'らいねん', baca: 'rainen', arti: 'tahun depan' },
      { kata: 'さくら', baca: 'sakura', arti: 'bunga sakura' }
    ]
  },
  {
    kana: 'り', romaji: 'ri', baris: 'ra', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis pendek melengkung di kiri. (2) garis panjang di kanan turun lalu melengkung ke kiri.',
    mnemonic: 'RI-sleting yang terbuka — dua sisi tidak sama panjang.',
    contoh: [
      { kata: 'りんご', baca: 'ringo', arti: 'apel' },
      { kata: 'りょうり', baca: 'ryouri', arti: 'masakan' }
    ]
  },
  {
    kana: 'る', romaji: 'ru', baris: 'ra', tipe: 'hiragana',
    coretan: '1 coretan. Mendatar ke kanan, turun miring ke kiri, lalu naik dan membentuk simpul melingkar di bawah.',
    mnemonic: 'RU-te jalan yang berputar-putar sampai buntu.',
    contoh: [
      { kata: 'よる', baca: 'yoru', arti: 'malam' },
      { kata: 'るす', baca: 'rusu', arti: 'sedang tidak di rumah' }
    ]
  },
  {
    kana: 'れ', romaji: 're', baris: 'ra', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis tegak di kiri. (2) garis mendatar lalu turun dan melengkung keluar ke kanan atas.',
    mnemonic: 'Mirip ね tapi ekornya lurus keluar, tidak melingkar. Orang RE-bah kakinya menjulur.',
    contoh: [
      { kata: 'れい', baca: 'rei', arti: 'contoh / nol' },
      { kata: 'これ', baca: 'kore', arti: 'ini' }
    ]
  },
  {
    kana: 'ろ', romaji: 'ro', baris: 'ra', tipe: 'hiragana',
    coretan: '1 coretan. Mendatar ke kanan, turun miring ke kiri, lalu keluar ke kanan bawah TANPA simpul.',
    mnemonic: 'Mirip る tapi RO-danya kempes — tidak ada lingkaran di bawah.',
    contoh: [
      { kata: 'ろく', baca: 'roku', arti: 'enam' },
      { kata: 'おふろ', baca: 'ofuro', arti: 'bak mandi' }
    ]
  },

  // ---------- BARIS わ ----------
  {
    kana: 'わ', romaji: 'wa', baris: 'wa', tipe: 'hiragana',
    coretan: '2 coretan. (1) garis tegak di kiri. (2) garis mendatar lalu turun melengkung ke kanan bawah membentuk lekuk.',
    mnemonic: 'Mirip れ, tapi ekornya membulat ke dalam seperti WA-jan.',
    contoh: [
      { kata: 'わたし', baca: 'watashi', arti: 'saya' },
      { kata: 'わかる', baca: 'wakaru', arti: 'mengerti' }
    ]
  },
  {
    kana: 'を', romaji: 'wo / o', baris: 'wa', tipe: 'hiragana',
    coretan: '3 coretan. (1) garis mendatar pendek. (2) garis zig-zag turun memotong. (3) garis panjang melengkung ke kanan bawah.',
    mnemonic: 'Orang melempar bola sekuat tenaga — "WO!". Huruf ini HANYA dipakai sebagai partikel objek.',
    contoh: [
      { kata: 'みずをのむ', baca: 'mizu wo nomu', arti: 'minum air' },
      { kata: 'ほんをよむ', baca: 'hon wo yomu', arti: 'membaca buku' }
    ]
  },
  {
    kana: 'ん', romaji: 'n', baris: 'wa', tipe: 'hiragana',
    coretan: '1 coretan. Coretan pendek turun di kiri, lalu naik melengkung dan turun ke kanan bawah.',
    mnemonic: 'Huruf "n" yang ditulis miring dan buru-buru.',
    contoh: [
      { kata: 'ほん', baca: 'hon', arti: 'buku' },
      { kata: 'にほん', baca: 'nihon', arti: 'Jepang' }
    ]
  }
];

export const KATAKANA: KanaItem[] = [
  // ---------- BARIS ア ----------
  {
    kana: 'ア', romaji: 'a', baris: 'a', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar lalu turun miring ke kiri bawah. (2) garis miring pendek dari tengah ke kiri bawah.',
    mnemonic: 'Potongan dari huruf あ bagian atasnya. Mirip huruf "A" tanpa kaki kanan.',
    contoh: [
      { kata: 'アメリカ', baca: 'amerika', arti: 'Amerika' },
      { kata: 'アニメ', baca: 'anime', arti: 'anime' }
    ]
  },
  {
    kana: 'イ', romaji: 'i', baris: 'a', tipe: 'katakana',
    coretan: '2 coretan. (1) garis miring pendek dari kanan atas ke kiri. (2) garis tegak panjang turun.',
    mnemonic: 'Bagian kiri dari い yang diluruskan. Seperti orang berdiri tegak.',
    contoh: [
      { kata: 'イギリス', baca: 'igirisu', arti: 'Inggris' },
      { kata: 'インド', baca: 'indo', arti: 'India' }
    ]
  },
  {
    kana: 'ウ', romaji: 'u', baris: 'a', tipe: 'katakana',
    coretan: '3 coretan. (1) titik/coretan pendek di puncak. (2) garis mendatar membentuk atap. (3) garis tegak turun dari kanan atap.',
    mnemonic: 'Rumah beratap dengan cerobong. Mirip う yang dikotakkan.',
    contoh: [
      { kata: 'ウーロンちゃ', baca: 'uuron cha', arti: 'teh oolong' },
      { kata: 'ウイスキー', baca: 'uisukii', arti: 'wiski' }
    ]
  },
  {
    kana: 'エ', romaji: 'e', baris: 'a', tipe: 'katakana',
    coretan: '3 coretan. (1) garis mendatar atas. (2) garis tegak di tengah. (3) garis mendatar bawah yang lebih panjang.',
    mnemonic: 'Sama persis dengan huruf kanji 工 (kerja). Bentuknya seperti huruf "I" dalam font kuno.',
    contoh: [
      { kata: 'エアコン', baca: 'eakon', arti: 'AC' },
      { kata: 'エレベーター', baca: 'erebeetaa', arti: 'lift' }
    ]
  },
  {
    kana: 'オ', romaji: 'o', baris: 'a', tipe: 'katakana',
    coretan: '3 coretan. (1) garis mendatar. (2) garis tegak turun memotong lalu mengait ke kiri. (3) garis miring dari perpotongan ke kiri bawah.',
    mnemonic: 'Mirip huruf kanji 木 (pohon) yang belum jadi. Ada satu cabang saja.',
    contoh: [
      { kata: 'オレンジ', baca: 'orenji', arti: 'jeruk' },
      { kata: 'オーストラリア', baca: 'oosutoraria', arti: 'Australia' }
    ]
  },

  // ---------- BARIS カ ----------
  {
    kana: 'カ', romaji: 'ka', baris: 'ka', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar lalu turun mengait ke kiri. (2) garis miring dari atas ke kiri bawah.',
    mnemonic: 'Sama seperti か tapi TANPA titik di kanan. Ini kanji 力 (tenaga).',
    contoh: [
      { kata: 'カメラ', baca: 'kamera', arti: 'kamera' },
      { kata: 'カード', baca: 'kaado', arti: 'kartu' }
    ]
  },
  {
    kana: 'キ', romaji: 'ki', baris: 'ka', tipe: 'katakana',
    coretan: '3 coretan. (1) garis miring pendek atas. (2) garis miring kedua di bawahnya. (3) garis tegak panjang menembus keduanya.',
    mnemonic: 'Sama seperti き tapi tanpa lengkungan bawah. Kunci yang patah gagangnya.',
    contoh: [
      { kata: 'キロ', baca: 'kiro', arti: 'kilo' },
      { kata: 'キーホルダー', baca: 'kiihorudaa', arti: 'gantungan kunci' }
    ]
  },
  {
    kana: 'ク', romaji: 'ku', baris: 'ka', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar pendek lalu turun miring ke kiri. (2) garis panjang turun ke kiri bawah.',
    mnemonic: 'Mirip く tapi punya "topi" mendatar di atas. HATI-HATI: beda tipis dengan ワ (wa).',
    contoh: [
      { kata: 'クラス', baca: 'kurasu', arti: 'kelas' },
      { kata: 'クリスマス', baca: 'kurisumasu', arti: 'Natal' }
    ]
  },
  {
    kana: 'ケ', romaji: 'ke', baris: 'ka', tipe: 'katakana',
    coretan: '3 coretan. (1) garis miring pendek ke kiri bawah. (2) garis mendatar lalu turun mengait. (3) garis miring turun ke kiri bawah.',
    mnemonic: 'Mirip ク tapi ada coretan miring tambahan di kiri atas.',
    contoh: [
      { kata: 'ケーキ', baca: 'keeki', arti: 'kue' },
      { kata: 'ケータイ', baca: 'keetai', arti: 'HP' }
    ]
  },
  {
    kana: 'コ', romaji: 'ko', baris: 'ka', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar lalu turun tegak di kanan. (2) garis mendatar di bawah menutup.',
    mnemonic: 'Sama seperti こ tapi disambung jadi kotak terbuka. Seperti huruf "C" yang kaku.',
    contoh: [
      { kata: 'コーヒー', baca: 'koohii', arti: 'kopi' },
      { kata: 'コップ', baca: 'koppu', arti: 'gelas' }
    ]
  },

  // ---------- BARIS サ ----------
  {
    kana: 'サ', romaji: 'sa', baris: 'sa', tipe: 'katakana',
    coretan: '3 coretan. (1) garis tegak pendek di kiri. (2) garis tegak pendek di kanan. (3) garis mendatar panjang menembus keduanya.',
    mnemonic: 'Mirip さ yang diluruskan. Seperti garpu dengan dua gigi.',
    contoh: [
      { kata: 'サッカー', baca: 'sakkaa', arti: 'sepak bola' },
      { kata: 'サラダ', baca: 'sarada', arti: 'salad' }
    ]
  },
  {
    kana: 'シ', romaji: 'shi', baris: 'sa', tipe: 'katakana',
    coretan: '3 coretan. (1) titik di kiri atas, arah ke kanan. (2) titik di kiri bawah, arah ke kanan. (3) garis panjang dari KANAN ATAS turun melengkung ke kiri bawah.',
    mnemonic: 'Dua titik BERTUMPUK di kiri (seperti mata senyum), garis terakhir datang dari ATAS. Bandingkan dengan ツ.',
    contoh: [
      { kata: 'シャツ', baca: 'shatsu', arti: 'kemeja' },
      { kata: 'タクシー', baca: 'takushii', arti: 'taksi' }
    ]
  },
  {
    kana: 'ス', romaji: 'su', baris: 'sa', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar lalu turun miring ke kiri bawah. (2) garis pendek dari tengah ke kanan bawah.',
    mnemonic: 'Seperti orang duduk bersila dilihat dari samping. HATI-HATI: mirip ヌ (nu).',
    contoh: [
      { kata: 'スポーツ', baca: 'supootsu', arti: 'olahraga' },
      { kata: 'バス', baca: 'basu', arti: 'bus' }
    ]
  },
  {
    kana: 'セ', romaji: 'se', baris: 'sa', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar lalu garis tegak turun memotong. (2) garis melengkung dari kiri ke kanan bawah.',
    mnemonic: 'Mirip せ tapi lebih sederhana, hanya dua coretan.',
    contoh: [
      { kata: 'セーター', baca: 'seetaa', arti: 'sweter' },
      { kata: 'セット', baca: 'setto', arti: 'set' }
    ]
  },
  {
    kana: 'ソ', romaji: 'so', baris: 'sa', tipe: 'katakana',
    coretan: '2 coretan. (1) titik pendek di kiri atas, arah ke kanan bawah. (2) garis panjang dari KANAN ATAS turun ke kiri bawah.',
    mnemonic: 'SATU titik di atas, garis datang dari atas. Bandingkan dengan ン (n) yang titiknya di kiri dan garisnya naik.',
    contoh: [
      { kata: 'ソファ', baca: 'sofa', arti: 'sofa' },
      { kata: 'ソース', baca: 'soosu', arti: 'saus' }
    ]
  },

  // ---------- BARIS タ ----------
  {
    kana: 'タ', romaji: 'ta', baris: 'ta', tipe: 'katakana',
    coretan: '3 coretan. (1) garis mendatar lalu turun miring ke kiri. (2) garis panjang turun ke kiri bawah. (3) garis pendek memotong di tengah.',
    mnemonic: 'Mirip ク tapi ada coretan memotong di dalamnya. Ini kanji 夕 (senja).',
    contoh: [
      { kata: 'タオル', baca: 'taoru', arti: 'handuk' },
      { kata: 'タバコ', baca: 'tabako', arti: 'rokok' }
    ]
  },
  {
    kana: 'チ', romaji: 'chi', baris: 'ta', tipe: 'katakana',
    coretan: '3 coretan. (1) garis miring pendek. (2) garis mendatar. (3) garis tegak turun menembus lalu mengait ke kiri.',
    mnemonic: 'Mirip huruf kanji 千 (seribu). Atau: mirip キ tapi coretan atasnya cuma satu.',
    contoh: [
      { kata: 'チケット', baca: 'chiketto', arti: 'tiket' },
      { kata: 'チーズ', baca: 'chiizu', arti: 'keju' }
    ]
  },
  {
    kana: 'ツ', romaji: 'tsu', baris: 'ta', tipe: 'katakana',
    coretan: '3 coretan. (1) titik di kiri atas, arah turun. (2) titik di sebelahnya, arah turun. (3) garis panjang dari KANAN ATAS turun melengkung ke kiri bawah.',
    mnemonic: 'Dua titik BERJAJAR di atas (seperti tetesan hujan), garis terakhir seperti つ. Bandingkan dengan シ.',
    contoh: [
      { kata: 'ツアー', baca: 'tsuaa', arti: 'tur' },
      { kata: 'スーツ', baca: 'suutsu', arti: 'setelan jas' }
    ]
  },
  {
    kana: 'テ', romaji: 'te', baris: 'ta', tipe: 'katakana',
    coretan: '3 coretan. (1) garis mendatar pendek atas. (2) garis mendatar panjang di bawahnya. (3) garis tegak turun dari tengah lalu mengait.',
    mnemonic: 'Mirip huruf kanji 天. Seperti tiang bendera dengan dua palang.',
    contoh: [
      { kata: 'テレビ', baca: 'terebi', arti: 'televisi' },
      { kata: 'テスト', baca: 'tesuto', arti: 'tes' }
    ]
  },
  {
    kana: 'ト', romaji: 'to', baris: 'ta', tipe: 'katakana',
    coretan: '2 coretan. (1) garis tegak panjang. (2) garis miring pendek dari tengah ke kanan.',
    mnemonic: 'Huruf "T" yang palangnya melorot ke tengah kanan.',
    contoh: [
      { kata: 'トイレ', baca: 'toire', arti: 'toilet' },
      { kata: 'トマト', baca: 'tomato', arti: 'tomat' }
    ]
  },

  // ---------- BARIS ナ ----------
  {
    kana: 'ナ', romaji: 'na', baris: 'na', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar. (2) garis tegak turun memotong lalu sedikit mengait ke kiri.',
    mnemonic: 'Seperti tanda tambah (+) yang miring. Bagian atas dari な.',
    contoh: [
      { kata: 'ナイフ', baca: 'naifu', arti: 'pisau' },
      { kata: 'バナナ', baca: 'banana', arti: 'pisang' }
    ]
  },
  {
    kana: 'ニ', romaji: 'ni', baris: 'na', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar pendek di atas. (2) garis mendatar panjang di bawah.',
    mnemonic: 'Sama dengan angka 2 dalam kanji (二). Dua garis = NI (dua).',
    contoh: [
      { kata: 'ニュース', baca: 'nyuusu', arti: 'berita' },
      { kata: 'テニス', baca: 'tenisu', arti: 'tenis' }
    ]
  },
  {
    kana: 'ヌ', romaji: 'nu', baris: 'na', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar lalu turun miring ke kiri bawah. (2) garis miring memotong dari kiri atas ke kanan bawah.',
    mnemonic: 'Mirip ス tapi coretan keduanya MEMOTONG, bukan menempel. Ada "X" samar di dalamnya.',
    contoh: [
      { kata: 'ヌードル', baca: 'nuudoru', arti: 'mi (noodle)' },
      { kata: 'カヌー', baca: 'kanuu', arti: 'kano' }
    ]
  },
  {
    kana: 'ネ', romaji: 'ne', baris: 'na', tipe: 'katakana',
    coretan: '4 coretan. (1) titik di puncak. (2) garis mendatar. (3) garis tegak turun mengait. (4) garis miring ke kiri bawah.',
    mnemonic: 'Seperti orang memakai topi runcing. Bagian dari kanji 社.',
    contoh: [
      { kata: 'ネクタイ', baca: 'nekutai', arti: 'dasi' },
      { kata: 'ネット', baca: 'netto', arti: 'internet / jaring' }
    ]
  },
  {
    kana: 'ノ', romaji: 'no', baris: 'na', tipe: 'katakana',
    coretan: '1 coretan. Satu garis miring dari kanan atas ke kiri bawah.',
    mnemonic: 'Satu goresan miring saja. HATI-HATI: mirip メ (me) tapi メ punya dua coretan.',
    contoh: [
      { kata: 'ノート', baca: 'nooto', arti: 'buku catatan' },
      { kata: 'ピアノ', baca: 'piano', arti: 'piano' }
    ]
  },

  // ---------- BARIS ハ ----------
  {
    kana: 'ハ', romaji: 'ha', baris: 'ha', tipe: 'katakana',
    coretan: '2 coretan. (1) garis miring pendek ke kiri bawah. (2) garis miring ke kanan bawah. Keduanya TIDAK menyentuh di atas.',
    mnemonic: 'Angka 8 dalam kanji (八). Seperti gunung tanpa puncak.',
    contoh: [
      { kata: 'ハンカチ', baca: 'hankachi', arti: 'sapu tangan' },
      { kata: 'パン', baca: 'pan', arti: 'roti' }
    ]
  },
  {
    kana: 'ヒ', romaji: 'hi', baris: 'ha', tipe: 'katakana',
    coretan: '2 coretan. (1) garis miring pendek dari kiri atas ke kanan. (2) garis tegak turun lalu membelok mendatar ke kanan.',
    mnemonic: 'Seperti huruf "E" yang kehilangan satu palang. Atau kursi dari samping.',
    contoh: [
      { kata: 'ヒーター', baca: 'hiitaa', arti: 'pemanas' },
      { kata: 'コーヒー', baca: 'koohii', arti: 'kopi' }
    ]
  },
  {
    kana: 'フ', romaji: 'fu', baris: 'ha', tipe: 'katakana',
    coretan: '1 coretan. Garis mendatar ke kanan lalu turun miring panjang ke kiri bawah.',
    mnemonic: 'Mirip ワ dan ウ tapi TANPA garis tegak di kanan. Hanya satu goresan.',
    contoh: [
      { kata: 'フォーク', baca: 'fooku', arti: 'garpu' },
      { kata: 'ナイフ', baca: 'naifu', arti: 'pisau' }
    ]
  },
  {
    kana: 'ヘ', romaji: 'he', baris: 'ha', tipe: 'katakana',
    coretan: '1 coretan. Naik miring ke kanan atas, lalu turun landai ke kanan bawah.',
    mnemonic: 'SAMA PERSIS dengan hiragana へ. Ini hadiah gratis — satu bentuk untuk dua sistem.',
    contoh: [
      { kata: 'ヘリコプター', baca: 'herikoputaa', arti: 'helikopter' },
      { kata: 'ヘルメット', baca: 'herumetto', arti: 'helm' }
    ]
  },
  {
    kana: 'ホ', romaji: 'ho', baris: 'ha', tipe: 'katakana',
    coretan: '4 coretan. (1) garis mendatar. (2) garis tegak turun memotong. (3) titik miring kiri bawah. (4) titik miring kanan bawah.',
    mnemonic: 'Sama dengan kanji 木 (pohon). Batang dengan dua akar.',
    contoh: [
      { kata: 'ホテル', baca: 'hoteru', arti: 'hotel' },
      { kata: 'スマホ', baca: 'sumaho', arti: 'smartphone' }
    ]
  },

  // ---------- BARIS マ ----------
  {
    kana: 'マ', romaji: 'ma', baris: 'ma', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar lalu turun miring ke kiri bawah. (2) garis pendek dari tengah ke kanan bawah.',
    mnemonic: 'Seperti panah menunjuk ke bawah. Mirip ア tapi coretan keduanya di tengah.',
    contoh: [
      { kata: 'マンガ', baca: 'manga', arti: 'manga' },
      { kata: 'トマト', baca: 'tomato', arti: 'tomat' }
    ]
  },
  {
    kana: 'ミ', romaji: 'mi', baris: 'ma', tipe: 'katakana',
    coretan: '3 coretan. Tiga garis miring pendek sejajar, dari atas ke bawah, semua mengarah ke kanan bawah.',
    mnemonic: 'Tiga garis = MI (tiga dalam hitungan Jepang: mittsu). Sama dengan kanji 三 yang dimiringkan.',
    contoh: [
      { kata: 'ミルク', baca: 'miruku', arti: 'susu' },
      { kata: 'ミス', baca: 'misu', arti: 'kesalahan' }
    ]
  },
  {
    kana: 'ム', romaji: 'mu', baris: 'ma', tipe: 'katakana',
    coretan: '2 coretan. (1) garis miring turun ke kiri bawah lalu membelok ke kanan. (2) garis miring pendek di kanan atas.',
    mnemonic: 'Seperti mulut sapi terbuka bilang "MUU". Mirip angka 4 tanpa garis tegak.',
    contoh: [
      { kata: 'ゲーム', baca: 'geemu', arti: 'game' },
      { kata: 'チーム', baca: 'chiimu', arti: 'tim' }
    ]
  },
  {
    kana: 'メ', romaji: 'me', baris: 'ma', tipe: 'katakana',
    coretan: '2 coretan. (1) garis miring pendek dari kanan atas ke kiri bawah. (2) garis miring dari kiri atas ke kanan bawah, memotong garis pertama.',
    mnemonic: 'Huruf "X" yang miring. HATI-HATI: mirip ノ tapi メ punya coretan yang MEMOTONG.',
    contoh: [
      { kata: 'メール', baca: 'meeru', arti: 'email' },
      { kata: 'ラーメン', baca: 'raamen', arti: 'ramen' }
    ]
  },
  {
    kana: 'モ', romaji: 'mo', baris: 'ma', tipe: 'katakana',
    coretan: '3 coretan. (1) garis mendatar pendek. (2) garis mendatar panjang di bawahnya. (3) garis tegak turun menembus lalu mengait ke kiri.',
    mnemonic: 'Mirip も yang diluruskan. Seperti huruf "E" terbalik dengan kail.',
    contoh: [
      { kata: 'モデル', baca: 'moderu', arti: 'model' },
      { kata: 'メモ', baca: 'memo', arti: 'catatan' }
    ]
  },

  // ---------- BARIS ヤ ----------
  {
    kana: 'ヤ', romaji: 'ya', baris: 'ya', tipe: 'katakana',
    coretan: '2 coretan. (1) garis miring pendek ke kanan atas lalu turun. (2) garis tegak panjang turun memotong.',
    mnemonic: 'Mirip や yang disederhanakan. Seperti ketapel yang kaku.',
    contoh: [
      { kata: 'タイヤ', baca: 'taiya', arti: 'ban' },
      { kata: 'ダイヤ', baca: 'daiya', arti: 'berlian' }
    ]
  },
  {
    kana: 'ユ', romaji: 'yu', baris: 'ya', tipe: 'katakana',
    coretan: '2 coretan. (1) garis tegak lalu membelok mendatar ke kanan. (2) garis mendatar panjang di bawah.',
    mnemonic: 'Seperti コ yang diputar. Mirip huruf "U" yang kaku.',
    contoh: [
      { kata: 'ユーモア', baca: 'yuumoa', arti: 'humor' },
      { kata: 'ニュース', baca: 'nyuusu', arti: 'berita' }
    ]
  },
  {
    kana: 'ヨ', romaji: 'yo', baris: 'ya', tipe: 'katakana',
    coretan: '3 coretan. (1) garis mendatar lalu turun tegak di kanan. (2) garis mendatar di tengah. (3) garis mendatar di bawah.',
    mnemonic: 'Huruf "E" yang menghadap ke kiri. Tiga palang seperti rak.',
    contoh: [
      { kata: 'ヨーロッパ', baca: 'yooroppa', arti: 'Eropa' },
      { kata: 'ヨガ', baca: 'yoga', arti: 'yoga' }
    ]
  },

  // ---------- BARIS ラ ----------
  {
    kana: 'ラ', romaji: 'ra', baris: 'ra', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar pendek di atas. (2) garis mendatar lalu turun miring panjang ke kiri bawah.',
    mnemonic: 'Mirip フ tapi ada topi kecil di atasnya.',
    contoh: [
      { kata: 'ラーメン', baca: 'raamen', arti: 'ramen' },
      { kata: 'カメラ', baca: 'kamera', arti: 'kamera' }
    ]
  },
  {
    kana: 'リ', romaji: 'ri', baris: 'ra', tipe: 'katakana',
    coretan: '2 coretan. (1) garis tegak pendek di kiri. (2) garis tegak panjang di kanan lalu mengait ke kiri.',
    mnemonic: 'Sama seperti り tapi lurus. Dua batang, yang kanan lebih panjang.',
    contoh: [
      { kata: 'リモコン', baca: 'rimokon', arti: 'remote' },
      { kata: 'アメリカ', baca: 'amerika', arti: 'Amerika' }
    ]
  },
  {
    kana: 'ル', romaji: 'ru', baris: 'ra', tipe: 'katakana',
    coretan: '2 coretan. (1) garis tegak pendek turun lalu membelok ke kiri. (2) garis di kanan turun lalu naik mengait ke kanan atas.',
    mnemonic: 'Seperti dua kaki orang berjalan. Kaki kanan menendang ke atas.',
    contoh: [
      { kata: 'ホテル', baca: 'hoteru', arti: 'hotel' },
      { kata: 'ビール', baca: 'biiru', arti: 'bir' }
    ]
  },
  {
    kana: 'レ', romaji: 're', baris: 'ra', tipe: 'katakana',
    coretan: '1 coretan. Garis tegak turun lalu naik mengait ke kanan atas.',
    mnemonic: 'Tanda centang (✓) yang terbalik. Satu goresan saja.',
    contoh: [
      { kata: 'レストラン', baca: 'resutoran', arti: 'restoran' },
      { kata: 'カレー', baca: 'karee', arti: 'kari' }
    ]
  },
  {
    kana: 'ロ', romaji: 'ro', baris: 'ra', tipe: 'katakana',
    coretan: '3 coretan. (1) garis tegak kiri. (2) garis mendatar atas lalu turun tegak di kanan. (3) garis mendatar bawah menutup kotak.',
    mnemonic: 'Kotak sempurna. Sama dengan kanji 口 (mulut).',
    contoh: [
      { kata: 'ロボット', baca: 'robotto', arti: 'robot' },
      { kata: 'キロ', baca: 'kiro', arti: 'kilo' }
    ]
  },

  // ---------- BARIS ワ ----------
  {
    kana: 'ワ', romaji: 'wa', baris: 'wa', tipe: 'katakana',
    coretan: '2 coretan. (1) garis mendatar lalu turun tegak di kanan. (2) garis turun miring ke kiri bawah dari ujung kiri.',
    mnemonic: 'Mirip ク tapi bagian kirinya TEGAK, bukan miring. Seperti ウ tanpa topi.',
    contoh: [
      { kata: 'ワイン', baca: 'wain', arti: 'anggur (minuman)' },
      { kata: 'ワイシャツ', baca: 'waishatsu', arti: 'kemeja putih' }
    ]
  },
  {
    kana: 'ヲ', romaji: 'wo', baris: 'wa', tipe: 'katakana',
    coretan: '3 coretan. (1) garis mendatar atas. (2) garis mendatar kedua. (3) garis turun miring ke kiri bawah.',
    mnemonic: 'Hampir tidak pernah dipakai di Jepang modern. Cukup kenali bentuknya, tidak perlu dihafal mati.',
    contoh: [
      { kata: 'ヲ', baca: 'wo', arti: '(sangat jarang dipakai)' },
      { kata: '—', baca: '—', arti: 'cukup dikenali saja' }
    ]
  },
  {
    kana: 'ン', romaji: 'n', baris: 'wa', tipe: 'katakana',
    coretan: '2 coretan. (1) titik pendek di kiri atas, arah ke kanan bawah. (2) garis panjang dari KIRI BAWAH naik ke kanan atas.',
    mnemonic: 'Titik di KIRI, garis NAIK dari bawah. Bandingkan dengan ソ yang garisnya TURUN dari atas.',
    contoh: [
      { kata: 'パン', baca: 'pan', arti: 'roti' },
      { kata: 'ラーメン', baca: 'raamen', arti: 'ramen' }
    ]
  }
];

export const DAKUTEN: KanaItem[] = [
  { kana: 'が', romaji: 'ga', baris: 'ga', tipe: 'dakuten', contoh: [{ kata: 'がっこう', baca: 'gakkou', arti: 'sekolah' }] },
  { kana: 'ぎ', romaji: 'gi', baris: 'ga', tipe: 'dakuten', contoh: [{ kata: 'ぎんこう', baca: 'ginkou', arti: 'bank' }] },
  { kana: 'ぐ', romaji: 'gu', baris: 'ga', tipe: 'dakuten', contoh: [{ kata: 'ぐあい', baca: 'guai', arti: 'kondisi' }] },
  { kana: 'げ', romaji: 'ge', baris: 'ga', tipe: 'dakuten', contoh: [{ kata: 'げんき', baca: 'genki', arti: 'sehat / bersemangat' }] },
  { kana: 'ご', romaji: 'go', baris: 'ga', tipe: 'dakuten', contoh: [{ kata: 'ごはん', baca: 'gohan', arti: 'nasi / makanan' }] },

  { kana: 'ざ', romaji: 'za', baris: 'za', tipe: 'dakuten', contoh: [{ kata: 'ざっし', baca: 'zasshi', arti: 'majalah' }] },
  { kana: 'じ', romaji: 'ji', baris: 'za', tipe: 'dakuten', contoh: [{ kata: 'じかん', baca: 'jikan', arti: 'waktu' }] },
  { kana: 'ず', romaji: 'zu', baris: 'za', tipe: 'dakuten', contoh: [{ kata: 'みず', baca: 'mizu', arti: 'air' }] },
  { kana: 'ぜ', romaji: 'ze', baris: 'za', tipe: 'dakuten', contoh: [{ kata: 'ぜんぶ', baca: 'zenbu', arti: 'semua' }] },
  { kana: 'ぞ', romaji: 'zo', baris: 'za', tipe: 'dakuten', contoh: [{ kata: 'ぞう', baca: 'zou', arti: 'gajah' }] },

  { kana: 'だ', romaji: 'da', baris: 'da', tipe: 'dakuten', contoh: [{ kata: 'だいがく', baca: 'daigaku', arti: 'universitas' }] },
  { kana: 'ぢ', romaji: 'ji', baris: 'da', tipe: 'dakuten', contoh: [{ kata: 'はなぢ', baca: 'hanaji', arti: 'mimisan' }] },
  { kana: 'づ', romaji: 'zu', baris: 'da', tipe: 'dakuten', contoh: [{ kata: 'つづく', baca: 'tsuzuku', arti: 'berlanjut' }] },
  { kana: 'で', romaji: 'de', baris: 'da', tipe: 'dakuten', contoh: [{ kata: 'でんわ', baca: 'denwa', arti: 'telepon' }] },
  { kana: 'ど', romaji: 'do', baris: 'da', tipe: 'dakuten', contoh: [{ kata: 'どこ', baca: 'doko', arti: 'di mana' }] },

  { kana: 'ば', romaji: 'ba', baris: 'ba', tipe: 'dakuten', contoh: [{ kata: 'ばんごはん', baca: 'bangohan', arti: 'makan malam' }] },
  { kana: 'び', romaji: 'bi', baris: 'ba', tipe: 'dakuten', contoh: [{ kata: 'びょういん', baca: 'byouin', arti: 'rumah sakit' }] },
  { kana: 'ぶ', romaji: 'bu', baris: 'ba', tipe: 'dakuten', contoh: [{ kata: 'ぶんか', baca: 'bunka', arti: 'budaya' }] },
  { kana: 'べ', romaji: 'be', baris: 'ba', tipe: 'dakuten', contoh: [{ kata: 'べんきょう', baca: 'benkyou', arti: 'belajar' }] },
  { kana: 'ぼ', romaji: 'bo', baris: 'ba', tipe: 'dakuten', contoh: [{ kata: 'ぼうし', baca: 'boushi', arti: 'topi' }] }
];

export const HANDAKUTEN: KanaItem[] = [
  { kana: 'ぱ', romaji: 'pa', baris: 'pa', tipe: 'handakuten', contoh: [{ kata: 'ぱん', baca: 'pan', arti: 'roti' }] },
  { kana: 'ぴ', romaji: 'pi', baris: 'pa', tipe: 'handakuten', contoh: [{ kata: 'ぴかぴか', baca: 'pikapika', arti: 'berkilau' }] },
  { kana: 'ぷ', romaji: 'pu', baris: 'pa', tipe: 'handakuten', contoh: [{ kata: 'てんぷら', baca: 'tenpura', arti: 'tempura' }] },
  { kana: 'ぺ', romaji: 'pe', baris: 'pa', tipe: 'handakuten', contoh: [{ kata: 'ぺらぺら', baca: 'perapera', arti: 'lancar (bicara)' }] },
  { kana: 'ぽ', romaji: 'po', baris: 'pa', tipe: 'handakuten', contoh: [{ kata: 'さんぽ', baca: 'sanpo', arti: 'jalan-jalan' }] }
];

export const YOUON: KanaItem[] = [
  { kana: 'きゃ', romaji: 'kya', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'きゃく', baca: 'kyaku', arti: 'tamu' }] },
  { kana: 'きゅ', romaji: 'kyu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'きゅう', baca: 'kyuu', arti: 'sembilan' }] },
  { kana: 'きょ', romaji: 'kyo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'きょう', baca: 'kyou', arti: 'hari ini' }] },
  { kana: 'しゃ', romaji: 'sha', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'しゃしん', baca: 'shashin', arti: 'foto' }] },
  { kana: 'しゅ', romaji: 'shu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'しゅみ', baca: 'shumi', arti: 'hobi' }] },
  { kana: 'しょ', romaji: 'sho', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'しょくじ', baca: 'shokuji', arti: 'makan' }] },
  { kana: 'ちゃ', romaji: 'cha', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'おちゃ', baca: 'ocha', arti: 'teh' }] },
  { kana: 'ちゅ', romaji: 'chu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ちゅうい', baca: 'chuui', arti: 'perhatian' }] },
  { kana: 'ちょ', romaji: 'cho', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ちょっと', baca: 'chotto', arti: 'sedikit' }] },
  { kana: 'にゃ', romaji: 'nya', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'こんにゃく', baca: 'konnyaku', arti: 'konjak' }] },
  { kana: 'にゅ', romaji: 'nyu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'にゅういん', baca: 'nyuuin', arti: 'masuk rumah sakit' }] },
  { kana: 'にょ', romaji: 'nyo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'にょうぼう', baca: 'nyoubou', arti: 'istri' }] },
  { kana: 'ひゃ', romaji: 'hya', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ひゃく', baca: 'hyaku', arti: 'seratus' }] },
  { kana: 'ひゅ', romaji: 'hyu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ひゅうひゅう', baca: 'hyuuhyuu', arti: 'suara angin' }] },
  { kana: 'ひょ', romaji: 'hyo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ひょう', baca: 'hyou', arti: 'tabel' }] },
  { kana: 'みゃ', romaji: 'mya', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'みゃく', baca: 'myaku', arti: 'denyut nadi' }] },
  { kana: 'みゅ', romaji: 'myu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ミュージック', baca: 'myuujikku', arti: 'musik' }] },
  { kana: 'みょ', romaji: 'myo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'みょうじ', baca: 'myouji', arti: 'nama keluarga' }] },
  { kana: 'りゃ', romaji: 'rya', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'りゃくご', baca: 'ryakugo', arti: 'singkatan' }] },
  { kana: 'りゅ', romaji: 'ryu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'りゅうがく', baca: 'ryuugaku', arti: 'belajar di luar negeri' }] },
  { kana: 'りょ', romaji: 'ryo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'りょこう', baca: 'ryokou', arti: 'perjalanan' }] },
  { kana: 'ぎゃ', romaji: 'gya', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ぎゃく', baca: 'gyaku', arti: 'kebalikan' }] },
  { kana: 'ぎゅ', romaji: 'gyu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ぎゅうにゅう', baca: 'gyuunyuu', arti: 'susu sapi' }] },
  { kana: 'ぎょ', romaji: 'gyo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ぎょうざ', baca: 'gyouza', arti: 'gyoza' }] },
  { kana: 'じゃ', romaji: 'ja', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'じゃあ', baca: 'jaa', arti: 'kalau begitu' }] },
  { kana: 'じゅ', romaji: 'ju', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'じゅぎょう', baca: 'jugyou', arti: 'pelajaran' }] },
  { kana: 'じょ', romaji: 'jo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'じょうず', baca: 'jouzu', arti: 'pandai' }] },
  { kana: 'びゃ', romaji: 'bya', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'さんびゃく', baca: 'sanbyaku', arti: 'tiga ratus' }] },
  { kana: 'びゅ', romaji: 'byu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'びゅうびゅう', baca: 'byuubyuu', arti: 'suara angin kencang' }] },
  { kana: 'びょ', romaji: 'byo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'びょうき', baca: 'byouki', arti: 'sakit' }] },
  { kana: 'ぴゃ', romaji: 'pya', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ろっぴゃく', baca: 'roppyaku', arti: 'enam ratus' }] },
  { kana: 'ぴゅ', romaji: 'pyu', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'ぴゅう', baca: 'pyuu', arti: 'suara angin' }] },
  { kana: 'ぴょ', romaji: 'pyo', baris: 'youon', tipe: 'youon', contoh: [{ kata: 'はっぴょう', baca: 'happyou', arti: 'presentasi' }] }
];

export const HURUF_MIRIP: HurufMirip[] = [
  {
    pasangan: ['シ', 'ツ'],
    romaji: ['shi', 'tsu'],
    kunci: 'Lihat ARAH titiknya. シ (shi): titik BERTUMPUK vertikal di kiri, garis akhir datang dari kanan atas melengkung ke KIRI BAWAH (seperti mata dan senyum). ツ (tsu): titik BERJAJAR horizontal di atas, garis akhir turun dari atas ke bawah (seperti つ).'
  },
  {
    pasangan: ['ソ', 'ン'],
    romaji: ['so', 'n'],
    kunci: 'ソ (so): garis panjang TURUN dari kanan atas ke kiri bawah — arah menurun. ン (n): garis panjang NAIK dari kiri bawah ke kanan atas — arah menanjak. Ingat: ン naik seperti huruf "n" yang optimis.'
  },
  {
    pasangan: ['ク', 'ワ'],
    romaji: ['ku', 'wa'],
    kunci: 'ク (ku): sisi kirinya MIRING seperti く. ワ (wa): sisi kirinya TEGAK LURUS ke bawah. Kalau miring = ku, kalau tegak = wa.'
  },
  {
    pasangan: ['ノ', 'メ'],
    romaji: ['no', 'me'],
    kunci: 'ノ (no): HANYA SATU garis miring. メ (me): DUA garis yang saling MEMOTONG membentuk X. Hitung coretannya.'
  },
  {
    pasangan: ['ス', 'ヌ'],
    romaji: ['su', 'nu'],
    kunci: 'ス (su): coretan kedua MENEMPEL di tengah dan pendek ke kanan bawah. ヌ (nu): coretan kedua MEMOTONG seluruh badan huruf dari kiri atas ke kanan bawah.'
  },
  {
    pasangan: ['ラ', 'ウ'],
    romaji: ['ra', 'u'],
    kunci: 'ラ (ra): bagian bawah MIRING ke kiri, tidak ada garis tegak. ウ (u): ada garis TEGAK turun di kanan, dan ada titik di puncak.'
  },
  {
    pasangan: ['フ', 'ワ', 'ク'],
    romaji: ['fu', 'wa', 'ku'],
    kunci: 'フ (fu): SATU coretan saja, tidak ada garis tegak di kanan. ワ (wa): ada garis tegak di kanan, sisi kiri lurus. ク (ku): ada garis di kanan, sisi kiri miring.'
  },
  {
    pasangan: ['チ', 'テ'],
    romaji: ['chi', 'te'],
    kunci: 'チ (chi): coretan atas MIRING, garis tegak menembus. テ (te): coretan atas MENDATAR sejajar, garis tegak turun dari tengah.'
  },
  {
    pasangan: ['ア', 'マ'],
    romaji: ['a', 'ma'],
    kunci: 'ア (a): coretan kedua dari KIRI ATAS badan huruf ke kiri bawah. マ (ma): coretan kedua dari TENGAH ke kanan bawah, seperti panah.'
  },
  {
    pasangan: ['れ', 'わ', 'ね'],
    romaji: ['re', 'wa', 'ne'],
    kunci: 'Lihat EKORNYA. れ (re): ekor lurus keluar ke kanan atas. わ (wa): ekor membulat ke dalam. ね (ne): ekor melingkar penuh membentuk simpul.'
  },
  {
    pasangan: ['る', 'ろ'],
    romaji: ['ru', 'ro'],
    kunci: 'る (ru): ADA simpul melingkar di bawah. ろ (ro): TIDAK ada simpul, garisnya lurus keluar.'
  },
  {
    pasangan: ['さ', 'ち'],
    romaji: ['sa', 'chi'],
    kunci: 'さ (sa): lengkungan membuka ke KIRI. ち (chi): lengkungan membuka ke KANAN. Keduanya bercermin.'
  }
];

export const SERAPAN: KanaItem[] = [
  { kana: 'ファ', romaji: 'fa', tipe: 'serapan', contoh: [{ kata: 'ソファ', baca: 'sofa', arti: 'sofa' }] },
  { kana: 'フィ', romaji: 'fi', tipe: 'serapan', contoh: [{ kata: 'オフィス', baca: 'ofisu', arti: 'kantor' }] },
  { kana: 'フェ', romaji: 'fe', tipe: 'serapan', contoh: [{ kata: 'カフェ', baca: 'kafe', arti: 'kafe' }] },
  { kana: 'フォ', romaji: 'fo', tipe: 'serapan', contoh: [{ kata: 'フォーク', baca: 'fooku', arti: 'garpu' }] },
  { kana: 'ティ', romaji: 'ti', tipe: 'serapan', contoh: [{ kata: 'パーティー', baca: 'paatii', arti: 'pesta' }] },
  { kana: 'ディ', romaji: 'di', tipe: 'serapan', contoh: [{ kata: 'ディズニー', baca: 'dizunii', arti: 'Disney' }] },
  { kana: 'ウィ', romaji: 'wi', tipe: 'serapan', contoh: [{ kata: 'ウィスキー', baca: 'wisukii', arti: 'wiski' }] },
  { kana: 'ウェ', romaji: 'we', tipe: 'serapan', contoh: [{ kata: 'ウェブ', baca: 'webu', arti: 'web' }] },
  { kana: 'ジェ', romaji: 'je', tipe: 'serapan', contoh: [{ kata: 'ジェット', baca: 'jetto', arti: 'jet' }] },
  { kana: 'チェ', romaji: 'che', tipe: 'serapan', contoh: [{ kata: 'チェック', baca: 'chekku', arti: 'cek' }] },
  { kana: 'シェ', romaji: 'she', tipe: 'serapan', contoh: [{ kata: 'シェフ', baca: 'shefu', arti: 'koki' }] },
  { kana: 'ヴ', romaji: 'vu', tipe: 'serapan', contoh: [{ kata: 'ヴァイオリン', baca: 'vaiorin', arti: 'biola' }] }
];

export const ATURAN_KHUSUS = [
  {
    nama: 'Sokuon (っ / ッ) — konsonan ganda',
    isi: 'Huruf つ yang ditulis KECIL (っ). Fungsinya menggandakan konsonan sesudahnya dan membuat jeda satu ketukan.',
    contoh: [
      { kata: 'きって', baca: 'ki-t-te', arti: 'perangko (bukan "kitsute")' },
      { kata: 'がっこう', baca: 'ga-k-kou', arti: 'sekolah' },
      { kata: 'ざっし', baca: 'za-s-shi', arti: 'majalah' },
      { kata: 'コップ', baca: 'ko-p-pu', arti: 'gelas' }
    ],
    tips: 'Cara mengucapkan: berhenti sejenak seperti menahan napas, lalu lanjutkan. Bandingkan "kite" (きて) vs "kitte" (きって) — artinya beda jauh.'
  },
  {
    nama: 'Choon (ー) — vokal panjang katakana',
    isi: 'Garis panjang mendatar. HANYA dipakai di katakana. Artinya vokal sebelumnya dibaca dua ketukan.',
    contoh: [
      { kata: 'コーヒー', baca: 'koo-hii', arti: 'kopi' },
      { kata: 'ラーメン', baca: 'raa-men', arti: 'ramen' },
      { kata: 'ケーキ', baca: 'kee-ki', arti: 'kue' },
      { kata: 'ノート', baca: 'noo-to', arti: 'buku catatan' }
    ],
    tips: 'Saat menulis vertikal, garis ini jadi tegak. Panjang-pendek vokal mengubah arti — jangan diabaikan.'
  },
  {
    nama: 'Vokal panjang hiragana',
    isi: 'Hiragana tidak pakai ー. Vokal panjang dibuat dengan menambah huruf vokal.',
    contoh: [
      { kata: 'おかあさん', baca: 'okaasan', arti: 'ibu (a + a)' },
      { kata: 'おにいさん', baca: 'oniisan', arti: 'kakak laki-laki (i + i)' },
      { kata: 'くうき', baca: 'kuuki', arti: 'udara (u + u)' },
      { kata: 'せんせい', baca: 'sensei', arti: 'guru (e + i, dibaca "ee")' },
      { kata: 'ありがとう', baca: 'arigatou', arti: 'terima kasih (o + u, dibaca "oo")' }
    ],
    tips: 'Baris え biasanya dipanjangkan dengan い, dan baris お dengan う. Jadi せんせい dibaca "sensee", bukan "sensei" terpisah.'
  },
  {
    nama: 'Partikel yang dibaca beda',
    isi: 'Tiga huruf ini berubah bunyi HANYA saat berfungsi sebagai partikel.',
    contoh: [
      { kata: 'は', baca: 'dibaca "wa"', arti: 'わたしは → watashi WA' },
      { kata: 'へ', baca: 'dibaca "e"', arti: 'がっこうへ → gakkou E' },
      { kata: 'を', baca: 'dibaca "o"', arti: 'みずを → mizu O' }
    ],
    tips: 'Di dalam kata biasa, は tetap dibaca "ha" (はな = hana). Yang berubah hanya saat jadi partikel.'
  }
];

export const SEMUA_KANA: KanaItem[] = [...HIRAGANA, ...KATAKANA, ...DAKUTEN, ...HANDAKUTEN, ...YOUON, ...SERAPAN];
export const URUTAN_BELAJAR: KanaItem[] = [...HIRAGANA, ...DAKUTEN, ...HANDAKUTEN, ...YOUON, ...KATAKANA, ...SERAPAN];

export const URUTAN_BARIS = [
  { id: 'a', label: 'あ / ア', judul: 'Baris A', huruf: 'あいうえお' },
  { id: 'ka', label: 'か / カ', judul: 'Baris KA', huruf: 'かきくけこ' },
  { id: 'sa', label: 'さ / サ', judul: 'Baris SA', huruf: 'さしすせそ' },
  { id: 'ta', label: 'た / タ', judul: 'Baris TA', huruf: 'たちつてと' },
  { id: 'na', label: 'な / ナ', judul: 'Baris NA', huruf: 'なにぬねの' },
  { id: 'ha', label: 'は / ハ', judul: 'Baris HA', huruf: 'はひふへほ' },
  { id: 'ma', label: 'ま / マ', judul: 'Baris MA', huruf: 'まみむめも' },
  { id: 'ya', label: 'や / ヤ', judul: 'Baris YA', huruf: 'やゆよ' },
  { id: 'ra', label: 'ら / ラ', judul: 'Baris RA', huruf: 'らりるれろ' },
  { id: 'wa', label: 'わ / ワ', judul: 'Baris WA + N', huruf: 'わをん' }
];
