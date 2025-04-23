import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getRefresh } from "../redux/tweetSlice";
import { USER_API_END_POINT } from "../Utils/constant.js";
import toast from "react-hot-toast";

const EditeProfile = () => {
  const {tweet} =useSelector(store=>store?.tweet);
  // console.log("first",tweet);
  const dispatch = useDispatch();
  const { profile,user } = useSelector((store) => store.user);
          console.log("first->",user);
 const [firstName, setFirstName] = useState(profile?.firstName || "");
                                /*React render hone se pehle   profile  undefined ho sakta hai.

                                Us waqt useState(profile?.firstName) → becomes undefined.
                                
                                Aur fir jab hum input me value={firstName} denge:

                                <input value={firstName} />
                                ...React bolega:
                                Warning: A component is changing an uncontrolled input to be controlled.*/

 const [lastName, setLastName] = useState(profile?.lastName || "");

  const [userName, setUserName] = useState(profile?.userName || "");
//   console.log(firstName ," ", lastName, " ", userName);
const [bio, setBio] = useState(profile?.bio || "");
  const EditeHandler = async () => {
    try {
      const res = await axios.patch(
        `${USER_API_END_POINT}/updateProfile`,
        {
          firstName,
          userName,
          lastName,
          bio
      
        },
        {
          withCredentials: true,
        }
      );
      // console.log("res->",res)
      if(res?.data?.success){
        toast.success(res.data.message);
      }
      // console.log("res-> ",res);
      dispatch(getRefresh());
     
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div>
      <div className="flex-1 border border-gray-300 justify-center items-center m-8 rounded-2xl w-[80%] bg-gray-100">
        <h1 className="text-center p-2 font-bold text-2xl border-b border-gray-300">Edit your profile</h1>
        <div className="m-8 w-[80%] p-2">
          <input
            type="text"
            placeholder="Enter firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-600 outline-blue-400 w-full p-2 rounded-full my-2"
          />
           <input
            type="text"
            placeholder="Enter lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-600 outline-blue-400 w-full p-2 rounded-full my-2"
          />
         
          <input
            type="text"
            placeholder="Enter userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-600 outline-blue-400 w-full p-2 rounded-full my-2"
          />
           <input
            type="text"
            placeholder="Enter Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border border-gray-600 outline-blue-400 w-full p-2 rounded-full my-2"
          />
          
        </div>
        <div>
          <Link onClick={EditeHandler} to={"/"}>
            <button className="bg-[#1D9BF0] hover:bg-blue-400 mb-4 font-semibold text-white p-2 w-[50%] ml-28 rounded-3xl flex justify-center items-center cursor-pointer">
              Save
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditeProfile;
