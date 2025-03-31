import mongoose from 'mongoose';


const tweetSchema=new mongoose.Schema({
    description:{
        type:String,
    },
    likes:{
        type:Array,  //to store likes and return the length of array
       default:[]
    },
    bookmarks:{
        type:Array,   //to store of all userid who save this tweet 
       default:[]  

    },
    userId:{
        type:mongoose.Schema.ObjectId,  // userid of that person wwho create new tweet 
        ref:"User"                       // refer the model of that person
    }



},
{
    timestamps:true
}
)
const Tweet=mongoose.model("Tweet",tweetSchema);  // tweet model   