import {
    Box,
    Flex,
    Heading,
    Link,
    Button,
    Spacer,
    useColorModeValue,
    VStack,
    Text,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const bg = useColorModeValue('brand.700', 'brand.900');
    const color = useColorModeValue('white', 'whiteAlpha.900');

    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            {/* header */}
            <Flex as="header" p={4} bg={bg} color={color} align="center" position="sticky" top={0} zIndex="sticky">
                <Heading as="h1" size="lg">
                    <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                        SharpLaptops
                    </Link>
                </Heading>
                <Spacer />
                <Flex gap={4} align="center">
                    <Link as={RouterLink} to="/customize" px={2} py={1}>
                        Customize
                    </Link>

                    {user ? (
                        <>
                            <Link as={RouterLink} to="/account" px={2} py={1}>
                                My Account
                            </Link>
                            {user.isAdmin && (
                                <Link as={RouterLink} to="/admin" px={2} py={1}>
                                    Admin
                                </Link>
                            )}
                            <Button
                                onClick={() => {
                                    logout();
                                    navigate('/');
                                }}
                                variant="outline"
                                colorScheme="whiteAlpha"
                                size="sm"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button as={RouterLink} to="/login" variant="outline" colorScheme="whiteAlpha" size="sm">
                                Login
                            </Button>
                            <Button as={RouterLink} to="/register" colorScheme="whiteAlpha" size="sm">
                                Register
                            </Button>
                        </>
                    )}
                </Flex>
            </Flex>

            {/* main */}
            <Box as="main" flex={1}>{children}</Box>

            {/* footer */}
            <Box as="footer" bg={bg} color={color} py={8} px={4}>
                <Flex maxW="6xl" mx="auto" justify="space-between" direction={{ base: 'column', md: 'row' }} gap={4}>
                    <Box>
                        <Heading size="md" mb={2}>SharpLaptops</Heading>
                        <Text>Build your perfect laptop</Text>
                    </Box>

                    <Flex gap={8}>
                        <Box>
                            <Heading size="sm" mb={2}>Quick Links</Heading>
                            <VStack align="start" spacing={1}>
                                <Link as={RouterLink} to="/">Home</Link>
                                <Link as={RouterLink} to="/customize">Customize</Link>
                                <Link as={RouterLink} to="/account">My Account</Link>
                            </VStack>
                        </Box>

                        <Box>
                            <Heading size="sm" mb={2}>Support</Heading>
                            <VStack align="start" spacing={1}>
                                <Link as={RouterLink} to="/contact">Contact Us</Link>
                                <Link as={RouterLink} to="/faq">FAQ</Link>
                                <Link as={RouterLink} to="/returns">Returns</Link>
                            </VStack>
                        </Box>
                    </Flex>
                </Flex>

                <Text mt={8} textAlign="center" fontSize="sm">
                    © {new Date().getFullYear()} SharpLaptops. All rights reserved.
                </Text>
            </Box>
        </Box>
    );
};

export default Layout;