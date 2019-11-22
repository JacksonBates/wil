import React from "react";

export const NewScreen = props => {
  const { handleSubmission, newThing, setNewThing } = props;

  return (
    <main>
      Add a thing:
      <input
        type="text"
        value={newThing}
        onChange={e => setNewThing(e.target.value)}
        onKeyDown={e => {
          if (e.key == "Enter") {
            handleSubmission(newThing);
          }
        }}
      />
      <input
        type="submit"
        value="YEEEEEET"
        onClick={e => handleSubmission(newThing)}
      />
    </main>
  );
};

export default NewScreen;
