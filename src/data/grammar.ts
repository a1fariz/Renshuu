import type { GrammarBelajar } from '../types';

export const GRAMMAR_BELAJAR_N5: GrammarBelajar[] = [
  {
    id: 'n5-desu', urutan: 1, level: 'N5',
    pola: '〜は〜です',
    arti: 'X adalah Y',
    cara: 'Pola paling dasar. は (dibaca "wa") menandai topik kalimat, です menutup kalimat dengan sopan. Ini seperti "adalah" dalam Bahasa Indonesia.',
    contoh: [
      { jp: 'わたしは がくせいです。', baca: 'watashi wa gakusei desu', arti: 'Saya adalah pelajar.' },
      { jp: 'これは ほんです。', baca: 'kore wa hon desu', arti: 'Ini adalah buku.' }
    ],
    catatan: 'は sebagai partikel SELALU dibaca "wa", bukan "ha". Ini aturan mutlak.'
  },
  {
    id: 'n5-dewaarimasen', urutan: 2, level: 'N5',
    pola: '〜は〜ではありません',
    arti: 'X bukan Y',
    cara: 'Bentuk negatif dari です. Dalam percakapan santai sering dipendekkan jadi じゃありません atau じゃないです.',
    contoh: [
      { jp: 'わたしは せんせいではありません。', baca: 'watashi wa sensei dewa arimasen', arti: 'Saya bukan guru.' },
      { jp: 'これは わたしのじゃないです。', baca: 'kore wa watashi no ja nai desu', arti: 'Ini bukan punya saya.' }
    ]
  },
  {
    id: 'n5-ka', urutan: 3, level: 'N5',
    pola: '〜ですか',
    arti: 'Apakah ...?',
    cara: 'Tambahkan か di akhir kalimat untuk membuat pertanyaan. Bahasa Jepang tidak perlu membalik urutan kata seperti Bahasa Inggris.',
    contoh: [
      { jp: 'あなたは がくせいですか。', baca: 'anata wa gakusei desu ka', arti: 'Apakah kamu pelajar?' },
      { jp: 'これは なんですか。', baca: 'kore wa nan desu ka', arti: 'Ini apa?' }
    ],
    catatan: 'Dalam tulisan Jepang, kalimat tanya biasanya diakhiri 。 bukan ?. Tanda か sudah cukup.'
  },
  {
    id: 'n5-kore', urutan: 4, level: 'N5',
    pola: 'これ / それ / あれ',
    arti: 'ini / itu / itu (jauh)',
    cara: 'これ = dekat pembicara. それ = dekat lawan bicara. あれ = jauh dari keduanya. Berdiri sendiri sebagai kata benda.',
    contoh: [
      { jp: 'これは わたしのかばんです。', baca: 'kore wa watashi no kaban desu', arti: 'Ini tas saya.' },
      { jp: 'あれは なんですか。', baca: 'are wa nan desu ka', arti: 'Itu (jauh) apa?' }
    ]
  },
  {
    id: 'n5-kono', urutan: 5, level: 'N5',
    pola: 'この / その / あの + benda',
    arti: 'benda ini / itu',
    cara: 'Sama dengan これ/それ/あれ, TAPI harus diikuti kata benda. これ berdiri sendiri, この butuh pasangan.',
    contoh: [
      { jp: 'この ほんは たかいです。', baca: 'kono hon wa takai desu', arti: 'Buku ini mahal.' },
      { jp: 'あの ひとは だれですか。', baca: 'ano hito wa dare desu ka', arti: 'Orang itu siapa?' }
    ],
    catatan: 'Salah paling umum: これ ほん (salah) → この ほん (benar).'
  },
  {
    id: 'n5-no', urutan: 6, level: 'N5',
    pola: '〜の〜',
    arti: 'milik / dari',
    cara: 'の menghubungkan dua kata benda. Yang di DEPAN menerangkan yang di BELAKANG. Kebalikan dari Bahasa Indonesia.',
    contoh: [
      { jp: 'わたしの かばん', baca: 'watashi no kaban', arti: 'tas saya' },
      { jp: 'にほんごの ほん', baca: 'nihongo no hon', arti: 'buku bahasa Jepang' }
    ],
    catatan: 'Urutannya terbalik dari Bahasa Indonesia: "tas saya" jadi "saya の tas".'
  },
  {
    id: 'n5-mo', urutan: 7, level: 'N5',
    pola: '〜も',
    arti: 'juga',
    cara: 'Menggantikan は atau が, bukan ditambahkan. Artinya "juga" atau "pun".',
    contoh: [
      { jp: 'わたしも がくせいです。', baca: 'watashi mo gakusei desu', arti: 'Saya juga pelajar.' },
      { jp: 'これも ください。', baca: 'kore mo kudasai', arti: 'Ini juga, tolong.' }
    ],
    catatan: 'Jangan tulis わたしはも — は diganti も, bukan digabung.'
  },
  {
    id: 'n5-wo', urutan: 8, level: 'N5',
    pola: '〜を + kata kerja',
    arti: 'penanda objek',
    cara: 'を menandai benda yang dikenai perbuatan. Huruf を HANYA dipakai untuk ini, tidak pernah di dalam kata.',
    contoh: [
      { jp: 'ごはんを たべます。', baca: 'gohan wo tabemasu', arti: 'Makan nasi.' },
      { jp: 'ほんを よみます。', baca: 'hon wo yomimasu', arti: 'Membaca buku.' }
    ],
    catatan: 'を sebagai partikel dibaca "o", bukan "wo".'
  },
  {
    id: 'n5-ni-waktu', urutan: 9, level: 'N5',
    pola: '〜に (waktu)',
    arti: 'pada (waktu tertentu)',
    cara: 'Dipakai untuk waktu yang bisa ditunjuk angka: jam, tanggal, hari. TIDAK dipakai untuk きょう, あした, いま.',
    contoh: [
      { jp: 'しちじに おきます。', baca: 'shichiji ni okimasu', arti: 'Bangun jam tujuh.' },
      { jp: 'げつようびに いきます。', baca: 'getsuyoubi ni ikimasu', arti: 'Pergi hari Senin.' }
    ],
    catatan: 'Salah umum: きょうに (salah) → きょう saja (benar). Kata waktu relatif tidak pakai に.'
  },
  {
    id: 'n5-e', urutan: 10, level: 'N5',
    pola: '〜へ / 〜に (tujuan)',
    arti: 'ke, menuju',
    cara: 'Menandai arah tujuan. へ menekankan arah, に menekankan titik tiba. Untuk pemula, keduanya hampir sama.',
    contoh: [
      { jp: 'がっこうへ いきます。', baca: 'gakkou e ikimasu', arti: 'Pergi ke sekolah.' },
      { jp: 'にほんに いきたいです。', baca: 'nihon ni ikitai desu', arti: 'Ingin pergi ke Jepang.' }
    ],
    catatan: 'へ sebagai partikel dibaca "e", bukan "he".'
  },
  {
    id: 'n5-de', urutan: 11, level: 'N5',
    pola: '〜で',
    arti: 'di (tempat kegiatan) / dengan (alat)',
    cara: 'Dua fungsi: tempat berlangsungnya kegiatan, atau alat yang dipakai.',
    contoh: [
      { jp: 'うちで べんきょうします。', baca: 'uchi de benkyou shimasu', arti: 'Belajar di rumah.' },
      { jp: 'バスで いきます。', baca: 'basu de ikimasu', arti: 'Pergi dengan bus.' }
    ],
    catatan: 'Beda dengan に: で untuk tempat BERKEGIATAN, に untuk tempat BERADA.'
  },
  {
    id: 'n5-to', urutan: 12, level: 'N5',
    pola: '〜と',
    arti: 'dan (benda) / bersama (orang)',
    cara: 'Menyambung kata benda, atau menandai teman melakukan sesuatu. Untuk menyambung kalimat, pakai bentuk て.',
    contoh: [
      { jp: 'パンと たまごを かいます。', baca: 'pan to tamago wo kaimasu', arti: 'Membeli roti dan telur.' },
      { jp: 'ともだちと いきます。', baca: 'tomodachi to ikimasu', arti: 'Pergi bersama teman.' }
    ]
  },
  {
    id: 'n5-ga', urutan: 13, level: 'N5',
    pola: '〜が',
    arti: 'penanda subjek',
    cara: 'Menandai subjek yang baru diperkenalkan atau ditekankan. Bedanya dengan は: が menunjuk "yang mana", は menunjuk "tentang apa".',
    contoh: [
      { jp: 'ねこが います。', baca: 'neko ga imasu', arti: 'Ada kucing.' },
      { jp: 'にほんごが すきです。', baca: 'nihongo ga suki desu', arti: 'Suka bahasa Jepang.' }
    ],
    catatan: 'すき, きらい, じょうず, へた, ほしい selalu pakai が, bukan を.'
  },
  {
    id: 'n5-arimasu', urutan: 14, level: 'N5',
    pola: 'あります / います',
    arti: 'ada',
    cara: 'あります untuk benda mati dan tumbuhan. います untuk manusia dan hewan — yang bisa bergerak sendiri.',
    contoh: [
      { jp: 'つくえの うえに ほんが あります。', baca: 'tsukue no ue ni hon ga arimasu', arti: 'Ada buku di atas meja.' },
      { jp: 'へやに ねこが います。', baca: 'heya ni neko ga imasu', arti: 'Ada kucing di kamar.' }
    ],
    catatan: 'Mobil pakai あります walaupun bisa bergerak, karena tidak bergerak sendiri.'
  },
  {
    id: 'n5-masu', urutan: 15, level: 'N5',
    pola: '〜ます',
    arti: 'bentuk sopan kata kerja',
    cara: 'Bentuk standar yang sopan untuk situasi umum. Ini yang dipakai di LPK dan tempat kerja.',
    contoh: [
      { jp: 'まいにち べんきょうします。', baca: 'mainichi benkyou shimasu', arti: 'Belajar setiap hari.' },
      { jp: 'あした いきます。', baca: 'ashita ikimasu', arti: 'Besok pergi.' }
    ],
    catatan: 'Bentuk ます juga dipakai untuk masa depan. Bahasa Jepang tidak punya bentuk khusus "akan".'
  },
  {
    id: 'n5-masen', urutan: 16, level: 'N5',
    pola: '〜ません',
    arti: 'tidak (bentuk sopan)',
    cara: 'Ganti ます jadi ません untuk menyatakan tidak melakukan.',
    contoh: [
      { jp: 'にくを たべません。', baca: 'niku wo tabemasen', arti: 'Tidak makan daging.' },
      { jp: 'わかりません。', baca: 'wakarimasen', arti: 'Tidak mengerti.' }
    ]
  },
  {
    id: 'n5-mashita', urutan: 17, level: 'N5',
    pola: '〜ました / 〜ませんでした',
    arti: 'sudah / tidak (lampau)',
    cara: 'ました untuk lampau positif, ませんでした untuk lampau negatif.',
    contoh: [
      { jp: 'きのう えいがを みました。', baca: 'kinou eiga wo mimashita', arti: 'Kemarin menonton film.' },
      { jp: 'なにも たべませんでした。', baca: 'nani mo tabemasen deshita', arti: 'Tidak makan apa-apa.' }
    ]
  },
  {
    id: 'n5-i-keiyoushi', urutan: 18, level: 'N5',
    pola: 'kata sifat い',
    arti: 'sifat berakhiran い',
    cara: 'Negatifnya: buang い ganti くない. Lampau: buang い ganti かった. Perubahan ada di sifatnya, bukan di です.',
    contoh: [
      { jp: 'この ほんは たかいです。', baca: 'kono hon wa takai desu', arti: 'Buku ini mahal.' },
      { jp: 'たかくないです。', baca: 'takakunai desu', arti: 'Tidak mahal.' },
      { jp: 'たかかったです。', baca: 'takakatta desu', arti: 'Dulu mahal.' }
    ],
    catatan: 'いい (bagus) berubah tidak beraturan: よくない, よかった. Bukan いくない.'
  },
  {
    id: 'n5-na-keiyoushi', urutan: 19, level: 'N5',
    pola: 'kata sifat な',
    arti: 'sifat berakhiran な',
    cara: 'Butuh な saat menerangkan kata benda. Perubahannya mengikuti です, bukan kata sifatnya.',
    contoh: [
      { jp: 'しずかな へやです。', baca: 'shizuka na heya desu', arti: 'Kamar yang tenang.' },
      { jp: 'この へやは しずかです。', baca: 'kono heya wa shizuka desu', arti: 'Kamar ini tenang.' }
    ],
    catatan: 'きれい dan ゆうめい berakhiran い tapi termasuk sifat な. Ini pengecualian yang harus dihafal.'
  },
  {
    id: 'n5-te', urutan: 20, level: 'N5',
    pola: 'bentuk て',
    arti: 'penghubung',
    cara: 'Bentuk paling penting di N5. Dipakai untuk menyambung kalimat dan jadi dasar banyak pola lain.',
    contoh: [
      { jp: 'ごはんを たべて、ねます。', baca: 'gohan wo tabete, nemasu', arti: 'Makan lalu tidur.' },
      { jp: 'やすくて おいしいです。', baca: 'yasukute oishii desu', arti: 'Murah dan enak.' }
    ],
    catatan: 'Kuasai bentuk て sampai otomatis. Tanpa ini, grammar N4 tidak bisa jalan.'
  },
  {
    id: 'n5-teimasu', urutan: 21, level: 'N5',
    pola: '〜ています',
    arti: 'sedang / keadaan sekarang',
    cara: 'Dua arti: sedang berlangsung, atau keadaan yang menetap (tinggal, menikah, tahu).',
    contoh: [
      { jp: 'いま べんきょうしています。', baca: 'ima benkyou shite imasu', arti: 'Sedang belajar sekarang.' },
      { jp: 'とうきょうに すんでいます。', baca: 'toukyou ni sunde imasu', arti: 'Tinggal di Tokyo.' }
    ]
  },
  {
    id: 'n5-tekudasai', urutan: 22, level: 'N5',
    pola: '〜てください',
    arti: 'tolong lakukan',
    cara: 'Permintaan sopan. Dipakai sehari-hari, tidak kasar.',
    contoh: [
      { jp: 'ちょっと まってください。', baca: 'chotto matte kudasai', arti: 'Tolong tunggu sebentar.' },
      { jp: 'もう いちど いってください。', baca: 'mou ichido itte kudasai', arti: 'Tolong ulangi sekali lagi.' }
    ],
    catatan: 'Kalimat yang paling berguna di LPK: もういちど おねがいします (tolong sekali lagi).'
  },
  {
    id: 'n5-temoii', urutan: 23, level: 'N5',
    pola: '〜てもいいです',
    arti: 'boleh',
    cara: 'Meminta atau memberi izin.',
    contoh: [
      { jp: 'はいっても いいですか。', baca: 'haitte mo ii desu ka', arti: 'Boleh masuk?' },
      { jp: 'ここで たべても いいです。', baca: 'koko de tabete mo ii desu', arti: 'Boleh makan di sini.' }
    ]
  },
  {
    id: 'n5-tewaikemasen', urutan: 24, level: 'N5',
    pola: '〜てはいけません',
    arti: 'tidak boleh',
    cara: 'Larangan tegas. Sering dilihat di papan pengumuman.',
    contoh: [
      { jp: 'ここで たばこを すっては いけません。', baca: 'koko de tabako wo sutte wa ikemasen', arti: 'Dilarang merokok di sini.' },
      { jp: 'はいっては いけません。', baca: 'haitte wa ikemasen', arti: 'Dilarang masuk.' }
    ]
  },
  {
    id: 'n5-naide', urutan: 25, level: 'N5',
    pola: '〜ないでください',
    arti: 'tolong jangan',
    cara: 'Permintaan agar tidak melakukan sesuatu.',
    contoh: [
      { jp: 'わすれないで ください。', baca: 'wasurenaide kudasai', arti: 'Tolong jangan lupa.' },
      { jp: 'しんぱいしないで ください。', baca: 'shinpai shinaide kudasai', arti: 'Tolong jangan khawatir.' }
    ]
  },
  {
    id: 'n5-tai', urutan: 26, level: 'N5',
    pola: '〜たいです',
    arti: 'ingin melakukan',
    cara: 'Buang ます, tambah たい. Berubah seperti kata sifat い.',
    contoh: [
      { jp: 'にほんへ いきたいです。', baca: 'nihon e ikitai desu', arti: 'Ingin pergi ke Jepang.' },
      { jp: 'みずが のみたいです。', baca: 'mizu ga nomitai desu', arti: 'Ingin minum air.' }
    ],
    catatan: 'Hanya untuk diri sendiri. Untuk orang lain pakai たがっています.'
  },
  {
    id: 'n5-mashou', urutan: 27, level: 'N5',
    pola: '〜ましょう / 〜ませんか',
    arti: 'ayo / maukah',
    cara: 'ましょう untuk mengajak, ませんか untuk menawarkan dengan lebih sopan.',
    contoh: [
      { jp: 'いっしょに いきましょう。', baca: 'issho ni ikimashou', arti: 'Ayo pergi bersama.' },
      { jp: 'おちゃを のみませんか。', baca: 'ocha wo nomimasen ka', arti: 'Maukah minum teh?' }
    ]
  },
  {
    id: 'n5-kara', urutan: 28, level: 'N5',
    pola: '〜から',
    arti: 'karena',
    cara: 'Alasan diletakkan SEBELUM から. Kebalikan dari Bahasa Indonesia yang menaruh "karena" di depan.',
    contoh: [
      { jp: 'あついですから、まどを あけます。', baca: 'atsui desu kara, mado wo akemasu', arti: 'Karena panas, buka jendela.' },
      { jp: 'いそがしいから、いきません。', baca: 'isogashii kara, ikimasen', arti: 'Karena sibuk, tidak pergi.' }
    ]
  },
  {
    id: 'n5-ga-tapi', urutan: 29, level: 'N5',
    pola: '〜が (tetapi)',
    arti: 'tetapi',
    cara: 'が di tengah kalimat berarti "tetapi". Beda dengan が penanda subjek.',
    contoh: [
      { jp: 'たかいですが、おいしいです。', baca: 'takai desu ga, oishii desu', arti: 'Mahal, tapi enak.' },
      { jp: 'べんきょうしましたが、わかりません。', baca: 'benkyou shimashita ga, wakarimasen', arti: 'Sudah belajar, tapi tidak mengerti.' }
    ]
  },
  {
    id: 'n5-counter', urutan: 30, level: 'N5',
    pola: 'kata bantu bilangan',
    arti: 'penghitung benda',
    cara: 'Bahasa Jepang punya kata bantu berbeda untuk tiap jenis benda. Yang paling sering: 〜つ (umum), 〜人 (orang), 〜本 (benda panjang), 〜枚 (benda tipis).',
    contoh: [
      { jp: 'りんごを みっつ ください。', baca: 'ringo wo mittsu kudasai', arti: 'Tolong tiga apel.' },
      { jp: 'ひとりで いきます。', baca: 'hitori de ikimasu', arti: 'Pergi sendirian.' }
    ],
    catatan: 'Kalau lupa kata bantunya, pakai 〜つ. Biasanya masih dimengerti.'
  }
];

