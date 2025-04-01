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
       

          const deleteTweet=await Tweet.findByIdAndDelete(id);
          if(!deleteTweet){
            return res.status(401).json({message:"delete is not deleted"})
          }
         
          return res.json({message:"tweet delete successfully and Deleted tweet is :",data:deleteTweet});

      } catch (error) {
          return res.status(401).json({message:error.message});
      }
}