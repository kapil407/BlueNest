import axios from "axios";
import { useEffect } from "react";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice.js";
// import { IoMdVolumeHigh } from "react-icons/io";
import { useSelector } from "react-redux";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/getProfile/${id}`, {
          
          withCredentials: true 
        });

        console.log("res in useGetProfile-> ",res);

        dispatch(getMyProfile(res?.data?.user)); // update the user inside the profile action
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyProfile();
  }, [id]);
};

export default useGetProfile;
