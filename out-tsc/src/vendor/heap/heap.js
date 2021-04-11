export class Heap {
    constructor() {
        this.heap = [];
        this.parent = (index) => Math.trunc((index - 1) / 2);
        this.left = (index) => 2 * index + 1;
        this.right = (index) => 2 * index + 2;
        this.hasLeft = (index) => this.left(index) < this.heap.length;
        this.hasRight = (index) => this.right(index) < this.heap.length;
        this.swap = (a, b) => ([this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]);
    }
    insert(key, item) {
        this.heap.push({ key, item });
        let i = this.heap.length - 1;
        while (i > 0) {
            const p = this.parent(i);
            if (this.heap[p].key < this.heap[i].key) {
                break;
            }
            [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
            i = p;
        }
    }
    pop() {
        if (this.heap.length === 0) {
            return undefined;
        }
        this.swap(0, this.heap.length - 1);
        const item = this.heap.pop();
        let current = 0;
        while (this.hasLeft(current)) {
            let smallerChild = this.left(current);
            if (this.hasRight(current) &&
                this.heap[this.right(current)].key < this.heap[this.left(current)].key) {
                smallerChild = this.right(current);
            }
            if (this.heap[smallerChild].key > this.heap[current].key) {
                break;
            }
            this.swap(current, smallerChild);
            current = smallerChild;
        }
        return item?.item;
    }
    size() {
        return this.heap.length;
    }
}
//# sourceMappingURL=heap.js.map