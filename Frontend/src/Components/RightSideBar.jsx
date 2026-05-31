import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";
import toast from "react-hot-toast";

function RightSideBar({ otherUsers }) {
  const theme = useSelector((store) => store.theme.theme);
  const isLight = theme == "light";
  const array = otherUsers ? Object.values(otherUsers) : [];
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    const searchedUser = array?.find((other) =>
      other?.firstName?.toLowerCase().includes(searchName.toLowerCase()),
    );

    if (searchedUser) {
      dispatch(getOtherUsers([searchedUser]));
    } else {
      toast.success("User not found");
    }

    setSearchName("");
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <form
        onSubmit={searchHandler}
        className={`sticky top-4 z-10 flex items-center gap-3 rounded-2xl border px-4 py-3 ${
          isLight
            ? "border-slate-200 bg-white text-slate-950 shadow-sm"
            : "border-slate-800 bg-slate-900 text-slate-100"
        }`}
      >
        <IoSearch size={22} className={isLight ? "text-slate-500" : "text-slate-400"} />
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search BlueNest"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400"
        />
      </form>

      <section
        className={`rounded-3xl border p-4 ${
          isLight
            ? "border-slate-200 bg-white shadow-sm"
            : "border-slate-800 bg-slate-900/70"
        }`}
      >
        <div className="mb-3">
          <h1 className="text-xl font-black">Who to follow</h1>
          <p className={`text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Discover people around you
          </p>
        </div>

        <div className="space-y-2">
          {array?.slice(0, 6).map((otherUser) => (
            <div
              key={otherUser?._id}
              className={`flex items-center justify-between gap-3 rounded-2xl p-2 transition ${
                isLight ? "hover:bg-slate-100" : "hover:bg-slate-800"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                {!otherUser?.profilePic ? (
                  <Avatar
                    className="shrink-0 cursor-pointer"
                    src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                    size="44"
                    round={true}
                  />
                ) : (
                  <img
                    src={otherUser.profilePic?.url}
                    alt="profile"
                    className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-sky-500/20"
                  />
                )}
                <div className="min-w-0">
                  <h2 className="truncate font-bold">{otherUser?.firstName}</h2>
                  <p
                    className={`truncate text-sm ${
                      isLight ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    @{otherUser?.userName}
                  </p>
                </div>
              </div>

              <Link
                to={`/profile/${otherUser?._id}`}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                  isLight
                    ? "bg-slate-950 text-white hover:bg-slate-700"
                    : "bg-white text-slate-950 hover:bg-slate-200"
                }`}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`rounded-3xl border p-4 ${
          isLight
            ? "border-slate-200 bg-white shadow-sm"
            : "border-slate-800 bg-slate-900/70"
        }`}
      >
        <h2 className="font-black">Trending</h2>
        <div className="mt-3 space-y-3">
          {["#BlueNest", "#WebDev", "#React"].map((tag) => (
            <div key={tag}>
              <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Trending now
              </p>
              <p className="font-bold">{tag}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RightSideBar;
