import React from 'react'
import { useEffect } from 'react'
import { BURL } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserdata, setUserinfo } from '../Redux/UserSlice'

const useCurrentuser = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`${BURL}/api/auth/currentuser`, { withCredentials: true })

                dispatch(setUserdata(response.data.user));
                dispatch(setUserinfo(true));

            } catch (error) {
                console.log("responce error", error);
               

            }

        }
        fetchCurrentUser()

    }, [])



}

export default useCurrentuser