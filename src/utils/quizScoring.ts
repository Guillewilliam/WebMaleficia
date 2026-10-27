/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnswerOption, RankId, RankResult } from '../types';

export const OFFICIAL_RANKS: Record<RankId, RankResult> = {
  inspector: {
    id: 'inspector',
    titleEs: 'Inspector Supremo de Formularios Vacíos',
    titleAr: 'المُفَتِّشُ الأَعْلَى لِلنَّمَاذِجِ الفَارِغَة',
    transliteration: 'Al-Mufattish al-A’la li-n-Namadhij al-Farighah',
    sealLabel: 'مُفَتِّش مُعْتَمَد',
    sealSubtext: 'بِدُونِ مُلَاحَظَات',
    badge: '⚖️',
    descriptionEs: 'Se te ha concedido el honor de sellar documentos que nadie ha redactado y que nadie leerá jamás. Tu devoción a la plantilla en blanco supera cualquier vestigio de pensamiento crítico.',
    darkPunchline: 'Cualquier intento de rellenar los renglones será castigado con 40 días de confiscación del corrector líquido.',
    punishmentOrPromotion: 'Ascendido a una sala con calefacción central que solo funciona en agosto.',
    baseObedienceScore: 97.4,
  },
  archiver: {
    id: 'archiver',
    titleEs: 'Archivero en el Pozo de los Sellos Perdidos',
    titleAr: 'أَمِينُ الأَرْشِيفِ فِي بِئْرِ الأَخْتَامِ المَفْقُودَة',
    transliteration: 'Amin al-Arshif fi Bi’r al-Akhtam al-Mafqudah',
    sealLabel: 'أَرْشِيف أَبَدِي',
    sealSubtext: 'مُغْلَقٌ إِلَى الأَبَد',
    badge: '📜',
    descriptionEs: 'Tu talento natural reside en hacer desaparecer cualquier queja ciudadana en el fondo de archivadores sin rotular. Sabes que si un documento no se encuentra antes del mediodía, el problema deja de existir administrativamente.',
    darkPunchline: 'Has extraviado tu propia carta de renuncia en tres ocasiones consecutivas. El Ministerio agradece tu lealtad involuntaria.',
    punishmentOrPromotion: 'Se te asigna la llave del sótano número 4, la cual abre una puerta que da a un muro de ladrillos.',
    baseObedienceScore: 92.1,
  },
  censor: {
    id: 'censor',
    titleEs: 'Censor Adjunto de Micro-expresiones de Tedio',
    titleAr: 'نَائِبُ رَقِيبِ تَعَابِيرِ المَلَلِ',
    transliteration: 'Na’ib Raqib Ta’abir al-Malal',
    sealLabel: 'رِقَابَةُ الوُجُوه',
    sealSubtext: 'ابْتَسِمْ بِأَمْرٍ أَعْلَى',
    badge: '👁️',
    descriptionEs: 'Especialista en detectar suspiros en los pasillos estatales y leves parpadeos de desaprobación durante discursos solemnes de tres horas. Tu libreta de sanciones está forrada con cuero sintético y orgullo patrio.',
    darkPunchline: 'Multaste a un espejo por reflejar una mueca de duda sobre el Decreto de las Croquetas.',
    punishmentOrPromotion: 'Destinado al control de parpadeos en el vestíbulo de las 07:00 a las 21:00.',
    baseObedienceScore: 98.9,
  },
  errata: {
    id: 'errata',
    titleEs: 'Redactor de Fe de Erratas para Fe de Erratas',
    titleAr: 'كَاتِبُ اسْتِدْرَاكِ الاسْتِدْرَاكَاتِ',
    transliteration: 'Katib Istidrak al-Istidrakat',
    sealLabel: 'تَصْحِيحُ الأَخْطَاء',
    sealSubtext: 'الخَطَأُ أَقْدَس',
    badge: '✒️',
    descriptionEs: 'Tu prosa oficial se retroalimenta en un bucle infinito de correcciones formales. Has corregido una coma en el Boletín del Estado de 1984 que obligó a rehacer el censo de tres provincias enteras.',
    darkPunchline: 'El nuevo comunicado oficial anula el comunicado anterior que anulaba la anulación del decreto original.',
    punishmentOrPromotion: 'Recibes una máquina de escribir a la que le falta la letra "E". Cualquier error adicional será corregido en el siguiente milenio.',
    baseObedienceScore: 94.6,
  },
  silence: {
    id: 'silence',
    titleEs: 'Oficial Delegado del Silencio Cómplice',
    titleAr: 'مَسْؤُولُ الصَّمْتِ المُمَنْهَجِ',
    transliteration: 'Mas’ul as-Samt al-Mumahnaj',
    sealLabel: 'صَمْتٌ إِدَارِي',
    sealSubtext: 'لَا كَلَامَ بَعْدَ اليَوْم',
    badge: '🤫',
    descriptionEs: 'Ante el desastre, la catástrofe logística o el incendio de la fotocopiadora principal, tu respuesta es bajar la persiana, tomar un sorbo de té frío y mirar fijamente la pared hasta que termine tu turno.',
    darkPunchline: 'Presenciaste la caída del servidor central y elaboraste un informe de 90 páginas justificando por qué no viste absolutamente nada.',
    punishmentOrPromotion: 'Asignado a un despacho con vistas a otra pared idéntica.',
    baseObedienceScore: 99.4,
  },
};

/**
 * Calculates winning rank and obedience score from an array of selected answers.
 */
export function calculateEvaluation(selectedOptions: AnswerOption[]): {
  rank: RankResult;
  obedienceRate: number;
  dossierNumber: string;
  scoreBreakdown: Record<RankId, number>;
} {
  const scoreBreakdown: Record<RankId, number> = {
    inspector: 0,
    archiver: 0,
    censor: 0,
    errata: 0,
    silence: 0,
  };

  selectedOptions.forEach((option) => {
    (Object.keys(option.scores) as RankId[]).forEach((rankId) => {
      scoreBreakdown[rankId] += option.scores[rankId] || 0;
    });
  });

  // Determine highest score with deterministic tiebreaker
  const ranks: RankId[] = ['censor', 'inspector', 'silence', 'errata', 'archiver'];
  let maxScore = -1;
  let winningRankId: RankId = 'inspector';

  for (const rankId of ranks) {
    if (scoreBreakdown[rankId] > maxScore) {
      maxScore = scoreBreakdown[rankId];
      winningRankId = rankId;
    }
  }

  const winningRank = OFFICIAL_RANKS[winningRankId];

  // Dynamic obedience rate based on selected options count and scores
  const totalPoints = Object.values(scoreBreakdown).reduce((a, b) => a + b, 0);
  const variance = (totalPoints % 23) * 0.1;
  const obedienceRate = Math.min(99.9, +(winningRank.baseObedienceScore + variance).toFixed(1));

  // Generate deterministic ceremonial dossier code
  const hashSum = selectedOptions.reduce((acc, opt, i) => acc + opt.id.charCodeAt(0) * (i + 1), 743);
  const serial = (1000 + (hashSum % 8999)).toString();
  const dossierNumber = `EXP-${serial}-NA/1448`;

  return {
    rank: winningRank,
    obedienceRate,
    dossierNumber,
    scoreBreakdown,
  };
}
