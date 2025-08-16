import express from 'express';
import Laptop from '../models/Laptop.js';

const router = express.Router();

// Get all laptop models
router.get('/', async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.json(laptops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get specific laptop model
router.get('/:id', async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) return res.status(404).json({ message: 'Laptop not found' });
        res.json(laptop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;