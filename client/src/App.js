// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, AppBar, Typography, Grid, Grow } from '@material-ui/core';
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

  toast.configure();

  const classes = useStyles();

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])


  return (
    <Router>
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" style={{background: "radial-gradient(orange 40%,transparent)"}} color="inherit">
          <Typography className={classes.heading} variant="h4" align="center">Memories</Typography>
          <img className={classes.image} height="50" src={memories} alt="Memories"></img>
        </AppBar>
        <Grow in>
          <Container>
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
              <SignUp />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
          </Container>
        </Grow>
      </Container>
    </Router>
  );
}

export default App;
