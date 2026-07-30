# Shield.js Tech Stack & Architecture

To build Shield.js efficiently, maintain a tiny footprint, and eventually monetize it, the project is divided into two distinct parts: **The Core Library** (what the user installs) and **The SaaS Dashboard** (where you manage API keys and users).

## 1. The Core Library (Shield.js)
This is the script that executes on the client's website. It must be brutally fast and small.

*   **Language:** **TypeScript**
    *   *Why:* Ensures strict typing and prevents bugs during development of complex DOM manipulation logic.
*   **Bundler:** **Vite** or **Rollup**
    *   *Why:* We need to output a highly optimized, minified standard JavaScript file (UMD/ESM formats) with zero bloated dependencies.
*   **Obfuscator:** **javascript-obfuscator** (NPM package)
    *   *Why:* To prevent developers from simply reading the Shield.js source code in the network tab and easily bypassing the debugger traps.
*   **Testing:** **Playwright**
    *   *Why:* Standard unit tests (like Jest) cannot test actual browser events like Print Screen or DevTools opening. Playwright runs a real Chromium/Webkit browser to automate testing of the traps.
*   **Distribution:** **NPM Registry** (for React/Node users) and **jsDelivr/unpkg** (for raw CDN `<script>` tags).

## 2. The SaaS Platform & Dashboard
If you want to track analytics, issue API keys (to prevent abuse), and eventually charge subscriptions for premium features.

*   **Frontend Framework:** **Next.js (React)** 
    *   *Why:* Perfect for building both the marketing landing page (SEO friendly) and the secure user dashboard.
*   **Styling:** **Tailwind CSS** + **shadcn/ui**
    *   *Why:* Allows for rapid UI development with highly polished, accessible components.
*   **Database:** **Supabase** or **Firebase**
    *   *Why:* Provides out-of-the-box authentication, API key storage, and user management without needing to write a massive custom backend.
*   **Deployment:** **Vercel**
    *   *Why:* Seamless integration with Next.js for rapid, global deployments.

## 3. Development Workflow (How to start fresh)
1.  Initialize a new empty directory (`mkdir ShieldJS`).
2.  Set up the core library package (`npm init -y`).
3.  Install TypeScript and Vite (`npm install -D typescript vite`).
4.  Create your entry point (`src/index.ts`) and start building the `contextmenu` and DevTools traps!
