import { MappedNPuzzle } from './NPuzzle';
export class StrategyFactory {
    constructor(strategy, secondPhase = false) {
        this.secondPhase = secondPhase;
        this.strategy = strategy;
    }
    g(source, current) {
        return this.strategy.g(source, current);
    }
    h(current, target) {
        const size = target.size;
        if (!(target instanceof MappedNPuzzle)) {
            throw new Error('target must implement MappedNPuzzle class');
        }
        return current.instance.reduce((acc, cur, index) => {
            const point = target.mapInstance.get(cur);
            if (point) {
                const { row, col } = point;
                return (acc +
                    this.strategy.h([Math.trunc(index / size), index % size], [row, col]));
            }
            else {
                throw new Error('no Map');
            }
        }, 0);
    }
    isGoal(current, target) {
        return this.h(current, target) === this.strategy.goalH;
    }
    successors(snapshot) {
        return this.strategy.successors(snapshot, this.secondPhase);
    }
    hybrid({ instance }) {
        return instance[0] === 1 && instance[1] === 2 && instance[2] === 3 && instance[3] === 4;
    }
}
//# sourceMappingURL=StrategyFactory.js.map