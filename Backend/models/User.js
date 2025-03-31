import mongoose from 'mongoose';
import validator from 'validator'


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
        minLength:[6,"Passwors must be greater then 5 "],
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter the strong password");
                
            }
        }
    },
    following:{
        type:Array, // store the all ids of those people , i follow
        default:[]
    },
    followers:{
        type:Array,  // store the all ids of those users who follow me 
        default:[]
    }



},
{
    timestamps:true
}
)
 const User=mongoose.model("User",userSchema);  // User id model   
 export default User;