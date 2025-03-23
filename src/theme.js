import { extendTheme } from '@chakra-ui/react';

// Load the stored color mode from localStorage if available
const getStoredColorMode = () => {
  if (typeof window !== 'undefined') {
    const storedMode = localStorage.getItem('chakra-ui-color-mode');
    return storedMode ? storedMode : 'light';
  }
  return 'light';
};

const config = {
  initialColorMode: 'light', // Default to light mode
  useSystemColorMode: false, // Don't use system preference
};

// Create a responsive theme with color mode configuration
const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        // Automatically adjust background based on color mode
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
});

export default theme;