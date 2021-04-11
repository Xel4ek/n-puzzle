import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { NPuzzleSolverReport } from '@vendor/n-puzzle/NPuzzleSolver';
import { AverageResults } from '@vendor/n-puzzle/puzzle.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataHolderService implements OnDestroy {
  private readonly totalResult$ = new ReplaySubject<AverageResults[]>(1);

  constructor() {
  }

  private static collectData(
    resultList: NPuzzleSolverReport[]
  ): AverageResults {
    return {
      ...resultList.reduce(
        (acc: any, nPuzzleReport) => {
          acc.totalRequiredSteps += nPuzzleReport.requiredSteps;
          acc.solvableCount += nPuzzleReport.solvable ? 1 : 0;
          acc.totalTime += nPuzzleReport.timeUsed;
          acc.totalStates += nPuzzleReport.closedNodes;
          acc.totalNodes += nPuzzleReport.implementsNodeCount;
          acc.size = nPuzzleReport.size;
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
    };
  }

  private static groupBy = (items: { [key: string]: any }[], key: string) =>
    items.reduce(
      (result: { [key: number]: unknown[] }, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] ?? []), item],
      }),
      {}
    )

  ngOnDestroy(): void {
    this.totalResult$.complete();
  }

  updateResult(resultList: NPuzzleSolverReport[]): void {
    const average: AverageResults[] = [];
    Object.values(DataHolderService.groupBy(resultList, 'size')).map((list) => {
      average.push(
        DataHolderService.collectData(list as NPuzzleSolverReport[])
      );
    });
    this.totalResult$.next(average.sort((a, b) => a.size - b.size));
  }

  getAverageData(): Observable<AverageResults[]> {
    return this.totalResult$.asObservable();
  }
}
