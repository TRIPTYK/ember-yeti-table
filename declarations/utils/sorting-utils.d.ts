import type { Sort } from '../types.ts';
export type Comparator<T = unknown> = (a: T, b: T) => number;
/**
 * An implementation of the standard merge sort algorithm.
 *
 * This is necessary because we need a stable sorting algorithm that accepts
 * a general comparator. The built in sort function and Ember's sort functions
 * are not stable, and `_.sortBy` doesn't take a general comparator. Ideally
 * lodash would add a `_.sort` function whose API would mimic this function's.
 */
export declare function mergeSort<T>(array: T[], comparator?: Comparator<T>): T[];
export declare function sortMultiple<T>(itemA: T, itemB: T, sorts: Sort[], compareFn: Comparator): number;
export declare function compareValues(itemA: unknown, itemB: unknown): number;
export default compareValues;
//# sourceMappingURL=sorting-utils.d.ts.map