export class PriorityQueue {
    constructor(heapClass) {
        this.heapClass = heapClass;
        this.count = 0;
        this.heap = new heapClass();
    }
    get size() {
        return this.count;
    }
    pop() {
        this.count--;
        return this.heap.pop();
    }
    insert(key, item) {
        this.count++;
        this.heap.insert(key, item);
    }
    clear() {
        const count = this.count;
        this.count = 0;
        this.heap = new this.heapClass();
        return count;
    }
}
//# sourceMappingURL=priority-queue.js.map