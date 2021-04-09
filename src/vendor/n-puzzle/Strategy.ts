import { StrategyInterface } from './puzzle.interfaces';
import { MappedNPuzzle, NPuzzle } from './NPuzzle';

export class Strategy<T extends NPuzzle> {
  private readonly strategy: StrategyInterface<T>;

  constructor(strategy: StrategyInterface<T>) {
    this.strategy = strategy;
  }

  g(source: T, current: T): number {
    return this.strategy.g(source, current);
  }

  h(current: T, target: T): number {
    const size = target.size;
    if (!(target instanceof MappedNPuzzle)) {
      throw new Error('target must implement MappedNPuzzle class');
    }
    return current.instance.reduce((acc, cur, index) => {
      const point = target.mapInstance.get(cur);
      if (point) {
        const { row, col } = point;
        return (
          acc +
          this.strategy.h([Math.trunc(index / size), index % size], [row, col])
        );
      } else {
        throw new Error('no Map');
      }
    }, 0);
  }

  isGoal(current: T, target: T): boolean {
    return this.h(current, target) === this.strategy.goalH;
  }

  successors(snapshot: T): T[] {
    return this.strategy.successors(snapshot);
  }
}
