import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Link, useParams } from "react-router-dom";
import { TWEET_API_END_POINT } from "../Utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice.js";
import { FaImage } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { IoClose } from "react-icons/io5";
import store from "../redux/store.js";

import useGetProfile from "../hooks/useGetProfile.js";

const CreatePost = () => {
  const theme = useSelector((store) => store.theme.theme);
  const { user, profile } = useSelector((store) => store.user);
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [prompt, setPrompt] = useState("");

  const dispatch = useDispatch();
  useGetProfile(user?._id);

  let profileImage = profile?.profilePic?.url;
  console.log("profileImage", user);
  const [loading, setLoading] = useState(false);
  const isLight = theme == "light";

  const submitHandler = async () => {
    if (!description && !media) {
      toast.error("Please write something or add an image");
      return;
    }

    try {
      const formData = new FormData();
      // formData.append("description", description);

      if (media) {
        formData.append("media", media);
      }
      formData.append("description", description);
      formData.append("id", user?._id);

      setLoading(true);
      const res = await axios.post(
        `${TWEET_API_END_POINT}/createTweet`,
        formData,
        {
          withCredentials: true,
        },
      );

      // console.log("create post ", res.data.tweet.image.url);

      dispatch(getRefresh());

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setMedia(null);
      }
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    const formdata = new FormData();
    setLoading(true);
    if (media) {
      formdata.append("media", media);
    }
    formdata.append("prompt", prompt);
    // formData.append("id", user?._id);
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/api/simple-image-post`,
        formdata,
        {
          withCredentials: true,
        },
      );
      setDescription(res.data.postText);
      console.log("res in Gemini", res);
      if (res.status == 200) {
        setPrompt("");
        setShowInput(false);
      }
    } catch (error) {
      toast.error(error.response.statusText);
      setPrompt("");

      console.log("error in AI", error.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div>
        <div
          className={`border-b p-4 ${isLight ? "border-slate-200" : "border-slate-800"}`}
        >
          <div className="flex gap-3">
            <Link to={`/profile/${user?._id}`}>
              {!profileImage ? (
                <Avatar
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                  size="55"
                  round={true}
                />
              ) : (
                <img
                  src={profileImage}
                  alt="profilePhoto"
                  className="lg:h-14 lg:w-14 h-15 w-15 rounded-full object-cover ring-2 ring-sky-500/20"
                />
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="What's happening?"
                className={`w-full resize-none mt-4 ml-2 bg-transparent text-xl outline-none placeholder:text-slate-400 ${
                  isLight ? "text-slate-950" : "text-slate-100"
                }`}
              />

              {media && (
                <div
                  className={`mt-3 flex items-center justify-between rounded-2xl border px-4 py-2 text-sm ${
                    isLight
                      ? "border-slate-200 bg-slate-50 text-slate-600"
                      : "border-slate-800 bg-slate-900 text-slate-300"
                  }`}
                >
                  <span className="truncate">{media.name}</span>
                  <button
                    type="button"
                    onClick={() => setMedia(null)}
                    className="ml-3 rounded-full p-1 hover:bg-red-500/10 hover:text-red-500"
                    aria-label="Remove media"
                  >
                    <IoClose size={18} />
                  </button>
                </div>
              )}

              <div className="mt-4 flex  items-center gap-3 lg:justify-between">
                <input
                  type="file"
                  accept="image/*,video/*"
                  id="galleryUpload"
                  onChange={(e) => setMedia(e.target.files[0])}
                  className="hidden"
                />
                <div className="relative group inline-block">
                  <label
                    htmlFor="galleryUpload"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sky-500 transition hover:bg-sky-500/10"
                  >
                    <FaImage lg:size={22} className="w-52 h-22" />
                  </label>

                  <span
                    className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                      isLight
                        ? "bg-slate-950 text-white"
                        : "bg-white text-slate-950"
                    }`}
                  >
                    Upload
                  </span>
                </div>
                {/* {gemini buttton } */}
                {!showInput ? (
                  <button
                    onClick={() => setShowInput(true)}
                    className="bg-purple-500 text-white text-sm font-bold py-1  px-1.5  lg:px-3 lg:py-2 rounded-full cursor-pointer"
                  >
                    Post By Gemini
                  </button>
                ) : (
                  <>
                    <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/30 backdrop-blur-sm">
                      <div className=" p-6 rounded-xl shadow-xl flex bg-cover bg-center flex-col  lg:w-[40%] lg:h-[30%]  items-center gap-2" style={{backgroundImage:`url(geminiImage.jpg)`}}>
                        <input
                          type="text"
                          placeholder="Create Post"
                          className="p-2 border border-white/20 backdrop-blur-xs lg:text-2xl rounded w-65 lg:w-full text-white outline-none lg:h-[40%]"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                        
                          <button
                            onClick={handleAIGenerate}
                            disabled={!prompt.trim() || loading}
                            className={` text-white flex   justify-center px-2 py-1 lg:w-[40%] lg:mt-4 lg:text-center rounded-full  ${!prompt.trim() || loading ? "opacity-50 cursor-not-allowed bg-gray-800 " : "cursor-pointer bg-blue-500"}`}
                          >
                            {loading ? (
                              <>
                                <ClipLoader
                                  size={18}
                                  color="#fff"
                                  className="bg-gray-800"
                                />
                                Generating...
                              </>
                            ) : (
                              "Generate"
                            )}
                          </button>

                          <button
                            onClick={() => setShowInput(false)}
                            className="text-white-500 px-2 py-1 w-20 cursor-pointer lg:w-[40%] border rounded-2xl lg:p-1 bg-red-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                   
                  </>
                )}

                <button
                  onClick={submitHandler}
                  disabled={(!media && !description?.trim()) || loading}
                  className={`flex min-w-24 items-center justify-center gap-2 rounded-full lg:px-5 lg:py-2.5 py-3 font-bold text-white transition disabled:opacity-60 ${
                    (!media && !description?.trim()) || loading
                      ? "cursor-not-allowed bg-slate-400"
                      : "cursor-pointer bg-[#1D9BF0] shadow-lg shadow-sky-500/20 hover:bg-sky-500"
                  }`}
                >
                  {loading ? (
                    <>
                      <ClipLoader size={18} color="#fff" />
                      Posting...
                    </>
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
