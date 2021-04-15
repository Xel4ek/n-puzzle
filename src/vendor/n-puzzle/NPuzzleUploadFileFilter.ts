import { NPuzzle } from '@vendor/n-puzzle/NPuzzle';

export class NPuzzleUploadFileFilter {
  private readonly puzzles: NPuzzle[] = [];

  constructor(private readonly source: string[]) {
    this.filter();
  }

  private static isDigit(tested: string): boolean {
    return /^\d+$/.test(tested.trim());
  }

  private static makeRow(value: string): number[] | undefined {
    const rawRow = value
      .trim()
      .split(' ')
      .filter((el) => el.trim().length);
    const row: number[] = [];
    for (const entry of rawRow) {
      if (NPuzzleUploadFileFilter.isDigit(entry)) {
        const digit = parseInt(entry, 10);
        row.push(digit);
      } else {
        return;
      }
    }
    return row;
  }

  getPuzzles(): NPuzzle[] {
    return this.puzzles;
  }

  private filter(): void {
    for (let i = 0; i < this.source.length; ++i) {
      if (NPuzzleUploadFileFilter.isDigit(this.source[i])) {
        const size = parseInt(this.source[i], 10);
        if (size + i < this.source.length) {
          const instance: number[] = [];
          let j = 0;
          for (; j < size; ++j) {
            const row = NPuzzleUploadFileFilter.makeRow(this.source[i + j + 1]);
            if (row?.length !== size) {
              break;
            } else {
              instance.push(...row);
            }
          }
          if (
            instance.length === size * size &&
            [...Array(size * size).keys()].every((digit) =>
              instance.includes(digit)
            )
          ) {
            if (size > 1) {
              this.puzzles.push(new NPuzzle(size, instance));
            }
          }
          i += j;
        }
      }
    }
  }
}
