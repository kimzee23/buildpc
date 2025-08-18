import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: "'Inter', sans-serif",
        body: "'Inter', sans-serif",
    },
    colors: {
        brand: {
            900: '#1a365d',
            800: '#153e75',
            700: '#2a69ac',
            600: '#3182ce',
            500: '#4299e1',
        },
    },
});

export default theme;