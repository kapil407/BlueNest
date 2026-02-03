import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Home = lazy(() => import("./Home.jsx"));
const Feed = lazy(() => import("./Feed.jsx"));
const Profile = lazy(() => import("./Profile.jsx"));
const Signup = lazy(() => import("./Signup.jsx"));
const EditeProfile = lazy(() => import("./EditeProfile.jsx"));
const Message = lazy(() => import("./Message.jsx"));
// const { ChatRoom } = lazy(() => import("./ChatRoom.jsx"));
const Bookmarks = lazy(() => import("./Bookmarks.jsx"));
const Login = lazy(() => import("./Login.jsx"));
const OtpVerify = lazy(() => import("./OtpVerify.jsx"));

// import Home from "./Home";
// import Feed from "./Feed";
// import Profile from "./Profile";
// import Signup from "./Signup.jsx";

// import EditeProfile from "./Editeprofile.jsx";
// import { Message } from "./Message.jsx";
// import { ChatRoom } from "./ChatRoom.jsx";

// import { Bookmarks } from "./Bookmarks.jsx";
// import Login from "./Login.jsx";
// import OtpVerify from "./OtpVerify.jsx";
// import ClipLoader from "react-spinners/ClipLoader.js";
import Spinner from "./Spinner.jsx";
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",

      element: (
        <Suspense fallback={<Spinner />}>
          <Home />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Spinner />}>
              <Feed />
            </Suspense>
          ),
        },
        {
          path: "/profile/:id",
          element: (
            <Suspense fallback={<Spinner />}>
              <Profile />,
            </Suspense>
          ),
        },

        {
          path: "/EditeProfile",
          element: (
            <Suspense fallback={<Spinner />}>
              <EditeProfile />,
            </Suspense>
          ),
        },

        {
          path: "/Message/:targetUserId",
          element: (
            <Suspense fallback={<Spinner />}>
              <Message />,
            </Suspense>
          ),
        },
        {
          path: "/bookmarks/:id",
          element: (
            <Suspense fallback={<Spinner />}>
              <Bookmarks />,
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/Signup",
      element: (
        <Suspense fallback={<Spinner />}>
          <Signup />,
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Spinner />}>
          <Login />,
        </Suspense>
      ),
    },
    {
      path: "/otpVerify",
      element: (
        <Suspense fallback={<Spinner />}>
          <OtpVerify />,
        </Suspense>
      ),
    },
  ]);
  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
};
export default Body;
