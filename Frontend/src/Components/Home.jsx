import React from 'react'
import LeftSideBar from './LeftSideBar.jsx'
import RightSideBar from './RightSideBar.jsx'
import Feed from "./Feed.jsx"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOtherUsers from '../hooks/useOtherUsers.js'


const Home = () => {
  const {user,otherUsers}=useSelector(store=>store.user);
  useOtherUsers();
  
  return (
        <>          
           
  
      <div className='flex justify-between  w-[80%] mx-auto'>
        <LeftSideBar/>
          <Outlet/>
        <RightSideBar otherUsers={otherUsers}/> {/* pass the otherUsers as props */}
       
        </div>
     
        </>
)}

export default Home