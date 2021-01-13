import React, { useState, useEffect } from 'react'
import useStyles from './style';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {

    useEffect(() => {
        
    }, []);

    const [postData, setPostData] = useState({
        creator: '',
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

        if (postData.creator === '' || postData.title === '' || postData.message === '' || postData.tags === '' || postData.selectedFile === '') {
            return setError('All Fields are required.');
        }

        if (currentId) {
            dispatch(updatePost(currentId, postData))
        }
        else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData( {creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''})

    } 

    return(
       <Paper className={classes.paper}>
           <form autoComplete="off" noValidate onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.heading}><Typography variant="h6" 
                style={{fontFamily: 'Amaranth',fontSize: '28px', textAlign: 'center', paddingTop: '5px', fontWeight: '600',color:'white'}}>
                {currentId ? 'Editing': 'Creating' } A Memory</Typography>
            </div>
            {
                error !== '' &&
                <Alert onClose={() => setError('')} severity="error" className={classes.error}>
                    {error}
                </Alert>
            }
            <div className={classes.contents}>
            <TextField 
            name ="creator"
             className={classes.inputBox}
             variant="outlined"
              label="Creator"
              fullWidth
              value={postData.creator}
            //   onChange={(e)=> setPostData({...postData,creator:e.target.value})}
              />

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

            <div className={classes.fileInput}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({base64}) =>setPostData({...postData,selectedFile:base64})} 
                />

            </div>
            
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button className={classes.buttonClear} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </div>
           </form>
           
       </Paper>

    )
}

export default Form;