/**
 * Realistic Feline Pet Renderer
 * Features:
 * - Idle sitting with fluid tail swishing & cursor eye tracking
 * - Walking quadruped prowl gait
 * - Self-cleaning: lifting paw to mouth and licking feet with animated pink tongue
 * - Paw swatting: reaching out to catch the cursor!
 * - Cat loaf: tucked paws and sleepy purr
 */

export function renderPetCat(state = 'idle', options = {}) {
  const {
    breed = 'tabby',
    eyeOffset = { x: 0, y: 0 },
    swatAngle = 0, // angle toward cursor
    facing = 1 // 1 = right, -1 = left
  } = options;

  const coats = {
    tabby: {
      body: '#f59e0b',
      accent: '#d97706',
      belly: '#fef3c7',
      stripes: '#b45309',
      nose: '#f472b6',
      pads: '#fb7185',
      eyes: '#eab308',
      pupil: '#0f172a'
    },
    calico: {
      body: '#ffffff',
      accent: '#ea580c',
      belly: '#ffffff',
      stripes: '#1e293b',
      nose: '#fb7185',
      pads: '#f472b6',
      eyes: '#10b981',
      pupil: '#022c22'
    },
    void: {
      body: '#18181b',
      accent: '#27272a',
      belly: '#09090b',
      stripes: '#000000',
      nose: '#27272a',
      pads: '#3f3f46',
      eyes: '#a3e635',
      pupil: '#052e16'
    },
    siamese: {
      body: '#fef3c7',
      accent: '#451a03',
      belly: '#fffbeb',
      stripes: '#291102',
      nose: '#451a03',
      pads: '#78350f',
      eyes: '#38bdf8',
      pupil: '#082f49'
    }
  };

  const coat = coats[breed] || coats.tabby;

  switch (state) {
    case 'grooming':
      return renderGroomingCat(coat);
    case 'walking':
      return renderWalkingCat(coat);
    case 'swatting':
      return renderSwattingCat(coat, eyeOffset, swatAngle);
    case 'loaf':
      return renderLoafCat(coat);
    case 'idle':
    case 'standing':
    default:
      return renderSittingCat(coat, eyeOffset);
  }
}

// 1. SITTING CAT (Fluid Tail Swishing, Eye Tracking, Ear Twitch)
function renderSittingCat(coat, eyeOffset) {
  return `
    <svg class="pet-cat-svg cat-sitting" viewBox="0 0 180 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="catEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
          <stop offset="45%" stop-color="${coat.eyes}" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.3" />
        </radialGradient>
      </defs>

      <!-- Floor Shadow -->
      <ellipse cx="90" cy="186" rx="55" ry="9" fill="#000000" opacity="0.35" class="cat-shadow" />

      <!-- Fluid Tail Swishing (behind body) -->
      <g class="cat-tail-group">
        <path d="M 125 155 C 165 160 178 125 160 95 C 150 78 135 85 142 105 C 148 122 140 145 118 162 Z" 
              fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" class="cat-tail-swish" />
        <circle cx="158" cy="92" r="7" fill="${coat.stripes}" opacity="0.5" />
      </g>

      <!-- Body -->
      <g class="cat-body-sitting">
        <ellipse cx="62" cy="152" rx="26" ry="24" fill="${coat.body}" />
        <ellipse cx="118" cy="152" rx="26" ry="24" fill="${coat.body}" />
        <path d="M 66 95 C 60 135 60 170 90 174 C 120 170 120 135 114 95 Z" fill="${coat.body}" />
        <path d="M 76 96 C 70 120 72 150 90 156 C 108 150 110 120 104 96 Z" fill="${coat.belly}" />

        <!-- Front Paws -->
        <rect x="74" y="125" width="13" height="48" rx="6" fill="${coat.body}" />
        <rect x="93" y="125" width="13" height="48" rx="6" fill="${coat.body}" />
        <ellipse cx="80" cy="172" rx="8" ry="6" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1" />
        <ellipse cx="100" cy="172" rx="8" ry="6" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1" />

        <!-- Head -->
        <g class="cat-head">
          <polygon points="58,58 36,18 78,38" fill="${coat.accent}" class="ear-twitch-l" />
          <polygon points="56,52 44,25 72,38" fill="#fbcfe8" />
          <polygon points="122,58 144,18 102,38" fill="${coat.accent}" class="ear-twitch-r" />
          <polygon points="124,52 136,25 108,38" fill="#fbcfe8" />

          <ellipse cx="90" cy="74" rx="42" ry="32" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />
          
          <!-- Eyes following cursor -->
          <g transform="translate(${eyeOffset.x * 0.7}, ${eyeOffset.y * 0.7})">
            <path d="M 64 68 C 64 60 80 60 80 68 C 80 76 64 76 64 68 Z" fill="url(#catEye)" stroke="#0f172a" stroke-width="1.5" />
            <ellipse cx="72" cy="68" rx="2.4" ry="6" fill="${coat.pupil}" />
            <circle cx="70.5" cy="65.5" r="1.5" fill="#ffffff" />

            <path d="M 100 68 C 100 60 116 60 116 68 C 116 76 100 76 100 68 Z" fill="url(#catEye)" stroke="#0f172a" stroke-width="1.5" />
            <ellipse cx="108" cy="68" rx="2.4" ry="6" fill="${coat.pupil}" />
            <circle cx="106.5" cy="65.5" r="1.5" fill="#ffffff" />
          </g>

          <!-- Muzzle & Pink Nose -->
          <ellipse cx="84" cy="84" rx="8" ry="6" fill="${coat.belly}" />
          <ellipse cx="96" cy="84" rx="8" ry="6" fill="${coat.belly}" />
          <polygon points="87,79 93,79 90,83" fill="${coat.nose}" />
          <path d="M 85 86 Q 90 89 95 86" stroke="#4a2800" stroke-width="1.5" stroke-linecap="round" fill="none" />

          <!-- Whiskers -->
          <line x1="78" y1="83" x2="38" y2="78" stroke="#ffffff" stroke-width="1.2" opacity="0.9" />
          <line x1="78" y1="86" x2="36" y2="87" stroke="#ffffff" stroke-width="1.2" opacity="0.9" />
          <line x1="102" y1="83" x2="142" y2="78" stroke="#ffffff" stroke-width="1.2" opacity="0.9" />
          <line x1="102" y1="86" x2="144" y2="87" stroke="#ffffff" stroke-width="1.2" opacity="0.9" />
        </g>
      </g>
    </svg>
  `;
}

