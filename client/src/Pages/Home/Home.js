import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Singlepost } from '../../Component/SinglePost/Singlepost';
import {postActions} from '../../Actions/PostActions'

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.userReducer.user)
  const posts = useSelector(state=> state.postReducer.posts)
  useEffect(()=>{
    dispatch(postActions.getPosts({user}))
  },[])
  return (
    <div>
      {posts?.length && posts.map(post =>(
        <Singlepost title={post?.title||"--"} isLiked={post?.isLiked} content={post?.content||""} likes={post.likes.length} _id={post._id} key={post._id} comments={post?.comments?.length} />
      ))}
    </div>
  )
}
