export interface NPuzzleInterface {
  instance: number[];
  size: number;
  history: string;
  isTarget: boolean;
}

export interface AverageResults {
  size: number;
  totalRequiredSteps: number;
  solvableCount: number;
  totalTime: number;
  totalStates: number;
  totalNodes: number;
  len: number;
}

export interface Strategy<T> {
  goalH: number;

  // h(
  //   [currentRow, currentCol]: number[],
  //   [targetRow, targetCol]: number[]
  // ): number;

  h(current: T, target: T): number;

  g(source: T, current: T): number;

  successors(snapshot: T, secondPhase: boolean): T[];

  bound(current: T): number | undefined;
}
