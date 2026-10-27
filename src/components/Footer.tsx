/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, ShieldAlert, Stamp } from 'lucide-react';
import { INSTITUTIONAL_DATA } from '../data/diwanData';
import { playClickSound } from '../utils/audio';

interface FooterProps {
  onOpenSecretFiles: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSecretFiles }) => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#c5a059]/25 bg-[#020b08] text-stone-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        {/* Left: Solemn archival note */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-[#dfba73] font-serif text-sm font-bold flex items-center justify-center md:justify-start gap-2">
            <span dir="rtl" lang="ar">ديوان النظام الأبدي</span>
            <span>· Diván del Orden Eterno</span>
          </div>
          <p className="text-stone-500">
            Registro General de Procedimientos Perpetuos · Sin cookies · Sin almacenamiento en servidores · Volatilidad garantizada en memoria local.
          </p>
        </div>

        {/* Center / Right: Secret Link and Back to Top */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              playClickSound();
              onOpenSecretFiles();
            }}
            className="text-rose-400 hover:text-rose-300 transition-colors font-serif text-xs cursor-pointer flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span dir="rtl" lang="ar">الملفات السرية</span>
            <span>(Archivos Secretos)</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-[#07241c] hover:bg-[#0b3d30] text-[#dfba73] hover:text-white transition-colors cursor-pointer border border-[#c5a059]/30"
            title="Volver a la cabecera del Diván"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
