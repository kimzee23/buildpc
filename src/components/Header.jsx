import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

export default function Header() {
    return (
        <Box as="header" bg="white" boxShadow="sm" p={4}>
            <Flex maxW="1200px" mx="auto" align="center">
                <Heading as={RouterLink} to="/" size="lg" color="brand.500">
                    Gazar
                </Heading>
                <Button
                    as={RouterLink}
                    to="/build"
                    ml="auto"
                    colorScheme="brand"
                    leftIcon={<FiShoppingCart />}
                >
                    Build Yours
                </Button>
            </Flex>
        </Box>
    );
}