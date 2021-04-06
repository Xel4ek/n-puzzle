import { Component, OnInit } from '@angular/core';
import { EMPTY, from, fromEvent, Observable, of } from 'rxjs';
import {
  expand,
  filter,
  first,
  map,
  mergeMap,
  take,
  tap,
} from 'rxjs/operators';
import { NPuzzleSolver } from '../../../vendor/n-puzzle/NPuzzleSolver';
import { Strategy } from '../../../vendor/n-puzzle/Strategy';
import { MappedNPuzzle, NPuzzle } from '../../../vendor/n-puzzle/NPuzzle';

@Component({
  selector: 'app-n-puzzle',
  templateUrl: './n-puzzle.component.html',
  styleUrls: ['./n-puzzle.component.scss'],
})
export class NPuzzleComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  uploadFile(fileList: FileList | null): void {
    if (!fileList || !fileList.length) {
      return;
    }
    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    fromEvent(reader, 'load')
      .pipe(
        first(),
        map((result) => {
          let binary = '';
          const bytes = new Uint8Array((result?.target as any).result);
          const length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return binary;
        }),
        mergeMap((data) => data.split('\n')),
        filter((str) => !str.startsWith('#') && !!str.trim().length),
        tap((data) => console.log(data))
      )
      .subscribe({
        complete: () => console.log('Done!'),
      });
    console.log(file);
  }

  solve(): void {
    const taxicabH = (lhs: NPuzzle, rhs: MappedNPuzzle): number => {
      const size = lhs.size;
      return rhs.instance.reduce((acc, cur, index) => acc + (index + 1) % size + Math.floor((index + 1) / size ));
    };

    const strategy = new Strategy<NPuzzle>({
      h: (current: NPuzzle, goal: MappedNPuzzle) => taxicabH(current, goal),
      g: (start: MappedNPuzzle, current: NPuzzle) => -taxicabH(current, start),
      successors: (snapshot: NPuzzle) => EMPTY,
      isGoal: (score: number) => false,
    });
    const startInstance = new MappedNPuzzle(5, [1, 2, 3]);
    const targetInstance = new MappedNPuzzle(5, [3, 2, 1]);
    const solver = new NPuzzleSolver(strategy, startInstance, targetInstance);
    console.log(strategy);
    console.log(solver);
    const result = solver.solve();
    console.log(result);
  }
}
