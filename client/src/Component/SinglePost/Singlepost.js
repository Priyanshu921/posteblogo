import parse from "html-react-parser";
import React from 'react'
import singlePostStyles from './Singlepost.module.css'
import { useNavigate } from 'react-router-dom'

export const Singlepost = (props) => {
    const navigate = useNavigate()
  return (
    <div
      className="container border border-dark border-2 cursor-pointer my-2 col-md-12"
      role="button"
      onClick={() => navigate(`/post/${props._id}`)}
    >
      <h3>{props.title}</h3>
      <div className={`text-justify ${singlePostStyles.content}`}>
        {parse(props.content)}
      </div>
      <p>
        <span className={`fw-bold ${props.isLiked ? "text-primary" : ""}`}>
          {props.likes} {props.likes > 1 ? "Likes" : "Like"}{" "}
        </span>
        <span className={`fw-bold `}>
          {props.comments} {props.comments > 1 ? "Comments" : "Comment"}
        </span>
      </p>
    </div>
  );
}
