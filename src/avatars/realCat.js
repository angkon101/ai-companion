/**
 * Realistic Animated Cat Component
 * Lifelike feline anatomy with Walking, Jumping/Pouncing, Paw Licking/Cleaning, and Fluid Tail Physics
 */

export function renderRealCat(catAction = 'idle', options = {}) {
  const {
    breed = 'tabby', // 'tabby' | 'calico' | 'void' | 'siamese'
    eyeOffset = { x: 0, y: 0 }
  } = options;

  // Coat Palette Definitions
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

  // Render based on Cat Action
  switch (catAction) {
    case 'lick_paw':
      return renderLickPawPose(coat, eyeOffset);
    case 'walk':
      return renderWalkingPose(coat);
    case 'jump':
      return renderJumpingPose(coat);
    case 'loaf':
      return renderLoafPose(coat);
    case 'idle':
    default:
      return renderSittingPose(coat, eyeOffset);
  }
}

// ============================================================================
// 1. SITTING / IDLE POSE (Fluid Tail Swishing, Eye Tracking, Ear Swivel)
// ============================================================================
function renderSittingPose(coat, eyeOffset) {
  return `
    <svg class="cat-svg cat-sitting" viewBox="0 0 180 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="catEyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
          <stop offset="50%" stop-color="${coat.eyes}" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.4" />
        </radialGradient>

        <filter id="catShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.35" />
        </filter>
      </defs>

      <!-- Floor Shadow -->
      <ellipse cx="90" cy="186" rx="55" ry="9" fill="#000000" opacity="0.3" class="cat-floor-shadow" />

      <!-- Fluid Tail Swishing (behind body) -->
      <g class="cat-tail-group">
        <path d="M 125 155 C 165 160 178 125 160 95 C 150 78 135 85 142 105 C 148 122 140 145 118 162 Z" 
              fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" class="cat-tail-swish" />
        <!-- Tail Tip Marking -->
        <circle cx="158" cy="92" r="7" fill="${coat.stripes}" opacity="0.6" />
      </g>

      <!-- Main Sitting Cat Body -->
      <g class="cat-sitting-body" filter="url(#catShadow)">
        <!-- Haunches / Hind Quarters -->
        <ellipse cx="62" cy="152" rx="26" ry="24" fill="${coat.body}" />
        <ellipse cx="118" cy="152" rx="26" ry="24" fill="${coat.body}" />
        
        <!-- Tabby Stripes on Hind Flanks -->
        <path d="M 42 144 Q 52 148 48 158" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 138 144 Q 128 148 132 158" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- Sitting Torso -->
        <path d="M 66 95 C 60 135 60 170 90 174 C 120 170 120 135 114 95 Z" fill="${coat.body}" />

        <!-- Cream Chest Bib / Belly Fur -->
        <path d="M 76 96 C 70 120 72 150 90 156 C 108 150 110 120 104 96 Z" fill="${coat.belly}" />

        <!-- Front Forelegs -->
        <rect x="74" y="125" width="13" height="48" rx="6" fill="${coat.body}" />
        <rect x="93" y="125" width="13" height="48" rx="6" fill="${coat.body}" />

        <!-- Front Paws with Toe Knuckles -->
        <ellipse cx="80" cy="172" rx="8" ry="6" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1" />
        <ellipse cx="100" cy="172" rx="8" ry="6" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1" />
        <line x1="78" y1="170" x2="78" y2="176" stroke="${coat.accent}" stroke-width="1" />
        <line x1="82" y1="170" x2="82" y2="176" stroke="${coat.accent}" stroke-width="1" />
        <line x1="98" y1="170" x2="98" y2="176" stroke="${coat.accent}" stroke-width="1" />
        <line x1="102" y1="170" x2="102" y2="176" stroke="${coat.accent}" stroke-width="1" />

        <!-- Cat Head Assembly (breathing & tracking) -->
        <g class="cat-head-group">
          <!-- Ears -->
          <g class="cat-ears">
            <!-- Left Ear with Twitch -->
            <g class="cat-ear-l">
              <polygon points="58,58 36,18 78,38" fill="${coat.accent}" stroke="#291102" stroke-width="1.5" stroke-linejoin="round" />
              <polygon points="56,52 44,25 72,38" fill="#fbcfe8" />
              <!-- Inner ear fur tufts -->
              <path d="M 48 38 Q 58 42 52 50" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" />
            </g>
            <!-- Right Ear with Twitch -->
            <g class="cat-ear-r">
              <polygon points="122,58 144,18 102,38" fill="${coat.accent}" stroke="#291102" stroke-width="1.5" stroke-linejoin="round" />
              <polygon points="124,52 136,25 108,38" fill="#fbcfe8" />
              <!-- Inner ear fur tufts -->
              <path d="M 132 38 Q 122 42 128 50" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" />
            </g>
          </g>

          <!-- Head Skull -->
          <ellipse cx="90" cy="74" rx="42" ry="32" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

          <!-- Forehead Tabby 'M' Marking -->
          <path d="M 80 50 L 85 60 L 90 52 L 95 60 L 100 50" stroke="${coat.stripes}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />

          <!-- Cheeks Fluff -->
          <path d="M 54 75 Q 46 86 58 92 Q 90 98 122 92 Q 134 86 126 75 Z" fill="${coat.body}" />

          <!-- Real Feline Eyes (Almond Shape with Slit Pupils Tracking Cursor) -->
          <g class="cat-eyes-pair" transform="translate(${eyeOffset.x * 0.7}, ${eyeOffset.y * 0.7})">
            <!-- Left Eye -->
            <g class="cat-eye-l">
              <path d="M 64 68 C 64 60 80 60 80 68 C 80 76 64 76 64 68 Z" fill="url(#catEyeGlow)" stroke="#0f172a" stroke-width="1.5" />
              <!-- Feline Vertical Slit Pupil -->
              <ellipse cx="72" cy="68" rx="2.2" ry="6" fill="${coat.pupil}" />
              <circle cx="70.5" cy="65.5" r="1.5" fill="#ffffff" />
            </g>

            <!-- Right Eye -->
            <g class="cat-eye-r">
              <path d="M 100 68 C 100 60 116 60 116 68 C 116 76 100 76 100 68 Z" fill="url(#catEyeGlow)" stroke="#0f172a" stroke-width="1.5" />
              <!-- Feline Vertical Slit Pupil -->
              <ellipse cx="108" cy="68" rx="2.2" ry="6" fill="${coat.pupil}" />
              <circle cx="106.5" cy="65.5" r="1.5" fill="#ffffff" />
            </g>
          </g>

          <!-- White Muzzle Pads -->
          <ellipse cx="84" cy="84" rx="8" ry="6" fill="${coat.belly}" />
          <ellipse cx="96" cy="84" rx="8" ry="6" fill="${coat.belly}" />

          <!-- Pink Nose -->
          <polygon points="87,79 93,79 90,83" fill="${coat.nose}" />
          <!-- Mouth -->
          <path d="M 85 86 Q 90 89 95 86" stroke="#4a2800" stroke-width="1.5" stroke-linecap="round" fill="none" />

          <!-- Long Realistic Whiskers -->
          <g class="cat-whiskers" stroke="#ffffff" stroke-width="1.2" opacity="0.9">
            <line x1="78" y1="83" x2="38" y2="78" />
            <line x1="78" y1="85" x2="36" y2="87" />
            <line x1="78" y1="88" x2="40" y2="96" />
            <line x1="102" y1="83" x2="142" y2="78" />
            <line x1="102" y1="85" x2="144" y2="87" />
            <line x1="102" y1="88" x2="140" y2="96" />
          </g>
        </g>
      </g>
    </svg>
  `;
}

