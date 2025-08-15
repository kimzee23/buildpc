import axios from 'axios';

// Safe environment variable getter
const getEnv = (key) => {
    //  Vite-style environment variables
    if (typeof import.meta !== 'undefined' && import.meta.env && key in import.meta.env) {
        return import.meta.env[key];
    }

    //  CRA-style process.env (use globalThis to avoid bundler errors)
    const globalProcess = globalThis.process;
    if (globalProcess?.env && key in globalProcess.env) {
        return globalProcess.env[key];
    }

    //  Fallback: custom global variable
    if (typeof window !== 'undefined' && window.__ENV && key in window.__ENV) {
        return window.__ENV[key];
    }

    return undefined;
};

// Get env vars
const API_URL = getEnv('REACT_APP_API_URL') || 'http://localhost:3001/api';
const PAYSTACK_SECRET = getEnv('REACT_APP_PAYSTACK_SECRET_KEY');

const api = axios.create({
    baseURL: API_URL
});

export const createOrder = (orderData) => api.post('/orders', orderData);

export const initPaystackPayment = (paymentData) => {
    if (!PAYSTACK_SECRET) {
        throw new Error('Paystack secret key is not configured');
    }

    return axios.post('https://api.paystack.co/transaction/initialize', paymentData, {
        headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
            'Content-Type': 'application/json'
        }
    });
};
