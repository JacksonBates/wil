import React, { useState } from "react";
import { formatDistance, isToday } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: "80%",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export const ActionScreen = props => {
  const { selectedThing: thing, updateThing } = props;
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState(thing.date);
  const [description, setDescription] = useState(thing.description);

  const handleEditButton = () => {
    if (editMode) {
      setEditMode(false);
      setDate(thing.date);
      setDescription(thing.description);
    } else {
      setEditMode(true);
    }
  };

  const handleCompleteButton = () => {
    if (editMode) {
      setEditMode(false);
      props.goHome("main");
      updateThing(thing, { description, date: date.valueOf() });
    } else {
      setEditMode(true);
    }
  };

  return (
    <React.Fragment>
      <pre>{JSON.stringify(thing, null, 2)}</pre>
      {!editMode && (
        <>
          <p>{description}</p>
          <p>
            {isToday(date)
              ? "Today"
              : formatDistance(new Date(date), new Date(), {
                  addSuffix: true,
                })}
          </p>
        </>
      )}
      {editMode && (
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Edit the date"
              format="MM/dd/yyyy"
              value={date}
              onChange={value => setDate(value)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </form>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCompleteButton}
        className={classes.button}
        endIcon={<DoneIcon />}
      >
        {editMode ? "Save Details" : "Completed Now"}
      </Button>

      <Button
        variant="contained"
        color={editMode ? "secondary" : "primary"}
        className={classes.button}
        onClick={handleEditButton}
        endIcon={<EditIcon />}
      >
        {editMode ? "Cancel Edit" : "Edit Details"}
      </Button>

      {!editMode && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<DeleteIcon />}
        >
          Delete Task
        </Button>
      )}
    </React.Fragment>
  );
};

export default ActionScreen;
