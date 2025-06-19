export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: { marginTop: '0', marginBottom: '0.75em' },
            ul: { marginTop: '0', marginBottom: '0.75em', paddingLeft: '1.25em' },
            ol: { marginTop: '0', marginBottom: '0.75em', paddingLeft: '1.25em' },
            'ul li': { marginTop: '0.25em', marginBottom: '0.25em' },
          }
        },
      },
      colors: {
        'link-color': '#0B5FA5',
        'primary-light-blue': '#4ECEEF',
        'primary-light-blue-hero-bg': 'rgba(36, 195, 235, 0.6)',
        'primary-light-blue-opacity': 'rgba(78, 206, 239, 0.2)',
        'primary-light-green': '#78CC38',
        'primary-light-green-hero-bg': 'rgba(106, 182, 47, 0.6)',
        'primary-light-green-opacity': 'rgba(120, 204, 56, 0.2)',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')]
}