// ============================================================================
// 2. PAW LICKING & GROOMING POSE (Cleaning Paw & Feet with Pink Tongue!)
// ============================================================================
function renderLickPawPose(coat, eyeOffset) {
  return `
    <svg class="cat-svg cat-licking-paw" viewBox="0 0 180 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Shadow -->
      <ellipse cx="90" cy="186" rx="55" ry="9" fill="#000000" opacity="0.3" class="cat-floor-shadow" />

      <!-- Tail swishing lazily while grooming -->
      <path d="M 125 155 C 165 160 175 130 155 105 C 145 92 135 100 142 115 Z" 
            fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" class="cat-tail-groom" />

      <g class="cat-grooming-body">
        <!-- Body sitting tilted back -->
        <ellipse cx="62" cy="152" rx="26" ry="24" fill="${coat.body}" />
        <ellipse cx="118" cy="152" rx="26" ry="24" fill="${coat.body}" />
        <path d="M 68 100 C 60 140 62 170 90 174 C 118 170 120 140 114 100 Z" fill="${coat.body}" />
        <path d="M 76 102 C 70 125 72 150 90 156 C 108 150 110 125 104 102 Z" fill="${coat.belly}" />

        <!-- Left resting paw on ground -->
        <rect x="94" y="128" width="13" height="46" rx="6" fill="${coat.body}" />
        <ellipse cx="100" cy="172" rx="8" ry="6" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1" />

        <!-- RAISED PAW BEING LICKED (lifted right up to face!) -->
        <g class="cat-raised-paw-group">
          <!-- Foreleg curved up toward chin -->
          <path d="M 76 142 C 60 125 58 105 74 92" stroke="${coat.body}" stroke-width="14" stroke-linecap="round" fill="none" />
          <!-- The Raised Paw Pad facing mouth -->
          <ellipse cx="76" cy="90" rx="9" ry="7" fill="${coat.belly}" stroke="${coat.accent}" stroke-width="1.5" />
          <!-- Pink Paw Toe Beans / Pad -->
          <circle cx="76" cy="90" r="3" fill="${coat.pads}" />
          <circle cx="71" cy="85" r="1.5" fill="${coat.pads}" />
          <circle cx="76" cy="83" r="1.5" fill="${coat.pads}" />
          <circle cx="81" cy="85" r="1.5" fill="${coat.pads}" />
        </g>

        <!-- Head tilted down toward paw to lick -->
        <g class="cat-head-grooming" transform="rotate(-12 85 76)">
          <!-- Ears -->
          <polygon points="56,58 34,18 76,38" fill="${coat.accent}" />
          <polygon points="120,58 142,18 100,38" fill="${coat.accent}" />
          <!-- Head -->
          <ellipse cx="88" cy="74" rx="40" ry="30" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

          <!-- Blissful Half-Closed Grooming Eyes -->
          <path d="M 64 68 Q 72 63 80 68" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <path d="M 98 68 Q 106 63 114 68" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />

          <!-- Nose -->
          <polygon points="86,80 92,80 89,84" fill="${coat.nose}" />

          <!-- ANIMATED PINK TONGUE LICKING PAW! -->
          <g class="cat-tongue-licking">
            <path d="M 86 86 C 80 96 74 98 72 92 C 72 86 82 86 88 86 Z" fill="#ff70a6" stroke="#f43f5e" stroke-width="1" />
            <line x1="84" y1="87" x2="76" y2="92" stroke="#e11d48" stroke-width="1" />
          </g>

          <!-- Whiskers -->
          <line x1="76" y1="83" x2="40" y2="78" stroke="#ffffff" stroke-width="1.2" opacity="0.8" />
          <line x1="76" y1="86" x2="38" y2="88" stroke="#ffffff" stroke-width="1.2" opacity="0.8" />
          <line x1="102" y1="83" x2="138" y2="78" stroke="#ffffff" stroke-width="1.2" opacity="0.8" />
          <line x1="102" y1="86" x2="140" y2="88" stroke="#ffffff" stroke-width="1.2" opacity="0.8" />
        </g>
      </g>
    </svg>
  `;
}

