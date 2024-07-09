const crypto = require('crypto')

const args = process.argv.slice(2)
const operation = args[0]
const numbers = args.slice(1)

function calculate(operation, ...numbers) {
    console.log(...numbers)
    switch (operation) {
        case 'add':
            return numbers.reduce((acc, num) => acc + parseFloat(num), 0)
        case 'sub':
            return numbers.reduce((acc, num) => acc - parseFloat(num))
        case 'mult':
            return numbers.reduce((acc, num) => acc * parseFloat(num), 1)
        case 'divide':
            return ` ans => ${numbers.reduce((acc, num) => acc / parseFloat(num))}`
        case 'sin':
            return Math.sin(parseFloat(numbers[0]))
        case 'cos':
            return Math.cos(parseFloat(numbers[0]))
        case 'tan':
            return Math.tan(parseFloat(numbers[0]))
        case 'random':
            if (numbers.length === 0) {
                return 'Provide length for random number generation'
            }
            const length = parseInt(numbers[0])
            return crypto.randomBytes(length).toString('')
        default:
            return "invalid operations"
    }
}

let result = calculate(operation, ...numbers)
console.log(result)
