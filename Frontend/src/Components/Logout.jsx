import { useState } from 'react';
import Login from './Login'
const Logout=()=>{
        const [isLogout , setisLogout]=useState(false);
    return(
        <>
        <Login props={isLogout}/>
        </>
    )
}
export default Logout;