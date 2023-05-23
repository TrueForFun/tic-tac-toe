import { useState } from "react";
import "./Game.css";
import { Board } from "./Board/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>
          {history.map((_, move) => {
            return (
              <li key={move}>
                {currentMove === move ? (
                  `You are at move #${move}`
                ) : (
                  <button onClick={() => setCurrentMove(move)}>
                    {move === 0 ? "Go to game start" : `Go to move #${move}`}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
