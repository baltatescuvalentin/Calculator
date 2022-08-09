
const buttons = document.querySelectorAll('button');
console.log(buttons);
var upper = document.querySelector('#upper');
var bottom = document.querySelector('#bottom');

var para = document.querySelector('#warnings');
var firstArgument = "", secondArgument = "";
var appendedDot = false;
var total = 0, firstNumber, secondNumber;
var computed = false;
var input;
var prevAction = 0;

function validateBottom(string) {
    if(string == "0")
        return false;
    return true;
}

function validateLength(bottom, l) {

    if(bottom.charAt(0) == '-')
        bottom = bottom.slice(1);

    if(bottom.length <= l)
        return true;
    return false;
}

function warningNumberTooLong() {
    if(validateLength(secondArgument) == false) {
        para.textContent = "The number can't exceed 8 digits!";
        return;
    }
}

function checkForUnusual() {
    if(secondArgument == 'NaN' || secondArgument == 'Infinity' || secondArgument == '-Infinity')
        return true;
    return false;
}

function appendNumber(value) {

    if(checkForE() == true) {
        para.textContent = "Can't add digits to the number!";
        return;
    }

    if(checkForUnusual() == true) {
        secondArgument = "";
    }

    if(validateLength(secondArgument, 8) == false) {
        para.textContent = "The number can't exceed 9 digits!";
        return;
    }

    if(validateBottom(secondArgument) == false) {
        secondArgument = value;
    }
    else {
        secondArgument = secondArgument + value;
    }

    bottom.textContent = secondArgument;
}

function appendDot(dot) {

    if(checkForE() == true) {
        para.textContent = "Can't append dot to exponential numbers!";
        return;
    }

    if(validateLength(secondArgument, 7) == false) {
        para.textContent = "The number can't exceed 9 digits!";
        return;
    }

    if(appendedDot == true) {
        para.textContent = `The number can't have more than one '.'`;
        return;
    }

    appendedDot = true;

    if(secondArgument == "")
        secondArgument = "0";

    secondArgument = secondArgument + '.';
    bottom.textContent = secondArgument;
}

function changeSign() {
    
    if(secondArgument.charAt(0) == '-')
        secondArgument = secondArgument.slice(1);
    else {
        secondArgument = '-' + secondArgument;
    }

    bottom.textContent = secondArgument;
}

function deleteLast() {
    if(secondArgument.length == 0) {
        return;
    }
    else if(secondArgument.length == 2 && secondArgument.charAt(0) == '-')
        secondArgument = "";
    else if(secondArgument.length == 1)
        secondArgument = "";
    else {
        secondArgument = secondArgument.slice(0, secondArgument.length - 1);
    }

    bottom.textContent = secondArgument;
}

function emptyDot() {
    if(secondArgument.charAt(secondArgument.length - 1) == ".")
        return true;
    return false;
}

function checkForE() {
    if(secondArgument.includes('e'))
        return true;
    return false;
}

function checkForSign() {
    if(firstArgument.charAt(firstArgument.length - 1) < '0' || firstArgument.charAt(firstArgument.length - 1) > '9')
        return true;
    return false;
}

function additionAux() {
    var n1 = firstArgument.slice(0, firstArgument.length - 1);
    n1 = parseFloat(n1);
    console.log(n1);
    var n2 = parseFloat(secondArgument);
    console.log(n2);
    total = n1 + n2;
    console.log(total);
    if(total.toString().length > 9) {
        var exp = total.toExponential();
        firstArgument = "";
        secondArgument = exp.toString()
    }
    else {
        firstArgument = "";
        secondArgument = total.toString();
    }
}

function addition(input) {

    if(checkForUnusual() == true) {
        secondArgument = "";
        bottom.textContent = secondArgument;
        return;
    }

    if(emptyDot() == true) {
        para.textContent = "The number can't end in '.'";
        return;
    }


    if(firstArgument.length) {

        console.log(firstArgument);

        if(checkForSign() == true && secondArgument == "") {
            para.textContent = "Give me a number not a sign!";
            return;
        }

        var sign = firstArgument.charAt(firstArgument.length - 1);
        equals(sign);
        upper.textContent = secondArgument + input;
        bottom.textContent = firstArgument;
        secondArgument = "";
    }
    else {

        firstArgument = secondArgument + "+";
        secondArgument = "";
        upper.textContent = firstArgument;
        bottom.textContent = secondArgument;
    }


}

