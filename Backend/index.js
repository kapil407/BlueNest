import express from 'express';
const PORT=4000;
import {connectDB} from './config/database.js'
const app=express();
app.get('/',(req,res)=>{
        res.send("hello");
})

connectDB().then(()=>{
        console.log("database is connectes sucessfully");
        app.listen(PORT,()=>{
              
                console.log("sever is listening at port " +PORT );
        });
}).catch((err)=>{
        console.error("error"+err.message);
})