"""
AI Online Pet Cat - Python Desktop Edition
Runs an always-on-top, lightweight native desktop pet window on Windows.
"""

import os
import sys
import webview

def get_entry_url():
    # If Vite dev server is running on localhost:3333, use it
    # Otherwise, fallback to the built dist/index.html
    dev_url = "http://localhost:3333"
    try:
        import urllib.request
        with urllib.request.urlopen(dev_url, timeout=1) as response:
            if response.status == 200:
                print(f"[AI Pet] Connected to live dev server: {dev_url}")
                return dev_url
    except Exception:
        pass

    # Fallback to local production build
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dist_file = os.path.join(current_dir, "dist", "index.html")
    if os.path.exists(dist_file):
        print(f"[AI Pet] Loading standalone local build: {dist_file}")
        return dist_file

    # Fallback to source index.html
    return os.path.join(current_dir, "index.html")

def main():
    target_url = get_entry_url()

    print("[AI Pet] Launching Desktop Cat Companion...")
    print("- Always on Top: ENABLED (floats right over Antigravity IDE)")
    print("- Roaming: ACTIVE")
    print("- Paw Swatting: ACTIVE")

    # Create native Windows desktop pet window
    window = webview.create_window(
        title="AI Online Pet Cat",
        url=target_url,
        width=440,
        height=380,
        resizable=True,
        on_top=True,        # Always floats on top while you code!
        frameless=False,
        easy_drag=True,
        background_color="#080b12"
    )

    webview.start()

if __name__ == "__main__":
    main()
