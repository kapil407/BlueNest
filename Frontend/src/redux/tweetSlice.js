import { createSlice } from "@reduxjs/toolkit";
import { BiRefresh } from "react-icons/bi";

 const tweetSlice=createSlice({
        name:"tweet",
      
        initialState:{
            tweet:null,
            refresh:false,
            isActive:true
        },
        reducers:{
            getMyTweets:(state,action)=>{
                state.tweet=action.payload;
            },
            getRefresh:(state=>{
                state.refresh=!state.refresh;
            }),
            getIsActive:(state,action)=>{
                state.isActive=action.payload;
            }

        }

 })
export  const {getMyTweets,getRefresh,getIsActive} =tweetSlice.actions;
 export default tweetSlice.reducer;