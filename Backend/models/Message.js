import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({

    senderId:{
       type:mongoose.Schema.Types.ObjectId, // single object reference that ref to the User model
        required:true,
        ref:"User"       
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);
export const Message=mongoose.model("Message",MessageSchema);