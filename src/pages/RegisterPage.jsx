import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate('/account');
            toast({
                title: 'Registration Successful',
                description: 'Your account has been created',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Registration Failed',
                description: error.message || 'Unable to create account',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box py={20} px={4} maxW="md" mx="auto">
            <VStack spacing={8} align="stretch">
                <Heading as="h1" size="xl" textAlign="center">
                    Create Your Account
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
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                size="lg"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                size="lg"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create password (min 6 characters)"
                                size="lg"
                                minLength={6}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                size="lg"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            w="100%"
                            isLoading={isLoading}
                            loadingText="Creating Account..."
                        >
                            Register
                        </Button>
                    </VStack>
                </Box>

                <Text textAlign="center">
                    Already have an account?{' '}
                    <Link
                        as={RouterLink}
                        to="/login"
                        color="blue.500"
                        fontWeight="semibold"
                    >
                        Sign in instead
                    </Link>
                </Text>
            </VStack>
        </Box>
    );
};

export default RegisterPage;