/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Sparkles, Scale, RefreshCw } from 'lucide-react';
import { QUESTIONS, TRANSITION_MESSAGES } from '../data/diwanData';
import { AnswerOption } from '../types';
import { playClickSound, playOfficialStampSound, playChimeSound } from '../utils/audio';

interface QuizSectionProps {
  onComplete: (selectedOptions: AnswerOption[]) => void;
  showAllTranslations: boolean;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onComplete,
  showAllTranslations,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, AnswerOption>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessageIndex, setTransitionMessageIndex] = useState(0);
  const [showCurrentTranslation, setShowCurrentTranslation] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const currentSelection = selectedAnswers[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (option: AnswerOption) => {
    playClickSound();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  const handleNext = () => {
    if (!currentSelection) return;

    playOfficialStampSound();

    if (currentIndex < totalQuestions - 1) {
      // Trigger solemn bureaucratic transition
      setTransitionMessageIndex(currentIndex % TRANSITION_MESSAGES.length);
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
        setShowCurrentTranslation(false);
      }, 550);
    } else {
      // Completed all 10 questions!
      playChimeSound();
      const answersArray = Array.from({ length: totalQuestions }, (_, i) => selectedAnswers[i]).filter(Boolean);
      onComplete(answersArray);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playClickSound();
      setCurrentIndex((prev) => prev - 1);
      setShowCurrentTranslation(false);
    }
  };

  const currentTransition = TRANSITION_MESSAGES[transitionMessageIndex];

  return (
    <section id="evaluacion" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Outer Archival Card */}
      <div className="relative bg-[#072018] border-2 border-[#c5a059]/40 rounded-xl shadow-2xl p-6 sm:p-10 bg-arabesque-pattern">
        {/* Top Gold Corner Accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c5a059]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c5a059]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c5a059]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c5a059]" />

        {/* Section Header */}
        <div className="text-center space-y-2 border-b border-[#c5a059]/20 pb-6 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dfba73]">
            <Scale className="w-4 h-4 text-[#c5a059]" />
            <span>EXAMEN OFICIAL DE SUMISIÓN ADMINISTRATIVA Y CRITERIO PROCESAL</span>
          </div>

          <h2
            dir="rtl"
            lang="ar"
            className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient"
          >
            اخْتِبَارُ الوَلَاءِ الإِدَارِيِّ وَالكِفَايَةِ المَسْلَكِيَّةِ
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Diez situaciones de alta tensión burocrática diseñadas para clasificar tu perfil en los registros perpetuos del Diván. Toda respuesta será archivada de forma irreversible en la memoria del navegador.
          </p>

          {/* Progress Bar & Dossier Code */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="flex items-center justify-between text-xs font-mono text-[#dfba73] mb-1.5">
              <span>{currentQuestion.dossierNumber}</span>
              <span className="font-semibold">
                PREGUNTA {currentIndex + 1} DE {totalQuestions} ({progressPercent}%)
              </span>
            </div>
            <div className="h-2 w-full bg-[#02100c] rounded-full overflow-hidden border border-[#c5a059]/30 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#8a6a2c] via-[#c5a059] to-[#dfba73] rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Area or Transition Overlay */}
        {isTransitioning ? (
          <div className="py-20 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 mx-auto text-[#dfba73] animate-spin">
              <RefreshCw className="w-full h-full" />
            </div>
            <div dir="rtl" lang="ar" className="text-xl sm:text-2xl font-serif text-[#f7e2a9]">
              {currentTransition.ar}
            </div>
            <div className="text-xs sm:text-sm text-stone-400 font-sans tracking-wide">
              {currentTransition.es}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Question Text */}
            <div className="bg-[#041611]/90 p-6 rounded-lg border border-[#c5a059]/30 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#f7e2a9] leading-snug">
                  {currentQuestion.titleEs}
                </h3>
                <button
                  onClick={() => setShowCurrentTranslation(!showCurrentTranslation)}
                  className="text-xs text-[#dfba73] hover:text-white px-2 py-1 rounded bg-[#0b3d30]/60 border border-[#c5a059]/30 shrink-0 cursor-pointer font-serif"
                  title="Mostrar/ocultar texto árabe"
                >
                  عربي / Trad.
                </button>
              </div>

              {/* Arabic Complementary Title (Always visible or highlighted) */}
              <div
                dir="rtl"
                lang="ar"
                className="text-lg sm:text-xl font-serif text-[#dfba73] leading-relaxed pt-1 border-t border-[#c5a059]/15"
              >
                {currentQuestion.titleAr}
              </div>

              {(showAllTranslations || showCurrentTranslation) && (
                <p className="text-xs text-stone-400 italic font-sans pt-1">
                  Subtexto protocolario: {currentQuestion.subtitleEs}
                </p>
              )}
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 gap-3.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentSelection?.id === option.id;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                    className={`relative w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#0f4435] border-[#dfba73] shadow-lg shadow-[#0b3d30]'
                        : 'bg-[#041913]/70 border-[#c5a059]/20 hover:border-[#c5a059]/50 hover:bg-[#07241c]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      {/* Letter badge */}
                      <span
                        className={`w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border ${
                          isSelected
                            ? 'bg-[#c5a059] text-[#041611] border-[#dfba73]'
                            : 'bg-[#03120d] text-[#dfba73] border-[#c5a059]/40'
                        }`}
                      >
                        {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
                      </span>

                      <div className="space-y-1.5 flex-1">
                        <p className="text-sm sm:text-base text-[#e6e2d8] leading-relaxed font-sans">
                          {option.textEs}
                        </p>
                        <p
                          dir="rtl"
                          lang="ar"
                          className="text-sm font-serif text-[#dfba73]/90 leading-relaxed"
                        >
                          {option.textAr}
                        </p>
                      </div>
                    </div>

                    {/* Satirical tendency label tag */}
                    <div className="sm:self-center shrink-0">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#c5a059]/75 bg-[#03110d] px-2.5 py-1 rounded border border-[#c5a059]/25">
                        {option.tendencyLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#c5a059]/20">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed text-stone-500'
                    : 'bg-[#041611] text-[#dfba73] hover:text-white border border-[#c5a059]/30 hover:border-[#c5a059]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="text-xs font-mono text-stone-400">
                {currentSelection ? 'Respuesta seleccionada' : 'Selecciona una respuesta para continuar'}
              </div>

              <button
                onClick={handleNext}
                disabled={!currentSelection}
                className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 transition-all cursor-pointer ${
                  currentSelection
                    ? 'bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#a38038] text-[#041611] hover:brightness-110 active:scale-95 shadow-md shadow-[#c5a059]/20 font-bold'
                    : 'opacity-40 cursor-not-allowed bg-stone-800 text-stone-500'
                }`}
              >
                <span>
                  {currentIndex === totalQuestions - 1 ? 'Emitir Veredicto Eterno' : 'Siguiente'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
