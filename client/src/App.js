// import logo from './logo.svg';
import React, { Suspense, useState, useEffect } from "react";
import {
  Switch,
  Route,
  useHistory,
  BrowserRouter as Router,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AppBar,
  Typography,
  Grid,
  Grow,
  Dialog,
  CircularProgress,
} from "@material-ui/core";
import memories from "./Images/memories.png";
import Form from "./components/Form/Form";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import MailForm from "./components/MailForm/MailForm";
import Error404 from "./components/404/Error404";
import * as api from "./api/index";
import Footer from "./components/Footer/Footer";
import noProfilePhoto from "./assets/noProfilePhoto.jpg";
import { SignOutGoogle } from "../src/components/Auth/gapiFrontend";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";

// material ui icons
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";

// material ui styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

// material ui components
import Toolbar from "@material-ui/core/Toolbar";
import Sidebar from "./components/Sidebar/sidebar.component";

//Lazy Loading.
const SignUp = React.lazy(() => import("./components/Auth/SignUp/SignUp"));
const SignIn = React.lazy(() => import("./components/Auth/SignIn/SignIn"));
const Forgot = React.lazy(() => import("./components/Auth/Forgot/Forgot"));
const ResetPassword = React.lazy(() =>
  import("./components/Auth/ResetPassword/ResetPassword")
);
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Posts = React.lazy(() => import("./components/Posts/Posts"));
const PrivateRoutes = React.lazy(() =>
  import("./components/Auth/PrivateRoutes")
);

const drawerWidth = 240;

const useStyl = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: "radial-gradient(orange 100%,transparent)",
    color: "black",
  },
  drawer: {
    minHeight: "100vh",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageName, setPageName] = useState("Home");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname === "/") {
      toast.info("Login before accesing home page!");
      history.push("/signin");
    }
  }, [history]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.verify({
          token: localStorage.getItem("token"),
        });
        const response = await api.getProfileById(data.id);
        setUserImg(response.data.user.img);
      } catch (error) {
        console.log(error);
        setUserImg(noProfilePhoto);
      }
    })();
  }, []);

  const [logout, setLogout] = useState(true);

  function logoutHandle() {
    SignOutGoogle(); //this is called when the user signs out from our website
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/signin");
    toast.success("Logged out successfully.");
  }

  // const toggleMenu = () => {
  //   document.querySelector("#menuBox").classList.toggle("active");
  // };

  return (
    <div>
      {!logout && (
        <AppBar
          className={classes.appBar}
          position="fixed"
          style={{ background: "#fff" }}
          color="inherit"
        >
          {logout && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classs.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            className={classes.heading}
            variant="h4"
            style={{ textAlign: "left" }}
          >
            Memories
          </Typography>
          <img
            className={classes.image}
            height="20"
            src={memories}
            alt="Memories"
          ></img>
        </AppBar>
      )}
      <div className={classs.root}>
        <CssBaseline />
        {logout && (
          <nav className={classs.drawer}>
            <AppBar
              position="fixed"
              className={classs.appBar}
              style={{ display: "flex", flexDirection: "row" }}
            >
              {logout && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classs.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Toolbar>
                <Typography variant="h6" noWrap>
                  {pageName}
                </Typography>
              </Toolbar>
            </AppBar>
            <Sidebar
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              setPageName={setPageName}
              setOpenCreatePost={setOpenCreatePost}
              setOpenSubscription={setOpenSubscription}
              logoutHandle={logoutHandle}
            />
          </nav>
        )}
        <main className={classs.content}>
          <div className={classs.toolbar} />
          <Grow in>
            <div>
              <Suspense fallback={<CircularProgress />}>
                <Router>
                  <Switch>
                    <PrivateRoutes path="/" exact>
                      <Grid
                        container
                        className={classes.mainContainer}
                        justify="space-between"
                        alignItems="stretch"
                        spacing={3}
                      >
                        <Grid item xs={12} sm={12}>
                          <Posts
                            setCurrentId={setCurrentId}
                            setOpenCreatePost={setOpenCreatePost}
                          />
                        </Grid>
                      </Grid>
                    </PrivateRoutes>
                    <Route path="/signup" exact>
                      <SignUp setLogout={setLogout} />
                    </Route>
                    <Route path="/signin" exact>
                      <SignIn setLogout={setLogout} />
                    </Route>
                    <Route path="/forgot" exact>
                      <Forgot setLogout={setLogout} />
                    </Route>
                    <Route path="/resetPassword/:token" exact>
                      <ResetPassword setLogout={setLogout} />
                    </Route>
                    <PrivateRoutes path="/profile" exact>
                      <Profile />
                    </PrivateRoutes>
                    <Route component={Error404} />
                  </Switch>
                </Router>
              </Suspense>
            </div>
          </Grow>
        </main>
        <Dialog
          fullWidth={false}
          open={openCreatePost}
          maxWidth="xs"
          onClose={() => setOpenCreatePost(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <div
            style={{
              background: "#gray",
              padding: "40px 20px 20px",
              backgroundColor: "white",
            }}
          >
            <CloseIcon
              onClick={() => setOpenCreatePost(false)}
              style={{
                fontSize: "2em",
                position: "absolute",
                right: "5px",
                top: "5px",
                cursor: "pointer",
              }}
            />
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              setOpenCreatePost={setOpenCreatePost}
            />
          </div>
        </Dialog>
        <Dialog
          fullWidth={true}
          open={OpenSubscription}
          maxWidth="sm"
          onClose={() => setOpenSubscription(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <CloseIcon
            onClick={() => setOpenSubscription(false)}
            style={{
              fontSize: "2em",
              position: "absolute",
              right: "5px",
              top: "5px",
              cursor: "pointer",
            }}
          />
          <MailForm />
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}

export default App;
