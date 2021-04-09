import { Component, NgZone, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { Strategy } from '../../../vendor/n-puzzle/Strategy';
import { MappedNPuzzle, NPuzzle } from '../../../vendor/n-puzzle/NPuzzle';

import {
  NPuzzleSolver,
  NPuzzleSolverReport,
} from '../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzleGenerator } from '../../../vendor/n-puzzle/NPuzzleGenerator';
import { PriorityQueue } from '../../../vendor/priority-queue/priority-queue';
import { LeftHeap } from '../../../vendor/heap/left-heap/LeftHeap';
import { DataHolderService } from '../../services/data-holder/data-holder.service';

@Component({
  selector: 'app-n-puzzle',
  templateUrl: './n-puzzle.component.html',
  styleUrls: ['./n-puzzle.component.scss'],
})
export class NPuzzleComponent implements OnInit {
  puzzle: any;
  calculated = false;
  size = 3;
  results: NPuzzleSolverReport<NPuzzle>[] = [];

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
    if (this.calculated) {
      return;
    }
    this.calculated = true;
    const taxicabH = ([currentRow, currentCol]: number[], [targetRow, targetCol]: number[]): number => {
      return Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
    };

    const generate = (
      parent: NPuzzle,
      drow: number,
      dcol: number
    ): NPuzzle | undefined => {
      const index = parent.instance.indexOf(0);
      const size = parent.size;
      const newRow = Math.trunc(index / size) + drow;
      const newCol = (index % size) + dcol;
      if (
        newRow >= size ||
        newRow < 0 ||
        newCol >= size ||
        newCol < 0
      ) {
        return;
      }
      const newIndex = newRow * size + newCol;

      const action = (() => {
        if (dcol === 1) {
          return 'r';
        }
        if (dcol === -1) {
          return 'l';
        }
        if (drow === 1) {
          return 'd';
        }
        if (drow === -1) {
          return 'u';
        }
        return '';
      })();
      const instance = [...parent.instance];
      [instance[newIndex], instance[index]] = [
        instance[index],
        instance[newIndex],
      ];
      return new NPuzzle(size, instance, parent.history + action);
    };
    const produce = (snapshot: NPuzzle): NPuzzle[] => {
      const queue = [];

      const up = generate(snapshot, -1, 0);
      if (up) {
        queue.push(up);
      }
      const down = generate(snapshot, 1, 0);
      if (down) {
        queue.push(down);
      }
      const left = generate(snapshot, 0, -1);
      if (left) {
        queue.push(left);
      }
      const right = generate(snapshot, 0, 1);
      if (right) {
        queue.push(right);
      }
      return queue;
    };
    const strategy = new Strategy<NPuzzle>({
      h: taxicabH,
      g: (source: MappedNPuzzle, current: NPuzzle) => 1,
      successors: (snapshot: NPuzzle) => produce(snapshot),
      goalH: 0
    });
    const sourceInstance = this.puzzle;
    const targetInstance = (() => {
      const target = [...this.puzzle.instance].sort(((a, b) => a - b));
      return new MappedNPuzzle(this.puzzle.size, [...target.slice(1), 0]);
    })();
    const solver = new NPuzzleSolver<LeftHeap<NPuzzle>, NPuzzle>(
      LeftHeap,
      strategy,
      sourceInstance,
      targetInstance
    );
    const result = this.zone.runOutsideAngular(() => {
      return solver.solve();
    });
    this.results.push(result);
    this.dataHolder.updateResult(this.results);
    this.calculated = false;
  }

  heapTest(): void {
    const queue = new PriorityQueue<LeftHeap<number[]>, number[]>(LeftHeap);
    queue.insert(1, [1, 123, 12]);
    queue.insert(10, [10, 123, 12]);
    queue.insert(-12, [-12, 123, 12]);
    queue.insert(-12, [-12, 123, 12]);
    queue.insert(0, [0, 123, 12]);
    console.log(queue.pop());
    console.log(queue.pop());
    console.log(queue.pop());
    console.log(queue.pop());
    console.log(queue.pop());
    console.log(queue.pop());
  }

  generate(): void {
    this.puzzle =
      // new MappedNPuzzle(4, [
      //   1, 2, 3, 4,
      //   5, 6, 7, 8,
      //   9, 10, 11, 12,
      //   13, 14, 15, 0]);
      // new MappedNPuzzle(3, [1, 2, 3, 4, 5, 6, 7, 8, 0]);
    new NPuzzleGenerator(this.size).generate();
  }

  clear(): void {
    this.results = [];
    this.dataHolder.updateResult([]);
  }
}
