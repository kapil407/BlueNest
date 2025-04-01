import Tweet from '../models/Tweets.js'

export const createTweetController=async (req,res)=>{

   try {
     const {description}=req.body;
     const userId=req.userId;
     const user=req.user;
 
    // console.log("_id->"+userId);

     if(!description.length){
         return res.status(400).json({message:"write down tweet"});
     }
     const newTweet=new Tweet({
         description,
         userId:userId
 
     });
 
     const data=await newTweet.save();
     
     return res.json({message:`${user.firstName} your Tweet successfully created`,data});
 
   } catch (error) {
        return res.status(401).json({message:error.message});
   }

}

export const deleteTweetController=async (req,res)=>{
      try {

        const {id}=req.params;
        if(!id){
          return res.status(400).json({message:"tweet id id requird to delete tweet"});
        }
       
             // deleteTweet
          const deleteTweet=await Tweet.findByIdAndDelete(id);

          //if  return null 
          if(!deleteTweet){
            return res.status(401).json({message:"delete is not deleted"})
          }
         
          return res.json({message:"tweet delete successfully and Deleted tweet is :",data:deleteTweet});

      } catch (error) {
          return res.status(401).json({message:error.message});
      }
}


export const likeOrDisLikeController=async (req,res)=>{
        try {
              const {id}=req.params;
              const tweet=await Tweet.findById(id);   // fetch the tweet from Tweet model 
              if(!tweet){
                  return res.json({message:"tweet is not found"});
              }

                const likes=tweet.likes;  // extract the likes array from tweet
             
              // console.log(likes)
              const userId=req.userId;
              const user=req.user;
              if(likes.includes(userId)){

               await Tweet.findByIdAndUpdate(id,{$pull:{likes:userId}});

                const updatedLike=await Tweet.findById(id);  // fetch updated array of likes and  it return an array

                return res.json({message:`${user.firstName} dislike your tweet and total likes are  and ${updatedLike.likes.length}`});
              }
              else{
                await Tweet.findByIdAndUpdate(id,{$push:{likes:userId}});
                const updatedLike=await Tweet.findById(id);   // fetch updated array of likes and  it return an array
                
                return res.json({message:`${user.firstName} like your tweet  and total likes are ${updatedLike.likes.length}`});
              }

        } catch (error) {
            return res.status(400).json({message:error.message});
        }
                }