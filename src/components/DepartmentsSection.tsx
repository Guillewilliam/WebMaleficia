/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, Shield, Eye, FileText, Stamp } from 'lucide-react';
import { DEPARTMENTS } from '../data/diwanData';
import { OfficialEmblem } from './OfficialEmblem';
import { playClickSound } from '../utils/audio';

export const DepartmentsSection: React.FC = () => {
  return (
    <section id="departamentos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dfba73]">
          <Building2 className="w-4 h-4 text-[#c5a059]" />
          <span>ESTRUCTURA ORGÁNICA DEL APARATO ESTATAL</span>
        </div>

        <h2
          dir="rtl"
          lang="ar"
          className="text-3xl sm:text-4xl font-serif font-bold text-gold-gradient"
        >
          المَصَالِحُ وَالوِزَارَاتُ السِّيَادِيَّةُ لِلنِّظَامِ
        </h2>

        <p className="text-sm text-stone-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Las cuatro columnas institucionales encargadas de preservar el silencio, archivar lo innecesario y garantizar que nada se resuelva antes del siguiente siglo.
        </p>
      </div>

      {/* Grid of departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEPARTMENTS.map((dept, index) => (
          <div
            key={dept.id}
            className="bg-[#061e17] border border-[#c5a059]/30 rounded-xl p-6 sm:p-8 hover:border-[#dfba73] transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Background watermark badge */}
            <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <OfficialEmblem size={160} />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
                <span className="text-xs font-mono text-[#dfba73] tracking-widest uppercase">
                  DEPARTAMENTO {index + 1}
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  ESTATUS: ACTIVO Y DILATADO
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f7e2a9]">
                  {dept.nameEs}
                </h3>
                <div
                  dir="rtl"
                  lang="ar"
                  className="text-lg sm:text-xl font-serif text-[#dfba73] mt-1"
                >
                  {dept.nameAr}
                </div>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed font-sans pt-2 border-t border-[#c5a059]/10">
                {dept.subtextEs}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-[#c5a059]/15 flex items-center justify-between text-xs text-stone-400 relative z-10">
              <span className="font-mono text-[11px]">Sede: Pabellón Central Subterráneo</span>
              <span className="text-[#dfba73] font-mono text-[11px] flex items-center gap-1">
                <Stamp className="w-3.5 h-3.5" />
                Ventanilla n.º 93
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
