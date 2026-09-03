/**
 * Anatomically Accurate Calico Cat Renderer
 * Designed with precise feline body ratios, digitigrade joint articulation,
 * authentic calico patchwork (orange, black, white socks, dual-tone toe beans),
 * and realistic skeletal geometry.
 */

export function renderAnatomicalCalico(state = 'idle', options = {}) {
  const {
    eyeOffset = { x: 0, y: 0 },
    facing = 1
  } = options;

  switch (state) {
    case 'grooming':
      return renderCalicoGrooming(eyeOffset);
    case 'walking':
      return renderCalicoWalking();
    case 'swatting':
      return renderCalicoSwatting(eyeOffset);
    case 'loaf':
      return renderCalicoLoaf();
    case 'idle':
    case 'standing':
    default:
      return renderCalicoSitting(eyeOffset);
  }
}

// ============================================================================
// 1. ANATOMICALLY ACCURATE CALICO: SITTING POSE
// Features: Digitigrade hock joint, scapula slope, antihelix ear slit (Henry's pocket),
// malar cheek bones, whisker pads, almond eyes with canthal tilt, and calico patches.
// ============================================================================
function renderCalicoSitting(eyeOffset) {
  return `
    <svg class="pet-cat-svg calico-sitting" viewBox="0 0 220 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Emerald Iris Gradient with Depth & Limbal Ring -->
        <radialGradient id="calicoEyeGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#a7f3d0" />
          <stop offset="35%" stop-color="#34d399" />
          <stop offset="70%" stop-color="#059669" />
          <stop offset="100%" stop-color="#022c22" />
        </radialGradient>

        <!-- Shading for 3D Musculature -->
        <linearGradient id="furWhiteShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="75%" stop-color="#f1f5f9" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </linearGradient>

        <filter id="naturalShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.38" />
        </filter>
      </defs>

      <!-- Ambient Ground Contact Shadow -->
      <ellipse cx="110" cy="222" rx="72" ry="11" fill="#000000" opacity="0.32" class="cat-shadow" />

      <!-- TAIL: Fluid coccygeal vertebral spline with Calico rings -->
      <g class="calico-tail-wrap">
        <!-- Base curve wrapping around right flank to paw -->
        <path d="M 152 188 C 196 195 214 150 192 110 C 180 88 162 96 170 120 C 178 142 168 174 140 196 Z" 
              fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2" class="cat-tail-swish" />
        <!-- Orange patch on tail -->
        <path d="M 194 155 C 205 138 198 120 185 110 C 178 118 184 135 194 155 Z" fill="#ea580c" />
        <!-- Black tip on tail -->
        <path d="M 188 114 C 180 88 162 96 170 120 C 174 116 182 114 188 114 Z" fill="#1e293b" />
      </g>

      <!-- SITTING FELINE BODY ASSEMBLY -->
      <g class="calico-skeleton" filter="url(#naturalShadow)">
        
        <!-- HINDQUARTERS & HOCK JOINTS (Anatomically Folded Digitigrade Legs) -->
        <!-- Left Flank & Hock -->
        <path d="M 52 145 C 38 160 40 195 62 208 C 78 214 88 200 84 175 C 80 152 66 140 52 145 Z" fill="#1e293b" />
        <!-- Left Hock Joint Knuckle -->
        <ellipse cx="50" cy="192" rx="10" ry="16" fill="#1e293b" transform="rotate(-15 50 192)" />

        <!-- Right Flank & Hock (Orange Ginger Patch) -->
        <path d="M 168 145 C 182 160 180 195 158 208 C 142 214 132 200 136 175 C 140 152 154 140 168 145 Z" fill="#ea580c" />
        <!-- Right Hock Joint Knuckle -->
        <ellipse cx="170" cy="192" rx="10" ry="16" fill="#ea580c" transform="rotate(15 170 192)" />

        <!-- MAIN TORSO (Muscular Spine, Ribcage & Primordial Belly Pouch) -->
        <!-- Torso Base (White fur) -->
        <path d="M 80 115 C 68 145 68 192 110 200 C 152 192 152 145 140 115 C 130 92 90 92 80 115 Z" fill="url(#furWhiteShadow)" />
        
        <!-- Calico Saddle Markings (Black patch on left shoulder, Ginger on right rib) -->
        <path d="M 78 122 C 70 140 75 168 92 170 C 85 150 82 130 78 122 Z" fill="#1e293b" />
        <path d="M 142 125 C 150 142 146 172 128 174 C 136 152 138 132 142 125 Z" fill="#ea580c" />
        
        <!-- Immaculate White Chest Bib -->
        <path d="M 94 105 C 88 125 90 165 110 174 C 130 165 132 125 126 105 C 120 98 100 98 94 105 Z" fill="#ffffff" />

        <!-- FORELEGS: Scapula -> Humerus -> Radius/Ulna -> Carpal (Wrist) -> Metacarpals -->
        <!-- Left Foreleg -->
        <path d="M 92 145 L 90 198 L 88 208" stroke="#ffffff" stroke-width="15" stroke-linecap="round" fill="none" />
        <path d="M 92 145 L 90 198 L 88 208" stroke="#e2e8f0" stroke-width="1.5" fill="none" />
        
        <!-- Right Foreleg -->
        <path d="M 128 145 L 130 198 L 132 208" stroke="#ffffff" stroke-width="15" stroke-linecap="round" fill="none" />
        <path d="M 128 145 L 130 198 L 132 208" stroke="#e2e8f0" stroke-width="1.5" fill="none" />

        <!-- FOREPAWS: Digitigrade Metacarpal Arch & 4 Digital Toe Pads -->
        <!-- Left Paw -->
        <g class="calico-paw-l">
          <ellipse cx="88" cy="210" rx="10" ry="7" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
          <!-- Subtle Knuckle Creases -->
          <line x1="84" y1="207" x2="84" y2="214" stroke="#94a3b8" stroke-width="1" />
          <line x1="88" y1="206" x2="88" y2="215" stroke="#94a3b8" stroke-width="1" />
          <line x1="92" y1="207" x2="92" y2="214" stroke="#94a3b8" stroke-width="1" />
        </g>
        
        <!-- Right Paw -->
        <g class="calico-paw-r">
          <ellipse cx="132" cy="210" rx="10" ry="7" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
          <!-- Subtle Knuckle Creases -->
          <line x1="128" y1="207" x2="128" y2="214" stroke="#94a3b8" stroke-width="1" />
          <line x1="132" y1="206" x2="132" y2="215" stroke="#94a3b8" stroke-width="1" />
          <line x1="136" y1="207" x2="136" y2="214" stroke="#94a3b8" stroke-width="1" />
        </g>

        <!-- FELINE HEAD & CRANIAL STRUCTURE -->
        <g class="calico-head-assembly">
          
          <!-- EARS: Anatomical Cartilage with Henry's Pocket (outer notch) & Fur Tufts -->
          <!-- Left Ear (Black Calico Patch) -->
          <g class="ear-left-group">
            <path d="M 72 68 C 66 45 42 12 40 10 C 62 18 92 36 94 48 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.2" />
            <!-- Inner Ear Cavity -->
            <path d="M 68 60 C 62 45 48 24 46 22 C 60 28 80 40 82 48 Z" fill="#fbcfe8" opacity="0.9" />
            <!-- Henry's Pocket Notch on Outer Margin -->
            <path d="M 45 32 Q 40 36 43 42" stroke="#0f172a" stroke-width="1.5" fill="none" />
            <!-- Inner Fur Tufts -->
            <path d="M 52 38 Q 66 42 58 54" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" />
            <path d="M 58 32 Q 72 38 64 48" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" />
          </g>

          <!-- Right Ear (Orange Calico Patch) -->
          <g class="ear-right-group">
            <path d="M 148 68 C 154 45 178 12 180 10 C 158 18 128 36 126 48 Z" fill="#ea580c" stroke="#9a3412" stroke-width="1.2" />
            <!-- Inner Ear Cavity -->
            <path d="M 152 60 C 158 45 172 24 174 22 C 160 28 140 40 138 48 Z" fill="#fbcfe8" opacity="0.9" />
            <!-- Henry's Pocket Notch on Outer Margin -->
            <path d="M 175 32 Q 180 36 177 42" stroke="#9a3412" stroke-width="1.5" fill="none" />
            <!-- Inner Fur Tufts -->
            <path d="M 168 38 Q 154 42 162 54" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" />
            <path d="M 162 32 Q 148 38 156 48" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" />
          </g>

          <!-- SKULL: Cranial Dome, Malar Cheeks & Muzzle Wedge -->
          <ellipse cx="110" cy="85" rx="46" ry="34" fill="#ffffff" />
          
          <!-- Asymmetrical Calico Head Patches -->
          <!-- Black Patch over left forehead & cheek -->
          <path d="M 68 70 C 64 88 78 108 96 102 C 88 85 80 72 68 70 Z" fill="#1e293b" />
          <!-- Orange Patch over right forehead -->
          <path d="M 152 70 C 156 88 142 108 124 102 C 132 85 140 72 152 70 Z" fill="#ea580c" />
          <!-- Crisp White Blaze running down between eyes -->
          <path d="M 110 52 L 102 82 L 118 82 Z" fill="#ffffff" />

          <!-- EYES: Anatomical Almond Contour, Medial Canthus Angle, Emerald Depth & Feline Slit -->
          <g class="feline-eyes-rig" transform="translate(${eyeOffset.x * 0.75}, ${eyeOffset.y * 0.75})">
            <!-- Left Eye -->
            <g class="eye-l">
              <!-- Black Eyeliner Rim & Canthal Tilt -->
              <path d="M 80 82 C 78 72 96 71 100 81 C 102 89 84 90 80 82 Z" fill="#0f172a" />
              <!-- Sclera & Iris -->
              <path d="M 82 82 C 81 74 95 73 98 81 C 99 87 85 88 82 82 Z" fill="url(#calicoEyeGrad)" />
              <!-- Vertical Slit Feline Pupil -->
              <ellipse cx="90" cy="81" rx="2.5" ry="6.2" fill="#022c22" />
              <!-- Cornea Specular Highlight -->
              <circle cx="88.5" cy="78.5" r="1.8" fill="#ffffff" />
              <circle cx="92" cy="83" r="0.8" fill="#ffffff" opacity="0.8" />
            </g>

            <!-- Right Eye -->
            <g class="eye-r">
              <!-- Black Eyeliner Rim & Canthal Tilt -->
              <path d="M 140 82 C 142 72 124 71 120 81 C 118 89 136 90 140 82 Z" fill="#0f172a" />
              <!-- Sclera & Iris -->
              <path d="M 138 82 C 139 74 125 73 122 81 C 121 87 135 88 138 82 Z" fill="url(#calicoEyeGrad)" />
              <!-- Vertical Slit Feline Pupil -->
              <ellipse cx="130" cy="81" rx="2.5" ry="6.2" fill="#022c22" />
              <!-- Cornea Specular Highlight -->
              <circle cx="128.5" cy="78.5" r="1.8" fill="#ffffff" />
              <circle cx="132" cy="83" r="0.8" fill="#ffffff" opacity="0.8" />
            </g>
          </g>

          <!-- MUZZLE: Whisker Pads (Mystacial Pads), Nose Leather, Philtrum & Mouth -->
          <!-- Puffy White Whisker Pads -->
          <ellipse cx="102" cy="98" rx="10" ry="7.5" fill="#ffffff" stroke="#f1f5f9" stroke-width="1" />
          <ellipse cx="118" cy="98" rx="10" ry="7.5" fill="#ffffff" stroke="#f1f5f9" stroke-width="1" />
          
          <!-- Two-tone Calico Leather Nose (Pink with cute slate freckle) -->
          <polygon points="106,91 114,91 110,97" fill="#fb7185" stroke="#f43f5e" stroke-width="0.8" stroke-linejoin="round" />
          <circle cx="108" cy="92" r="1" fill="#475569" /> <!-- cute nose freckle! -->
          
          <!-- Philtrum & Mouth Crease -->
          <line x1="110" y1="97" x2="110" y2="100" stroke="#4a2800" stroke-width="1.2" />
          <path d="M 103 100 Q 110 103 117 100" stroke="#4a2800" stroke-width="1.4" stroke-linecap="round" fill="none" />
          <path d="M 107 103 Q 110 105 113 103" stroke="#cbd5e1" stroke-width="1" stroke-linecap="round" fill="none" />

          <!-- WHISKERS: Fine, Tapered, Sweeping Vibrissae from Whisker Follicles -->
          <g class="calico-whiskers" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity="0.95">
            <!-- Left Whiskers -->
            <path d="M 96 96 C 75 92 48 88 20 86" />
            <path d="M 96 98 C 72 98 44 99 18 103" />
            <path d="M 96 101 C 74 104 50 112 24 122" />
            <!-- Right Whiskers -->
            <path d="M 124 96 C 145 92 172 88 200 86" />
            <path d="M 124 98 C 148 98 176 99 202 103" />
            <path d="M 124 101 C 146 104 170 112 196 122" />
            <!-- Eyebrow Vibrissae -->
            <path d="M 86 70 C 78 58 64 48 52 46" stroke-width="0.9" />
            <path d="M 134 70 C 142 58 156 48 168 46" stroke-width="0.9" />
          </g>

        </g>
      </g>
    </svg>
  `;
}

