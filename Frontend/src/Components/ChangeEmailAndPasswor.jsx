import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Typewriter from "./TypeWriter.jsx";
import store from "../redux/store.js";

const ChangeEmailAndPasswordComponent = () => {
  const theme = useSelector((store) => store.theme.theme);

  const islight = theme == "light";
  const navigate = useNavigate();
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");

  const [seen, setSeen] = useState("password");
  const seenHandler = () => {
    if (seen === "password") {
      setSeen("text");
    } else {
      setSeen("password");
    }
  };

  const changeEmailHandler = async () => {
    try {
      const res = await axios.patch(
        `${USER_API_END_POINT}/changeEmailAndPassword`,
        { newEmail, newPassword },
        { withCredentials: true },
      );
      console.log("changeEmailAndPassword", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      //   toast.error(res?.data?.message);
    }
  };

  // console.log("theme",settingImage.webp);
  return (
    <div
      className={`fixed h-full z-50 inset-0  backdrop-blur-sm w-full flex flex-col text-white  items-center justify-center
        ${islight ? "  lg:text-lg text-xl" : " text-white "}
        `}
    >
      <h1
        className="text-xl mb-2 lg:mb-[3%] font-bold bg-cover bg-center bg-clip-text text-transparent"
        style={{
          backgroundImage: `url(/textImage3.avif)`,
        }}
      >
        <Typewriter
          word="Manage your email, password"
          speedText={200}
          speedDelete={100}
          className="text-2xl lg:text-5xl"
        />
      </h1>
      <div
        className={`flex h-full w-full flex-col  lg:w-[50%] lg:h-[70%]  lg:rounded-xl object-cover   lg:border border-slate-700   text-xl font-black
              `}
        style={{
          backgroundImage: `url(/Image.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-3 py-2 lg:w-full border-b   px-2 lg:h-[20%]  border-slate-700   text-2xl font-black ">
          <Link to={`/setting`}>
            <FaLongArrowAltLeft size={20} className="cursor-pointer " />
          </Link>
          <h1>Settings</h1>
        </div>
        <div className="m-4 flex flex-col gap-4 items-center  justify-center h-[50%]">
          {/* <h1>Setting Component</h1> */}
          <input
            type="email"
            placeholder="Enter your new email"
            className="p-2 border border-white/50 lg:text-2xl bg-transparent backdrop-blur-xs rounded-xl w-85 lg:w-[50%] text-white outline-none "
          />

          <div className="flex items-center rounded-xl  gap-2 border border-white/50 lg:w-[50%] px-1 justify-between">
            <input
              type={`${seen}`}
              placeholder="Enter your new password"
              className="p-2  lg:text-2xl  bg-transparent backdrop-blur-xs text-white outline-none "
            />
            <span
              onClick={seenHandler}
              className="cursor-pointer text-white font-bold text-2xl text-black  text-right "
            >
              {seen === "password" ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-800 w-75 lg:w-[50%] cursor-pointer"
            onClick={changeEmailHandler}
          >
            Update Settings
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangeEmailAndPasswordComponent;
