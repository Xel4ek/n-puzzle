import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, first, map, mergeMap, toArray } from 'rxjs/operators';
import { MappedNPuzzle, NPuzzle } from '@vendor/n-puzzle/NPuzzle';

import { NPuzzleSolver, NPuzzleSolverReport, } from '@vendor/n-puzzle/NPuzzleSolver';
import { LeftHeap } from '@vendor/heap/left-heap/LeftHeap';
import { DataHolderService } from '@services/data-holder/data-holder.service';
import { LINEAR_CONFLICT, MANHATTAN, WRONG_PLACE, } from '@vendor/n-puzzle/strategy';
import { Expansion, Strategy } from '@vendor/n-puzzle/puzzle.interfaces';
import { Heap } from '@vendor/heap/binary-heap/heap';
import { NPuzzleUploadFileFilter } from '@vendor/n-puzzle/NPuzzleUploadFileFilter';
import { FormControl } from '@angular/forms';

type AlgorithmList = 'manhattan' | 'wrongPlace';
export const ALGORITHMS_MAP: {
  [key in AlgorithmList]: Omit<Strategy<NPuzzle>, 'expansion'>;
} = {
  manhattan: MANHATTAN,
  wrongPlace: WRONG_PLACE,
};
type HeapList = 'left' | 'binary';

type ExpansionList = 'linearConflict';
export const EXPLANATIONS_MAP: {
  [key in ExpansionList]: Expansion<NPuzzle | MappedNPuzzle>;
} = {
  linearConflict: LINEAR_CONFLICT,
};

@Component({
  selector: 'app-n-puzzle',
  templateUrl: './n-puzzle.component.html',
  styleUrls: ['./n-puzzle.component.scss'],
})
export class NPuzzleComponent implements OnInit, OnDestroy {
  uploaded = 0;
  calculated = false;
  algorithm: AlgorithmList = 'manhattan';
  expansionsKey: { key: ExpansionList; title: string }[] = [
    {key: 'linearConflict', title: 'Linear Conflict'},
  ];
  heap: HeapList = 'left';
  results: NPuzzleSolverReport[] = [];
  expansions = new FormControl([]);
  private sizeHolder = 3;

  constructor(
    private readonly zone: NgZone,
    private readonly dataHolder: DataHolderService
  ) {
  }

  get size(): number {
    return this.sizeHolder;
  }

  set size(value) {
    this.sizeHolder = value;
    if (value > 3) {
      this.algorithm = 'manhattan';
    }
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
    const sub: Subscription = fromEvent(reader, 'load')
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
        toArray(),
        mergeMap((value) => {
          const uploaded = new NPuzzleUploadFileFilter(value).getPuzzles();
          this.uploaded += uploaded.length;
          return uploaded;
        }),
        map((puzzle) => this.solver(puzzle))
      )
      .subscribe({
        complete: () => {
          console.log('Done !');
          sub.unsubscribe();
        },
      });
  }

  clear(): void {
    this.results = [];
    this.dataHolder.updateResult([]);
  }

  solveFromGame(puzzle: NPuzzle): void {
    this.solver(puzzle);
  }

  ngOnDestroy(): void {
  }

  private solver(puzzle: NPuzzle): void {
    if (this.calculated) {
      return;
    }
    this.calculated = true;
    const sourceInstance = puzzle;
    const targetInstance = (() => {
      const target = [...puzzle.instance].sort((a, b) => a - b);
      return new MappedNPuzzle(puzzle.size, [...target.slice(1), 0]);
    })();
    let solver: NPuzzleSolver<any, any>;
    if (this.heap === 'left') {
      solver = new NPuzzleSolver<LeftHeap<NPuzzle>, NPuzzle>(
        LeftHeap,
        {
          ...ALGORITHMS_MAP[this.algorithm],
          expansion: this.expansions.value.map(
            (expansion: ExpansionList) => EXPLANATIONS_MAP[expansion]
          ),
        },
        sourceInstance,
        targetInstance
      );
    }
    if (this.heap === 'binary') {
      solver = new NPuzzleSolver<Heap<NPuzzle>, NPuzzle>(
        Heap,
        {
          ...ALGORITHMS_MAP[this.algorithm],
          expansion: this.expansions.value.map(
            (expansion: ExpansionList) => EXPLANATIONS_MAP[expansion]
          ),
        },
        sourceInstance,
        targetInstance
      );
    }
    const result = this.zone.runOutsideAngular(() => {
      return solver.solve();
    });
    this.results.push(result);
    this.dataHolder.updateResult(this.results);
    this.calculated = false;
  }
}
