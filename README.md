# Shield.js 🛡️

A zero-dependency, ultra-lightweight client-side JavaScript library designed to provide maximum friction against content theft, web scraping, and unauthorized inspection. 

At just **~3KB gzipped**, Shield.js offers enterprise-grade protections without sacrificing performance or adding bloat to your web application.

---

## ⚡ Features

1. **DOM Poisoning:** Defeats scrapers by injecting zero-width characters and randomized, invisible garbage text into paragraphs, rendering scraped data useless. Tracks state invisibly via `WeakSet`.
2. **Invisible Image Overlays (Glass Shield):** Protects images by automatically generating a transparent, unselectable overlay on top of every `<img>` tag, thwarting "Save Image As" extensions and scrapers.
3. **DevTools Trap:** Freezes the screen and locks out users attempting to profile or inspect the DOM using browser Developer Tools.
4. **Anti-Clickjacking (Frame-Buster):** Prevents other domains from embedding your site in an `<iframe>`.
5. **Print Media Shield:** Renders the page entirely blank if a user attempts to "Print" or "Save as PDF".
6. **Advanced Shortcut & Event Blocking:** Blocks Context Menus (Right Click), Developer Tool shortcuts (Windows & Mac), Copy/Cut/Paste, text highlighting, and dragging.
7. **Snipping Tool Defeat:** Blurs the screen perfectly over the hardware interrupt window of `PrintScreen` and `Win+Shift+S`.

---

## 🚀 Installation & Integration

Shield.js is designed to be a **zero-configuration drop-in**. The moment the script loads into the browser, it automatically initializes and arms all security protocols.

You have two ways to integrate it into your user's websites:

### Method 1: Drop-in Script Tag (Easiest)
For traditional HTML websites, WordPress, or users who want the easiest integration, they simply copy and paste the `shield.min.js` file into their `<head>` tag. 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Protected Website</title>
    
    <!-- Drop this into the head tag -->
    <script src="/path/to/dist/shield.min.js"></script>
    
</head>
<body>
    <p>This text is protected against scrapers!</p>
    <img src="photo.jpg" alt="Protected image" />
</body>
</html>
```

### Method 2: NPM / ES Module (For React, Next.js, Vue)
If you publish this package to NPM, developers can install it and import it directly into their modern JavaScript frameworks. 

Because we built the `MutationWatcher`, Shield.js fully supports Single Page Applications (SPAs). It will automatically protect new text and images as they dynamically load via React/Vue routing.

**1. Install via NPM:**
```bash
npm install shield.js
```

**2. Import in your main entry file (e.g., `main.tsx`, `_app.tsx`, `index.js`):**
```javascript
// Just import it! It auto-initializes and secures the entire app globally.
import 'shield.js'; 

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

## ⚠️ Disclaimer
Client-side protection is a **deterrent**, not a flawless security boundary. While Shield.js provides maximum friction against 99% of scraping bots, script kiddies, and casual thieves, it cannot prevent OS-level hardware capture devices, OCR cameras, or network-level API interception. For highly sensitive data, always combine Shield.js with strong backend authentication and rate-limiting.
