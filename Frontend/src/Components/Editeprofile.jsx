import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getRefresh } from "../redux/tweetSlice";
import { USER_API_END_POINT } from "../Utils/constant.js";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

import { getMyProfile } from "../redux/userSlice.js";
const EditeProfile = () => {
  const { tweet } = useSelector((store) => store?.tweet);

  const dispatch = useDispatch();
  const { profile, user } = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [image, setImage] = useState(null);

  const [lastName, setLastName] = useState(user?.lastName || "");

  const [userName, setUserName] = useState(user?.userName || "");

  const [bio, setBio] = useState(user?.bio || "");
  const EditeHandler = async () => {
    try {
      const formdata = new FormData();
      if (image) {
        formdata.append("image", image);
      }
      formdata.append("firstName", firstName);
      formdata.append("lastName", lastName);
      formdata.append("userName", userName);
      formdata.append("bio", bio);
      const res = await axios.patch(
        `${USER_API_END_POINT}/updateProfile`,
        formdata,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(getMyProfile(res?.data?.updated));
      }

      dispatch(getRefresh());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="flex-1 ml-[12%] mt-10 border border-gray-300 justify-center items-center  rounded-2xl w-[80%] bg-gray-100"
        style={{
          boxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
          WebkitBoxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
          MozBoxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
        }}
      >
        <h1 className="text-center p-2 font-bold text-2xl border-b border-gray-300">
          Edit your profile
        </h1>
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
          <input
            type="file"
            accept="image/*"
            id="gallaryUpload"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 cursor-pointer p-1 rounded-xl mt-2 w-[15%]"
            style={{ display: "none" }}
          />
          <label
            htmlFor="gallaryUpload"
            className="cursor-pointer text-3xl text-blue-500 hover:text-blue-700"
          >
            <FaImage />
          </label>
        </div>

        <div className="w-[100%] flex justify-center items-center">
          <Link
            onClick={EditeHandler}
            to={"/"}
            className="flex bg-[#1D9BF0]  hover:bg-blue-400 items-center justify-center  mb-4 rounded text-white w-[25%] p-2 "
          >
            <button>Save</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditeProfile;
