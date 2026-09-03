import { renderCyberBot } from './cyberBot.js';
import { renderChibiKitsune } from './chibiKitsune.js';
import { renderSlimeBlob } from './slimeBlob.js';

export class AvatarRenderer {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.currentAvatar = options.avatar || 'cyberbot'; // 'cyberbot' | 'kitsune' | 'slime'
    this.currentMood = options.mood || 'idle';
    this.customColors = {
      cyberbot: { color: '#00f2fe', accent: '#7928ca' },
      kitsune: { color: '#ff7b54', accent: '#ffb26b' },
      slime: { color: '#00f5d4', accent: '#7b2cbf' }
    };

    this.eyeOffset = { x: 0, y: 0 };
    this.targetEyeOffset = { x: 0, y: 0 };
    this.isPetting = false;

    this.initMouseTracking();
    this.startAnimationLoop();
    this.render();
  }

  setAvatar(avatarId) {
    if (['cyberbot', 'kitsune', 'slime'].includes(avatarId)) {
      this.currentAvatar = avatarId;
      this.render();
    }
  }

  setMood(mood) {
    this.currentMood = mood;
    this.render();
  }

  setColorTheme(primary, accent) {
    if (this.customColors[this.currentAvatar]) {
      if (primary) this.customColors[this.currentAvatar].color = primary;
      if (accent) this.customColors[this.currentAvatar].accent = accent;
      this.render();
    }
  }

  initMouseTracking() {
    window.addEventListener('mousemove', (e) => {
      if (!this.container) return;
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Max offset range in SVG coordinates
      const maxOffset = 5.0;
      if (dist > 0) {
        const factor = Math.min(dist / 300, 1.0) * maxOffset;
        this.targetEyeOffset.x = (dx / dist) * factor;
        this.targetEyeOffset.y = (dy / dist) * factor;
      }
    });

    // Reset eye gaze when mouse leaves document
    document.addEventListener('mouseleave', () => {
      this.targetEyeOffset.x = 0;
      this.targetEyeOffset.y = 0;
    });
  }

  startAnimationLoop() {
    const update = () => {
      // Smooth lerp eye offset
      const lerp = 0.15;
      const oldX = this.eyeOffset.x;
      const oldY = this.eyeOffset.y;

      this.eyeOffset.x += (this.targetEyeOffset.x - this.eyeOffset.x) * lerp;
      this.eyeOffset.y += (this.targetEyeOffset.y - this.eyeOffset.y) * lerp;

      // Only re-render if eyes moved noticeably and mood allows eye movement
      const delta = Math.abs(this.eyeOffset.x - oldX) + Math.abs(this.eyeOffset.y - oldY);
      if (delta > 0.04 && (this.currentMood === 'idle' || this.currentMood === 'focused' || this.currentMood === 'debugging')) {
        this.render();
      }

      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  triggerPetAnimation() {
    if (!this.container) return;
    this.container.classList.remove('avatar-squish', 'avatar-heart-burst');
    // trigger reflow
    void this.container.offsetWidth;
    this.container.classList.add('avatar-squish');

    // Spawn floating heart particle
    this.spawnParticle('❤️');

    setTimeout(() => {
      this.container.classList.remove('avatar-squish');
    }, 600);
  }

  spawnParticle(emoji = '✨') {
    if (!this.container) return;
    const particle = document.createElement('div');
    particle.className = 'companion-floating-particle';
    particle.textContent = emoji;

    // Random offset near center
    const xOffset = (Math.random() - 0.5) * 80;
    particle.style.left = `calc(50% + ${xOffset}px)`;
    particle.style.top = `40%`;

    this.container.appendChild(particle);
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1200);
  }

  render() {
    if (!this.container) return;

    const colors = this.customColors[this.currentAvatar] || { color: '#00f2fe', accent: '#7928ca' };
    const opts = {
      ...colors,
      eyeOffset: this.eyeOffset
    };

    let html = '';
    switch (this.currentAvatar) {
      case 'kitsune':
        html = renderChibiKitsune(this.currentMood, opts);
        break;
      case 'slime':
        html = renderSlimeBlob(this.currentMood, opts);
        break;
      case 'cyberbot':
      default:
        html = renderCyberBot(this.currentMood, opts);
        break;
    }

    this.container.innerHTML = html;
  }
}
