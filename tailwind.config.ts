import type { Config } from "tailwindcss"
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      dropShadow: {
        '3xl': '10px 10px 5px rgba(31, 1, 1, 0.8)',
      },
      textShadow: {
        default: '0 2px 5px rgba(0, 0, 0, 0.6)'
        },
      fontFamily: {
        'bouncy': ['Bouncy', 'sans-serif'],
      },
      colors: {
        'burnt': '#962C22',
        'arylide': '#E9D356',
        'snow': '#F8F2F2',
        'dark': '#1F0101',
        'kelly': '#4BA110',
        // border: "hsl(var(--border))",
        // input: "hsl(var(--input))",
        // ring: "hsl(var(--ring))",
        border: "green",
        input: "green",
        ring: "green",
        background: "var(--snow)",
        foreground: "var(--dark)",
        primary: {
          DEFAULT: "var(--burnt)",
          foreground: "var(--snow)",
        },
        accent: {
          DEFAULT: "var(--arylide)",
          foreground: "var(--dark)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        'spin-slow': "spin 8s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
            "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
    screens: {
      '2xl': {max: '1800px'},
      // => @media (max-width: 1800px) { ... }

      'xl': {max: '1280px'},
      // => @media (max-width: 1280px) { ... }

      'lg': {max: '1025px'},
      // => @media (max-width: 1024px) { ... }

      'md': {max: '769px'},
      // => @media (max-width: 768px) { ... }

      'sm': {max: '640px'},
      // => @media (max-width: 640px) { ... }

      'xs': {max: '400px'},
      // => @media (max-width: 400px) { ... }
    },
  },
  plugins: [addVariablesForColors],
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config