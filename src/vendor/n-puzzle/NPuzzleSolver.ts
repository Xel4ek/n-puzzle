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
  solution: string;
  sourceInstance: NPuzzle;
  done: number;
  timeUsed: number; // milliseconds
}

export class NPuzzleSolver<T extends HeapInterface<P>, P extends NPuzzle> {
  private implementsNodeCount = 0;
  private timeUsed = 0;
  private solvable?: boolean;
  private solution?: string;
  private readonly priorityQueue: PriorityQueue<T, P>;

  constructor(
    private readonly heapClass: new () => T,
    private readonly strategy: Strategy<P>,
    private readonly sourceInstance: P,
    private readonly targetInstance: P
  ) {
    this.priorityQueue = new PriorityQueue<T, P>(heapClass);
    this.sourceInstance = sourceInstance;
    this.sourceInstance.isTarget = strategy.isGoal(
      sourceInstance,
      targetInstance
    );
    this.targetInstance = targetInstance;
  }

  solve(): NPuzzleSolverReport<P> {
    this.solvable = new NPuzzleValidator().validate(this.sourceInstance);
    if (!this.solvable) {
      return {
        selectedStates: 0,
        implementsNodeCount: 1,
        requiredSteps: 0,
        solvable: this.solvable,
        done: Date.now(),
        timeUsed: 0,
        sourceInstance: this.sourceInstance,
        solution: '',
      };
    }
    let open = 0;
    let close = 0;
    const startTime = performance.now();
    const holder = new Set<string>();
    // this.priorityQueue.insert(
    //   this.sourceInstance.history.length +
    //     this.strategy.h(this.sourceInstance, this.targetInstance),
    //   this.sourceInstance
    // );
    let entity: P | undefined;
    if (!this.sourceInstance.isTarget) {
      entity = this.sourceInstance;
    }
    for (; entity && !this.solution; entity = this.priorityQueue.pop()) {
      close++;
      if (open % 1e6 < 2) {
        console.log('queue: ', this.priorityQueue.size / 1e6, 'm');
        console.log('open: ', open / 1e6, 'm');
        console.log('close: ', close / 1e6, 'm');
      }
      holder.add(entity.instance.join(' '));
      for (const child of this.strategy.successors(entity)) {
        if (!holder.has(child.instance.join(' '))) {
          this.implementsNodeCount++;
          open++;
          child.isTarget = this.strategy.isGoal(child, this.targetInstance);
          if (child.isTarget) {
            this.solution = child.history;
            break;
          }
          this.priorityQueue.insert(
            child.history.length + this.strategy.h(child, this.targetInstance),
            child
          );
        }
      }
    }
    console.log(this.priorityQueue.size);
    this.timeUsed = performance.now() - startTime;
    // console.error('FINISH');
    // console.log(holder);
    return {
      selectedStates: holder.size,
      implementsNodeCount: this.implementsNodeCount,
      requiredSteps: this.solution?.length ?? 0,
      sourceInstance: this.sourceInstance,
      solution: this.solution ?? '',
      solvable: this.solvable,
      done: Date.now(),
      timeUsed: this.timeUsed,
    };
  }
}
