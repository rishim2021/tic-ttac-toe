import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from './CalculateWinner';


  export default function Game() {
    const [history,setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext,setXIsNext] = useState(true);
    const [stepNumber,setStepNumber] = useState(0); 
    const winner = calculateWinner(history[stepNumber]);
    const xO = xIsNext ? "X" : "O";

    const handleClick=(i)=>{
      const historyPoint = history.slice(0,stepNumber+1);
      const current = historyPoint[stepNumber];
      const squares = [...current];

      if(winner || squares[i]) return;
      squares[i] = xO;
      setHistory(...historyPoint,squares);
      setStepNumber(historyPoint.length);
      setXIsNext(!xIsNext);

    }

    const jumpTo=(step)=>{
      setStepNumber(step);
      setXIsNext(step % 2 === 0);
    }
    
    const renderMoves=()=>{
      history.map((_step,move)=>{
        const des = move? ` Go to move  ${move}` : "Go to start";
        return(
          <li key={move}>
            <button onClick={()=>jumpTo(move)}>
              {des}
            </button>
          </li>
        )  
      })
    }

    
    
  
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={history[stepNumber]} onClick={(i)=>handleClick(i)}/>
          </div>
          <div className="game-info">
            <h2>History</h2>
            {renderMoves()}
            <div>{winner ? "winner" + winner : "Next Player :"+ xO}</div>
          </div>
        </div>
      );
  }
  