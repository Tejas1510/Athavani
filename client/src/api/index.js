import axios from 'axios';

// const mainUrl = "https://memories-mern-stack.herokuapp.com/";
const mainUrl = "https://athavani-sanjay-backend.herokuapp.com/"
// const mainUrl = "http://localhost:5000/"

const postUrl = mainUrl + "posts";
const userUrl = mainUrl + "auth";

export const fetchPost = () => axios.get(postUrl);
export const createPost = (newPost) => axios.post(postUrl, newPost);
export const updatePost = (id, updatePost) => axios.patch(`${postUrl}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);
export const likePost = (id, body) => axios.patch(`${postUrl}/${id}/likePost`, body);
export const dislikePost = (id, body) => axios.patch(`${postUrl}/${id}/dislikePost`, body);
export const favoritePost = (id, body) => axios.patch(`${postUrl}/${id}/favoritePost`, body);
export const commentPost = (id, body) => axios.patch(`${postUrl}/${id}/commentPost`, body);
export const deleteComment = (id, commentId, body) => axios.patch(`${postUrl}/${id}/deleteComment/${commentId}`, body);

export const signIn = (user) => axios.post(`${userUrl}/signin`, user);
export const signUp = (user) => axios.post(`${userUrl}/signup`, user);
export const verify = (token) => axios.post(`${userUrl}/verify`, token);
export const checkPassword = (body) => axios.post(`${userUrl}/check-password`, body);
export const forgot = (email) => axios.put(`${userUrl}/forgot`, email);
export const resetPassword = (body) => axios.put(`${userUrl}/reset-password`, body);

export const sendOtp = (email) => axios.post(`${userUrl}/send-otp`, email);
export const verifyOtp = (body) => axios.post(`${userUrl}/verify-otp`, body);

export const getProfileById = (id) => axios.get(`${userUrl}/get-profile-by-id/${id}`);
export const updateProfileById = (id, body) => axios.put(`${userUrl}/update-profile-by-id/${id}`, body);

const mailUrl = mainUrl + "mails";

export const addMail = (newMail) => axios.post(mailUrl, newMail);