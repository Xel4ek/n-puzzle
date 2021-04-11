import { Component, Input, OnInit } from '@angular/core';
import { NPuzzleSolverReport } from '@vendor/n-puzzle/NPuzzleSolver';
import { BehaviorSubject, EMPTY, from, Observable, of } from 'rxjs';
import { concatMap, delay, delayWhen, filter, finalize, share, startWith } from 'rxjs/operators';
import { NPuzzle } from '@vendor/n-puzzle/NPuzzle';

@Component({
  selector: 'app-n-puzzle-result[result][index]',
  templateUrl: './n-puzzle-result.component.html',
  styleUrls: ['./n-puzzle-result.component.scss'],
})
export class NPuzzleResultComponent implements OnInit {
  @Input() result!: NPuzzleSolverReport;
  @Input() index!: number;
  timeBetweenSteps = 300;
  private delay;
  solution?: string[];
  progress = false;
  progressBar$?: Observable<number>;
  play$ = new BehaviorSubject<boolean>(false);
  flow$?: Observable<string>;
  instance?: NPuzzle;

  constructor() {
    this.delay = this.timeBetweenSteps;
  }

  ngOnInit(): void {
    this.solution = this.result.solution.split('');
    this.backward();
  }

  play(): void {
    this.play$.next(true);
  }

  pause(): void {
    this.play$.next(false);
  }

  backward(): void {
    this.instance = { ...this.result.sourceInstance };
    this.instance.instance = [...this.result.sourceInstance.instance];
    this.flow$ = from(this.result.solution);
    this.pause();
    this.progressBar$ = this.initialization(this.flow$);
  }

  forward(): void {
    this.delay = 0;
    this.play();
  }

  private initialization(flow: Observable<string>): Observable<number> {
    return flow.pipe(
      concatMap((action, index) =>
        of(action).pipe(
          delayWhen(() => this.play$.pipe(filter((v) => v))),
          concatMap(() => {
            this.move(action);
            return of(index).pipe(delay(this.delay));
          })
        )
      ),
      share(),
      finalize(() => {
        this.delay = this.timeBetweenSteps;
        this.pause();
      })
    );
  }

  private move(action: string): void {
    if (!this.instance) {
      return;
    }
    const size = this.instance.size;
    const instance = this.instance.instance;
    const index = instance.indexOf(0);
    switch (action) {
      case 'u':
        [instance[index], instance[index - size]] = [
          instance[index - size],
          instance[index],
        ];
        break;
      case 'l':
        [instance[index], instance[index - 1]] = [
          instance[index - 1],
          instance[index],
        ];
        break;
      case 'r':
        [instance[index], instance[index + 1]] = [
          instance[index + 1],
          instance[index],
        ];

        break;
      case 'd':
        [instance[index], instance[index + size]] = [
          instance[index + size],
          instance[index],
        ];

        break;
      default:
        break;
    }
  }
}
