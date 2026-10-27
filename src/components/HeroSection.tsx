/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, FileText, ArrowRight, ShieldAlert, Sparkles, Scale } from 'lucide-react';
import { OfficialEmblem } from './OfficialEmblem';
import { INSTITUTIONAL_DATA } from '../data/diwanData';
import { playClickSound, playOfficialStampSound } from '../utils/audio';

interface HeroSectionProps {
  onStartQuiz: () => void;
  onOpenSecretFiles: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onOpenSecretFiles,
}) => {
  return (
    <section id="inicio" className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative center background burst */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#c5a059]/10 via-[#0b3d30]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="text-center space-y-8 max-w-4xl mx-auto">
        {/* Emblem presentation */}
        <div className="flex justify-center">
          <OfficialEmblem size={130} />
        </div>

        {/* Clean unboxed institutional metadata (anti-slop zero pill rule) */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#dfba73] tracking-widest uppercase">
          <span>{INSTITUTIONAL_DATA.decreeEra}</span>
          <span aria-hidden="true">·</span>
          <span>Boletín Oficial Perpetuo</span>
          <span aria-hidden="true">·</span>
          <span>Sello n.º 1448-ORD</span>
        </div>

        {/* Title Lockup in Arabic & Spanish */}
        <div className="space-y-3">
          <h1
            dir="rtl"
            lang="ar"
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-gold-gradient tracking-tight leading-tight"
          >
            {INSTITUTIONAL_DATA.institutionNameAr}
          </h1>

          <div className="text-xl sm:text-2xl font-serif text-[#f7e2a9] font-medium tracking-wide">
            {INSTITUTIONAL_DATA.institutionNameEs}
          </div>

          <div className="text-xs sm:text-sm font-serif italic text-stone-400">
            {INSTITUTIONAL_DATA.transliteration}
          </div>
        </div>

        {/* Fictional Institutional Motto */}
        <div className="py-4 border-y border-[#c5a059]/30 max-w-2xl mx-auto space-y-2">
          <div
            dir="rtl"
            lang="ar"
            className="text-lg sm:text-xl font-serif font-semibold text-[#dfba73]"
          >
            « {INSTITUTIONAL_DATA.mottoAr} »
          </div>
          <div className="text-xs sm:text-sm text-stone-300 font-sans italic">
            « {INSTITUTIONAL_DATA.mottoEs} »
          </div>
        </div>

        {/* Satirical introduction prose */}
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans max-w-3xl mx-auto">
          Bienvenido al portal único del régimen administrativo eterno. Todo ciudadano que acceda a esta sede electrónica acepta por defecto los 14.800 artículos del Código Moral Burocrático, incluyendo la renuncia al entusiasmo no regulado y la obligación de sonreír con mesura durante los trámites.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              playOfficialStampSound();
              onStartQuiz();
            }}
            className="px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#a38038] text-[#041611] rounded hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#c5a059]/20 flex items-center gap-2 cursor-pointer border border-[#f7e2a9]/40"
          >
            <Scale className="w-4 h-4" />
            <span>Comenzar Evaluación de Sumisión (10 Preguntas)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#comunicados"
            onClick={playClickSound}
            className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#061e16] text-[#dfba73] hover:text-white border border-[#c5a059]/50 rounded hover:bg-[#0b3327] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Leer Decretos Urgentes</span>
          </a>

          <button
            onClick={() => {
              playClickSound();
              onOpenSecretFiles();
            }}
            className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-rose-950/60 text-rose-300 hover:text-white border border-rose-800/80 rounded hover:bg-rose-900 transition-colors flex items-center gap-2 cursor-pointer font-serif"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span dir="rtl" lang="ar">الملفات السرية</span>
            <span className="text-xs font-sans">(Archivos Secretos)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
