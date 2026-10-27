/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEvaluation, OFFICIAL_RANKS } from './quizScoring';
import { AnswerOption } from '../types';

test('calculateEvaluation returns expected rank when inspector options dominate', () => {
  const inspectorAnswers: AnswerOption[] = Array(10).fill({
    id: 'opt-inspector',
    textEs: 'Sellar en blanco',
    textAr: 'الختم على بياض',
    scores: { inspector: 5, archiver: 1, censor: 0, errata: 0, silence: 0 },
    tendencyLabel: 'Inspector',
  });

  const evaluation = calculateEvaluation(inspectorAnswers);
  assert.equal(evaluation.rank.id, 'inspector');
  assert.equal(evaluation.rank.titleEs, 'Inspector Supremo de Formularios Vacíos');
  assert.match(evaluation.dossierNumber, /^EXP-\d{4}-NA\/1448$/);
  assert.ok(evaluation.obedienceRate >= 90);
});

test('calculateEvaluation returns expected rank when censor options dominate', () => {
  const censorAnswers: AnswerOption[] = Array(10).fill({
    id: 'opt-censor',
    textEs: 'Vigilar parpadeos',
    textAr: 'مراقبة الرمش',
    scores: { inspector: 0, archiver: 0, censor: 6, errata: 1, silence: 0 },
    tendencyLabel: 'Censor',
  });

  const evaluation = calculateEvaluation(censorAnswers);
  assert.equal(evaluation.rank.id, 'censor');
  assert.equal(evaluation.rank.titleAr, 'نَائِبُ رَقِيبِ تَعَابِيرِ المَلَلِ');
});

test('calculateEvaluation handles empty answers gracefully', () => {
  const evaluation = calculateEvaluation([]);
  assert.ok(evaluation.rank);
  assert.equal(typeof evaluation.obedienceRate, 'number');
  assert.ok(evaluation.dossierNumber.length > 5);
});

test('OFFICIAL_RANKS contains all 5 required ranks with dark satire punchlines and correct Arabic', () => {
  const requiredRanks = ['inspector', 'archiver', 'censor', 'errata', 'silence'];
  requiredRanks.forEach((rankId) => {
    const rank = OFFICIAL_RANKS[rankId as keyof typeof OFFICIAL_RANKS];
    assert.ok(rank, `Rank ${rankId} should exist`);
    assert.ok(rank.titleAr.length > 0, `Rank ${rankId} has Arabic title`);
    assert.ok(rank.titleEs.length > 0, `Rank ${rankId} has Spanish title`);
    assert.ok(rank.darkPunchline.length > 10, `Rank ${rankId} has dark punchline`);
    assert.ok(rank.transliteration.length > 0, `Rank ${rankId} has transliteration`);
  });
});
