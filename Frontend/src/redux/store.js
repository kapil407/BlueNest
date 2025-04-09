import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
import tweetSlice from './tweetSlice.js'
const store=configureStore({   // main bhandar 
    reducer:{
            // Slice
           user:userSlice,   // action + reducer + payload
           tweet:tweetSlice
    }

});
export default store