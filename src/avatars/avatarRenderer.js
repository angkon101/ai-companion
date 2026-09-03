import { renderRealCat } from './realCat.js';

export class AvatarRenderer {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.currentBreed = options.breed || 'tabby'; // 'tabby' | 'calico' | 'void' | 'siamese'
    this.currentAction = options.action || 'idle'; // 'idle' | 'lick_paw' | 'walk' | 'jump' | 'loaf'
    this.eyeOffset = { x: 0, y: 0 };
    this.targetEyeOffset = { x: 0, y: 0 };
    this.actionTimeout = null;
    this.idleBehaviorInterval = null;

    this.initMouseTracking();
    this.startAnimationLoop();
    this.startSpontaneousBehaviors();
    this.render();
  }

  setBreed(breedId) {
    if (['tabby', 'calico', 'void', 'siamese'].includes(breedId)) {
      this.currentBreed = breedId;
      this.render();
    }
  }

  setAction(action, duration = null) {
    if (this.actionTimeout) {
      clearTimeout(this.actionTimeout);
      this.actionTimeout = null;
    }

    this.currentAction = action;
    this.render();

    if (duration) {
      this.actionTimeout = setTimeout(() => {
        this.currentAction = 'idle';
        this.render();
      }, duration);
    }
  }

  getAction() {
    return this.currentAction;
  }

  // Trigger: Clean and Lick Paws
  triggerLickPaw(duration = 5000) {
    this.setAction('lick_paw', duration);
    this.spawnParticle('✨');
  }

  // Trigger: Walk Cycle
  triggerWalk(duration = 6000) {
    this.setAction('walk', duration);
    this.spawnParticle('🐾');
  }

  // Trigger: Jump / Pounce (Pre-pounce butt wiggle + high leap)
  triggerJump(duration = 4500) {
    if (!this.container) return;

    // Step 1: Pre-pounce crouch & butt-wiggle
    this.container.classList.remove('cat-butt-wiggle', 'cat-pounce-active');
    void this.container.offsetWidth;
    this.container.classList.add('cat-butt-wiggle');

    setTimeout(() => {
      // Step 2: Explosive Jump!
      this.container.classList.remove('cat-butt-wiggle');
      this.setAction('jump', 2800);
      this.container.classList.add('cat-pounce-active');
      this.spawnParticle('💨');

      setTimeout(() => {
        this.container.classList.remove('cat-pounce-active');
      }, 2800);
    }, 1200);
  }

  // Trigger: Cat Loaf
  triggerLoaf(duration = 8000) {
    this.setAction('loaf', duration);
    this.spawnParticle('🍞');
  }

  // Trigger: Petting / Purr
  triggerPet() {
    if (!this.container) return;
    this.container.classList.remove('cat-pet-arch');
    void this.container.offsetWidth;
    this.container.classList.add('cat-pet-arch');

    const catHearts = ['💖', '🐾', '✨', '😻', '💕'];
    const heart = catHearts[Math.floor(Math.random() * catHearts.length)];
    this.spawnParticle(heart);

    setTimeout(() => {
      this.container.classList.remove('cat-pet-arch');
    }, 600);
  }

  // Trigger: Feed treat
  triggerFeed() {
    this.spawnParticle('🐟');
    this.spawnParticle('✨');
    this.triggerPet();
  }

  spawnParticle(emoji = '🐾') {
    if (!this.container) return;
    const particle = document.createElement('div');
    particle.className = 'companion-floating-particle';
    particle.textContent = emoji;

    const xOffset = (Math.random() - 0.5) * 80;
    particle.style.left = `calc(50% + ${xOffset}px)`;
    particle.style.top = `38%`;

    this.container.appendChild(particle);
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1200);
  }

  // Spontaneous natural cat habits (periodically clean paw or stretch)
  startSpontaneousBehaviors() {
    this.idleBehaviorInterval = setInterval(() => {
      if (this.currentAction === 'idle') {
        const rand = Math.random();
        if (rand < 0.4) {
          // Lick paw for 4 seconds
          this.triggerLickPaw(4000);
        } else if (rand < 0.65) {
          // Walk a few steps
          this.triggerWalk(4500);
        }
      }
    }, 28000);
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

      const maxOffset = 5.0;
      if (dist > 0) {
        const factor = Math.min(dist / 300, 1.0) * maxOffset;
        this.targetEyeOffset.x = (dx / dist) * factor;
        this.targetEyeOffset.y = (dy / dist) * factor;
      }
    });

    document.addEventListener('mouseleave', () => {
      this.targetEyeOffset.x = 0;
      this.targetEyeOffset.y = 0;
    });
  }

  startAnimationLoop() {
    const update = () => {
      const lerp = 0.15;
      const oldX = this.eyeOffset.x;
      const oldY = this.eyeOffset.y;

      this.eyeOffset.x += (this.targetEyeOffset.x - this.eyeOffset.x) * lerp;
      this.eyeOffset.y += (this.targetEyeOffset.y - this.eyeOffset.y) * lerp;

      const delta = Math.abs(this.eyeOffset.x - oldX) + Math.abs(this.eyeOffset.y - oldY);
      if (delta > 0.04 && this.currentAction === 'idle') {
        this.render();
      }

      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  render() {
    if (!this.container) return;
    const html = renderRealCat(this.currentAction, {
      breed: this.currentBreed,
      eyeOffset: this.eyeOffset
    });
    this.container.innerHTML = html;
  }
}
