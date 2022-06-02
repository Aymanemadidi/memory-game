import React from "react";
import { useState, useEffect } from "react";

import "./App.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [boxArr] = useState(
    Array.from({ length: 16 }, (_, i) => i + 1) // 9 -12 -15 - 18
  );
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [flashedItems, setFlashedItems] = useState([]);
  const [toComapre, setToCompare] = useState([]);
  const [nope, setNope] = useState(false);
  const [started, setStarted] = useState(false);
  const [enabled, setEnabled] = useState(true);
  // const [firstRender, setFirstRender] = useState(true);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    if (nope) {
      alert("Nope");
    }
  }, [nope]);

  useEffect(() => {
    let i = 0;
    let j = 0;
    const flashInt = setInterval(() => {
      if (i === 8) {
        // console.log("finished");
        setFlashedItems([]);
        const timeout = setTimeout(() => {
          if (j === 9) {
            clearInterval(flashInt);
            setNope(true);
            fillArr();
            setEnabled(true);
            console.log("cleared");
            clearInterval(timeout);
          }
          j++;
          console.log(j);
        }, 1000);
        // clearTimeout(timeout);
        return;
      }
      //console.log(toComapre);
      setFlashedItems([toComapre[i]]);
      i++;
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  function startGame() {
    if (enabled) setEnabled(false);
    if (nope) setNope(false);
    setSelectedBoxes([]);
    console.log("SYNC", toComapre);
    setStarted(!started);
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
              className={`px-5 py-12 bg-slate-300 rounded-md text-slate-900 
              ${
                selectedBoxes.includes(i) ? "bg-slate-700 text-slate-700" : ""
              }${
                flashedItems.includes(i) ? "bg-indigo-500 text-indigo-500" : ""
              }`}
              key={b + i}
              onClick={() => handleSelectBtn(i)}
            >
              {b - 1}
            </button>
          );
        })}
      </div>
      <div className="text-center mt-5 ">
        <button
          className="bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-400 disabled:bg-indigo-300"
          onClick={() => startGame()}
          disabled={!enabled}
        >
          Start Game
        </button>
        <p>{`time left 10 seconds`}</p>
      </div>
    </div>
  );
}

export default App;
