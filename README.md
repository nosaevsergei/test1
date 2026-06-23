# Multi-Site Workspace

This repository hosts six frontend projects under a unified portal:
- 🌐 **Main Portal**: [https://nosaevsergei.github.io/test1/](https://nosaevsergei.github.io/test1/)

## 🚀 Projects Included:

1. **СИНАПС (Subfolder: `/synapse`)**: A cyber-minimalistic AI connection and automation platform landing page.
   - 🌐 **Live Demo**: [https://nosaevsergei.github.io/test1/synapse/](https://nosaevsergei.github.io/test1/synapse/)
2. **Баланс (Subfolder: `/balance`)**: A premium marketing landing page for a smart subscription and expense tracker.
   - 🌐 **Live Demo**: [https://nosaevsergei.github.io/test1/balance/](https://nosaevsergei.github.io/test1/balance/)
3. **NIL_ (Subfolder: `/nil`)**: A strictly utilitarian, distraction-free text environment for thinkers and builders.
   - 🌐 **Live Demo**: [https://nosaevsergei.github.io/test1/nil/](https://nosaevsergei.github.io/test1/nil/)
4. **КОНТУР (Subfolder: `/kontur`)**: A premium light-mode architectural website portfolio.
   - 🌐 **Live Demo**: [https://nosaevsergei.github.io/test1/kontur/](https://nosaevsergei.github.io/test1/kontur/)
5. **КЛАСТЕР (Subfolder: `/cluster`)**: A vibrant, pop-brutalist interactive task manager and dashboard.
   - 🌐 **Live Demo**: [https://nosaevsergei.github.io/test1/cluster/](https://nosaevsergei.github.io/test1/cluster/)
6. **СПЕКТР (Subfolder: `/spectr`)**: A premium hardware landing page. Dynamic Web Audio switch sound synthesizer, scroll-driven anatomy exploded view, and light presets customizer.
   - 🌐 **Live Demo**: [https://nosaevsergei.github.io/test1/spectr/](https://nosaevsergei.github.io/test1/spectr/)

---

## ⚙️ GitHub Pages Deployment Configuration

To host all six sites on GitHub Pages, follow these configuration steps:

1. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub: **Settings -> Pages**.
   - Under **Build and deployment -> Source**, select **GitHub Actions** (instead of "Deploy from a branch").
2. **Push Changes**:
   - Pushing code to the `main` branch automatically triggers the `Deploy to GitHub Pages` workflow.
   - The workflow installs dependencies and compiles the `/nil`, `/balance`, `/synapse`, `/kontur`, `/cluster`, and `/spectr` projects, bundles them into nested directories inside the `dist/` directory, copies the root portal `index.html`, and deploys everything to your GitHub Pages site.

---

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
