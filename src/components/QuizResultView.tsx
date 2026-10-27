/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotateCcw, Printer, Share2, Award, ShieldCheck, FileCheck } from 'lucide-react';
import { RankResult } from '../types';
import { OfficialEmblem } from './OfficialEmblem';
import { playClickSound, playOfficialStampSound } from '../utils/audio';

interface QuizResultViewProps {
  rank: RankResult;
  obedienceRate: number;
  dossierNumber: string;
  onRestart: () => void;
  onExploreSecretFiles: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  rank,
  obedienceRate,
  dossierNumber,
  onRestart,
  onExploreSecretFiles,
}) => {
  const handlePrint = () => {
    playOfficialStampSound();
    window.print();
  };

  return (
    <section id="resultado" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
      {/* Official Certificate Container */}
      <div className="relative bg-[#061e16] border-4 border-double border-[#c5a059] rounded-xl p-8 sm:p-12 shadow-2xl bg-paper-texture print:bg-white print:text-black print:border-black">
        {/* Archival watermark header */}
        <div className="text-center space-y-3 border-b-2 border-[#c5a059]/40 pb-6 mb-8 print:border-black">
          <div className="flex justify-center">
            <OfficialEmblem size={110} />
          </div>

          <div className="text-xs font-mono tracking-widest text-[#dfba73] uppercase print:text-black">
            DIRECCIÓN GENERAL DE CERTIFICACIÓN DISCIPLINARIA PERPETUA
          </div>

          <h2
            dir="rtl"
            lang="ar"
            className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient print:text-black"
          >
            شَهَادَةُ التَّعْيِينِ الرَّسْمِيَّةِ فِي النِّظَامِ الأَبَدِيِّ
          </h2>

          <div className="inline-block px-3 py-1 bg-[#020e0a] text-xs font-mono text-[#dfba73] rounded border border-[#c5a059]/30 print:border-black print:text-black">
            N.º EXPEDIENTE: {dossierNumber}
          </div>
        </div>

        {/* Rank Presentation */}
        <div className="space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Rango Asignado por la Superioridad Invisible:
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#f7e2a9] print:text-black leading-tight">
              {rank.titleEs}
            </h3>
            <div
              dir="rtl"
              lang="ar"
              className="text-2xl sm:text-3xl font-serif text-[#dfba73] font-bold mt-1 print:text-black"
            >
              {rank.titleAr}
            </div>
            <div className="text-xs font-serif italic text-stone-400 print:text-black">
              {rank.transliteration}
            </div>
          </div>

          {/* Large Ornamental Stamp Box */}
          <div className="my-6 inline-flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#c5a059] rounded-xl bg-[#041611]/80 max-w-md mx-auto text-center transform -rotate-1 shadow-lg print:border-black print:bg-stone-50">
            <div className="text-3xl mb-1">{rank.badge}</div>
            <div dir="rtl" lang="ar" className="text-lg font-serif font-bold text-[#dfba73] print:text-black">
              {rank.sealLabel}
            </div>
            <div dir="rtl" lang="ar" className="text-xs text-[#c5a059]/80 font-serif print:text-black">
              {rank.sealSubtext}
            </div>
            <div className="mt-2 text-xs font-mono text-stone-300 print:text-black border-t border-[#c5a059]/30 pt-1.5 w-full">
              ÍNDICE DE SUMISIÓN PROCESAL: <span className="font-bold text-[#dfba73] print:text-black">{obedienceRate}%</span>
            </div>
          </div>

          {/* Dark satirical description and punchlines */}
          <div className="space-y-4 max-w-2xl mx-auto text-left bg-[#03130e]/80 p-6 rounded-lg border border-[#c5a059]/25 text-stone-200 text-sm leading-relaxed print:bg-white print:text-black print:border-black">
            <p className="font-sans text-base">
              {rank.descriptionEs}
            </p>

            <div className="p-3 bg-[#08241c] rounded border-l-2 border-[#dfba73] text-xs font-mono text-amber-200/90 print:bg-stone-100 print:text-black">
              <span className="font-bold uppercase text-[#dfba73] block mb-0.5">Cláusula de Remate Sancionador:</span>
              {rank.darkPunchline}
            </div>

            <div className="p-3 bg-[#08241c] rounded border-l-2 border-[#b91c1c] text-xs font-mono text-red-200/90 print:bg-stone-100 print:text-black">
              <span className="font-bold uppercase text-red-300 block mb-0.5">Destino Administrativo Inmediato:</span>
              {rank.punishmentOrPromotion}
            </div>
          </div>
        </div>

        {/* Verification Footer with wax seal */}
        <div className="mt-10 pt-6 border-t-2 border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400 print:text-black">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#dfba73]" />
            <span>Documento sellado digitalmente en memoria volátil. Sin validez terrenal.</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-[#dfba73] font-serif">
            ديوان النظام الأبدي · صَادِرٌ فِي عَامِ 1448 هـ
          </div>
        </div>

        {/* Action Controls (Hidden when printing) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 print:hidden">
          <button
            onClick={() => {
              playClickSound();
              onRestart();
            }}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#041611] text-[#dfba73] hover:text-white border border-[#c5a059] rounded hover:bg-[#07251c] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Evaluación</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#9e7d3b] text-[#041611] rounded hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 font-bold cursor-pointer shadow-md shadow-[#c5a059]/20"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Certificado Soberano</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onExploreSecretFiles();
            }}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-rose-950/70 text-rose-300 hover:text-white border border-rose-800 rounded hover:bg-rose-900 transition-colors flex items-center gap-2 cursor-pointer font-serif"
          >
            <span dir="rtl" lang="ar">الملفات السرية</span>
            <span>(Ver Archivos Ocultos)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
