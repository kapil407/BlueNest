import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Avatar from "react-avatar";
import { Link, useParams } from "react-router-dom";
import { CgLayoutGrid } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";
import toast from "react-hot-toast";

function RightSideBar({ otherUsers }) {
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
      <div className="w-[22%] mt-1 h-auto ml-2 ">
        <div>
          <div className="bg-gray-100 flex p-3 rounded-full  border-1 border-gray-300">
            <IoSearch size={25} />
            <input
              type="text"
              value={saerchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchHandler(e);
              }}
              placeholder="Search"
              className="ml-2 outline-none "
            />
          </div>
          <div className="bg-gray-100 mt-3 rounded-2xl p-1.5 border border-gray-300">
            <h1 className="font-bold text-lg mb-2 mt-2 mr-1 text-center">
              Who to follow
            </h1>

            <div className="flex justify-between flex-col ">
              {array &&
                array?.map((otherUser) => {
                  return (
                    <>
                      <div className="flex justify-between border border-gray-200 mt-1.5 px-1 bg-gray-200 rounded items-center">
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
                              src={otherUser.profilePic}
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
                            <button className="px-4 py-1.5 bg-black text-white rounded-full cursor-pointer">
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
