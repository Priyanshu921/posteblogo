import { postActionTypes } from "../Actions/PostActions"

const initialState = {
    posts:null,
    postDetails:null,
    postUploaded:null
}

export const postReducer = (state=initialState,action) => {
    switch(action.type){
        case postActionTypes.GET_POSTS_SUCCESS:
            return {...state,posts:action.payload}
        case postActionTypes.GET_POSTS_ERROR:
            return {...state,posts:action.payload}
        case postActionTypes.GET_POST_SUCCESS:
            return {...state,postDetails:action.payload}
        case postActionTypes.GET_POST_ERROR:
            return {...state,postDetails:action.payload}
        case postActionTypes.LIKE_POST_SUCCESS:
            return {...state,postDetails:action.payload}
        case postActionTypes.LIKE_POST_ERROR:
            return {...state}
        case postActionTypes.UNLIKE_POST_SUCCESS:
            return {...state,postDetails:action.payload}
        case postActionTypes.UNLIKE_POST_ERROR:
            return {...state}
        case postActionTypes.ADD_POST_SUCCESS:
            return {...state,postUploaded:action.payload}
        case postActionTypes.ADD_POST_ERROR:
            return {...state,postUploaded:action.payload}
        case postActionTypes.ADD_COMMENT_SUCCESS:
            const comments = state.postDetails.comments;
            comments.push(action.payload.data);
            console.log(comments)
            return {...state,postDetails:{...state.postDetails,comments}}
        case postActionTypes.ADD_COMMENT_ERROR:
            return state
        case postActionTypes.CLEAR_POST_UPLOADED:
            return {...state,postUploaded:null}
        default:
            return state
    }
}