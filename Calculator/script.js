// Calculator state variables
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

// DOM elements
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

// Update display function
function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${getOperationSymbol(operation)}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

// Get operation symbol for display
function getOperationSymbol(operation) {
    switch(operation) {
        case '+': return '+';
        case '-': return '-';
        case '*': return '×';
        case '/': return '÷';
        default: return '';
    }
}

// Append number function
function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    
    // Prevent multiple decimal points
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Prevent leading zeros (except for decimal numbers)
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    
    updateDisplay();
}

// Append decimal function
function appendDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0';
        shouldResetScreen = false;
    }
    
    if (currentOperand.includes('.')) return;
    
    if (currentOperand === '') {
        currentOperand = '0';
    }
    
    currentOperand += '.';
    updateDisplay();
}

// Append operator function
function appendOperator(operator) {
    if (currentOperand === '') return;
    
    if (previousOperand !== '') {
        calculate();
    }
    
    operation = operator;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

// Calculate function
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

// Clear all function
function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    shouldResetScreen = false;
    updateDisplay();
}

// Delete last character function
function deleteLast() {
    if (shouldResetScreen) return;
    
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    
    updateDisplay();
}

// Keyboard event listeners
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Number keys (0-9)
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    }
    
    // Decimal point
    if (key === '.') {
        appendDecimal();
    }
    
    // Operators
    if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    }
    
    // Enter key for calculation
    if (key === 'Enter' || key === '=') {
        calculate();
    }
    
    // Backspace for delete
    if (key === 'Backspace') {
        deleteLast();
    }
    
    // Escape for clear
    if (key === 'Escape') {
        clearAll();
    }
});

// Initialize display
updateDisplay();
