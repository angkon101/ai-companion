import { soundFX } from './audio/soundFX.js';
import { AvatarRenderer } from './avatars/avatarRenderer.js';
import { DialogueEngine } from './companion/dialogueEngine.js';
import { MoodEngine } from './companion/moodEngine.js';
import { PipManager } from './companion/pipManager.js';
import { FocusTimer } from './tools/focusTimer.js';
import { TypingReactor } from './tools/typingReactor.js';

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const avatarStage = document.getElementById('companion-avatar-stage');
  const speechBubble = document.getElementById('companion-speech-bubble');
  const companionCard = document.getElementById('companion-main-card');
  const moodDot = document.getElementById('mood-dot-indicator');
  const moodLabel = document.getElementById('mood-text-label');
  const energyStat = document.getElementById('stat-energy');
  const affinityStat = document.getElementById('stat-affinity');

  // Controls
  const btnSound = document.getElementById('btn-sound-toggle');
  const btnVoice = document.getElementById('btn-voice-toggle');
  const btnPip = document.getElementById('btn-pip-toggle');

  const btnPet = document.getElementById('btn-action-pet');
  const btnCoffee = document.getElementById('btn-action-coffee');
  const btnTalk = document.getElementById('btn-action-talk');
  const btnDebug = document.getElementById('btn-action-debug');
  const btnCelebrate = document.getElementById('btn-action-celebrate');

  const timerDisplay = document.getElementById('timer-display');
  const btnTimerToggle = document.getElementById('btn-timer-toggle');
  const btnTimerReset = document.getElementById('btn-timer-reset');
  const sprintTagBtns = document.querySelectorAll('.tag-btn');

  const avatarPills = document.querySelectorAll('.avatar-pill');
  const colorDots = document.querySelectorAll('.color-dot');

  // Instantiate Subsystems
  const avatarRenderer = new AvatarRenderer(avatarStage, {
    avatar: 'cyberbot',
    mood: 'idle'
  });

  const dialogue = new DialogueEngine(speechBubble);

  const moodEngine = new MoodEngine({
    onMoodChange: (newMood) => {
      avatarRenderer.setMood(newMood);
      updateMoodUI(newMood);
    },
    onEnergyChange: (energy, affinity) => {
      if (energyStat) energyStat.textContent = `${energy}%`;
      if (affinityStat) {
        const level = Math.floor(affinity / 20) + 1;
        affinityStat.textContent = `Lv.${level}`;
      }
    }
  });

  // Mood UI Helper
  function updateMoodUI(mood) {
    const moodMap = {
      idle: { text: 'Vibing / Ready', color: '#06d6a0' },
      focused: { text: 'Deep Focus Sprint', color: '#00f2fe' },
      debugging: { text: 'Hunting Bugs', color: '#ffb703' },
      celebrating: { text: 'Eureka! Victory', color: '#ff2a85' },
      sleepy: { text: 'Recharging / Break', color: '#9d4edd' }
    };
    const info = moodMap[mood] || moodMap.idle;
    if (moodLabel) moodLabel.textContent = info.text;
    if (moodDot) {
      moodDot.style.backgroundColor = info.color;
      moodDot.style.boxShadow = `0 0 10px ${info.color}`;
    }

    // Toggle debug action button active class
    if (btnDebug) {
      if (mood === 'debugging') {
        btnDebug.classList.add('active');
      } else {
        btnDebug.classList.remove('active');
      }
    }
  }

  // Focus Timer
  const focusTimer = new FocusTimer(timerDisplay, {
    onStateChange: ({ isRunning, isBreak }) => {
      if (btnTimerToggle) {
        btnTimerToggle.textContent = isRunning ? 'Pause Sprint' : 'Start Sprint';
      }
      if (isRunning) {
        moodEngine.setMood(isBreak ? 'sleepy' : 'focused');
        dialogue.speak(isBreak ? "Break time! Rest your eyes and stretch!" : "Focus sprint started! Let's get into flow state! 🚀");
      } else {
        moodEngine.setMood('idle');
      }
    },
    onComplete: ({ wasWorkSprint }) => {
      if (wasWorkSprint) {
        moodEngine.setMood('celebrating');
        dialogue.speak("Sprint complete! Outstanding focus! Take a 5 min break! 🏆", true);
        avatarRenderer.spawnParticle('🎉');
        avatarRenderer.spawnParticle('⭐');
      } else {
        moodEngine.setMood('idle');
        dialogue.speak("Break over! Ready for the next coding sprint?", true);
      }
      if (btnTimerToggle) btnTimerToggle.textContent = 'Start Sprint';
    }
  });

  // Sprint Duration Presets
  sprintTagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sprintTagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mins = parseInt(btn.getAttribute('data-minutes'), 10) || 25;
      focusTimer.setDuration(mins);
      if (btnTimerToggle) btnTimerToggle.textContent = 'Start Sprint';
      soundFX.playBoop(1.1);
    });
  });

  if (btnTimerToggle) {
    btnTimerToggle.addEventListener('click', () => focusTimer.toggle());
  }
  if (btnTimerReset) {
    btnTimerReset.addEventListener('click', () => {
      focusTimer.reset();
      moodEngine.setMood('idle');
      if (btnTimerToggle) btnTimerToggle.textContent = 'Start Sprint';
      soundFX.playBoop(0.8);
    });
  }

  // Typing Reactor
  new TypingReactor({
    onStreakUpdate: (streak) => {
      if (streak > 15 && moodEngine.getMood() === 'idle') {
        moodEngine.setMood('focused');
      }
    }
  });

  // Sound and Voice toggles
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      const isMuted = soundFX.toggleMute();
      btnSound.classList.toggle('active', !isMuted);
      btnSound.textContent = isMuted ? '🔇' : '🔊';
      if (!isMuted) soundFX.playBoop();
    });
  }

  if (btnVoice) {
    let voiceOn = false;
    btnVoice.addEventListener('click', () => {
      voiceOn = !voiceOn;
      dialogue.setVoiceEnabled(voiceOn);
      btnVoice.classList.toggle('active', voiceOn);
      soundFX.playBoop(voiceOn ? 1.4 : 0.8);
      if (voiceOn) {
        dialogue.speak("Voice enabled! I'll cheer you on out loud while you code!");
      }
    });
  }

  // Actions: Petting
  function handlePet() {
    soundFX.playHappyPurr();
    avatarRenderer.triggerPetAnimation();
    moodEngine.boostAffinity(5);
    dialogue.sayRandom('pet');
  }

  if (btnPet) btnPet.addEventListener('click', handlePet);
  if (avatarStage) avatarStage.addEventListener('click', handlePet);

  // Actions: Coffee
  if (btnCoffee) {
    btnCoffee.addEventListener('click', () => {
      soundFX.playCoffee();
      avatarRenderer.spawnParticle('☕');
      avatarRenderer.spawnParticle('⚡');
      moodEngine.feedCoffee();
      dialogue.sayRandom('coffee');
    });
  }

  // Actions: Advice / Talk
  if (btnTalk) {
    btnTalk.addEventListener('click', () => {
      soundFX.playBoop(1.2);
      dialogue.sayRandom(moodEngine.getMood());
    });
  }

  // Actions: Debug Mode Toggle
  if (btnDebug) {
    btnDebug.addEventListener('click', () => {
      soundFX.playBugAlert();
      const nextMood = moodEngine.getMood() === 'debugging' ? 'idle' : 'debugging';
      moodEngine.setMood(nextMood);
      if (nextMood === 'debugging') {
        dialogue.sayRandom('debugging');
        avatarRenderer.spawnParticle('🔍');
      } else {
        dialogue.speak("Bug solved or paused! Back to steady flow.");
      }
    });
  }

  // Actions: Celebrate / Eureka
  if (btnCelebrate) {
    btnCelebrate.addEventListener('click', () => {
      soundFX.playSuccess();
      moodEngine.setMood('celebrating');
      dialogue.sayRandom('celebrating');
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const em = ['🎉', '✨', '⭐', '🚀', '🔥'][i % 5];
          avatarRenderer.spawnParticle(em);
        }, i * 150);
      }
      setTimeout(() => {
        if (moodEngine.getMood() === 'celebrating') {
          moodEngine.setMood('idle');
        }
      }, 5000);
    });
  }

  // Avatar Switcher
  avatarPills.forEach(pill => {
    pill.addEventListener('click', () => {
      avatarPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const avatarId = pill.getAttribute('data-avatar');
      avatarRenderer.setAvatar(avatarId);
      soundFX.playBoop(1.3);
      
      const greetings = {
        cyberbot: "Byte online! All diagnostics green. Let's write high-performance code!",
        kitsune: "Kitsune here! May your logic be swift and bugs be few! ✨",
        slime: "Squish squish! Bouncy slime buddy ready to help you code! 🫧"
      };
      dialogue.speak(greetings[avatarId] || "Hello!");
    });
  });

  // Color Glow Swatches
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const primary = dot.getAttribute('data-primary');
      const accent = dot.getAttribute('data-accent');
      avatarRenderer.setColorTheme(primary, accent);
      soundFX.playBoop(1.2);
    });
  });

  // Picture-in-Picture Floating Manager
  const pipManager = new PipManager(companionCard, (isPipActive) => {
    if (btnPip) {
      btnPip.classList.toggle('active', isPipActive);
      btnPip.innerHTML = isPipActive ? '<span>↩️</span> Dock In App' : '<span>🪟</span> Float over IDE';
    }
  });

  if (btnPip) {
    btnPip.addEventListener('click', () => {
      soundFX.playBoop(1.4);
      pipManager.togglePip();
    });
  }

  // Native Electron Desktop Integration
  if (window.electronAPI && window.electronAPI.isElectron) {
    document.body.classList.add('is-electron');

    const btnWinPin = document.getElementById('btn-win-pin');
    const btnWinMin = document.getElementById('btn-win-min');
    const btnWinClose = document.getElementById('btn-win-close');

    if (btnWinPin) {
      window.electronAPI.getAlwaysOnTop().then((isPinned) => {
        btnWinPin.classList.toggle('active', isPinned);
      });

      btnWinPin.addEventListener('click', async () => {
        const isPinned = await window.electronAPI.toggleAlwaysOnTop();
        btnWinPin.classList.toggle('active', isPinned);
        soundFX.playBoop(isPinned ? 1.4 : 0.8);
        dialogue.speak(isPinned ? "Pinned! I'll stay on top while you code." : "Unpinned.");
      });
    }

    if (btnWinMin) {
      btnWinMin.addEventListener('click', () => {
        window.electronAPI.minimize();
      });
    }

    if (btnWinClose) {
      btnWinClose.addEventListener('click', () => {
        window.electronAPI.close();
      });
    }
  }
});
