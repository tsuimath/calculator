import mouseEvents from './mouse-listener.js'
import calculator from './calculator.js'

const $visor = document.querySelector( '[data-js="visor"]' ),
    $ac = document.querySelector('[data-js="ac"]'),
    $result = document.querySelector('[data-js="equal"]')


let isSomeNumberAdded = false,
    isTheLastDigitAnOperator = false

function init() {
    mouseEvents.createMouseEvents()

    mouseEvents.addListener(function(value){
        screen(value)
    })
    
    $ac.addEventListener('click', clearValues)
    $result.addEventListener('click', showResult)
}

function screen(value) {
    let digit = value.match(/\d/),
        operator = value.match(/[+*-/]/)

    changeValueToEmpty()

    if(digit) {
        isTheLastDigitAnOperator = false
        addValue(digit)
        return
    }

    if(isTheLastDigitAnOperator) {
        changeTheLastOperator(value)
        return
    }

    if(operator) {
        addValue(operator)
        isTheLastDigitAnOperator = true
        return
    }
}

function addValue(value) {
    $ac.textContent = 'C'

    if(!isTheLastDigitAnOperator) {
        $visor.value += value
    }
}

function clearValues() {
    renderValueOnScreen("0")
    $ac.textContent = 'AC'
    isSomeNumberAdded = false
}

function renderValueOnScreen(value) {
    $visor.value = value
}

function changeValueToEmpty() {
    if(!isSomeNumberAdded) {
        renderValueOnScreen("")
    }
    
    isSomeNumberAdded = true
}

function changeTheLastOperator(value) {
    let removeLastOperator = $visor.value.slice(0, -1)

    renderValueOnScreen(removeLastOperator += value)
}

function showResult() {
    renderValueOnScreen(calculator.calculate($visor.value))
}

export default {
    init,
    screen
}