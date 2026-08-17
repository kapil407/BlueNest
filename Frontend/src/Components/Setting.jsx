import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Typewriter from "./TypeWriter.jsx";
import ChangeEmailAndPasswordComponent from "./ChangeEmailAndPasswor.jsx";
import store from "../redux/store.js";

const SettingComponent = () => {

  const navigate = useNavigate();
    const user=useSelector(store=>store.user);
    const userId=user?.user?._id;
    console.log("setting",user?.user?._id);
   const EmailAndPasswordHandler=()=>{
    console.log("email");
         navigate(`/settings/${userId}`)   
   }

   const LogoutFromAllDevicesHandler=async()=>{
    try{
        const res=await axios.post(`${USER_API_END_POINT}/logout-all-devices`,{},{
          withCredentials:true
        })
        console.log("res in logout all",res.data.message);
        if(res?.data?.success){
          toast.success(res?.data?.message);
        }
        else{
          toast.error(res?.data?.message);
        }
    }
    catch(error){
      console.log("error in logout from all devices",error);
    }
   }

  const theme = useSelector((store) => store.theme.theme);
  const islight = theme == "light";

  // console.log("theme",settingImage.webp);
  return (
    <div className={` w-full h-full backdrop-blur-sm bg-transparent inset-0 z-50 fixed  flex flex-col items-center justify-center
        ${islight?"text-black":""}
    `}>
      <h1 className="h-[10%] lg:h-15 font-black lg:pb-[5%] px-2 text-lg bg-center text-transparent bg-clip-text bg-cover " style={{backgroundImage:`url(textImage5.jpg)`}}>
        <Typewriter
          word="Manage your email, password and account security."
          speedText={120} className={`text-xl lg:text-2xl `}
        />
      </h1>
      <div
        className={`flex h-full lg:w-[25%] flex-col   w-full lg:h-[70%]  lg:rounded-xl object-cover   lg:border border-slate-700   text-xl font-black 
        `}
        style={{
          backgroundImage: `url(/setting4.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex text-white items-center gap-3 py-2 lg:py-0 lg:w-full border-b  px-2 lg:h-[20%]  border-blue-800   text-2xl font-black ">
          <Link to="/">
            <FaLongArrowAltLeft size={20} className="cursor-pointer  " />
          </Link>
          <h1>Settings</h1>
        </div>
            <div className="flex w-full py-8 lg:w-[80%] lg:py-[10%]  px-2 gap-6 h-full flex-col">
               <button className="border border-slate-800 p-2 mx-4 lg:w-full bg-transparent hover:bg-blue-400 backdrop-blur-sm text-black cursor-pointer  rounded-3xl " onClick={EmailAndPasswordHandler}> Change email or password</button>
               <button className="border lg:w-full border-slate-800 p-2 mx-4 bg-transparent hover:bg-blue-400 backdrop-blur-sm text-black cursor-pointer  rounded-3xl " onClick={LogoutFromAllDevicesHandler}>Logout from all devices</button>
              
              <Link to='/setting/deleteAccount'>
               <button className="border w-[90%] lg:w-full border-slate-800 p-2 mx-4  bg-transparent hover:bg-blue-400 backdrop-blur-sm text-black cursor-pointer  rounded-3xl ">Delete your account</button>
              </Link>
            </div>

      </div>
    </div>
  );
};
export default SettingComponent;
