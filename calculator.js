(function(){
    'use strict';

    const $visor = document.querySelector( '[data-js="visor"]' ),
        $digits = document.querySelector('[data-js="digits"]'),
        $operators = document.querySelector('[data-js="operators"]'),
        $result = document.querySelector('[data-js="equal"]'),
        $ac = document.querySelector('[data-js="ac"]')

    let targetValue,
        isSomeNumberAdded = false,
        isTheLastDigitAnOperator = false

    $digits.addEventListener('click', handleValuesOnTheVisor)
    $operators.addEventListener('click', handleValuesOnTheVisor)
    $ac.addEventListener('click', clearValues)
    $result.addEventListener('click', showResult)

    function writeOnVisor(value) {
        $visor.value = value
    }

    function handleValuesOnTheVisor(event){
        if(event.target.value === undefined) return

        targetValue = event.target.value

        let digit = targetValue.match(/\d/),
            operator = targetValue.match(/[+*-/]/)

        changeValueToEmpty()

        if(digit) {
            isTheLastDigitAnOperator = false
            addValue()
            return
        }

        if(isTheLastDigitAnOperator) {
            changeTheLastOperator()
            return
        }

        if(operator) {
            addValue()
            isTheLastDigitAnOperator = true
            return
        }
    }
 
    function changeValueToEmpty() {
        if(!isSomeNumberAdded) {
            writeOnVisor("")
        }
        
        isSomeNumberAdded = true
    }
    
    function addValue() {
        $ac.textContent = 'C'

        if(!isTheLastDigitAnOperator) {
            $visor.value += targetValue
        }
    }
    
    function clearValues() {
        writeOnVisor("0")
        $ac.textContent = 'AC'
        isSomeNumberAdded = false
    }

    function changeTheLastOperator() {
        let removeLastOperator = $visor.value.slice(0, -1)
        writeOnVisor(removeLastOperator += targetValue)
    }

    function isOperator(entry) {
        if(entry.match(/[+*-/]/)) {
            return true
        }
    }
    
    function operate(firstValue, lastValue, lastOperator, operator) {
        let operatorSelected = {
            '+': function() { return ( parseFloat(firstValue) + parseFloat(lastValue) ) + lastOperator },
            '-': function() { return ( parseFloat(firstValue) - parseFloat(lastValue) ) + lastOperator },
            '*': function() { return ( parseFloat(firstValue) * parseFloat(lastValue) ) + lastOperator },
            '/': function() { return ( parseFloat(firstValue) / parseFloat(lastValue) ) + lastOperator }
        }

        return operatorSelected[operator]()
    }

    function calculate(value) {
        let allValues = value.match(/\d+[+*-/]?/g)
        
        let result = allValues.reduce(function(accumulated, currentValue){
            let operator = accumulated.split('').pop()
            let lastOperator = isOperator(currentValue) ? currentValue.split('').pop() : ''
            
            let firstValue = accumulated.slice(0, -1),
                lastValue = currentValue

            if( isOperator( lastValue ) ) {
                lastValue = currentValue.slice(0, -1)
            }

            return operate(firstValue, lastValue, lastOperator, operator)
        })
        
        return result
    }

    function showResult() {
        writeOnVisor(calculate($visor.value))
    }
})()