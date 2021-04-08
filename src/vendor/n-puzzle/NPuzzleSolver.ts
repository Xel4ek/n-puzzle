import { Node, NodeFactory } from './Node';
import { MappedNPuzzle, NPuzzle } from './NPuzzle';
import { Strategy } from './Strategy';
import { PriorityQueue } from '../priority-queue/priority-queue';
import { NPuzzleValidator } from './NPuzzleValidator';
import { HeapInterface } from '../heap/heap.interface';

interface NPuzzleSolverReport<T> {
  selectedStates: number;
  implementsNodeCount: number;
  requiredSteps: number;
  solvable: boolean;
}

export class NPuzzleSolver<T extends HeapInterface<any>> {
  private selectedStates = 0;
  private implementsNodeCount = 0;
  private requiredSteps = 0;
  private solvable: boolean;
  private readonly factory?: NodeFactory<NPuzzle>;
  private readonly priorityQueue: PriorityQueue<T, Node<NPuzzle>>;

  constructor(
    private readonly heapClass: new () => T,
    private readonly strategy: Strategy<NPuzzle>,
    private readonly sourceInstance: MappedNPuzzle,
    private readonly targetInstance: MappedNPuzzle,
  ) {
    this.priorityQueue = new PriorityQueue<T, Node<NPuzzle>>(heapClass);
    this.solvable = new NPuzzleValidator().validate(sourceInstance);
    if (this.solvable) {
      this.factory = new NodeFactory<NPuzzle>(
        strategy,
        sourceInstance,
        targetInstance
      );
    }
  }

  solve(): NPuzzleSolverReport<NPuzzle> {
    if (!this.factory) {
      throw new Error('NPuzzle unsolved');
    }
    console.warn('Start');
    const holder = new Set<string>();
    const sourceNode = this.factory.init();
    this.priorityQueue.insert(
      sourceNode.score + sourceNode.predict,
      sourceNode
    );
    let destroy = 0;
    for (
      let entity = this.priorityQueue.pop();
      entity;
      entity = this.priorityQueue.pop()
    ) {
      destroy++;
      if (destroy > 16000000) {
        console.log(this.priorityQueue.size);
        entity.snapshot.show();
        entity.show();
        console.warn(destroy);
        break;
      }
      if (destroy % 100000 === 0) {
        console.log(destroy);
        entity.snapshot.show();
      }
      // if (destroy % 1000 === 0) {
      //   console.warn(destroy);
      //   entity.show();
      //   entity.snapshot.show();
      // }
      // console.warn(this.priorityQueue.size);
      // console.group('GET', destroy);
      // entity.show();
      // entity.snapshot.show();
      // console.groupEnd();
      // console.group('ADD');
      holder.add(entity.snapshot.instance.join(' '));
      if (entity.isTarget) {
        console.error('EEEE');
        console.log(entity);
        break;
      }
      this.factory.produce(entity).map((child) => {
        if (!holder.has(child.snapshot.instance.join(' '))) {
          this.priorityQueue.insert(child.score + child.predict, child);
        }
      });
      // console.groupEnd();
    }
    console.error('FINISH');
    console.log(holder);
    return {
      selectedStates: this.selectedStates,
      implementsNodeCount: this.implementsNodeCount,
      requiredSteps: this.requiredSteps,
      // history: EMPTY,
      solvable: this.solvable,
    };
  }

  private validate(startInstance: NPuzzle): boolean {
    return true;
  }
}
