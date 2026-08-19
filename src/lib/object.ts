/**
 * Create a shallow clone of {@link obj} and remove specific keys from it.
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const newObj: Partial<T> = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj,
  );
  for (const key of keys) {
    delete newObj[key];
  }
  return newObj as T;
}
