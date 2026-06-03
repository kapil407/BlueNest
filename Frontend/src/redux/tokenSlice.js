import {createSlice} from '@reduxjs/toolkit';

const tokenSlice = createSlice({    
    name: 'token',
    initialState: {
        accessToken: null,  
    },
    reducers: {
        setAccessToken: (state, action) => {    
            state.accessToken = action.payload;
        },
         clearToken: (state) => {
            state.accessToken = null;
            state.user        = null;
        }

    },
}); 
    export const { setAccessToken ,clearToken} = tokenSlice.actions;
    export default tokenSlice.reducer;