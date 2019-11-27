import React from "react";
import formatDistance from "date-fns/formatDistance";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";

import { Title } from "../components";

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  list: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const ListScreen = props => {
  const { things, handleSubmission } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title text="When I Last" />
      <List className={classes.list}>
        {things &&
          things.map((thing, i) => (
            <React.Fragment key={i}>
              <ListItem>
                <ListItemText
                  primary={thing.description}
                  secondary={formatDistance(new Date(thing.date), new Date(), {
                    addSuffix: true,
                  })}
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
    </React.Fragment>
  );
};

export default ListScreen;
