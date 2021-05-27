// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  AppBar, Typography, Grid, Grow, Dialog } from '@material-ui/core';
import memories from './Images/memories.png'
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import MailForm from './components/MailForm/MailForm';
import SignUp from './components/Auth/SignUp/SignUp';
import SignIn from './components/Auth/SignIn/SignIn';
import Forgot from './components/Auth/Forgot/Forgot';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import Profile from './components/Profile/Profile';
import Error404 from './components/404/Error404';
import * as api from './api/index';
import Footer from './components/Footer/Footer';
import noProfilePhoto from "./assets/noProfilePhoto.jpg";
import { SignOutGoogle } from '../src/components/Auth/gapiFrontend';
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import CardMembershipOutlinedIcon from "@material-ui/icons/CardMembershipOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240;

const useStyl = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: "radial-gradient(orange 100%,transparent)",
      color:"black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: "100%",
    background: "radial-gradient(orange 100%,transparent)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo:{
    display:"inline-block",
    margin:"15px 0 10px 45px",
  }
}));

function App(props) {

  let history = useHistory();
  toast.configure();

  const classes = useStyles();

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [userImg, setUserImg] = useState(noProfilePhoto);
  const [OpenSubscription, setOpenSubscription] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const classs = useStyl();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pageName, setPageName] = React.useState("Home");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  useEffect(() => {
    if(!localStorage.getItem('token') && window.location.pathname === '/') {
      toast.info("Login before accesing home page!");
      history.push('/signin');
    }
  },[history])

  useEffect(async () => {
    try {
        const {data} = await api.verify({token : localStorage.getItem('token')});
        const response = await api.getProfileById(data.id);
        setUserImg(response.data.user.img)
    } catch (error) {
        console.log(error);
        setUserImg(noProfilePhoto)
    }
}, []);

  const [logout, setLogout] = useState(true);

  function logoutHandle() {
    SignOutGoogle(); //this is called when the user signs out from our website
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/signin');
    toast.success('Logged out successfully.');
  }

  const toggleMenu = () => {
    document.querySelector("#menuBox").classList.toggle("active");
  };

  return (
    <div>
      {!logout && 
      <AppBar className={classes.appBar} position="fixed" style={{background: "radial-gradient(orange 40%,transparent)"}} color="inherit">
      {logout && <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classs.menuButton}
          >
            <MenuIcon />
          </IconButton>}
      
        <Typography className={classes.heading} variant="h4" align="center">Memories</Typography>
        <img className={classes.image} height="50" src={memories} alt="Memories"></img>
        {logout && (
          <>
            {/* <img className={classes.menuIcon} height="50" src={userImg} alt="Memories" onClick={() => toggleMenu()}></img> */}
        {/* <div className={classes.menuBox} id="menuBox">
            <ul>
              <li>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => toggleMenu()}
                >
                  <h1 style={{margin: "0"}}>
                    Profile
                  </h1>
                </Link>
              </li>
              <li>
                  <h1 style={{margin: "0"}} onClick={() => {
                    setOpenCreatePost(true)
                    toggleMenu()
                    }}>
                      Create Post
                  </h1>
              </li>
              <li>
                  <h1 style={{margin: "0"}} onClick={() => logoutHandle()}>
                      Logout
                  </h1>
              </li>
            </ul>
          </div> */}
          </>
        )}
      </AppBar>}
      <div className={classs.root}>
      <CssBaseline />
      {logout && 
      <nav className={classs.drawer}>
      <AppBar position="fixed" className={classs.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {pageName}
          </Typography>
        </Toolbar>
      </AppBar>    
        <Hidden smUp implementation="css">
          
          <Drawer
            container={window.document.body}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classs.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
            
          >
            <div>
      
      <List>
      <Typography className={classes.heading} variant="h6" align="center">Memories</Typography>
        <img className={classes.image} height="30" src={memories} alt="Memories"></img>
        <ListItem button component={Link} to="/" onClick={() => {
                    setPageName("Home")
                    }}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => {
                    setOpenCreatePost(true)
                    }}>
          <ListItemIcon>
            <PostAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Create Post" />
        </ListItem>
        
        <ListItem button component={Link} to="/profile" onClick={() => {
                    setPageName("Profile")
                    }}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => {
                    setOpenSubscription(true)
                    }}>
          <ListItemIcon>
            <CardMembershipOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Subscribe" />
        </ListItem>
        <ListItem button onClick={() => logoutHandle()}>
          <ListItemIcon>
            <ExitToAppOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
          </Drawer>
        </Hidden>
        
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classs.drawerPaper
            }}
            variant="permanent"
            open
          >
            <div>
      
      <List>
        <div className={classs.logo}>
          <Typography  style={{float:"left"}} className={classes.heading} variant="h6" align="center">Memories</Typography>
          <img style={{float:"right"}} className={classes.image} height="30" src={memories} alt="Memories"></img>
        </div>
      
        <ListItem button component={Link} to="/" onClick={() => {
                    setPageName("Home")
                    }}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => {
                    setOpenCreatePost(true)
                    }}>
          <ListItemIcon>
            <PostAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Create Post" />
        </ListItem>
        
        <ListItem button component={Link} to="/profile" onClick={() => {
                    setPageName("Profile")
                    }}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => {
                    setOpenSubscription(true)
                    }}>
          <ListItemIcon>
            <CardMembershipOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Subscribe" />
        </ListItem>
        <ListItem button onClick={() => logoutHandle()}>
          <ListItemIcon>
            <ExitToAppOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
          </Drawer>
        </Hidden>
      </nav>}
      <main className={classs.content}>
        <div className={classs.toolbar} />
        <Grow in>
        <div>
          <Switch>
            <Route path="/" exact>
              <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Posts setCurrentId={setCurrentId} setOpenCreatePost={setOpenCreatePost}/>
                  <Dialog
                    fullWidth={false}
                    open={openCreatePost}
                    maxWidth="xs"
                    onClose={() => setOpenCreatePost(false)}
                    aria-labelledby="responsive-dialog-title"
                  >
                      <div style={{
                        background: "#FF7F50",
                        padding: "20px"
                      }}>
                      <Form currentId={currentId} setCurrentId={setCurrentId} setOpenCreatePost={setOpenCreatePost}/>
                      </div>
                  </Dialog>
                  <Dialog
                    fullWidth={true}
                    open={OpenSubscription}
                    maxWidth="sm"
                    onClose={() => setOpenSubscription(false)}
                    aria-labelledby="responsive-dialog-title"
                  >
                      <MailForm />
                  </Dialog>
                </Grid>
              </Grid>
            </Route>
            <Route path="/signup" exact>
              <SignUp setLogout={setLogout}/>
            </Route>
            <Route path="/signin" exact>
              <SignIn setLogout={setLogout}/>
            </Route>
            <Route path="/forgot" exact>
              <Forgot setLogout={setLogout}/>
            </Route>
            <Route path="/resetPassword/:token" exact>
              <ResetPassword setLogout={setLogout}/>
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </div>
      </Grow>
      
        </main>
          
      </div>
      
      <Footer/>
    </div>
  );
}

export default App;
