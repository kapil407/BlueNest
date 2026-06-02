// import React, { Suspense } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./Home.jsx";
// import Feed from "./Feed.jsx";
// import Profile from "./Profile.jsx";
// import Signup from "./Signup.jsx";
// import EditeProfile from "./Editeprofile.jsx";
// import Message from "./Message.jsx";
// // const { ChatRoom } = lazy(() => import("./ChatRoom.jsx"));
// import Bookmarks from "./Bookmarks.jsx";
// import Login from "./Login.jsx";
// import OtpVerify from "./OtpVerify.jsx";
// // import FeedRemmi from '../RimmiEffect_UI/FeedRimmi.jsx';
// import FeedRemmi from "../RimmiEffect_UI/Temp.jsx";

// // import Home from "./Home";
// // import Feed from "./Feed";
// // import Profile from "./Profile";
// // import Signup from "./Signup.jsx";

// // import EditeProfile from "./Editeprofile.jsx";
// // import  Message  from "./Message.jsx";
// // import  ChatRoom  from "./ChatRoom.jsx";

// // import Bookmarks  from "./Bookmarks.jsx";
// // import Login from "./Login.jsx";
// // import OtpVerify from "./OtpVerify.jsx";
// // import ClipLoader from "react-spinners/ClipLoader.js";
// import Spinner from "./Spinner.jsx";
// const Body = () => {
//   const appRouter = createBrowserRouter([
//     {
//       path: "/",

//       element: (
//         <Suspense fallback={<FeedRemmi />}>
//           <Home />
//         </Suspense>
//       ),
//       children: [
//         {
//           path: "/",
//           element: (
//             <Suspense fallback={<FeedRemmi />}>
//               <Feed />
//             </Suspense>
//           ),
//         },
//         {
//           path: "/profile/:id",
//           element: (
//             <Suspense fallback={<Spinner />}>
//               <Profile />,
//             </Suspense>
//           ),
//         },

//         {
//           path: "/EditeProfile",
//           element: (
//             <Suspense fallback={<Spinner />}>
//               <EditeProfile />,
//             </Suspense>
//           ),
//         },

//         {
//           path: "/Message/:targetUserId",
//           element: (
//             <Suspense fallback={<Spinner />}>
//               <Message />,
//             </Suspense>
//           ),
//         },
//         {
//           path: "/bookmarks/:id",
//           element: (
//             <Suspense fallback={<Spinner />}>
//               <Bookmarks />,
//             </Suspense>
//           ),
//         },
//       ],
//     },
//     {
//       path: "/Signup",
//       element: (
//         <Suspense fallback={<Spinner />}>
//           <Signup />,
//         </Suspense>
//       ),
//     },
//     {
//       path: "/login",
//       element: (
//         <Suspense fallback={<Spinner />}>
//           <Login />,
//         </Suspense>
//       ),
//     },
//     {
//       path: "/otpVerify",
//       element: (
//         <Suspense fallback={<Spinner />}>
//           <OtpVerify />,
//         </Suspense>
//       ),
//     },
//   ]);
//   return (
//     <>
//       <div>
//         <RouterProvider router={appRouter} />
//       </div>
//     </>
//   );
// };
// export default Body;
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGenerateNewAccessToken from "../GenerateAccessToken/TokenRotation.js";
const Body = () => {
  const generateNewAccessToken = useGenerateNewAccessToken();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (!user) {
      return;
    }
    const IntervalId = setInterval(() => {
        generateNewAccessToken();
      },14 * 60 * 1000,); // 14 minutes in milliseconds
       return () => clearInterval(IntervalId);
  }, [user, generateNewAccessToken]);

  return (
    <BrowserRouter>
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
            <Route path="EditeProfile" element={<EditeProfile />} />
            <Route path="Message/:targetUserId" element={<Message />} />
            <Route path="bookmarks/:id" element={<Bookmarks />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpVerify" element={<OtpVerify />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Body;
