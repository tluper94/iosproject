module.exports = {
  content: ['./**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: '#2c7ce500',
      primary: '#4597F6',
      secondary: '#748194',
      success: '#00d27a',
      info: '#27bcfd',
      warning: '#f5803e',
      danger: '#e63757',
      light: '#f9fafd',
      dark: '#0b1727',
      darkMono: '#1e293b',
      darkGrey: '#252525',
      white: '#fff',
      black: '#000'
    },
    extend: {
      darkMode: 'class',
      colors: {
        gray: {
          white: '#fff',
          100: '#f9fafd',
          200: '#edf2f9',
          300: '#d8e2ef',
          400: '#b6c1d2',
          500: '#9da9bb',
          600: '#748194',
          700: '#5e6e82',
          800: '#4d5969',
          900: '#344050',
          1000: '#232e3c',
          1100: '#0b1727',
          black: '#000'
        },
        font: {
          light: '#344050',
          dark: '#b6c1d2',
          light2: '#000',
          dark2: '#fff'
        }
      }
    }
  }
};
