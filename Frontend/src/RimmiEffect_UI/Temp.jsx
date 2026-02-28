import { useSelector } from "react-redux";

const FeedRemmi = () => {
  const { theme } = useSelector((store) => store.theme);
  return (
    <>
      <div
        className={`flex h-screen w-screen ${theme == "light" ? "bg-white" : "bg-black"}`}
      >
        <div
          className={`w-[22%] h-screen ${theme == "light" ? "bg-white" : "bg-black"}`}
        >
          {/* leftside bar */}
        </div>

        {/* <div className={`h-screen w-screen ${theme=="light"?"bg-white":"bg-black"}`}> */}

        {/* Feed Container */}
        <div className="flex flex-col w-[55%] h-screen ml-2 ">
          <div
            className={` 
                        shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
                        border border-gray-200 
                         transition duration-300  h-[30%] 
                       ${theme == "light" ? "bg-white" : "bg-black"}`}
          >
            {/* Upper Box */}
            <div className="mb-4 border-b border-gray-200 py-6 bg-gray-700"></div>

            {/* Create Post Box */}
            <div className="mx-2 p-4">
              {/* Photo + Input */}
              <div className="flex  items-start  ">
                {/* Image */}
                <div className="w-[83px] h-[75px] rounded-full bg-gray-700"></div>

                {/* Input */}
                <div className="flex-1 bg-gray-700 ml-4 mt-2">
                  <input
                    type="text"
                    placeholder=""
                    className="w-full outline-none text-lg"
                  />
                </div>
              </div>

              {/* Media + Button */}
              <div className="flex justify-between items-center p-8 ">
                {/* Media Button */}
                <div className=" cursor-pointer h-8 w-8 borderd bg-gray-700 mb-6 rounded"></div>

                {/* Post Button */}
                <button className="bg-gray-400 text-white mb-3  p-5 w-20 rounded-full mb-6 transition"></button>
              </div>
            </div>

            {/* </div> */}
          </div>
          <div className="border-b border-gray-200 w-[70%]">
            <div className="w-full">
              <div className="flex flex-col">
                <div className="ml-1 flex  items-center">
                  <div className="">
                    <div className="flex ml-6">
                      <button className="m-1  ">
                        <img
                          alt="photo"
                          className="w-13 h-13 rounded-full border-2 object-cover border-gray-400 "
                        />
                      </button>
                      <div className="flex ml-2 mb-4 items-center ">
                        <h1 className="font-bold text-lg ml-1"></h1>
                        <p className="ml-1"></p>
                      </div>
                    </div>

                    <div className=" w-[90%] flex justify-center items-center ml-12 ">
                      <div>
                        <img
                          alt="image"
                          className=" rounded object-cover w-180 h-120 "
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between p-8">
                  <div className="flex   p-2 rounded-full  cursor-pointer"></div>
                  <div className="flex  p-2 rounded-full cursor-pointer">
                    <button className="flex"></button>
                  </div>
                  <div>
                    <button className="flex   p-2 rounded-full  cursor-pointer"></button>

                    <>
                      <button className=" flex items-center   rounded-3xl p-2"></button>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[22%] h-screen">{/* rightside bar */}</div>
      </div>
    </>
  );
};

export default FeedRemmi;
