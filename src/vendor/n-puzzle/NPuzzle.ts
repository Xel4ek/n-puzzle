import { NPuzzleInterface } from './puzzle.interfaces';
import { Point } from './Point';

export class NPuzzle implements NPuzzleInterface {
  instance: number[];
  pivot: Point;
  size: number;

  constructor(
    size: number,
    instance: number[],
    pivot?: Point,
  ) {
    this.size = size;
    this.pivot = pivot ?? new Point(size, instance);
    this.instance = instance;
  }

  show(): void {
    console.group('[NPuzzle]');
    for (let i = 0; i < this.size; i++) {
      console.log(this.instance.slice(i * this.size, (i + 1) * this.size));
    }
    // console.log({last: this.lastModified});
    console.log({pivot: this.pivot});
    console.groupEnd();
  }
}

export class MappedNPuzzle extends NPuzzle {
  mapInstance: Map<number, Pick<Point, 'row' | 'col'>>;

  constructor(size: number, instance: number[], pivot?: Point) {
    super(size, instance, pivot);
    this.mapInstance = new Map<number, Pick<Point, 'row' | 'col'>>();

    instance.map((entry, index) => {
      this.mapInstance.set(entry, {
        col: index % this.size,
        row: Math.trunc(index / this.size),
      });
    });
  }
}
