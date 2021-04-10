import { NPuzzle } from './NPuzzle';
import { StrategyFactory } from './StrategyFactory';
import { PriorityQueue } from '../priority-queue/priority-queue';
import { NPuzzleValidator } from './NPuzzleValidator';
import { HeapInterface } from '../heap/heap.interface';
import { Strategy } from './puzzle.interfaces';

export interface NPuzzleSolverReport {
  implementsNodeCount: number;
  requiredSteps: number;
  solvable: boolean;
  solution: string;
  sourceInstance: NPuzzle;
  done: number;
  timeUsed: number; // milliseconds
  closedNodes: number;
}

export class NPuzzleSolver<T extends HeapInterface<P>, P extends NPuzzle> {
  private implementsNodeCount = 0;
  private readonly solvable: boolean;
  private solution?: string;
  private readonly priorityQueue: PriorityQueue<T, P>;
  private closedNodes = 0;
  private startTime = performance.now();

  constructor(
    private readonly heapClass: new () => T,
    private readonly strategyConfig: Strategy<P>,
    private readonly sourceInstance: P,
    private readonly targetInstance: P
  ) {
    this.sourceInstance = sourceInstance;
    this.priorityQueue = new PriorityQueue<T, P>(heapClass);
    this.targetInstance = targetInstance;
    this.solvable = new NPuzzleValidator().validate(this.sourceInstance);
  }

  get result(): NPuzzleSolverReport {
    return {
      closedNodes: this.closedNodes,
      implementsNodeCount: this.implementsNodeCount,
      requiredSteps: this.solution?.length ?? 0,
      sourceInstance: this.sourceInstance,
      solution: this.solution ?? '',
      solvable: this.solvable,
      done: Date.now(),
      timeUsed: performance.now() - this.startTime,
    };
  }

  solve(): NPuzzleSolverReport {
    this.startTime = performance.now();
    if (!this.solvable) {
      return this.result;
    }
    let simpled;
    let secondPhase;
    if (this.sourceInstance.size > 3) {
      simpled = this.simplifier();
      secondPhase = true;
    }
    this.simpleSolve(simpled ?? this.sourceInstance, secondPhase);
    return this.result;
  }

  private simplifier(): P | undefined {
    const holder = new Set<string>();
    const strategy = new StrategyFactory<P>(this.strategyConfig);
    this.sourceInstance.isTarget = strategy.isGoal(
      this.sourceInstance,
      this.targetInstance
    );
    let entity: P | undefined;
    if (!this.sourceInstance.isTarget) {
      entity = this.sourceInstance;
    }
    for (; entity && !this.solution; entity = this.priorityQueue.pop()) {
      this.closedNodes++;
     // this.logger();
      holder.add(entity.instance.join(' '));
      for (const child of strategy.successors(entity)) {
        if (!holder.has(child.instance.join(' '))) {
          this.implementsNodeCount++;
          child.isTarget = strategy.isGoal(child, this.targetInstance);
          if (child.isTarget || strategy.hybrid(child)) {
            return child;
          }
          this.priorityQueue.insert(
            child.history.length + strategy.h(child, this.targetInstance),
            child
          );
        }
      }
    }
    return undefined;
  }

  private simpleSolve(sourceInstance: P, secondPhase = false): void {
    this.priorityQueue.clear();
    const strategy = new StrategyFactory<P>(this.strategyConfig, secondPhase);
    const holder = new Set<string>();
    sourceInstance.isTarget = strategy.isGoal(
      sourceInstance,
      this.targetInstance
    );
    let entity: P | undefined;
    if (!sourceInstance.isTarget) {
      entity = sourceInstance;
    }
    for (; entity && !this.solution; entity = this.priorityQueue.pop()) {
      this.closedNodes++;
      // this.logger();
      holder.add(entity.instance.join(' '));
      for (const child of strategy.successors(entity)) {
        if (!holder.has(child.instance.join(' '))) {
          this.implementsNodeCount++;
          child.isTarget = strategy.isGoal(child, this.targetInstance);
          if (child.isTarget) {
            this.solution = child.history;
            break;
          }
          this.priorityQueue.insert(
            child.history.length + strategy.h(child, this.targetInstance),
            child
          );
        }
      }
    }
  }

  private logger(step = 1e5): void {
    if (this.closedNodes % step === 0) {
      console.group('[Info] : ', this.closedNodes / 1e6, 'M');
      console.log('queue: ', this.priorityQueue.size / 1e6, 'M');
      console.log('open: ', this.implementsNodeCount / 1e6, 'M');
      console.groupEnd();
    }
  }
}
