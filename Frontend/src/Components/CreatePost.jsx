import axios from "axios";
import React, { useState } from "react";
import Avatar from 'react-avatar';
import { FaImage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {TWEET_API_END_POINT} from '../Utils/constant.js'
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import { getRefresh } from "../redux/tweetSlice.js";
const CreatePost = () => {
  const {user}=useSelector(store=>store.user);
    const [description,setDescription]=useState();
    const dispatch=useDispatch();
    const submitHandler=async ()=>{
            try {
              const res=await axios.post(`${TWEET_API_END_POINT}/createTweet` ,{description,id:user?._id},
               {
                headers:{
                    "content-type":"application/json"
                },
                withCredentials:true
               }
               )
               
              //  console.log(res);
              //  console.log(res?.data?.success
                // );
                dispatch(getRefresh()); // when this hit , it call fetRefresh in useGetTweets hook and get the tweet on thet ui
             
               if(res?.data?.success){

                toast.success(res?.data?.message);
               
              }
              setDescription("");
            } 
            catch (error) {
              console.error(error);  
            }
    }

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
         <div className="flex m-2 ">
         <div className="cursor-pointer">
            <Link to={`/profile/${user?._id}`}>
            <Avatar className="" src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" size="55" round={true} />
            </Link>
         </div>
            <input value={description} onChange={(e)=>setDescription(e.target.value)} className="text-lg  ml-4 mt-1 outline-none border-none w-full" type="text"  placeholder="What's happening?"/>
          </div>
         </div>
        <div className="flex justify-between p-8 border-b border-gray-300 items-center">
        {/* <div> */}
        <FaImage size={25} className="cursor-pointer"/>
        {/* </div> */}
        <button onClick={submitHandler} className="bg-[#1D9BF0] p-3 rounded-full cursor-pointer border-none w-20 font-bold text-white hover:bg-blue-400">Post</button>
        </div>
        </div>
      </div>
    </>
  );
};
export default CreatePost;
