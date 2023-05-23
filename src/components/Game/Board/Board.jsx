import { calculateWinner } from "./calculateWinnter";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

const generateBoard = (rows, cols, squares, handleClick) =>
  Array.from({ length: rows }, (_, rowIdx) => (
    <div key={rowIdx} className="board-row">
      {Array.from({ length: cols }, (_, colIdx) => {
        const currentSquare = rowIdx * rows + colIdx;

        return (
          <Square
            key={colIdx}
            value={squares[currentSquare]}
            onSquareClick={() => handleClick(currentSquare)}
          />
        );
      })}
    </div>
  ));

export const Board = ({ xIsNext, squares, onPlay }) => {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {generateBoard(3, 3, squares, handleClick)}
    </>
  );
};
