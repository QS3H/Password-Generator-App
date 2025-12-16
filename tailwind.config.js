/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Page background
        "page-bg": "#18171F",
        // Decorative elements
        "decorative-blue": "#84A9FF",
        // App card background
        "app-bg": "#24232C",
        // Text colors
        "text-light": "#E6E5EA",
        "text-muted": "#817D92",
        // Accent green (used for active states, buttons, etc.)
        "accent-green": "#A4FFAF",
        // Strength indicator colors
        "strength-yellow": "#F8CD65",
        // Darker backgrounds
        "dark-bg": "#18171F",
        // Button text color
        "button-text": "#24232C",
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
