import { NPuzzle } from './NPuzzle';

export class NPuzzleValidator {
  validate(startInstanceOrInstance: NPuzzle | number[]): boolean {
    if (startInstanceOrInstance instanceof NPuzzle) {
      return this.validateInstance(startInstanceOrInstance.instance);
    }
    return this.validateInstance(startInstanceOrInstance);
  }

  private validateInstance(instance: number[]): boolean {
    const size = Math.trunc(Math.sqrt(instance.length));
    const inversions = this.countInversions(instance);
    const blankRow = 1 + Math.trunc(instance.indexOf(0) / size);
    // console.log(blankRow);
    return ((inversions + blankRow + size) % 2 === 0);
  }

  private countInversions(array: number[]): number {
    let count = 0;
    for (let i = 0; i < array.length; ++i) {
      if (array[i]) {
        for (let j = 0; j < i; ++j) {
          if (array[j] > array[i]) {
            count++;
          }
        }
      }
    }
    // console.log(count);
    return count;
  }
}
