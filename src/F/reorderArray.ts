// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function reorderArray(
  arr: string[],
  current: string,
  to: number
): string[] {
  const newArr = arr.slice();
  const from = arr.indexOf(current);
  newArr.splice(to, 0, newArr.splice(from, 1)[0]);
  return newArr;
}
