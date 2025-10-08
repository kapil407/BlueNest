import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { TWEET_API_END_POINT } from "../Utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getRefresh, getIsActive } from "../redux/tweetSlice.js";
import { FaImage } from "react-icons/fa";
const CreatePost = () => {
  const { user,profile } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 
  const dispatch = useDispatch();
      const profileImage=profile?.profilePic;
     
  const submitHandler = async () => {
    if (!description && !image) {
      toast.error("Please write something or add an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("id", user?._id);
      if (image) {
        formData.append("image", image); 
      }

      const res = await axios.post(
        `${TWEET_API_END_POINT}/createTweet`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("create post ",res);

      dispatch(getRefresh());

      if (res?.data?.success) {
        toast.success(res?.data?.message);
       
      }
      setDescription("");
      
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };
  const followingTweetHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-[100%]">
      <div>
        <div className="flex justify-around items-center border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-3 border-blue-400 "
                : "border-b border-transparent"
            } flex justify-center cursor-pointer hover:bg-gray-400 w-full text-center transition delay-75 py-3 px-2`}
          >
            <h1 className="font-bold text-gray-700 text-lg">For you</h1>
          </div>

          <div
            onClick={followingTweetHandler}
            className={`${
              !isActive
                ? "border-b-3  border-blue-400"
                : "border border-transparent"
            } flex justify-center cursor-pointer hover:bg-gray-400 w-full text-center transition delay-75 py-3 px-2`}
          >
            <h1 className="font-bold text-gray-700 text-lg ">Following</h1>
          </div>
        </div>

        <div>
          <div className="flex m-2">
          
              <Link to={`/profile/${user?._id}`} >
               
                {
                  !profileImage ?(
                  
                       <Avatar
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                  size="55"
                  round={true}
                />
                    
                  ):(
                   <img src={profileImage} alt="profilePhoto" className="rounded-full border-2 border-gray-400 w-[83px] h-[75px] object-cover" />
                  ) 

                  
                }
              </Link>
           
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-lg ml-4 mt-1 outline-none border-none w-full"
              type="text"
              placeholder="What's happening?"
            />
          </div>
        </div>

        <div className="flex justify-between p-8 border-b border-gray-300 items-center">
        
          <input
            type="file"
            accept="image/*"
             id="galleryUpload"
            onChange={(e) => setImage(e.target.files[0])}
          
            style={{display:"none"}}
          />
      <label
        htmlFor="galleryUpload"
        className="cursor-pointer text-3xl text-blue-500 hover:text-blue-700"
      >
        <FaImage />
      </label>
         

          <button
            onClick={submitHandler}
            className="bg-[#1D9BF0] p-3 rounded-full cursor-pointer border-none w-20 font-bold text-white hover:bg-blue-400"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