// ============================================================================
// 3. WALKING CYCLE POSE (Natural Quadruped Lateral Gait)
// ============================================================================
function renderWalkingPose(coat) {
  return `
    <svg class="cat-svg cat-walking" viewBox="0 0 200 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Ground Shadow that scales with walk -->
      <ellipse cx="100" cy="168" rx="65" ry="8" fill="#000000" opacity="0.3" class="cat-walk-shadow" />

      <!-- Walking Tail swaying in air -->
      <path d="M 45 105 C 15 85 10 50 30 35 C 38 30 42 40 35 55 C 25 70 35 90 52 108 Z" 
            fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" class="cat-tail-walk" />

      <!-- Walking Quadruped Body -->
      <g class="cat-walk-body-group">
        <!-- Rear Left Leg (Stepping back) -->
        <g class="cat-leg-back-l">
          <path d="M 52 110 L 44 140 L 40 162" stroke="${coat.accent}" stroke-width="10" stroke-linecap="round" fill="none" />
          <ellipse cx="39" cy="164" rx="6" ry="4" fill="${coat.accent}" />
        </g>

        <!-- Front Left Leg (Stepping back) -->
        <g class="cat-leg-front-l">
          <path d="M 130 112 L 122 142 L 118 162" stroke="${coat.accent}" stroke-width="10" stroke-linecap="round" fill="none" />
          <ellipse cx="117" cy="164" rx="6" ry="4" fill="${coat.accent}" />
        </g>

        <!-- Cat Torso (Long horizontal feline spine) -->
        <path d="M 50 100 C 65 92 120 92 140 100 C 145 118 135 130 110 128 C 80 128 55 125 48 110 Z" fill="${coat.body}" />
        <!-- Tabby Stripes across back -->
        <path d="M 80 94 Q 82 106 78 118" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 102 94 Q 104 106 100 118" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 122 95 Q 124 106 120 116" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- Rear Right Leg (Stepping forward) -->
        <g class="cat-leg-back-r">
          <path d="M 58 112 L 68 140 L 74 162" stroke="${coat.body}" stroke-width="11" stroke-linecap="round" fill="none" />
          <ellipse cx="75" cy="164" rx="7" ry="5" fill="${coat.body}" />
        </g>

        <!-- Front Right Leg (Stepping forward) -->
        <g class="cat-leg-front-r">
          <path d="M 138 112 L 148 140 L 156 162" stroke="${coat.body}" stroke-width="11" stroke-linecap="round" fill="none" />
          <ellipse cx="158" cy="164" rx="7" ry="5" fill="${coat.body}" />
        </g>

        <!-- Head (facing forward while walking) -->
        <g class="cat-walk-head">
          <polygon points="144,70 148,40 162,60" fill="${coat.accent}" />
          <polygon points="172,70 182,40 186,60" fill="${coat.accent}" />
          <ellipse cx="165" cy="78" rx="26" ry="22" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />
          
          <!-- Eyes Looking Ahead -->
          <ellipse cx="168" cy="74" rx="5" ry="6" fill="${coat.eyes}" />
          <ellipse cx="168" cy="74" rx="1.5" ry="4.5" fill="${coat.pupil}" />
          <circle cx="166.5" cy="72" r="1.5" fill="#ffffff" />
          
          <!-- Snout & Whiskers -->
          <ellipse cx="180" cy="82" rx="7" ry="5" fill="${coat.belly}" />
          <polygon points="184,80 188,80 186,83" fill="${coat.nose}" />
          <line x1="184" y1="81" x2="200" y2="78" stroke="#ffffff" stroke-width="1" />
          <line x1="184" y1="83" x2="202" y2="84" stroke="#ffffff" stroke-width="1" />
        </g>
      </g>
    </svg>
  `;
}

