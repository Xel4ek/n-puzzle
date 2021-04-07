import { NPuzzle } from './NPuzzle';

export class NPuzzleValidator {
  validate(startInstance: NPuzzle): boolean {
    const inversions = this.countInversions(startInstance.instance);
    const blankRow =
      startInstance.size -
      Math.floor(startInstance.instance.indexOf(0) / startInstance.size);
    console.log(blankRow);
    if (
      startInstance.size % 2 === 0 &&
      ((blankRow % 2 === 0 && inversions % 2 === 1) ||
        (blankRow % 2 === 1 && inversions % 2 === 0))
    ) {
      return true;
    } else {
      if (inversions % 2 === 0) {
        return true;
      }
    }
    return false;
  }

  private countInversions(array: number[]): number {
    let count = 0;
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] && array[i] && array[i] > array[j]) {
          count++;
        }
      }
    }
    console.log(count);
    return count;
  }
}
