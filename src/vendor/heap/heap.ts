import { HeapInterface } from './heap.interface';

export class Heap<T> implements HeapInterface<T> {
  private readonly heap: { key: number; item: T }[] = [];

  constructor() {
  }

  insert(key: number, item: T): void {
    this.heap.push({key, item});
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = this.parent(i);
      if (this.heap[p].key < this.heap[i].key) {
        break;
      }
      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
      i = p;
    }
    // if (this.heap.length > 10000) { this.heap.length = 10000; }
  }

  pop(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    this.swap(0, this.heap.length - 1);
    const item = this.heap.pop();

    let current = 0;
    while (this.hasLeft(current)) {
      let smallerChild = this.left(current);
      if (
        this.hasRight(current) &&
        this.heap[this.right(current)].key < this.heap[this.left(current)].key
      ) {
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
  size(): number {
    return this.heap.length;
  }
  private parent = (index: number) => Math.trunc((index - 1) / 2);

  private left = (index: number) => 2 * index + 1;

  private right = (index: number) => 2 * index + 2;

  private hasLeft = (index: number) => this.left(index) < this.heap.length;

  private hasRight = (index: number) => this.right(index) < this.heap.length;

  private swap = (a: number, b: number) => ([this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]);
}
