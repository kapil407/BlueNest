import { USER_API_END_POINT } from "./constant";
import io from 'socket.io-client'

export const createSocketConnection=()=>{
    return io(USER_API_END_POINT);
} 