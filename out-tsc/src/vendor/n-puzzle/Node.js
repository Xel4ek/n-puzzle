export class Node {
    constructor(score, predict, snapshot, isTarget, parent) {
        this.parent = parent;
        this.score = score;
        this.predict = predict;
        this.snapshot = snapshot;
        this.isTarget = isTarget;
        // this.show();
    }
    show() {
        console.group('[new Node]');
        console.log('parent: ', this.parent);
        console.log('score: ', this.score);
        console.log('predict: ', this.predict);
        console.log('snapshot: ', this.snapshot);
        console.log('isTarget: ', this.isTarget);
        console.groupEnd();
    }
}
export class NodeFactory {
    constructor(strategy, sourceInstance, targetInstance) {
        this.strategy = strategy;
        this.sourceInstance = sourceInstance;
        this.targetInstance = targetInstance;
    }
    produce(puzzle) {
        return this.strategy
            .successors(puzzle);
    }
}
//# sourceMappingURL=Node.js.map