// ============================================================================
// 2. ANATOMICALLY ACCURATE CALICO: SELF-GROOMING / PAW LICKING
// Features: Foreleg flexed at carpus (wrist) and elbow, paw pads turned toward mouth,
// head angled down, animated textured pink tongue actively licking the pads!
// ============================================================================
function renderCalicoGrooming(eyeOffset) {
  return `
    <svg class="pet-cat-svg calico-grooming" viewBox="0 0 220 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="110" cy="222" rx="72" ry="11" fill="#000000" opacity="0.32" />

      <!-- Lazy Tail Swish while grooming -->
      <path d="M 152 188 C 196 195 210 160 190 130 C 178 112 165 120 172 140 Z" 
            fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2" class="cat-tail-groom" />

      <!-- Body Sitting Back -->
      <g class="calico-body-grooming">
        <!-- Hindquarter pads -->
        <path d="M 52 145 C 38 160 40 195 62 208 C 78 214 88 200 84 175 Z" fill="#1e293b" />
        <path d="M 168 145 C 182 160 180 195 158 208 C 142 214 132 200 136 175 Z" fill="#ea580c" />
        
        <!-- Torso -->
        <path d="M 80 120 C 68 150 70 192 110 200 C 150 192 152 150 140 120 Z" fill="#ffffff" />
        <path d="M 142 130 C 150 148 146 174 128 176 Z" fill="#ea580c" />

        <!-- Supporting Right Foreleg on ground -->
        <path d="M 128 150 L 130 198 L 132 208" stroke="#ffffff" stroke-width="15" stroke-linecap="round" fill="none" />
        <ellipse cx="132" cy="210" rx="10" ry="7" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />

        <!-- RAISED GROOMING FORELEG (Anatomically flexed wrist & carpal joint) -->
        <g class="calico-raised-limb">
          <!-- Radius & Ulna curving upward to mouth -->
          <path d="M 94 165 C 72 148 68 125 86 108" stroke="#ffffff" stroke-width="15" stroke-linecap="round" fill="none" />
          
          <!-- Carpus (Wrist) & Metacarpal Pad Facing Chin -->
          <g class="calico-licked-paw">
            <ellipse cx="90" cy="106" rx="11" ry="8.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
            <!-- Two-Tone Calico Toe Beans (Pink and slate black pads!) -->
            <ellipse cx="90" cy="106" rx="4" ry="3.5" fill="#fb7185" />
            <circle cx="84" cy="100" r="2" fill="#fb7185" />
            <circle cx="89" cy="98" r="2" fill="#334155" /> <!-- slate bean! -->
            <circle cx="95" cy="100" r="2" fill="#fb7185" />
            <circle cx="81" cy="108" r="1.5" fill="#fb7185" /> <!-- carpal pad -->
          </g>
        </g>

        <!-- HEAD TILTED DOWNWARD WITH PINK TONGUE LICKING PAW! -->
        <g class="calico-grooming-head" transform="rotate(-14 105 88)">
          <!-- Ears -->
          <path d="M 68 68 C 62 45 38 12 36 10 C 58 18 88 36 90 48 Z" fill="#1e293b" />
          <path d="M 144 68 C 150 45 174 12 176 10 C 154 18 124 36 122 48 Z" fill="#ea580c" />
          
          <!-- Skull -->
          <ellipse cx="106" cy="85" rx="44" ry="32" fill="#ffffff" />
          <path d="M 66 70 C 62 88 74 108 92 102 Z" fill="#1e293b" />
          <path d="M 148 70 C 152 88 138 108 120 102 Z" fill="#ea580c" />

          <!-- Half-Closed Blissful Feline Grooming Eyes -->
          <path d="M 78 82 Q 88 76 98 82" stroke="#0f172a" stroke-width="2.6" stroke-linecap="round" fill="none" />
          <path d="M 118 82 Q 128 76 138 82" stroke="#0f172a" stroke-width="2.6" stroke-linecap="round" fill="none" />

          <!-- Pink Nose -->
          <polygon points="102,91 110,91 106,97" fill="#fb7185" />

          <!-- ANIMATED PINK TONGUE LICKING CARPAL PAD -->
          <g class="calico-tongue-anim">
            <path d="M 103 98 C 96 112 88 115 85 107 C 85 99 98 98 105 98 Z" fill="#ff70a6" stroke="#f43f5e" stroke-width="1.2" />
            <line x1="100" y1="100" x2="90" y2="108" stroke="#e11d48" stroke-width="1.2" />
          </g>

          <!-- Sweeping Whiskers -->
          <line x1="94" y1="96" x2="52" y2="88" stroke="#ffffff" stroke-width="1.1" opacity="0.9" />
          <line x1="94" y1="99" x2="48" y2="102" stroke="#ffffff" stroke-width="1.1" opacity="0.9" />
          <line x1="120" y1="96" x2="162" y2="88" stroke="#ffffff" stroke-width="1.1" opacity="0.9" />
          <line x1="120" y1="99" x2="166" y2="102" stroke="#ffffff" stroke-width="1.1" opacity="0.9" />
        </g>
      </g>
    </svg>
  `;
}

