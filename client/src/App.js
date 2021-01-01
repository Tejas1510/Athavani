import logo from './logo.svg';
import react, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grid, Grow } from '@material-ui/core';
import memories from './Images/memories.png'
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import MailForm from './components/MailForm/MailForm';

function App() {

  const classes = useStyles();

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h4" align="center">Memories</Typography>
        <img className={classes.image} height="50" src={memories} ></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <MailForm />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
