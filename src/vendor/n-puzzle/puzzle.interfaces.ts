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

export interface StrategyInterface<T> {
  h(current: T, goal: T): number;

  g(source: T, current: T): number;

  successors(snapshot: T): T[];

  isGoal(snapshot: T, target: T): boolean;
}
