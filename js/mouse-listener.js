let listeners = []

function triggerListeners(event) {
    listeners.forEach(function(listener){
        listener(event.target.value)
    })
}

function addListener(eventFunction) {
    listeners.push(eventFunction)
}

function createMouseEvents() {
    const $buttonsNumbers = document.querySelectorAll('[data-js="digits"] button'),
        $buttonsOperators = document.querySelectorAll('[data-js="operators"] button')

    $buttonsNumbers.forEach(function(button) {
        button.addEventListener('click', triggerListeners)
    })

    $buttonsOperators.forEach(function(button){
        button.addEventListener('click', triggerListeners)
    })
}

export default {
    createMouseEvents,
    addListener
}