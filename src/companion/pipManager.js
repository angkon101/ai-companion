/**
 * Document Picture-in-Picture & Compact Popout Manager
 * Enables an always-on-top floating desktop companion while working in Antigravity IDE!
 */

export class PipManager {
  constructor(companionContainer, onPipToggle) {
    this.container = companionContainer;
    this.onPipToggle = onPipToggle || (() => {});
    this.pipWindow = null;
    this.isFloating = false;
  }

  isSupported() {
    return 'documentPictureInPicture' in window;
  }

  async togglePip() {
    if (this.isFloating && this.pipWindow) {
      this.pipWindow.close();
      return;
    }

    if (this.isSupported()) {
      try {
        // Request Document Picture-in-Picture window
        this.pipWindow = await window.documentPictureInPicture.requestWindow({
          width: 340,
          height: 480
        });

        // Copy all style sheets into the PiP window
        [...document.styleSheets].forEach((styleSheet) => {
          try {
            if (styleSheet.href) {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.type = styleSheet.type;
              link.media = styleSheet.media;
              link.href = styleSheet.href;
              this.pipWindow.document.head.appendChild(link);
            } else if (styleSheet.cssRules) {
              const style = document.createElement('style');
              [...styleSheet.cssRules].forEach((rule) => {
                style.appendChild(document.createTextNode(rule.cssText));
              });
              this.pipWindow.document.head.appendChild(style);
            }
          } catch (e) {
            console.warn('Style copy exception', e);
          }
        });

        // Set PIP body styling
        this.pipWindow.document.body.classList.add('pip-mode-active');
        this.pipWindow.document.body.style.margin = '0';
        this.pipWindow.document.body.style.background = '#0a0d14';
        this.pipWindow.document.body.style.overflow = 'hidden';

        // Move companion container to PIP window
        this.pipWindow.document.body.appendChild(this.container);
        this.isFloating = true;
        this.onPipToggle(true);

        // When PIP window closes, move companion back to original parent
        this.pipWindow.addEventListener('pagehide', () => {
          const originalParent = document.getElementById('companion-dock-slot');
          if (originalParent && this.container) {
            originalParent.appendChild(this.container);
          }
          this.isFloating = false;
          this.pipWindow = null;
          this.onPipToggle(false);
        });

      } catch (err) {
        console.error('Failed to open Document PIP window:', err);
        this.fallbackPopup();
      }
    } else {
      this.fallbackPopup();
    }
  }

  fallbackPopup() {
    // Standard mini popup window fallback
    const width = 340;
    const height = 480;
    const left = window.screen.width - width - 20;
    const top = 60;
    const popup = window.open(
      window.location.href,
      'AiCompanionPopup',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no`
    );
    if (popup) {
      popup.focus();
    } else {
      alert('Pop-up was blocked. Please allow pop-ups to float your companion beside Antigravity IDE!');
    }
  }
}
