/**
 * Rex the Neon Pixel Brawler Avatar Component
 * 90s Arcade Cyberpunk Dino rocking 8-bit pixel shades, flashing RGB dorsal spines, and brawler gloves
 */

export function renderPixelBrawler(mood = 'idle', options = {}) {
  const { color = '#00f2fe', accent = '#ffe600', eyeOffset = { x: 0, y: 0 } } = options;

  let shadesContent = '';
  let specialEffects = '';

  switch (mood) {
    case 'focused':
      shadesContent = `
        <!-- Focused Green Code Matrix on Shades -->
        <g transform="translate(${eyeOffset.x * 0.4}, ${eyeOffset.y * 0.4})">
          <!-- 8-Bit Pixel Shades -->
          <rect x="42" y="56" width="34" height="20" fill="#000000" stroke="#1e293b" stroke-width="2" />
          <rect x="84" y="56" width="34" height="20" fill="#000000" stroke="#1e293b" stroke-width="2" />
          <rect x="76" y="58" width="8" height="6" fill="#000000" />
          <!-- Neon Matrix code lines -->
          <text x="45" y="70" fill="#00ff9f" font-family="monospace" font-size="10" font-weight="bold">0101</text>
          <text x="87" y="70" fill="#00ff9f" font-family="monospace" font-size="10" font-weight="bold">1100</text>
        </g>
      `;
      break;

    case 'debugging':
      shadesContent = `
        <!-- Shades tipped down looking over with fiery eye -->
        <g transform="translate(0, 6)">
          <rect x="42" y="56" width="34" height="20" fill="#000000" stroke="#1e293b" stroke-width="2" />
          <rect x="84" y="56" width="34" height="20" fill="#000000" stroke="#1e293b" stroke-width="2" />
          <rect x="76" y="58" width="8" height="6" fill="#000000" />
          <!-- Eyes peering over top -->
          <circle cx="56" cy="52" r="7" fill="#ff0055" />
          <circle cx="58" cy="50" r="3" fill="#ffffff" />
          <circle cx="98" cy="52" r="7" fill="#ff0055" />
          <circle cx="100" cy="50" r="3" fill="#ffffff" />
        </g>
      `;
      specialEffects = `
        <!-- Flame breath smoke from nostrils -->
        <g class="flame-breath">
          <circle cx="118" cy="94" r="4" fill="#ff7b00" opacity="0.8" />
          <circle cx="126" cy="91" r="5" fill="#ff0055" opacity="0.7" />
          <circle cx="134" cy="87" r="3" fill="#ffe600" opacity="0.9" />
        </g>
      `;
      break;

    case 'celebrating':
    case 'excited':
      shadesContent = `
        <!-- Retro Star Shades -->
        <g class="pulse-anim">
          <polygon points="56,52 60,62 70,62 62,68 65,78 56,72 47,78 50,68 42,62 52,62" fill="#ffe600" stroke="#000000" stroke-width="1.5" />
          <polygon points="98,52 102,62 112,62 104,68 107,78 98,72 89,78 92,68 84,62 94,62" fill="#ffe600" stroke="#000000" stroke-width="1.5" />
          <line x1="70" y1="64" x2="84" y2="64" stroke="#ffe600" stroke-width="3" />
        </g>
      `;
      specialEffects = `
        <!-- Pixel Confetti -->
        <rect x="30" y="30" width="5" height="5" fill="#00ff9f" class="star-twinkle" />
        <rect x="130" y="35" width="5" height="5" fill="#ff0055" class="star-twinkle" />
        <rect x="25" y="100" width="6" height="6" fill="#ffe600" class="star-twinkle" />
      `;
      break;

    case 'sleepy':
      shadesContent = `
        <!-- Slipped down shades -->
        <g transform="translate(0, 10)">
          <rect x="42" y="56" width="34" height="18" fill="#1e293b" />
          <rect x="84" y="56" width="34" height="18" fill="#1e293b" />
          <line x1="50" y1="48" x2="64" y2="48" stroke="#334155" stroke-width="3" stroke-linecap="round" />
          <line x1="92" y1="48" x2="106" y2="48" stroke="#334155" stroke-width="3" stroke-linecap="round" />
          <text x="120" y="50" fill="${accent}" font-family="monospace" font-size="13" font-weight="bold" class="zzz-anim">Zz</text>
        </g>
      `;
      break;

    case 'idle':
    default:
      shadesContent = `
        <!-- Classic 8-bit Thug Life / Deal With It Pixel Shades with specular shine -->
        <g transform="translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})">
          <!-- Left Frame -->
          <rect x="42" y="56" width="34" height="20" fill="#050811" stroke="#00f2fe" stroke-width="1.5" />
          <!-- Right Frame -->
          <rect x="84" y="56" width="34" height="20" fill="#050811" stroke="#00f2fe" stroke-width="1.5" />
          <!-- Bridge -->
          <rect x="76" y="58" width="8" height="6" fill="#050811" />
          <!-- Diagonal 8-Bit Pixel White Glare -->
          <rect x="46" y="59" width="5" height="5" fill="#ffffff" />
          <rect x="51" y="64" width="5" height="5" fill="#ffffff" />
          <rect x="88" y="59" width="5" height="5" fill="#ffffff" />
          <rect x="93" y="64" width="5" height="5" fill="#ffffff" />
        </g>
      `;
      break;
  }

  return `
    <svg class="companion-avatar-svg dino-svg" viewBox="0 0 160 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Radical Dino Gradients -->
        <linearGradient id="dinoSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06d6a0" />
          <stop offset="65%" stop-color="#059669" />
          <stop offset="100%" stop-color="#064e3b" />
        </linearGradient>

        <linearGradient id="spineRgb" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="50%" stop-color="#ff007f" />
          <stop offset="100%" stop-color="${color}" />
        </linearGradient>

        <filter id="spineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Ambient Base Shadow -->
      <ellipse cx="80" cy="168" rx="46" ry="8" fill="#000000" opacity="0.4" class="dino-shadow" />

      <!-- Main Dino Brawler Rig -->
      <g class="dino-brawler-body">
        
        <!-- Glowing RGB Dorsal Spines -->
        <g class="dino-spines" filter="url(#spineGlow)">
          <polygon points="45,28 35,6 55,20" fill="url(#spineRgb)" class="spine-pulse-1" />
          <polygon points="68,20 62,-2 82,14" fill="url(#spineRgb)" class="spine-pulse-2" />
          <polygon points="95,20 102,-4 108,18" fill="url(#spineRgb)" class="spine-pulse-3" />
          <polygon points="120,30 134,10 128,32" fill="url(#spineRgb)" class="spine-pulse-4" />
        </g>

        <!-- Dino Head & Chunky Snout -->
        <!-- Back of head -->
        <path d="M 40 45 C 30 75 32 110 50 120 C 80 125 110 125 125 105 C 130 90 126 50 100 35 C 75 25 45 30 40 45 Z" 
              fill="url(#dinoSkin)" stroke="#022c22" stroke-width="2.5" />

        <!-- Big Jaw / Snout Overhang -->
        <path d="M 85 55 L 126 65 C 132 78 128 95 120 98 L 75 98 Z" fill="url(#dinoSkin)" stroke="#022c22" stroke-width="2" />

        <!-- Nostrils with smoke capability -->
        <circle cx="116" cy="80" r="2.5" fill="#022c22" />
        ${specialEffects}

        <!-- Sharp Brawler Teeth Grin -->
        <g class="dino-teeth">
          <path d="M 78 95 L 82 89 L 86 95 L 90 89 L 94 95 L 98 89 L 102 95 L 106 89 L 110 95 L 114 89 L 118 95" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linejoin="round" />
        </g>

        <!-- Shades / Eyes -->
        ${shadesContent}

        <!-- Dino Torso / Tank Top Hoodie -->
        <path d="M 52 118 L 108 118 L 114 156 L 46 156 Z" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
        <!-- Arcade Skull / Lightning Print on Tank -->
        <polygon points="80,126 84,136 78,136 82,148 74,138 80,138" fill="${accent}" />

        <!-- Red Brawler Boxing Gloves / Gamer Knuckles -->
        <g class="dino-gloves">
          <!-- Left Glove -->
          <g class="dino-glove-left">
            <circle cx="36" cy="136" r="14" fill="#e11d48" stroke="#881337" stroke-width="2" />
            <rect x="30" y="128" width="12" height="5" rx="2" fill="#ffffff" />
          </g>
          <!-- Right Glove -->
          <g class="dino-glove-right">
            <circle cx="124" cy="136" r="14" fill="#e11d48" stroke="#881337" stroke-width="2" />
            <rect x="118" y="128" width="12" height="5" rx="2" fill="#ffffff" />
          </g>
        </g>

      </g>
    </svg>
  `;
}
