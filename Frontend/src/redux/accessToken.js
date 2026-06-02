import { createSlice } from "@reduxjs/toolkit";

const AccessTokenSlice=createSlice({
    name:'accessToken',
        initialState:{
            accessToken:null
        },
        reducers:{
            setAccessToken:(state,action)=>{
                state.accessToken=action.payload;
            }
        }
})
export const {setAccessToken}=AccessTokenSlice.action;
export default AccessTokenSlice.reducer;