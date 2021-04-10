import { NPuzzleInterface } from './puzzle.interfaces';

export class NPuzzle implements NPuzzleInterface {
  instance: number[];
  size: number;
  history: string;
  isTarget: boolean;

  constructor(
    size: number,
    instance: number[],
    history?: string,
    isTarget?: boolean
  ) {
    this.history = history ?? '';
    this.isTarget = isTarget ?? false;
    this.size = size;
    this.instance = instance;
  }

  // show(): void {
  //   console.group('[NPuzzle]');
  //   for (let i = 0; i < this.size; i++) {
  //     console.log(this.instance.slice(i * this.size, (i + 1) * this.size));
  //   }
  //   // console.log({last: this.lastModified});
  //   console.groupEnd();
  // }
}

export class MappedNPuzzle extends NPuzzle {
  mapInstance: Map<number, { row: number; col: number }>;

  constructor(size: number, instance: number[]) {
    super(size, instance);

    this.mapInstance = new Map<number, { row: number; col: number }>();

    instance.map((entry, index) => {
      this.mapInstance.set(entry, {
        col: index % this.size,
        row: Math.trunc(index / this.size),
      });
    });
  }
}
