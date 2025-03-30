import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const isLoginHandler=()=>{
        setisLogin(!isLogin);
  }
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center ">
        <div className="flex justify-evenly w-[80%] ">
          <div className="my-41">
            <img
              className=" w-35 h-35 "
              src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
              alt="twitter-logo"
            />
          </div>
          <div>
            <h1 className="font-bold text-6xl">Happening now</h1>
            <h1 className="font-bold text-2xl my-2">Login</h1>
            <div>
              <form className="flex flex-col"> 
                {!isLogin && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter firstname"
                      className="border  border-gray-600 outline-blue-400  w-[60%] p-2 rounded-full my-2"
                    />
                    <input
                      type="text"
                      placeholder="Enter lastname"
                      className="border  border-gray-600 outline-blue-400  w-[60%] p-2 rounded-full my-2"
                    />
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="border  border-gray-600 outline-blue-400  w-[60%] p-2 rounded-full my-2"
                    />
                  </>
                )}
                <input
                  type="text"
                  placeholder="Enter email"
                  className="border  border-gray-600 outline-blue-400  w-[60%] p-2 rounded-full my-2"
                />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="border  border-gray-600 outline-blue-400  w-[60%] p-2 rounded-full my-2"
                />
               <Link to="/">
               <button  className="px-3 py-1 bg-[#1D9BF0] w-[60%] my-2 rounded-full cursor-pointer hover:bg-blue-400 text-white font-bold">Login</button>
               </Link>
                <h1>
                  {isLogin ? "Already have an account? ": "Don't have an account? "}<span onClick={isLoginHandler} className="text-blue-600 cursor-pointer">{isLogin ? "Register" : "Login"}</span></h1>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
