import axios from 'axios';

const postUrl = "https://memories-mern-stack.herokuapp.com/posts";
const userUrl = "https://memories-mern-stack.herokuapp.com/auth";
// const postUrl = "http://localhost:5000/posts";
// const userUrl = "http://localhost:5000/auth";

export const fetchPost = () => axios.get(postUrl);
export const createPost = (newPost) => axios.post(postUrl, newPost);
export const updatePost = (id, updatePost) => axios.patch(`${postUrl}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);
export const likePost = (id, body) => axios.patch(`${postUrl}/${id}/likePost`, body);
export const dislikePost = (id, body) => axios.patch(`${postUrl}/${id}/dislikePost`, body);
export const favoritePost = (id, body) => axios.patch(`${postUrl}/${id}/favoritePost`, body);

export const signIn = (user) => axios.post(`${userUrl}/signin`, user);
export const signUp = (user) => axios.post(`${userUrl}/signup`, user);
export const verify = (token) => axios.post(`${userUrl}/verify`, token);
export const forgot = (email) => axios.put(`${userUrl}/forgot`, email);
export const resetPassword = (body) => axios.put(`${userUrl}/reset-password`, body);

const mailUrl =  "https://memories-mern-stack.herokuapp.com/mails"
// const mailUrl = "http://localhost:5000/mails";
export const addMail = (newMail) => axios.post(mailUrl, newMail);