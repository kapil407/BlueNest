import { useSelector } from "react-redux";

const RightSideRemmi = () => {
  const { theme } = useSelector((store) => store.theme);
  return (
    <>
      <div
        className={`w-[18%] flex flex-col  h-screen ${theme == "light" ? "bg-white" : "bg-black"}`}
      >
        {/* rightside bar */}
        <div className={` p-6  p-3 mb-2${theme=="light"?"bg-gray-400":"bg-gray-700"}`}></div>
        <div className={`  h-20 mt-2 ${theme=="light"?"bg-gray-400":"bg-gray-700"}`}></div>
      </div>
    </>
  );
};
export default RightSideRemmi;
