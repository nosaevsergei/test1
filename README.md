# NIL_ 

> A strictly utilitarian, distraction-free text environment for thinkers, builders, and the noise-averse.

[![Deploy to GitHub Pages](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/actions/workflows/deploy.yml/badge.svg)](https://nosaevsergei.github.io/nil-scratchpad/)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/nosaevsergei/nil-scratchpad)

NIL is a minimalist landing page and web application built with **Vanilla JS**, **Vite**, and **Tailwind CSS**. It is extremely lightweight, keeping the final production bundle size under **26 KB** (well under the 40KB budget), with zero heavy external dependencies.

---

## 🛠️ Implemented Features

1. **Hero Terminal Typewriter**: Active line-by-line CLI text simulation on load with customizable delays and styled list highlighting.
2. **Interactive Neo-Brutalist Grid**: 2x2 grid features that instantly invert colors (background, text, and borders) on mouse hover.
3. **Core Fullscreen Editor**: 
   - Activates via "LAUNCH APP" buttons or pressing `Enter` on the keyboard.
   - Text inputs persist in the browser `localStorage` dynamically.
   - Includes a custom-designed, scroll-synced line number gutter.
   - Real-time character, word, and cursor position (`L / C`) status bar tracking.
   - Dynamic memory usage display based on exact buffer length (KB).
   - Pressing `Ctrl + S` or `Cmd + S` overrides the browser save dialog to display a flashing `[ SAVED TO LOCAL_STORAGE ]` alert.
   - Exits back to the landing page via `Esc` key or the exit button.

---

## 🚀 How to Run Locally

Clone the repository and install dependencies:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Build and preview the production bundle:

```bash
# Compile and optimize assets
npm run build

# Preview build locally
npm run preview
```

---

## ⚙️ Configuration Details
- **Dynamic Public Path**: The build environment in `vite.config.js` dynamically resolves the repository base path under GitHub Pages using the `GITHUB_REPOSITORY` environment variable.
- **GitHub Actions Deployment**: Automatic production builds and deployments are triggered on every push to the `main` branch via `.github/workflows/deploy.yml`.
