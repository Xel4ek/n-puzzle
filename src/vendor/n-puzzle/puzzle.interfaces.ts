export interface NPuzzleInterface {
  instance: number[];
  size: number;
  history: string;
  isTarget: boolean;
}

export interface NodeInterface<T> {
  score: number;
  snapshot: T;
  parent?: NodeInterface<T>;
  isTarget: boolean;
}

export interface Strategy<T> {

  goalH: number;
  h([currentRow, currentCol]: number[], [targetRow, targetCol]: number[]): number;

  g(source: T, current: T): number;

  successors(snapshot: T, secondPhase: boolean): T[];
}
