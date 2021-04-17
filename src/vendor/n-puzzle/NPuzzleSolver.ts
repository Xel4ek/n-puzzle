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
  size: number;
  mode: 'twoWay' | 'oneWay';
  gameStyle: 'snake' | 'regular';
  heuristic?: string;
}
type Actions = 'l' | 'r' | 'd' | 'u';
export class NPuzzleSolver<T extends HeapInterface<P>, P extends NPuzzle> {
  constructor(
    private readonly heapClass: new () => T,
    private readonly strategyConfig: Strategy<P>,
    private readonly sourceInstance: P,
    private readonly targetInstance: P,
    private readonly mode: 'twoWay' | 'oneWay',
    private readonly gameStyle: 'snake' | 'regular'
  ) {
    this.sourceInstance = sourceInstance;
    this.priorityQueue = new PriorityQueue<T, P>(heapClass);
    this.targetInstance = targetInstance;
    this.solvable = NPuzzleValidator.validate(
      this.sourceInstance,
      this.gameStyle
    );
    this.strategy = new StrategyFactory(strategyConfig);
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
      size: this.sourceInstance.size,
      mode: this.mode,
      gameStyle: this.gameStyle,
    };
  }
  private implementsNodeCount = 0;
  private readonly solvable: boolean;
  private solution?: string;
  private readonly priorityQueue: PriorityQueue<T, P>;
  private closedNodes = 0;
  private startTime = performance.now();
  private readonly strategy: StrategyFactory<P>;
  private static solveInverter(solve = ''): string {
    return solve
      .split('')
      .reverse()
      .map((move) => {
        return { l: 'r', r: 'l', d: 'u', u: 'd' }[move as Actions];
      })
      .join('');
  }

  solve(): NPuzzleSolverReport {
    this.startTime = performance.now();
    if (!this.solvable) {
      return this.result;
    }
    if (this.mode === 'twoWay') {
      this.twoWaySearch();
    } else if (this.mode === 'oneWay') {
      let simpled;
      let secondPhase;
      if (this.sourceInstance.size > 3) {
        simpled = this.simplifier();
        secondPhase = true;
      }
      this.simpleSolve(simpled ?? this.sourceInstance, secondPhase);
    }
    return this.result;
  }

  private simplifier(): P | undefined {
    const holder = new Set<string>();
    const openNodes = new Set<string>();
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
      holder.add(entity.instance.join(' '));
      for (const child of strategy.successors(entity)) {
        const label = child.instance.join(' ');
        if (!holder.has(label) && !openNodes.has(label)) {
          openNodes.add(label);
          child.isTarget = strategy.isGoal(child, this.targetInstance);
          if (child.isTarget || strategy.hybrid(child)) {
            return child;
          }
          const priority =
            child.history.length + strategy.h(child, this.targetInstance);
          if (priority <= strategy.bound(child)) {
            this.implementsNodeCount++;
            this.priorityQueue.insert(priority, child);
          }
        }
      }
    }
    return undefined;
  }

  private simpleSolve(sourceInstance: P, secondPhase = false): void {
    this.priorityQueue.clear();
    const openNodes = new Set<string>();
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
      holder.add(entity.instance.join(' '));
      for (const child of strategy.successors(entity)) {
        const label = child.instance.join(' ');
        if (!holder.has(label) && !openNodes.has(label)) {
          openNodes.add(label);
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
  private twoWaySearch(): void {
    const strategy = new StrategyFactory<P>(this.strategyConfig);
    const forwardOpenNodes = new Set<string>();
    const forwardHolder = new Map<string, string>();
    const forwardQueue = new PriorityQueue<T, P>(this.heapClass);
    forwardQueue.insert(
      this.strategy.h(this.sourceInstance, this.targetInstance),
      { ...this.sourceInstance }
    );
    const backwardOpenNodes = new Set<string>();
    const backwardHolder = new Map<string, string>();
    const backwardQueue = new PriorityQueue<T, P>(this.heapClass);
    backwardQueue.insert(
      this.strategy.h(this.targetInstance, this.sourceInstance),
      { ...this.targetInstance }
    );

    this.sourceInstance.isTarget = strategy.isGoal(
      this.sourceInstance,
      this.targetInstance
    );
    for (; true; ) {
      const [forward, backward] = [
        this.searchThread(
          forwardHolder,
          backwardHolder,
          forwardQueue,
          forwardOpenNodes,
          this.targetInstance
        ),
        this.searchThread(
          backwardHolder,
          forwardHolder,
          backwardQueue,
          backwardOpenNodes,
          this.sourceInstance
        ),
      ];
      if (forward === -1 || backward === -1) {
        console.log('end of queue', forward, backward);
        return;
      }
      if (Array.isArray(forward)) {
        this.solution =
          forward[0].history + NPuzzleSolver.solveInverter(forward[1]);
        return;
      }
      if (Array.isArray(backward)) {
        this.solution =
          backward[1] + NPuzzleSolver.solveInverter(backward[0].history);
        return;
      }
    }
  }

  private searchThread(
    selfHolder: Map<string, string>,
    otherHolder: Map<string, string>,
    priorityQueue: PriorityQueue<T, P>,
    openNodes: Set<string>,
    targetInstance: P
  ): [NPuzzle, string | undefined] | number {
    const entity = priorityQueue.pop();
    if (!entity) {
      return -1;
    }
    this.closedNodes++;
    selfHolder.set(entity.instance.join(' '), entity.history);
    for (const child of this.strategy.successors(entity)) {
      const label = child.instance.join(' ');
      if (otherHolder.has(label)) {
        return [child, otherHolder.get(label)];
      }
      if (!selfHolder.has(label) && !openNodes.has(label)) {
        openNodes.add(label);
        this.implementsNodeCount++;
        // child.isTarget = strategy.isGoal(child, this.targetInstance);
        priorityQueue.insert(
          child.history.length + this.strategy.h(child, targetInstance),
          child
        );
      }
    }
    return 0;
  }
}