// 2. GROOMING CAT (Lifting Paw to Face, Cleaning Feet with Tongue!)
function renderGroomingCat(coat) {
  return `
    <svg class="pet-cat-svg cat-grooming" viewBox="0 0 180 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="186" rx="55" ry="9" fill="#000000" opacity="0.35" />

      <!-- Tail swishing lazily -->
      <path d="M 125 155 C 165 160 175 130 155 105 C 145 92 135 100 142 115 Z" 
            fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" class="cat-tail-groom" />

      <!-- Body tilted slightly -->
      <ellipse cx="62" cy="152" rx="26" ry="24" fill="${coat.body}" />
      <ellipse cx="118" cy="152" rx="26" ry="24" fill="${coat.body}" />
      <path d="M 68 100 C 60 140 62 170 90 174 C 118 170 120 140 114 100 Z" fill="${coat.body}" />
      <path d="M 76 102 C 70 125 72 150 90 156 C 108 150 110 125 104 102 Z" fill="${coat.belly}" />

      <!-- Left leg supporting on ground -->
      <rect x="94" y="128" width="13" height="46" rx="6" fill="${coat.body}" />
      <ellipse cx="100" cy="172" rx="8" ry="6" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1" />

      <!-- LIFTED PAW TO FACE -->
      <g class="cat-paw-raised">
        <path d="M 76 142 C 60 125 58 105 74 92" stroke="${coat.body}" stroke-width="14" stroke-linecap="round" fill="none" />
        <ellipse cx="76" cy="90" rx="9" ry="7" fill="${coat.belly}" stroke="${coat.accent}" stroke-width="1.5" />
        <!-- Pink toe beans -->
        <circle cx="76" cy="90" r="3" fill="${coat.pads}" />
        <circle cx="71" cy="85" r="1.5" fill="${coat.pads}" />
        <circle cx="76" cy="83" r="1.5" fill="${coat.pads}" />
        <circle cx="81" cy="85" r="1.5" fill="${coat.pads}" />
      </g>

      <!-- Head leaning down with active tongue -->
      <g class="cat-head-groom" transform="rotate(-12 85 76)">
        <polygon points="56,58 34,18 76,38" fill="${coat.accent}" />
        <polygon points="120,58 142,18 100,38" fill="${coat.accent}" />
        <ellipse cx="88" cy="74" rx="40" ry="30" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

        <!-- Blissful closed eyes -->
        <path d="M 64 68 Q 72 63 80 68" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 98 68 Q 106 63 114 68" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <polygon points="86,80 92,80 89,84" fill="${coat.nose}" />

        <!-- Rhythmic Licking Pink Tongue -->
        <g class="cat-tongue-anim">
          <path d="M 86 86 C 80 96 74 98 72 92 C 72 86 82 86 88 86 Z" fill="#ff70a6" stroke="#f43f5e" stroke-width="1" />
          <line x1="84" y1="87" x2="76" y2="92" stroke="#e11d48" stroke-width="1" />
        </g>
      </g>
    </svg>
  `;
}

