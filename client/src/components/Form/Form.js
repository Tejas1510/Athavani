import React,{useState,useEffect} from 'react'
import useStyles from './style';
import {TextField,Button,Typography,Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import {createPost,updatePost} from '../../actions/posts';

const Form = ({currentId,setCurrentId}) =>{

    const[postData,setPostData] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    });

    const post = useSelector((state) =>currentId ? state.posts.find((p) => p._id === currentId):null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() =>{
        if(post){
            setPostData(post);
        }
    },[post])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,postData))
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () =>{
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
            <Typography variant="h6">{currentId ? 'Editing': 'Creating' } a Memory</Typography>
            <TextField 
            name ="creator"
             variant="outlined"
              label="Creator"
              style={{marginBottom:10}}
              fullWidth
              value={postData.creator}
              onChange={(e)=> setPostData({...postData,creator:e.target.value})} />

           <TextField 
            name ="title"
             variant="outlined"
              label="Title"
              style={{marginBottom:10}}
              fullWidth
              value={postData.title}
              onChange={(e)=> setPostData({...postData,title:e.target.value})} />

           <TextField 
                name ="message"
                variant="outlined"
                label="Message"
                style={{marginBottom:10}}
               fullWidth
              value={postData.message}
              onChange={(e)=> setPostData({...postData,message:e.target.value})} />

            <TextField 
                name ="tags"
                variant="outlined"
                label="Tags"
                style={{marginBottom:10}}
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
            <Button className={classes.buttonSubmit} variant="contained" style={{background:'#ffaa00',color:'white'}} size="large" type="submit" fullWidth >{currentId?'Update':'Submit'}</Button>
            <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
           </form>

       </Paper>
    )
}

export default Form;