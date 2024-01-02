import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", `[data-mode="light"]`],
  daisyui: {
    themes: ["light"],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          DEFAULT: "#121212",
          components: "#1E1E1E",
        },
        brand: {
          DEFAULT: "#CEA131",
          dark: "#000000",
          light: "#ffffff",
          muted: "#595959",
          tree: "#6fb48e",
          "tree-dark": "#0B4635",
          danger: "#dc2626",
        },
        yellow: {
          DEFAULT: "#FDCC00",
          second: "#C9971C",
        },
        fill: {
          base: "#f3f6f9",
          secondary: "#f8f9fb",
          thumbnail: "#f3f6fa",
          "dropdown-hover": "#f6f9fc",
          one: "#f1f6f9",
          two: "#f2f2f2",
          three: "#e8ebf0",
          four: "#e5eaf1",
        },
        border: {
          base: "#e7ecf0",
          one: "#e3e8ec",
          two: "#e2e8f0",
          three: "#e6e6e6",
          four: "#dee5ea",
        },
        sosmed: {
          facebook: "#3B5998",
          twitter: "#55ACEE",
        },
      },
      fontSize: {
        "10px": ".625rem",
        "13px": "13px",
        "15px": "15px",
      },
      screens: {
        // '3xl': '1780px',
        // '4xl': '1921px',
        // sm: "570px",
        xs: "425px",
      },
      spacing: {
        "430px": "430px",
        "450px": "450px",
        "500px": "500px",
        "64vh": "64vh",
      },
      minHeight: {
        "50px": "50px",
      },
      maxWidth: {
        "8xl": "1440px",
      },
      scale: {
        80: "0.8",
        85: "0.85",
        300: "3",
        400: "4",
      },
      width: {
        "1/9": "11.1111111%",
        "100+30": "calc(100% + 30px)",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        shine: "shine 0.8s ease-in",
        ping: "ping 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      fontFamily: {
        body: ["'Inter', sans-serif"],
        manrope: ["'Manrope', sans-serif"],
        // roboto700: ["'Roboto {font-weight: 700}', sans-serif"]
      },
      boxShadow: {
        card: "0px 0px 6px rgba(79, 95, 120, 0.3)",
        cardHover: "0px 0px 8px rgba(79, 95, 120, 0.48)",
        category: "0px 1px 6px rgba(79, 95, 120, 0.12)",
        category2: "0px 10px 20px rgba(88, 110, 125, 0.1)",
        navigation: "0 3px 6px rgba(115, 125, 144, 0.25)",
        counter: "0px 4px 10px rgba(79, 95, 120, 0.15)",
        featured: "0px 4px 8px rgba(70, 84, 111, 0.06)",
        cart: "0 3px 6px rgba(0,0,0,0.12)",
        switch: "0 2px 5px rgba(21,35,49,0.4)",
        dropDown: "0px 10px 40px rgba(41, 50, 68, 0.15)",
        carouselButton: "0px 2px 15px rgba(115, 125, 144, 0.25)",
        listProduct: "0 2px 4px rgba(0,0,0,.08)",
        navigationReverse: "0 -3px 6px rgba(0, 0, 0, 0.16)",
        header: "0 2px 3px rgba(0, 0, 0, 0.08)",
        subMenu: "1px 2px 3px rgba(0, 0, 0, 0.08)",
        bottomNavigation: "0 -2px 3px rgba(0, 0, 0, 0.06)",
        cookies: "0 -2px 3px rgba(0, 0, 0, 0.04)",
        contact: "0 1px 10px rgba(75, 90, 130, 0.1)",
        vendorCard: "0px 2px 3px rgba(0, 0, 0, 0.06)",
        vendorCardHover: "0px 1px 15px rgba(0, 0, 0, 0.06)",
        vendorSidebar:
          "0px 1px 2px rgba(0, 0, 0, 0.03), 0px 1px 3px rgba(0, 0, 0, 0.05)",
        searchBox: "0px 4px 4px rgba(99, 113, 134, 0.1)",
      },
      dropShadow: {
        "center-50": "0 0px 10px rgba(0,0,0,0.50)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
