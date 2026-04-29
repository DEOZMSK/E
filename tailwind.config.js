/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0b14",
        surface: "#1a1223",
        accent: {
          DEFAULT: "#ff4d9d",
          hover: "#e13f88"
        },
        warm: {
          DEFAULT: "#ff8a3d",
          hover: "#e2742f"
        },
        muted: "#a79bb7",
        outline: "#3a2b4d"
      },
      maxWidth: {
        content: "64rem"
      },
      boxShadow: {
        focus: "0 0 0 4px rgba(255,77,157,0.3)"
      },
      keyframes: {
        "soft-pulse": {
          "0%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "0.55", transform: "scale(1)" }
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
          "100%": { transform: "translateY(0px)" }
        },
        "hero-shimmer": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        "soft-pulse": "soft-pulse 14s ease-in-out infinite",
        float: "float 18s ease-in-out infinite",
        "hero-shimmer": "hero-shimmer 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
