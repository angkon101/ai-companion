/**
 * Dialogue Engine & Speech Bubble Controller
 * Manages coding pep-talks, tips, speech bubbles, and optional Web Speech TTS
 */

export class DialogueEngine {
  constructor(bubbleElement, options = {}) {
    this.bubbleElement = bubbleElement;
    this.voiceEnabled = false;
    this.bubbleTimeout = null;
    this.synth = window.speechSynthesis || null;

    this.dialogues = {
      idle: [
        "Ready to build something awesome in Antigravity IDE!",
        "Don't forget to sit up straight and stay hydrated! 💧",
        "Clean code is happy code. Take your time! ✨",
        "Whenever you're ready, let's smash some features!",
        "Listening in... I've got your back while you code!"
      ],
      focused: [
        "Deep focus mode activated. Let's get in the zone! 🧠",
        "Synthesizing clean architecture... keep going!",
        "Zero distractions. You are unstoppable today!",
        "One thoughtful line at a time. Flow state achieved! 🚀"
      ],
      debugging: [
        "Let's catch that sneaky bug together! 🔍",
        "Check your variable scopes and recent diffs first!",
        "Rubber duck mode: explain the bug to me out loud!",
        "Take a breath! The fix is often simpler than it seems."
      ],
      celebrating: [
        "EUREKA! That compiled flawlessly! 🎉",
        "You crushed that bug! Commit that genius code! 🏆",
        "Look at those green tests! Absolutely brilliant work!",
        "Level up! That was an incredible sprint! ⭐"
      ],
      sleepy: [
        "Great sprint! Remember to rest your eyes for 20 seconds. 🌿",
        "Time for a quick stretch and water refill!",
        "Recharging our battery... rest is part of good engineering! 🔋"
      ],
      pet: [
        "Bleep bloop! Happiness level boosted to 100%! 🥰",
        "Hehehe, that tickles! Thank you, human friend!",
        "Purrrrr~ Companionship affinity increased!",
        "Aww, thank you! Ready to code even faster now!"
      ],
      coffee: [
        "*Siiiiip* Fresh caffeinated power restored! ☕⚡",
        "Coffee buffer full! Productivity multiplied by 2x!",
        "Mmm, warm and cozy! Let's conquer this codebase!"
      ]
    };
  }

  setVoiceEnabled(enabled) {
    this.voiceEnabled = enabled;
  }

  speak(text, priority = false) {
    if (!this.bubbleElement) return;

    // Show bubble
    this.bubbleElement.textContent = text;
    this.bubbleElement.classList.add('bubble-visible');

    if (this.bubbleTimeout) clearTimeout(this.bubbleTimeout);
    const duration = Math.max(3000, text.length * 65);
    this.bubbleTimeout = setTimeout(() => {
      this.bubbleElement.classList.remove('bubble-visible');
    }, duration);

    // Audio TTS if enabled
    if (this.voiceEnabled && this.synth) {
      if (priority) {
        this.synth.cancel();
      }
      const cleanText = text.replace(/[\u{1F600}-\u{1F6FF}|[\u{2600}-\u{27BF}]/gu, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.pitch = 1.25; // slightly cute/high pitch
      utterance.rate = 1.05;
      utterance.volume = 0.8;
      
      // Try finding a friendly voice if available
      const voices = this.synth.getVoices();
      const friendlyVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Google')));
      if (friendlyVoice) utterance.voice = friendlyVoice;

      this.synth.speak(utterance);
    }
  }

  sayRandom(mood = 'idle') {
    const list = this.dialogues[mood] || this.dialogues.idle;
    const item = list[Math.floor(Math.random() * list.length)];
    this.speak(item);
  }
}
