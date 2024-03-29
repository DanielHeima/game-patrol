'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './TicTacToeComponent.module.css';

type TicTacToeComponentProps = {

}

type TicTacToeBoardProps = {
  board: Array<CellState>;
  onCellClicked: (cellIdx: number) => void;
  winningCells: Array<number>
}

type CellProps = {
  state: CellState;
  cellIdx: number;
  onCellClicked: (cellIdx: number) => void;
  winningCells: Array<number>
}

type CellState = '' | 'X' | 'O';
type GameState = 'InProgress' | 'XWon' | 'OWon';



const TicTacToeComponent: React.FC = (props: TicTacToeComponentProps) => {
  const [board, setBoard] = useState<Array<CellState>>(['', '', '', '', '', '', '', '', '']);
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [gameOver, setGameOver] = useState(false);
  const [winningCells, setWinningCells] = useState<Array<number>>([]);


  const onCellClicked = (cellIdx: number): void => {
    if (gameOver) {
      return;
    }

    const formerCellState: CellState = board[cellIdx];
    if (formerCellState !== "") {
      return;
    }

    const newBoard = board;
    if (turn === 'X') {
      newBoard[cellIdx] = 'X';
      setBoard(newBoard);
      checkState();
      setTurn('O');
    }
    if (turn === 'O') {
      newBoard[cellIdx] = 'O';
      setBoard(newBoard);
      checkState();
      setTurn('X');
    }

  }

  const resetGame = () => {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setTurn('X');
    setGameOver(false);
    setWinningCells([]);
  }


  const checkState = () => {
    const threeInARow = isThreeInARow();
    if (threeInARow?.threeInARow) {
      setGameOver(true);
      setWinningCells(threeInARow.ids);
    }
  }

  const isThreeInARow = (): { threeInARow: boolean; ids: Array<number>; winner: CellState } => {
    // horiz
    if (areEqual(0, 1, 2)) return { threeInARow: true, ids: [0, 1, 2], winner: board[0] };
    if (areEqual(3, 4, 5)) return { threeInARow: true, ids: [3, 4, 5], winner: board[3] };
    if (areEqual(6, 7, 8)) return { threeInARow: true, ids: [6, 7, 8], winner: board[6] };

    // diag
    if (areEqual(0, 4, 8)) return { threeInARow: true, ids: [0, 4, 8], winner: board[0] };
    if (areEqual(2, 4, 6)) return { threeInARow: true, ids: [2, 4, 6], winner: board[2] };

    // vert
    if (areEqual(0, 3, 6)) return { threeInARow: true, ids: [0, 3, 6], winner: board[0] };
    if (areEqual(1, 4, 7)) return { threeInARow: true, ids: [1, 4, 7], winner: board[1] };
    if (areEqual(2, 5, 8)) return { threeInARow: true, ids: [2, 5, 8], winner: board[2] };

    return { threeInARow: false, ids: [-1, -1, -1], winner: '' };
  }

  const areEqual = (idx: number, idx2: number, idx3: number): boolean => {
    if (!board[idx2]) {
      return false;
    }
    return (board[idx] === board[idx2]) && (board[idx2] == board[idx3])
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      <TikTacToeBoard winningCells={winningCells} onCellClicked={onCellClicked} board={board} />
      {gameOver && 
      <div>Game over... <button onClick={() => resetGame()}>Play again?</button></div>}
    </div>
  );
};

function TikTacToeBoard(props: TicTacToeBoardProps) {

  return (
    <div>
      <div className={styles.board}>
        {props.board.length === 9 &&
          props.board.map((cellState, idx) => {
            return <Cell winningCells={props.winningCells} onCellClicked={props.onCellClicked} cellIdx={idx} state={cellState} key={idx} />
          })
        }
      </div>
    </div>
  );
}

function Cell(props: CellProps) {
  return <button onClick={(e) => { props.onCellClicked(props.cellIdx) }} className={styles.button}>
    <div className={`${styles.cell} 
                    ${props.state === 'X' ? styles.x : styles.o} 
                    ${props.winningCells.includes(props.cellIdx) ? styles.winning : ''}`}>{props.state}</div>
  </button>
}

export default TicTacToeComponent;