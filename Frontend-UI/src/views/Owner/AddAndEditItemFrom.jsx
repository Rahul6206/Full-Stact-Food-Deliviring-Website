import React, { useState } from "react";
import { Upload, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { BURL } from "../../App";

const AddItemForm = ({ setShowitemForm, refetch, formeditdata, RequestType }) => {
    const [item, setItem] = useState({
        name: "" || formeditdata?.name,
        price: "" || formeditdata?.price,
        description: "" || formeditdata?.description,
        category: "" || formeditdata?.category,
        FoodType: "" || formeditdata?.FoodType,
        image: null || formeditdata?.image,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        setItem((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", item);
        setShowitemForm(false);
        try {
            if (RequestType === 'edit') {

                const response = await axios.put(
                    `${BURL}/owner/item/editItem/${formeditdata._id}`,
                    {
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        category: item.category,
                        FoodType: item.FoodType,
                        image: item.image
                    },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
            if(RequestType==='add'){
                const response = await axios.post(
                    `${BURL}/owner/item/createItem`, {
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    category: item.category,
                    FoodType: item.FoodType,
                    image: item.image
                },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
                toast.success("Item added successfully!");
                console.log("Item Created:",  item.name);
                refetch();


            } catch (error) {
                console.error(error);
                alert("Failed to update item");
            }


        };

        return (
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-5"
            >
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <PlusCircle className="w-6 h-6" />{RequestType === 'edit'? "Edit Item" : "Add New Item"} 
                </h2>

                {/* Name */}
                <div>
                    <label className="block font-medium mb-1">Item Name</label>
                    <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                        placeholder="Enter item name"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block font-medium mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                        placeholder="Enter price"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 h-24 focus:ring focus:ring-blue-300"
                        placeholder="Short item description"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <input
                        name="category"
                        value={item.category}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                         placeholder="Ex:- Food, Drinks, Snack etc"
                        required
                    />
                    
                </div>

                {/* Food Type */}
                <div>
                    <label className="block font-medium mb-1">Food Type</label>
                    <select
                        name="FoodType"
                        value={item.FoodType}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                        required
                    >
                        <option value="">Select type</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium mb-1">Upload Image</label>
                    <label
                        className="flex items-center gap-3 px-4 py-2 border rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span>{item.image ? item.image.name : "Choose image"}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    {RequestType === 'edit'? "Edit Item" : "Add Item"}
                </button>
                <button onClick={() => setShowitemForm(false)} type="button" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">Back</button>
            </form>
        );
    };

    export default AddItemForm;
