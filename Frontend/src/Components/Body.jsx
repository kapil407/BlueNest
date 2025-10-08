import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Signup from "./Signup.jsx";

import EditeProfile from "./Editeprofile.jsx";
import { Message } from "./Message.jsx";
import { ChatRoom } from "./ChatRoom.jsx";

import { Bookmarks } from "./Bookmarks.jsx";
import Login from "./Login.jsx";
import OtpVerify from "./OtpVerify.jsx";
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed/>,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
       
        {
          path: "/EditeProfile",
          element: <EditeProfile />,
        },
      
        {
          path: "/Message/:targetUserId",
          element: <Message />,
        },
        {
          path: "/bookmarks/:id",
          element: <Bookmarks/>,
        },
      ],
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/otpVerify",
      element:<OtpVerify/>
    }
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
