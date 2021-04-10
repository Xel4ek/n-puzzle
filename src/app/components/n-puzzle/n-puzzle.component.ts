import { Component, NgZone, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { MappedNPuzzle, NPuzzle } from '@vendor/n-puzzle/NPuzzle';

import {
  NPuzzleSolver,
  NPuzzleSolverReport,
} from '@vendor/n-puzzle/NPuzzleSolver';

import { NPuzzleGenerator } from '@vendor/n-puzzle/NPuzzleGenerator';
import { LeftHeap } from '@vendor/heap/left-heap/LeftHeap';
import { DataHolderService } from '@services/data-holder/data-holder.service';
import { MANHATTAN } from '@vendor/n-puzzle/strategy';
import { Strategy } from '@vendor/n-puzzle/puzzle.interfaces';
import { Heap } from '@vendor/heap/binary-heap/heap';

type AlgorithmList = 'manhattan';
const algorithmMAp: { [key in AlgorithmList]: Strategy<NPuzzle> } = {
  manhattan: MANHATTAN,
};
type HeapList = 'left' | 'binary';

@Component({
  selector: 'app-n-puzzle',
  templateUrl: './n-puzzle.component.html',
  styleUrls: ['./n-puzzle.component.scss'],
})
export class NPuzzleComponent implements OnInit {
  puzzle: any;
  calculated = false;
  size = 3;
  algorithm: AlgorithmList = 'manhattan';
  heap: HeapList = 'left';
  results: NPuzzleSolverReport[] = [];

  constructor(
    private readonly zone: NgZone,
    private readonly dataHolder: DataHolderService
  ) {
    this.generate();
  }

  ngOnInit(): void {}

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
    this.solver(this.puzzle);
  }

  generate(): void {
    this.puzzle = new NPuzzleGenerator(this.size).generate();
  }

  clear(): void {
    this.results = [];
    this.dataHolder.updateResult([]);
  }

  solveFromGame(puzzle: NPuzzle): void {
    this.solver(puzzle);
  }
  private solver(puzzle: NPuzzle): void {
    if (this.calculated) {
      return;
    }
    this.calculated = true;
    const sourceInstance = puzzle;
    const targetInstance = (() => {
      const target = [...this.puzzle.instance].sort((a, b) => a - b);
      return new MappedNPuzzle(this.puzzle.size, [...target.slice(1), 0]);
    })();
    let solver: NPuzzleSolver<any, any>;
    if (this.heap === 'left') {
      solver = new NPuzzleSolver<LeftHeap<NPuzzle>, NPuzzle>(
        LeftHeap,
        algorithmMAp[this.algorithm],
        sourceInstance,
        targetInstance
      );
    }
    if (this.heap === 'binary') {
      solver = new NPuzzleSolver<Heap<NPuzzle>, NPuzzle>(
        Heap,
        algorithmMAp[this.algorithm],
        sourceInstance,
        targetInstance
      );
    }
    const result =  this.zone.runOutsideAngular(() => {
      return solver.solve();
    });
    this.results.push(result);
    this.dataHolder.updateResult(this.results);
    this.calculated = false;
  }
}
