import axios from 'axios';
import { useState } from 'react';
import { BURL } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setShopdata, setShopRegister } from '../../Redux/OwnerSlice';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

export default function ShopRegistrationFrom() {
    const {Shopdata} = useSelector(state=>state.Owner)
    const dispatch= useDispatch()
    const [formData, setFormData] = useState({
        name: "" || Shopdata?.name,
        city: "" || Shopdata?.city,
        state: "" || Shopdata?.state,
        address: "" || Shopdata?.address,
        image: null || Shopdata?.image,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Shop name is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        return newErrors;
    };
    const handleImage = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        const newErrors = validate();

        if (Object.keys(newErrors).length === 0) {
            try {
            const res = await axios.post(
                `${BURL}/owner/createShop`,{
                 name:   formData.name,
                  city:  formData.city,
                  state:  formData.state,
                   address: formData.address,
                   image:  formData.image
                },
                { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
            );
            if(res){

                dispatch(setShopdata(formData))
                dispatch(setShopRegister(false))
                toast.success("Form submitted Successfully");
                console.log(res); 
            }else{
                toast.error('Error Submit From');
            }
        } catch (error) {
            toast.error(error.response.data.message || 'Error Submit From');
        } 
        } else {
            setErrors(newErrors);
        }

        
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Register Your Shop</h2>
                    <p className="text-gray-600 mt-2">Join our food delivery platform</p>
                </div>

                

                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Shop Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition`}
                            placeholder="Enter shop name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                City *
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition`}
                                placeholder="City"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                                State *
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition`}
                                placeholder="State"
                            />
                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                            Address *
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none`}
                            placeholder="Enter complete address"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}
                    </div>
                    {/* Image Upload */}
                <div>
                    <label className="block font-medium mb-1">Upload Image</label>
                    <label
                        className="flex items-center gap-3 px-4 py-2 border rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span>Choose image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                    </label>
                </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    >
                        Register Shop
                    </button>
                </div>

               
            </div>
        </div>
    );
}