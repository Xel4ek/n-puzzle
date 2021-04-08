import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { NPuzzleSolverReport } from '../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '../../../vendor/n-puzzle/NPuzzle';

@Injectable({
  providedIn: 'root',
})
export class DataHolderService {
  private readonly loading$ = new BehaviorSubject<boolean>(false);
  private readonly totalResult$ = new BehaviorSubject({len: 0});

  constructor() {}

  set loading(value: boolean) {
    this.loading$.next(value);
  }

  get isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  updateResult(resultList: NPuzzleSolverReport<NPuzzle>[]): any {
    this.totalResult$.next({
      ...resultList.reduce(
        (acc: any, npuzzlereport) => {
          acc.totalRequiredSteps += npuzzlereport.requiredSteps;
          acc.solvableCount += npuzzlereport.solvable ? 1 : 0;
          acc.totalTime += npuzzlereport.timeUsed;
          return acc;
        },
        { totalRequiredSteps: 0, solvableCount: 0, totalTime: 0 }
      ),
      len: resultList.length,
    });
  }

  getAverageData(): Observable<any> {
    return this.totalResult$.asObservable();
  }
}
