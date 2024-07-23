import React, { useState, useEffect } from "react";
import Box from "./Box";
import "./Board.css"; // Import the CSS file

const initialValue = ["", "", "", "", "", "", "", "", ""];

function Board() {
  const [boardState, updateBoardState] = useState(initialValue);
  const [boardValue, updateBoardValue] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      if (
        boardState[lines[i][0]] &&
        boardState[lines[i][0]] === boardState[lines[i][1]] &&
        boardState[lines[i][0]] === boardState[lines[i][2]]
      ) {
        setWinner(boardState[lines[i][0]]);
        setGameEnd(true);
      }
    }
  }, [boardState]);

  const handleClick = (idx) => {
    if (gameEnd) {
      return;
    }

    const newArr = Array.from(boardState);

    if (newArr[idx]) {
      alert("click empty cell");
      console.log("already clicked");
      return;
    }

    newArr[idx] = boardValue ? "X" : "O";
    updateBoardState(newArr);
    updateBoardValue(!boardValue);
  };

  return (
    <div className="board-container">
      <div className="row">
        <Box value={boardState[0]} onClick={() => handleClick(0)} />
        <Box value={boardState[1]} onClick={() => handleClick(1)} />
        <Box value={boardState[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Box value={boardState[3]} onClick={() => handleClick(3)} />
        <Box value={boardState[4]} onClick={() => handleClick(4)} />
        <Box value={boardState[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Box value={boardState[6]} onClick={() => handleClick(6)} />
        <Box value={boardState[7]} onClick={() => handleClick(7)} />
        <Box value={boardState[8]} onClick={() => handleClick(8)} />
      </div>

      <button
  onClick={() => {
    updateBoardState(initialValue);
    setGameEnd(false);
    updateBoardValue(true);
  }}
  className="reset-button audio-button"
> Reset
</button>

      <div className="game-status">
        {gameEnd ? <span>{winner} won the game</span> : <></>}
      </div>
    </div>
  );
}

export default Board;
