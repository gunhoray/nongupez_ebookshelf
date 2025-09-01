/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 가이드라인에 따른 색상 시스템
        primary: {
          orange: '#FF7A00',
          'orange-dark': '#E06400',
        },
        accent: {
          'orange-soft': '#FFE6CC',
        },
        bg: '#FFFFFF',
        surface: '#FAFAFA',
        text: {
          primary: '#111111',
          secondary: '#4D4D4D',
        },
        border: '#E6E6E6',
        focus: '#FFB366',
        link: '#0B63FF',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'body': '1.25rem',
        'h1': '1.8rem',
        'h2': '1.4rem',
        'h3': '1.2rem',
        'caption': '1rem',
      },
      lineHeight: {
        'body': '1.6',
      },
      borderRadius: {
        '2xl': '16px',
      },
      spacing: {
        '4': '16px',
        '6': '24px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}
