import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import { GameInfo } from "./types";
import GameInfoGrid from "@/components/gameinfo/gameinfogrid/gameinfogrid";

export default function Home() {
  // TODO fetch game info from db
  const gameInfoArr: Array<GameInfo> = [{
    id: "1",
    title: "Tic Tac Toe",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/1024px-Tic_tac_toe.svg.png",
  },
  {
    id: "2",
    title: "Snake",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*spTwLANfg8qPWZ0-5bt1pQ.png"
  }];
  return (
    <main className={styles.main}>
      <GameInfoGrid gameInfoArr={gameInfoArr}/>
    </main>
  );
}