import mongoose from 'mongoose';
import { type } from 'os';
import { DefaultSerializer } from 'v8';
import validator from 'validator';
import { deflate } from 'zlib';


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[4,"firstName should be greater than 4"]

    },
    lastName:{
        type:String,
        required:true,
        minLength:[4,"firstName should be greater than 4"]
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter valid emailId");
                
            }
        }

    },
    userName:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
       
    },
    following:{
        type:Array, // store the all ids of those people , i follow
        default:[]
    },
    followers:{
        type:Array,  // store the all ids of those users who follow me 
        default:[]
    },
    bookmarks:{
        type:Array,   //to store of all userid who save this tweet 
       default:[]  

    },
    bio:{
        type:String,
        default:"Hey there! I'm new here"
    },
    profilePic:{
        type:String,
        default :""
    },
    backGroundImage:{
        type:String,
        default:""
    },
    otpVerified:{
        type:String,
       Default:false
    },
    expiryOtp:{
     type:Date
    },
    verificationCode:String
},
{
    timestamps:true
}
)
 const User=mongoose.model("User",userSchema);  // User id model   
 export default User;