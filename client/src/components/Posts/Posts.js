import React, {useState,useEffect} from 'react'
import Post from './Post/Post';
import useStyles from './style';
import { useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import * as api from '../../api/index';
import {Grid,CircularProgress, Button, Menu, MenuItem, FormControlLabel, Switch, Typography} from '@material-ui/core';

const Posts = ({setCurrentId, setOpenCreatePost}) =>{

    const history = useHistory();
    const [creatorID, setCreatorID] = useState("");
    const [isFavoritePosts, setIsFavoritePosts] = useState(false);
    //const [searchTagPosts, setSearchTagPosts] = useState([]);
    //const [searchTag, setSearchTag] = useState("");
    const searchTagPosts = [];
    const searchTag = "";
    
    useEffect(()=>{
        (async () => {
            try {
                const {data} = await api.verify({token : localStorage.getItem('token')});
                setCreatorID(data.id);
            } catch(error) {
                localStorage.removeItem('token');
                history.push('/signin');
            }
        })();
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
    
    // const searchForTag = (e) => {
    //     setSearchTagPosts([])

    //     let a = posts.filter(
    //             (p, i) => p.tags.includes(e.target.value)
    //         )
    //     setSearchTagPosts(a);
    // }
   
    return(
        !posts.length ? <CircularProgress/> : (
            <>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "5px"
                }}>
                    <Typography component="div">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.filterButtons} style={{ background: "#ff7300" }}>
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
                    </Typography>
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item style={{
                            color: "black",
                            fontSize: "1.2em",
                            fontWeight: "500"
                        }}>All Posts</Grid>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Switch 
                                    checked={isFavoritePosts}
                                    onChange={(e) => setIsFavoritePosts(e.target.checked)}
                                    color="secondary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}
                            />
                        </Grid>
                        <Grid item style={{
                            color: "black",
                            fontSize: "1.2em",
                            fontWeight: "500"
                        }}>My Favorite Posts</Grid>
                        </Grid>
                    </Typography>
                </div>
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    { !searchTag ? (
                        posts.slice(0).reverse().map((post)=> {
                            if(isFavoritePosts && !post.favorites.includes(creatorID)) {
                                return (<></>)
                            } else {
                                console.log(searchTagPosts);
                                return (<Grid key={post._id} item xs={12} sm={12} lg={6}>
                                    <Post post={post} setCurrentId={setCurrentId} setOpenCreatePost={setOpenCreatePost}/>
                                </Grid>
                                )
                            }})
                    ) : (
                        searchTagPosts.slice(0).reverse().map((post)=> {
                            if(isFavoritePosts && !post.favorites.includes(creatorID)) {
                                return (<></>)
                            } else {
                                return (<Grid key={post._id} item xs={12} sm={12} lg={6}>
                                    <Post post={post} setCurrentId={setCurrentId} setOpenCreatePost={setOpenCreatePost}/>
                                </Grid>)
                            }})
                    )}
                </Grid>
            </>
        )
    )
}

export default Posts;