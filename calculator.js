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

export default {
    calculate
}