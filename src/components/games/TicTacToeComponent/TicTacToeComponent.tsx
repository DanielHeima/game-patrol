'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './TicTacToeComponent.module.css';

type TicTacToeComponentProps = {

}

type Board = [CellState,CellState,CellState,CellState,CellState,CellState,CellState,CellState,CellState,]

type TicTacToeBoardProps = {
  board: Board;
  onCellClicked: (cellIdx: number) => void;
  winningCells: Array<number>
}

type CellProps = {
  state: CellState;
  cellIdx: number; 
  onCellClicked: (cellIdx: number) => void;
  winningCells: Array<number>
}

type CellState = '' | Turn;
type Turn = 'X' | 'O';
type GameState = {
  board: Board;
  turn: Turn;
  gameOver: boolean;
  tie: boolean;
  winningCells: [number, number, number] | []
}

const originalGameState: GameState = {
  board: ['', '', '', '', '', '', '', '', ''],
  turn: 'X',
  gameOver: false,
  tie: false,
  winningCells: []
  // stig?
}



const TicTacToeComponent: React.FC = (props: TicTacToeComponentProps) => {
  // const [board, setBoard] = useState<Array<CellState>>(['', '', '', '', '', '', '', '', '']);
  // const [turn, setTurn] = useState<'X' | 'O'>('X');
  // const [gameOver, setGameOver] = useState(false);
  // const [tie, setTie] = useState(false);
  // const [winningCells, setWinningCells] = useState<Array<number>>([]);

  const [gameState, setGameState] = useState(originalGameState)


  const onCellClicked = (cellIdx: number): void => {
    if (gameState.gameOver) {
      return;
    }

    const formerCellState: CellState = gameState.board[cellIdx];
    if (formerCellState !== "") {
      return;
    }

    setGameState((prevState) => {
      const newBoard = gameState.board;
      newBoard[cellIdx] = prevState.turn;
      let newTurn: Turn = 'X';
      if (prevState.turn === 'X') {
        newTurn = 'O';
      }
      
      return checkState({...prevState, board: newBoard, turn: newTurn});
    });


    // if (turn === 'X') {
    //   newBoard[cellIdx] = 'X';
    //   setGameState({

    //   })
    //   setBoard(newBoard);
    //   checkState();
    //   setTurn('O');
    // }
    // if (turn === 'O') {
    //   newBoard[cellIdx] = 'O';
    //   setBoard(newBoard);
    //   checkState();
    //   setTurn('X');
    // }

  }

  const resetGame = () => {
    setGameState(originalGameState);
  }

  const checkState = (state: GameState): GameState => {
    const newState = state;
    const threeInARow = isThreeInARow();
    if (threeInARow?.threeInARow) {
      newState.gameOver = true;
      newState.winningCells = threeInARow.ids;
      console.log('check', newState);
      return newState;
    }

    if (isAllFilled()) {
      newState.gameOver = true;
      newState.tie = true;
    }
    console.log('check', newState);
    return newState;
  }

  const isThreeInARow = (): { threeInARow: boolean; ids: [number, number, number] | []; winner: CellState } => {
    // horiz
    if (areEqual(0, 1, 2)) return { threeInARow: true, ids: [0, 1, 2], winner: gameState.board[0] };
    if (areEqual(3, 4, 5)) return { threeInARow: true, ids: [3, 4, 5], winner: gameState.board[3] };
    if (areEqual(6, 7, 8)) return { threeInARow: true, ids: [6, 7, 8], winner: gameState.board[6] };

    // diag
    if (areEqual(0, 4, 8)) return { threeInARow: true, ids: [0, 4, 8], winner: gameState.board[0] };
    if (areEqual(2, 4, 6)) return { threeInARow: true, ids: [2, 4, 6], winner: gameState.board[2] };

    // vert
    if (areEqual(0, 3, 6)) return { threeInARow: true, ids: [0, 3, 6], winner: gameState.board[0] };
    if (areEqual(1, 4, 7)) return { threeInARow: true, ids: [1, 4, 7], winner: gameState.board[1] };
    if (areEqual(2, 5, 8)) return { threeInARow: true, ids: [2, 5, 8], winner: gameState.board[2] };

    return { threeInARow: false, ids: [-1, -1, -1], winner: '' };
  }

  const areEqual = (idx: number, idx2: number, idx3: number): boolean => {
    if (!gameState.board[idx2]) {
      return false;
    }
    return (gameState.board[idx] === gameState.board[idx2]) && (gameState.board[idx2] == gameState.board[idx3])
  }

  const isAllFilled = (): boolean => {
    return !gameState.board.includes('');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      <TikTacToeBoard winningCells={gameState.winningCells} onCellClicked={onCellClicked} board={gameState.board} />
      {gameState.gameOver && 
      <div>Game over... {gameState.tie ? "It's a tie!" : ""}<button onClick={() => resetGame()}>Play again?</button></div>}
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
