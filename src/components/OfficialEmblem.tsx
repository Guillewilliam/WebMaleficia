/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface OfficialEmblemProps {
  className?: string;
  size?: number;
  variant?: 'gold' | 'crimson' | 'dark';
}

export const OfficialEmblem: React.FC<OfficialEmblemProps> = ({
  className = '',
  size = 96,
  variant = 'gold',
}) => {
  const colorPrimary = variant === 'crimson' ? '#b91c1c' : variant === 'dark' ? '#06221a' : '#c5a059';
  const colorSecondary = variant === 'crimson' ? '#ef4444' : variant === 'dark' ? '#0b3d30' : '#dfba73';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Sello Oficial del Diván del Orden Eterno"
      role="img"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full transform transition-transform duration-700 hover:rotate-12"
      >
        <defs>
          <path
            id="textPathCircleOuter"
            d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          />
          <path
            id="textPathCircleInner"
            d="M 100, 100 m -52, 0 a 52,52 0 1,0 104,0 a 52,52 0 1,0 -104,0"
          />
        </defs>

        {/* Outer 8-pointed star rosette backdrop */}
        <polygon
          points="100,4 128,28 168,28 172,68 196,96 172,124 168,164 128,164 100,192 72,164 32,164 28,124 4,96 28,68 32,28 72,28"
          fill="none"
          stroke={colorPrimary}
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* Concentric ornamental borders */}
        <circle cx="100" cy="100" r="92" fill="none" stroke={colorPrimary} strokeWidth="1.5" />
        <circle cx="100" cy="100" r="88" fill="none" stroke={colorSecondary} strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="62" fill="none" stroke={colorPrimary} strokeWidth="1.2" />
        <circle cx="100" cy="100" r="42" fill="none" stroke={colorSecondary} strokeWidth="0.7" />

        {/* Outer circular Arabic script */}
        <text fill={colorPrimary} fontSize="10.5" fontWeight="bold" letterSpacing="2.5" className="font-serif">
          <textPath href="#textPathCircleOuter" startOffset="50%" textAnchor="middle">
            دِيوَانُ النِّظَامِ الأَبَدِيِّ · خُتِمَ بِالإِجْمَاعِ · 1448
          </textPath>
        </text>

        {/* Inner circular Latin script */}
        <text fill={colorSecondary} fontSize="7" letterSpacing="2" className="tracking-widest uppercase">
          <textPath href="#textPathCircleInner" startOffset="50%" textAnchor="middle">
            DIVÁN DEL ORDEN ETERNO · ORDO PERPETUUS
          </textPath>
        </text>

        {/* Central emblem: The Sacred Scalpel of Bureaucracy and Geometrical Rosette */}
        <g transform="translate(100, 100)">
          {/* 8-fold flower core */}
          <circle cx="0" cy="0" r="16" fill="rgba(197, 160, 89, 0.12)" stroke={colorPrimary} strokeWidth="1" />
          <path
            d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z"
            fill={colorPrimary}
          />
          {/* Small corner dots */}
          <circle cx="0" cy="-22" r="1.5" fill={colorSecondary} />
          <circle cx="22" cy="0" r="1.5" fill={colorSecondary} />
          <circle cx="0" cy="22" r="1.5" fill={colorSecondary} />
          <circle cx="-22" cy="0" r="1.5" fill={colorSecondary} />
        </g>
      </svg>
    </div>
  );
};
