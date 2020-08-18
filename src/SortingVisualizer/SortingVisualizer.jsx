import React from 'react';
import {
  getMergeSortAnimations,
  getBubbleSortAnimations,
  getSelectionSortAnimations,
  getInsertionSortAnimations,
  getGnomeSortAnimations,
  getHeapSortAnimations,
  getShellSortAnimations,
  getQuickSortAnimations,
} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;
// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    //* this is not the algorithm itself but just a visualization of it
    //* the idea is that we have list of animations some array indicates color change , another indicates height change
    animationRoutine(
      getMergeSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }

  selectionSort() {
    animationRoutine(
      getSelectionSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  gnomeSort() {
    animationRoutine(
      getGnomeSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  heapSort() {
    animationRoutine(
      getHeapSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    animationRoutine(
      getBubbleSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  insertionSort() {
    animationRoutine(
      getInsertionSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  shellSort() {
    animationRoutine(
      getShellSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  quickSort() {
    readQuicksortAnimations(this.state.array, 500);
  }
  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const mergeSortedArray = getMergeSortAnimations(array.slice());
  //   }
  // }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.gnomeSort()}>Gnome Sort</button>
        <button onClick={() => this.shellSort()}>Shell Sort</button>;
        <button onClick={() => this.quickSort()}>Quick Sort</button>
      </div>
    );
  }
}


function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

function animationRoutine(funct, array, msdelay) {
  const animations = funct(array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const isColorChange = i % 3 !== 2; // every 3rd array is not a color change
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      // console.log(arrayBars[barOneIdx]);
      // console.log(arrayBars[barTwoIdx]);
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * msdelay);
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i]; //changing height of an element
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * msdelay);
    }
  }
}
//* 3 types of animation : setting pivot(changing color of the bar to purple) [barindex,purple]
//* finding bar smaller or bigger than pivot (changing color to green or red) [barindex,green|red]
//* changing the position of all bars which are greater than pivot
function readQuicksortAnimations(array, msdelay) {
  let animations = getQuickSortAnimations(array);
  let i = 0;
  for (let animation of animations) {
    const arrayBars = document.getElementsByClassName('array-bar');
    if (animation.length === 2) {
      //* it is color change
      const barStyle = arrayBars[animation[0]].style;
      setTimeout(() => {
        barStyle.backgroundColor = animation[1];
      }, i * msdelay);
      
    } else {
      //* format : values of all bars in the array
      setTimeout(() => {
        for (let k = 0; k < animation.length; k++) {
          const barStyle = arrayBars[k].style;
          barStyle.height = `${animation[k]}px`;
        }
      }, i * msdelay);
    }
    i++;
  }
}
