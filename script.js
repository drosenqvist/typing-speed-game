import wordLibrary from './wordLibrary.js'

const init = () => {
  const gameWrapper = document.querySelector('.game-wrapper')

  const resetButton = document.querySelector('.resetButton')
        resetButton.addEventListener('click', () => { resetGame(gameWrapper) })

  setUpGame()
}

const setUpGame = () => {
  const gameWrapper = document.querySelector('.game-wrapper')

  const wordWrapper = document.createElement('div')
        wordWrapper.className = 'word-wrapper'

  const input = document.createElement('input')
        input.className = 'input'
        input.placeholder = 'Begin Typing!'

  const timeOutput = document.createElement('span')
        timeOutput.className = 'time'

  gameWrapper.prepend(wordWrapper, input, timeOutput)

  for (let i = 0; i < 200; i++) {
    const span = document.createElement('span')
          span.textContent = wordLibrary[Math.floor(Math.random() * 200)]

    wordWrapper.appendChild(span)
  }

  let correct = 0,
      time = 60

  timeOutput.textContent = time

  let red = 0,
      green = 255,
      blue = 0

  input.addEventListener('keydown', () => {
    let i = setInterval( () => {
      time--
      timeOutput.textContent = time

      red = red + 4.25
      green = green - 4.25

      timeOutput.setAttribute('style', `color: rgb(${red}, ${green}, ${blue})`)

      if (time < 0) {
        endGame(correct, gameWrapper)
        clearInterval(i)
      }
      }, 1000)

    startGame()
  }, { once: true })

  const startGame = () => {
    input.placeholder = ''
    input.addEventListener('keydown', (event) => {
      const word = document.querySelector('.word-wrapper').childNodes[0]
      setTimeout(() => matchWords(word, event), 1)
      if (event.key === ' ' || event.key === 'Enter') {
        if (!input.value) {
          setTimeout( () => { input.value = '' }, 1)
          return false
        } else {
          correct++
          
          word.remove()
          setTimeout( () => { input.value = '' }, 1)
        }
      }
    })
  }
}

const endGame = (correct, gameWrapper) => {
  clearPlayingfield(gameWrapper)

  const resultOutput = document.createElement('h2')
        resultOutput.textContent = `${correct} Words per minute!`

  gameWrapper.append(resultOutput)
} 

const resetGame = (gameWrapper) => {
  clearPlayingfield(gameWrapper)
  setUpGame()
}

const clearPlayingfield = (gameWrapper) => {
  while(gameWrapper.childNodes[0]) {
    gameWrapper.firstChild.remove()
  }
}

const matchWords = (word, event) => {
  if (event.path[0].value === word.textContent.substr(0, event.path[0].value.length)) {
    word.setAttribute('style', 'background-color: rgb(71, 222, 74)')
  } else {
    word.setAttribute('style', 'background-color: rgb(222, 71, 71)')
  }
}

init()