import { inisialisasiSuara } from './services/speech';
import {
  gambarBeranda, gambarPilihBaris, gambarGridKana, gambarHurufMirip,
  gambarAturan, gambarPeta, gambarPilihTemaKanji, gambarGridKanji,
  gambarPilihTemaKosakata, gambarDaftarKosakata, gambarDaftarGrammar,
  inisialisasiAppListeners
} from './ui/app';
import { inisialisasiKuisListeners } from './ui/kuis';

document.addEventListener('DOMContentLoaded', () => {
  inisialisasiSuara();
  inisialisasiAppListeners();
  inisialisasiKuisListeners();

  gambarBeranda();
  gambarPilihBaris();
  gambarGridKana();
  gambarHurufMirip();
  gambarAturan();
  gambarPeta();
  gambarPilihTemaKanji();
  gambarGridKanji();
  gambarPilihTemaKosakata();
  gambarDaftarKosakata();
  gambarDaftarGrammar();
});
