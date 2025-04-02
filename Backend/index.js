import express from 'express';
const PORT=4660;
import {connectDB} from './config/Database.js'
import {signUpRouter,loginRouter,logOutRouter,TweetRouter,DeleteRouter,likeOrDisLikeRouter,editProfileRouter,bookmarksRouter,getProfileRouter,getOthersProfileRouter} from './routes/auth.js'
import cookieParser from 'cookie-parser'


const app=express();


// middleware 
app.use(express.json()); // extract the json data from req and convert into the js object and add to the req.body
app.use(cookieParser())  // extract the cookie from the request and add it to the req.body 





app.use('/',signUpRouter);
app.use('/',loginRouter);
app.use('/',logOutRouter);
app.use('/',TweetRouter);
app.use('/',DeleteRouter);
app.use('/',likeOrDisLikeRouter);
app.use('/',editProfileRouter);
app.use('/',bookmarksRouter);
app.use('/',getProfileRouter);
app.use('/',getOthersProfileRouter);


connectDB().then(()=>{
        console.log("database is connectes sucessfully");
        app.listen(PORT,()=>{
              
                console.log("sever is listening at port " +PORT );
        });
}).catch((err)=>{
        console.error("error"+err.message);
})