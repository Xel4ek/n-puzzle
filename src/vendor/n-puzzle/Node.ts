import { NodeInterface } from './puzzle.interfaces';
import { Strategy } from './Strategy';
import { EMPTY, Observable, of } from 'rxjs';
import { expand, map, mergeMap } from 'rxjs/operators';

export class Node<T> implements NodeInterface<T> {
  isTarget: boolean;
  parent?: Node<T>;
  score: number;
  snapshot: T;

  constructor(score: number, snapshot: T, isTarget: boolean, parent?: Node<T>) {
    this.parent = parent;
    this.score = score;
    this.snapshot = snapshot;
    this.isTarget = isTarget;
    console.group('[new Node]');
    console.log('parent: ', parent);
    console.log('score: ', score);
    console.log('snapshot: ', snapshot);
    console.log('isTarget: ', isTarget);
    console.groupEnd();
  }
}

export class NodeFactory<T> {
  private readonly strategy: Strategy<T>;
  private readonly startInstance: T;
  private readonly targetInstance: T;

  constructor(strategy: Strategy<T>, startInstance: T, targetInstance: T) {
    this.strategy = strategy;
    this.startInstance = startInstance;
    this.targetInstance = targetInstance;
  }

  produce(node?: Node<T>): Observable<Node<T>> {
    const score = 0;
    const isGoal = this.strategy.isGoal(score);
    if (!isGoal && node) {
      return this.strategy
        .successors(node.snapshot)
        .pipe(map((snapshot) => new Node(score, snapshot, isGoal, node)));
    } else {
      return of(
        new Node(score, node?.snapshot ?? this.startInstance, isGoal, node)
      );
    }
  }

  history(node: Node<T>): Observable<T> {
    return of(node).pipe(
      expand((entities: Node<T>) => {
        if (entities.parent) {
          return of(entities.parent);
        } else {
          return EMPTY;
        }
      }),
      map((nodes: Node<T>) => nodes.snapshot)
    );
  }

  private getScore(current: T): number {
    return (
      this.strategy.g(this.startInstance, current) +
      this.strategy.h(current, this.targetInstance, )
    );
  }
}
