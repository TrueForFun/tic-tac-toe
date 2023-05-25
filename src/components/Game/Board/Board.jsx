import { calculateWinner } from "./calculateWinnter";
import "./Board.css";

function Square({ value, onSquareClick, currentSquare, isHighlight, coords }) {
  const [row, col] = coords;
  return (
    <button
      className="square"
      style={{
        background: isHighlight ? "lightgreen" : "",
      }}
      onClick={(e) => onSquareClick(e, currentSquare)}
      data-coords={`${row} ${col}`}
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
            value={squares[currentSquare]?.player ?? null}
            currentSquare={currentSquare}
            onSquareClick={handleClick}
            isHighlight={winnerLine && winnerLine.includes(currentSquare)}
            coords={[rowIdx, colIdx]}
          />
        );
      })}
    </div>
  ));

export const Board = ({ xIsNext, squares, onPlay, isAllMovesMade }) => {
  const { winner, winnerLine } = calculateWinner(squares);

  function handleClick(event, currentSquareNumber) {
    const coords = event.target.dataset.coords;

    if (winner || squares[currentSquareNumber]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[currentSquareNumber] = {
      player: xIsNext ? "X" : "O",
      coords,
      currentSquareNumber,
    };

    onPlay({
      currentSquareNumber,
      squares: nextSquares,
    });
  }

  const renderStatus = () => {
    let status;
    if (!winner && isAllMovesMade) {
      status = `A draw`;
    } else if (winner) {
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
