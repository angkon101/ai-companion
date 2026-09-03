/**
 * Bouncy Slime Blob Avatar Component
 * Squishy, jelly-like companion with fluid spring deformation and playful expressions
 */

export function renderSlimeBlob(mood = 'idle', options = {}) {
  const { color = '#00f5d4', accent = '#7b2cbf', eyeOffset = { x: 0, y: 0 } } = options;

  let faceContent = '';
  switch (mood) {
    case 'focused':
      faceContent = `
        <!-- Focused coding brow -->
        <g transform="translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})">
          <ellipse cx="65" cy="85" rx="6" ry="7" fill="#1b1a38" />
          <circle cx="63" cy="83" r="2.5" fill="#ffffff" />
          <path d="M 57 76 Q 66 79 73 77" stroke="#1b1a38" stroke-width="2.5" stroke-linecap="round" fill="none" />
          
          <ellipse cx="95" cy="85" rx="6" ry="7" fill="#1b1a38" />
          <circle cx="93" cy="83" r="2.5" fill="#ffffff" />
          <path d="M 87 77 Q 94 79 103 76" stroke="#1b1a38" stroke-width="2.5" stroke-linecap="round" fill="none" />

          <!-- Tiny concentrated mouth -->
          <ellipse cx="80" cy="98" rx="2" ry="2" fill="#1b1a38" />
        </g>
      `;
      break;
    case 'debugging':
      faceContent = `
        <!-- Wondering / Puzzled slime -->
        <g transform="translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})">
          <circle cx="64" cy="84" r="7" fill="#1b1a38" />
          <circle cx="62" cy="81" r="3" fill="#ffffff" />
          
          <circle cx="96" cy="82" r="9" fill="#1b1a38" />
          <circle cx="94" cy="79" r="4" fill="#ffffff" />

          <!-- Wavy curious mouth -->
          <path d="M 74 97 Q 77 94 80 97 Q 83 100 86 97" stroke="#1b1a38" stroke-width="2" stroke-linecap="round" fill="none" />
        </g>
      `;
      break;
    case 'celebrating':
    case 'excited':
      faceContent = `
        <!-- Super happy open mouth and closed happy eyes -->
        <g>
          <path d="M 58 84 Q 65 74 72 84" stroke="#1b1a38" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <path d="M 88 84 Q 95 74 102 84" stroke="#1b1a38" stroke-width="3.5" stroke-linecap="round" fill="none" />
          
          <!-- Big happy open mouth -->
          <path d="M 72 94 Q 80 108 88 94 Z" fill="#ff477e" stroke="#1b1a38" stroke-width="2" />
        </g>
      `;
      break;
    case 'sleepy':
      faceContent = `
        <!-- Sleeping peaceful slits -->
        <g>
          <line x1="58" y1="86" x2="72" y2="86" stroke="#1b1a38" stroke-width="3" stroke-linecap="round" />
          <line x1="88" y1="86" x2="102" y2="86" stroke="#1b1a38" stroke-width="3" stroke-linecap="round" />
          <circle cx="80" cy="98" r="3" fill="#ff99c8" class="bubble-snore" />
          <text x="110" y="70" fill="${accent}" font-family="sans-serif" font-size="13" font-weight="bold" class="zzz-anim">z</text>
        </g>
      `;
      break;
    case 'idle':
    default:
      faceContent = `
        <!-- Cute shiny eyes following cursor -->
        <g transform="translate(${eyeOffset.x * 0.7}, ${eyeOffset.y * 0.7})">
          <ellipse cx="65" cy="85" rx="7" ry="9" fill="#1b1a38" />
          <circle cx="63" cy="81" r="3" fill="#ffffff" />
          <circle cx="67" cy="88" r="1.5" fill="#ffffff" />
          
          <ellipse cx="95" cy="85" rx="7" ry="9" fill="#1b1a38" />
          <circle cx="93" cy="81" r="3" fill="#ffffff" />
          <circle cx="97" cy="88" r="1.5" fill="#ffffff" />

          <!-- Tiny sweet smile -->
          <path d="M 76 96 Q 80 100 84 96" stroke="#1b1a38" stroke-width="2" stroke-linecap="round" fill="none" />
        </g>
      `;
      break;
  }

  return `
    <svg class="companion-avatar-svg slime-svg" viewBox="0 0 160 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Slime jelly gradients -->
        <radialGradient id="slimeGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
          <stop offset="25%" stop-color="${color}" />
          <stop offset="85%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#120c3b" />
        </radialGradient>

        <linearGradient id="innerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>

        <filter id="slimeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Floor Shadow with squish sync -->
      <ellipse cx="80" cy="158" rx="46" ry="8" fill="#000000" opacity="0.3" class="slime-shadow" />

      <!-- Squishy Slime Body -->
      <g class="slime-body-group">
        <!-- Main Jelly Blob Shape -->
        <path class="slime-blob-path" d="M 80 40 
                 C 125 40 145 75 140 115 
                 C 136 145 115 155 80 155 
                 C 45 155 24 145 20 115 
                 C 15 75 35 40 80 40 Z" 
              fill="url(#slimeGrad)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" />

        <!-- Glossy Jelly Top Highlight -->
        <path d="M 45 60 C 60 48 95 48 115 62 C 100 55 60 55 45 60 Z" fill="url(#innerGlow)" opacity="0.75" />
        <ellipse cx="50" cy="65" rx="8" ry="4" fill="#ffffff" opacity="0.6" transform="rotate(-20 50 65)" />

        <!-- Floating inner sparkle dots inside translucent jelly -->
        <circle cx="52" cy="118" r="2.5" fill="#ffffff" opacity="0.5" class="inner-sparkle-1" />
        <circle cx="108" cy="122" r="3.5" fill="#ffffff" opacity="0.4" class="inner-sparkle-2" />
        <circle cx="80" cy="135" r="2" fill="#ffffff" opacity="0.6" class="inner-sparkle-3" />

        <!-- Cute Rosy Jelly Cheeks -->
        <ellipse cx="48" cy="94" rx="7" ry="4" fill="#ff4d8d" opacity="0.4" />
        <ellipse cx="112" cy="94" rx="7" ry="4" fill="#ff4d8d" opacity="0.4" />

        <!-- Slime Face & Eyes -->
        ${faceContent}
      </g>
    </svg>
  `;
}
