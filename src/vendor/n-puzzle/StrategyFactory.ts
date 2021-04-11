import { Strategy } from './puzzle.interfaces';
import { NPuzzle } from './NPuzzle';

export class StrategyFactory<T extends NPuzzle> {
  private readonly strategy: Strategy<T>;

  constructor(strategy: Strategy<T>, private readonly secondPhase: boolean = false) {
    this.strategy = strategy;
  }

  g(source: T, current: T): number {
    return this.strategy.g(source, current);
  }

  h(current: T, target: T): number {
    const expansion = this.strategy.expansion.reduce((acc, curFn) => {
      return acc + curFn(current, target);
    }, 0);
    return this.strategy.h(current, target) + expansion;
  }

  isGoal(current: T, target: T): boolean {
    return this.h(current, target) === this.strategy.goalH;
  }

  successors(snapshot: T): T[] {
    return this.strategy.successors(snapshot, this.secondPhase);
  }

  hybrid({instance}: T): boolean {
    return instance[0] === 1 && instance[1] === 2 && instance[2] === 3 && instance[3] === 4;
  }

  bound(current: T): number {
    return this.strategy.bound(current) ?? Number.MAX_VALUE;
  }
}
