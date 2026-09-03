/**
 * Kage the Cyber Neko Ronin Avatar Component
 * Hyperpop Samurai Cat with holographic visor mask, oversized cyber hoodie, and floating energy discs
 */

export function renderCyberNeko(mood = 'idle', options = {}) {
  const { color = '#ff007f', accent = '#00f2fe', eyeOffset = { x: 0, y: 0 } } = options;

  let visorDisplay = '';
  switch (mood) {
    case 'focused':
      visorDisplay = `
        <!-- High-Speed Combat Visor Glitch -->
        <g transform="translate(${eyeOffset.x * 0.4}, ${eyeOffset.y * 0.4})">
          <text x="44" y="66" fill="${accent}" font-family="monospace" font-size="15" font-weight="bold">&gt; _ &lt;</text>
          <text x="88" y="66" fill="${accent}" font-family="monospace" font-size="15" font-weight="bold">&gt; _ &lt;</text>
          <line x1="38" y1="70" x2="122" y2="70" stroke="${accent}" stroke-width="1.5" stroke-dasharray="4,2" />
        </g>
      `;
      break;

    case 'debugging':
      visorDisplay = `
        <!-- Alert Scanner Mask -->
        <g transform="translate(${eyeOffset.x * 0.4}, ${eyeOffset.y * 0.4})">
          <text x="46" y="66" fill="#ffe600" font-family="sans-serif" font-size="14" font-weight="bold">BUG?</text>
          <text x="88" y="66" fill="#ff0055" font-family="monospace" font-size="16" font-weight="bold">[404]</text>
        </g>
      `;
      break;

    case 'celebrating':
    case 'excited':
      visorDisplay = `
        <!-- Anime Victory Cat Face -->
        <g>
          <text x="45" y="67" fill="${color}" font-family="sans-serif" font-size="18" font-weight="bold">★</text>
          <text x="76" y="67" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">w</text>
          <text x="100" y="67" fill="${color}" font-family="sans-serif" font-size="18" font-weight="bold">★</text>
        </g>
      `;
      break;

    case 'sleepy':
      visorDisplay = `
        <!-- Sleep mode standby -->
        <g>
          <line x1="48" y1="64" x2="68" y2="64" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
          <line x1="92" y1="64" x2="112" y2="64" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
          <text x="116" y="52" fill="${accent}" font-family="monospace" font-size="12" font-weight="bold" class="zzz-anim">Zzz</text>
        </g>
      `;
      break;

    case 'idle':
    default:
      visorDisplay = `
        <!-- Glowing Cyber Cat Eyes Following Cursor -->
        <g transform="translate(${eyeOffset.x * 0.6}, ${eyeOffset.y * 0.6})">
          <!-- Left Eye -->
          <ellipse cx="58" cy="63" rx="8" ry="10" fill="${color}" filter="url(#nekoGlow)" />
          <ellipse cx="58" cy="63" rx="2.5" ry="8" fill="#ffffff" />
          
          <!-- Right Eye -->
          <ellipse cx="102" cy="63" rx="8" ry="10" fill="${color}" filter="url(#nekoGlow)" />
          <ellipse cx="102" cy="63" rx="2.5" ry="8" fill="#ffffff" />
        </g>
      `;
      break;
  }

  return `
    <svg class="companion-avatar-svg neko-svg" viewBox="0 0 160 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nekoFur" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#2d1b4e" />
          <stop offset="70%" stop-color="#19102b" />
          <stop offset="100%" stop-color="#0a0515" />
        </radialGradient>

        <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#181829" />
          <stop offset="100%" stop-color="#0e0e1a" />
        </linearGradient>

        <filter id="nekoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Shadow -->
      <ellipse cx="80" cy="168" rx="42" ry="8" fill="#000000" opacity="0.4" class="neko-shadow" />

      <!-- Segmented Robotic Cyber Tail (behind body) -->
      <g class="neko-tail-group">
        <path d="M 98 135 Q 138 145 142 110 Q 146 75 125 70" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#nekoGlow)" class="neko-tail-anim" />
        <circle cx="125" cy="70" r="5" fill="${accent}" filter="url(#nekoGlow)" />
      </g>

      <!-- Main Body Assembly -->
      <g class="neko-body-group">
        
        <!-- Robotic Cat Ears -->
        <g class="neko-ears">
          <!-- Left Ear -->
          <g class="neko-ear-l">
            <polygon points="44,52 24,14 62,35" fill="url(#nekoFur)" stroke="#090514" stroke-width="2" stroke-linejoin="round" />
            <polygon points="42,48 30,22 56,36" fill="${color}" opacity="0.75" />
            <!-- Antenna -->
            <line x1="24" y1="14" x2="18" y2="4" stroke="${accent}" stroke-width="2" stroke-linecap="round" />
            <circle cx="18" cy="4" r="2.5" fill="${accent}" filter="url(#nekoGlow)" />
          </g>

          <!-- Right Ear -->
          <g class="neko-ear-r">
            <polygon points="116,52 136,14 98,35" fill="url(#nekoFur)" stroke="#090514" stroke-width="2" stroke-linejoin="round" />
            <polygon points="118,48 130,22 104,36" fill="${color}" opacity="0.75" />
            <!-- Antenna -->
            <line x1="136" y1="14" x2="142" y2="4" stroke="${accent}" stroke-width="2" stroke-linecap="round" />
            <circle cx="142" cy="4" r="2.5" fill="${accent}" filter="url(#nekoGlow)" />
          </g>
        </g>

        <!-- Big Oversized Cyber Hoodie -->
        <path d="M 44 95 C 28 125 32 155 45 158 C 75 162 95 162 115 158 C 128 155 132 125 116 95 Z" fill="url(#hoodieGrad)" stroke="#27273f" stroke-width="2" />
        
        <!-- Neon Hoodie Drawstrings with Glowing Tips -->
        <line x1="68" y1="110" x2="65" y2="138" stroke="#383854" stroke-width="3" stroke-linecap="round" />
        <rect x="63" y="138" width="4" height="8" rx="2" fill="${accent}" filter="url(#nekoGlow)" />
        
        <line x1="92" y1="110" x2="95" y2="138" stroke="#383854" stroke-width="3" stroke-linecap="round" />
        <rect x="93" y="138" width="4" height="8" rx="2" fill="${accent}" filter="url(#nekoGlow)" />

        <!-- Neko Head -->
        <ellipse cx="80" cy="72" rx="44" ry="36" fill="url(#nekoFur)" stroke="#090514" stroke-width="2.5" />

        <!-- Holographic Visor Mask across face -->
        <rect x="34" y="50" width="92" height="28" rx="14" fill="#0c071a" stroke="${color}" stroke-width="2" filter="url(#nekoGlow)" />
        
        <!-- Holographic Display Content -->
        ${visorDisplay}

        <!-- Cute Cyber Whiskers -->
        <line x1="32" y1="84" x2="18" y2="82" stroke="${accent}" stroke-width="1.5" stroke-linecap="round" />
        <line x1="32" y1="89" x2="16" y2="92" stroke="${accent}" stroke-width="1.5" stroke-linecap="round" />
        <line x1="128" y1="84" x2="142" y2="82" stroke="${accent}" stroke-width="1.5" stroke-linecap="round" />
        <line x1="128" y1="89" x2="144" y2="92" stroke="${accent}" stroke-width="1.5" stroke-linecap="round" />

        <!-- Tiny Cat Mouth under Visor -->
        <path d="M 75 87 Q 78 90 80 88 Q 82 90 85 87" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.85" />

        <!-- Floating Energy Combat Discs beside paws -->
        <g class="neko-floating-orbs" filter="url(#nekoGlow)">
          <ellipse cx="28" cy="120" rx="8" ry="4" fill="${accent}" opacity="0.8" class="spin-anim" />
          <ellipse cx="132" cy="120" rx="8" ry="4" fill="${accent}" opacity="0.8" class="spin-anim" />
        </g>
      </g>
    </svg>
  `;
}
