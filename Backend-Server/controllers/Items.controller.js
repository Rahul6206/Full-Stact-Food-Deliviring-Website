import UploadImage from "../config/cloudinery";
import Items from "../models/items.model.js";
import Shopmodel from "../models/shop.model.js";

export const CreateItem = async () => {
    try {
        const { name, price, description, category, FoodType } = req.body;
        let image;
        if (req.file) {
            image = await UploadImage(req.file.path);
        }
        const shop = Shopmodel.findOne({ ownerId: req.userId })
        if (!shop) {
            return res.status(401).json({ message: 'Shop not found' });
        }
        const newitems = Items.create({ name, price, description, category, FoodType, image, shop: shop._id });

        return res.status(201).json({ message: `Items Created succesfully ${newitems}` })
    } catch (error) {
        return res.status(500).json({ message: `Add Items error ${error.message}` });
    }
}

export const EditItems = async () => {

    try {
        const itemid = req.params.itemId;
        const { name, price, description, category, FoodType } = req.body;
        let image;
        if (req.file) {
            image = await UploadImage(req.file.path);
        }

        const ItemLocation = Items.findByIdAndUpdate(itemid, {
            name, price, description, category, FoodType, image
        })
        if (!ItemLocation) {
            return res.status(401).json({ message: 'Item  not found' });
        }
        return res.status(201).json({ message: `Items Created succesfully ${ItemLocation}` })

    } catch (error) {
        return res.status(500).json({ message: `Edit Items error ${error.message}` });
    }

}
