import {CREATE,FETCH_ALL,DELETE,UPDATE,LIKE_POST} from '../constants/actionTypes';
export default (posts=[],action) =>{
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case DELETE:
                return posts.filter((post)=> post._id !==action.payload);    
        case UPDATE:
                return posts.map((post)=>post._id === action.payload._id ? action.payload:post); 
        case LIKE_POST:
                return posts.map((post)=>post._id === action.payload._id ? action.payload:post);    
        case CREATE:
            return [...posts,action.payload];
        default:
            return posts;
    }
}