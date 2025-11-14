import React from 'react'
import { useEffect } from 'react'
import { BURL } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setShopdata } from '../Redux/OwnerSlice'


const useGetOwnerShop = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`${BURL}/owner/getshop`, { withCredentials: true })

                dispatch(setShopdata(response.data));
                console.log(response.data)

            } catch (error) {
                console.log("responce error", error);
               

            }

        }
        fetchCurrentUser()

    }, [])



}

export default useGetOwnerShop