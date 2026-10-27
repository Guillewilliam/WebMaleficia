/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Eye, ShieldAlert } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HeaderProps {
  onStartQuiz: () => void;
  onOpenSecretFiles: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  showAllTranslations: boolean;
  onToggleTranslations: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onStartQuiz,
  onOpenSecretFiles,
  isAudioMuted,
  onToggleAudio,
  showAllTranslations,
  onToggleTranslations,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#041611]/95 backdrop-blur-md border-b border-[#c5a059]/30">
      {/* Upper state banner */}
      <div className="bg-[#020e0a] border-b border-[#c5a059]/15 px-4 py-1.5 text-center text-xs tracking-wider text-[#dfba73]/80 flex items-center justify-between">
        <span className="font-serif text-[11px] tracking-widest uppercase">
          Soberanía Administrativa Inviolable · Año 14 del Orden
        </span>
        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={() => {
              playClickSound();
              onToggleTranslations();
            }}
            className="flex items-center gap-1.5 text-[#dfba73] hover:text-white transition-colors cursor-pointer"
            title="Alternar visibilidad continua de traducciones"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showAllTranslations ? 'Ocultar glosas' : 'Traducción directa'}</span>
          </button>
          <span className="text-[#c5a059]/40" aria-hidden="true">|</span>
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-1 text-[#dfba73] hover:text-white transition-colors cursor-pointer"
            title={isAudioMuted ? 'Activar sonido ceremonial' : 'Silenciar sonido ceremonial'}
            aria-label={isAudioMuted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAudioMuted ? 'Silenciado' : 'Audio estatal'}</span>
          </button>
        </div>
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          className="text-lg md:text-xl font-bold tracking-tight text-[#dfba73] hover:text-[#f7e2a9] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <span className="w-2.5 h-2.5 rotate-45 bg-[#c5a059] inline-block" aria-hidden="true" />
          <span className="font-serif tracking-normal">ديوان النظام الأبدي</span>
          <span className="text-xs font-sans uppercase tracking-widest text-[#dfba73]/60 hidden xl:inline">
            · Diván del Orden Eterno
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-[#dcd7cb]">
          <a
            href="#comunicados"
            onClick={playClickSound}
            className="hover:text-[#dfba73] transition-colors whitespace-nowrap shrink-0"
          >
            Comunicados
          </a>
          <a
            href="#evaluacion"
            onClick={playClickSound}
            className="hover:text-[#dfba73] transition-colors whitespace-nowrap shrink-0"
          >
            Evaluación
          </a>
          <a
            href="#departamentos"
            onClick={playClickSound}
            className="hover:text-[#dfba73] transition-colors whitespace-nowrap shrink-0"
          >
            Departamentos
          </a>
          <a
            href="#autodenuncia"
            onClick={playClickSound}
            className="hover:text-[#dfba73] transition-colors whitespace-nowrap shrink-0"
          >
            Autodenuncia
          </a>
          <button
            onClick={() => {
              playClickSound();
              onOpenSecretFiles();
            }}
            className="text-rose-400 hover:text-rose-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer font-serif"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span dir="rtl" lang="ar">الملفات السرية</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              playClickSound();
              onStartQuiz();
            }}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#041611] bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#b38e45] rounded hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#c5a059]/10 whitespace-nowrap shrink-0 cursor-pointer border border-[#f5db99]/40"
          >
            Iniciar Evaluación
          </button>
        </div>
      </div>
    </header>
  );
};
