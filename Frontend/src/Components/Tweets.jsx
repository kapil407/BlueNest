import React from "react";
import Avatar from "react-avatar";
import { FaImage } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { PiBookmarkSimpleBold } from "react-icons/pi";


function Tweets() {
  return (
    <>
      <div className="border-b border-gray-200">
        <div className="w-full">
          <div>
            <div className="ml-1 flex  items-center">
              <Avatar
                className="m-1 cursor-pointer"
                src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                size="50"
                round={true}/>
              <div className="ml-2 w-full">
                <div className="flex ml-2 items-center mt-4">
                  <h1 className="font-bold text-lg ml-1">Kapil</h1>
                  <p className="ml-1">@kapil_keer .1m</p>
                  
                </div>
                <div>
                  <p>hello Developers let's grow together</p>
                </div>
              </div>
            </div>
            <div>
            <div className="flex justify-between p-8">
                <div className="flex  hover:bg-green-200 p-2 rounded-full cursor-pointer">
                <FaRegComment size={23}/>
                <p className="ml-2">0</p>
                </div>
                <div className="flex hover:bg-pink-200 p-2 rounded-full cursor-pointer">
                <BiLike size={25}/>
                <p className="ml-2">0</p>
                </div>
                <div className="flex hover:bg-yellow-200 p-2 rounded-full cursor-pointer">
                <PiBookmarkSimpleBold size={25}/>
                <p className="ml-2">0</p>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tweets;
