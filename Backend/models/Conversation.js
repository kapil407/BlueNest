import mongoose from "mongoose"
const ConversationSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    messageId:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Message"
    }]

},
{
    timestamps:true
})
export const Conversation=mongoose.model("Conversation",ConversationSchema);