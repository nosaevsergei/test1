/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "error": "#ba1a1a",
        "on-secondary-container": "#693300",
        "inverse-on-surface": "#f2f1ee",
        "secondary-fixed": "#ffdcc5",
        "surface-container-low": "#f4f3f1",
        "background": "#faf9f6",
        "inverse-surface": "#2f312f",
        "surface-container-highest": "#e3e2e0",
        "primary-fixed": "#ffe083",
        "primary": "#735c00",
        "on-secondary": "#ffffff",
        "surface-variant": "#e3e2e0",
        "inverse-primary": "#eec200",
        "on-secondary-fixed": "#301400",
        "primary-container": "#facc15",
        "surface-container": "#efeeeb",
        "surface-container-high": "#e9e8e5",
        "surface-tint": "#735c00",
        "tertiary-container": "#53eaae",
        "on-tertiary-fixed-variant": "#005137",
        "secondary-container": "#fd933d",
        "on-tertiary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "on-background": "#1a1c1a",
        "on-primary-container": "#6c5700",
        "on-primary-fixed-variant": "#574500",
        "error-container": "#ffdad6",
        "tertiary-fixed-dim": "#45dfa4",
        "on-tertiary-fixed": "#002114",
        "on-surface-variant": "#4d4632",
        "tertiary": "#006c4b",
        "primary-fixed-dim": "#eec200",
        "outline": "#7f7660",
        "surface": "#faf9f6",
        "on-primary": "#ffffff",
        "secondary": "#944a00",
        "surface-dim": "#dbdad7",
        "on-error": "#ffffff",
        "outline-variant": "#d1c6ab",
        "surface-bright": "#faf9f6",
        "on-primary-fixed": "#231b00",
        "tertiary-fixed": "#68fcbf",
        "on-surface": "#1a1c1a",
        "on-tertiary-container": "#006747",
        "on-error-container": "#93000a",
        "secondary-fixed-dim": "#ffb783",
        "on-secondary-fixed-variant": "#713700"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "gutter": "24px",
        "unit": "4px",
        "margin-page": "32px",
        "stack-gap": "12px",
        "card-padding": "20px"
      },
      "fontFamily": {
        "headline-md": ["Anybody", "sans-serif"],
        "headline-lg": ["Anybody", "sans-serif"],
        "label-sm": ["Space Mono", "monospace"],
        "headline-lg-mobile": ["Anybody", "sans-serif"],
        "body-lg": ["Hanken Grotesk", "sans-serif"],
        "body-md": ["Hanken Grotesk", "sans-serif"],
        "label-md": ["Space Mono", "monospace"],
        "display-lg": ["Anybody", "sans-serif"]
      },
      "fontSize": {
        "headline-md": ["24px", { "lineHeight": "1.2", "fontWeight": "800" }],
        "headline-lg": ["40px", { "lineHeight": "1.2", "fontWeight": "800" }],
        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "800" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "500" }],
        "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "500" }],
        "label-md": ["14px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "display-lg": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "900" }]
      }
    },
  },
  plugins: [
    forms
  ],
}
