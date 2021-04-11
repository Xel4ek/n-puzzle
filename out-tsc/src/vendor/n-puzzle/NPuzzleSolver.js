import { StrategyFactory } from './StrategyFactory';
import { PriorityQueue } from '../priority-queue/priority-queue';
import { NPuzzleValidator } from './NPuzzleValidator';
export class NPuzzleSolver {
    constructor(heapClass, strategyConfig, sourceInstance, targetInstance) {
        this.heapClass = heapClass;
        this.strategyConfig = strategyConfig;
        this.sourceInstance = sourceInstance;
        this.targetInstance = targetInstance;
        this.implementsNodeCount = 0;
        this.closedNodes = 0;
        this.startTime = performance.now();
        this.sourceInstance = sourceInstance;
        this.priorityQueue = new PriorityQueue(heapClass);
        this.targetInstance = targetInstance;
        this.solvable = new NPuzzleValidator().validate(this.sourceInstance);
    }
    get result() {
        var _a, _b, _c;
        return {
            closedNodes: this.closedNodes,
            implementsNodeCount: this.implementsNodeCount,
            requiredSteps: (_b = (_a = this.solution) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0,
            sourceInstance: this.sourceInstance,
            solution: (_c = this.solution) !== null && _c !== void 0 ? _c : '',
            solvable: this.solvable,
            done: Date.now(),
            timeUsed: performance.now() - this.startTime,
        };
    }
    solve() {
        this.startTime = performance.now();
        if (!this.solvable) {
            return this.result;
        }
        let simpled;
        let secondPhase;
        if (this.sourceInstance.size > 3) {
            simpled = this.simplifier();
            secondPhase = true;
        }
        this.simpleSolve(simpled !== null && simpled !== void 0 ? simpled : this.sourceInstance, secondPhase);
        return this.result;
    }
    simplifier() {
        const holder = new Set();
        const strategy = new StrategyFactory(this.strategyConfig);
        this.sourceInstance.isTarget = strategy.isGoal(this.sourceInstance, this.targetInstance);
        let entity;
        if (!this.sourceInstance.isTarget) {
            entity = this.sourceInstance;
        }
        for (; entity && !this.solution; entity = this.priorityQueue.pop()) {
            this.closedNodes++;
            // this.logger();
            holder.add(entity.instance.join(' '));
            for (const child of strategy.successors(entity)) {
                if (!holder.has(child.instance.join(' '))) {
                    this.implementsNodeCount++;
                    child.isTarget = strategy.isGoal(child, this.targetInstance);
                    if (child.isTarget || strategy.hybrid(child)) {
                        return child;
                    }
                    this.priorityQueue.insert(child.history.length + strategy.h(child, this.targetInstance), child);
                }
            }
        }
        return undefined;
    }
    simpleSolve(sourceInstance, secondPhase = false) {
        this.priorityQueue.clear();
        const strategy = new StrategyFactory(this.strategyConfig, secondPhase);
        const holder = new Set();
        sourceInstance.isTarget = strategy.isGoal(sourceInstance, this.targetInstance);
        let entity;
        if (!sourceInstance.isTarget) {
            entity = sourceInstance;
        }
        for (; entity && !this.solution; entity = this.priorityQueue.pop()) {
            this.closedNodes++;
            // this.logger();
            holder.add(entity.instance.join(' '));
            for (const child of strategy.successors(entity)) {
                if (!holder.has(child.instance.join(' '))) {
                    this.implementsNodeCount++;
                    child.isTarget = strategy.isGoal(child, this.targetInstance);
                    if (child.isTarget) {
                        this.solution = child.history;
                        break;
                    }
                    this.priorityQueue.insert(child.history.length + strategy.h(child, this.targetInstance), child);
                }
            }
        }
    }
    logger(step = 1e5) {
        if (this.closedNodes % step === 0) {
            console.group('[Info] : ', this.closedNodes / 1e6, 'M');
            console.log('queue: ', this.priorityQueue.size / 1e6, 'M');
            console.log('open: ', this.implementsNodeCount / 1e6, 'M');
            console.groupEnd();
        }
    }
}
//# sourceMappingURL=NPuzzleSolver.js.map