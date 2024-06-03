const page = document.querySelector("body");
const expression = document.querySelector(".expression");
const result = document.querySelector(".result");
const digits = document.querySelectorAll(".digits");
const operators = document.querySelectorAll(".operators");
const theme = document.querySelector(".theme");
const decimal = document.querySelector(".dec");
const percent = document.querySelector(".percentage");
const clear = document.querySelector(".clr");
const delKey = document.querySelector(".del");
const equals = document.querySelector(".equal");


let num1 = '';
let op = '';
let num2 = '';


function setDigit(key){
    const chosen = this.value ? this.value : key;

    if (equals.value){
        result.textContent = '0';
        equals.value = '';
        expression.textContent = '';
        result.classList.remove("error");
        result.classList.remove("result");
    }

    if (op) {
        if (num2 !== '0'){
            num2 += chosen;
            result.textContent += chosen;
        }
    }

    else {
        if (result.textContent === '0'){
            result.textContent = num1 = chosen;
        }
        else {
            result.textContent += chosen;
            num1 += chosen;
        }
    }
}

function setOperator(key){
    const MULTIPLY = '\u00d7';
    const DIVIDE = '\u00f7';
    let chosen = this.value ? this.value : key;
    if (chosen === '*'){
        chosen = MULTIPLY;
    }
    if (chosen === '/'){
        chosen = DIVIDE;
    }
    expression.textContent = '';
    const curr = result.textContent;

    if (num2){
        getResult();
        equals.value = equals.value === 'error' ? equals.value : '';
    }
    
    else if (equals.value){
        result.textContent = equalBtn.value === 'error' ? 0 : curr;
        equalBtn.value = '';

    }

    if (op){
        result.textContent = curr.replace(op, chosen);
        op = chosen;
        
    }
    else {
        op = equals.value === 'error' ? op = '' : chosen;
        result.textContent += op;
    }

    result.classList.remove('error');
    result.classList.remove('result');
}


function getResult(){
    if (!equals.value){
        let res;
        expression.textContent = result.textContent;

        if (num2){
            res = operate(num1, op, num2);
            equals.value = res === 'error' ? 'error' : 'display';

            result.textContent = res === 'error' ? "ZeroDivisionError" : res;

            num1 = res === 'error' ? 0 : res;
            op = '';
            num2 = '';
        }

        else {
            res = num1 === '' ? 0 : num1 * 1;
            equals.value = 'display';
            result.textContent = res;
            op = '';
        }

        if (res === 'error') {
            result.classList.add('error');
        } 
        else {
            result.classList.add('result');
        }
    }
}


function operate(num1, op, num2){
    let res;
    const MULTIPLY = '\u00d7';
    const DIVIDE = '\u00f7';

    num1 = Number(num1);
    num2 = Number(num2);

    switch (op){
        case '+':
            res = num1 + num2;
            break;
        case '-':
            res = num1 - num2;
            break;
        case MULTIPLY:
            res = num1 * num2;
            break;
        case DIVIDE:
            res = num2 === 0 ? 'error' : num1 / num2;
            break;
    }

    return res = res === 'error' ? res : Number.isInteger(res) ? res : res.toFixed(2);
}



function clr(){
    num1 = '';
    op = '';
    num2 = '';

    result.textContent = 0;
    expression.textContent = '';
    equals.value = '';
    result.classList.remove('error');
    result.classList.remove('result');
}


function getFloat(){
    const float = '.';
    const curr = result.textContent;

    if (equals.value){
        num1 = 0 + float;
        result.textContent = num1;
        equals.value = '';
        result.classList.remove('error');
        result.classList.remove('result');
    }

    else{
        if (op){
            result.textContent = String(num2).includes('.') ? curr : curr + float;
            num2 = String(num2).includes('.') ? num2 : num2 + float;
        }
        else {
            result.textContent = String(num1).includes('.') ? curr : curr + float;
            num1 = String(num1).includes('.') ? num1 : num1 == 0 ? 0 + float : num1 + float;
        }
    }
}


function getPercent(){
    const MULTIPLY = '\u00d7';
    const DIVIDE = '\u00f7';
    if (!equals.value){
        if (op){
            if (num2 != 0){
                switch (op) {
                    case '+':
                    case '-':
                        num2 /= 100;
                        num2 *= num1;
                        result.textContent = `${num1}${op}${num2}`;
                        getResult();
                        break;

                    case MULTIPLY:
                    case DIVIDE:
                        num2 /= 100;
                        result.textContent = `${num1}${op}${num2}`;
                        getResult();
                        break;
                }
            }
        }
        else {
            equals.value = '';
            num1 /= 100;
            result.textContent = num1;
        }
    }
}


function del(){
    if (!equals.value){
        expression.textContent = '';

        if (op){
            if (num2){
                num2 = num2.slice(0, -1);
            }
            else { 
                op = '';
            }
            result.textContent = result.textContent.slice(0, -1);
        }
        else {
            num1 = String(num1);
            num1 = num1.length > 1 ? num1.slice(0, -1) : 0;
            result.textContent = num1;
        }
    }
}


function setTheme() {
    const calc = document.querySelector('.calculator');
    const theme = this.value;
    let filterDeg = 0;
    let filterEffect;

    switch (theme) {
        case '':
        filterDeg = 90;
        this.value = '1';
        break;
        case '1':
        filterDeg = 180;
        this.value = '2';
        break;
        case '2':
        filterDeg = 270;
        this.value = '3';
        break;
        case '3':
        filterDeg = 0;
        this.value = '';
    }
    filterEffect = `hue-rotate(${filterDeg}deg)`;
    calc.style.filter = filterEffect;
}


function keyboardInput(event){
    let key = event.key;

    if (Number(key)) {
        setDigit(key);
    }
    
    switch (key) {
        case '0':
          setDigit(key);
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          setOperator(key);
          break;
        case '.':
          getFloat();
          break;
        case '=':
        case 'Enter':
          event.preventDefault();
          getResult();
          break;
        case '%':
          getPercent();
          break;
        case 'Delete':
        case 'Backspace':
          del();
          break;
        case 'Escape':
          clr();
      }
}


digits.forEach(dig => dig.addEventListener('click', setDigit));
operators.forEach(op => op.addEventListener('click', setOperator));
equals.addEventListener('click', getResult);
clear.addEventListener('click', clr);
delKey.addEventListener('click', del);
theme.addEventListener('click', setTheme);
decimal.addEventListener('click', getFloat);
percent.addEventListener('click', getPercent);
page.addEventListener('keydown', keyboardInput);