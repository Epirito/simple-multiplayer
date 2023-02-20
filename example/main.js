import Client from "../client"

class Game {
  constructor() {
      this.state = [0,0]
  }
  update(playerInputTuples) {
      playerInputTuples.forEach(([player, input]) => {
        this.state[player] += input
      })
  }
  copy() {
      let newGame = new Game()
      newGame.state = [...this.state]
      return newGame
  }
}
function render(game) {
  document.body.innerText = `time each player spent pressing arrowUp: ${game.state}`
}
function inputTemplate() {
  return 0
}
let input = 0
window.onload = () => {
  /*listen to keyboard events*/
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      input = 1
    }
  })
  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") {
      input = 0
    }
  })
}
const client = new Client(()=>new Game(), inputTemplate, ()=>input, render, 2, 'ws://127.0.0.1:3000', 30)

