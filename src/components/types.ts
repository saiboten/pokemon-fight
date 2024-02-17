export interface Move {
  name: string;
  power: number;
  successRate: number;
}

export interface Pokemon {
  name: string;
  health: number;
  moves: Array<Move>;
}
