import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
// Remove the line-clamp import: import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [
    typography,
    // Remove lineClamp from here: lineClamp,
  ],
};
