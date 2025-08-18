import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';

const router = express.Router();

// Get user's orders
router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort('-createdAt')
            .select('-user -__v');

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;