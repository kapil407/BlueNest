import React from 'react'
import CreatePost from './CreatePost';
import Tweets from './Tweets';
 const Feed=()=>{

  return (
    <>
   <div className='w-[50%] flex  mt-1 border border-gray-300 flex-col'>
    <CreatePost/>
    <Tweets/>
    <Tweets/>
   

   </div>

    </>
   
)}

export default Feed;
