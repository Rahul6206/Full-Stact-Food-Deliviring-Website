import UploadImage from "../config/cloudinery.js";
import Items from "../models/items.model.js";
import Shopmodel from "../models/shop.model.js";

export const CreateItem = async (req, res) => {
    try {
        const { name, price, description, category, FoodType } = req.body;
        let image;
        if (req.file) {
            image = await UploadImage(req.file.path);
        }

        const ShopId = await Shopmodel.findOne({ ownerId: req.userId })
        if (!ShopId) {
            return res.status(401).json({ message: 'Shop not found' });
        }
        const newitems = await Items.create({ name, price, description, category, FoodType, image, shop: ShopId._id });

        return res.status(201).json({ message: `Items Created succesfully `,newitems })
    } catch (error) {
        return res.status(500).json({ message: `Add Items error ${error.message}` });
    }
}


export const EditItems = async (req, res) => {
    try {
        const itemid = req.params.itemId;
        const { name, price, description, category, FoodType } = req.body;
        let image;

        // Handle image upload
        if (req.file) {
            image = await UploadImage(req.file.path);
        }

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
            return res.status(404).json({ message: "Shop not found" });
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

