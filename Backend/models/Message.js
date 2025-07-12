import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({

    senderId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"       
    },
    recieverId:{
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