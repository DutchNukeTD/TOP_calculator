let buttons = document.querySelectorAll('.Button');
Array(buttons);
let screenValue = document.querySelector('.Value');

a = 0;
b = 0;
operatorClicked = false;
operator = '';
equalClicked = false;

function calculate(string) {
    string = string.split(' ');
    [a, operator, b] = string;


    if (a.includes(',') && b.includes(',')){
        decimalA= a.length -2;
        decimalB= b.length -2;
        if (decimalA > decimalB) {
            multiply = '1'+'0'.repeat(decimalA);
        } else {
            multiply = '1'+'0'.repeat(decimalB);
        }
        
    } else if (a.includes(',')) {
        decimal= a.length -2;
        multiply = '1'+'0'.repeat(decimal);
    } else if (b.includes(',')) {
        decimal= b.length -2;
        multiply = '1'+'0'.repeat(decimal);
    } else {
        multiply = 1;
    };
    
    a = parseFloat(a.replace(',', '.'));
    b = parseFloat(b.replace(',', '.'));

    a = a * multiply
    b = b * multiply
    
    if (operator === '+') {
        result = a + b;
    } else if (operator === '-') {
        result = a - b;
    } else {
        result = a + b;
    }

    if (operator === 'x') { // multiply with decimal numbers 1*0.25 = 4;
        a = a / multiply; // --> Because it gets multiplied above
        b = b / multiply; // --> Because it gets multiplied above

        // calculation. 
        result = a * b;
        console.log('a = ' + a + ' Hier wordt mee gerekend.');
        console.log('b = ' + b);
        
    } else if (operator === '÷') {
        a = a / multiply; // --> Because it gets multiplied above
        b = b / multiply; // --> Because it gets multiplied above
        result = a / b; 

    } else {
        console.log('dit moet niet geprint worden.')
        result = result / multiply;
    }

    return result.toString().replace('.', ',');
};

