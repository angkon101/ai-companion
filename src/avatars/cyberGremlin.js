/**
 * Gizmo the Cyber-Gremlin Avatar Component
 * Chaotic Mecha-Imp with oversized RGB gamer headset, LED cyber-goggles, and a toothy grin
 */

export function renderCyberGremlin(mood = 'idle', options = {}) {
  const { color = '#00ff9f', accent = '#ff0055', eyeOffset = { x: 0, y: 0 } } = options;

  let goggleLenses = '';
  let mouthPath = '';

  switch (mood) {
    case 'focused':
      goggleLenses = `
        <!-- Dual Target Reticles / Lock-on -->
        <g transform="translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})">
          <circle cx="56" cy="62" r="14" fill="#04121a" stroke="${color}" stroke-width="2.5" />
          <circle cx="56" cy="62" r="7" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3,2" class="spin-anim" />
          <line x1="56" y1="46" x2="56" y2="78" stroke="${color}" stroke-width="1.5" />
          <line x1="40" y1="62" x2="72" y2="62" stroke="${color}" stroke-width="1.5" />

          <circle cx="104" cy="62" r="14" fill="#04121a" stroke="${color}" stroke-width="2.5" />
          <circle cx="104" cy="62" r="7" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3,2" class="spin-anim" />
          <line x1="104" y1="46" x2="104" y2="78" stroke="${color}" stroke-width="1.5" />
          <line x1="88" y1="62" x2="120" y2="62" stroke="${color}" stroke-width="1.5" />
        </g>
      `;
      mouthPath = `
        <!-- Determined Grin with Fangs -->
        <path d="M 64 88 Q 80 94 96 88 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
        <polygon points="68,88 72,94 76,88" fill="#ffffff" />
        <polygon points="84,88 88,94 92,88" fill="#ffd700" />
      `;
      break;

    case 'debugging':
      goggleLenses = `
        <!-- Dizzy Swirl / Hazard Alert -->
        <g transform="translate(${eyeOffset.x * 0.4}, ${eyeOffset.y * 0.4})">
          <circle cx="56" cy="62" r="14" fill="#190e02" stroke="#ffb703" stroke-width="3" />
          <path d="M 50 62 A 6 6 0 1 1 62 62 A 3 3 0 1 1 56 62" stroke="#ffb703" stroke-width="2" fill="none" class="spin-anim" />
          
          <circle cx="104" cy="62" r="14" fill="#190e02" stroke="#ffb703" stroke-width="3" />
          <text x="98" y="68" fill="#ffb703" font-family="monospace" font-size="18" font-weight="bold">!</text>
        </g>
      `;
      mouthPath = `
        <!-- Wavy puzzled grin -->
        <path d="M 66 90 Q 72 84 80 90 Q 88 96 94 90" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round" />
        <polygon points="70,87 74,93 78,87" fill="#ffffff" />
      `;
      break;

    case 'celebrating':
    case 'excited':
      goggleLenses = `
        <!-- Glowing Heart / Starburst Lenses -->
        <g>
          <circle cx="56" cy="62" r="14" fill="#2d001e" stroke="#ff007f" stroke-width="3" />
          <path d="M 56 67 L 50 60 A 4 4 0 0 1 56 56 A 4 4 0 0 1 62 60 Z" fill="#ff007f" class="pulse-anim" />
          
          <circle cx="104" cy="62" r="14" fill="#2d001e" stroke="#ff007f" stroke-width="3" />
          <path d="M 104 67 L 98 60 A 4 4 0 0 1 104 56 A 4 4 0 0 1 110 60 Z" fill="#ff007f" class="pulse-anim" />
        </g>
      `;
      mouthPath = `
        <!-- Wide toothy celebratory laugh -->
        <path d="M 60 84 Q 80 106 100 84 Z" fill="#e11d48" stroke="#0f172a" stroke-width="2.5" />
        <path d="M 64 85 L 68 91 L 72 85 L 76 91 L 80 85 L 84 91 L 88 85 L 92 91 L 96 85" stroke="#ffffff" stroke-width="2" fill="none" />
      `;
      break;

    case 'sleepy':
      goggleLenses = `
        <!-- Low Battery Slits -->
        <g>
          <circle cx="56" cy="62" r="14" fill="#0b0f19" stroke="#334155" stroke-width="2" />
          <line x1="46" y1="62" x2="66" y2="62" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
          
          <circle cx="104" cy="62" r="14" fill="#0b0f19" stroke="#334155" stroke-width="2" />
          <line x1="94" y1="62" x2="114" y2="62" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
          <text x="116" y="44" fill="${accent}" font-family="monospace" font-size="12" font-weight="bold" class="zzz-anim">Zzz</text>
        </g>
      `;
      mouthPath = `
        <ellipse cx="80" cy="90" rx="4" ry="3" fill="#0f172a" />
      `;
      break;

    case 'idle':
    default:
      goggleLenses = `
        <!-- Glowing RGB Cyber Lenses with Pupil Follow -->
        <g transform="translate(${eyeOffset.x * 0.7}, ${eyeOffset.y * 0.7})">
          <circle cx="56" cy="62" r="14" fill="#06121e" stroke="${color}" stroke-width="2.5" />
          <circle cx="56" cy="62" r="8" fill="${color}" opacity="0.85" filter="url(#gremlinGlow)" />
          <circle cx="54" cy="59" r="3.5" fill="#ffffff" />
          
          <circle cx="104" cy="62" r="14" fill="#06121e" stroke="${color}" stroke-width="2.5" />
          <circle cx="104" cy="62" r="8" fill="${color}" opacity="0.85" filter="url(#gremlinGlow)" />
          <circle cx="102" cy="59" r="3.5" fill="#ffffff" />
        </g>
      `;
      mouthPath = `
        <!-- Classic Smug Goblin Grin -->
        <path d="M 64 86 Q 80 98 96 86" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
        <!-- Sharp little fangs -->
        <polygon points="68,86 71,92 74,86" fill="#ffffff" />
        <polygon points="86,87 89,93 92,87" fill="#ffd700" />
      `;
      break;
  }

  return `
    <svg class="companion-avatar-svg gremlin-svg" viewBox="0 0 160 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gremlinSkin" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#4ade80" />
          <stop offset="60%" stop-color="#16a34a" />
          <stop offset="100%" stop-color="#14532d" />
        </radialGradient>

        <linearGradient id="headphoneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="50%" stop-color="#8b5cf6" />
          <stop offset="100%" stop-color="${color}" />
        </linearGradient>

        <filter id="gremlinGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Shadow -->
      <ellipse cx="80" cy="168" rx="44" ry="8" fill="#000000" opacity="0.4" class="gremlin-shadow" />

      <!-- Floating Gremlin Body -->
      <g class="gremlin-floating-body">
        
        <!-- Big Mecha Goblin Ears -->
        <g class="gremlin-ears">
          <!-- Left Ear -->
          <g class="gremlin-ear-left">
            <polygon points="40,65 2,42 32,85" fill="url(#gremlinSkin)" stroke="#0f172a" stroke-width="2" stroke-linejoin="round" />
            <polygon points="34,66 12,50 28,78" fill="#f43f5e" opacity="0.65" />
            <circle cx="8" cy="46" r="3" fill="${color}" filter="url(#gremlinGlow)" />
            <line x1="8" y1="46" x2="28" y2="68" stroke="${color}" stroke-width="1.5" />
          </g>

          <!-- Right Ear -->
          <g class="gremlin-ear-right">
            <polygon points="120,65 158,42 128,85" fill="url(#gremlinSkin)" stroke="#0f172a" stroke-width="2" stroke-linejoin="round" />
            <polygon points="126,66 148,50 132,78" fill="#f43f5e" opacity="0.65" />
            <circle cx="152" cy="46" r="3" fill="${color}" filter="url(#gremlinGlow)" />
            <line x1="152" y1="46" x2="132" y2="68" stroke="${color}" stroke-width="1.5" />
          </g>
        </g>

        <!-- RGB Gamer Headphone Band -->
        <path d="M 32 60 C 32 15 128 15 128 60" stroke="url(#headphoneGrad)" stroke-width="8" stroke-linecap="round" fill="none" filter="url(#gremlinGlow)" />
        <path d="M 32 60 C 32 15 128 15 128 60" stroke="#0f172a" stroke-width="4" stroke-linecap="round" fill="none" />

        <!-- Gremlin Head -->
        <ellipse cx="80" cy="70" rx="46" ry="38" fill="url(#gremlinSkin)" stroke="#0f172a" stroke-width="2.5" />

        <!-- Spiky Goblin Tuft -->
        <polygon points="80,26 72,36 88,36" fill="#14532d" />
        <polygon points="73,28 68,38 78,38" fill="#14532d" />
        <polygon points="87,28 82,38 92,38" fill="#14532d" />

        <!-- Goggle Frame Strap -->
        <rect x="34" y="58" width="92" height="8" rx="4" fill="#0f172a" />

        <!-- Dual Cyber Goggle Lenses -->
        <rect x="40" y="46" width="32" height="32" rx="10" fill="#1e293b" stroke="#0f172a" stroke-width="3" />
        <rect x="88" y="46" width="32" height="32" rx="10" fill="#1e293b" stroke="#0f172a" stroke-width="3" />
        <!-- Bridge -->
        <rect x="72" y="58" width="16" height="7" rx="2" fill="#334155" />

        <!-- Goggle Screen Contents -->
        ${goggleLenses}

        <!-- Gremlin Snout / Nose -->
        <ellipse cx="80" cy="78" rx="7" ry="4.5" fill="#14532d" />
        <circle cx="77" cy="78" r="1.5" fill="#052e16" />
        <circle cx="83" cy="78" r="1.5" fill="#052e16" />

        <!-- Mouth Expression -->
        ${mouthPath}

        <!-- Gamer Headphone Ear Cups -->
        <rect x="22" y="46" width="14" height="32" rx="7" fill="#0f172a" stroke="${accent}" stroke-width="2" />
        <circle cx="29" cy="62" r="3.5" fill="${accent}" filter="url(#gremlinGlow)" />
        <rect x="124" y="46" width="14" height="32" rx="7" fill="#0f172a" stroke="${accent}" stroke-width="2" />
        <circle cx="131" cy="62" r="3.5" fill="${accent}" filter="url(#gremlinGlow)" />

        <!-- Headset Boom Microphone -->
        <path d="M 28 74 Q 35 96 58 92" stroke="#334155" stroke-width="3" fill="none" stroke-linecap="round" />
        <circle cx="60" cy="92" r="4.5" fill="${color}" filter="url(#gremlinGlow)" class="mic-glow" />

        <!-- Cyberpunk Gremlin Hoodie / Armor -->
        <path d="M 50 105 L 110 105 L 118 152 L 42 152 Z" fill="#090d16" stroke="#1e293b" stroke-width="2" />
        <polygon points="80,105 68,124 92,124" fill="${accent}" opacity="0.8" />

        <!-- Mini Floating Claw Hands -->
        <circle cx="34" cy="128" r="9" fill="url(#gremlinSkin)" stroke="#0f172a" stroke-width="2" class="gremlin-hand-l" />
        <circle cx="126" cy="128" r="9" fill="url(#gremlinSkin)" stroke="#0f172a" stroke-width="2" class="gremlin-hand-r" />
      </g>
    </svg>
  `;
}
