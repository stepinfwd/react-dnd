import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import SingleResume from "./SingleResume";

function Dropper({ move, newList }) {
  const ref = useRef(null);

  const [collectedProps, drop] = useDrop(() => ({
    accept: "RESUME",
    drop: (item, monitor) => {
      console.log(item);
      move(item.id);
    },
    // monitor.getDropResult(console.log("called"))
  }));
  return (
    <div ref={drop} className="dropper">
      {console.log("newlist isda", newList)}

    {newList.map((user) => (
        <div className="user"><SingleResume resume={user}></SingleResume></div>
      ))}    </div>
  );
}

export default Dropper;
