import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { TWEET_API_END_POINT } from "../Utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getRefresh, getIsActive } from "../redux/tweetSlice.js";
import { FaImage } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { IoClose } from "react-icons/io5";

const CreatePost = () => {
  const theme = useSelector((store) => store.theme.theme);
  const { user, profile } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  // const [prompt, setPrompt] = useState("");
  // const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();
  // console.log("progile", profile);
  let profileImage = profile?.profilePic?.url;
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
          headers: {
            "Content-Type": "multipart/form-data",
          },
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

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };
  const followingTweetHandler = () => {
    dispatch(getIsActive(false));
  };
  // const handleAIGenerate=async()=>{
  //   try {
  //       const res=await axios.post(`${TWEET_API_END_POINT}/generate-post`,{prompt},{
  //         withCredentials:true
  //       })
  //       console.log("res",res);
  //   } catch (error) {
  //     console.log("error in AI",error);
  //   }
  // }

  return (
    <div className="w-full">
      <div>
        <div
          className={`sticky top-0 z-20 grid grid-cols-2 border-b backdrop-blur-xl ${
            isLight
              ? "border-slate-200 bg-white/85"
              : "border-slate-800 bg-slate-950/85"
          }`}
        >
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "text-sky-500"
                : isLight
                  ? "text-slate-500"
                  : "text-slate-400"
            } group flex cursor-pointer justify-center text-center transition hover:bg-sky-500/10`}
          >
            <h1 className="relative px-4 py-4 text-base font-black">
              For you
              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1D9BF0]" />
              )}
            </h1>
          </div>

          <div
            onClick={followingTweetHandler}
            className={`${
              !isActive
                ? "text-sky-500"
                : isLight
                  ? "text-slate-500"
                  : "text-slate-400"
            } group flex cursor-pointer justify-center text-center transition hover:bg-sky-500/10`}
          >
            <h1 className="relative px-4 py-4 text-base font-black">
              Following
              {!isActive && (
                <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1D9BF0]" />
              )}
            </h1>
          </div>
        </div>

        <div className={`border-b p-4 ${isLight ? "border-slate-200" : "border-slate-800"}`}>
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
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-sky-500/20"
                />
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="What's happening?"
                className={`w-full resize-none bg-transparent text-lg outline-none placeholder:text-slate-400 ${
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

              <div className="mt-4 flex items-center justify-between">
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
                    <FaImage size={22} />
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

            {/* {!showInput ? (
              <button
                onClick={() => setShowInput(true)}
                className="bg-purple-500 text-white px-4 py-2  rounded-full"
              >
                 Create Post By Gemini
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Create Post"
                  className="p-2 border rounded w-64"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                  onClick={handleAIGenerate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  Generate
                </button>

                <button
                  onClick={() => setShowInput(false)}
                  className="text-red-500"
                >
                  Cancel
                </button>
              </div>
            )} */}

            <button
              onClick={submitHandler}
              disabled={(!media && !description.trim()) || loading}
                  className={`flex min-w-24 items-center justify-center gap-2 rounded-full px-5 py-2.5 font-bold text-white transition disabled:opacity-60 ${
                    (!media && !description.trim()) || loading
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
