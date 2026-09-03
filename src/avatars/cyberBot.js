/**
 * Byte the Cyber-Bot Avatar Component
 * Futuristic assistant with LED Visor Matrix and floating cyber aura
 */

export function renderCyberBot(mood = 'idle', options = {}) {
  const { color = '#00f2fe', accent = '#7928ca', eyeOffset = { x: 0, y: 0 } } = options;

  // Compute visor expression based on mood
  let visorContent = '';
  switch (mood) {
    case 'focused':
      visorContent = `
        <!-- Code matrix / brackets -->
        <g class="visor-eyes visor-focused" transform="translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})">
          <text x="36" y="52" fill="${color}" font-family="monospace" font-size="14" font-weight="bold">&lt;/&gt;</text>
          <text x="64" y="52" fill="${color}" font-family="monospace" font-size="14" font-weight="bold">&lt;/&gt;</text>
          <line x1="28" y1="56" x2="92" y2="56" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,2" class="scanline-anim" />
        </g>
      `;
      break;
    case 'debugging':
      visorContent = `
        <!-- Question / Scanner mode -->
        <g class="visor-eyes visor-debugging" transform="translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})">
          <circle cx="44" cy="48" r="8" stroke="#ffb703" stroke-width="2.5" fill="none" />
          <line x1="50" y1="54" x2="56" y2="60" stroke="#ffb703" stroke-width="3" stroke-linecap="round" />
          <text x="70" y="53" fill="#ffb703" font-family="monospace" font-size="16" font-weight="bold">?</text>
          <circle cx="85" cy="42" r="3" fill="#ff4d4f" class="pulsing-warning" />
        </g>
      `;
      break;
    case 'celebrating':
    case 'excited':
      visorContent = `
        <!-- Happy Arc / Heart eyes -->
        <g class="visor-eyes visor-celebrating" transform="translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})">
          <path d="M 38 48 Q 44 40 50 48" stroke="#ff2a85" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <path d="M 70 48 Q 76 40 82 48" stroke="#ff2a85" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <polygon points="44,38 46,42 50,42 47,45 48,49 44,46 40,49 41,45 38,42 42,42" fill="#ffd700" class="star-twinkle" />
          <polygon points="76,38 78,42 82,42 79,45 80,49 76,46 72,49 73,45 70,42 74,42" fill="#ffd700" class="star-twinkle" />
        </g>
      `;
      break;
    case 'sleepy':
      visorContent = `
        <!-- Sleepy horizontal slits -->
        <g class="visor-eyes visor-sleepy">
          <line x1="38" y1="50" x2="52" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
          <line x1="68" y1="50" x2="82" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
          <text x="86" y="38" fill="${accent}" font-family="sans-serif" font-size="12" font-weight="bold" class="zzz-anim">Z</text>
        </g>
      `;
      break;
    case 'idle':
    default:
      visorContent = `
        <!-- Default cute round LED eyes with interactive pupil offset -->
        <g class="visor-eyes visor-idle" transform="translate(${eyeOffset.x * 0.7}, ${eyeOffset.y * 0.7})">
          <g class="bot-eye bot-eye-left">
            <ellipse cx="45" cy="48" rx="7" ry="9" fill="${color}" filter="url(#cyanGlow)" />
            <ellipse cx="43" cy="45" rx="2.5" ry="3.5" fill="#ffffff" />
          </g>
          <g class="bot-eye bot-eye-right">
            <ellipse cx="75" cy="48" rx="7" ry="9" fill="${color}" filter="url(#cyanGlow)" />
            <ellipse cx="73" cy="45" rx="2.5" ry="3.5" fill="#ffffff" />
          </g>
        </g>
      `;
      break;
  }

  return `
    <svg class="companion-avatar-svg cyberbot-svg" viewBox="0 0 160 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Gradients & Glow Filters -->
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1f293d" />
          <stop offset="50%" stop-color="#131b2e" />
          <stop offset="100%" stop-color="#0a0f1d" />
        </linearGradient>

        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>

        <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.45" />
        </filter>
      </defs>

      <!-- Ambient Base Floating Shadow -->
      <ellipse cx="80" cy="168" rx="42" ry="7" fill="#000000" opacity="0.35" class="bot-ground-shadow" />

      <!-- Hovering Main Body Assembly -->
      <g class="bot-floating-body" filter="url(#shadowFilter)">
        <!-- Antenna -->
        <g class="bot-antenna">
          <line x1="80" y1="20" x2="80" y2="8" stroke="#334155" stroke-width="3.5" stroke-linecap="round" />
          <circle cx="80" cy="6" r="5" fill="${color}" filter="url(#cyanGlow)" class="antenna-bulb" />
          <circle cx="80" cy="6" r="8" stroke="${color}" stroke-width="1.2" opacity="0.4" class="antenna-ring" />
        </g>

        <!-- Ear Ports / Audio Nodes -->
        <rect x="14" y="38" width="8" height="22" rx="4" fill="#334155" />
        <rect x="98" y="38" width="8" height="22" rx="4" fill="#334155" />
        <circle cx="18" cy="49" r="2.5" fill="${color}" opacity="0.8" />
        <circle cx="102" cy="49" r="2.5" fill="${color}" opacity="0.8" />

        <!-- Robot Head Capsule -->
        <rect x="20" y="16" width="80" height="66" rx="28" fill="url(#bodyGrad)" stroke="#384252" stroke-width="2" />
        
        <!-- Top Accent Strip -->
        <path d="M 40 18 Q 60 14 80 18" stroke="url(#accentGrad)" stroke-width="3" stroke-linecap="round" fill="none" />

        <!-- LED Dark Visor Glass -->
        <rect x="26" y="28" width="68" height="42" rx="18" fill="#060913" stroke="#1e293b" stroke-width="2" />
        
        <!-- Visor Background Grid -->
        <line x1="28" y1="42" x2="92" y2="42" stroke="#111827" stroke-width="0.75" />
        <line x1="28" y1="56" x2="92" y2="56" stroke="#111827" stroke-width="0.75" />

        <!-- Dynamic Visor Screen Expression -->
        ${visorContent}

        <!-- Torso / Chest Module -->
        <g class="bot-torso">
          <path d="M 46 82 L 74 82 L 80 125 L 40 125 Z" fill="url(#bodyGrad)" stroke="#2e384d" stroke-width="1.5" />
          
          <!-- Core Arc Reactor -->
          <circle cx="60" cy="98" r="10" fill="#090d16" stroke="#1e293b" stroke-width="2" />
          <circle cx="60" cy="98" r="6" fill="${color}" filter="url(#cyanGlow)" class="core-pulsing" />
          <polygon points="60,94 63,99 57,99" fill="#ffffff" opacity="0.9" />

          <!-- Chest Gauge Lines -->
          <line x1="48" y1="112" x2="72" y2="112" stroke="#334155" stroke-width="2" stroke-linecap="round" />
          <line x1="48" y1="112" x2="62" y2="112" stroke="${accent}" stroke-width="2" stroke-linecap="round" />
        </g>

        <!-- Floating Detached Magnetic Hands -->
        <g class="bot-hands">
          <!-- Left Hand -->
          <g class="bot-hand-left">
            <ellipse cx="26" cy="104" rx="7" ry="11" fill="url(#bodyGrad)" stroke="#384252" stroke-width="1.5" transform="rotate(-15 26 104)" />
            <circle cx="25" cy="100" r="2" fill="${color}" />
          </g>
          <!-- Right Hand -->
          <g class="bot-hand-right">
            <ellipse cx="94" cy="104" rx="7" ry="11" fill="url(#bodyGrad)" stroke="#384252" stroke-width="1.5" transform="rotate(15 94 104)" />
            <circle cx="95" cy="100" r="2" fill="${color}" />
          </g>
        </g>

        <!-- Jet Thruster Glow at Base -->
        <ellipse cx="60" cy="126" rx="12" ry="4" fill="${color}" filter="url(#cyanGlow)" class="thruster-glow" />
      </g>
    </svg>
  `;
}