// 3. WALKING CAT (Quadruped Prowl Gait)
function renderWalkingCat(coat) {
  return `
    <svg class="pet-cat-svg cat-walking" viewBox="0 0 200 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="168" rx="65" ry="8" fill="#000000" opacity="0.3" class="cat-shadow" />

      <!-- Swaying Tail in Air -->
      <path d="M 45 105 C 15 85 10 50 30 35 C 38 30 42 40 35 55 C 25 70 35 90 52 108 Z" 
            fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" class="cat-tail-walk" />

      <!-- Quadruped Walking Legs -->
      <g class="cat-walk-legs">
        <!-- Rear Left Leg -->
        <g class="leg-step-l">
          <path d="M 52 110 L 44 140 L 40 162" stroke="${coat.accent}" stroke-width="10" stroke-linecap="round" fill="none" />
          <ellipse cx="39" cy="164" rx="6" ry="4" fill="${coat.accent}" />
        </g>
        <!-- Front Left Leg -->
        <g class="leg-step-r">
          <path d="M 130 112 L 122 142 L 118 162" stroke="${coat.accent}" stroke-width="10" stroke-linecap="round" fill="none" />
          <ellipse cx="117" cy="164" rx="6" ry="4" fill="${coat.accent}" />
        </g>

        <!-- Torso -->
        <path d="M 50 100 C 65 92 120 92 140 100 C 145 118 135 130 110 128 C 80 128 55 125 48 110 Z" fill="${coat.body}" />
        <path d="M 80 94 Q 82 106 78 118" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 102 94 Q 104 106 100 118" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- Rear Right Leg -->
        <g class="leg-step-r">
          <path d="M 58 112 L 68 140 L 74 162" stroke="${coat.body}" stroke-width="11" stroke-linecap="round" fill="none" />
          <ellipse cx="75" cy="164" rx="7" ry="5" fill="${coat.body}" />
        </g>
        <!-- Front Right Leg -->
        <g class="leg-step-l">
          <path d="M 138 112 L 148 140 L 156 162" stroke="${coat.body}" stroke-width="11" stroke-linecap="round" fill="none" />
          <ellipse cx="158" cy="164" rx="7" ry="5" fill="${coat.body}" />
        </g>
      </g>

      <!-- Head Looking Forward -->
      <g class="cat-walk-head">
        <polygon points="144,70 148,40 162,60" fill="${coat.accent}" />
        <polygon points="172,70 182,40 186,60" fill="${coat.accent}" />
        <ellipse cx="165" cy="78" rx="26" ry="22" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />
        <ellipse cx="168" cy="74" rx="5" ry="6" fill="${coat.eyes}" />
        <ellipse cx="168" cy="74" rx="1.5" ry="4.5" fill="${coat.pupil}" />
        <ellipse cx="180" cy="82" rx="7" ry="5" fill="${coat.belly}" />
        <polygon points="184,80 188,80 186,83" fill="${coat.nose}" />
      </g>
    </svg>
  `;
}

