/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "var(--accent-color)",
        "secondary-fixed-dim": "#c6c6c7",
        "primary-fixed": "#ffdbca",
        "on-surface-variant": "#e0c0b1",
        "surface-container": "#201f20",
        "on-secondary-container": "#b4b5b5",
        "outline": "#a78b7d",
        "inverse-surface": "#e5e2e3",
        "surface-tint": "#ffb690",
        "on-surface": "#e5e2e3",
        "on-tertiary-fixed-variant": "#44474b",
        "inverse-on-surface": "#313031",
        "error": "#ffb4ab",
        "secondary": "#c6c6c7",
        "surface-dim": "#131314",
        "surface-variant": "#353436",
        "tertiary-fixed-dim": "#c4c6cc",
        "outline-variant": "#584237",
        "on-primary-container": "#582200",
        "tertiary-fixed": "#e0e2e8",
        "primary-fixed-dim": "#ffb690",
        "tertiary-container": "#989ba0",
        "surface-container-low": "#1c1b1c",
        "on-tertiary": "#2d3135",
        "on-tertiary-fixed": "#181c20",
        "on-primary-fixed-variant": "#783200",
        "background": "#131314",
        "error-container": "#93000a",
        "on-background": "#e5e2e3",
        "on-secondary-fixed": "#1a1c1c",
        "surface-bright": "#39393a",
        "surface": "#131314",
        "tertiary": "#c4c6cc",
        "on-secondary": "#2f3131",
        "on-tertiary-container": "#2f3337",
        "on-error": "#690005",
        "inverse-primary": "#9d4300",
        "surface-container-high": "#2a2a2b",
        "on-error-container": "#ffdad6",
        "secondary-container": "#454747",
        "on-secondary-fixed-variant": "#454747",
        "surface-container-highest": "#353436",
        "secondary-fixed": "#e2e2e2",
        "primary-container": "#f97316",
        "surface-container-lowest": "#0e0e0f",
        "on-primary-fixed": "#341100",
        "on-primary": "#552100"
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      spacing: {
        "margin-desktop": "64px",
        "grid-unit": "8px",
        "gutter": "1px",
        "margin-mobile": "24px",
        "container-max": "1440px"
      },
      fontFamily: {
        "display-xl-mobile": ["Anybody", "sans-serif"],
        "body-main": ["Geist", "sans-serif"],
        "headline-lg": ["Anybody", "sans-serif"],
        "display-xl": ["Anybody", "sans-serif"],
        "body-large": ["Geist", "sans-serif"],
        "technical-data": ["JetBrains Mono", "monospace"],
        "headline-lg-mobile": ["Anybody", "sans-serif"],
        "label-sm": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "display-xl-mobile": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.01em", "fontWeight": "900" }],
        "body-main": ["15px", { "lineHeight": "1.5", "letterSpacing": "0px", "fontWeight": "400" }],
        "headline-lg": ["40px", { "lineHeight": "1.1", "letterSpacing": "0.02em", "fontWeight": "800" }],
        "display-xl": ["80px", { "lineHeight": "1.0", "letterSpacing": "-0.02em", "fontWeight": "900" }],
        "body-large": ["18px", { "lineHeight": "1.6", "letterSpacing": "0px", "fontWeight": "400" }],
        "technical-data": ["13px", { "lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "headline-lg-mobile": ["28px", { "lineHeight": "1.2", "letterSpacing": "0.02em", "fontWeight": "800" }],
        "label-sm": ["11px", { "lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "600" }]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
