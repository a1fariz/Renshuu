import { inisialisasiSuara } from './services/speech';
import { inisialisasiCanvasTulis } from './services/canvas';
import {
  gambarBeranda, gambarHurufMirip,
  gambarAturan, gambarPeta, gambarPilihTemaKanji, gambarGridKanji,
  gambarPilihTemaKosakata, gambarDaftarKosakata, gambarDaftarGrammar,
  gambarKonsep, perbaruiTampilanBelajar,
  inisialisasiAppListeners
} from './ui/app';
import { inisialisasiKuisListeners } from './ui/kuis';

document.addEventListener('DOMContentLoaded', () => {
  inisialisasiSuara();
  inisialisasiCanvasTulis();
  inisialisasiAppListeners();
  inisialisasiKuisListeners();

  gambarBeranda();
  gambarKonsep();
  perbaruiTampilanBelajar();
  gambarHurufMirip();
  gambarAturan();
  gambarPeta();
  gambarPilihTemaKanji();
  gambarGridKanji();
  gambarPilihTemaKosakata();
  gambarDaftarKosakata();
  gambarDaftarGrammar();
});
