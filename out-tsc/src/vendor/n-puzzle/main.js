import { MappedNPuzzle, NPuzzle } from './NPuzzle';
import { Point } from './Point';
import { Strategy } from './Strategy';
import { NPuzzleSolver } from './NPuzzleSolver';
const taxicabH = (lhs, rhs) => {
    const size = rhs.size;
    // let predict = 0;
    // lhs.instance.map((cur, index) => {
    //   const point = rhs.mapInstance.get(cur);
    //   if (point) {
    //     const { row, col } = point;
    //     predict +=
    //       Math.abs((index % size) - col) +
    //       Math.abs(Math.trunc(index / size) - row);
    //   }
    // });
    // return predict;
    return lhs.instance.reduce((acc, cur, index) => {
        const point = rhs.mapInstance.get(cur);
        if (point) {
            const { row, col } = point;
            return (acc +
                Math.abs((index % size) - col) +
                Math.abs(Math.floor(index / size) - row));
        }
        return acc;
    }, 0);
};
const generate = (snapshot, drow, dcol) => {
    const newRow = snapshot.pivot.row + drow;
    const newCol = snapshot.pivot.col + dcol;
    const size = snapshot.size;
    if (newRow >= size ||
        newRow < 0 ||
        newCol >= size ||
        newCol < 0 ||
        (newCol === snapshot.lastModified?.col &&
            newRow === snapshot.lastModified?.row)) {
        return;
    }
    const newIndex = newRow * size + newCol;
    const instance = [...snapshot.instance];
    [instance[newIndex], instance[snapshot.pivot.index]] = [
        instance[snapshot.pivot.index],
        instance[newIndex],
    ];
    return new NPuzzle(snapshot.size, instance, new Point(newIndex, newRow, newCol), new Point(snapshot.pivot.index, snapshot.pivot.row, snapshot.pivot.col));
};
const produce = (snapshot) => {
    const queue = [];
    const up = generate(snapshot, -1, 0);
    if (up) {
        queue.push(up);
    }
    const down = generate(snapshot, 1, 0);
    if (down) {
        queue.push(down);
    }
    const left = generate(snapshot, 0, -1);
    if (left) {
        queue.push(left);
    }
    const right = generate(snapshot, 0, 1);
    if (right) {
        queue.push(right);
    }
    return queue;
};
const strategy = new Strategy({
    h: (current, goal) => taxicabH(current, goal),
    g: (source, current) => 1,
    successors: (snapshot) => produce(snapshot),
    isGoal: (snapshot, goal) => taxicabH(snapshot, goal) === 0,
});
const sourceInstance = new MappedNPuzzle(3, [1, 2, 0, 3, 8, 4, 5, 7, 6]);
const targetInstance = new MappedNPuzzle(3, [1, 2, 3, 4, 5, 6, 7, 8, 0]);
// console.log(strategy.h(targetInstance, targetInstance));
// sourceInstance.show();
// console.log(strategy.h(sourceInstance, targetInstance));
const solver = new NPuzzleSolver(strategy, sourceInstance, targetInstance);
// console.log(strategy);
// console.log(solver);
const result = solver.solve();
console.log(result);
// const result = solver.test();
//# sourceMappingURL=main.js.map