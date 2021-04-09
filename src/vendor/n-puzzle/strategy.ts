import { MappedNPuzzle, NPuzzle } from './NPuzzle';
import { Strategy } from './puzzle.interfaces';

const taxicabH = ([currentRow, currentCol]: number[], [targetRow, targetCol]: number[]): number => {
  return Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
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
  [instance[newIndex], instance[index]] = [
    instance[index],
    instance[newIndex],
  ];
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
export const MANHATTAN: Strategy<NPuzzle> = {
  h: taxicabH,
  g: (source: MappedNPuzzle, current: NPuzzle) => 1,
  successors: (snapshot: NPuzzle, secondPhase) => produce(snapshot, secondPhase),
  goalH: 0
};