function multiplicationAux() {
    var n1 = firstArgument.slice(0, firstArgument.length - 1);
    n1 = parseFloat(n1);
    var n2 = parseFloat(secondArgument);
    total = n1 * n2;
    if(total.toString().length > 9) {
        var exp = total.toExponential();
        firstArgument = "";
        secondArgument = exp.toString()
    }
    else {
        firstArgument = "";
        secondArgument = total.toString();
    }
}

function multiplication(input) {

    if(checkForUnusual() == true) {
        secondArgument = "";
        bottom.textContent = secondArgument;
        return;
    }

    if(emptyDot() == true) {
        para.textContent = "The number can't end in '.'";
        return;
    }

    if(firstArgument.length) {

        if(checkForSign() == true && secondArgument == "") {
            para.textContent = "Give me a number not a sign!";
            return;
        }

        var sign = firstArgument.charAt(firstArgument.length - 1);
        equals(sign);
        upper.textContent = secondArgument + input;
        bottom.textContent = firstArgument;
        secondArgument = "";
    }
    else {

        firstArgument = secondArgument + "*";
        secondArgument = "";
        upper.textContent = firstArgument;
        bottom.textContent = secondArgument;
    }
}

function divisionAux() {
    var n1 = firstArgument.slice(0, firstArgument.length - 1);
    n1 = parseFloat(n1);
    var n2 = parseFloat(secondArgument);
    total = n1 / n2;
    if(total.toString().length > 9) {
        var exp = total.toExponential();
        firstArgument = "";
        secondArgument = exp.toString()
    }
    else {
        firstArgument = "";
        secondArgument = total.toString();
    }
}

function division(input) {

    if(checkForUnusual() == true) {
        secondArgument = "";
        bottom.textContent = secondArgument;
        return;
    }

    if(emptyDot() == true) {
        para.textContent = "The number can't end in '.'";
        return;
    }

    if(secondArgument == "0") {
        para.textContent = "Can't divide by 0!";
        firstArgument = "";
        upper.textContent = firstArgument;
        secondArgument = "";
        bottom.textContent = secondArgument;
    }

    if(firstArgument.length) {

        if(checkForSign() == true && secondArgument == "") {
            para.textContent = "Give me a number not a sign!";
            return;
        }

        var sign = firstArgument.charAt(firstArgument.length - 1);
        equals(sign);
        upper.textContent = secondArgument + input;
        bottom.textContent = firstArgument;
        secondArgument = "";
    }
    else {

        firstArgument = secondArgument + "/";
        secondArgument = "";
        upper.textContent = firstArgument;
        bottom.textContent = secondArgument;
    }
}

function modulusAux() {
    var n1 = firstArgument.slice(0, firstArgument.length - 1);
    n1 = parseFloat(n1);
    var n2 = parseFloat(secondArgument);
    total = n1 % n2;
    if(total.toString().length > 9) {
        var exp = total.toExponential();
        firstArgument = "";
        secondArgument = exp.toString()
    }
    else {
        firstArgument = "";
        secondArgument = total.toString();
    }
}

function modulus(input) {

    if(checkForUnusual() == true) {
        secondArgument = "";
        bottom.textContent = secondArgument;
        return;
    }

    if(emptyDot() == true) {
        para.textContent = "The number can't end in '.'";
        return;
    }

    if(secondArgument == "0") {
        para.textContent = "Can't divide by 0 so can't get te modulus!";
        firstArgument = "";
        upper.textContent = firstArgument;
        secondArgument = "";
        bottom.textContent = secondArgument;
    }

    if(firstArgument.length) {

        if(checkForSign() == true && secondArgument == "") {
            para.textContent = "Give me a number not a sign!";
            return;
        }

        var sign = firstArgument.charAt(firstArgument.length - 1);
        equals(sign);
        upper.textContent = secondArgument + input;
        bottom.textContent = firstArgument;
        secondArgument = "";
    }
    else {

        firstArgument = secondArgument + "%";
        secondArgument = "";
        upper.textContent = firstArgument;
        bottom.textContent = secondArgument;
    }
}

function substitutionAux() {
    var n1 = firstArgument.slice(0, firstArgument.length - 1);
    n1 = parseFloat(n1);
    var n2 = parseFloat(secondArgument);
    total = n1 - n2;
    if(total.toString().length > 9) {
        var exp = total.toExponential();
        firstArgument = "";
        secondArgument = exp.toString()
    }
    else {
        firstArgument = "";
        secondArgument = total.toString();
    }
}

