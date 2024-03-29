import React from 'react';
import GameInfoCard from '@/components/gameinfo/gameinfocard/gameinfocard';
import { GameInfo } from '@/app/types';
import styles from './gameinfogrid.module.css';
import Link from 'next/link';

type GameInfoGridProps = {
  gameInfoArr: GameInfo[];
};

const GameInfoGrid: React.FC<GameInfoGridProps> = ({ gameInfoArr }) => {
  return (
    <div className={styles.container}>
      <h1>Games</h1>
      <div className={styles.grid}>
        {gameInfoArr.map((gameInfo, index) => (
          <Link href={`/games/${gameInfo.id}`} key={index}>
            <GameInfoCard key={index} gameInfo={gameInfo} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameInfoGrid;