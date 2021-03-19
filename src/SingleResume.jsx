import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
function SingleResume({ item, index, resume, move }) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "RESUME",
  });


  const [ {isDragging} , drag] = useDrag({
    type: "RESUME",

    item: { type: "RESUME", ...item,id:resume.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  drag(drop(ref));
  return (
    <>
      <div
        className="singleResume__container"
        ref={ref}
        style={{ opacity: isDragging ? .5 : 1 }}
      >
        <p>name: {resume.name}</p>
        <p>{resume.resume}</p>
      </div>{" "}
    </>
  );
}

export default SingleResume;
