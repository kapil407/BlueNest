import React from "react";
import Avatar from 'react-avatar';
import { FaImage } from "react-icons/fa6";
const CreatePost = () => {
  return (
    <>
      <div className="w-[100%]">
        <div>
          <div className="flex justify-around items-center border-b border-gray-200 ">
            <div className="flex justify-center cursor-pointer hover:bg-gray-400 w-full text-center transition delay-75 py-3 px-2  
             ">
            
              <h1 className="font-bold text-gray-700 text-lg">For you</h1>
             
            </div>

            <div className="cursor-pointer  hover:bg-gray-400 w-full text-center transition delay-75 py-3 px-2">
              <h1 className="font-bold text-gray-700 text-lg">Following</h1>
            </div>
          </div>
         <div>
         <div className="flex ">
            <div>
            <Avatar className="m-1 cursor-pointer" src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" size="50" round={true} />
            </div>
            <input className="text-lg  ml-2 mt-1 outline-none border-none w-full" type="text"  placeholder="What's happening?"/>
          </div>
         </div>
        <div className="flex justify-between p-8 border-b border-gray-300 items-center">
        <div className="cursor-pointer">
        <FaImage size={20}/>
        </div>
        <button className="bg-[#1D9BF0] p-3 rounded-full cursor-pointer border-none w-20 font-bold text-white hover:bg-blue-400">Post</button>
        </div>
        </div>
      </div>
    </>
  );
};
export default CreatePost;
