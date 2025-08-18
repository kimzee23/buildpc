import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import laptops from "./routes/laptops.js";
import { protect } from './middleware/authMiddleware.js';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sharplaptops', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/laptops', laptops);
app.use('/api/account', protect, accountRoutes);
app.use('/api/orders', protect, orderRoutes);

// Test protected route
app.get('/api/private', protect, (req, res) => {
    res.json({
        message: 'This is private data',
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));