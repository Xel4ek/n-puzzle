import { MappedNPuzzle, NPuzzle } from './NPuzzle';
import { NPuzzleValidator } from './NPuzzleValidator';
import { range } from '@vendor/n-puzzle/tools';

export class NPuzzleGenerator {
  private readonly size: number;
  private readonly key: string;
  private instance: number[];

  /**
   * If N is odd, then puzzle instance is solvable if number of inversions is even in the input state.
   * If N is even, puzzle instance is solvable if:
   * - the blank is on an even row counting from the bottom (second-last, fourth-last, etc.) and number of inversions is odd.
   * - the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.) and number of inversions is even.
   * For all other cases, the puzzle instance is not solvable.
   */
  constructor(
    size: number,
    private readonly mode: 'snake' | 'regular',
    key: 'solvable' | 'unsolvable' = 'solvable'
  ) {
    this.size = size;
    this.key = key;
    this.instance = [...Array(this.size * this.size).keys()].sort(
      (a, b) => 0.5 - Math.random()
    );
  }

  static snakeTargetGenerator(size: number): MappedNPuzzle {
    let pivot = 0;
    let st = 1;
    const center = Math.trunc(size / 2);
    const target = Array<number>(size * size);
    target[center + center * size] = size * size;
    range(center).map((v) => {
      {
        range(size - pivot).map((i) => {
          target[v * (size + 1) + i] = st;
          ++st;
        });
        range(v + 1, size - v).map((i) => {
          target[(i + 1) * size - v - 1] = st;
          ++st;
        });
        range(v + 1, size - v).map((i) => {
          target[(size - v - 1) * size + size - i - 1] = st;
          ++st;
        });
        range(v + 1, size - v - 1).map((i) => {
          target[(size - i - 1) * size + v] = st;
          ++st;
        });
        pivot += 2;
      }
    });
    target[target.indexOf(Math.max(...target))] = 0;
    return new MappedNPuzzle(size, target);
  }

  generate(): NPuzzle {
    const valid = NPuzzleValidator.validate(this.instance, this.mode);
    if (
      (valid && this.key === 'unsolvable') ||
      (!valid && this.key === 'solvable')
    ) {
      this.inversion();
    }
    return new MappedNPuzzle(this.size, this.instance);
  }

  private inversion(): void {
    if (this.instance.length) {
      [this.instance[0], this.instance[this.instance.length - 1]] = [
        this.instance[this.instance.length - 1],
        this.instance[0],
      ];
    }
  }
}