// 4. SWATTING CAT (Reaching Out with Paw to Catch Cursor!)
function renderSwattingCat(coat, eyeOffset, swatAngle = 0) {
  return `
    <svg class="pet-cat-svg cat-swatting" viewBox="0 0 190 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="186" rx="55" ry="9" fill="#000000" opacity="0.35" />

      <!-- High Animated Tail Twitching -->
      <path d="M 125 155 C 160 165 175 110 155 80" stroke="${coat.accent}" stroke-width="8" stroke-linecap="round" fill="none" class="cat-tail-swat" />

      <!-- Crouching Predator Body -->
      <ellipse cx="62" cy="152" rx="26" ry="24" fill="${coat.body}" />
      <ellipse cx="118" cy="152" rx="26" ry="24" fill="${coat.body}" />
      <path d="M 64 100 C 60 140 60 170 90 174 C 120 170 120 140 114 100 Z" fill="${coat.body}" />
      <path d="M 76 102 C 70 125 72 150 90 156 C 108 150 110 125 104 102 Z" fill="${coat.belly}" />

      <!-- Left Leg on ground -->
      <rect x="70" y="130" width="13" height="42" rx="6" fill="${coat.body}" />
      <ellipse cx="76" cy="172" rx="8" ry="6" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1" />

      <!-- THE REACHING SWATTING PAW (Aims and Swipes toward Cursor!) -->
      <g class="cat-swat-paw-arm">
        <!-- Reaching forearm -->
        <path d="M 105 130 Q 128 115 142 95" stroke="${coat.body}" stroke-width="13" stroke-linecap="round" fill="none" />
        <!-- Swatting Front Paw with Outstretched Claws/Beans -->
        <ellipse cx="145" cy="92" rx="10" ry="8" fill="${coat.belly}" stroke="${coat.accent}" stroke-width="1.5" />
        <circle cx="145" cy="92" r="3" fill="${coat.pads}" />
        <circle cx="140" cy="86" r="1.5" fill="${coat.pads}" />
        <circle cx="146" cy="84" r="1.5" fill="${coat.pads}" />
        <circle cx="151" cy="87" r="1.5" fill="${coat.pads}" />
        <!-- Playful swipe trail -->
        <path d="M 152 82 Q 165 92 160 108" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.6" stroke-dasharray="3,3" />
      </g>

      <!-- Head with Big Dilated Hunting Eyes -->
      <g class="cat-head">
        <polygon points="58,58 36,18 78,38" fill="${coat.accent}" />
        <polygon points="122,58 144,18 102,38" fill="${coat.accent}" />
        <ellipse cx="90" cy="74" rx="42" ry="32" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

        <!-- Big Round Predatory Dilated Pupils Locked on Cursor -->
        <g transform="translate(${eyeOffset.x * 0.9}, ${eyeOffset.y * 0.9})">
          <circle cx="72" cy="68" r="7.5" fill="${coat.eyes}" />
          <circle cx="72" cy="68" r="6" fill="${coat.pupil}" />
          <circle cx="70" cy="65" r="2" fill="#ffffff" />

          <circle cx="108" cy="68" r="7.5" fill="${coat.eyes}" />
          <circle cx="108" cy="68" r="6" fill="${coat.pupil}" />
          <circle cx="106" cy="65" r="2" fill="#ffffff" />
        </g>

        <!-- Whiskers bristle forward -->
        <ellipse cx="84" cy="84" rx="8" ry="6" fill="${coat.belly}" />
        <ellipse cx="96" cy="84" rx="8" ry="6" fill="${coat.belly}" />
        <polygon points="87,79 93,79 90,83" fill="${coat.nose}" />
        <line x1="78" y1="83" x2="35" y2="80" stroke="#ffffff" stroke-width="1.2" />
        <line x1="102" y1="83" x2="145" y2="80" stroke="#ffffff" stroke-width="1.2" />
      </g>
    </svg>
  `;
}

// 5. CAT LOAF (Paws Tucked, Deep Purring Bliss)
function renderLoafCat(coat) {
  return `
    <svg class="pet-cat-svg cat-loaf" viewBox="0 0 180 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="148" rx="65" ry="10" fill="#000000" opacity="0.35" />

      <g class="cat-loaf-body">
        <path d="M 40 125 C 28 140 50 155 85 152 C 100 150 110 148 118 145" 
              stroke="${coat.accent}" stroke-width="9" stroke-linecap="round" fill="none" class="cat-tail-loaf" />

        <path d="M 45 130 C 35 110 40 85 70 80 C 100 75 125 75 145 90 C 155 105 155 130 145 142 C 125 150 60 150 45 130 Z" 
              fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

        <path d="M 75 80 Q 77 98 72 116" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 98 78 Q 100 98 95 118" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- Cozy Cat Head with Sleeping Eyes -->
        <g class="cat-loaf-head">
          <polygon points="120,68 110,38 135,52" fill="${coat.accent}" />
          <polygon points="152,72 165,42 160,62" fill="${coat.accent}" />
          <ellipse cx="140" cy="82" rx="26" ry="22" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

          <!-- Content Happy Curves ^ ^ -->
          <path d="M 128 78 Q 134 72 140 78" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <path d="M 148 80 Q 154 74 160 80" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <polygon points="144,87 148,87 146,90" fill="${coat.nose}" />
          <text x="160" y="55" fill="#f43f5e" font-family="sans-serif" font-size="14" font-weight="bold" class="zzz-anim">Zzz</text>
        </g>
      </g>
    </svg>
  `;
}
