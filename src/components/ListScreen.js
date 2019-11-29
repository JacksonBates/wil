import React from "react";
import { formatDistance, isToday } from "date-fns";
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
  const { things, handleSubmission, handleMode, setSelectedThing } = props;
  const classes = useStyles();

  const handleItemClick = thing => {
    setSelectedThing(thing);
    handleMode("action");
  };

  return (
    <React.Fragment>
      <Title text="When I Last" />
      <List className={classes.list}>
        {things &&
          things.map((thing, i) => (
            <React.Fragment key={i}>
              <ListItem button onClick={() => handleItemClick(thing)}>
                <ListItemText
                  primary={thing.description}
                  secondary={
                    isToday(thing.date)
                      ? "Today"
                      : formatDistance(new Date(thing.date), new Date(), {
                          addSuffix: true,
                        })
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
      </List>
    </React.Fragment>
  );
};

export default ListScreen;
