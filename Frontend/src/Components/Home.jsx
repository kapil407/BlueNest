import React ,{useEffect} from 'react'
import LeftSideBar from './LeftSideBar.jsx'
import RightSideBar from './RightSideBar.jsx'
// import Feed from "./Feed.jsx"
import { Outlet ,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOtherUsers from '../hooks/useOtherUsers.js'
import useGetTweets from '../hooks/useGetTweets.js'


const Home = () => {
  const navigate=useNavigate();
  const {user,otherUsers}=useSelector(store=>store.user);
  useOtherUsers();
  useGetTweets();
  useEffect(()=>{
    if(!user){
      navigate('/LoginSignup');
    }
  })
  
  return (
        <>          
           
  
      <div className='flex justify-between  w-[80%] mx-auto relative scrollbar-webkit'>
        <LeftSideBar/>
          <Outlet/>
        <RightSideBar  otherUsers={otherUsers}/> {/* pass the otherUsers as props */}
       
        </div>
     
        </>
)}

export default Home