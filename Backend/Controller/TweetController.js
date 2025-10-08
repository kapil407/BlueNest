import Tweet from "../models/Tweets.js";
import User from "../models/User.js";


import uploadCloudinary from "../Middleware/Cloudinary.js";

export const createTweetController = async (req, res) => {
  try {
    const { description } = req.body;

    const userId = req.userId;

    const user = await User.findOne({ _id: userId });

    let imageUrl = null;

    if (req.file) {
      // console.log("image in backend", req.file);

      imageUrl = await uploadCloudinary(req.file.path);
    }

    const tweet = await Tweet.create({
      description,
      image: imageUrl,
      userId,
      userDetails: user,
    });

    res
      .status(201)
      .json({ message: "Post created successfully", success: true, tweet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error kapil" });
  }
};

export const deleteTweetController = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id);
    const TweetuserId = tweet.userId;
    // console.log("TweetUserId-> ",TweetuserId)
    const loggedInUserId = req.userId;

    // console.log("loggedInUserId",loggedInUserId);
    if (!id) {
      return res
        .status(400)
        .json({ message: "tweet id requird to delete tweet" });
    }

    if (loggedInUserId == TweetuserId) {
      // deleteTweet
      const deleteTweet = await Tweet.findByIdAndDelete(id);

      //if  return null
      if (!deleteTweet) {
        return res.status(401).json({ message: "tweet is not deleted" });
      }

      return res.json({
        message: "tweet delete successfully :",
        data: deleteTweet,
        success: true,
      });
    } else {
      return res.json({
        message: "You are not autherized to delete this tweet",
        success: false,
      });
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const likeOrDisLikeController = async (req, res) => {
  try {
    const userId = req.userId;

    const Tweetid = req.params.id;

    const tweet = await Tweet.findById(Tweetid); // fetch the tweet from Tweet model
    if (!tweet) {
      return res.json({ message: "tweet is not found" });
    }

    const likes = tweet.likes; // extract the likes array from tweet

    const user = req.user;

    let updatedTweets;
    if (tweet.likes.includes(userId)) {
      updatedTweets = await Tweet.findByIdAndUpdate(
        Tweetid,
        { $pull: { likes: userId } },
        { new: true }
      );

      return res.json({
        message: `Dislike`,
        success: false,
        Length: updatedTweets.likes.length,
      });
    } else {
      updatedTweets = await Tweet.findByIdAndUpdate(
        Tweetid,
        { $push: { likes: userId } },
        { new: true }
      );

      return res.json({
        message: "Like",
        success: true,
        Length: updatedTweets.likes.length,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllTweetsController = async (req, res) => {
  try {
    const user = req.user;
    const followingId = user.following;

    const userId = req.userId;

    const allUserIds = [...followingId, user._id]; // followingIds + loggedInUserId -> concatenate

    const alltweet = await Tweet.find({
      userId: { $in: allUserIds },
    })
      .sort({ createdAt: -1 })
      .select("-password");

    if (!alltweet) {
      return res.status(400).json({ message: "Create tweet " });
    }
    return res.status(200).json({ message: "allTweets", alltweet });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getfollowTweetsController = async (req, res) => {
  try {
    const userId = req.params.id;
    const loggedInUser = await User.findById(userId);
    const followingUsers = loggedInUser.following;
    const allTweets = await Tweet.find({
      userId: { $in: followingUsers },
    });

    if (!allTweets || allTweets.length === 0) {
      return res
        .status(400)
        .json({ message: "No tweets from following users." });
    }
    return res.status(200).json({ message: "followTweets", allTweets });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
