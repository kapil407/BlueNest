import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./Theme.jsx";
import { FiCheckCircle, FiClock, FiMail, FiRefreshCw, FiShield } from "react-icons/fi";

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
      className={`min-h-screen w-full overflow-hidden px-4 py-5 sm:px-6 ${
        theme == "light"
          ? "bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_38%,#eef2ff_100%)] text-slate-950"
          : "bg-[radial-gradient(circle_at_top_left,#0f2d47_0,#020617_44%,#0f172a_100%)] text-slate-100"
      }`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl flex-col">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        <div className="grid flex-1 items-center gap-8 py-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden lg:block">
            <div className="max-w-md">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/30">
                <FiShield size={28} />
              </div>
              <h1 className="text-5xl font-black leading-tight tracking-normal">
                Secure your BlueNest account
              </h1>
              <p
                className={`mt-5 text-base leading-7 ${
                  theme == "light" ? "text-slate-600" : "text-slate-400"
                }`}
              >
                Enter the one-time code sent to your email and finish setting up
                your account.
              </p>
            </div>
          </div>

          <div
            className={`mx-auto w-full max-w-md rounded-[1.5rem] border p-5 shadow-2xl sm:p-7 ${
              theme == "light"
                ? "border-white/80 bg-white/80 shadow-sky-900/10"
                : "border-slate-800/80 bg-slate-950/85 shadow-black/45"
            }`}
          >
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/30">
                <FiMail size={30} />
              </div>
              <h1 className="text-3xl font-black tracking-normal">Verify OTP</h1>
              <p
                className={`mt-2 text-sm leading-6 ${
                  theme == "light" ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {email ? `Code sent to ${email}` : "Enter the code sent to your email"}
              </p>
            </div>

            <label className="block">
              <span
                className={`mb-2 block text-sm font-semibold ${
                  theme == "light" ? "text-slate-600" : "text-slate-300"
                }`}
              >
                One-time password
              </span>
              <input
                type="number"
                placeholder="Enter OTP"
                className={`h-14 w-full rounded-2xl border px-5 text-center text-2xl font-black tracking-[0.35em] outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 ${
                  theme == "light"
                    ? "border-slate-200 bg-white text-slate-950 placeholder:text-slate-300"
                    : "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-600"
                }`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </label>

            {/* Timer Display */}
            <div
              className={`mt-4 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
                timer > 0
                  ? theme == "light"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-emerald-500/10 text-emerald-300"
                  : theme == "light"
                    ? "bg-red-50 text-red-700"
                    : "bg-red-500/10 text-red-300"
              }`}
            >
              <FiClock />
              {timer > 0
                ? `OTP expires in ${timer} seconds`
                : "OTP expired. Please resend."}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-4 font-bold transition ${
                  timer <= 0
                    ? theme == "light"
                      ? "cursor-not-allowed bg-slate-200 text-slate-400"
                      : "cursor-not-allowed bg-slate-800 text-slate-500"
                    : "bg-[#1D9BF0] text-white shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 hover:bg-sky-500"
                }`}
                onClick={EmailverifyHandler}
              >
                <FiCheckCircle />
                Verify OTP
              </button>
              <button
                type="button"
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl border px-4 font-bold transition hover:-translate-y-0.5 ${
                  theme == "light"
                    ? "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-600"
                    : "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-500 hover:text-sky-300"
                }`}
                onClick={resendOtpHandler}
              >
                <FiRefreshCw />
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
