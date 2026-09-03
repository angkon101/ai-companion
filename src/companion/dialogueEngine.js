/**
 * Feline Dialogue Engine & Speech Bubble Controller
 * Filled with cat purrs, meows, feline coding jokes, and affectionate companion remarks
 */

export class DialogueEngine {
  constructor(bubbleElement, options = {}) {
    this.bubbleElement = bubbleElement;
    this.voiceEnabled = false;
    this.bubbleTimeout = null;
    this.synth = window.speechSynthesis || null;

    this.dialogues = {
      idle: [
        "Purrrrr~ Ready to write purr-fect code together in Antigravity! 🐾",
        "Sitting near your keyboard is my way of pair-programming!",
        "Don't forget to stretch your paws and drink some water! 🥛",
        "Clean paws, clean code. Taking things one step at a time! ✨",
        "I'm keeping watch while you code. You're doing wonderful!",
        "Can I nap in your GitHub repo? It looks super cozy."
      ],
      lick_paw: [
        "*Slurp slurp* Just cleaning my toe beans and paws! So clean! 🐾",
        "Grooming time! A clean cat writes bug-free algorithms!",
        "*Lick lick* Keeping my feet nice and tidy while you code."
      ],
      walk: [
        "Just pacing around your desk, doing a perimeter patrol! 🐾",
        "Walking by to inspect your recent function implementation!",
        "Stretch those legs! Even cats take pacing breaks."
      ],
      jump: [
        "Wiggle wiggle... POUNCE! Caught the bug! 🦘💥",
        "Did you see that jump?! High-agility coding right here!",
        "Target acquired, butt wiggled, and leap executed!"
      ],
      loaf: [
        "Tucking my paws in... Cat loaf mode activated! Purrrrr... 🍞",
        "Warm bread loaf right beside your editor. Purr purr purr~",
        "I'll rest here quietly while you enter deep focus flow."
      ],
      treat: [
        "Crunch crunch crunch! 🐟 Delicious fish treat! Thank you, human friend!",
        "Mmmm! Fish energy restored! Best coding buddy in the world!",
        "*Happy purring* That was so tasty! Productivity boosted!"
      ],
      pet: [
        "Purrrrrrrrrrr~ *Arches back into your hand* That's the sweet spot! 😻",
        "Mrrr-ow! Hehe, chin scratches are the best! Thank you! 💕",
        "Affection level 100%! Purring at maximum volume!"
      ],
      sprint: [
        "Focus sprint started! I'll loaf quietly while you write genius code! 🐾",
        "Locked in! May your tests pass with zero compiler warnings!"
      ],
      sprint_done: [
        "Sprint complete! *Meow!* Time for a 5-minute stretch and water break! 🏆",
        "Purr-fect session! You crushed that task! Take a quick rest."
      ]
    };
  }

  setVoiceEnabled(enabled) {
    this.voiceEnabled = enabled;
  }

  speak(text, priority = false) {
    if (!this.bubbleElement) return;

    this.bubbleElement.textContent = text;
    this.bubbleElement.classList.add('bubble-visible');

    if (this.bubbleTimeout) clearTimeout(this.bubbleTimeout);
    const duration = Math.max(3000, text.length * 60);
    this.bubbleTimeout = setTimeout(() => {
      this.bubbleElement.classList.remove('bubble-visible');
    }, duration);

    if (this.voiceEnabled && this.synth) {
      if (priority) {
        this.synth.cancel();
      }
      const cleanText = text.replace(/[\u{1F600}-\u{1F6FF}|[\u{2600}-\u{27BF}]/gu, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.pitch = 1.35; // Cute melodic feline pitch
      utterance.rate = 1.05;
      utterance.volume = 0.85;

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
