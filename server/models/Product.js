import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['ultrabook', 'gaming', 'creator', 'business']
    },
    image: {
        type: String
    },
    specs: {
        processorOptions: [{
            name: String,
            price: Number
        }],
        ramOptions: [{
            size: String,
            price: Number
        }],
        storageOptions: [{
            type: String,
            size: String,
            price: Number
        }],
        graphicsOptions: [{
            name: String,
            price: Number
        }]
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;