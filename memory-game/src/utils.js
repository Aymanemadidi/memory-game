/* eslint-disable no-unused-vars */
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function generateTen(len) {
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

export function checkIfArrayInside(arr1, arr2) {
	for (let i = 0; i < arr2.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}
	return true;
}

export function arrayEquals(a, b) {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => val === b[index])
	);
}
