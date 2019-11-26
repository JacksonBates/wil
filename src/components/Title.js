import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
const useStyles = makeStyles(theme => ({
  appBar: {
    top: 0,
    bottom: "auto",
  },
}));

export const Title = props => {
  const { text } = props;
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>{text}</Toolbar>
    </AppBar>
  );
};

export default Title;
