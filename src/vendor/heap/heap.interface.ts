export interface HeapInterface<T> {
  insert(key: number, item: T): void;
  pop(): T | undefined;
}
