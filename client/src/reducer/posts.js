import {CREATE,FETCH_ALL,DELETE,UPDATE,LIKE_POST,DISLIKE_POST,FAVORITE_POST,COMMENT_POST, DELETE_COMMENT} from '../constants/actionTypes';
export default function postReducer(posts=[],action) {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case DELETE:
                return posts.filter((post)=> post._id !==action.payload);    
        case UPDATE:
                return posts.map((post)=>post._id === action.payload._id ? action.payload:post); 
        case LIKE_POST:
                return posts.map((post)=>post._id === action.payload._id ? action.payload:post);    
        case DISLIKE_POST:
            return posts.map((post)=>post._id === action.payload._id ? action.payload:post);
        case FAVORITE_POST:
            return posts.map((post) => post._id === action.payload._id ? action.payload:post);
        case COMMENT_POST:
            return posts.map((post) => post._id === action.payload._id ? action.payload:post);
        case DELETE_COMMENT:
            return posts.map((post) => post._id === action.payload._id ? action.payload:post);
        case CREATE:
            return [...posts,action.payload];
        default:
            return posts;
    }
}