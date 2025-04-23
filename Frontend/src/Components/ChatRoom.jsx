import { useParams } from "react-router-dom"

export const ChatRoom=()=>{
    const {targetUserId}=useParams();
    console.log("first",targetUserId);
    return(
        <>
            <h1>kapilkumar</h1>
        </>
    )
}