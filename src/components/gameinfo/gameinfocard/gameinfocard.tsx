import React from 'react';
import { GameInfo } from '@/app/types';
import styles from './gameinfocard.module.css';
import NextImage from 'next/image';

type GameInfoCardProps = {
  gameInfo: GameInfo;
};

const GameInfoCard: React.FC<GameInfoCardProps> = ({ gameInfo }) => {
  return (
    <div className={styles.container}>
      <NextImage src={gameInfo.image} alt={gameInfo.title} className={styles.image} width={400} height={400}/>
      <h3 className={styles.title}>{gameInfo.title}</h3>
    </div>
  );
};

export default GameInfoCard;