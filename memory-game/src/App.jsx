import React from "react";

import "./App.css";

function App() {
  let boxArr = Array(6).fill(Math.random);

  return (
    <div className="App text-center">
      <h1 className="text-indigo-600 text-2xl font-semibold">Hello from App</h1>
      <div className="grid gap-3 grid-flow-col mt-10">
        {boxArr.map((b, i) => {
          return (
            <button className="p-5 bg-slate-900 rounded-md" key={b + i}>
              a
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
