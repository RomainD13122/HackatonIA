/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // Couleurs pour les catégories
    'bg-blue-100', 'bg-blue-500', 'bg-blue-600', 'text-blue-600', 'text-blue-400',
    'bg-orange-100', 'bg-orange-400', 'bg-orange-500', 'text-orange-600', 'text-orange-400',
    'bg-green-100', 'bg-green-500', 'bg-green-600', 'text-green-600', 'text-green-400',
    'bg-purple-100', 'bg-purple-500', 'bg-purple-600', 'text-purple-600', 'text-purple-400',
    'bg-pink-100', 'text-pink-600', 'text-pink-400',
    'bg-teal-100', 'text-teal-600', 'text-teal-400',
    'bg-yellow-100', 'text-yellow-700', 'text-yellow-300',
    'bg-red-100', 'text-red-700', 'text-red-300',
    'bg-gray-100', 'text-gray-600', 'text-gray-300',
    // Versions dark mode
    'dark:bg-blue-900/50', 'dark:bg-orange-900/50', 'dark:bg-green-900/50', 
    'dark:bg-purple-900/50', 'dark:bg-pink-900/50', 'dark:bg-teal-900/50',
    'dark:bg-yellow-900/50', 'dark:bg-red-900/50', 'dark:bg-gray-800/60',
    'dark:text-blue-400', 'dark:text-orange-400', 'dark:text-green-400',
    'dark:text-purple-400', 'dark:text-pink-400', 'dark:text-teal-400',
    'dark:text-yellow-300', 'dark:text-red-300', 'dark:text-gray-300',
    // Bordures
    'border-blue-300', 'border-orange-300', 'border-green-300', 'border-purple-300',
    'dark:border-blue-600', 'dark:border-orange-600', 'dark:border-green-600', 'dark:border-purple-600',
    // Backgrounds pour les niveaux de performance
    'bg-emerald-100', 'text-emerald-700', 'dark:bg-emerald-900/50', 'dark:text-emerald-300',
  ],
};