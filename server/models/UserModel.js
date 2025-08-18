import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        shippingAddress: {
            address: { type: String },
            city: { type: String },
            postalCode: { type: String },
            country: { type: String },
        },
        phone: { type: String },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
