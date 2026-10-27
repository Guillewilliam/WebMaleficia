/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Lock, Unlock, FileText, AlertTriangle } from 'lucide-react';
import { SECRET_FILES } from '../data/diwanData';
import { playClickSound, playOfficialStampSound } from '../utils/audio';

interface SecretFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  showAllTranslations: boolean;
}

export const SecretFilesModal: React.FC<SecretFilesModalProps> = ({
  isOpen,
  onClose,
  showAllTranslations,
}) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [revealedSegments, setRevealedSegments] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentFile = SECRET_FILES[selectedFileIndex];
  const isRedactionRevealed = revealedSegments[currentFile.id] || false;

  const toggleRedaction = (fileId: string) => {
    playOfficialStampSound();
    setRevealedSegments((prev) => ({
      ...prev,
      [fileId]: !prev[fileId],
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="secret-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#071d16] border-2 border-[#b91c1c] rounded-lg shadow-2xl shadow-red-950/60 overflow-hidden text-[#eadecd]">
        {/* Top security banner */}
        <div className="bg-[#5c0f11] text-amber-100 px-4 py-2 flex items-center justify-between border-b border-red-700 select-none">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>ACCESO RESTRINGIDO · {currentFile.clearanceLevel}</span>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1 hover:bg-black/30 rounded text-amber-200 hover:text-white cursor-pointer"
            aria-label="Cerrar archivos secretos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Secret files tabs */}
        <div className="bg-[#03110d] px-4 pt-3 flex items-center gap-2 border-b border-[#c5a059]/20 overflow-x-auto">
          {SECRET_FILES.map((file, idx) => (
            <button
              key={file.id}
              onClick={() => {
                playClickSound();
                setSelectedFileIndex(idx);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-t transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFileIndex === idx
                  ? 'bg-[#071d16] text-[#dfba73] border-t-2 border-x border-t-[#c5a059] border-x-[#c5a059]/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-[#0a271e]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>EXP-00{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Modal body: Archival document */}
        <div className="p-6 overflow-y-auto space-y-6 bg-paper-texture">
          {/* Official Dossier Stamp Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c5a059]/30 pb-4">
            <div>
              <div className="text-xs font-mono text-[#dfba73] tracking-widest uppercase">
                {currentFile.dossierCode}
              </div>
              <h2
                id="secret-modal-title"
                className="text-lg sm:text-xl font-bold text-[#f7e2a9] font-serif mt-1"
              >
                {currentFile.titleEs}
              </h2>
              <div
                dir="rtl"
                lang="ar"
                className="text-base sm:text-lg text-[#dfba73] font-serif mt-0.5"
              >
                {currentFile.titleAr}
              </div>
            </div>

            {/* Crimson Secret Stamp */}
            <div className="inline-flex flex-col items-center justify-center p-2.5 border-2 border-dashed border-red-500/80 rounded transform -rotate-3 bg-red-950/20 text-red-400 select-none shrink-0">
              <span className="text-[10px] tracking-widest font-mono uppercase font-bold">
                MÁXIMO SECRETO
              </span>
              <span dir="rtl" lang="ar" className="text-sm font-serif font-bold text-red-300">
                سِرِّيٌّ لِلْغَايَة
              </span>
              <span className="text-[9px] text-red-400/80 font-mono">
                PENAL: 40 AÑOS DE ARCHIVO
              </span>
            </div>
          </div>

          {/* Dossier Summary */}
          <div className="bg-[#02100c]/80 p-4 rounded border border-[#c5a059]/25">
            <div className="text-xs font-mono uppercase text-[#dfba73] tracking-wider mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Resumen de Inteligencia Burocrática:</span>
            </div>
            <p className="text-sm text-[#e6e2d8] leading-relaxed">
              {currentFile.summaryEs}
            </p>
          </div>

          {/* Interactive Redaction Zone */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfba73]">
                Segmento Censurado por Decreto Soberano:
              </span>
              <button
                onClick={() => toggleRedaction(currentFile.id)}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer underline decoration-dotted"
              >
                {isRedactionRevealed ? (
                  <>
                    <Lock className="w-3 h-3" /> Re-censurar contenido
                  </>
                ) : (
                  <>
                    <Unlock className="w-3 h-3" /> Clic para desclasificar
                  </>
                )}
              </button>
            </div>

            <div
              onClick={() => toggleRedaction(currentFile.id)}
              className={`p-4 rounded border transition-all duration-300 cursor-pointer ${
                isRedactionRevealed
                  ? 'bg-amber-950/25 border-amber-500/40 text-amber-200'
                  : 'bg-black/90 border-stone-800 text-stone-500 hover:border-amber-700/50'
              }`}
              title="Haz clic para alternar la censura"
            >
              {isRedactionRevealed ? (
                <div className="space-y-2 font-mono text-sm leading-relaxed">
                  <span className="inline-block bg-red-900/60 text-red-200 text-xs px-2 py-0.5 rounded mr-2 font-bold uppercase">
                    [DESCLASIFICADO TEMPORALMENTE]
                  </span>
                  <p>
                    {currentFile.redactedSegment.replace(/██████████/g, '')}
                  </p>
                </div>
              ) : (
                <div className="font-mono text-sm leading-relaxed tracking-wider select-none text-stone-600">
                  <span className="bg-stone-900 text-stone-700 px-1 py-0.5 mr-1">████████████</span>
                  <span>{currentFile.redactedSegment}</span>
                  <span className="block mt-2 text-xs text-amber-400/80 font-sans italic">
                    (Pulsa sobre este bloque para levantar la tinta negra de Estado)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Investigation status and consequence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
            <div className="bg-[#03130e] p-3 rounded border border-stone-800">
              <span className="text-[#dfba73] block mb-1 uppercase font-semibold">
                Estado Actual de la Investigación:
              </span>
              <p className="text-stone-300 font-sans leading-relaxed">
                {currentFile.investigationStatus}
              </p>
            </div>

            <div className="bg-[#03130e] p-3 rounded border border-stone-800">
              <span className="text-[#dfba73] block mb-1 uppercase font-semibold">
                Consecuencia Administrativa:
              </span>
              <p className="text-stone-300 font-sans leading-relaxed">
                {currentFile.consequence}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#03100c] px-6 py-3 border-t border-[#c5a059]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <span>Este documento no existe si se le pregunta a cualquier funcionario vivo.</span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#0b3d30] text-[#dfba73] hover:text-white hover:bg-[#125846] rounded transition-colors cursor-pointer uppercase tracking-wider font-semibold text-[11px]"
          >
            Sellar y Olvidar
          </button>
        </div>
      </div>
    </div>
  );
};
