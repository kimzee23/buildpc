import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Heading, VStack, Text, FormControl, FormLabel, Input, useToast, Grid } from '@chakra-ui/react';
import PaystackButton from '../components/PaystackButton';

export default function Checkout() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (!state?.config) {
            navigate('/build');
        } else {
            toast({
                title: 'Ready to Checkout',
                description: 'Fill in your details to complete your order.',
                status: 'info',
                duration: 4000,
                isClosable: true,
                position: 'top'
            });
        }
    }, [state, navigate, toast]);

    const handlePaymentSuccess = (response) => {
        toast({
            title: 'Payment Successful',
            description: `Reference: ${response.reference}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
        });

        navigate('/confirmation', {
            state: {
                orderId: `ORD-${Date.now()}`,
                paymentRef: response.reference,
                customer,
                config: state.config,
                total: state.total
            }
        });
    };

    return (
        <Box maxW="1200px" mx="auto" p={4}>
            <Heading as="h1" size="xl" mb={8}>
                Complete Your Order
            </Heading>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
                <Box bg="white" p={6} borderRadius="md" boxShadow="md">
                    <Heading as="h2" size="md" mb={4}>
                        Customer Information
                    </Heading>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                value={customer.name}
                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={customer.email}
                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                type="tel"
                                value={customer.phone}
                                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                required
                            />
                        </FormControl>
                    </VStack>
                </Box>

                <Box bg="white" p={6} borderRadius="md" boxShadow="md">
                    <Heading as="h2" size="md" mb={4}>
                        Payment
                    </Heading>
                    {customer.email && (
                        <PaystackButton
                            email={customer.email}
                            amount={state.total}
                            onSuccess={handlePaymentSuccess}
                        />
                    )}
                </Box>
            </Grid>
        </Box>
    );
}
