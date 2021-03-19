import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import update from "immutability-helper";

import SingleResume from "./SingleResume";
import { initialData } from "./data";
import Dropper from "./Dropper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [resume, setResume] = useState(initialData.record);
  const [newList, setnewList] = useState([
    {
      id: "1",
      name: "Patricia",
      resume: "https://resume-resource.com/before-after/ba-ex10.pdf",
    },
    {
      id: "2",

      name: "Lee",
      resume: "https://resume-resource.com/pdf/extec18.pdf",
    },
  ]);

  const bkp = newList;
  const move = (_id) => {
    const res = resume.find((res, i) => res.id === _id);
    console.log("res", resume, res);
    console.log("moved", res, _id);
    const arr = [];
    // newList.forEach((item) => {
    //   arr.push(item);
    // });
    res && bkp.push(res);
    console.log("arr>>", arr, newList);
    setnewList([...bkp]);
  };
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = resume[dragIndex];
      setResume(
        update(resume, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [resume]
  );
  console.group("new", newList);
  const renderCard = (card, index) => {
    return (<SingleResume key={card.id} index={index} id={card.id} resume={card} moveCard={moveCard}/>);
};
// return (<>
// <div style={style}></div>
// </>);
// }
// };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="resume-sidebar">
          {resume.map((item, index) => (
            // <SingleResume
            //   index={index}
            //   resume={item}
            //   moveCard={moveCard}
            // />
           renderCard(item, index)
          ))}
        </div>
        <div className="resume-main">
          <Dropper move={move} newList={newList} moveCard={moveCard} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
