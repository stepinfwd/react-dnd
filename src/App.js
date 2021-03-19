import "./App.css";
import React, { useState, useEffect } from "react";

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

  // const move = (_id) => {
  //   const res = resume.filter((res, i) => res.id === _id);
  //   console.log("res",resume, res);
  //   // {resume.map((res)=>console.log("hi",res))}
  //   console.log("moved", res, _id);

  //   // setnewList([res[0]],()=>{    console.log("newlist", newList);
  //   // code to update newly dragged item to resume-droppable-container
  //   const arr = [];
  //   newList.forEach((item) => {
  //     arr.push(item);
  //   });
  //  arr.push(res[0])
  //  console.log("arr>>",arr,newList)
  //   setnewList([...arr]);
    
  // };
  const bkp=newList;
  const move = (_id) => {
    const res = resume.find((res, i) => res.id === _id);
    console.log("res",resume, res);   
    console.log("moved", res, _id);
    const arr = [];
    // newList.forEach((item) => {
    //   arr.push(item);
    // });
    res &&   bkp.push(res)
   console.log("arr>>",arr,newList)
    setnewList([...bkp]);
    
  };
  // const moveResume = (
  //   source,
  //   destination,
  //   droppableSource,
  //   droppableDestination
  // ) => {
  //   const sourceClone = Array.from(source);
  //   const destClone = Array.from(destination);
  //   const [removed] = sourceClone.splice(droppableSource.index, 1);
  //   destClone.splice(droppableDestination.index, 0, removed);
  //   const result = {};
  //   result[droppableSource.droppableId] = sourceClone;
  //   result[droppableDestination.droppableId] = destClone;
  //   return result;
  // };
  console.group("new",newList)
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="resume-sidebar">
          {resume.map((item, index) => (
            <SingleResume key={index} resume={item} />
          ))}
        </div>
        <div className="resume-main">
          <Dropper move={move} newList={newList} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
