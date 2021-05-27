module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: [ './public/index.html', './src/**/*.svelte' ],
    options: {
      safelist: [ 'bg-red-600', 'bg-green-600', 'bg-blue-600', 'bg-gray-600' ],
      defaultExtractor: content => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>/\s]*/g) || []),
      ],
    },
  },
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'CustomSans',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
