import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../api/index';
import useStyles from './style';
import { TextField, Button, Typography, Paper, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { toast } from 'react-toastify';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import AvatarButtons from '../Buttons/AvatarButtons';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ClearIcon from '@material-ui/icons/Clear';

const Form = ({ currentId, setCurrentId }) => {

    const history = useHistory();
    const [creatorID, setCreatorID] = useState("");
    const [creatorName, setCreatorName] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        try {
            const {data} = await api.verify({token : localStorage.getItem('token')});
            // console.log(data);
            setCreatorID(data.id);
            setCreatorName(data.name);
        } catch(error) {
            toast.error("Token Expired or Invalid. Sign In again.");
            localStorage.removeItem('token');
            history.push('/signin');
        }
    }, []);

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const [error, setError] = useState("");

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(postData);

        if (postData.title === '' || postData.message === '' || postData.tags === '' || postData.selectedFile === '') {
            return setError('All Fields are required.');
        }

        setIsLoading(true);

        let postdata = postData;
        postdata.creator = { _id: creatorID, name: creatorName };
        // console.log(postdata);

        if (currentId) {
            dispatch(updatePost(currentId, postData)).then(() => {
                setIsLoading(false);
            })
        }
        else {
            dispatch(createPost(postData)).then(() => {
                setIsLoading(false);
            });
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData( {
        title:'',
        message:'',
        tags:'',
        selectedFile:''})

    } 

    return(
       <Paper className={classes.paper}>
           <form autoComplete="off" noValidate onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.heading}><Typography variant="h6" 
                style={{fontFamily: 'Amaranth',fontSize: '28px', textAlign: 'center', paddingTop: '5px', fontWeight: '400',color:'#ff0000'}}>
                {currentId ? 'Editing': 'Creating' } A Memory</Typography>
            </div>
            {
                error !== '' &&
                <Alert onClose={() => setError('')} severity="error" className={classes.error}>
                    {error}
                </Alert>
            }
            <div className={classes.contents}>
              <Typography style={{
                  fontSize: "1.5em",
                  margin: "10px 0px",
                  fontWeight: "500",
                  textAlign: "center",
                  borderRadius: "12px",
                  padding: "2px 15px",
                  width: "fit-content",
                  textAlign: "center",
                  margin: "10px auto",
                  color: "#101820ff",
                  background: "#f2aa4cff"
              }}>{creatorName}</Typography>

           <TextField 
            name ="title"
            className={classes.inputBox}
             variant="outlined"
              label="Title"
              style={{marginTop:'10px'}}
              fullWidth
              value={postData.title}
              onChange={(e)=> setPostData({...postData,title:e.target.value})} />

           <TextField 
                name ="message"
                className={classes.inputBox}
                variant="outlined"
                label="Message"
                
                style={{marginTop:'10px'}}
                fullWidth
              value={postData.message}
              onChange={(e)=> setPostData({...postData,message:e.target.value})} />

            <TextField 
                name ="tags"
                className={classes.inputBox}
                variant="outlined"
                label="Tags"
                style={{marginTop:'10px'}}
                fullWidth
                value={postData.tags}
                onChange={(e)=> setPostData({...postData,tags:e.target.value.split(',')})} />
            <div className={classes.fileUpload}>
                <div style={{display: "flex", alignItems: "center"}}>
                <PublishRoundedIcon className={classes.fileUploadIcon}/>
                <Typography>Upload Your Memory</Typography>
                </div>

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) =>setPostData({...postData,selectedFile:base64})} 
                    />
                </div>
            </div>
            
            <div className={classes.buttons}>
            <AvatarButtons styling={classes.buttonSubmit} variant="contained" color="#FFB800" size="large" type="submit" fullWidth
                style={{cursor: `${isLoading ? "not-allowed" : "pointer"}`,margin:"1rem auto"}} displayicon={ArrowUpwardIcon}>
                    Submit
                </AvatarButtons>
            <AvatarButtons styling={classes.buttonClear} variant="contained" color="#ff0000" size="large" fullWidth
                onClick={clear} displayicon={ClearIcon}>
                    Clear
                </AvatarButtons>
            </div>
            {
                isLoading &&
                <LinearProgress color="secondary" />
            }
            </div>
           </form>
           
       </Paper>

    )
}

export default Form;