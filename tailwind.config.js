/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  content: [
    "./src/index.html",
    "./src/**/*.{html,js}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "on-secondary": "#ffffff",
        "on-surface-variant": "#4c4546",
        "background": "#f9f9f9",
        "outline-variant": "#cfc4c5",
        "tertiary": "#000000",
        "on-background": "#1b1b1b",
        "surface-bright": "#f9f9f9",
        "on-surface": "#1b1b1b",
        "on-tertiary": "#ffffff",
        "on-error-container": "#93000a",
        "on-secondary-fixed-variant": "#474646",
        "secondary-fixed-dim": "#c8c6c5",
        "outline": "#7e7576",
        "on-error": "#ffffff",
        "inverse-on-surface": "#f1f1f1",
        "surface-dim": "#dadada",
        "primary-fixed-dim": "#c6c6c6",
        "surface": "#f9f9f9",
        "surface-container-highest": "#e2e2e2",
        "surface-container-high": "#e8e8e8",
        "tertiary-fixed-dim": "#c6c6c6",
        "surface-container-lowest": "#ffffff",
        "inverse-surface": "#303030",
        "on-tertiary-container": "#848484",
        "on-primary-container": "#848484",
        "on-primary-fixed-variant": "#474747",
        "on-tertiary-fixed-variant": "#474747",
        "secondary-fixed": "#e5e2e1",
        "inverse-primary": "#c6c6c6",
        "secondary-container": "#e5e2e1",
        "primary-container": "#1b1b1b",
        "on-secondary-container": "#656464",
        "surface-container": "#eeeeee",
        "primary-fixed": "#e2e2e2",
        "on-tertiary-fixed": "#1b1b1b",
        "surface-variant": "#e2e2e2",
        "on-secondary-fixed": "#1c1b1b",
        "error-container": "#ffdad6",
        "surface-tint": "#5e5e5e",
        "on-primary": "#ffffff",
        "on-primary-fixed": "#1b1b1b",
        "surface-container-low": "#f3f3f3",
        "tertiary-container": "#1b1b1b",
        "secondary": "#5f5e5e",
        "error": "#ba1a1a",
        "tertiary-fixed": "#e2e2e2"
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "0px"
      },
      spacing: {
        "lg": "24px",
        "gutter": "16px",
        "margin-mobile": "16px",
        "2xl": "48px",
        "xl": "32px",
        "margin-desktop": "32px",
        "md": "16px",
        "unit": "4px",
        "sm": "8px",
        "xs": "4px"
      },
      fontFamily: {
        "headline-lg": ["JetBrains Mono", "monospace"],
        "headline-md": ["JetBrains Mono", "monospace"],
        "code-inline": ["JetBrains Mono", "monospace"],
        "label-md": ["JetBrains Mono", "monospace"],
        "body-lg": ["JetBrains Mono", "monospace"],
        "body-md": ["JetBrains Mono", "monospace"],
        "headline-sm": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "code-inline": ["14px", { "lineHeight": "1", "letterSpacing": "0em", "fontWeight": "400" }],
        "label-md": ["12px", { "lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "body-lg": ["16px", { "lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400" }],
        "body-md": ["14px", { "lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400" }],
        "headline-sm": ["18px", { "lineHeight": "1.4", "letterSpacing": "0em", "fontWeight": "700" }]
      }
    }
  },
  plugins: [
    forms
  ],
}
