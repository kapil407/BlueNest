import { createSlice } from "@reduxjs/toolkit";
import { BiRefresh } from "react-icons/bi";

 const tweetSlice=createSlice({
        name:"tweet",
        name:"refresh",
        initialState:{
            tweet:null,
            refresh:false
        },
        reducers:{
            getMyTweets:(state,action)=>{
                state.tweet=action.payload;
            },
            getRefresh:(state=>{
                state.refresh=!state.refresh;
            })
        }

 })
export  const {getMyTweets,getRefresh} =tweetSlice.actions;
 export default tweetSlice.reducer;