import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Heading, VStack, Text, Button, List, ListItem } from '@chakra-ui/react';
import { FiPrinter, FiMail, FiHome } from 'react-icons/fi';

export default function Confirmation() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state?.orderId) {
        navigate('/');
        return null;
    }

    return (
        <Box maxW="800px" mx="auto" p={4}>
            <VStack spacing={8} textAlign="center">
                <Box p-6 borderWidth="1px" borderRadius="md" w="full">
                    <Heading as="h1" size="xl" mb={4} color="green.500">
                        Order Confirmed!
                    </Heading>
                    <Text fontSize="lg" mb-6>
                        Thank you for your purchase, {state.customer.name}!
                    </Text>

                    <Box textAlign="left" mb-6>
                        <Text fontWeight="bold" mb-2>Order Details:</Text>
                        <List spacing-2>
                            <ListItem><strong>Order ID:</strong> {state.orderId}</ListItem>
                            <ListItem><strong>Payment Reference:</strong> {state.paymentRef}</ListItem>
                            <ListItem><strong>Total Paid:</strong> ${state.total}</ListItem>
                            <ListItem><strong>Estimated Delivery:</strong> 5-7 business days</ListItem>
                        </List>
                    </Box>

                    <Box textAlign="left" mb-6>
                        <Text fontWeight="bold" mb-2>Your Configuration:</Text>
                        <List spacing-2>
                            <ListItem><strong>Model:</strong> {state.config.model.name}</ListItem>
                            <ListItem><strong>Processor:</strong> {state.config.processor.name}</ListItem>
                            <ListItem><strong>Memory:</strong> {state.config.memory.name}</ListItem>
                            <ListItem><strong>Storage:</strong> {state.config.storage.name}</ListItem>
                        </List>
                    </Box>

                    <Flex gap-4 justify="center">
                        <Button leftIcon={<FiPrinter />} variant="outline">
                            Print Receipt
                        </Button>
                        <Button leftIcon={<FiMail />} colorScheme="blue">
                            Email Receipt
                        </Button>
                    </Flex>
                </Box>

                <Button
                    leftIcon={<FiHome />}
                    colorScheme="green"
                    onClick={() => navigate('/')}
                    size="lg"
                >
                    Return to Home
                </Button>
            </VStack>
        </Box>
    );
}