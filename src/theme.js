import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            500: '#3182ce',
        },
    },
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
    },
});

export default theme;