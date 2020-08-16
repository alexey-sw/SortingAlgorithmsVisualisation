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

export function getBubbleSortAnimations(array) {
  let animations = [];
  animations = generateBubbleSortAnimations(array, animations);
  return animations;
}
function generateBubbleSortAnimations(array, animations) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      //* changing color of two divs
      animations.push([i, j + 1]);
      //*reverting color of 2 divs
      animations.push([i, j + 1]);
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        //algorithm for changing div heights
        animations.push([j + 1, tmp]);
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([j, array[j + 1]]);
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      } else {
        animations.push([j, array[j]]); //* nothing changes in that case because we are pushing the same value
      }
    }
  }
  return animations;
}
//* bubble sort algorithm itself;

export function getSelectionSortAnimations(array) {
  let animations = [];
  animations = generateSelectionSortAnimations(array, animations);
  return animations;
}
function generateSelectionSortAnimations(array, animations) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (array[i] > array[j]) {
        animations.push([i, array[j]]);
        animations.push([i, j]);
        animations.push([i, j]);
        animations.push([j, array[i]]);
        array[i] = [array[j], (array[j] = array[i])][0];
      } else {
        animations.push([i, array[i]]);
      }
    }
  }
  return animations;
}

export function getInsertionSortAnimations(array) {
  let animations = [];
  animations = generateInsertionSortAnimations(array, animations);
  return animations;
}
function generateInsertionSortAnimations(array, animations) {
  let len = array.length;
  for (let i = 1; i < len; i++) {
    let j = i - 1;
    let key = array[i];

    while (j >= 0 && array[j] > key) {
      animations.push([j, j + 1], [j, j + 1]);
      array[j + 1] = array[j];
      animations.push([j + 1, array[j]]);
      animations.push([j, j + 1], [j, j + 1]);
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

export function getGnomeSortAnimations(array) {
  let animations = [];
  animations = generateGnomeSortAnimations(array, animations);
  return animations;
}

function generateGnomeSortAnimations(array, animations) {
  const len = array.length;
  let i = 1;
  while (i < len) {
    //* while i< length
    if (i > 0 && array[i - 1] > array[i]) {
      //* if previous value is better than current:
      animations.push([i, i - 1], [i, i - 1]);
      animations.push([i, array[i - 1]]);
      animations.push([i, i - 1], [i, i - 1]);
      animations.push([i - 1, array[i]]);
      [array[i], array[i - 1]] = [array[i - 1], array[i]];

      i--; //going back
    } else {
      i++; //going forward
    }
  }
  return animations;
}
export function getHeapSortAnimations(array) {
  let animations = [];
  animations = generateHeapSortAnimations(array, animations);
  return animations;
}
function generateHeapSortAnimations(array, animations) {
  function swap(array, index_A, index_B) {
    animations.push([index_A, index_B], [index_A, index_B]);
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
    }
    if (right < array_length && array[right] > array[max]) {
      max = right;
    }

    if (max !== i) {
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

export function getShellSortAnimations(array) {
  let animations = [];
  animations = generateShellSortAnimations(array, animations);
  return animations;
}

function generateShellSortAnimations(array, animations) {
  var len = array.length;
  var h = 1;
  while (h < len / 3) {
    h = 3 * h + 1;
  }
  while (h > 0) {
    for (var i = h; i < len; i++) {
      for (var j = i; j > 0 && array[j] < array[j - h]; j -= h) {
        animations.push([j, j - h], [j, j - h], [j, array[j - h]]);
        animations.push([j, j - h], [j, j - h], [j - h, array[j]]);
        array[j] = [array[j - h], (array[j - h] = array[j])][0];
      }
    }
    //decreasing h
    h = Math.floor(h / 3); //Math floor is essential because it extinguishes float numbers
  }
  return animations;
}

export function getQuickSortAnimations(array) {
  let animations = [];
  array = generateQuickSortAnimations(array, animations);
  
  return animations;
}
function generateQuickSortAnimations(array, animations,stPoint) {
  if (arr.length < 2) {
    animations.push([stPoint,"purple"])//* if only one item left in the array then we just highlight pivot
    return arr;
  } // base case

  const pivot = array[array.length - 1]; //pivot value
  animations.push[stPoint,"purple"];
  const left = []; // left handside array
  const right = []; // right handside array

  while (start < length) {
    // comparing and pushing
    if (array[start] < pivot) {
      left.push(array[start]);
    } else {
      right.push(array[start]);
    }
    start++; //  incrementing start value
  }
  // calling quick sort recursively
  return [
    ...generateQuickSortAnimations(left),
    pivot,
    ...generateQuickSortAnimations(right),
  ];
}
