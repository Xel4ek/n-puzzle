import { NPuzzleInterface } from './puzzle.interfaces';

export class NPuzzle implements NPuzzleInterface {
  instance: number[];
  pivot: number;
  size: number;
  mapInstance?: Map<number, number[]>;

  constructor(size: number, instance: number[], pivot?: number) {
    this.size = size;
    this.pivot = pivot ?? instance.indexOf(0);
    this.instance = instance;
  }

}

export class MappedNPuzzle extends NPuzzle {
  mapInstance: Map<number, number[]>;

  constructor(size: number, instance: number[], pivot?: number) {
    super(size, instance, pivot);
    this.mapInstance = new Map();

    instance.map((entry, index) => {
      this.mapInstance.set(entry, [index % this.size, Math.trunc(index / this.size)]);
    });
  }

}
