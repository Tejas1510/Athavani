import axios from 'axios';

const url = "https://memories-mern-stack.herokuapp.com/posts";

export const fetchPost = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

// const urlMail =  "https://memories-mern-stack.herokuapp.com/mails"
const urlMail = "http://localhost:5000/mails";
export const addMail = (newMail) => axios.post(urlMail, newMail);