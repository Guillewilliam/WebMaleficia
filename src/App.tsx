/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuizSection } from './components/QuizSection';
import { QuizResultView } from './components/QuizResultView';
import { CommuniquesSection } from './components/CommuniquesSection';
import { DepartmentsSection } from './components/DepartmentsSection';
import { SelfDenunciationSection } from './components/SelfDenunciationSection';
import { SecretFilesModal } from './components/SecretFilesModal';
import { Footer } from './components/Footer';
import { AnswerOption, RankResult } from './types';
import { calculateEvaluation } from './utils/quizScoring';
import { getAudioMuted, toggleAudioMute, playOfficialStampSound } from './utils/audio';

export default function App() {
  const [evaluationResult, setEvaluationResult] = useState<{
    rank: RankResult;
    obedienceRate: number;
    dossierNumber: string;
  } | null>(null);

  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showAllTranslations, setShowAllTranslations] = useState(false);

  useEffect(() => {
    setIsAudioMuted(getAudioMuted());
  }, []);

  const handleToggleAudio = () => {
    const muted = toggleAudioMute();
    setIsAudioMuted(muted);
  };

  const handleToggleTranslations = () => {
    setShowAllTranslations((prev) => !prev);
  };

  const handleQuizComplete = (selectedOptions: AnswerOption[]) => {
    const evalData = calculateEvaluation(selectedOptions);
    setEvaluationResult({
      rank: evalData.rank,
      obedienceRate: evalData.obedienceRate,
      dossierNumber: evalData.dossierNumber,
    });

    // Scroll gently to the result section
    setTimeout(() => {
      const resultElem = document.getElementById('resultado');
      if (resultElem) {
        resultElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRestartQuiz = () => {
    playOfficialStampSound();
    setEvaluationResult(null);
    const quizElem = document.getElementById('evaluacion');
    if (quizElem) {
      quizElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartQuizScroll = () => {
    const quizElem = document.getElementById('evaluacion');
    if (quizElem) {
      quizElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#03120d] text-[#e6e2d8] bg-arabesque-pattern">
      {/* Top Header */}
      <Header
        onStartQuiz={handleStartQuizScroll}
        onOpenSecretFiles={() => setIsSecretModalOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        showAllTranslations={showAllTranslations}
        onToggleTranslations={handleToggleTranslations}
      />

      <main className="flex-1">
        {/* Institutional Hero Marquee */}
        <HeroSection
          onStartQuiz={handleStartQuizScroll}
          onOpenSecretFiles={() => setIsSecretModalOpen(true)}
        />

        {/* 10-Question Evaluation or Result View */}
        {evaluationResult ? (
          <QuizResultView
            rank={evaluationResult.rank}
            obedienceRate={evaluationResult.obedienceRate}
            dossierNumber={evaluationResult.dossierNumber}
            onRestart={handleRestartQuiz}
            onExploreSecretFiles={() => setIsSecretModalOpen(true)}
          />
        ) : (
          <QuizSection
            onComplete={handleQuizComplete}
            showAllTranslations={showAllTranslations}
          />
        )}

        {/* Official Communiqués & State Decrees */}
        <CommuniquesSection showAllTranslations={showAllTranslations} />

        {/* Bureaucratic Preventive Self-Denunciation Mailbox */}
        <SelfDenunciationSection />

        {/* Sovereign Departments & State Organs */}
        <DepartmentsSection />
      </main>

      {/* Secret Classified Files Modal */}
      <SecretFilesModal
        isOpen={isSecretModalOpen}
        onClose={() => setIsSecretModalOpen(false)}
        showAllTranslations={showAllTranslations}
      />

      {/* Archival Footer */}
      <Footer onOpenSecretFiles={() => setIsSecretModalOpen(true)} />
    </div>
  );
}
