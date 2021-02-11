import React, { useState, useEffect } from 'react';
import * as api from '../../../api/index.js';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
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
} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost, dislikePost, favoritePost } from '../../../actions/posts';
import dotenv from 'dotenv';
import { password1 } from './password';

const Post = ({ post, setCurrentId, fromProfile }) => {
  dotenv.config();

  const history = useHistory();
  const [creatorID, setCreatorID] = useState("");

  useEffect(async () => {
    try {
      const { data } = await api.verify({ token: localStorage.getItem('token') });
      setCreatorID(data.id);
    } catch (error) {
      toast.error("Token Expired or Invalid. Sign In again.");
      localStorage.removeItem('token');
      history.push('/signin');
    }
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false); // for users
  const [openDeleteAdmin, setOpenDeleteAdmin] = useState(false); // for admin

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

  // toggling the content of post
  const toggleContent = () => {
    var x = document.getElementById("cardContent");
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("Arrow").innerHTML = "Show Less";
    } else {
      x.style.display = "none";
      document.getElementById("Arrow").innerHTML = "READ MORE";
    }
  };

  // Component of delete option popup
  function DeleteBody({ name }) {

    // input password
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
      if (openDelete) { // for user
        let matched = false;
        try {
          const { data } = await api.checkPassword({ id: creatorID, password: password });
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
      } else if (openDeleteAdmin) { // for admin
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
      <div className={classes.paper}>
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

  return (
    <>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        {
          fromProfile ? <></> :
            <div className={classes.overlay2}>
              <Button
                style={{ color: "white" }}
                size="small"
                onClick={() => {
                  if (post.creator._id === creatorID) {
                    setCurrentId(post._id);
                  } else {
                    toast.warn("You can't edit other's post!");
                  }
                }}
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            </div>
        }

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
        <CardContent id="cardContent" className={classes.cardContent}>
          <Typography gutterBottom>{post.message}</Typography>
        </CardContent>

        {/* ----- Post's toggle button ----- */}
        <Button size="small" color="primary" onClick={toggleContent} id='Arrow'>
          <ArrowDownwardIcon />
          Read more...
        </Button>

        {/* ----- Post's Action Buttons ----- */}
        <CardActions className={classes.cardActions}>

          {/* ----- Like ----- */}
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(likePost(post._id, { userID: creatorID, bool: post.likes.includes(creatorID) }))
            }}
          >
            <ThumbUpAltIcon fontSize="small" style={{ paddingRight: "5" }} />
            {post.likes.length}
          </Button>

          {/* ----- Dislike ----- */}
          <Button size="small" color="primary" onClick={() => {
            dispatch(dislikePost(post._id, { userID: creatorID, bool: post.dislikes.includes(creatorID) }))
          }}>
            <ThumbDownAltIcon fontSize="small" style={{ paddingRight: "7" }} />
            {post.dislikes.length}
          </Button>

          {/* ----- Heart ----- */}
          <Button color={`${post.favorites.includes(creatorID) ? 'secondary' : 'primary'}`}
            onClick={() => {
              dispatch(favoritePost(post._id, { userID: creatorID, bool: post.favorites.includes(creatorID) }))
            }}
          >
            {post.favorites.includes(creatorID) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>

          {/* ----- Delete ----- */}
          <Button size="small" color="primary" onClick={handleOpen}>
            <DeleteIcon fontSize="small" />
          </Button>
        </CardActions>
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
    </>
  );
};

export default Post;