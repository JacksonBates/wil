import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const Nav = props => {
  const { onClick, screen } = props;
  const classes = useStyles();

  const location = screen == "main" ? "did" : "main";
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Fab
          onClick={() => onClick(location)}
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
        >
          {screen == "did" && <HomeIcon />}
          {screen == "main" && <AddIcon />}
        </Fab>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
