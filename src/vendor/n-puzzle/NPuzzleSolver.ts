import { EMPTY, from, Observable, of } from 'rxjs';
import { expand, mergeMap, take, tap } from 'rxjs/operators';
import { NodeFactory } from './Node';
import { MappedNPuzzle, NPuzzle } from './NPuzzle';
import { Strategy } from './Strategy';

interface NPuzzleSolverReport<T> {
  selectedStates: number;
  implementsNodeCount: number;
  requiredSteps: number;
  history: Observable<T>;
  solvable: boolean;
}

export class NPuzzleSolver {
  private selectedStates = 0;
  private implementsNodeCount = 0;
  private requiredSteps = 0;
  private solvable: boolean;
  private readonly factory?: NodeFactory<NPuzzle>;

  constructor(
    strategy: Strategy<NPuzzle>,
    startInstance: MappedNPuzzle,
    targetInstance: MappedNPuzzle
  ) {
    this.solvable = this.validate(startInstance);
    if (this.solvable) {
      this.factory = new NodeFactory<NPuzzle>(
        strategy,
        startInstance,
        targetInstance
      );
    }
  }

  solve(): NPuzzleSolverReport<NPuzzle> {
    const test = this.factory?.produce();
    test?.subscribe(data => console.log(data));
    return {
      selectedStates: this.selectedStates,
      implementsNodeCount: this.implementsNodeCount,
      requiredSteps: this.requiredSteps,
      history: EMPTY,
      solvable: this.solvable,
    };
  }
  private validate(startInstance: NPuzzle): boolean {
    return true;
  }
}
