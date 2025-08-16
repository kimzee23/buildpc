import { Box, VStack, Heading, Text, Button, List, ListItem, ListIcon } from '@chakra-ui/react';
import { FaCheckCircle, FaHome, FaShoppingCart } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const order = state?.order || {};

    return (
        <Box py={20} px={4} maxW="xl" mx="auto" textAlign="center">
            <VStack spacing={8}>
                <Box color="green.500">
                    <FaCheckCircle size="64px" />
                </Box>

                <Heading as="h1" size="xl">Order Confirmed!</Heading>

                <Text fontSize="lg">
                    Thank you for your purchase. Your custom laptop is being prepared for delivery.
                </Text>

                {order.orderId && (
                    <Text fontWeight="bold">
                        Order #: {order.orderId}
                    </Text>
                )}

                <Box w="100%" textAlign="left" bg="gray.50" p={6} borderRadius="md">
                    <Heading as="h2" size="md" mb={4}>Order Summary</Heading>
                    <List spacing={3}>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            Model: {order.laptopConfig?.model}
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            Color: {order.laptopConfig?.color}
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            Processor: {order.laptopConfig?.processor}
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            RAM: {order.laptopConfig?.ram}
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            Storage: {order.laptopConfig?.storage}
                        </ListItem>
                        {order.laptopConfig?.graphics && (
                            <ListItem>
                                <ListIcon as={FaCheckCircle} color="green.500" />
                                Graphics: {order.laptopConfig.graphics}
                            </ListItem>
                        )}
                        <ListItem fontWeight="bold" pt={2}>
                            Total: ₦{order.totalAmount?.toLocaleString()}
                        </ListItem>
                    </List>
                </Box>

                <Text>
                    You'll receive a confirmation email shortly. Our team will contact you about delivery details.
                </Text>

                <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                    <Button
                        leftIcon={<FaHome />}
                        colorScheme="blue"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </Button>
                    <Button
                        leftIcon={<FaShoppingCart />}
                        variant="outline"
                        onClick={() => navigate('/customize')}
                    >
                        Build Another
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
};

export default OrderConfirmation;