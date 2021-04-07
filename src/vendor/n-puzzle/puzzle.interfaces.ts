import { Point } from './Point';

export interface NPuzzleInterface {
  instance: number[];
  size: number;
  pivot: Point;
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
