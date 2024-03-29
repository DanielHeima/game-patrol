export interface GameInfo {
  id: string;
  title: string;
  image: string;
  favorite?: boolean;
}

export type GameComponentMap = {
  [key: string]: () => React.JSX.Element
}