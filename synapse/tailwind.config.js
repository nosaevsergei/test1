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
        "primary-fixed-dim": "#4cd7f6",
        "on-primary-fixed-variant": "#004e5c",
        "inverse-surface": "#dee3e6",
        "on-primary-fixed": "#001f26",
        "outline-variant": "#3d494c",
        "on-primary-container": "#00424f",
        "primary": "#4cd7f6",
        "on-background": "#dee3e6",
        "surface-dim": "#0e1416",
        "on-secondary-container": "#c4abff",
        "on-tertiary": "#4b2800",
        "surface-container-lowest": "#090f11",
        "on-error-container": "#ffdad6",
        "on-error": "#690005",
        "tertiary": "#ffb873",
        "surface-container-low": "#171d1e",
        "surface-container-high": "#252b2d",
        "primary-container": "#06b6d4",
        "tertiary-container": "#e89337",
        "inverse-primary": "#00687a",
        "secondary-fixed-dim": "#d0bcff",
        "surface-tint": "#4cd7f6",
        "error-container": "#93000a",
        "surface-container-highest": "#303638",
        "secondary-container": "#571bc1",
        "on-secondary-fixed": "#23005c",
        "on-tertiary-container": "#5b3200",
        "error": "#ffb4ab",
        "secondary": "#d0bcff",
        "outline": "#869397",
        "on-tertiary-fixed": "#2d1600",
        "on-primary": "#003640",
        "on-surface-variant": "#bcc9cd",
        "on-tertiary-fixed-variant": "#6a3b00",
        "surface-container": "#1b2122",
        "background": "#0e1416",
        "inverse-on-surface": "#2b3133",
        "tertiary-fixed": "#ffdcbf",
        "secondary-fixed": "#e9ddff",
        "on-surface": "#dee3e6",
        "surface-variant": "#303638",
        "surface": "#0e1416",
        "primary-fixed": "#acedff",
        "surface-bright": "#343a3c",
        "tertiary-fixed-dim": "#ffb873",
        "on-secondary-fixed-variant": "#5516be",
        "on-secondary": "#3c0091"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "lg": "48px",
        "gutter": "24px",
        "xs": "4px",
        "md": "24px",
        "xl": "80px",
        "base": "8px",
        "sm": "12px",
        "container-max": "1440px"
      },
      "fontFamily": {
        "label-mono": ["JetBrains Mono"],
        "headline-lg": ["Inter"],
        "headline-xl": ["Inter"],
        "headline-lg-mobile": ["Inter"],
        "body-md": ["Inter"],
        "caption": ["Inter"]
      },
      "fontSize": {
        "label-mono": ["13px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-xl": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "caption": ["12px", { "lineHeight": "1.4", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    forms
  ],
}
