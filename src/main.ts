import './style.css'

console.log('Hello World')

const main = document.createElement('div')
main.setAttribute('id', 'kool-toasts')
main.innerHTML = 'Hello World'
document.body.prepend(main)
