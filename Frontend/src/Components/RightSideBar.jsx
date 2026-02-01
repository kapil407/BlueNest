import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Avatar from "react-avatar";
import { Link, useParams } from "react-router-dom";
import { CgLayoutGrid } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";
import toast from "react-hot-toast";

function RightSideBar({ otherUsers }) {
  const theme = useSelector((store) => store.theme.theme);
  // console.log("right side", theme);

  const { profile } = useSelector((store) => store.user);
  const image = profile?.profilePic;
  let array;
  if (otherUsers) array = Object?.values(otherUsers);
  // console.log("othersUser",otherUsers);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [saerchName, setSearchName] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    const SearchedUser = array?.find((other) =>
      other?.firstName.toLowerCase().includes(saerchName.toLowerCase()),
    );

    if (SearchedUser) {
      dispatch(getOtherUsers([SearchedUser]));
    } else {
      toast.success("User not found");
    }

    setSearchName("");
  };

  return (
    <>
      <div className="w-[18%] mt-1  min-w-[250px] h-screen">
        <div>
          <div
            className={` flex p-3 rounded-full  border-1  ${theme == "light" ? "bg-gray-100 border-gray-300 " : "bg-black border-gray-400 "}`}
          >
            <IoSearch size={25} />
            <input
              type="text"
              value={saerchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchHandler(e);
              }}
              placeholder="Search"
              className={`ml-2 outline-none ${theme == "light" ? "text-black placeholder-gray-400" : "text-white placeholder-gray-500"} `}
            />
          </div>
          <div
            className={` mt-3 rounded-2xl p-1.5 border border-gray-300 ${theme == "light" ? "bg-gray-100" : "bg-black"}`}
          >
            <h1 className="font-bold text-lg mb-2 mt-2 mr-1 text-center">
              Who to follow
            </h1>

            <div className="flex justify-between flex-col ">
              {array &&
                array?.map((otherUser) => {
                  return (
                    <>
                      <div
                        className={`flex justify-between  mt-1.5 px-1 rounded-lg items-center ${theme == "light" ? "bg-gray-100 border border-gray-200 " : "bg-black border border-gray-100 "}`}
                      >
                        <div
                          key={otherUser?._id}
                          className="ml-2 my-2 flex justify-center items-center"
                        >
                          {!otherUser?.profilePic ? (
                            <Avatar
                              className="m-1 cursor-pointer"
                              src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                              size="50"
                              round={true}
                            />
                          ) : (
                            <img
                              src={otherUser.profilePic?.url}
                              alt="image"
                              className="w-15 object-cover h-15 rounded-full"
                            />
                          )}
                          <div className="ml-2">
                            <h1 className="font-bold">
                              {otherUser?.firstName}
                            </h1>
                            <p>{`${otherUser?.userName}`}</p>
                          </div>
                        </div>
                        {/* redirect to otherUsers profile */}
                        <Link
                          to={`/profile/${otherUser?._id}`}
                          className=" my-2"
                        >
                          <div className="my-2 ">
                            <button
                              className={`px-4 py-1.5  rounded-full cursor-pointer ${theme == "light" ? "bg-black text-white" : "bg-gray-400 text-white"}`}
                            >
                              Profile
                            </button>
                          </div>
                        </Link>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RightSideBar;
