import React, { useState, useEffect } from 'react';
import Cell from './Cell';


function Board({ nrows = 5, ncols = 5 }) {
  // Initial state for the board
  const createBoard = () => {
    let board = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < 0.25);  
      }
      board.push(row);
    }
    return board;
  };

  // Board state for testing 'isGameWon' because I'm not good at this game:
  // const createBoard = () => {
  //   let board = [];
  //   for (let y = 0; y < nrows; y++) {
  //     let row = [];
  //     for (let x = 0; x < ncols; x++) {
  //       if ((y === 0 && x === 0) || (y === 0 && x === 1) || (y === 1 && x === 0)) {
  //         row.push(true);  
  //       } else {
  //         row.push(false);  
  //       }
  //     }
  //     board.push(row);
  //   }
  //   return board;
  // };

  const [board, setBoard] = useState(createBoard());

  const isGameWon = (board) => {
    return board.every(row => row.every(cell => !cell));
  };

  const toggleCellsAround = (y, x) => { 
  
    const flipCells = (oldBoard) => {
      const [height, width] = [oldBoard.length, oldBoard[0].length];
 
      const boardCopy = oldBoard.map(row => [...row]);
  
      const flipCell = (y, x) => {
        if (x >= 0 && x < width && y >= 0 && y < height) { 
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
  
      flipCell(y, x);
      flipCell(y, x - 1);
      flipCell(y, x + 1);
      flipCell(y - 1, x);
      flipCell(y + 1, x);
      
      return boardCopy;
    };
  

  
    setBoard(oldBoard => {
      const newBoard = flipCells(oldBoard); 
      return newBoard;
    });

  };
 
  const makeTable = () => {
    return (
      <table className="Board">
        <tbody>
          {board.map((row, y) =>
            <tr key={y}>
              {row.map((cell, x) => 
                <td key={`${y}-${x}`}>
                  <Cell
                    isLit={cell}
                    toggleLight={() => toggleCellsAround(y, x)}
                  />
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  useEffect(() => {
    console.log("Board state:", board);
    console.log("Has the game been won?", isGameWon(board));
  }, [board]);
  return isGameWon(board) ? <h2>You Won!</h2> : makeTable();
}

export default Board;
