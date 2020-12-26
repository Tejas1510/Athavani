import * as api from '../api/index';
import {CREATE,FETCH_ALL,DELETE,UPDATE,LIKE_POST} from '../constants/actionTypes';
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

export const likePost = (id) =>async (dispatch) =>{
    try{
        const {data} = await api.likePost(id);
        dispatch({type : LIKE_POST, payload: data})
        
    }
    catch(error){
        console.log(error.message)
    }
}
export const dislikePost = (id) =>async (dispatch) =>{
    try{
        const {data} = await api.dislikePost(id);
        dispatch({type : DISLIKE_POST, payload: data})
        
    }
    catch(error){
        console.log(error.message)
    }
}
