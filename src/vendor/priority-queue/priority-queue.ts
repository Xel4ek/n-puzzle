import { HeapInterface } from '../heap/heap.interface';

export class PriorityQueue<P extends HeapInterface<T>, T> {
  private heap: P;
  private count = 0;

  constructor(private heapClass: new () => P) {
    this.heap = new heapClass();
  }

  get size(): number {
    return this.count;
  }

  pop(): T | undefined {
    this.count--;
    return this.heap.pop();
  }

  insert(key: number, item: T): void {
    this.count++;
    this.heap.insert(key, item);
  }

  clear(): number {
    const count = this.count;
    this.count = 0;
    this.heap = new this.heapClass();
    return count;
  }
}
