import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import LoginSignUp from "./SignUpLogin.jsx";

import EditeProfile from "./Editeprofile.jsx";
import { Message } from "./Message.jsx";
import { ChatRoom } from "./ChatRoom.jsx";

import { Bookmarks } from "./Bookmarks.jsx";

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
        //    {
        //     path:"/Logout",
        //     element:<Logout/>
        //    },
        {
          path: "/EditeProfile",
          element: <EditeProfile />,
        },
        // {
        //   path: "/Message",
        //   element: <Message />,
        // },
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
      path: "/LoginSignup",
      element: <LoginSignUp />,
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
