import { NPuzzle } from './NPuzzle';

export class NPuzzleValidator {

  private static validateInstance(instance: number[]): boolean {
    const size = Math.trunc(Math.sqrt(instance.length));
    const inversions = NPuzzleValidator.countInversions(instance);
    if (size % 2 === 0) {
      const blankRow = 1 + Math.trunc(instance.indexOf(0) / size);
      // console.log(blankRow);
      return (inversions + blankRow) % 2 === 0;
    } else {
      return inversions % 2 === 0;
    }
  }

  private static countInversions(array: number[]): number {
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
  static validate(startInstanceOrInstance: NPuzzle | number[]): boolean {
    if (startInstanceOrInstance instanceof NPuzzle) {
      return NPuzzleValidator.validateInstance(startInstanceOrInstance.instance);
    }
    return NPuzzleValidator.validateInstance(startInstanceOrInstance);
  }
}
