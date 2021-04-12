import { Injectable, OnDestroy } from '@angular/core';
import { Mode, ModeService } from '@services/mode/mode.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MappedNPuzzle, NPuzzle } from '@vendor/n-puzzle/NPuzzle';

@Injectable({
  providedIn: 'root',
})
export class NPuzzlerService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private mode: 'snake' | 'regular' = 'snake';
  constructor(private readonly modeService: ModeService) {
    modeService
      .style()
      .pipe(
        takeUntil(this.destroy$),
        map((style) => {
          this.mode = style.nPuzzleStyle ? 'snake' : 'regular';
        })
      )
      .subscribe();
  }

  target(puzzle: NPuzzle): MappedNPuzzle {
    if (this.mode === 'regular') {
      return new MappedNPuzzle(puzzle.size, [
        ...[...puzzle.instance].sort((a, b) => a - b).slice(1),
        0,
      ]);
    }
    if (this.mode === 'snake') {
      return new MappedNPuzzle(puzzle.size, [
        ...[...puzzle.instance].sort((a, b) => a - b).slice(1),
        0,
      ]);
    }
    throw new Error('invalid NPuzzle mode');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
