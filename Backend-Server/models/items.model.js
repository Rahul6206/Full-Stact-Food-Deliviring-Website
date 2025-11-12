import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true,

    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop',
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        // enum: ['Beverages', 'Bread/Bakery', 'Dairy', 'Desserts', 'Fruits', 'Grains/Pulses', 'Snacks', 'Vegetables', 'Others'],
        required: true,
    },
    FoodType: {
        type: String,
        enum: ['Veg', 'Non-Veg'],
        required: true,
    }



}, { timestamps: true });

const Items = mongoose.model('Items', ItemsSchema);

export default Items;