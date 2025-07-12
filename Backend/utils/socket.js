import {Server} from "socket.io"

export const initializSocket=(httpServer)=>{
    const io=new Server(httpServer,{
           cors: {
            origin:"http://localhost:5173"
           }
    })
    
    io.on("connection",(socket)=>{
            // Eveent Handler
        socket.on("joinChat",({firstName,userId,targetUserId})=>{
                // create room fopr user and targetUser
              if(targetUserId){
                const room=[userId,targetUserId].sort().join("_");
                console.log(firstName,"room-> ",room);
                socket.join(room); 
              }
        })
        socket.on("sendMessage",({firstName,userId,targetUserId,text})=>{
                const roomId=[userId,targetUserId].sort().join("_");
                console.log( userId,"text-> ",text);
                io.to(roomId).emit("recievedMessage",{firstName,text,targetUserId});
        })
        socket.on("disconnect",()=>{

        })
    })
}