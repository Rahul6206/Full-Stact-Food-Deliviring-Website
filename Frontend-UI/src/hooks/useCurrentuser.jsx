import React from 'react'
import { useEffect } from 'react'
import { BURL } from '../App'
import axios from 'axios'

const useCurrentuser = () => {
    useEffect(() => {
        const fetchCurrentUser=async()=>{
      try {
        const response =await axios.get(`${BURL}/api/auth/currentuser`,{withCredentials:true})
        console.log(response)
        } catch (error) {
            console.log("responce error",error)
        }
        
    }
    fetchCurrentUser()
      
    }, [])
    
    
  
}

export default useCurrentuser