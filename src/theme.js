import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    wedding: {
      100: '#FFF5F7', // Light Pink
      200: '#FED7E2', // Soft Pink
      300: '#FBB6CE', // Medium Pink
      400: '#F687B3', // Dark Pink
      500: '#B794F4', // Light Purple
      600: '#805AD5', // Purple
    },
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Lato", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'wedding.100',
        color: 'gray.800',
      },
    },
  },
});

export default theme;