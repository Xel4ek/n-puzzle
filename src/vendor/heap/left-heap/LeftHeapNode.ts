export class LeftHeapNode<T> {
  readonly item: T;
  key: number;
  right?: LeftHeapNode<T>;
  left?: LeftHeapNode<T>;
  dist = 0;
  constructor(key: number, item: T) {
    this.item = item;
    this.key = key;
  }
}
