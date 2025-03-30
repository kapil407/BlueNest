import mongoose from 'mongoose';


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
    password:{
        type:Number,
        required:true,
        minLength:[9,"Passwors must be greater then 8 "],
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
const newUser=mongoose.model("User",userSchema);  // User id model   