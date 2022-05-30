import React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

import "./App.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [boxArr, setBoxArr] = useState(
    Array.from({ length: 9 }, (_, i) => i + 1) // 9 -12 -15 - 18
  );
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [flashedItems, setFlashedItems] = useState([]);
  const [toComapre, setToCompare] = useState([]);

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
    if (arr.length < 3) {
      for (let i = 0; i < 3; i++) {
        arr.push(getRandomInt(boxArr.length));
      }
    }
    setToCompare(arr);
    console.log(arr);
  }, []);

  useEffect(() => {
    let i = 0;
    const flashInt = setInterval(() => {
      if (i == 4) {
        setFlashedItems([]);
        clearInterval(flashInt);
        return;
      }
      setFlashedItems([arr[i]]);
      // setToCompare([i + 1]);
      i++;
    }, 1000);
    return () => {
      clearInterval(flashInt);
    };
  }, [setFlashedItems]);

  return (
    <div className="App text-center">
      <h1 className="text-indigo-600 text-2xl font-semibold">Hello from App</h1>
      <div className={`grid gap-5 mt-10 mx-10 grid-cols-${boxArr.length / 3}`}>
        {boxArr.map((b, i) => {
          return (
            <button
              className={`px-5 py-12 bg-slate-300 rounded-md text-slate-900 
              ${selectedBoxes.includes(i) ? "bg-slate-700" : ""}${
                flashedItems.includes(i) ? "bg-indigo-500" : ""
              }`}
              key={b + i}
              onClick={() => handleSelectBtn(i)}
            >
              a
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
