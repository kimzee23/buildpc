import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import UserModel from '../models/UserModel.js';

const router = express.Router();

/**
 * @desc    Get user profile
 * @route   GET /api/account
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @desc    Update user profile (name, phone)
 * @route   PUT /api/account
 * @access  Private
 */
router.put('/', protect, async (req, res) => {
    try {
        const { name, phone } = req.body;

        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
        });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @desc    Get shipping address
 * @route   GET /api/account/shipping
 * @access  Private
 */
router.get('/shipping', protect, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('shippingAddress');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.shippingAddress || {});
    } catch (error) {
        console.error('Error fetching shipping address:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * @desc    Update shipping address
 * @route   PUT /api/account/shipping
 * @access  Private
 */
router.put('/shipping', protect, async (req, res) => {
    try {
        const { street, city, state, postalCode, country } = req.body;

        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.shippingAddress = {
            street: street || user.shippingAddress.street,
            city: city || user.shippingAddress.city,
            state: state || user.shippingAddress.state,
            postalCode: postalCode || user.shippingAddress.postalCode,
            country: country || user.shippingAddress.country,
        };

        await user.save();
        res.json(user.shippingAddress);
    } catch (error) {
        console.error('Error updating shipping address:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
