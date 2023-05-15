
import express from 'express';
import { addComment, addLike, createPost, getPosts, getSinglePost, removeLike } from '../controller/post.controller';
import { authorizeUser } from '../helper/utils';

export const postRoutes = express();
postRoutes.post('/create-post',authorizeUser(),createPost)
postRoutes.post('/add-comment',authorizeUser(),addComment)
postRoutes.post('/add-like',authorizeUser(),addLike)
postRoutes.post('/unlike',authorizeUser(),removeLike)
postRoutes.get('/posts',authorizeUser(),getPosts)
postRoutes.get('/post/:postID',authorizeUser(),getSinglePost)
