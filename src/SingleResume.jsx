import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
function SingleResume({  id, resume, index, moveCard }) {
  const ref = useRef(null);





  const [{ handlerId }, drop] = useDrop({
      accept: 'RESUME',
      collect(monitor) {
          return {
              handlerId: monitor.getHandlerId(),
          };
      },
      hover(item, monitor) {
          if (!ref.current) {
              return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          console.log("dragIndex",dragIndex)
          console.log("hoverIndex",hoverIndex)

          // Don't replace items with themselves
          if (dragIndex === hoverIndex) {
              return;
          }
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
          }
          // Time to actually perform the action
          moveCard(dragIndex, hoverIndex);
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex;
      },
  });
  const [ {isDragging} , drag] = useDrag({
    type: "RESUME",

    item: () => {
      return { id, index };
  },    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <>
      <div
        className="singleResume__container"
        style={{ opacity: isDragging ? .5 : 1 }}
        ref={ref} data-handler-id={handlerId}
      >
        <p>name: {resume.name}</p>
        <p>{resume.resume}</p>
      </div>{" "}
    </>
  );
}

export default SingleResume;
