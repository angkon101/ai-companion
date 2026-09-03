import { soundFX } from '../audio/soundFX.js';

export class FocusTimer {
  constructor(displayElement, options = {}) {
    this.displayElement = displayElement;
    this.onStateChange = options.onStateChange || (() => {});
    this.onComplete = options.onComplete || (() => {});

    this.durationMinutes = 25;
    this.secondsRemaining = this.durationMinutes * 60;
    this.timerInterval = null;
    this.isRunning = false;
    this.isBreak = false;

    this.render();
  }

  setDuration(minutes) {
    this.pause();
    this.durationMinutes = minutes;
    this.secondsRemaining = minutes * 60;
    this.isBreak = false;
    this.render();
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    soundFX.playBoop(1.2);
    this.onStateChange({ isRunning: true, isBreak: this.isBreak });

    this.timerInterval = setInterval(() => {
      this.secondsRemaining--;
      this.render();

      if (this.secondsRemaining <= 0) {
        this.completeSession();
      }
    }, 1000);
    this.render();
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.onStateChange({ isRunning: false, isBreak: this.isBreak });
    this.render();
  }

  reset() {
    this.pause();
    this.isBreak = false;
    this.secondsRemaining = this.durationMinutes * 60;
    this.render();
  }

  completeSession() {
    this.pause();
    soundFX.playBell();
    setTimeout(() => soundFX.playSuccess(), 400);

    const wasWorkSprint = !this.isBreak;
    if (wasWorkSprint) {
      // Transition to break
      this.isBreak = true;
      this.secondsRemaining = 5 * 60; // 5 minute break
    } else {
      this.isBreak = false;
      this.secondsRemaining = this.durationMinutes * 60;
    }

    this.onComplete({ wasWorkSprint });
    this.render();
  }

  render() {
    if (!this.displayElement) return;
    const mins = Math.floor(this.secondsRemaining / 60);
    const secs = this.secondsRemaining % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    this.displayElement.textContent = timeStr;
  }
}
