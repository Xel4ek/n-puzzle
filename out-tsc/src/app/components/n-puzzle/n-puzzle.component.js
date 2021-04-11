import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { MappedNPuzzle } from '../../../vendor/n-puzzle/NPuzzle';
import { NPuzzleSolver, } from '../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzleGenerator } from '../../../vendor/n-puzzle/NPuzzleGenerator';
import { PriorityQueue } from '../../../vendor/priority-queue/priority-queue';
import { LeftHeap } from '../../../vendor/heap/left-heap/LeftHeap';
import { MANHATTAN } from '@vendor/n-puzzle/strategy';
let NPuzzleComponent = class NPuzzleComponent {
    constructor(zone, dataHolder) {
        this.zone = zone;
        this.dataHolder = dataHolder;
        this.calculated = false;
        this.size = 3;
        this.results = [];
        this.generate();
    }
    ngOnInit() {
    }
    uploadFile(fileList) {
        if (!fileList || !fileList.length) {
            return;
        }
        const file = fileList[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        fromEvent(reader, 'load')
            .pipe(first(), map((result) => {
            let binary = '';
            const bytes = new Uint8Array((result === null || result === void 0 ? void 0 : result.target).result);
            const length = bytes.byteLength;
            for (let i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return binary;
        }), mergeMap((data) => data.split('\n')), filter((str) => !str.startsWith('#') && !!str.trim().length), tap((data) => console.log(data)))
            .subscribe({
            complete: () => console.log('Done!'),
        });
        console.log(file);
    }
    solve() {
        if (this.calculated) {
            return;
        }
        this.calculated = true;
        const sourceInstance = this.puzzle;
        const targetInstance = (() => {
            const target = [...this.puzzle.instance].sort((a, b) => a - b);
            return new MappedNPuzzle(this.puzzle.size, [...target.slice(1), 0]);
        })();
        const solver = new NPuzzleSolver(LeftHeap, MANHATTAN, sourceInstance, targetInstance);
        const result = this.zone.runOutsideAngular(() => {
            return solver.solve();
        });
        this.results.push(result);
        this.dataHolder.updateResult(this.results);
        this.calculated = false;
    }
    heapTest() {
        const queue = new PriorityQueue(LeftHeap);
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
    generate() {
        this.puzzle = new NPuzzleGenerator(this.size).generate();
    }
    clear() {
        this.results = [];
        this.dataHolder.updateResult([]);
    }
};
NPuzzleComponent = __decorate([
    Component({
        selector: 'app-n-puzzle',
        templateUrl: './n-puzzle.component.html',
        styleUrls: ['./n-puzzle.component.scss'],
    })
], NPuzzleComponent);
export { NPuzzleComponent };
//# sourceMappingURL=n-puzzle.component.js.map