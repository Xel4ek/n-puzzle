export function range(
  sizeOrStart: number,
  last?: number,
): ReadonlyArray<number> {
  const startAt = last === undefined ? 0 : sizeOrStart;
  const size = last === undefined ? sizeOrStart : last - sizeOrStart;
  return [...Array(size).keys()].map(i => i + startAt);
}
export function zip(rhs: number[], lhs: number[]): string[] {
  return rhs.map((_, i) => rhs[i] + ' ' + lhs[i]);
}
