import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./Theme.jsx";

function OtpVerify() {
  const theme = useSelector((store) => store.theme.theme);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const { user } = useSelector((store) => store.user);
  const email = user?.emailId;
  const navigate = useNavigate();

  // Start countdown on mount or resend
  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const EmailverifyHandler = async () => {
    if (timer <= 0) {
      toast.error("OTP expired! Please resend OTP.");
      return;
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/verifyOtp`,
        { email, otp },
        { withCredentials: true },
      );

      // console.log("verify otp", res);
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const resendOtpHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/sendOtp`,
        { email },
        { withCredentials: true },
      );
      // console.log("resend otp", res);
      setTimer(120);
      setOtp("");
      toast.success("OTP resent successfully!");
    } catch (error) {
      console.log("error->", error);
    }
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center ${theme == "light" ? " bg-gray-200" : " text-gray-600"}`}
    >
      <ThemeToggle />
      <h1 className="mb-4 font-bold text-lg">Verify OTP</h1>
      <div
        className={` rounded-xl h-[40%] w-[40%] flex flex-col justify-center items-center shadow-lg border border-gray-400 ${theme == "light" ? "text-black" : "bg-black text-gray-600"}`}
      >
        <div className="border w-[90%] p-2 rounded">
          <input
            type="number"
            placeholder="Enter OTP"
            className={`outline-none border-none w-full ${theme == "light" ? "placeholder-black" : "placeholder-gray-600"}`}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        {/* Timer Display */}
        <div className="mt-2 text-sm text-gray-600">
          {timer > 0
            ? `OTP expires in ${timer} seconds`
            : "OTP expired. Please resend."}
        </div>

        <div className="flex gap-6 mt-4">
          <div
            className={`border p-2 rounded cursor-pointer ${
              timer <= 0
                ? `" cursor-not-allowed ${theme == "light" ? "bg-gray-400" : "bg-gray-600 text-gray-400"}`
                : "hover:bg-gray-300"
            }`}
            onClick={EmailverifyHandler}
          >
            Verify OTP
          </div>
          <div
            className={`border p-2 rounded cursor-pointer  ${theme == "light" ? "hover:bg-gray-300" : "hover:bg-gray-600 text-gray-400"}`}
            onClick={resendOtpHandler}
          >
            Resend OTP
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
