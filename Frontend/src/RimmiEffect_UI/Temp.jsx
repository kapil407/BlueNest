import { useSelector } from "react-redux";

const FeedRemmi = () => {
  const {theme}=useSelector(store=>store.theme);
    return (
    <>
      <div className={`h-screen w-screen ${theme=="light"?"bg-white":"bg-black"}`}>
        
        {/* Feed Container */}
        <div className={` 
                        shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
                        border border-gray-200 
                         transition duration-300 w-[55%] mx-auto
                       ${theme=="light"?"bg-white":"bg-black"}`}>

          {/* Upper Box */}
          <div className="mb-4 border-b border-gray-200 py-6 bg-gray-400">

          </div>

          {/* Create Post Box */}
          <div className="mx-2">

            {/* Photo + Input */}
            <div className="flex  items-start ">
              
              {/* Image */}
              <div className="w-[83px] h-[75px] rounded-full bg-gray-300"></div>

              {/* Input */}
              <div className="flex-1 bg-gray-400 ml-4 mt-1">
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
              <div className="text-blue-500 cursor-pointer">
                
              </div>

              {/* Post Button */}
              <button className="bg-gray-400 text-white px-4 py-2 rounded-full  transition">
               
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default FeedRemmi;