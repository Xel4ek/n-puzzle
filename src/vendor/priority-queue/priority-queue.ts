import { HeapInterface } from '../heap/heap.interface';

export class PriorityQueue<P extends HeapInterface<T>, T> {
  private readonly heap: P;
  private cont = 0;
  constructor(private heapClass: new () => P) {
    this.heap = new heapClass();
  }
  pop(): T|undefined {
    this.cont--;
    return this.heap.pop();
  }
  insert(key: number, item: T): void {
    // console.warn("INSETED", key);
    // @ts-ignore
    // item?.snapshot?.show();
    this.cont++;
    this.heap.insert(key, item);
  }
  get size(): number {
    return this.cont;
    // return this.heap.size;
  }
}