function substitution(input) {

    if(checkForUnusual() == true) {
        secondArgument = "";
        bottom.textContent = secondArgument;
        return;
    }

    if(emptyDot() == true) {
        para.textContent = "The number can't end in '.'";
        return;
    }

    if(firstArgument.length) {

        console.log(secondArgument);

        if(checkForSign() == true && secondArgument == "") {
            para.textContent = "Give me a number not a sign!";
            return;
        }

        var sign = firstArgument.charAt(firstArgument.length - 1);
        equals(sign);
        upper.textContent = secondArgument + input;
        bottom.textContent = firstArgument;
        secondArgument = "";
    }
    else {

        firstArgument = secondArgument + "-";
        secondArgument = "";
        upper.textContent = firstArgument;
        bottom.textContent = secondArgument;
    }
}

function equals(sign) {
    if(secondArgument.length == 0) {
        para.textContent = "Need a second number!";
        return;
    }

    if(firstArgument.length == 0) {
        para.textContent = "No number to calculate";
        return;
    }
    
    switch(sign) {
        case '+':
            additionAux();
            break;
        case '-':
            substitutionAux();
            break;
        case '*':
            multiplicationAux();
            break;
        case '/':
            divisionAux();
            break;
        case '%':
            modulusAux();
            break;
    }
}

function translate(value) {
    if(value == "addition")
        return "+";
    else if(value == "substitution")
        return "-";
    else if(value == "division")
        return "/";
    else if(value == "multiplication")
        return "*";
    else if(value == "modulus")
        return "%";
    else if(value == "equals")
        return "=";
    else return value;
}

function calculate(e) {
    para.textContent = "";
    console.log(firstArgument.length);
    console.log(e);
    console.log(e.key);
    const id = e.id;
    console.log(id);
    var value;

    if(!e.key)
        value = e.id;
    else
        value = e.key;

    input = translate(value);

    console.log(`value is ${value}`);
    console.log(`input is ${input}`);

    switch(value) {
        case '1':
            appendNumber(value);
            prevAction = 0;
            break;
        case '2':
            appendNumber(value);
            prevAction = 0;
            break;
        case '3':
            appendNumber(value);
            prevAction = 0;
            break;
        case '4':
            appendNumber(value);
            prevAction = 0;
            break;
        case '5':
            appendNumber(value);
            prevAction = 0;
            break;
        case '6':
            appendNumber(value);
            prevAction = 0;
            break; 
        case '7':
            appendNumber(value);
            prevAction = 0;
            break;
        case '8':
            appendNumber(value);
            prevAction = 0;
            break;
        case '9':
            appendNumber(value);
            prevAction = 0;
            break;
        case '0':
            appendNumber(value);
            prevAction = 0;
            break; 
        case '.':
        case 'dot':
            appendDot(value);
            prevAction = 0;
            break;
        case '`':
        case 'changesign':
            changeSign();
            prevAction = 0;
            break;
        case 'clear':
        case 'Delete':
            secondArgument = "";
            firstArgument = "";
            upper.textContent = "";
            bottom.textContent = "";
            prevAction = 0;
            break;
        case 'delete':
        case 'Backspace':
            deleteLast();
            prevAction = 0;
            break;
        case '+':
        case 'addition':
            if(prevAction == 1)
                break;
            addition(input);
            secondArgument = "";
            prevAction = 1;
            break;
        case '-':
        case 'substitution':
            if(prevAction == 1)
                break;
            substitution(input);
            secondArgument = "";
            prevAction = 1;
            break;
        case '*':
        case 'multiplication':
            if(prevAction == 1)
                break;
            multiplication(input);
            secondArgument = "";
            prevAction = 1;
            break;
        case '/':
        case 'division':
            if(prevAction == 1)
                break;
            division(input);
            secondArgument = "";
            prevAction = 1;
            break;
        case ';':
        case 'modulus':
            if(prevAction == 1)
                break;
            modulus(input);
            secondArgument = "";
            prevAction = 1;
            break;
        case 'equals':
        case '=':
            var localsign = firstArgument.charAt(firstArgument.length - 1);
            equals(localsign);
            upper.textContent = firstArgument;
            bottom.textContent = secondArgument;
            break;
    }

}

// buttons.forEach(key => key.addEventListener('click', calculate));
var buttonsCount = buttons.length;
for (var i = 0; i < buttonsCount; i += 1) {
    buttons[i].onclick = function() {
        calculate(this)
    };
}
window.addEventListener('keydown', calculate);