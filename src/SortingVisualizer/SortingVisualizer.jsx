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
const NUMBER_OF_ARRAY_BARS = 20;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      accessCounter:0
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
    this.setState({array,accessCounter:0});
  }

  mergeSort() {
    //* this is not the algorithm itself but just a visualization of it
    //* the idea is that we have list of animations some array indicates color change , another indicates height change
    this.animationRoutine(
      getMergeSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }

  selectionSort() {
    this.animationRoutine(
      getSelectionSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  gnomeSort() {
    this.animationRoutine(
      getGnomeSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  heapSort() {
    this.animationRoutine(
      getHeapSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  //accessCounter
  bubbleSort() {
    let accessCounter = this.state.accessCounter;
    // We leave it as an exercise to the viewer of this code to implement this method.
    this.animationRoutine(
      getBubbleSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
      accessCounter,
    );
  }
  insertionSort() {
    this.animationRoutine(
      getInsertionSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  shellSort() {
    this.animationRoutine(
      getShellSortAnimations,
      this.state.array,
      ANIMATION_SPEED_MS,
    );
  }
  quickSort() {
    readQuicksortAnimations(this.state.array, ANIMATION_SPEED_MS);
  }
  animationRoutine(funct, array, msdelay,accessCounter) {
    const animations = funct(array,accessCounter);
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
          if (animations[i].length===3){
            this.setState({accessCounter:animations[i][2]})
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
        <AccessCounter value={this.state.accessCounter}></AccessCounter>
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
function readQuicksortAnimations(array, msdelay) {
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
}

class AccessCounter extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "accessCounter">
        {this.props.value}
      </div>
    )
  }
}
