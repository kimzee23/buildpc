import  { extendTheme } from '@chakra-ui/react';


const theme = extendTheme({
    colors: {
        brand: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#3182ce',
            600: '#2b6cb0',
            700: '#1e4e8c',
            800: '#1e3e8b',
            900: '#1a365d',
        },
    },
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'semibold',
                borderRadius: 'md',
            },
            variants: {
                solid: {
                    bg: 'brand.500',
                    color: 'white',
                    _hover: {
                        bg: 'brand.600',
                    },
                },
            },
        },
        Alert: {
            baseStyle: {
                container: {
                    borderRadius: 'md',
                },
                title: {
                    fontWeight: 'bold',
                },
            },
        },
    },
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
});

export default theme;