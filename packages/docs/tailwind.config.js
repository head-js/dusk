module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  plugins: [ require('@tailwindcss/typography'), require('daisyui') ],

  theme: {
    screens: {
      'xs': '414px',
    },
  },

  daisyui: {
    themes: ['cmyk', 'aqua'],
  }
};
