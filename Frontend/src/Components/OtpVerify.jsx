import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function OtpVerify() {
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
        { withCredentials: true }
      );

      console.log("verify otp", res);
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
        { withCredentials: true }
      );
      console.log("resend otp", res);
      setTimer(120);
      setOtp("");
      toast.success("OTP resent successfully!");
    } catch (error) {
      console.log("error->", error);
    }
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center"
      style={{
        boxShadow: "17px 7px 112px 17px rgba(0,0,0,0.63)",
        WebkitBoxShadow: "17px 7px 112px 17px rgba(0,0,0,0.63)",
        MozBoxShadow: "17px 7px 112px 17px rgba(0,0,0,0.63)",
      }}
    >
      <h1 className="mb-4 font-bold text-lg">Verify OTP</h1>
      <div className="bg-gray-200 rounded-xl h-[40%] w-[40%] flex flex-col justify-center items-center shadow-lg hover:border hover:border-gray-400">
        <div className="border w-[90%] p-2 rounded">
          <input
            type="number"
            className="outline-none border-none w-full"
            placeholder="Enter OTP"
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
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
            onClick={EmailverifyHandler}
          >
            Verify OTP
          </div>
          <div
            className="border p-2 rounded cursor-pointer hover:bg-gray-300"
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
