import { HeapInterface } from '../heap.interface';
import { LeftHeapNode } from './LeftHeapNode';

export class LeftHeap<T> implements HeapInterface<T> {
  private head?: LeftHeapNode<T>;

  insert(priority: number, item: T): void {
    this.head = this.merge(this.head, new LeftHeapNode(priority, item));
  }

  pop(): T | undefined {
    const item = this.head?.item;
    this.head = this.merge(this.head?.right, this.head?.left);
    return item;
  }

  merge(rhs?: LeftHeapNode<T>, lhs?: LeftHeapNode<T>): LeftHeapNode<T> | undefined {
    if (!rhs) {
      return lhs;
    }
    if (!lhs) {
      return rhs;
    }
    if (lhs.key < rhs.key) {
      [rhs, lhs] = [lhs, rhs];
    }
    rhs.right = this.merge(rhs.right, lhs);
    if ((rhs.right?.dist ?? 0) > (rhs.left?.dist ?? 0)) {
      [rhs.right, rhs.left] = [rhs.left, rhs.right];
    }
    // @ts-ignore
    rhs.dist = rhs.right?.dist + 1;
    return rhs;
  }

  get size(): number {
    return  this.head?.dist ?? 0;
  }
}
