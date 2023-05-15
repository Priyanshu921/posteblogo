import mongoose from "mongoose";
import { apiResponse } from "../helper/utils";
import { post } from "../models/post";

export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const postCreated = await post.create({
      title,
      content,
      author: new mongoose.Types.ObjectId(req.user._id),
    });
    if (postCreated) {
      return apiResponse(res, {
        statusCode: 201,
        data: postCreated,
        message: "Post Created Succefully",
      });
    }
  } catch (error) {
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while creating posts",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    let posts = await post
      .find()
      .populate("author", "name email")
      .lean()
      .exec();
    posts = posts.map((post) => {
      const isLiked = post.likes.some(
        (like) => like.likedBy.toString() === req.user._id
      );
      return {
        ...post,
        isLiked,
      };
    });
    if (!posts.length) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Posts not available",
      });
    }
    return apiResponse(res, {
      statusCode: 200,
      data: posts,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while fetching posts",
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { postID } = req.params;
    if (!postID) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Please send valid Post ID",
      });
    }
    let postDetails = await post
      .findOne({ _id: postID })
      .populate("comments.commentor", "name").lean().exec();
    if (!postDetails) {
      return apiResponse(res, { statuCode: 400, error: "Post Not found" });
    }
    const isLiked = postDetails.likes.some(
      (like) => like.likedBy.toString() === req.user._id
    );
    postDetails = {
      ...postDetails,
      isLiked,
    };
    return apiResponse(res, {
      statusCode: 200,
      data: postDetails,
      message: "Post data fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while finding Post details",
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { comment, postID } = req.body;
    const postData = await post.findOne({ _id: postID }).lean().exec();
    if (!postData) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Post does not exist",
      });
    }
    postData.comments.push({
      commentor: new mongoose.Types.ObjectId(req.user._id),
      comment: comment,
    });
    const postUpdated = await post.updateOne({ _id: postID }, postData);
    if (!postUpdated.modifiedCount) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Please send valid details",
      });
    }
    return apiResponse(res, {
      statusCode: 200,
      message: "Comment added",
      data: { comment, commentor: { name: req.user.name } },
    });
  } catch (err) {
    console.log(err);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while adding comment",
    });
  }
};

export const addLike = async (req, res) => {
  try {
    const { postID } = req.body;
    console.log(postID)
    const postUpdated = await post.updateOne(
      { _id: postID, "likes.likedBy": { $ne: req.user._id } },
      {
        $addToSet: {
          likes: { likedBy: new mongoose.Types.ObjectId(req.user._id) },
        },
      }
    );
    if (!postUpdated.modifiedCount) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Already Liked the post",
      });
    }
    const likedPost = await post
      .findOne({ _id: postID })
      .populate("comments.commentor", "name")
      .lean()
      .exec();
    return apiResponse(res, {
      statusCode: 200,
      message: "Like added",
      data: {...likedPost,isLiked:true},
    });
  } catch (err) {
    console.log(err);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while Liking the Post",
    });
  }
};

export const removeLike = async (req, res) => {
  try {
    const { postID } = req.body;
    const postUpdated = await post.updateOne(
      { _id: postID, "likes.likedBy": req.user._id },
      {
        $pull: {
          likes: { likedBy: new mongoose.Types.ObjectId(req.user._id) },
        },
      }
    );
    if (!postUpdated.modifiedCount) {
      return apiResponse(res, {
        statusCode: 400,
        error: "You haven't liked the post",
      });
    }
    const unLikedPost = await post
      .findOne({ _id: postID })
      .populate("comments.commentor", "name")
      .lean()
      .exec();
    return apiResponse(res, {
      statusCode: 200,
      message: "Unliked the post",
      data: {...unLikedPost,isliked:false},
    });
  } catch (err) {
    console.log(err);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while Unliking the Post",
    });
  }
};
