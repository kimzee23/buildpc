import { Button,useToast } from '@chakra-ui/react';
import React from 'react';
import { initializePayment as initPaystackTransaction } from '../services/paystack';

export default function PaystackButton({ email, amount, onSuccess, onClose }) {
    const toast = useToast();

    const handlePayment = async () => {
        try {
            // Step 1: Create transaction on your backend/Paystack API
            const transaction = await initPaystackTransaction(email, amount);

            // Step 2: Open Paystack inline payment widget
            const handler = window.PaystackPop.setup({
                key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Public key for frontend
                email,
                amount: amount * 100, // in kobo
                reference: transaction.reference,
                onClose: () => {
                    if (onClose) onClose();
                },
                callback: (response) => {
                    if (response.status === 'success') {
                        onSuccess(response);
                    }
                },
            });

            handler.openIframe();
        } catch (error) {
            toast({
                title: 'Payment Error',
                description: error.message,
                status: 'error',
                duration: 5000,
            });
        }
    };

    return (
        <Button colorScheme="green" onClick={handlePayment}>
            Pay with Paystack
        </Button>
    );
}
