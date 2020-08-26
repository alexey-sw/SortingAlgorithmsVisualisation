import {NUMBER_OF_ARRAY_BARS} from '../SortingVisualizer/SortingVisualizer.jsx';
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array; //* if everything is sorted
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return; //* if array contains only one element
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
//* array bars change their color and drop it soon after;
//! I don't understand usage of auxiliary array
function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]); //* indicates that we now compare these 2 values
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]); //* drops indication
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  //* these other 2 cycles are used to create animations for extra element in either of the array parts
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortAnimations(array, comparisonCounter) {
  let animations = [];
  animations = generateBubbleSortAnimations(
    array,
    animations,
    comparisonCounter,
  );
  return animations;
}
function generateBubbleSortAnimations(array, animations, comparisonCounter) {
  let initialArray = array.slice();
  let len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      //* changing color of two divs
      animations.push([i, j + 1]);
      //*reverting color of 2 divs
      animations.push([i, j + 1]);
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        comparisonCounter += 1;
        animations.push([j + 1, tmp]);
        animations.push([j, j + 1]);
        animations.push([j, j + 1, comparisonCounter]);
        animations.push([j, array[j + 1]]); //* comparisonCounter correct here
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      } else {
        animations.push([j, array[j]]); //* nothing changes in that case because we are pushing the same value
      }
    }
  }
  // console.log(array);
  // console.log(initialArray)
  array = initialArray;
  //*  console.log(array); it works
  // console.log(array);
  return animations;
}
//* bubble sort algorithm itself;

export function getSelectionSortAnimations(array, comparisonCounter) {
  let animations = [];
  animations = generateSelectionSortAnimations(
    array,
    animations,
    comparisonCounter,
  );
  return animations;
}
function generateSelectionSortAnimations(array, animations, comparisonCounter) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (array[i] > array[j]) {
        comparisonCounter += 1;
        animations.push([i, array[j]]);
        animations.push([i, j]);
        animations.push([i, j, comparisonCounter]);
        animations.push([j, array[i]]);
        array[i] = [array[j], (array[j] = array[i])][0];
      } else {
        animations.push([i, array[i]]);
      }
    }
  }
  return animations;
}

export function getInsertionSortAnimations(array, comparisonCounter) {
  let animations = [];
  animations = generateInsertionSortAnimations(
    array,
    animations,
    comparisonCounter,
  );
  return animations;
}
function generateInsertionSortAnimations(array, animations, comparisonCounter) {
  let len = array.length;
  for (let i = 1; i < len; i++) {
    let j = i - 1;
    let key = array[i];

    while (j >= 0 && array[j] > key) {
      comparisonCounter++;
      animations.push([j, j + 1], [j, j + 1]);
      array[j + 1] = array[j];
      animations.push([j + 1, array[j]]);
      animations.push([j, j + 1, comparisonCounter], [j, j + 1]);
      animations.push([j, array[j + 1]]);
      j = j - 1;
    }
    animations.push([j + 1, i]);
    animations.push([j + 1, i]);
    array[j + 1] = key;
    animations.push([j + 1, key]);
  }
  return animations;
}

export function getGnomeSortAnimations(array, comparisonCounter) {
  let animations = [];
  animations = generateGnomeSortAnimations(
    array,
    animations,
    comparisonCounter,
  );
  return animations;
}

function generateGnomeSortAnimations(array, animations, comparisonCounter) {
  const len = array.length;
  let i = 1;
  while (i < len) {
    //* while i< length
    if (i > 0 && array[i - 1] > array[i]) {
      comparisonCounter += 1;
      //* if previous value is better than current:
      animations.push([i, i - 1, comparisonCounter], [i, i - 1]);
      animations.push([i, array[i - 1]]);
      animations.push([i, i - 1], [i, i - 1]);
      animations.push([i - 1, array[i]]);
      [array[i], array[i - 1]] = [array[i - 1], array[i]];

      i--; //going back
    } else {
      i++; //going forward
      animations.push(
        [i - 1, i - 1, comparisonCounter],
        [i - 1, i - 1],
        [i - 1, array[i - 1]],
      );
    }
  }
  return animations;
}
export function getHeapSortAnimations(array, comparisonCounter) {
  let animations = [];
  animations = generateHeapSortAnimations(array, animations, comparisonCounter);
  return animations;
}
function generateHeapSortAnimations(array, animations, comparisonCounter) {
  function swap(array, index_A, index_B) {
    animations.push([index_A, index_B, comparisonCounter], [index_A, index_B]);
    animations.push([index_A, array[index_B]]);
    animations.push([index_A, index_B], [index_A, index_B]);
    animations.push([index_B, array[index_A]]);
    var temp = array[index_A];
    array[index_A] = array[index_B];
    array[index_B] = temp;
  }

  function heap_root(array, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && array[left] > array[max]) {
      max = left;
      comparisonCounter++;
    }
    if (right < array_length && array[right] > array[max]) {
      max = right;
      comparisonCounter++;
    }

    if (max !== i) {
      comparisonCounter++;
      swap(array, i, max);
      heap_root(array, max);
    }
  }

  let array_length = array.length;
  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
    heap_root(array, i);
  }
  for (i = array.length - 1; i > 0; i--) {
    swap(array, 0, i);
    array_length--;
    heap_root(array, 0);
  }
  return animations;
}

