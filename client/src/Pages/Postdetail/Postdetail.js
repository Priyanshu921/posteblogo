import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../Actions/PostActions";
import postStyles from "./PostDetail.module.css";
import { HandThumbsUpFill } from "react-bootstrap-icons";


export const Postdetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postReducer.postDetails);
  const user = useSelector((state) => state.userReducer.user);
  const [comment,setComment] = useState('')
  const params = useParams();
  useEffect(() => {
    dispatch(postActions.getPost({ postID: params.postID, user }));
  }, []);
  
  const addComment = () => {
    dispatch(postActions.addComment({user,postID:params.postID,comment}))
    setComment('')
  }

  const addOrRemoveLike = () => {
    if(postDetails?.isLiked){
      console.log("already liked")
      dispatch(postActions.unlikePost({ user, postID: params.postID }  ));
    }
    else{
      dispatch(postActions.likePost({ user, postID: params.postID }  ));
    }
  }
  return (
    <>
      {postDetails?.content && (
        <div className="container mt-3 border border-2 p-2">
          <h2 className="text-center">{postDetails?.title || "------"}</h2>
          <div className="container">{parse(postDetails?.content)}</div>
          <div className="container my-2">
            <span
              role="button"
              className={`${
                postDetails?.isLiked ? "text-dark bg-primary" : "bg-secondary"
              } fw-bold border-pill rounded-pill   p-2 `}
              onClick={() => addOrRemoveLike()}
            >
              {`${postDetails?.likes?.length} ${
                postDetails?.likes?.length > 1 ? "Likes" : "Like"
              }`}
            </span>
          </div>
        </div>
      )}
      <div className="container form-group col-md-6 d-flex mb-2 mt-4">
        <input
          className={`col-md-9 form-control`}
          placeholder="Add Comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="btn btn-secondary col-md-2 mx-2"
          disabled={!comment}
          onClick={addComment}
        >
          Comment
        </button>
      </div>
      {postDetails?.comments?.length > 0 && (
        <div className="container">
          <h5 className="text-center">Comments</h5>
          {postDetails.comments.map((comment, index) => (
            <p
              className={`${
                index % 2 !== 0 ? postStyles.oddComment : postStyles.evenComment
              } p-3`}
            >
              <span className="fw-bold">
                {comment?.commentor?.name === user?.data?.name
                  ? "You"
                  : comment?.commentor?.name}
              </span>
              : {comment.comment}
            </p>
          ))}
        </div>
      )}
      <div className="col-md-12 text-center mt-5">
        <button
          className="btn btn-secondary col-md-5"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </>
  );
};
