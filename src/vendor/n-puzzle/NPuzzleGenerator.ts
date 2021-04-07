import { MappedNPuzzle, NPuzzle } from './NPuzzle';
import { NPuzzleValidator } from './NPuzzleValidator';

export class NPuzzleGenerator {
  private readonly size: number;
  private readonly key: string;
  private readonly instance: number[];

  /*
   If N is odd, then puzzle instance is solvable if number of inversions is even in the input state.
  If N is even, puzzle instance is solvable if:
    - the blank is on an even row counting from the bottom (second-last, fourth-last, etc.) and number of inversions is odd.
    - the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.) and number of inversions is even.
  For all other cases, the puzzle instance is not solvable.
  */
  constructor(
    size: number,
    key: 'solvable' | 'unsolvable' | 'iteration' = 'solvable'
  ) {
    this.size = size;
    this.key = key;
    this.instance = [...Array(this.size * this.size).keys()].sort(
      (a, b) => 0.5 - Math.random()
    );
  }

  generate(): NPuzzle {
    const array = [...Array(this.size * this.size).keys()].sort(
      (a, b) => 0.5 - Math.random()
    );
    console.log(array);

    const puzzle = new MappedNPuzzle(this.size, array);
    if (
      (key === 'solvable' && new NPuzzleValidator().validate(puzzle)) ||
      key === 'unsolvable'
    ) {
      break;
    }
    return puzzle;
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
