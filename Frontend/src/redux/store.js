import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.js'

const store=configureStore({   // main bhandar 
    reducer:{
            // Actions
            user:userSlice   // action + reducer + payload
    }

});
export default store;