import { useSelector } from "react-redux";


const RightSideRemmi=()=>{
    const {theme}=useSelector(store=>store.theme);
    return (
        <>
         <div className={`w-[22%] h-screen ${theme=="light"?"bg-white":"bg-black"}`}>
          {/* rightside bar */}
          <div className="w-[18%] p-6 bg-gray-700">
            <div className="bg-gray-700 w-[18%] h-20">
              
            </div>

          </div>
          </div>
        </>
    )
}
export default RightSideRemmi ;