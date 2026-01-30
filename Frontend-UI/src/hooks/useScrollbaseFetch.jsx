import { useCallback, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setShopItems } from "../Redux/OwnerSlice";

export const useFetchOnScroll = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.get(`${url}?page=${page}&limit=20`, {
        withCredentials: true,
      });

      dispatch(setShopItems(res.data));
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, url, loading]);

  return { fetchData, loading, error };
};