// ============================================================================
// 4. JUMPING / POUNCING POSE (Pre-pounce Butt Wiggle & High Leap!)
// ============================================================================
function renderJumpingPose(coat) {
  return `
    <svg class="cat-svg cat-jumping" viewBox="0 0 180 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Shadow shrinking during jump -->
      <ellipse cx="90" cy="182" rx="35" ry="6" fill="#000000" opacity="0.25" class="cat-jump-shadow" />

      <!-- Cat in Full Airborne Pounce! -->
      <g class="cat-pounce-airborne">
        <!-- Straight Tail for Aerodynamic Balance -->
        <path d="M 45 135 C 20 155 10 165 5 180" stroke="${coat.accent}" stroke-width="8" stroke-linecap="round" fill="none" class="cat-tail-jump" />

        <!-- Extended Rear Legs -->
        <g class="cat-jump-hindlegs">
          <path d="M 60 120 L 45 150 L 35 168" stroke="${coat.body}" stroke-width="11" stroke-linecap="round" fill="none" />
          <ellipse cx="34" cy="170" rx="6" ry="5" fill="${coat.pads}" />
        </g>

        <!-- Torso Arching Upward -->
        <path d="M 52 120 C 65 95 105 75 125 65 C 135 80 120 110 85 125 Z" fill="${coat.body}" />
        <path d="M 68 115 C 80 95 110 80 124 72 C 120 95 95 115 75 122 Z" fill="${coat.belly}" />

        <!-- Outstretched Front Paws with Claws / Toe Beans -->
        <g class="cat-jump-frontlegs">
          <path d="M 115 72 L 145 48 L 160 38" stroke="${coat.body}" stroke-width="10" stroke-linecap="round" fill="none" />
          <!-- Outstretched Front Paw with Toe Pads -->
          <ellipse cx="162" cy="36" rx="7" ry="6" fill="${coat.belly}" stroke="${coat.accent}" stroke-width="1.5" />
          <circle cx="162" cy="36" r="2.5" fill="${coat.pads}" />
        </g>

        <!-- Intense Focused Pounce Head -->
        <g class="cat-jump-head">
          <!-- Ears Pinned Back Playfully (Airplane Ears) -->
          <polygon points="112,52 90,44 116,36" fill="${coat.accent}" />
          <polygon points="128,48 118,24 138,32" fill="${coat.accent}" />
          
          <ellipse cx="132" cy="56" rx="22" ry="19" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

          <!-- Big Dilated Excited Predatory Eyes -->
          <circle cx="138" cy="52" r="7" fill="${coat.eyes}" />
          <circle cx="138" cy="52" r="5.5" fill="${coat.pupil}" />
          <circle cx="136" cy="49" r="2" fill="#ffffff" />

          <!-- Cute Determined Snout -->
          <ellipse cx="148" cy="62" rx="6" ry="4.5" fill="${coat.belly}" />
          <polygon points="151,60 154,60 153,63" fill="${coat.nose}" />
          <!-- Whiskers pointing forward in hunting mode -->
          <line x1="150" y1="62" x2="175" y2="56" stroke="#ffffff" stroke-width="1.2" />
          <line x1="150" y1="64" x2="176" y2="66" stroke="#ffffff" stroke-width="1.2" />
        </g>
      </g>
    </svg>
  `;
}

