import React, { useState, useEffect } from "react";
import localforage from "localforage";
import Drawer from "@material-ui/core/Drawer";
import {
  ActionScreen,
  NewScreen,
  ListScreen,
  Nav,
  Help,
  Settings,
} from "../components";

export const App = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [screen, setScreen] = useState("main");
  const [newThing, setNewThing] = useState("");
  const [things, setThings] = useState([]);
  const [selectedThing, setSelectedThing] = useState(null);

  useEffect(() => {
    localforage
      .getItem("things")
      .then(value => {
        value ? setThings(value) : setThings([]);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const handleMode = value => {
    setScreen(value);
  };

  const deleteThing = thing => {
    const otherThings = things.filter(x => x.description !== thing.description);
    setThings([...otherThings]);
    localforage.setItem("things", [...otherThings]).catch(err => {
      console.log(err);
    });
    setNewThing("");
  };

  const addThing = thing => {
    const description = thing.hasOwnProperty("description")
      ? thing.description
      : thing;
    const date = new Date().valueOf();
    const oldThings = things.filter(x => x.description != description);
    const newThing = { description, date };
    setThings([...oldThings, newThing]);
    localforage.setItem("things", [...oldThings, newThing]).catch(err => {
      console.log(err);
    });
    setNewThing("");
    setScreen("main");
  };

  const updateThing = (thing, updatedThing) => {
    const { description, date } = thing;
    const { description: updatedDescription, date: updatedDate } = updatedThing;
    console.log(description, updatedDescription);
    const saveDescription =
      description === updatedDescription ? description : updatedDescription;
    const saveDate = date === updatedDate ? date : updatedDate;
    const oldThings = things.filter(x => x.description != description);
    const newThing = { description: saveDescription, date: saveDate };
    console.log("old things", oldThings);
    console.log("newthing", newThing);
    setThings([...oldThings, newThing]);
    localforage.setItem("things", [...oldThings, newThing]).catch(err => {
      console.log(err);
    });
    setNewThing("");
  };

  return (
    <div>
      <Nav
        handleMode={handleMode}
        screen={screen}
        setHelpOpen={setHelpOpen}
        setSettingsOpen={setSettingsOpen}
      />
      {screen == "did" && (
        <NewScreen
          things={things}
          newThing={newThing}
          setNewThing={setNewThing}
          handleSubmission={addThing}
        />
      )}
      {screen == "main" && (
        <ListScreen
          things={things}
          handleSubmission={addThing}
          handleMode={handleMode}
          setSelectedThing={setSelectedThing}
        />
      )}
      {screen == "action" && (
        <ActionScreen
          things={things}
          selectedThing={selectedThing}
          handleSubmission={addThing}
          updateThing={updateThing}
          deleteThing={deleteThing}
          goHome={handleMode}
        />
      )}
      <Drawer open={helpOpen} onClose={() => setHelpOpen(false)}>
        {<Help />}
      </Drawer>
      <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        {<Settings />}
      </Drawer>
    </div>
  );
};

export default App;
