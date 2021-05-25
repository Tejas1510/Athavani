import axios from "axios";

// const mainUrl = "https://memories-mern-stack.herokuapp.com/";
// const mainUrl = "https://athavani-sanjay-backend.herokuapp.com/"
const mainUrl = "http://localhost:5000/";

const postUrl = mainUrl + "posts";
const userUrl = mainUrl + "auth";

// export const fetchPost = () => axios.get(postUrl);
export const fetchPost = () =>
  axios({
    method: "get",
    url: postUrl,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
// export const createPost = (newPost) => axios.post(postUrl, newPost);
export const createPost = (newPost) =>
  axios({
    method: "post",
    url: postUrl,
    data: newPost,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
// export const updatePost = (id, updatePost) =>
//   axios.patch(`${postUrl}/${id}`, updatePost);
export const updatePost = (id, updatePost) =>
  axios({
    method: "patch",
    url: `${postUrl}/${id}`,
    data: updatePost,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })


// export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);
export const deletePost = (id) =>
  axios({
    method: "delete",
    url: `${postUrl}/${id}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })

// export const likePost = (id, body) =>
//   axios.patch(`${postUrl}/${id}/likePost`, body);
export const likePost = (id, body) =>
  axios({
    method: "patch",
    url: `${postUrl}/${id}/likePost`,
    data: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })

// export const dislikePost = (id, body) =>
//   axios.patch(`${postUrl}/${id}/dislikePost`, body);
export const dislikePost = (id, body) =>
  axios({
    method: "patch",
    url: `${postUrl}/${id}/dislikePost`,
    data: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })

// export const favoritePost = (id, body) =>
//   axios.patch(`${postUrl}/${id}/favoritePost`, body);
export const favoritePost = (id, body) =>
  axios({
    method: "patch",
    url: `${postUrl}/${id}/favoritePost`,
    data: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })

// export const commentPost = (id, body) =>
//   axios.patch(`${postUrl}/${id}/commentPost`, body);
export const commentPost = (id, body) =>
  axios({
    method: "patch",
    url: `${postUrl}/${id}/commentPost`,
    data: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })

// export const deleteComment = (id, commentId, body) =>
//   axios.patch(`${postUrl}/${id}/deleteComment/${commentId}`, body);
export const deleteComment = (id, commentId, body) =>
  axios({
    method: "patch",
    url: `${postUrl}/${id}/deleteComment/${commentId}`,
    data: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })


export const Gsignin = (user) => axios.post(`${userUrl}/signin/Gsignin`, user);
export const signIn = (user) => axios.post(`${userUrl}/signin`, user);
export const signUp = (user) => axios.post(`${userUrl}/signup`, user);
export const verify = (token) => axios.post(`${userUrl}/verify`, token);
export const checkPassword = (body) =>
  axios.post(`${userUrl}/check-password`, body);
export const forgot = (email) => axios.put(`${userUrl}/forgot`, email);
export const resetPassword = (body) =>
  axios.put(`${userUrl}/reset-password`, body);

export const sendOtp = (email) => axios.post(`${userUrl}/send-otp`, email);
export const verifyOtp = (body) => axios.post(`${userUrl}/verify-otp`, body);

// export const getProfileById = (id) => axios.get(`${userUrl}/get-profile-by-id/${id}`);
// export const updateProfileById = (id, body) =>
//   axios.put(`${userUrl}/update-profile-by-id/${id}`, body);

export const getProfileById = (id) =>
  axios({
    method: "get",
    url: `${userUrl}/get-profile-by-id/${id}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

export const getProfilePhotoById = (id) =>
  axios({
    method: "get",
    url: `${userUrl}/get-profile-photo-by-id/${id}`,
  });

export const updateProfileById = (id, body) =>
  axios({
    method: "put",
    url: `${userUrl}/update-profile-by-id/${id}`,
    data: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

const mailUrl = mainUrl + "mails";

export const addMail = (newMail) => axios.post(mailUrl, newMail);
