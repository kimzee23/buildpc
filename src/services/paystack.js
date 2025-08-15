// src/services/paystack.js

// Safe getter for environment variables
const getEnv = (key) => {
    try {
        // Vite-style environment variables
        if (typeof import.meta !== 'undefined' && import.meta.env && key in import.meta.env) {
            return import.meta.env[key];
        }

        // CRA-style process.env (use globalThis to avoid bundler errors)
        const globalProcess = globalThis.process;
        if (globalProcess?.env && key in globalProcess.env) {
            return globalProcess.env[key];
        }

        // Fallback: custom global variable
        if (typeof window !== 'undefined' && window.__ENV && key in window.__ENV) {
            return window.__ENV[key];
        }
    } catch (e) {
        console.warn(`Environment variable ${key} could not be read`, e);
    }
    return undefined;
};

export const initializePayment = async (email, amount, metadata = {}) => {
    const SECRET = getEnv('REACT_APP_PAYSTACK_SECRET_KEY');

    if (!SECRET) {
        throw new Error('Paystack secret key is not configured');
    }

    try {
        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SECRET}`
            },
            body: JSON.stringify({
                email,
                amount: amount * 100,
                metadata,
                callback_url: `${window.location.origin}/verify-payment`
            })
        });

        const data = await response.json();

        if (!response.ok || !data.status) {
            throw new Error(data.message || 'Payment initialization failed');
        }

        return data.data;
    } catch (error) {
        console.error('Paystack error:', error);
        throw error;
    }
};
