export class Point {
  index: number;
  row: number;
  col: number;
  constructor(size: number, instance: number[]);
  constructor(index: number, row: number, col: number);
  constructor(indexOrSize: number, instanceOrRow: number | number[], col?: number) {
    if (instanceOrRow instanceof Array) {
      this.index = instanceOrRow.indexOf(0);
      const size = Math.trunc(Math.sqrt(instanceOrRow.length));
      this.row = Math.trunc(this.index / size);
      this.col = this.index % size;
    } else {
      this.index = indexOrSize;
      this.col = col ?? 0;
      this.row = instanceOrRow;
    }
  }
}
