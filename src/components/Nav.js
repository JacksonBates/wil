import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
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
  grow: {
    flexGrow: 1,
  },
}));

export const Nav = props => {
  const { onClick, screen, setHelpOpen, setSettingsOpen } = props;
  const classes = useStyles();

  const location = screen == "main" ? "did" : "main";
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={e => setHelpOpen(true)} edge="end" color="inherit">
          <HelpIcon />
        </IconButton>
        <Fab
          onClick={() => onClick(location)}
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
        >
          {screen == "did" && <HomeIcon />}
          {screen == "main" && <AddIcon />}
        </Fab>
        <div className={classes.grow} />
        <IconButton
          onClick={e => setSettingsOpen(true)}
          edge="end"
          color="inherit"
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
