import React from 'react'
import { useEffect } from 'react'
import { BURL } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setShopItems } from '../Redux/OwnerSlice'


const GetShopItems = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchallitems = async () => {
            try {
                const response = await axios.get(`${BURL}/owner/item/getItem`, { withCredentials: true })

                dispatch(setShopItems(response.data));
                console.log(response.data)

            } catch (error) {
                console.log("responce error", error);
               

            }

        }
        fetchallitems()
        

    }, [])



}

export default GetShopItems