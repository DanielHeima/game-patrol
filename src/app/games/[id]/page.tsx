import { get } from 'http';
import React from 'react';
import TikTacToeComponent from '@/components/games/TicTacToeComponent/TicTacToeComponent'
import TicTacToeComponent from '@/components/games/TicTacToeComponent/TicTacToeComponent';
import SnakeComponent from '@/components/games/SnakeComponent/SnakeComponent';
import { GameComponentMap } from '@/app/types';

export default function GamePage({ params }: {params: {id: string}}) {
  const gameId = params.id;
  return GetGameComponentByGameId(gameId);
}

function GetGameComponentByGameId(gameId: string): React.JSX.Element {
  const components: GameComponentMap = {
    SnakeComponent: () => <SnakeComponent />,
    TikTacToeComponent: () => <TicTacToeComponent />
  }
  const gameName: string = getGameNameById(gameId).replace(" ","");
  const GameComponent = components[gameName + "Component"];
  return <GameComponent />
}

function getGameNameById(gameId: string) {
  // TODO: fetch game name by gameId
  if (gameId !== "1") return "Snake"
  return "TikTacToe"
}
