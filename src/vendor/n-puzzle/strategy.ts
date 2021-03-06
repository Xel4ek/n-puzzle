import { MappedNPuzzle, NPuzzle } from './NPuzzle';
import { Expansion, Strategy } from './puzzle.interfaces';

const wrongPlace = (current: NPuzzle, target: NPuzzle): number => {
  if (!(target instanceof MappedNPuzzle)) {
    throw new Error('target must implement MappedNPuzzle class');
  }
  return current.instance.reduce((acc, cur, currentIndex) => {
    const point = target.mapInstance.get(cur);
    if (point) {
      const { index: targetIndex } = point;
      return acc + (targetIndex === currentIndex ? 0 : 1);
    } else {
      throw new Error('no Map');
    }
  }, 0);
};

const taxicabH = (current: NPuzzle, target: NPuzzle): number => {
  const size = target.size;
  if (!(target instanceof MappedNPuzzle)) {
    throw new Error('target must implement MappedNPuzzle class');
  }
  return current.instance.reduce((acc, cur, index) => {
    const point = target.mapInstance.get(cur);
    if (point) {
      const { row, col } = point;
      return (
        acc +
        Math.abs(Math.trunc(index / size) - row) +
        Math.abs((index % size) - col)
      );
    } else {
      throw new Error('no Map');
    }
  }, 0);
};

const generate = (
  parent: NPuzzle,
  drow: number,
  dcol: number,
  secondPhase = false
): NPuzzle | undefined => {
  const index = parent.instance.indexOf(0);
  const size = parent.size;
  const newRow = Math.trunc(index / size) + drow;
  const newCol = (index % size) + dcol;
  if (
    newRow >= size ||
    newRow < (secondPhase ? 1 : 0) ||
    newCol >= size ||
    newCol < 0
  ) {
    return;
  }
  const newIndex = newRow * size + newCol;

  const action = (() => {
    if (dcol === 1) {
      return 'r';
    }
    if (dcol === -1) {
      return 'l';
    }
    if (drow === 1) {
      return 'd';
    }
    if (drow === -1) {
      return 'u';
    }
    return '';
  })();
  const instance = [...parent.instance];
  [instance[newIndex], instance[index]] = [instance[index], instance[newIndex]];
  return new NPuzzle(size, instance, parent.history + action);
};
const produce = (snapshot: NPuzzle, secondPhase = false): NPuzzle[] => {
  const queue = [];

  const up = generate(snapshot, -1, 0, secondPhase);
  if (up) {
    queue.push(up);
  }
  const down = generate(snapshot, 1, 0, secondPhase);
  if (down) {
    queue.push(down);
  }
  const left = generate(snapshot, 0, -1, secondPhase);
  if (left) {
    queue.push(left);
  }
  const right = generate(snapshot, 0, 1, secondPhase);
  if (right) {
    queue.push(right);
  }
  return queue;
};

const godDigits = new Map<number, number>([
  [3, 31],
  [4, 80],
  [5, 208],
]);

const BASE_STRATEGY: Omit<Strategy<NPuzzle>, 'h' | 'expansion'> = {
  g: (source: MappedNPuzzle, current: NPuzzle) => 1,
  successors: (snapshot: NPuzzle, secondPhase) =>
    produce(snapshot, secondPhase),
  goalH: 0,
  bound(current: NPuzzle): number | undefined {
    return godDigits.get(current.size);
  },
};

export const MANHATTAN: Omit<Strategy<NPuzzle>, 'expansion'> = {
  ...BASE_STRATEGY,
  h: taxicabH,
};

export const WRONG_PLACE: Omit<Strategy<NPuzzle>, 'expansion'> = {
  ...BASE_STRATEGY,
  h: wrongPlace,
};

const arrayConflict = (current: number[], target: number[]): number => {
  const candidates: number[] = [];
  for (const item of target) {
    if (item !== 0) {
      const currentIndex = current.indexOf(item);
      if (currentIndex !== -1) {
        candidates.push(currentIndex);
      }
    }
  }
  let score = 0;
  if (candidates.length > 1) {
    for (let i = 0; i < candidates.length - 1; ++i) {
      for (let j = i + 1; j < candidates.length; ++j) {
        if (candidates[i] > candidates[j]) {
          score += 2;
        }
      }
    }
  }
  return score;
};

export const LINEAR_CONFLICT: Expansion<NPuzzle> = (
  { instance },
  { instance: target, size }
) => {
  let accumulator = 0;
  for (let i = 0; i < size; ++i) {
    accumulator += arrayConflict(
      instance.slice(i  * size, (i + 1) * size),
      target.slice(i * size, (i + 1) * size)
    );
    accumulator += arrayConflict(
      instance.filter((_, index) => index % size === i),
      target.filter((_, index) => index % size === i)
    );
  }
  return accumulator;
};
