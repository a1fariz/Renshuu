export function ucapkan(teks: string): void {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const suara = new SpeechSynthesisUtterance(teks);
  suara.lang = 'ja-JP';
  suara.rate = 0.85;

  const daftarSuara = window.speechSynthesis.getVoices();
  const suaraJepang = daftarSuara.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));
  if (suaraJepang) suara.voice = suaraJepang;

  window.speechSynthesis.speak(suara);
}

export function inisialisasiSuara(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = function () {
      window.speechSynthesis.getVoices();
    };
  }
}
