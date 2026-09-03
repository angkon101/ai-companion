import { soundFX } from './audio/soundFX.js';
import { PetBrain } from './pet/petBrain.js';
import { PipManager } from './companion/pipManager.js';

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const petStage = document.getElementById('pet-stage');
  const catActor = document.getElementById('pet-cat-actor');
  const petRoomCard = document.getElementById('pet-room-card');

  const btnSound = document.getElementById('btn-sound-toggle');
  const btnPip = document.getElementById('btn-pip-toggle');

  const btnGroom = document.getElementById('btn-pet-groom');
  const btnRoam = document.getElementById('btn-pet-roam');
  const btnTreat = document.getElementById('btn-pet-treat');

  const breedPills = document.querySelectorAll('.breed-pill');

  // Initialize Autonomous Living Cat
  const petBrain = new PetBrain(petStage, catActor);

  // Breed Switcher
  breedPills.forEach(pill => {
    pill.addEventListener('click', () => {
      breedPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const breedId = pill.getAttribute('data-breed');
      petBrain.setBreed(breedId);
      soundFX.playMeow(1.1);
    });
  });

  // Action: Clean Paw
  if (btnGroom) {
    btnGroom.addEventListener('click', () => {
      petBrain.triggerClean();
    });
  }

  // Action: Roam Around
  if (btnRoam) {
    btnRoam.addEventListener('click', () => {
      petBrain.triggerRoam();
      soundFX.playTrill();
    });
  }

  // Action: Give Fish Treat
  if (btnTreat) {
    btnTreat.addEventListener('click', () => {
      soundFX.playCrunch();
      soundFX.playPurr(3.5);
      petBrain.spawnParticle('🐟');
      petBrain.spawnParticle('✨');
      petBrain.triggerPetting();
    });
  }

  // Sound Mute Toggle
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      const isMuted = soundFX.toggleMute();
      btnSound.classList.toggle('active', !isMuted);
      btnSound.textContent = isMuted ? '🔇' : '🔊';
      if (!isMuted) soundFX.playTrill();
    });
  }

  // Picture-in-Picture Floating Manager
  const pipManager = new PipManager(petRoomCard, (isPipActive) => {
    if (btnPip) {
      btnPip.classList.toggle('active', isPipActive);
      btnPip.innerHTML = isPipActive ? '<span>↩️</span> Dock' : '<span>🪟</span> Float';
    }
  });

  if (btnPip) {
    btnPip.addEventListener('click', () => {
      soundFX.playTrill();
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
        soundFX.playTrill();
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
