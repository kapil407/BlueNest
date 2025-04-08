import React from 'react'
import {createBrowserRouter,RouterProvider } from 'react-router-dom' 
import Home from './Home'
import Feed from './Feed'
import Profile from './Profile'
import LoginSignUp from './SignUpLogin.jsx'
import Logout from './Logout'

const Body=()=>{
    const appRouter=createBrowserRouter([
                {

                    path:"/",
                    element:<Home/>,
                    children:[
                       {
                        path:"/",
                        element:<Feed/>
                       },
                       {
                        path:"/profile/:id",
                        element:<Profile/>
                       },
                       {
                        path:"/Logout",
                        element:<Logout/>
                       }
                    ]

                },
                {
                    path:'/LoginSignup',
                    element:<LoginSignUp/>
                }
    ])
    return (

        <>
            <div>
            <RouterProvider  router={appRouter}/>
            </div>
        </>
    )
}
export default Body;