
import { BadgePercent, LogOut, MessageCircleQuestionMark, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setUserdata, setUserinfo } from '../Redux/UserSlice';
import axios from 'axios';
import { BURL } from '../App';

const UserButton = ({ ismobile}) => {
    const { Userdata } = useSelector(state => state.user);
    const dispatch = useDispatch()
     const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);


    const handleLogout = async () => {
        try {
            await axios.get(`${BURL}/api/auth/signout`, { withCredentials: true });
            toast.success("Logout Success");
            dispatch(setUserinfo(false));
            dispatch(setUserdata(null));
            navigate('/singin');
            console.log('Logout')
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }

    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    return (
        <div>
            <div className="relative" ref={userMenuRef}>
                <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition ">
                    {Userdata?.fullname?.slice(0, 1)?.toUpperCase() || "U"}
                </button>

                {/* Popup Menu */}
                {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-40 bg-white border rounded-lg shadow-lg overflow-hidden animate-fadeIn z-50">
                        <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <User className="w-4 h-4 mr-2 text-red-500" />
                            Account
                        </button>
                        {!ismobile && (<>
                            <div className="flex items-center w-full  px-4 py-2 text-gray-700 hover:bg-gray-100" >
                                <BadgePercent className="w-4 h-4 mr-2 text-red-500" />
                                <a href="#" className="text-gray-700 hover:text-red-500">
                                    Offers
                                </a>
                            </div>
                            <div className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <MessageCircleQuestionMark className="w-4 h-4 mr-2 text-red-500" />
                                <a href="#" className="text-gray-700 hover:text-red-500">
                                    Help
                                </a>
                            </div>
                        </>)}

                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <LogOut className="w-4 h-4 mr-2 text-red-500" />
                            Logout
                        </button>


                    </div>
                )}
            </div>
        </div>
    )
}

export default UserButton