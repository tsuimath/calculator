function isOperator(entry) {
    if(entry.match(/[+*-/]/)) {
        return true
    }
}

function doOperation(firstValue, lastValue, operator) {
    let operatorSelected = {
        '+': function() { return  parseFloat(firstValue) + parseFloat(lastValue) },
        '-': function() { return  parseFloat(firstValue) - parseFloat(lastValue) },
        '*': function() { return  parseFloat(firstValue) * parseFloat(lastValue) },
        '/': function() { return  parseFloat(firstValue) / parseFloat(lastValue) }
    }

    return operatorSelected[operator]()
}

function getLastOperator(value) {
    return isOperator(value) ? value.split('').pop() : ''
}

function calculate(value) {
    let allValues = value.match(/\d+[+*-/]?/g)
    
    let result = allValues.reduce(function(accumulated, currentValue){
        let operator = accumulated.split('').pop()
        let lastOperator = getLastOperator(currentValue)
        
        let firstValue = accumulated.slice(0, -1),
            lastValue = currentValue

        if( isOperator( lastValue ) ) {
            lastValue = currentValue.slice(0, -1)
        }

        return doOperation(firstValue, lastValue, operator) + lastOperator
    })
    
    return result
}

export default {
    calculate
}