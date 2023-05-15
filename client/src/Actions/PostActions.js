import axios from "axios";
import { BASE_URL } from "../Helper/Utils";

export const postActionTypes = {
  GET_POSTS: "GET_POSTS",
  GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
  GET_POSTS_ERROR: "GET_POSTS_ERROR",

  GET_POST: "GET_POST",
  GET_POST_SUCCESS: "GET_POST_SUCCESS",
  GET_POST_ERROR: "GET_POST_ERROR",

  ADD_POST: "ADD_POST",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  ADD_POST_ERROR: "ADD_POST_ERROR",

  LIKE_POST: "LIKE_POST",
  LIKE_POST_SUCCESS: "LIKE_POST_SUCCESS",
  LIKE_POST_ERROR: "LIKE_POST_ERROR",

  UNLIKE_POST: "UNLIKE_POST",
  UNLIKE_POST_SUCCESS: "UNLIKE_POST_SUCCESS",
  UNLIKE_POST_ERROR: "UNLIKE_POST_ERROR",

  ADD_COMMENT: "ADD_COMMENT",
  ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
  ADD_COMMENT_ERROR: "ADD_COMMENT_ERROR",

  CLEAR_POST_UPLOADED: "CLEAR_POST_UPLOADED",
};

export class postActions {
  static getPosts = (payload) => {
    return (dispatch) => {
      axios
        .get(`${BASE_URL}post/posts`, {
          headers: { bearer: payload.user?.data?.token },
        })
        .then((data) => dispatch(this.getPostsSuccess(data.data)))
        .catch((error) => dispatch(this.getPostsError(error)));
    };
  };

  static getPostsSuccess(payload) {
    return {
      type: postActionTypes.GET_POSTS_SUCCESS,
      payload: payload?.data,
    };
  }
  static getPostsError(payload) {
    return {
      type: postActionTypes.GET_POSTS_ERROR,
      payload: payload?.response?.data,
    };
  }
  static getPost = (payload) => {
    return (dispatch) => {
      axios
        .get(`${BASE_URL}post/post/${payload.postID}`, {
          headers: { bearer: payload.user?.data?.token },
        })
        .then((data) => dispatch(this.getPostSuccess(data.data)))
        .catch((error) => dispatch(this.getPostError(error)));
    };
  };

  static getPostSuccess(payload) {
    return {
      type: postActionTypes.GET_POST_SUCCESS,
      payload: payload?.data,
    };
  }
  static getPostError(payload) {
    return {
      type: postActionTypes.GET_POST_ERROR,
      payload: payload?.response?.data,
    };
  }

  static likePost = (payload) => {
    return (dispatch) => {
      console.log("here")
      axios
        .post(`${BASE_URL}post/add-like`,{postID:payload.postID}, {
          headers: { bearer: payload.user?.data?.token },
        })
        .then((data) => dispatch(this.likePostSuccess(data.data)))
        .catch((error) => dispatch(this.likePostError(error)));
    };
  };

  static likePostSuccess(payload) {
    console.log("here",payload)
    return {
      type: postActionTypes.LIKE_POST_SUCCESS,
      payload: payload?.data,
    };
  }
  static likePostError(payload) {
    return {
      type: postActionTypes.LIKE_POST_ERROR,
      payload: payload?.response?.data,
    };
  }

  static unlikePost = (payload) => {
    return (dispatch) => {
      console.log("here")
      axios
        .post(`${BASE_URL}post/unlike`,{postID:payload.postID}, {
          headers: { bearer: payload.user?.data?.token },
        })
        .then((data) => dispatch(this.unlikePostSuccess(data.data)))
        .catch((error) => dispatch(this.unlikePostError(error)));
    };
  };

  static unlikePostSuccess(payload) {
    console.log("here",payload)
    return {
      type: postActionTypes.UNLIKE_POST_SUCCESS,
      payload: payload?.data,
    };
  }
  static unlikePostError(payload) {
    return {
      type: postActionTypes.UNLIKE_POST_ERROR,
      payload: payload?.response?.data,
    };
  }

  static addPost = (payload) => {
    return (dispatch) => {
      axios
        .post(
          `${BASE_URL}post/create-post`,
          { title: payload.title, content: payload.content },
          { headers: { bearer: payload.user?.data?.token } }
        )
        .then((data) => dispatch(this.addPostSuccess(data)))
        .catch((error) => dispatch(this.addPostError(error)));
    };
  };

  static addPostSuccess(payload) {
    return {
      type: postActionTypes.ADD_POST_SUCCESS,
      payload: payload?.data,
    };
  }
  static addPostError(payload) {
    return {
      type: postActionTypes.ADD_POST_ERROR,
      payload: payload?.response?.data,
    };
  }

  static addComment = (payload) => {
    return (dispatch) => {
      axios
        .post(`${BASE_URL}post/add-comment`, payload, {
          headers: { bearer: payload.user?.data?.token },
        })
        .then((data) => dispatch(this.addCommentSuccess(data)))
        .catch((error) => dispatch(this.addCommentError(error)));
    };
  };

  static addCommentSuccess(payload) {
    return {
      type: postActionTypes.ADD_COMMENT_SUCCESS,
      payload: payload?.data,
    };
  }
  static addCommentError(payload) {
    return {
      type: postActionTypes.ADD_COMMENT_ERROR,
      payload: payload?.response?.data,
    };
  }

  static clearPostUploaded() {
    return {
      type: postActionTypes.CLEAR_POST_UPLOADED,
    };
  }
}
