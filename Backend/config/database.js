import mongoose from "mongoose";

export const connectDB= async ()=>{
       await mongoose.connect("mongodb+srv://kapilkeer1998:smtbKlczVkp3rIxM@kapildb.pc7gf.mongodb.net/twitter");
}