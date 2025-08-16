import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update user profile
router.put('/', protect, async (req, res) => {
    try {
        const { name, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get shipping address
router.get('/shipping', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('shippingAddress');
        res.json(user.shippingAddress || {});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update shipping address
router.put('/shipping', protect, async (req, res) => {
    try {
        const { street, city, state, postalCode, country } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { shippingAddress: { street, city, state, postalCode, country } },
            { new: true }
        ).select('-password');

        res.json(user.shippingAddress);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;