import { Node, NodeFactory } from './Node';
import { NPuzzle } from './NPuzzle';
import { Strategy } from './Strategy';
import { PriorityQueue } from '../priority-queue/priority-queue';
import { NPuzzleValidator } from './NPuzzleValidator';
import { HeapInterface } from '../heap/heap.interface';

export interface NPuzzleSolverReport<T> {
  selectedStates: number;
  implementsNodeCount: number;
  requiredSteps: number;
  solvable: boolean;
  history?: Node<T>;
  done: number;
  timeUsed: number; // milliseconds
}

export class NPuzzleSolver<
  T extends HeapInterface<Node<P>>,
  P extends NPuzzle
> {
  private selectedStates = 0;
  private implementsNodeCount = 0;
  private requiredSteps = 0;
  private timeUsed = 0;
  private readonly solvable: boolean;
  private readonly factory?: NodeFactory<P>;
  private readonly priorityQueue: PriorityQueue<T, Node<P>>;

  constructor(
    private readonly heapClass: new () => T,
    private readonly strategy: Strategy<P>,
    private readonly sourceInstance: P,
    private readonly targetInstance: P
  ) {
    this.priorityQueue = new PriorityQueue<T, Node<P>>(heapClass);
    this.solvable = new NPuzzleValidator().validate(sourceInstance);
    if (this.solvable) {
      this.implementsNodeCount = 1;
      this.factory = new NodeFactory<P>(
        strategy,
        sourceInstance,
        targetInstance
      );
    }
  }

  solve(): NPuzzleSolverReport<P> {
    if (!this.factory) {
      return {
        selectedStates: 0,
        implementsNodeCount: this.implementsNodeCount,
        requiredSteps: this.requiredSteps,
        solvable: this.solvable,
        done: Date.now(),
        timeUsed: 0,
      };
    }
    console.warn('Start');
    const startTime = performance.now();
    const holder = new Set<string>();
    const sourceNode = this.factory.init();
    this.priorityQueue.insert(
      sourceNode.score + sourceNode.predict,
      sourceNode
    );
    let steps = 0;
    let entity = this.priorityQueue.pop();
    for (
      ;
      entity && !entity.isTarget;
      entity = this.priorityQueue.pop(), steps++
    ) {
      holder.add(entity.snapshot.instance.join(' '));
      this.factory.produce(entity).map((child) => {
        if (!holder.has(child.snapshot.instance.join(' '))) {
          this.priorityQueue.insert(child.score + child.predict, child);
          this.implementsNodeCount++;
        }
      });
    }
    this.timeUsed = performance.now() - startTime;
    this.requiredSteps = steps;
    // console.error('FINISH');
    // console.log(holder);
    return {
      selectedStates: holder.size,
      implementsNodeCount: this.implementsNodeCount,
      requiredSteps: this.requiredSteps,
      history: entity,
      solvable: this.solvable,
      done: Date.now(),
      timeUsed: this.timeUsed,
    };
  }
}
