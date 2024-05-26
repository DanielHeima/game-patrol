import { get } from 'http';
import React from 'react';
import TicTacToeComponent from '@/components/games/TicTacToeComponent/TicTacToeComponent';
import SnakeComponent from '@/components/games/SnakeComponent/SnakeComponent';
import { GameComponentMap } from '@/app/types';
import { notFound } from 'next/navigation';

export default function GamePage({ params }: {params: {id: string}}) {
  const gameId = params.id;
  return GetGameComponentByGameId(gameId);
}

function GetGameComponentByGameId(gameId: string): React.JSX.Element {
  const gameComponents: GameComponentMap = {
    SnakeComponent: () => <SnakeComponent />,
    TicTacToeComponent: () => <TicTacToeComponent />
  }
  const gameName: string = getGameNameById(gameId).replace(" ","");
  if (!gameName) {
    return notFound();
  }
  const GameComponent = gameComponents[gameName + "Component"];
  return <GameComponent />
}

function getGameNameById(gameId: string) {
  // TODO: fetch game name by gameId
  if (gameId === "1" || gameId.toLowerCase() === "tictactoe") return "TicTacToe";
  if (gameId === "2" || gameId.toLowerCase() === "snake") return "Snake";

  return "";
}
