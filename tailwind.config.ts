import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#91472F",
        surface: "#FAF9F6",
        "surface-dim": "#DBDAD7",
        "surface-bright": "#FAF9F6",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F4F3F1",
        "surface-container": "#EFEEEB",
        "surface-container-high": "#E9E8E5",
        "surface-container-highest": "#E3E2E0",
        "surface-variant": "#E3E2E0",
        "on-surface": "#1A1C1A",
        "on-surface-variant": "#54433E",
        "inverse-surface": "#2F312F",
        "inverse-on-surface": "#F2F1EE",
        outline: "#87736D",
        "outline-variant": "#DAC1BA",
        "surface-tint": "#944931",
        "on-primary": "#FFFFFF",
        "primary-container": "#AF5E45",
        "on-primary-container": "#FFFBFF",
        "inverse-primary": "#FFB59E",
        secondary: "#645E49",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#E8DFC5",
        "on-secondary-container": "#68634D",
        tertiary: "#006768",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#158183",
        "on-tertiary-container": "#F3FFFF",
        error: "#BA1A1A",
        "on-error": "#FFFFFF",
        "error-container": "#FFDAD6",
        "on-error-container": "#93000A",
        "primary-fixed": "#FFDBD0",
        "primary-fixed-dim": "#FFB59E",
        "on-primary-fixed": "#3A0B00",
        "on-primary-fixed-variant": "#76321C",
        "secondary-fixed": "#EBE2C8",
        "secondary-fixed-dim": "#CEC6AD",
        "on-secondary-fixed": "#1F1C0B",
        "on-secondary-fixed-variant": "#4C4733",
        "tertiary-fixed": "#97F2F3",
        "tertiary-fixed-dim": "#7AD5D7",
        "on-tertiary-fixed": "#002020",
        "on-tertiary-fixed-variant": "#004F51",
        background: "#FAF9F6",
        "on-background": "#1A1C1A",
        bone: "#FAFAED",
        ivory: "#FDFBF7",
        espresso: "#262522",
        terracotta: "#C97A53",
        ochre: "#D4A373",
        nude: "#E6CCB2",
        sage: "#768971"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        ambient: "0 12px 32px rgba(145, 71, 47, 0.04)",
        soft: "0 24px 70px rgba(38, 37, 34, 0.08)",
        button: "0 20px 48px rgba(201, 122, 83, 0.28)",
        sheet: "0 -20px 60px rgba(38, 37, 34, 0.18)"
      },
      keyframes: {
        "soft-pulse": {
          "0%, 100%": {
            transform: "scale(0.98)",
            opacity: "0.68"
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "1"
          }
        },
        drift: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)"
          },
          "50%": {
            transform: "translate3d(0, 12px, 0)"
          }
        },
        scanline: {
          "0%": {
            transform: "translateY(-120px)",
            opacity: "0"
          },
          "30%": {
            opacity: "1"
          },
          "100%": {
            transform: "translateY(120px)",
            opacity: "0"
          }
        },
        rise: {
          from: {
            opacity: "0",
            transform: "translateY(24px)"
          },
          to: {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        "soft-pulse": "soft-pulse 3.2s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
        scanline: "scanline 2.2s ease-in-out infinite",
        rise: "rise 500ms ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
