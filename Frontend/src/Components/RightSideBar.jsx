import React from 'react'
import { IoSearch } from "react-icons/io5";
import Avatar from 'react-avatar';

function RightSideBar() {
  return (
   
    <>
      <div className='w-[25%] mt-2'>
         <div>
         <div className='bg-gray-100 flex p-3 rounded-full '>
            <IoSearch size={25}/>
            <input type="text" placeholder='Search' className='ml-2 outline-none' />
          </div>
          <div className='bg-gray-100 my-4 rounded-2xl p-2'>
          <h1 className='font-bold text-lg '>Who to follow</h1>
          
        <div className='flex justify-between'>
        <div className='flex'>
         <Avatar className="m-1 cursor-pointer" src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" size="50" round={true} />
          <div className='ml-2 my-2'>
            <h1 className='font-bold'>Kapil</h1>
            <p>@kapil_keer</p>
          </div>
         </div>
        <div className='my-2 '>
        <button className='px-4 py-1 bg-black text-white rounded-full cursor-pointer'>Profile</button>
        </div>
        </div>
        
          </div>
         </div>
      </div>
      
    </>
  )
}

export default RightSideBar