// ============================================================================
// 3. ANATOMICALLY ACCURATE CALICO: WALKING PROWL
// Features: Digitigrade 4-beat stride, free-floating scapula elevation,
// primordial pouch sway, S-curved counterbalance tail, alert sensory whiskers.
// ============================================================================
function renderCalicoWalking() {
  return `
    <svg class="pet-cat-svg calico-walking" viewBox="0 0 250 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Ground Contact Shadow (moves with gait) -->
      <ellipse cx="125" cy="186" rx="90" ry="10" fill="#000000" opacity="0.32" class="cat-walk-shadow" />

      <!-- TAIL: S-Curved Dynamic Ballast & Gyroscopic Counterweight -->
      <g class="calico-tail-walking">
        <path d="M 52 118 C 18 92 8 48 34 32 C 45 25 50 38 42 58 C 28 78 42 102 62 120 Z" 
              fill="#ea580c" stroke="#9a3412" stroke-width="1.2" class="cat-tail-walk" />
        <!-- Tail black ring marking -->
        <path d="M 38 34 C 44 26 48 35 44 45 C 38 46 34 40 38 34 Z" fill="#1e293b" />
      </g>

      <!-- FELINE WALKING SKELETAL RIG -->
      <g class="calico-walk-skeleton">
        
        <!-- ================= REAR FAR LIMB (Left Hind: 5-Section Biomechanics) ================= -->
        <g class="limb-hind-l">
          <!-- Section 1 & 2: Pelvis & Femur (Thigh) -->
          <g class="joint-hip-l">
            <path d="M 64 120 L 52 142" stroke="#1e293b" stroke-width="14" stroke-linecap="round" fill="none" />
            <!-- Stifle (True Knee) Joint -->
            <circle cx="52" cy="142" r="5.5" fill="#1e293b" />
            <!-- Section 3: Tibia/Fibula (Crus/Shank) -->
            <g class="joint-knee-l">
              <path d="M 52 142 L 42 165" stroke="#1e293b" stroke-width="12" stroke-linecap="round" fill="none" />
              <!-- Section 4: HOCK Joint (The Elevated Ankle / Calcaneus) -->
              <g class="joint-hock-l">
                <circle cx="42" cy="165" r="5" fill="#1e293b" />
                <!-- Section 4 & 5: Metatarsus & Phalanges (Toe Digits & White Sock) -->
                <path d="M 42 165 L 38 182" stroke="#1e293b" stroke-width="10" stroke-linecap="round" fill="none" />
                <ellipse cx="37" cy="184" rx="7.5" ry="5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
              </g>
            </g>
          </g>
        </g>

        <!-- ================= FRONT FAR LIMB (Left Fore: 5-Section Biomechanics) ================= -->
        <g class="limb-fore-l">
          <!-- Section 1 & 2: Scapula & Humerus (Upper Arm) -->
          <g class="joint-shoulder-l">
            <path d="M 154 120 L 146 146" stroke="#ffffff" stroke-width="14" stroke-linecap="round" fill="none" />
            <!-- Elbow Joint -->
            <circle cx="146" cy="146" r="5" fill="#e2e8f0" />
            <!-- Section 3: Radius & Ulna (Forearm) -->
            <g class="joint-elbow-l">
              <path d="M 146 146 L 140 166" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none" />
              <!-- Section 4: Carpus (Wrist Joint & Pastern) -->
              <g class="joint-wrist-l">
                <circle cx="140" cy="166" r="4.5" fill="#e2e8f0" />
                <!-- Section 5: Digitigrade Forepaw with Pink Toe Beans -->
                <path d="M 140 166 L 136 182" stroke="#ffffff" stroke-width="10" stroke-linecap="round" fill="none" />
                <ellipse cx="135" cy="184" rx="8" ry="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
              </g>
            </g>
          </g>
        </g>

        <!-- ================= TORSO & PRIMORDIAL POUCH ================= -->
        <g class="cat-torso-walk">
          <path d="M 56 114 C 74 102 144 102 170 114 C 176 136 162 152 134 148 C 98 148 64 144 54 125 Z" fill="#ffffff" />
          <path d="M 76 142 C 95 154 122 153 140 144 C 125 156 90 158 76 142 Z" fill="#f1f5f9" class="cat-primordial-pouch" />
          <path d="M 72 108 C 88 104 104 114 98 136 C 82 138 68 128 72 108 Z" fill="#1e293b" />
          <path d="M 126 106 C 145 106 156 118 152 140 C 135 142 122 128 126 106 Z" fill="#ea580c" />
        </g>

        <!-- ================= REAR NEAR LIMB (Right Hind: 5-Section Biomechanics) ================= -->
        <g class="limb-hind-r">
          <!-- Section 1 & 2: Pelvis & Muscular Ginger Femur -->
          <g class="joint-hip-r">
            <path d="M 72 118 L 80 144" stroke="#ea580c" stroke-width="15" stroke-linecap="round" fill="none" />
            <!-- Stifle (Knee) Joint -->
            <circle cx="80" cy="144" r="6" fill="#ea580c" />
            <!-- Section 3: Tibia/Fibula (Shank) -->
            <g class="joint-knee-r">
              <path d="M 80 144 L 88 166" stroke="#ea580c" stroke-width="13" stroke-linecap="round" fill="none" />
              <!-- Section 4: HOCK Joint (Backward Ankle Spring) -->
              <g class="joint-hock-r">
                <circle cx="88" cy="166" r="5.5" fill="#ea580c" />
                <!-- Section 5: Metatarsus & White Sock Paw with Knuckle Creases -->
                <path d="M 88 166 L 94 182" stroke="#ea580c" stroke-width="11" stroke-linecap="round" fill="none" />
                <ellipse cx="95" cy="184" rx="8.5" ry="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
                <line x1="93" y1="182" x2="93" y2="186" stroke="#94a3b8" stroke-width="0.8" />
                <line x1="97" y1="182" x2="97" y2="186" stroke="#94a3b8" stroke-width="0.8" />
              </g>
            </g>
          </g>
        </g>

        <!-- ================= FRONT NEAR LIMB (Right Fore: 5-Section Biomechanics) ================= -->
        <g class="limb-fore-r">
          <!-- Section 1 & 2: Free-Floating Scapula & Humerus -->
          <g class="joint-shoulder-r">
            <path d="M 166 116 L 176 144" stroke="#ffffff" stroke-width="15" stroke-linecap="round" fill="none" />
            <!-- Elbow Joint -->
            <circle cx="176" cy="144" r="5.5" fill="#e2e8f0" />
            <!-- Section 3: Radius/Ulna (Forearm) -->
            <g class="joint-elbow-r">
              <path d="M 176 144 L 186 166" stroke="#ffffff" stroke-width="13" stroke-linecap="round" fill="none" />
              <!-- Section 4: Carpal Wrist Joint -->
              <g class="joint-wrist-r">
                <circle cx="186" cy="166" r="5" fill="#e2e8f0" />
                <!-- Section 5: Digitigrade Forepaw Touching Down -->
                <path d="M 186 166 L 194 182" stroke="#ffffff" stroke-width="11" stroke-linecap="round" fill="none" />
                <ellipse cx="196" cy="184" rx="8.5" ry="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
                <line x1="194" y1="182" x2="194" y2="186" stroke="#94a3b8" stroke-width="0.8" />
                <line x1="198" y1="182" x2="198" y2="186" stroke="#94a3b8" stroke-width="0.8" />
              </g>
            </g>
          </g>
        </g>

        <!-- ================= CRANIAL HEAD (Stabilized & Alert) ================= -->
        <g class="calico-prowl-head">
          <!-- Ears with Henry's Pocket Baffles -->
          <polygon points="174,78 178,44 194,68" fill="#1e293b" stroke="#0f172a" stroke-width="0.8" />
          <polygon points="176,72 180,52 190,66" fill="#fbcfe8" />
          <polygon points="204,78 214,44 220,68" fill="#ea580c" stroke="#9a3412" stroke-width="0.8" />
          <polygon points="206,72 212,52 218,66" fill="#fbcfe8" />

          <!-- Skull & Malar Cheeks -->
          <ellipse cx="198" cy="88" rx="32" ry="25" fill="#ffffff" />
          <!-- Calico Face Patches -->
          <path d="M 172 74 C 168 88 180 102 195 96 Z" fill="#1e293b" />
          <path d="M 218 74 C 222 88 210 102 198 96 Z" fill="#ea580c" />

          <!-- Steady Feline Eye Tracking Forward -->
          <g class="cat-walk-eye">
            <ellipse cx="202" cy="84" rx="6.5" ry="7.5" fill="url(#calicoEyeGrad)" />
            <!-- Vertical Slit Pupil -->
            <ellipse cx="202" cy="84" rx="2" ry="6" fill="#022c22" />
            <!-- Specular Highlight -->
            <circle cx="200.5" cy="81.5" r="1.6" fill="#ffffff" />
          </g>
          
          <!-- Puffy Muzzle & Pink Leather Nose -->
          <ellipse cx="216" cy="92" rx="9" ry="6.5" fill="#ffffff" />
          <polygon points="220,89 224,89 222,93" fill="#fb7185" stroke="#f43f5e" stroke-width="0.6" />
          
          <!-- Forward-Braced Whiskers Sensing Air Currents -->
          <g stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity="0.95">
            <path d="M 222 91 C 235 88 244 87 252 86" />
            <path d="M 222 93 C 236 94 246 95 254 98" />
            <path d="M 222 95 C 235 98 244 104 250 110" />
          </g>
        </g>
      </g>
    </svg>
  `;
}

