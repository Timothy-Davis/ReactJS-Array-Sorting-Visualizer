import React from 'react';
import './Visualizer.css';
import './SortAnimation';
import { bubble_sort } from './SortAnimation';
import { selection_sort } from './SortAnimation';
import { insertion_sort } from "./SortAnimation";
import { merge_sort } from './SortAnimation';

const ARRAY_SIZE = 150;
let ARRAY_BARS = [];

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];

        for (let i = 0; i < ARRAY_SIZE; i ++) {
            array.push(getRandomInt(5, 1001));
        }

        this.setState({array});
    }

    render() {
        let animations = [];
        const {array} = this.state;

        return (
            <>
            <nav>
                <button onClick={() => this.resetArray()}> Generate New Array </button>
                <div className='separator'></div>
                <button onClick={() => this.sort(0, bubble_sort(array))}> Bubble Sort </button>
                <button onClick={() => this.sort(0, selection_sort(array))}> Selection Sort </button>
                <button onClick={() => this.sort(0, insertion_sort(array))}> Insertion Sort </button>
                <button onClick={() => {
                    merge_sort(array, 0, array.length-1, animations);
                    this.sort(0, animations);
                }}> Merge Sort </button>
                <div className='separator'></div>
            </nav>
            <div className='array-container'>
                {array.map((value, idx) => (
                    <div className='bar' key={idx} style={{height: `${value}px`}}></div>
                ))}
            </div>
            </>
        );
    }

    sort(i, animations) {
        const bars = document.getElementsByClassName('bar');

        if(i >= 1) {
            this.reset_color(bars[animations[i-1].idx[0]], bars[animations[i-1].idx[1]])
        }

        animations[i] = JSON.parse(animations[i])
        if((animations[i]).type === 'comp') {
            this.compare(bars[animations[i].idx[0]], bars[animations[i].idx[1]])
        } else  {
            this.swap(bars[animations[i].idx[0]], bars[animations[i].idx[1]])
        }
        
        if(i+1 < animations.length) {
            setTimeout(() => this.sort(i+1, animations), 0)
        } else {
            this.reset_color(bars[animations[i].idx[0]], bars[animations[i].idx[1]])
        }
    } 

    compare(bar1, bar2) {
        bar1.style.backgroundColor = 'darkblue';
        bar2.style.backgroundColor = 'darkblue';
    }

    reset_color(bar1, bar2) {
        bar1.style.backgroundColor = 'lime';
        bar2.style.backgroundColor = 'lime';
    }

    swap(bar1, bar2) {
        const tmp = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tmp;
        bar1.style.backgroundColor = 'darkred';
        bar2.style.backgroundColor = 'darkred';
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function disableButtons() {
    const buttons = document.getElementsByTagName('Button')
    for (const button of buttons) {
        button.disabled = true;
    }
}

function enableButtons() {
    const buttons = document.getElementsByTagName('Button')
    for (const button of buttons) {
        button.disabled = false;
    }
}