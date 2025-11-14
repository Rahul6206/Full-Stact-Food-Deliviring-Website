
import UploadImage from "../config/cloudinery.js";
import Shopmodel from "../models/shop.model.js";

export const createNeditShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body
        let image;
        if (req.file) {
            image = await UploadImage(req.file.path)
        }
        let shop=await Shopmodel.findOne({ownerId:req.userId})
        if(!shop){
            shop = await Shopmodel.create({ name, city, state, address, image, ownerId: req.userId });
        }else{
            shop= await Shopmodel.findByIdAndUpdate(shop._id,{ name, city, state, address, image, ownerId: req.userId},{new:true})
        }

            
            await shop.populate("ownerId")
            return res.status(201).json(shop)
        
    } catch (error) {
        return res.status(500).json({ message: `create shop error ${error.message}` });
    }
}

export const GetShop= async(req,res)=>{
    try {
        const Myshop= await Shopmodel.findOne({ownerId:req.userId}).populate("ownerId Items");
        if(!Myshop){
            return res.status(204).json({message: "Shop Not Found"})
        }
        return res.status(206).json(Myshop);
    } catch (error) {
         return res.status(500).json({ message: `Error Finding Shop ${error.message}` });
        
    }

}
