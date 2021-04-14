import { MappedNPuzzle, NPuzzle } from './NPuzzle';
import { NPuzzleValidator } from './NPuzzleValidator';

export class NPuzzleGenerator {
  private readonly size: number;
  private readonly key: string;
  private instance: number[];

  /*
   If N is odd, then puzzle instance is solvable if number of inversions is even in the input state.
  If N is even, puzzle instance is solvable if:
    - the blank is on an even row counting from the bottom (second-last, fourth-last, etc.) and number of inversions is odd.
    - the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.) and number of inversions is even.
  For all other cases, the puzzle instance is not solvable.
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

  //TODO: make snake generator
  static snakeTragetGenerator(size: number): MappedNPuzzle {
    function range(startAt: number = 0, n: number): ReadonlyArray<number> {
      if (startAt === n) {
        return [...Array(1).keys()].map((i) => i);
      }
      return [...Array(n).keys()].map((i) => i + startAt);
    }

    let m = 0;
    let st = 1;
    const mat = Array(size * size);
    for (let v of range(0, Math.floor(size / 2))) {
      for (let i of range(0, size - m)) {
        mat[i + v + v * size] = st;
        st += 1;
      }
      for (let i of range(v + 1, size - v - 1)) {
        mat[size * i + (size - 1 - v)] = st;
        st += 1;
      }
      for (let i of range(v + 1, size - v - 1)) {
        mat[size * size - 1 - i - size * v] = st;
        st += 1;
      }
      for (let i of range(v, size - v - 2)) {
        mat[size * (size - 2 - i) + v] = st;
        st += 1;
      }
      m += 2;
    }
    console.log(mat);
    return new MappedNPuzzle(size, mat);
    // throw new Error('Method not implemented');
  }

  generate(): NPuzzle {
    // for (let valid = false; !valid; ) {
    //   this.instance = [...Array(this.size * this.size).keys()].sort(
    //     (a, b) => 0.5 - Math.random()
    //   );
    //   console.log('new');
    //   valid = new NPuzzleValidator().validate(this.instance);
    // }
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
