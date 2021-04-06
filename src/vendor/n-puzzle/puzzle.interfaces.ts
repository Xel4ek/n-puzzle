import { Observable } from 'rxjs';

export interface NPuzzleInterface {
  instance: number[];
  size: number;
  pivot: number;
}

export interface NodeInterface<T> {
  score: number;
  snapshot: T;
  parent?: NodeInterface<T>;
  isTarget: boolean;
}

export interface StrategyInterface<T> {
  h(current: T, goal: T): number;
  g(start: T, current: T): number;
  successors(snapshot: T): Observable<T>;
  isGoal(score: number): boolean;
}
