import * as api from '../api/index';
import {CREATE,FETCH_ALL,DELETE,UPDATE,LIKE_POST, DISLIKE_POST, FAVORITE_POST, COMMENT_POST, DELETE_COMMENT} from '../constants/actionTypes';
// Action Creators

export const getPosts = () => async (dispatch) =>{

    try{
        const {data} = await api.fetchPost();
        dispatch({type : FETCH_ALL, payload: data})
    }
    catch(error){
        console.log(error.message)
    }

}

export const createPost = (post) => async (dispatch) =>{

    try{
        const {data} = await api.createPost(post);
        dispatch({type : CREATE, payload: data})
        
    }
    catch(error){
        console.log(error.message)
    }

}

export const updatePost = (id,post) => async (dispatch) =>{

    try{
        const {data} = await api.updatePost(id,post);
        dispatch({type : UPDATE, payload: data})
        
    }
    catch(error){
        console.log(error.message)
    }

}

export const deletePost = (id) =>async (dispatch) =>{
    try{
        await api.deletePost(id)

        dispatch({type:DELETE,payload:id})
    }
    catch(error){
        console.log(error.message)
    }
}

export const likePost = (id, body) =>async (dispatch) =>{
    try{
        const {data} = await api.likePost(id, body);
        dispatch({type : LIKE_POST, payload: data})
        
    }
    catch(error){
        console.log(error.message)
    }
}


export const dislikePost = (id, body) => async (dispatch) => {
    try {
        const { data } = await api.dislikePost(id, body);
        dispatch({ type: DISLIKE_POST, payload: data })

    }
    catch (error) {
        console.log(error.message)
    }
}

export const favoritePost = (id, body) => async (dispatch) => {
    try {
        const { data } = await api.favoritePost(id, body);
        dispatch({ type: FAVORITE_POST, payload: data })

    }
    catch (error) {
        console.log(error.message)
    }
}

export const commentPost = (id, body) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(id, body);
        dispatch({ type: COMMENT_POST, payload: data })

    }
    catch (error) {
        console.log(error.message)
    }
}

export const deleteComment = (id, commentId, body) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(id, commentId, body);
        dispatch({ type: DELETE_COMMENT, payload: data })

    }
    catch (error) {
        console.log(error.message)
    }
}