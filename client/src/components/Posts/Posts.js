import React, {useState,useEffect} from 'react'
import Post from './Post/Post';
import useStyles from './style';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import * as api from '../../api/index';
import {Grid,CircularProgress, Button, Menu, MenuItem} from '@material-ui/core';

const Posts = ({setCurrentId}) =>{

    const history = useHistory();
    const [creatorID, setCreatorID] = useState("");
    const [isFavoritePosts, setIsFavoritePosts] = useState(false);
    
    useEffect(async () => {
        try {
            const {data} = await api.verify({token : localStorage.getItem('token')});
            setCreatorID(data.id);
        } catch(error) {
            localStorage.removeItem('token');
            history.push('/signin');
        }
    }, [isFavoritePosts]);

    const posts = useSelector((state) => state.posts)
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isReversed, setIsReversed] = useState(false);

    function sort(reverse) {
        if((reverse && !isReversed) || (!reverse && isReversed)) {
                posts.reverse();
                setIsReversed(current => !current);
        }
    }

    // console.log("posts : ", posts)
    return(
        !posts.length ? <CircularProgress/> : (
            <>
                <div className={classes.filterBar}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.filterButtons}>
                        Sort
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {
                            handleClose();
                            sort(false);
                            }}>By Newest</MenuItem>
                        <MenuItem onClick={() => {
                            handleClose();
                            sort(true);
                            }}>By Oldest</MenuItem>
                    </Menu>
                    <Button className={classes.filterButtons} onClick={() => setIsFavoritePosts(current => !current)}>
                        {isFavoritePosts? 'All Posts' : 'My Favorite Posts'}
                    </Button>
                </div>
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.slice(0).reverse().map((post)=> {
                    if(isFavoritePosts && !post.favorites.includes(creatorID)) {
                        return (<></>)
                    } else {
                        return (<Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>)
                    }})}
                </Grid>
            </>
        )
    )
}

export default Posts;