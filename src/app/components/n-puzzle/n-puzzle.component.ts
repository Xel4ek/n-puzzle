import { Component, NgZone, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { Strategy } from '../../../vendor/n-puzzle/Strategy';
import { MappedNPuzzle, NPuzzle } from '../../../vendor/n-puzzle/NPuzzle';
import { Point } from '../../../vendor/n-puzzle/Point';
import {
  NPuzzleSolver,
  NPuzzleSolverReport,
} from '../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzleGenerator } from '../../../vendor/n-puzzle/NPuzzleGenerator';
import { PriorityQueue } from '../../../vendor/priority-queue/priority-queue';
import { LeftHeap } from '../../../vendor/heap/left-heap/LeftHeap';
import { Node } from '../../../vendor/n-puzzle/Node';
import { DataHolderService } from '../../services/data-holder/data-holder.service';

@Component({
  selector: 'app-n-puzzle',
  templateUrl: './n-puzzle.component.html',
  styleUrls: ['./n-puzzle.component.scss'],
})
export class NPuzzleComponent implements OnInit {
  puzzle: any;
  calculated = false;
  size = 4;
  results: NPuzzleSolverReport<NPuzzle>[] = [];
  averageSteps = 0;
  averageTime = 0;
  solvableCount = 0;
  unsolvableCount = 0;

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
    const taxicabH = (lhs: NPuzzle, rhs: MappedNPuzzle): number => {
      const size = rhs.size;
      // let predict = 0;
      // lhs.instance.map((cur, index) => {
      //   const point = rhs.mapInstance.get(cur);
      //   if (point) {
      //     const { row, col } = point;
      //     predict +=
      //       Math.abs((index % size) - col) +
      //       Math.abs(Math.trunc(index / size) - row);
      //   }
      // });
      // return predict;
      return lhs.instance.reduce((acc, cur, index) => {
        const point = rhs.mapInstance.get(cur);
        if (point) {
          const { row, col } = point;
          return (
            acc +
            Math.abs((index % size) - col) +
            Math.abs(Math.floor(index / size) - row)
          );
        }
        return acc;
      }, 0);
    };

    const generate = (
      snapshot: NPuzzle,
      drow: number,
      dcol: number
    ): NPuzzle | undefined => {
      const newRow = snapshot.pivot.row + drow;
      const newCol = snapshot.pivot.col + dcol;
      const size = snapshot.size;
      if (
        newRow >= size ||
        newRow < 0 ||
        newCol >= size ||
        newCol < 0
        // ||
        // (newCol === snapshot.lastModified?.col &&
        //   newRow === snapshot.lastModified?.row)
      ) {
        return;
      }
      const newIndex = newRow * size + newCol;
      const instance = [...snapshot.instance];
      [instance[newIndex], instance[snapshot.pivot.index]] = [
        instance[snapshot.pivot.index],
        instance[newIndex],
      ];
      return new NPuzzle(
        snapshot.size,
        instance,
        new Point(newIndex, newRow, newCol),
      );
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
      h: (current: NPuzzle, goal: MappedNPuzzle) => taxicabH(current, goal),
      g: (source: MappedNPuzzle, current: NPuzzle) => 1,
      successors: (snapshot: NPuzzle) => produce(snapshot),
      isGoal: (snapshot, goal: MappedNPuzzle) => taxicabH(snapshot, goal) === 0,
    });
    const sourceInstance = this.puzzle;
    // new MappedNPuzzle(3, [7, 2, 3, 1, 8, 4, 6, 5, 0]);
    // const sourceInstance = new MappedNPuzzle(3, [3, 1, 2, 5, 4, 7, 0, 6, 8,]);
    // const sourceInstance = new MappedNPuzzle(4, [5, 11, 15, 12,
    //   4, 13, 8, 10,
    //   3, 0, 7, 6,
    //   14, 2, 9, 1]);
    // const sourceInstance = new MappedNPuzzle(4, [
    //   14,  8, 10, 13,
    //   12, 11,  3, 15,
    //   9,  2,  1,  0,
    //   7, 5,  4,  6]);

    // const sourceInstance = new MappedNPuzzle(5, [
    //   23, 6, 8, 17, 11,
    //   16, 10, 15, 4, 18,
    //   2, 24, 0, 21, 22,
    //   5, 19, 14, 20, 9,
    //   7, 1, 3, 13, 12,]);
    const targetInstance = new MappedNPuzzle(
      this.puzzle.size,
      [...this.puzzle.instance].sort()
    );
    // const targetInstance = new MappedNPuzzle(4, [
    //   1, 2, 3, 4,
    //   5, 6, 7, 8,
    //   9, 10, 11, 12,
    //   13, 14, 15, 0]);
    // const targetInstance = new MappedNPuzzle(5, [
    //   1, 2, 3, 4, 5,
    //   6, 7, 8, 9, 10,
    //   11, 12, 13, 14, 15,
    //   16, 17, 18, 19, 20,
    //   21, 22, 23, 24, 0]);
    // console.log(strategy.h(targetInstance, targetInstance));

    // sourceInstance.show();
    // console.log(strategy.h(sourceInstance, targetInstance));
    const solver = new NPuzzleSolver<LeftHeap<Node<NPuzzle>>, NPuzzle>(
      LeftHeap,
      strategy,
      sourceInstance,
      targetInstance
    );
    const result = this.zone.runOutsideAngular(() => {
      return solver.solve();
    });
    this.results.push(result);
    this.averageSteps =
      Array.from(this.results, (x) => x.requiredSteps).reduce(
        (sum, curr) => sum + curr,
        0
      ) / this.results.length;
    this.averageTime =
      Array.from(this.results, (x) => x.timeUsed).reduce(
        (sum, curr) => sum + curr,
        0
      ) / this.results.length;
    this.solvableCount = Array.from(this.results, (x) => x.solvable).filter(
      (x) => x
    ).length;
    this.unsolvableCount = this.results.length - this.solvableCount;
    this.calculated = false;
    // const result = solver.test();
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
    this.puzzle = new NPuzzleGenerator(this.size).generate();
  }
  clear(): void {
    this.results = [];
  }
}