// ============================================================================
// 4. ANATOMICALLY ACCURATE CALICO: PAW SWATTING AT CURSOR!
// Features: Reaching carpal extension, spread toe pads, dilated hunting gaze
// ============================================================================
function renderCalicoSwatting(eyeOffset) {
  return `
    <svg class="pet-cat-svg calico-swatting" viewBox="0 0 220 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="110" cy="222" rx="72" ry="11" fill="#000000" opacity="0.32" />

      <!-- High Twitching Predatory Tail -->
      <path d="M 152 188 C 195 200 215 130 190 95" stroke="#ea580c" stroke-width="10" stroke-linecap="round" fill="none" class="cat-tail-swat" />

      <!-- Crouched Tense Body -->
      <path d="M 52 145 C 38 160 40 195 62 208 C 78 214 88 200 84 175 Z" fill="#1e293b" />
      <path d="M 80 120 C 68 150 70 192 110 200 C 150 192 152 150 140 120 Z" fill="#ffffff" />
      <path d="M 142 130 C 150 148 146 174 128 176 Z" fill="#ea580c" />

      <!-- Planted Support Leg -->
      <path d="M 82 150 L 80 202 L 78 210" stroke="#ffffff" stroke-width="14" stroke-linecap="round" fill="none" />
      <ellipse cx="78" cy="212" rx="9" ry="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />

      <!-- THE OUTSTRETCHED SWATTING FORELEG (Aims directly at cursor!) -->
      <g class="calico-swatting-arm">
        <!-- Fully extended radius/ulna reaching upward -->
        <path d="M 125 145 Q 152 128 170 102" stroke="#ffffff" stroke-width="15" stroke-linecap="round" fill="none" />
        
        <!-- Spread Claws & Extended Toe Pads attempting to catch cursor! -->
        <g class="calico-swat-paw">
          <ellipse cx="174" cy="98" rx="12" ry="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" />
          <!-- Pink & Slate Toe Pads -->
          <circle cx="174" cy="98" r="3.5" fill="#fb7185" />
          <circle cx="168" cy="91" r="2.2" fill="#fb7185" />
          <circle cx="175" cy="89" r="2.2" fill="#334155" />
          <circle cx="182" cy="92" r="2.2" fill="#fb7185" />
          <!-- Playful Whish Marks -->
          <path d="M 184 84 Q 196 95 190 112" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-dasharray="3,3" opacity="0.75" />
        </g>
      </g>

      <!-- Head with Dilated Predatory Hunting Pupils -->
      <g class="calico-head-swat">
        <polygon points="68,68 42,12 40,10 90,48" fill="#1e293b" />
        <polygon points="148,68 174,12 176,10 126,48" fill="#ea580c" />
        <ellipse cx="110" cy="85" rx="46" ry="34" fill="#ffffff" />
        <path d="M 68 70 C 64 88 78 108 96 102 Z" fill="#1e293b" />
        <path d="M 152 70 C 156 88 142 108 124 102 Z" fill="#ea580c" />

        <!-- Massive Dilated Jet-Black Pupils Locked on Cursor -->
        <g transform="translate(${eyeOffset.x * 0.9}, ${eyeOffset.y * 0.9})">
          <circle cx="90" cy="81" r="8.5" fill="#059669" />
          <circle cx="90" cy="81" r="7" fill="#022c22" />
          <circle cx="87.5" cy="77.5" r="2.2" fill="#ffffff" />

          <circle cx="130" cy="81" r="8.5" fill="#059669" />
          <circle cx="130" cy="81" r="7" fill="#022c22" />
          <circle cx="127.5" cy="77.5" r="2.2" fill="#ffffff" />
        </g>

        <!-- Whiskers Braced Forward in Attack Pose -->
        <ellipse cx="102" cy="98" rx="10" ry="7.5" fill="#ffffff" />
        <ellipse cx="118" cy="98" rx="10" ry="7.5" fill="#ffffff" />
        <polygon points="106,91 114,91 110,97" fill="#fb7185" />
        <line x1="94" y1="96" x2="35" y2="92" stroke="#ffffff" stroke-width="1.3" />
        <line x1="124" y1="96" x2="185" y2="92" stroke="#ffffff" stroke-width="1.3" />
      </g>
    </svg>
  `;
}

