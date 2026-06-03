import { useEffect } from "react";
import { USER_API_END_POINT } from "../Utils/constant.js";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { getOtherUsers } from "../redux/userSlice.js";            {/*use select and cntrl + F and see magic */}

const usegetOtherUsers=()=>{
    const {accessToken}=useSelector((store)=>store.token);
    const dispatch=useDispatch();
            useEffect(()=>{
               const fetchOtherUsers=async ()=>{
                try {
                    const res=  await axios.get(`${USER_API_END_POINT}/getOthersProfile`,
                       {}, {
                        headers: {
                          // Assuming you have the access token stored in localStorage or Redux store
                          Authorization: `Bearer ${accessToken}`,
                        },
                            withCredentials:true
                        }
                    )
                    
                    // console.log(res);
                    dispatch(getOtherUsers(res?.data?.otherUsers))
                    
                } catch (error) {
                    console.error(error);
                }
               }
               fetchOtherUsers();

            },[])
}
export default usegetOtherUsers;