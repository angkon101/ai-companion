import { soundFX } from '../audio/soundFX.js';
import { renderPetCat } from '../avatars/petCat.js';
import { renderAnatomicalCalico } from '../avatars/calicoAnatomy.js';

export class PetBrain {
  constructor(stageContainer, catElement) {
    this.stage = stageContainer;
    this.catEl = catElement;

    this.breed = 'calico'; // Default: Anatomically accurate Calico Cat
    this.state = 'idle'; // 'idle' | 'walking' | 'grooming' | 'swatting' | 'loaf'

    // Positioning and roaming
    this.x = 100;
    this.targetX = 100;
    this.facing = 1; // 1 = right, -1 = left
    this.speed = 1.2;

    // Mouse Cursor Awareness
    this.mouse = { x: -999, y: -999, inStage: false };
    this.eyeOffset = { x: 0, y: 0 };
    this.lastSwatTime = 0;
    this.swatDuration = 900; // ms

    // Timers
    this.stateTimer = 0;
    this.nextDecisionTime = Date.now() + 3000;

    this.initMouseListeners();
    this.startLoop();
  }

  setBreed(breed) {
    this.breed = breed;
    this.render();
  }

  initMouseListeners() {
    window.addEventListener('mousemove', (e) => {
      if (!this.stage) return;
      const rect = this.stage.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.inStage = (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom
      );
    });

    document.addEventListener('mouseleave', () => {
      this.mouse.inStage = false;
    });

    // Clicking cat pets it and makes it purr
    if (this.catEl) {
      this.catEl.addEventListener('click', () => {
        this.triggerPetting();
      });
    }
  }

  startLoop() {
    const tick = () => {
      this.update();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  update() {
    if (!this.stage || !this.catEl) return;
    const stageWidth = this.stage.clientWidth || 360;
    const minX = 20;
    const maxX = stageWidth - 170;
    const now = Date.now();

    // Cat center coordinates
    const catCenterX = this.x + 80;
    const catCenterY = 110;

    // Check distance to mouse cursor
    const dx = this.mouse.x - catCenterX;
    const dy = this.mouse.y - catCenterY;
    const distToMouse = Math.sqrt(dx * dx + dy * dy);

    // Calculate eye tracking offset
    if (this.mouse.inStage && distToMouse > 0) {
      const maxOffset = 4.5;
      const factor = Math.min(distToMouse / 200, 1.0) * maxOffset;
      // Account for facing direction flip
      this.eyeOffset.x = (dx / distToMouse) * factor * this.facing;
      this.eyeOffset.y = (dy / distToMouse) * factor;
    } else {
      this.eyeOffset.x *= 0.9;
      this.eyeOffset.y *= 0.9;
    }

    // INTERACTION 1: CURSOR IS NEARBY -> TRY TO CATCH IT WITH PAWS!
    if (this.mouse.inStage && distToMouse < 90 && now - this.lastSwatTime > 1300) {
      this.swatAtCursor(dx);
    } else if (this.state === 'swatting') {
      if (now - this.lastSwatTime > this.swatDuration) {
        this.state = 'idle';
        this.nextDecisionTime = now + 2500;
        this.render();
      }
    } else if (this.mouse.inStage && distToMouse < 160) {
      // Cat stops and stalks the nearby cursor with dilated eyes!
      if (this.state === 'walking') {
        this.state = 'idle';
      }
      // Turn to face cursor
      if (dx > 20) this.facing = 1;
      else if (dx < -20) this.facing = -1;
      this.render();
    } else {
      // AUTONOMOUS LIFE: Roaming, Walking, Cleaning itself, Loafing
      if (this.state === 'walking') {
        const diff = this.targetX - this.x;
        if (Math.abs(diff) > 2) {
          this.facing = diff > 0 ? 1 : -1;
          this.x += Math.sign(diff) * this.speed;
        } else {
          // Arrived at target! Sit and look around
          this.state = 'idle';
          this.nextDecisionTime = now + 3000 + Math.random() * 4000;
          this.render();
        }
      } else if (now > this.nextDecisionTime && this.state !== 'swatting') {
        // Autonomous decision: What does the cat feel like doing?
        const roll = Math.random();

        if (roll < 0.40) {
          // 40%: Groom itself & lick paw/feet!
          this.state = 'grooming';
          this.render();
          soundFX.playTrill();
          soundFX.playPurr(3.5);
          this.spawnParticle('✨');
          this.nextDecisionTime = now + 5000 + Math.random() * 2000;
        } else if (roll < 0.80) {
          // 40%: Roam to a new spot in the room!
          this.state = 'walking';
          this.targetX = minX + Math.random() * (maxX - minX);
          this.render();
          soundFX.playKeyTick();
          this.nextDecisionTime = now + 12000;
        } else {
          // 20%: Tuck into a cozy cat loaf!
          this.state = 'loaf';
          this.render();
          soundFX.playPurr(5.0);
          this.spawnParticle('💤');
          this.nextDecisionTime = now + 6000 + Math.random() * 3000;
        }
      }
    }

    // Apply visual position and facing transform
    this.catEl.style.transform = `translate3d(${this.x}px, 0, 0) scaleX(${this.facing})`;
  }

  swatAtCursor(dx) {
    this.state = 'swatting';
    this.lastSwatTime = Date.now();
    // Face the cursor when swatting
    this.facing = dx >= 0 ? 1 : -1;

    soundFX.playPounce();
    this.spawnParticle('🐾');
    this.spawnParticle('✨');
    this.render();
  }

  triggerPetting() {
    soundFX.playMeow(1.05);
    soundFX.playPurr(4.0);
    this.spawnParticle('💖');
    this.catEl.classList.remove('cat-pet-arch');
    void this.catEl.offsetWidth;
    this.catEl.classList.add('cat-pet-arch');
    setTimeout(() => this.catEl.classList.remove('cat-pet-arch'), 600);
  }

  triggerClean() {
    this.state = 'grooming';
    this.render();
    soundFX.playTrill();
    soundFX.playPurr(4.0);
    this.spawnParticle('✨');
    this.nextDecisionTime = Date.now() + 6000;
  }

  triggerRoam() {
    const stageWidth = this.stage.clientWidth || 360;
    this.state = 'walking';
    this.targetX = 20 + Math.random() * (stageWidth - 190);
    this.render();
    this.nextDecisionTime = Date.now() + 10000;
  }

  spawnParticle(emoji = '🐾') {
    if (!this.stage) return;
    const p = document.createElement('div');
    p.className = 'companion-floating-particle';
    p.textContent = emoji;
    p.style.left = `${this.x + 80 + (Math.random() - 0.5) * 40}px`;
    p.style.top = `60px`;
    this.stage.appendChild(p);
    setTimeout(() => {
      if (p.parentNode) p.parentNode.removeChild(p);
    }, 1100);
  }

  render() {
    if (!this.catEl) return;
    if (this.breed === 'calico') {
      this.catEl.innerHTML = renderAnatomicalCalico(this.state, {
        eyeOffset: this.eyeOffset,
        facing: this.facing
      });
    } else {
      this.catEl.innerHTML = renderPetCat(this.state, {
        breed: this.breed,
        eyeOffset: this.eyeOffset,
        facing: this.facing
      });
    }
  }
}
