import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    image: {
        type: String,


    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    city: {
        type: String,
        required: true,

    },
    state: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,

    },
    Items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    },
    Rating: {
        type: Number,
        required: true,
        default: 0,
    },
    NouR: {
        type: Number,
        required: true,
        default: 0,
    }


}, { timestamps: true })

const Shopmodel = mongoose.model('Shop', ShopSchema);

export default Shopmodel;
