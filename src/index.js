function eval() {
	// Do not use eval!!!
	return;
}
let numbersArray = []
let operatorsArray = []

const priority = {
	'+': 1,
	'-': 1,
	'*': 2,
	'/': 2
}

const operations = {
	"+": (a, b) => (lastElem(operatorsArray) === "-" ? a - b : a + b),
	"-": (a, b) => (lastElem(operatorsArray) === "-" ? a + b : a - b),
	"*": (a, b) => a * b,
	"/": (a, b) => {
		if (b === 0) {
			numbersArray = []
			operatorsArray = []
			throw new TypeError("TypeError: Division by zero.")
		}
		return a / b
	}
}

function lastElem(array) {
	return array[array.length - 1]
}

function calc(numArr, operArr) {
	let b = numArr.pop()
	let a = numArr.pop()
	let res = operations[operArr.pop()](a, b)
	numArr.push(res)
}

function checkBrackets(array) {
	let openBrackets = array.filter(el => el === '(')
	let closeBrackets = array.filter(el => el === ')')
	return openBrackets.length === closeBrackets.length
}

function expressionCalculator(expr) {
	let str = expr.replace(/\s/g, '')
	let arr = str.match(/\d+|[-+*/()]/g)
	const operators = '+-*/'
	// console.log(operators.includes('+'))

	let isBracketsPaired = checkBrackets(arr)
	if (!isBracketsPaired) throw new Error("ExpressionError: Brackets must be paired")

	for (elem of arr) {
		if (!isNaN(elem)) {
			numbersArray.push(+elem)
		} else {
			if (operators.includes(elem)) {
				if (priority[elem] <= priority[lastElem(operatorsArray)]) {
					calc(numbersArray, operatorsArray)
				}
			}
			if (elem === ")") {
				while (lastElem(operatorsArray) !== "(") {
					calc(numbersArray, operatorsArray)
				}
				operatorsArray.pop()
				continue
			}
			operatorsArray.push(elem)
		}
	}
	while (numbersArray.length > 1) {
		calc(numbersArray, operatorsArray)
	}
	// console.log(numbersArray[0], numbersArray.pop())
	return numbersArray.pop()
}


// function addOperation(array) {
// 	let b = array.pop()
// 	let a = array.pop()
// 	return array.push(a + b)
// }
// function subtractOperation(array) {
// 	let b = array.pop()
// 	let a = array.pop()
// 	return array.push(a - b)
// }
// function multiplyOperation(array) {
// 	let b = array.pop()
// 	let a = array.pop()
// 	return array.push(a * b)
// }
// function divideOperation(array) {
// 	let b = array.pop()
// 	let a = array.pop()
// 	if (b === 0) {
// 		throw new TypeError('TypeError: Division by zero.')
// 	}
// 	return array.push(a / b)
// }

module.exports = {
	expressionCalculator
}