import React, { useState, useEffect } from "react";
import * as api from "../../../api/index.js";
import useStyles from "./style";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
  TextField,
  Snackbar,
  IconButton,
  withStyles,
  Backdrop,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
  deletePost,
  likePost,
  dislikePost,
  favoritePost,
  commentPost,
  deleteComment,
} from "../../../actions/posts";
import dotenv from "dotenv";
import { password1 } from "./password";
import Aos from "aos"
import "aos/dist/aos.css";


const Post = ({ post, setCurrentId, fromProfile, setOpenCreatePost }) => {
  dotenv.config();
  console.log(post);
  useEffect(()=>{
    Aos.init({duration:2000});
},[])
  const history = useHistory();
  const [creatorID, setCreatorID] = useState("");
  const [postImage, setpostImage] = useState()

  useEffect(async () => {
    try {
      const { data } = await api.verify({
        token: localStorage.getItem("token"),
      });
      setCreatorID(data.id);
    } catch (error) {
      toast.error("Token Expired or Invalid. Sign In again.");
      localStorage.removeItem("token");
      history.push("/signin");
    }
  }, []);

  useEffect(async () => {
    try {
      const imgResponse = await api.getPostPhotoById(post._id);
      const { img } = imgResponse.data;
      setpostImage(img);
    } catch (error) {
      if(error.response) {
        toast.error(error.response.data.message);
    } else if(error.request) {
        toast.error("Server is not Responding!");
    } else {
        toast.error(error.message);
    }
    }
  }, [])

  const classes = useStyles();
  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false); // for users
  const [openDeleteAdmin, setOpenDeleteAdmin] = useState(false); // for admin
  const [openDeleteComment, setOpenDeleteComment] = useState(false); // for users
  const [openDeleteCommentAdmin, setOpenDeleteCommentAdmin] = useState(false); // for admin
  const [commentID, setCommentID] = useState('');
  const [commented, setCommented] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);

  // function to open delete post option
  const handleOpen = () => {
    if (post.creator._id == creatorID) {
      setOpenDelete(true);
    } else {
      toast.info("You are trying to delete other's post!");
      setOpenDeleteAdmin(true);
    }
  };

  // function to close delete post option
  const handleClose = () => {
    setOpenDelete(false);
    setOpenDeleteAdmin(false);
  };

  // function to open delete comment option
  const handleCommentOpen = (comment) => {
    console.log(comment);
    console.log(creatorID);
    if (comment.postedBy == creatorID) {
      console.log(true);
      setOpenDeleteComment(true);
    } else {
      toast.info("You are trying to delete other's comment!");
      setOpenDeleteCommentAdmin(true);
    }
  };

  // function to close delete comment option
  const handleCommentClose = () => {
    setOpenDeleteComment(false);
    setOpenDeleteCommentAdmin(false);
  };

  // toggling the content of post
  const [contentToggle, setContentToggle] = useState(true);

  // Component of delete option popup
  function DeleteBody({ name }) {
    // console.log(thename);
    // input password
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
      if (openDelete) {
        // for user
        let matched = false;
        try {
          const { data } = await api.checkPassword({
            id: creatorID,
            password: password,
          });
          matched = data.status;
        } catch (error) {
          toast.error(error.message);
        }

        if (matched) {
          dispatch(deletePost(post._id)).then(() =>
            toast.success("Post Deleted.")
          );
          handleClose();
          toast.info("Deleting Post... It may take some seconds.");
        } else {
          setOpenDelete(false);
          toast.error("You have entered wrong password!");
        }
      } else if (openDeleteAdmin) {
        // for admin
        if (password === password1) {
          dispatch(deletePost(post._id)).then(() =>
            toast.success("Post Deleted.")
          );
          handleClose();
          toast.info("Deleting Post... It may take some seconds.");
        } else {
          setOpenDeleteAdmin(false);
          toast.error("You have entered wrong password!!!");
        }
      }
    };

    return (
      <div className={classes.paper} >
        <CloseIcon onClick={handleClose} style={{ fontSize: "2em", position: "absolute", right: "5px", top: "5px", cursor: "pointer" }}/>
        <h2 id="simple-modal-title">
          <center>Please Enter {name} Password</center>
        </h2>
        <TextField
          name="message"
          variant="outlined"
          label="Enter Password"
          type="password"
          style={{ marginBottom: "1.5rem" }}
          className={classes.customInput}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          className={classes.paperButton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    );
  }

  function DeleteCommentBody({ thename }) {
    console.log(thename);
    // input password
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
      console.log(openDeleteComment);
      console.log(commentID);
      if (openDeleteComment) {
        // for user
        let matched = false;
        setCommentDeleted(true);
        try {
          const { data } = await api.checkPassword({
            id: creatorID,
            password: password,
          });
          matched = data.status;
        } catch (error) {
          toast.error(error.message);
        }

        if (matched) {
          // dispatch(deletePost(post._id)).then(() =>
          //   toast.success("Post Deleted.")
          // );
          console.log(post);
          console.log(commentID);
          dispatch(
            deleteComment(post._id, commentID, {
              userID: creatorID,
            })
          ).then(() => toast.success("Comment Deleted."));
          handleCommentClose();
          setCommentDeleted(false);
          toast.info("Deleting Comment... It may take some seconds.");
        } else {
          setCommentDeleted(false);
          setOpenDeleteComment(false);
          toast.error("You have entered wrong password!");
        }
      } else if (openDeleteCommentAdmin) {
        setCommentDeleted(true);
        // for admin
        if (password === password1) {
          dispatch(
            deleteComment(post._id, commentID, {
              userID: creatorID,
            })
          ).then(() => toast.success("Comment Deleted."));
          handleCommentClose();
          setCommentDeleted(false);
          toast.info("Deleting Comment... It may take some seconds.");
        } else {
          setOpenDeleteCommentAdmin(false);
          setCommentDeleted(false);
          toast.error("You have entered wrong password!!!");
        }
      }
    };

    // setCommentID();

    return (
      <div className={classes.paper}>
        <CloseIcon onClick={handleClose} style={{ fontSize: "2em", position: "absolute", right: "5px", top: "5px", cursor: "pointer" }}/>
        <h2 id="simple-modal-title">
          <center>Please Enter {thename} Password</center>
        </h2>
        <TextField
          name="message"
          variant="outlined"
          label="Enter Password"
          type="password"
          style={{ marginBottom: "1.5rem" }}
          className={classes.customInput}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          className={classes.paperButton}
          onClick={handleSubmit}
          disabled={commentDeleted}
          style={{
            opacity: commentDeleted ? "0.8" : "1"
          }}
        >
          Submit
        </Button>
      </div>
    );
  }

  const [settingsOption, setSettingsOption] = useState(false);

  function handleEditPost() {
    if (post.creator._id === creatorID) {
      setOpenCreatePost(true)
      setCurrentId(post._id);
    } else {
      toast.warn("You can't edit other's post!");
    }
    setSettingsOption(false);
  }
  const [postLiked, setPostLiked] = useState(false);
  const [postDisliked, setPostDisliked] = useState(false);
  
  const [commentToggle, setCommentToggle] = useState(false);

  const [commentMessage, setCommentMessage] = useState("");

  const likePostCall = () => {
    setPostLiked(true)
    if (post.dislikes.includes(creatorID)) {
      dispatch(
        dislikePost(post._id, {
          userID: creatorID,
          bool: true,
        })
      );
    }
    dispatch(
      likePost(post._id, {
        userID: creatorID,
        bool: post.likes.includes(creatorID),
      })
    );
    setPostLiked(false)
  }

  const disLikePostCall = () => {
    setPostDisliked(true)
    if (post.likes.includes(creatorID)) {
      dispatch(
        likePost(post._id, {
          userID: creatorID,
          bool: true,
        })
      );
    }
    dispatch(
      dislikePost(post._id, {
        userID: creatorID,
        bool: post.dislikes.includes(creatorID),
      })
    );
    setPostDisliked(false)
  }

  return (
    <>
      <Card data-aos="fade-up"  className={classes.card}>
        <CardMedia
          className={classes.media}
          image={postImage}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <div className={classes.overlay2}>
          {settingsOption ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "space-between",
              }}
            >
              <IconButton
                style={{
                  color: "white",
                  backgroundColor: "rgba(150, 150, 250, 0.5)",
                }}
                onClick={() => setSettingsOption(false)}
              >
                <CloseIcon />
              </IconButton>
              {!fromProfile && (
                <IconButton
                  style={{
                    color: "white",
                    backgroundColor: "rgba(0, 255, 0, 0.5)",
                  }}
                  onClick={() => handleEditPost()}
                >
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                style={{
                  color: "white",
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                }}
                onClick={() => {
                  handleOpen();
                  setSettingsOption(false);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ) : (
            <IconButton
              style={{ color: "white" }}
              onClick={() => setSettingsOption(true)}
            >
              <MoreHorizIcon fontSize="default" />
            </IconButton>
          )}
        </div>

        {/* ----- Post's Tags ----- */}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        {/* ----- Post's Title ----- */}
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>

        {/* ----- Post's text content ----- */}
        {!contentToggle && (
          <CardContent>
            <Typography>{post.message}</Typography>
          </CardContent>
        )}

        {/* ----- Post's toggle button ----- */}
        <Button
          size="small"
          color="primary"
          onClick={() => setContentToggle((current) => !current)}
          id="Arrow"
        >
          {contentToggle ? (
            <>
              <ArrowDownwardIcon />
              Read more...
            </>
          ) : (
            <>
              <ArrowUpwardIcon />
              Read less...
            </>
          )}
        </Button>

        {/* ----- Post's Action Buttons ----- */}
        <CardActions className={classes.cardActions}>
          {/* ----- Like ----- */}
          <Button
            size="small"
            color="primary"
            style={{ opacity: postLiked ? "0.7" : "1" }}
            disabled={postLiked}
            onClick={likePostCall}
          >{post.likes.includes(creatorID) ? <ThumbUpAltIcon fontSize="small" style={{ paddingRight: "5" }} /> : <ThumbUpAltOutlinedIcon fontSize="small" style={{ paddingRight: "5" }} />}
            
            {post.likes.length}
          </Button>

          {/* ----- Dislike ----- */}
          <Button
            size="small"
            color="primary"
            style={{ opacity: postDisliked ? "0.7" : "1" }}
            onClick={disLikePostCall}
          >{post.dislikes.includes(creatorID) ? <ThumbDownAltIcon fontSize="small" style={{ paddingRight: "5" }} /> : <ThumbDownAltOutlinedIcon fontSize="small" style={{ paddingRight: "5" }} />}
            
            {post.dislikes.length}
          </Button>

          {/* ----- Comment ----- */}
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setCommentToggle(true);
            }}
          >
            <CommentIcon fontSize="small" style={{ paddingRight: "5" }} />
            {post.comments.length}
          </Button>

          {/* ----- Heart ----- */}
          <Button
            color={`${
              post.favorites.includes(creatorID) ? "secondary" : "primary"
            }`}
            onClick={() => {
              dispatch(
                favoritePost(post._id, {
                  userID: creatorID,
                  bool: post.favorites.includes(creatorID),
                })
              );
            }}
          >
            {post.favorites.includes(creatorID) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </Button>
        </CardActions>

        <Dialog
          fullWidth={false}
          open={commentToggle}
          maxWidth="sm"
          onClose={() => setCommentToggle(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle style={{background: "orange"}} id="alert-dialog-title">Comment Section</DialogTitle>
          <div style={{
            background: "rgb(255, 192, 146)",
            padding: "20px"
          }}>
          <div>
            <div style={{ display: "flex", margin: "0 1rem", width: "100%" }}>
              <input
                type="text"
                style={{
                  padding: "0.5rem",
                  outline: "none",
                  width: "80%",
                  borderRadius: "15px",
                  border: "1px solid gray",
                }}
                placeholder="Comment..."
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
              />
              <Button
                style={{ width: "20%", color: "#ffa500", padding: "0", opacity: commented ? "0.4" : "1" }}
                disabled={commented}
                onClick={() => {
                  console.log("Clicked!");
                  if (!commentMessage) {
                    return toast.error("Comment cannot be empty.");
                  }
                  setCommented(true);
                  dispatch(
                    commentPost(post._id, {
                      userID: creatorID,
                      message: commentMessage,
                    })
                  ).then(() => {
                    setCommentMessage("");
                    setCommented(false);
                    console.log("Done");
                  }).catch((err) => setCommented(false));
                }}
              >
                <SendIcon />
              </Button>
            </div>
            <div style={{ padding: "0.5rem", paddingTop: "0" }}>
              {post.comments.length > 0 ? (post.comments
                .slice(0)
                .reverse()
                .map((comment) => (
                  <div
                    style={{
                      margin: "0.5rem 0",
                      padding: "0.3rem",
                      borderRadius: "15px",
                      backgroundColor: "rgba(138, 138, 138, 0.15)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={comment.img}
                        alt="Profile"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "100%",
                          objectFit: "cover",
                          paddingRight: "0.3rem",
                        }}
                      />
                      <div style={{ fontSize: "1.3rem" }}>{comment.name}  <span style={{fontSize: "16px", color: "#666", fontWeight: "300"}} > • {moment(comment.createdAt).fromNow()} </span></div>
                    </div>
                    <div
                      style={{
                        paddingTop: "0.1rem",
                        fontStyle: "italic",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ paddingTop: "10px" }}>
                        {comment.message}
                      </div>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {

                          console.log(comment._id);
                          setCommentID(comment._id);
                          console.log(commentID);
                          handleCommentOpen(comment);
                          setSettingsOption(false);
                          
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                    <div style={{fontSize: "13px", color: "#666", fontWeight: "300"}}></div>
                  </div>
                ))) : (
                  <div
                    style={{
                      margin: "0.5rem 0",
                      padding: "0.3rem",
                      textAlign: "center",
                    }}
                  >
                    Be the first one to comment!
                  </div>
                )}
            </div>
          </div>
          </div>
        </Dialog>
      </Card>

      {/* ----- Delete Popup for admin ----- */}
      <Modal
        open={openDeleteAdmin}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DeleteBody name="Admin" />
      </Modal>

      {/* ----- Delete Popup for user ----- */}
      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DeleteBody name="your" />
      </Modal>

      {/* ----- Delete Popup for admin ----- */}
      <Modal
        open={openDeleteCommentAdmin}
        onClose={handleCommentClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DeleteCommentBody thename="Admin" />
      </Modal>

      {/* ----- Delete Popup for user ----- */}
      <Modal
        open={openDeleteComment}
        onClose={handleCommentClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DeleteCommentBody thename="your" />
      </Modal>
    </>
  );
};

export default Post;
