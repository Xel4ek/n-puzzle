import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NPuzzleSolverReport } from '../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '../../../vendor/n-puzzle/NPuzzle';

@Injectable({
  providedIn: 'root',
})
export class DataHolderService {
  private readonly loading$ = new BehaviorSubject<boolean>(false);
  private readonly totalResult$ = new BehaviorSubject({ len: 0 });

  constructor() {}

  set loading(value: boolean) {
    this.loading$.next(value);
  }

  get isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  updateResult(resultList: NPuzzleSolverReport[]): void {
    this.totalResult$.next({
      ...resultList.reduce(
        (acc: any, nPuzzleReport) => {
          acc.totalRequiredSteps += nPuzzleReport.requiredSteps;
          acc.solvableCount += nPuzzleReport.solvable ? 1 : 0;
          acc.totalTime += nPuzzleReport.timeUsed;
          acc.totalStates += nPuzzleReport.closedNodes;
          acc.totalNodes += nPuzzleReport.implementsNodeCount;
          return acc;
        },
        {
          totalRequiredSteps: 0,
          solvableCount: 0,
          totalTime: 0,
          totalStates: 0,
          totalNodes: 0,
        }
      ),
      len: resultList.length,
    });
  }

  getAverageData(): Observable<any> {
    return this.totalResult$.asObservable();
  }
}
