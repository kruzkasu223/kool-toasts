import { toast } from './main'

const toastMe = document.querySelector('#toast-me')

toastMe?.addEventListener('click', () => {
  toast({
    message: 'Hello World, this is not a toast!!!',
    type: 'info',
    duration: 5000,
    theme: 'light',
    customTypeColour: '#000',
  })
})
