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
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}