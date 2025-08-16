import mongoose from 'mongoose';

const laptopSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true,
        enum: ['Ultrabook', 'Gaming Beast', 'Creator Studio']
    },
    basePrice: {
        type: Number,
        required: true
    },
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
    }],
    colorOptions: [{
        name: String,
        hexCode: String,
        price: Number
    }],
    features: [String],
    images: [String],
    threeDModel: String
});

const Laptop = mongoose.model('Laptop', laptopSchema);

export default Laptop;