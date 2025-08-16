import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast({
        position: 'top-right',
        variant: 'left-accent',
        isClosable: true,
        duration: 5000,
    });

    const from = location.state?.from?.pathname || '/account';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(email, password);
            toast({
                title: 'Login Successful',
                description: 'You have been logged in successfully',
                status: 'success',
            });
            navigate(from, { replace: true });
        } catch (error) {
            toast({
                title: 'Login Failed',
                description: error.message || 'Invalid email or password',
                status: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box py={20} px={4} maxW="md" mx="auto">
            <VStack spacing={8} align="stretch">
                <Heading as="h1" size="xl" textAlign="center">
                    Sign In to Your Account
                </Heading>

                <Box
                    as="form"
                    onSubmit={handleSubmit}
                    p={8}
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                >
                    <VStack spacing={6}>
                        <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                size="lg"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                size="lg"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            w="100%"
                            isLoading={isLoading}
                            loadingText="Signing In..."
                        >
                            Sign In
                        </Button>
                    </VStack>
                </Box>

                <Text textAlign="center">
                    Don't have an account?{' '}
                    <Link
                        as={RouterLink}
                        to="/register"
                        color="blue.500"
                        fontWeight="semibold"
                    >
                        Create one now
                    </Link>
                </Text>
            </VStack>
        </Box>
    );
};

export default LoginPage;