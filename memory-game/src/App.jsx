/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { generateTen, checkIfArrayInside, arrayEquals } from "./utils";

import "./App.css";

function App() {
	const [boxArr, setBoxArr] = useState(
		Array.from({ length: 8 }, (_, i) => i + 1) // 9 -12 -15 - 18
	);
	const [selectedBoxes, setSelectedBoxes] = useState([]);
	const [toFlashItem, setToFlashItem] = useState(null);
	const [flashedItems, setFlashedItems] = useState([150]);
	const [winItems, setWinItems] = useState([]);
	const [gameWon, setGameWon] = useState(false);
	const [level, setLevel] = useState(5);
	const [gridCols, setGridCols] = useState("grid-cols-4");
	const [counter, setCounter] = useState(15);
	const timer = useRef(null);

	function handleSelectBtn(i) {
		if (selectedBoxes.includes(i)) {
			const selectedCopy = [...selectedBoxes];
			const index = selectedCopy.findIndex((elem) => elem === i);
			selectedCopy.splice(index, 1);
			setSelectedBoxes([...selectedCopy]);
		} else {
			setSelectedBoxes([...selectedBoxes, i]);
		}
	}

	function handleLevelChange(e) {
		setLevel(Number(e.target.value));
	}

	function startGame() {
		setSelectedBoxes([]);
		setWinItems([]);
		let toFlashArr = generateTen(boxArr.length);
		let i = 0;
		let tempArr = [];
		let interval = setInterval(() => {
			setToFlashItem(toFlashArr[i]);
			tempArr.push(toFlashArr[i]);
			i++;
			if (i == level) {
				tempArr.pop();
				setFlashedItems(tempArr);
				setGameWon(false);
				clearInterval(interval);
				setToFlashItem(null);
			}
		}, 500);
		setCounter(15);
	}

	useEffect(() => {
		if (flashedItems.length > 1 && toFlashItem === null) {
			let i = 0;
			timer.current = setInterval(() => {
				i++;
				console.log(i);
				setCounter(counter - 1);
				if (counter == 0) {
					alert("You Lost!");
					setCounter(15);
					setSelectedBoxes(Array.from(Array(40).keys()));
					setFlashedItems([150]);
				}
			}, 1000);
		}
		return () => clearInterval(timer.current);
	}, [counter, flashedItems, toFlashItem]);

	useEffect(() => {
		console.log("I enter check effect");
		if (arrayEquals(flashedItems, selectedBoxes)) {
			if (level === 9) {
				alert("You Finished the game What a LEGEND!!!");
			} else {
				alert(`You won! You finished on ${counter} seconds`);
			}
			setGameWon(true);
			setCounter(15);
			setSelectedBoxes([]);
			setFlashedItems([150]);
			if (level === 6) {
				setGridCols("grid-cols-6");
			} else if (level === 7) {
				setGridCols("grid-cols-8");
			} else if (level === 8) {
				setGridCols("grid-cols-10");
			} else if (level === 9) {
				setGridCols("grid-cols-12");
			}
			if (boxArr.length < 36) {
				setBoxArr(() =>
					Array.from({ length: boxArr.length + 8 }, (_, i) => i + 1)
				);
			}
			if (level < 9) {
				setLevel(level + 1);
			}
		} else if (
			!checkIfArrayInside(flashedItems, selectedBoxes) &&
			selectedBoxes.length < 15
		) {
			console.log(timer.current);
			clearInterval(timer.current);
			alert("Wrong case... You Lost!");
			setSelectedBoxes(Array.from(Array(40).keys()));
			setFlashedItems([150]);
		}
	}, [boxArr.length, counter, flashedItems, level, selectedBoxes]);

	return (
		<div className="App text-center">
			<h1 className="text-indigo-600 text-2xl font-semibold mt-4">
				Memory Game
			</h1>
			<div className="difficulty-select">
				<select
					name="difficulty"
					id="difficulty"
					className="mt-2 font-semibold"
					onChange={handleLevelChange}
					value={level}
					disabled
				>
					<option className="font-semibold" value="5">
						Level 1
					</option>
					<option className="font-semibold" value="6">
						Level 2
					</option>
					<option className="font-semibold" value="7">
						Level 3
					</option>
					<option className="font-semibold" value="8">
						Level 4
					</option>
					<option className="font-semibold" value="9">
						The Final
					</option>
				</select>
			</div>
			<div className={`grid gap-5 mt-10 mx-10 ${gridCols}`}>
				{boxArr.map((box, i) => {
					return (
						<button
							className={`px-3 py-7 bg-slate-300 rounded-md text-slate-900 
              ${selectedBoxes.includes(i) ? "bg-slate-700 text-slate-700" : ""}
              ${toFlashItem == i ? "bg-indigo-500 text-indigo-500" : ""}
              ${winItems.includes(i) ? "bg-green-500 text-green-500" : ""}
              
              `}
							key={box + i}
							onClick={() => handleSelectBtn(i)}
							disabled={selectedBoxes.includes(i)}
						>
							{box - 1}
						</button>
					);
				})}
			</div>
			<div className="text-center mt-5 ">
				<button
					className="bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-400 disabled:bg-indigo-300"
					onClick={() => startGame()}
					disabled={!(toFlashItem === null)}
				>
					Start Game
				</button>
				<p className="mt-3 font-semibold">
					time left: <span className="text-red-600">{counter} seconds</span>
				</p>
			</div>
		</div>
	);
}

export default App;
