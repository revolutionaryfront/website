/**
 * Small helper class for combining className strings.
 */
export function cls(...classNames: string[]): string {
  return classNames.map((className) => className.trim()).join(" ");
}
