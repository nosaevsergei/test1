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
        "surface-container-highest": "#33343c",
        "on-tertiary-fixed-variant": "#474649",
        "inverse-on-surface": "#2f3038",
        "tertiary-fixed": "#e5e1e4",
        "secondary-fixed-dim": "#4edea3",
        "secondary": "#4edea3",
        "surface-variant": "#33343c",
        "tertiary": "#c8c6c8",
        "on-primary": "#1000a9",
        "on-primary-container": "#0d0096",
        "on-background": "#e3e1ec",
        "on-primary-fixed-variant": "#2f2ebe",
        "surface-container-lowest": "#0d0e15",
        "primary": "#c0c1ff",
        "surface-dim": "#12131a",
        "surface-container-high": "#292931",
        "on-secondary-container": "#00311f",
        "on-primary-fixed": "#07006c",
        "tertiary-container": "#929093",
        "primary-fixed-dim": "#c0c1ff",
        "error": "#ffb4ab",
        "surface": "#12131a",
        "inverse-primary": "#494bd6",
        "on-surface": "#e3e1ec",
        "on-surface-variant": "#c7c4d7",
        "on-secondary": "#003824",
        "on-tertiary-container": "#2a292c",
        "surface-tint": "#c0c1ff",
        "primary-fixed": "#e1e0ff",
        "on-error": "#690005",
        "surface-container-low": "#1a1b22",
        "on-tertiary-fixed": "#1c1b1d",
        "on-secondary-fixed": "#002113",
        "on-error-container": "#ffdad6",
        "tertiary-fixed-dim": "#c8c6c8",
        "outline-variant": "#464554",
        "secondary-fixed": "#6ffbbe",
        "error-container": "#93000a",
        "on-secondary-fixed-variant": "#005236",
        "secondary-container": "#00a572",
        "surface-bright": "#383941",
        "surface-container": "#1e1f26",
        "inverse-surface": "#e3e1ec",
        "primary-container": "#8083ff",
        "outline": "#908fa0",
        "on-tertiary": "#313032",
        "background": "#12131a",
        "brand-indigo": "#6366F1",
        "brand-emerald": "#10B981"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
        "bento": "16px"
      },
      "spacing": {
        "container-max": "1280px",
        "margin-mobile": "16px",
        "margin-desktop": "40px",
        "gutter": "24px",
        "bento-gap": "16px"
      },
      "fontFamily": {
        "label-md": ["Geist"],
        "headline-xl": ["Inter"],
        "headline-md": ["Inter"],
        "label-sm": ["Geist"],
        "body-md": ["Inter"],
        "headline-xl-mobile": ["Inter"],
        "body-lg": ["Inter"],
        "headline-lg": ["Inter"],
        "headline-lg-mobile": ["Inter"]
      },
      "fontSize": {
        "label-md": ["14px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "headline-xl": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
        "label-sm": ["12px", {"lineHeight": "1.0", "fontWeight": "400"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-xl-mobile": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-lg": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "headline-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "600"}]
      }
    },
  },
  plugins: [
    forms
  ],
}
