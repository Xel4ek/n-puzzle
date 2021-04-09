import { NodeInterface } from './puzzle.interfaces';
import { StrategyFactory } from './StrategyFactory';
import { NPuzzle } from './NPuzzle';

export class Node<T> implements NodeInterface<T> {
  isTarget: boolean;
  parent?: Node<T>;
  score: number; // g
  snapshot: T;
  predict: number; // h

  constructor(
    score: number,
    predict: number,
    snapshot: T,
    isTarget: boolean,
    parent?: Node<T>
  ) {
    this.parent = parent;
    this.score = score;
    this.predict = predict;
    this.snapshot = snapshot;
    this.isTarget = isTarget;
    // this.show();
  }

  show(): void {
    console.group('[new Node]');
    console.log('parent: ', this.parent);
    console.log('score: ', this.score);
    console.log('predict: ', this.predict);
    console.log('snapshot: ', this.snapshot);
    console.log('isTarget: ', this.isTarget);
    console.groupEnd();
  }
}

export class NodeFactory<T extends NPuzzle> {
  private readonly strategy: StrategyFactory<T>;
  private readonly sourceInstance: T;
  private readonly targetInstance: T;

  constructor(strategy: StrategyFactory<T>, sourceInstance: T, targetInstance: T) {
    this.strategy = strategy;
    this.sourceInstance = sourceInstance;
    this.targetInstance = targetInstance;
  }

  produce(puzzle: T): T[] {
    return this.strategy
      .successors(puzzle);
  }

  // init(): Node<T> {
  //   return new Node(
  //     0,
  //     this.strategy.h(this.sourceInstance, this.targetInstance),
  //     this.sourceInstance,
  //     this.strategy.isGoal(this.sourceInstance, this.targetInstance)
  //   );
  // }

  // history(node: Node<T>): Observable<T> {
  //   return of(node).pipe(
  //     expand((entities: Node<T>) => {
  //       if (entities.parent) {
  //         return of(entities.parent);
  //       } else {
  //         return EMPTY;
  //       }
  //     }),
  //     map((nodes: Node<T>) => nodes.snapshot)
  //   );
  // }

  // private getScore(current: T): number {
  //   return (
  //     this.strategy.g(this.sourceInstance, current) +
  //     this.strategy.h(current, this.targetInstance)
  //   );
  // }
}
