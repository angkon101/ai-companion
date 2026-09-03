/**
 * Mood State Machine & Companion Energy Tracker
 */

export class MoodEngine {
  constructor(options = {}) {
    this.currentMood = 'idle';
    this.energy = 100;
    this.affinity = 10;
    this.onMoodChange = options.onMoodChange || (() => {});
    this.onEnergyChange = options.onEnergyChange || (() => {});

    this.idleTimer = null;
    this.energyInterval = null;
    this.startEnergyTick();
  }

  setMood(mood) {
    if (this.currentMood === mood) return;
    this.currentMood = mood;
    this.onMoodChange(this.currentMood);
  }

  getMood() {
    return this.currentMood;
  }

  boostAffinity(amount = 5) {
    this.affinity = Math.min(100, this.affinity + amount);
  }

  feedCoffee() {
    this.energy = Math.min(100, this.energy + 35);
    this.boostAffinity(3);
    this.onEnergyChange(this.energy, this.affinity);
  }

  startEnergyTick() {
    // Slowly drain energy when focused/debugging, recover when idle/sleepy
    this.energyInterval = setInterval(() => {
      if (this.currentMood === 'focused' || this.currentMood === 'debugging') {
        this.energy = Math.max(5, this.energy - 1);
      } else if (this.currentMood === 'sleepy' || this.currentMood === 'idle') {
        this.energy = Math.min(100, this.energy + 1);
      }
      this.onEnergyChange(this.energy, this.affinity);
    }, 15000);
  }
}
