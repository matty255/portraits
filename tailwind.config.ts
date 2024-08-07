/**
 * 이 파일은 Tailwind CSS의 설정 파일입니다.
 * 설정 방법에 대한 예시는 옆에 있는 `tailwind.config.example.ts` 파일을 참고해주세요.
 * 거의 모든 css 프로퍼티를 사용하여 기본 설정 및, Tailwind CSS 전용 플러그인을 커스텀 할 수 있으며, CamelCase로 작성하시면 됩니다. 사용 가능한 프로퍼티는 Tailwind CSS 공식 문서를 참고해주세요.
 * https://tailwindcss.com/docs/
 */
import type { Config } from "tailwindcss";
import { breakpoints } from "./constants/media";
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    screens: {
      ...breakpoints,
    },
    extend: {
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "spin-slow": "spin 3s ease-in-out infinite",
        glow: "glow 1.5s infinite",
      },
      cursor: {
        "custom-cursor": 'url("/assets/light/light-icon.svg"), auto',
      },
      typography: {
        DEFAULT: {
          css: {
            margin: "0 auto",
            color: "black",
            maxWidth: "105ch",
            backgroundColor: "transparent",
            "ol > li::marker": {
              color: "black",
            },

            "ul > li::marker": {
              color: "black",
            },
            ul: {
              listStyleType: "square",
            },

            h1: {
              color: "black",
            },
            h2: {
              color: "black",
            },
            h3: {
              color: "black",
            },
            a: {
              color: "black",
              "&:hover": {
                color: "#eab308",
              },
            },
            code: {
              color: "#111827",
              backgroundColor: "#eab308",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
