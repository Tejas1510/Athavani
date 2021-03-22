import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {Avatar} from "@material-ui/core";
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: "2rem",
    position: "relative",
    paddingLeft: "3rem"
  },
  avt: {
    marginRight: "0.5rem",
    left: "-0.04rem",
    position: "absolute",
  }
}));

export default function AvatarButtons(props) {
  const classes = useStyles();
  
  return (
    <>
      <Button onClick={props.onClick} variant={props.variant} color={props.color} className={clsx(classes.button,props.styling)} size={props.size} fullWidth={props.fullWidth} type={props.type}>
        <Avatar
          style={{
            color: props.color ,
            backgroundColor:"white"
          }}
          className={classes.avt}
        >
          <props.displayicon/>
        </Avatar>
        {props.children}
      </Button>
    </>
  );
}
