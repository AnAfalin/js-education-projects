const inputElement = document.getElementById('operation');
const strCalculationsElement = document.getElementById('strCalculations');

let firstNumber = 0;
let secondNumber = 0;
let strCalculations = '';
let action = ''
let result = 0;
let isPercent = false;

for (let number = 0; number <= 9; number++) {
    document.getElementById(`${number}`).onclick = () => {
        inputElement.value = inputElement.value == 0 ? number : `${inputElement.value}${number}`;
    }
}

document.getElementById('plus').onclick = () => clickBtn('+');
document.getElementById('minus').onclick = () => clickBtn('-');
document.getElementById('multiply').onclick = () => clickBtn('*');
document.getElementById('divide').onclick = () => clickBtn('/');
document.getElementById('degree').onclick = () => clickBtn('^');

document.getElementById('cleanAll').onclick = () => {
    setNewInputElementValue('');
    firstNumber = 0;
    strCalculations = '';
    strCalculationsElement.innerHTML = strCalculations;
}

document.getElementById('cleanInput').onclick = () => {
    setNewInputElementValue('');
}

document.getElementById('backspace').onclick = () => {
    let result = inputElement.value.slice(0, inputElement.value.length - 1);
    inputElement.value = result.length === 0 ? 0 : result;
}

document.getElementById('opposite').onclick = () => {
    firstNumber = inputElement.value;
    inputElement.value = `${firstNumber / -1}`
    inputElement.focus();
}

document.getElementById('squared').onclick = () => {
    createAndSaveStrHistoryCalculations('', '^ 2 =');
    let result = Math.pow(firstNumber, 2);
    setNewInputElementValue(result);
}

document.getElementById('sqrt').onclick = () => {
    firstNumber = inputElement.value;
    createAndSaveStrHistoryCalculations('&#8730;', '=');
    let result = Math.sqrt(firstNumber);
    setNewInputElementValue(result);
}

document.getElementById('percent').onclick = () => {
    if (firstNumber === 0) {
        return;
    }
    isPercent = true;
    calc();
}

document.getElementById('calculate').onclick = calc;

function clickBtn(typeAction) {
    action = typeAction;
    firstNumber = inputElement.value;
    createAndSaveStrHistoryCalculations('', typeAction);
    inputElement.value = '';
    inputElement.focus();
}

function createAndSaveStrHistoryCalculations(startAppendStr, endAppendStr) {
    strCalculations = `${startAppendStr} ${firstNumber} ${endAppendStr} `;
    strCalculationsElement.innerHTML = strCalculations;
}

function setNewInputElementValue(value) {
    inputElement.value = `${value}`;
    inputElement.focus();
}

function calc() {
    if (strCalculations.endsWith('=')) {
        strCalculations = `${result} ${action}`;
        firstNumber = result;
    } else {
        secondNumber = Number.parseFloat(inputElement.value);

        secondNumber = isPercent ? secondNumber / 100 : secondNumber;

        firstNumber = Number.parseFloat(firstNumber);
    }

    strCalculations = `${strCalculations} ${secondNumber} =`;
    strCalculationsElement.innerText = strCalculations;

    switch (action) {
        case '+' :
            result = firstNumber + secondNumber;
            setNewInputElementValue(result);
            return;
        case  '-':
            result = firstNumber - secondNumber;
            setNewInputElementValue(result);
            return;
        case  '*':
            result = firstNumber * secondNumber;
            setNewInputElementValue(result);
            return;
        case  '/':
            result = firstNumber / secondNumber;
            setNewInputElementValue(result);
            return;
        case  '^':
            result = Math.pow(firstNumber, secondNumber);
            setNewInputElementValue(result);
            return;
        default :
            return;
    }
}

