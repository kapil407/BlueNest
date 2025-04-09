import { useEffect } from 'react'
import {TWEET_API_END_POINT} from '../Utils/constant.js'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {getMyTweets } from '../redux/tweetSlice.js'



const useGetTweets=()=>{
    const {refresh}=useSelector(store=>store?.tweet);
   
        const dispatch=useDispatch();
    useEffect(()=>{
     

        const fetchTweets= async ()=>{
           try {
            // console.log("usegettweets")
             const res=await axios.get(`${TWEET_API_END_POINT}/allTweets`,
                 {
                     withCredentials:true
                 }
             )
            //  console.log("getTweets->",res);
             dispatch(getMyTweets(res?.data?.alltweet));
           
         }
 
           catch (error) {
                console.error(error);
           }
        }
        fetchTweets();

    },[refresh])
}
export default useGetTweets;