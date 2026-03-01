import { useSelector } from "react-redux";

const FeedRemmi = () => {
  const { theme } = useSelector((store) => store.theme);
  return (
    <>
      <div
        className={`flex justify-center  h-screen w-screen ${theme == "light" ? "bg-white" : "bg-black"}`}
      >
       

       

        {/* Feed Container */}
        <div className="flex flex-col w-[55%] h-screen  ">
          <div
            className={` 
                        shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
                        border border-gray-200 
                         transition duration-300  h-[40%] 
                       ${theme == "light" ? "bg-white" : "bg-black"}`}
          >
            {/* Upper Box */}
            <div className={`mb-4 border-b border-gray-200 py-6 animate-pulse b ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}></div>

            {/* Create Post Box */}
            <div className="mx-2 p-4">
              {/* Photo + Input */}
              <div className="flex  items-start  ">
                {/* Image */}
                <div className={`w-[83px] h-[75px] animate-pulse rounded-full  ${theme=="light"?"gray-400":"bg-gray-700"}`}></div>

                {/* Input */}
                <div className={`flex-1  animate-pulse ml-4 mt-2 ${theme=="light"?"gray-400":"bg-gray-700"}`}>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full outline-none text-lg"
                  />
                </div>
              </div>

              {/* Media + Button */}
              <div className="flex justify-between items-center p-8 h-[8%]">
                {/* Media Button */}
                <div className={` animate-pulse h-8 w-8 borderd  mb-6 rounded ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}></div>

                {/* Post Button */}
                <button className={` animate-pulse text-white mb-3  p-5 w-20 rounded-full mb-6 transition ${theme=="light"?"bg-gray-400":"bg-gray-700"} `}></button>
              </div>
            </div>

           
          </div>
          <div className="border-b border-gray-200 w-[70%]">
              <div className="m-2 ">
                <div className="flex ">
                  {/* profile image and name  */}
                  <div className={`h-10 w-10 rounded-full animate-pulse bg-gray-400 ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>

                  </div>
                  <div className={`ml-4  w-20  p-2 ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>

                  </div>
                </div>
                <div className="flex flex-col">
                  {/* text and post */}
                  <div className={`w-10 p-3 mb-3 ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>

                  </div>
                  <div className={`h-110 w-186  ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>

                  </div>
                </div>
              </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default FeedRemmi;
