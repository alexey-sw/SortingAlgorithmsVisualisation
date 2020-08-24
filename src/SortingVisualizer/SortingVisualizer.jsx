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
// const NUMBER_OF_ARRAY_BARS = 300;
// const NUMBER_OF_ARRAY_BARS = 20;
const NUMBER_OF_ARRAY_BARS = 150;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      comparisonCounter: 0,
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
    this.setState({array, comparisonCounter: 0});
  }

  mergeSort() {
    //* this is not the algorithm itself but just a visualization of it
    //* the idea is that we have list of animations some array indicates color change , another indicates height change
    this.animationRoutine(
      getMergeSortAnimations,
      this.state.array.slice(),
      ANIMATION_SPEED_MS,
    );
  }

  selectionSort() {
    let comparisonCounter = this.state.comparisonCounter;

    this.animationRoutine(
      getSelectionSortAnimations,
      this.state.array.slice(),
      ANIMATION_SPEED_MS,
      comparisonCounter
    );
  }
  gnomeSort() {
    let comparisonCounter = this.state.comparisonCounter;
    this.animationRoutine(
      getGnomeSortAnimations,
      this.state.array.slice(),
      ANIMATION_SPEED_MS,
      comparisonCounter
    );
  }
  heapSort() {
    let comparisonCounter = this.state.comparisonCounter
    this.animationRoutine(
      getHeapSortAnimations,
      this.state.array.slice(),
      ANIMATION_SPEED_MS,
      comparisonCounter
    );
  }
  //comparisonCounter
  bubbleSort() {
    let comparisonCounter = this.state.comparisonCounter;

    //* state is sorted somehow
    // We leave it as an exercise to the viewer of this code to implement this method.
    this.animationRoutine(
      getBubbleSortAnimations,
      this.state.array.slice(),
      ANIMATION_SPEED_MS,
      comparisonCounter,
    );
  }
  insertionSort() {
    let comparisonCounter = this.state.comparisonCounter;
    this.animationRoutine(
      getInsertionSortAnimations,
      this.state.array.slice(),
      ANIMATION_SPEED_MS,
      comparisonCounter
    );
  }
  shellSort() {
    let comparisonCounter = this.state.comparisonCounter;
    this.animationRoutine(
      getShellSortAnimations,
      this.state.array.slice(),
      ANIMATION_SPEED_MS,
      comparisonCounter
    );
  }
  quickSort() {
    this.readQuicksortAnimations(this.state.array.slice(), ANIMATION_SPEED_MS);
  }
  readQuicksortAnimations(array, msdelay) {
    let animations = getQuickSortAnimations(array);
    let i = 0;
    for (let animation of animations) {
      const arrayBars = document.getElementsByClassName('array-bar');
      if (animation.length === 2 && animation[0].length !== 2) {
        const barStyle = arrayBars[animation[0]].style;
        setTimeout(() => {
          barStyle.backgroundColor = animation[1];
        }, i * msdelay);
      } else {
        //* format : values of all bars in the array
        if (animation[0].length === 2) {
          setTimeout(() => {
            for (let m = 0; m < animation.length; m++) {
              const barStyle = arrayBars[animation[m][0]].style;
              barStyle.backgroundColor = animation[m][1];
            }
          }, i * msdelay);
        } else {
          setTimeout(() => {
            for (let k = 0; k < animation.length; k++) {
              const barStyle = arrayBars[k].style;
              barStyle.height = `${animation[k]}px`;
            }
          }, i * msdelay);
        }
      }
      i++;
    }
    setTimeout(() => {
      this.state.array.sort((a, b) => a - b);
    }, animations.length * msdelay);
  }
  
  animationRoutine(funct, array, msdelay, comparisonCounter) {
    //* state is already sorted somehow
    const animations = funct(array, comparisonCounter);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2; // every 3rd array is not a color change
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        console.log(animations[i]);
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (animations[i].length === 3 && animations[i][2] > 10) {
            // console.log(this.state.array);
            this.setState({comparisonCounter: animations[i][2]});
          }
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * msdelay);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];

          //changing height of an element
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * msdelay);
      }
    }
    setTimeout(() => {
      this.state.array.sort((a, b) => a - b);
    }, animations.length * msdelay);
  }
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
        <button onClick={() => this.resetArray()}>Generate new array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.gnomeSort()}>Gnome Sort</button>
        <button onClick={() => this.shellSort()}>Shell Sort</button>;
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <Comparisoncounter
          value={this.state.comparisonCounter}></Comparisoncounter>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//* 3 types of animation : setting pivot(changing color of the bar to purple) [barindex,purple]
//* finding bar smaller or bigger than pivot (changing color to green or red) [barindex,green|red]
//* changing the position of all bars which are greater than pivot

class Comparisoncounter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="comparisonCounter">
        Comparisons:
        {this.props.value}
      </div>
    );
  }
}
