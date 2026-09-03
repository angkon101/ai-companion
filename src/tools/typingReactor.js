import { soundFX } from '../audio/soundFX.js';

export class TypingReactor {
  constructor(options = {}) {
    this.onStreakUpdate = options.onStreakUpdate || (() => {});
    this.keyCount = 0;
    this.streakTimeout = null;
    this.lastSoundTime = 0;

    this.init();
  }

  init() {
    window.addEventListener('keydown', (e) => {
      // Ignore functional modifier keys alone
      if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;

      this.keyCount++;
      this.onStreakUpdate(this.keyCount);

      // Play soft mechanical tick sound throttled
      const now = Date.now();
      if (now - this.lastSoundTime > 60) {
        soundFX.playKeyTick();
        this.lastSoundTime = now;
      }

      if (this.streakTimeout) clearTimeout(this.streakTimeout);
      this.streakTimeout = setTimeout(() => {
        this.keyCount = 0;
        this.onStreakUpdate(0);
      }, 4000);
    });
  }
}
