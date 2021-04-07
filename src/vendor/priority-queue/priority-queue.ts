import { Heap } from '../heap/heap';

export class PriorityQueue<T> {
  private readonly heap = new Heap<T>();
  pop(): T|undefined {
    return this.heap.pop();
  }
  insert(key: number, item: T): void {
    // console.warn("INSETED", key);
    // @ts-ignore
    // item?.snapshot?.show();
    this.heap.insert(key, item);
  }
  get size(): number {
    return this.heap.size();
  }
}
