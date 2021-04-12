import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Mode {
  nPuzzleStyle: boolean; // 'snake' | 'regular' true | false
  solveStyle: boolean; //   'twoWay'| 'oneWay' true | false
}

@Injectable({
  providedIn: 'root',
})
export class ModeService implements OnDestroy {
  private readonly mode$ = new BehaviorSubject<Mode>({
    nPuzzleStyle: true,
    solveStyle: true,
  });
  constructor() {}
  style(): Observable<Mode> {
    return this.mode$.asObservable();
  }
  setStyle(style: Partial<Mode>): void {
    const currentStyle = this.mode$.getValue();
    this.mode$.next({ ...currentStyle, ...style });
  }

  toggleNPuzzleType(): void {
    const currentStyle = this.mode$.getValue();
    currentStyle.nPuzzleStyle = !currentStyle.nPuzzleStyle;
    this.mode$.next(currentStyle);
  }
  toggleSolveStyle(): void{
    const currentStyle = this.mode$.getValue();
    currentStyle.solveStyle = !currentStyle.solveStyle;
    this.mode$.next(currentStyle);
  }
  ngOnDestroy(): void {
    this.mode$.complete();
  }
}
