export interface HeapInterface<T> {
  size: number;

  insert(priority: number, item: T): void;

  pop(): T | undefined;
}

