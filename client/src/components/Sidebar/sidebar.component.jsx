import React from 'react';
import { Link } from 'react-router-dom';

// memories image
import memories from '../../Images/memories.png';

// material ui components
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Hidden,
  Typography,

} from '@material-ui/core';

// material-ui styles
import { makeStyles, useTheme } from '@material-ui/core/styles';

// material ui icons
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import CardMembershipOutlinedIcon from "@material-ui/icons/CardMembershipOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const drawerWidth = 240;

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px auto",
  },
  image: {
    marginLeft: "10px",
    borderRadius: "0"
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: "bold",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  drawerPaper: {
    height: "100%",
    width: drawerWidth,
    zIndex: "1",
    top: "0",
    bottom: "0",
    left: "0",
    position: "fixed",
    background: "radial-gradient(orange 100%,transparent)",
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset",
  },
  listItem: {
    width: "90%",
    margin: "15px auto 0",
    padding: "10px auto",
    borderRadius: "10px",
    "&:hover,&:focus": {
      borderRadius: "10px",
      color: "white",
      background: "#f50057",
    },
  },

}));


const Sidebar = (props) => {

  const classes = useStyle();
  const theme = useTheme();

  return (
    <div>
      <Hidden smUp implementation="css">
        <Drawer
          container={window.document.body}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}

        >
          <div>
            <List
              className={classes.list}
            >
              <div className={classes.logo}>
                <Typography className={classes.heading} >Memories</Typography>
                <Avatar
                  src={memories}
                  alt="memories_logo"
                  className={classes.image}
                />
              </div>

              <Divider />

              <ListItem button component={Link} to="/" onClick={() => {
                props.setPageName("Home")
              }}>
                <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem button onClick={() => {
                props.setOpenCreatePost(true)
              }}>
                <ListItemIcon><PostAddOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Create Post" />
              </ListItem>

              <ListItem button component={Link} to="/profile" onClick={() => {
                props.setPageName("Profile")
              }}>
                <ListItemIcon><PersonOutlineOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>

              <ListItem button onClick={() => {
                props.setOpenSubscription(true)
              }}>
                <ListItemIcon><CardMembershipOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Subscribe" />
              </ListItem>

              <ListItem button onClick={() => props.logoutHandle()}>
                <ListItemIcon><ExitToAppOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>

            </List>
          </div>
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          <div>

            <List
              className={classes.list}
            >
              <div className={classes.logo}>
                <Typography className={classes.heading}>Memories</Typography>
                <Avatar
                  src={memories}
                  alt="memories_logo"
                  className={classes.image}
                />
              </div>

              <Divider />

              <ListItem
                button
                className={classes.listItem}
                component={Link}
                to="/"
                onClick={() => {
                  props.setPageName("Home")
                }}>
                <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem
                button
                className={classes.listItem}
                onClick={() => {
                  props.setOpenCreatePost(true)
                }}>
                <ListItemIcon><PostAddOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Create Memory" />
              </ListItem>

              <ListItem
                button
                className={classes.listItem}
                component={Link}
                to="/profile"
                onClick={() => {
                  props.setPageName("Profile")
                }}>
                <ListItemIcon><PersonOutlineOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>

              <ListItem
                button
                className={classes.listItem}
                onClick={() => {
                  props.setOpenSubscription(true)
                }}>
                <ListItemIcon><CardMembershipOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Subscribe" />
              </ListItem>

              <ListItem
                button
                className={classes.listItem}
                onClick={() => props.logoutHandle()}>
                <ListItemIcon><ExitToAppOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>

            </List>
          </div>
        </Drawer>
      </Hidden>

    </div>
  );
}
export default Sidebar;

