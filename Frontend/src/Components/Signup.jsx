import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice.js";
import {
  FiAtSign,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";

const Signup = () => {
  const theme = useSelector((store) => store.theme.theme);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [show, setshow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submittedHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("kapil->>>");
      const res = await axios.post(
        `${USER_API_END_POINT}/signUp`,
        { firstName, lastName, userName, emailId, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("sign", res);
      if (res.status === 200) {
        dispatch(getUser(res.data.newUser));
        toast.success(res.data.message);

        if (res.data.message === "User already exists") {
          navigate("/login");
        } else {
          navigate("/otpVerify");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
      console.log(error);
    }
  };

  const LoginHandler = () => {
    navigate("/login");
  };
  const showHandler = () => {
    setshow(!show);
  };

  const inputStyle =
    theme == "light"
      ? "border-slate-200 bg-white text-slate-950 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20"
      : "border-slate-700 bg-slate-950/70 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:ring-sky-400/20";

  const mutedText = theme == "light" ? "text-slate-500" : "text-slate-400";

  return (
    <div
      className={`h-screen w-full overflow-hidden px-3 py-3 sm:px-5 sm:py-4 lg:px-8 ${
        theme == "light"
          ? "bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_35%,#eef2ff_100%)] text-slate-950"
          : "bg-[radial-gradient(circle_at_top_left,#0f2d47_0,#020617_42%,#0f172a_100%)] text-white"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
        <div
          className={`grid max-h-full w-full overflow-hidden rounded-[1.5rem] border shadow-2xl lg:grid-cols-[0.95fr_1.05fr] ${
            theme == "light"
              ? "border-white/80 bg-white/75 shadow-sky-900/10"
              : "border-slate-800/80 bg-slate-950/80 shadow-black/40"
          }`}
        >
          <div
            className={`relative hidden min-h-0 flex-col justify-between p-7 xl:p-8 lg:flex ${
              theme == "light"
                ? "bg-sky-50/80"
                : "bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950"
            }`}
          >
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-500">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                BlueNest Social
              </div>
              <h1 className="max-w-md text-4xl font-black leading-tight tracking-normal xl:text-5xl">
                Apni awaaz ko ek fresh nest do.
              </h1>
              <p className={`mt-4 max-w-sm text-sm leading-6 xl:text-base ${mutedText}`}>
                Join karo, profile banao, aur apne thoughts ko clean, fast aur
                friendly space mein share karo.
              </p>
            </div>

            <div className="relative">
              <div
                className={`absolute inset-8 rounded-full blur-3xl ${
                  theme == "light" ? "bg-sky-300/40" : "bg-sky-500/20"
                }`}
              />
              <img
                className="relative mx-auto aspect-square w-full max-w-[260px] rounded-full border-8 border-white/60 object-cover shadow-2xl xl:max-w-[320px]"
                src={`${theme == "dark" ? "logo_Dark.png" : "logo.png"}`}
                alt="BlueNest logo"
              />
            </div>
          </div>

          <div className="flex min-h-0 items-center justify-center px-5 py-5 sm:px-8 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-5 flex items-center gap-4 lg:hidden">
                <img
                  className="h-14 w-14 rounded-2xl border border-sky-400/40 object-cover"
                  src={`${theme == "dark" ? "logo_Dark.png" : "logo.png"}`}
                  alt="BlueNest logo"
                />
                <div>
                  <p className="text-sm font-semibold text-sky-500">
                    BlueNest
                  </p>
                  <h1 className="text-2xl font-black">Create account</h1>
                </div>
              </div>

              <div className="mb-5 hidden lg:block">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">
                  Get started
                </p>
                <h2 className="mt-2 text-3xl font-black xl:text-4xl">Create account</h2>
                <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                  Bas kuch details, phir BlueNest ready.
                </p>
              </div>

              <form onSubmit={submittedHandler} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className={`mb-2 block text-sm font-semibold ${mutedText}`}>
                      First name
                    </span>
                    <div className="relative">
                      <FiUser className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${mutedText}`} />
                      <input
                        type="text"
                        placeholder="Kapil"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full rounded-2xl border py-2.5 pl-11 pr-4 outline-none transition focus:ring-4 ${inputStyle}`}
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className={`mb-2 block text-sm font-semibold ${mutedText}`}>
                      Last name
                    </span>
                    <div className="relative">
                      <FiUser className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${mutedText}`} />
                      <input
                        type="text"
                        placeholder="Sharma"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full rounded-2xl border py-2.5 pl-11 pr-4 outline-none transition focus:ring-4 ${inputStyle}`}
                      />
                    </div>
                  </label>
                </div>

                <label className="block">
                  <span className={`mb-2 block text-sm font-semibold ${mutedText}`}>
                    Username
                  </span>
                  <div className="relative">
                    <FiAtSign className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${mutedText}`} />
                    <input
                      type="text"
                      placeholder="kapil_01"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={`w-full rounded-2xl border py-2.5 pl-11 pr-4 outline-none transition focus:ring-4 ${inputStyle}`}
                    />
                  </div>
                </label>

                <label className="block">
                  <span className={`mb-2 block text-sm font-semibold ${mutedText}`}>
                    Email
                  </span>
                  <div className="relative">
                    <FiMail className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${mutedText}`} />
                    <input
                      type="email"
                      placeholder="kapil@example.com"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      className={`w-full rounded-2xl border py-2.5 pl-11 pr-4 outline-none transition focus:ring-4 ${inputStyle}`}
                    />
                  </div>
                </label>

                <label className="block">
                  <span className={`mb-2 block text-sm font-semibold ${mutedText}`}>
                    Password
                  </span>
                  <div
                    className={`flex items-center rounded-2xl border transition focus-within:ring-4 ${inputStyle}`}
                  >
                    <FiLock className={`ml-4 shrink-0 ${mutedText}`} />
                    <input
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full bg-transparent px-3 py-2.5 outline-none"
                    />

                    <button
                      type="button"
                      className={`mr-3 rounded-full p-2 transition hover:bg-sky-500/10 hover:text-sky-500 ${mutedText}`}
                      onClick={showHandler}
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#1D9BF0] px-5 py-3 font-bold text-white shadow-lg shadow-sky-500/25 transition hover:-translate-y-0.5 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/30"
                >
                  Create account
                </button>

                <p className={`text-center text-sm ${mutedText}`}>
                  Already have an account?
                  <button
                    type="button"
                    onClick={LoginHandler}
                    className="ml-1 font-bold text-sky-500 hover:text-sky-400"
                  >
                    Login
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
