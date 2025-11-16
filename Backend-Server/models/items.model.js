import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,

    },
    image: {
        type: String, 

    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ownerId',
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