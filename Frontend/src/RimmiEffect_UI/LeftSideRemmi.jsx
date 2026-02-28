import { useSelector } from "react-redux";
import store from "../redux/store";

const LeftSideRemmi = () => {
  const {theme}=useSelector(store=>store.theme);
  return <>
         <div
          className={`w-[18%] h-screen flex  gap-3 ${theme == "light" ? "bg-white" : "bg-black"}`}
        >
          {/* leftside bar */}
          <div className="w-35 p-6 rounded-full bg-gray-700">
            {/* Home */}
          </div>
          <div className="w-35 p-6 bg-gray-700">
            {/* Home */}
          </div>
          <div className="w-35 p-6 bg-gray-700">
            {/* Home */}
          </div>
          <div className="w-35 p-6 bg-gray-700">
            {/* Home */}
          </div>
        </div>

  </>;
};
export default LeftSideRemmi;