// ============================================================================
// 5. ANATOMICALLY ACCURATE CALICO: CAT LOAF
// ============================================================================
function renderCalicoLoaf() {
  return `
    <svg class="pet-cat-svg calico-loaf" viewBox="0 0 220 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="110" cy="168" rx="80" ry="11" fill="#000000" opacity="0.35" />

      <g class="calico-loaf-body">
        <!-- Tucked Tail Wrapped around body -->
        <path d="M 50 140 C 34 158 60 174 105 170 C 125 168 138 165 148 162" 
              stroke="#ea580c" stroke-width="11" stroke-linecap="round" fill="none" class="cat-tail-loaf" />

        <!-- Symmetrical Feline Bread Loaf Form -->
        <path d="M 55 145 C 42 122 48 95 85 90 C 122 84 152 84 178 100 C 190 118 190 145 178 160 C 152 168 72 168 55 145 Z" 
              fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />

        <!-- Calico Patches on Loaf -->
        <path d="M 85 90 C 105 92 118 115 108 138 C 90 140 75 125 85 90 Z" fill="#1e293b" />
        <path d="M 145 92 C 165 95 174 118 168 140 C 150 142 138 128 145 92 Z" fill="#ea580c" />

        <!-- Tucked Head with Content Happy Closed Eyes -->
        <g class="calico-loaf-head">
          <polygon points="148,76 138,42 166,58" fill="#1e293b" />
          <polygon points="186,80 202,46 196,68" fill="#ea580c" />
          <ellipse cx="172" cy="94" rx="30" ry="24" fill="#ffffff" />
          
          <path d="M 158 90 Q 165 84 172 90" stroke="#0f172a" stroke-width="2.6" stroke-linecap="round" fill="none" />
          <path d="M 180 92 Q 187 86 194 92" stroke="#0f172a" stroke-width="2.6" stroke-linecap="round" fill="none" />
          <polygon points="176,100 180,100 178,103" fill="#fb7185" />
          <text x="194" y="60" fill="#f43f5e" font-family="sans-serif" font-size="14" font-weight="bold" class="zzz-anim">Zzz</text>
        </g>
      </g>
    </svg>
  `;
}
