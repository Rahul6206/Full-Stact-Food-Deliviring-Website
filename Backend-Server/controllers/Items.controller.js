import UploadImage from "../config/cloudinery.js";
import Items from "../models/items.model.js";
import Shopmodel from "../models/shop.model.js";

export const CreateItem = async (req, res) => {
    try {
        const { name, price, description, category, FoodType } = req.body;

        // Validate required fields
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }
console.log("FILE COMING FROM MULTER:", req.file);

        // Validate shop
        const shop = await Shopmodel.findOne({ ownerId: req.userId });
        if (!shop) {
            return res.status(401).json({ message: 'Shop not found' });
        }

        // Upload image if exists
        let image = null;
        if (req.file) {
            image = await UploadImage(req.file.path);

            if (!image) {
                return res.status(500).json({ message: "Image upload failed" });
            }
        }

        // Create item
        const newItem = await Items.create({
            name,
            price,
            description,
            category,
            FoodType,
            image,
            shop: shop._id
        });

        return res.status(201).json({
            message: "Item created successfully",
            newItem
        });

    } catch (error) {
        return res.status(500).json({ message: `Add Items error: ${error.message}` });
    }
};



export const EditItems = async (req, res) => {
    try {
        const itemid = req.params.itemId;
        const { name, price, description, category, FoodType } = req.body;
        let image;

        // Handle image upload
        if (req.file) {
            image = await UploadImage(req.file.path);
        }
        console.log(image)
        // Find and update the item
        const updatedItem = await Items.findByIdAndUpdate(itemid, {
            name,
            price,
            description,
            category,
            FoodType,
            image,
        }, { new: true });  // Ensure we return the updated item

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found ha ha' });
        }

        return res.status(200).json({ message: `Item updated successfully`, updatedItem });

    } catch (error) {
        return res.status(500).json({ message: `Edit Items error ${error.message}` });
    }
};
export const Getitems = async (req, res) => {
    try {
        // Get the shop of this user
        const shop = await Shopmodel.findOne({ ownerId: req.userId });
        if (!shop) {
            return res.status(404).json({ message: "Items not found" });
        }

        // Get items of this shop
        const items = await Items.find({ shop: shop._id });

        return res.status(200).json(items);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Get items error: ${error.message}`,
        });
    }
}

export const DeleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;

        // Find the shop of this user
        const shop = await Shopmodel.findOne({ ownerId: req.userId });
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        // Check if item belongs to this shop
        const item = await Items.findOne({ _id: itemId, shop: shop._id });
        if (!item) {
            return res.status(404).json({ message: "Item not found or not authorized" });
        }

        // Delete item
        await Items.findByIdAndDelete(itemId);

        return res.status(200).json({ message: "Item deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: `Delete Item error: ${error.message}` });
    }
};

export const GetAllitems = async (req, res) => {
    try {
        // Get the shop of this user
        

        // Get items of this shop
        const items = await Items.find({}).limit(20);

        return res.status(200).json(items);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Get items error: ${error.message}`,
        });
    }
}