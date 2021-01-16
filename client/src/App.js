// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
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

function App() {

  let history = useHistory();
  toast.configure();

  const classes = useStyles();

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      toast.info("Login before accesing home page!");
      history.push('/signin');
    }
  },[])

  const [logout, setLogout] = useState(true);

  function logoutHandle() {
    localStorage.removeItem('token');
    history.push('/signin');
    toast.success('Logged out successfully.');
  }

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" style={{background: "radial-gradient(orange 40%,transparent)"}} color="inherit">
        <Typography className={classes.heading} variant="h4" align="center">Memories</Typography>
        <img className={classes.image} height="50" src={memories} alt="Memories"></img>
        {
          logout &&
          <Button className={classes.logout}
            onClick={logoutHandle}
          >Logout&nbsp;<ExitToAppIcon /></Button>
        }
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
          </Switch>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
