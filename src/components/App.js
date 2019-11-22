import React, { useState, useEffect } from "react";
import localforage from "localforage";
import Drawer from "@material-ui/core/Drawer";
import { NewScreen, ListScreen, Nav, Help, Settings } from "../components";

export const App = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [screen, setScreen] = useState("main");
  const [newThing, setNewThing] = useState("");
  const [things, setThings] = useState([]);

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

  const handleClick = value => {
    setScreen(value);
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

  return (
    <div>
      <Nav
        onClick={handleClick}
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
        <ListScreen things={things} handleSubmission={addThing} />
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