// Let's buttons react to mouse and change color.
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousedown", function() {
        if (buttons[i].classList.contains('Number')) { 
            buttons[i].style.backgroundColor = 'rgb(170, 170, 170)';
            
        } else if (buttons[i].classList.contains('Operator')) {
            buttons[i].style.backgroundColor = 'rgb(200, 131, 0)';

        } else {
            buttons[i].style.backgroundColor = 'rgb(145, 145, 145)';
        }
    });
    
    buttons[i].addEventListener("mouseup", function() {
        // On mouse release make button back to normal color;
        if (buttons[i].classList.contains('Number')) {
            buttons[i].style.backgroundColor = 'rgb(145, 145, 145)';
        } else if (buttons[i].classList.contains('Extra')) {
            buttons[i].style.backgroundColor = 'rgb(114, 114, 114)';
        } else { // if (buttons[i].classList.contains('Operator')) {
            buttons[i].style.backgroundColor = 'rgb(255, 166, 0)';
        }

        if (buttons[i].classList.contains('Number') || buttons[i].classList.contains('Extra'))  {
            // set screenValue 
            if (!(operatorClicked)) { // a value
                if (screenValue.innerHTML == 0) {
                    if (buttons[i].classList.contains('Extra') || buttons[i].classList.contains('Operator')) {
                        // pass 
                    } else if (buttons[i].innerHTML == ',') {
                        a = a + ',';
                        screenValue.innerHTML = a;

                    } else {
                        screenValue.innerHTML = buttons[i].innerHTML;
                        a = screenValue.innerHTML;
                        buttons[0].innerHTML = 'C'; // AC button to change to C
                    }
                    
                } else if (buttons[i].innerHTML == ',') {  // Comma 
                    if (screenValue.innerHTML.includes(',')) {
                        // pass
                    } else {
                        a = screenValue.innerHTML;
                        a = a + ',';
                        screenValue.innerHTML = a;
                    }
                } else if (buttons[i].innerHTML == '±') { // negativ
                    if (screenValue.innerHTML.includes('-')) {
                        screenValue.innerHTML = screenValue.innerHTML.replace('-', '');
                        a = screenValue.innerHTML;
                    } else {
                        a = screenValue.innerHTML;
                        a = '-' + a;
                        screenValue.innerHTML = a;
                    }
                } else if (buttons[i].innerHTML == '%') {
                    a = screenValue.innerHTML;
                    a = a / 100; 
                    screenValue.innerHTML = a;
                    
                } else if (buttons[i].innerHTML == 'C') {
                    screenValue.innerHTML = 0;
                    a = 0;
                    buttons[0].innerHTML = 'AC'; // AC button changed back from C to AC
                
                } else {
                    if (screenValue.innerHTML.length > 12) {
                        // pass --> to much numbers.
                    } else {
                        a = screenValue.innerHTML;
                        a = a + buttons[i].innerHTML;
                        screenValue.innerHTML = a;                        
                    }
                }


            // b value     
            } else {  
                if (b === 0) {
                    if (!(buttons[i].innerHTML == 0)) { 
                        if (buttons[i].classList.contains('Extra') || buttons[i].classList.contains('Operator')) {
                            // pass 
                        } else if (buttons[i].innerHTML == ',') {
                            b = b + ',';
                            screenValue.innerHTML = b;
    
                        } else {
                            screenValue.innerHTML = buttons[i].innerHTML;
                            b = screenValue.innerHTML;
                            buttons[0].innerHTML = 'C'; // AC button to change to C
                        }
                    } 
                } else if (buttons[i].innerHTML == ',') {
                    if (screenValue.innerHTML.includes(',')) {
                        // pass
                    } else {
                        b = screenValue.innerHTML;
                        b = b + ',';
                        screenValue.innerHTML = b;
                    } 

                } else if (buttons[i].innerHTML == '±') { // negativ
                    if (screenValue.innerHTML.includes('-')) {
                        screenValue.innerHTML = screenValue.innerHTML.replace('-', '');
                        b = screenValue.innerHTML;
                    } else {
                        b = screenValue.innerHTML;
                        b = '-' + b;
                        screenValue.innerHTML = b;
                    }
                } else if (buttons[i].innerHTML == '+') { // negativ
                    console.log('Dit moet nu geprint worden!');
                    a = b;
                    b = 0;
                    screenValue.innerHTML = a;
                
                } else if (buttons[i].innerHTML == 'C') {
                    screenValue.innerHTML = 0;
                    b = 0;
                    buttons[0].innerHTML = 'AC'; // AC button changed back from C to AC

                } else { // if numbers 
                    if (screenValue.innerHTML.length > 12) {
                        // pass --> to much numbers.
                    } else {
                        b = screenValue.innerHTML;
                        b = b + buttons[i].innerHTML;
                        screenValue.innerHTML = b;
                    }
                }
            }

        } else if (buttons[i].classList.contains('Operator')) {          
            // screenValue Operator
            if (buttons[i].innerHTML === '=') {
                if (a == 0 && b == 0) {
                    //pass --> this is the same as Python pass without the //

                } else if (b === 0){
                    b = a;
                    screenValue.innerHTML = b;

                } else {
                    string = a + ' ' + operator + ' ' + b;
                    console.log('a = ' + a)
                    console.log('b = ' + b)
                    screenValue.innerHTML = calculate(string);
                    a = screenValue.innerHTML;
                    b = 0;
                    operatorClicked = false;
                    equalClicked = true;
                }

            } else {
                a = screenValue.innerHTML;
                screenValue.innerHTML = buttons[i].innerHTML;
                screenValue.innerHTML = b;
                operatorClicked = true;
                operator = buttons[i].innerHTML;
            }
        }

        // AC resets everything!
        if (buttons[i].innerHTML == 'AC'){
            a = 0;
            b = 0;
            screenValue.innerHTML = a;
            operatorClicked = false; 
            equalClicked = false;
        }
    });
};
