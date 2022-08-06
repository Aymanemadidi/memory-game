/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect, useRef } from "react";

import "./App.css";

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function generateTen(len) {
	let result = [];
	let temp;
	for (let i = 0; i < len - 2; i++) {
		temp = getRandomInt(len);
		while (result.includes(temp)) {
			temp = getRandomInt(len);
		}
		result.push(temp);
	}
	return result;
}

function checkIfArrayInside(arr1, arr2) {
	for (let i = 0; i < arr2.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}
	return true;
}

function App() {
	const [boxArr, setBoxArr] = useState(
		() => Array.from({ length: 8 }, (_, i) => i + 1) // 9 -12 -15 - 18
	);
	const [selectedBoxes, setSelectedBoxes] = useState([]);
	const [toFlashItem, setToFlashItem] = useState(null);
	const [flashedItems, setFlashedItems] = useState([150]);
	const [winItems, setWinItems] = useState([]);
	const [gameWon, setGameWon] = useState(false);
	const [level, setLevel] = useState(5);
	const timer = useRef(null);

	function arrayEquals(a, b) {
		return (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val === b[index])
		);
	}

	function handleSelectBtn(i) {
		if (selectedBoxes.includes(i)) {
			const selectedCopy = [...selectedBoxes];
			const index = selectedCopy.findIndex((elem) => elem === i);
			selectedCopy.splice(index, 1);
			setSelectedBoxes([...selectedCopy]);
		} else {
			setSelectedBoxes([...selectedBoxes, i]);
			// console.log(selectedBoxes);
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
	}

	useEffect(() => {
		if (flashedItems.length > 1) {
			let i = 0;
			timer.current = setInterval(() => {
				i++;
				console.log(i);
				if (i == 15) {
					alert("You Lost!");
					setSelectedBoxes(Array.from(Array(40).keys()));
					setFlashedItems([150]);
				}
			}, 1000);
			// if (
			// 	!checkIfArrayInside(flashedItems, selectedBoxes) &&
			// 	selectedBoxes.length < 13
			// ) {
			// 	// console.log("when clearing", gameTimer);
			// 	clearTimeout(timer.current);
			// 	alert("Wrong case... You Lost!");
			// }
		}
		return () => clearInterval(timer.current);
	}, [flashedItems]);

	useEffect(() => {
		console.log("I enter check effect");
		if (arrayEquals(flashedItems, selectedBoxes)) {
			alert("You Won!");
			setWinItems(selectedBoxes);
			setGameWon(true);
			setSelectedBoxes([]);
			setFlashedItems([150]);
			setBoxArr(() =>
				Array.from({ length: boxArr.length + 8 }, (_, i) => i + 1)
			);
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
	}, [boxArr.length, flashedItems, level, selectedBoxes]);

	return (
		<div className="App text-center">
			<h1 className="text-indigo-600 text-2xl font-semibold mt-4">
				Memory Game
			</h1>
			<div className="difficulty-select">
				<select
					name="difficulty"
					id="difficulty"
					className="mt-2"
					onChange={handleLevelChange}
					value={level}
				>
					<option value="5">Level 1</option>
					<option value="6">Level 2</option>
					<option value="7">Level 3</option>
					<option value="8">Level 4</option>
					<option value="9">Level 5</option>
				</select>
			</div>
			<div
				className={`grid gap-5 mt-10 mx-10 grid-cols-${
					boxArr.length <= 16
						? 4
						: boxArr.length <= 24
						? 6
						: boxArr.length <= 42
						? 8
						: 12
				}`}
			>
				{boxArr.map((box, i) => {
					return (
						<button
							className={`px-3 py-10 bg-slate-300 rounded-md text-slate-900 
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
				{/* <p>{`time left ${counter} seconds`}</p> */}
			</div>
		</div>
	);
}

export default App;
