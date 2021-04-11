export class Point {
    constructor(indexOrSize, instanceOrRow, col) {
        if (instanceOrRow instanceof Array) {
            this.index = instanceOrRow.indexOf(0);
            const size = Math.trunc(Math.sqrt(instanceOrRow.length));
            this.row = Math.trunc(this.index / size);
            this.col = this.index % size;
        }
        else {
            this.index = indexOrSize;
            this.col = col ?? 0;
            this.row = instanceOrRow;
        }
    }
}
//# sourceMappingURL=Point.js.map