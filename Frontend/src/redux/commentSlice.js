import { createSlice } from "@reduxjs/toolkit";

const commentSlice=createSlice({
    name:"comment" ,
    initialState: {
         comment:null
    },
   
        reducers:{
            setComment:(state,action)=>{
                state.comment=action.payload;
            }
        }

})
export  const {setComment} =commentSlice.actions;
 export default commentSlice.reducer;

