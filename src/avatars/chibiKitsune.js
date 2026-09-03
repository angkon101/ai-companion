/**
 * Chibi Kitsune Avatar Component
 * Kawaii magical anime fox spirit with reactive ears, tail, and facial expressions
 */

export function renderChibiKitsune(mood = 'idle', options = {}) {
  const { color = '#ff7b54', accent = '#ffb26b', eyeOffset = { x: 0, y: 0 } } = options;

  let eyeExpression = '';
  let mouthExpression = '';

  switch (mood) {
    case 'focused':
      eyeExpression = `
        <!-- Determined focused gaze -->
        <g transform="translate(${eyeOffset.x * 0.4}, ${eyeOffset.y * 0.4})">
          <ellipse cx="62" cy="74" rx="7" ry="8" fill="#2d1b4e" />
          <ellipse cx="60" cy="71" rx="3" ry="3.5" fill="#ffffff" />
          <path d="M 52 64 Q 62 67 72 65" stroke="#4a2800" stroke-width="2.5" stroke-linecap="round" fill="none" />
          
          <ellipse cx="98" cy="74" rx="7" ry="8" fill="#2d1b4e" />
          <ellipse cx="96" cy="71" rx="3" ry="3.5" fill="#ffffff" />
          <path d="M 88 65 Q 98 67 108 64" stroke="#4a2800" stroke-width="2.5" stroke-linecap="round" fill="none" />
        </g>
      `;
      mouthExpression = `<path d="M 77 86 Q 80 88 83 86" stroke="#4a2800" stroke-width="2" stroke-linecap="round" fill="none"/>`;
      break;
    case 'debugging':
      eyeExpression = `
        <!-- Curious / inquisitive look with one eyebrow raised -->
        <g transform="translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})">
          <circle cx="62" cy="74" r="7.5" fill="#2d1b4e" />
          <circle cx="60" cy="71" r="3" fill="#ffffff" />
          <path d="M 53 63 Q 63 61 71 65" stroke="#4a2800" stroke-width="2.5" stroke-linecap="round" fill="none" />
          
          <circle cx="98" cy="73" r="8.5" fill="#2d1b4e" />
          <circle cx="96" cy="70" r="4" fill="#ffffff" />
          <circle cx="100" cy="75" r="1.5" fill="#ffffff" />
          <path d="M 89 61 Q 99 58 107 62" stroke="#4a2800" stroke-width="2.5" stroke-linecap="round" fill="none" />
        </g>
      `;
      mouthExpression = `<ellipse cx="80" cy="87" rx="3.5" ry="4" fill="#ff4d6d" stroke="#4a2800" stroke-width="1.5" />`;
      break;
    case 'celebrating':
    case 'excited':
      eyeExpression = `
        <!-- Happy ecstatic arc eyes ^ ^ -->
        <g>
          <path d="M 54 75 Q 62 65 70 75" stroke="#2d1b4e" stroke-width="4" stroke-linecap="round" fill="none" />
          <path d="M 90 75 Q 98 65 106 75" stroke="#2d1b4e" stroke-width="4" stroke-linecap="round" fill="none" />
          <polygon points="50,60 52,63 56,63 53,66 54,69 50,67 46,69 47,66 44,63 48,63" fill="#ffd700" class="star-twinkle" />
          <polygon points="110,60 112,63 116,63 113,66 114,69 110,67 106,69 107,66 104,63 108,63" fill="#ffd700" class="star-twinkle" />
        </g>
      `;
      mouthExpression = `<path d="M 74 85 Q 80 94 86 85 Z" fill="#ff4d6d" stroke="#4a2800" stroke-width="2" stroke-linejoin="round" />`;
      break;
    case 'sleepy':
      eyeExpression = `
        <!-- Sleepy peaceful closed curves -->
        <g>
          <path d="M 54 74 Q 62 80 70 74" stroke="#4a2800" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M 90 74 Q 98 80 106 74" stroke="#4a2800" stroke-width="3" stroke-linecap="round" fill="none" />
          <text x="112" y="60" fill="#9d4edd" font-family="sans-serif" font-size="14" font-weight="bold" class="zzz-anim">Zzz</text>
        </g>
      `;
      mouthExpression = `<ellipse cx="80" cy="86" rx="2.5" ry="2" fill="#4a2800" />`;
      break;
    case 'idle':
    default:
      eyeExpression = `
        <!-- Kawaii shiny anime eyes that follow cursor -->
        <g transform="translate(${eyeOffset.x * 0.6}, ${eyeOffset.y * 0.6})">
          <ellipse cx="62" cy="74" rx="8" ry="10" fill="#2d1b4e" />
          <ellipse cx="60" cy="70" rx="3.5" ry="4.5" fill="#ffffff" />
          <ellipse cx="65" cy="78" rx="2" ry="2" fill="#ffffff" />
          
          <ellipse cx="98" cy="74" rx="8" ry="10" fill="#2d1b4e" />
          <ellipse cx="96" cy="70" rx="3.5" ry="4.5" fill="#ffffff" />
          <ellipse cx="101" cy="78" rx="2" ry="2" fill="#ffffff" />
        </g>
      `;
      mouthExpression = `<path d="M 75 86 Q 78 88 80 86 Q 82 88 85 86" stroke="#4a2800" stroke-width="2" stroke-linecap="round" fill="none"/>`;
      break;
  }

  return `
    <svg class="companion-avatar-svg kitsune-svg" viewBox="0 0 160 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="kitsuneGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
        
        <linearGradient id="furGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>

        <linearGradient id="tailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="65%" stop-color="${accent}" />
          <stop offset="90%" stop-color="#ffffff" />
        </linearGradient>
      </defs>

      <!-- Ambient Shadow -->
      <ellipse cx="80" cy="166" rx="40" ry="7" fill="#000000" opacity="0.25" class="kitsune-ground-shadow" />

      <!-- Wagging Bushy Tail behind body -->
      <g class="kitsune-tail-group">
        <path d="M 95 130 C 135 140 155 110 145 80 C 138 60 115 65 105 85 C 95 102 92 120 95 130 Z" 
              fill="url(#tailGrad)" class="kitsune-tail" />
        <!-- Fluffy white tail tip -->
        <path d="M 135 68 C 145 74 148 85 143 95 C 137 85 125 78 135 68 Z" fill="#ffffff" />
      </g>

      <!-- Main Animated Body -->
      <g class="kitsune-body-group">
        <!-- Fox Ears -->
        <g class="kitsune-ears">
          <!-- Left Ear with Twitch animation -->
          <g class="kitsune-ear-left">
            <polygon points="40,55 20,12 60,35" fill="url(#furGrad)" stroke="#4a2800" stroke-width="1.5" stroke-linejoin="round" />
            <polygon points="38,50 26,20 54,36" fill="#ffe0cc" />
            <!-- Inner ear fluff -->
            <path d="M 32 38 Q 42 42 36 50" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" />
          </g>
          
          <!-- Right Ear with Twitch animation -->
          <g class="kitsune-ear-right">
            <polygon points="120,55 140,12 100,35" fill="url(#furGrad)" stroke="#4a2800" stroke-width="1.5" stroke-linejoin="round" />
            <polygon points="122,50 134,20 106,36" fill="#ffe0cc" />
            <!-- Inner ear fluff -->
            <path d="M 128 38 Q 118 42 124 50" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" />
          </g>
        </g>

        <!-- Chibi Body / Kimono cape -->
        <path d="M 55 105 Q 40 150 55 158 Q 80 162 105 158 Q 120 150 105 105 Z" fill="url(#furGrad)" />
        <ellipse cx="80" cy="132" rx="20" ry="22" fill="#fffdfa" />
        <!-- Cute collar bell / magatama charm -->
        <ellipse cx="80" cy="112" rx="6" ry="6" fill="#ffd700" stroke="#b38600" stroke-width="1.5" />
        <line x1="77" y1="112" x2="83" y2="112" stroke="#b38600" stroke-width="1" />

        <!-- Cute Chibi Head -->
        <ellipse cx="80" cy="78" rx="42" ry="34" fill="url(#furGrad)" stroke="#4a2800" stroke-width="1.5" />
        
        <!-- White Face Cheek Fluff Mask -->
        <path d="M 45 80 Q 40 96 55 100 Q 80 106 105 100 Q 120 96 115 80 Q 105 100 80 98 Q 55 100 45 80 Z" fill="#ffffff" />

        <!-- Rosy Blush Cheeks -->
        <ellipse cx="50" cy="84" rx="6" ry="3.5" fill="#ff70a6" opacity="0.75" class="blush-anim" />
        <ellipse cx="110" cy="84" rx="6" ry="3.5" fill="#ff70a6" opacity="0.75" class="blush-anim" />

        <!-- Nose -->
        <polygon points="78,81 82,81 80,83" fill="#4a2800" />

        <!-- Dynamic Eyes -->
        ${eyeExpression}

        <!-- Dynamic Mouth -->
        ${mouthExpression}

        <!-- Paws in front -->
        <ellipse cx="66" cy="148" rx="7" ry="6" fill="#ffffff" stroke="#e0d5c1" stroke-width="1" />
        <ellipse cx="94" cy="148" rx="7" ry="6" fill="#ffffff" stroke="#e0d5c1" stroke-width="1" />
      </g>
    </svg>
  `;
}
