/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Stamp, Sparkles, Send } from 'lucide-react';
import { SELF_DENUNCIATIONS } from '../data/diwanData';
import { SelfDenunciation } from '../types';
import { playClickSound, playOfficialStampSound } from '../utils/audio';

export const SelfDenunciationSection: React.FC = () => {
  const [selectedInfraction, setSelectedInfraction] = useState<SelfDenunciation | null>(null);
  const [customInfraction, setCustomInfraction] = useState('');
  const [submittedVerdict, setSubmittedVerdict] = useState<{
    code: string;
    sanctionEs: string;
    sanctionAr: string;
    transgression: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInfraction && !customInfraction.trim()) return;

    playOfficialStampSound();

    const transgression = selectedInfraction ? selectedInfraction.labelEs : customInfraction;
    const sanctionEs = selectedInfraction
      ? selectedInfraction.sanctionEs
      : 'Sanción: 4 días de redacción de cartas de agradecimiento al Departamento de Inspección por descubrirte.';
    const sanctionAr = selectedInfraction
      ? selectedInfraction.sanctionAr
      : 'العُقُوبَةُ: كِتَابَةُ رَسَائِلِ شُكْرٍ لِقِسْمِ التَّفْتِيشِ لِأَرْبَعَةِ أَيَّامٍ مُتَتَالِيَةٍ.';
    const code = selectedInfraction ? selectedInfraction.verdictCode : `AUTO-${Math.floor(100 + Math.random() * 899)}/ESPONTÁNEO`;

    setSubmittedVerdict({
      code,
      sanctionEs,
      sanctionAr,
      transgression,
    });
  };

  const handleReset = () => {
    playClickSound();
    setSelectedInfraction(null);
    setCustomInfraction('');
    setSubmittedVerdict(null);
  };

  return (
    <section id="autodenuncia" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-[#051c15] border-2 border-[#c5a059]/40 rounded-xl p-6 sm:p-10 shadow-2xl relative bg-paper-texture">
        {/* Header */}
        <div className="text-center space-y-3 border-b border-[#c5a059]/20 pb-6 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dfba73]">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>BUZÓN DE AUTODENUNCIA PREVENTIVA Y EXPIACIÓN VOLUNTARIA</span>
          </div>

          <h2
            dir="rtl"
            lang="ar"
            className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient"
          >
            صُنْدُوقُ الِاعْتِرَافِ الطَّوْعِيِّ بِالمُخَالَفَاتِ الهَامِشِيَّةِ
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Confesar un delito procesal antes de que el Censor lo descubra reduce la pena en un 0,02%. Selecciona una infracción cometida hoy o confiesa una indiscreción burocrática propia.
          </p>
        </div>

        {submittedVerdict ? (
          /* Stamped Absolution/Verdict Certificate */
          <div className="bg-[#041510] border-2 border-dashed border-[#c5a059] rounded-xl p-6 sm:p-8 text-center space-y-6 animate-fade-in">
            <div className="inline-flex p-3 rounded-full bg-[#0b3d30] text-[#dfba73] mb-1">
              <Stamp className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-amber-300 tracking-widest">
                VEREDICTO EMITIDO · {submittedVerdict.code}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7e2a9]">
                Constancia Oficial de Autoinculpación Recibida
              </h3>
              <div dir="rtl" lang="ar" className="text-lg font-serif text-[#dfba73]">
                تَمَّ قَبُولُ الِاعْتِرَافِ وَإِصْدَارُ الإِجْرَاءِ التَّأْدِيبِيِّ الفَوْرِيِّ
              </div>
            </div>

            <div className="bg-[#08241c] p-4 rounded border border-[#c5a059]/20 text-left max-w-xl mx-auto space-y-2">
              <div className="text-xs font-mono text-stone-400 uppercase">Falta Confesada:</div>
              <div className="text-sm font-sans text-stone-200">{submittedVerdict.transgression}</div>
              <div className="text-xs font-mono text-[#dfba73] uppercase pt-2 border-t border-[#c5a059]/20">
                {submittedVerdict.sanctionEs}
              </div>
              <div dir="rtl" lang="ar" className="text-xs font-serif text-[#dfba73]/80">
                {submittedVerdict.sanctionAr}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-[#041611] rounded hover:brightness-110 cursor-pointer font-bold"
              >
                Presentar Otra Autodenuncia
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-[#dfba73] tracking-wider block">
                Selecciona una transgresión frecuente verificable:
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SELF_DENUNCIATIONS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedInfraction(item);
                      setCustomInfraction('');
                    }}
                    className={`text-left p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedInfraction?.id === item.id
                        ? 'bg-[#0f4435] border-[#dfba73] shadow-md'
                        : 'bg-[#03130e]/80 border-[#c5a059]/20 hover:border-[#c5a059]/60 hover:bg-[#07241c]'
                    }`}
                  >
                    <div className="text-sm text-[#e6e2d8] leading-relaxed mb-1.5 font-sans">
                      {item.labelEs}
                    </div>
                    <div dir="rtl" lang="ar" className="text-xs font-serif text-[#dfba73]/80">
                      {item.labelAr}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom transgression option */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono uppercase text-[#dfba73] tracking-wider block">
                O describe tu propia indiscreción procesal:
              </label>
              <textarea
                value={customInfraction}
                onChange={(e) => {
                  setCustomInfraction(e.target.value);
                  setSelectedInfraction(null);
                }}
                rows={2}
                placeholder="Ejemplo: Pensé en tomarme 5 minutos más de café o utilicé un bolígrafo con tinta azul no homologada..."
                className="w-full bg-[#03120d] border border-[#c5a059]/30 rounded-lg p-3 text-sm text-[#e6e2d8] placeholder-stone-600 focus:outline-none focus:border-[#dfba73]"
              />
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-4 border-t border-[#c5a059]/20">
              <span className="text-xs font-mono text-stone-400">
                La confesión voluntaria no exime del cumplimiento de la pena.
              </span>
              <button
                type="submit"
                disabled={!selectedInfraction && !customInfraction.trim()}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer transition-all ${
                  selectedInfraction || customInfraction.trim()
                    ? 'bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#a38038] text-[#041611] font-bold hover:brightness-110 shadow-md'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed opacity-50'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Registrar Autoinculpación</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
