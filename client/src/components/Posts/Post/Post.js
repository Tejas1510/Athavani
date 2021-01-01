import React,{useState} from 'react'
import useStyles from './style';
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
} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../actions/posts';
import dotenv from 'dotenv';
import {password1} from './password';

const Post = ({ post, setCurrentId }) => {
  dotenv.config();


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [password, setPassword] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(password);
    if (password === password1) {
      dispatch(deletePost(post._id));

      handleClose();
    } else {
      handleClose();
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
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>


      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
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
      <CardContent>
        <Typography gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small" style={{ paddingRight: "5" }} />
          LIKE &nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={handleOpen}>
          <DeleteIcon fontSize="small" />
          Delete
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
  );
};

export default Post;