import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setShopItems } from "../Redux/OwnerSlice";

export const useFetch = (url) => {
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch=useDispatch();

  // Create fetchData function OUTSIDE useEffect so refetch can call it
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("UseFetch Call")

    try {
      const response = await axios.get(url, { withCredentials: true });
      dispatch(setShopItems(response.data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    
    loading,
    error,
    refetch: fetchData,  // now you can call refetch()
  };
};