export const GRAMMAR_BELAJAR_N4: GrammarBelajar[] = [
  {
    id: 'n4-jisho', urutan: 1, level: 'N4',
    pola: 'bentuk kamus',
    arti: 'bentuk dasar kata kerja',
    cara: 'Bentuk asli kata kerja sebelum jadi ます. Dipakai dalam percakapan santai dan jadi dasar banyak pola N4.',
    contoh: [
      { jp: 'たべる、のむ、いく', baca: 'taberu, nomu, iku', arti: 'makan, minum, pergi' },
      { jp: 'あした えいがを みる。', baca: 'ashita eiga wo miru', arti: 'Besok nonton film.' }
    ],
    catatan: 'Kata kerja terbagi 3 golongan. Golongan 2 (berakhiran る) paling mudah: buang る ganti ます.'
  },
  {
    id: 'n4-nai', urutan: 2, level: 'N4',
    pola: 'bentuk ない',
    arti: 'negatif biasa',
    cara: 'Bentuk negatif santai. Setara dengan ません tapi tidak formal.',
    contoh: [
      { jp: 'たべない、いかない', baca: 'tabenai, ikanai', arti: 'tidak makan, tidak pergi' },
      { jp: 'きょうは いかない。', baca: 'kyou wa ikanai', arti: 'Hari ini tidak pergi.' }
    ]
  },
  {
    id: 'n4-ta', urutan: 3, level: 'N4',
    pola: 'bentuk た',
    arti: 'lampau biasa',
    cara: 'Perubahannya sama persis dengan bentuk て, tinggal ganti て jadi た.',
    contoh: [
      { jp: 'たべた、いった', baca: 'tabeta, itta', arti: 'sudah makan, sudah pergi' },
      { jp: 'きのう えいがを みた。', baca: 'kinou eiga wo mita', arti: 'Kemarin nonton film.' }
    ]
  },
  {
    id: 'n4-kotogadekiru', urutan: 4, level: 'N4',
    pola: '〜ことができます',
    arti: 'bisa melakukan',
    cara: 'Bentuk kamus + ことができます. Cara paling gampang menyatakan kemampuan.',
    contoh: [
      { jp: 'にほんごを はなすことが できます。', baca: 'nihongo wo hanasu koto ga dekimasu', arti: 'Bisa berbicara bahasa Jepang.' },
      { jp: 'およぐことが できますか。', baca: 'oyogu koto ga dekimasu ka', arti: 'Bisa berenang?' }
    ]
  },
  {
    id: 'n4-kanou', urutan: 5, level: 'N4',
    pola: 'bentuk potensial',
    arti: 'bisa (bentuk pendek)',
    cara: 'Lebih sering dipakai daripada ことができます. Objeknya pakai が, bukan を.',
    contoh: [
      { jp: 'にほんごが はなせます。', baca: 'nihongo ga hanasemasu', arti: 'Bisa berbicara bahasa Jepang.' },
      { jp: 'かんじが よめます。', baca: 'kanji ga yomemasu', arti: 'Bisa membaca kanji.' }
    ],
    catatan: 'Perhatikan: を berubah jadi が saat memakai bentuk potensial.'
  },
  {
    id: 'n4-takotogaaru', urutan: 6, level: 'N4',
    pola: '〜たことがあります',
    arti: 'pernah',
    cara: 'Bentuk た + ことがあります. Untuk pengalaman yang pernah dialami.',
    contoh: [
      { jp: 'にほんへ いったことが あります。', baca: 'nihon e itta koto ga arimasu', arti: 'Pernah pergi ke Jepang.' },
      { jp: 'すしを たべたことが ありません。', baca: 'sushi wo tabeta koto ga arimasen', arti: 'Belum pernah makan sushi.' }
    ]
  },
  {
    id: 'n4-tari', urutan: 7, level: 'N4',
    pola: '〜たり〜たりします',
    arti: 'melakukan ini dan itu',
    cara: 'Menyebut beberapa kegiatan sebagai contoh, bukan daftar lengkap.',
    contoh: [
      { jp: 'やすみのひは ほんを よんだり、えいがを みたりします。', baca: 'yasumi no hi wa hon wo yondari, eiga wo mitari shimasu', arti: 'Di hari libur membaca buku, menonton film, dan sebagainya.' }
    ]
  },
  {
    id: 'n4-toomoimasu', urutan: 8, level: 'N4',
    pola: '〜とおもいます',
    arti: 'saya pikir',
    cara: 'Menyatakan pendapat. Sebelum と pakai bentuk biasa, bukan bentuk ます.',
    contoh: [
      { jp: 'あした あめが ふると おもいます。', baca: 'ashita ame ga furu to omoimasu', arti: 'Saya pikir besok akan hujan.' },
      { jp: 'いいと おもいます。', baca: 'ii to omoimasu', arti: 'Saya pikir bagus.' }
    ],
    catatan: 'Salah umum: いきますとおもいます (salah) → いくとおもいます (benar).'
  },
  {
    id: 'n4-kamoshirenai', urutan: 9, level: 'N4',
    pola: '〜かもしれませんが',
    arti: 'mungkin',
    cara: 'Kemungkinan yang tidak pasti, sekitar 50%.',
    contoh: [
      { jp: 'あめが ふるかも しれません。', baca: 'ame ga furu kamo shiremasen', arti: 'Mungkin akan hujan.' },
      { jp: 'かれは こないかも しれません。', baca: 'kare wa konai kamo shiremasen', arti: 'Mungkin dia tidak datang.' }
    ]
  },
  {
    id: 'n4-deshou', urutan: 10, level: 'N4',
    pola: '〜でしょう',
    arti: 'kemungkinan besar',
    cara: 'Lebih yakin daripada かもしれません. Sering dipakai di ramalan cuaca.',
    contoh: [
      { jp: 'あしたは はれるでしょう。', baca: 'ashita wa hareru deshou', arti: 'Besok kemungkinan cerah.' },
      { jp: 'たぶん だいじょうぶでしょう。', baca: 'tabun daijoubu deshou', arti: 'Mungkin tidak apa-apa.' }
    ]
  },
  {
    id: 'n4-tara', urutan: 11, level: 'N4',
    pola: '〜たら',
    arti: 'kalau (pengandaian paling umum)',
    cara: 'Bentuk た + ら. Paling luwes dan paling sering dipakai dari empat bentuk pengandaian.',
    contoh: [
      { jp: 'あめが ふったら、いきません。', baca: 'ame ga futtara, ikimasen', arti: 'Kalau hujan, tidak pergi.' },
      { jp: 'じかんが あったら、あそびに きてください。', baca: 'jikan ga attara, asobi ni kite kudasai', arti: 'Kalau ada waktu, datanglah main.' }
    ],
    catatan: 'Kalau bingung memilih di antara と/ば/たら/なら, pakai たら. Paling jarang salah.'
  },
  {
    id: 'n4-to-kalau', urutan: 12, level: 'N4',
    pola: '〜と (pengandaian)',
    arti: 'kalau (akibat pasti)',
    cara: 'Untuk hasil yang SELALU terjadi: hukum alam, mesin, petunjuk jalan. Tidak bisa dipakai untuk permintaan.',
    contoh: [
      { jp: 'はるに なると、さくらが さきます。', baca: 'haru ni naru to, sakura ga sakimasu', arti: 'Kalau musim semi tiba, sakura mekar.' },
      { jp: 'みぎに まがると、えきが あります。', baca: 'migi ni magaru to, eki ga arimasu', arti: 'Kalau belok kanan, ada stasiun.' }
    ]
  },
  {
    id: 'n4-ba', urutan: 13, level: 'N4',
    pola: '〜ば',
    arti: 'kalau (syarat)',
    cara: 'Menekankan syarat. Sering dipakai dalam ungkapan tetap.',
    contoh: [
      { jp: 'やすければ、かいます。', baca: 'yasukereba, kaimasu', arti: 'Kalau murah, saya beli.' },
      { jp: 'どうすれば いいですか。', baca: 'dou sureba ii desu ka', arti: 'Sebaiknya bagaimana?' }
    ]
  },
  {
    id: 'n4-nara', urutan: 14, level: 'N4',
    pola: '〜なら',
    arti: 'kalau soal itu',
    cara: 'Menanggapi topik yang baru disebut lawan bicara.',
    contoh: [
      { jp: 'にほんごなら、たなかさんが じょうずです。', baca: 'nihongo nara, tanaka-san ga jouzu desu', arti: 'Kalau soal bahasa Jepang, Tanaka yang pandai.' }
    ]
  },
  {
    id: 'n4-ukemi', urutan: 15, level: 'N4',
    pola: 'bentuk pasif',
    arti: 'dikenai perbuatan',
    cara: 'Orang yang melakukan ditandai に. Sering dipakai untuk hal yang merugikan.',
    contoh: [
      { jp: 'ともだちに わらわれました。', baca: 'tomodachi ni warawaremashita', arti: 'Ditertawakan teman.' },
      { jp: 'あめに ふられました。', baca: 'ame ni furaremashita', arti: 'Kehujanan.' }
    ],
    catatan: 'あめにふられる secara harfiah "dihujani" — bentuk pasif untuk kejadian yang merugikan.'
  },
  {
    id: 'n4-shieki', urutan: 16, level: 'N4',
    pola: 'bentuk kausatif',
    arti: 'menyuruh / membiarkan',
    cara: 'Menyuruh atau mengizinkan orang lain melakukan sesuatu.',
    contoh: [
      { jp: 'こどもに やさいを たべさせます。', baca: 'kodomo ni yasai wo tabesasemasu', arti: 'Menyuruh anak makan sayur.' },
      { jp: 'やすませて ください。', baca: 'yasumasete kudasai', arti: 'Izinkan saya istirahat.' }
    ],
    catatan: '〜させてください adalah cara sopan minta izin. Berguna di tempat kerja.'
  },
  {
    id: 'n4-ageru', urutan: 17, level: 'N4',
    pola: 'あげる / くれる / もらう',
    arti: 'memberi dan menerima',
    cara: 'あげる: saya beri orang lain. くれる: orang lain beri saya. もらう: saya terima.',
    contoh: [
      { jp: 'ともだちに プレゼントを あげました。', baca: 'tomodachi ni purezento wo agemashita', arti: 'Saya memberi hadiah ke teman.' },
      { jp: 'ともだちが プレゼントを くれました。', baca: 'tomodachi ga purezento wo kuremashita', arti: 'Teman memberi saya hadiah.' }
    ],
    catatan: 'Ini titik tersulit N4. Kuncinya: arah pemberian relatif terhadap "saya".'
  },
  {
    id: 'n4-tekureru', urutan: 18, level: 'N4',
    pola: '〜てあげる / てくれる / てもらう',
    arti: 'melakukan untuk seseorang',
    cara: 'Sama dengan di atas, tapi yang diberikan adalah PERBUATAN, bukan benda.',
    contoh: [
      { jp: 'てつだって くれて ありがとう。', baca: 'tetsudatte kurete arigatou', arti: 'Terima kasih sudah membantu saya.' },
      { jp: 'ともだちに おしえて もらいました。', baca: 'tomodachi ni oshiete moraimashita', arti: 'Saya diajari teman.' }
    ]
  },
  {
    id: 'n4-sou-tampak', urutan: 19, level: 'N4',
    pola: '〜そうです (penampakan)',
    arti: 'kelihatannya',
    cara: 'Dugaan dari apa yang terlihat. Buang い dari kata sifat, tambah そう.',
    contoh: [
      { jp: 'おいしそうです。', baca: 'oishisou desu', arti: 'Kelihatannya enak.' },
      { jp: 'あめが ふりそうです。', baca: 'ame ga furisou desu', arti: 'Sepertinya mau hujan.' }
    ],
    catatan: 'Beda tipis dengan そうです kabar. Yang ini TANPA だ sebelum そう.'
  },
  {
    id: 'n4-sou-kabar', urutan: 20, level: 'N4',
    pola: '〜そうです (kabar)',
    arti: 'katanya',
    cara: 'Menyampaikan informasi dari orang lain. Sebelum そう pakai bentuk biasa lengkap.',
    contoh: [
      { jp: 'あした あめが ふるそうです。', baca: 'ashita ame ga furu sou desu', arti: 'Katanya besok hujan.' },
      { jp: 'かれは いそがしいそうです。', baca: 'kare wa isogashii sou desu', arti: 'Katanya dia sibuk.' }
    ]
  },
  {
    id: 'n4-you', urutan: 21, level: 'N4',
    pola: '〜ようです / みたいです',
    arti: 'sepertinya',
    cara: 'Dugaan berdasarkan pengamatan sendiri. みたい lebih santai.',
    contoh: [
      { jp: 'かぜを ひいたようです。', baca: 'kaze wo hiita you desu', arti: 'Sepertinya masuk angin.' },
      { jp: 'だれも いないみたいです。', baca: 'dare mo inai mitai desu', arti: 'Sepertinya tidak ada orang.' }
    ]
  },
  {
    id: 'n4-nagara', urutan: 22, level: 'N4',
    pola: '〜ながら',
    arti: 'sambil',
    cara: 'Dua kegiatan bersamaan oleh orang yang sama. Kegiatan UTAMA diletakkan di belakang.',
    contoh: [
      { jp: 'おんがくを ききながら べんきょうします。', baca: 'ongaku wo kikinagara benkyou shimasu', arti: 'Belajar sambil mendengarkan musik.' }
    ],
    catatan: 'Yang di belakang ながら adalah kegiatan utamanya.'
  },
  {
    id: 'n4-teoku', urutan: 23, level: 'N4',
    pola: '〜ておく',
    arti: 'melakukan untuk persiapan',
    cara: 'Melakukan sesuatu lebih dulu supaya siap nanti. Dalam percakapan sering jadi 〜とく.',
    contoh: [
      { jp: 'よやくして おきます。', baca: 'yoyaku shite okimasu', arti: 'Saya pesan dulu (untuk persiapan).' },
      { jp: 'よんで おいてください。', baca: 'yonde oite kudasai', arti: 'Tolong dibaca dulu sebelumnya.' }
    ]
  },
  {
    id: 'n4-teshimau', urutan: 24, level: 'N4',
    pola: '〜てしまう',
    arti: 'terlanjur / selesai sepenuhnya',
    cara: 'Dua arti: menyesal karena terlanjur, atau selesai tuntas. Dalam percakapan jadi 〜ちゃう.',
    contoh: [
      { jp: 'わすれて しまいました。', baca: 'wasurete shimaimashita', arti: 'Terlanjur lupa.' },
      { jp: 'ぜんぶ たべて しまいました。', baca: 'zenbu tabete shimaimashita', arti: 'Sudah dimakan habis.' }
    ]
  },
  {
    id: 'n4-temiru', urutan: 25, level: 'N4',
    pola: '〜てみる',
    arti: 'mencoba',
    cara: 'Melakukan sesuatu untuk mencoba dan melihat hasilnya.',
    contoh: [
      { jp: 'たべて みます。', baca: 'tabete mimasu', arti: 'Saya coba makan.' },
      { jp: 'いって みたいです。', baca: 'itte mitai desu', arti: 'Ingin coba pergi ke sana.' }
    ]
  },
  {
    id: 'n4-hazu', urutan: 26, level: 'N4',
    pola: '〜はずです',
    arti: 'seharusnya',
    cara: 'Keyakinan berdasarkan alasan yang jelas.',
    contoh: [
      { jp: 'かれは くるはずです。', baca: 'kare wa kuru hazu desu', arti: 'Dia seharusnya datang.' },
      { jp: 'そんなはずは ありません。', baca: 'sonna hazu wa arimasen', arti: 'Tidak mungkin begitu.' }
    ]
  },
  {
    id: 'n4-tsumori', urutan: 27, level: 'N4',
    pola: '〜つもりです',
    arti: 'berniat',
    cara: 'Rencana yang sudah dipikirkan matang.',
    contoh: [
      { jp: 'にほんへ いくつもりです。', baca: 'nihon e iku tsumori desu', arti: 'Berniat pergi ke Jepang.' },
      { jp: 'なにも かうつもりは ありません。', baca: 'nani mo kau tsumori wa arimasen', arti: 'Tidak berniat membeli apa pun.' }
    ]
  },
  {
    id: 'n4-younininaru', urutan: 28, level: 'N4',
    pola: '〜ようになる',
    arti: 'menjadi bisa',
    cara: 'Perubahan kemampuan atau kebiasaan dari waktu ke waktu.',
    contoh: [
      { jp: 'にほんごが はなせるように なりました。', baca: 'nihongo ga hanaseru you ni narimashita', arti: 'Jadi bisa berbicara bahasa Jepang.' },
      { jp: 'かんじが よめるように なりたいです。', baca: 'kanji ga yomeru you ni naritai desu', arti: 'Ingin jadi bisa membaca kanji.' }
    ]
  },
  {
    id: 'n4-nakerebanaranai', urutan: 29, level: 'N4',
    pola: '〜なければなりません',
    arti: 'harus',
    cara: 'Kewajiban. Dalam percakapan sering dipendekkan jadi 〜なきゃ.',
    contoh: [
      { jp: 'べんきょうしなければ なりません。', baca: 'benkyou shinakereba narimasen', arti: 'Harus belajar.' },
      { jp: 'もう いかなくちゃ。', baca: 'mou ikanakucha', arti: 'Harus pergi sekarang.' }
    ]
  },
  {
    id: 'n4-keigo', urutan: 30, level: 'N4',
    pola: 'keigo dasar',
    arti: 'bahasa hormat',
    cara: 'Sonkeigo meninggikan lawan bicara, kenjougo merendahkan diri sendiri. Wajib di tempat kerja Jepang.',
    contoh: [
      { jp: 'せんせいが いらっしゃいます。', baca: 'sensei ga irasshaimasu', arti: 'Guru datang (hormat).' },
      { jp: 'わたしが まいります。', baca: 'watashi ga mairimasu', arti: 'Saya datang (merendah).' }
    ],
    catatan: 'Untuk kerja di Jepang, keigo bukan pilihan tapi keharusan. Mulai dari いらっしゃいます, なさいます, めしあがります.'
  }
];

export const SEMUA_GRAMMAR: GrammarBelajar[] = [...GRAMMAR_BELAJAR_N5, ...GRAMMAR_BELAJAR_N4];
