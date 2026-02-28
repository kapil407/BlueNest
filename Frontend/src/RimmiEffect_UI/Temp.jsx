import { useSelector } from "react-redux";

const FeedRemmi = () => {
  const {theme}=useSelector(store=>store.theme);
    return (
    <>
   <div className="flex h-screen w-screen">
     <div className="w-[10%] h-screen">
      {/* leftside bar */}
    </div>
    <div className="w-[18%] h-screen">
      {/* rightside bar */}
    </div>
      <div className={`h-screen w-screen ${theme=="light"?"bg-white":"bg-black"}`}>
        
        {/* Feed Container */}
        <div className={` 
                        shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
                        border border-gray-200 
                         transition duration-300 w-[55%] ml-7
                       ${theme=="light"?"bg-white":"bg-black"}`}>

          {/* Upper Box */}
          <div className="mb-4 border-b border-gray-200 py-6 bg-gray-700">

          </div>

          {/* Create Post Box */}
          <div className="mx-2">

            {/* Photo + Input */}
            <div className="flex  items-start ">
              
              {/* Image */}
              <div className="w-[83px] h-[75px] rounded-full bg-gray-700"></div>

              {/* Input */}
              <div className="flex-1 bg-gray-700 ml-4 mt-1">
                <input
                  type="text"
                  placeholder=""
                  className="w-full outline-none text-lg"
                />
              </div>

            </div>

            {/* Media + Button */}
            <div className="flex justify-between items-center mt-4">

              {/* Media Button */}
              <div className=" cursor-pointer h-10 w-10 borderd  rounded">
                
              </div>

              {/* Post Button */}
              <button className="bg-gray-400 text-white  p-3 w-24 rounded-full  transition">
               
              </button>

            </div>

          </div>

        </div>
      </div>
   </div>
    </>
  );
};

export default FeedRemmi;