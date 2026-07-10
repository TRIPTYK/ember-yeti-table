import { get } from '@ember/object';
import { compare, isNone } from '@ember/utils';

function merge(left, right, comparator) {
  const mergedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    const comparison = comparator(left[leftIndex], right[rightIndex]);
    if (comparison <= 0) {
      mergedArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      mergedArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  if (leftIndex < left.length) {
    mergedArray.splice(mergedArray.length, 0, ...left.slice(leftIndex));
  }
  if (rightIndex < right.length) {
    mergedArray.splice(mergedArray.length, 0, ...right.slice(rightIndex));
  }
  return mergedArray;
}

/**
 * An implementation of the standard merge sort algorithm.
 *
 * This is necessary because we need a stable sorting algorithm that accepts
 * a general comparator. The built in sort function and Ember's sort functions
 * are not stable, and `_.sortBy` doesn't take a general comparator. Ideally
 * lodash would add a `_.sort` function whose API would mimic this function's.
 */
function mergeSort(array, comparator = compare) {
  if (array.length <= 1) {
    return array;
  }
  const middleIndex = Math.floor(array.length / 2);
  const leftArray = mergeSort(array.slice(0, middleIndex), comparator);
  const rightArray = mergeSort(array.slice(middleIndex), comparator);
  return merge(leftArray, rightArray, comparator);
}
function sortMultiple(itemA, itemB, sorts, compareFn) {
  let compareValue = 0;
  for (const {
    prop,
    direction
  } of sorts) {
    const valueA = get(itemA, prop);
    const valueB = get(itemB, prop);
    compareValue = direction === 'asc' ? compareFn(valueA, valueB) : -compareFn(valueA, valueB);
    if (compareValue !== 0) {
      break;
    }
  }
  return compareValue;
}
function isExactlyNaN(value) {
  return typeof value === 'number' && isNaN(value);
}
function isEmpty(value) {
  return isNone(value) || isExactlyNaN(value);
}
function orderEmptyValues(itemA, itemB) {
  const aIsEmpty = isEmpty(itemA);
  const bIsEmpty = isEmpty(itemB);
  if (aIsEmpty && !bIsEmpty) {
    return -1;
  } else if (bIsEmpty && !aIsEmpty) {
    return 1;
  } else if (isNone(itemA) && isExactlyNaN(itemB)) {
    return -1;
  } else if (isExactlyNaN(itemA) && isNone(itemB)) {
    return 1;
  } else {
    return 0;
  }
}
function compareValues(itemA, itemB) {
  if (isEmpty(itemA) || isEmpty(itemB)) {
    return orderEmptyValues(itemA, itemB);
  }
  return compare(itemA, itemB);
}

export { compareValues, compareValues as default, mergeSort, sortMultiple };
//# sourceMappingURL=sorting-utils.js.map
