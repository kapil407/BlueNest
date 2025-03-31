import express from 'express';
const PORT=4660;
import {connectDB} from './config/Database.js'
import signUpRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'

const app=express();


// middleware 
app.use(express.json()); // extract the json data from req and convert into the js object and add to the req.body
app.use(cookieParser())  // extract the cookie from the request and add it to the req.body 





app.use('/',signUpRouter);


connectDB().then(()=>{
        console.log("database is connectes sucessfully");
        app.listen(PORT,()=>{
              
                console.log("sever is listening at port " +PORT );
        });
}).catch((err)=>{
        console.error("error"+err.message);
})