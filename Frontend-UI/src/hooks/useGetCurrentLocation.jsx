import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { setUserlocation } from "../Redux/UserSlice";

const GetCurrentLocation = () => {
  const dispatch = useDispatch();
  const { Userdata } = useSelector(state => state.user)
  useEffect(() => {


    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log("Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude);
      const data = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY}`)
      console.log(data.data.results[0].city)
      dispatch(setUserlocation(data?.data?.results[0].city));
    });



  }, [Userdata])

}

export default GetCurrentLocation;