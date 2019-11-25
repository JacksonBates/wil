import React from "react";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    paddingBottom: 50,
    minHeight: "calc(100vh - 150px)",
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const ListScreen = props => {
  const { things, handleSubmission } = props;
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text} variant="h5" gutterBottom>
        When I Last...
      </Typography>
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          {things &&
            things.map((thing, i) => (
              <React.Fragment key={i}>
                <ListItem>
                  <ListItemText
                    primary={thing.description}
                    secondary={moment(thing.date).fromNow()}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="mark done"
                      onClick={e => handleSubmission(thing)}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            ))}
        </List>
      </Paper>
    </>
  );
};

export default ListScreen;
