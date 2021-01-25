import React,{useState,useEffect} from 'react';
import * as api from '../../../api/index.js';
import useStyles from './style';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
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
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {deletePost,likePost,dislikePost,favoritePost} from '../../../actions/posts';
import dotenv from 'dotenv';
import {password1} from './password';

const Post = ({ post, setCurrentId }) => {
  dotenv.config();


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const history = useHistory();
  const [creatorID, setCreatorID] = useState("");

  useEffect(async () => {
      try {
          const {data} = await api.verify({token : localStorage.getItem('token')});
          setCreatorID(data.id);
      } catch(error) {
          toast.error("Token Expired or Invalid. Sign In again.");
          localStorage.removeItem('token');
          history.push('/signin');
      }
  }, []);

  // const [isFavorite, setIsFavorite] = useState(false);

  const [password, setPassword] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [open1, setOpen1] = useState(false);
  const [isError,setIsError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      setIsError(false);
  };

  const handleSubmit = () => {
    console.log(password);
    if (password === password1) { 
     dispatch(deletePost(post._id));
     handleClose();
    } else {
      setOpen(false);
      setIsError(true);
    }
  };
  const toggleContent = () =>{
    var x = document.getElementById("cardContent");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("Arrow").innerHTML = "Show Less";
  } else {
    x.style.display = "none";
    document.getElementById("Arrow").innerHTML = "READ MORE";
  }
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">
        <center>Please Enter Admin Password</center>
      </h2>
      <TextField
        name="message"
        variant="outlined"
        label="Enter Password"
        type="password"
        style={{ marginBottom: "1.5rem" }}
        className={classes.customInput}
        fullWidth
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

    return(
      <>
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>


      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            if(post.creator._id === creatorID) {
              setCurrentId(post._id);
            } else {
              toast.warn("You can't edit other's post!");
            }
          }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent id="cardContent" className={classes.cardContent}>
        <Typography gutterBottom>{post.message}</Typography>
      </CardContent> 
      <Button size="small" color="primary" onClick={toggleContent} id='Arrow'>
          <ArrowDownwardIcon/>
          Read more...
        </Button>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() =>{
            dispatch(likePost(post._id, {userID: creatorID, bool: post.likes.includes(creatorID)}))
          }}
        >
          <ThumbUpAltIcon fontSize="small" style={{ paddingRight: "5" }} />
          {post.likes.length}
        </Button>
        <Button size="small" color="primary" onClick={() =>{
          dispatch(dislikePost(post._id, {userID: creatorID, bool: post.dislikes.includes(creatorID)}))
        }}>
          <ThumbDownAltIcon fontSize="small" style={{ paddingRight: "7" }} />
          {post.dislikes.length}
        </Button>
        <Button color={`${post.favorites.includes(creatorID)?'secondary':'primary'}`}
          onClick={() => {
            dispatch(favoritePost(post._id, {userID: creatorID, bool: post.favorites.includes(creatorID)}))
          }}
        >
          {post.favorites.includes(creatorID)? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
        <Button size="small" color="primary" onClick={handleOpen}>
          <DeleteIcon fontSize="small" />
        </Button>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </CardActions>
    </Card>
     { isError &&   
      (
        <Backdrop open={isError} onClick={handleClose} className={classes.overlayerror}>
           <Alert severity="error" onClose={handleClose} className={classes.overlay2}> Incorrect Password, cannot delete memory</Alert>
       </Backdrop>
          )}
       </>
  );
};

export default Post;