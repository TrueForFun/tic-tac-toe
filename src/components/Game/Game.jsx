import { useState } from "react";
import "./Game.css";
import { Board } from "./Board/Board";

export default function Game() {
  const [history, setHistory] = useState([
    {
      currentSquareNumber: null,
      squares: Array(9).fill(null),
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sorting, setSorting] = useState("asc");

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const isAllMovesMade = history
    .map((historyItem) => historyItem?.squares)
    .map((moves) => moves?.every((move) => typeof move === "object"))
    .some((item) => item === true);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history
    .map((move, i) => ({
      moveNumber: i,
      moveData: move,
    }))
    .sort((a, b) =>
      sorting === "asc"
        ? a.moveNumber - b.moveNumber
        : b.moveNumber - a.moveNumber
    )
    .map((move) => {
      const currentSquare =
        move.moveData.squares[move.moveData.currentSquareNumber];
      const [row, col] = currentSquare?.coords.split(" ") ?? [];

      return (
        <div key={move.moveNumber}>
          <span>{`${move.moveNumber + 1}. `}</span>

          {currentMove !== 0 && currentMove === move.moveNumber ? (
            `You are at move #${move.moveNumber}. (${row}, ${col})`
          ) : (
            <button onClick={() => setCurrentMove(move.moveNumber)}>
              {move.moveNumber === 0
                ? "Go to game start"
                : `Go to move #${move.moveNumber}. (${row}, ${col})`}
            </button>
          )}
        </div>
      );
    });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          isAllMovesMade={isAllMovesMade}
        />
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
