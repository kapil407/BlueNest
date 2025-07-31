import axios from "axios";
import { useEffect } from "react";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice.js";
// import { IoMdVolumeHigh } from "react-icons/io";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/getProfile/${id}`, {
          withCredentials: true /* Jab hum Axios ya fetch() se API call karte hai, toh by default browser cookies nahi bhejta agar:

                           // Domain alag hai (frontend localhost:5173, backend localhost:5000)
                            
                           // Ya humne  httpOnly cookie set ki hai (secure auth ke liye)

                           Iske bina cookie client ke browser me set nahi hogi
                         Aur future requests me token backend ko nahi milega
                           */,
        });

        // console.log("res-> ",res);

        dispatch(getMyProfile(res?.data?.user)); // update the user inside the profile action
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyProfile();
  }, [id]);
};

export default useGetProfile;