// ============================================================================
// 5. CAT LOAF POSE (Tucked Paws, Curled Tail, Deep Purring Bliss)
// ============================================================================
function renderLoafPose(coat) {
  return `
    <svg class="cat-svg cat-loaf" viewBox="0 0 180 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Shadow -->
      <ellipse cx="90" cy="148" rx="65" ry="10" fill="#000000" opacity="0.35" class="cat-loaf-shadow" />

      <!-- Loaf Body (All paws completely tucked in underneath!) -->
      <g class="cat-loaf-body-group">
        <!-- Tail Wrapped Neatly Around Hip -->
        <path d="M 40 125 C 28 140 50 155 85 152 C 100 150 110 148 118 145" 
              stroke="${coat.accent}" stroke-width="9" stroke-linecap="round" fill="none" class="cat-tail-loaf" />

        <!-- The Bread Loaf Shape -->
        <path d="M 45 130 C 35 110 40 85 70 80 C 100 75 125 75 145 90 C 155 105 155 130 145 142 C 125 150 60 150 45 130 Z" 
              fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

        <!-- Tabby Stripes along Loaf Back -->
        <path d="M 75 80 Q 77 98 72 116" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 98 78 Q 100 98 95 118" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 120 82 Q 122 98 118 116" stroke="${coat.stripes}" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- Cozy Cat Head Tucked against Body -->
        <g class="cat-loaf-head">
          <polygon points="120,68 110,38 135,52" fill="${coat.accent}" />
          <polygon points="152,72 165,42 160,62" fill="${coat.accent}" />
          
          <ellipse cx="140" cy="82" rx="26" ry="22" fill="${coat.body}" stroke="${coat.accent}" stroke-width="1.5" />

          <!-- Peaceful Sleeping Closed Eye Curves (^ ^) -->
          <path d="M 128 78 Q 134 72 140 78" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <path d="M 148 80 Q 154 74 160 80" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none" />

          <!-- Nose -->
          <polygon points="144,87 148,87 146,90" fill="${coat.nose}" />
          <!-- Floating Zzz -->
          <text x="160" y="55" fill="#f43f5e" font-family="sans-serif" font-size="14" font-weight="bold" class="zzz-anim">Zzz</text>
        </g>
      </g>
    </svg>
  `;
}
