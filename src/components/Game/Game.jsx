import { useState } from "react";
import "./Game.css";
import { Board } from "./Board/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sorting, setSorting] = useState("asc");

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history
    .map((_, i) => i)
    .sort((a, b) => (sorting === "asc" ? a - b : b - a))
    .map((move) => {
      return (
        <div key={move}>
          <span>{`${move + 1}. `}</span>

          {currentMove === move ? (
            `You are at move #${move}`
          ) : (
            <button onClick={() => setCurrentMove(move)}>
              {move === 0 ? "Go to game start" : `Go to move #${move}`}
            </button>
          )}
        </div>
      );
    });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <button
          onClick={() =>
            sorting === "asc" ? setSorting("desc") : setSorting("asc")
          }
        >
          make moves {sorting === "asc" ? "descending" : "ascending"}
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {moves}
        </div>
      </div>
    </div>
  );
}
