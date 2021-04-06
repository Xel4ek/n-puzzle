import {
  StrategyInterface,
} from './puzzle.interfaces';
import { Observable } from 'rxjs';

export class Strategy<T> implements StrategyInterface<T> {
  private readonly strategy: StrategyInterface<T>;

  constructor(strategy: StrategyInterface<T>) {
    this.strategy = strategy;
  }

  g(start: T, current: T): number {
    return this.strategy.g(start, current);
  }

  h(current: T, goal: T): number {
    return this.strategy.h(current, goal);
  }

  isGoal(score: number): boolean {
    return this.strategy.isGoal(score);
  }

  successors(snapshot: T): Observable<T> {
    return this.strategy.successors(snapshot);
  }
}
