import axios from 'axios';
import Order from '../models/Order.js';

// Paystack configuration
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// OPay configuration
const OPAY_SECRET_KEY = process.env.OPAY_SECRET_KEY;
const OPAY_BASE_URL = 'https://api.opaycheckout.com';

export const initializePayment = async (req, res) => {
    try {
        const { email, amount, paymentMethod, phone, currency = 'NGN' } = req.body;

        if (paymentMethod === 'paystack') {
            // Initialize Paystack payment
            const response = await axios.post(
                `${PAYSTACK_SECRET_KEY}/transaction/initialize`,
                {
                    email,
                    amount: amount * 100, // Paystack uses amount in kobo
                    currency,
                    callback_url: `${process.env.FRONTEND_URL}/payment/verify`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return res.json({
                success: true,
                paymentUrl: response.data.data.authorization_url,
                reference: response.data.data.reference,
            });
        } else if (paymentMethod === 'opay') {
            // Initialize OPay payment
            const response = await axios.post(
                `${OPAY_BASE_URL}/api/v1/international/money-transfer/send`,
                {
                    amount,
                    currency,
                    country: 'NG',
                    receiver: {
                        name: 'SharpLaptops',
                        phone,
                    },
                    reason: 'Laptop Purchase',
                    callbackUrl: `${process.env.BACKEND_URL}/api/payment/opay/callback`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${OPAY_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return res.json({
                success: true,
                paymentUrl: response.data.data.paymentUrl,
                reference: response.data.data.orderNo,
            });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid payment method' });
        }
    } catch (error) {
        console.error('Payment initialization error:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: 'Payment initialization failed',
            error: error.response?.data || error.message
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { reference, paymentMethod } = req.body;

        if (paymentMethod === 'paystack') {
            // Verify Paystack payment
            const response = await axios.get(
                `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
                {
                    headers: {
                        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    },
                }
            );

            if (response.data.data.status === 'success') {
                // Update order status
                await Order.findOneAndUpdate(
                    { paymentReference: reference },
                    { status: 'paid' }
                );

                return res.json({ success: true, verified: true });
            }
        } else if (paymentMethod === 'opay') {
            // Verify OPay payment
            const response = await axios.get(
                `${OPAY_BASE_URL}/api/v1/international/money-transfer/status/${reference}`,
                {
                    headers: {
                        Authorization: `Bearer ${OPAY_SECRET_KEY}`,
                    },
                }
            );

            if (response.data.data.status === 'SUCCESS') {
                // Update order status
                await Order.findOneAndUpdate(
                    { paymentReference: reference },
                    { status: 'paid' }
                );

                return res.json({ success: true, verified: true });
            }
        }

        return res.json({ success: true, verified: false });
    } catch (error) {
        console.error('Payment verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'Payment verification failed',
            error: error.response?.data || error.message
        });
    }
};

// Webhook for payment callbacks
export const paymentWebhook = async (req, res) => {
    try {
        const { event, data } = req.body;

        if (event === 'charge.success') {
            // Paystack webhook
            await Order.findOneAndUpdate(
                { paymentReference: data.reference },
                { status: 'paid' }
            );
        }

        return res.sendStatus(200);
    } catch (error) {
        console.error('Webhook error:', error);
        return res.sendStatus(500);
    }
};