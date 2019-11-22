import React, { useState } from "react";
import { NewScreen, ListScreen, Nav } from "../components";

export const App = () => {
  const [screen, setScreen] = useState("main");
  const [newThing, setNewThing] = useState("");
  const [things, setThings] = useState([]);

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
    setNewThing("");
    setScreen("main");
  };

  return (
    <div>
      <Nav onClick={handleClick} screen={screen} />
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
    </div>
  );
};

export default App;
