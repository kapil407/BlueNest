const FeedRemmi = () => {
  return (
    <>
      <div className="w-[55%] mx-auto mt-6">
        
        {/* Feed Container */}
        <div className="bg-white rounded-2xl 
                        shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
                        border border-gray-200 
                        p-4 transition duration-300 
                        hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]">

          {/* Upper Box */}
          <div className="mb-4">
          </div>

          {/* Create Post Box */}
          <div>

            {/* Photo + Input */}
            <div className="flex gap-3 items-start">
              
              {/* Image */}
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>

              {/* Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="What's happening?"
                  className="w-full outline-none text-lg"
                />
              </div>

            </div>

            {/* Media + Button */}
            <div className="flex justify-between items-center mt-4">

              {/* Media Button */}
              <div className="text-blue-500 cursor-pointer">
                 Media
              </div>

              {/* Post Button */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                Post
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default FeedRemmi;