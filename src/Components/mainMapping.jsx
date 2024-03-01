/* eslint-disable react/prop-types */
import { Square } from "./Square.jsx"
import { ModalWinner } from "./ModalWinner.jsx"
import { TURNS } from "../Constants/Constans.js"

export const MainMapping = ({ board, turn, winner, resetGame, updateBoard }) => {
    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <section className="game">
                {
                    board.map((square, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {square}
                            </Square>
                        )
                    })
                }
            </section>
            
            <button onClick={resetGame}>
                Reiniciar
            </button>

            <section className="turn">
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>
            <ModalWinner winner={winner} resetGame={resetGame} />
        </main>
    )
}