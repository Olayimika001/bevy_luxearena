export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F3F0",
        foreground: "#1A1A1A",
        primary: "#1A1A1A",
        accent: "#C4A57B",
        muted: "#E8E3DE",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
