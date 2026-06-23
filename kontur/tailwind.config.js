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
        "on-error": "#ffffff",
        "inverse-surface": "#32302a",
        "on-surface": "#1c1c16",
        "surface": "#fdf9f0",
        "surface-container-highest": "#e6e2d9",
        "on-primary-container": "#858383",
        "on-tertiary-container": "#80867a",
        "secondary-container": "#e5e2dc",
        "surface-bright": "#fdf9f0",
        "secondary": "#5f5e5a",
        "on-primary-fixed": "#1c1b1b",
        "inverse-primary": "#c8c6c5",
        "primary-fixed-dim": "#c8c6c5",
        "tertiary-container": "#181d15",
        "on-secondary-fixed-variant": "#474743",
        "background": "#fdf9f0",
        "secondary-fixed-dim": "#c9c6c1",
        "tertiary-fixed-dim": "#c3c9bb",
        "secondary-fixed": "#e5e2dc",
        "surface-variant": "#e6e2d9",
        "on-background": "#1c1c16",
        "on-tertiary": "#ffffff",
        "tertiary": "#000000",
        "outline-variant": "#c4c7c7",
        "surface-container-low": "#f7f3ea",
        "on-surface-variant": "#444748",
        "on-error-container": "#93000a",
        "on-primary-fixed-variant": "#474746",
        "tertiary-fixed": "#dfe5d6",
        "surface-tint": "#5f5e5e",
        "inverse-on-surface": "#f5f0e7",
        "error-container": "#ffdad6",
        "error": "#ba1a1a",
        "outline": "#747878",
        "on-tertiary-fixed-variant": "#43493e",
        "primary": "#000000",
        "primary-container": "#1c1b1b",
        "surface-container-lowest": "#ffffff",
        "on-secondary-fixed": "#1c1c18",
        "on-secondary": "#ffffff",
        "surface-container-high": "#ece8df",
        "surface-dim": "#dedad1",
        "on-secondary-container": "#656460",
        "on-primary": "#ffffff",
        "surface-container": "#f2ede4",
        "primary-fixed": "#e5e2e1",
        "on-tertiary-fixed": "#181d15"
      },
      "borderRadius": {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      "spacing": {
        "unit": "4px",
        "gutter": "24px",
        "margin-edge": "48px",
        "section-gap": "120px"
      },
      "fontFamily": {
        "label-caps": ["Geist", "sans-serif"],
        "mono-ui": ["Geist", "monospace"],
        "display-lg": ["EB Garamond", "serif"],
        "headline-sm": ["EB Garamond", "serif"],
        "headline-md": ["EB Garamond", "serif"],
        "body-md": ["Geist", "sans-serif"],
        "display-lg-mobile": ["EB Garamond", "serif"],
        "body-lg": ["Geist", "sans-serif"]
      },
      "fontSize": {
        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "600" }],
        "mono-ui": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "display-lg": ["84px", { "lineHeight": "90px", "letterSpacing": "-0.02em", "fontWeight": "400" }],
        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "500" }],
        "headline-md": ["40px", { "lineHeight": "48px", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "display-lg-mobile": ["48px", { "lineHeight": "52px", "letterSpacing": "-0.01em", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    forms
  ],
}
