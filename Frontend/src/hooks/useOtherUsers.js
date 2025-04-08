import { useEffect } from "react";
import { USER_API_END_POINT } from "../Utils/constant.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice.js";

const usegetOtherUsers=()=>{
    const dispatch=useDispatch();
            useEffect(()=>{
               const fetchOtherUsers=async ()=>{
                try {
                    const res=  await axios.get(`${USER_API_END_POINT}/getOthersProfile`,
                        {
                            withCredentials:true
                        }
                    )
                    
                    console.log(res);
                    dispatch(getOtherUsers(res?.data?.otherUsers))
                    
                } catch (error) {
                    console.error(error);
                }
               }
               fetchOtherUsers();

            },[])
}
export default usegetOtherUsers;