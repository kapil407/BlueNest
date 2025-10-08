import React, { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../Utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

function Login() {
        const navigate=useNavigate();
        const dispatch=useDispatch();
       
        const [emailId,setEmailId]=useState("");
        const [password,setPassword]=useState(""); 
        const [show,setshow]=useState(false);

  const submittedHandler = async (e) => {
     e.preventDefault();
                 try {
                      const res = await axios.post(
                        `${USER_API_END_POINT}/login`,
                        { emailId, password },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                          withCredentials: true,
                        }
                      );
                      console.log("login->", res);
                      dispatch(getUser(res?.data?.user)); 
              
                      if (res?.data?.success) {
                        navigate("/");
              
                        toast.success(res?.data?.message);
                      }
                    } catch (error) {
                      toast.success(error.response.data.message);
                      console.log(error);
                    }
                  
                };
              
  const registerHandler = () => {
    navigate("/Signup");
  };
  const showHandler = () => {
    setshow(!show);
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center ">
        <div className="flex justify-evenly w-[80%] items-center">
          <div>
            <img
              className=" w-100 h-100 rounded-full border-4 border-gray-400"
              src="logo.png"
              alt=""
            />
          </div>
          <div
            className="  w-[50%] flex flex-col items-center justify-center pb-6 
          bg-white/10 backdrop-blur-md backdrop-saturate-150 
          rounded-2xl shadow-xl border border-white/50 
             p-6 text-black "
          >
            <h1 className="font-bold text-2xl mt-6 mb-4">Login</h1>

            <div className=" h-[60%] w-[70%]  ">
              <form onSubmit={submittedHandler} className="flex flex-col ">
              
               
               

                <input
                  type="text"
                  placeholder="Enter email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="border-2   mb-4 border-gray-600 outline-blue-400   w-[100%] p-3 rounded-full my-2"
                />
                <div className="flex items-center border-2 border-gray-600  mb-4 w-[100%] rounded-3xl my-2  hover:border-blue-400  ">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className=" outline-none  w-[100%] p-3"
                  />

                  <span className="mr-3 cursor-pointer" onClick={showHandler}>
                    show
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-3 py-3 bg-[#1D9BF0] w-[100%] my-2 rounded-full cursor-pointer hover:bg-blue-400 text-white font-bold"
                >
                 Login
                </button>
                    
                <h1 className="text-center">
                {
                    <>
                         Don't have account 
                  
                        <span  className="text-blue-600 cursor-pointer ml-1"  onClick={registerHandler}>register</span>
                    
                    </>
                    }
                 
                 
                </h1>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
