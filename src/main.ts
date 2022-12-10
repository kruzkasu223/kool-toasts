import './style.css'

type Types = 'info' | 'success' | 'warning' | 'error'
type Themes = 'light' | 'dark'
type CustomTheme = {
  background: string
  text: string
  shadow?: string
}

type Toast = {
  type: Types
  message: string
  duration: number
  theme?: Themes
  customTypeColour?: string
  customThemeColour?: CustomTheme
  // suggest some types that you think are missing for making toast notifications
  // position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  // onClose?: () => void
}

const getSiblings = (sibling: 'next' | 'prev', elem: HTMLDivElement) => {
  const siblingType = sibling === 'next' ? 'nextSibling' : 'previousSibling'
  const siblings: HTMLDivElement[] = []
  while ((elem = elem?.[siblingType] as HTMLDivElement)) {
    siblings.push(elem)
  }
  return siblings
}

const getOrCreateToastContainer = (theme: Themes | CustomTheme = 'light') => {
  let toastContainer = document.getElementById('nice-toasts-container')
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.setAttribute('id', 'nice-toasts-container')
    document.body.prepend(toastContainer)
  }
  if (typeof theme === 'object') {
    toastContainer.style.setProperty('--backgound-colour', theme.background)
    toastContainer.style.setProperty('--text-colour', theme.text)
    if (theme.shadow)
      toastContainer.style.setProperty('--shadow-colour', theme.shadow)
  } else {
    toastContainer.setAttribute('data-theme', theme)
  }
  return toastContainer
}

export const toast = ({
  message,
  type,
  duration,
  theme = 'light',
  customTypeColour,
  customThemeColour,
}: Toast) => {
  const isCustomTheme =
    customThemeColour?.background && customThemeColour?.text ? true : false
  const main = getOrCreateToastContainer(
    isCustomTheme ? customThemeColour : theme,
  )

  const toast = document.createElement('div')
  toast.setAttribute('id', 'nice-toast')
  toast.setAttribute('class', type)
  toast.setAttribute('data-type', type)
  if (customTypeColour)
    toast.style.setProperty('--current-colour', customTypeColour)

  const icon = document.createElement('span')
  icon.setAttribute('id', 'icon')
  icon.setAttribute('class', type)

  icon.innerHTML =
    type === 'error'
      ? 'X'
      : type === 'success'
      ? '&check;'
      : type === 'warning'
      ? '!'
      : 'i'

  const messageEle = document.createElement('span')
  messageEle.setAttribute('id', 'message')
  messageEle.innerText = message

  const close = document.createElement('span')
  close.setAttribute('id', 'close')
  close.innerHTML = 'X'
  close.addEventListener('click', () => removeToast(toast))

  toast.appendChild(icon)
  toast.appendChild(messageEle)
  toast.appendChild(close)
  main.appendChild(toast)
  document.body.prepend(main)

  setTimeout(() => {
    toast.style.transform = 'translate(0, 0) scale(1)'
    toast.style.opacity = '1'
  }, 1)

  setTimeout(() => {
    removeToast(toast)
  }, duration)
}

const removeToast = (toast: HTMLDivElement | null) => {
  if (toast) {
    const allNextSiblings = getSiblings('next', toast)
    allNextSiblings.forEach(sibling => {
      sibling?.animate(
        [
          {
            transform: 'translate(0, 0) scale(1)',
          },
          {
            transform: 'translate(0, calc(-100% - 1.5rem)) scale(1)',
          },
        ],
        {
          duration: 310,
          easing: 'ease-in-out',
        },
      )
    })

    toast.style.transform = 'translate(200%, -200%) scale(0)'
    toast.style.opacity = '0'
    setTimeout(() => {
      toast.remove()
    }, 300)
  }
}
