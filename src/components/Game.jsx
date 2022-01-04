import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from './CalculateWinner';

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const xO = xIsNext ? 'X' : 'O';
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current2 = historyPoint[historyPoint.length - 1];
    const squares = current2.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xO;
    setHistory(history.concat({ squares }));
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () => {
    history.map((_step, move) => {
      const des = move ? ` Go to move  ${move}` : 'Go to start';
      return (
        <li>
          <button type="button" onClick={() => jumpTo(move)}>
            {des}
          </button>
        </li>
      );
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <h2>History</h2>
        {renderMoves()}
        <div>{winner ? `winner${winner}` : `Next Player :${xO}`}</div>
      </div>
    </div>
  );
}
