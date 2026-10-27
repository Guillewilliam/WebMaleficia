/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RankId = 'inspector' | 'archiver' | 'censor' | 'errata' | 'silence';

export interface AnswerOption {
  id: string;
  textEs: string;
  textAr: string;
  scores: Record<RankId, number>;
  tendencyLabel: string;
}

export interface Question {
  id: number;
  dossierNumber: string;
  titleEs: string;
  titleAr: string;
  subtitleEs: string;
  options: AnswerOption[];
}

export interface RankResult {
  id: RankId;
  titleEs: string;
  titleAr: string;
  transliteration: string;
  sealLabel: string;
  sealSubtext: string;
  badge: string;
  descriptionEs: string;
  darkPunchline: string;
  punishmentOrPromotion: string;
  baseObedienceScore: number;
}

export interface Communique {
  id: string;
  dossierNumber: string;
  categoryEs: string;
  categoryAr: string;
  titleAr: string;
  titleEs: string;
  textEs: string;
  decreeYear: string;
  officialStamp: string;
}

export interface SecretFile {
  id: string;
  dossierCode: string;
  clearanceLevel: string;
  titleAr: string;
  titleEs: string;
  summaryEs: string;
  redactedSegment: string;
  investigationStatus: string;
  consequence: string;
}

export interface SelfDenunciation {
  id: string;
  labelEs: string;
  labelAr: string;
  sanctionEs: string;
  sanctionAr: string;
  verdictCode: string;
}
