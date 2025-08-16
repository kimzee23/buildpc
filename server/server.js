import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import app from "../src/App.jsx";

app.use('/api/auth', authRoutes);


app.get('/api/private', protect, (req, res) => {
    res.json({ message: 'This is private data' });
});