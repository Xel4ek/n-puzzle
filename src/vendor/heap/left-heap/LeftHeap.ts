import { HeapInterface } from '../heap.interface';
import { LeftHeapNode } from './LeftHeapNode';

export class LeftHeap<T> implements HeapInterface<T> {
  private head?: LeftHeapNode<T>;

  get size(): number {
    return this.head?.dist ?? 0;
  }

  insert(priority: number, item: T): void {
    this.head = this.merge(this.head, new LeftHeapNode(priority, item));
  }

  pop(): T | undefined {
    const item = this.head?.item;
    this.head = this.merge(this.head?.right, this.head?.left);
    return item;
  }

  merge(
    lhs?: LeftHeapNode<T>,
    rhs?: LeftHeapNode<T>
  ): LeftHeapNode<T> | undefined {
    if (!lhs) {
      return rhs;
    }
    if (!rhs) {
      return lhs;
    }
    if (rhs.key < lhs.key) {
      [lhs, rhs] = [rhs, lhs];
    }
    lhs.right = this.merge(lhs.right, rhs);
    if (!lhs.left) {
      lhs.left = lhs.right;
      lhs.right = undefined;
    } else {
      if ((lhs.right?.dist ?? 0) > lhs.left.dist) {
        [lhs.right, lhs.left] = [lhs.left, lhs.right];
      }
    }
    lhs.dist = (lhs.right?.dist ?? 0) + 1;
    return lhs;
  }
}
