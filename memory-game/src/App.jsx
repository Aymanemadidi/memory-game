import React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

import "./App.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [boxArr, setBoxArr] = useState(
    Array.from({ length: 16 }, (_, i) => i + 1) // 9 -12 -15 - 18
  );
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [flashedItems, setFlashedItems] = useState([]);
  const [toComapre, setToCompare] = useState([]);
  const [trys, setTrys] = useState(3);
  const [started, setStarted] = useState(false);
  const [firstRender, setFirstRender] = useState(false);

  function handleSelectBtn(i) {
    if (selectedBoxes.includes(i)) {
      const selectedCopy = [...selectedBoxes];
      const index = selectedCopy.findIndex((elem) => elem === i);
      selectedCopy.splice(index, 1);
      setSelectedBoxes([...selectedCopy]);
    } else {
      setSelectedBoxes([...selectedBoxes, i]);
      console.log(selectedBoxes);
    }
  }

  const arr = [];
  useEffect(() => {
    setFirstRender(true);
    if (arr.length < 7) {
      for (let i = 0; i < 7; i++) {
        let toPush = getRandomInt(boxArr.length);
        while (arr.includes(toPush)) {
          toPush = getRandomInt(boxArr.length);
        }
        arr.push(toPush);
      }
    }
    setToCompare(arr);
  }, []);

  function fillArr() {
    if (arr.length < 7) {
      for (let i = 0; i < 7; i++) {
        let toPush = getRandomInt(boxArr.length);
        while (arr.includes(toPush)) {
          toPush = getRandomInt(boxArr.length);
        }
        arr.push(toPush);
      }
    }
    setToCompare(arr);
    //setFlashedItems(arr);
  }

  useEffect(() => {
    // console.log("SELECTED", selectedBoxes);
    // console.log("TOCOMPARE", toComapre);
    if (selectedBoxes.length > 0) {
      // console.log("check");
      for (let i = 0; i < selectedBoxes.length; i++) {
        if (toComapre[i] !== selectedBoxes[i]) {
          console.log(false);
          alert("NOPE");
          setSelectedBoxes([]);
          return;
        }
      }
    }
    if (selectedBoxes.length === 8) {
      alert("you won");
      return;
    }
  }, [selectedBoxes, toComapre]);

  function startGame() {
    // if (trys === 3 && !firstRender) {
    //   setSelectedBoxes([]);
    //   setToCompare([]);
    //   fillArr();
    // }
    // //fillArr();
    // if (trys === 1) {
    //   setFirstRender(false);
    //   setSelectedBoxes([]);
    //   setTrys(3);
    // } else {
    //   setSelectedBoxes([]);
    //   setTrys(trys - 1);
    // }
    if (!firstRender) {
      fillArr();
    }
    setStarted(true);
    setSelectedBoxes([]);
    let i = 0;
    console.log("SYNC", toComapre);
    const flashInt = setInterval(() => {
      if (i == 8) {
        setFlashedItems([]);
        clearInterval(flashInt);
        return;
      }
      //console.log(toComapre);
      setFlashedItems([toComapre[i]]);
      i++;
    }, 1000);
    setFirstRender(false);
  }

  return (
    <div className="App text-center">
      <h1 className="text-indigo-600 text-2xl font-semibold mt-4">
        Memory Game
      </h1>
      <div className={`grid gap-5 mt-10 mx-10 grid-cols-4`}>
        {boxArr.map((b, i) => {
          return (
            <button
              className={`px-5 py-12 bg-slate-300 rounded-md text-slate-300 
              ${
                selectedBoxes.includes(i) ? "bg-slate-700 text-slate-700" : ""
              }${
                flashedItems.includes(i) ? "bg-indigo-500 text-indigo-500" : ""
              }`}
              key={b + i}
              onClick={() => handleSelectBtn(i)}
            >
              a
            </button>
          );
        })}
      </div>
      <div className="text-center mt-5 ">
        <button
          className="bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-400 disabled:bg-indigo-300"
          onClick={() => startGame()}
          //disabled={started}
        >
          Start Game
        </button>
        {/* <button
          className={`bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-400 ml-2 ${
            started ? "" : "hidden"
          }`}
          onClick={() => startGame()}
        >
          New Pattern
        </button> */}
      </div>
    </div>
  );
}

export default App;
