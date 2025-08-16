import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    RadioGroup,
    Radio,
    Stack,
    Input,
    FormControl,
    FormLabel,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const PaymentModal = ({ isOpen, onClose, totalAmount, onPaymentSuccess }) => {
    const [paymentMethod, setPaymentMethod] = useState('paystack');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    const handlePayment = async () => {
        if (!email && paymentMethod === 'paystack') {
            toast({
                title: 'Error',
                description: 'Email is required for Paystack payment',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (!phone && paymentMethod === 'opay') {
            toast({
                title: 'Error',
                description: 'Phone number is required for OPay payment',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsProcessing(true);

        try {
            const response = await axios.post('/api/payment/initialize', {
                email,
                phone,
                amount: totalAmount,
                paymentMethod,
            });

            if (response.data.success && response.data.paymentUrl) {
                // Open payment gateway in new tab
                window.open(response.data.paymentUrl, '_blank');

                // Start polling for payment verification
                pollForPaymentVerification(response.data.reference);
            } else {
                throw new Error('Failed to initialize payment');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast({
                title: 'Payment Error',
                description: error.response?.data?.message || 'Failed to process payment',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setIsProcessing(false);
        }
    };

    const pollForPaymentVerification = async (reference) => {
        try {
            const response = await axios.post('/api/payment/verify', {
                reference,
                paymentMethod,
            });

            if (response.data.verified) {
                toast({
                    title: 'Payment Successful',
                    description: 'Your payment has been verified',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                onPaymentSuccess();
                onClose();
            } else {
                // Continue polling if not verified yet
                setTimeout(() => pollForPaymentVerification(reference), 3000);
            }
        } catch (error) {
            console.error('Verification error:', error);
            toast({
                title: 'Verification Error',
                description: 'Failed to verify payment. Please check your payment history.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setIsProcessing(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Complete Your Purchase</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={6} align="stretch">
                        <FormControl>
                            <FormLabel>Total Amount</FormLabel>
                            <Input
                                value={`₦${totalAmount.toLocaleString()}`}
                                isReadOnly
                                fontWeight="bold"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Select Payment Method</FormLabel>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={setPaymentMethod}
                            >
                                <Stack direction="column">
                                    <Radio value="paystack">Paystack (Card/Bank Transfer)</Radio>
                                    <Radio value="opay">OPay Mobile Money</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'paystack' && (
                            <FormControl isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </FormControl>
                        )}

                        {paymentMethod === 'opay' && (
                            <FormControl isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </FormControl>
                        )}
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        onClick={handlePayment}
                        isLoading={isProcessing}
                        loadingText="Processing..."
                    >
                        Proceed to Payment
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PaymentModal;