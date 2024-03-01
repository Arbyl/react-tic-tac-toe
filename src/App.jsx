import { useState, } from "react"
import confetti from "canvas-confetti"
import { TURNS } from "./Constants/Constans"
import { checkWinner,  } from "./Logic/checkWinner"
import { checkEndGame } from "./Logic/checkEndgame"
import { MainMapping } from "./Components/mainMapping"


function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) {
      return JSON.parse(boardFromStorage)
    }
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) {
      return turnFromStorage
    }
    return TURNS.X;
  })
    
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) {
      return
    }
    const newboard = [...board]
    newboard[index] = turn
    setBoard(newboard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newboard))
    window.localStorage.setItem('turn', newTurn)
    const newWinner = checkWinner(newboard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newboard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  
  return (
    <MainMapping
      board={board}
      turn={turn}
      winner={winner}
      resetGame={resetGame}
      updateBoard={updateBoard}
    />
  )
}
export default App
