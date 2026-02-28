import { useSelector } from "react-redux";
import store from "../redux/store";

const LeftSideRemmi = () => {
  const {theme}=useSelector(store=>store.theme);
  return <>
         <div
          className={`w-[18%] h-screen flex flex-col mt-1 gap-3 ${theme == "light" ? "bg-white" : "bg-black"}`}
        >
          {/* leftside bar */}
          <div className={`w-15 p-6 rounded-full mb-4 ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>
            {/* Home */}
          </div>
          <div className={`w-35 p-6 rounded-full mt-2 ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>
            {/* Home */}
          </div>
          <div className={`w-35 p-6 rounded-full  ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>
            {/* Home */}
          </div>
          <div className={`w-35 p-6 rounded-full  ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>
            {/* Home */}
          </div>
            <div className={`w-35 p-6 rounded-full  ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}>
            {/* Home */}
          </div>
        </div>

  </>;
};
export default LeftSideRemmi;
