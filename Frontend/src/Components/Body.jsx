import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import FeedRemmi from "../RimmiEffect_UI/Temp.jsx";

const Home = lazy(() => import("./Home.jsx"));
const Feed = lazy(() => import("./Feed.jsx"));
const Profile = lazy(() => import("./Profile.jsx"));
const Signup = lazy(() => import("./Signup.jsx"));
const Login = lazy(() => import("./Login.jsx"));
const OtpVerify = lazy(() => import("./OtpVerify.jsx"));
const EditeProfile = lazy(() => import("./Editeprofile.jsx"));
const Message = lazy(() => import("./Message.jsx"));
const Bookmarks = lazy(() => import("./Bookmarks.jsx"));
const ChangeEmailAndPassword = lazy(() => import("./ChangeEmailAndPasswor.jsx"));
const NotificationComponent = lazy(() => import("./Notification.jsx"));
const SettingComponent = lazy(() => import("./Setting.jsx"));
const DeleteAccountComponent =lazy(()=>import('./DeleteAccount.jsx'));
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGenerateAccessToken from "../GenerateAccessToken/useTokenRotation.js";
import ChatBotComponent from "./Chatbot.jsx";


const Body = () => {

  const navigate=useNavigate();
  const location = useLocation();
  const generateNewAccessToken = useGenerateAccessToken();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
  const publicPaths = ["/login", "/signup", "/otpverify"];
  const currentPath = location.pathname.toLowerCase();

  if (publicPaths.includes(currentPath)) {
    return;
  }

  const refreshAccessToken = async () => {
    const status = await generateNewAccessToken();

    if (status === 401) {
      navigate("/login");
    }
  };

  refreshAccessToken();

  const intervalId = setInterval(() => {
    generateNewAccessToken();
  }, 14 * 60 * 1000);

  return () => clearInterval(intervalId);
}, []);

  return (
   
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<FeedRemmi />}>
                <Home />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<FeedRemmi />}>
                  <Feed />
                </Suspense>
              }
            />

            <Route path="profile/:id" element={<Profile />} />
            <Route path="/profile/EditeProfile" element={<EditeProfile />} />
            <Route path="Message/:targetUserId" element={<Message />} />
            <Route path="bookmarks/:id" element={<Bookmarks />} />
            <Route path="settings/:id" element={<ChangeEmailAndPassword />} />
            <Route path="notifications/:id" element={<NotificationComponent />} />
            <Route path="/setting" element={<SettingComponent />} />
            <Route path="/setting/deleteAccount" element={<DeleteAccountComponent/>} />
            <Route path="Chat-Bot" element={<ChatBotComponent/>}/>
          </Route> 
            {/* {end of Home Route in which all sub-routes are defined like Feed,profile,editeProfile,Message,Bookmarks } */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpVerify" element={<OtpVerify />} />
        </Routes>
      </Suspense>

  );
};

export default Body;
