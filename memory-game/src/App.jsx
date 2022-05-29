import React from "react";
import { useState } from "react";

import "./App.css";

function App() {
  const [boxArr, setBoxArr] = useState(
    Array.from({ length: 18 }, (_, i) => i + 1)
  );
  const [selectedBoxes, setSelectedBoxes] = useState([]);

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
    // console.log("i", i);
    // const arrCopy = [...selectedBoxes];
    // if (arrCopy.includes(i)) {
    //   const index = arrCopy.findIndex(() => i);
    //   arrCopy.splice(index, 1);
    //   console.log(arrCopy);
    // }
  }

  return (
    <div className="App text-center">
      <h1 className="text-indigo-600 text-2xl font-semibold">Hello from App</h1>
      <div className="grid gap-5 mt-10 mx-10 grid-cols-3">
        {boxArr.map((b, i) => {
          return (
            <button
              className={`px-5 py-12 bg-slate-300 rounded-md text-slate-900 
              ${selectedBoxes.includes(i) ? "bg-slate-700" : ""}`}
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
