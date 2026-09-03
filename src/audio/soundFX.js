/**
 * Realistic Feline Web Audio Synthesizer
 * Procedural Cat Meows, Purrs, Trills, Treat Crunches, and Pounce Boops
 */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.volume = 0.5;
    this.purrSource = null;
    this.purrGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (muted && this.purrGain) {
      this.stopPurr();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopPurr();
    }
    return this.muted;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  // Realistic Kitten/Cat Meow using formant filtering
  playMeow(pitch = 1.0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';

    // Feline meow pitch contour: starts mid, rises, then dips softly (e.g. 520Hz -> 820Hz -> 480Hz)
    const baseFreq = 540 * pitch;
    osc.frequency.setValueAtTime(baseFreq * 0.9, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, t + 0.16);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, t + 0.45);

    // Formant vocal filter for nasal "m-e-o-w" formant
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, t);
    filter.frequency.linearRampToValueAtTime(1900, t + 0.16);
    filter.frequency.linearRampToValueAtTime(950, t + 0.45);
    filter.Q.setValueAtTime(3.5, t);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(this.volume * 0.45, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.48);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  // Cute Cat Greeting Trill (mrr-ow chirp)
  playTrill() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = t + i * 0.055;

      osc.type = 'sine';
      const f = 680 + i * 110;
      osc.frequency.setValueAtTime(f, start);
      osc.frequency.linearRampToValueAtTime(f * 1.15, start + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.06);
    }
  }

  // Realistic Purr (deep soothing ~25Hz motor vibration with resonance)
  playPurr(duration = 2.5) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const carrier = this.ctx.createOscillator();
    const modulator = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();
    const mainGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    carrier.type = 'sawtooth';
    carrier.frequency.setValueAtTime(80, t); // deep chest purr

    // 24Hz laryngeal motor modulation
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(24, t);

    modGain.gain.setValueAtTime(30, t);
    modulator.connect(carrier.frequency);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, t);

    mainGain.gain.setValueAtTime(0.01, t);
    mainGain.gain.linearRampToValueAtTime(this.volume * 0.4, t + 0.3);
    mainGain.gain.setValueAtTime(this.volume * 0.4, t + duration - 0.3);
    mainGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    carrier.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(this.ctx.destination);

    modulator.start(t);
    carrier.start(t);
    modulator.stop(t + duration);
    carrier.stop(t + duration);
  }

  // Crunchy treat / snack eating sound
  playCrunch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = t + i * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900 + Math.random() * 400, start);
      osc.frequency.exponentialRampToValueAtTime(200, start + 0.04);

      gain.gain.setValueAtTime(this.volume * 0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.05);
    }
  }

  // Playful pounce / jump boop
  playPounce() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(750, t + 0.14);

    gain.gain.setValueAtTime(this.volume * 0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // Soft typing / step tick
  playKeyTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1100 + Math.random() * 300, t);

    gain.gain.setValueAtTime(this.volume * 0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.025);
  }

  stopPurr() {}
}

export const soundFX = new SoundFX();
