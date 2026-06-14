/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — refined wellness luxury.
        // Tweak these to re-theme the whole site at once.
        ivory: '#FAF6F0',
        cream: '#F1E8DC',
        sand: '#E4D5C3',
        blush: '#E8D2C2',
        forest: '#33402F',   // deep sage — primary dark
        moss: '#5C6E58',     // mid green
        champagne: '#B8946A',// gold accent
        gold: '#A47E4C',     // deeper gold for hover/borders
        charcoal: '#2A2722', // body text
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      maxWidth: {
        content: '1180px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 1.2s ease forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
