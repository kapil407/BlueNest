import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { getMyProfile, getUser } from "../redux/userSlice.js";
import Spinner from "./Spinner.jsx";

const GoogleAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((store) => store.theme.theme);

  useEffect(() => {
    const completeGoogleLogin = async () => {
        console.log("before api call ",USER_API_END_POINT);
      try {
        const res = await axios.get(`${USER_API_END_POINT}/auth/me`, {
          withCredentials: true,
        });
          console.log("res in /auth/me ", res);
        dispatch(getUser(res?.data?.user));
        dispatch(getMyProfile(res?.data?.user));
        toast.success(`Welcome ${res?.data?.user?.firstName}`);
        navigate("/");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Google login failed");
        navigate("/login");
      }
    };

    completeGoogleLogin();
  }, [dispatch, navigate]);

  return (
    <div
      className={`flex h-screen w-full items-center justify-center ${
        theme == "light" ? "bg-slate-50 text-slate-950" : "bg-slate-950 text-white"
      }`}
    >
      <Spinner />
    </div>
  );
};

export default GoogleAuthSuccess;
