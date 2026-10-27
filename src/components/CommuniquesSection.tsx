/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Scroll, Bookmark, Stamp, Filter, Eye } from 'lucide-react';
import { COMMUNQUES } from '../data/diwanData';
import { Communique } from '../types';
import { playClickSound, playOfficialStampSound } from '../utils/audio';

interface CommuniquesSectionProps {
  showAllTranslations: boolean;
}

export const CommuniquesSection: React.FC<CommuniquesSectionProps> = ({
  showAllTranslations,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCommunique, setActiveCommunique] = useState<Communique | null>(null);

  const categories = ['all', ...Array.from(new Set(COMMUNQUES.map((c) => c.categoryEs)))];

  const filteredCommuniques =
    selectedCategory === 'all'
      ? COMMUNQUES
      : COMMUNQUES.filter((c) => c.categoryEs === selectedCategory);

  const openCommuniqueModal = (communique: Communique) => {
    playOfficialStampSound();
    setActiveCommunique(communique);
  };

  const closeCommuniqueModal = () => {
    playClickSound();
    setActiveCommunique(null);
  };

  return (
    <section id="comunicados" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dfba73]">
          <Scroll className="w-4 h-4 text-[#c5a059]" />
          <span>BOLETÍN OFICIAL DE DECRETOS Y RESOLUCIONES PERPETUAS</span>
        </div>

        <h2
          dir="rtl"
          lang="ar"
          className="text-3xl sm:text-4xl font-serif font-bold text-gold-gradient"
        >
          البَلَاغَاتُ الرَّسْمِيَّةُ وَالمَرَاسِيمُ السِّيَادِيَّةُ
        </h2>

        <p className="text-sm text-stone-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Resoluciones solemnes del Diván del Orden Eterno dictadas para la pacificación burocrática y el encauzamiento disciplinario de incidentes absurdos.
        </p>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 text-xs font-sans rounded-md transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#c5a059] text-[#041611] font-bold shadow-sm'
                  : 'bg-[#051c15] text-stone-300 hover:text-white border border-[#c5a059]/25 hover:border-[#c5a059]/60'
              }`}
            >
              {cat === 'all' ? 'Todos los Decretos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Communiqués */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommuniques.map((item) => (
          <article
            key={item.id}
            onClick={() => openCommuniqueModal(item)}
            className="group relative bg-[#072018]/90 border border-[#c5a059]/30 rounded-lg p-6 hover:border-[#dfba73] hover:bg-[#09291f] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#c5a059]/10 flex flex-col justify-between"
          >
            {/* Top metadata row without pills */}
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono border-b border-[#c5a059]/15 pb-3 mb-4">
              <span className="text-[#dfba73] font-semibold">{item.dossierNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-200/80">{item.categoryEs}</span>
            </div>

            {/* Content titles */}
            <div className="space-y-2 mb-4">
              <h3 className="text-base font-serif font-bold text-[#f7e2a9] group-hover:text-white transition-colors">
                {item.titleEs}
              </h3>

              <div
                dir="rtl"
                lang="ar"
                className="text-base font-serif text-[#dfba73] leading-relaxed"
              >
                {item.titleAr}
              </div>

              <p className="text-xs sm:text-sm text-stone-300 line-clamp-3 leading-relaxed pt-2 border-t border-[#c5a059]/10">
                {item.textEs}
              </p>
            </div>

            {/* Bottom official footer */}
            <div className="pt-3 border-t border-[#c5a059]/15 flex items-center justify-between text-xs text-stone-400">
              <span className="font-mono text-[11px] text-stone-400">{item.decreeYear}</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#dfba73] group-hover:underline font-mono">
                <Stamp className="w-3 h-3" />
                <span>Ver documento sellado</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Detail Modal for Selected Communique */}
      {activeCommunique && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-[#08221a] border-2 border-[#c5a059] rounded-xl p-6 sm:p-8 shadow-2xl bg-paper-texture text-[#eadecd]">
            {/* Dossier Code and Stamp */}
            <div className="flex items-start justify-between border-b border-[#c5a059]/30 pb-4 mb-6">
              <div>
                <div className="text-xs font-mono text-[#dfba73] uppercase tracking-wider">
                  {activeCommunique.dossierNumber} · {activeCommunique.categoryEs}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f7e2a9] mt-1">
                  {activeCommunique.titleEs}
                </h3>
              </div>

              {/* Stamp emblem */}
              <div className="border border-dashed border-[#c5a059] px-2.5 py-1 rounded text-center transform rotate-2 text-[#dfba73] select-none shrink-0 bg-[#041611]">
                <div dir="rtl" lang="ar" className="text-xs font-serif font-bold">
                  {activeCommunique.officialStamp}
                </div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-stone-400">
                  EJECUTIVO INMEDIATO
                </div>
              </div>
            </div>

            {/* Full Arabic header */}
            <div
              dir="rtl"
              lang="ar"
              className="text-xl font-serif text-[#dfba73] mb-4 pb-3 border-b border-[#c5a059]/15"
            >
              {activeCommunique.titleAr}
            </div>

            {/* Decree Text */}
            <div className="p-4 bg-[#03130e] rounded-lg border border-[#c5a059]/20 text-sm sm:text-base leading-relaxed text-[#e6e2d8] font-sans space-y-3">
              <p>{activeCommunique.textEs}</p>
            </div>

            {/* Solemn verification note */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400 pt-4 border-t border-[#c5a059]/20">
              <span>Publicado bajo supervisión del Diván del Orden Eterno.</span>
              <button
                onClick={closeCommuniqueModal}
                className="px-4 py-2 bg-[#c5a059] text-[#041611] font-bold rounded hover:brightness-110 cursor-pointer uppercase text-xs tracking-wider"
              >
                Conforme con el Decreto
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
