export class Node<T> {
  readonly item: T;
  key: number;
  right?: Node<T>;
  left?: Node<T>;
  dist = 0;
  constructor(key: number, item: T) {
    this.item = item;
    this.key = key;
  }
}
