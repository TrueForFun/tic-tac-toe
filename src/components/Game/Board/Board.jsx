import { calculateWinner } from "./calculateWinnter";
import "./Board.css";

function Square({ value, onSquareClick, isHighlight }) {
  return (
    <button
      className="square"
      style={{
        background: isHighlight ? "lightgreen" : "",
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

const generateBoard = ({ rows, cols, squares, handleClick, winnerLine }) =>
  Array.from({ length: rows }, (_, rowIdx) => (
    <div key={rowIdx} className="board-row">
      {Array.from({ length: cols }, (_, colIdx) => {
        const currentSquare = rowIdx * rows + colIdx;

        return (
          <Square
            key={colIdx}
            value={squares[currentSquare]}
            onSquareClick={() => handleClick(currentSquare)}
            isHighlight={
              (winnerLine && winnerLine.includes(currentSquare)) ?? false
            }
          />
        );
      })}
    </div>
  ));

export const Board = ({ xIsNext, squares, onPlay }) => {
  const { winner, winnerLine } = calculateWinner(squares);

  function handleClick(i) {
    if (winner || squares[i]) {
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

  const renderStatus = () => {
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return status;
  };

  return (
    <>
      <div className="status">{renderStatus()}</div>

      {generateBoard({
        rows: 3,
        cols: 3,
        squares,
        handleClick,
        winnerLine,
      })}
    </>
  );
};