export function getShellSortAnimations(array, comparisonCounter) {
  let animations = [];
  animations = generateShellSortAnimations(
    array,
    animations,
    comparisonCounter,
  );
  return animations;
}

function generateShellSortAnimations(array, animations, comparisonCounter) {
  var len = array.length;
  var h = 1;
  while (h < len / 3) {
    h = 3 * h + 1;
  }
  while (h > 0) {
    for (var i = h; i < len; i++) {
      for (var j = i; j > 0 && array[j] < array[j - h]; j -= h) {
        comparisonCounter++;
        animations.push(
          [j, j - h, comparisonCounter],
          [j, j - h],
          [j, array[j - h]],
        );
        animations.push([j, j - h], [j, j - h], [j - h, array[j]]);
        array[j] = [array[j - h], (array[j - h] = array[j])][0];
        console.log(array);
      }
    }
    //decreasing h
    h = Math.floor(h / 3); //Math floor is essential because it extinguishes float numbers
  }
  return animations;
}
export function getQuickSortAnimations(array) {
  let animations = [];
  generateQuickSortAnimations(array, animations, 0, array);

  return animations;
}
//* we use auxiliary array to push new array in our animations list
//*
function generateQuickSortAnimations(
  array,
  animations,
  stPoint,
  auxiliaryArray,
) {
  if (stPoint === NUMBER_OF_ARRAY_BARS) {
    stPoint -= 1;
  }
  if (array.length < 2) {
    //* if only one item left in the array then we just highlight pivot
    animations.push([stPoint, 'purple']);
    animations.push([stPoint, 'turquoise']);

    return array;
  } // base case

  const pivot = array[0]; //pivot value
  animations.push([stPoint, 'purple']);
  const left = []; // left handside array
  const right = []; // right handside array
  let start = 1;
  const length = array.length;

  while (start < length) {
    // comparing and pushing
    if (array[start] < pivot) {
      animations.push([stPoint + start, 'red']);
      left.push(array[start]);
    } else {
      animations.push([stPoint + start, 'green']);
      right.push(array[start]);
    }
    start++; //  incrementing start value
  }
  //* setting all the colors ->
  let primaryArray = [].concat(left, [pivot], right);
  auxiliaryArray = mergeArrays(primaryArray, auxiliaryArray, stPoint);
  let colorOfArrayBeforeReset = [];
  let resetArrayColor = [];
  for (let k = 0; k < primaryArray.length; k++) {
    if (k < left.length) {
      colorOfArrayBeforeReset.push([stPoint + k, 'red']);
    } else if (k === left.length) {
      colorOfArrayBeforeReset.push([stPoint + k, 'purple']);
    } else {
      colorOfArrayBeforeReset.push([stPoint + k, 'green']);
    }
  }
  for (let i = 0; i < primaryArray.length; i++) {
    resetArrayColor.push([stPoint + i, 'turquoise']);
  }
  animations.push(resetArrayColor.slice());
  animations.push(auxiliaryArray.slice());
  animations.push(colorOfArrayBeforeReset.slice());
  animations.push(resetArrayColor.slice());
  //* now we have to remove animation (red and green bars)
  return [
    ...generateQuickSortAnimations(left, animations, stPoint, auxiliaryArray),
    pivot,
    ...generateQuickSortAnimations(
      right,
      animations,
      left.length + stPoint + 1,
      auxiliaryArray,
    ),
  ];
}
//* mergePoint is index of the start of primaryArray;
function mergeArrays(primaryArray, auxiliaryArray, mergePoint) {
  let f = mergePoint;
  for (let st = 0; st < primaryArray.length; st++) {
    if (primaryArray[st] !== auxiliaryArray[f]) {
      auxiliaryArray[f] = primaryArray[st];
    }
    f++;
  }
  return auxiliaryArray;
}

export function getShakerSortAnimations(array) {
  let animations = [];
  animations = generateShakerSortAnimations(array, animations);
  return animations;
}

function generateShakerSortAnimations(arr, animations) {
  var swapped;
  do {
    for (var i = 0; i < arr.length - 2; i++) {
      if (arr[i] > arr[i + 1]) {
        animations.push([i, i + 1], [i, i + 1], [i, arr[i + 1]]);
        animations.push([i, i + 1], [i, i + 1], [i + 1, arr[i]]);
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
    swapped = false;
    for (i = arr.length - 2; i > 0; i--) {
      if (arr[i] > arr[i + 1]) {
        animations.push([i, i + 1], [i, i + 1], [i, arr[i + 1]]);
        animations.push([i, i + 1], [i, i + 1], [i + 1, arr[i]]);
        var temp1 = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp1;
        
        swapped = true;
      }
    }
  } while (swapped);
  return animations;
}
