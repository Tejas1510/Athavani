// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, AppBar, Typography, Grid, Grow, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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

function App() {

  let history = useHistory();
  toast.configure();

  const classes = useStyles();

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [userImg, setUserImg] = useState("");

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
    }
}, []);

  const [logout, setLogout] = useState(true);

  function logoutHandle() {
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
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" style={{background: "radial-gradient(orange 40%,transparent)"}} color="inherit">
        <Typography className={classes.heading} variant="h4" align="center">Memories</Typography>
        <img className={classes.image} height="50" src={memories} alt="Memories"></img>
        {logout && (
          <>
            <img className={classes.menuIcon} height="50" src={userImg} alt="Memories" onClick={() => toggleMenu()}></img>
        <div className={classes.menuBox} id="menuBox">
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
                  <h1 style={{margin: "0"}} onClick={() => logoutHandle()}>
                      Logout
                  </h1>
              </li>
            </ul>
          </div>
          </>
        )}
      </AppBar>
      <Grow in>
        <Container>
          <Switch>
            <Route path="/" exact>
              <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                  <MailForm />
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
        </Container>
      </Grow>
    </Container>
    <Footer/>
    </div>
  );
}

export default App;
