import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    phone: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;