import { StrategyInterface, } from './puzzle.interfaces';

export class Strategy<T> implements StrategyInterface<T> {
  private readonly strategy: StrategyInterface<T>;

  constructor(strategy: StrategyInterface<T>) {
    this.strategy = strategy;
  }

  g(source: T, current: T): number {
    return this.strategy.g(source, current);
  }

  h(current: T, goal: T): number {
    return this.strategy.h(current, goal);
  }

  isGoal(snapshot: T, target: T): boolean {
    return this.strategy.isGoal(snapshot, target);
  }

  successors(snapshot: T): T[] {
    return this.strategy.successors(snapshot);
  }
}
