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
        primary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      spacing: {
        section: "5rem",
      },
      fontSize: {
        "display-lg": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      boxShadow: {
        card:         "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.1)",
        btn:          "0 1px 2px rgba(37,99,235,0.2), 0 2px 8px rgba(37,99,235,0.15)",
      },

      // ✅ الكينفريمز
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-left": {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-bottom": {
          "0%":   { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      // ✅ الأنيميشن classes
      animation: {
        "fade-in":          "fade-in 0.6s ease forwards",
        "fade-up":          "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-down":        "fade-down 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-left":        "fade-left 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "scale-in":         "scale-in 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "slide-in-bottom":  "slide-in-bottom 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        "bounce":           "bounce 1s infinite",
      },
    },
  },
  plugins: [],
};